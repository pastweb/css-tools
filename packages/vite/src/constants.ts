export const CLASS_NAME_RE = /(^|[^\\]):global\(\s*([^)]+)\s*\)|:global\s+\.([\w-\$]+)|\.([\w-\$]+)/g;
export const CSS_LANGS_RE = /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/;
export const INLINE_RE = /[?&]inline\b/;

export const CLIENT_PUBLIC_PATH = `/@vite/client`;
