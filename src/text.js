import mb2css from 'mapbox-to-css-font';
import {WORKER_OFFSCREEN_CANVAS} from 'ol/has.js';
import {checkedFonts} from 'ol/render/canvas.js';
import {createCanvas} from './util.js';

const hairSpacePool = Array(256).join('\u200A');
export function applyLetterSpacing(text, letterSpacing) {
  if (letterSpacing >= 0.05) {
    let textWithLetterSpacing = '';
    const lines = text.split('\n');
    const joinSpaceString = hairSpacePool.slice(
      0,
      Math.round(letterSpacing / 0.1),
    );
    for (let l = 0, ll = lines.length; l < ll; ++l) {
      if (l > 0) {
        textWithLetterSpacing += '\n';
      }
      textWithLetterSpacing += lines[l].split('').join(joinSpaceString);
    }
    return textWithLetterSpacing;
  }
  return text;
}

let measureContext;
function getMeasureContext() {
  if (!measureContext) {
    measureContext = createCanvas(1, 1).getContext('2d');
  }
  return measureContext;
}

function measureText(text, letterSpacing) {
  return (
    getMeasureContext().measureText(text).width +
    (text.length - 1) * letterSpacing
  );
}

const measureCache = {};
checkedFonts.on('propertychange', () => {
  for (const key in measureCache) {
    delete measureCache[key];
  }
});

export function wrapText(text, font, em, letterSpacing) {
  if (text.indexOf('\n') !== -1) {
    const hardLines = text.split('\n');
    const lines = [];
    for (let i = 0, ii = hardLines.length; i < ii; ++i) {
      lines.push(wrapText(hardLines[i], font, em, letterSpacing));
    }
    return lines.join('\n');
  }
  const key = em + ',' + font + ',' + text + ',' + letterSpacing;
  let wrappedText = measureCache[key];
  if (!wrappedText) {
    const words = text.split(' ');
    if (words.length > 1) {
      const ctx = getMeasureContext();
      ctx.font = font;
      const oneEm = ctx.measureText('M').width;
      const maxWidth = oneEm * em;
      let line = '';
      const lines = [];
      // Pass 1 - wrap lines to not exceed maxWidth
      for (let i = 0, ii = words.length; i < ii; ++i) {
        const word = words[i];
        const testLine = line + (line ? ' ' : '') + word;
        if (measureText(testLine, letterSpacing) <= maxWidth) {
          line = testLine;
        } else {
          if (line) {
            lines.push(line);
          }
          line = word;
        }
      }
      if (line) {
        lines.push(line);
      }
      // Pass 2 - add lines with a width of less than 30% of maxWidth to the previous or next line
      for (let i = 0, ii = lines.length; i < ii && ii > 1; ++i) {
        const line = lines[i];
        if (measureText(line, letterSpacing) < maxWidth * 0.35) {
          const prevWidth =
            i > 0 ? measureText(lines[i - 1], letterSpacing) : Infinity;
          const nextWidth =
            i < ii - 1 ? measureText(lines[i + 1], letterSpacing) : Infinity;
          lines.splice(i, 1);
          ii -= 1;
          if (prevWidth < nextWidth) {
            lines[i - 1] += ' ' + line;
            i -= 1;
          } else {
            lines[i] = line + ' ' + lines[i];
          }
        }
      }
      // Pass 3 - try to fill 80% of maxWidth for each line
      for (let i = 0, ii = lines.length - 1; i < ii; ++i) {
        const line = lines[i];
        const next = lines[i + 1];
        if (
          measureText(line, letterSpacing) > maxWidth * 0.7 &&
          measureText(next, letterSpacing) < maxWidth * 0.6
        ) {
          const lineWords = line.split(' ');
          const lastWord = lineWords.pop();
          if (measureText(lastWord, letterSpacing) < maxWidth * 0.2) {
            lines[i] = lineWords.join(' ');
            lines[i + 1] = lastWord + ' ' + next;
          }
          ii -= 1;
        }
      }
      wrappedText = lines.join('\n');
    } else {
      wrappedText = text;
    }
    wrappedText = applyLetterSpacing(wrappedText, letterSpacing);
    measureCache[key] = wrappedText;
  }
  return wrappedText;
}

const webSafeFonts = [
  'Arial',
  'Courier New',
  'Times New Roman',
  'Verdana',
  'sans-serif',
  'serif',
  'monospace',
  'cursive',
  'fantasy',
];

const processedFontFamilies = {};

/**
 * @param {Array} fonts Fonts.
 * @param {string} [templateUrl] Template URL.
 * @return {Array} Processed fonts.
 * @private
 */
export function getFonts(
  fonts,
  templateUrl = 'https://cdn.jsdelivr.net/npm/@fontsource/{font-family}/{fontweight}{-fontstyle}.css',
) {
  if (WORKER_OFFSCREEN_CANVAS) {
    //FIXME Font handling in web workers
    return fonts;
  }
  let fontDescriptions;
  for (let i = 0, ii = fonts.length; i < ii; ++i) {
    const font = fonts[i];
    if (font in processedFontFamilies) {
      continue;
    }
    processedFontFamilies[font] = true;
    const cssFont = mb2css(font, 16);
    const parts = cssFont.split(' ');
    if (!fontDescriptions) {
      fontDescriptions = [];
    }
    fontDescriptions.push([
      parts.slice(3).join(' ').replace(/"/g, ''),
      parts[1],
      parts[0],
    ]);
  }
  if (!fontDescriptions) {
    return fonts;
  }

  (async () => {
    await document.fonts.ready;
    for (let i = 0, ii = fontDescriptions.length; i < ii; ++i) {
      const fontDescription = fontDescriptions[i];
      const family = fontDescription[0];
      if (webSafeFonts.includes(family)) {
        continue;
      }
      const weight = fontDescription[1];
      const style = fontDescription[2];
      const loaded = await document.fonts.load(
        `${style} ${weight} 16px "${family}"`,
      );
      if (
        !loaded.some(
          (f) =>
            f.family.replace(/^['"]|['"]$/g, '').toLowerCase() ===
              family.toLowerCase() &&
            f.weight == weight &&
            f.style === style,
        )
      ) {
        const fontUrl = templateUrl
          .replace('{font-family}', family.replace(/ /g, '-').toLowerCase())
          .replace('{Font+Family}', family.replace(/ /g, '+'))
          .replace('{fontweight}', weight)
          .replace(
            '{-fontstyle}',
            style.replace('normal', '').replace(/(.+)/, '-$1'),
          )
          .replace('{fontstyle}', style);
        if (!document.querySelector('link[href="' + fontUrl + '"]')) {
          const markup = document.createElement('link');
          markup.href = fontUrl;
          markup.rel = 'stylesheet';
          document.head.appendChild(markup);
        }
      }
    }
  })();

  return fonts;
}
