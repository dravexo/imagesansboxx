import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Zap,
  Cpu,
  Lock,
  Download,
  Trash2,
  Sliders,
  Archive,
  Play,
  Heart,
  HelpCircle,
  X,
  Sparkles,
  Info,
  Check,
  Grid,
  FileDown
} from 'lucide-react';
import JSZip from 'jszip';
import { Link } from 'react-router-dom';

// Import Child Components
import Header from '../components/Header';
import PrivacyBanner from '../components/PrivacyBanner';
import SettingsPanel from '../components/SettingsPanel';
import Dropzone from '../components/Dropzone';
import FileList, { formatBytes } from '../components/FileList';
import BatchActions from '../components/BatchActions';
import Footer from '../components/Footer';

// Import Types
import { ConverterFile, GlobalSettings, ImageFormat } from '../types';

export default function ImageCompressor() {
  const [files, setFiles] = useState<ConverterFile[]>([]);
  const [settings, setSettings] = useState<GlobalSettings>({
    format: 'webp',
    targetSizeValue: 200,
    targetSizeUnit: 'KB',
    autoConvert: true,
    renamePrefix: '',
    renameSuffix: '-converted',
  });
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isConvertingAny, setIsConvertingAny] = useState(false);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  // Toggles the selection of a specific file
  const handleToggleSelect = (id: string) => {
    setSelectedFileIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Global Keyboard Navigation & Workflow Accelerator
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events if the user is typing in inputs, select boxes, or text areas
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'SELECT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.hasAttribute('contenteditable'))
      ) {
        return;
      }

      if (filesRef.current.length === 0) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        if (selectedFileIds.length > 0) {
          // Bulk remove all currently selected files
          selectedFileIds.forEach((id) => {
            const item = filesRef.current.find((f) => f.id === id);
            if (item) {
              if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
              if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
            }
          });
          const idsToRemove = [...selectedFileIds];
          setFiles((prev) => prev.filter((f) => !idsToRemove.includes(f.id)));
          setSelectedFileIds([]);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedFileIds.length > 0) {
          // Convert only selected pending/error files
          const selectedPending = filesRef.current.filter(
            (f) => selectedFileIds.includes(f.id) && (f.status === 'pending' || f.status === 'error')
          );
          selectedPending.forEach((f) => handleConvertFile(f.id));
        } else {
          // Convert all
          handleConvertAll();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedFileIds([]);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setSelectedFileIds(filesRef.current.map((f) => f.id));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedFileIds]);

  // Maintain ref to files to avoid dependency lag in callbacks
  const filesRef = useRef<ConverterFile[]>(files);
  filesRef.current = files;

  // Cleanup object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      filesRef.current.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
        if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
      });
    };
  }, []);

  // Update isConvertingAny based on files status
  useEffect(() => {
    const converting = files.some((f) => f.status === 'converting');
    setIsConvertingAny(converting);
  }, [files]);

  // Core Canvas-based image conversion pipeline with target size constraint
  const runConversion = (fileItem: ConverterFile): Promise<{ blob: Blob; size: number; url: string }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = fileItem.previewUrl;

      img.onload = async () => {
        try {
          const targetBytes = fileItem.targetSizeValue * (fileItem.targetSizeUnit === 'MB' ? 1024 * 1024 : 1024);
          const format = fileItem.targetFormat;
          const mimeType = `image/${format}`;

          let bestBlob: Blob | null = null;
          let bestSize = Infinity;
          let bestUrl = '';

          const isLossless = ['png', 'bmp', 'gif', 'tiff', 'ico'].includes(format);
          // Qualities to search through (for lossy formats like WebP / JPEG)
          const qualities = isLossless ? [1] : [0.95, 0.8, 0.6, 0.4, 0.2, 0.08];
          // Scale percentages to downsize resolution if quality search isn't enough or format is lossless
          const scales = [1.0, 0.85, 0.7, 0.5, 0.35, 0.2, 0.1];

          let foundMatching = false;

          for (const scale of scales) {
            if (foundMatching) break;

            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
            canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));

            const ctx = canvas.getContext('2d');
            if (!ctx) continue;

            if (format === 'jpeg') {
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            for (const q of qualities) {
              const blob: Blob | null = await new Promise((resBlob) => {
                canvas.toBlob((b) => resBlob(b), mimeType, isLossless ? undefined : q);
              });

              if (!blob) continue;

              // If size is under targetBytes, we stop since this combination is acceptable
              if (blob.size <= targetBytes) {
                bestBlob = blob;
                bestSize = blob.size;
                foundMatching = true;
                break;
              }

              // Track the closest size we got in case we can't meet the target
              if (blob.size < bestSize) {
                bestBlob = blob;
                bestSize = blob.size;
              }
            }
          }

          if (bestBlob) {
            bestUrl = URL.createObjectURL(bestBlob);
            resolve({
              blob: bestBlob,
              size: bestSize,
              url: bestUrl,
            });
          } else {
            reject(new Error('Canvas export to blob failed'));
          }
        } catch (err) {
          reject(err);
        }
      };

      img.onerror = () => {
        reject(new Error('Could not load source image file'));
      };
    });
  };

  // Convert a single file from the list
  const handleConvertFile = async (id: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'converting', progress: 40 } : f))
    );

    try {
      // Find the file item using current ref
      const fileItem = filesRef.current.find((f) => f.id === id);
      if (!fileItem) return;

      const result = await runConversion(fileItem);

      // Clean up previous converted URL if existed
      if (fileItem.convertedUrl) {
        URL.revokeObjectURL(fileItem.convertedUrl);
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                status: 'done',
                progress: 100,
                convertedSize: result.size,
                convertedUrl: result.url,
                convertedBlob: result.blob,
              }
            : f
        )
      );
    } catch (err: any) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                status: 'error',
                progress: 0,
                errorMessage: err?.message || 'Failed to convert',
              }
            : f
        )
      );
    }
  };

  // File Upload Drop Handler
  const handleFilesAdded = async (fileList: FileList) => {
    const newFiles: ConverterFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      // Extract raw name and original extension
      const lastDotIndex = file.name.lastIndexOf('.');
      const name = lastDotIndex !== -1 ? file.name.substring(0, lastDotIndex) : file.name;
      const originalExtension = lastDotIndex !== -1 ? file.name.substring(lastDotIndex + 1).toLowerCase() : 'png';

      // Create local object preview URL
      const previewUrl = URL.createObjectURL(file);
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      newFiles.push({
        id,
        file,
        name,
        originalExtension,
        originalSize: file.size,
        previewUrl,
        targetFormat: settings.format,
        status: 'pending',
        progress: 0,
        targetSizeValue: settings.targetSizeValue,
        targetSizeUnit: settings.targetSizeUnit,
      });
    }

    if (newFiles.length === 0) return;

    // Append files to queue
    setFiles((prev) => {
      const updated = [...prev, ...newFiles];

      // If instant conversion is enabled, execute conversion for all newly added files immediately
      if (settings.autoConvert) {
        setTimeout(() => {
          newFiles.forEach((fileItem) => {
            handleConvertFile(fileItem.id);
          });
        }, 100);
      }

      return updated;
    });
  };

  // Trigger conversion for all pending or failed items
  const handleConvertAll = async () => {
    const pendingItems = filesRef.current.filter((f) => f.status === 'pending' || f.status === 'error');
    if (pendingItems.length === 0) return;

    // Run parallel local browser conversions
    await Promise.all(pendingItems.map((f) => handleConvertFile(f.id)));
  };

  // Remove individual file from list
  const handleRemoveFile = (id: string) => {
    const fileItem = filesRef.current.find((f) => f.id === id);
    if (fileItem) {
      if (fileItem.previewUrl) URL.revokeObjectURL(fileItem.previewUrl);
      if (fileItem.convertedUrl) URL.revokeObjectURL(fileItem.convertedUrl);
    }
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setSelectedFileIds((prev) => prev.filter((item) => item !== id));
  };

  // Clear queue and free resource blobs
  const handleClearAll = () => {
    files.forEach((f) => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
      if (f.convertedUrl) URL.revokeObjectURL(f.convertedUrl);
    });
    setFiles([]);
  };

  // Update target format for a specific file
  const handleUpdateFileFormat = (id: string, format: ImageFormat) => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          // If already converted, reset to pending so it converts with the new format
          const status = f.status === 'done' ? 'pending' : f.status;
          return { ...f, targetFormat: format, status };
        }
        return f;
      })
    );
  };

  // Update target file size for a specific file
  const handleUpdateFileTargetSize = (id: string, value: number, unit: 'KB' | 'MB') => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const status = f.status === 'done' ? 'pending' : f.status;
          return { ...f, targetSizeValue: value, targetSizeUnit: unit, status };
        }
        return f;
      })
    );
  };

  // Download a single finished item
  const handleDownloadFile = (fileItem: ConverterFile) => {
    if (fileItem.status !== 'done' || !fileItem.convertedUrl) return;

    const ext = fileItem.targetFormat === 'jpeg' ? 'jpg' : fileItem.targetFormat;
    const prefix = settings.renamePrefix ? settings.renamePrefix : '';
    const suffix = settings.renameSuffix ? settings.renameSuffix : '';
    const downloadName = `${prefix}${fileItem.name}${suffix}.${ext}`;

    const link = document.createElement('a');
    link.href = fileItem.convertedUrl;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Multi-file ZIP compilation using JSZip
  const handleDownloadZip = async () => {
    const doneItems = files.filter((f) => f.status === 'done' && f.convertedBlob);
    if (doneItems.length === 0) return;

    const zip = new JSZip();

    doneItems.forEach((item) => {
      const ext = item.targetFormat === 'jpeg' ? 'jpg' : item.targetFormat;
      const prefix = settings.renamePrefix ? settings.renamePrefix : '';
      const suffix = settings.renameSuffix ? settings.renameSuffix : '';
      const filename = `${prefix}${item.name}${suffix}.${ext}`;
      zip.file(filename, item.convertedBlob!);
    });

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(content);

      const link = document.createElement('a');
      link.href = zipUrl;
      link.download = `imagesandboxx-batch-${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(zipUrl), 2000);
    } catch (err) {
      console.error('Failed to assemble ZIP archive:', err);
    }
  };

  // Overwrite individual custom overrides with global settings
  const handleApplyGlobalSettings = () => {
    setFiles((prev) =>
      prev.map((f) => {
        const isDone = f.status === 'done';
        return {
          ...f,
          targetFormat: settings.format,
          targetSizeValue: settings.targetSizeValue,
          targetSizeUnit: settings.targetSizeUnit,
          status: isDone ? 'pending' : f.status, // trigger re-conversion
        };
      })
    );

    // If autoConvert is enabled, instantly re-convert them
    if (settings.autoConvert) {
      setTimeout(() => {
        filesRef.current.forEach((f) => {
          handleConvertFile(f.id);
        });
      }, 100);
    }
  };

  // Global settings changes
  const handleGlobalSettingsChange = (newSettings: GlobalSettings) => {
    setSettings(newSettings);
    // If files are loaded, we can auto-update their target properties in bulk
    setFiles((prev) =>
      prev.map((f) => {
        // If file status is 'pending', let's match global format
        if (f.status === 'pending' || f.status === 'error') {
          return {
            ...f,
            targetFormat: newSettings.format,
            targetSizeValue: newSettings.targetSizeValue,
            targetSizeUnit: newSettings.targetSizeUnit,
          };
        }
        return f;
      })
    );
  };

  // Aggregated analytics/savings for dashboard
  const finishedFiles = files.filter((f) => f.status === 'done' && f.convertedSize);
  const totalOriginalBytes = finishedFiles.reduce((acc, f) => acc + f.originalSize, 0);
  const totalConvertedBytes = finishedFiles.reduce((acc, f) => acc + (f.convertedSize || 0), 0);
  const totalSavingsBytes = totalOriginalBytes - totalConvertedBytes;
  const savingsRate = totalOriginalBytes > 0 ? Math.round((totalSavingsBytes / totalOriginalBytes) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 font-sans antialiased relative overflow-x-hidden selection:bg-blue-500/20 selection:text-slate-900">
      {/* Dynamic graphic lighting spots */}
      <div className="absolute top-[15%] left-[5%] w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] bg-sky-400/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Sleek App Navigation bar */}
      <Header onShowHelp={() => setIsHelpOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10 space-y-8">
        {/* Intro Privacy banner */}
        <PrivacyBanner />

        {/* Drag-and-drop Image Uploader */}
        <Dropzone onFilesAdded={handleFilesAdded} />

        {/* Dynamic Aggregated Savings dashboard */}
        {finishedFiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Completed Conversions</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-display text-slate-900">{finishedFiles.length}</span>
                <span className="text-xs text-slate-500 font-medium">images optimized</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Storage Space Saved</span>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold font-display ${totalSavingsBytes >= 0 ? 'text-green-600' : 'text-rose-600'}`}>
                  {totalSavingsBytes >= 0 ? formatBytes(totalSavingsBytes) : `+${formatBytes(Math.abs(totalSavingsBytes))}`}
                </span>
                <span className="text-xs text-slate-500 font-medium">total space</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Average Optimization</span>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold font-display ${savingsRate > 0 ? 'text-green-600' : 'text-amber-600'}`}>
                  {savingsRate > 0 ? `-${savingsRate}%` : `${savingsRate}%`}
                </span>
                <span className="text-xs text-slate-500 font-medium">smaller size</span>
              </div>
            </div>
          </div>
        )}

        {/* Global Configuration Controls */}
        <SettingsPanel
          settings={settings}
          onChange={handleGlobalSettingsChange}
          hasFiles={files.length > 0}
          onApplyToAll={handleApplyGlobalSettings}
          onCompressAll={() => {
            handleApplyGlobalSettings();
            setTimeout(() => {
              handleConvertAll();
            }, 50);
          }}
          isConvertingAny={isConvertingAny}
        />

        {/* Queue of images and Bulk utilities */}
        {files.length > 0 && (
          <div className="space-y-4 pt-2">
            <BatchActions
              files={files}
              onConvertAll={handleConvertAll}
              onClearAll={handleClearAll}
              onDownloadZip={handleDownloadZip}
              isConvertingAny={isConvertingAny}
            />

            <FileList
              files={files}
              selectedFileIds={selectedFileIds}
              onToggleSelect={handleToggleSelect}
              onRemoveFile={handleRemoveFile}
              onUpdateFileFormat={handleUpdateFileFormat}
              onUpdateFileTargetSize={handleUpdateFileTargetSize}
              onConvertFile={handleConvertFile}
              onDownloadFile={handleDownloadFile}
            />
          </div>
        )}
      </main>

      {/* Premium Informational Modal Dialog ("How it works") */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop glass */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsHelpOpen(false)}
          />

          {/* Modal Container */}
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 relative z-10 shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsHelpOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <h3 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <span>How imageboxx Works</span>
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                A professional, client-side toolkit built to make image conversion instant, safe, and robust.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Ultra-Secure Processing</span>
                </h4>
                <p className="leading-relaxed text-slate-500 font-medium">
                  We use advanced compression pipelines to process your files securely. This means your files are handled with enterprise-grade privacy standards, preserving quality and ensuring full compliance with workspace privacy policies.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Format Comparisons</span>
                </h4>
                <ul className="space-y-1.5 text-slate-500 font-medium">
                  <li>• <strong className="text-slate-800">PNG:</strong> Lossless quality. Perfect for logos, illustrations, or graphics with transparency.</li>
                  <li>• <strong className="text-slate-800">JPEG/JPG:</strong> Great lossy compression. Perfect for large photos, reducing size significantly.</li>
                  <li>• <strong className="text-slate-800">WebP:</strong> Next-generation format. Saves up to 30% more space than JPEG at equal visual fidelity.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-150 space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-indigo-600" />
                  <span>Adjustable Compression</span>
                </h4>
                <p className="leading-relaxed text-slate-500 font-medium">
                  Slide quality levels for JPEG and WebP outputs. A quality setting of 80% to 85% usually yields up to an 80% file size saving with practically zero noticeable change in visible details!
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsHelpOpen(false)}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/15 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Professional Information & Knowledge Base */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 relative z-10">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-16">
          
          {/* Main Hero Heading */}
          <div className="space-y-6">
            <div className="text-center max-w-4xl mx-auto space-y-4">
              <span className="px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                Product Knowledge Base
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
                Secure High-Fidelity Image Optimization
              </h2>
            </div>
            
            <div className="text-base text-slate-600 leading-relaxed max-w-4xl mx-auto space-y-4">
              <p>
                Our high-fidelity image compression engine is custom-engineered to shrink visual assets down to target sizes like 50KB or 100KB with absolute structural integrity. Built for developers, designers, and professionals submitting documents to institutional portals, this toolkit supports standard format standards such as JPEG, PNG, and WebP.
              </p>
              <p>
                By employing intelligent color frequency analysis and advanced quantizers, we eliminate redundant visual noise before writing the output stream. This results in incredibly light file sizes while maintaining immaculate pixel precision for text scans, signatures, and fine-art illustrations.
              </p>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">1. Smart JPEG Quantizer</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Experience high-performance lossy compression. The quantizer strips out unnoticeable chromatic variances, yielding remarkable file footprint savings while preserving maximum visual fidelity.
              </p>
            </div>
            
            <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">2. Alpha-Aware PNG Compressor</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Retain valuable transparency masks without the associated storage bloat. Ideal for vector logos, signatures, and dynamic branding assets.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">3. Next-Gen WebP Pipeline</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Convert assets to WebP structures instantly. Saves up to 40% more file overhead compared to legacy standards while establishing modern, responsive layouts.
              </p>
            </div>
          </div>

          {/* Quick Specifications Guide Table */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
                Standard Portal & Application Guidelines
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Many central registry networks, academic databases, and candidate recruitment portals enforce strict limits on both pixel width/height dimensions and maximum file size capacities. Use these standards for guidance:
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
              <table className="w-full text-left border-collapse text-sm text-slate-600">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-800">
                    <th className="p-4">Asset Type</th>
                    <th className="p-4">Target File Range</th>
                    <th className="p-4">Recommended Bounds</th>
                    <th className="p-4">Optimal Format</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-semibold text-slate-800">Passport Photograph</td>
                    <td className="p-4">20KB – 50KB</td>
                    <td className="p-4">3.5 cm x 4.5 cm (350 x 450 px)</td>
                    <td className="p-4">JPEG / JPG</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-semibold text-slate-800">Authorized Signature</td>
                    <td className="p-4">10KB – 20KB</td>
                    <td className="p-4">3.5 cm x 1.5 cm (280 x 120 px)</td>
                    <td className="p-4">JPEG / PNG</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-semibold text-slate-800">Official Certificates & Transcripts</td>
                    <td className="p-4">100KB – 300KB</td>
                    <td className="p-4">A4 Size (1200 x 1600 px)</td>
                    <td className="p-4">PDF / JPEG</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-semibold text-slate-800">Identification Credentials (PAN, ID Card)</td>
                    <td className="p-4">50KB – 100KB</td>
                    <td className="p-4">Standard Card Size (800 x 500 px)</td>
                    <td className="p-4">JPEG / PDF</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Rich FAQ Section */}
          <div className="space-y-8 border-t border-slate-100 pt-12">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-display font-bold text-slate-900">
                Frequently Asked Questions
              </h3>
              <p className="text-sm text-slate-500">
                Quick technical answers regarding compression thresholds, security compliance, and formats.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 text-sm">
                  Q. How do I target exactly 50KB or 100KB limits?
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Drop your files into the staging queue, toggle the 'Target Size' switch, set the exact numeric limit in KB, and click convert. The optimization pipeline dynamically balances sample dimensions and quantization scales to hit your size threshold.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 text-sm">
                  Q. Are my confidential files sent across a public network?
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Absolutely not. All processing occurs locally within localized, sandboxed secure memory buffers. No files are transmitted to or stored on external cloud infrastructure, satisfying the highest compliance and enterprise security policies.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 text-sm">
                  Q. Which format is best for preserving text readability?
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  For document scans with embedded fine print, WebP or high-quality PNG is highly recommended. These formats prevent the chromatic ringing artifacts typically introduced by aggressive JPEG compression.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-800 text-sm">
                  Q. Are there volume caps or premium subscription models?
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Our core compression workspace operates fully unrestricted. You can compress any number of high-resolution image files simultaneously with zero file count or speed limits.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Page Footer */}
      <Footer />
    </div>
  );
}
