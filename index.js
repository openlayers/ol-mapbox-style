import Circle from 'ol/style/Circle.js';
import Fill from 'ol/style/Fill.js';
import Icon from 'ol/style/Icon.js';
import RenderFeature from 'ol/render/Feature.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style.js';
import Text from 'ol/style/Text.js';
import { toPromise } from 'ol/functions.js';
import { registerFont, checkedFonts } from 'ol/render/canvas.js';
import TileState from 'ol/TileState.js';
import { VectorTile } from 'ol';
import { getUid } from 'ol/util.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import ImageLayer from 'ol/layer/Image.js';
import Layer from 'ol/layer/Layer.js';
import LayerGroup from 'ol/layer/Group.js';
import MVT from 'ol/format/MVT.js';
import Map from 'ol/Map.js';
import Raster from 'ol/source/Raster.js';
import Source from 'ol/source/Source.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import TileJSON from 'ol/source/TileJSON.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource, { defaultLoadFunction } from 'ol/source/VectorTile.js';
import View from 'ol/View.js';
import { METERS_PER_UNIT } from 'ol/proj/Units.js';
import { bbox } from 'ol/loadingstrategy.js';
import { createXYZ } from 'ol/tilegrid.js';
import { get as get$1, getUserProjection, getPointResolution, fromLonLat, equivalent } from 'ol/proj.js';
import { getCenter, getTopLeft } from 'ol/extent.js';
import BaseEvent from 'ol/events/Event.js';
import EventType from 'ol/events/EventType.js';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var csscolorparser = {};

var parseCSSColor_1;
// (c) Dean McNamee <dean@gmail.com>, 2012.
//
// https://github.com/deanm/css-color-parser-js
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
// http://www.w3.org/TR/css3-color/
var kCSSColorTable = {
    'transparent': [
        0,
        0,
        0,
        0
    ],
    'aliceblue': [
        240,
        248,
        255,
        1
    ],
    'antiquewhite': [
        250,
        235,
        215,
        1
    ],
    'aqua': [
        0,
        255,
        255,
        1
    ],
    'aquamarine': [
        127,
        255,
        212,
        1
    ],
    'azure': [
        240,
        255,
        255,
        1
    ],
    'beige': [
        245,
        245,
        220,
        1
    ],
    'bisque': [
        255,
        228,
        196,
        1
    ],
    'black': [
        0,
        0,
        0,
        1
    ],
    'blanchedalmond': [
        255,
        235,
        205,
        1
    ],
    'blue': [
        0,
        0,
        255,
        1
    ],
    'blueviolet': [
        138,
        43,
        226,
        1
    ],
    'brown': [
        165,
        42,
        42,
        1
    ],
    'burlywood': [
        222,
        184,
        135,
        1
    ],
    'cadetblue': [
        95,
        158,
        160,
        1
    ],
    'chartreuse': [
        127,
        255,
        0,
        1
    ],
    'chocolate': [
        210,
        105,
        30,
        1
    ],
    'coral': [
        255,
        127,
        80,
        1
    ],
    'cornflowerblue': [
        100,
        149,
        237,
        1
    ],
    'cornsilk': [
        255,
        248,
        220,
        1
    ],
    'crimson': [
        220,
        20,
        60,
        1
    ],
    'cyan': [
        0,
        255,
        255,
        1
    ],
    'darkblue': [
        0,
        0,
        139,
        1
    ],
    'darkcyan': [
        0,
        139,
        139,
        1
    ],
    'darkgoldenrod': [
        184,
        134,
        11,
        1
    ],
    'darkgray': [
        169,
        169,
        169,
        1
    ],
    'darkgreen': [
        0,
        100,
        0,
        1
    ],
    'darkgrey': [
        169,
        169,
        169,
        1
    ],
    'darkkhaki': [
        189,
        183,
        107,
        1
    ],
    'darkmagenta': [
        139,
        0,
        139,
        1
    ],
    'darkolivegreen': [
        85,
        107,
        47,
        1
    ],
    'darkorange': [
        255,
        140,
        0,
        1
    ],
    'darkorchid': [
        153,
        50,
        204,
        1
    ],
    'darkred': [
        139,
        0,
        0,
        1
    ],
    'darksalmon': [
        233,
        150,
        122,
        1
    ],
    'darkseagreen': [
        143,
        188,
        143,
        1
    ],
    'darkslateblue': [
        72,
        61,
        139,
        1
    ],
    'darkslategray': [
        47,
        79,
        79,
        1
    ],
    'darkslategrey': [
        47,
        79,
        79,
        1
    ],
    'darkturquoise': [
        0,
        206,
        209,
        1
    ],
    'darkviolet': [
        148,
        0,
        211,
        1
    ],
    'deeppink': [
        255,
        20,
        147,
        1
    ],
    'deepskyblue': [
        0,
        191,
        255,
        1
    ],
    'dimgray': [
        105,
        105,
        105,
        1
    ],
    'dimgrey': [
        105,
        105,
        105,
        1
    ],
    'dodgerblue': [
        30,
        144,
        255,
        1
    ],
    'firebrick': [
        178,
        34,
        34,
        1
    ],
    'floralwhite': [
        255,
        250,
        240,
        1
    ],
    'forestgreen': [
        34,
        139,
        34,
        1
    ],
    'fuchsia': [
        255,
        0,
        255,
        1
    ],
    'gainsboro': [
        220,
        220,
        220,
        1
    ],
    'ghostwhite': [
        248,
        248,
        255,
        1
    ],
    'gold': [
        255,
        215,
        0,
        1
    ],
    'goldenrod': [
        218,
        165,
        32,
        1
    ],
    'gray': [
        128,
        128,
        128,
        1
    ],
    'green': [
        0,
        128,
        0,
        1
    ],
    'greenyellow': [
        173,
        255,
        47,
        1
    ],
    'grey': [
        128,
        128,
        128,
        1
    ],
    'honeydew': [
        240,
        255,
        240,
        1
    ],
    'hotpink': [
        255,
        105,
        180,
        1
    ],
    'indianred': [
        205,
        92,
        92,
        1
    ],
    'indigo': [
        75,
        0,
        130,
        1
    ],
    'ivory': [
        255,
        255,
        240,
        1
    ],
    'khaki': [
        240,
        230,
        140,
        1
    ],
    'lavender': [
        230,
        230,
        250,
        1
    ],
    'lavenderblush': [
        255,
        240,
        245,
        1
    ],
    'lawngreen': [
        124,
        252,
        0,
        1
    ],
    'lemonchiffon': [
        255,
        250,
        205,
        1
    ],
    'lightblue': [
        173,
        216,
        230,
        1
    ],
    'lightcoral': [
        240,
        128,
        128,
        1
    ],
    'lightcyan': [
        224,
        255,
        255,
        1
    ],
    'lightgoldenrodyellow': [
        250,
        250,
        210,
        1
    ],
    'lightgray': [
        211,
        211,
        211,
        1
    ],
    'lightgreen': [
        144,
        238,
        144,
        1
    ],
    'lightgrey': [
        211,
        211,
        211,
        1
    ],
    'lightpink': [
        255,
        182,
        193,
        1
    ],
    'lightsalmon': [
        255,
        160,
        122,
        1
    ],
    'lightseagreen': [
        32,
        178,
        170,
        1
    ],
    'lightskyblue': [
        135,
        206,
        250,
        1
    ],
    'lightslategray': [
        119,
        136,
        153,
        1
    ],
    'lightslategrey': [
        119,
        136,
        153,
        1
    ],
    'lightsteelblue': [
        176,
        196,
        222,
        1
    ],
    'lightyellow': [
        255,
        255,
        224,
        1
    ],
    'lime': [
        0,
        255,
        0,
        1
    ],
    'limegreen': [
        50,
        205,
        50,
        1
    ],
    'linen': [
        250,
        240,
        230,
        1
    ],
    'magenta': [
        255,
        0,
        255,
        1
    ],
    'maroon': [
        128,
        0,
        0,
        1
    ],
    'mediumaquamarine': [
        102,
        205,
        170,
        1
    ],
    'mediumblue': [
        0,
        0,
        205,
        1
    ],
    'mediumorchid': [
        186,
        85,
        211,
        1
    ],
    'mediumpurple': [
        147,
        112,
        219,
        1
    ],
    'mediumseagreen': [
        60,
        179,
        113,
        1
    ],
    'mediumslateblue': [
        123,
        104,
        238,
        1
    ],
    'mediumspringgreen': [
        0,
        250,
        154,
        1
    ],
    'mediumturquoise': [
        72,
        209,
        204,
        1
    ],
    'mediumvioletred': [
        199,
        21,
        133,
        1
    ],
    'midnightblue': [
        25,
        25,
        112,
        1
    ],
    'mintcream': [
        245,
        255,
        250,
        1
    ],
    'mistyrose': [
        255,
        228,
        225,
        1
    ],
    'moccasin': [
        255,
        228,
        181,
        1
    ],
    'navajowhite': [
        255,
        222,
        173,
        1
    ],
    'navy': [
        0,
        0,
        128,
        1
    ],
    'oldlace': [
        253,
        245,
        230,
        1
    ],
    'olive': [
        128,
        128,
        0,
        1
    ],
    'olivedrab': [
        107,
        142,
        35,
        1
    ],
    'orange': [
        255,
        165,
        0,
        1
    ],
    'orangered': [
        255,
        69,
        0,
        1
    ],
    'orchid': [
        218,
        112,
        214,
        1
    ],
    'palegoldenrod': [
        238,
        232,
        170,
        1
    ],
    'palegreen': [
        152,
        251,
        152,
        1
    ],
    'paleturquoise': [
        175,
        238,
        238,
        1
    ],
    'palevioletred': [
        219,
        112,
        147,
        1
    ],
    'papayawhip': [
        255,
        239,
        213,
        1
    ],
    'peachpuff': [
        255,
        218,
        185,
        1
    ],
    'peru': [
        205,
        133,
        63,
        1
    ],
    'pink': [
        255,
        192,
        203,
        1
    ],
    'plum': [
        221,
        160,
        221,
        1
    ],
    'powderblue': [
        176,
        224,
        230,
        1
    ],
    'purple': [
        128,
        0,
        128,
        1
    ],
    'rebeccapurple': [
        102,
        51,
        153,
        1
    ],
    'red': [
        255,
        0,
        0,
        1
    ],
    'rosybrown': [
        188,
        143,
        143,
        1
    ],
    'royalblue': [
        65,
        105,
        225,
        1
    ],
    'saddlebrown': [
        139,
        69,
        19,
        1
    ],
    'salmon': [
        250,
        128,
        114,
        1
    ],
    'sandybrown': [
        244,
        164,
        96,
        1
    ],
    'seagreen': [
        46,
        139,
        87,
        1
    ],
    'seashell': [
        255,
        245,
        238,
        1
    ],
    'sienna': [
        160,
        82,
        45,
        1
    ],
    'silver': [
        192,
        192,
        192,
        1
    ],
    'skyblue': [
        135,
        206,
        235,
        1
    ],
    'slateblue': [
        106,
        90,
        205,
        1
    ],
    'slategray': [
        112,
        128,
        144,
        1
    ],
    'slategrey': [
        112,
        128,
        144,
        1
    ],
    'snow': [
        255,
        250,
        250,
        1
    ],
    'springgreen': [
        0,
        255,
        127,
        1
    ],
    'steelblue': [
        70,
        130,
        180,
        1
    ],
    'tan': [
        210,
        180,
        140,
        1
    ],
    'teal': [
        0,
        128,
        128,
        1
    ],
    'thistle': [
        216,
        191,
        216,
        1
    ],
    'tomato': [
        255,
        99,
        71,
        1
    ],
    'turquoise': [
        64,
        224,
        208,
        1
    ],
    'violet': [
        238,
        130,
        238,
        1
    ],
    'wheat': [
        245,
        222,
        179,
        1
    ],
    'white': [
        255,
        255,
        255,
        1
    ],
    'whitesmoke': [
        245,
        245,
        245,
        1
    ],
    'yellow': [
        255,
        255,
        0,
        1
    ],
    'yellowgreen': [
        154,
        205,
        50,
        1
    ]
};
function clamp_css_byte(i) {
    // Clamp to integer 0 .. 255.
    i = Math.round(i);
    // Seems to be what Chrome does (vs truncation).
    return i < 0 ? 0 : i > 255 ? 255 : i;
}
function clamp_css_float(f) {
    // Clamp to float 0.0 .. 1.0.
    return f < 0 ? 0 : f > 1 ? 1 : f;
}
function parse_css_int(str) {
    // int or percentage.
    if (str[str.length - 1] === '%')
        return clamp_css_byte(parseFloat(str) / 100 * 255);
    return clamp_css_byte(parseInt(str));
}
function parse_css_float(str) {
    // float or percentage.
    if (str[str.length - 1] === '%')
        return clamp_css_float(parseFloat(str) / 100);
    return clamp_css_float(parseFloat(str));
}
function css_hue_to_rgb(m1, m2, h) {
    if (h < 0)
        h += 1;
    else if (h > 1)
        h -= 1;
    if (h * 6 < 1)
        return m1 + (m2 - m1) * h * 6;
    if (h * 2 < 1)
        return m2;
    if (h * 3 < 2)
        return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    return m1;
}
function parseCSSColor(css_str) {
    // Remove all whitespace, not compliant, but should just be more accepting.
    var str = css_str.replace(/ /g, '').toLowerCase();
    // Color keywords (and transparent) lookup.
    if (str in kCSSColorTable)
        return kCSSColorTable[str].slice();
    // dup.
    // #abc and #abc123 syntax.
    if (str[0] === '#') {
        if (str.length === 4) {
            var iv = parseInt(str.substr(1), 16);
            // TODO(deanm): Stricter parsing.
            if (!(iv >= 0 && iv <= 4095))
                return null;
            // Covers NaN.
            return [
                (iv & 3840) >> 4 | (iv & 3840) >> 8,
                iv & 240 | (iv & 240) >> 4,
                iv & 15 | (iv & 15) << 4,
                1
            ];
        } else if (str.length === 7) {
            var iv = parseInt(str.substr(1), 16);
            // TODO(deanm): Stricter parsing.
            if (!(iv >= 0 && iv <= 16777215))
                return null;
            // Covers NaN.
            return [
                (iv & 16711680) >> 16,
                (iv & 65280) >> 8,
                iv & 255,
                1
            ];
        }
        return null;
    }
    var op = str.indexOf('('), ep = str.indexOf(')');
    if (op !== -1 && ep + 1 === str.length) {
        var fname = str.substr(0, op);
        var params = str.substr(op + 1, ep - (op + 1)).split(',');
        var alpha = 1;
        // To allow case fallthrough.
        switch (fname) {
        case 'rgba':
            if (params.length !== 4)
                return null;
            alpha = parse_css_float(params.pop());
        // Fall through.
        case 'rgb':
            if (params.length !== 3)
                return null;
            return [
                parse_css_int(params[0]),
                parse_css_int(params[1]),
                parse_css_int(params[2]),
                alpha
            ];
        case 'hsla':
            if (params.length !== 4)
                return null;
            alpha = parse_css_float(params.pop());
        // Fall through.
        case 'hsl':
            if (params.length !== 3)
                return null;
            var h = (parseFloat(params[0]) % 360 + 360) % 360 / 360;
            // 0 .. 1
            // NOTE(deanm): According to the CSS spec s/l should only be
            // percentages, but we don't bother and let float or percentage.
            var s = parse_css_float(params[1]);
            var l = parse_css_float(params[2]);
            var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
            var m1 = l * 2 - m2;
            return [
                clamp_css_byte(css_hue_to_rgb(m1, m2, h + 1 / 3) * 255),
                clamp_css_byte(css_hue_to_rgb(m1, m2, h) * 255),
                clamp_css_byte(css_hue_to_rgb(m1, m2, h - 1 / 3) * 255),
                alpha
            ];
        default:
            return null;
        }
    }
    return null;
}
try {
    parseCSSColor_1 = csscolorparser.parseCSSColor = parseCSSColor;
} catch (e) {
}

//      
/**
 * An RGBA color value. Create instances from color strings using the static
 * method `Color.parse`. The constructor accepts RGB channel values in the range
 * `[0, 1]`, premultiplied by A.
 *
 * @param {number} r The red channel.
 * @param {number} g The green channel.
 * @param {number} b The blue channel.
 * @param {number} a The alpha channel.
 * @private
 */
