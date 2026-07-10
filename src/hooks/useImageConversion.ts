import { useCallback } from 'react';
import { ConverterFile } from '../types';

export function useImageConversion() {
  const runConversion = useCallback(
    (fileItem: ConverterFile): Promise<{ blob: Blob; size: number; url: string }> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = fileItem.previewUrl;

        img.onload = async () => {
          try {
            const targetBytes =
              fileItem.targetSizeValue *
              (fileItem.targetSizeUnit === 'MB' ? 1024 * 1024 : 1024);
            const format = fileItem.targetFormat;
            const mimeType = `image/${format}`;

            let bestBlob: Blob | null = null;
            let bestSize = Infinity;
            let bestUrl = '';

            const isLossless = ['png', 'bmp', 'gif', 'tiff', 'ico'].includes(format);
            const qualities = isLossless ? [1] : [0.95, 0.8, 0.6, 0.4, 0.2, 0.08];
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
                  canvas.toBlob(
                    (b) => resBlob(b),
                    mimeType,
                    isLossless ? undefined : q
                  );
                });

                if (!blob) continue;

                if (blob.size <= targetBytes) {
                  bestBlob = blob;
                  bestSize = blob.size;
                  foundMatching = true;
                  break;
                }

                if (blob.size < bestSize) {
                  bestBlob = blob;
                  bestSize = blob.size;
                }
              }
            }

            if (!bestBlob) {
              reject(new Error('Canvas export to blob failed'));
              return;
            }

            bestUrl = URL.createObjectURL(bestBlob);
            resolve({ blob: bestBlob, size: bestSize, url: bestUrl });
          } catch (err) {
            reject(err);
          }
        };

        img.onerror = () => {
          reject(new Error('Could not load source image file'));
        };
      });
    },
    []
  );

  return { runConversion };
}

