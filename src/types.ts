export type ImageFormat = 'png' | 'jpeg' | 'webp' | 'avif' | 'bmp' | 'gif' | 'tiff' | 'ico';

export interface ConverterFile {
  id: string;
  file: File;
  name: string;
  originalExtension: string;
  originalSize: number;
  previewUrl: string;
  targetFormat: ImageFormat;
  status: 'pending' | 'converting' | 'done' | 'error';
  progress: number;
  errorMessage?: string;
  convertedSize?: number;
  convertedUrl?: string;
  convertedBlob?: Blob;
  targetSizeValue: number; // e.g. 200
  targetSizeUnit: 'KB' | 'MB'; // 'KB' or 'MB'
}

export interface GlobalSettings {
  format: ImageFormat;
  targetSizeValue: number;
  targetSizeUnit: 'KB' | 'MB';
  autoConvert: boolean;
  renamePrefix: string;
  renameSuffix: string;
}

export interface PdfFile {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  status: 'pending' | 'compressing' | 'done' | 'error';
  progress: number;
  errorMessage?: string;
  compressedSize?: number;
  compressedUrl?: string;
  compressedBlob?: Blob;
}

export interface PdfSettings {
  compressionLevel: 'low' | 'medium' | 'high';
  renamePrefix: string;
  renameSuffix: string;
}

