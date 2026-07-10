import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Files, ShieldAlert } from 'lucide-react';

interface DropzoneProps {
  onFilesAdded: (files: FileList) => void;
  accept?: string;
  title?: string;
  activeTitle?: string;
  description?: string;
  iconType?: 'image' | 'file';
}

export default function Dropzone({ 
  onFilesAdded,
  accept = "image/png, image/jpeg, image/jpg, image/webp",
  title = "Drag & drop images, or click to browse",
  activeTitle = "Drop your images here!",
  description = "Supports high-speed conversion for PNG, JPG, JPEG, and WebP up to 50MB per file.",
  iconType = 'image'
}: DropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesAdded(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(e.target.files);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
      className={`relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 p-8 sm:p-12 cursor-pointer flex flex-col items-center justify-center text-center group ${
        isDragActive
          ? "border-blue-500 bg-blue-50/50 scale-[0.99] shadow-inner"
          : "border-slate-300 bg-white/50 hover:bg-white hover:border-blue-400 hover:scale-[1.002] shadow-sm"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
      />

      <div className="relative mb-4">
        {/* Animated circle backdrops */}
        <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${
          isDragActive 
            ? "bg-blue-600 text-white border-transparent rotate-6 shadow-md" 
            : "bg-blue-50 border-blue-100 text-blue-500 group-hover:scale-110 group-hover:bg-blue-100"
        }`}>
          <Upload className={`w-6 h-6 transition-transform duration-300 ${isDragActive ? "animate-bounce" : ""}`} />
        </div>
      </div>

      <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 mb-2 tracking-tight">
        {isDragActive ? activeTitle : title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-md font-medium">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-medium">
          {iconType === 'image' ? <ImageIcon className="w-4 h-4 text-blue-500" /> : <Files className="w-4 h-4 text-blue-500" />}
          <span>Multi-Format Support</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-medium">
          <Files className="w-4 h-4 text-indigo-500" />
          <span>Batch Upload Ready</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-medium">
          <ShieldAlert className="w-4 h-4 text-green-600" />
          <span>No Server Uploads</span>
        </div>
      </div>
    </div>
  );
}