class Color {
    constructor(r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /**
     * Parses valid CSS color strings and returns a `Color` instance.
     * @returns A `Color` instance, or `undefined` if the input is not a valid color string.
     */
    static parse(input) {
        if (!input) {
            return undefined;
        }
        if (input instanceof Color) {
            return input;
        }
        if (typeof input !== 'string') {
            return undefined;
        }
        const rgba = parseCSSColor_1(input);
        if (!rgba) {
            return undefined;
        }
        return new Color(rgba[0] / 255 * rgba[3], rgba[1] / 255 * rgba[3], rgba[2] / 255 * rgba[3], rgba[3]);
    }
    /**
     * Returns an RGBA string representing the color value.
     *
     * @returns An RGBA string.
     * @example
     * var purple = new Color.parse('purple');
     * purple.toString; // = "rgba(128,0,128,1)"
     * var translucentGreen = new Color.parse('rgba(26, 207, 26, .73)');
     * translucentGreen.toString(); // = "rgba(26,207,26,0.73)"
     */
    toString() {
        const [r, g, b, a] = this.toArray();
        return `rgba(${ Math.round(r) },${ Math.round(g) },${ Math.round(b) },${ a })`;
    }
    /**
     * Returns an RGBA array of values representing the color, unpremultiplied by A.
     *
     * @returns An array of RGBA color values in the range [0, 255].
     */
    toArray() {
        const {r, g, b, a} = this;
        return a === 0 ? [
            0,
            0,
            0,
            0
        ] : [
            r * 255 / a,
            g * 255 / a,
            b * 255 / a,
            a
        ];
    }
    /**
     * Returns a RGBA array of float values representing the color, unpremultiplied by A.
     *
     * @returns An array of RGBA color values in the range [0, 1].
     */
    toArray01() {
        const {r, g, b, a} = this;
        return a === 0 ? [
            0,
            0,
            0,
            0
        ] : [
            r / a,
            g / a,
            b / a,
            a
        ];
    }
    /**
     * Returns an RGBA array of values representing the color, premultiplied by A.
     *
     * @returns An array of RGBA color values in the range [0, 1].
     */
    toArray01PremultipliedAlpha() {
        const {r, g, b, a} = this;
        return [
            r,
            g,
            b,
            a
        ];
    }
}
Color.black = new Color(0, 0, 0, 1);
Color.white = new Color(1, 1, 1, 1);
Color.transparent = new Color(0, 0, 0, 0);
Color.red = new Color(1, 0, 0, 1);
Color.blue = new Color(0, 0, 1, 1);
var Color$1 = Color;

function convertLiteral(value) {
    return typeof value === 'object' ? [
        'literal',
        value
    ] : value;
}
function convertFunction(parameters, propertySpec) {
    let stops = parameters.stops;
    if (!stops) {
        // identity function
        return convertIdentityFunction(parameters, propertySpec);
    }
    const zoomAndFeatureDependent = stops && typeof stops[0][0] === 'object';
    const featureDependent = zoomAndFeatureDependent || parameters.property !== undefined;
    const zoomDependent = zoomAndFeatureDependent || !featureDependent;
    stops = stops.map(stop => {
        if (!featureDependent && propertySpec.tokens && typeof stop[1] === 'string') {
            return [
                stop[0],
                convertTokenString(stop[1])
            ];
        }
        return [
            stop[0],
            convertLiteral(stop[1])
        ];
    });
    if (zoomAndFeatureDependent) {
        return convertZoomAndPropertyFunction(parameters, propertySpec, stops);
    } else if (zoomDependent) {
        return convertZoomFunction(parameters, propertySpec, stops);
    } else {
        return convertPropertyFunction(parameters, propertySpec, stops);
    }
}
function convertIdentityFunction(parameters, propertySpec) {
    const get = [
        'get',
        parameters.property
    ];
    if (parameters.default === undefined) {
        // By default, expressions for string-valued properties get coerced. To preserve
        // legacy function semantics, insert an explicit assertion instead.
        return propertySpec.type === 'string' ? [
            'string',
            get
        ] : get;
    } else if (propertySpec.type === 'enum') {
        return [
            'match',
            get,
            Object.keys(propertySpec.values),
            get,
            parameters.default
        ];
    } else {
        const expression = [
            propertySpec.type === 'color' ? 'to-color' : propertySpec.type,
            get,
            convertLiteral(parameters.default)
        ];
        if (propertySpec.type === 'array') {
            expression.splice(1, 0, propertySpec.value, propertySpec.length || null);
        }
        return expression;
    }
}
function getInterpolateOperator(parameters) {
    switch (parameters.colorSpace) {
    case 'hcl':
        return 'interpolate-hcl';
    case 'lab':
        return 'interpolate-lab';
    default:
        return 'interpolate';
    }
}
function convertZoomAndPropertyFunction(parameters, propertySpec, stops) {
    const featureFunctionParameters = {};
    const featureFunctionStops = {};
    const zoomStops = [];
    for (let s = 0; s < stops.length; s++) {
        const stop = stops[s];
        const zoom = stop[0].zoom;
        if (featureFunctionParameters[zoom] === undefined) {
            featureFunctionParameters[zoom] = {
                zoom,
                type: parameters.type,
                property: parameters.property,
                default: parameters.default
            };
            featureFunctionStops[zoom] = [];
            zoomStops.push(zoom);
        }
        featureFunctionStops[zoom].push([
            stop[0].value,
            stop[1]
        ]);
    }
    // the interpolation type for the zoom dimension of a zoom-and-property
    // function is determined directly from the style property specification
    // for which it's being used: linear for interpolatable properties, step
    // otherwise.
    const functionType = getFunctionType({}, propertySpec);
    if (functionType === 'exponential') {
        const expression = [
            getInterpolateOperator(parameters),
            ['linear'],
            ['zoom']
        ];
        for (const z of zoomStops) {
            const output = convertPropertyFunction(featureFunctionParameters[z], propertySpec, featureFunctionStops[z]);
            appendStopPair(expression, z, output, false);
        }
        return expression;
    } else {
        const expression = [
            'step',
            ['zoom']
        ];
        for (const z of zoomStops) {
            const output = convertPropertyFunction(featureFunctionParameters[z], propertySpec, featureFunctionStops[z]);
            appendStopPair(expression, z, output, true);
        }
        fixupDegenerateStepCurve(expression);
        return expression;
    }
}
function coalesce(a, b) {
    if (a !== undefined)
        return a;
    if (b !== undefined)
        return b;
}
function getFallback(parameters, propertySpec) {
    const defaultValue = convertLiteral(coalesce(parameters.default, propertySpec.default));
    /*
     * Some fields with type: resolvedImage have an undefined default.
     * Because undefined is an invalid value for resolvedImage, set fallback to
     * an empty string instead of undefined to ensure output
     * passes validation.
     */
    if (defaultValue === undefined && propertySpec.type === 'resolvedImage') {
        return '';
    }
    return defaultValue;
}
function convertPropertyFunction(parameters, propertySpec, stops) {
    const type = getFunctionType(parameters, propertySpec);
    const get = [
        'get',
        parameters.property
    ];
    if (type === 'categorical' && typeof stops[0][0] === 'boolean') {
        const expression = ['case'];
        for (const stop of stops) {
            expression.push([
                '==',
                get,
                stop[0]
            ], stop[1]);
        }
        expression.push(getFallback(parameters, propertySpec));
        return expression;
    } else if (type === 'categorical') {
        const expression = [
            'match',
            get
        ];
        for (const stop of stops) {
            appendStopPair(expression, stop[0], stop[1], false);
        }
        expression.push(getFallback(parameters, propertySpec));
        return expression;
    } else if (type === 'interval') {
        const expression = [
            'step',
            [
                'number',
                get
            ]
        ];
        for (const stop of stops) {
            appendStopPair(expression, stop[0], stop[1], true);
        }
        fixupDegenerateStepCurve(expression);
        return parameters.default === undefined ? expression : [
            'case',
            [
                '==',
                [
                    'typeof',
                    get
                ],
                'number'
            ],
            expression,
            convertLiteral(parameters.default)
        ];
    } else if (type === 'exponential') {
        const base = parameters.base !== undefined ? parameters.base : 1;
        const expression = [
            getInterpolateOperator(parameters),
            base === 1 ? ['linear'] : [
                'exponential',
                base
            ],
            [
                'number',
                get
            ]
        ];
        for (const stop of stops) {
            appendStopPair(expression, stop[0], stop[1], false);
        }
        return parameters.default === undefined ? expression : [
            'case',
            [
                '==',
                [
                    'typeof',
                    get
                ],
                'number'
            ],
            expression,
            convertLiteral(parameters.default)
        ];
    } else {
        throw new Error(`Unknown property function type ${ type }`);
    }
}
function convertZoomFunction(parameters, propertySpec, stops, input = ['zoom']) {
    const type = getFunctionType(parameters, propertySpec);
    let expression;
    let isStep = false;
    if (type === 'interval') {
        expression = [
            'step',
            input
        ];
        isStep = true;
    } else if (type === 'exponential') {
        const base = parameters.base !== undefined ? parameters.base : 1;
        expression = [
            getInterpolateOperator(parameters),
            base === 1 ? ['linear'] : [
                'exponential',
                base
            ],
            input
        ];
    } else {
        throw new Error(`Unknown zoom function type "${ type }"`);
    }
    for (const stop of stops) {
        appendStopPair(expression, stop[0], stop[1], isStep);
    }
    fixupDegenerateStepCurve(expression);
    return expression;
}
function fixupDegenerateStepCurve(expression) {
    // degenerate step curve (i.e. a constant function): add a noop stop
    if (expression[0] === 'step' && expression.length === 3) {
        expression.push(0);
        expression.push(expression[3]);
    }
}
function appendStopPair(curve, input, output, isStep) {
    // Skip duplicate stop values. They were not validated for functions, but they are for expressions.
    // https://github.com/mapbox/mapbox-gl-js/issues/4107
    if (curve.length > 3 && input === curve[curve.length - 2]) {
        return;
    }
    // step curves don't get the first input value, as it is redundant.
    if (!(isStep && curve.length === 2)) {
        curve.push(input);
    }
    curve.push(output);
}
function getFunctionType(parameters, propertySpec) {
    if (parameters.type) {
        return parameters.type;
    } else {
        return propertySpec.expression.interpolated ? 'exponential' : 'interval';
    }
}
// "String with {name} token" => ["concat", "String with ", ["get", "name"], " token"]
function convertTokenString(s) {
    const result = ['concat'];
    const re = /{([^{}]+)}/g;
    let pos = 0;
    for (let match = re.exec(s); match !== null; match = re.exec(s)) {
        const literal = s.slice(pos, re.lastIndex - match[0].length);
        pos = re.lastIndex;
        if (literal.length > 0)
            result.push(literal);
        result.push([
            'get',
            match[1]
        ]);
    }
    if (result.length === 1) {
        return s;
    }
    if (pos < s.length) {
        result.push(s.slice(pos));
    } else if (result.length === 2) {
        return [
            'to-string',
            result[1]
        ];
    }
    return result;
}

//      
class ParsingError extends Error {
    constructor(key, message) {
        super(message);
        this.message = message;
        this.key = key;
    }
}
var ParsingError$1 = ParsingError;

//      
/**
 * Tracks `let` bindings during expression parsing.
 * @private
 */
class Scope {
    constructor(parent, bindings = []) {
        this.parent = parent;
        this.bindings = {};
        for (const [name, expression] of bindings) {
            this.bindings[name] = expression;
        }
    }
    concat(bindings) {
        return new Scope(this, bindings);
    }
    get(name) {
        if (this.bindings[name]) {
            return this.bindings[name];
        }
        if (this.parent) {
            return this.parent.get(name);
        }
        throw new Error(`${ name } not found in scope.`);
    }
    has(name) {
        if (this.bindings[name])
            return true;
        return this.parent ? this.parent.has(name) : false;
    }
}
var Scope$1 = Scope;

//      
const NullType = { kind: 'null' };
const NumberType = { kind: 'number' };
const StringType = { kind: 'string' };
const BooleanType = { kind: 'boolean' };
const ColorType = { kind: 'color' };
const ObjectType = { kind: 'object' };
const ValueType = { kind: 'value' };
const ErrorType = { kind: 'error' };
const CollatorType = { kind: 'collator' };
const FormattedType = { kind: 'formatted' };
const ResolvedImageType = { kind: 'resolvedImage' };
function array$1(itemType, N) {
    return {
        kind: 'array',
        itemType,
        N
    };
}
function toString$1(type) {
    if (type.kind === 'array') {
        const itemType = toString$1(type.itemType);
        return typeof type.N === 'number' ? `array<${ itemType }, ${ type.N }>` : type.itemType.kind === 'value' ? 'array' : `array<${ itemType }>`;
    } else {
        return type.kind;
    }
}
const valueMemberTypes = [
    NullType,
    NumberType,
    StringType,
    BooleanType,
    ColorType,
    FormattedType,
    ObjectType,
    array$1(ValueType),
    ResolvedImageType
];
/**
 * Returns null if `t` is a subtype of `expected`; otherwise returns an
 * error message.
 * @private
 */
function checkSubtype(expected, t) {
    if (t.kind === 'error') {
        // Error is a subtype of every type
        return null;
    } else if (expected.kind === 'array') {
        if (t.kind === 'array' && (t.N === 0 && t.itemType.kind === 'value' || !checkSubtype(expected.itemType, t.itemType)) && (typeof expected.N !== 'number' || expected.N === t.N)) {
            return null;
        }
    } else if (expected.kind === t.kind) {
        return null;
    } else if (expected.kind === 'value') {
        for (const memberType of valueMemberTypes) {
            if (!checkSubtype(memberType, t)) {
                return null;
            }
        }
    }
    return `Expected ${ toString$1(expected) } but found ${ toString$1(t) } instead.`;
}
function isValidType(provided, allowedTypes) {
    return allowedTypes.some(t => t.kind === provided.kind);
}
function isValidNativeType(provided, allowedTypes) {
    return allowedTypes.some(t => {
        if (t === 'null') {
            return provided === null;
        } else if (t === 'array') {
            return Array.isArray(provided);
        } else if (t === 'object') {
            return provided && !Array.isArray(provided) && typeof provided === 'object';
        } else {
            return t === typeof provided;
        }
    });
}

//      
// Flow type declarations for Intl cribbed from
// https://github.com/facebook/flow/issues/1270
class Collator {
    constructor(caseSensitive, diacriticSensitive, locale) {
        if (caseSensitive)
            this.sensitivity = diacriticSensitive ? 'variant' : 'case';
        else
            this.sensitivity = diacriticSensitive ? 'accent' : 'base';
        this.locale = locale;
        this.collator = new Intl.Collator(this.locale ? this.locale : [], {
            sensitivity: this.sensitivity,
            usage: 'search'
        });
    }
    compare(lhs, rhs) {
        return this.collator.compare(lhs, rhs);
    }
    resolvedLocale() {
        // We create a Collator without "usage: search" because we don't want
        // the search options encoded in our result (e.g. "en-u-co-search")
        return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions().locale;
    }
}

//      
class FormattedSection {
    constructor(text, image, scale, fontStack, textColor) {
        // combine characters so that diacritic marks are not separate code points
        this.text = text.normalize ? text.normalize() : text;
        this.image = image;
        this.scale = scale;
        this.fontStack = fontStack;
        this.textColor = textColor;
    }
}
class Formatted {
    constructor(sections) {
        this.sections = sections;
    }
    static fromString(unformatted) {
        return new Formatted([new FormattedSection(unformatted, null, null, null, null)]);
    }
    isEmpty() {
        if (this.sections.length === 0)
            return true;
        return !this.sections.some(section => section.text.length !== 0 || section.image && section.image.name.length !== 0);
    }
    static factory(text) {
        if (text instanceof Formatted) {
            return text;
        } else {
            return Formatted.fromString(text);
        }
    }
    toString() {
        if (this.sections.length === 0)
            return '';
        return this.sections.map(section => section.text).join('');
    }
    serialize() {
        const serialized = ['format'];
        for (const section of this.sections) {
            if (section.image) {
                serialized.push([
                    'image',
                    section.image.name
                ]);
                continue;
            }
            serialized.push(section.text);
            const options = {};
            if (section.fontStack) {
                options['text-font'] = [
                    'literal',
                    section.fontStack.split(',')
                ];
            }
            if (section.scale) {
                options['font-scale'] = section.scale;
            }
            if (section.textColor) {
                options['text-color'] = ['rgba'].concat(section.textColor.toArray());
            }
            serialized.push(options);
        }
        return serialized;
    }
}

//      
class ResolvedImage {
    constructor(options) {
        this.name = options.name;
        this.available = options.available;
    }
    toString() {
        return this.name;
    }
    static fromString(name) {
        if (!name)
            return null;
        // treat empty values as no image
        return new ResolvedImage({
            name,
            available: false
        });
    }
    serialize() {
        return [
            'image',
            this.name
        ];
    }
}

function validateRGBA(r, g, b, a) {
    if (!(typeof r === 'number' && r >= 0 && r <= 255 && typeof g === 'number' && g >= 0 && g <= 255 && typeof b === 'number' && b >= 0 && b <= 255)) {
        const value = typeof a === 'number' ? [
            r,
            g,
            b,
            a
        ] : [
            r,
            g,
            b
        ];
        return `Invalid rgba value [${ value.join(', ') }]: 'r', 'g', and 'b' must be between 0 and 255.`;
    }
    if (!(typeof a === 'undefined' || typeof a === 'number' && a >= 0 && a <= 1)) {
        return `Invalid rgba value [${ [
            r,
            g,
            b,
            a
        ].join(', ') }]: 'a' must be between 0 and 1.`;
    }
    return null;
}
function isValue(mixed) {
    if (mixed === null) {
        return true;
    } else if (typeof mixed === 'string') {
        return true;
    } else if (typeof mixed === 'boolean') {
        return true;
    } else if (typeof mixed === 'number') {
        return true;
    } else if (mixed instanceof Color$1) {
        return true;
    } else if (mixed instanceof Collator) {
        return true;
    } else if (mixed instanceof Formatted) {
        return true;
    } else if (mixed instanceof ResolvedImage) {
        return true;
    } else if (Array.isArray(mixed)) {
        for (const item of mixed) {
            if (!isValue(item)) {
                return false;
            }
        }
        return true;
    } else if (typeof mixed === 'object') {
        for (const key in mixed) {
            if (!isValue(mixed[key])) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}
function typeOf(value) {
    if (value === null) {
        return NullType;
    } else if (typeof value === 'string') {
        return StringType;
    } else if (typeof value === 'boolean') {
        return BooleanType;
    } else if (typeof value === 'number') {
        return NumberType;
    } else if (value instanceof Color$1) {
        return ColorType;
    } else if (value instanceof Collator) {
        return CollatorType;
    } else if (value instanceof Formatted) {
        return FormattedType;
    } else if (value instanceof ResolvedImage) {
        return ResolvedImageType;
    } else if (Array.isArray(value)) {
        const length = value.length;
        let itemType;
        for (const item of value) {
            const t = typeOf(item);
            if (!itemType) {
                itemType = t;
            } else if (itemType === t) {
                continue;
            } else {
                itemType = ValueType;
                break;
            }
        }
        return array$1(itemType || ValueType, length);
    } else {
        return ObjectType;
    }
}
function toString(value) {
    const type = typeof value;
    if (value === null) {
        return '';
    } else if (type === 'string' || type === 'number' || type === 'boolean') {
        return String(value);
    } else if (value instanceof Color$1 || value instanceof Formatted || value instanceof ResolvedImage) {
        return value.toString();
    } else {
        return JSON.stringify(value);
    }
}

class Literal {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    static parse(args, context) {
        if (args.length !== 2)
            return context.error(`'literal' expression requires exactly one argument, but found ${ args.length - 1 } instead.`);
        if (!isValue(args[1]))
            return context.error(`invalid value`);
        const value = args[1];
        let type = typeOf(value);
        // special case: infer the item type if possible for zero-length arrays
        const expected = context.expectedType;
        if (type.kind === 'array' && type.N === 0 && expected && expected.kind === 'array' && (typeof expected.N !== 'number' || expected.N === 0)) {
            type = expected;
        }
        return new Literal(type, value);
    }
    evaluate() {
        return this.value;
    }
    eachChild() {
    }
    outputDefined() {
        return true;
    }
    serialize() {
        if (this.type.kind === 'array' || this.type.kind === 'object') {
            return [
                'literal',
                this.value
            ];
        } else if (this.value instanceof Color$1) {
            // Constant-folding can generate Literal expressions that you
            // couldn't actually generate with a "literal" expression,
            // so we have to implement an equivalent serialization here
            return ['rgba'].concat(this.value.toArray());
        } else if (this.value instanceof Formatted) {
            // Same as Color
            return this.value.serialize();
        } else {
            return this.value;
        }
    }
}
var Literal$1 = Literal;

//      
class RuntimeError {
    constructor(message) {
        this.name = 'ExpressionEvaluationError';
        this.message = message;
    }
    toJSON() {
        return this.message;
    }
}
var RuntimeError$1 = RuntimeError;

const types$2 = {
    string: StringType,
    number: NumberType,
    boolean: BooleanType,
    object: ObjectType
};
class Assertion {
    constructor(type, args) {
        this.type = type;
        this.args = args;
    }
    static parse(args, context) {
        if (args.length < 2)
            return context.error(`Expected at least one argument.`);
        let i = 1;
        let type;
        const name = args[0];
        if (name === 'array') {
            let itemType;
            if (args.length > 2) {
                const type = args[1];
                if (typeof type !== 'string' || !(type in types$2) || type === 'object')
                    return context.error('The item type argument of "array" must be one of string, number, boolean', 1);
                itemType = types$2[type];
                i++;
            } else {
                itemType = ValueType;
            }
            let N;
            if (args.length > 3) {
                if (args[2] !== null && (typeof args[2] !== 'number' || args[2] < 0 || args[2] !== Math.floor(args[2]))) {
                    return context.error('The length argument to "array" must be a positive integer literal', 2);
                }
                N = args[2];
                i++;
            }
            type = array$1(itemType, N);
        } else {
            type = types$2[name];
        }
        const parsed = [];
        for (; i < args.length; i++) {
            const input = context.parse(args[i], i, ValueType);
            if (!input)
                return null;
            parsed.push(input);
        }
        return new Assertion(type, parsed);
    }
    evaluate(ctx) {
        for (let i = 0; i < this.args.length; i++) {
            const value = this.args[i].evaluate(ctx);
            const error = checkSubtype(this.type, typeOf(value));
            if (!error) {
                return value;
            } else if (i === this.args.length - 1) {
                throw new RuntimeError$1(`Expected value to be of type ${ toString$1(this.type) }, but found ${ toString$1(typeOf(value)) } instead.`);
            }
        }
        return null;
    }
    eachChild(fn) {
        this.args.forEach(fn);
    }
    outputDefined() {
        return this.args.every(arg => arg.outputDefined());
    }
    serialize() {
        const type = this.type;
        const serialized = [type.kind];
        if (type.kind === 'array') {
            const itemType = type.itemType;
            if (itemType.kind === 'string' || itemType.kind === 'number' || itemType.kind === 'boolean') {
                serialized.push(itemType.kind);
                const N = type.N;
                if (typeof N === 'number' || this.args.length > 1) {
                    serialized.push(N);
                }
            }
        }
        return serialized.concat(this.args.map(arg => arg.serialize()));
    }
}
var Assertion$1 = Assertion;

//      
class FormatExpression {
    constructor(sections) {
        this.type = FormattedType;
        this.sections = sections;
    }
    static parse(args, context) {
        if (args.length < 2) {
            return context.error(`Expected at least one argument.`);
        }
        const firstArg = args[1];
        if (!Array.isArray(firstArg) && typeof firstArg === 'object') {
            return context.error(`First argument must be an image or text section.`);
        }
        const sections = [];
        let nextTokenMayBeObject = false;
        for (let i = 1; i <= args.length - 1; ++i) {
            const arg = args[i];
            if (nextTokenMayBeObject && typeof arg === 'object' && !Array.isArray(arg)) {
                nextTokenMayBeObject = false;
                let scale = null;
                if (arg['font-scale']) {
                    scale = context.parse(arg['font-scale'], 1, NumberType);
                    if (!scale)
                        return null;
                }
                let font = null;
                if (arg['text-font']) {
                    font = context.parse(arg['text-font'], 1, array$1(StringType));
                    if (!font)
                        return null;
                }
                let textColor = null;
                if (arg['text-color']) {
                    textColor = context.parse(arg['text-color'], 1, ColorType);
                    if (!textColor)
                        return null;
                }
                const lastExpression = sections[sections.length - 1];
                lastExpression.scale = scale;
                lastExpression.font = font;
                lastExpression.textColor = textColor;
            } else {
                const content = context.parse(args[i], 1, ValueType);
                if (!content)
                    return null;
                const kind = content.type.kind;
                if (kind !== 'string' && kind !== 'value' && kind !== 'null' && kind !== 'resolvedImage')
                    return context.error(`Formatted text type must be 'string', 'value', 'image' or 'null'.`);
                nextTokenMayBeObject = true;
                sections.push({
                    content,
                    scale: null,
                    font: null,
                    textColor: null
                });
            }
        }
        return new FormatExpression(sections);
    }
    evaluate(ctx) {
        const evaluateSection = section => {
            const evaluatedContent = section.content.evaluate(ctx);
            if (typeOf(evaluatedContent) === ResolvedImageType) {
                return new FormattedSection('', evaluatedContent, null, null, null);
            }
            return new FormattedSection(toString(evaluatedContent), null, section.scale ? section.scale.evaluate(ctx) : null, section.font ? section.font.evaluate(ctx).join(',') : null, section.textColor ? section.textColor.evaluate(ctx) : null);
        };
        return new Formatted(this.sections.map(evaluateSection));
    }
    eachChild(fn) {
        for (const section of this.sections) {
            fn(section.content);
            if (section.scale) {
                fn(section.scale);
            }
            if (section.font) {
                fn(section.font);
            }
            if (section.textColor) {
                fn(section.textColor);
            }
        }
    }
    outputDefined() {
        // Technically the combinatoric set of all children
        // Usually, this.text will be undefined anyway
        return false;
    }
    serialize() {
        const serialized = ['format'];
        for (const section of this.sections) {
            serialized.push(section.content.serialize());
            const options = {};
            if (section.scale) {
                options['font-scale'] = section.scale.serialize();
            }
            if (section.font) {
                options['text-font'] = section.font.serialize();
            }
            if (section.textColor) {
                options['text-color'] = section.textColor.serialize();
            }
            serialized.push(options);
        }
        return serialized;
    }
}

//      
class ImageExpression {
    constructor(input) {
        this.type = ResolvedImageType;
        this.input = input;
    }
    static parse(args, context) {
        if (args.length !== 2) {
            return context.error(`Expected two arguments.`);
        }
        const name = context.parse(args[1], 1, StringType);
        if (!name)
            return context.error(`No image name provided.`);
        return new ImageExpression(name);
    }
    evaluate(ctx) {
        const evaluatedImageName = this.input.evaluate(ctx);
        const value = ResolvedImage.fromString(evaluatedImageName);
        if (value && ctx.availableImages)
            value.available = ctx.availableImages.indexOf(evaluatedImageName) > -1;
        return value;
    }
    eachChild(fn) {
        fn(this.input);
    }
    outputDefined() {
        // The output of image is determined by the list of available images in the evaluation context
        return false;
    }
    serialize() {
        return [
            'image',
            this.input.serialize()
        ];
    }
}

const types$1 = {
    'to-boolean': BooleanType,
    'to-color': ColorType,
    'to-number': NumberType,
    'to-string': StringType
};
/**
 * Special form for error-coalescing coercion expressions "to-number",
 * "to-color".  Since these coercions can fail at runtime, they accept multiple
 * arguments, only evaluating one at a time until one succeeds.
 *
 * @private
 */
class Coercion {
    constructor(type, args) {
        this.type = type;
        this.args = args;
    }
    static parse(args, context) {
        if (args.length < 2)
            return context.error(`Expected at least one argument.`);
        const name = args[0];
        if ((name === 'to-boolean' || name === 'to-string') && args.length !== 2)
            return context.error(`Expected one argument.`);
        const type = types$1[name];
        const parsed = [];
        for (let i = 1; i < args.length; i++) {
            const input = context.parse(args[i], i, ValueType);
            if (!input)
                return null;
            parsed.push(input);
        }
        return new Coercion(type, parsed);
    }
    evaluate(ctx) {
        if (this.type.kind === 'boolean') {
            return Boolean(this.args[0].evaluate(ctx));
        } else if (this.type.kind === 'color') {
            let input;
            let error;
            for (const arg of this.args) {
                input = arg.evaluate(ctx);
                error = null;
                if (input instanceof Color$1) {
                    return input;
                } else if (typeof input === 'string') {
                    const c = ctx.parseColor(input);
                    if (c)
                        return c;
                } else if (Array.isArray(input)) {
                    if (input.length < 3 || input.length > 4) {
                        error = `Invalid rbga value ${ JSON.stringify(input) }: expected an array containing either three or four numeric values.`;
                    } else {
                        error = validateRGBA(input[0], input[1], input[2], input[3]);
                    }
                    if (!error) {
                        return new Color$1(input[0] / 255, input[1] / 255, input[2] / 255, input[3]);
                    }
                }
            }
            throw new RuntimeError$1(error || `Could not parse color from value '${ typeof input === 'string' ? input : String(JSON.stringify(input)) }'`);
        } else if (this.type.kind === 'number') {
            let value = null;
            for (const arg of this.args) {
                value = arg.evaluate(ctx);
                if (value === null)
                    return 0;
                const num = Number(value);
                if (isNaN(num))
                    continue;
                return num;
            }
            throw new RuntimeError$1(`Could not convert ${ JSON.stringify(value) } to number.`);
        } else if (this.type.kind === 'formatted') {
            // There is no explicit 'to-formatted' but this coercion can be implicitly
            // created by properties that expect the 'formatted' type.
            return Formatted.fromString(toString(this.args[0].evaluate(ctx)));
        } else if (this.type.kind === 'resolvedImage') {
            return ResolvedImage.fromString(toString(this.args[0].evaluate(ctx)));
        } else {
            return toString(this.args[0].evaluate(ctx));
        }
    }
    eachChild(fn) {
        this.args.forEach(fn);
    }
    outputDefined() {
        return this.args.every(arg => arg.outputDefined());
    }
    serialize() {
        if (this.type.kind === 'formatted') {
            return new FormatExpression([{
                    content: this.args[0],
                    scale: null,
                    font: null,
                    textColor: null
                }]).serialize();
        }
        if (this.type.kind === 'resolvedImage') {
            return new ImageExpression(this.args[0]).serialize();
        }
        const serialized = [`to-${ this.type.kind }`];
        this.eachChild(child => {
            serialized.push(child.serialize());
        });
        return serialized;
    }
}
var Coercion$1 = Coercion;

//      
const geometryTypes = [
    'Unknown',
    'Point',
    'LineString',
    'Polygon'
];
class EvaluationContext {
    constructor() {
        this.globals = null;
        this.feature = null;
        this.featureState = null;
        this.formattedSection = null;
        this._parseColorCache = {};
        this.availableImages = null;
        this.canonical = null;
        this.featureTileCoord = null;
        this.featureDistanceData = null;
    }
    id() {
        return this.feature && this.feature.id !== undefined ? this.feature.id : null;
    }
    geometryType() {
        return this.feature ? typeof this.feature.type === 'number' ? geometryTypes[this.feature.type] : this.feature.type : null;
    }
    geometry() {
        return this.feature && 'geometry' in this.feature ? this.feature.geometry : null;
    }
    canonicalID() {
        return this.canonical;
    }
    properties() {
        return this.feature && this.feature.properties || {};
    }
    distanceFromCenter() {
        if (this.featureTileCoord && this.featureDistanceData) {
            const c = this.featureDistanceData.center;
            const scale = this.featureDistanceData.scale;
            const {x, y} = this.featureTileCoord;
            // Calculate the distance vector `d` (left handed)
            const dX = x * scale - c[0];
            const dY = y * scale - c[1];
            // The bearing vector `b` (left handed)
            const bX = this.featureDistanceData.bearing[0];
            const bY = this.featureDistanceData.bearing[1];
            // Distance is calculated as `dot(d, v)`
            const dist = bX * dX + bY * dY;
            return dist;
        }
        return 0;
    }
    parseColor(input) {
        let cached = this._parseColorCache[input];
        if (!cached) {
            cached = this._parseColorCache[input] = Color$1.parse(input);
        }
        return cached;
    }
}
var EvaluationContext$1 = EvaluationContext;

//      
class CompoundExpression {
    constructor(name, type, evaluate, args) {
        this.name = name;
        this.type = type;
        this._evaluate = evaluate;
        this.args = args;
    }
    evaluate(ctx) {
        return this._evaluate(ctx, this.args);
    }
    eachChild(fn) {
        this.args.forEach(fn);
    }
    outputDefined() {
        return false;
    }
    serialize() {
        return [this.name].concat(this.args.map(arg => arg.serialize()));
    }
    static parse(args, context) {
        const op = args[0];
        const definition = CompoundExpression.definitions[op];
        if (!definition) {
            return context.error(`Unknown expression "${ op }". If you wanted a literal array, use ["literal", [...]].`, 0);
        }
        // Now check argument types against each signature
        const type = Array.isArray(definition) ? definition[0] : definition.type;
        const availableOverloads = Array.isArray(definition) ? [[
                definition[1],
                definition[2]
            ]] : definition.overloads;
        const overloads = availableOverloads.filter(([signature]) => !Array.isArray(signature) || // varags
        signature.length === args.length - 1    // correct param count
);
        let signatureContext = null;
        for (const [params, evaluate] of overloads) {
            // Use a fresh context for each attempted signature so that, if
            // we eventually succeed, we haven't polluted `context.errors`.
            signatureContext = new ParsingContext$1(context.registry, context.path, null, context.scope);
            // First parse all the args, potentially coercing to the
            // types expected by this overload.
            const parsedArgs = [];
            let argParseFailed = false;
            for (let i = 1; i < args.length; i++) {
                const arg = args[i];
                const expectedType = Array.isArray(params) ? params[i - 1] : params.type;
                const parsed = signatureContext.parse(arg, 1 + parsedArgs.length, expectedType);
                if (!parsed) {
                    argParseFailed = true;
                    break;
                }
                parsedArgs.push(parsed);
            }
            if (argParseFailed) {
                // Couldn't coerce args of this overload to expected type, move
                // on to next one.
                continue;
            }
            if (Array.isArray(params)) {
                if (params.length !== parsedArgs.length) {
                    signatureContext.error(`Expected ${ params.length } arguments, but found ${ parsedArgs.length } instead.`);
                    continue;
                }
            }
            for (let i = 0; i < parsedArgs.length; i++) {
                const expected = Array.isArray(params) ? params[i] : params.type;
                const arg = parsedArgs[i];
                signatureContext.concat(i + 1).checkSubtype(expected, arg.type);
            }
            if (signatureContext.errors.length === 0) {
                return new CompoundExpression(op, type, evaluate, parsedArgs);
            }
        }
        if (overloads.length === 1) {
            context.errors.push(...signatureContext.errors);
        } else {
            const expected = overloads.length ? overloads : availableOverloads;
            const signatures = expected.map(([params]) => stringifySignature(params)).join(' | ');
            const actualTypes = [];
            // For error message, re-parse arguments without trying to
            // apply any coercions
            for (let i = 1; i < args.length; i++) {
                const parsed = context.parse(args[i], 1 + actualTypes.length);
                if (!parsed)
                    return null;
                actualTypes.push(toString$1(parsed.type));
            }
            context.error(`Expected arguments of type ${ signatures }, but found (${ actualTypes.join(', ') }) instead.`);
        }
        return null;
    }
    static register(registry, definitions) {
        CompoundExpression.definitions = definitions;
        for (const name in definitions) {
            registry[name] = CompoundExpression;
        }
    }
}
function stringifySignature(signature) {
    if (Array.isArray(signature)) {
        return `(${ signature.map(toString$1).join(', ') })`;
    } else {
        return `(${ toString$1(signature.type) }...)`;
    }
}
var CompoundExpression$1 = CompoundExpression;

//      
class CollatorExpression {
    constructor(caseSensitive, diacriticSensitive, locale) {
        this.type = CollatorType;
        this.locale = locale;
        this.caseSensitive = caseSensitive;
        this.diacriticSensitive = diacriticSensitive;
    }
    static parse(args, context) {
        if (args.length !== 2)
            return context.error(`Expected one argument.`);
        const options = args[1];
        if (typeof options !== 'object' || Array.isArray(options))
            return context.error(`Collator options argument must be an object.`);
        const caseSensitive = context.parse(options['case-sensitive'] === undefined ? false : options['case-sensitive'], 1, BooleanType);
        if (!caseSensitive)
            return null;
        const diacriticSensitive = context.parse(options['diacritic-sensitive'] === undefined ? false : options['diacritic-sensitive'], 1, BooleanType);
        if (!diacriticSensitive)
            return null;
        let locale = null;
        if (options['locale']) {
            locale = context.parse(options['locale'], 1, StringType);
            if (!locale)
                return null;
        }
        return new CollatorExpression(caseSensitive, diacriticSensitive, locale);
    }
    evaluate(ctx) {
        return new Collator(this.caseSensitive.evaluate(ctx), this.diacriticSensitive.evaluate(ctx), this.locale ? this.locale.evaluate(ctx) : null);
    }
    eachChild(fn) {
        fn(this.caseSensitive);
        fn(this.diacriticSensitive);
        if (this.locale) {
            fn(this.locale);
        }
    }
    outputDefined() {
        // Technically the set of possible outputs is the combinatoric set of Collators produced
        // by all possible outputs of locale/caseSensitive/diacriticSensitive
        // But for the primary use of Collators in comparison operators, we ignore the Collator's
        // possible outputs anyway, so we can get away with leaving this false for now.
        return false;
    }
    serialize() {
        const options = {};
        options['case-sensitive'] = this.caseSensitive.serialize();
        options['diacritic-sensitive'] = this.diacriticSensitive.serialize();
        if (this.locale) {
            options['locale'] = this.locale.serialize();
        }
        return [
            'collator',
            options
        ];
    }
}

//      
// minX, minY, maxX, maxY
const EXTENT = 8192;
function updateBBox(bbox, coord) {
    bbox[0] = Math.min(bbox[0], coord[0]);
    bbox[1] = Math.min(bbox[1], coord[1]);
    bbox[2] = Math.max(bbox[2], coord[0]);
    bbox[3] = Math.max(bbox[3], coord[1]);
}
function mercatorXfromLng(lng) {
    return (180 + lng) / 360;
}
function mercatorYfromLat(lat) {
    return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))) / 360;
}
function boxWithinBox(bbox1, bbox2) {
    if (bbox1[0] <= bbox2[0])
        return false;
    if (bbox1[2] >= bbox2[2])
        return false;
    if (bbox1[1] <= bbox2[1])
        return false;
    if (bbox1[3] >= bbox2[3])
        return false;
    return true;
}
function getTileCoordinates(p, canonical) {
    const x = mercatorXfromLng(p[0]);
    const y = mercatorYfromLat(p[1]);
    const tilesAtZoom = Math.pow(2, canonical.z);
    return [
        Math.round(x * tilesAtZoom * EXTENT),
        Math.round(y * tilesAtZoom * EXTENT)
    ];
}
function onBoundary(p, p1, p2) {
    const x1 = p[0] - p1[0];
    const y1 = p[1] - p1[1];
    const x2 = p[0] - p2[0];
    const y2 = p[1] - p2[1];
    return x1 * y2 - x2 * y1 === 0 && x1 * x2 <= 0 && y1 * y2 <= 0;
}
function rayIntersect(p, p1, p2) {
    return p1[1] > p[1] !== p2[1] > p[1] && p[0] < (p2[0] - p1[0]) * (p[1] - p1[1]) / (p2[1] - p1[1]) + p1[0];
}
// ray casting algorithm for detecting if point is in polygon
function pointWithinPolygon(point, rings) {
    let inside = false;
    for (let i = 0, len = rings.length; i < len; i++) {
        const ring = rings[i];
        for (let j = 0, len2 = ring.length; j < len2 - 1; j++) {
            if (onBoundary(point, ring[j], ring[j + 1]))
                return false;
            if (rayIntersect(point, ring[j], ring[j + 1]))
                inside = !inside;
        }
    }
    return inside;
}
function pointWithinPolygons(point, polygons) {
    for (let i = 0; i < polygons.length; i++) {
        if (pointWithinPolygon(point, polygons[i]))
            return true;
    }
    return false;
}
function perp(v1, v2) {
    return v1[0] * v2[1] - v1[1] * v2[0];
}
// check if p1 and p2 are in different sides of line segment q1->q2
function twoSided(p1, p2, q1, q2) {
    // q1->p1 (x1, y1), q1->p2 (x2, y2), q1->q2 (x3, y3)
    const x1 = p1[0] - q1[0];
    const y1 = p1[1] - q1[1];
    const x2 = p2[0] - q1[0];
    const y2 = p2[1] - q1[1];
    const x3 = q2[0] - q1[0];
    const y3 = q2[1] - q1[1];
    const det1 = x1 * y3 - x3 * y1;
    const det2 = x2 * y3 - x3 * y2;
    if (det1 > 0 && det2 < 0 || det1 < 0 && det2 > 0)
        return true;
    return false;
}
// a, b are end points for line segment1, c and d are end points for line segment2
function lineIntersectLine(a, b, c, d) {
    // check if two segments are parallel or not
    // precondition is end point a, b is inside polygon, if line a->b is
    // parallel to polygon edge c->d, then a->b won't intersect with c->d
    const vectorP = [
        b[0] - a[0],
        b[1] - a[1]
    ];
    const vectorQ = [
        d[0] - c[0],
        d[1] - c[1]
    ];
    if (perp(vectorQ, vectorP) === 0)
        return false;
    // If lines are intersecting with each other, the relative location should be:
    // a and b lie in different sides of segment c->d
    // c and d lie in different sides of segment a->b
    if (twoSided(a, b, c, d) && twoSided(c, d, a, b))
        return true;
    return false;
}
function lineIntersectPolygon(p1, p2, polygon) {
    for (const ring of polygon) {
        // loop through every edge of the ring
        for (let j = 0; j < ring.length - 1; ++j) {
            if (lineIntersectLine(p1, p2, ring[j], ring[j + 1])) {
                return true;
            }
        }
    }
    return false;
}
function lineStringWithinPolygon(line, polygon) {
    // First, check if geometry points of line segments are all inside polygon
    for (let i = 0; i < line.length; ++i) {
        if (!pointWithinPolygon(line[i], polygon)) {
            return false;
        }
    }
    // Second, check if there is line segment intersecting polygon edge
    for (let i = 0; i < line.length - 1; ++i) {
        if (lineIntersectPolygon(line[i], line[i + 1], polygon)) {
            return false;
        }
    }
    return true;
}
function lineStringWithinPolygons(line, polygons) {
    for (let i = 0; i < polygons.length; i++) {
        if (lineStringWithinPolygon(line, polygons[i]))
            return true;
    }
    return false;
}
function getTilePolygon(coordinates, bbox, canonical) {
    const polygon = [];
    for (let i = 0; i < coordinates.length; i++) {
        const ring = [];
        for (let j = 0; j < coordinates[i].length; j++) {
            const coord = getTileCoordinates(coordinates[i][j], canonical);
            updateBBox(bbox, coord);
            ring.push(coord);
        }
        polygon.push(ring);
    }
    return polygon;
}
function getTilePolygons(coordinates, bbox, canonical) {
    const polygons = [];
    for (let i = 0; i < coordinates.length; i++) {
        const polygon = getTilePolygon(coordinates[i], bbox, canonical);
        polygons.push(polygon);
    }
    return polygons;
}
function updatePoint(p, bbox, polyBBox, worldSize) {
    if (p[0] < polyBBox[0] || p[0] > polyBBox[2]) {
        const halfWorldSize = worldSize * 0.5;
        let shift = p[0] - polyBBox[0] > halfWorldSize ? -worldSize : polyBBox[0] - p[0] > halfWorldSize ? worldSize : 0;
        if (shift === 0) {
            shift = p[0] - polyBBox[2] > halfWorldSize ? -worldSize : polyBBox[2] - p[0] > halfWorldSize ? worldSize : 0;
        }
        p[0] += shift;
    }
    updateBBox(bbox, p);
}
function resetBBox(bbox) {
    bbox[0] = bbox[1] = Infinity;
    bbox[2] = bbox[3] = -Infinity;
}
function getTilePoints(geometry, pointBBox, polyBBox, canonical) {
    const worldSize = Math.pow(2, canonical.z) * EXTENT;
    const shifts = [
        canonical.x * EXTENT,
        canonical.y * EXTENT
    ];
    const tilePoints = [];
    if (!geometry)
        return tilePoints;
    for (const points of geometry) {
        for (const point of points) {
            const p = [
                point.x + shifts[0],
                point.y + shifts[1]
            ];
            updatePoint(p, pointBBox, polyBBox, worldSize);
            tilePoints.push(p);
        }
    }
    return tilePoints;
}
function getTileLines(geometry, lineBBox, polyBBox, canonical) {
    const worldSize = Math.pow(2, canonical.z) * EXTENT;
    const shifts = [
        canonical.x * EXTENT,
        canonical.y * EXTENT
    ];
    const tileLines = [];
    if (!geometry)
        return tileLines;
    for (const line of geometry) {
        const tileLine = [];
        for (const point of line) {
            const p = [
                point.x + shifts[0],
                point.y + shifts[1]
            ];
            updateBBox(lineBBox, p);
            tileLine.push(p);
        }
        tileLines.push(tileLine);
    }
    if (lineBBox[2] - lineBBox[0] <= worldSize / 2) {
        resetBBox(lineBBox);
        for (const line of tileLines) {
            for (const p of line) {
                updatePoint(p, lineBBox, polyBBox, worldSize);
            }
        }
    }
    return tileLines;
}
function pointsWithinPolygons(ctx, polygonGeometry) {
    const pointBBox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    const polyBBox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    const canonical = ctx.canonicalID();
    if (!canonical) {
        return false;
    }
    if (polygonGeometry.type === 'Polygon') {
        const tilePolygon = getTilePolygon(polygonGeometry.coordinates, polyBBox, canonical);
        const tilePoints = getTilePoints(ctx.geometry(), pointBBox, polyBBox, canonical);
        if (!boxWithinBox(pointBBox, polyBBox))
            return false;
        for (const point of tilePoints) {
            if (!pointWithinPolygon(point, tilePolygon))
                return false;
        }
    }
    if (polygonGeometry.type === 'MultiPolygon') {
        const tilePolygons = getTilePolygons(polygonGeometry.coordinates, polyBBox, canonical);
        const tilePoints = getTilePoints(ctx.geometry(), pointBBox, polyBBox, canonical);
        if (!boxWithinBox(pointBBox, polyBBox))
            return false;
        for (const point of tilePoints) {
            if (!pointWithinPolygons(point, tilePolygons))
                return false;
        }
    }
    return true;
}
function linesWithinPolygons(ctx, polygonGeometry) {
    const lineBBox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    const polyBBox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    const canonical = ctx.canonicalID();
    if (!canonical) {
        return false;
    }
    if (polygonGeometry.type === 'Polygon') {
        const tilePolygon = getTilePolygon(polygonGeometry.coordinates, polyBBox, canonical);
        const tileLines = getTileLines(ctx.geometry(), lineBBox, polyBBox, canonical);
        if (!boxWithinBox(lineBBox, polyBBox))
            return false;
        for (const line of tileLines) {
            if (!lineStringWithinPolygon(line, tilePolygon))
                return false;
        }
    }
    if (polygonGeometry.type === 'MultiPolygon') {
        const tilePolygons = getTilePolygons(polygonGeometry.coordinates, polyBBox, canonical);
        const tileLines = getTileLines(ctx.geometry(), lineBBox, polyBBox, canonical);
        if (!boxWithinBox(lineBBox, polyBBox))
            return false;
        for (const line of tileLines) {
            if (!lineStringWithinPolygons(line, tilePolygons))
                return false;
        }
    }
    return true;
}
class Within {
    constructor(geojson, geometries) {
        this.type = BooleanType;
        this.geojson = geojson;
        this.geometries = geometries;
    }
    static parse(args, context) {
        if (args.length !== 2)
            return context.error(`'within' expression requires exactly one argument, but found ${ args.length - 1 } instead.`);
        if (isValue(args[1])) {
            const geojson = args[1];
            if (geojson.type === 'FeatureCollection') {
                for (let i = 0; i < geojson.features.length; ++i) {
                    const type = geojson.features[i].geometry.type;
                    if (type === 'Polygon' || type === 'MultiPolygon') {
                        return new Within(geojson, geojson.features[i].geometry);
                    }
                }
            } else if (geojson.type === 'Feature') {
                const type = geojson.geometry.type;
                if (type === 'Polygon' || type === 'MultiPolygon') {
                    return new Within(geojson, geojson.geometry);
                }
            } else if (geojson.type === 'Polygon' || geojson.type === 'MultiPolygon') {
                return new Within(geojson, geojson);
            }
        }
        return context.error(`'within' expression requires valid geojson object that contains polygon geometry type.`);
    }
    evaluate(ctx) {
        if (ctx.geometry() != null && ctx.canonicalID() != null) {
            if (ctx.geometryType() === 'Point') {
                return pointsWithinPolygons(ctx, this.geometries);
            } else if (ctx.geometryType() === 'LineString') {
                return linesWithinPolygons(ctx, this.geometries);
            }
        }
        return false;
    }
    eachChild() {
    }
    outputDefined() {
        return true;
    }
    serialize() {
        return [
            'within',
            this.geojson
        ];
    }
}
var Within$1 = Within;

//      
function isFeatureConstant(e) {
    if (e instanceof CompoundExpression$1) {
        if (e.name === 'get' && e.args.length === 1) {
            return false;
        } else if (e.name === 'feature-state') {
            return false;
        } else if (e.name === 'has' && e.args.length === 1) {
            return false;
        } else if (e.name === 'properties' || e.name === 'geometry-type' || e.name === 'id') {
            return false;
        } else if (/^filter-/.test(e.name)) {
            return false;
        }
    }
    if (e instanceof Within$1) {
        return false;
    }
    let result = true;
    e.eachChild(arg => {
        if (result && !isFeatureConstant(arg)) {
            result = false;
        }
    });
    return result;
}
function isStateConstant(e) {
    if (e instanceof CompoundExpression$1) {
        if (e.name === 'feature-state') {
            return false;
        }
    }
    let result = true;
    e.eachChild(arg => {
        if (result && !isStateConstant(arg)) {
            result = false;
        }
    });
    return result;
}
function isGlobalPropertyConstant(e, properties) {
    if (e instanceof CompoundExpression$1 && properties.indexOf(e.name) >= 0) {
        return false;
    }
    let result = true;
    e.eachChild(arg => {
        if (result && !isGlobalPropertyConstant(arg, properties)) {
            result = false;
        }
    });
    return result;
}

//      
class Var {
    constructor(name, boundExpression) {
        this.type = boundExpression.type;
        this.name = name;
        this.boundExpression = boundExpression;
    }
    static parse(args, context) {
        if (args.length !== 2 || typeof args[1] !== 'string')
            return context.error(`'var' expression requires exactly one string literal argument.`);
        const name = args[1];
        if (!context.scope.has(name)) {
            return context.error(`Unknown variable "${ name }". Make sure "${ name }" has been bound in an enclosing "let" expression before using it.`, 1);
        }
        return new Var(name, context.scope.get(name));
    }
    evaluate(ctx) {
        return this.boundExpression.evaluate(ctx);
    }
    eachChild() {
    }
    outputDefined() {
        return false;
    }
    serialize() {
        return [
            'var',
            this.name
        ];
    }
}
var Var$1 = Var;

//      
/**
 * State associated parsing at a given point in an expression tree.
 * @private
 */
class ParsingContext {
    // The expected type of this expression. Provided only to allow Expression
    // implementations to infer argument types: Expression#parse() need not
    // check that the output type of the parsed expression matches
    // `expectedType`.
    constructor(registry, path = [], expectedType, scope = new Scope$1(), errors = []) {
        this.registry = registry;
        this.path = path;
        this.key = path.map(part => `[${ part }]`).join('');
        this.scope = scope;
        this.errors = errors;
        this.expectedType = expectedType;
    }
    /**
     * @param expr the JSON expression to parse
     * @param index the optional argument index if this expression is an argument of a parent expression that's being parsed
     * @param options
     * @param options.omitTypeAnnotations set true to omit inferred type annotations.  Caller beware: with this option set, the parsed expression's type will NOT satisfy `expectedType` if it would normally be wrapped in an inferred annotation.
     * @private
     */
    parse(expr, index, expectedType, bindings, options = {}) {
        if (index) {
            return this.concat(index, expectedType, bindings)._parse(expr, options);
        }
        return this._parse(expr, options);
    }
    _parse(expr, options) {
        if (expr === null || typeof expr === 'string' || typeof expr === 'boolean' || typeof expr === 'number') {
            expr = [
                'literal',
                expr
            ];
        }
        function annotate(parsed, type, typeAnnotation) {
            if (typeAnnotation === 'assert') {
                return new Assertion$1(type, [parsed]);
            } else if (typeAnnotation === 'coerce') {
                return new Coercion$1(type, [parsed]);
            } else {
                return parsed;
            }
        }
        if (Array.isArray(expr)) {
            if (expr.length === 0) {
                return this.error(`Expected an array with at least one element. If you wanted a literal array, use ["literal", []].`);
            }
            const op = expr[0];
            if (typeof op !== 'string') {
                this.error(`Expression name must be a string, but found ${ typeof op } instead. If you wanted a literal array, use ["literal", [...]].`, 0);
                return null;
            }
            const Expr = this.registry[op];
            if (Expr) {
                let parsed = Expr.parse(expr, this);
                if (!parsed)
                    return null;
                if (this.expectedType) {
                    const expected = this.expectedType;
                    const actual = parsed.type;
                    // When we expect a number, string, boolean, or array but have a value, wrap it in an assertion.
                    // When we expect a color or formatted string, but have a string or value, wrap it in a coercion.
                    // Otherwise, we do static type-checking.
                    //
                    // These behaviors are overridable for:
                    //   * The "coalesce" operator, which needs to omit type annotations.
                    //   * String-valued properties (e.g. `text-field`), where coercion is more convenient than assertion.
                    //
                    if ((expected.kind === 'string' || expected.kind === 'number' || expected.kind === 'boolean' || expected.kind === 'object' || expected.kind === 'array') && actual.kind === 'value') {
                        parsed = annotate(parsed, expected, options.typeAnnotation || 'assert');
                    } else if ((expected.kind === 'color' || expected.kind === 'formatted' || expected.kind === 'resolvedImage') && (actual.kind === 'value' || actual.kind === 'string')) {
                        parsed = annotate(parsed, expected, options.typeAnnotation || 'coerce');
                    } else if (this.checkSubtype(expected, actual)) {
                        return null;
                    }
                }
                // If an expression's arguments are all literals, we can evaluate
                // it immediately and replace it with a literal value in the
                // parsed/compiled result. Expressions that expect an image should
                // not be resolved here so we can later get the available images.
                if (!(parsed instanceof Literal$1) && parsed.type.kind !== 'resolvedImage' && isConstant(parsed)) {
                    const ec = new EvaluationContext$1();
                    try {
                        parsed = new Literal$1(parsed.type, parsed.evaluate(ec));
                    } catch (e) {
                        this.error(e.message);
                        return null;
                    }
                }
                return parsed;
            }
            return this.error(`Unknown expression "${ op }". If you wanted a literal array, use ["literal", [...]].`, 0);
        } else if (typeof expr === 'undefined') {
            return this.error(`'undefined' value invalid. Use null instead.`);
        } else if (typeof expr === 'object') {
            return this.error(`Bare objects invalid. Use ["literal", {...}] instead.`);
        } else {
            return this.error(`Expected an array, but found ${ typeof expr } instead.`);
        }
    }
    /**
     * Returns a copy of this context suitable for parsing the subexpression at
     * index `index`, optionally appending to 'let' binding map.
     *
     * Note that `errors` property, intended for collecting errors while
     * parsing, is copied by reference rather than cloned.
     * @private
     */
    concat(index, expectedType, bindings) {
        const path = typeof index === 'number' ? this.path.concat(index) : this.path;
        const scope = bindings ? this.scope.concat(bindings) : this.scope;
        return new ParsingContext(this.registry, path, expectedType || null, scope, this.errors);
    }
    /**
     * Push a parsing (or type checking) error into the `this.errors`
     * @param error The message
     * @param keys Optionally specify the source of the error at a child
     * of the current expression at `this.key`.
     * @private
     */
    error(error, ...keys) {
        const key = `${ this.key }${ keys.map(k => `[${ k }]`).join('') }`;
        this.errors.push(new ParsingError$1(key, error));
    }
    /**
     * Returns null if `t` is a subtype of `expected`; otherwise returns an
     * error message and also pushes it to `this.errors`.
     */
    checkSubtype(expected, t) {
        const error = checkSubtype(expected, t);
        if (error)
            this.error(error);
        return error;
    }
}
var ParsingContext$1 = ParsingContext;
function isConstant(expression) {
    if (expression instanceof Var$1) {
        return isConstant(expression.boundExpression);
    } else if (expression instanceof CompoundExpression$1 && expression.name === 'error') {
        return false;
    } else if (expression instanceof CollatorExpression) {
        // Although the results of a Collator expression with fixed arguments
        // generally shouldn't change between executions, we can't serialize them
        // as constant expressions because results change based on environment.
        return false;
    } else if (expression instanceof Within$1) {
        return false;
    }
    const isTypeAnnotation = expression instanceof Coercion$1 || expression instanceof Assertion$1;
    let childrenConstant = true;
    expression.eachChild(child => {
        // We can _almost_ assume that if `expressions` children are constant,
        // they would already have been evaluated to Literal values when they
        // were parsed.  Type annotations are the exception, because they might
        // have been inferred and added after a child was parsed.
        // So we recurse into isConstant() for the children of type annotations,
        // but otherwise simply check whether they are Literals.
        if (isTypeAnnotation) {
            childrenConstant = childrenConstant && isConstant(child);
        } else {
            childrenConstant = childrenConstant && child instanceof Literal$1;
        }
    });
    if (!childrenConstant) {
        return false;
    }
    return isFeatureConstant(expression) && isGlobalPropertyConstant(expression, [
        'zoom',
        'heatmap-density',
        'line-progress',
        'sky-radial-progress',
        'accumulated',
        'is-supported-script',
        'pitch',
        'distance-from-center'
    ]);
}

