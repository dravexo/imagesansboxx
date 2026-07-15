import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';


import { Link } from 'react-router-dom';

// Import Child Components
import Header from '../components/Header';
import PrivacyBanner from '../components/PrivacyBanner';
import SettingsPanel from '../components/SettingsPanel';
import Dropzone from '../components/Dropzone';
import FileList, { formatBytes } from '../components/FileList';
import BatchActions from '../components/BatchActions';

// Import Types
import { ConverterFile, GlobalSettings, ImageFormat } from '../types';

const Footer = lazy(() => import('../components/Footer'));
const KnowledgeBaseSectionsLazy = lazy(() =>
  import('./home/KnowledgeBaseSections').then((m) => ({ default: m.KnowledgeBaseSections }))
);


const HowItWorksModalContent = lazy(() =>
  import("./home/KnowledgeBaseSections").then(module => ({
    default: module.HowItWorksModalContent,
  }))
);
import { useImageConversion } from '../hooks/useImageConversion';



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

  const helpCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const helpLastFocusRef = useRef<HTMLElement | null>(null);

  // Toggles the selection of a specific file
  const handleToggleSelect = (id: string) => {

    setSelectedFileIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Keyboard support for the "How it works" modal
  useEffect(() => {
    if (!isHelpOpen) return;

    helpLastFocusRef.current = document.activeElement as HTMLElement | null;

    const t = window.setTimeout(() => {
      helpCloseBtnRef.current?.focus();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsHelpOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKeyDown);
      helpLastFocusRef.current?.focus?.();
    };
  }, [isHelpOpen]);

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

  // Auto-scroll to the "Apply & Compress" area the first time a user uploads an image
  useEffect(() => {
    if (didAutoScrollRef.current) return;
    if (files.length === 0) return;

    didAutoScrollRef.current = true;

    // Wait one paint so SettingsPanel is definitely mounted
    requestAnimationFrame(() => {
      settingsPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [files.length]);

  const { runConversion } = useImageConversion();

  const [pageError, setPageError] = useState<string | null>(null);

  const settingsPanelRef = useRef<HTMLDivElement | null>(null);
  const didAutoScrollRef = useRef(false);

  // Maintain ref to files to avoid dependency lag in callbacks
  const filesRef = useRef<ConverterFile[]>(files);
  filesRef.current = files;


  // Convert a single file from the list
  const handleConvertFile = async (id: string) => {

    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'converting', progress: 40 } : f))
    );

    try {
      setPageError(null);
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
      const msg = err?.message || 'Failed to convert';
      setPageError(msg);
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
    setPageError(null);

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

    const JSZip = (await import('jszip')).default;
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
    } catch {
      // Swallow ZIP assembly errors to avoid breaking the UI.
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
        {pageError && (
          <div className="w-full bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-4 text-sm font-medium">
            <div className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-rose-100 text-rose-600">!</span>
              <div>
                <div className="font-bold">Something went wrong</div>
                <div className="text-rose-800/90">{pageError}</div>
              </div>
            </div>
          </div>
        )}

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
        {files.length > 0 && (
          <div
            ref={settingsPanelRef}
          >
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
          </div>
        )}


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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-hidden="false"
        >
          {/* Backdrop glass */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsHelpOpen(false)}
          />

          {/* Modal Container */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="how-it-works-title"
            tabIndex={-1}
            className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 relative z-10 shadow-xl space-y-6 animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              ref={helpCloseBtnRef}
              onClick={() => setIsHelpOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

<Suspense fallback={null}>
    <HowItWorksModalContent
        onClose={() => setIsHelpOpen(false)}
    />
</Suspense>          </div>
        </div>
      )}

      {/* Professional Information & Knowledge Base */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 relative z-10">
        <Suspense fallback={null}>
          <KnowledgeBaseSectionsLazy />
        </Suspense>
      </section>

      {/* Page Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}


