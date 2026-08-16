import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Canvas, FabricImage, Shadow, Textbox } from 'fabric';
import PageLayout from '../components/PageLayout';
import {
  Download,
  ImagePlus,
  RefreshCcw,
  Sparkles,
  Trash2,
  Type,
  Upload,
} from 'lucide-react';

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

export default function YouTubeThumbnailEditor() {
  const location = useLocation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const [textValue, setTextValue] = useState('ImageSandboxX');
  const [textSize, setTextSize] = useState(72);
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontFamily, setFontFamily] = useState('Impact');
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');
  const [fontWeight, setFontWeight] = useState<number | string>(700);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [textOpacity, setTextOpacity] = useState(1);
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [shadowEnabled, setShadowEnabled] = useState(true);
  const [textBackground, setTextBackground] = useState(false);
  const [status, setStatus] = useState('Load a YouTube thumbnail to start customizing it.');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const src = params.get('src');

    if (src) {
      setThumbnailSrc(decodeURIComponent(src));
      return;
    }

    setThumbnailSrc(null);
    setStatus('No thumbnail selected. Open a thumbnail from the downloader and click Edit.');
  }, [location.search]);

  useEffect(() => {
    if (!canvasRef.current || !thumbnailSrc) {
      return;
    }

    const canvas = new Canvas(canvasRef.current, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: 'transparent',
      selection: true,
      preserveObjectStacking: true,
      enableRetinaScaling: false,
      includeDefaultValues: true,
    });

    const htmlCanvas = canvasRef.current;
    htmlCanvas.width = CANVAS_WIDTH;
    htmlCanvas.height = CANVAS_HEIGHT;
    canvas.setDimensions({
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });
    canvas.setZoom(1);
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0];

    const baseImage = new window.Image();
    baseImage.crossOrigin = 'anonymous';
    baseImage.onload = () => {
      const fabricImage = new FabricImage(baseImage, {
        selectable: false,
        evented: false,
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockRotation: true,
      });

      fabricImage.set({
        left: 0,
        top: 0,
        originX: 'left',
        originY: 'top',
        scaleX: CANVAS_WIDTH / baseImage.width,
        scaleY: CANVAS_HEIGHT / baseImage.height,
      });

      canvas.backgroundImage = fabricImage;
      canvas.renderAll();
    };
    baseImage.src = thumbnailSrc;

    const handleSelectionChange = () => {
      const activeObject = canvas.getActiveObject();

      if (activeObject && activeObject.type === 'textbox') {
        const textObject = activeObject as Textbox;
        setTextValue(textObject.text || '');
        setTextSize(textObject.fontSize ?? 72);
        setFontFamily(textObject.fontFamily || 'Impact');
        setFontStyle((textObject.fontStyle as 'normal' | 'italic') || 'normal');
        setFontWeight(textObject.fontWeight ?? 700);
        setTextAlign((textObject.textAlign as 'left' | 'center' | 'right') || 'center');
        setTextOpacity(textObject.opacity ?? 1);
        setStrokeWidth(textObject.strokeWidth ?? 0);
        setStrokeColor(typeof textObject.stroke === 'string' ? textObject.stroke : '#000000');
        setShadowEnabled(Boolean(textObject.shadow));
        setTextBackground(Boolean(textObject.backgroundColor));
        if (typeof textObject.fill === 'string') {
          setTextColor(textObject.fill);
        }
      }
    };

    canvas.on('selection:created', handleSelectionChange);
    canvas.on('selection:updated', handleSelectionChange);
    canvas.on('selection:cleared', () => {
      setTextValue('ImageSandboxX');
    });

    fabricCanvasRef.current = canvas;
    setStatus('Thumbnail loaded inside the 16:9 frame. Only text and image layers can be edited.');

    return () => {
      canvas.off('selection:created', handleSelectionChange);
      canvas.off('selection:updated', handleSelectionChange);
      canvas.off('selection:cleared', () => {
        setTextValue('ImageSandboxX');
      });
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, [thumbnailSrc, editorKey]);

  const applyTextStyleToActiveObject = () => {
    const canvas = fabricCanvasRef.current;
    const activeObject = canvas?.getActiveObject();

    if (!canvas || !activeObject || activeObject.type !== 'textbox') {
      return;
    }

    const textObject = activeObject as Textbox;
    textObject.set({
      text: textValue.trim() || 'ImageSandboxX',
      fontSize: textSize,
      fill: textColor,
      fontFamily,
      fontStyle,
      fontWeight,
      textAlign,
      opacity: textOpacity,
      stroke: strokeWidth > 0 ? strokeColor : undefined,
      strokeWidth,
      shadow: shadowEnabled ? new Shadow({
        color: 'rgba(0,0,0,0.28)',
        offsetX: 0,
        offsetY: 4,
        blur: 18,
      }) : undefined,
      backgroundColor: textBackground ? 'rgba(15, 23, 42, 0.30)' : undefined,
    });
    canvas.renderAll();
  };

  useEffect(() => {
    applyTextStyleToActiveObject();
  }, [textValue, textSize, textColor, fontFamily, fontStyle, fontWeight, textAlign, textOpacity, strokeWidth, strokeColor, shadowEnabled, textBackground]);

  const addText = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) {
      return;
    }

    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'textbox') {
      applyTextStyleToActiveObject();
      setStatus('Selected text updated inside the thumbnail.');
      return;
    }

    const text = new Textbox(textValue.trim() || 'ImageSandboxX', {
      left: canvas.width / 2,
      top: canvas.height * 0.75,
      originX: 'center',
      originY: 'center',
      width: canvas.width * 0.7,
      fontSize: textSize,
      fill: textColor,
      fontFamily,
      fontStyle,
      fontWeight,
      textAlign,
      opacity: textOpacity,
      stroke: strokeWidth > 0 ? strokeColor : undefined,
      strokeWidth,
      shadow: shadowEnabled ? new Shadow({
        color: 'rgba(0,0,0,0.28)',
        offsetX: 0,
        offsetY: 4,
        blur: 18,
      }) : undefined,
      backgroundColor: textBackground ? 'rgba(15, 23, 42, 0.30)' : undefined,
      selectable: true,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    setStatus('Text layer added to the thumbnail.');
  };

  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const canvas = fabricCanvasRef.current;

    if (!file || !canvas) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const item = new FabricImage(img);
      const maxWidth = 360;
      const maxHeight = 260;
      const scale = Math.min(maxWidth / item.width!, maxHeight / item.height!, 1);

      item.set({
        left: canvas.width / 2,
        top: canvas.height / 2,
        originX: 'center',
        originY: 'center',
        scaleX: scale,
        scaleY: scale,
        hasControls: true,
        hasBorders: true,
      });

      canvas.add(item);
      canvas.setActiveObject(item);
      canvas.renderAll();
      setStatus('Image added to the canvas.');
    };
    img.src = objectUrl;

    event.target.value = '';
  };

  const removeSelected = () => {
    const canvas = fabricCanvasRef.current;
    const active = canvas?.getActiveObject();

    if (!canvas || !active) {
      return;
    }

    canvas.remove(active);
    canvas.discardActiveObject();
    canvas.renderAll();
    setStatus('Selected layer removed.');
  };

  const moveSelectedLayer = (direction: 'forward' | 'backward') => {
    const canvas = fabricCanvasRef.current;
    const active = canvas?.getActiveObject();

    if (!canvas || !active) {
      return;
    }

    if (direction === 'forward') {
      canvas.bringObjectForward(active);
      setStatus('Layer moved forward.');
    } else {
      canvas.sendObjectBackwards(active);
      setStatus('Layer moved backward.');
    }

    canvas.renderAll();
  };

  const duplicateSelected = async () => {
    const canvas = fabricCanvasRef.current;
    const active = canvas?.getActiveObject();

    if (!canvas || !active) {
      return;
    }

    const clone = await active.clone();
    clone.set({
      left: (active.left ?? 0) + 30,
      top: (active.top ?? 0) + 30,
    });
    canvas.add(clone);
    canvas.setActiveObject(clone);
    canvas.renderAll();
    setStatus('Selected layer duplicated.');
  };

  const downloadImage = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !thumbnailSrc) {
      return;
    }

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = CANVAS_WIDTH;
    exportCanvas.height = CANVAS_HEIGHT;
    const ctx = exportCanvas.getContext('2d');

    if (!ctx) {
      return;
    }

    const baseImage = new Image();
    baseImage.crossOrigin = 'anonymous';
    baseImage.onload = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(baseImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(canvas.toCanvasElement(), 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      const dataUrl = exportCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'youtube-thumbnail-edited.png';
      link.click();
      setStatus('Your edited thumbnail has been exported as a PNG.');
    };
    baseImage.src = thumbnailSrc;
  };

  const seoProps = {
    title: 'YouTube Thumbnail Editor — Add Text, Images, and Backgrounds | ImageSandboxX',
    description: 'Customize YouTube thumbnails in your browser with Fabric.js. Add text, images, and backgrounds, then export the finished design as a PNG without uploading anything.',
    canonicalUrl: 'https://imagesandboxx.online/youtube-thumbnail-editor',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'YouTube Thumbnail Editor',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires HTML5 canvas and modern browser support.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Add text to YouTube thumbnails',
        'Overlay custom images',
        'Apply custom backgrounds',
        'Export the final design locally in the browser',
      ],
    },
  };

  return (
    <PageLayout title="YouTube Thumbnail Editor" seo={seoProps}>
      <div className="w-full max-w-7xl space-y-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-display font-bold text-slate-900">Custom YouTube Thumbnail Studio</h2>
            <p className="text-sm text-slate-600">Build a custom thumbnail right in your browser using the original image as your base layer.</p>
          </div>
          <Link
            to="/youtube-thumbnail-downloader"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Back to Downloader
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Sparkles className="h-4 w-4 text-blue-600" />
                Edit Tools
              </div>
              <p className="text-xs text-slate-500">Everything runs locally in your browser.</p>
            </div>

            <div className="space-y-3 rounded-xl bg-slate-50 p-3 border border-slate-200">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                <Type className="h-3.5 w-3.5 text-slate-500" />
                Text
              </label>
              <input
                type="text"
                value={textValue}
                onChange={(event) => setTextValue(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add headline text"
              />

              <label className="text-xs text-slate-600">Font family</label>
              <select
                value={fontFamily}
                onChange={(event) => setFontFamily(event.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Impact">Impact</option>
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Georgia">Georgia</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFontStyle('normal')}
                  className={`rounded-lg border px-2 py-1.5 text-xs font-semibold ${fontStyle === 'normal' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700'}`}
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => setFontStyle('italic')}
                  className={`rounded-lg border px-2 py-1.5 text-xs font-semibold ${fontStyle === 'italic' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700'}`}
                >
                  Italic
                </button>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-2">
                <label className="flex items-center gap-2 text-xs text-slate-600">
                  Size
                  <input
                    type="range"
                    min="24"
                    max="150"
                    value={textSize}
                    onChange={(event) => setTextSize(Number(event.target.value))}
                    className="w-full accent-blue-600"
                  />
                </label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(event) => setTextColor(event.target.value)}
                  className="h-10 w-14 rounded-lg border border-slate-200 bg-white"
                  aria-label="Choose text color"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Opacity</span>
                  <span>{textOpacity.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={textOpacity}
                  onChange={(event) => setTextOpacity(Number(event.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(['left', 'center', 'right'] as const).map((alignment) => (
                  <button
                    key={alignment}
                    type="button"
                    onClick={() => setTextAlign(alignment)}
                    className={`rounded-lg border px-2 py-1.5 text-xs font-semibold ${textAlign === alignment ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700'}`}
                  >
                    {alignment}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-2">
                <label className="flex items-center gap-2 text-xs text-slate-600">
                  Stroke
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={strokeWidth}
                    onChange={(event) => setStrokeWidth(Number(event.target.value))}
                    className="w-full accent-blue-600"
                  />
                </label>
                <input
                  type="color"
                  value={strokeColor}
                  onChange={(event) => setStrokeColor(event.target.value)}
                  className="h-10 w-14 rounded-lg border border-slate-200 bg-white"
                  aria-label="Choose text stroke color"
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                <span>Shadow</span>
                <button
                  type="button"
                  onClick={() => setShadowEnabled((value) => !value)}
                  className={`rounded-full px-2 py-1 text-[10px] font-semibold ${shadowEnabled ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}
                >
                  {shadowEnabled ? 'On' : 'Off'}
                </button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                <span>Text box</span>
                <button
                  type="button"
                  onClick={() => setTextBackground((value) => !value)}
                  className={`rounded-full px-2 py-1 text-[10px] font-semibold ${textBackground ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}
                >
                  {textBackground ? 'BG On' : 'BG Off'}
                </button>
              </div>

              <button
                onClick={addText}
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Add Text Layer
              </button>
            </div>

            <div className="space-y-3 rounded-xl bg-slate-50 p-3 border border-slate-200">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                <ImagePlus className="h-3.5 w-3.5 text-slate-500" />
                Images
              </label>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors">
                <Upload className="h-4 w-4" />
                Add image overlay
                <input type="file" accept="image/*" onChange={addImage} className="hidden" />
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={removeSelected}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Delete Selected
              </button>
              <button
                onClick={() => duplicateSelected()}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Duplicate
              </button>
              <button
                onClick={() => moveSelectedLayer('backward')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Send Back
              </button>
              <button
                onClick={() => moveSelectedLayer('forward')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Bring Front
              </button>
              <button
                onClick={() => setEditorKey((value) => value + 1)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <RefreshCcw className="h-4 w-4" />
                Reset
              </button>
              <button
                onClick={downloadImage}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download PNG
              </button>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">
              {status}
            </div>
          </aside>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            {!thumbnailSrc ? (
              <div className="flex min-h-[600px] items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-center text-sm text-slate-500">
                Select a thumbnail in the downloader and open the editor to begin.
              </div>
            ) : (
              <div className="overflow-auto rounded-xl border border-slate-200 bg-slate-100 p-2">
                <div
                  className="relative mx-auto rounded-xl border border-slate-300 bg-slate-900 shadow-inner"
                  style={{ width: '100%', maxWidth: '1280px', aspectRatio: '16 / 9' }}
                >
                  <canvas
                    ref={canvasRef}
                    className="block h-full w-full rounded-lg"
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    style={{ display: 'block', background: 'transparent' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
