import { listen } from 'ol/events';
import EventType from 'ol/events/EventType';
import { labelCache } from 'ol/render/canvas';
export function deg2rad(degrees) {
    return degrees * Math.PI / 180;
}
export var defaultResolutions = (function () {
    var resolutions = [];
    for (var res = 78271.51696402048; resolutions.length <= 24; res /= 2) {
        resolutions.push(res);
    }
    return resolutions;
})();
export function getZoomForResolution(resolution, resolutions) {
    var i = 0;
    var ii = resolutions.length;
    for (; i < ii; ++i) {
        var candidate = resolutions[i];
        if (candidate < resolution && i + 1 < ii) {
            var zoomFactor = resolutions[i] / resolutions[i + 1];
            return i + Math.log(resolutions[i] / resolution) / Math.log(zoomFactor);
        }
    }
    return ii - 1;
}
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
var ctx = /** @type {HTMLCanvasElement} */ (document.createElement('CANVAS')).getContext('2d');
function measureText(text, letterSpacing) {
    return ctx.measureText(text).width + (text.length - 1) * letterSpacing;
}
var measureCache = {};
if (labelCache) {
    // Only available when using ES modules
    listen(labelCache, EventType.CLEAR, function () {
        measureCache = {};
    });
}
export function wrapText(text, font, em, letterSpacing) {
    var key = em + ',' + font + ',' + text + ',' + letterSpacing;
    var wrappedText = measureCache[key];
    if (!wrappedText) {
        var words = text.split(' ');
        if (words.length > 1) {
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
            for (var i = 0, ii = lines.length; i < ii; ++i) {
                var line_1 = lines[i];
                if (measureText(line_1, letterSpacing) < maxWidth * 0.35) {
                    var prevWidth = i > 0 ? measureText(lines[i - 1], letterSpacing) : Infinity;
                    var nextWidth = i < ii - 1 ? measureText(lines[i + 1], letterSpacing) : Infinity;
                    lines.splice(i, 1);
                    if (prevWidth < nextWidth) {
                        lines[i - 1] += ' ' + line_1;
                        i -= 1;
                    }
                    else {
                        lines[i] = line_1 + ' ' + lines[i];
                    }
                    ii -= 1;
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
//# sourceMappingURL=util.js.map