import React from 'react';
import { Play, Trash2, Archive, Check } from 'lucide-react';
import { ConverterFile } from '../types';

interface BatchActionsProps {
  files: ConverterFile[];
  onConvertAll: () => void;
  onClearAll: () => void;
  onDownloadZip: () => void;
  isConvertingAny: boolean;
}

export default function BatchActions({
  files,
  onConvertAll,
  onClearAll,
  onDownloadZip,
  isConvertingAny,
}: BatchActionsProps) {
  const pendingCount = files.filter((f) => f.status === 'pending' || f.status === 'error').length;
  const doneCount = files.filter((f) => f.status === 'done').length;
  const totalCount = files.length;

  if (totalCount === 0) return null;

  return (
    <div className="w-full bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Metrics / Status summary */}
      <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 flex-1 min-w-[200px]">
        <div className="flex flex-col flex-1 max-w-[200px]">
          <div className="flex justify-between items-end mb-1">
            <span className="text-slate-400 font-medium">Queue progress</span>
            <span className="text-slate-900 font-bold text-sm">
              {doneCount} of {totalCount}
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300 ease-out" 
              style={{ width: `${Math.round((doneCount / totalCount) * 100)}%` }} 
            />
          </div>
        </div>
        <div className="h-8 w-px bg-slate-200 hidden sm:block" />
        <div className="hidden sm:flex gap-3">
          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-150">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>{pendingCount} queued</span>
          </div>
          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-150">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>{doneCount} ready</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
        {/* Clear All */}
        <button
          onClick={onClearAll}
          disabled={isConvertingAny}
          className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Queue</span>
        </button>

        {/* Bulk Convert */}
        {pendingCount > 0 && (
          <button
            onClick={onConvertAll}
            disabled={isConvertingAny}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-tr from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 shadow-md shadow-blue-500/15 transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-1.5"
          >
            <Play className={`w-3.5 h-3.5 ${isConvertingAny ? 'animate-pulse' : ''}`} />
            <span>Convert Batch ({pendingCount})</span>
          </button>
        )}

        {/* Download all as ZIP */}
        {doneCount > 0 && (
          <button
            onClick={onDownloadZip}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-green-600 hover:bg-green-700 shadow-md shadow-green-500/10 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Download ZIP ({doneCount})</span>
          </button>
        )}
      </div>
    </div>
  );
}