//      
/**
 * Returns the index of the last stop <= input, or 0 if it doesn't exist.
 * @private
 */
function findStopLessThanOrEqualTo(stops, input) {
    const lastIndex = stops.length - 1;
    let lowerIndex = 0;
    let upperIndex = lastIndex;
    let currentIndex = 0;
    let currentValue, nextValue;
    while (lowerIndex <= upperIndex) {
        currentIndex = Math.floor((lowerIndex + upperIndex) / 2);
        currentValue = stops[currentIndex];
        nextValue = stops[currentIndex + 1];
        if (currentValue <= input) {
            if (currentIndex === lastIndex || input < nextValue) {
                // Search complete
                return currentIndex;
            }
            lowerIndex = currentIndex + 1;
        } else if (currentValue > input) {
            upperIndex = currentIndex - 1;
        } else {
            throw new RuntimeError$1('Input is not a number.');
        }
    }
    return 0;
}

//      
class Step {
    constructor(type, input, stops) {
        this.type = type;
        this.input = input;
        this.labels = [];
        this.outputs = [];
        for (const [label, expression] of stops) {
            this.labels.push(label);
            this.outputs.push(expression);
        }
    }
    static parse(args, context) {
        if (args.length - 1 < 4) {
            return context.error(`Expected at least 4 arguments, but found only ${ args.length - 1 }.`);
        }
        if ((args.length - 1) % 2 !== 0) {
            return context.error(`Expected an even number of arguments.`);
        }
        const input = context.parse(args[1], 1, NumberType);
        if (!input)
            return null;
        const stops = [];
        let outputType = null;
        if (context.expectedType && context.expectedType.kind !== 'value') {
            outputType = context.expectedType;
        }
        for (let i = 1; i < args.length; i += 2) {
            const label = i === 1 ? -Infinity : args[i];
            const value = args[i + 1];
            const labelKey = i;
            const valueKey = i + 1;
            if (typeof label !== 'number') {
                return context.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey);
            }
            if (stops.length && stops[stops.length - 1][0] >= label) {
                return context.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', labelKey);
            }
            const parsed = context.parse(value, valueKey, outputType);
            if (!parsed)
                return null;
            outputType = outputType || parsed.type;
            stops.push([
                label,
                parsed
            ]);
        }
        return new Step(outputType, input, stops);
    }
    evaluate(ctx) {
        const labels = this.labels;
        const outputs = this.outputs;
        if (labels.length === 1) {
            return outputs[0].evaluate(ctx);
        }
        const value = this.input.evaluate(ctx);
        if (value <= labels[0]) {
            return outputs[0].evaluate(ctx);
        }
        const stopCount = labels.length;
        if (value >= labels[stopCount - 1]) {
            return outputs[stopCount - 1].evaluate(ctx);
        }
        const index = findStopLessThanOrEqualTo(labels, value);
        return outputs[index].evaluate(ctx);
    }
    eachChild(fn) {
        fn(this.input);
        for (const expression of this.outputs) {
            fn(expression);
        }
    }
    outputDefined() {
        return this.outputs.every(out => out.outputDefined());
    }
    serialize() {
        const serialized = [
            'step',
            this.input.serialize()
        ];
        for (let i = 0; i < this.labels.length; i++) {
            if (i > 0) {
                serialized.push(this.labels[i]);
            }
            serialized.push(this.outputs[i].serialize());
        }
        return serialized;
    }
}
var Step$1 = Step;

/*
 * Copyright (C) 2008 Apple Inc. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Ported from Webkit
 * http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/platform/graphics/UnitBezier.h
 */

var unitbezier = UnitBezier;
function UnitBezier(p1x, p1y, p2x, p2y) {
    // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).
    this.cx = 3 * p1x;
    this.bx = 3 * (p2x - p1x) - this.cx;
    this.ax = 1 - this.cx - this.bx;
    this.cy = 3 * p1y;
    this.by = 3 * (p2y - p1y) - this.cy;
    this.ay = 1 - this.cy - this.by;
    this.p1x = p1x;
    this.p1y = p2y;
    this.p2x = p2x;
    this.p2y = p2y;
}
UnitBezier.prototype.sampleCurveX = function (t) {
    // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
    return ((this.ax * t + this.bx) * t + this.cx) * t;
};
UnitBezier.prototype.sampleCurveY = function (t) {
    return ((this.ay * t + this.by) * t + this.cy) * t;
};
UnitBezier.prototype.sampleCurveDerivativeX = function (t) {
    return (3 * this.ax * t + 2 * this.bx) * t + this.cx;
};
UnitBezier.prototype.solveCurveX = function (x, epsilon) {
    if (typeof epsilon === 'undefined')
        epsilon = 0.000001;
    var t0, t1, t2, x2, i;
    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 8; i++) {
        x2 = this.sampleCurveX(t2) - x;
        if (Math.abs(x2) < epsilon)
            return t2;
        var d2 = this.sampleCurveDerivativeX(t2);
        if (Math.abs(d2) < 0.000001)
            break;
        t2 = t2 - x2 / d2;
    }
    // Fall back to the bisection method for reliability.
    t0 = 0;
    t1 = 1;
    t2 = x;
    if (t2 < t0)
        return t0;
    if (t2 > t1)
        return t1;
    while (t0 < t1) {
        x2 = this.sampleCurveX(t2);
        if (Math.abs(x2 - x) < epsilon)
            return t2;
        if (x > x2) {
            t0 = t2;
        } else {
            t1 = t2;
        }
        t2 = (t1 - t0) * 0.5 + t0;
    }
    // Failure.
    return t2;
};
UnitBezier.prototype.solve = function (x, epsilon) {
    return this.sampleCurveY(this.solveCurveX(x, epsilon));
};

var UnitBezier$1 = /*@__PURE__*/getDefaultExportFromCjs(unitbezier);

//      
function number(a, b, t) {
    return a * (1 - t) + b * t;
}
function color(from, to, t) {
    return new Color$1(number(from.r, to.r, t), number(from.g, to.g, t), number(from.b, to.b, t), number(from.a, to.a, t));
}
function array(from, to, t) {
    return from.map((d, i) => {
        return number(d, to[i], t);
    });
}

var interpolate = /*#__PURE__*/Object.freeze({
	__proto__: null,
	number: number,
	color: color,
	array: array
});

//      
// Constants
const Xn = 0.95047,
    // D65 standard referent
    Yn = 1, Zn = 1.08883, t0 = 4 / 29, t1 = 6 / 29, t2 = 3 * t1 * t1, t3 = t1 * t1 * t1, deg2rad$1 = Math.PI / 180, rad2deg = 180 / Math.PI;
// Utilities
function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}
function lab2xyz(t) {
    return t > t1 ? t * t * t : t2 * (t - t0);
}
function xyz2rgb(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}
function rgb2xyz(x) {
    x /= 255;
    return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}
// LAB
function rgbToLab(rgbColor) {
    const b = rgb2xyz(rgbColor.r), a = rgb2xyz(rgbColor.g), l = rgb2xyz(rgbColor.b), x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn), y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.072175 * l) / Yn), z = xyz2lab((0.0193339 * b + 0.119192 * a + 0.9503041 * l) / Zn);
    return {
        l: 116 * y - 16,
        a: 500 * (x - y),
        b: 200 * (y - z),
        alpha: rgbColor.a
    };
}
function labToRgb(labColor) {
    let y = (labColor.l + 16) / 116, x = isNaN(labColor.a) ? y : y + labColor.a / 500, z = isNaN(labColor.b) ? y : y - labColor.b / 200;
    y = Yn * lab2xyz(y);
    x = Xn * lab2xyz(x);
    z = Zn * lab2xyz(z);
    return new Color$1(xyz2rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
    xyz2rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z), xyz2rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z), labColor.alpha);
}
function interpolateLab(from, to, t) {
    return {
        l: number(from.l, to.l, t),
        a: number(from.a, to.a, t),
        b: number(from.b, to.b, t),
        alpha: number(from.alpha, to.alpha, t)
    };
}
// HCL
function rgbToHcl(rgbColor) {
    const {l, a, b} = rgbToLab(rgbColor);
    const h = Math.atan2(b, a) * rad2deg;
    return {
        h: h < 0 ? h + 360 : h,
        c: Math.sqrt(a * a + b * b),
        l,
        alpha: rgbColor.a
    };
}
function hclToRgb(hclColor) {
    const h = hclColor.h * deg2rad$1, c = hclColor.c, l = hclColor.l;
    return labToRgb({
        l,
        a: Math.cos(h) * c,
        b: Math.sin(h) * c,
        alpha: hclColor.alpha
    });
}
function interpolateHue(a, b, t) {
    const d = b - a;
    return a + t * (d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d);
}
function interpolateHcl(from, to, t) {
    return {
        h: interpolateHue(from.h, to.h, t),
        c: number(from.c, to.c, t),
        l: number(from.l, to.l, t),
        alpha: number(from.alpha, to.alpha, t)
    };
}
const lab = {
    forward: rgbToLab,
    reverse: labToRgb,
    interpolate: interpolateLab
};
const hcl = {
    forward: rgbToHcl,
    reverse: hclToRgb,
    interpolate: interpolateHcl
};

//      
class Interpolate {
    constructor(type, operator, interpolation, input, stops) {
        this.type = type;
        this.operator = operator;
        this.interpolation = interpolation;
        this.input = input;
        this.labels = [];
        this.outputs = [];
        for (const [label, expression] of stops) {
            this.labels.push(label);
            this.outputs.push(expression);
        }
    }
    static interpolationFactor(interpolation, input, lower, upper) {
        let t = 0;
        if (interpolation.name === 'exponential') {
            t = exponentialInterpolation(input, interpolation.base, lower, upper);
        } else if (interpolation.name === 'linear') {
            t = exponentialInterpolation(input, 1, lower, upper);
        } else if (interpolation.name === 'cubic-bezier') {
            const c = interpolation.controlPoints;
            const ub = new UnitBezier$1(c[0], c[1], c[2], c[3]);
            t = ub.solve(exponentialInterpolation(input, 1, lower, upper));
        }
        return t;
    }
    static parse(args, context) {
        let [operator, interpolation, input, ...rest] = args;
        if (!Array.isArray(interpolation) || interpolation.length === 0) {
            return context.error(`Expected an interpolation type expression.`, 1);
        }
        if (interpolation[0] === 'linear') {
            interpolation = { name: 'linear' };
        } else if (interpolation[0] === 'exponential') {
            const base = interpolation[1];
            if (typeof base !== 'number')
                return context.error(`Exponential interpolation requires a numeric base.`, 1, 1);
            interpolation = {
                name: 'exponential',
                base
            };
        } else if (interpolation[0] === 'cubic-bezier') {
            const controlPoints = interpolation.slice(1);
            if (controlPoints.length !== 4 || controlPoints.some(t => typeof t !== 'number' || t < 0 || t > 1)) {
                return context.error('Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.', 1);
            }
            interpolation = {
                name: 'cubic-bezier',
                controlPoints: controlPoints
            };
        } else {
            return context.error(`Unknown interpolation type ${ String(interpolation[0]) }`, 1, 0);
        }
        if (args.length - 1 < 4) {
            return context.error(`Expected at least 4 arguments, but found only ${ args.length - 1 }.`);
        }
        if ((args.length - 1) % 2 !== 0) {
            return context.error(`Expected an even number of arguments.`);
        }
        input = context.parse(input, 2, NumberType);
        if (!input)
            return null;
        const stops = [];
        let outputType = null;
        if (operator === 'interpolate-hcl' || operator === 'interpolate-lab') {
            outputType = ColorType;
        } else if (context.expectedType && context.expectedType.kind !== 'value') {
            outputType = context.expectedType;
        }
        for (let i = 0; i < rest.length; i += 2) {
            const label = rest[i];
            const value = rest[i + 1];
            const labelKey = i + 3;
            const valueKey = i + 4;
            if (typeof label !== 'number') {
                return context.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey);
            }
            if (stops.length && stops[stops.length - 1][0] >= label) {
                return context.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', labelKey);
            }
            const parsed = context.parse(value, valueKey, outputType);
            if (!parsed)
                return null;
            outputType = outputType || parsed.type;
            stops.push([
                label,
                parsed
            ]);
        }
        if (outputType.kind !== 'number' && outputType.kind !== 'color' && !(outputType.kind === 'array' && outputType.itemType.kind === 'number' && typeof outputType.N === 'number')) {
            return context.error(`Type ${ toString$1(outputType) } is not interpolatable.`);
        }
        return new Interpolate(outputType, operator, interpolation, input, stops);
    }
    evaluate(ctx) {
        const labels = this.labels;
        const outputs = this.outputs;
        if (labels.length === 1) {
            return outputs[0].evaluate(ctx);
        }
        const value = this.input.evaluate(ctx);
        if (value <= labels[0]) {
            return outputs[0].evaluate(ctx);
        }
        const stopCount = labels.length;
        if (value >= labels[stopCount - 1]) {
            return outputs[stopCount - 1].evaluate(ctx);
        }
        const index = findStopLessThanOrEqualTo(labels, value);
        const lower = labels[index];
        const upper = labels[index + 1];
        const t = Interpolate.interpolationFactor(this.interpolation, value, lower, upper);
        const outputLower = outputs[index].evaluate(ctx);
        const outputUpper = outputs[index + 1].evaluate(ctx);
        if (this.operator === 'interpolate') {
            return interpolate[this.type.kind.toLowerCase()](outputLower, outputUpper, t);    // eslint-disable-line import/namespace
        } else if (this.operator === 'interpolate-hcl') {
            return hcl.reverse(hcl.interpolate(hcl.forward(outputLower), hcl.forward(outputUpper), t));
        } else {
            return lab.reverse(lab.interpolate(lab.forward(outputLower), lab.forward(outputUpper), t));
        }
    }
    eachChild(fn) {
        fn(this.input);
        for (const expression of this.outputs) {
            fn(expression);
        }
    }
    outputDefined() {
        return this.outputs.every(out => out.outputDefined());
    }
    serialize() {
        let interpolation;
        if (this.interpolation.name === 'linear') {
            interpolation = ['linear'];
        } else if (this.interpolation.name === 'exponential') {
            if (this.interpolation.base === 1) {
                interpolation = ['linear'];
            } else {
                interpolation = [
                    'exponential',
                    this.interpolation.base
                ];
            }
        } else {
            interpolation = ['cubic-bezier'].concat(this.interpolation.controlPoints);
        }
        const serialized = [
            this.operator,
            interpolation,
            this.input.serialize()
        ];
        for (let i = 0; i < this.labels.length; i++) {
            serialized.push(this.labels[i], this.outputs[i].serialize());
        }
        return serialized;
    }
}
/**
 * Returns a ratio that can be used to interpolate between exponential function
 * stops.
 * How it works: Two consecutive stop values define a (scaled and shifted) exponential function `f(x) = a * base^x + b`, where `base` is the user-specified base,
 * and `a` and `b` are constants affording sufficient degrees of freedom to fit
 * the function to the given stops.
 *
 * Here's a bit of algebra that lets us compute `f(x)` directly from the stop
 * values without explicitly solving for `a` and `b`:
 *
 * First stop value: `f(x0) = y0 = a * base^x0 + b`
 * Second stop value: `f(x1) = y1 = a * base^x1 + b`
 * => `y1 - y0 = a(base^x1 - base^x0)`
 * => `a = (y1 - y0)/(base^x1 - base^x0)`
 *
 * Desired value: `f(x) = y = a * base^x + b`
 * => `f(x) = y0 + a * (base^x - base^x0)`
 *
 * From the above, we can replace the `a` in `a * (base^x - base^x0)` and do a
 * little algebra:
 * ```
 * a * (base^x - base^x0) = (y1 - y0)/(base^x1 - base^x0) * (base^x - base^x0)
 *                     = (y1 - y0) * (base^x - base^x0) / (base^x1 - base^x0)
 * ```
 *
 * If we let `(base^x - base^x0) / (base^x1 base^x0)`, then we have
 * `f(x) = y0 + (y1 - y0) * ratio`.  In other words, `ratio` may be treated as
 * an interpolation factor between the two stops' output values.
 *
 * (Note: a slightly different form for `ratio`,
 * `(base^(x-x0) - 1) / (base^(x1-x0) - 1) `, is equivalent, but requires fewer
 * expensive `Math.pow()` operations.)
 *
 * @private
*/
function exponentialInterpolation(input, base, lowerValue, upperValue) {
    const difference = upperValue - lowerValue;
    const progress = input - lowerValue;
    if (difference === 0) {
        return 0;
    } else if (base === 1) {
        return progress / difference;
    } else {
        return (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
    }
}
var Interpolate$1 = Interpolate;

class Coalesce {
    constructor(type, args) {
        this.type = type;
        this.args = args;
    }
    static parse(args, context) {
        if (args.length < 2) {
            return context.error('Expectected at least one argument.');
        }
        let outputType = null;
        const expectedType = context.expectedType;
        if (expectedType && expectedType.kind !== 'value') {
            outputType = expectedType;
        }
        const parsedArgs = [];
        for (const arg of args.slice(1)) {
            const parsed = context.parse(arg, 1 + parsedArgs.length, outputType, undefined, { typeAnnotation: 'omit' });
            if (!parsed)
                return null;
            outputType = outputType || parsed.type;
            parsedArgs.push(parsed);
        }
        // Above, we parse arguments without inferred type annotation so that
        // they don't produce a runtime error for `null` input, which would
        // preempt the desired null-coalescing behavior.
        // Thus, if any of our arguments would have needed an annotation, we
        // need to wrap the enclosing coalesce expression with it instead.
        const needsAnnotation = expectedType && parsedArgs.some(arg => checkSubtype(expectedType, arg.type));
        return needsAnnotation ? new Coalesce(ValueType, parsedArgs) : new Coalesce(outputType, parsedArgs);
    }
    evaluate(ctx) {
        let result = null;
        let argCount = 0;
        let firstImage;
        for (const arg of this.args) {
            argCount++;
            result = arg.evaluate(ctx);
            // we need to keep track of the first requested image in a coalesce statement
            // if coalesce can't find a valid image, we return the first image so styleimagemissing can fire
            if (result && result instanceof ResolvedImage && !result.available) {
                // set to first image
                if (!firstImage) {
                    firstImage = result;
                }
                result = null;
                // if we reach the end, return the first image
                if (argCount === this.args.length) {
                    return firstImage;
                }
            }
            if (result !== null)
                break;
        }
        return result;
    }
    eachChild(fn) {
        this.args.forEach(fn);
    }
    outputDefined() {
        return this.args.every(arg => arg.outputDefined());
    }
    serialize() {
        const serialized = ['coalesce'];
        this.eachChild(child => {
            serialized.push(child.serialize());
        });
        return serialized;
    }
}
var Coalesce$1 = Coalesce;

//      
class Let {
    constructor(bindings, result) {
        this.type = result.type;
        this.bindings = [].concat(bindings);
        this.result = result;
    }
    evaluate(ctx) {
        return this.result.evaluate(ctx);
    }
    eachChild(fn) {
        for (const binding of this.bindings) {
            fn(binding[1]);
        }
        fn(this.result);
    }
    static parse(args, context) {
        if (args.length < 4)
            return context.error(`Expected at least 3 arguments, but found ${ args.length - 1 } instead.`);
        const bindings = [];
        for (let i = 1; i < args.length - 1; i += 2) {
            const name = args[i];
            if (typeof name !== 'string') {
                return context.error(`Expected string, but found ${ typeof name } instead.`, i);
            }
            if (/[^a-zA-Z0-9_]/.test(name)) {
                return context.error(`Variable names must contain only alphanumeric characters or '_'.`, i);
            }
            const value = context.parse(args[i + 1], i + 1);
            if (!value)
                return null;
            bindings.push([
                name,
                value
            ]);
        }
        const result = context.parse(args[args.length - 1], args.length - 1, context.expectedType, bindings);
        if (!result)
            return null;
        return new Let(bindings, result);
    }
    outputDefined() {
        return this.result.outputDefined();
    }
    serialize() {
        const serialized = ['let'];
        for (const [name, expr] of this.bindings) {
            serialized.push(name, expr.serialize());
        }
        serialized.push(this.result.serialize());
        return serialized;
    }
}
var Let$1 = Let;

//      
class At {
    constructor(type, index, input) {
        this.type = type;
        this.index = index;
        this.input = input;
    }
    static parse(args, context) {
        if (args.length !== 3)
            return context.error(`Expected 2 arguments, but found ${ args.length - 1 } instead.`);
        const index = context.parse(args[1], 1, NumberType);
        const input = context.parse(args[2], 2, array$1(context.expectedType || ValueType));
        if (!index || !input)
            return null;
        const t = input.type;
        return new At(t.itemType, index, input);
    }
    evaluate(ctx) {
        const index = this.index.evaluate(ctx);
        const array = this.input.evaluate(ctx);
        if (index < 0) {
            throw new RuntimeError$1(`Array index out of bounds: ${ index } < 0.`);
        }
        if (index >= array.length) {
            throw new RuntimeError$1(`Array index out of bounds: ${ index } > ${ array.length - 1 }.`);
        }
        if (index !== Math.floor(index)) {
            throw new RuntimeError$1(`Array index must be an integer, but found ${ index } instead.`);
        }
        return array[index];
    }
    eachChild(fn) {
        fn(this.index);
        fn(this.input);
    }
    outputDefined() {
        return false;
    }
    serialize() {
        return [
            'at',
            this.index.serialize(),
            this.input.serialize()
        ];
    }
}
var At$1 = At;

//      
class In {
    constructor(needle, haystack) {
        this.type = BooleanType;
        this.needle = needle;
        this.haystack = haystack;
    }
    static parse(args, context) {
        if (args.length !== 3) {
            return context.error(`Expected 2 arguments, but found ${ args.length - 1 } instead.`);
        }
        const needle = context.parse(args[1], 1, ValueType);
        const haystack = context.parse(args[2], 2, ValueType);
        if (!needle || !haystack)
            return null;
        if (!isValidType(needle.type, [
                BooleanType,
                StringType,
                NumberType,
                NullType,
                ValueType
            ])) {
            return context.error(`Expected first argument to be of type boolean, string, number or null, but found ${ toString$1(needle.type) } instead`);
        }
        return new In(needle, haystack);
    }
    evaluate(ctx) {
        const needle = this.needle.evaluate(ctx);
        const haystack = this.haystack.evaluate(ctx);
        if (haystack == null)
            return false;
        if (!isValidNativeType(needle, [
                'boolean',
                'string',
                'number',
                'null'
            ])) {
            throw new RuntimeError$1(`Expected first argument to be of type boolean, string, number or null, but found ${ toString$1(typeOf(needle)) } instead.`);
        }
        if (!isValidNativeType(haystack, [
                'string',
                'array'
            ])) {
            throw new RuntimeError$1(`Expected second argument to be of type array or string, but found ${ toString$1(typeOf(haystack)) } instead.`);
        }
        return haystack.indexOf(needle) >= 0;
    }
    eachChild(fn) {
        fn(this.needle);
        fn(this.haystack);
    }
    outputDefined() {
        return true;
    }
    serialize() {
        return [
            'in',
            this.needle.serialize(),
            this.haystack.serialize()
        ];
    }
}
var In$1 = In;

//      
class IndexOf {
    constructor(needle, haystack, fromIndex) {
        this.type = NumberType;
        this.needle = needle;
        this.haystack = haystack;
        this.fromIndex = fromIndex;
    }
    static parse(args, context) {
        if (args.length <= 2 || args.length >= 5) {
            return context.error(`Expected 3 or 4 arguments, but found ${ args.length - 1 } instead.`);
        }
        const needle = context.parse(args[1], 1, ValueType);
        const haystack = context.parse(args[2], 2, ValueType);
        if (!needle || !haystack)
            return null;
        if (!isValidType(needle.type, [
                BooleanType,
                StringType,
                NumberType,
                NullType,
                ValueType
            ])) {
            return context.error(`Expected first argument to be of type boolean, string, number or null, but found ${ toString$1(needle.type) } instead`);
        }
        if (args.length === 4) {
            const fromIndex = context.parse(args[3], 3, NumberType);
            if (!fromIndex)
                return null;
            return new IndexOf(needle, haystack, fromIndex);
        } else {
            return new IndexOf(needle, haystack);
        }
    }
    evaluate(ctx) {
        const needle = this.needle.evaluate(ctx);
        const haystack = this.haystack.evaluate(ctx);
        if (!isValidNativeType(needle, [
                'boolean',
                'string',
                'number',
                'null'
            ])) {
            throw new RuntimeError$1(`Expected first argument to be of type boolean, string, number or null, but found ${ toString$1(typeOf(needle)) } instead.`);
        }
        if (!isValidNativeType(haystack, [
                'string',
                'array'
            ])) {
            throw new RuntimeError$1(`Expected second argument to be of type array or string, but found ${ toString$1(typeOf(haystack)) } instead.`);
        }
        if (this.fromIndex) {
            const fromIndex = this.fromIndex.evaluate(ctx);
            return haystack.indexOf(needle, fromIndex);
        }
        return haystack.indexOf(needle);
    }
    eachChild(fn) {
        fn(this.needle);
        fn(this.haystack);
        if (this.fromIndex) {
            fn(this.fromIndex);
        }
    }
    outputDefined() {
        return false;
    }
    serialize() {
        if (this.fromIndex != null && this.fromIndex !== undefined) {
            const fromIndex = this.fromIndex.serialize();
            return [
                'index-of',
                this.needle.serialize(),
                this.haystack.serialize(),
                fromIndex
            ];
        }
        return [
            'index-of',
            this.needle.serialize(),
            this.haystack.serialize()
        ];
    }
}
var IndexOf$1 = IndexOf;

// Map input label values to output expression index
class Match {
    constructor(inputType, outputType, input, cases, outputs, otherwise) {
        this.inputType = inputType;
        this.type = outputType;
        this.input = input;
        this.cases = cases;
        this.outputs = outputs;
        this.otherwise = otherwise;
    }
    static parse(args, context) {
        if (args.length < 5)
            return context.error(`Expected at least 4 arguments, but found only ${ args.length - 1 }.`);
        if (args.length % 2 !== 1)
            return context.error(`Expected an even number of arguments.`);
        let inputType;
        let outputType;
        if (context.expectedType && context.expectedType.kind !== 'value') {
            outputType = context.expectedType;
        }
        const cases = {};
        const outputs = [];
        for (let i = 2; i < args.length - 1; i += 2) {
            let labels = args[i];
            const value = args[i + 1];
            if (!Array.isArray(labels)) {
                labels = [labels];
            }
            const labelContext = context.concat(i);
            if (labels.length === 0) {
                return labelContext.error('Expected at least one branch label.');
            }
            for (const label of labels) {
                if (typeof label !== 'number' && typeof label !== 'string') {
                    return labelContext.error(`Branch labels must be numbers or strings.`);
                } else if (typeof label === 'number' && Math.abs(label) > Number.MAX_SAFE_INTEGER) {
                    return labelContext.error(`Branch labels must be integers no larger than ${ Number.MAX_SAFE_INTEGER }.`);
                } else if (typeof label === 'number' && Math.floor(label) !== label) {
                    return labelContext.error(`Numeric branch labels must be integer values.`);
                } else if (!inputType) {
                    inputType = typeOf(label);
                } else if (labelContext.checkSubtype(inputType, typeOf(label))) {
                    return null;
                }
                if (typeof cases[String(label)] !== 'undefined') {
                    return labelContext.error('Branch labels must be unique.');
                }
                cases[String(label)] = outputs.length;
            }
            const result = context.parse(value, i, outputType);
            if (!result)
                return null;
            outputType = outputType || result.type;
            outputs.push(result);
        }
        const input = context.parse(args[1], 1, ValueType);
        if (!input)
            return null;
        const otherwise = context.parse(args[args.length - 1], args.length - 1, outputType);
        if (!otherwise)
            return null;
        if (input.type.kind !== 'value' && context.concat(1).checkSubtype(inputType, input.type)) {
            return null;
        }
        return new Match(inputType, outputType, input, cases, outputs, otherwise);
    }
    evaluate(ctx) {
        const input = this.input.evaluate(ctx);
        const output = typeOf(input) === this.inputType && this.outputs[this.cases[input]] || this.otherwise;
        return output.evaluate(ctx);
    }
    eachChild(fn) {
        fn(this.input);
        this.outputs.forEach(fn);
        fn(this.otherwise);
    }
    outputDefined() {
        return this.outputs.every(out => out.outputDefined()) && this.otherwise.outputDefined();
    }
    serialize() {
        const serialized = [
            'match',
            this.input.serialize()
        ];
        // Sort so serialization has an arbitrary defined order, even though
        // branch order doesn't affect evaluation
        const sortedLabels = Object.keys(this.cases).sort();
        // Group branches by unique match expression to support condensed
        // serializations of the form [case1, case2, ...] -> matchExpression
        const groupedByOutput = [];
        const outputLookup = {};
        // lookup index into groupedByOutput for a given output expression
        for (const label of sortedLabels) {
            const outputIndex = outputLookup[this.cases[label]];
            if (outputIndex === undefined) {
                // First time seeing this output, add it to the end of the grouped list
                outputLookup[this.cases[label]] = groupedByOutput.length;
                groupedByOutput.push([
                    this.cases[label],
                    [label]
                ]);
            } else {
                // We've seen this expression before, add the label to that output's group
                groupedByOutput[outputIndex][1].push(label);
            }
        }
        const coerceLabel = label => this.inputType.kind === 'number' ? Number(label) : label;
        for (const [outputIndex, labels] of groupedByOutput) {
            if (labels.length === 1) {
                // Only a single label matches this output expression
                serialized.push(coerceLabel(labels[0]));
            } else {
                // Array of literal labels pointing to this output expression
                serialized.push(labels.map(coerceLabel));
            }
            serialized.push(this.outputs[outputIndex].serialize());
        }
        serialized.push(this.otherwise.serialize());
        return serialized;
    }
}
var Match$1 = Match;

class Case {
    constructor(type, branches, otherwise) {
        this.type = type;
        this.branches = branches;
        this.otherwise = otherwise;
    }
    static parse(args, context) {
        if (args.length < 4)
            return context.error(`Expected at least 3 arguments, but found only ${ args.length - 1 }.`);
        if (args.length % 2 !== 0)
            return context.error(`Expected an odd number of arguments.`);
        let outputType;
        if (context.expectedType && context.expectedType.kind !== 'value') {
            outputType = context.expectedType;
        }
        const branches = [];
        for (let i = 1; i < args.length - 1; i += 2) {
            const test = context.parse(args[i], i, BooleanType);
            if (!test)
                return null;
            const result = context.parse(args[i + 1], i + 1, outputType);
            if (!result)
                return null;
            branches.push([
                test,
                result
            ]);
            outputType = outputType || result.type;
        }
        const otherwise = context.parse(args[args.length - 1], args.length - 1, outputType);
        if (!otherwise)
            return null;
        return new Case(outputType, branches, otherwise);
    }
    evaluate(ctx) {
        for (const [test, expression] of this.branches) {
            if (test.evaluate(ctx)) {
                return expression.evaluate(ctx);
            }
        }
        return this.otherwise.evaluate(ctx);
    }
    eachChild(fn) {
        for (const [test, expression] of this.branches) {
            fn(test);
            fn(expression);
        }
        fn(this.otherwise);
    }
    outputDefined() {
        return this.branches.every(([_, out]) => out.outputDefined()) && this.otherwise.outputDefined();
    }
    serialize() {
        const serialized = ['case'];
        this.eachChild(child => {
            serialized.push(child.serialize());
        });
        return serialized;
    }
}
var Case$1 = Case;

//      
class Slice {
    constructor(type, input, beginIndex, endIndex) {
        this.type = type;
        this.input = input;
        this.beginIndex = beginIndex;
        this.endIndex = endIndex;
    }
    static parse(args, context) {
        if (args.length <= 2 || args.length >= 5) {
            return context.error(`Expected 3 or 4 arguments, but found ${ args.length - 1 } instead.`);
        }
        const input = context.parse(args[1], 1, ValueType);
        const beginIndex = context.parse(args[2], 2, NumberType);
        if (!input || !beginIndex)
            return null;
        if (!isValidType(input.type, [
                array$1(ValueType),
                StringType,
                ValueType
            ])) {
            return context.error(`Expected first argument to be of type array or string, but found ${ toString$1(input.type) } instead`);
        }
        if (args.length === 4) {
            const endIndex = context.parse(args[3], 3, NumberType);
            if (!endIndex)
                return null;
            return new Slice(input.type, input, beginIndex, endIndex);
        } else {
            return new Slice(input.type, input, beginIndex);
        }
    }
    evaluate(ctx) {
        const input = this.input.evaluate(ctx);
        const beginIndex = this.beginIndex.evaluate(ctx);
        if (!isValidNativeType(input, [
                'string',
                'array'
            ])) {
            throw new RuntimeError$1(`Expected first argument to be of type array or string, but found ${ toString$1(typeOf(input)) } instead.`);
        }
        if (this.endIndex) {
            const endIndex = this.endIndex.evaluate(ctx);
            return input.slice(beginIndex, endIndex);
        }
        return input.slice(beginIndex);
    }
    eachChild(fn) {
        fn(this.input);
        fn(this.beginIndex);
        if (this.endIndex) {
            fn(this.endIndex);
        }
    }
    outputDefined() {
        return false;
    }
    serialize() {
        if (this.endIndex != null && this.endIndex !== undefined) {
            const endIndex = this.endIndex.serialize();
            return [
                'slice',
                this.input.serialize(),
                this.beginIndex.serialize(),
                endIndex
            ];
        }
        return [
            'slice',
            this.input.serialize(),
            this.beginIndex.serialize()
        ];
    }
}
var Slice$1 = Slice;

//      
function isComparableType(op, type) {
    if (op === '==' || op === '!=') {
        // equality operator
        return type.kind === 'boolean' || type.kind === 'string' || type.kind === 'number' || type.kind === 'null' || type.kind === 'value';
    } else {
        // ordering operator
        return type.kind === 'string' || type.kind === 'number' || type.kind === 'value';
    }
}
function eq(ctx, a, b) {
    return a === b;
}
function neq(ctx, a, b) {
    return a !== b;
}
function lt(ctx, a, b) {
    return a < b;
}
function gt(ctx, a, b) {
    return a > b;
}
function lteq(ctx, a, b) {
    return a <= b;
}
function gteq(ctx, a, b) {
    return a >= b;
}
function eqCollate(ctx, a, b, c) {
    return c.compare(a, b) === 0;
}
function neqCollate(ctx, a, b, c) {
    return !eqCollate(ctx, a, b, c);
}
function ltCollate(ctx, a, b, c) {
    return c.compare(a, b) < 0;
}
function gtCollate(ctx, a, b, c) {
    return c.compare(a, b) > 0;
}
function lteqCollate(ctx, a, b, c) {
    return c.compare(a, b) <= 0;
}
function gteqCollate(ctx, a, b, c) {
    return c.compare(a, b) >= 0;
}
/**
 * Special form for comparison operators, implementing the signatures:
 * - (T, T, ?Collator) => boolean
 * - (T, value, ?Collator) => boolean
 * - (value, T, ?Collator) => boolean
 *
 * For inequalities, T must be either value, string, or number. For ==/!=, it
 * can also be boolean or null.
 *
 * Equality semantics are equivalent to Javascript's strict equality (===/!==)
 * -- i.e., when the arguments' types don't match, == evaluates to false, != to
 * true.
 *
 * When types don't match in an ordering comparison, a runtime error is thrown.
 *
 * @private
 */
function makeComparison(op, compareBasic, compareWithCollator) {
    const isOrderComparison = op !== '==' && op !== '!=';
    return class Comparison {
        constructor(lhs, rhs, collator) {
            this.type = BooleanType;
            this.lhs = lhs;
            this.rhs = rhs;
            this.collator = collator;
            this.hasUntypedArgument = lhs.type.kind === 'value' || rhs.type.kind === 'value';
        }
        static parse(args, context) {
            if (args.length !== 3 && args.length !== 4)
                return context.error(`Expected two or three arguments.`);
            const op = args[0];
            let lhs = context.parse(args[1], 1, ValueType);
            if (!lhs)
                return null;
            if (!isComparableType(op, lhs.type)) {
                return context.concat(1).error(`"${ op }" comparisons are not supported for type '${ toString$1(lhs.type) }'.`);
            }
            let rhs = context.parse(args[2], 2, ValueType);
            if (!rhs)
                return null;
            if (!isComparableType(op, rhs.type)) {
                return context.concat(2).error(`"${ op }" comparisons are not supported for type '${ toString$1(rhs.type) }'.`);
            }
            if (lhs.type.kind !== rhs.type.kind && lhs.type.kind !== 'value' && rhs.type.kind !== 'value') {
                return context.error(`Cannot compare types '${ toString$1(lhs.type) }' and '${ toString$1(rhs.type) }'.`);
            }
            if (isOrderComparison) {
                // typing rules specific to less/greater than operators
                if (lhs.type.kind === 'value' && rhs.type.kind !== 'value') {
                    // (value, T)
                    lhs = new Assertion$1(rhs.type, [lhs]);
                } else if (lhs.type.kind !== 'value' && rhs.type.kind === 'value') {
                    // (T, value)
                    rhs = new Assertion$1(lhs.type, [rhs]);
                }
            }
            let collator = null;
            if (args.length === 4) {
                if (lhs.type.kind !== 'string' && rhs.type.kind !== 'string' && lhs.type.kind !== 'value' && rhs.type.kind !== 'value') {
                    return context.error(`Cannot use collator to compare non-string types.`);
                }
                collator = context.parse(args[3], 3, CollatorType);
                if (!collator)
                    return null;
            }
            return new Comparison(lhs, rhs, collator);
        }
        evaluate(ctx) {
            const lhs = this.lhs.evaluate(ctx);
            const rhs = this.rhs.evaluate(ctx);
            if (isOrderComparison && this.hasUntypedArgument) {
                const lt = typeOf(lhs);
                const rt = typeOf(rhs);
                // check that type is string or number, and equal
                if (lt.kind !== rt.kind || !(lt.kind === 'string' || lt.kind === 'number')) {
                    throw new RuntimeError$1(`Expected arguments for "${ op }" to be (string, string) or (number, number), but found (${ lt.kind }, ${ rt.kind }) instead.`);
                }
            }
            if (this.collator && !isOrderComparison && this.hasUntypedArgument) {
                const lt = typeOf(lhs);
                const rt = typeOf(rhs);
                if (lt.kind !== 'string' || rt.kind !== 'string') {
                    return compareBasic(ctx, lhs, rhs);
                }
            }
            return this.collator ? compareWithCollator(ctx, lhs, rhs, this.collator.evaluate(ctx)) : compareBasic(ctx, lhs, rhs);
        }
        eachChild(fn) {
            fn(this.lhs);
            fn(this.rhs);
            if (this.collator) {
                fn(this.collator);
            }
        }
        outputDefined() {
            return true;
        }
        serialize() {
            const serialized = [op];
            this.eachChild(child => {
                serialized.push(child.serialize());
            });
            return serialized;
        }
    };
}
const Equals = makeComparison('==', eq, eqCollate);
const NotEquals = makeComparison('!=', neq, neqCollate);
const LessThan = makeComparison('<', lt, ltCollate);
const GreaterThan = makeComparison('>', gt, gtCollate);
const LessThanOrEqual = makeComparison('<=', lteq, lteqCollate);
const GreaterThanOrEqual = makeComparison('>=', gteq, gteqCollate);

//      
class NumberFormat {
    // BCP 47 language tag
    // ISO 4217 currency code, required if style=currency
    // Simple units sanctioned for use in ECMAScript, required if style=unit. https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier
    // Default 0
    // Default 3
    constructor(number, locale, currency, unit, minFractionDigits, maxFractionDigits) {
        this.type = StringType;
        this.number = number;
        this.locale = locale;
        this.currency = currency;
        this.unit = unit;
        this.minFractionDigits = minFractionDigits;
        this.maxFractionDigits = maxFractionDigits;
    }
    static parse(args, context) {
        if (args.length !== 3)
            return context.error(`Expected two arguments.`);
        const number = context.parse(args[1], 1, NumberType);
        if (!number)
            return null;
        const options = args[2];
        if (typeof options !== 'object' || Array.isArray(options))
            return context.error(`NumberFormat options argument must be an object.`);
        let locale = null;
        if (options['locale']) {
            locale = context.parse(options['locale'], 1, StringType);
            if (!locale)
                return null;
        }
        let currency = null;
        if (options['currency']) {
            currency = context.parse(options['currency'], 1, StringType);
            if (!currency)
                return null;
        }
        let unit = null;
        if (options['unit']) {
            unit = context.parse(options['unit'], 1, StringType);
            if (!unit)
                return null;
        }
        let minFractionDigits = null;
        if (options['min-fraction-digits']) {
            minFractionDigits = context.parse(options['min-fraction-digits'], 1, NumberType);
            if (!minFractionDigits)
                return null;
        }
        let maxFractionDigits = null;
        if (options['max-fraction-digits']) {
            maxFractionDigits = context.parse(options['max-fraction-digits'], 1, NumberType);
            if (!maxFractionDigits)
                return null;
        }
        return new NumberFormat(number, locale, currency, unit, minFractionDigits, maxFractionDigits);
    }
    evaluate(ctx) {
        return new Intl.NumberFormat(this.locale ? this.locale.evaluate(ctx) : [], {
            style: this.currency && 'currency' || this.unit && 'unit' || 'decimal',
            currency: this.currency ? this.currency.evaluate(ctx) : undefined,
            unit: this.unit ? this.unit.evaluate(ctx) : undefined,
            minimumFractionDigits: this.minFractionDigits ? this.minFractionDigits.evaluate(ctx) : undefined,
            maximumFractionDigits: this.maxFractionDigits ? this.maxFractionDigits.evaluate(ctx) : undefined
        }).format(this.number.evaluate(ctx));
    }
    eachChild(fn) {
        fn(this.number);
        if (this.locale) {
            fn(this.locale);
        }
        if (this.currency) {
            fn(this.currency);
        }
        if (this.unit) {
            fn(this.unit);
        }
        if (this.minFractionDigits) {
            fn(this.minFractionDigits);
        }
        if (this.maxFractionDigits) {
            fn(this.maxFractionDigits);
        }
    }
    outputDefined() {
        return false;
    }
    serialize() {
        const options = {};
        if (this.locale) {
            options['locale'] = this.locale.serialize();
        }
        if (this.currency) {
            options['currency'] = this.currency.serialize();
        }
        if (this.unit) {
            options['unit'] = this.unit.serialize();
        }
        if (this.minFractionDigits) {
            options['min-fraction-digits'] = this.minFractionDigits.serialize();
        }
        if (this.maxFractionDigits) {
            options['max-fraction-digits'] = this.maxFractionDigits.serialize();
        }
        return [
            'number-format',
            this.number.serialize(),
            options
        ];
    }
}

//      
class Length {
    constructor(input) {
        this.type = NumberType;
        this.input = input;
    }
    static parse(args, context) {
        if (args.length !== 2)
            return context.error(`Expected 1 argument, but found ${ args.length - 1 } instead.`);
        const input = context.parse(args[1], 1);
        if (!input)
            return null;
        if (input.type.kind !== 'array' && input.type.kind !== 'string' && input.type.kind !== 'value')
            return context.error(`Expected argument of type string or array, but found ${ toString$1(input.type) } instead.`);
        return new Length(input);
    }
    evaluate(ctx) {
        const input = this.input.evaluate(ctx);
        if (typeof input === 'string') {
            return input.length;
        } else if (Array.isArray(input)) {
            return input.length;
        } else {
            throw new RuntimeError$1(`Expected value to be of type string or array, but found ${ toString$1(typeOf(input)) } instead.`);
        }
    }
    eachChild(fn) {
        fn(this.input);
    }
    outputDefined() {
        return false;
    }
    serialize() {
        const serialized = ['length'];
        this.eachChild(child => {
            serialized.push(child.serialize());
        });
        return serialized;
    }
}
var Length$1 = Length;

//      
const expressions = {
    // special forms
    '==': Equals,
    '!=': NotEquals,
    '>': GreaterThan,
    '<': LessThan,
    '>=': GreaterThanOrEqual,
    '<=': LessThanOrEqual,
    'array': Assertion$1,
    'at': At$1,
    'boolean': Assertion$1,
    'case': Case$1,
    'coalesce': Coalesce$1,
    'collator': CollatorExpression,
    'format': FormatExpression,
    'image': ImageExpression,
    'in': In$1,
    'index-of': IndexOf$1,
    'interpolate': Interpolate$1,
    'interpolate-hcl': Interpolate$1,
    'interpolate-lab': Interpolate$1,
    'length': Length$1,
    'let': Let$1,
    'literal': Literal$1,
    'match': Match$1,
    'number': Assertion$1,
    'number-format': NumberFormat,
    'object': Assertion$1,
    'slice': Slice$1,
    'step': Step$1,
    'string': Assertion$1,
    'to-boolean': Coercion$1,
    'to-color': Coercion$1,
    'to-number': Coercion$1,
    'to-string': Coercion$1,
    'var': Var$1,
    'within': Within$1
};
function rgba(ctx, [r, g, b, a]) {
    r = r.evaluate(ctx);
    g = g.evaluate(ctx);
    b = b.evaluate(ctx);
    const alpha = a ? a.evaluate(ctx) : 1;
    const error = validateRGBA(r, g, b, alpha);
    if (error)
        throw new RuntimeError$1(error);
    return new Color$1(r / 255 * alpha, g / 255 * alpha, b / 255 * alpha, alpha);
}
function has(key, obj) {
    return key in obj;
}
function get(key, obj) {
    const v = obj[key];
    return typeof v === 'undefined' ? null : v;
}
function binarySearch(v, a, i, j) {
    while (i <= j) {
        const m = i + j >> 1;
        if (a[m] === v)
            return true;
        if (a[m] > v)
            j = m - 1;
        else
            i = m + 1;
    }
    return false;
}
function varargs(type) {
    return { type };
}
CompoundExpression$1.register(expressions, {
    'error': [
        ErrorType,
        [StringType],
        (ctx, [v]) => {
            throw new RuntimeError$1(v.evaluate(ctx));
        }
    ],
    'typeof': [
        StringType,
        [ValueType],
        (ctx, [v]) => toString$1(typeOf(v.evaluate(ctx)))
    ],
    'to-rgba': [
        array$1(NumberType, 4),
        [ColorType],
        (ctx, [v]) => {
            return v.evaluate(ctx).toArray();
        }
    ],
    'rgb': [
        ColorType,
        [
            NumberType,
            NumberType,
            NumberType
        ],
        rgba
    ],
    'rgba': [
        ColorType,
        [
            NumberType,
            NumberType,
            NumberType,
            NumberType
        ],
        rgba
    ],
    'has': {
        type: BooleanType,
        overloads: [
            [
                [StringType],
                (ctx, [key]) => has(key.evaluate(ctx), ctx.properties())
            ],
            [
                [
                    StringType,
                    ObjectType
                ],
                (ctx, [key, obj]) => has(key.evaluate(ctx), obj.evaluate(ctx))
            ]
        ]
    },
    'get': {
        type: ValueType,
        overloads: [
            [
                [StringType],
                (ctx, [key]) => get(key.evaluate(ctx), ctx.properties())
            ],
            [
                [
                    StringType,
                    ObjectType
                ],
                (ctx, [key, obj]) => get(key.evaluate(ctx), obj.evaluate(ctx))
            ]
        ]
    },
    'feature-state': [
        ValueType,
        [StringType],
        (ctx, [key]) => get(key.evaluate(ctx), ctx.featureState || {})
    ],
    'properties': [
        ObjectType,
        [],
        ctx => ctx.properties()
    ],
    'geometry-type': [
        StringType,
        [],
        ctx => ctx.geometryType()
    ],
    'id': [
        ValueType,
        [],
        ctx => ctx.id()
    ],
    'zoom': [
        NumberType,
        [],
        ctx => ctx.globals.zoom
    ],
    'pitch': [
        NumberType,
        [],
        ctx => ctx.globals.pitch || 0
    ],
    'distance-from-center': [
        NumberType,
        [],
        ctx => ctx.distanceFromCenter()
    ],
    'heatmap-density': [
        NumberType,
        [],
        ctx => ctx.globals.heatmapDensity || 0
    ],
    'line-progress': [
        NumberType,
        [],
        ctx => ctx.globals.lineProgress || 0
    ],
    'sky-radial-progress': [
        NumberType,
        [],
        ctx => ctx.globals.skyRadialProgress || 0
    ],
    'accumulated': [
        ValueType,
        [],
        ctx => ctx.globals.accumulated === undefined ? null : ctx.globals.accumulated
    ],
    '+': [
        NumberType,
        varargs(NumberType),
        (ctx, args) => {
            let result = 0;
            for (const arg of args) {
                result += arg.evaluate(ctx);
            }
            return result;
        }
    ],
    '*': [
        NumberType,
        varargs(NumberType),
        (ctx, args) => {
            let result = 1;
            for (const arg of args) {
                result *= arg.evaluate(ctx);
            }
            return result;
        }
    ],
    '-': {
        type: NumberType,
        overloads: [
            [
                [
                    NumberType,
                    NumberType
                ],
                (ctx, [a, b]) => a.evaluate(ctx) - b.evaluate(ctx)
            ],
            [
                [NumberType],
                (ctx, [a]) => -a.evaluate(ctx)
            ]
        ]
    },
    '/': [
        NumberType,
        [
            NumberType,
            NumberType
        ],
        (ctx, [a, b]) => a.evaluate(ctx) / b.evaluate(ctx)
    ],
    '%': [
        NumberType,
        [
            NumberType,
            NumberType
        ],
        (ctx, [a, b]) => a.evaluate(ctx) % b.evaluate(ctx)
    ],
    'ln2': [
        NumberType,
        [],
        () => Math.LN2
    ],
    'pi': [
        NumberType,
        [],
        () => Math.PI
    ],
    'e': [
        NumberType,
        [],
        () => Math.E
    ],
    '^': [
        NumberType,
        [
            NumberType,
            NumberType
        ],
        (ctx, [b, e]) => Math.pow(b.evaluate(ctx), e.evaluate(ctx))
    ],
    'sqrt': [
        NumberType,
        [NumberType],
        (ctx, [x]) => Math.sqrt(x.evaluate(ctx))
    ],
    'log10': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.log(n.evaluate(ctx)) / Math.LN10
    ],
    'ln': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.log(n.evaluate(ctx))
    ],
    'log2': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.log(n.evaluate(ctx)) / Math.LN2
    ],
    'sin': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.sin(n.evaluate(ctx))
    ],
    'cos': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.cos(n.evaluate(ctx))
    ],
    'tan': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.tan(n.evaluate(ctx))
    ],
    'asin': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.asin(n.evaluate(ctx))
    ],
    'acos': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.acos(n.evaluate(ctx))
    ],
    'atan': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.atan(n.evaluate(ctx))
    ],
    'min': [
        NumberType,
        varargs(NumberType),
        (ctx, args) => Math.min(...args.map(arg => arg.evaluate(ctx)))
    ],
    'max': [
        NumberType,
        varargs(NumberType),
        (ctx, args) => Math.max(...args.map(arg => arg.evaluate(ctx)))
    ],
    'abs': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.abs(n.evaluate(ctx))
    ],
    'round': [
        NumberType,
        [NumberType],
        (ctx, [n]) => {
            const v = n.evaluate(ctx);
            // Javascript's Math.round() rounds towards +Infinity for halfway
            // values, even when they're negative. It's more common to round
            // away from 0 (e.g., this is what python and C++ do)
            return v < 0 ? -Math.round(-v) : Math.round(v);
        }
    ],
    'floor': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.floor(n.evaluate(ctx))
    ],
    'ceil': [
        NumberType,
        [NumberType],
        (ctx, [n]) => Math.ceil(n.evaluate(ctx))
    ],
    'filter-==': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        (ctx, [k, v]) => ctx.properties()[k.value] === v.value
    ],
    'filter-id-==': [
        BooleanType,
        [ValueType],
        (ctx, [v]) => ctx.id() === v.value
    ],
    'filter-type-==': [
        BooleanType,
        [StringType],
        (ctx, [v]) => ctx.geometryType() === v.value
    ],
    'filter-<': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        (ctx, [k, v]) => {
            const a = ctx.properties()[k.value];
            const b = v.value;
            return typeof a === typeof b && a < b;
        }
    ],
    'filter-id-<': [
        BooleanType,
        [ValueType],
        (ctx, [v]) => {
            const a = ctx.id();
            const b = v.value;
            return typeof a === typeof b && a < b;
        }
    ],
    'filter->': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        (ctx, [k, v]) => {
            const a = ctx.properties()[k.value];
            const b = v.value;
            return typeof a === typeof b && a > b;
        }
    ],
    'filter-id->': [
        BooleanType,
        [ValueType],
        (ctx, [v]) => {
            const a = ctx.id();
            const b = v.value;
            return typeof a === typeof b && a > b;
        }
    ],
    'filter-<=': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        (ctx, [k, v]) => {
            const a = ctx.properties()[k.value];
            const b = v.value;
            return typeof a === typeof b && a <= b;
        }
    ],
    'filter-id-<=': [
        BooleanType,
        [ValueType],
        (ctx, [v]) => {
            const a = ctx.id();
            const b = v.value;
            return typeof a === typeof b && a <= b;
        }
    ],
    'filter->=': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        (ctx, [k, v]) => {
            const a = ctx.properties()[k.value];
            const b = v.value;
            return typeof a === typeof b && a >= b;
        }
    ],
    'filter-id->=': [
        BooleanType,
        [ValueType],
        (ctx, [v]) => {
            const a = ctx.id();
            const b = v.value;
            return typeof a === typeof b && a >= b;
        }
    ],
    'filter-has': [
        BooleanType,
        [ValueType],
        (ctx, [k]) => k.value in ctx.properties()
    ],
    'filter-has-id': [
        BooleanType,
        [],
        ctx => ctx.id() !== null && ctx.id() !== undefined
    ],
    'filter-type-in': [
        BooleanType,
        [array$1(StringType)],
        (ctx, [v]) => v.value.indexOf(ctx.geometryType()) >= 0
    ],
    'filter-id-in': [
        BooleanType,
        [array$1(ValueType)],
        (ctx, [v]) => v.value.indexOf(ctx.id()) >= 0
    ],
    'filter-in-small': [
        BooleanType,
        [
            StringType,
            array$1(ValueType)
        ],
        // assumes v is an array literal
        (ctx, [k, v]) => v.value.indexOf(ctx.properties()[k.value]) >= 0
    ],
    'filter-in-large': [
        BooleanType,
        [
            StringType,
            array$1(ValueType)
        ],
        // assumes v is a array literal with values sorted in ascending order and of a single type
        (ctx, [k, v]) => binarySearch(ctx.properties()[k.value], v.value, 0, v.value.length - 1)
    ],
    'all': {
        type: BooleanType,
        overloads: [
            [
                [
                    BooleanType,
                    BooleanType
                ],
                (ctx, [a, b]) => a.evaluate(ctx) && b.evaluate(ctx)
            ],
            [
                varargs(BooleanType),
                (ctx, args) => {
                    for (const arg of args) {
                        if (!arg.evaluate(ctx))
                            return false;
                    }
                    return true;
                }
            ]
        ]
    },
    'any': {
        type: BooleanType,
        overloads: [
            [
                [
                    BooleanType,
                    BooleanType
                ],
                (ctx, [a, b]) => a.evaluate(ctx) || b.evaluate(ctx)
            ],
            [
                varargs(BooleanType),
                (ctx, args) => {
                    for (const arg of args) {
                        if (arg.evaluate(ctx))
                            return true;
                    }
                    return false;
                }
            ]
        ]
    },
    '!': [
        BooleanType,
        [BooleanType],
        (ctx, [b]) => !b.evaluate(ctx)
    ],
    'is-supported-script': [
        BooleanType,
        [StringType],
        // At parse time this will always return true, so we need to exclude this expression with isGlobalPropertyConstant
        (ctx, [s]) => {
            const isSupportedScript = ctx.globals && ctx.globals.isSupportedScript;
            if (isSupportedScript) {
                return isSupportedScript(s.evaluate(ctx));
            }
            return true;
        }
    ],
    'upcase': [
        StringType,
        [StringType],
        (ctx, [s]) => s.evaluate(ctx).toUpperCase()
    ],
    'downcase': [
        StringType,
        [StringType],
        (ctx, [s]) => s.evaluate(ctx).toLowerCase()
    ],
    'concat': [
        StringType,
        varargs(ValueType),
        (ctx, args) => args.map(arg => toString(arg.evaluate(ctx))).join('')
    ],
    'resolved-locale': [
        StringType,
        [CollatorType],
        (ctx, [collator]) => collator.evaluate(ctx).resolvedLocale()
    ]
});
var definitions = expressions;

