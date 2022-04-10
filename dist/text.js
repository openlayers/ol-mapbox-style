import googleFonts from 'webfont-matcher/lib/fonts/google.js';
import mb2css from 'mapbox-to-css-font';
import { createCanvas } from './util.js';
var hairSpacePool = Array(256).join('\u200A');
export function applyLetterSpacing(text, letterSpacing) {
    if (letterSpacing >= 0.05) {
        var textWithLetterSpacing = '';
        var lines = text.split('\n');
        var joinSpaceString = hairSpacePool.slice(0, Math.round(letterSpacing / 0.1));
        for (var l = 0, ll = lines.length; l < ll; ++l) {
            if (l > 0) {
                textWithLetterSpacing += '\n';
            }
            textWithLetterSpacing += lines[l].split('').join(joinSpaceString);
        }
        return textWithLetterSpacing;
    }
    return text;
}
var measureContext;
function getMeasureContext() {
    if (!measureContext) {
        measureContext = createCanvas(1, 1).getContext('2d');
    }
    return measureContext;
}
function measureText(text, letterSpacing) {
    return (getMeasureContext().measureText(text).width +
        (text.length - 1) * letterSpacing);
}
var measureCache = {};
export function wrapText(text, font, em, letterSpacing) {
    if (text.indexOf('\n') !== -1) {
        var hardLines = text.split('\n');
        var lines = [];
        for (var i = 0, ii = hardLines.length; i < ii; ++i) {
            lines.push(wrapText(hardLines[i], font, em, letterSpacing));
        }
        return lines.join('\n');
    }
    var key = em + ',' + font + ',' + text + ',' + letterSpacing;
    var wrappedText = measureCache[key];
    if (!wrappedText) {
        var words = text.split(' ');
        if (words.length > 1) {
            var ctx = getMeasureContext();
            ctx.font = font;
            var oneEm = ctx.measureText('M').width;
            var maxWidth = oneEm * em;
            var line = '';
            var lines = [];
            // Pass 1 - wrap lines to not exceed maxWidth
            for (var i = 0, ii = words.length; i < ii; ++i) {
                var word = words[i];
                var testLine = line + (line ? ' ' : '') + word;
                if (measureText(testLine, letterSpacing) <= maxWidth) {
                    line = testLine;
                }
                else {
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
            for (var i = 0, ii = lines.length; i < ii && ii > 1; ++i) {
                var line_1 = lines[i];
                if (measureText(line_1, letterSpacing) < maxWidth * 0.35) {
                    var prevWidth = i > 0 ? measureText(lines[i - 1], letterSpacing) : Infinity;
                    var nextWidth = i < ii - 1 ? measureText(lines[i + 1], letterSpacing) : Infinity;
                    lines.splice(i, 1);
                    ii -= 1;
                    if (prevWidth < nextWidth) {
                        lines[i - 1] += ' ' + line_1;
                        i -= 1;
                    }
                    else {
                        lines[i] = line_1 + ' ' + lines[i];
                    }
                }
            }
            // Pass 3 - try to fill 80% of maxWidth for each line
            for (var i = 0, ii = lines.length - 1; i < ii; ++i) {
                var line_2 = lines[i];
                var next = lines[i + 1];
                if (measureText(line_2, letterSpacing) > maxWidth * 0.7 &&
                    measureText(next, letterSpacing) < maxWidth * 0.6) {
                    var lineWords = line_2.split(' ');
                    var lastWord = lineWords.pop();
                    if (measureText(lastWord, letterSpacing) < maxWidth * 0.2) {
                        lines[i] = lineWords.join(' ');
                        lines[i + 1] = lastWord + ' ' + next;
                    }
                    ii -= 1;
                }
            }
            wrappedText = lines.join('\n');
        }
        else {
            wrappedText = text;
        }
        wrappedText = applyLetterSpacing(wrappedText, letterSpacing);
        measureCache[key] = wrappedText;
    }
    return wrappedText;
}
var fontFamilyRegEx = /font-family: ?([^;]*);/;
var stripQuotesRegEx = /("|')/g;
var loadedFontFamilies;
function hasFontFamily(family) {
    if (!loadedFontFamilies) {
        loadedFontFamilies = {};
        var styleSheets = document.styleSheets;
        for (var i = 0, ii = styleSheets.length; i < ii; ++i) {
            var styleSheet = /** @type {CSSStyleSheet} */ (styleSheets[i]);
            try {
                var cssRules = styleSheet.rules || styleSheet.cssRules;
                if (cssRules) {
                    for (var j = 0, jj = cssRules.length; j < jj; ++j) {
                        var cssRule = cssRules[j];
                        if (cssRule.type == 5) {
                            var match = cssRule.cssText.match(fontFamilyRegEx);
                            loadedFontFamilies[match[1].replace(stripQuotesRegEx, '')] = true;
                        }
                    }
                }
            }
            catch (e) {
                // empty catch block
            }
        }
    }
    return family in loadedFontFamilies;
}
var processedFontFamilies = {};
var googleFamilies = googleFonts.getNames();
/**
 * @param {Array} fonts Fonts.
 * @return {Array} Processed fonts.
 * @private
 */
export function getFonts(fonts) {
    var fontsKey = fonts.toString();
    if (fontsKey in processedFontFamilies) {
        return fonts;
    }
    var googleFontDescriptions = fonts.map(function (font) {
        var parts = mb2css(font, 1).split(' ');
        return [parts.slice(3).join(' ').replace(/"/g, ''), parts[1] + parts[0]];
    });
    for (var i = 0, ii = googleFontDescriptions.length; i < ii; ++i) {
        var googleFontDescription = googleFontDescriptions[i];
        var family = googleFontDescription[0];
        if (!hasFontFamily(family) && googleFamilies.indexOf(family) !== -1) {
            var fontUrl = 'https://fonts.googleapis.com/css?family=' +
                family.replace(/ /g, '+') +
                ':' +
                googleFontDescription[1];
            if (!document.querySelector('link[href="' + fontUrl + '"]')) {
                var markup = document.createElement('link');
                markup.href = fontUrl;
                markup.rel = 'stylesheet';
                document.head.appendChild(markup);
            }
        }
    }
    processedFontFamilies[fontsKey] = true;
    return fonts;
}
//# sourceMappingURL=text.js.map