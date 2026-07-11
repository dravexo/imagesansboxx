import React from 'react';
import { Sliders, Settings2, Info } from 'lucide-react';
import { ImageFormat, GlobalSettings } from '../types';

interface SettingsPanelProps {
  settings: GlobalSettings;
  onChange: (settings: GlobalSettings) => void;
  hasFiles: boolean;
  onApplyToAll: () => void;
  onCompressAll: () => void;
  isConvertingAny: boolean;
}

export default function SettingsPanel({
  settings,
  onChange,
  hasFiles,
  onApplyToAll,
  onCompressAll,
  isConvertingAny,
}: SettingsPanelProps) {
  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...settings,
      format: e.target.value as ImageFormat,
    });
  };

  const handleTargetSizeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange({
      ...settings,
      targetSizeValue: isNaN(val) ? 0 : val,
    });
  };

  const handleTargetSizeUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...settings,
      targetSizeUnit: e.target.value as 'KB' | 'MB',
    });
  };

  const handleAutoConvertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...settings,
      autoConvert: e.target.checked,
    });
  };

  const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...settings,
      renamePrefix: e.target.value,
    });
  };

  const handleSuffixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...settings,
      renameSuffix: e.target.value,
    });
  };

  const isLossless = ['png', 'bmp', 'gif', 'tiff', 'ico'].includes(settings.format);

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <Settings2 className="w-4 h-4 text-blue-600" />
        <h3 className="font-display font-semibold text-slate-900 text-base">Global Conversion Configuration</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Target Format */}
        <div className="space-y-2">
          <label htmlFor="global-target-format" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
            Default Target Format
          </label>
          <div className="relative">
            <select
              id="global-target-format"
              value={settings.format}
              onChange={handleFormatChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer appearance-none"
            >
              <option value="png">PNG (Lossless, Transparent)</option>
              <option value="jpeg">JPEG / JPG (Compressed, Solid)</option>
              <option value="webp">WebP (Modern, High Compression)</option>
              <option value="avif">AVIF (Next-Gen, High Efficiency)</option>
              <option value="bmp">BMP (Uncompressed Bitmap)</option>
              <option value="gif">GIF (Simple Animation/Graphic)</option>
              <option value="tiff">TIFF (High Quality, Print)</option>
              <option value="ico">ICO (Windows Icon)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
            {settings.format === 'png' && 'Excellent for graphics, logos, and high contrast details.'}
            {settings.format === 'jpeg' && 'Perfect for photographs and sharing due to small sizes.'}
            {settings.format === 'webp' && 'Best overall compression, modern standard for web optimization.'}
            {settings.format === 'avif' && 'Highest compression efficiency, supported by modern browsers.'}
            {settings.format === 'bmp' && 'Large uncompressed image format, no quality loss.'}
            {settings.format === 'gif' && 'Standard format for simple web graphics and short animations (saves as static frame).'}
            {settings.format === 'tiff' && 'Industry standard for high-quality print and publishing.'}
            {settings.format === 'ico' && 'Standard icon format for Windows and favicons.'}
          </p>
        </div>

        {/* Target File Size */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="global-target-size" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              Target File Size
            </label>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
              Limit: {settings.targetSizeValue || 1} {settings.targetSizeUnit}
            </span>
          </div>

          <div className="flex gap-2">
            <input
              id="global-target-size"
              type="number"
              min="1"
              max="9999"
              value={settings.targetSizeValue || ''}
              onChange={handleTargetSizeValueChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="e.g. 200"
            />
            <select
              id="global-target-size-unit"
              value={settings.targetSizeUnit}
              onChange={handleTargetSizeUnitChange}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="KB">KB</option>
              <option value="MB">MB</option>
            </select>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
            Dynamic compression adjusts visual quality and resolution to meet your target size.
          </p>
          {isLossless && (
            <p className="text-[10px] text-amber-600 flex items-center gap-1 font-medium">
              <Info className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Format is lossless or fixed-quality. Scale down is applied to fit target size constraints.</span>
            </p>
          )}
        </div>

        {/* Compress Action */}
        <div className="space-y-3 flex flex-col justify-end pb-3">
          <button
            onClick={onCompressAll}
            disabled={!hasFiles || isConvertingAny}
            className="w-full px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-tr from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 shadow-md shadow-blue-500/15 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {isConvertingAny ? (
              <span>Compressing...</span>
            ) : (
              <span>Apply & Compress</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