//      
/**
 * A type used for returning and propagating errors. The first element of the union
 * represents success and contains a value, and the second represents an error and
 * contains an error value.
 * @private
 */
function success(value) {
    return {
        result: 'success',
        value
    };
}
function error(value) {
    return {
        result: 'error',
        value
    };
}

//      
function supportsPropertyExpression(spec) {
    return spec['property-type'] === 'data-driven';
}
function supportsZoomExpression(spec) {
    return !!spec.expression && spec.expression.parameters.indexOf('zoom') > -1;
}
function supportsInterpolation(spec) {
    return !!spec.expression && spec.expression.interpolated;
}

function isFunction(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

class StyleExpression {
    constructor(expression, propertySpec) {
        this.expression = expression;
        this._warningHistory = {};
        this._evaluator = new EvaluationContext$1();
        this._defaultValue = propertySpec ? getDefaultValue(propertySpec) : null;
        this._enumValues = propertySpec && propertySpec.type === 'enum' ? propertySpec.values : null;
    }
    evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection, featureTileCoord, featureDistanceData) {
        this._evaluator.globals = globals;
        this._evaluator.feature = feature;
        this._evaluator.featureState = featureState;
        this._evaluator.canonical = canonical || null;
        this._evaluator.availableImages = availableImages || null;
        this._evaluator.formattedSection = formattedSection;
        this._evaluator.featureTileCoord = featureTileCoord || null;
        this._evaluator.featureDistanceData = featureDistanceData || null;
        return this.expression.evaluate(this._evaluator);
    }
    evaluate(globals, feature, featureState, canonical, availableImages, formattedSection, featureTileCoord, featureDistanceData) {
        this._evaluator.globals = globals;
        this._evaluator.feature = feature || null;
        this._evaluator.featureState = featureState || null;
        this._evaluator.canonical = canonical || null;
        this._evaluator.availableImages = availableImages || null;
        this._evaluator.formattedSection = formattedSection || null;
        this._evaluator.featureTileCoord = featureTileCoord || null;
        this._evaluator.featureDistanceData = featureDistanceData || null;
        try {
            const val = this.expression.evaluate(this._evaluator);
            // eslint-disable-next-line no-self-compare
            if (val === null || val === undefined || typeof val === 'number' && val !== val) {
                return this._defaultValue;
            }
            if (this._enumValues && !(val in this._enumValues)) {
                throw new RuntimeError$1(`Expected value to be one of ${ Object.keys(this._enumValues).map(v => JSON.stringify(v)).join(', ') }, but found ${ JSON.stringify(val) } instead.`);
            }
            return val;
        } catch (e) {
            if (!this._warningHistory[e.message]) {
                this._warningHistory[e.message] = true;
                if (typeof console !== 'undefined') {
                    console.warn(e.message);
                }
            }
            return this._defaultValue;
        }
    }
}
function isExpression(expression) {
    return Array.isArray(expression) && expression.length > 0 && typeof expression[0] === 'string' && expression[0] in definitions;
}
/**
 * Parse and typecheck the given style spec JSON expression.  If
 * options.defaultValue is provided, then the resulting StyleExpression's
 * `evaluate()` method will handle errors by logging a warning (once per
 * message) and returning the default value.  Otherwise, it will throw
 * evaluation errors.
 *
 * @private
 */
