import mb2css from 'mapbox-to-css-font';
import {checkedFonts, registerFont} from 'ol/render/canvas.js';
import {createCanvas} from './util.js';

const hairSpacePool = Array(256).join('\u200A');
export function applyLetterSpacing(text, letterSpacing) {
  if (letterSpacing >= 0.05) {
    let textWithLetterSpacing = '';
    const lines = text.split('\n');
    const joinSpaceString = hairSpacePool.slice(
      0,
      Math.round(letterSpacing / 0.1)
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

const fontFamilyRegEx = /font-family: ?([^;]*);/;
const stripQuotesRegEx = /("|')/g;
let loadedFontFamilies;
function hasFontFamily(family) {
  if (!loadedFontFamilies) {
    loadedFontFamilies = {};
    const styleSheets = document.styleSheets;
    for (let i = 0, ii = styleSheets.length; i < ii; ++i) {
      const styleSheet = /** @type {CSSStyleSheet} */ (styleSheets[i]);
      try {
        const cssRules = styleSheet.rules || styleSheet.cssRules;
        if (cssRules) {
          for (let j = 0, jj = cssRules.length; j < jj; ++j) {
            const cssRule = cssRules[j];
            if (cssRule.type == 5) {
              const match = cssRule.cssText.match(fontFamilyRegEx);
              loadedFontFamilies[match[1].replace(stripQuotesRegEx, '')] = true;
            }
          }
        }
      } catch (e) {
        // empty catch block
      }
    }
  }
  return family in loadedFontFamilies;
}

const processedFontFamilies = {};

/**
 * @param {Array} fonts Fonts.
 * @return {Array} Processed fonts.
 * @private
 */
export function getFonts(fonts) {
  const fontsKey = fonts.toString();
  if (fontsKey in processedFontFamilies) {
    return processedFontFamilies[fontsKey];
  }
  const googleFontDescriptions = [];
  for (let i = 0, ii = fonts.length; i < ii; ++i) {
    fonts[i] = fonts[i].replace('Arial Unicode MS', 'Arial');
    const font = fonts[i];
    const cssFont = mb2css(font, 1);
    registerFont(cssFont);
    const parts = cssFont.split(' ');
    googleFontDescriptions.push([
      parts.slice(3).join(' ').replace(/"/g, ''),
      parts[1],
      parts[0],
    ]);
  }
  for (let i = 0, ii = googleFontDescriptions.length; i < ii; ++i) {
    const googleFontDescription = googleFontDescriptions[i];
    const family = googleFontDescription[0];
    if (!hasFontFamily(family)) {
      if (
        checkedFonts.get(
          `${googleFontDescription[2]}\n${googleFontDescription[1]} \n${family}`
        ) !== 100
      ) {
        const fontUrl =
          'https://fonts.googleapis.com/css?family=' +
          family.replace(/ /g, '+') +
          ':' +
          googleFontDescription[1] +
          googleFontDescription[2];
        if (!document.querySelector('link[href="' + fontUrl + '"]')) {
          const markup = document.createElement('link');
          markup.href = fontUrl;
          markup.rel = 'stylesheet';
          document.head.appendChild(markup);
        }
      }
    }
  }
  processedFontFamilies[fontsKey] = fonts;
  return fonts;
}
