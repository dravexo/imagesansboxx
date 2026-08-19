import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { Youtube, Download, Image as ImageIcon, AlertCircle, CheckCircle, ExternalLink, Copy, RefreshCw, PencilLine } from 'lucide-react';
import { openDownloadAd } from '../utils/download';

interface ThumbnailOption {
  label: string;
  resolution: string;
  size: string;
  url: string;
  quality: 'maxresdefault' | 'hqdefault' | 'sddefault' | 'mqdefault' | 'default';
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function getThumbnailOptions(videoId: string): ThumbnailOption[] {
  var baseUrl = 'https://img.youtube.com/vi/' + videoId + '/';
  return [
    {
      label: 'Maximum Resolution',
      resolution: '1920x1080',
      size: 'Max Res',
      url: baseUrl + 'maxresdefault.jpg',
      quality: 'maxresdefault',
    },
    {
      label: 'High Quality',
      resolution: '480x360',
      size: 'HQ',
      url: baseUrl + 'hqdefault.jpg',
      quality: 'hqdefault',
    },
    {
      label: 'Standard Quality',
      resolution: '640x480',
      size: 'SD',
      url: baseUrl + 'sddefault.jpg',
      quality: 'sddefault',
    },
    {
      label: 'Medium Quality',
      resolution: '320x180',
      size: 'MQ',
      url: baseUrl + 'mqdefault.jpg',
      quality: 'mqdefault',
    },
    {
      label: 'Default',
      resolution: '120x90',
      size: 'Default',
      url: baseUrl + 'default.jpg',
      quality: 'default',
    },
  ];
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) { return '0 B'; }
  var k = 1024;
  var sizes = ['B', 'KB', 'MB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default function YouTubeThumbnailDownloader() {
  var _a = useState('');
  var url = _a[0];
  var setUrl = _a[1];
  var _b = useState<string | null>(null);
  var videoId = _b[0];
  var setVideoId = _b[1];
  var _c = useState<ThumbnailOption[]>([]);
  var thumbnails = _c[0];
  var setThumbnails = _c[1];
  var _d = useState<string | null>(null);
  var error = _d[0];
  var setError = _d[1];
  var _e = useState(false);
  var loading = _e[0];
  var setLoading = _e[1];
  var _f = useState<Record<string, boolean>>({});
  var loadedImages = _f[0];
  var setLoadedImages = _f[1];
  var _g = useState<Record<string, number>>({});
  var imageSizes = _g[0];
  var setImageSizes = _g[1];
  var _h = useState(false);
  var copiedId = _h[0];
  var setCopiedId = _h[1];

  var handleFetchThumbnails = useCallback(async function() {
    setError(null);
    setLoadedImages({});
    setImageSizes({});
    if (url.trim() === '') {
      setError('Please enter a YouTube video URL');
      return;
    }
    var id = extractVideoId(url.trim());
    if (id === null) {
      setError('Invalid YouTube URL. Please enter a valid YouTube video link.');
      return;
    }
    setVideoId(id);
    setLoading(true);
    var options = getThumbnailOptions(id);
    setThumbnails(options);
    var loadPromises = options.map(function(opt) {
      return new Promise<void>(function(resolve) {
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
          setLoadedImages(function(prev) {
            var copy: Record<string, boolean> = {};
            for (var key in prev) { copy[key] = prev[key]; }
            copy[opt.quality] = true;
            return copy;
          });
          fetch(opt.url)
            .then(function(res) {
              var length = res.headers.get('content-length');
              if (length !== null) {
                setImageSizes(function(prev) {
                  var copy: Record<string, number> = {};
                  for (var key in prev) { copy[key] = prev[key]; }
                  copy[opt.quality] = parseInt(length, 10);
                  return copy;
                });
                resolve();
              } else {
                try {
                  var canvas = document.createElement('canvas');
                  canvas.width = img.naturalWidth;
                  canvas.height = img.naturalHeight;
                  var ctx = canvas.getContext('2d');
                  if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob(function(blob) {
                      if (blob) {
                        setImageSizes(function(prev) {
                          var copy: Record<string, number> = {};
                          for (var key in prev) { copy[key] = prev[key]; }
                          copy[opt.quality] = blob.size;
                          return copy;
                        });
                      }
                      resolve();
                    }, 'image/jpeg');
                  } else {
                    resolve();
                  }
                } catch (_) {
                  resolve();
                }
              }
            })
            .catch(function() { resolve(); });
        };
        img.onerror = function() {
          setLoadedImages(function(prev) {
            var copy: Record<string, boolean> = {};
            for (var key in prev) { copy[key] = prev[key]; }
            copy[opt.quality] = false;
            return copy;
          });
          resolve();
        };
        img.src = opt.url;
      });
    });
    await Promise.all(loadPromises);
    setLoading(false);
  }, [url]);

  var handleDownload = useCallback(async function(thumbnail: ThumbnailOption) {
    if (!videoId) return;
    openDownloadAd();
    try {
      var response = await fetch(thumbnail.url);
      var blob = await response.blob();
      var blobUrl = URL.createObjectURL(blob);
      var link = document.createElement('a');
      var filename = 'youtube-thumbnail-' + videoId + '-' + thumbnail.quality + '.jpg';
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(function() { URL.revokeObjectURL(blobUrl); }, 2000);
    } catch (_) {
      window.open(thumbnail.url, '_blank');
    }
  }, [videoId]);

  var handleCopyVideoId = useCallback(function() {
    if (videoId !== null) {
      navigator.clipboard.writeText(videoId!);
      setCopiedId(true);
      setTimeout(function() { setCopiedId(false); }, 2000);
    }
  }, [videoId]);

  var handleKeyDown = useCallback(function(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleFetchThumbnails();
    }
  }, [handleFetchThumbnails]);

  const seoProps = {
    title: 'YouTube Thumbnail Downloader — Download High-Quality Video Thumbnails | ImageSandboxX',
    description: 'Download YouTube video thumbnails in all available resolutions — from maxresdefault (1920x1080) to default (120x90). Free, fast, and private. No signup needed.',
    canonicalUrl: 'https://imagesandboxx.online/youtube-thumbnail-downloader',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'YouTube Thumbnail Downloader',
      alternateName: ['YouTube Video Thumbnail Grabber', 'Free YouTube Thumbnail Downloader'],
      url: 'https://imagesandboxx.online/youtube-thumbnail-downloader',
      image: 'https://imagesandboxx.online/logo.svg',
      description: 'Download YouTube thumbnails in all available sizes: maxresdefault (1920x1080), hqdefault (480x360), sddefault (640x480), mqdefault (320x180), and default (120x90). Free, private, no upload needed.',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires HTML5, modern browser with canvas support.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Download YouTube thumbnails at original quality',
        'All available resolutions detected automatically',
        '100% free and private — no server uploads',
        'Supports youtube.com, youtu.be, shorts, embed links',
        'Instant download with original file size displayed',
      ],
    },
    faqJsonLd: [
      {
        question: 'How do I download a YouTube thumbnail?',
        answer: 'Simply paste the YouTube video URL into the input field and click "Fetch Thumbnails". The tool automatically detects all available thumbnail resolutions. Click "Download Thumbnail" on the desired quality to save it to your device.',
      },
      {
        question: 'What thumbnail resolutions are available?',
        answer: 'YouTube generates five thumbnail sizes: maxresdefault (1920x1080, best quality), hqdefault (480x360), sddefault (640x480), mqdefault (320x180), and default (120x90). Not all videos have the maxresdefault version; the tool shows which are available.',
      },
      {
        question: 'Is this YouTube thumbnail downloader free?',
        answer: 'Yes, it is 100% free with no limits or hidden charges. All processing happens client-side in your browser, and no files are uploaded to any server.',
      },
      {
        question: 'Which YouTube URL formats are supported?',
        answer: 'The tool supports all standard YouTube URL formats: youtube.com/watch?v=, youtu.be/, youtube.com/embed/, youtube.com/shorts/, and youtube.com/v/.',
      },
      {
        question: 'Can I use thumbnails for commercial projects?',
        answer: 'YouTube thumbnails are owned by the video creator or YouTube. Please check the copyright and fair use policies before using thumbnails for commercial purposes.',
      },
    ],
  };

  return (
    <PageLayout title="YouTube Thumbnail Downloader" seo={seoProps}>
      <div className="w-full max-w-6xl space-y-8 relative z-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shadow-sm">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-slate-900">YouTube Thumbnail Downloader</h2>
              <p className="text-sm text-slate-500">Download high-quality thumbnails from any YouTube video instantly</p>
            </div>
          </div>
          <div className="space-y-3">
            <label htmlFor="youtube-url" className="text-sm font-semibold text-slate-700">YouTube Video URL</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  id="youtube-url"
                  type="text"
                  value={url}
                  onChange={function(e) { setUrl(e.target.value); }}
                  onKeyDown={handleKeyDown}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-3 pl-11 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <Youtube className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
              <button onClick={handleFetchThumbnails} disabled={loading}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-bold rounded-xl shadow-md shadow-red-500/20 transition-all flex items-center gap-2 justify-center">
                {loading ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> Loading...</>
                ) : (
                  <><ImageIcon className="w-4 h-4" /> Fetch Thumbnails</>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-400">Supports youtube.com/watch, youtu.be, youtube.com/embed, and youtube.com/shorts links</p>
          </div>

          {error !== null && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200">
              <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
              <p className="text-sm text-rose-700 font-medium">{error}</p>
            </div>
          )}

          {videoId !== null && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Video ID:</span>
              <code className="text-sm font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">{videoId}</code>
              <button onClick={handleCopyVideoId} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors" title="Copy Video ID">
                {copiedId ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <a href={videoId ? 'https://www.youtube.com/watch?v=' + videoId : '#'} target="_blank" rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Open Video
              </a>
            </div>
          )}
        </div>

        {thumbnails.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-bold text-slate-900">Available Thumbnails</h3>
              <span className="text-xs text-slate-400 font-medium">
                {thumbnails.filter(function(t) { return loadedImages[t.quality]; }).length} of {thumbnails.length} available
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {thumbnails.map(function(thumbnail) {
                var isAvailable = loadedImages[thumbnail.quality];
                var size = imageSizes[thumbnail.quality];
                return (
                  <div
                    key={thumbnail.quality}
                    className={'bg-white rounded-2xl border overflow-hidden shadow-sm transition-all ' + (isAvailable === false ? 'border-slate-100 opacity-50' : 'border-slate-200 hover:shadow-md hover:border-blue-200')}
                  >
                    <div className="relative aspect-video bg-slate-100 overflow-hidden">
                      {isAvailable === undefined && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <RefreshCw className="w-6 h-6 text-slate-300 animate-spin" />
                        </div>
                      )}
                      {isAvailable && <img src={thumbnail.url} alt={thumbnail.label + ' thumbnail'} className="w-full h-full object-cover" loading="lazy" />}
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-slate-800">{thumbnail.label}</h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 font-semibold">{thumbnail.size}</span>
                            <span>{thumbnail.resolution}</span>
                            {size !== undefined && (
                              <><span className="w-1 h-1 rounded-full bg-slate-300" /><span className="font-medium">{formatFileSize(size)}</span></>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <button onClick={function() { handleDownload(thumbnail); }} disabled={!isAvailable}
                            className={'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ' + (isAvailable ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed')}>
                            <Download className="w-4 h-4" /> {isAvailable ? 'Download' : 'Unavailable'}
                          </button>
                          {isAvailable && (
                            <Link
                              to={thumbnail.url ? '/youtube-thumbnail-editor?src=' + encodeURIComponent(thumbnail.url) : '#'}
                              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-500/20 transition-all"
                            >
                              <PencilLine className="w-4 h-4" />
                              Edit
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-display font-bold text-slate-900">About YouTube Thumbnails</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              YouTube generates multiple thumbnail sizes for every video. The highest quality available is usually
              <strong className="text-slate-800"> maxresdefault</strong> (1920x1080), but not all videos have this
              resolution. The tool automatically detects which sizes are available for your video.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-slate-800 text-sm">Available Qualities</h4>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li><strong className="text-slate-700">maxresdefault</strong> &mdash; 1920x1080 (Best quality)</li>
                <li><strong className="text-slate-700">hqdefault</strong> &mdash; 480x360 (High quality)</li>
                <li><strong className="text-slate-700">sddefault</strong> &mdash; 640x480 (Standard quality)</li>
                <li><strong className="text-slate-700">mqdefault</strong> &mdash; 320x180 (Medium quality)</li>
                <li><strong className="text-slate-700">default</strong> &mdash; 120x90 (Low quality)</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-slate-800 text-sm">Features</h4>
              <ul className="space-y-1.5 text-xs text-slate-500">
                <li>&check; 100% free and private &mdash; no server uploads</li>
                <li>&check; All thumbnail sizes detected automatically</li>
                <li>&check; Direct download with original quality</li>
                <li>&check; Supports all YouTube URL formats</li>
                <li>&check; Works offline after page load</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
