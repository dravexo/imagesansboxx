import React from 'react';
import { Trash2, RefreshCw, Download, ArrowRight, CheckCircle2, AlertCircle, FileImage, Sliders } from 'lucide-react';
import { ConverterFile, ImageFormat } from '../types';

interface FileListProps {
  files: ConverterFile[];
  selectedFileIds: string[];
  onToggleSelect: (id: string) => void;
  onRemoveFile: (id: string) => void;
  onUpdateFileFormat: (id: string, format: ImageFormat) => void;
  onUpdateFileTargetSize: (id: string, value: number, unit: 'KB' | 'MB') => void;
  onConvertFile: (id: string) => void;
  onDownloadFile: (file: ConverterFile) => void;
}

// Utility to format bytes into a human-readable format
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default function FileList({
  files,
  selectedFileIds,
  onToggleSelect,
  onRemoveFile,
  onUpdateFileFormat,
  onUpdateFileTargetSize,
  onConvertFile,
  onDownloadFile,
}: FileListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-display font-semibold text-slate-900 text-base flex items-center gap-2">
            <span>Processing Queue</span>
            <span className="text-xs bg-blue-50 text-blue-700 font-semibold border border-blue-200 px-2 py-0.5 rounded-full">
              {files.length} {files.length === 1 ? 'image' : 'images'}
            </span>
          </h4>
          <p className="text-[11px] text-slate-400 font-medium">
            💡 <strong className="font-semibold text-slate-600">Tip:</strong> Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono font-bold text-slate-600">Delete</kbd> to remove selected, <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono font-bold text-slate-600">Enter</kbd> to convert, or <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono font-bold text-slate-600">Ctrl+A</kbd> to select all.
          </p>
        </div>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">Individual overrides active</span>
      </div>

      <div className="space-y-3">
        {files.map((item) => {
          const isSelected = selectedFileIds.includes(item.id);
          const isLossless = item.targetFormat === 'png';
          const hasSavings = item.convertedSize && item.convertedSize > 0;
          const savingsPercent = hasSavings
            ? Math.round(((item.originalSize - item.convertedSize!) / item.originalSize) * 100)
            : 0;

          return (
            <div
              key={item.id}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Spacebar') {
                  e.preventDefault();
                  onToggleSelect(item.id);
                }
              }}
              className={`relative overflow-hidden w-full bg-white rounded-xl p-4 border transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isSelected
                  ? 'border-blue-400 bg-blue-50/10 shadow-sm ring-1 ring-blue-400'
                  : item.status === 'done'
                  ? 'border-green-300 bg-green-50/20 shadow-sm'
                  : item.status === 'converting'
                  ? 'border-blue-300 bg-blue-50/20 shadow-sm'
                  : item.status === 'error'
                  ? 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {/* Checkbox & Thumbnail & Title */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Checkbox for easy selection */}
                <div className="flex items-center shrink-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(item.id)}
                    tabIndex={-1}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 focus:ring-opacity-25 transition-all cursor-pointer"
                  />
                </div>

                <div 
                  onClick={() => onToggleSelect(item.id)}
                  className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer select-none group"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-50 border border-slate-200 flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {item.previewUrl ? (
                      <img
                        src={item.previewUrl}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                    <FileImage className="w-6 h-6 text-slate-400" />
                  )}
                  {/* Status Overlay icon */}
                  {item.status === 'done' && (
                    <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600 drop-shadow" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-slate-900 truncate max-w-[200px] md:max-w-[320px]" title={item.name}>
                      {item.name}
                    </p>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {item.originalExtension.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs">
                    <span className="text-slate-500 font-mono font-medium">
                      Original: {formatBytes(item.originalSize)}
                    </span>

                    {item.status === 'done' && item.convertedSize && (
                      <div className="flex items-center gap-1.5 font-mono text-green-700 font-medium">
                        <ArrowRight className="w-3 h-3 text-green-600" />
                        <span>Converted: {formatBytes(item.convertedSize)}</span>
                        {savingsPercent !== 0 && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                            savingsPercent > 0 ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {savingsPercent > 0 ? `Saved ${savingsPercent}%` : `+${Math.abs(savingsPercent)}%`}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

              {/* Conversion Controls (Format, Quality Slider) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center lg:flex lg:items-center lg:gap-6 flex-shrink-0">
                {/* Target Format Picker */}
                <div className="space-y-1 min-w-[120px]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Convert To
                  </span>
                  <select
                    value={item.targetFormat}
                    onChange={(e) => onUpdateFileFormat(item.id, e.target.value as ImageFormat)}
                    disabled={item.status === 'converting'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
                  >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG (JPG)</option>
                    <option value="webp">WebP</option>
                    <option value="avif">AVIF</option>
                    <option value="bmp">BMP</option>
                    <option value="gif">GIF</option>
                    <option value="tiff">TIFF</option>
                    <option value="ico">ICO</option>
                  </select>
                </div>

                {/* Individual Target Size */}
                <div className="space-y-1 min-w-[150px]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Target Size
                  </span>
                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      min="1"
                      max="9999"
                      value={item.targetSizeValue || ''}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        onUpdateFileTargetSize(item.id, isNaN(val) ? 0 : val, item.targetSizeUnit);
                      }}
                      disabled={item.status === 'converting'}
                      className="w-16 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                      placeholder="Size"
                    />
                    <select
                      value={item.targetSizeUnit}
                      onChange={(e) => {
                        onUpdateFileTargetSize(item.id, item.targetSizeValue, e.target.value as 'KB' | 'MB');
                      }}
                      disabled={item.status === 'converting'}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
                    >
                      <option value="KB">KB</option>
                      <option value="MB">MB</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center justify-between sm:justify-end gap-3.5 border-t border-slate-100 pt-3 lg:border-t-0 lg:pt-0 flex-shrink-0 min-w-[160px]">
                {/* Status Indicator */}
                <div className="flex items-center gap-1.5 text-xs">
                  {item.status === 'pending' && (
                    <span className="text-amber-600 font-semibold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Queued
                    </span>
                  )}
                  {item.status === 'converting' && (
                    <span className="text-blue-600 font-semibold flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      <RefreshCw className="w-3 h-3 animate-spin text-blue-500" />
                      {item.progress}%
                    </span>
                  )}
                  {item.status === 'done' && (
                    <span className="text-green-700 font-bold text-xs bg-green-50 px-2.5 py-0.5 rounded border border-green-200">
                      DONE
                    </span>
                  )}
                  {item.status === 'error' && (
                    <span className="text-rose-600 font-semibold flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded border border-rose-200" title={item.errorMessage}>
                      <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                      Error
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveFile(item.id)}
                    disabled={item.status === 'converting'}
                    title="Remove from queue"
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Trigger Conversion */}
                  {item.status !== 'done' ? (
                    <button
                      onClick={() => onConvertFile(item.id)}
                      disabled={item.status === 'converting'}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1 disabled:opacity-30 transition-all cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${item.status === 'converting' ? 'animate-spin' : ''}`} />
                      <span>Convert</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onDownloadFile(item)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 shadow-sm shadow-blue-100 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Progress Bar (Visual) */}
              {item.status === 'converting' && (
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-blue-100 overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-300 ease-out"
                    style={{ width: `${Math.max(item.progress || 0, 5)}%` }} 
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
