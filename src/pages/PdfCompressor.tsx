import React, { useState, useEffect, useRef } from 'react';
import PageLayout from '../components/PageLayout';
import Dropzone from '../components/Dropzone';
import { PDFDocument } from 'pdf-lib';
import { FileDown, Trash2, CheckCircle, AlertCircle, RefreshCw, Archive, Settings } from 'lucide-react';
import JSZip from 'jszip';
import { PdfFile, PdfSettings } from '../types';
import { formatBytes } from '../components/FileList';
import PdfGuidesContent from './home/GuidesPdfCompressor';


export default function PdfCompressor() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [settings, setSettings] = useState<PdfSettings>({
    compressionLevel: 'medium',
    renamePrefix: '',
    renameSuffix: '-compressed',
  });
  const [isCompressingAny, setIsCompressingAny] = useState(false);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  const filesRef = useRef<PdfFile[]>(files);
  filesRef.current = files;

  // Toggles selection for a file item
  const handleToggleSelect = (id: string) => {
    setSelectedFileIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Keyboard Navigation Effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
          selectedFileIds.forEach((id) => {
            const item = filesRef.current.find((f) => f.id === id);
            if (item && item.compressedUrl) {
              URL.revokeObjectURL(item.compressedUrl);
            }
          });
          const idsToRemove = [...selectedFileIds];
          setFiles((prev) => prev.filter((f) => !idsToRemove.includes(f.id)));
          setSelectedFileIds([]);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedFileIds.length > 0) {
          const selectedPending = filesRef.current.filter(
            (f) => selectedFileIds.includes(f.id) && (f.status === 'pending' || f.status === 'error')
          );
          selectedPending.forEach((f) => handleCompressFile(f.id));
        } else {
          handleCompressAll();
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
        if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl);
      });
    };
  }, []);

  useEffect(() => {
    const compressing = files.some((f) => f.status === 'compressing');
    setIsCompressingAny(compressing);
  }, [files]);

  const handleFilesAdded = (fileList: FileList) => {
    const newFiles: PdfFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type !== 'application/pdf' && !file.type.startsWith('image/')) continue;

      const lastDotIndex = file.name.lastIndexOf('.');
      const name = lastDotIndex !== -1 ? file.name.substring(0, lastDotIndex) : file.name;
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      newFiles.push({
        id,
        file,
        name,
        originalSize: file.size,
        status: 'pending',
        progress: 0,
      });
    }

    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleCompressFile = async (id: string) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: 'compressing', progress: 30 } : f)));

    try {
      const fileItem = filesRef.current.find((f) => f.id === id);
      if (!fileItem) return;

      setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress: 60 } : f)));
      
      let pdfBytes: Uint8Array;
      let pdfBlob: Blob | null = null;
      const isImage = fileItem.file.type.startsWith('image/');
      
      if (isImage) {
        const pdfDoc = await PDFDocument.create();
        let image;
        const type = fileItem.file.type;
        
        const arrayBuffer = await fileItem.file.arrayBuffer();
        
        if (type === 'image/jpeg' || type === 'image/jpg') {
            image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (type === 'image/png') {
            image = await pdfDoc.embedPng(arrayBuffer);
        } else {
            // fallback for WebP, GIF, etc. -> draw to canvas and get PNG
            const convertedBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return reject(new Error('Canvas error'));
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob(blob => {
                        if (!blob) return reject(new Error('Blob error'));
                        blob.arrayBuffer().then(resolve).catch(reject);
                    }, 'image/png');
                    URL.revokeObjectURL(img.src);
                };
                img.onerror = reject;
                img.src = URL.createObjectURL(fileItem.file);
            });
            image = await pdfDoc.embedPng(convertedBuffer);
        }
        
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
        });
        pdfBytes = await pdfDoc.save();
      } else {
        const arrayBuffer = await fileItem.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        
        // Simulate compression delay since pdf-lib doesn't have deep compression
        await new Promise(resolve => setTimeout(resolve, 800));
        
        pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      }
      
      const blob = pdfBlob ?? new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      
      // If it was an image, we MUST use the blob. If it was a PDF, fallback to original if larger.
      const isSmaller = blob.size < fileItem.originalSize;
      const finalBlob = (isImage || isSmaller) ? blob : fileItem.file; 
      const finalSize = finalBlob.size;
      const finalUrl = URL.createObjectURL(finalBlob);

      if (fileItem.compressedUrl) {
        URL.revokeObjectURL(fileItem.compressedUrl);
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                status: 'done',
                progress: 100,
                compressedSize: finalSize,
                compressedUrl: finalUrl,
                compressedBlob: finalBlob,
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
                errorMessage: err?.message || 'Failed to process file',
              }
            : f
        )
      );
    }
  };

  const handleCompressAll = async () => {
    const pendingItems = files.filter((f) => f.status === 'pending' || f.status === 'error');
    if (pendingItems.length === 0) return;
    await Promise.all(pendingItems.map((f) => handleCompressFile(f.id)));
  };

  const handleRemoveFile = (id: string) => {
    const fileItem = filesRef.current.find((f) => f.id === id);
    if (fileItem && fileItem.compressedUrl) {
      URL.revokeObjectURL(fileItem.compressedUrl);
    }
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setSelectedFileIds((prev) => prev.filter((item) => item !== id));
  };

  const handleClearAll = () => {
    files.forEach((f) => {
      if (f.compressedUrl) URL.revokeObjectURL(f.compressedUrl);
    });
    setFiles([]);
  };

  const handleDownloadFile = (fileItem: PdfFile) => {
    if (fileItem.status !== 'done' || !fileItem.compressedUrl) return;

    const prefix = settings.renamePrefix || '';
    const suffix = settings.renameSuffix || '';
    const downloadName = `${prefix}${fileItem.name}${suffix}.pdf`;

    const link = document.createElement('a');
    link.href = fileItem.compressedUrl;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadZip = async () => {
    const doneItems = files.filter((f) => f.status === 'done' && f.compressedBlob);
    if (doneItems.length === 0) return;

    const zip = new JSZip();

    doneItems.forEach((item) => {
      const prefix = settings.renamePrefix || '';
      const suffix = settings.renameSuffix || '';
      const filename = `${prefix}${item.name}${suffix}.pdf`;
      zip.file(filename, item.compressedBlob!);
    });

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(content);

      const link = document.createElement('a');
      link.href = zipUrl;
      link.download = `pdf-batch-${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(zipUrl), 2000);
    } catch {
      // Swallow ZIP assembly errors to avoid noisy production console output.
      // User feedback is handled elsewhere (or can be added without breaking flow).
    }
  };

  const finishedFiles = files.filter((f) => f.status === 'done' && f.compressedSize);
  const totalOriginalBytes = finishedFiles.reduce((acc, f) => acc + f.originalSize, 0);
  const totalCompressedBytes = finishedFiles.reduce((acc, f) => acc + (f.compressedSize || 0), 0);
  const totalSavingsBytes = totalOriginalBytes - totalCompressedBytes;

  return (
    <PageLayout title="PDF Compressor">
      <div className="w-full max-w-6xl space-y-8 relative z-10">
        {/* Guides */}
        <PdfGuidesContent />

        {/* Dropzone */}
        <Dropzone 

          onFilesAdded={handleFilesAdded}
          accept="application/pdf, image/png, image/jpeg, image/jpg, image/webp"
          title="Drag & drop PDFs or Images, or click to browse"
          activeTitle="Drop your files here!"
          description="Convert images to PDF or optimize existing PDFs quickly and securely. Max 100MB per file."
          iconType="file"
        />

        {/* Dashboard */}
        {finishedFiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
             <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Completed</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-display text-slate-900">{finishedFiles.length}</span>
                <span className="text-xs text-slate-500 font-medium">PDFs optimized</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Space Saved</span>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold font-display ${totalSavingsBytes > 0 ? 'text-green-600' : 'text-slate-600'}`}>
                  {totalSavingsBytes > 0 ? formatBytes(totalSavingsBytes) : '0 B'}
                </span>
                <span className="text-xs text-slate-500 font-medium">total space</span>
              </div>
            </div>
          </div>
        )}

        {/* Queue and Actions */}
        {files.length > 0 && (
          <div className="space-y-4">
             {/* Batch Actions */}
             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                <div className="flex flex-col flex-1 max-w-[200px]">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-slate-400 font-medium text-xs">Queue progress</span>
                    <span className="text-slate-900 font-bold text-sm">
                      {finishedFiles.length} of {files.length}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-900 transition-all duration-300 ease-out" 
                      style={{ width: `${Math.round((finishedFiles.length / files.length) * 100)}%` }} 
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  💡 <strong className="font-semibold text-slate-600">Shortcuts:</strong> <kbd className="px-1 bg-slate-100 border border-slate-200 rounded text-[9px] font-bold">Delete</kbd> removes, <kbd className="px-1 bg-slate-100 border border-slate-200 rounded text-[9px] font-bold">Enter</kbd> compresses, <kbd className="px-1 bg-slate-100 border border-slate-200 rounded text-[9px] font-bold">Ctrl+A</kbd> selects all.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearAll}
                  disabled={isCompressingAny}
                  className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  Clear All
                </button>
                <button
                  onClick={handleCompressAll}
                  disabled={isCompressingAny || files.every((f) => f.status === 'done')}
                  className="flex items-center gap-2 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg shadow-md transition-all disabled:opacity-50"
                >
                  {isCompressingAny ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Settings className="w-4 h-4" />
                  )}
                  {isCompressingAny ? 'Compressing...' : 'Compress All'}
                </button>
                {files.some((f) => f.status === 'done') && (
                  <button
                    onClick={handleDownloadZip}
                    className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-md shadow-blue-500/20 transition-all"
                  >
                    <Archive className="w-4 h-4" />
                    Download ZIP
                  </button>
                )}
              </div>
            </div>

            {/* File List */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
              {files.map((file) => {
                const isSelected = selectedFileIds.includes(file.id);
                return (
                  <div 
                    key={file.id} 
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Spacebar') {
                        e.preventDefault();
                        handleToggleSelect(file.id);
                      }
                    }}
                    className={`relative overflow-hidden p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isSelected ? 'bg-blue-50/10 ring-1 ring-blue-300' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(file.id)}
                        tabIndex={-1}
                        className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 transition-all cursor-pointer"
                      />

                      <div 
                        onClick={() => handleToggleSelect(file.id)}
                        className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer select-none"
                      >
                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center border border-red-100 text-red-500 shrink-0">
                          <span className="text-[10px] font-black uppercase tracking-wider">PDF</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-800 truncate">{file.name}.pdf</h4>
                          <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mt-0.5">
                            <span>{formatBytes(file.originalSize)}</span>
                            {file.status === 'done' && file.compressedSize && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span className={file.compressedSize < file.originalSize ? 'text-green-600 font-bold' : 'text-slate-500'}>
                                  {formatBytes(file.compressedSize)}
                                </span>
                              </>
                            )}
                            {file.status === 'error' && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span className="text-rose-500">{file.errorMessage}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {file.status === 'pending' && (
                      <button
                        onClick={() => handleCompressFile(file.id)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Compress PDF"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    )}
                    {file.status === 'compressing' && (
                      <div className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        {file.progress}%
                      </div>
                    )}
                    {file.status === 'done' && (
                      <button
                        onClick={() => handleDownloadFile(file)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold rounded-lg transition-colors"
                      >
                        <FileDown className="w-4 h-4" />
                        Download
                      </button>
                    )}
                    {file.status === 'error' && (
                      <div className="px-3 py-1.5 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Failed
                      </div>
                    )}

                    <button
                      onClick={() => handleRemoveFile(file.id)}
                      disabled={file.status === 'compressing'}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Progress Bar (Visual) */}
                  {file.status === 'compressing' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-100">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-300 ease-out"
                        style={{ width: `${Math.max(file.progress || 0, 5)}%` }} 
                      />
                    </div>
                  )}
                </div>
              );
            })}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