function createExpression(expression, propertySpec) {
    const parser = new ParsingContext$1(definitions, [], propertySpec ? getExpectedType(propertySpec) : undefined);
    // For string-valued properties, coerce to string at the top level rather than asserting.
    const parsed = parser.parse(expression, undefined, undefined, undefined, propertySpec && propertySpec.type === 'string' ? { typeAnnotation: 'coerce' } : undefined);
    if (!parsed) {
        return error(parser.errors);
    }
    return success(new StyleExpression(parsed, propertySpec));
}
class ZoomConstantExpression {
    constructor(kind, expression) {
        this.kind = kind;
        this._styleExpression = expression;
        this.isStateDependent = kind !== 'constant' && !isStateConstant(expression.expression);
    }
    evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection) {
        return this._styleExpression.evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection);
    }
    evaluate(globals, feature, featureState, canonical, availableImages, formattedSection) {
        return this._styleExpression.evaluate(globals, feature, featureState, canonical, availableImages, formattedSection);
    }
}
class ZoomDependentExpression {
    constructor(kind, expression, zoomStops, interpolationType) {
        this.kind = kind;
        this.zoomStops = zoomStops;
        this._styleExpression = expression;
        this.isStateDependent = kind !== 'camera' && !isStateConstant(expression.expression);
        this.interpolationType = interpolationType;
    }
    evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection) {
        return this._styleExpression.evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection);
    }
    evaluate(globals, feature, featureState, canonical, availableImages, formattedSection) {
        return this._styleExpression.evaluate(globals, feature, featureState, canonical, availableImages, formattedSection);
    }
    interpolationFactor(input, lower, upper) {
        if (this.interpolationType) {
            return Interpolate$1.interpolationFactor(this.interpolationType, input, lower, upper);
        } else {
            return 0;
        }
    }
}
function createPropertyExpression(expression, propertySpec) {
    expression = createExpression(expression, propertySpec);
    if (expression.result === 'error') {
        return expression;
    }
    const parsed = expression.value.expression;
    const isFeatureConstant$1 = isFeatureConstant(parsed);
    if (!isFeatureConstant$1 && !supportsPropertyExpression(propertySpec)) {
        return error([new ParsingError$1('', 'data expressions not supported')]);
    }
    const isZoomConstant = isGlobalPropertyConstant(parsed, [
        'zoom',
        'pitch',
        'distance-from-center'
    ]);
    if (!isZoomConstant && !supportsZoomExpression(propertySpec)) {
        return error([new ParsingError$1('', 'zoom expressions not supported')]);
    }
    const zoomCurve = findZoomCurve(parsed);
    if (!zoomCurve && !isZoomConstant) {
        return error([new ParsingError$1('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
    } else if (zoomCurve instanceof ParsingError$1) {
        return error([zoomCurve]);
    } else if (zoomCurve instanceof Interpolate$1 && !supportsInterpolation(propertySpec)) {
        return error([new ParsingError$1('', '"interpolate" expressions cannot be used with this property')]);
    }
    if (!zoomCurve) {
        return success(isFeatureConstant$1 ? new ZoomConstantExpression('constant', expression.value) : new ZoomConstantExpression('source', expression.value));
    }
    const interpolationType = zoomCurve instanceof Interpolate$1 ? zoomCurve.interpolation : undefined;
    return success(isFeatureConstant$1 ? new ZoomDependentExpression('camera', expression.value, zoomCurve.labels, interpolationType) : new ZoomDependentExpression('composite', expression.value, zoomCurve.labels, interpolationType));
}
// Zoom-dependent expressions may only use ["zoom"] as the input to a top-level "step" or "interpolate"
// expression (collectively referred to as a "curve"). The curve may be wrapped in one or more "let" or
// "coalesce" expressions.
function findZoomCurve(expression) {
    let result = null;
    if (expression instanceof Let$1) {
        result = findZoomCurve(expression.result);
    } else if (expression instanceof Coalesce$1) {
        for (const arg of expression.args) {
            result = findZoomCurve(arg);
            if (result) {
                break;
            }
        }
    } else if ((expression instanceof Step$1 || expression instanceof Interpolate$1) && expression.input instanceof CompoundExpression$1 && expression.input.name === 'zoom') {
        result = expression;
    }
    if (result instanceof ParsingError$1) {
        return result;
    }
    expression.eachChild(child => {
        const childResult = findZoomCurve(child);
        if (childResult instanceof ParsingError$1) {
            result = childResult;
        } else if (!result && childResult) {
            result = new ParsingError$1('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.');
        } else if (result && childResult && result !== childResult) {
            result = new ParsingError$1('', 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.');
        }
    });
    return result;
}
function getExpectedType(spec) {
    const types = {
        color: ColorType,
        string: StringType,
        number: NumberType,
        enum: StringType,
        boolean: BooleanType,
        formatted: FormattedType,
        resolvedImage: ResolvedImageType
    };
    if (spec.type === 'array') {
        return array$1(types[spec.value] || ValueType, spec.length);
    }
    return types[spec.type];
}
function getDefaultValue(spec) {
    if (spec.type === 'color' && (isFunction(spec.default) || Array.isArray(spec.default))) {
        // Special case for heatmap-color: it uses the 'default:' to define a
        // default color ramp, but createExpression expects a simple value to fall
        // back to in case of runtime errors
        return new Color$1(0, 0, 0, 0);
    } else if (spec.type === 'color') {
        return Color$1.parse(spec.default) || null;
    } else if (spec.default === undefined) {
        return null;
    } else {
        return spec.default;
    }
}

//      
// Turn jsonlint-lines-primitives objects into primitive objects
function unbundle(value) {
    if (value instanceof Number || value instanceof String || value instanceof Boolean) {
        return value.valueOf();
    } else {
        return value;
    }
}
function deepUnbundle(value) {
    if (Array.isArray(value)) {
        return value.map(deepUnbundle);
    } else if (value instanceof Object && !(value instanceof Number || value instanceof String || value instanceof Boolean)) {
        const unbundledValue = {};
        for (const key in value) {
            unbundledValue[key] = deepUnbundle(value[key]);
        }
        return unbundledValue;
    }
    return unbundle(value);
}

var spec = {"$version":8,"$root":{"version":{"required":true,"type":"enum","values":[8]},"name":{"type":"string"},"metadata":{"type":"*"},"center":{"type":"array","value":"number"},"zoom":{"type":"number"},"bearing":{"type":"number","default":0,"period":360,"units":"degrees"},"pitch":{"type":"number","default":0,"units":"degrees"},"light":{"type":"light"},"terrain":{"type":"terrain"},"fog":{"type":"fog"},"sources":{"required":true,"type":"sources"},"sprite":{"type":"string"},"glyphs":{"type":"string"},"transition":{"type":"transition"},"projection":{"type":"projection"},"layers":{"required":true,"type":"array","value":"layer"}},"sources":{"*":{"type":"source"}},"source":["source_vector","source_raster","source_raster_dem","source_geojson","source_video","source_image"],"source_vector":{"type":{"required":true,"type":"enum","values":{"vector":{}}},"url":{"type":"string"},"tiles":{"type":"array","value":"string"},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.051129,180,85.051129]},"scheme":{"type":"enum","values":{"xyz":{},"tms":{}},"default":"xyz"},"minzoom":{"type":"number","default":0},"maxzoom":{"type":"number","default":22},"attribution":{"type":"string"},"promoteId":{"type":"promoteId"},"volatile":{"type":"boolean","default":false},"*":{"type":"*"}},"source_raster":{"type":{"required":true,"type":"enum","values":{"raster":{}}},"url":{"type":"string"},"tiles":{"type":"array","value":"string"},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.051129,180,85.051129]},"minzoom":{"type":"number","default":0},"maxzoom":{"type":"number","default":22},"tileSize":{"type":"number","default":512,"units":"pixels"},"scheme":{"type":"enum","values":{"xyz":{},"tms":{}},"default":"xyz"},"attribution":{"type":"string"},"volatile":{"type":"boolean","default":false},"*":{"type":"*"}},"source_raster_dem":{"type":{"required":true,"type":"enum","values":{"raster-dem":{}}},"url":{"type":"string"},"tiles":{"type":"array","value":"string"},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.051129,180,85.051129]},"minzoom":{"type":"number","default":0},"maxzoom":{"type":"number","default":22},"tileSize":{"type":"number","default":512,"units":"pixels"},"attribution":{"type":"string"},"encoding":{"type":"enum","values":{"terrarium":{},"mapbox":{}},"default":"mapbox"},"volatile":{"type":"boolean","default":false},"*":{"type":"*"}},"source_geojson":{"type":{"required":true,"type":"enum","values":{"geojson":{}}},"data":{"type":"*"},"maxzoom":{"type":"number","default":18},"attribution":{"type":"string"},"buffer":{"type":"number","default":128,"maximum":512,"minimum":0},"filter":{"type":"*"},"tolerance":{"type":"number","default":0.375},"cluster":{"type":"boolean","default":false},"clusterRadius":{"type":"number","default":50,"minimum":0},"clusterMaxZoom":{"type":"number"},"clusterMinPoints":{"type":"number"},"clusterProperties":{"type":"*"},"lineMetrics":{"type":"boolean","default":false},"generateId":{"type":"boolean","default":false},"promoteId":{"type":"promoteId"}},"source_video":{"type":{"required":true,"type":"enum","values":{"video":{}}},"urls":{"required":true,"type":"array","value":"string"},"coordinates":{"required":true,"type":"array","length":4,"value":{"type":"array","length":2,"value":"number"}}},"source_image":{"type":{"required":true,"type":"enum","values":{"image":{}}},"url":{"required":true,"type":"string"},"coordinates":{"required":true,"type":"array","length":4,"value":{"type":"array","length":2,"value":"number"}}},"layer":{"id":{"type":"string","required":true},"type":{"type":"enum","values":{"fill":{},"line":{},"symbol":{},"circle":{},"heatmap":{},"fill-extrusion":{},"raster":{},"hillshade":{},"background":{},"sky":{}},"required":true},"metadata":{"type":"*"},"source":{"type":"string"},"source-layer":{"type":"string"},"minzoom":{"type":"number","minimum":0,"maximum":24},"maxzoom":{"type":"number","minimum":0,"maximum":24},"filter":{"type":"filter"},"layout":{"type":"layout"},"paint":{"type":"paint"}},"layout":["layout_fill","layout_line","layout_circle","layout_heatmap","layout_fill-extrusion","layout_symbol","layout_raster","layout_hillshade","layout_background","layout_sky"],"layout_background":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_sky":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_fill":{"fill-sort-key":{"type":"number","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_circle":{"circle-sort-key":{"type":"number","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_heatmap":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_fill-extrusion":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"},"fill-extrusion-edge-radius":{"type":"number","private":true,"default":0,"minimum":0,"maximum":1,"property-type":"constant"}},"layout_line":{"line-cap":{"type":"enum","values":{"butt":{},"round":{},"square":{}},"default":"butt","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"line-join":{"type":"enum","values":{"bevel":{},"round":{},"miter":{}},"default":"miter","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"line-miter-limit":{"type":"number","default":2,"requires":[{"line-join":"miter"}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"line-round-limit":{"type":"number","default":1.05,"requires":[{"line-join":"round"}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"line-sort-key":{"type":"number","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_symbol":{"symbol-placement":{"type":"enum","values":{"point":{},"line":{},"line-center":{}},"default":"point","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"symbol-spacing":{"type":"number","default":250,"minimum":1,"units":"pixels","requires":[{"symbol-placement":"line"}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"symbol-avoid-edges":{"type":"boolean","default":false,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"symbol-sort-key":{"type":"number","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"symbol-z-order":{"type":"enum","values":{"auto":{},"viewport-y":{},"source":{}},"default":"auto","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-allow-overlap":{"type":"boolean","default":false,"requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-ignore-placement":{"type":"boolean","default":false,"requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-optional":{"type":"boolean","default":false,"requires":["icon-image","text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-rotation-alignment":{"type":"enum","values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-size":{"type":"number","default":1,"minimum":0,"units":"factor of the original icon size","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-text-fit":{"type":"enum","values":{"none":{},"width":{},"height":{},"both":{}},"default":"none","requires":["icon-image","text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-text-fit-padding":{"type":"array","value":"number","length":4,"default":[0,0,0,0],"units":"pixels","requires":["icon-image","text-field",{"icon-text-fit":["both","width","height"]}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"icon-image":{"type":"resolvedImage","tokens":true,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-rotate":{"type":"number","default":0,"period":360,"units":"degrees","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-padding":{"type":"number","default":2,"minimum":0,"units":"pixels","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"icon-keep-upright":{"type":"boolean","default":false,"requires":["icon-image",{"icon-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-offset":{"type":"array","value":"number","length":2,"default":[0,0],"requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-anchor":{"type":"enum","values":{"center":{},"left":{},"right":{},"top":{},"bottom":{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},"default":"center","requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-pitch-alignment":{"type":"enum","values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-pitch-alignment":{"type":"enum","values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-rotation-alignment":{"type":"enum","values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-field":{"type":"formatted","default":"","tokens":true,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-font":{"type":"array","value":"string","default":["Open Sans Regular","Arial Unicode MS Regular"],"requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-size":{"type":"number","default":16,"minimum":0,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-max-width":{"type":"number","default":10,"minimum":0,"units":"ems","requires":["text-field",{"symbol-placement":["point"]}],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-line-height":{"type":"number","default":1.2,"units":"ems","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-letter-spacing":{"type":"number","default":0,"units":"ems","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-justify":{"type":"enum","values":{"auto":{},"left":{},"center":{},"right":{}},"default":"center","requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-radial-offset":{"type":"number","units":"ems","default":0,"requires":["text-field"],"property-type":"data-driven","expression":{"interpolated":true,"parameters":["zoom","feature"]}},"text-variable-anchor":{"type":"array","value":"enum","values":{"center":{},"left":{},"right":{},"top":{},"bottom":{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},"requires":["text-field",{"symbol-placement":["point"]}],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-anchor":{"type":"enum","values":{"center":{},"left":{},"right":{},"top":{},"bottom":{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},"default":"center","requires":["text-field",{"!":"text-variable-anchor"}],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-max-angle":{"type":"number","default":45,"units":"degrees","requires":["text-field",{"symbol-placement":["line","line-center"]}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"text-writing-mode":{"type":"array","value":"enum","values":{"horizontal":{},"vertical":{}},"requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-rotate":{"type":"number","default":0,"period":360,"units":"degrees","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-padding":{"type":"number","default":2,"minimum":0,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"text-keep-upright":{"type":"boolean","default":true,"requires":["text-field",{"text-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-transform":{"type":"enum","values":{"none":{},"uppercase":{},"lowercase":{}},"default":"none","requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-offset":{"type":"array","value":"number","units":"ems","length":2,"default":[0,0],"requires":["text-field",{"!":"text-radial-offset"}],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-allow-overlap":{"type":"boolean","default":false,"requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-ignore-placement":{"type":"boolean","default":false,"requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-optional":{"type":"boolean","default":false,"requires":["text-field","icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_raster":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_hillshade":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"filter":{"type":"array","value":"*"},"filter_symbol":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature","pitch","distance-from-center"]}},"filter_fill":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_line":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_circle":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_fill-extrusion":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_heatmap":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_operator":{"type":"enum","values":{"==":{},"!=":{},">":{},">=":{},"<":{},"<=":{},"in":{},"!in":{},"all":{},"any":{},"none":{},"has":{},"!has":{},"within":{}}},"geometry_type":{"type":"enum","values":{"Point":{},"LineString":{},"Polygon":{}}},"function":{"expression":{"type":"expression"},"stops":{"type":"array","value":"function_stop"},"base":{"type":"number","default":1,"minimum":0},"property":{"type":"string","default":"$zoom"},"type":{"type":"enum","values":{"identity":{},"exponential":{},"interval":{},"categorical":{}},"default":"exponential"},"colorSpace":{"type":"enum","values":{"rgb":{},"lab":{},"hcl":{}},"default":"rgb"},"default":{"type":"*","required":false}},"function_stop":{"type":"array","minimum":0,"maximum":24,"value":["number","color"],"length":2},"expression":{"type":"array","value":"*","minimum":1},"expression_name":{"type":"enum","values":{"let":{"group":"Variable binding"},"var":{"group":"Variable binding"},"literal":{"group":"Types"},"array":{"group":"Types"},"at":{"group":"Lookup"},"in":{"group":"Lookup"},"index-of":{"group":"Lookup"},"slice":{"group":"Lookup"},"case":{"group":"Decision"},"match":{"group":"Decision"},"coalesce":{"group":"Decision"},"step":{"group":"Ramps, scales, curves"},"interpolate":{"group":"Ramps, scales, curves"},"interpolate-hcl":{"group":"Ramps, scales, curves"},"interpolate-lab":{"group":"Ramps, scales, curves"},"ln2":{"group":"Math"},"pi":{"group":"Math"},"e":{"group":"Math"},"typeof":{"group":"Types"},"string":{"group":"Types"},"number":{"group":"Types"},"boolean":{"group":"Types"},"object":{"group":"Types"},"collator":{"group":"Types"},"format":{"group":"Types"},"image":{"group":"Types"},"number-format":{"group":"Types"},"to-string":{"group":"Types"},"to-number":{"group":"Types"},"to-boolean":{"group":"Types"},"to-rgba":{"group":"Color"},"to-color":{"group":"Types"},"rgb":{"group":"Color"},"rgba":{"group":"Color"},"get":{"group":"Lookup"},"has":{"group":"Lookup"},"length":{"group":"Lookup"},"properties":{"group":"Feature data"},"feature-state":{"group":"Feature data"},"geometry-type":{"group":"Feature data"},"id":{"group":"Feature data"},"zoom":{"group":"Camera"},"pitch":{"group":"Camera"},"distance-from-center":{"group":"Camera"},"heatmap-density":{"group":"Heatmap"},"line-progress":{"group":"Feature data"},"sky-radial-progress":{"group":"sky"},"accumulated":{"group":"Feature data"},"+":{"group":"Math"},"*":{"group":"Math"},"-":{"group":"Math"},"/":{"group":"Math"},"%":{"group":"Math"},"^":{"group":"Math"},"sqrt":{"group":"Math"},"log10":{"group":"Math"},"ln":{"group":"Math"},"log2":{"group":"Math"},"sin":{"group":"Math"},"cos":{"group":"Math"},"tan":{"group":"Math"},"asin":{"group":"Math"},"acos":{"group":"Math"},"atan":{"group":"Math"},"min":{"group":"Math"},"max":{"group":"Math"},"round":{"group":"Math"},"abs":{"group":"Math"},"ceil":{"group":"Math"},"floor":{"group":"Math"},"distance":{"group":"Math"},"==":{"group":"Decision"},"!=":{"group":"Decision"},">":{"group":"Decision"},"<":{"group":"Decision"},">=":{"group":"Decision"},"<=":{"group":"Decision"},"all":{"group":"Decision"},"any":{"group":"Decision"},"!":{"group":"Decision"},"within":{"group":"Decision"},"is-supported-script":{"group":"String"},"upcase":{"group":"String"},"downcase":{"group":"String"},"concat":{"group":"String"},"resolved-locale":{"group":"String"}}},"fog":{"range":{"type":"array","default":[0.5,10],"minimum":-20,"maximum":20,"length":2,"value":"number","property-type":"data-constant","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]}},"color":{"type":"color","property-type":"data-constant","default":"#ffffff","expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"high-color":{"type":"color","property-type":"data-constant","default":"#245cdf","expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"space-color":{"type":"color","property-type":"data-constant","default":["interpolate",["linear"],["zoom"],4,"#010b19",7,"#367ab9"],"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"horizon-blend":{"type":"number","property-type":"data-constant","default":["interpolate",["linear"],["zoom"],4,0.2,7,0.1],"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"star-intensity":{"type":"number","property-type":"data-constant","default":["interpolate",["linear"],["zoom"],5,0.35,6,0],"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true}},"light":{"anchor":{"type":"enum","default":"viewport","values":{"map":{},"viewport":{}},"property-type":"data-constant","transition":false,"expression":{"interpolated":false,"parameters":["zoom"]}},"position":{"type":"array","default":[1.15,210,30],"length":3,"value":"number","property-type":"data-constant","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]}},"color":{"type":"color","property-type":"data-constant","default":"#ffffff","expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"intensity":{"type":"number","property-type":"data-constant","default":0.5,"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true}},"projection":{"name":{"type":"enum","values":{"albers":{},"equalEarth":{},"equirectangular":{},"lambertConformalConic":{},"mercator":{},"naturalEarth":{},"winkelTripel":{},"globe":{}},"default":"mercator","required":true},"center":{"type":"array","length":2,"value":"number","property-type":"data-constant","minimum":[-180,-90],"maximum":[180,90],"transition":false,"requires":[{"name":["albers","lambertConformalConic"]}]},"parallels":{"type":"array","length":2,"value":"number","property-type":"data-constant","minimum":[-90,-90],"maximum":[90,90],"transition":false,"requires":[{"name":["albers","lambertConformalConic"]}]}},"terrain":{"source":{"type":"string","required":true},"exaggeration":{"type":"number","property-type":"data-constant","default":1,"minimum":0,"maximum":1000,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true,"requires":["source"]}},"paint":["paint_fill","paint_line","paint_circle","paint_heatmap","paint_fill-extrusion","paint_symbol","paint_raster","paint_hillshade","paint_background","paint_sky"],"paint_fill":{"fill-antialias":{"type":"boolean","default":true,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"fill-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-color":{"type":"color","default":"#000000","transition":true,"requires":[{"!":"fill-pattern"}],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-outline-color":{"type":"color","transition":true,"requires":[{"!":"fill-pattern"},{"fill-antialias":true}],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"fill-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["fill-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"fill-pattern":{"type":"resolvedImage","transition":false,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"}},"paint_fill-extrusion":{"fill-extrusion-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"fill-extrusion-color":{"type":"color","default":"#000000","transition":true,"requires":[{"!":"fill-extrusion-pattern"}],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"fill-extrusion-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["fill-extrusion-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"fill-extrusion-pattern":{"type":"resolvedImage","transition":false,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"fill-extrusion-height":{"type":"number","default":0,"minimum":0,"units":"meters","transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-base":{"type":"number","default":0,"minimum":0,"units":"meters","transition":true,"requires":["fill-extrusion-height"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-vertical-gradient":{"type":"boolean","default":true,"transition":false,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"fill-extrusion-ambient-occlusion-intensity":{"property-type":"data-constant","type":"number","private":true,"default":0,"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"fill-extrusion-ambient-occlusion-radius":{"property-type":"data-constant","type":"number","private":true,"default":3,"minimum":0,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true,"requires":["fill-extrusion-edge-radius"]}},"paint_line":{"line-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-color":{"type":"color","default":"#000000","transition":true,"requires":[{"!":"line-pattern"}],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"line-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["line-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"line-width":{"type":"number","default":1,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-gap-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-offset":{"type":"number","default":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-blur":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-dasharray":{"type":"array","value":"number","minimum":0,"transition":false,"units":"line widths","requires":[{"!":"line-pattern"}],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"line-pattern":{"type":"resolvedImage","transition":false,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"line-gradient":{"type":"color","transition":false,"requires":[{"!":"line-pattern"},{"source":"geojson","has":{"lineMetrics":true}}],"expression":{"interpolated":true,"parameters":["line-progress"]},"property-type":"color-ramp"},"line-trim-offset":{"type":"array","value":"number","length":2,"default":[0,0],"minimum":[0,0],"maximum":[1,1],"transition":false,"requires":[{"source":"geojson","has":{"lineMetrics":true}}],"property-type":"constant"}},"paint_circle":{"circle-radius":{"type":"number","default":5,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-color":{"type":"color","default":"#000000","transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-blur":{"type":"number","default":0,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"circle-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["circle-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"circle-pitch-scale":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"circle-pitch-alignment":{"type":"enum","values":{"map":{},"viewport":{}},"default":"viewport","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"circle-stroke-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-stroke-color":{"type":"color","default":"#000000","transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-stroke-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"}},"paint_heatmap":{"heatmap-radius":{"type":"number","default":30,"minimum":1,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"heatmap-weight":{"type":"number","default":1,"minimum":0,"transition":false,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"heatmap-intensity":{"type":"number","default":1,"minimum":0,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"heatmap-color":{"type":"color","default":["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"],"transition":false,"expression":{"interpolated":true,"parameters":["heatmap-density"]},"property-type":"color-ramp"},"heatmap-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_symbol":{"icon-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-color":{"type":"color","default":"#000000","transition":true,"requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-color":{"type":"color","default":"rgba(0, 0, 0, 0)","transition":true,"requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-blur":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"icon-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["icon-image","icon-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-color":{"type":"color","default":"#000000","transition":true,"overridable":true,"requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-color":{"type":"color","default":"rgba(0, 0, 0, 0)","transition":true,"requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-blur":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"text-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["text-field","text-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_raster":{"raster-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-hue-rotate":{"type":"number","default":0,"period":360,"transition":true,"units":"degrees","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-brightness-min":{"type":"number","default":0,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-brightness-max":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-saturation":{"type":"number","default":0,"minimum":-1,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-contrast":{"type":"number","default":0,"minimum":-1,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-resampling":{"type":"enum","values":{"linear":{},"nearest":{}},"default":"linear","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"raster-fade-duration":{"type":"number","default":300,"minimum":0,"transition":false,"units":"milliseconds","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_hillshade":{"hillshade-illumination-direction":{"type":"number","default":335,"minimum":0,"maximum":359,"transition":false,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-illumination-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"viewport","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-exaggeration":{"type":"number","default":0.5,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-shadow-color":{"type":"color","default":"#000000","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-highlight-color":{"type":"color","default":"#FFFFFF","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-accent-color":{"type":"color","default":"#000000","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_background":{"background-color":{"type":"color","default":"#000000","transition":true,"requires":[{"!":"background-pattern"}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"background-pattern":{"type":"resolvedImage","transition":false,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"background-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_sky":{"sky-type":{"type":"enum","values":{"gradient":{},"atmosphere":{}},"default":"atmosphere","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"sky-atmosphere-sun":{"type":"array","value":"number","length":2,"units":"degrees","minimum":[0,0],"maximum":[360,180],"transition":false,"requires":[{"sky-type":"atmosphere"}],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"sky-atmosphere-sun-intensity":{"type":"number","requires":[{"sky-type":"atmosphere"}],"default":10,"minimum":0,"maximum":100,"transition":false,"property-type":"data-constant"},"sky-gradient-center":{"type":"array","requires":[{"sky-type":"gradient"}],"value":"number","default":[0,0],"length":2,"units":"degrees","minimum":[0,0],"maximum":[360,180],"transition":false,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"sky-gradient-radius":{"type":"number","requires":[{"sky-type":"gradient"}],"default":90,"minimum":0,"maximum":180,"transition":false,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"sky-gradient":{"type":"color","default":["interpolate",["linear"],["sky-radial-progress"],0.8,"#87ceeb",1,"white"],"transition":false,"requires":[{"sky-type":"gradient"}],"expression":{"interpolated":true,"parameters":["sky-radial-progress"]},"property-type":"color-ramp"},"sky-atmosphere-halo-color":{"type":"color","default":"white","transition":false,"requires":[{"sky-type":"atmosphere"}],"property-type":"data-constant"},"sky-atmosphere-color":{"type":"color","default":"white","transition":false,"requires":[{"sky-type":"atmosphere"}],"property-type":"data-constant"},"sky-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"transition":{"duration":{"type":"number","default":300,"minimum":0,"units":"milliseconds"},"delay":{"type":"number","default":0,"minimum":0,"units":"milliseconds"}},"property-type":{"data-driven":{"type":"property-type"},"color-ramp":{"type":"property-type"},"data-constant":{"type":"property-type"},"constant":{"type":"property-type"}},"promoteId":{"*":{"type":"string"}}};

//      
function isExpressionFilter(filter) {
    if (filter === true || filter === false) {
        return true;
    }
    if (!Array.isArray(filter) || filter.length === 0) {
        return false;
    }
    switch (filter[0]) {
    case 'has':
        return filter.length >= 2 && filter[1] !== '$id' && filter[1] !== '$type';
    case 'in':
        return filter.length >= 3 && (typeof filter[1] !== 'string' || Array.isArray(filter[2]));
    case '!in':
    case '!has':
    case 'none':
        return false;
    case '==':
    case '!=':
    case '>':
    case '>=':
    case '<':
    case '<=':
        return filter.length !== 3 || (Array.isArray(filter[1]) || Array.isArray(filter[2]));
    case 'any':
    case 'all':
        for (const f of filter.slice(1)) {
            if (!isExpressionFilter(f) && typeof f !== 'boolean') {
                return false;
            }
        }
        return true;
    default:
        return true;
    }
}
/**
 * Given a filter expressed as nested arrays, return a new function
 * that evaluates whether a given feature (with a .properties or .tags property)
 * passes its test.
 *
 * @private
 * @param {Array} filter mapbox gl filter
 * @param {string} layerType the type of the layer this filter will be applied to.
 * @returns {Function} filter-evaluating function
 */
function createFilter(filter, layerType = 'fill') {
    if (filter === null || filter === undefined) {
        return {
            filter: () => true,
            needGeometry: false,
            needFeature: false
        };
    }
    if (!isExpressionFilter(filter)) {
        filter = convertFilter(filter);
    }
    const filterExp = filter;
    let staticFilter = true;
    try {
        staticFilter = extractStaticFilter(filterExp);
    } catch (e) {
        console.warn(`Failed to extract static filter. Filter will continue working, but at higher memory usage and slower framerate.
This is most likely a bug, please report this via https://github.com/mapbox/mapbox-gl-js/issues/new?assignees=&labels=&template=Bug_report.md
and paste the contents of this message in the report.
Thank you!
Filter Expression:
${ JSON.stringify(filterExp, null, 2) }
        `);
    }
    // Compile the static component of the filter
    const filterSpec = spec[`filter_${ layerType }`];
    const compiledStaticFilter = createExpression(staticFilter, filterSpec);
    let filterFunc = null;
    if (compiledStaticFilter.result === 'error') {
        throw new Error(compiledStaticFilter.value.map(err => `${ err.key }: ${ err.message }`).join(', '));
    } else {
        filterFunc = (globalProperties, feature, canonical) => compiledStaticFilter.value.evaluate(globalProperties, feature, {}, canonical);
    }
    // If the static component is not equal to the entire filter then we have a dynamic component
    // Compile the dynamic component separately
    let dynamicFilterFunc = null;
    let needFeature = null;
    if (staticFilter !== filterExp) {
        const compiledDynamicFilter = createExpression(filterExp, filterSpec);
        if (compiledDynamicFilter.result === 'error') {
            throw new Error(compiledDynamicFilter.value.map(err => `${ err.key }: ${ err.message }`).join(', '));
        } else {
            dynamicFilterFunc = (globalProperties, feature, canonical, featureTileCoord, featureDistanceData) => compiledDynamicFilter.value.evaluate(globalProperties, feature, {}, canonical, undefined, undefined, featureTileCoord, featureDistanceData);
            needFeature = !isFeatureConstant(compiledDynamicFilter.value.expression);
        }
    }
    filterFunc = filterFunc;
    const needGeometry = geometryNeeded(staticFilter);
    return {
        filter: filterFunc,
        dynamicFilter: dynamicFilterFunc ? dynamicFilterFunc : undefined,
        needGeometry,
        needFeature: !!needFeature
    };
}
function extractStaticFilter(filter) {
    if (!isDynamicFilter(filter)) {
        return filter;
    }
    // Shallow copy so we can replace expressions in-place
    let result = deepUnbundle(filter);
    // 1. Union branches
    unionDynamicBranches(result);
    // 2. Collapse dynamic conditions to  `true`
    result = collapseDynamicBooleanExpressions(result);
    return result;
}
function collapseDynamicBooleanExpressions(expression) {
    if (!Array.isArray(expression)) {
        return expression;
    }
    const collapsed = collapsedExpression(expression);
    if (collapsed === true) {
        return collapsed;
    } else {
        return collapsed.map(subExpression => collapseDynamicBooleanExpressions(subExpression));
    }
}
/**
 * Traverses the expression and replaces all instances of branching on a
 * `dynamic` conditional (such as `['pitch']` or `['distance-from-center']`)
 * into an `any` expression.
 * This ensures that all possible outcomes of a `dynamic` branch are considered
 * when evaluating the expression upfront during filtering.
 *
 * @param {Array<any>} filter the filter expression mutated in-place.
 */
function unionDynamicBranches(filter) {
    let isBranchingDynamically = false;
    const branches = [];
    if (filter[0] === 'case') {
        for (let i = 1; i < filter.length - 1; i += 2) {
            isBranchingDynamically = isBranchingDynamically || isDynamicFilter(filter[i]);
            branches.push(filter[i + 1]);
        }
        branches.push(filter[filter.length - 1]);
    } else if (filter[0] === 'match') {
        isBranchingDynamically = isBranchingDynamically || isDynamicFilter(filter[1]);
        for (let i = 2; i < filter.length - 1; i += 2) {
            branches.push(filter[i + 1]);
        }
        branches.push(filter[filter.length - 1]);
    } else if (filter[0] === 'step') {
        isBranchingDynamically = isBranchingDynamically || isDynamicFilter(filter[1]);
        for (let i = 1; i < filter.length - 1; i += 2) {
            branches.push(filter[i + 1]);
        }
    }
    if (isBranchingDynamically) {
        filter.length = 0;
        filter.push('any', ...branches);
    }
    // traverse and recurse into children
    for (let i = 1; i < filter.length; i++) {
        unionDynamicBranches(filter[i]);
    }
}
function isDynamicFilter(filter) {
    // Base Cases
    if (!Array.isArray(filter)) {
        return false;
    }
    if (isRootExpressionDynamic(filter[0])) {
        return true;
    }
    for (let i = 1; i < filter.length; i++) {
        const child = filter[i];
        if (isDynamicFilter(child)) {
            return true;
        }
    }
    return false;
}
function isRootExpressionDynamic(expression) {
    return expression === 'pitch' || expression === 'distance-from-center';
}
const dynamicConditionExpressions = new Set([
    'in',
    '==',
    '!=',
    '>',
    '>=',
    '<',
    '<=',
    'to-boolean'
]);
function collapsedExpression(expression) {
    if (dynamicConditionExpressions.has(expression[0])) {
        for (let i = 1; i < expression.length; i++) {
            const param = expression[i];
            if (isDynamicFilter(param)) {
                return true;
            }
        }
    }
    return expression;
}
// Comparison function to sort numbers and strings
function compare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
function geometryNeeded(filter) {
    if (!Array.isArray(filter))
        return false;
    if (filter[0] === 'within')
        return true;
    for (let index = 1; index < filter.length; index++) {
        if (geometryNeeded(filter[index]))
            return true;
    }
    return false;
}
function convertFilter(filter) {
    if (!filter)
        return true;
    const op = filter[0];
    if (filter.length <= 1)
        return op !== 'any';
    const converted = op === '==' ? convertComparisonOp(filter[1], filter[2], '==') : op === '!=' ? convertNegation(convertComparisonOp(filter[1], filter[2], '==')) : op === '<' || op === '>' || op === '<=' || op === '>=' ? convertComparisonOp(filter[1], filter[2], op) : op === 'any' ? convertDisjunctionOp(filter.slice(1)) : op === 'all' ? ['all'].concat(filter.slice(1).map(convertFilter)) : op === 'none' ? ['all'].concat(filter.slice(1).map(convertFilter).map(convertNegation)) : op === 'in' ? convertInOp(filter[1], filter.slice(2)) : op === '!in' ? convertNegation(convertInOp(filter[1], filter.slice(2))) : op === 'has' ? convertHasOp(filter[1]) : op === '!has' ? convertNegation(convertHasOp(filter[1])) : op === 'within' ? filter : true;
    return converted;
}
function convertComparisonOp(property, value, op) {
    switch (property) {
    case '$type':
        return [
            `filter-type-${ op }`,
            value
        ];
    case '$id':
        return [
            `filter-id-${ op }`,
            value
        ];
    default:
        return [
            `filter-${ op }`,
            property,
            value
        ];
    }
}
function convertDisjunctionOp(filters) {
    return ['any'].concat(filters.map(convertFilter));
}
function convertInOp(property, values) {
    if (values.length === 0) {
        return false;
    }
    switch (property) {
    case '$type':
        return [
            `filter-type-in`,
            [
                'literal',
                values
            ]
        ];
    case '$id':
        return [
            `filter-id-in`,
            [
                'literal',
                values
            ]
        ];
    default:
        if (values.length > 200 && !values.some(v => typeof v !== typeof values[0])) {
            return [
                'filter-in-large',
                property,
                [
                    'literal',
                    values.sort(compare)
                ]
            ];
        } else {
            return [
                'filter-in-small',
                property,
                [
                    'literal',
                    values
                ]
            ];
        }
    }
}
function convertHasOp(property) {
    switch (property) {
    case '$type':
        return true;
    case '$id':
        return [`filter-has-id`];
    default:
        return [
            `filter-has`,
            property
        ];
    }
}
function convertNegation(filter) {
    return [
        '!',
        filter
    ];
}

//      
var refProperties = [
    'type',
    'source',
    'source-layer',
    'minzoom',
    'maxzoom',
    'filter',
    'layout'
];

//      
function deref(layer, parent) {
    const result = {};
    for (const k in layer) {
        if (k !== 'ref') {
            result[k] = layer[k];
        }
    }
    refProperties.forEach(k => {
        if (k in parent) {
            result[k] = parent[k];
        }
    });
    return result;
}
/**
 * Given an array of layers, some of which may contain `ref` properties
 * whose value is the `id` of another property, return a new array where
 * such layers have been augmented with the 'type', 'source', etc. properties
 * from the parent layer, and the `ref` property has been removed.
 *
 * The input is not modified. The output may contain references to portions
 * of the input.
 *
 * @private
 * @param {Array<Layer>} layers
 * @returns {Array<Layer>}
 */
function derefLayers(layers) {
    layers = layers.slice();
    const map = Object.create(null);
    for (let i = 0; i < layers.length; i++) {
        map[layers[i].id] = layers[i];
    }
    for (let i = 0; i < layers.length; i++) {
        if ('ref' in layers[i]) {
            layers[i] = deref(layers[i], map[layers[i].ref]);
        }
    }
    return layers;
}

var fontWeights = {
    thin: 100,
    hairline: 100,
    'ultra-light': 200,
    'extra-light': 200,
    light: 300,
    book: 300,
    regular: 400,
    normal: 400,
    plain: 400,
    roman: 400,
    standard: 400,
    medium: 500,
    'semi-bold': 600,
    'demi-bold': 600,
    bold: 700,
    'extra-bold': 800,
    'ultra-bold': 800,
    heavy: 900,
    black: 900,
    'heavy-black': 900,
    fat: 900,
    poster: 900,
    'ultra-black': 950,
    'extra-black': 950
};
var sp = ' ';
var italicRE = /(italic|oblique)$/i;
var fontCache = {};
var mapboxToCssFont = function (fonts, size, lineHeight) {
    var cssData = fontCache[fonts];
    if (!cssData) {
        if (!Array.isArray(fonts)) {
            fonts = [fonts];
        }
        var weight = 400;
        var style = 'normal';
        var fontFamilies = [];
        var haveWeight, haveStyle;
        for (var i = 0, ii = fonts.length; i < ii; ++i) {
            var font = fonts[i];
            var parts = font.split(' ');
            var maybeWeight = parts[parts.length - 1].toLowerCase();
            if (maybeWeight == 'normal' || maybeWeight == 'italic' || maybeWeight == 'oblique') {
                style = haveStyle ? style : maybeWeight;
                haveStyle = true;
                parts.pop();
                maybeWeight = parts[parts.length - 1].toLowerCase();
            } else if (italicRE.test(maybeWeight)) {
                maybeWeight = maybeWeight.replace(italicRE, '');
                style = haveStyle ? style : parts[parts.length - 1].replace(maybeWeight, '');
                haveStyle = true;
            }
            for (var w in fontWeights) {
                var previousPart = parts.length > 1 ? parts[parts.length - 2].toLowerCase() : '';
                if (maybeWeight == w || maybeWeight == w.replace('-', '') || previousPart + '-' + maybeWeight == w) {
                    weight = haveWeight ? weight : fontWeights[w];
                    parts.pop();
                    if (previousPart && w.startsWith(previousPart)) {
                        parts.pop();
                    }
                    break;
                }
            }
            if (!haveWeight && typeof maybeWeight == 'number') {
                weight = maybeWeight;
                haveWeight = true;
            }
            var fontFamily = parts.join(sp).replace('Klokantech Noto Sans', 'Noto Sans');
            if (fontFamily.indexOf(sp) !== -1) {
                fontFamily = '"' + fontFamily + '"';
            }
            fontFamilies.push(fontFamily);
        }
        // CSS font property: font-style font-weight font-size/line-height font-family
        cssData = fontCache[fonts] = [
            style,
            weight,
            fontFamilies
        ];
    }
    return cssData[0] + sp + cssData[1] + sp + size + 'px' + (lineHeight ? '/' + lineHeight : '') + sp + cssData[2];
};

var mb2css = /*@__PURE__*/getDefaultExportFromCjs(mapboxToCssFont);

const mapboxBaseUrl = 'https://api.mapbox.com';
/**
 * Gets the path from a mapbox:// URL.
 * @param {string} url The Mapbox URL.
 * @return {string} The path.
 * @private
 */
function getMapboxPath(url) {
    const startsWith = 'mapbox://';
    if (url.indexOf(startsWith) !== 0) {
        return '';
    }
    return url.slice(startsWith.length);
}
/**
 * Turns mapbox:// sprite URLs into resolvable URLs.
 * @param {string} url The sprite URL.
 * @param {string} token The access token.
 * @param {string} styleUrl The style URL.
 * @return {string} A resolvable URL.
 * @private
 */
function normalizeSpriteUrl(url, token, styleUrl) {
    const mapboxPath = getMapboxPath(url);
    if (!mapboxPath) {
        return decodeURI(new URL(url, styleUrl).href);
    }
    const startsWith = 'sprites/';
    if (mapboxPath.indexOf(startsWith) !== 0) {
        throw new Error(`unexpected sprites url: ${ url }`);
    }
    const sprite = mapboxPath.slice(startsWith.length);
    return `${ mapboxBaseUrl }/styles/v1/${ sprite }/sprite?access_token=${ token }`;
}
/**
 * Turns mapbox:// style URLs into resolvable URLs.
 * @param {string} url The style URL.
 * @param {string} token The access token.
 * @return {string} A resolvable URL.
 * @private
 */
function normalizeStyleUrl(url, token) {
    const mapboxPath = getMapboxPath(url);
    if (!mapboxPath) {
        return decodeURI(new URL(url, location.href).href);
    }
    const startsWith = 'styles/';
    if (mapboxPath.indexOf(startsWith) !== 0) {
        throw new Error(`unexpected style url: ${ url }`);
    }
    const style = mapboxPath.slice(startsWith.length);
    return `${ mapboxBaseUrl }/styles/v1/${ style }?&access_token=${ token }`;
}
const mapboxSubdomains = [
    'a',
    'b',
    'c',
    'd'
];
/**
 * Turns mapbox:// source URLs into vector tile URL templates.
 * @param {string} url The source URL.
 * @param {string} token The access token.
 * @param {string} tokenParam The access token key.
 * @param {string} styleUrl The style URL.
 * @return {Array<string>} A vector tile template.
 * @private
 */
function normalizeSourceUrl(url, token, tokenParam, styleUrl) {
    const urlObject = new URL(url, styleUrl);
    const mapboxPath = getMapboxPath(url);
    if (!mapboxPath) {
        if (!token) {
            return [decodeURI(urlObject.href)];
        }
        if (!urlObject.searchParams.has(tokenParam)) {
            urlObject.searchParams.set(tokenParam, token);
        }
        return [decodeURI(urlObject.href)];
    }
    if (mapboxPath === 'mapbox.satellite') {
        const sizeFactor = window.devicePixelRatio >= 1.5 ? '@2x' : '';
        return [`https://api.mapbox.com/v4/${ mapboxPath }/{z}/{x}/{y}${ sizeFactor }.webp?access_token=${ token }`];
    }
    return mapboxSubdomains.map(sub => `https://${ sub }.tiles.mapbox.com/v4/${ mapboxPath }/{z}/{x}/{y}.vector.pbf?access_token=${ token }`);
}

/** @typedef {'Style'|'Source'|'Sprite'|'SpriteImage'|'Tiles'|'GeoJSON'} ResourceType */
/** @typedef {import("ol").Map} Map */
/** @typedef {import("ol/layer").Layer} Layer */
/** @typedef {import("ol/layer").Group} LayerGroup */
/** @typedef {import("ol/layer").Vector} VectorLayer */
/** @typedef {import("ol/layer").VectorTile} VectorTileLayer */
/** @typedef {import("ol/source").Source} Source */
const functionCacheByStyleId = {};
const filterCacheByStyleId = {};
let styleId = 0;
function getStyleId(glStyle) {
    if (!glStyle.id) {
        glStyle.id = styleId++;
    }
    return glStyle.id;
}
function getStyleFunctionKey(glStyle, olLayer) {
    return getStyleId(glStyle) + '.' + getUid(olLayer);
}
/**
 * @param {Object} glStyle Mapboox style object.
 * @return {Object} Function cache.
 */
function getFunctionCache(glStyle) {
    let functionCache = functionCacheByStyleId[glStyle.id];
    if (!functionCache) {
        functionCache = {};
        functionCacheByStyleId[getStyleId(glStyle)] = functionCache;
    }
    return functionCache;
}
function clearFunctionCache() {
    for (const key in functionCacheByStyleId) {
        delete functionCacheByStyleId[key];
    }
}
/**
 * @param {Object} glStyle Mapboox style object.
 * @return {Object} Filter cache.
 */
function getFilterCache(glStyle) {
    let filterCache = filterCacheByStyleId[glStyle.id];
    if (!filterCache) {
        filterCache = {};
        filterCacheByStyleId[getStyleId(glStyle)] = filterCache;
    }
    return filterCache;
}
function deg2rad(degrees) {
    return degrees * Math.PI / 180;
}
const defaultResolutions = (function () {
    const resolutions = [];
    for (let res = 78271.51696402048; resolutions.length <= 24; res /= 2) {
        resolutions.push(res);
    }
    return resolutions;
}());
/**
 * @param {number} width Width of the canvas.
 * @param {number} height Height of the canvas.
 * @return {HTMLCanvasElement} Canvas.
 */
function createCanvas(width, height) {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && typeof OffscreenCanvas !== 'undefined') {
        // eslint-disable-line
        return new OffscreenCanvas(width, height);
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
function getZoomForResolution(resolution, resolutions) {
    let i = 0;
    const ii = resolutions.length;
    for (; i < ii; ++i) {
        const candidate = resolutions[i];
        if (candidate < resolution && i + 1 < ii) {
            const zoomFactor = resolutions[i] / resolutions[i + 1];
            return i + Math.log(resolutions[i] / resolution) / Math.log(zoomFactor);
        }
    }
    return ii - 1;
}
function getResolutionForZoom(zoom, resolutions) {
    const base = Math.floor(zoom);
    const factor = Math.pow(2, zoom - base);
    return resolutions[base] / factor;
}
const pendingRequests = {};
/**
 * @param {ResourceType} resourceType Type of resource to load.
 * @param {string} url Url of the resource.
 * @param {Options} [options={}] Options.
 * @param {{request?: Request}} [metadata] Object to be filled with the request.
 * @return {Promise<Object|Response>} Promise that resolves with the loaded resource
 * or rejects with the Response object.
 * @private
 */
function fetchResource(resourceType, url, options = {}, metadata) {
    if (url in pendingRequests) {
        if (metadata) {
            metadata.request = pendingRequests[url][0];
        }
        return pendingRequests[url][1];
    }
    const transformedRequest = options.transformRequest ? options.transformRequest(url, resourceType) || url : url;
    const pendingRequest = toPromise(() => transformedRequest).then(transformedRequest => {
        if (!(transformedRequest instanceof Request)) {
            transformedRequest = new Request(transformedRequest);
        }
        if (!transformedRequest.headers.get('Accept')) {
            transformedRequest.headers.set('Accept', 'application/json');
        }
        if (metadata) {
            metadata.request = transformedRequest;
        }
        return fetch(transformedRequest).then(function (response) {
            delete pendingRequests[url];
            return response.ok ? response.json() : Promise.reject(new Error('Error fetching source ' + url));
        }).catch(function (error) {
            delete pendingRequests[url];
            return Promise.reject(new Error('Error fetching source ' + url));
        });
    });
    pendingRequests[url] = [
        transformedRequest,
        pendingRequest
    ];
    return pendingRequest;
}
function getGlStyle(glStyleOrUrl, options) {
    if (typeof glStyleOrUrl === 'string') {
        if (glStyleOrUrl.trim().startsWith('{')) {
            try {
                const glStyle = JSON.parse(glStyleOrUrl);
                return Promise.resolve(glStyle);
            } catch (error) {
                return Promise.reject(error);
            }
        } else {
            glStyleOrUrl = normalizeStyleUrl(glStyleOrUrl, options.accessToken);
            return fetchResource('Style', glStyleOrUrl, options);
        }
    } else {
        return Promise.resolve(glStyleOrUrl);
    }
}
const tilejsonCache = {};
/**
 * @param {Object} glSource glStyle source object.
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {Promise<{tileJson: Object, tileLoadFunction: import('ol/Tile.js').LoadFunction}?>} TileJson and load function
 */
function getTileJson(glSource, styleUrl, options = {}) {
    const cacheKey = [
        styleUrl,
        JSON.stringify(glSource)
    ].toString();
    let promise = tilejsonCache[cacheKey];
    if (!promise || options.transformRequest) {
        let tileLoadFunction;
        if (options.transformRequest) {
            tileLoadFunction = (tile, src) => {
                const transformedRequest = options.transformRequest ? options.transformRequest(src, 'Tiles') || src : src;
                if (tile instanceof VectorTile) {
                    tile.setLoader((extent, resolution, projection) => {
                        toPromise(() => transformedRequest).then(transformedRequest => {
                            fetch(transformedRequest).then(response => response.arrayBuffer()).then(data => {
                                const format = tile.getFormat();
                                const features = format.readFeatures(data, {
                                    extent: extent,
                                    featureProjection: projection
                                });
                                // @ts-ignore
                                tile.setFeatures(features);
                            }).catch(e => tile.setState(TileState.ERROR));
                        });
                    });
                } else {
                    const img = tile.getImage();
                    toPromise(() => transformedRequest).then(transformedRequest => {
                        if (transformedRequest instanceof Request) {
                            fetch(transformedRequest).then(response => response.blob()).then(blob => {
                                const url = URL.createObjectURL(blob);
                                img.addEventListener('load', () => URL.revokeObjectURL(url));
                                img.addEventListener('error', () => URL.revokeObjectURL(url));
                                img.src = url;
                            }).catch(e => tile.setState(TileState.ERROR));
                        } else {
                            img.src = transformedRequest;
                        }
                    });
                }
            };
        }
        const url = glSource.url;
        if (url && !glSource.tiles) {
            const normalizedSourceUrl = normalizeSourceUrl(url, options.accessToken, options.accessTokenParam || 'access_token', styleUrl || location.href);
            if (url.startsWith('mapbox://')) {
                promise = Promise.resolve({
                    tileJson: Object.assign({}, glSource, {
                        url: undefined,
                        tiles: normalizedSourceUrl
                    }),
                    tileLoadFunction
                });
            } else {
                const metadata = {};
                promise = fetchResource('Source', normalizedSourceUrl[0], options, metadata).then(function (tileJson) {
                    tileJson.tiles = tileJson.tiles.map(function (tileUrl) {
                        if (tileJson.scheme === 'tms') {
                            tileUrl = tileUrl.replace('{y}', '{-y}');
                        }
                        return normalizeSourceUrl(tileUrl, options.accessToken, options.accessTokenParam || 'access_token', metadata.request.url)[0];
                    });
                    return Promise.resolve({
                        tileJson,
                        tileLoadFunction
                    });
                });
            }
        } else {
            glSource = Object.assign({}, glSource, {
                tiles: glSource.tiles.map(function (tileUrl) {
                    if (glSource.scheme === 'tms') {
                        tileUrl = tileUrl.replace('{y}', '{-y}');
                    }
                    return normalizeSourceUrl(tileUrl, options.accessToken, options.accessTokenParam || 'access_token', styleUrl || location.href)[0];
                })
            });
            promise = Promise.resolve({
                tileJson: Object.assign({}, glSource),
                tileLoadFunction
            });
        }
        tilejsonCache[cacheKey] = promise;
    }
    return promise;
}
/**
 * @param {HTMLImageElement|HTMLCanvasElement} spriteImage Sprite image id.
 * @param {{x: number, y: number, width: number, height: number, pixelRatio: number}} spriteImageData Sprite image data.
 * @param {number} haloWidth Halo width.
 * @param {{r: number, g: number, b: number, a: number}} haloColor Halo color.
 * @return {HTMLCanvasElement} Canvas element with the halo.
 */
function drawIconHalo(spriteImage, spriteImageData, haloWidth, haloColor) {
    const imgSize = [
        2 * haloWidth * spriteImageData.pixelRatio + spriteImageData.width,
        2 * haloWidth * spriteImageData.pixelRatio + spriteImageData.height
    ];
    const imageCanvas = createCanvas(imgSize[0], imgSize[1]);
    const imageContext = imageCanvas.getContext('2d');
    imageContext.drawImage(spriteImage, spriteImageData.x, spriteImageData.y, spriteImageData.width, spriteImageData.height, haloWidth * spriteImageData.pixelRatio, haloWidth * spriteImageData.pixelRatio, spriteImageData.width, spriteImageData.height);
    const imageData = imageContext.getImageData(0, 0, imgSize[0], imgSize[1]);
    imageContext.globalCompositeOperation = 'destination-over';
    imageContext.fillStyle = `rgba(${ haloColor.r * 255 },${ haloColor.g * 255 },${ haloColor.b * 255 },${ haloColor.a })`;
    const data = imageData.data;
    for (let i = 0, ii = imageData.width; i < ii; ++i) {
        for (let j = 0, jj = imageData.height; j < jj; ++j) {
            const index = (j * ii + i) * 4;
            const alpha = data[index + 3];
            if (alpha > 0) {
                imageContext.arc(i, j, haloWidth * spriteImageData.pixelRatio, 0, 2 * Math.PI);
            }
        }
    }
    imageContext.fill();
    return imageCanvas;
}
function smoothstep(min, max, value) {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
}
/**
 * @param {HTMLImageElement} image SDF image
 * @param {{x: number, y: number, width: number, height: number}} area Area to unSDF
 * @param {{r: number, g: number, b: number, a: number}} color Color to use
 * @return {HTMLCanvasElement} Regular image
 */
function drawSDF(image, area, color) {
    const imageCanvas = createCanvas(area.width, area.height);
    const imageContext = imageCanvas.getContext('2d');
    imageContext.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, area.width, area.height);
    const imageData = imageContext.getImageData(0, 0, area.width, area.height);
    const data = imageData.data;
    for (let i = 0, ii = imageData.width; i < ii; ++i) {
        for (let j = 0, jj = imageData.height; j < jj; ++j) {
            const index = (j * ii + i) * 4;
            const dist = data[index + 3] / 255;
            const buffer = 0.75;
            const gamma = 0.1;
            const alpha = smoothstep(buffer - gamma, buffer + gamma, dist);
            if (alpha > 0) {
                data[index + 0] = Math.round(255 * color.r * alpha);
                data[index + 1] = Math.round(255 * color.g * alpha);
                data[index + 2] = Math.round(255 * color.b * alpha);
                data[index + 3] = Math.round(255 * alpha);
            } else {
                data[index + 3] = 0;
            }
        }
    }
    imageContext.putImageData(imageData, 0, 0);
    return imageCanvas;
}    /**
 * @typedef {import("./apply.js").Options} Options
 * @private
 */

const hairSpacePool = Array(256).join('\u200A');
function applyLetterSpacing(text, letterSpacing) {
    if (letterSpacing >= 0.05) {
        let textWithLetterSpacing = '';
        const lines = text.split('\n');
        const joinSpaceString = hairSpacePool.slice(0, Math.round(letterSpacing / 0.1));
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
    return getMeasureContext().measureText(text).width + (text.length - 1) * letterSpacing;
}
const measureCache = {};
function wrapText(text, font, em, letterSpacing) {
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
                    const prevWidth = i > 0 ? measureText(lines[i - 1], letterSpacing) : Infinity;
                    const nextWidth = i < ii - 1 ? measureText(lines[i + 1], letterSpacing) : Infinity;
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
                if (measureText(line, letterSpacing) > maxWidth * 0.7 && measureText(next, letterSpacing) < maxWidth * 0.6) {
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
            const styleSheet = styleSheets[i];
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
            }
        }
    }
    return family in loadedFontFamilies;
}
const processedFontFamilies = {};
/**
 * @param {Array} fonts Fonts.
 * @param {string} [templateUrl] Template URL.
 * @return {Array} Processed fonts.
 * @private
 */
function getFonts(fonts, templateUrl = 'https://cdn.jsdelivr.net/npm/@fontsource/{font-family}/{fontweight}{-fontstyle}.css') {
    const fontsKey = fonts.toString();
    if (fontsKey in processedFontFamilies) {
        return processedFontFamilies[fontsKey];
    }
    const fontDescriptions = [];
    for (let i = 0, ii = fonts.length; i < ii; ++i) {
        fonts[i] = fonts[i].replace('Arial Unicode MS', 'Arial');
        const font = fonts[i];
        const cssFont = mb2css(font, 1);
        registerFont(cssFont);
        const parts = cssFont.split(' ');
        fontDescriptions.push([
            parts.slice(3).join(' ').replace(/"/g, ''),
            parts[1],
            parts[0]
        ]);
    }
    for (let i = 0, ii = fontDescriptions.length; i < ii; ++i) {
        const fontDescription = fontDescriptions[i];
        const family = fontDescription[0];
        if (!hasFontFamily(family)) {
            if (checkedFonts.get(`${ fontDescription[2] }\n${ fontDescription[1] } \n${ family }`) !== 100) {
                const fontUrl = templateUrl.replace('{font-family}', family.replace(/ /g, '-').toLowerCase()).replace('{Font+Family}', family.replace(/ /g, '+')).replace('{fontweight}', fontDescription[1]).replace('{-fontstyle}', fontDescription[2].replace('normal', '').replace(/(.+)/, '-$1')).replace('{fontstyle}', fontDescription[2]);
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

/*
ol-mapbox-style - Use Mapbox/MapLibre Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
*/
/**
 * @typedef {import("ol/layer/Vector").default} VectorLayer
 * @typedef {import("ol/layer/VectorTile").default} VectorTileLayer
 * @typedef {import("ol/style/Style").StyleFunction} StyleFunction
 * @typedef {import('./util.js').ResourceType} ResourceType
 */
const types = {
    'Point': 1,
    'MultiPoint': 1,
    'LineString': 2,
    'MultiLineString': 2,
    'Polygon': 3,
    'MultiPolygon': 3
};
const anchor = {
    'center': [
        0.5,
        0.5
    ],
    'left': [
        0,
        0.5
    ],
    'right': [
        1,
        0.5
    ],
    'top': [
        0.5,
        0
    ],
    'bottom': [
        0.5,
        1
    ],
    'top-left': [
        0,
        0
    ],
    'top-right': [
        1,
        0
    ],
    'bottom-left': [
        0,
        1
    ],
    'bottom-right': [
        1,
        1
    ]
};
const expressionData = function (rawExpression, propertySpec) {
    const compiledExpression = createPropertyExpression(rawExpression, propertySpec);
    if (compiledExpression.result === 'error') {
        throw new Error(compiledExpression.value.map(err => `${ err.key }: ${ err.message }`).join(', '));
    }
    return compiledExpression.value;
};
const emptyObj$1 = {};
const zoomObj = { zoom: 0 };
let renderFeatureCoordinates, renderFeature;
/**
 * @private
 * @param {Object} layer Gl object layer.
 * @param {string} layoutOrPaint 'layout' or 'paint'.
 * @param {string} property Feature property.
 * @param {number} zoom Zoom.
 * @param {Object} feature Gl feature.
 * @param {Object} [functionCache] Function cache.
 * @param {Object} [featureState] Feature state.
 * @return {?} Value.
 */
function getValue(layer, layoutOrPaint, property, zoom, feature, functionCache, featureState) {
    const layerId = layer.id;
    if (!functionCache) {
        functionCache = {};
        console.warn('No functionCache provided to getValue()');    //eslint-disable-line no-console
    }
    if (!functionCache[layerId]) {
        functionCache[layerId] = {};
    }
    const functions = functionCache[layerId];
    if (!functions[property]) {
        let value = (layer[layoutOrPaint] || emptyObj$1)[property];
        const propertySpec = spec[`${ layoutOrPaint }_${ layer.type }`][property];
        if (value === undefined) {
            value = propertySpec.default;
        }
        let isExpr = isExpression(value);
        if (!isExpr && isFunction(value)) {
            value = convertFunction(value, propertySpec);
            isExpr = true;
        }
        if (isExpr) {
            const compiledExpression = expressionData(value, propertySpec);
            functions[property] = compiledExpression.evaluate.bind(compiledExpression);
        } else {
            if (propertySpec.type == 'color') {
                value = Color$1.parse(value);
            }
            functions[property] = function () {
                return value;
            };
        }
    }
    zoomObj.zoom = zoom;
    return functions[property](zoomObj, feature, featureState);
}
/**
 * @private
 * @param {Object} layer Gl object layer.
 * @param {number} zoom Zoom.
 * @param {Object} feature Gl feature.
 * @param {"icon"|"text"} prefix Style property prefix.
 * @param {Object} [functionCache] Function cache.
 * @return {"declutter"|"obstacle"|"none"} Value.
 */
function getDeclutterMode(layer, zoom, feature, prefix, functionCache) {
    const allowOverlap = getValue(layer, 'layout', `${ prefix }-allow-overlap`, zoom, feature, functionCache);
    if (!allowOverlap) {
        return 'declutter';
    }
    const ignorePlacement = getValue(layer, 'layout', `${ prefix }-ignore-placement`, zoom, feature, functionCache);
    if (!ignorePlacement) {
        return 'obstacle';
    }
    return 'none';
}
/**
 * @private
 * @param {string} layerId Layer id.
 * @param {?} filter Filter.
 * @param {Object} feature Feature.
 * @param {number} zoom Zoom.
 * @param {Object} [filterCache] Filter cache.
 * @return {boolean} Filter result.
 */
function evaluateFilter(layerId, filter, feature, zoom, filterCache) {
    if (!filterCache) {
        console.warn('No filterCache provided to evaluateFilter()');    //eslint-disable-line no-console
    }
    if (!(layerId in filterCache)) {
        filterCache[layerId] = createFilter(filter).filter;
    }
    zoomObj.zoom = zoom;
    return filterCache[layerId](zoomObj, feature);
}
let renderTransparentEnabled = false;
/**
 * Configure whether features with a transparent style should be rendered. When
 * set to `true`, it will be possible to hit detect content that is not visible,
 * like transparent fills of polygons, using `ol/layer/Layer#getFeatures()` or
 * `ol/Map#getFeaturesAtPixel()`
 * @param {boolean} enabled Rendering of transparent elements is enabled.
 * Default is `false`.
 */
function renderTransparent(enabled) {
    if (enabled !== renderTransparentEnabled) {
        clearFunctionCache();
        renderTransparentEnabled = enabled;
    }
}
/**
 * @private
 * @param {?} color Color.
 * @param {number} [opacity] Opacity.
 * @return {string} Color.
 */
function colorWithOpacity(color, opacity) {
    if (color) {
        if (!renderTransparentEnabled && (color.a === 0 || opacity === 0)) {
            return undefined;
        }
        const a = color.a;
        opacity = opacity === undefined ? 1 : opacity;
        return a === 0 ? 'transparent' : 'rgba(' + Math.round(color.r * 255 / a) + ',' + Math.round(color.g * 255 / a) + ',' + Math.round(color.b * 255 / a) + ',' + a * opacity + ')';
    }
    return color;
}
const templateRegEx = /\{[^{}}]*\}/g;
/**
 * @private
 * @param {string} text Text.
 * @param {Object} properties Properties.
 * @return {string} Text.
 */
function fromTemplate(text, properties) {
    return text.replace(templateRegEx, function (match) {
        return properties[match.slice(1, -1)] || '';
    });
}
let recordLayer = false;
/**
 * Turns recording of the Mapbox/MapLibre Style's `layer` on and off. When turned on,
 * the layer that a rendered feature belongs to will be set as the feature's
 * `mapbox-layer` property.
 * @param {boolean} record Recording of the style layer is on.
 */
function recordStyleLayer(record = false) {
    recordLayer = record;
}
const styleFunctionArgs = {};
/**
 * Creates a style function from the `glStyle` object for all layers that use
 * the specified `source`, which needs to be a `"type": "vector"` or
 * `"type": "geojson"` source and applies it to the specified OpenLayers layer.
 *
 * Two additional properties will be set on the provided layer:
 *
 *  * `mapbox-source`: The `id` of the Mapbox/MapLibre Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox/MapLibre Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox/MapLibre Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * This function also works in a web worker. In worker mode, the main thread needs
 * to listen to messages from the worker and respond with another message to make
 * sure that sprite image loading works:
 *
 * ```js
 *  worker.addEventListener('message', event => {
 *   if (event.data.action === 'loadImage') {
 *     const image = new Image();
 *     image.crossOrigin = 'anonymous';
 *     image.addEventListener('load', function() {
 *       createImageBitmap(image, 0, 0, image.width, image.height).then(imageBitmap => {
 *         worker.postMessage({
 *           action: 'imageLoaded',
 *           image: imageBitmap,
 *           src: event.data.src
 *         }, [imageBitmap]);
 *       });
 *     });
 *     image.src = event.data.src;
 *   }
 * });
 * ```
 *
 * @param {VectorLayer|VectorTileLayer} olLayer OpenLayers layer to
 * apply the style to. In addition to the style, the layer will get two
 * properties: `mapbox-source` will be the `id` of the `glStyle`'s source used
 * for the layer, and `mapbox-layers` will be an array of the `id`s of the
 * `glStyle`'s layers.
 * @param {string|Object} glStyle Mapbox/MapLibre Style object.
 * @param {string|Array<string>} sourceOrLayers `source` key or an array of layer `id`s
 * from the Mapbox/MapLibre Style object. When a `source` key is provided, all layers for
 * the specified source will be included in the style function. When layer `id`s
 * are provided, they must be from layers that use the same source.
 * @param {Array<number>} resolutions
 * Resolutions for mapping resolution to zoom level.
 * @param {Object} spriteData Sprite data from the url specified in
 * the Mapbox/MapLibre Style object's `sprite` property. Only required if a `sprite`
 * property is specified in the Mapbox/MapLibre Style object.
 * @param {string|Request|Promise<string|Request>} spriteImageUrl Sprite image url for the sprite
 * specified in the Mapbox/MapLibre Style object's `sprite` property. Only required if a
 * `sprite` property is specified in the Mapbox/MapLibre Style object.
 * @param {function(Array<string>, string=):Array<string>} getFonts Function that
 * receives a font stack and the url template from the GL style's `metadata['ol:webfonts']`
 * property (if set) as arguments, and returns a (modified) font stack that
 * is available. Font names are the names used in the Mapbox/MapLibre Style object. If
 * not provided, the font stack will be used as-is. This function can also be
 * used for loading web fonts.
 * @param {function(VectorLayer|VectorTileLayer, string):HTMLImageElement|HTMLCanvasElement|string|undefined} [getImage=undefined]
 * Function that returns an image or a URL for an image name. If the result is an HTMLImageElement, it must already be
 * loaded. The layer can be used to call layer.changed() when the loading and processing of the image has finished.
 * This function can be used for icons not in the sprite or to override sprite icons.
 * @return {StyleFunction} Style function for use in
 * `ol.layer.Vector` or `ol.layer.VectorTile`.
 */
function stylefunction(olLayer, glStyle, sourceOrLayers, resolutions = defaultResolutions, spriteData = undefined, spriteImageUrl = undefined, getFonts = undefined, getImage = undefined) {
    if (typeof glStyle == 'string') {
        glStyle = JSON.parse(glStyle);
    }
    if (glStyle.version != 8) {
        throw new Error('glStyle version 8 required.');
    }
    styleFunctionArgs[getStyleFunctionKey(glStyle, olLayer)] = Array.from(arguments);
    let spriteImage, spriteImageSize;
    let spriteImageUnSDFed;
    if (spriteImageUrl) {
        if (typeof Image !== 'undefined') {
            const img = new Image();
            let blobUrl;
            toPromise(() => spriteImageUrl).then(spriteImageUrl => {
                if (spriteImageUrl instanceof Request) {
                    fetch(spriteImageUrl).then(response => response.blob()).then(blob => {
                        blobUrl = URL.createObjectURL(blob);
                        img.src = blobUrl;
                    }).catch(() => {
                    });
                } else {
                    img.crossOrigin = 'anonymous';
                    img.src = spriteImageUrl;
                    if (blobUrl) {
                        URL.revokeObjectURL(blobUrl);
                    }
                }
            });
            img.onload = function () {
                spriteImage = img;
                spriteImageSize = [
                    img.width,
                    img.height
                ];
                olLayer.changed();
                img.onload = null;
            };
        } else if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
            //eslint-disable-line
            const worker = self;
            // Main thread needs to handle 'loadImage' and dispatch 'imageLoaded'
            worker.postMessage({
                action: 'loadImage',
                src: spriteImageUrl
            });
            worker.addEventListener('message', function handler(event) {
                if (event.data.action === 'imageLoaded' && event.data.src === spriteImageUrl) {
                    spriteImage = event.data.image;
                    spriteImageSize = [
                        spriteImage.width,
                        spriteImage.height
                    ];
                }
            });
        }
    }
    const allLayers = derefLayers(glStyle.layers);
    const layersBySourceLayer = {};
    const mapboxLayers = [];
    const iconImageCache = {};
    const patternCache = {};
    const functionCache = getFunctionCache(glStyle);
    const filterCache = getFilterCache(glStyle);
    let mapboxSource;
    for (let i = 0, ii = allLayers.length; i < ii; ++i) {
        const layer = allLayers[i];
        const layerId = layer.id;
        if (typeof sourceOrLayers == 'string' && layer.source == sourceOrLayers || Array.isArray(sourceOrLayers) && sourceOrLayers.indexOf(layerId) !== -1) {
            const sourceLayer = layer['source-layer'];
            if (!mapboxSource) {
                mapboxSource = layer.source;
                const source = glStyle.sources[mapboxSource];
                if (!source) {
                    throw new Error(`Source "${ mapboxSource }" is not defined`);
                }
                const type = source.type;
                if (type !== 'vector' && type !== 'geojson') {
                    throw new Error(`Source "${ mapboxSource }" is not of type "vector" or "geojson", but "${ type }"`);
                }
            } else if (layer.source !== mapboxSource) {
                throw new Error(`Layer "${ layerId }" does not use source "${ mapboxSource }`);
            }
            let layers = layersBySourceLayer[sourceLayer];
            if (!layers) {
                layers = [];
                layersBySourceLayer[sourceLayer] = layers;
            }
            layers.push({
                layer: layer,
                index: i
            });
            mapboxLayers.push(layerId);
        }
    }
    const textHalo = new Stroke();
    const textColor = new Fill();
    const styles = [];
    /**
   * @param {import("ol/Feature").default|import("ol/render/Feature").default} feature Feature.
   * @param {number} resolution Resolution.
   * @param {string} [onlyLayer] Calculate style for this layer only.
   * @return {Array<import("ol/style/Style").default>} Style.
   */
    const styleFunction = function (feature, resolution, onlyLayer) {
        const properties = feature.getProperties();
        const layers = layersBySourceLayer[properties.layer];
        if (!layers) {
            return undefined;
        }
        let zoom = resolutions.indexOf(resolution);
        if (zoom == -1) {
            zoom = getZoomForResolution(resolution, resolutions);
        }
        const type = types[feature.getGeometry().getType()];
        const f = {
            id: feature.getId(),
            properties: properties,
            type: type
        };
        const featureState = olLayer.get('mapbox-featurestate')[feature.getId()];
        let stylesLength = -1;
        let featureBelongsToLayer;
        for (let i = 0, ii = layers.length; i < ii; ++i) {
            const layerData = layers[i];
            const layer = layerData.layer;
            const layerId = layer.id;
            if (onlyLayer !== undefined && onlyLayer !== layerId) {
                continue;
            }
            const layout = layer.layout || emptyObj$1;
            const paint = layer.paint || emptyObj$1;
            if (layout.visibility === 'none' || 'minzoom' in layer && zoom < layer.minzoom || 'maxzoom' in layer && zoom >= layer.maxzoom) {
                continue;
            }
            const filter = layer.filter;
            if (!filter || evaluateFilter(layerId, filter, f, zoom, filterCache)) {
                featureBelongsToLayer = layer;
                let color, opacity, fill, stroke, strokeColor, style;
                const index = layerData.index;
                if (type == 3 && (layer.type == 'fill' || layer.type == 'fill-extrusion')) {
                    opacity = getValue(layer, 'paint', layer.type + '-opacity', zoom, f, functionCache, featureState);
                    if (layer.type + '-pattern' in paint) {
                        const fillIcon = getValue(layer, 'paint', layer.type + '-pattern', zoom, f, functionCache, featureState);
                        if (fillIcon) {
                            const icon = typeof fillIcon === 'string' ? fromTemplate(fillIcon, properties) : fillIcon.toString();
                            if (spriteImage && spriteData && spriteData[icon]) {
                                ++stylesLength;
                                style = styles[stylesLength];
                                if (!style || !style.getFill() || style.getStroke() || style.getText()) {
                                    style = new Style({ fill: new Fill() });
                                    styles[stylesLength] = style;
                                }
                                fill = style.getFill();
                                style.setZIndex(index);
                                const icon_cache_key = icon + '.' + opacity;
                                let pattern = patternCache[icon_cache_key];
                                if (!pattern) {
                                    const spriteImageData = spriteData[icon];
                                    const canvas = createCanvas(spriteImageData.width, spriteImageData.height);
                                    const ctx = canvas.getContext('2d');
                                    ctx.globalAlpha = opacity;
                                    ctx.drawImage(spriteImage, spriteImageData.x, spriteImageData.y, spriteImageData.width, spriteImageData.height, 0, 0, spriteImageData.width, spriteImageData.height);
                                    pattern = ctx.createPattern(canvas, 'repeat');
                                    patternCache[icon_cache_key] = pattern;
                                }
                                fill.setColor(pattern);
                            }
                        }
                    } else {
                        color = colorWithOpacity(getValue(layer, 'paint', layer.type + '-color', zoom, f, functionCache, featureState), opacity);
                        if (layer.type + '-outline-color' in paint) {
                            strokeColor = colorWithOpacity(getValue(layer, 'paint', layer.type + '-outline-color', zoom, f, functionCache, featureState), opacity);
                        }
                        if (!strokeColor) {
                            strokeColor = color;
                        }
                        if (color || strokeColor) {
                            ++stylesLength;
                            style = styles[stylesLength];
                            if (!style || color && !style.getFill() || !color && style.getFill() || strokeColor && !style.getStroke() || !strokeColor && style.getStroke() || style.getText()) {
                                style = new Style({
                                    fill: color ? new Fill() : undefined,
                                    stroke: strokeColor ? new Stroke() : undefined
                                });
                                styles[stylesLength] = style;
                            }
                            if (color) {
                                fill = style.getFill();
                                fill.setColor(color);
                            }
                            if (strokeColor) {
                                stroke = style.getStroke();
                                stroke.setColor(strokeColor);
                                stroke.setWidth(0.5);
                            }
                            style.setZIndex(index);
                        }
                    }
                }
                if (type != 1 && layer.type == 'line') {
                    if (!('line-pattern' in paint)) {
                        color = colorWithOpacity(getValue(layer, 'paint', 'line-color', zoom, f, functionCache, featureState), getValue(layer, 'paint', 'line-opacity', zoom, f, functionCache, featureState));
                    } else {
                        color = undefined;
                    }
                    const width = getValue(layer, 'paint', 'line-width', zoom, f, functionCache, featureState);
                    if (color && width > 0) {
                        ++stylesLength;
                        style = styles[stylesLength];
                        if (!style || !style.getStroke() || style.getFill() || style.getText()) {
                            style = new Style({ stroke: new Stroke() });
                            styles[stylesLength] = style;
                        }
                        stroke = style.getStroke();
                        stroke.setLineCap(getValue(layer, 'layout', 'line-cap', zoom, f, functionCache, featureState));
                        stroke.setLineJoin(getValue(layer, 'layout', 'line-join', zoom, f, functionCache, featureState));
                        stroke.setMiterLimit(getValue(layer, 'layout', 'line-miter-limit', zoom, f, functionCache, featureState));
                        stroke.setColor(color);
                        stroke.setWidth(width);
                        stroke.setLineDash(paint['line-dasharray'] ? getValue(layer, 'paint', 'line-dasharray', zoom, f, functionCache, featureState).map(function (x) {
                            return x * width;
                        }) : null);
                        style.setZIndex(index);
                    }
                }
                let hasImage = false;
                let text = null;
                let placementAngle = 0;
                let icon, iconImg, skipLabel;
                if ((type == 1 || type == 2) && 'icon-image' in layout) {
                    const iconImage = getValue(layer, 'layout', 'icon-image', zoom, f, functionCache, featureState);
                    if (iconImage) {
                        icon = typeof iconImage === 'string' ? fromTemplate(iconImage, properties) : iconImage.toString();
                        let styleGeom = undefined;
                        const imageElement = getImage ? getImage(olLayer, icon) : undefined;
                        if (spriteImage && spriteData && spriteData[icon] || imageElement) {
                            const iconRotationAlignment = getValue(layer, 'layout', 'icon-rotation-alignment', zoom, f, functionCache, featureState);
                            if (type == 2) {
                                const geom = feature.getGeometry();
                                // ol package and ol-debug.js only
                                if (geom.getFlatMidpoint || geom.getFlatMidpoints) {
                                    const extent = geom.getExtent();
                                    const size = Math.sqrt(Math.max(Math.pow((extent[2] - extent[0]) / resolution, 2), Math.pow((extent[3] - extent[1]) / resolution, 2)));
                                    if (size > 150) {
                                        //FIXME Do not hard-code a size of 150
                                        const midpoint = geom.getType() === 'MultiLineString' ? geom.getFlatMidpoints() : geom.getFlatMidpoint();
                                        if (!renderFeature) {
                                            renderFeatureCoordinates = [
                                                NaN,
                                                NaN
                                            ];
                                            renderFeature = new RenderFeature('Point', renderFeatureCoordinates, [], 2, {}, undefined);
                                        }
                                        styleGeom = renderFeature;
                                        renderFeatureCoordinates[0] = midpoint[0];
                                        renderFeatureCoordinates[1] = midpoint[1];
                                        const placement = getValue(layer, 'layout', 'symbol-placement', zoom, f, functionCache, featureState);
                                        if (placement === 'line' && iconRotationAlignment === 'map') {
                                            const stride = geom.getStride();
                                            const coordinates = geom.getFlatCoordinates();
                                            for (let i = 0, ii = coordinates.length - stride; i < ii; i += stride) {
                                                const x1 = coordinates[i];
                                                const y1 = coordinates[i + 1];
                                                const x2 = coordinates[i + stride];
                                                const y2 = coordinates[i + stride + 1];
                                                const minX = Math.min(x1, x2);
                                                const maxX = Math.max(x1, x2);
                                                const xM = midpoint[0];
                                                const yM = midpoint[1];
                                                const dotProduct = (y2 - y1) * (xM - x1) - (x2 - x1) * (yM - y1);
                                                if (Math.abs(dotProduct) < 0.001 && //midpoint is aligned with the segment
                                                    xM <= maxX && xM >= minX    //midpoint is on the segment and not outside it
) {
                                                    placementAngle = Math.atan2(y1 - y2, x2 - x1);
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (type !== 2 || styleGeom) {
                                const iconSize = getValue(layer, 'layout', 'icon-size', zoom, f, functionCache, featureState);
                                const iconColor = paint['icon-color'] !== undefined ? getValue(layer, 'paint', 'icon-color', zoom, f, functionCache, featureState) : null;
                                if (!iconColor || iconColor.a !== 0) {
                                    const haloColor = getValue(layer, 'paint', 'icon-halo-color', zoom, f, functionCache, featureState);
                                    const haloWidth = getValue(layer, 'paint', 'icon-halo-width', zoom, f, functionCache, featureState);
                                    let iconCacheKey = `${ icon }.${ iconSize }.${ haloWidth }.${ haloColor }`;
                                    if (iconColor !== null) {
                                        iconCacheKey += `.${ iconColor }`;
                                    }
                                    iconImg = iconImageCache[iconCacheKey];
                                    if (!iconImg) {
                                        const declutterMode = getDeclutterMode(layer, zoom, f, 'icon', functionCache);
                                        let displacement;
                                        if ('icon-offset' in layout) {
                                            displacement = getValue(layer, 'layout', 'icon-offset', zoom, f, functionCache, featureState).slice(0);
                                            displacement[0] *= iconSize;
                                            displacement[1] *= -iconSize;
                                        }
                                        let color = iconColor ? [
                                            iconColor.r * 255,
                                            iconColor.g * 255,
                                            iconColor.b * 255,
                                            iconColor.a
                                        ] : undefined;
                                        if (imageElement) {
                                            const iconOptions = {
                                                color: color,
                                                rotateWithView: iconRotationAlignment === 'map',
                                                displacement: displacement,
                                                declutterMode: declutterMode,
                                                scale: iconSize
                                            };
                                            if (typeof imageElement === 'string') {
                                                // it is a src URL
                                                iconOptions.src = imageElement;
                                            } else {
                                                iconOptions.img = imageElement;
                                                iconOptions.imgSize = [
                                                    imageElement.width,
                                                    imageElement.height
                                                ];
                                            }
                                            iconImg = new Icon(iconOptions);
                                        } else {
                                            const spriteImageData = spriteData[icon];
                                            let img, size, offset;
                                            if (haloWidth) {
                                                if (spriteImageData.sdf) {
                                                    img = drawIconHalo(drawSDF(spriteImage, spriteImageData, iconColor || [
                                                        0,
                                                        0,
                                                        0,
                                                        1
                                                    ]), {
                                                        x: 0,
                                                        y: 0,
                                                        width: spriteImageData.width,
                                                        height: spriteImageData.height,
                                                        pixelRatio: spriteImageData.pixelRatio
                                                    }, haloWidth, haloColor);
                                                    color = undefined;    // do not tint haloed icons
                                                } else {
                                                    img = drawIconHalo(spriteImage, spriteImageData, haloWidth, haloColor);
                                                }
                                            } else {
                                                if (spriteImageData.sdf) {
                                                    if (!spriteImageUnSDFed) {
                                                        spriteImageUnSDFed = drawSDF(spriteImage, {
                                                            x: 0,
                                                            y: 0,
                                                            width: spriteImageSize[0],
                                                            height: spriteImageSize[1]
                                                        }, {
                                                            r: 1,
                                                            g: 1,
                                                            b: 1,
                                                            a: 1
                                                        });
                                                    }
                                                    img = spriteImageUnSDFed;
                                                } else {
                                                    img = spriteImage;
                                                }
                                                size = [
                                                    spriteImageData.width,
                                                    spriteImageData.height
                                                ];
                                                offset = [
                                                    spriteImageData.x,
                                                    spriteImageData.y
                                                ];
                                            }
                                            iconImg = new Icon({
                                                color: color,
                                                img: img,
                                                // @ts-ignore
                                                imgSize: spriteImageSize,
                                                size: size,
                                                offset: offset,
                                                rotateWithView: iconRotationAlignment === 'map',
                                                scale: iconSize / spriteImageData.pixelRatio,
                                                displacement: displacement,
                                                declutterMode: declutterMode
                                            });
                                        }
                                        iconImageCache[iconCacheKey] = iconImg;
                                    }
                                }
                                if (iconImg) {
                                    ++stylesLength;
                                    style = styles[stylesLength];
                                    if (!style || !style.getImage() || style.getFill() || style.getStroke()) {
                                        style = new Style();
                                        styles[stylesLength] = style;
                                    }
                                    style.setGeometry(styleGeom);
                                    iconImg.setRotation(placementAngle + deg2rad(getValue(layer, 'layout', 'icon-rotate', zoom, f, functionCache, featureState)));
                                    iconImg.setOpacity(getValue(layer, 'paint', 'icon-opacity', zoom, f, functionCache, featureState));
                                    iconImg.setAnchor(anchor[getValue(layer, 'layout', 'icon-anchor', zoom, f, functionCache, featureState)]);
                                    style.setImage(iconImg);
                                    text = style.getText();
                                    style.setText(undefined);
                                    style.setZIndex(index);
                                    hasImage = true;
                                    skipLabel = false;
                                }
                            } else {
                                skipLabel = true;
                            }
                        }
                    }
                }
                if (type == 1 && layer.type === 'circle') {
                    ++stylesLength;
                    style = styles[stylesLength];
                    if (!style || !style.getImage() || style.getFill() || style.getStroke()) {
                        style = new Style();
                        styles[stylesLength] = style;
                    }
                    const circleRadius = 'circle-radius' in paint ? getValue(layer, 'paint', 'circle-radius', zoom, f, functionCache, featureState) : 5;
                    const circleStrokeColor = colorWithOpacity(getValue(layer, 'paint', 'circle-stroke-color', zoom, f, functionCache, featureState), getValue(layer, 'paint', 'circle-stroke-opacity', zoom, f, functionCache, featureState));
                    const circleTranslate = getValue(layer, 'paint', 'circle-translate', zoom, f, functionCache, featureState);
                    const circleColor = colorWithOpacity(getValue(layer, 'paint', 'circle-color', zoom, f, functionCache, featureState), getValue(layer, 'paint', 'circle-opacity', zoom, f, functionCache, featureState));
                    const circleStrokeWidth = getValue(layer, 'paint', 'circle-stroke-width', zoom, f, functionCache, featureState);
                    const cache_key = circleRadius + '.' + circleStrokeColor + '.' + circleColor + '.' + circleStrokeWidth + '.' + circleTranslate[0] + '.' + circleTranslate[1];
                    iconImg = iconImageCache[cache_key];
                    if (!iconImg) {
                        iconImg = new Circle({
                            radius: circleRadius,
                            displacement: [
                                circleTranslate[0],
                                -circleTranslate[1]
                            ],
                            stroke: circleStrokeColor && circleStrokeWidth > 0 ? new Stroke({
                                width: circleStrokeWidth,
                                color: circleStrokeColor
                            }) : undefined,
                            fill: circleColor ? new Fill({ color: circleColor }) : undefined,
                            declutterMode: 'none'
                        });
                        iconImageCache[cache_key] = iconImg;
                    }
                    style.setImage(iconImg);
                    text = style.getText();
                    style.setText(undefined);
                    style.setGeometry(undefined);
                    style.setZIndex(index);
                    hasImage = true;
                }
                let label, font, textLineHeight, textSize, letterSpacing, maxTextWidth;
                if ('text-field' in layout) {
                    textSize = Math.round(getValue(layer, 'layout', 'text-size', zoom, f, functionCache, featureState));
                    const fontArray = getValue(layer, 'layout', 'text-font', zoom, f, functionCache, featureState);
                    textLineHeight = getValue(layer, 'layout', 'text-line-height', zoom, f, functionCache, featureState);
                    font = mb2css(getFonts ? getFonts(fontArray, glStyle.metadata ? glStyle.metadata['ol:webfonts'] : undefined) : fontArray, textSize, textLineHeight);
                    if (!font.includes('sans-serif')) {
                        font += ',sans-serif';
                    }
                    letterSpacing = getValue(layer, 'layout', 'text-letter-spacing', zoom, f, functionCache, featureState);
                    maxTextWidth = getValue(layer, 'layout', 'text-max-width', zoom, f, functionCache, featureState);
                    const textField = getValue(layer, 'layout', 'text-field', zoom, f, functionCache, featureState);
                    if (typeof textField === 'object' && textField.sections) {
                        if (textField.sections.length === 1) {
                            label = textField.toString();
                        } else {
                            label = textField.sections.reduce((acc, chunk, i) => {
                                const fonts = chunk.fontStack ? chunk.fontStack.split(',') : fontArray;
                                const chunkFont = mb2css(getFonts ? getFonts(fonts) : fonts, textSize * (chunk.scale || 1), textLineHeight);
                                let text = chunk.text;
                                if (text === '\n') {
                                    acc.push('\n', '');
                                    return acc;
                                }
                                if (type == 2) {
                                    acc.push(applyLetterSpacing(text, letterSpacing), chunkFont);
                                    return acc;
                                }
                                text = wrapText(text, chunkFont, maxTextWidth, letterSpacing).split('\n');
                                for (let i = 0, ii = text.length; i < ii; ++i) {
                                    if (i > 0) {
                                        acc.push('\n', '');
                                    }
                                    acc.push(text[i], chunkFont);
                                }
                                return acc;
                            }, []);
                        }
                    } else {
                        label = fromTemplate(textField, properties).trim();
                    }
                    opacity = getValue(layer, 'paint', 'text-opacity', zoom, f, functionCache, featureState);
                }
                if (label && opacity && !skipLabel) {
                    if (!hasImage) {
                        ++stylesLength;
                        style = styles[stylesLength];
                        if (!style || !style.getText() || style.getFill() || style.getStroke()) {
                            style = new Style();
                            styles[stylesLength] = style;
                        }
                        style.setImage(undefined);
                        style.setGeometry(undefined);
                    }
                    const declutterMode = getDeclutterMode(layer, zoom, f, 'text', functionCache);
                    if (!style.getText()) {
                        style.setText(text);
                    }
                    text = style.getText();
                    if (!text || 'getDeclutterMode' in text && text.getDeclutterMode() !== declutterMode) {
                        text = new Text({
                            padding: [
                                2,
                                2,
                                2,
                                2
                            ],
                            // @ts-ignore
                            declutterMode: declutterMode
                        });
                        style.setText(text);
                    }
                    const textTransform = getValue(layer, 'layout', 'text-transform', zoom, f, functionCache, featureState);
                    if (textTransform == 'uppercase') {
                        label = Array.isArray(label) ? label.map((t, i) => i % 2 ? t : t.toUpperCase()) : label.toUpperCase();
                    } else if (textTransform == 'lowercase') {
                        label = Array.isArray(label) ? label.map((t, i) => i % 2 ? t : t.toLowerCase()) : label.toLowerCase();
                    }
                    const wrappedLabel = Array.isArray(label) ? label : type == 2 ? applyLetterSpacing(label, letterSpacing) : wrapText(label, font, maxTextWidth, letterSpacing);
                    text.setText(wrappedLabel);
                    text.setFont(font);
                    text.setRotation(deg2rad(getValue(layer, 'layout', 'text-rotate', zoom, f, functionCache, featureState)));
                    if (typeof text.setKeepUpright === 'function') {
                        const keepUpright = getValue(layer, 'layout', 'text-keep-upright', zoom, f, functionCache, featureState);
                        text.setKeepUpright(keepUpright);
                    }
                    const textAnchor = getValue(layer, 'layout', 'text-anchor', zoom, f, functionCache, featureState);
                    const placement = hasImage || type == 1 ? 'point' : getValue(layer, 'layout', 'symbol-placement', zoom, f, functionCache, featureState);
                    let textAlign;
                    if (placement === 'line-center') {
                        text.setPlacement('line');
                        textAlign = 'center';
                    } else {
                        text.setPlacement(placement);
                    }
                    if (placement === 'line' && typeof text.setRepeat === 'function') {
                        const symbolSpacing = getValue(layer, 'layout', 'symbol-spacing', zoom, f, functionCache, featureState);
                        text.setRepeat(symbolSpacing * 2);
                    }
                    text.setOverflow(placement === 'point');
                    let textHaloWidth = getValue(layer, 'paint', 'text-halo-width', zoom, f, functionCache, featureState);
                    const textOffset = getValue(layer, 'layout', 'text-offset', zoom, f, functionCache, featureState);
                    const textTranslate = getValue(layer, 'paint', 'text-translate', zoom, f, functionCache, featureState);
                    // Text offset has to take halo width and line height into account
                    let vOffset = 0;
                    let hOffset = 0;
                    if (placement == 'point') {
                        textAlign = 'center';
                        if (textAnchor.indexOf('left') !== -1) {
                            textAlign = 'left';
                            hOffset = textHaloWidth;
                        } else if (textAnchor.indexOf('right') !== -1) {
                            textAlign = 'right';
                            hOffset = -textHaloWidth;
                        }
                        const textRotationAlignment = getValue(layer, 'layout', 'text-rotation-alignment', zoom, f, functionCache, featureState);
                        text.setRotateWithView(textRotationAlignment == 'map');
                    } else {
                        text.setMaxAngle(deg2rad(getValue(layer, 'layout', 'text-max-angle', zoom, f, functionCache, featureState)) * label.length / wrappedLabel.length);
                        text.setRotateWithView(false);
                    }
                    text.setTextAlign(textAlign);
                    let textBaseline = 'middle';
                    if (textAnchor.indexOf('bottom') == 0) {
                        textBaseline = 'bottom';
                        vOffset = -textHaloWidth - 0.5 * (textLineHeight - 1) * textSize;
                    } else if (textAnchor.indexOf('top') == 0) {
                        textBaseline = 'top';
                        vOffset = textHaloWidth + 0.5 * (textLineHeight - 1) * textSize;
                    }
                    text.setTextBaseline(textBaseline);
                    const textJustify = getValue(layer, 'layout', 'text-justify', zoom, f, functionCache, featureState);
                    text.setJustify(textJustify === 'auto' ? undefined : textJustify);
                    text.setOffsetX(textOffset[0] * textSize + hOffset + textTranslate[0]);
                    text.setOffsetY(textOffset[1] * textSize + vOffset + textTranslate[1]);
                    textColor.setColor(colorWithOpacity(getValue(layer, 'paint', 'text-color', zoom, f, functionCache, featureState), opacity));
                    text.setFill(textColor);
                    const haloColor = colorWithOpacity(getValue(layer, 'paint', 'text-halo-color', zoom, f, functionCache, featureState), opacity);
                    if (haloColor && textHaloWidth > 0) {
                        textHalo.setColor(haloColor);
                        // spec here : https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-symbol-text-halo-width
                        // Halo width must be doubled because it is applied around the center of the text outline
                        textHaloWidth *= 2;
                        // 1/4 of text size (spec) x 2
                        const halfTextSize = 0.5 * textSize;
                        textHalo.setWidth(textHaloWidth <= halfTextSize ? textHaloWidth : halfTextSize);
                        text.setStroke(textHalo);
                    } else {
                        text.setStroke(undefined);
                    }
                    const textPadding = getValue(layer, 'layout', 'text-padding', zoom, f, functionCache, featureState);
                    const padding = text.getPadding();
                    if (textPadding !== padding[0]) {
                        padding[0] = textPadding;
                        padding[1] = textPadding;
                        padding[2] = textPadding;
                        padding[3] = textPadding;
                    }
                    style.setZIndex(index);
                }
            }
        }
        if (stylesLength > -1) {
            styles.length = stylesLength + 1;
            if (recordLayer) {
                if ('set' in feature) {
                    // ol/Feature
                    feature.set('mapbox-layer', featureBelongsToLayer);
                } else {
                    // ol/render/Feature
                    feature.getProperties()['mapbox-layer'] = featureBelongsToLayer;
                }
            }
            return styles;
        }
        return undefined;
    };
    olLayer.setStyle(styleFunction);
    olLayer.set('mapbox-source', mapboxSource);
    olLayer.set('mapbox-layers', mapboxLayers);
    olLayer.set('mapbox-featurestate', olLayer.get('mapbox-featurestate') || {});
    return styleFunction;
}
/**
 * Get the the style for a specific Mapbox layer only. This can be useful for creating a legend.
 * @param {import("ol/Feature").default|import("ol/render/Feature").default} feature OpenLayers feature.
 * @param {number} resolution View resolution.
 * @param {import("ol/layer").Vector|import("ol/layer").VectorTile} olLayer OpenLayers layer.
 * @param {string} layerId Id of the Mapbox layer to get the style for
 * @return {Array<import("ol/style").Style>} Styles for the provided Mapbox layer.
 */
function getStyleForLayer(feature, resolution, olLayer, layerId) {
    const evaluateStyle = olLayer.getStyleFunction();
    if (evaluateStyle.length === 3) {
        // @ts-ignore
        return evaluateStyle(feature, resolution, layerId);
    }
    return undefined;
}

/**
 * Generates a shaded relief image given elevation data.  Uses a 3x3
 * neighborhood for determining slope and aspect.
 * @param {Array<ImageData>} inputs Array of input images.
 * @param {Object} data Data added in the "beforeoperations" event.
 * @return {ImageData} Output image.
 */
function hillshade(inputs, data) {
    const elevationImage = inputs[0];
    const width = elevationImage.width;
    const height = elevationImage.height;
    const elevationData = elevationImage.data;
    const shadeData = new Uint8ClampedArray(elevationData.length);
    const dp = data.resolution * 2;
    const maxX = width - 1;
    const maxY = height - 1;
    const pixel = [
        0,
        0,
        0,
        0
    ];
    const twoPi = 2 * Math.PI;
    const halfPi = Math.PI / 2;
    const sunEl = Math.PI * data.sunEl / 180;
    const sunAz = Math.PI * data.sunAz / 180;
    const cosSunEl = Math.cos(sunEl);
    const sinSunEl = Math.sin(sunEl);
    const highlightColor = data.highlightColor;
    const shadowColor = data.shadowColor;
    const accentColor = data.accentColor;
    const encoding = data.encoding;
    let pixelX, pixelY, x0, x1, y0, y1, offset, z0, z1, dzdx, dzdy, slope, aspect, accent, scaled, shade, scaledAccentColor, compositeShadeColor, clamp, slopeScaleBase, scaledSlope, cosIncidence;
    function calculateElevation(pixel, encoding = 'mapbox') {
        // The method used to extract elevations from the DEM.
        //
        // The supported methods are the Mapbox format
        // (red * 256 * 256 + green * 256 + blue) * 0.1 - 10000
        // and the Terrarium format
        // (red * 256 + green + blue / 256) - 32768
        //
        if (encoding === 'mapbox') {
            return (pixel[0] * 256 * 256 + pixel[1] * 256 + pixel[2]) * 0.1 - 10000;
        }
        if (encoding === 'terrarium') {
            return pixel[0] * 256 + pixel[1] + pixel[2] / 256 - 32768;
        }
    }
    for (pixelY = 0; pixelY <= maxY; ++pixelY) {
        y0 = pixelY === 0 ? 0 : pixelY - 1;
        y1 = pixelY === maxY ? maxY : pixelY + 1;
        for (pixelX = 0; pixelX <= maxX; ++pixelX) {
            x0 = pixelX === 0 ? 0 : pixelX - 1;
            x1 = pixelX === maxX ? maxX : pixelX + 1;
            // determine elevation for (x0, pixelY)
            offset = (pixelY * width + x0) * 4;
            pixel[0] = elevationData[offset];
            pixel[1] = elevationData[offset + 1];
            pixel[2] = elevationData[offset + 2];
            pixel[3] = elevationData[offset + 3];
            z0 = data.vert * calculateElevation(pixel, encoding);
            // determine elevation for (x1, pixelY)
            offset = (pixelY * width + x1) * 4;
            pixel[0] = elevationData[offset];
            pixel[1] = elevationData[offset + 1];
            pixel[2] = elevationData[offset + 2];
            pixel[3] = elevationData[offset + 3];
            z1 = data.vert * calculateElevation(pixel, encoding);
            dzdx = (z1 - z0) / dp;
            // determine elevation for (pixelX, y0)
            offset = (y0 * width + pixelX) * 4;
            pixel[0] = elevationData[offset];
            pixel[1] = elevationData[offset + 1];
            pixel[2] = elevationData[offset + 2];
            pixel[3] = elevationData[offset + 3];
            z0 = data.vert * calculateElevation(pixel, encoding);
            // determine elevation for (pixelX, y1)
            offset = (y1 * width + pixelX) * 4;
            pixel[0] = elevationData[offset];
            pixel[1] = elevationData[offset + 1];
            pixel[2] = elevationData[offset + 2];
            pixel[3] = elevationData[offset + 3];
            z1 = data.vert * calculateElevation(pixel, encoding);
            dzdy = (z1 - z0) / dp;
            aspect = Math.atan2(dzdy, -dzdx);
            if (aspect < 0) {
                aspect = halfPi - aspect;
            } else if (aspect > halfPi) {
                aspect = twoPi - aspect + halfPi;
            } else {
                aspect = halfPi - aspect;
            }
            // Bootstrap slope and corresponding incident values
            slope = Math.atan(Math.sqrt(dzdx * dzdx + dzdy * dzdy));
            cosIncidence = sinSunEl * Math.cos(slope) + cosSunEl * Math.sin(slope) * Math.cos(sunAz - aspect);
            accent = Math.cos(slope);
            // 255 for Hex colors
            scaled = 255 * cosIncidence;
            /*
       * The following is heavily inspired
       * by [Maplibre's equivalent WebGL shader](https://github.com/maplibre/maplibre-gl-js/blob/main/src/shaders/hillshade.fragment.glsl)
       */
            // Forces given value to stay between two given extremes
            clamp = Math.min(Math.max(2 * data.sunEl, 0), 1);
            // Intensity basis for hillshade opacity
            slopeScaleBase = 1.875 - data.opacity * 1.75;
            // Intensity interpolation so that higher intensity values create more opaque hillshading
            scaledSlope = data.opacity !== 0.5 ? halfPi * ((Math.pow(slopeScaleBase, slope) - 1) / (Math.pow(slopeScaleBase, halfPi) - 1)) : slope;
            // Accent hillshade color with given accentColor to emphasize rougher terrain
            scaledAccentColor = {
                r: (1 - accent) * accentColor.r * clamp * 255,
                g: (1 - accent) * accentColor.g * clamp * 255,
                b: (1 - accent) * accentColor.b * clamp * 255,
                a: (1 - accent) * accentColor.a * clamp * 255
            };
            // Allows highlight vs shadow discrimination
            shade = Math.abs(((aspect + sunAz) / Math.PI + 0.5) % 2 - 1);
            // Creates a composite color mix between highlight & shadow colors to emphasize slopes
            compositeShadeColor = {
                r: (highlightColor.r * (1 - shade) + shadowColor.r * shade) * scaled,
                g: (highlightColor.g * (1 - shade) + shadowColor.g * shade) * scaled,
                b: (highlightColor.b * (1 - shade) + shadowColor.b * shade) * scaled,
                a: (highlightColor.a * (1 - shade) + shadowColor.a * shade) * scaled
            };
            // Fill in result color value
            offset = (pixelY * width + pixelX) * 4;
            shadeData[offset] = scaledAccentColor.r * (1 - shade) + compositeShadeColor.r;
            shadeData[offset + 1] = scaledAccentColor.g * (1 - shade) + compositeShadeColor.g;
            shadeData[offset + 2] = scaledAccentColor.b * (1 - shade) + compositeShadeColor.b;
            // Key opacity on the scaledSlope to improve legibility by increasing higher elevation rates' contrast
            shadeData[offset + 3] = elevationData[offset + 3] * data.opacity * clamp * Math.sin(scaledSlope);
        }
    }
    return new ImageData(shadeData, width, height);
}

/*
ol-mapbox-style - Use Mapbox/MapLibre Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
*/
/**
 * @typedef {Object} FeatureIdentifier
 * @property {string|number} id The feature id.
 * @property {string} source The source id.
 */
/**
 * @typedef {Object} Options
 * @property {string} [accessToken] Access token for 'mapbox://' urls.
 * @property {function(string, import("./util.js").ResourceType): (Request|string|Promise<Request|string>|void)} [transformRequest]
 * Function for controlling how `ol-mapbox-style` fetches resources. Can be used for modifying
 * the url, adding headers or setting credentials options. Called with the url and the resource
 * type as arguments, this function is supposed to return a `Request` or a url `string`, or a promise tehereof.
 * Without a return value the original request will not be modified.
 * @property {string} [projection='EPSG:3857'] Only useful when working with non-standard projections.
 * Code of a projection registered with OpenLayers. All sources of the style must be provided in this
 * projection. The projection must also have a valid extent defined, which will be used to determine the
 * origin and resolutions of the tile grid for all tiled sources of the style. When provided, the bbox
 * placeholder in tile and geojson urls changes: the default is `{bbox-epsg-3857}`, when projection is e.g.
 * set to `EPSG:4326`, the bbox placeholder will be `{bbox-epsg-4326}`.
 * @property {Array<number>} [resolutions] Only useful when working with non-standard projections.
 * Resolutions for mapping resolution to the `zoom` used in the Mapbox/MapLibre style.
 * @property {string} [styleUrl] URL of the Mapbox GL style. Required for styles that were provided
 * as object, when they contain a relative sprite url, or sources referencing data by relative url.
 * @property {string} [webfonts] Template for resolving webfonts. Can be used to specify where to fetch
 * web fonts when no `ol:webfonts` metadata is set in the style object. See `getFonts()` and the
 * "Font handling" section in `README.md` for details.
 * @property {function(VectorLayer|VectorTileLayer, string):HTMLImageElement|HTMLCanvasElement|string|undefined} [getImage=undefined]
 * Function that returns an image for an icon name. If the result is an HTMLImageElement, it must already be
 * loaded. The layer can be used to call layer.changed() when the loading and processing of the image has finished.
 * This function be used for icons not in the sprite or to override sprite icons.
 * @property {string} [accessTokenParam='access_token'] Access token param. For internal use.
 */
/**
 * @typedef {Object} ApplyStyleOptions
 * @property {string} [source=''] Source. Default is `''`, which causes the first source in the
 * style to be used.
 * @property {Array<string>} [layers] Layers. If no source is provided, the layers with the
 * provided ids will be used from the style's `layers` array. All layers need to use the same source.
 * @property {boolean} [updateSource=true] Update or create vector (tile) layer source with parameters
 * specified for the source in the mapbox style definition.
 */
/**
 * @param {import("ol/proj/Projection.js").default} projection Projection.
 * @param {number} [tileSize=512] Tile size.
 * @return {Array<number>} Resolutions.
 */
function getTileResolutions(projection, tileSize = 512) {
    return projection.getExtent() ? createXYZ({
        extent: projection.getExtent(),
        tileSize: tileSize,
        maxZoom: 22
    }).getResolutions() : defaultResolutions;
}
/**
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {Options} Completed options with accessToken and accessTokenParam.
 */
function completeOptions(styleUrl, options) {
    if (!options.accessToken) {
        options = Object.assign({}, options);
        const searchParams = new URL(styleUrl).searchParams;
        // The last search parameter is the access token
        searchParams.forEach((value, key) => {
            options.accessToken = value;
            options.accessTokenParam = key;
        });
    }
    return options;
}
/**
 * Applies a style function to an `ol/layer/VectorTile` or `ol/layer/Vector`
 * with an `ol/source/VectorTile` or an `ol/source/Vector`. If the layer does not have a source
 * yet, it will be created and populated from the information in the `glStyle` (unless `updateSource` is
 * set to `false`).
 *
 * **Example:**
 * ```js
 * import {applyStyle} from 'ol-mapbox-style';
 * import {VectorTile} from 'ol/layer.js';
 *
 * const layer = new VectorTile({declutter: true});
 * applyStyle(layer, 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_OPENMAPTILES_TOKEN');
 * ```
 *
 * The style function will render all layers from the `glStyle` object that use the source
 * of the first layer, the specified `source`, or a subset of layers from the same source. The
 * source needs to be a `"type": "vector"` or `"type": "geojson"` source.
 *
 * Two additional properties will be set on the provided layer:
 *
 *  * `mapbox-source`: The `id` of the Mapbox/MapLibre Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox/MapLibre Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox/MapLibre Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * @param {VectorTileLayer|VectorLayer} layer OpenLayers layer. When the layer has a source configured,
 * it will be modified to use the configuration from the glStyle's `source`. Options specified on the
 * layer's source will override those from the glStyle's `source`, except for `url` and
 * `tileUrlFunction`. When the source projection is the default (`EPSG:3857`), the `tileGrid` will
 * also be overridden. If you'd rather not have ol-mapbox-style modify the source, configure `applyStyle()`
 * with the `updateSource: false` option.
 * @param {string|Object} glStyle Mapbox/MapLibre Style object.
 * @param {string|Array<string>|Options&ApplyStyleOptions} [sourceOrLayersOrOptions] Options or
 * `source` key or an array of layer `id`s from the Mapbox/MapLibre Style object. When a `source` key is
 * provided, all layers for the specified source will be included in the style function. When layer
 * `id`s are provided, they must be from layers that use the same source. When not provided or a falsey
 * value, all layers using the first source specified in the glStyle will be rendered.
 * @param {Options&ApplyStyleOptions|string} [optionsOrPath] **Deprecated**. Options. Alternatively the path of the style file
 * (only required when a relative path is used for the `"sprite"` property of the style).
 * @param {Array<number>} [resolutions] **Deprecated**. Resolutions for mapping resolution to zoom level.
 * Only needed when working with non-standard tile grids or projections, can also be supplied with
 * options.
 * @return {Promise} Promise which will be resolved when the style can be used
 * for rendering.
 */
function applyStyle(layer, glStyle, sourceOrLayersOrOptions = '', optionsOrPath = {}, resolutions = undefined) {
    let styleUrl, sourceId;
    /** @type {Options&ApplyStyleOptions} */
    let options;
    let sourceOrLayers;
    let updateSource = true;
    if (typeof sourceOrLayersOrOptions !== 'string' && !Array.isArray(sourceOrLayersOrOptions)) {
        options = sourceOrLayersOrOptions;
        sourceOrLayers = options.source || options.layers;
        optionsOrPath = options;
    } else {
        sourceOrLayers = sourceOrLayersOrOptions;
    }
    if (typeof optionsOrPath === 'string') {
        styleUrl = optionsOrPath;
        options = {};
    } else {
        styleUrl = optionsOrPath.styleUrl;
        options = optionsOrPath;
    }
    if (options.updateSource === false) {
        updateSource = false;
    }
    if (!resolutions) {
        resolutions = options.resolutions;
    }
    if (!styleUrl && typeof glStyle === 'string' && !glStyle.trim().startsWith('{')) {
        styleUrl = glStyle;
    }
    if (styleUrl) {
        styleUrl = styleUrl.startsWith('data:') ? location.href : normalizeStyleUrl(styleUrl, options.accessToken);
        options = completeOptions(styleUrl, options);
    }
    return new Promise(function (resolve, reject) {
        // TODO: figure out where best place to check source type is
        // Note that the source arg is an array of gl layer ids and each must be
        // dereferenced to get source type to validate
        getGlStyle(glStyle, options).then(function (glStyle) {
            if (glStyle.version != 8) {
                return reject(new Error('glStyle version 8 required.'));
            }
            if (!(layer instanceof VectorLayer || layer instanceof VectorTileLayer)) {
                return reject(new Error('Can only apply to VectorLayer or VectorTileLayer'));
            }
            const type = layer instanceof VectorTileLayer ? 'vector' : 'geojson';
            if (!sourceOrLayers) {
                sourceId = Object.keys(glStyle.sources).find(function (key) {
                    return glStyle.sources[key].type === type;
                });
                sourceOrLayers = sourceId;
            } else if (Array.isArray(sourceOrLayers)) {
                sourceId = glStyle.layers.find(function (layer) {
                    return layer.id === sourceOrLayers[0];
                }).source;
            } else {
                sourceId = sourceOrLayers;
            }
            if (!sourceId) {
                return reject(new Error(`No ${ type } source found in the glStyle.`));
            }
            function assignSource() {
                if (!updateSource) {
                    return Promise.resolve();
                }
                if (layer instanceof VectorTileLayer) {
                    return setupVectorSource(glStyle.sources[sourceId], styleUrl, options).then(function (source) {
                        const targetSource = layer.getSource();
                        if (!targetSource) {
                            layer.setSource(source);
                        } else if (source !== targetSource) {
                            targetSource.setTileUrlFunction(source.getTileUrlFunction());
                            if (typeof targetSource.setUrls === 'function' && typeof source.getUrls === 'function') {
                                // to get correct keys for tile cache and queue
                                targetSource.setUrls(source.getUrls());
                            }
                            //@ts-ignore
                            if (!targetSource.format_) {
                                //@ts-ignore
                                targetSource.format_ = source.format_;
                            }
                            if (!targetSource.getAttributions()) {
                                targetSource.setAttributions(source.getAttributions());
                            }
                            if (targetSource.getTileLoadFunction() === defaultLoadFunction) {
                                targetSource.setTileLoadFunction(source.getTileLoadFunction());
                            }
                            if (equivalent(targetSource.getProjection(), source.getProjection())) {
                                targetSource.tileGrid = source.getTileGrid();
                            }
                        }
                        const tileGrid = layer.getSource().getTileGrid();
                        if (!isFinite(layer.getMaxResolution()) && !isFinite(layer.getMinZoom()) && tileGrid.getMinZoom() > 0) {
                            layer.setMaxResolution(getResolutionForZoom(Math.max(0, tileGrid.getMinZoom() - 1e-12), tileGrid.getResolutions()));
                        }
                    });
                }
                const glSource = glStyle.sources[sourceId];
                let source = layer.getSource();
                if (!source || source.get('mapbox-source') !== glSource) {
                    source = setupGeoJSONSource(glSource, styleUrl, options);
                }
                const targetSource = layer.getSource();
                if (!targetSource) {
                    layer.setSource(source);
                } else if (source !== targetSource) {
                    if (!targetSource.getAttributions()) {
                        targetSource.setAttributions(source.getAttributions());
                    }
                    //@ts-ignore
                    if (!targetSource.format_) {
                        //@ts-ignore
                        targetSource.format_ = source.getFormat();
                    }
                    //@ts-ignore
                    targetSource.url_ = source.getUrl();
                }
                return Promise.resolve();
            }
            let spriteScale, spriteData, spriteImageUrl, style;
            function onChange() {
                if (!style && (!glStyle.sprite || spriteData)) {
                    if (options.projection && !resolutions) {
                        const projection = get$1(options.projection);
                        const units = projection.getUnits();
                        if (units !== 'm') {
                            resolutions = defaultResolutions.map(resolution => resolution / METERS_PER_UNIT[units]);
                        }
                    }
                    style = stylefunction(layer, glStyle, sourceOrLayers, resolutions, spriteData, spriteImageUrl, (fonts, templateUrl = options.webfonts) => getFonts(fonts, templateUrl), options.getImage);
                    if (!layer.getStyle()) {
                        reject(new Error(`Nothing to show for source [${ sourceId }]`));
                    } else {
                        assignSource().then(resolve).catch(reject);
                    }
                } else if (style) {
                    layer.setStyle(style);
                    assignSource().then(resolve).catch(reject);
                } else {
                    reject(new Error('Something went wrong trying to apply style.'));
                }
            }
            if (glStyle.sprite) {
                const sprite = new URL(normalizeSpriteUrl(glStyle.sprite, options.accessToken, styleUrl || location.href));
                spriteScale = window.devicePixelRatio >= 1.5 ? 0.5 : 1;
                const sizeFactor = spriteScale == 0.5 ? '@2x' : '';
                let spriteUrl = sprite.origin + sprite.pathname + sizeFactor + '.json' + sprite.search;
                new Promise(function (resolve, reject) {
                    fetchResource('Sprite', spriteUrl, options).then(resolve).catch(function (error) {
                        spriteUrl = sprite.origin + sprite.pathname + '.json' + sprite.search;
                        fetchResource('Sprite', spriteUrl, options).then(resolve).catch(reject);
                    });
                }).then(function (spritesJson) {
                    if (spritesJson === undefined) {
                        reject(new Error('No sprites found.'));
                    }
                    spriteData = spritesJson;
                    spriteImageUrl = sprite.origin + sprite.pathname + sizeFactor + '.png' + sprite.search;
                    if (options.transformRequest) {
                        const transformed = options.transformRequest(spriteImageUrl, 'SpriteImage') || spriteImageUrl;
                        if (transformed instanceof Request || transformed instanceof Promise) {
                            spriteImageUrl = transformed;
                        }
                    }
                    onChange();
                }).catch(function (err) {
                    reject(new Error(`Sprites cannot be loaded: ${ spriteUrl }: ${ err.message }`));
                });
            } else {
                onChange();
            }
        }).catch(reject);
    });
}
const emptyObj = {};
function setFirstBackground(mapOrLayer, glStyle, options) {
    glStyle.layers.some(function (layer) {
        if (layer.type === 'background') {
            if (mapOrLayer instanceof Layer) {
                mapOrLayer.setBackground(function (resolution) {
                    return getBackgroundColor(layer, resolution, options, {});
                });
                return true;
            }
            if (mapOrLayer instanceof Map || mapOrLayer instanceof LayerGroup) {
                mapOrLayer.getLayers().insertAt(0, setupBackgroundLayer(layer, options, {}));
                return true;
            }
        }
    });
}
/**
 * Applies properties of the Mapbox/MapLibre Style's first `background` layer to the
 * provided map or layer (group).
 *
 * **Example:**
 * ```js
 * import {applyBackground} from 'ol-mapbox-style';
 * import {Map} from 'ol';
 *
 * const map = new Map({target: 'map'});
 * applyBackground(map, 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_OPENMAPTILES_TOKEN');
 * ```
 * @param {Map|import("ol/layer/Base.js").default} mapOrLayer OpenLayers Map or layer (group).
 * @param {Object|string} glStyle Mapbox/MapLibre Style object or url.
 * @param {Options} options Options.
 * @return {Promise} Promise that resolves when the background is applied.
 */
function applyBackground(mapOrLayer, glStyle, options = {}) {
    return getGlStyle(glStyle, options).then(function (glStyle) {
        setFirstBackground(mapOrLayer, glStyle, options);
    });
}
function getSourceIdByRef(layers, ref) {
    let sourceId;
    layers.some(function (layer) {
        if (layer.id == ref) {
            sourceId = layer.source;
            return true;
        }
    });
    return sourceId;
}
function extentFromTileJSON(tileJSON, projection) {
    const bounds = tileJSON.bounds;
    if (bounds) {
        const ll = fromLonLat([
            bounds[0],
            bounds[1]
        ], projection);
        const tr = fromLonLat([
            bounds[2],
            bounds[3]
        ], projection);
        return [
            ll[0],
            ll[1],
            tr[0],
            tr[1]
        ];
    }
    return get$1(projection).getExtent();
}
function sourceOptionsFromTileJSON(glSource, tileJSON, options) {
    const tileJSONSource = new TileJSON({
        tileJSON: tileJSON,
        tileSize: glSource.tileSize || tileJSON.tileSize || 512
    });
    const tileJSONDoc = tileJSONSource.getTileJSON();
    const tileGrid = tileJSONSource.getTileGrid();
    const projection = get$1(options.projection || 'EPSG:3857');
    const extent = extentFromTileJSON(tileJSONDoc, projection);
    const projectionExtent = projection.getExtent();
    const minZoom = tileJSONDoc.minzoom || 0;
    const maxZoom = tileJSONDoc.maxzoom || 22;
    /** @type {import("ol/source/VectorTile.js").Options<import("ol/render/Feature.js").default>} */
    const sourceOptions = {
        attributions: tileJSONSource.getAttributions(),
        projection: projection,
        tileGrid: new TileGrid({
            origin: projectionExtent ? getTopLeft(projectionExtent) : tileGrid.getOrigin(0),
            extent: extent || tileGrid.getExtent(),
            minZoom: minZoom,
            resolutions: getTileResolutions(projection, tileJSON.tileSize).slice(0, maxZoom + 1),
            tileSize: tileGrid.getTileSize(0)
        })
    };
    if (Array.isArray(tileJSONDoc.tiles)) {
        sourceOptions.urls = tileJSONDoc.tiles;
    } else {
        sourceOptions.url = tileJSONDoc.tiles;
    }
    return sourceOptions;
}
function getBackgroundColor(glLayer, resolution, options, functionCache) {
    const background = {
        id: glLayer.id,
        type: glLayer.type
    };
    const layout = glLayer.layout || {};
    const paint = glLayer.paint || {};
    background['paint'] = paint;
    const zoom = getZoomForResolution(resolution, options.resolutions || defaultResolutions);
    let opacity;
    const bg = getValue(background, 'paint', 'background-color', zoom, emptyObj, functionCache);
    if (paint['background-opacity'] !== undefined) {
        opacity = getValue(background, 'paint', 'background-opacity', zoom, emptyObj, functionCache);
    }
    return layout.visibility == 'none' ? undefined : colorWithOpacity(bg, opacity);
}
/**
 * @param {Object} glLayer Mapbox/MapLibre Style layer object.
 * @param {Options} options Options.
 * @param {Object} functionCache Cache for functions.
 * @return {Layer} OpenLayers layer.
 */
function setupBackgroundLayer(glLayer, options, functionCache) {
    const div = document.createElement('div');
    div.className = 'ol-mapbox-style-background';
    div.style.position = 'absolute';
    div.style.width = '100%';
    div.style.height = '100%';
    return new Layer({
        source: new Source({}),
        render(frameState) {
            const color = getBackgroundColor(glLayer, frameState.viewState.resolution, options, functionCache);
            div.style.backgroundColor = color;
            return div;
        }
    });
}
/**
 * Creates an OpenLayers VectorTile source for a gl source entry.
 * @param {Object} glSource "source" entry from a Mapbox/MapLibre Style object.
 * @param {string|undefined} styleUrl URL to use for the source. This is expected to be the complete http(s) url,
 * with access key applied.
 * @param {Options} options Options.
 * @return {Promise<import("ol/source/VectorTile").default>} Promise resolving to a VectorTile source.
 * @private
 */
function setupVectorSource(glSource, styleUrl, options) {
    return new Promise(function (resolve, reject) {
        getTileJson(glSource, styleUrl, options).then(function ({tileJson, tileLoadFunction}) {
            const sourceOptions = sourceOptionsFromTileJSON(glSource, tileJson, options);
            sourceOptions.tileLoadFunction = tileLoadFunction;
            sourceOptions.format = new MVT();
            resolve(new VectorTileSource(sourceOptions));
        }).catch(reject);
    });
}
function setupVectorLayer(glSource, styleUrl, options) {
    const layer = new VectorTileLayer({
        declutter: true,
        visible: false
    });
    setupVectorSource(glSource, styleUrl, options).then(function (source) {
        source.set('mapbox-source', glSource);
        layer.setSource(source);
    }).catch(function (error) {
        layer.setSource(undefined);
    });
    return layer;
}
function getBboxTemplate(projection) {
    const projCode = projection ? projection.getCode() : 'EPSG:3857';
    return `{bbox-${ projCode.toLowerCase().replace(/[^a-z0-9]/g, '-') }}`;
}
function setupRasterSource(glSource, styleUrl, options) {
    return new Promise(function (resolve, reject) {
        getTileJson(glSource, styleUrl, options).then(function ({tileJson, tileLoadFunction}) {
            const source = new TileJSON({
                interpolate: options.interpolate === undefined ? true : options.interpolate,
                transition: 0,
                crossOrigin: 'anonymous',
                tileJSON: tileJson
            });
            source.tileGrid = sourceOptionsFromTileJSON(glSource, tileJson, options).tileGrid;
            if (options.projection) {
                //@ts-ignore
                source.projection = get$1(options.projection);
            }
            const getTileUrl = source.getTileUrlFunction();
            if (tileLoadFunction) {
                source.setTileLoadFunction(tileLoadFunction);
            }
            source.setTileUrlFunction(function (tileCoord, pixelRatio, projection) {
                const bboxTemplate = getBboxTemplate(projection);
                let src = getTileUrl(tileCoord, pixelRatio, projection);
                if (src.indexOf(bboxTemplate) != -1) {
                    const bbox = source.getTileGrid().getTileCoordExtent(tileCoord);
                    src = src.replace(bboxTemplate, bbox.toString());
                }
                return src;
            });
            source.set('mapbox-source', glSource);
            resolve(source);
        }).catch(function (error) {
            reject(error);
        });
    });
}
function setupRasterLayer(glSource, styleUrl, options) {
    const layer = new TileLayer();
    setupRasterSource(glSource, styleUrl, options).then(function (source) {
        layer.setSource(source);
    }).catch(function () {
        layer.setSource(undefined);
    });
    return layer;
}
/**
 *
 * @param {Object} glSource "source" entry from a Mapbox/MapLibre Style object.
 * @param {string} styleUrl Style url
 * @param {Options} options ol-mapbox-style options.
 * @return {ImageLayer<Raster>} The raster layer
 */
function setupHillshadeLayer(glSource, styleUrl, options) {
    const tileLayer = setupRasterLayer(glSource, styleUrl, options);
    /** @type {ImageLayer<Raster>} */
    const layer = new ImageLayer({
        source: new Raster({
            operationType: 'image',
            operation: hillshade,
            sources: [tileLayer]
        })
    });
    return layer;
}
/**
 * @param {Object} glSource glStyle source.
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {VectorSource} Configured vector source.
 */
function setupGeoJSONSource(glSource, styleUrl, options) {
    const geoJsonFormat = options.projection ? new GeoJSON({ dataProjection: options.projection }) : new GeoJSON();
    const data = glSource.data;
    const sourceOptions = {};
    if (typeof data == 'string') {
        const [geoJsonUrl] = normalizeSourceUrl(data, options.accessToken, options.accessTokenParam || 'access_token', styleUrl || location.href);
        if (/\{bbox-[0-9a-z-]+\}/.test(geoJsonUrl)) {
            const extentUrl = (extent, resolution, projection) => {
                const bboxTemplate = getBboxTemplate(projection);
                return geoJsonUrl.replace(bboxTemplate, `${ extent.join(',') }`);
            };
            const source = new VectorSource({
                attributions: glSource.attribution,
                format: geoJsonFormat,
                loader: (extent, resolution, projection, success, failure) => {
                    const url = typeof extentUrl === 'function' ? extentUrl(extent, resolution, projection) : extentUrl;
                    fetchResource('GeoJSON', url, options).then(json => {
                        const features = source.getFormat().readFeatures(json, { featureProjection: projection });
                        source.addFeatures(features);
                        success(features);
                    }).catch(response => {
                        source.removeLoadedExtent(extent);
                        failure();
                    });
                },
                strategy: bbox
            });
            source.set('mapbox-source', glSource);
            return source;
        }
        const source = new VectorSource({
            attributions: glSource.attribution,
            format: geoJsonFormat,
            url: geoJsonUrl,
            loader: (extent, resolution, projection, success, failure) => {
                fetchResource('GeoJSON', geoJsonUrl, options).then(json => {
                    const features = source.getFormat().readFeatures(json, { featureProjection: projection });
                    source.addFeatures(features);
                    success(features);
                }).catch(response => {
                    source.removeLoadedExtent(extent);
                    failure();
                });
            }
        });
        return source;
    }
    sourceOptions.features = geoJsonFormat.readFeatures(data, { featureProjection: getUserProjection() || 'EPSG:3857' });
    const source = new VectorSource(Object.assign({
        attributions: glSource.attribution,
        format: geoJsonFormat
    }, sourceOptions));
    source.set('mapbox-source', glSource);
    return source;
}
function setupGeoJSONLayer(glSource, styleUrl, options) {
    return new VectorLayer({
        declutter: true,
        source: setupGeoJSONSource(glSource, styleUrl, options),
        visible: false
    });
}
function prerenderRasterLayer(glLayer, layer, functionCache) {
    let zoom = null;
    return function (event) {
        if (glLayer.paint && 'raster-opacity' in glLayer.paint && event.frameState.viewState.zoom !== zoom) {
            zoom = event.frameState.viewState.zoom;
            delete functionCache[glLayer.id];
            updateRasterLayerProperties(glLayer, layer, zoom, functionCache);
        }
    };
}
function updateRasterLayerProperties(glLayer, layer, zoom, functionCache) {
    const opacity = getValue(glLayer, 'paint', 'raster-opacity', zoom, emptyObj, functionCache);
    layer.setOpacity(opacity);
}
function manageVisibility(layer, mapOrGroup) {
    function onChange() {
        const glStyle = mapOrGroup.get('mapbox-style');
        if (!glStyle) {
            return;
        }
        const mapboxLayers = derefLayers(glStyle.layers);
        const layerMapboxLayerids = layer.get('mapbox-layers');
        const visible = mapboxLayers.filter(function (mapboxLayer) {
            return layerMapboxLayerids.includes(mapboxLayer.id);
        }).some(function (mapboxLayer) {
            return !mapboxLayer.layout || !mapboxLayer.layout.visibility || mapboxLayer.layout.visibility === 'visible';
        });
        if (layer.get('visible') !== visible) {
            layer.setVisible(visible);
        }
    }
    layer.on('change', onChange);
    onChange();
}
function setupLayer(glStyle, styleUrl, glLayer, options) {
    const functionCache = getFunctionCache(glStyle);
    const glLayers = glStyle.layers;
    const type = glLayer.type;
    const id = glLayer.source || getSourceIdByRef(glLayers, glLayer.ref);
    const glSource = glStyle.sources[id];
    let layer;
    if (type == 'background') {
        layer = setupBackgroundLayer(glLayer, options, functionCache);
    } else if (glSource.type == 'vector') {
        layer = setupVectorLayer(glSource, styleUrl, options);
    } else if (glSource.type == 'raster') {
        layer = setupRasterLayer(glSource, styleUrl, options);
        layer.setVisible(glLayer.layout ? glLayer.layout.visibility !== 'none' : true);
        layer.on('prerender', prerenderRasterLayer(glLayer, layer, functionCache));
    } else if (glSource.type == 'geojson') {
        layer = setupGeoJSONLayer(glSource, styleUrl, options);
    } else if (glSource.type == 'raster-dem' && glLayer.type == 'hillshade') {
        const hillshadeLayer = setupHillshadeLayer(glSource, styleUrl, options);
        layer = hillshadeLayer;
        hillshadeLayer.getSource().on('beforeoperations', function (event) {
            const data = event.data;
            data.resolution = getPointResolution(options.projection || 'EPSG:3857', event.resolution, getCenter(event.extent), 'm');
            const zoom = getZoomForResolution(event.resolution, options.resolutions || defaultResolutions);
            data.encoding = glSource.encoding;
            data.vert = 5 * getValue(glLayer, 'paint', 'hillshade-exaggeration', zoom, emptyObj, functionCache);
            data.sunAz = getValue(glLayer, 'paint', 'hillshade-illumination-direction', zoom, emptyObj, functionCache);
            data.sunEl = 35;
            data.opacity = 0.3;
            data.highlightColor = getValue(glLayer, 'paint', 'hillshade-highlight-color', zoom, emptyObj, functionCache);
            data.shadowColor = getValue(glLayer, 'paint', 'hillshade-shadow-color', zoom, emptyObj, functionCache);
            data.accentColor = getValue(glLayer, 'paint', 'hillshade-accent-color', zoom, emptyObj, functionCache);
        });
        layer.setVisible(glLayer.layout ? glLayer.layout.visibility !== 'none' : true);
    }
    const glSourceId = id;
    if (layer) {
        layer.set('mapbox-source', glSourceId);
    }
    return layer;
}
/**
 * @param {*} glStyle Mapbox/MapLibre Style.
 * @param {Map|LayerGroup} mapOrGroup Map or layer group.
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {Promise} Promise that resolves when the style is loaded.
 */
function processStyle(glStyle, mapOrGroup, styleUrl, options) {
    const promises = [];
    let view = null;
    if (mapOrGroup instanceof Map) {
        view = mapOrGroup.getView();
        if (!view.isDef() && !view.getRotation() && !view.getResolutions()) {
            const projection = options.projection ? get$1(options.projection) : view.getProjection();
            view = new View(Object.assign(view.getProperties(), {
                maxResolution: defaultResolutions[0] / METERS_PER_UNIT[projection.getUnits()],
                projection: options.projection || view.getProjection()
            }));
            mapOrGroup.setView(view);
        }
        if ('center' in glStyle && !view.getCenter()) {
            view.setCenter(fromLonLat(glStyle.center, view.getProjection()));
        }
        if ('zoom' in glStyle && view.getZoom() === undefined) {
            view.setResolution(defaultResolutions[0] / METERS_PER_UNIT[view.getProjection().getUnits()] / Math.pow(2, glStyle.zoom));
        }
        if (!view.getCenter() || view.getZoom() === undefined) {
            view.fit(view.getProjection().getExtent(), {
                nearest: true,
                size: mapOrGroup.getSize()
            });
        }
    }
    mapOrGroup.set('mapbox-style', glStyle);
    mapOrGroup.set('mapbox-metadata', {
        styleUrl,
        options
    });
    const glLayers = glStyle.layers;
    let layerIds = [];
    let layer, glSourceId, id;
    for (let i = 0, ii = glLayers.length; i < ii; ++i) {
        const glLayer = glLayers[i];
        const type = glLayer.type;
        if (type == 'heatmap') {
            //FIXME Unsupported layer type
            // eslint-disable-next-line no-console
            console.debug(`layers[${ i }].type "${ type }" not supported`);
            continue;
        } else {
            id = glLayer.source || getSourceIdByRef(glLayers, glLayer.ref);
            // this technique assumes gl layers will be in a particular order
            if (!id || id != glSourceId) {
                if (layerIds.length) {
                    promises.push(finalizeLayer(layer, layerIds, glStyle, styleUrl, mapOrGroup, options));
                    layerIds = [];
                }
                layer = setupLayer(glStyle, styleUrl, glLayer, options);
                if (!(layer instanceof VectorLayer || layer instanceof VectorTileLayer)) {
                    layerIds = [];
                }
                glSourceId = layer.get('mapbox-source');
            }
            layerIds.push(glLayer.id);
        }
    }
    promises.push(finalizeLayer(layer, layerIds, glStyle, styleUrl, mapOrGroup, options));
    return Promise.all(promises);
}
/**
 * Loads and applies a Mapbox/MapLibre Style object into an OpenLayers Map or LayerGroup.
 * This includes the map background, the layers, and for Map instances that did not
 * have a View defined yet also the center and the zoom.
 *
 * **Example:**
 * ```js
 * import apply from 'ol-mapbox-style';
 *
 * apply('map', 'mapbox://styles/mapbox/bright-v9', {accessToken: 'YOUR_MAPBOX_TOKEN'});
 * ```
 *
 * The center and zoom will only be set if present in the Mapbox/MapLibre Style document,
 * and if not already set on the OpenLayers map.
 *
 * Layers will be added to the OpenLayers map, without affecting any layers that
 * might already be set on the map.
 *
 * Layers added by `apply()` will have two additional properties:
 *
 *  * `mapbox-source`: The `id` of the Mapbox/MapLibre Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox/MapLibre Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox/MapLibre Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * This function sets an additional `mapbox-style` property on the OpenLayers
 * Map or LayerGroup instance, which holds the Mapbox/MapLibre Style object.
 *
 * @param {Map|HTMLElement|string|LayerGroup} mapOrGroupOrElement Either an existing
 * OpenLayers Map instance, or a HTML element, or the id of a HTML element that will be
 * the target of a new OpenLayers Map, or a layer group. If layer group, styles
 * releated to the map and view will be ignored.
 * @param {string|Object} style JSON style object or style url pointing to a
 * Mapbox/MapLibre Style object. When using Mapbox APIs, the url is the `styleUrl`
 * shown in Mapbox Studio's "share" panel. In addition, the `accessToken` option
 * (see below) must be set.
 * When passed as JSON style object, all OpenLayers layers created by `apply()`
 * will be immediately available, but they may not have a source yet (i.e. when
 * they are defined by a TileJSON url in the Mapbox/MapLibre Style document). When passed
 * as style url, layers will be added to the map when the Mapbox/MapLibre Style document
 * is loaded and parsed.
 * @param {Options} options Options.
 * @return {Promise<Map|LayerGroup>} A promise that resolves after all layers have been added to
 * the OpenLayers Map instance or LayerGroup, their sources set, and their styles applied. The
 * `resolve` callback will be called with the OpenLayers Map instance or LayerGroup as
 * argument.
 */
function apply(mapOrGroupOrElement, style, options = {}) {
    let promise;
    /** @type {Map|LayerGroup} */
    let mapOrGroup;
    if (typeof mapOrGroupOrElement === 'string' || mapOrGroupOrElement instanceof HTMLElement) {
        mapOrGroup = new Map({ target: mapOrGroupOrElement });
    } else {
        mapOrGroup = mapOrGroupOrElement;
    }
    if (typeof style === 'string') {
        const styleUrl = style.startsWith('data:') ? location.href : normalizeStyleUrl(style, options.accessToken);
        options = completeOptions(styleUrl, options);
        promise = new Promise(function (resolve, reject) {
            getGlStyle(style, options).then(function (glStyle) {
                processStyle(glStyle, mapOrGroup, styleUrl, options).then(function () {
                    resolve(mapOrGroup);
                }).catch(reject);
            }).catch(function (err) {
                reject(new Error(`Could not load ${ style }: ${ err.message }`));
            });
        });
    } else {
        promise = new Promise(function (resolve, reject) {
            processStyle(style, mapOrGroup, !options.styleUrl || options.styleUrl.startsWith('data:') ? location.href : normalizeStyleUrl(options.styleUrl, options.accessToken), options).then(function () {
                resolve(mapOrGroup);
            }).catch(reject);
        });
    }
    return promise;
}
/**
 * If layerIds is not empty, applies the style specified in glStyle to the layer,
 * and adds the layer to the map.
 *
 * The layer may not yet have a source when the function is called.  If so, the style
 * is applied to the layer via a once listener on the 'change:source' event.
 *
 * @param {Layer} layer An OpenLayers layer instance.
 * @param {Array<string>} layerIds Array containing layer ids of already-processed layers.
 * @param {Object} glStyle Style as a JSON object.
 * @param {string|undefined} styleUrl The original style URL. Only required
 * when a relative path is used with the `"sprite"` property of the style.
 * @param {Map|LayerGroup} mapOrGroup OpenLayers Map.
 * @param {Options} options Options.
 * @return {Promise} Returns a promise that resolves after the source has
 * been set on the specified layer, and the style has been applied.
 */
function finalizeLayer(layer, layerIds, glStyle, styleUrl, mapOrGroup, options = {}) {
    let minZoom = 24;
    let maxZoom = 0;
    const glLayers = glStyle.layers;
    for (let i = 0, ii = glLayers.length; i < ii; ++i) {
        const glLayer = glLayers[i];
        if (layerIds.indexOf(glLayer.id) !== -1) {
            minZoom = Math.min('minzoom' in glLayer ? glLayer.minzoom : 0, minZoom);
            maxZoom = Math.max('maxzoom' in glLayer ? glLayer.maxzoom : 24, maxZoom);
        }
    }
    return new Promise(function (resolve, reject) {
        const setStyle = function () {
            const source = layer.getSource();
            if (!source || source.getState() === 'error') {
                reject(new Error('Error accessing data for source ' + layer.get('mapbox-source')));
                return;
            }
            if ('getTileGrid' in source) {
                const tileGrid = /** @type {import("ol/source/Tile.js").default|import("ol/source/VectorTile.js").default} */
                source.getTileGrid();
                if (tileGrid) {
                    const sourceMinZoom = tileGrid.getMinZoom();
                    if (minZoom > 0 || sourceMinZoom > 0) {
                        layer.setMaxResolution(Math.min(getResolutionForZoom(Math.max(0, minZoom - 1e-12), defaultResolutions), getResolutionForZoom(Math.max(0, sourceMinZoom - 1e-12), tileGrid.getResolutions())));
                    }
                    if (maxZoom < 24) {
                        layer.setMinResolution(getResolutionForZoom(maxZoom, defaultResolutions));
                    }
                }
            } else {
                if (minZoom > 0) {
                    layer.setMaxResolution(getResolutionForZoom(Math.max(0, minZoom - 1e-12), defaultResolutions));
                }
            }
            if (source instanceof VectorSource || source instanceof VectorTileSource) {
                applyStyle(layer, glStyle, layerIds, Object.assign({ styleUrl: styleUrl }, options)).then(function () {
                    manageVisibility(layer, mapOrGroup);
                    resolve();
                }).catch(reject);
            } else {
                resolve();
            }
        };
        layer.set('mapbox-layers', layerIds);
        const layers = mapOrGroup.getLayers();
        if (layers.getArray().indexOf(layer) === -1) {
            layers.push(layer);
        }
        if (layer.getSource()) {
            setStyle();
        } else {
            layer.once('change:source', setStyle);
        }
    });
}
/**
 * Get the Mapbox Layer object for the provided `layerId`.
 * @param {Map|LayerGroup} mapOrGroup Map or LayerGroup.
 * @param {string} layerId Mapbox Layer id.
 * @return {Object} Mapbox Layer object.
 */
function getMapboxLayer(mapOrGroup, layerId) {
    const style = mapOrGroup.get('mapbox-style');
    const layerStyle = style.layers.find(function (layer) {
        return layer.id === layerId;
    });
    return layerStyle;
}
/**
 * Add a new Mapbox Layer object to the style. The map will be re-rendered.
 * @param {Map|LayerGroup} mapOrGroup The Map or LayerGroup `apply` was called on.
 * @param {Object} mapboxLayer Mapbox Layer object.
 * @param {string} [beforeLayerId] Optional id of the Mapbox Layer before the new layer that will be added.
 * @return {Promise<void>} Resolves when the added layer is available.
 */
function addMapboxLayer(mapOrGroup, mapboxLayer, beforeLayerId) {
    const glStyle = mapOrGroup.get('mapbox-style');
    const mapboxLayers = glStyle.layers;
    let spliceIndex;
    let sourceIndex = -1;
    if (beforeLayerId !== undefined) {
        const beforeMapboxLayer = getMapboxLayer(mapOrGroup, beforeLayerId);
        if (beforeMapboxLayer === undefined) {
            throw new Error(`Layer with id "${ beforeLayerId }" not found.`);
        }
        spliceIndex = mapboxLayers.indexOf(beforeMapboxLayer);
    } else {
        spliceIndex = mapboxLayers.length;
    }
    let sourceOffset;
    if (spliceIndex > 0 && mapboxLayers[spliceIndex - 1].source === mapboxLayer.source) {
        sourceIndex = spliceIndex - 1;
        sourceOffset = -1;
    } else if (spliceIndex < mapboxLayers.length && mapboxLayers[spliceIndex].source === mapboxLayer.source) {
        sourceIndex = spliceIndex;
        sourceOffset = 0;
    }
    if (sourceIndex === -1) {
        const {options, styleUrl} = mapOrGroup.get('mapbox-metadata');
        const layer = setupLayer(glStyle, styleUrl, mapboxLayer, options);
        if (beforeLayerId) {
            const beforeLayer = getLayer(mapOrGroup, beforeLayerId);
            const beforeLayerIndex = mapOrGroup.getLayers().getArray().indexOf(beforeLayer);
            mapOrGroup.getLayers().insertAt(beforeLayerIndex, layer);
        }
        mapboxLayers.splice(spliceIndex, 0, mapboxLayer);
        return finalizeLayer(layer, [mapboxLayer.id], glStyle, styleUrl, mapOrGroup, options);
    }
    if (mapboxLayers.some(layer => layer.id === mapboxLayer.id)) {
        throw new Error(`Layer with id "${ mapboxLayer.id }" already exists.`);
    }
    const sourceLayerId = mapboxLayers[sourceIndex].id;
    const args = styleFunctionArgs[getStyleFunctionKey(mapOrGroup.get('mapbox-style'), getLayer(mapOrGroup, sourceLayerId))];
    mapboxLayers.splice(spliceIndex, 0, mapboxLayer);
    if (args) {
        const [olLayer, glStyle, sourceOrLayers, resolutions, spriteData, spriteImageUrl, getFonts, getImage] = args;
        if (Array.isArray(sourceOrLayers)) {
            const layerIndex = sourceOrLayers.indexOf(sourceLayerId) + sourceOffset;
            sourceOrLayers.splice(layerIndex, 0, mapboxLayer.id);
        }
        stylefunction(olLayer, glStyle, sourceOrLayers, resolutions, spriteData, spriteImageUrl, getFonts, getImage);
    } else {
        getLayer(mapOrGroup, mapboxLayers[sourceIndex].id).changed();
    }
    return Promise.resolve();
}
/**
 * Update a Mapbox Layer object in the style. The map will be re-rendered with the new style.
 * @param {Map|LayerGroup} mapOrGroup The Map or LayerGroup `apply` was called on.
 * @param {Object} mapboxLayer Updated Mapbox Layer object.
 */
function updateMapboxLayer(mapOrGroup, mapboxLayer) {
    const glStyle = mapOrGroup.get('mapbox-style');
    const mapboxLayers = glStyle.layers;
    const index = mapboxLayers.findIndex(function (layer) {
        return layer.id === mapboxLayer.id;
    });
    if (index === -1) {
        throw new Error(`Layer with id "${ mapboxLayer.id }" not found.`);
    }
    const oldLayer = mapboxLayers[index];
    if (oldLayer.source !== mapboxLayer.source) {
        throw new Error('Updated layer and previous version must use the same source.');
    }
    delete getFunctionCache(glStyle)[mapboxLayer.id];
    delete getFilterCache(glStyle)[mapboxLayer.id];
    mapboxLayers[index] = mapboxLayer;
    const args = styleFunctionArgs[getStyleFunctionKey(mapOrGroup.get('mapbox-style'), getLayer(mapOrGroup, mapboxLayer.id))];
    if (args) {
        stylefunction.apply(undefined, args);
    } else {
        getLayer(mapOrGroup, mapboxLayer.id).changed();
    }
}
/**
 * Updates a Mapbox source object in the style. The according OpenLayers source will be replaced
 * and the map will be re-rendered.
 * @param {Map|LayerGroup} mapOrGroup The Map or LayerGroup `apply` was called on.
 * @param {string} id Key of the source in the `sources` object literal.
 * @param {Object} mapboxSource Mapbox source object.
 * @return {Promise<Source>} Promise that resolves when the source has been updated.
 */
function updateMapboxSource(mapOrGroup, id, mapboxSource) {
    const currentSource = getSource(mapOrGroup, id);
    const layers = mapOrGroup.getLayers().getArray().filter(function (layer) {
        return (layer instanceof VectorLayer || layer instanceof TileLayer || layer instanceof VectorTileLayer) && layer.getSource() === currentSource;
    });
    const metadata = mapOrGroup.get('mapbox-metadata');
    let newSourcePromise;
    switch (mapboxSource.type) {
    case 'vector':
        newSourcePromise = setupVectorSource(mapboxSource, metadata.styleUrl, metadata.options);
        break;
    case 'geojson':
        newSourcePromise = Promise.resolve(setupGeoJSONSource(mapboxSource, metadata.styleUrl, metadata.options));
        break;
    case 'raster':
    case 'raster-dem':
        newSourcePromise = setupRasterSource(mapboxSource, metadata.styleUrl, metadata.options);
        break;
    default:
        return Promise.reject(new Error('Unsupported source type ' + mapboxSource.type));
    }
    newSourcePromise.then(function (newSource) {
        layers.forEach(function (layer) {
            layer.setSource(newSource);
        });
    });
    return newSourcePromise;
}
/**
 * Remove a Mapbox Layer object from the style. The map will be re-rendered.
 * @param {Map|LayerGroup} mapOrGroup The Map or LayerGroup `apply` was called on.
 * @param {string|Object} mapboxLayerIdOrLayer Mapbox Layer id or Mapbox Layer object.
 */
function removeMapboxLayer(mapOrGroup, mapboxLayerIdOrLayer) {
    const mapboxLayerId = typeof mapboxLayerIdOrLayer === 'string' ? mapboxLayerIdOrLayer : mapboxLayerIdOrLayer.id;
    const layer = getLayer(mapOrGroup, mapboxLayerId);
    /** @type {Array<Object>} */
    const layerMapboxLayers = layer.get('mapbox-layers');
    if (layerMapboxLayers.length === 1) {
        throw new Error('Cannot remove last Mapbox layer from an OpenLayers layer.');
    }
    layerMapboxLayers.splice(layerMapboxLayers.indexOf(mapboxLayerId), 1);
    const glStyle = mapOrGroup.get('mapbox-style');
    const layers = glStyle.layers;
    layers.splice(layers.findIndex(layer => layer.id === mapboxLayerId), 1);
    const args = styleFunctionArgs[getStyleFunctionKey(glStyle, layer)];
    if (args) {
        const [olLayer, glStyle, sourceOrLayers, resolutions, spriteData, spriteImageUrl, getFonts, getImage] = args;
        if (Array.isArray(sourceOrLayers)) {
            sourceOrLayers.splice(sourceOrLayers.findIndex(layer => layer === mapboxLayerId), 1);
        }
        stylefunction(olLayer, glStyle, sourceOrLayers, resolutions, spriteData, spriteImageUrl, getFonts, getImage);
    } else {
        getLayer(mapOrGroup, mapboxLayerId).changed();
    }
}
/**
 * Get the OpenLayers layer instance that contains the provided Mapbox/MapLibre Style
 * `layer`. Note that multiple Mapbox/MapLibre Style layers are combined in a single
 * OpenLayers layer instance when they use the same Mapbox/MapLibre Style `source`.
 * @param {Map|LayerGroup} map OpenLayers Map or LayerGroup.
 * @param {string} layerId Mapbox/MapLibre Style layer id.
 * @return {Layer} OpenLayers layer instance.
 */
function getLayer(map, layerId) {
    const layers = map.getLayers().getArray();
    for (let i = 0, ii = layers.length; i < ii; ++i) {
        const mapboxLayers = layers[i].get('mapbox-layers');
        if (mapboxLayers && mapboxLayers.indexOf(layerId) !== -1) {
            return layers[i];
        }
    }
    return undefined;
}
/**
 * Get the OpenLayers layer instances for the provided Mapbox/MapLibre Style `source`.
 * @param {Map|LayerGroup} map OpenLayers Map or LayerGroup.
 * @param {string} sourceId Mapbox/MapLibre Style source id.
 * @return {Array<Layer>} OpenLayers layer instances.
 */
function getLayers(map, sourceId) {
    const result = [];
    const layers = map.getLayers().getArray();
    for (let i = 0, ii = layers.length; i < ii; ++i) {
        if (layers[i].get('mapbox-source') === sourceId) {
            result.push(layers[i]);
        }
    }
    return result;
}
/**
 * Get the OpenLayers source instance for the provided Mapbox/MapLibre Style `source`.
 * @param {Map|LayerGroup} map OpenLayers Map or LayerGroup.
 * @param {string} sourceId Mapbox/MapLibre Style source id.
 * @return {Source} OpenLayers source instance.
 */
function getSource(map, sourceId) {
    const layers = map.getLayers().getArray();
    for (let i = 0, ii = layers.length; i < ii; ++i) {
        const source = /** @type {Layer} */
        layers[i].getSource();
        if (layers[i].get('mapbox-source') === sourceId) {
            return source;
        }
    }
    return undefined;
}
/**
 * Sets or removes a feature state. The feature state is taken into account for styling,
 * just like the feature's properties, and can be used e.g. to conditionally render selected
 * features differently.
 *
 * The feature state will be stored on the OpenLayers layer matching the feature identifier, in the
 * `mapbox-featurestate` property.
 * @param {Map|VectorLayer|VectorTileLayer} mapOrLayer OpenLayers Map or layer to set the feature
 * state on.
 * @param {FeatureIdentifier} feature Feature identifier.
 * @param {Object|null} state Feature state. Set to `null` to remove the feature state.
 */
function setFeatureState(mapOrLayer, feature, state) {
    const layers = 'getLayers' in mapOrLayer ? getLayers(mapOrLayer, feature.source) : [mapOrLayer];
    for (let i = 0, ii = layers.length; i < ii; ++i) {
        const featureState = layers[i].get('mapbox-featurestate');
        if (featureState) {
            if (state) {
                featureState[feature.id] = state;
            } else {
                delete featureState[feature.id];
            }
            layers[i].changed();
        } else {
            throw new Error(`Map or layer for source "${ feature.source }" not found.`);
        }
    }
}
/**
 * Sets or removes a feature state. The feature state is taken into account for styling,
 * just like the feature's properties, and can be used e.g. to conditionally render selected
 * features differently.
 * @param {Map|VectorLayer|VectorTileLayer} mapOrLayer Map or layer to set the feature state on.
 * @param {FeatureIdentifier} feature Feature identifier.
 * @return {Object|null} Feature state or `null` when no feature state is set for the given
 * feature identifier.
 */
function getFeatureState(mapOrLayer, feature) {
    const layers = 'getLayers' in mapOrLayer ? getLayers(mapOrLayer, feature.source) : [mapOrLayer];
    for (let i = 0, ii = layers.length; i < ii; ++i) {
        const featureState = layers[i].get('mapbox-featurestate');
        if (featureState && featureState[feature.id]) {
            return featureState[feature.id];
        }
    }
    return undefined;
}

/** @typedef {import("ol/Map.js").default} Map */
/**
 * @classdesc
 * Event emitted on configuration or loading error.
 */
class ErrorEvent extends BaseEvent {
    /**
   * @param {Error} error error object.
   */
    constructor(error) {
        super(EventType.ERROR);
        /**
     * @type {Error}
     */
        this.error = error;
    }
}
/**
 * @typedef {Object} Options
 * @property {string} styleUrl The URL of the Mapbox/MapLibre Style object to use for this layer.  For a
 * style created with Mapbox Studio and hosted on Mapbox, this will look like
 * 'mapbox://styles/you/your-style'.
 * @property {string} [accessToken] The access token for your Mapbox/MapLibre style. This has to be provided
 * for `mapbox://` style urls. For `https://` and other urls, any access key must be the last query
 * parameter of the style url.
 * @property {string} [source] If your style uses more than one source, you need to use either the
 * `source` property or the `layers` property to limit rendering to a single vector source.  The
 * `source` property corresponds to the id of a vector source in your Mapbox/MapLibre style.
 * @property {Array<string>} [layers] Limit rendering to the list of included layers.  All layers
 * must share the same vector source.  If your style uses more than one source, you need to use
 * either the `source` property or the `layers` property to limit rendering to a single vector
 * source.
 * @property {boolean} [declutter=true] Declutter images and text. Decluttering is applied to all
 * image and text styles of all Vector and VectorTile layers that have set this to `true`. The priority
 * is defined by the z-index of the layer, the `zIndex` of the style and the render order of features.
 * Higher z-index means higher priority. Within the same z-index, a feature rendered before another has
 * higher priority.
 *
 * As an optimization decluttered features from layers with the same `className` are rendered above
 * the fill and stroke styles of all of those layers regardless of z-index.  To opt out of this
 * behavior and place declutterd features with their own layer configure the layer with a `className`
 * other than `ol-layer`.
 * @property {import("ol/layer/Base.js").BackgroundColor|false} [background] Background color for the layer.
 * If not specified, the background from the Mapbox/MapLibre Style object will be used. Set to `false` to prevent
 * the Mapbox/MapLibre style's background from being used.
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("ol/extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible. If neither `maxResolution` nor `minZoom` are defined, the layer's `maxResolution` will
 * match the style source's `minzoom`.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will
 * be visible. If neither `maxResolution` nor `minZoom` are defined, the layer's `minZoom` will match
 * the style source's `minzoom`.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {import("ol/render.js").OrderFunction} [renderOrder] Render order. Function to be used when sorting
 * features before rendering. By default features are drawn in the order that they are created. Use
 * `null` to avoid the sort, but get an undefined draw order.
 * @property {number} [renderBuffer=100] The buffer in pixels around the tile extent used by the
 * renderer when getting features from the vector tile for the rendering or hit-detection.
 * Recommended value: Vector tiles are usually generated with a buffer, so this value should match
 * the largest possible buffer of the used tiles. It should be at least the size of the largest
 * point symbol or line width.
 * @property {import("ol/layer/VectorTile.js").VectorTileRenderType} [renderMode='hybrid'] Render mode for vector tiles:
 *  * `'hybrid'`: Polygon and line elements are rendered as images, so pixels are scaled during zoom
 *    animations. Point symbols and texts are accurately rendered as vectors and can stay upright on
 *    rotated views.
 *  * `'vector'`: Everything is rendered as vectors. Use this mode for improved performance on vector
 *    tile layers with only a few rendered features (e.g. for highlighting a subset of features of
 *    another layer with the same source).
 * @property {import("ol/Map.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use `map.addLayer()`.
 * @property {boolean} [updateWhileAnimating=false] When set to `true`, feature batches will be
 * recreated during animations. This means that no vectors will be shown clipped, but the setting
 * will have a performance impact for large amounts of vector data. When set to `false`, batches
 * will be recreated when no animation is active.
 * @property {boolean} [updateWhileInteracting=false] When set to `true`, feature batches will be
 * recreated during interactions. See also `updateWhileAnimating`.
 * @property {number} [preload=0] Preload. Load low-resolution tiles up to `preload` levels. `0`
 * means no preloading.
 * @property {boolean} [useInterimTilesOnError=true] Use interim tiles on error.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 */
/**
 * @classdesc
 * ```js
 * import {MapboxVectorLayer} from 'ol-mapbox-style';
 * ```
 * A vector tile layer based on a Mapbox/MapLibre style that uses a single vector source.  Configure
 * the layer with the `styleUrl` and `accessToken` shown in Mapbox Studio's share panel.
 * If the style uses more than one source, use the `source` property to choose a single
 * vector source.  If you want to render a subset of the layers in the style, use the `layers`
 * property (all layers must share the same vector source).  See the constructor options for
 * more detail.
 *
 *     const map = new Map({
 *       view: new View({
 *         center: [0, 0],
 *         zoom: 1,
 *       }),
 *       layers: [
 *         new MapboxVectorLayer({
 *           styleUrl: 'mapbox://styles/mapbox/bright-v9',
 *           accessToken: 'your-mapbox-access-token-here',
 *         }),
 *       ],
 *       target: 'map',
 *     });
 *
 * On configuration or loading error, the layer will trigger an `'error'` event.  Listeners
 * will receive an object with an `error` property that can be used to diagnose the problem.
 *
 * **Note for users of the full build**: The `MapboxVectorLayer` requires the
 * [ol-mapbox-style](https://github.com/openlayers/ol-mapbox-style) library to be loaded as well.
 *
 * @param {Options} options Options.
 * @extends {VectorTileLayer<import("ol/source/VectorTile.js").default>}
 * @fires module:ol/events/Event~BaseEvent#event:error
 * @api
 */
class MapboxVectorLayer extends VectorTileLayer {
    /**
   * @param {Options} options Layer options.  At a minimum, `styleUrl` and `accessToken`
   * must be provided.
   */
    constructor(options) {
        const declutter = 'declutter' in options ? options.declutter : true;
        const source = new VectorTileSource({
            state: 'loading',
            format: new MVT()
        });
        super({
            source: source,
            background: options.background === false ? null : options.background,
            declutter: declutter,
            className: options.className,
            opacity: options.opacity,
            visible: options.visible,
            zIndex: options.zIndex,
            minResolution: options.minResolution,
            maxResolution: options.maxResolution,
            minZoom: options.minZoom,
            maxZoom: options.maxZoom,
            renderOrder: options.renderOrder,
            renderBuffer: options.renderBuffer,
            renderMode: options.renderMode,
            map: options.map,
            updateWhileAnimating: options.updateWhileAnimating,
            updateWhileInteracting: options.updateWhileInteracting,
            preload: options.preload,
            useInterimTilesOnError: options.useInterimTilesOnError,
            properties: options.properties
        });
        if (options.accessToken) {
            this.accessToken = options.accessToken;
        }
        const url = options.styleUrl;
        const promises = [applyStyle(this, url, options.layers || options.source, { accessToken: this.accessToken })];
        if (this.getBackground() === undefined) {
            promises.push(applyBackground(this, options.styleUrl, { accessToken: this.accessToken }));
        }
        Promise.all(promises).then(() => {
            source.setState('ready');
        }).catch(error => {
            this.dispatchEvent(new ErrorEvent(error));
            const source = this.getSource();
            source.setState('error');
        });
    }
}

export { MapboxVectorLayer, addMapboxLayer, apply, applyBackground, applyStyle, apply as default, getFeatureState, getLayer, getLayers, getMapboxLayer, getSource, getStyleForLayer, recordStyleLayer, removeMapboxLayer, renderTransparent, setFeatureState, stylefunction, updateMapboxLayer, updateMapboxSource };
//# sourceMappingURL=index.js.map
