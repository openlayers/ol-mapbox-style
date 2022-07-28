import Circle from 'ol/style/Circle.js';
import Fill from 'ol/style/Fill.js';
import Icon from 'ol/style/Icon.js';
import RenderFeature from 'ol/render/Feature.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style.js';
import Text from 'ol/style/Text.js';
import { registerFont, checkedFonts } from 'ol/render/canvas.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import MVT from 'ol/format/MVT.js';
import Map from 'ol/Map.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import TileJSON from 'ol/source/TileJSON.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource, { defaultLoadFunction } from 'ol/source/VectorTile.js';
import View from 'ol/View.js';
import { createXYZ } from 'ol/tilegrid.js';
import { fromLonLat, equivalent, getUserProjection } from 'ol/proj.js';

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
        { return clamp_css_byte(parseFloat(str) / 100 * 255); }
    return clamp_css_byte(parseInt(str));
}
function parse_css_float(str) {
    // float or percentage.
    if (str[str.length - 1] === '%')
        { return clamp_css_float(parseFloat(str) / 100); }
    return clamp_css_float(parseFloat(str));
}
function css_hue_to_rgb(m1, m2, h) {
    if (h < 0)
        { h += 1; }
    else if (h > 1)
        { h -= 1; }
    if (h * 6 < 1)
        { return m1 + (m2 - m1) * h * 6; }
    if (h * 2 < 1)
        { return m2; }
    if (h * 3 < 2)
        { return m1 + (m2 - m1) * (2 / 3 - h) * 6; }
    return m1;
}
function parseCSSColor(css_str) {
    // Remove all whitespace, not compliant, but should just be more accepting.
    var str = css_str.replace(/ /g, '').toLowerCase();
    // Color keywords (and transparent) lookup.
    if (str in kCSSColorTable)
        { return kCSSColorTable[str].slice(); }
    // dup.
    // #abc and #abc123 syntax.
    if (str[0] === '#') {
        if (str.length === 4) {
            var iv = parseInt(str.substr(1), 16);
            // TODO(deanm): Stricter parsing.
            if (!(iv >= 0 && iv <= 4095))
                { return null; }
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
                { return null; }
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
                { return null; }
            alpha = parse_css_float(params.pop());
        // Fall through.
        case 'rgb':
            if (params.length !== 3)
                { return null; }
            return [
                parse_css_int(params[0]),
                parse_css_int(params[1]),
                parse_css_int(params[2]),
                alpha
            ];
        case 'hsla':
            if (params.length !== 4)
                { return null; }
            alpha = parse_css_float(params.pop());
        // Fall through.
        case 'hsl':
            if (params.length !== 3)
                { return null; }
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
var Color = function Color(r, g, b, a) {
    if ( a === void 0 ) a = 1;

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
};
/**
 * Parses valid CSS color strings and returns a `Color` instance.
 * @returns A `Color` instance, or `undefined` if the input is not a valid color string.
 */
Color.parse = function parse (input) {
    if (!input) {
        return undefined;
    }
    if (input instanceof Color) {
        return input;
    }
    if (typeof input !== 'string') {
        return undefined;
    }
    var rgba = parseCSSColor_1(input);
    if (!rgba) {
        return undefined;
    }
    return new Color(rgba[0] / 255 * rgba[3], rgba[1] / 255 * rgba[3], rgba[2] / 255 * rgba[3], rgba[3]);
};
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
Color.prototype.toString = function toString () {
    var ref = this.toArray();
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];
    return ("rgba(" + (Math.round(r)) + "," + (Math.round(g)) + "," + (Math.round(b)) + "," + a + ")");
};
/**
 * Returns an RGBA array of values representing the color, unpremultiplied by A.
 *
 * @returns An array of RGBA color values in the range [0, 255].
 */
Color.prototype.toArray = function toArray () {
    var ref = this;
        var r = ref.r;
        var g = ref.g;
        var b = ref.b;
        var a = ref.a;
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
};
/**
 * Returns a RGBA array of float values representing the color, unpremultiplied by A.
 *
 * @returns An array of RGBA color values in the range [0, 1].
 */
Color.prototype.toArray01 = function toArray01 () {
    var ref = this;
        var r = ref.r;
        var g = ref.g;
        var b = ref.b;
        var a = ref.a;
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
};
/**
 * Returns an RGBA array of values representing the color, premultiplied by A.
 *
 * @returns An array of RGBA color values in the range [0, 1].
 */
Color.prototype.toArray01PremultipliedAlpha = function toArray01PremultipliedAlpha () {
    var ref = this;
        var r = ref.r;
        var g = ref.g;
        var b = ref.b;
        var a = ref.a;
    return [
        r,
        g,
        b,
        a
    ];
};
Color.black = new Color(0, 0, 0, 1);
Color.white = new Color(1, 1, 1, 1);
Color.transparent = new Color(0, 0, 0, 0);
Color.red = new Color(1, 0, 0, 1);
Color.blue = new Color(0, 0, 1, 1);

function convertLiteral(value) {
    return typeof value === 'object' ? [
        'literal',
        value
    ] : value;
}
function convertFunction(parameters, propertySpec) {
    var stops = parameters.stops;
    if (!stops) {
        // identity function
        return convertIdentityFunction(parameters, propertySpec);
    }
    var zoomAndFeatureDependent = stops && typeof stops[0][0] === 'object';
    var featureDependent = zoomAndFeatureDependent || parameters.property !== undefined;
    var zoomDependent = zoomAndFeatureDependent || !featureDependent;
    stops = stops.map(function (stop) {
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
    var get = [
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
        var expression = [
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
    var featureFunctionParameters = {};
    var featureFunctionStops = {};
    var zoomStops = [];
    for (var s = 0; s < stops.length; s++) {
        var stop = stops[s];
        var zoom = stop[0].zoom;
        if (featureFunctionParameters[zoom] === undefined) {
            featureFunctionParameters[zoom] = {
                zoom: zoom,
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
    var functionType = getFunctionType({}, propertySpec);
    if (functionType === 'exponential') {
        var expression = [
            getInterpolateOperator(parameters),
            ['linear'],
            ['zoom']
        ];
        for (var i = 0, list = zoomStops; i < list.length; i += 1) {
            var z = list[i];

            var output = convertPropertyFunction(featureFunctionParameters[z], propertySpec, featureFunctionStops[z]);
            appendStopPair(expression, z, output, false);
        }
        return expression;
    } else {
        var expression$1 = [
            'step',
            ['zoom']
        ];
        for (var i$1 = 0, list$1 = zoomStops; i$1 < list$1.length; i$1 += 1) {
            var z$1 = list$1[i$1];

            var output$1 = convertPropertyFunction(featureFunctionParameters[z$1], propertySpec, featureFunctionStops[z$1]);
            appendStopPair(expression$1, z$1, output$1, true);
        }
        fixupDegenerateStepCurve(expression$1);
        return expression$1;
    }
}
function coalesce(a, b) {
    if (a !== undefined)
        { return a; }
    if (b !== undefined)
        { return b; }
}
function getFallback(parameters, propertySpec) {
    var defaultValue = convertLiteral(coalesce(parameters.default, propertySpec.default));
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
    var type = getFunctionType(parameters, propertySpec);
    var get = [
        'get',
        parameters.property
    ];
    if (type === 'categorical' && typeof stops[0][0] === 'boolean') {
        var expression = ['case'];
        for (var i = 0, list = stops; i < list.length; i += 1) {
            var stop = list[i];

            expression.push([
                '==',
                get,
                stop[0]
            ], stop[1]);
        }
        expression.push(getFallback(parameters, propertySpec));
        return expression;
    } else if (type === 'categorical') {
        var expression$1 = [
            'match',
            get
        ];
        for (var i$1 = 0, list$1 = stops; i$1 < list$1.length; i$1 += 1) {
            var stop$1 = list$1[i$1];

            appendStopPair(expression$1, stop$1[0], stop$1[1], false);
        }
        expression$1.push(getFallback(parameters, propertySpec));
        return expression$1;
    } else if (type === 'interval') {
        var expression$2 = [
            'step',
            [
                'number',
                get
            ]
        ];
        for (var i$2 = 0, list$2 = stops; i$2 < list$2.length; i$2 += 1) {
            var stop$2 = list$2[i$2];

            appendStopPair(expression$2, stop$2[0], stop$2[1], true);
        }
        fixupDegenerateStepCurve(expression$2);
        return parameters.default === undefined ? expression$2 : [
            'case',
            [
                '==',
                [
                    'typeof',
                    get
                ],
                'number'
            ],
            expression$2,
            convertLiteral(parameters.default)
        ];
    } else if (type === 'exponential') {
        var base = parameters.base !== undefined ? parameters.base : 1;
        var expression$3 = [
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
        for (var i$3 = 0, list$3 = stops; i$3 < list$3.length; i$3 += 1) {
            var stop$3 = list$3[i$3];

            appendStopPair(expression$3, stop$3[0], stop$3[1], false);
        }
        return parameters.default === undefined ? expression$3 : [
            'case',
            [
                '==',
                [
                    'typeof',
                    get
                ],
                'number'
            ],
            expression$3,
            convertLiteral(parameters.default)
        ];
    } else {
        throw new Error(("Unknown property function type " + type));
    }
}
function convertZoomFunction(parameters, propertySpec, stops, input) {
    if ( input === void 0 ) input = ['zoom'];

    var type = getFunctionType(parameters, propertySpec);
    var expression;
    var isStep = false;
    if (type === 'interval') {
        expression = [
            'step',
            input
        ];
        isStep = true;
    } else if (type === 'exponential') {
        var base = parameters.base !== undefined ? parameters.base : 1;
        expression = [
            getInterpolateOperator(parameters),
            base === 1 ? ['linear'] : [
                'exponential',
                base
            ],
            input
        ];
    } else {
        throw new Error(("Unknown zoom function type \"" + type + "\""));
    }
    for (var i = 0, list = stops; i < list.length; i += 1) {
        var stop = list[i];

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
    var result = ['concat'];
    var re = /{([^{}]+)}/g;
    var pos = 0;
    for (var match = re.exec(s); match !== null; match = re.exec(s)) {
        var literal = s.slice(pos, re.lastIndex - match[0].length);
        pos = re.lastIndex;
        if (literal.length > 0)
            { result.push(literal); }
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
var ParsingError = /*@__PURE__*/(function (Error) {
    function ParsingError(key, message) {
        Error.call(this, message);
        this.message = message;
        this.key = key;
    }

    if ( Error ) ParsingError.__proto__ = Error;
    ParsingError.prototype = Object.create( Error && Error.prototype );
    ParsingError.prototype.constructor = ParsingError;

    return ParsingError;
}(Error));

//      
/**
 * Tracks `let` bindings during expression parsing.
 * @private
 */
var Scope = function Scope(parent, bindings) {
    if ( bindings === void 0 ) bindings = [];

    this.parent = parent;
    this.bindings = {};
    for (var i = 0, list = bindings; i < list.length; i += 1) {
        var ref = list[i];
        var name = ref[0];
        var expression = ref[1];

        this.bindings[name] = expression;
    }
};
Scope.prototype.concat = function concat (bindings) {
    return new Scope(this, bindings);
};
Scope.prototype.get = function get (name) {
    if (this.bindings[name]) {
        return this.bindings[name];
    }
    if (this.parent) {
        return this.parent.get(name);
    }
    throw new Error((name + " not found in scope."));
};
Scope.prototype.has = function has (name) {
    if (this.bindings[name])
        { return true; }
    return this.parent ? this.parent.has(name) : false;
};

//      
var NullType = { kind: 'null' };
var NumberType = { kind: 'number' };
var StringType = { kind: 'string' };
var BooleanType = { kind: 'boolean' };
var ColorType = { kind: 'color' };
var ObjectType = { kind: 'object' };
var ValueType = { kind: 'value' };
var ErrorType = { kind: 'error' };
var CollatorType = { kind: 'collator' };
var FormattedType = { kind: 'formatted' };
var ResolvedImageType = { kind: 'resolvedImage' };
function array$1(itemType, N) {
    return {
        kind: 'array',
        itemType: itemType,
        N: N
    };
}
function toString$1(type) {
    if (type.kind === 'array') {
        var itemType = toString$1(type.itemType);
        return typeof type.N === 'number' ? ("array<" + itemType + ", " + (type.N) + ">") : type.itemType.kind === 'value' ? 'array' : ("array<" + itemType + ">");
    } else {
        return type.kind;
    }
}
var valueMemberTypes = [
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
        for (var i = 0, list = valueMemberTypes; i < list.length; i += 1) {
            var memberType = list[i];

            if (!checkSubtype(memberType, t)) {
                return null;
            }
        }
    }
    return ("Expected " + (toString$1(expected)) + " but found " + (toString$1(t)) + " instead.");
}
function isValidType(provided, allowedTypes) {
    return allowedTypes.some(function (t) { return t.kind === provided.kind; });
}
function isValidNativeType(provided, allowedTypes) {
    return allowedTypes.some(function (t) {
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
var Collator = function Collator(caseSensitive, diacriticSensitive, locale) {
    if (caseSensitive)
        { this.sensitivity = diacriticSensitive ? 'variant' : 'case'; }
    else
        { this.sensitivity = diacriticSensitive ? 'accent' : 'base'; }
    this.locale = locale;
    this.collator = new Intl.Collator(this.locale ? this.locale : [], {
        sensitivity: this.sensitivity,
        usage: 'search'
    });
};
Collator.prototype.compare = function compare (lhs, rhs) {
    return this.collator.compare(lhs, rhs);
};
Collator.prototype.resolvedLocale = function resolvedLocale () {
    // We create a Collator without "usage: search" because we don't want
    // the search options encoded in our result (e.g. "en-u-co-search")
    return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions().locale;
};

//      
var FormattedSection = function FormattedSection(text, image, scale, fontStack, textColor) {
    // combine characters so that diacritic marks are not separate code points
    this.text = text.normalize ? text.normalize() : text;
    this.image = image;
    this.scale = scale;
    this.fontStack = fontStack;
    this.textColor = textColor;
};
var Formatted = function Formatted(sections) {
    this.sections = sections;
};
Formatted.fromString = function fromString (unformatted) {
    return new Formatted([new FormattedSection(unformatted, null, null, null, null)]);
};
Formatted.prototype.isEmpty = function isEmpty () {
    if (this.sections.length === 0)
        { return true; }
    return !this.sections.some(function (section) { return section.text.length !== 0 || section.image && section.image.name.length !== 0; });
};
Formatted.factory = function factory (text) {
    if (text instanceof Formatted) {
        return text;
    } else {
        return Formatted.fromString(text);
    }
};
Formatted.prototype.toString = function toString () {
    if (this.sections.length === 0)
        { return ''; }
    return this.sections.map(function (section) { return section.text; }).join('');
};
Formatted.prototype.serialize = function serialize () {
    var serialized = ['format'];
    for (var i = 0, list = this.sections; i < list.length; i += 1) {
        var section = list[i];

            if (section.image) {
            serialized.push([
                'image',
                section.image.name
            ]);
            continue;
        }
        serialized.push(section.text);
        var options = {};
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
};

//      
var ResolvedImage = function ResolvedImage(options) {
    this.name = options.name;
    this.available = options.available;
};
ResolvedImage.prototype.toString = function toString () {
    return this.name;
};
ResolvedImage.fromString = function fromString (name) {
    if (!name)
        { return null; }
    // treat empty values as no image
    return new ResolvedImage({
        name: name,
        available: false
    });
};
ResolvedImage.prototype.serialize = function serialize () {
    return [
        'image',
        this.name
    ];
};

function validateRGBA(r, g, b, a) {
    if (!(typeof r === 'number' && r >= 0 && r <= 255 && typeof g === 'number' && g >= 0 && g <= 255 && typeof b === 'number' && b >= 0 && b <= 255)) {
        var value = typeof a === 'number' ? [
            r,
            g,
            b,
            a
        ] : [
            r,
            g,
            b
        ];
        return ("Invalid rgba value [" + (value.join(', ')) + "]: 'r', 'g', and 'b' must be between 0 and 255.");
    }
    if (!(typeof a === 'undefined' || typeof a === 'number' && a >= 0 && a <= 1)) {
        return ("Invalid rgba value [" + ([
            r,
            g,
            b,
            a
        ].join(', ')) + "]: 'a' must be between 0 and 1.");
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
    } else if (mixed instanceof Color) {
        return true;
    } else if (mixed instanceof Collator) {
        return true;
    } else if (mixed instanceof Formatted) {
        return true;
    } else if (mixed instanceof ResolvedImage) {
        return true;
    } else if (Array.isArray(mixed)) {
        for (var i = 0, list = mixed; i < list.length; i += 1) {
            var item = list[i];

            if (!isValue(item)) {
                return false;
            }
        }
        return true;
    } else if (typeof mixed === 'object') {
        for (var key in mixed) {
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
    } else if (value instanceof Color) {
        return ColorType;
    } else if (value instanceof Collator) {
        return CollatorType;
    } else if (value instanceof Formatted) {
        return FormattedType;
    } else if (value instanceof ResolvedImage) {
        return ResolvedImageType;
    } else if (Array.isArray(value)) {
        var length = value.length;
        var itemType;
        for (var i = 0, list = value; i < list.length; i += 1) {
            var item = list[i];

            var t = typeOf(item);
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
    var type = typeof value;
    if (value === null) {
        return '';
    } else if (type === 'string' || type === 'number' || type === 'boolean') {
        return String(value);
    } else if (value instanceof Color || value instanceof Formatted || value instanceof ResolvedImage) {
        return value.toString();
    } else {
        return JSON.stringify(value);
    }
}

var Literal = function Literal(type, value) {
    this.type = type;
    this.value = value;
};
Literal.parse = function parse (args, context) {
    if (args.length !== 2)
        { return context.error(("'literal' expression requires exactly one argument, but found " + (args.length - 1) + " instead.")); }
    if (!isValue(args[1]))
        { return context.error("invalid value"); }
    var value = args[1];
    var type = typeOf(value);
    // special case: infer the item type if possible for zero-length arrays
    var expected = context.expectedType;
    if (type.kind === 'array' && type.N === 0 && expected && expected.kind === 'array' && (typeof expected.N !== 'number' || expected.N === 0)) {
        type = expected;
    }
    return new Literal(type, value);
};
Literal.prototype.evaluate = function evaluate () {
    return this.value;
};
Literal.prototype.eachChild = function eachChild () {
};
Literal.prototype.outputDefined = function outputDefined () {
    return true;
};
Literal.prototype.serialize = function serialize () {
    if (this.type.kind === 'array' || this.type.kind === 'object') {
        return [
            'literal',
            this.value
        ];
    } else if (this.value instanceof Color) {
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
};

//      
var RuntimeError = function RuntimeError(message) {
    this.name = 'ExpressionEvaluationError';
    this.message = message;
};
RuntimeError.prototype.toJSON = function toJSON () {
    return this.message;
};

var types$2 = {
    string: StringType,
    number: NumberType,
    boolean: BooleanType,
    object: ObjectType
};
var Assertion = function Assertion(type, args) {
    this.type = type;
    this.args = args;
};
Assertion.parse = function parse (args, context) {
    if (args.length < 2)
        { return context.error("Expected at least one argument."); }
    var i = 1;
    var type;
    var name = args[0];
    if (name === 'array') {
        var itemType;
        if (args.length > 2) {
            var type$1 = args[1];
            if (typeof type$1 !== 'string' || !(type$1 in types$2) || type$1 === 'object')
                { return context.error('The item type argument of "array" must be one of string, number, boolean', 1); }
            itemType = types$2[type$1];
            i++;
        } else {
            itemType = ValueType;
        }
        var N;
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
    var parsed = [];
    for (; i < args.length; i++) {
        var input = context.parse(args[i], i, ValueType);
        if (!input)
            { return null; }
        parsed.push(input);
    }
    return new Assertion(type, parsed);
};
Assertion.prototype.evaluate = function evaluate (ctx) {
    for (var i = 0; i < this.args.length; i++) {
        var value = this.args[i].evaluate(ctx);
        var error = checkSubtype(this.type, typeOf(value));
        if (!error) {
            return value;
        } else if (i === this.args.length - 1) {
            throw new RuntimeError(("Expected value to be of type " + (toString$1(this.type)) + ", but found " + (toString$1(typeOf(value))) + " instead."));
        }
    }
    return null;
};
Assertion.prototype.eachChild = function eachChild (fn) {
    this.args.forEach(fn);
};
Assertion.prototype.outputDefined = function outputDefined () {
    return this.args.every(function (arg) { return arg.outputDefined(); });
};
Assertion.prototype.serialize = function serialize () {
    var type = this.type;
    var serialized = [type.kind];
    if (type.kind === 'array') {
        var itemType = type.itemType;
        if (itemType.kind === 'string' || itemType.kind === 'number' || itemType.kind === 'boolean') {
            serialized.push(itemType.kind);
            var N = type.N;
            if (typeof N === 'number' || this.args.length > 1) {
                serialized.push(N);
            }
        }
    }
    return serialized.concat(this.args.map(function (arg) { return arg.serialize(); }));
};

//      
var FormatExpression = function FormatExpression(sections) {
    this.type = FormattedType;
    this.sections = sections;
};
FormatExpression.parse = function parse (args, context) {
    if (args.length < 2) {
        return context.error("Expected at least one argument.");
    }
    var firstArg = args[1];
    if (!Array.isArray(firstArg) && typeof firstArg === 'object') {
        return context.error("First argument must be an image or text section.");
    }
    var sections = [];
    var nextTokenMayBeObject = false;
    for (var i = 1; i <= args.length - 1; ++i) {
        var arg = args[i];
        if (nextTokenMayBeObject && typeof arg === 'object' && !Array.isArray(arg)) {
            nextTokenMayBeObject = false;
            var scale = null;
            if (arg['font-scale']) {
                scale = context.parse(arg['font-scale'], 1, NumberType);
                if (!scale)
                    { return null; }
            }
            var font = null;
            if (arg['text-font']) {
                font = context.parse(arg['text-font'], 1, array$1(StringType));
                if (!font)
                    { return null; }
            }
            var textColor = null;
            if (arg['text-color']) {
                textColor = context.parse(arg['text-color'], 1, ColorType);
                if (!textColor)
                    { return null; }
            }
            var lastExpression = sections[sections.length - 1];
            lastExpression.scale = scale;
            lastExpression.font = font;
            lastExpression.textColor = textColor;
        } else {
            var content = context.parse(args[i], 1, ValueType);
            if (!content)
                { return null; }
            var kind = content.type.kind;
            if (kind !== 'string' && kind !== 'value' && kind !== 'null' && kind !== 'resolvedImage')
                { return context.error("Formatted text type must be 'string', 'value', 'image' or 'null'."); }
            nextTokenMayBeObject = true;
            sections.push({
                content: content,
                scale: null,
                font: null,
                textColor: null
            });
        }
    }
    return new FormatExpression(sections);
};
FormatExpression.prototype.evaluate = function evaluate (ctx) {
    var evaluateSection = function (section) {
        var evaluatedContent = section.content.evaluate(ctx);
        if (typeOf(evaluatedContent) === ResolvedImageType) {
            return new FormattedSection('', evaluatedContent, null, null, null);
        }
        return new FormattedSection(toString(evaluatedContent), null, section.scale ? section.scale.evaluate(ctx) : null, section.font ? section.font.evaluate(ctx).join(',') : null, section.textColor ? section.textColor.evaluate(ctx) : null);
    };
    return new Formatted(this.sections.map(evaluateSection));
};
FormatExpression.prototype.eachChild = function eachChild (fn) {
    for (var i = 0, list = this.sections; i < list.length; i += 1) {
        var section = list[i];

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
};
FormatExpression.prototype.outputDefined = function outputDefined () {
    // Technically the combinatoric set of all children
    // Usually, this.text will be undefined anyway
    return false;
};
FormatExpression.prototype.serialize = function serialize () {
    var serialized = ['format'];
    for (var i = 0, list = this.sections; i < list.length; i += 1) {
        var section = list[i];

            serialized.push(section.content.serialize());
        var options = {};
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
};

//      
var ImageExpression = function ImageExpression(input) {
    this.type = ResolvedImageType;
    this.input = input;
};
ImageExpression.parse = function parse (args, context) {
    if (args.length !== 2) {
        return context.error("Expected two arguments.");
    }
    var name = context.parse(args[1], 1, StringType);
    if (!name)
        { return context.error("No image name provided."); }
    return new ImageExpression(name);
};
ImageExpression.prototype.evaluate = function evaluate (ctx) {
    var evaluatedImageName = this.input.evaluate(ctx);
    var value = ResolvedImage.fromString(evaluatedImageName);
    if (value && ctx.availableImages)
        { value.available = ctx.availableImages.indexOf(evaluatedImageName) > -1; }
    return value;
};
ImageExpression.prototype.eachChild = function eachChild (fn) {
    fn(this.input);
};
ImageExpression.prototype.outputDefined = function outputDefined () {
    // The output of image is determined by the list of available images in the evaluation context
    return false;
};
ImageExpression.prototype.serialize = function serialize () {
    return [
        'image',
        this.input.serialize()
    ];
};

var types$1 = {
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
var Coercion = function Coercion(type, args) {
    this.type = type;
    this.args = args;
};
Coercion.parse = function parse (args, context) {
    if (args.length < 2)
        { return context.error("Expected at least one argument."); }
    var name = args[0];
    if ((name === 'to-boolean' || name === 'to-string') && args.length !== 2)
        { return context.error("Expected one argument."); }
    var type = types$1[name];
    var parsed = [];
    for (var i = 1; i < args.length; i++) {
        var input = context.parse(args[i], i, ValueType);
        if (!input)
            { return null; }
        parsed.push(input);
    }
    return new Coercion(type, parsed);
};
Coercion.prototype.evaluate = function evaluate (ctx) {
    if (this.type.kind === 'boolean') {
        return Boolean(this.args[0].evaluate(ctx));
    } else if (this.type.kind === 'color') {
        var input;
        var error;
        for (var i = 0, list = this.args; i < list.length; i += 1) {
            var arg = list[i];

                input = arg.evaluate(ctx);
            error = null;
            if (input instanceof Color) {
                return input;
            } else if (typeof input === 'string') {
                var c = ctx.parseColor(input);
                if (c)
                    { return c; }
            } else if (Array.isArray(input)) {
                if (input.length < 3 || input.length > 4) {
                    error = "Invalid rbga value " + (JSON.stringify(input)) + ": expected an array containing either three or four numeric values.";
                } else {
                    error = validateRGBA(input[0], input[1], input[2], input[3]);
                }
                if (!error) {
                    return new Color(input[0] / 255, input[1] / 255, input[2] / 255, input[3]);
                }
            }
        }
        throw new RuntimeError(error || ("Could not parse color from value '" + (typeof input === 'string' ? input : String(JSON.stringify(input))) + "'"));
    } else if (this.type.kind === 'number') {
        var value = null;
        for (var i$1 = 0, list$1 = this.args; i$1 < list$1.length; i$1 += 1) {
            var arg$1 = list$1[i$1];

                value = arg$1.evaluate(ctx);
            if (value === null)
                { return 0; }
            var num = Number(value);
            if (isNaN(num))
                { continue; }
            return num;
        }
        throw new RuntimeError(("Could not convert " + (JSON.stringify(value)) + " to number."));
    } else if (this.type.kind === 'formatted') {
        // There is no explicit 'to-formatted' but this coercion can be implicitly
        // created by properties that expect the 'formatted' type.
        return Formatted.fromString(toString(this.args[0].evaluate(ctx)));
    } else if (this.type.kind === 'resolvedImage') {
        return ResolvedImage.fromString(toString(this.args[0].evaluate(ctx)));
    } else {
        return toString(this.args[0].evaluate(ctx));
    }
};
Coercion.prototype.eachChild = function eachChild (fn) {
    this.args.forEach(fn);
};
Coercion.prototype.outputDefined = function outputDefined () {
    return this.args.every(function (arg) { return arg.outputDefined(); });
};
Coercion.prototype.serialize = function serialize () {
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
    var serialized = [("to-" + (this.type.kind))];
    this.eachChild(function (child) {
        serialized.push(child.serialize());
    });
    return serialized;
};

//      
var geometryTypes = [
    'Unknown',
    'Point',
    'LineString',
    'Polygon'
];
var EvaluationContext = function EvaluationContext() {
    this.globals = null;
    this.feature = null;
    this.featureState = null;
    this.formattedSection = null;
    this._parseColorCache = {};
    this.availableImages = null;
    this.canonical = null;
    this.featureTileCoord = null;
    this.featureDistanceData = null;
};
EvaluationContext.prototype.id = function id () {
    return this.feature && 'id' in this.feature && this.feature.id ? this.feature.id : null;
};
EvaluationContext.prototype.geometryType = function geometryType () {
    return this.feature ? typeof this.feature.type === 'number' ? geometryTypes[this.feature.type] : this.feature.type : null;
};
EvaluationContext.prototype.geometry = function geometry () {
    return this.feature && 'geometry' in this.feature ? this.feature.geometry : null;
};
EvaluationContext.prototype.canonicalID = function canonicalID () {
    return this.canonical;
};
EvaluationContext.prototype.properties = function properties () {
    return this.feature && this.feature.properties || {};
};
EvaluationContext.prototype.distanceFromCenter = function distanceFromCenter () {
    if (this.featureTileCoord && this.featureDistanceData) {
        var c = this.featureDistanceData.center;
        var scale = this.featureDistanceData.scale;
        var ref = this.featureTileCoord;
            var x = ref.x;
            var y = ref.y;
        // Calculate the distance vector `d` (left handed)
        var dX = x * scale - c[0];
        var dY = y * scale - c[1];
        // The bearing vector `b` (left handed)
        var bX = this.featureDistanceData.bearing[0];
        var bY = this.featureDistanceData.bearing[1];
        // Distance is calculated as `dot(d, v)`
        var dist = bX * dX + bY * dY;
        return dist;
    }
    return 0;
};
EvaluationContext.prototype.parseColor = function parseColor (input) {
    var cached = this._parseColorCache[input];
    if (!cached) {
        cached = this._parseColorCache[input] = Color.parse(input);
    }
    return cached;
};

//      
var CompoundExpression = function CompoundExpression(name, type, evaluate, args) {
    this.name = name;
    this.type = type;
    this._evaluate = evaluate;
    this.args = args;
};
CompoundExpression.prototype.evaluate = function evaluate (ctx) {
    return this._evaluate(ctx, this.args);
};
CompoundExpression.prototype.eachChild = function eachChild (fn) {
    this.args.forEach(fn);
};
CompoundExpression.prototype.outputDefined = function outputDefined () {
    return false;
};
CompoundExpression.prototype.serialize = function serialize () {
    return [this.name].concat(this.args.map(function (arg) { return arg.serialize(); }));
};
CompoundExpression.parse = function parse (args, context) {
        var ref$1;

    var op = args[0];
    var definition = CompoundExpression.definitions[op];
    if (!definition) {
        return context.error(("Unknown expression \"" + op + "\". If you wanted a literal array, use [\"literal\", [...]]."), 0);
    }
    // Now check argument types against each signature
    var type = Array.isArray(definition) ? definition[0] : definition.type;
    var availableOverloads = Array.isArray(definition) ? [[
            definition[1],
            definition[2]
        ]] : definition.overloads;
    var overloads = availableOverloads.filter(function (ref) {
            var signature = ref[0];

            return !Array.isArray(signature) || // varags
    signature.length === args.length - 1;
        }// correct param count
);
    var signatureContext = null;
    for (var i$3 = 0, list = overloads; i$3 < list.length; i$3 += 1) {
        // Use a fresh context for each attempted signature so that, if
        // we eventually succeed, we haven't polluted `context.errors`.
        var ref = list[i$3];
            var params = ref[0];
            var evaluate = ref[1];

            signatureContext = new ParsingContext(context.registry, context.path, null, context.scope);
        // First parse all the args, potentially coercing to the
        // types expected by this overload.
        var parsedArgs = [];
        var argParseFailed = false;
        for (var i = 1; i < args.length; i++) {
            var arg = args[i];
            var expectedType = Array.isArray(params) ? params[i - 1] : params.type;
            var parsed = signatureContext.parse(arg, 1 + parsedArgs.length, expectedType);
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
                signatureContext.error(("Expected " + (params.length) + " arguments, but found " + (parsedArgs.length) + " instead."));
                continue;
            }
        }
        for (var i$1 = 0; i$1 < parsedArgs.length; i$1++) {
            var expected = Array.isArray(params) ? params[i$1] : params.type;
            var arg$1 = parsedArgs[i$1];
            signatureContext.concat(i$1 + 1).checkSubtype(expected, arg$1.type);
        }
        if (signatureContext.errors.length === 0) {
            return new CompoundExpression(op, type, evaluate, parsedArgs);
        }
    }
    if (overloads.length === 1) {
        (ref$1 = context.errors).push.apply(ref$1, signatureContext.errors);
    } else {
        var expected$1 = overloads.length ? overloads : availableOverloads;
        var signatures = expected$1.map(function (ref) {
                var params = ref[0];

                return stringifySignature(params);
            }).join(' | ');
        var actualTypes = [];
        // For error message, re-parse arguments without trying to
        // apply any coercions
        for (var i$2 = 1; i$2 < args.length; i$2++) {
            var parsed$1 = context.parse(args[i$2], 1 + actualTypes.length);
            if (!parsed$1)
                { return null; }
            actualTypes.push(toString$1(parsed$1.type));
        }
        context.error(("Expected arguments of type " + signatures + ", but found (" + (actualTypes.join(', ')) + ") instead."));
    }
    return null;
};
CompoundExpression.register = function register (registry, definitions) {
    CompoundExpression.definitions = definitions;
    for (var name in definitions) {
        registry[name] = CompoundExpression;
    }
};
function stringifySignature(signature) {
    if (Array.isArray(signature)) {
        return ("(" + (signature.map(toString$1).join(', ')) + ")");
    } else {
        return ("(" + (toString$1(signature.type)) + "...)");
    }
}

//      
var CollatorExpression = function CollatorExpression(caseSensitive, diacriticSensitive, locale) {
    this.type = CollatorType;
    this.locale = locale;
    this.caseSensitive = caseSensitive;
    this.diacriticSensitive = diacriticSensitive;
};
CollatorExpression.parse = function parse (args, context) {
    if (args.length !== 2)
        { return context.error("Expected one argument."); }
    var options = args[1];
    if (typeof options !== 'object' || Array.isArray(options))
        { return context.error("Collator options argument must be an object."); }
    var caseSensitive = context.parse(options['case-sensitive'] === undefined ? false : options['case-sensitive'], 1, BooleanType);
    if (!caseSensitive)
        { return null; }
    var diacriticSensitive = context.parse(options['diacritic-sensitive'] === undefined ? false : options['diacritic-sensitive'], 1, BooleanType);
    if (!diacriticSensitive)
        { return null; }
    var locale = null;
    if (options['locale']) {
        locale = context.parse(options['locale'], 1, StringType);
        if (!locale)
            { return null; }
    }
    return new CollatorExpression(caseSensitive, diacriticSensitive, locale);
};
CollatorExpression.prototype.evaluate = function evaluate (ctx) {
    return new Collator(this.caseSensitive.evaluate(ctx), this.diacriticSensitive.evaluate(ctx), this.locale ? this.locale.evaluate(ctx) : null);
};
CollatorExpression.prototype.eachChild = function eachChild (fn) {
    fn(this.caseSensitive);
    fn(this.diacriticSensitive);
    if (this.locale) {
        fn(this.locale);
    }
};
CollatorExpression.prototype.outputDefined = function outputDefined () {
    // Technically the set of possible outputs is the combinatoric set of Collators produced
    // by all possible outputs of locale/caseSensitive/diacriticSensitive
    // But for the primary use of Collators in comparison operators, we ignore the Collator's
    // possible outputs anyway, so we can get away with leaving this false for now.
    return false;
};
CollatorExpression.prototype.serialize = function serialize () {
    var options = {};
    options['case-sensitive'] = this.caseSensitive.serialize();
    options['diacritic-sensitive'] = this.diacriticSensitive.serialize();
    if (this.locale) {
        options['locale'] = this.locale.serialize();
    }
    return [
        'collator',
        options
    ];
};

//      
// minX, minY, maxX, maxY
var EXTENT = 8192;
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
        { return false; }
    if (bbox1[2] >= bbox2[2])
        { return false; }
    if (bbox1[1] <= bbox2[1])
        { return false; }
    if (bbox1[3] >= bbox2[3])
        { return false; }
    return true;
}
function getTileCoordinates(p, canonical) {
    var x = mercatorXfromLng(p[0]);
    var y = mercatorYfromLat(p[1]);
    var tilesAtZoom = Math.pow(2, canonical.z);
    return [
        Math.round(x * tilesAtZoom * EXTENT),
        Math.round(y * tilesAtZoom * EXTENT)
    ];
}
function onBoundary(p, p1, p2) {
    var x1 = p[0] - p1[0];
    var y1 = p[1] - p1[1];
    var x2 = p[0] - p2[0];
    var y2 = p[1] - p2[1];
    return x1 * y2 - x2 * y1 === 0 && x1 * x2 <= 0 && y1 * y2 <= 0;
}
function rayIntersect(p, p1, p2) {
    return p1[1] > p[1] !== p2[1] > p[1] && p[0] < (p2[0] - p1[0]) * (p[1] - p1[1]) / (p2[1] - p1[1]) + p1[0];
}
// ray casting algorithm for detecting if point is in polygon
function pointWithinPolygon(point, rings) {
    var inside = false;
    for (var i = 0, len = rings.length; i < len; i++) {
        var ring = rings[i];
        for (var j = 0, len2 = ring.length; j < len2 - 1; j++) {
            if (onBoundary(point, ring[j], ring[j + 1]))
                { return false; }
            if (rayIntersect(point, ring[j], ring[j + 1]))
                { inside = !inside; }
        }
    }
    return inside;
}
function pointWithinPolygons(point, polygons) {
    for (var i = 0; i < polygons.length; i++) {
        if (pointWithinPolygon(point, polygons[i]))
            { return true; }
    }
    return false;
}
function perp(v1, v2) {
    return v1[0] * v2[1] - v1[1] * v2[0];
}
// check if p1 and p2 are in different sides of line segment q1->q2
function twoSided(p1, p2, q1, q2) {
    // q1->p1 (x1, y1), q1->p2 (x2, y2), q1->q2 (x3, y3)
    var x1 = p1[0] - q1[0];
    var y1 = p1[1] - q1[1];
    var x2 = p2[0] - q1[0];
    var y2 = p2[1] - q1[1];
    var x3 = q2[0] - q1[0];
    var y3 = q2[1] - q1[1];
    var det1 = x1 * y3 - x3 * y1;
    var det2 = x2 * y3 - x3 * y2;
    if (det1 > 0 && det2 < 0 || det1 < 0 && det2 > 0)
        { return true; }
    return false;
}
// a, b are end points for line segment1, c and d are end points for line segment2
function lineIntersectLine(a, b, c, d) {
    // check if two segments are parallel or not
    // precondition is end point a, b is inside polygon, if line a->b is
    // parallel to polygon edge c->d, then a->b won't intersect with c->d
    var vectorP = [
        b[0] - a[0],
        b[1] - a[1]
    ];
    var vectorQ = [
        d[0] - c[0],
        d[1] - c[1]
    ];
    if (perp(vectorQ, vectorP) === 0)
        { return false; }
    // If lines are intersecting with each other, the relative location should be:
    // a and b lie in different sides of segment c->d
    // c and d lie in different sides of segment a->b
    if (twoSided(a, b, c, d) && twoSided(c, d, a, b))
        { return true; }
    return false;
}
function lineIntersectPolygon(p1, p2, polygon) {
    for (var i = 0, list = polygon; i < list.length; i += 1) {
        // loop through every edge of the ring
        var ring = list[i];

        for (var j = 0; j < ring.length - 1; ++j) {
            if (lineIntersectLine(p1, p2, ring[j], ring[j + 1])) {
                return true;
            }
        }
    }
    return false;
}
function lineStringWithinPolygon(line, polygon) {
    // First, check if geometry points of line segments are all inside polygon
    for (var i = 0; i < line.length; ++i) {
        if (!pointWithinPolygon(line[i], polygon)) {
            return false;
        }
    }
    // Second, check if there is line segment intersecting polygon edge
    for (var i$1 = 0; i$1 < line.length - 1; ++i$1) {
        if (lineIntersectPolygon(line[i$1], line[i$1 + 1], polygon)) {
            return false;
        }
    }
    return true;
}
function lineStringWithinPolygons(line, polygons) {
    for (var i = 0; i < polygons.length; i++) {
        if (lineStringWithinPolygon(line, polygons[i]))
            { return true; }
    }
    return false;
}
function getTilePolygon(coordinates, bbox, canonical) {
    var polygon = [];
    for (var i = 0; i < coordinates.length; i++) {
        var ring = [];
        for (var j = 0; j < coordinates[i].length; j++) {
            var coord = getTileCoordinates(coordinates[i][j], canonical);
            updateBBox(bbox, coord);
            ring.push(coord);
        }
        polygon.push(ring);
    }
    return polygon;
}
function getTilePolygons(coordinates, bbox, canonical) {
    var polygons = [];
    for (var i = 0; i < coordinates.length; i++) {
        var polygon = getTilePolygon(coordinates[i], bbox, canonical);
        polygons.push(polygon);
    }
    return polygons;
}
function updatePoint(p, bbox, polyBBox, worldSize) {
    if (p[0] < polyBBox[0] || p[0] > polyBBox[2]) {
        var halfWorldSize = worldSize * 0.5;
        var shift = p[0] - polyBBox[0] > halfWorldSize ? -worldSize : polyBBox[0] - p[0] > halfWorldSize ? worldSize : 0;
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
    var worldSize = Math.pow(2, canonical.z) * EXTENT;
    var shifts = [
        canonical.x * EXTENT,
        canonical.y * EXTENT
    ];
    var tilePoints = [];
    if (!geometry)
        { return tilePoints; }
    for (var i$1 = 0, list$1 = geometry; i$1 < list$1.length; i$1 += 1) {
        var points = list$1[i$1];

        for (var i = 0, list = points; i < list.length; i += 1) {
            var point = list[i];

            var p = [
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
    var worldSize = Math.pow(2, canonical.z) * EXTENT;
    var shifts = [
        canonical.x * EXTENT,
        canonical.y * EXTENT
    ];
    var tileLines = [];
    if (!geometry)
        { return tileLines; }
    for (var i$1 = 0, list$1 = geometry; i$1 < list$1.length; i$1 += 1) {
        var line = list$1[i$1];

        var tileLine = [];
        for (var i = 0, list = line; i < list.length; i += 1) {
            var point = list[i];

            var p = [
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
        for (var i$3 = 0, list$3 = tileLines; i$3 < list$3.length; i$3 += 1) {
            var line$1 = list$3[i$3];

            for (var i$2 = 0, list$2 = line$1; i$2 < list$2.length; i$2 += 1) {
                var p$1 = list$2[i$2];

                updatePoint(p$1, lineBBox, polyBBox, worldSize);
            }
        }
    }
    return tileLines;
}
function pointsWithinPolygons(ctx, polygonGeometry) {
    var pointBBox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    var polyBBox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    var canonical = ctx.canonicalID();
    if (!canonical) {
        return false;
    }
    if (polygonGeometry.type === 'Polygon') {
        var tilePolygon = getTilePolygon(polygonGeometry.coordinates, polyBBox, canonical);
        var tilePoints = getTilePoints(ctx.geometry(), pointBBox, polyBBox, canonical);
        if (!boxWithinBox(pointBBox, polyBBox))
            { return false; }
        for (var i = 0, list = tilePoints; i < list.length; i += 1) {
            var point = list[i];

            if (!pointWithinPolygon(point, tilePolygon))
                { return false; }
        }
    }
    if (polygonGeometry.type === 'MultiPolygon') {
        var tilePolygons = getTilePolygons(polygonGeometry.coordinates, polyBBox, canonical);
        var tilePoints$1 = getTilePoints(ctx.geometry(), pointBBox, polyBBox, canonical);
        if (!boxWithinBox(pointBBox, polyBBox))
            { return false; }
        for (var i$1 = 0, list$1 = tilePoints$1; i$1 < list$1.length; i$1 += 1) {
            var point$1 = list$1[i$1];

            if (!pointWithinPolygons(point$1, tilePolygons))
                { return false; }
        }
    }
    return true;
}
function linesWithinPolygons(ctx, polygonGeometry) {
    var lineBBox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    var polyBBox = [
        Infinity,
        Infinity,
        -Infinity,
        -Infinity
    ];
    var canonical = ctx.canonicalID();
    if (!canonical) {
        return false;
    }
    if (polygonGeometry.type === 'Polygon') {
        var tilePolygon = getTilePolygon(polygonGeometry.coordinates, polyBBox, canonical);
        var tileLines = getTileLines(ctx.geometry(), lineBBox, polyBBox, canonical);
        if (!boxWithinBox(lineBBox, polyBBox))
            { return false; }
        for (var i = 0, list = tileLines; i < list.length; i += 1) {
            var line = list[i];

            if (!lineStringWithinPolygon(line, tilePolygon))
                { return false; }
        }
    }
    if (polygonGeometry.type === 'MultiPolygon') {
        var tilePolygons = getTilePolygons(polygonGeometry.coordinates, polyBBox, canonical);
        var tileLines$1 = getTileLines(ctx.geometry(), lineBBox, polyBBox, canonical);
        if (!boxWithinBox(lineBBox, polyBBox))
            { return false; }
        for (var i$1 = 0, list$1 = tileLines$1; i$1 < list$1.length; i$1 += 1) {
            var line$1 = list$1[i$1];

            if (!lineStringWithinPolygons(line$1, tilePolygons))
                { return false; }
        }
    }
    return true;
}
var Within = function Within(geojson, geometries) {
    this.type = BooleanType;
    this.geojson = geojson;
    this.geometries = geometries;
};
Within.parse = function parse (args, context) {
    if (args.length !== 2)
        { return context.error(("'within' expression requires exactly one argument, but found " + (args.length - 1) + " instead.")); }
    if (isValue(args[1])) {
        var geojson = args[1];
        if (geojson.type === 'FeatureCollection') {
            for (var i = 0; i < geojson.features.length; ++i) {
                var type = geojson.features[i].geometry.type;
                if (type === 'Polygon' || type === 'MultiPolygon') {
                    return new Within(geojson, geojson.features[i].geometry);
                }
            }
        } else if (geojson.type === 'Feature') {
            var type$1 = geojson.geometry.type;
            if (type$1 === 'Polygon' || type$1 === 'MultiPolygon') {
                return new Within(geojson, geojson.geometry);
            }
        } else if (geojson.type === 'Polygon' || geojson.type === 'MultiPolygon') {
            return new Within(geojson, geojson);
        }
    }
    return context.error("'within' expression requires valid geojson object that contains polygon geometry type.");
};
Within.prototype.evaluate = function evaluate (ctx) {
    if (ctx.geometry() != null && ctx.canonicalID() != null) {
        if (ctx.geometryType() === 'Point') {
            return pointsWithinPolygons(ctx, this.geometries);
        } else if (ctx.geometryType() === 'LineString') {
            return linesWithinPolygons(ctx, this.geometries);
        }
    }
    return false;
};
Within.prototype.eachChild = function eachChild () {
};
Within.prototype.outputDefined = function outputDefined () {
    return true;
};
Within.prototype.serialize = function serialize () {
    return [
        'within',
        this.geojson
    ];
};

//      
function isFeatureConstant(e) {
    if (e instanceof CompoundExpression) {
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
    if (e instanceof Within) {
        return false;
    }
    var result = true;
    e.eachChild(function (arg) {
        if (result && !isFeatureConstant(arg)) {
            result = false;
        }
    });
    return result;
}
function isStateConstant(e) {
    if (e instanceof CompoundExpression) {
        if (e.name === 'feature-state') {
            return false;
        }
    }
    var result = true;
    e.eachChild(function (arg) {
        if (result && !isStateConstant(arg)) {
            result = false;
        }
    });
    return result;
}
function isGlobalPropertyConstant(e, properties) {
    if (e instanceof CompoundExpression && properties.indexOf(e.name) >= 0) {
        return false;
    }
    var result = true;
    e.eachChild(function (arg) {
        if (result && !isGlobalPropertyConstant(arg, properties)) {
            result = false;
        }
    });
    return result;
}

//      
var Var = function Var(name, boundExpression) {
    this.type = boundExpression.type;
    this.name = name;
    this.boundExpression = boundExpression;
};
Var.parse = function parse (args, context) {
    if (args.length !== 2 || typeof args[1] !== 'string')
        { return context.error("'var' expression requires exactly one string literal argument."); }
    var name = args[1];
    if (!context.scope.has(name)) {
        return context.error(("Unknown variable \"" + name + "\". Make sure \"" + name + "\" has been bound in an enclosing \"let\" expression before using it."), 1);
    }
    return new Var(name, context.scope.get(name));
};
Var.prototype.evaluate = function evaluate (ctx) {
    return this.boundExpression.evaluate(ctx);
};
Var.prototype.eachChild = function eachChild () {
};
Var.prototype.outputDefined = function outputDefined () {
    return false;
};
Var.prototype.serialize = function serialize () {
    return [
        'var',
        this.name
    ];
};

//      
/**
 * State associated parsing at a given point in an expression tree.
 * @private
 */
var ParsingContext = function ParsingContext(registry, path, expectedType, scope, errors) {
    if ( path === void 0 ) path = [];
    if ( scope === void 0 ) scope = new Scope();
    if ( errors === void 0 ) errors = [];

    this.registry = registry;
    this.path = path;
    this.key = path.map(function (part) { return ("[" + part + "]"); }).join('');
    this.scope = scope;
    this.errors = errors;
    this.expectedType = expectedType;
};
/**
 * @param expr the JSON expression to parse
 * @param index the optional argument index if this expression is an argument of a parent expression that's being parsed
 * @param options
 * @param options.omitTypeAnnotations set true to omit inferred type annotations.  Caller beware: with this option set, the parsed expression's type will NOT satisfy `expectedType` if it would normally be wrapped in an inferred annotation.
 * @private
 */
ParsingContext.prototype.parse = function parse (expr, index, expectedType, bindings, options) {
        if ( options === void 0 ) options = {};

    if (index) {
        return this.concat(index, expectedType, bindings)._parse(expr, options);
    }
    return this._parse(expr, options);
};
ParsingContext.prototype._parse = function _parse (expr, options) {
    if (expr === null || typeof expr === 'string' || typeof expr === 'boolean' || typeof expr === 'number') {
        expr = [
            'literal',
            expr
        ];
    }
    function annotate(parsed, type, typeAnnotation) {
        if (typeAnnotation === 'assert') {
            return new Assertion(type, [parsed]);
        } else if (typeAnnotation === 'coerce') {
            return new Coercion(type, [parsed]);
        } else {
            return parsed;
        }
    }
    if (Array.isArray(expr)) {
        if (expr.length === 0) {
            return this.error("Expected an array with at least one element. If you wanted a literal array, use [\"literal\", []].");
        }
        var op = expr[0];
        if (typeof op !== 'string') {
            this.error(("Expression name must be a string, but found " + (typeof op) + " instead. If you wanted a literal array, use [\"literal\", [...]]."), 0);
            return null;
        }
        var Expr = this.registry[op];
        if (Expr) {
            var parsed = Expr.parse(expr, this);
            if (!parsed)
                { return null; }
            if (this.expectedType) {
                var expected = this.expectedType;
                var actual = parsed.type;
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
            if (!(parsed instanceof Literal) && parsed.type.kind !== 'resolvedImage' && isConstant(parsed)) {
                var ec = new EvaluationContext();
                try {
                    parsed = new Literal(parsed.type, parsed.evaluate(ec));
                } catch (e) {
                    this.error(e.message);
                    return null;
                }
            }
            return parsed;
        }
        return this.error(("Unknown expression \"" + op + "\". If you wanted a literal array, use [\"literal\", [...]]."), 0);
    } else if (typeof expr === 'undefined') {
        return this.error("'undefined' value invalid. Use null instead.");
    } else if (typeof expr === 'object') {
        return this.error("Bare objects invalid. Use [\"literal\", {...}] instead.");
    } else {
        return this.error(("Expected an array, but found " + (typeof expr) + " instead."));
    }
};
/**
 * Returns a copy of this context suitable for parsing the subexpression at
 * index `index`, optionally appending to 'let' binding map.
 *
 * Note that `errors` property, intended for collecting errors while
 * parsing, is copied by reference rather than cloned.
 * @private
 */
ParsingContext.prototype.concat = function concat (index, expectedType, bindings) {
    var path = typeof index === 'number' ? this.path.concat(index) : this.path;
    var scope = bindings ? this.scope.concat(bindings) : this.scope;
    return new ParsingContext(this.registry, path, expectedType || null, scope, this.errors);
};
/**
 * Push a parsing (or type checking) error into the `this.errors`
 * @param error The message
 * @param keys Optionally specify the source of the error at a child
 * of the current expression at `this.key`.
 * @private
 */
ParsingContext.prototype.error = function error (error$1) {
        var keys = [], len = arguments.length - 1;
        while ( len-- > 0 ) keys[ len ] = arguments[ len + 1 ];

    var key = "" + (this.key) + (keys.map(function (k) { return ("[" + k + "]"); }).join(''));
    this.errors.push(new ParsingError(key, error$1));
};
/**
 * Returns null if `t` is a subtype of `expected`; otherwise returns an
 * error message and also pushes it to `this.errors`.
 */
ParsingContext.prototype.checkSubtype = function checkSubtype$1 (expected, t) {
    var error = checkSubtype(expected, t);
    if (error)
        { this.error(error); }
    return error;
};
function isConstant(expression) {
    if (expression instanceof Var) {
        return isConstant(expression.boundExpression);
    } else if (expression instanceof CompoundExpression && expression.name === 'error') {
        return false;
    } else if (expression instanceof CollatorExpression) {
        // Although the results of a Collator expression with fixed arguments
        // generally shouldn't change between executions, we can't serialize them
        // as constant expressions because results change based on environment.
        return false;
    } else if (expression instanceof Within) {
        return false;
    }
    var isTypeAnnotation = expression instanceof Coercion || expression instanceof Assertion;
    var childrenConstant = true;
    expression.eachChild(function (child) {
        // We can _almost_ assume that if `expressions` children are constant,
        // they would already have been evaluated to Literal values when they
        // were parsed.  Type annotations are the exception, because they might
        // have been inferred and added after a child was parsed.
        // So we recurse into isConstant() for the children of type annotations,
        // but otherwise simply check whether they are Literals.
        if (isTypeAnnotation) {
            childrenConstant = childrenConstant && isConstant(child);
        } else {
            childrenConstant = childrenConstant && child instanceof Literal;
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
    var lastIndex = stops.length - 1;
    var lowerIndex = 0;
    var upperIndex = lastIndex;
    var currentIndex = 0;
    var currentValue, nextValue;
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
            throw new RuntimeError('Input is not a number.');
        }
    }
    return 0;
}

//      
var Step = function Step(type, input, stops) {
    this.type = type;
    this.input = input;
    this.labels = [];
    this.outputs = [];
    for (var i = 0, list = stops; i < list.length; i += 1) {
        var ref = list[i];
        var label = ref[0];
        var expression = ref[1];

        this.labels.push(label);
        this.outputs.push(expression);
    }
};
Step.parse = function parse (args, context) {
    if (args.length - 1 < 4) {
        return context.error(("Expected at least 4 arguments, but found only " + (args.length - 1) + "."));
    }
    if ((args.length - 1) % 2 !== 0) {
        return context.error("Expected an even number of arguments.");
    }
    var input = context.parse(args[1], 1, NumberType);
    if (!input)
        { return null; }
    var stops = [];
    var outputType = null;
    if (context.expectedType && context.expectedType.kind !== 'value') {
        outputType = context.expectedType;
    }
    for (var i = 1; i < args.length; i += 2) {
        var label = i === 1 ? -Infinity : args[i];
        var value = args[i + 1];
        var labelKey = i;
        var valueKey = i + 1;
        if (typeof label !== 'number') {
            return context.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey);
        }
        if (stops.length && stops[stops.length - 1][0] >= label) {
            return context.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', labelKey);
        }
        var parsed = context.parse(value, valueKey, outputType);
        if (!parsed)
            { return null; }
        outputType = outputType || parsed.type;
        stops.push([
            label,
            parsed
        ]);
    }
    return new Step(outputType, input, stops);
};
Step.prototype.evaluate = function evaluate (ctx) {
    var labels = this.labels;
    var outputs = this.outputs;
    if (labels.length === 1) {
        return outputs[0].evaluate(ctx);
    }
    var value = this.input.evaluate(ctx);
    if (value <= labels[0]) {
        return outputs[0].evaluate(ctx);
    }
    var stopCount = labels.length;
    if (value >= labels[stopCount - 1]) {
        return outputs[stopCount - 1].evaluate(ctx);
    }
    var index = findStopLessThanOrEqualTo(labels, value);
    return outputs[index].evaluate(ctx);
};
Step.prototype.eachChild = function eachChild (fn) {
    fn(this.input);
    for (var i = 0, list = this.outputs; i < list.length; i += 1) {
        var expression = list[i];

            fn(expression);
    }
};
Step.prototype.outputDefined = function outputDefined () {
    return this.outputs.every(function (out) { return out.outputDefined(); });
};
Step.prototype.serialize = function serialize () {
    var serialized = [
        'step',
        this.input.serialize()
    ];
    for (var i = 0; i < this.labels.length; i++) {
        if (i > 0) {
            serialized.push(this.labels[i]);
        }
        serialized.push(this.outputs[i].serialize());
    }
    return serialized;
};

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
        { epsilon = 0.000001; }
    var t0, t1, t2, x2, i;
    // First try a few iterations of Newton's method -- normally very fast.
    for (t2 = x, i = 0; i < 8; i++) {
        x2 = this.sampleCurveX(t2) - x;
        if (Math.abs(x2) < epsilon)
            { return t2; }
        var d2 = this.sampleCurveDerivativeX(t2);
        if (Math.abs(d2) < 0.000001)
            { break; }
        t2 = t2 - x2 / d2;
    }
    // Fall back to the bisection method for reliability.
    t0 = 0;
    t1 = 1;
    t2 = x;
    if (t2 < t0)
        { return t0; }
    if (t2 > t1)
        { return t1; }
    while (t0 < t1) {
        x2 = this.sampleCurveX(t2);
        if (Math.abs(x2 - x) < epsilon)
            { return t2; }
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

//      
function number(a, b, t) {
    return a * (1 - t) + b * t;
}
function color(from, to, t) {
    return new Color(number(from.r, to.r, t), number(from.g, to.g, t), number(from.b, to.b, t), number(from.a, to.a, t));
}
function array(from, to, t) {
    return from.map(function (d, i) {
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
var Xn = 0.95047,
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
    var b = rgb2xyz(rgbColor.r), a = rgb2xyz(rgbColor.g), l = rgb2xyz(rgbColor.b), x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn), y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.072175 * l) / Yn), z = xyz2lab((0.0193339 * b + 0.119192 * a + 0.9503041 * l) / Zn);
    return {
        l: 116 * y - 16,
        a: 500 * (x - y),
        b: 200 * (y - z),
        alpha: rgbColor.a
    };
}
function labToRgb(labColor) {
    var y = (labColor.l + 16) / 116, x = isNaN(labColor.a) ? y : y + labColor.a / 500, z = isNaN(labColor.b) ? y : y - labColor.b / 200;
    y = Yn * lab2xyz(y);
    x = Xn * lab2xyz(x);
    z = Zn * lab2xyz(z);
    return new Color(xyz2rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
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
    var ref = rgbToLab(rgbColor);
    var l = ref.l;
    var a = ref.a;
    var b = ref.b;
    var h = Math.atan2(b, a) * rad2deg;
    return {
        h: h < 0 ? h + 360 : h,
        c: Math.sqrt(a * a + b * b),
        l: l,
        alpha: rgbColor.a
    };
}
function hclToRgb(hclColor) {
    var h = hclColor.h * deg2rad$1, c = hclColor.c, l = hclColor.l;
    return labToRgb({
        l: l,
        a: Math.cos(h) * c,
        b: Math.sin(h) * c,
        alpha: hclColor.alpha
    });
}
function interpolateHue(a, b, t) {
    var d = b - a;
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
var lab = {
    forward: rgbToLab,
    reverse: labToRgb,
    interpolate: interpolateLab
};
var hcl = {
    forward: rgbToHcl,
    reverse: hclToRgb,
    interpolate: interpolateHcl
};

//      
var Interpolate = function Interpolate(type, operator, interpolation, input, stops) {
    this.type = type;
    this.operator = operator;
    this.interpolation = interpolation;
    this.input = input;
    this.labels = [];
    this.outputs = [];
    for (var i = 0, list = stops; i < list.length; i += 1) {
        var ref = list[i];
        var label = ref[0];
        var expression = ref[1];

        this.labels.push(label);
        this.outputs.push(expression);
    }
};
Interpolate.interpolationFactor = function interpolationFactor (interpolation, input, lower, upper) {
    var t = 0;
    if (interpolation.name === 'exponential') {
        t = exponentialInterpolation(input, interpolation.base, lower, upper);
    } else if (interpolation.name === 'linear') {
        t = exponentialInterpolation(input, 1, lower, upper);
    } else if (interpolation.name === 'cubic-bezier') {
        var c = interpolation.controlPoints;
        var ub = new unitbezier(c[0], c[1], c[2], c[3]);
        t = ub.solve(exponentialInterpolation(input, 1, lower, upper));
    }
    return t;
};
Interpolate.parse = function parse (args, context) {
    var operator = args[0];
        var interpolation = args[1];
        var input = args[2];
        var rest = args.slice(3);
    if (!Array.isArray(interpolation) || interpolation.length === 0) {
        return context.error("Expected an interpolation type expression.", 1);
    }
    if (interpolation[0] === 'linear') {
        interpolation = { name: 'linear' };
    } else if (interpolation[0] === 'exponential') {
        var base = interpolation[1];
        if (typeof base !== 'number')
            { return context.error("Exponential interpolation requires a numeric base.", 1, 1); }
        interpolation = {
            name: 'exponential',
            base: base
        };
    } else if (interpolation[0] === 'cubic-bezier') {
        var controlPoints = interpolation.slice(1);
        if (controlPoints.length !== 4 || controlPoints.some(function (t) { return typeof t !== 'number' || t < 0 || t > 1; })) {
            return context.error('Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.', 1);
        }
        interpolation = {
            name: 'cubic-bezier',
            controlPoints: controlPoints
        };
    } else {
        return context.error(("Unknown interpolation type " + (String(interpolation[0]))), 1, 0);
    }
    if (args.length - 1 < 4) {
        return context.error(("Expected at least 4 arguments, but found only " + (args.length - 1) + "."));
    }
    if ((args.length - 1) % 2 !== 0) {
        return context.error("Expected an even number of arguments.");
    }
    input = context.parse(input, 2, NumberType);
    if (!input)
        { return null; }
    var stops = [];
    var outputType = null;
    if (operator === 'interpolate-hcl' || operator === 'interpolate-lab') {
        outputType = ColorType;
    } else if (context.expectedType && context.expectedType.kind !== 'value') {
        outputType = context.expectedType;
    }
    for (var i = 0; i < rest.length; i += 2) {
        var label = rest[i];
        var value = rest[i + 1];
        var labelKey = i + 3;
        var valueKey = i + 4;
        if (typeof label !== 'number') {
            return context.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey);
        }
        if (stops.length && stops[stops.length - 1][0] >= label) {
            return context.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', labelKey);
        }
        var parsed = context.parse(value, valueKey, outputType);
        if (!parsed)
            { return null; }
        outputType = outputType || parsed.type;
        stops.push([
            label,
            parsed
        ]);
    }
    if (outputType.kind !== 'number' && outputType.kind !== 'color' && !(outputType.kind === 'array' && outputType.itemType.kind === 'number' && typeof outputType.N === 'number')) {
        return context.error(("Type " + (toString$1(outputType)) + " is not interpolatable."));
    }
    return new Interpolate(outputType, operator, interpolation, input, stops);
};
Interpolate.prototype.evaluate = function evaluate (ctx) {
    var labels = this.labels;
    var outputs = this.outputs;
    if (labels.length === 1) {
        return outputs[0].evaluate(ctx);
    }
    var value = this.input.evaluate(ctx);
    if (value <= labels[0]) {
        return outputs[0].evaluate(ctx);
    }
    var stopCount = labels.length;
    if (value >= labels[stopCount - 1]) {
        return outputs[stopCount - 1].evaluate(ctx);
    }
    var index = findStopLessThanOrEqualTo(labels, value);
    var lower = labels[index];
    var upper = labels[index + 1];
    var t = Interpolate.interpolationFactor(this.interpolation, value, lower, upper);
    var outputLower = outputs[index].evaluate(ctx);
    var outputUpper = outputs[index + 1].evaluate(ctx);
    if (this.operator === 'interpolate') {
        return interpolate[this.type.kind.toLowerCase()](outputLower, outputUpper, t);// eslint-disable-line import/namespace
    } else if (this.operator === 'interpolate-hcl') {
        return hcl.reverse(hcl.interpolate(hcl.forward(outputLower), hcl.forward(outputUpper), t));
    } else {
        return lab.reverse(lab.interpolate(lab.forward(outputLower), lab.forward(outputUpper), t));
    }
};
Interpolate.prototype.eachChild = function eachChild (fn) {
    fn(this.input);
    for (var i = 0, list = this.outputs; i < list.length; i += 1) {
        var expression = list[i];

            fn(expression);
    }
};
Interpolate.prototype.outputDefined = function outputDefined () {
    return this.outputs.every(function (out) { return out.outputDefined(); });
};
Interpolate.prototype.serialize = function serialize () {
    var interpolation;
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
    var serialized = [
        this.operator,
        interpolation,
        this.input.serialize()
    ];
    for (var i = 0; i < this.labels.length; i++) {
        serialized.push(this.labels[i], this.outputs[i].serialize());
    }
    return serialized;
};
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
    var difference = upperValue - lowerValue;
    var progress = input - lowerValue;
    if (difference === 0) {
        return 0;
    } else if (base === 1) {
        return progress / difference;
    } else {
        return (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
    }
}

var Coalesce = function Coalesce(type, args) {
    this.type = type;
    this.args = args;
};
Coalesce.parse = function parse (args, context) {
    if (args.length < 2) {
        return context.error('Expectected at least one argument.');
    }
    var outputType = null;
    var expectedType = context.expectedType;
    if (expectedType && expectedType.kind !== 'value') {
        outputType = expectedType;
    }
    var parsedArgs = [];
    for (var i = 0, list = args.slice(1); i < list.length; i += 1) {
        var arg = list[i];

            var parsed = context.parse(arg, 1 + parsedArgs.length, outputType, undefined, { typeAnnotation: 'omit' });
        if (!parsed)
            { return null; }
        outputType = outputType || parsed.type;
        parsedArgs.push(parsed);
    }
    // Above, we parse arguments without inferred type annotation so that
    // they don't produce a runtime error for `null` input, which would
    // preempt the desired null-coalescing behavior.
    // Thus, if any of our arguments would have needed an annotation, we
    // need to wrap the enclosing coalesce expression with it instead.
    var needsAnnotation = expectedType && parsedArgs.some(function (arg) { return checkSubtype(expectedType, arg.type); });
    return needsAnnotation ? new Coalesce(ValueType, parsedArgs) : new Coalesce(outputType, parsedArgs);
};
Coalesce.prototype.evaluate = function evaluate (ctx) {
    var result = null;
    var argCount = 0;
    var firstImage;
    for (var i = 0, list = this.args; i < list.length; i += 1) {
        var arg = list[i];

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
            { break; }
    }
    return result;
};
Coalesce.prototype.eachChild = function eachChild (fn) {
    this.args.forEach(fn);
};
Coalesce.prototype.outputDefined = function outputDefined () {
    return this.args.every(function (arg) { return arg.outputDefined(); });
};
Coalesce.prototype.serialize = function serialize () {
    var serialized = ['coalesce'];
    this.eachChild(function (child) {
        serialized.push(child.serialize());
    });
    return serialized;
};

//      
var Let = function Let(bindings, result) {
    this.type = result.type;
    this.bindings = [].concat(bindings);
    this.result = result;
};
Let.prototype.evaluate = function evaluate (ctx) {
    return this.result.evaluate(ctx);
};
Let.prototype.eachChild = function eachChild (fn) {
    for (var i = 0, list = this.bindings; i < list.length; i += 1) {
        var binding = list[i];

            fn(binding[1]);
    }
    fn(this.result);
};
Let.parse = function parse (args, context) {
    if (args.length < 4)
        { return context.error(("Expected at least 3 arguments, but found " + (args.length - 1) + " instead.")); }
    var bindings = [];
    for (var i = 1; i < args.length - 1; i += 2) {
        var name = args[i];
        if (typeof name !== 'string') {
            return context.error(("Expected string, but found " + (typeof name) + " instead."), i);
        }
        if (/[^a-zA-Z0-9_]/.test(name)) {
            return context.error("Variable names must contain only alphanumeric characters or '_'.", i);
        }
        var value = context.parse(args[i + 1], i + 1);
        if (!value)
            { return null; }
        bindings.push([
            name,
            value
        ]);
    }
    var result = context.parse(args[args.length - 1], args.length - 1, context.expectedType, bindings);
    if (!result)
        { return null; }
    return new Let(bindings, result);
};
Let.prototype.outputDefined = function outputDefined () {
    return this.result.outputDefined();
};
Let.prototype.serialize = function serialize () {
    var serialized = ['let'];
    for (var i = 0, list = this.bindings; i < list.length; i += 1) {
        var ref = list[i];
            var name = ref[0];
            var expr = ref[1];

            serialized.push(name, expr.serialize());
    }
    serialized.push(this.result.serialize());
    return serialized;
};

//      
var At = function At(type, index, input) {
    this.type = type;
    this.index = index;
    this.input = input;
};
At.parse = function parse (args, context) {
    if (args.length !== 3)
        { return context.error(("Expected 2 arguments, but found " + (args.length - 1) + " instead.")); }
    var index = context.parse(args[1], 1, NumberType);
    var input = context.parse(args[2], 2, array$1(context.expectedType || ValueType));
    if (!index || !input)
        { return null; }
    var t = input.type;
    return new At(t.itemType, index, input);
};
At.prototype.evaluate = function evaluate (ctx) {
    var index = this.index.evaluate(ctx);
    var array = this.input.evaluate(ctx);
    if (index < 0) {
        throw new RuntimeError(("Array index out of bounds: " + index + " < 0."));
    }
    if (index >= array.length) {
        throw new RuntimeError(("Array index out of bounds: " + index + " > " + (array.length - 1) + "."));
    }
    if (index !== Math.floor(index)) {
        throw new RuntimeError(("Array index must be an integer, but found " + index + " instead."));
    }
    return array[index];
};
At.prototype.eachChild = function eachChild (fn) {
    fn(this.index);
    fn(this.input);
};
At.prototype.outputDefined = function outputDefined () {
    return false;
};
At.prototype.serialize = function serialize () {
    return [
        'at',
        this.index.serialize(),
        this.input.serialize()
    ];
};

//      
var In = function In(needle, haystack) {
    this.type = BooleanType;
    this.needle = needle;
    this.haystack = haystack;
};
In.parse = function parse (args, context) {
    if (args.length !== 3) {
        return context.error(("Expected 2 arguments, but found " + (args.length - 1) + " instead."));
    }
    var needle = context.parse(args[1], 1, ValueType);
    var haystack = context.parse(args[2], 2, ValueType);
    if (!needle || !haystack)
        { return null; }
    if (!isValidType(needle.type, [
            BooleanType,
            StringType,
            NumberType,
            NullType,
            ValueType
        ])) {
        return context.error(("Expected first argument to be of type boolean, string, number or null, but found " + (toString$1(needle.type)) + " instead"));
    }
    return new In(needle, haystack);
};
In.prototype.evaluate = function evaluate (ctx) {
    var needle = this.needle.evaluate(ctx);
    var haystack = this.haystack.evaluate(ctx);
    if (haystack == null)
        { return false; }
    if (!isValidNativeType(needle, [
            'boolean',
            'string',
            'number',
            'null'
        ])) {
        throw new RuntimeError(("Expected first argument to be of type boolean, string, number or null, but found " + (toString$1(typeOf(needle))) + " instead."));
    }
    if (!isValidNativeType(haystack, [
            'string',
            'array'
        ])) {
        throw new RuntimeError(("Expected second argument to be of type array or string, but found " + (toString$1(typeOf(haystack))) + " instead."));
    }
    return haystack.indexOf(needle) >= 0;
};
In.prototype.eachChild = function eachChild (fn) {
    fn(this.needle);
    fn(this.haystack);
};
In.prototype.outputDefined = function outputDefined () {
    return true;
};
In.prototype.serialize = function serialize () {
    return [
        'in',
        this.needle.serialize(),
        this.haystack.serialize()
    ];
};

//      
var IndexOf = function IndexOf(needle, haystack, fromIndex) {
    this.type = NumberType;
    this.needle = needle;
    this.haystack = haystack;
    this.fromIndex = fromIndex;
};
IndexOf.parse = function parse (args, context) {
    if (args.length <= 2 || args.length >= 5) {
        return context.error(("Expected 3 or 4 arguments, but found " + (args.length - 1) + " instead."));
    }
    var needle = context.parse(args[1], 1, ValueType);
    var haystack = context.parse(args[2], 2, ValueType);
    if (!needle || !haystack)
        { return null; }
    if (!isValidType(needle.type, [
            BooleanType,
            StringType,
            NumberType,
            NullType,
            ValueType
        ])) {
        return context.error(("Expected first argument to be of type boolean, string, number or null, but found " + (toString$1(needle.type)) + " instead"));
    }
    if (args.length === 4) {
        var fromIndex = context.parse(args[3], 3, NumberType);
        if (!fromIndex)
            { return null; }
        return new IndexOf(needle, haystack, fromIndex);
    } else {
        return new IndexOf(needle, haystack);
    }
};
IndexOf.prototype.evaluate = function evaluate (ctx) {
    var needle = this.needle.evaluate(ctx);
    var haystack = this.haystack.evaluate(ctx);
    if (!isValidNativeType(needle, [
            'boolean',
            'string',
            'number',
            'null'
        ])) {
        throw new RuntimeError(("Expected first argument to be of type boolean, string, number or null, but found " + (toString$1(typeOf(needle))) + " instead."));
    }
    if (!isValidNativeType(haystack, [
            'string',
            'array'
        ])) {
        throw new RuntimeError(("Expected second argument to be of type array or string, but found " + (toString$1(typeOf(haystack))) + " instead."));
    }
    if (this.fromIndex) {
        var fromIndex = this.fromIndex.evaluate(ctx);
        return haystack.indexOf(needle, fromIndex);
    }
    return haystack.indexOf(needle);
};
IndexOf.prototype.eachChild = function eachChild (fn) {
    fn(this.needle);
    fn(this.haystack);
    if (this.fromIndex) {
        fn(this.fromIndex);
    }
};
IndexOf.prototype.outputDefined = function outputDefined () {
    return false;
};
IndexOf.prototype.serialize = function serialize () {
    if (this.fromIndex != null && this.fromIndex !== undefined) {
        var fromIndex = this.fromIndex.serialize();
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
};

// Map input label values to output expression index
var Match = function Match(inputType, outputType, input, cases, outputs, otherwise) {
    this.inputType = inputType;
    this.type = outputType;
    this.input = input;
    this.cases = cases;
    this.outputs = outputs;
    this.otherwise = otherwise;
};
Match.parse = function parse (args, context) {
    if (args.length < 5)
        { return context.error(("Expected at least 4 arguments, but found only " + (args.length - 1) + ".")); }
    if (args.length % 2 !== 1)
        { return context.error("Expected an even number of arguments."); }
    var inputType;
    var outputType;
    if (context.expectedType && context.expectedType.kind !== 'value') {
        outputType = context.expectedType;
    }
    var cases = {};
    var outputs = [];
    for (var i = 2; i < args.length - 1; i += 2) {
        var labels = args[i];
        var value = args[i + 1];
        if (!Array.isArray(labels)) {
            labels = [labels];
        }
        var labelContext = context.concat(i);
        if (labels.length === 0) {
            return labelContext.error('Expected at least one branch label.');
        }
        for (var i$1 = 0, list = labels; i$1 < list.length; i$1 += 1) {
            var label = list[i$1];

                if (typeof label !== 'number' && typeof label !== 'string') {
                return labelContext.error("Branch labels must be numbers or strings.");
            } else if (typeof label === 'number' && Math.abs(label) > Number.MAX_SAFE_INTEGER) {
                return labelContext.error(("Branch labels must be integers no larger than " + (Number.MAX_SAFE_INTEGER) + "."));
            } else if (typeof label === 'number' && Math.floor(label) !== label) {
                return labelContext.error("Numeric branch labels must be integer values.");
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
        var result = context.parse(value, i, outputType);
        if (!result)
            { return null; }
        outputType = outputType || result.type;
        outputs.push(result);
    }
    var input = context.parse(args[1], 1, ValueType);
    if (!input)
        { return null; }
    var otherwise = context.parse(args[args.length - 1], args.length - 1, outputType);
    if (!otherwise)
        { return null; }
    if (input.type.kind !== 'value' && context.concat(1).checkSubtype(inputType, input.type)) {
        return null;
    }
    return new Match(inputType, outputType, input, cases, outputs, otherwise);
};
Match.prototype.evaluate = function evaluate (ctx) {
    var input = this.input.evaluate(ctx);
    var output = typeOf(input) === this.inputType && this.outputs[this.cases[input]] || this.otherwise;
    return output.evaluate(ctx);
};
Match.prototype.eachChild = function eachChild (fn) {
    fn(this.input);
    this.outputs.forEach(fn);
    fn(this.otherwise);
};
Match.prototype.outputDefined = function outputDefined () {
    return this.outputs.every(function (out) { return out.outputDefined(); }) && this.otherwise.outputDefined();
};
Match.prototype.serialize = function serialize () {
        var this$1$1 = this;

    var serialized = [
        'match',
        this.input.serialize()
    ];
    // Sort so serialization has an arbitrary defined order, even though
    // branch order doesn't affect evaluation
    var sortedLabels = Object.keys(this.cases).sort();
    // Group branches by unique match expression to support condensed
    // serializations of the form [case1, case2, ...] -> matchExpression
    var groupedByOutput = [];
    var outputLookup = {};
    // lookup index into groupedByOutput for a given output expression
    for (var i = 0, list = sortedLabels; i < list.length; i += 1) {
        var label = list[i];

            var outputIndex = outputLookup[this.cases[label]];
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
    var coerceLabel = function (label) { return this$1$1.inputType.kind === 'number' ? Number(label) : label; };
    for (var i$1 = 0, list$1 = groupedByOutput; i$1 < list$1.length; i$1 += 1) {
        var ref = list$1[i$1];
            var outputIndex = ref[0];
            var labels = ref[1];

            if (labels.length === 1) {
            // Only a single label matches this output expression
            serialized.push(coerceLabel(labels[0]));
        } else {
            // Array of literal labels pointing to this output expression
            serialized.push(labels.map(coerceLabel));
        }
        serialized.push(this.outputs[outputIndex$1].serialize());
    }
    serialized.push(this.otherwise.serialize());
    return serialized;
};

var Case = function Case(type, branches, otherwise) {
    this.type = type;
    this.branches = branches;
    this.otherwise = otherwise;
};
Case.parse = function parse (args, context) {
    if (args.length < 4)
        { return context.error(("Expected at least 3 arguments, but found only " + (args.length - 1) + ".")); }
    if (args.length % 2 !== 0)
        { return context.error("Expected an odd number of arguments."); }
    var outputType;
    if (context.expectedType && context.expectedType.kind !== 'value') {
        outputType = context.expectedType;
    }
    var branches = [];
    for (var i = 1; i < args.length - 1; i += 2) {
        var test = context.parse(args[i], i, BooleanType);
        if (!test)
            { return null; }
        var result = context.parse(args[i + 1], i + 1, outputType);
        if (!result)
            { return null; }
        branches.push([
            test,
            result
        ]);
        outputType = outputType || result.type;
    }
    var otherwise = context.parse(args[args.length - 1], args.length - 1, outputType);
    if (!otherwise)
        { return null; }
    return new Case(outputType, branches, otherwise);
};
Case.prototype.evaluate = function evaluate (ctx) {
    for (var i = 0, list = this.branches; i < list.length; i += 1) {
        var ref = list[i];
            var test = ref[0];
            var expression = ref[1];

            if (test.evaluate(ctx)) {
            return expression.evaluate(ctx);
        }
    }
    return this.otherwise.evaluate(ctx);
};
Case.prototype.eachChild = function eachChild (fn) {
    for (var i = 0, list = this.branches; i < list.length; i += 1) {
        var ref = list[i];
            var test = ref[0];
            var expression = ref[1];

            fn(test);
        fn(expression);
    }
    fn(this.otherwise);
};
Case.prototype.outputDefined = function outputDefined () {
    return this.branches.every(function (ref) {
            ref[0];
            var out = ref[1];

            return out.outputDefined();
        }) && this.otherwise.outputDefined();
};
Case.prototype.serialize = function serialize () {
    var serialized = ['case'];
    this.eachChild(function (child) {
        serialized.push(child.serialize());
    });
    return serialized;
};

//      
var Slice = function Slice(type, input, beginIndex, endIndex) {
    this.type = type;
    this.input = input;
    this.beginIndex = beginIndex;
    this.endIndex = endIndex;
};
Slice.parse = function parse (args, context) {
    if (args.length <= 2 || args.length >= 5) {
        return context.error(("Expected 3 or 4 arguments, but found " + (args.length - 1) + " instead."));
    }
    var input = context.parse(args[1], 1, ValueType);
    var beginIndex = context.parse(args[2], 2, NumberType);
    if (!input || !beginIndex)
        { return null; }
    if (!isValidType(input.type, [
            array$1(ValueType),
            StringType,
            ValueType
        ])) {
        return context.error(("Expected first argument to be of type array or string, but found " + (toString$1(input.type)) + " instead"));
    }
    if (args.length === 4) {
        var endIndex = context.parse(args[3], 3, NumberType);
        if (!endIndex)
            { return null; }
        return new Slice(input.type, input, beginIndex, endIndex);
    } else {
        return new Slice(input.type, input, beginIndex);
    }
};
Slice.prototype.evaluate = function evaluate (ctx) {
    var input = this.input.evaluate(ctx);
    var beginIndex = this.beginIndex.evaluate(ctx);
    if (!isValidNativeType(input, [
            'string',
            'array'
        ])) {
        throw new RuntimeError(("Expected first argument to be of type array or string, but found " + (toString$1(typeOf(input))) + " instead."));
    }
    if (this.endIndex) {
        var endIndex = this.endIndex.evaluate(ctx);
        return input.slice(beginIndex, endIndex);
    }
    return input.slice(beginIndex);
};
Slice.prototype.eachChild = function eachChild (fn) {
    fn(this.input);
    fn(this.beginIndex);
    if (this.endIndex) {
        fn(this.endIndex);
    }
};
Slice.prototype.outputDefined = function outputDefined () {
    return false;
};
Slice.prototype.serialize = function serialize () {
    if (this.endIndex != null && this.endIndex !== undefined) {
        var endIndex = this.endIndex.serialize();
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
};

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
    var isOrderComparison = op !== '==' && op !== '!=';
    return /*@__PURE__*/(function () {
        function Comparison(lhs, rhs, collator) {
            this.type = BooleanType;
            this.lhs = lhs;
            this.rhs = rhs;
            this.collator = collator;
            this.hasUntypedArgument = lhs.type.kind === 'value' || rhs.type.kind === 'value';
        }
        Comparison.parse = function parse (args, context) {
            if (args.length !== 3 && args.length !== 4)
                { return context.error("Expected two or three arguments."); }
            var op = args[0];
            var lhs = context.parse(args[1], 1, ValueType);
            if (!lhs)
                { return null; }
            if (!isComparableType(op, lhs.type)) {
                return context.concat(1).error(("\"" + op + "\" comparisons are not supported for type '" + (toString$1(lhs.type)) + "'."));
            }
            var rhs = context.parse(args[2], 2, ValueType);
            if (!rhs)
                { return null; }
            if (!isComparableType(op, rhs.type)) {
                return context.concat(2).error(("\"" + op + "\" comparisons are not supported for type '" + (toString$1(rhs.type)) + "'."));
            }
            if (lhs.type.kind !== rhs.type.kind && lhs.type.kind !== 'value' && rhs.type.kind !== 'value') {
                return context.error(("Cannot compare types '" + (toString$1(lhs.type)) + "' and '" + (toString$1(rhs.type)) + "'."));
            }
            if (isOrderComparison) {
                // typing rules specific to less/greater than operators
                if (lhs.type.kind === 'value' && rhs.type.kind !== 'value') {
                    // (value, T)
                    lhs = new Assertion(rhs.type, [lhs]);
                } else if (lhs.type.kind !== 'value' && rhs.type.kind === 'value') {
                    // (T, value)
                    rhs = new Assertion(lhs.type, [rhs]);
                }
            }
            var collator = null;
            if (args.length === 4) {
                if (lhs.type.kind !== 'string' && rhs.type.kind !== 'string' && lhs.type.kind !== 'value' && rhs.type.kind !== 'value') {
                    return context.error("Cannot use collator to compare non-string types.");
                }
                collator = context.parse(args[3], 3, CollatorType);
                if (!collator)
                    { return null; }
            }
            return new Comparison(lhs, rhs, collator);
        };
        Comparison.prototype.evaluate = function evaluate (ctx) {
            var lhs = this.lhs.evaluate(ctx);
            var rhs = this.rhs.evaluate(ctx);
            if (isOrderComparison && this.hasUntypedArgument) {
                var lt = typeOf(lhs);
                var rt = typeOf(rhs);
                // check that type is string or number, and equal
                if (lt.kind !== rt.kind || !(lt.kind === 'string' || lt.kind === 'number')) {
                    throw new RuntimeError(("Expected arguments for \"" + op + "\" to be (string, string) or (number, number), but found (" + (lt.kind) + ", " + (rt.kind) + ") instead."));
                }
            }
            if (this.collator && !isOrderComparison && this.hasUntypedArgument) {
                var lt$1 = typeOf(lhs);
                var rt$1 = typeOf(rhs);
                if (lt$1.kind !== 'string' || rt$1.kind !== 'string') {
                    return compareBasic(ctx, lhs, rhs);
                }
            }
            return this.collator ? compareWithCollator(ctx, lhs, rhs, this.collator.evaluate(ctx)) : compareBasic(ctx, lhs, rhs);
        };
        Comparison.prototype.eachChild = function eachChild (fn) {
            fn(this.lhs);
            fn(this.rhs);
            if (this.collator) {
                fn(this.collator);
            }
        };
        Comparison.prototype.outputDefined = function outputDefined () {
            return true;
        };
        Comparison.prototype.serialize = function serialize () {
            var serialized = [op];
            this.eachChild(function (child) {
                serialized.push(child.serialize());
            });
            return serialized;
        };

        return Comparison;
    }());
}
var Equals = makeComparison('==', eq, eqCollate);
var NotEquals = makeComparison('!=', neq, neqCollate);
var LessThan = makeComparison('<', lt, ltCollate);
var GreaterThan = makeComparison('>', gt, gtCollate);
var LessThanOrEqual = makeComparison('<=', lteq, lteqCollate);
var GreaterThanOrEqual = makeComparison('>=', gteq, gteqCollate);

//      
var NumberFormat = function NumberFormat(number, locale, currency, minFractionDigits, maxFractionDigits) {
    this.type = StringType;
    this.number = number;
    this.locale = locale;
    this.currency = currency;
    this.minFractionDigits = minFractionDigits;
    this.maxFractionDigits = maxFractionDigits;
};
NumberFormat.parse = function parse (args, context) {
    if (args.length !== 3)
        { return context.error("Expected two arguments."); }
    var number = context.parse(args[1], 1, NumberType);
    if (!number)
        { return null; }
    var options = args[2];
    if (typeof options !== 'object' || Array.isArray(options))
        { return context.error("NumberFormat options argument must be an object."); }
    var locale = null;
    if (options['locale']) {
        locale = context.parse(options['locale'], 1, StringType);
        if (!locale)
            { return null; }
    }
    var currency = null;
    if (options['currency']) {
        currency = context.parse(options['currency'], 1, StringType);
        if (!currency)
            { return null; }
    }
    var minFractionDigits = null;
    if (options['min-fraction-digits']) {
        minFractionDigits = context.parse(options['min-fraction-digits'], 1, NumberType);
        if (!minFractionDigits)
            { return null; }
    }
    var maxFractionDigits = null;
    if (options['max-fraction-digits']) {
        maxFractionDigits = context.parse(options['max-fraction-digits'], 1, NumberType);
        if (!maxFractionDigits)
            { return null; }
    }
    return new NumberFormat(number, locale, currency, minFractionDigits, maxFractionDigits);
};
NumberFormat.prototype.evaluate = function evaluate (ctx) {
    return new Intl.NumberFormat(this.locale ? this.locale.evaluate(ctx) : [], {
        style: this.currency ? 'currency' : 'decimal',
        currency: this.currency ? this.currency.evaluate(ctx) : undefined,
        minimumFractionDigits: this.minFractionDigits ? this.minFractionDigits.evaluate(ctx) : undefined,
        maximumFractionDigits: this.maxFractionDigits ? this.maxFractionDigits.evaluate(ctx) : undefined
    }).format(this.number.evaluate(ctx));
};
NumberFormat.prototype.eachChild = function eachChild (fn) {
    fn(this.number);
    if (this.locale) {
        fn(this.locale);
    }
    if (this.currency) {
        fn(this.currency);
    }
    if (this.minFractionDigits) {
        fn(this.minFractionDigits);
    }
    if (this.maxFractionDigits) {
        fn(this.maxFractionDigits);
    }
};
NumberFormat.prototype.outputDefined = function outputDefined () {
    return false;
};
NumberFormat.prototype.serialize = function serialize () {
    var options = {};
    if (this.locale) {
        options['locale'] = this.locale.serialize();
    }
    if (this.currency) {
        options['currency'] = this.currency.serialize();
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
};

//      
var Length = function Length(input) {
    this.type = NumberType;
    this.input = input;
};
Length.parse = function parse (args, context) {
    if (args.length !== 2)
        { return context.error(("Expected 1 argument, but found " + (args.length - 1) + " instead.")); }
    var input = context.parse(args[1], 1);
    if (!input)
        { return null; }
    if (input.type.kind !== 'array' && input.type.kind !== 'string' && input.type.kind !== 'value')
        { return context.error(("Expected argument of type string or array, but found " + (toString$1(input.type)) + " instead.")); }
    return new Length(input);
};
Length.prototype.evaluate = function evaluate (ctx) {
    var input = this.input.evaluate(ctx);
    if (typeof input === 'string') {
        return input.length;
    } else if (Array.isArray(input)) {
        return input.length;
    } else {
        throw new RuntimeError(("Expected value to be of type string or array, but found " + (toString$1(typeOf(input))) + " instead."));
    }
};
Length.prototype.eachChild = function eachChild (fn) {
    fn(this.input);
};
Length.prototype.outputDefined = function outputDefined () {
    return false;
};
Length.prototype.serialize = function serialize () {
    var serialized = ['length'];
    this.eachChild(function (child) {
        serialized.push(child.serialize());
    });
    return serialized;
};

//      
var expressions = {
    // special forms
    '==': Equals,
    '!=': NotEquals,
    '>': GreaterThan,
    '<': LessThan,
    '>=': GreaterThanOrEqual,
    '<=': LessThanOrEqual,
    'array': Assertion,
    'at': At,
    'boolean': Assertion,
    'case': Case,
    'coalesce': Coalesce,
    'collator': CollatorExpression,
    'format': FormatExpression,
    'image': ImageExpression,
    'in': In,
    'index-of': IndexOf,
    'interpolate': Interpolate,
    'interpolate-hcl': Interpolate,
    'interpolate-lab': Interpolate,
    'length': Length,
    'let': Let,
    'literal': Literal,
    'match': Match,
    'number': Assertion,
    'number-format': NumberFormat,
    'object': Assertion,
    'slice': Slice,
    'step': Step,
    'string': Assertion,
    'to-boolean': Coercion,
    'to-color': Coercion,
    'to-number': Coercion,
    'to-string': Coercion,
    'var': Var,
    'within': Within
};
function rgba(ctx, ref) {
    var r = ref[0];
    var g = ref[1];
    var b = ref[2];
    var a = ref[3];

    r = r.evaluate(ctx);
    g = g.evaluate(ctx);
    b = b.evaluate(ctx);
    var alpha = a ? a.evaluate(ctx) : 1;
    var error = validateRGBA(r, g, b, alpha);
    if (error)
        { throw new RuntimeError(error); }
    return new Color(r / 255 * alpha, g / 255 * alpha, b / 255 * alpha, alpha);
}
function has(key, obj) {
    return key in obj;
}
function get(key, obj) {
    var v = obj[key];
    return typeof v === 'undefined' ? null : v;
}
function binarySearch(v, a, i, j) {
    while (i <= j) {
        var m = i + j >> 1;
        if (a[m] === v)
            { return true; }
        if (a[m] > v)
            { j = m - 1; }
        else
            { i = m + 1; }
    }
    return false;
}
function varargs(type) {
    return { type: type };
}
CompoundExpression.register(expressions, {
    'error': [
        ErrorType,
        [StringType],
        function (ctx, ref) {
            var v = ref[0];

            throw new RuntimeError(v.evaluate(ctx));
        }
    ],
    'typeof': [
        StringType,
        [ValueType],
        function (ctx, ref) {
            var v = ref[0];

            return toString$1(typeOf(v.evaluate(ctx)));
}
    ],
    'to-rgba': [
        array$1(NumberType, 4),
        [ColorType],
        function (ctx, ref) {
            var v = ref[0];

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
                function (ctx, ref) {
                    var key = ref[0];

                    return has(key.evaluate(ctx), ctx.properties());
}
            ],
            [
                [
                    StringType,
                    ObjectType
                ],
                function (ctx, ref) {
                    var key = ref[0];
                    var obj = ref[1];

                    return has(key.evaluate(ctx), obj.evaluate(ctx));
}
            ]
        ]
    },
    'get': {
        type: ValueType,
        overloads: [
            [
                [StringType],
                function (ctx, ref) {
                    var key = ref[0];

                    return get(key.evaluate(ctx), ctx.properties());
}
            ],
            [
                [
                    StringType,
                    ObjectType
                ],
                function (ctx, ref) {
                    var key = ref[0];
                    var obj = ref[1];

                    return get(key.evaluate(ctx), obj.evaluate(ctx));
}
            ]
        ]
    },
    'feature-state': [
        ValueType,
        [StringType],
        function (ctx, ref) {
            var key = ref[0];

            return get(key.evaluate(ctx), ctx.featureState || {});
}
    ],
    'properties': [
        ObjectType,
        [],
        function (ctx) { return ctx.properties(); }
    ],
    'geometry-type': [
        StringType,
        [],
        function (ctx) { return ctx.geometryType(); }
    ],
    'id': [
        ValueType,
        [],
        function (ctx) { return ctx.id(); }
    ],
    'zoom': [
        NumberType,
        [],
        function (ctx) { return ctx.globals.zoom; }
    ],
    'pitch': [
        NumberType,
        [],
        function (ctx) { return ctx.globals.pitch || 0; }
    ],
    'distance-from-center': [
        NumberType,
        [],
        function (ctx) { return ctx.distanceFromCenter(); }
    ],
    'heatmap-density': [
        NumberType,
        [],
        function (ctx) { return ctx.globals.heatmapDensity || 0; }
    ],
    'line-progress': [
        NumberType,
        [],
        function (ctx) { return ctx.globals.lineProgress || 0; }
    ],
    'sky-radial-progress': [
        NumberType,
        [],
        function (ctx) { return ctx.globals.skyRadialProgress || 0; }
    ],
    'accumulated': [
        ValueType,
        [],
        function (ctx) { return ctx.globals.accumulated === undefined ? null : ctx.globals.accumulated; }
    ],
    '+': [
        NumberType,
        varargs(NumberType),
        function (ctx, args) {
            var result = 0;
            for (var i = 0, list = args; i < list.length; i += 1) {
                var arg = list[i];

                result += arg.evaluate(ctx);
            }
            return result;
        }
    ],
    '*': [
        NumberType,
        varargs(NumberType),
        function (ctx, args) {
            var result = 1;
            for (var i = 0, list = args; i < list.length; i += 1) {
                var arg = list[i];

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
                function (ctx, ref) {
                    var a = ref[0];
                    var b = ref[1];

                    return a.evaluate(ctx) - b.evaluate(ctx);
}
            ],
            [
                [NumberType],
                function (ctx, ref) {
                    var a = ref[0];

                    return -a.evaluate(ctx);
}
            ]
        ]
    },
    '/': [
        NumberType,
        [
            NumberType,
            NumberType
        ],
        function (ctx, ref) {
            var a = ref[0];
            var b = ref[1];

            return a.evaluate(ctx) / b.evaluate(ctx);
}
    ],
    '%': [
        NumberType,
        [
            NumberType,
            NumberType
        ],
        function (ctx, ref) {
            var a = ref[0];
            var b = ref[1];

            return a.evaluate(ctx) % b.evaluate(ctx);
}
    ],
    'ln2': [
        NumberType,
        [],
        function () { return Math.LN2; }
    ],
    'pi': [
        NumberType,
        [],
        function () { return Math.PI; }
    ],
    'e': [
        NumberType,
        [],
        function () { return Math.E; }
    ],
    '^': [
        NumberType,
        [
            NumberType,
            NumberType
        ],
        function (ctx, ref) {
            var b = ref[0];
            var e = ref[1];

            return Math.pow(b.evaluate(ctx), e.evaluate(ctx));
}
    ],
    'sqrt': [
        NumberType,
        [NumberType],
        function (ctx, ref) {
            var x = ref[0];

            return Math.sqrt(x.evaluate(ctx));
}
    ],
    'log10': [
        NumberType,
        [NumberType],
        function (ctx, ref) {
            var n = ref[0];

            return Math.log(n.evaluate(ctx)) / Math.LN10;
}
    ],
    'ln': [
        NumberType,
        [NumberType],
        function (ctx, ref) {
            var n = ref[0];

            return Math.log(n.evaluate(ctx));
}
    ],
    'log2': [
        NumberType,
        [NumberType],
        function (ctx, ref) {
            var n = ref[0];

            return Math.log(n.evaluate(ctx)) / Math.LN2;
}
    ],
    'sin': [
        NumberType,
        [NumberType],
        function (ctx, ref) {
            var n = ref[0];

            return Math.sin(n.evaluate(ctx));
}
    ],
    'cos': [
        NumberType,
        [NumberType],
        function (ctx, ref) {
            var n = ref[0];

            return Math.cos(n.evaluate(ctx));
}
    ],
    'tan': [
        NumberType,
        [NumberType],
        function (ctx, ref) {
            var n = ref[0];

            return Math.tan(n.evaluate(ctx));
}
    ],
    'asin': [
        NumberType,
        [NumberType],
        function (ctx, ref) {
            var n = ref[0];

            return Math.asin(n.evaluate(ctx));
}
    ],
    'acos': [
        NumberType,
        [NumberType],
        function (ctx, ref) {
            var n = ref[0];

            return Math.acos(n.evaluate(ctx));
}
    ],
    'atan': [
        NumberType,
        [NumberType],
        function (ctx, ref) {
            var n = ref[0];

            return Math.atan(n.evaluate(ctx));
}
    ],
    'min': [
        NumberType,
        varargs(NumberType),
        function (ctx, args) { return Math.min.apply(Math, args.map(function (arg) { return arg.evaluate(ctx); })); }
    ],
    'max': [
        NumberType,
        varargs(NumberType),
        function (ctx, args) { return Math.max.apply(Math, args.map(function (arg) { return arg.evaluate(ctx); })); }
    ],
    'abs': [
        NumberType,
        [NumberType],
        function (ctx, ref) {
            var n = ref[0];

            return Math.abs(n.evaluate(ctx));
}
    ],
    'round': [
        NumberType,
        [NumberType],
        function (ctx, ref) {
            var n = ref[0];

            var v = n.evaluate(ctx);
            // Javascript's Math.round() rounds towards +Infinity for halfway
            // values, even when they're negative. It's more common to round
            // away from 0 (e.g., this is what python and C++ do)
            return v < 0 ? -Math.round(-v) : Math.round(v);
        }
    ],
    'floor': [
        NumberType,
        [NumberType],
        function (ctx, ref) {
            var n = ref[0];

            return Math.floor(n.evaluate(ctx));
}
    ],
    'ceil': [
        NumberType,
        [NumberType],
        function (ctx, ref) {
            var n = ref[0];

            return Math.ceil(n.evaluate(ctx));
}
    ],
    'filter-==': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        function (ctx, ref) {
            var k = ref[0];
            var v = ref[1];

            return ctx.properties()[k.value] === v.value;
}
    ],
    'filter-id-==': [
        BooleanType,
        [ValueType],
        function (ctx, ref) {
            var v = ref[0];

            return ctx.id() === v.value;
}
    ],
    'filter-type-==': [
        BooleanType,
        [StringType],
        function (ctx, ref) {
            var v = ref[0];

            return ctx.geometryType() === v.value;
}
    ],
    'filter-<': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        function (ctx, ref) {
            var k = ref[0];
            var v = ref[1];

            var a = ctx.properties()[k.value];
            var b = v.value;
            return typeof a === typeof b && a < b;
        }
    ],
    'filter-id-<': [
        BooleanType,
        [ValueType],
        function (ctx, ref) {
            var v = ref[0];

            var a = ctx.id();
            var b = v.value;
            return typeof a === typeof b && a < b;
        }
    ],
    'filter->': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        function (ctx, ref) {
            var k = ref[0];
            var v = ref[1];

            var a = ctx.properties()[k.value];
            var b = v.value;
            return typeof a === typeof b && a > b;
        }
    ],
    'filter-id->': [
        BooleanType,
        [ValueType],
        function (ctx, ref) {
            var v = ref[0];

            var a = ctx.id();
            var b = v.value;
            return typeof a === typeof b && a > b;
        }
    ],
    'filter-<=': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        function (ctx, ref) {
            var k = ref[0];
            var v = ref[1];

            var a = ctx.properties()[k.value];
            var b = v.value;
            return typeof a === typeof b && a <= b;
        }
    ],
    'filter-id-<=': [
        BooleanType,
        [ValueType],
        function (ctx, ref) {
            var v = ref[0];

            var a = ctx.id();
            var b = v.value;
            return typeof a === typeof b && a <= b;
        }
    ],
    'filter->=': [
        BooleanType,
        [
            StringType,
            ValueType
        ],
        function (ctx, ref) {
            var k = ref[0];
            var v = ref[1];

            var a = ctx.properties()[k.value];
            var b = v.value;
            return typeof a === typeof b && a >= b;
        }
    ],
    'filter-id->=': [
        BooleanType,
        [ValueType],
        function (ctx, ref) {
            var v = ref[0];

            var a = ctx.id();
            var b = v.value;
            return typeof a === typeof b && a >= b;
        }
    ],
    'filter-has': [
        BooleanType,
        [ValueType],
        function (ctx, ref) {
            var k = ref[0];

            return k.value in ctx.properties();
}
    ],
    'filter-has-id': [
        BooleanType,
        [],
        function (ctx) { return ctx.id() !== null && ctx.id() !== undefined; }
    ],
    'filter-type-in': [
        BooleanType,
        [array$1(StringType)],
        function (ctx, ref) {
            var v = ref[0];

            return v.value.indexOf(ctx.geometryType()) >= 0;
}
    ],
    'filter-id-in': [
        BooleanType,
        [array$1(ValueType)],
        function (ctx, ref) {
            var v = ref[0];

            return v.value.indexOf(ctx.id()) >= 0;
}
    ],
    'filter-in-small': [
        BooleanType,
        [
            StringType,
            array$1(ValueType)
        ],
        // assumes v is an array literal
        function (ctx, ref) {
            var k = ref[0];
            var v = ref[1];

            return v.value.indexOf(ctx.properties()[k.value]) >= 0;
}
    ],
    'filter-in-large': [
        BooleanType,
        [
            StringType,
            array$1(ValueType)
        ],
        // assumes v is a array literal with values sorted in ascending order and of a single type
        function (ctx, ref) {
            var k = ref[0];
            var v = ref[1];

            return binarySearch(ctx.properties()[k.value], v.value, 0, v.value.length - 1);
}
    ],
    'all': {
        type: BooleanType,
        overloads: [
            [
                [
                    BooleanType,
                    BooleanType
                ],
                function (ctx, ref) {
                    var a = ref[0];
                    var b = ref[1];

                    return a.evaluate(ctx) && b.evaluate(ctx);
}
            ],
            [
                varargs(BooleanType),
                function (ctx, args) {
                    for (var i = 0, list = args; i < list.length; i += 1) {
                        var arg = list[i];

                        if (!arg.evaluate(ctx))
                            { return false; }
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
                function (ctx, ref) {
                    var a = ref[0];
                    var b = ref[1];

                    return a.evaluate(ctx) || b.evaluate(ctx);
}
            ],
            [
                varargs(BooleanType),
                function (ctx, args) {
                    for (var i = 0, list = args; i < list.length; i += 1) {
                        var arg = list[i];

                        if (arg.evaluate(ctx))
                            { return true; }
                    }
                    return false;
                }
            ]
        ]
    },
    '!': [
        BooleanType,
        [BooleanType],
        function (ctx, ref) {
            var b = ref[0];

            return !b.evaluate(ctx);
}
    ],
    'is-supported-script': [
        BooleanType,
        [StringType],
        // At parse time this will always return true, so we need to exclude this expression with isGlobalPropertyConstant
        function (ctx, ref) {
            var s = ref[0];

            var isSupportedScript = ctx.globals && ctx.globals.isSupportedScript;
            if (isSupportedScript) {
                return isSupportedScript(s.evaluate(ctx));
            }
            return true;
        }
    ],
    'upcase': [
        StringType,
        [StringType],
        function (ctx, ref) {
            var s = ref[0];

            return s.evaluate(ctx).toUpperCase();
}
    ],
    'downcase': [
        StringType,
        [StringType],
        function (ctx, ref) {
            var s = ref[0];

            return s.evaluate(ctx).toLowerCase();
}
    ],
    'concat': [
        StringType,
        varargs(ValueType),
        function (ctx, args) { return args.map(function (arg) { return toString(arg.evaluate(ctx)); }).join(''); }
    ],
    'resolved-locale': [
        StringType,
        [CollatorType],
        function (ctx, ref) {
            var collator = ref[0];

            return collator.evaluate(ctx).resolvedLocale();
}
    ]
});

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
        value: value
    };
}
function error(value) {
    return {
        result: 'error',
        value: value
    };
}

//      
function supportsPropertyExpression(spec) {
    return spec['property-type'] === 'data-driven' || spec['property-type'] === 'cross-faded-data-driven';
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

var StyleExpression = function StyleExpression(expression, propertySpec) {
    this.expression = expression;
    this._warningHistory = {};
    this._evaluator = new EvaluationContext();
    this._defaultValue = propertySpec ? getDefaultValue(propertySpec) : null;
    this._enumValues = propertySpec && propertySpec.type === 'enum' ? propertySpec.values : null;
};
StyleExpression.prototype.evaluateWithoutErrorHandling = function evaluateWithoutErrorHandling (globals, feature, featureState, canonical, availableImages, formattedSection, featureTileCoord, featureDistanceData) {
    this._evaluator.globals = globals;
    this._evaluator.feature = feature;
    this._evaluator.featureState = featureState;
    this._evaluator.canonical = canonical || null;
    this._evaluator.availableImages = availableImages || null;
    this._evaluator.formattedSection = formattedSection;
    this._evaluator.featureTileCoord = featureTileCoord || null;
    this._evaluator.featureDistanceData = featureDistanceData || null;
    return this.expression.evaluate(this._evaluator);
};
StyleExpression.prototype.evaluate = function evaluate (globals, feature, featureState, canonical, availableImages, formattedSection, featureTileCoord, featureDistanceData) {
    this._evaluator.globals = globals;
    this._evaluator.feature = feature || null;
    this._evaluator.featureState = featureState || null;
    this._evaluator.canonical = canonical || null;
    this._evaluator.availableImages = availableImages || null;
    this._evaluator.formattedSection = formattedSection || null;
    this._evaluator.featureTileCoord = featureTileCoord || null;
    this._evaluator.featureDistanceData = featureDistanceData || null;
    try {
        var val = this.expression.evaluate(this._evaluator);
        // eslint-disable-next-line no-self-compare
        if (val === null || val === undefined || typeof val === 'number' && val !== val) {
            return this._defaultValue;
        }
        if (this._enumValues && !(val in this._enumValues)) {
            throw new RuntimeError(("Expected value to be one of " + (Object.keys(this._enumValues).map(function (v) { return JSON.stringify(v); }).join(', ')) + ", but found " + (JSON.stringify(val)) + " instead."));
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
};
function isExpression(expression) {
    return Array.isArray(expression) && expression.length > 0 && typeof expression[0] === 'string' && expression[0] in expressions;
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
    var parser = new ParsingContext(expressions, [], propertySpec ? getExpectedType(propertySpec) : undefined);
    // For string-valued properties, coerce to string at the top level rather than asserting.
    var parsed = parser.parse(expression, undefined, undefined, undefined, propertySpec && propertySpec.type === 'string' ? { typeAnnotation: 'coerce' } : undefined);
    if (!parsed) {
        return error(parser.errors);
    }
    return success(new StyleExpression(parsed, propertySpec));
}
var ZoomConstantExpression = function ZoomConstantExpression(kind, expression) {
    this.kind = kind;
    this._styleExpression = expression;
    this.isStateDependent = kind !== 'constant' && !isStateConstant(expression.expression);
};
ZoomConstantExpression.prototype.evaluateWithoutErrorHandling = function evaluateWithoutErrorHandling (globals, feature, featureState, canonical, availableImages, formattedSection) {
    return this._styleExpression.evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection);
};
ZoomConstantExpression.prototype.evaluate = function evaluate (globals, feature, featureState, canonical, availableImages, formattedSection) {
    return this._styleExpression.evaluate(globals, feature, featureState, canonical, availableImages, formattedSection);
};
var ZoomDependentExpression = function ZoomDependentExpression(kind, expression, zoomStops, interpolationType) {
    this.kind = kind;
    this.zoomStops = zoomStops;
    this._styleExpression = expression;
    this.isStateDependent = kind !== 'camera' && !isStateConstant(expression.expression);
    this.interpolationType = interpolationType;
};
ZoomDependentExpression.prototype.evaluateWithoutErrorHandling = function evaluateWithoutErrorHandling (globals, feature, featureState, canonical, availableImages, formattedSection) {
    return this._styleExpression.evaluateWithoutErrorHandling(globals, feature, featureState, canonical, availableImages, formattedSection);
};
ZoomDependentExpression.prototype.evaluate = function evaluate (globals, feature, featureState, canonical, availableImages, formattedSection) {
    return this._styleExpression.evaluate(globals, feature, featureState, canonical, availableImages, formattedSection);
};
ZoomDependentExpression.prototype.interpolationFactor = function interpolationFactor (input, lower, upper) {
    if (this.interpolationType) {
        return Interpolate.interpolationFactor(this.interpolationType, input, lower, upper);
    } else {
        return 0;
    }
};
function createPropertyExpression(expression, propertySpec) {
    expression = createExpression(expression, propertySpec);
    if (expression.result === 'error') {
        return expression;
    }
    var parsed = expression.value.expression;
    var isFeatureConstant$1 = isFeatureConstant(parsed);
    if (!isFeatureConstant$1 && !supportsPropertyExpression(propertySpec)) {
        return error([new ParsingError('', 'data expressions not supported')]);
    }
    var isZoomConstant = isGlobalPropertyConstant(parsed, [
        'zoom',
        'pitch',
        'distance-from-center'
    ]);
    if (!isZoomConstant && !supportsZoomExpression(propertySpec)) {
        return error([new ParsingError('', 'zoom expressions not supported')]);
    }
    var zoomCurve = findZoomCurve(parsed);
    if (!zoomCurve && !isZoomConstant) {
        return error([new ParsingError('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
    } else if (zoomCurve instanceof ParsingError) {
        return error([zoomCurve]);
    } else if (zoomCurve instanceof Interpolate && !supportsInterpolation(propertySpec)) {
        return error([new ParsingError('', '"interpolate" expressions cannot be used with this property')]);
    }
    if (!zoomCurve) {
        return success(isFeatureConstant$1 ? new ZoomConstantExpression('constant', expression.value) : new ZoomConstantExpression('source', expression.value));
    }
    var interpolationType = zoomCurve instanceof Interpolate ? zoomCurve.interpolation : undefined;
    return success(isFeatureConstant$1 ? new ZoomDependentExpression('camera', expression.value, zoomCurve.labels, interpolationType) : new ZoomDependentExpression('composite', expression.value, zoomCurve.labels, interpolationType));
}
// Zoom-dependent expressions may only use ["zoom"] as the input to a top-level "step" or "interpolate"
// expression (collectively referred to as a "curve"). The curve may be wrapped in one or more "let" or
// "coalesce" expressions.
function findZoomCurve(expression) {
    var result = null;
    if (expression instanceof Let) {
        result = findZoomCurve(expression.result);
    } else if (expression instanceof Coalesce) {
        for (var i = 0, list = expression.args; i < list.length; i += 1) {
            var arg = list[i];

            result = findZoomCurve(arg);
            if (result) {
                break;
            }
        }
    } else if ((expression instanceof Step || expression instanceof Interpolate) && expression.input instanceof CompoundExpression && expression.input.name === 'zoom') {
        result = expression;
    }
    if (result instanceof ParsingError) {
        return result;
    }
    expression.eachChild(function (child) {
        var childResult = findZoomCurve(child);
        if (childResult instanceof ParsingError) {
            result = childResult;
        } else if (!result && childResult) {
            result = new ParsingError('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.');
        } else if (result && childResult && result !== childResult) {
            result = new ParsingError('', 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.');
        }
    });
    return result;
}
function getExpectedType(spec) {
    var types = {
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
        return new Color(0, 0, 0, 0);
    } else if (spec.type === 'color') {
        return Color.parse(spec.default) || null;
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
        var unbundledValue = {};
        for (var key in value) {
            unbundledValue[key] = deepUnbundle(value[key]);
        }
        return unbundledValue;
    }
    return unbundle(value);
}

var spec = {"$version":8,"$root":{"version":{"required":true,"type":"enum","values":[8]},"name":{"type":"string"},"metadata":{"type":"*"},"center":{"type":"array","value":"number"},"zoom":{"type":"number"},"bearing":{"type":"number","default":0,"period":360,"units":"degrees"},"pitch":{"type":"number","default":0,"units":"degrees"},"light":{"type":"light"},"terrain":{"type":"terrain"},"fog":{"type":"fog"},"sources":{"required":true,"type":"sources"},"sprite":{"type":"string"},"glyphs":{"type":"string"},"transition":{"type":"transition"},"projection":{"type":"projection"},"layers":{"required":true,"type":"array","value":"layer"}},"sources":{"*":{"type":"source"}},"source":["source_vector","source_raster","source_raster_dem","source_geojson","source_video","source_image"],"source_vector":{"type":{"required":true,"type":"enum","values":{"vector":{}}},"url":{"type":"string"},"tiles":{"type":"array","value":"string"},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.051129,180,85.051129]},"scheme":{"type":"enum","values":{"xyz":{},"tms":{}},"default":"xyz"},"minzoom":{"type":"number","default":0},"maxzoom":{"type":"number","default":22},"attribution":{"type":"string"},"promoteId":{"type":"promoteId"},"volatile":{"type":"boolean","default":false},"*":{"type":"*"}},"source_raster":{"type":{"required":true,"type":"enum","values":{"raster":{}}},"url":{"type":"string"},"tiles":{"type":"array","value":"string"},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.051129,180,85.051129]},"minzoom":{"type":"number","default":0},"maxzoom":{"type":"number","default":22},"tileSize":{"type":"number","default":512,"units":"pixels"},"scheme":{"type":"enum","values":{"xyz":{},"tms":{}},"default":"xyz"},"attribution":{"type":"string"},"volatile":{"type":"boolean","default":false},"*":{"type":"*"}},"source_raster_dem":{"type":{"required":true,"type":"enum","values":{"raster-dem":{}}},"url":{"type":"string"},"tiles":{"type":"array","value":"string"},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.051129,180,85.051129]},"minzoom":{"type":"number","default":0},"maxzoom":{"type":"number","default":22},"tileSize":{"type":"number","default":512,"units":"pixels"},"attribution":{"type":"string"},"encoding":{"type":"enum","values":{"terrarium":{},"mapbox":{}},"default":"mapbox"},"volatile":{"type":"boolean","default":false},"*":{"type":"*"}},"source_geojson":{"type":{"required":true,"type":"enum","values":{"geojson":{}}},"data":{"type":"*"},"maxzoom":{"type":"number","default":18},"attribution":{"type":"string"},"buffer":{"type":"number","default":128,"maximum":512,"minimum":0},"filter":{"type":"*"},"tolerance":{"type":"number","default":0.375},"cluster":{"type":"boolean","default":false},"clusterRadius":{"type":"number","default":50,"minimum":0},"clusterMaxZoom":{"type":"number"},"clusterMinPoints":{"type":"number"},"clusterProperties":{"type":"*"},"lineMetrics":{"type":"boolean","default":false},"generateId":{"type":"boolean","default":false},"promoteId":{"type":"promoteId"}},"source_video":{"type":{"required":true,"type":"enum","values":{"video":{}}},"urls":{"required":true,"type":"array","value":"string"},"coordinates":{"required":true,"type":"array","length":4,"value":{"type":"array","length":2,"value":"number"}}},"source_image":{"type":{"required":true,"type":"enum","values":{"image":{}}},"url":{"required":true,"type":"string"},"coordinates":{"required":true,"type":"array","length":4,"value":{"type":"array","length":2,"value":"number"}}},"layer":{"id":{"type":"string","required":true},"type":{"type":"enum","values":{"fill":{},"line":{},"symbol":{},"circle":{},"heatmap":{},"fill-extrusion":{},"raster":{},"hillshade":{},"background":{},"sky":{}},"required":true},"metadata":{"type":"*"},"source":{"type":"string"},"source-layer":{"type":"string"},"minzoom":{"type":"number","minimum":0,"maximum":24},"maxzoom":{"type":"number","minimum":0,"maximum":24},"filter":{"type":"filter"},"layout":{"type":"layout"},"paint":{"type":"paint"}},"layout":["layout_fill","layout_line","layout_circle","layout_heatmap","layout_fill-extrusion","layout_symbol","layout_raster","layout_hillshade","layout_background","layout_sky"],"layout_background":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_sky":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_fill":{"fill-sort-key":{"type":"number","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_circle":{"circle-sort-key":{"type":"number","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_heatmap":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_fill-extrusion":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_line":{"line-cap":{"type":"enum","values":{"butt":{},"round":{},"square":{}},"default":"butt","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"line-join":{"type":"enum","values":{"bevel":{},"round":{},"miter":{}},"default":"miter","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"line-miter-limit":{"type":"number","default":2,"requires":[{"line-join":"miter"}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"line-round-limit":{"type":"number","default":1.05,"requires":[{"line-join":"round"}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"line-sort-key":{"type":"number","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_symbol":{"symbol-placement":{"type":"enum","values":{"point":{},"line":{},"line-center":{}},"default":"point","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"symbol-spacing":{"type":"number","default":250,"minimum":1,"units":"pixels","requires":[{"symbol-placement":"line"}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"symbol-avoid-edges":{"type":"boolean","default":false,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"symbol-sort-key":{"type":"number","expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"symbol-z-order":{"type":"enum","values":{"auto":{},"viewport-y":{},"source":{}},"default":"auto","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-allow-overlap":{"type":"boolean","default":false,"requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-ignore-placement":{"type":"boolean","default":false,"requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-optional":{"type":"boolean","default":false,"requires":["icon-image","text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-rotation-alignment":{"type":"enum","values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-size":{"type":"number","default":1,"minimum":0,"units":"factor of the original icon size","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-text-fit":{"type":"enum","values":{"none":{},"width":{},"height":{},"both":{}},"default":"none","requires":["icon-image","text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-text-fit-padding":{"type":"array","value":"number","length":4,"default":[0,0,0,0],"units":"pixels","requires":["icon-image","text-field",{"icon-text-fit":["both","width","height"]}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"icon-image":{"type":"resolvedImage","tokens":true,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-rotate":{"type":"number","default":0,"period":360,"units":"degrees","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-padding":{"type":"number","default":2,"minimum":0,"units":"pixels","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"icon-keep-upright":{"type":"boolean","default":false,"requires":["icon-image",{"icon-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-offset":{"type":"array","value":"number","length":2,"default":[0,0],"requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-anchor":{"type":"enum","values":{"center":{},"left":{},"right":{},"top":{},"bottom":{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},"default":"center","requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-pitch-alignment":{"type":"enum","values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-pitch-alignment":{"type":"enum","values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-rotation-alignment":{"type":"enum","values":{"map":{},"viewport":{},"auto":{}},"default":"auto","requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-field":{"type":"formatted","default":"","tokens":true,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-font":{"type":"array","value":"string","default":["Open Sans Regular","Arial Unicode MS Regular"],"requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-size":{"type":"number","default":16,"minimum":0,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-max-width":{"type":"number","default":10,"minimum":0,"units":"ems","requires":["text-field",{"symbol-placement":["point"]}],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-line-height":{"type":"number","default":1.2,"units":"ems","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-letter-spacing":{"type":"number","default":0,"units":"ems","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-justify":{"type":"enum","values":{"auto":{},"left":{},"center":{},"right":{}},"default":"center","requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-radial-offset":{"type":"number","units":"ems","default":0,"requires":["text-field"],"property-type":"data-driven","expression":{"interpolated":true,"parameters":["zoom","feature"]}},"text-variable-anchor":{"type":"array","value":"enum","values":{"center":{},"left":{},"right":{},"top":{},"bottom":{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},"requires":["text-field",{"symbol-placement":["point"]}],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-anchor":{"type":"enum","values":{"center":{},"left":{},"right":{},"top":{},"bottom":{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},"default":"center","requires":["text-field",{"!":"text-variable-anchor"}],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-max-angle":{"type":"number","default":45,"units":"degrees","requires":["text-field",{"symbol-placement":["line","line-center"]}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"text-writing-mode":{"type":"array","value":"enum","values":{"horizontal":{},"vertical":{}},"requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-rotate":{"type":"number","default":0,"period":360,"units":"degrees","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-padding":{"type":"number","default":2,"minimum":0,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"text-keep-upright":{"type":"boolean","default":true,"requires":["text-field",{"text-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-transform":{"type":"enum","values":{"none":{},"uppercase":{},"lowercase":{}},"default":"none","requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-offset":{"type":"array","value":"number","units":"ems","length":2,"default":[0,0],"requires":["text-field",{"!":"text-radial-offset"}],"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-allow-overlap":{"type":"boolean","default":false,"requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-ignore-placement":{"type":"boolean","default":false,"requires":["text-field"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-optional":{"type":"boolean","default":false,"requires":["text-field","icon-image"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_raster":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"layout_hillshade":{"visibility":{"type":"enum","values":{"visible":{},"none":{}},"default":"visible","property-type":"constant"}},"filter":{"type":"array","value":"*"},"filter_symbol":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature","pitch","distance-from-center"]}},"filter_fill":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_line":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_circle":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_fill-extrusion":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_heatmap":{"type":"boolean","default":false,"transition":false,"property-type":"data-driven","expression":{"interpolated":false,"parameters":["zoom","feature"]}},"filter_operator":{"type":"enum","values":{"==":{},"!=":{},">":{},">=":{},"<":{},"<=":{},"in":{},"!in":{},"all":{},"any":{},"none":{},"has":{},"!has":{},"within":{}}},"geometry_type":{"type":"enum","values":{"Point":{},"LineString":{},"Polygon":{}}},"function":{"expression":{"type":"expression"},"stops":{"type":"array","value":"function_stop"},"base":{"type":"number","default":1,"minimum":0},"property":{"type":"string","default":"$zoom"},"type":{"type":"enum","values":{"identity":{},"exponential":{},"interval":{},"categorical":{}},"default":"exponential"},"colorSpace":{"type":"enum","values":{"rgb":{},"lab":{},"hcl":{}},"default":"rgb"},"default":{"type":"*","required":false}},"function_stop":{"type":"array","minimum":0,"maximum":24,"value":["number","color"],"length":2},"expression":{"type":"array","value":"*","minimum":1},"expression_name":{"type":"enum","values":{"let":{"group":"Variable binding"},"var":{"group":"Variable binding"},"literal":{"group":"Types"},"array":{"group":"Types"},"at":{"group":"Lookup"},"in":{"group":"Lookup"},"index-of":{"group":"Lookup"},"slice":{"group":"Lookup"},"case":{"group":"Decision"},"match":{"group":"Decision"},"coalesce":{"group":"Decision"},"step":{"group":"Ramps, scales, curves"},"interpolate":{"group":"Ramps, scales, curves"},"interpolate-hcl":{"group":"Ramps, scales, curves"},"interpolate-lab":{"group":"Ramps, scales, curves"},"ln2":{"group":"Math"},"pi":{"group":"Math"},"e":{"group":"Math"},"typeof":{"group":"Types"},"string":{"group":"Types"},"number":{"group":"Types"},"boolean":{"group":"Types"},"object":{"group":"Types"},"collator":{"group":"Types"},"format":{"group":"Types"},"image":{"group":"Types"},"number-format":{"group":"Types"},"to-string":{"group":"Types"},"to-number":{"group":"Types"},"to-boolean":{"group":"Types"},"to-rgba":{"group":"Color"},"to-color":{"group":"Types"},"rgb":{"group":"Color"},"rgba":{"group":"Color"},"get":{"group":"Lookup"},"has":{"group":"Lookup"},"length":{"group":"Lookup"},"properties":{"group":"Feature data"},"feature-state":{"group":"Feature data"},"geometry-type":{"group":"Feature data"},"id":{"group":"Feature data"},"zoom":{"group":"Camera"},"pitch":{"group":"Camera"},"distance-from-center":{"group":"Camera"},"heatmap-density":{"group":"Heatmap"},"line-progress":{"group":"Feature data"},"sky-radial-progress":{"group":"sky"},"accumulated":{"group":"Feature data"},"+":{"group":"Math"},"*":{"group":"Math"},"-":{"group":"Math"},"/":{"group":"Math"},"%":{"group":"Math"},"^":{"group":"Math"},"sqrt":{"group":"Math"},"log10":{"group":"Math"},"ln":{"group":"Math"},"log2":{"group":"Math"},"sin":{"group":"Math"},"cos":{"group":"Math"},"tan":{"group":"Math"},"asin":{"group":"Math"},"acos":{"group":"Math"},"atan":{"group":"Math"},"min":{"group":"Math"},"max":{"group":"Math"},"round":{"group":"Math"},"abs":{"group":"Math"},"ceil":{"group":"Math"},"floor":{"group":"Math"},"distance":{"group":"Math"},"==":{"group":"Decision"},"!=":{"group":"Decision"},">":{"group":"Decision"},"<":{"group":"Decision"},">=":{"group":"Decision"},"<=":{"group":"Decision"},"all":{"group":"Decision"},"any":{"group":"Decision"},"!":{"group":"Decision"},"within":{"group":"Decision"},"is-supported-script":{"group":"String"},"upcase":{"group":"String"},"downcase":{"group":"String"},"concat":{"group":"String"},"resolved-locale":{"group":"String"}}},"fog":{"range":{"type":"array","default":[0.5,10],"minimum":-20,"maximum":20,"length":2,"value":"number","property-type":"data-constant","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]}},"color":{"type":"color","property-type":"data-constant","default":"#ffffff","expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"high-color":{"type":"color","property-type":"data-constant","default":"#245cdf","expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"space-color":{"type":"color","property-type":"data-constant","default":["interpolate",["linear"],["zoom"],4,"#010b19",7,"#367ab9"],"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"horizon-blend":{"type":"number","property-type":"data-constant","default":["interpolate",["linear"],["zoom"],4,0.2,7,0.1],"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"star-intensity":{"type":"number","property-type":"data-constant","default":["interpolate",["linear"],["zoom"],5,0.35,6,0],"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true}},"light":{"anchor":{"type":"enum","default":"viewport","values":{"map":{},"viewport":{}},"property-type":"data-constant","transition":false,"expression":{"interpolated":false,"parameters":["zoom"]}},"position":{"type":"array","default":[1.15,210,30],"length":3,"value":"number","property-type":"data-constant","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]}},"color":{"type":"color","property-type":"data-constant","default":"#ffffff","expression":{"interpolated":true,"parameters":["zoom"]},"transition":true},"intensity":{"type":"number","property-type":"data-constant","default":0.5,"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true}},"projection":{"name":{"type":"enum","values":{"albers":{},"equalEarth":{},"equirectangular":{},"lambertConformalConic":{},"mercator":{},"naturalEarth":{},"winkelTripel":{},"globe":{}},"default":"mercator","required":true},"center":{"type":"array","length":2,"value":"number","property-type":"data-constant","minimum":[-180,-90],"maximum":[180,90],"transition":false,"requires":[{"name":["albers","lambertConformalConic"]}]},"parallels":{"type":"array","length":2,"value":"number","property-type":"data-constant","minimum":[-90,-90],"maximum":[90,90],"transition":false,"requires":[{"name":["albers","lambertConformalConic"]}]}},"terrain":{"source":{"type":"string","required":true},"exaggeration":{"type":"number","property-type":"data-constant","default":1,"minimum":0,"maximum":1000,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true,"requires":["source"]}},"paint":["paint_fill","paint_line","paint_circle","paint_heatmap","paint_fill-extrusion","paint_symbol","paint_raster","paint_hillshade","paint_background","paint_sky"],"paint_fill":{"fill-antialias":{"type":"boolean","default":true,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"fill-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-color":{"type":"color","default":"#000000","transition":true,"requires":[{"!":"fill-pattern"}],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-outline-color":{"type":"color","transition":true,"requires":[{"!":"fill-pattern"},{"fill-antialias":true}],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"fill-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["fill-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"fill-pattern":{"type":"resolvedImage","transition":true,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"cross-faded-data-driven"}},"paint_fill-extrusion":{"fill-extrusion-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"fill-extrusion-color":{"type":"color","default":"#000000","transition":true,"requires":[{"!":"fill-extrusion-pattern"}],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"fill-extrusion-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["fill-extrusion-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"fill-extrusion-pattern":{"type":"resolvedImage","transition":true,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"cross-faded-data-driven"},"fill-extrusion-height":{"type":"number","default":0,"minimum":0,"units":"meters","transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-base":{"type":"number","default":0,"minimum":0,"units":"meters","transition":true,"requires":["fill-extrusion-height"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-vertical-gradient":{"type":"boolean","default":true,"transition":false,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_line":{"line-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-color":{"type":"color","default":"#000000","transition":true,"requires":[{"!":"line-pattern"}],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"line-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["line-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"line-width":{"type":"number","default":1,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-gap-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-offset":{"type":"number","default":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-blur":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-dasharray":{"type":"array","value":"number","minimum":0,"transition":true,"units":"line widths","requires":[{"!":"line-pattern"}],"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"cross-faded-data-driven"},"line-pattern":{"type":"resolvedImage","transition":true,"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"cross-faded-data-driven"},"line-gradient":{"type":"color","transition":false,"requires":[{"!":"line-pattern"},{"source":"geojson","has":{"lineMetrics":true}}],"expression":{"interpolated":true,"parameters":["line-progress"]},"property-type":"color-ramp"},"line-trim-offset":{"type":"array","value":"number","length":2,"default":[0,0],"minimum":[0,0],"maximum":[1,1],"transition":false,"requires":[{"source":"geojson","has":{"lineMetrics":true}}],"property-type":"constant"}},"paint_circle":{"circle-radius":{"type":"number","default":5,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-color":{"type":"color","default":"#000000","transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-blur":{"type":"number","default":0,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"circle-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["circle-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"circle-pitch-scale":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"circle-pitch-alignment":{"type":"enum","values":{"map":{},"viewport":{}},"default":"viewport","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"circle-stroke-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-stroke-color":{"type":"color","default":"#000000","transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-stroke-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"}},"paint_heatmap":{"heatmap-radius":{"type":"number","default":30,"minimum":1,"transition":true,"units":"pixels","expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"heatmap-weight":{"type":"number","default":1,"minimum":0,"transition":false,"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"heatmap-intensity":{"type":"number","default":1,"minimum":0,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"heatmap-color":{"type":"color","default":["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"],"transition":false,"expression":{"interpolated":true,"parameters":["heatmap-density"]},"property-type":"color-ramp"},"heatmap-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_symbol":{"icon-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-color":{"type":"color","default":"#000000","transition":true,"requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-color":{"type":"color","default":"rgba(0, 0, 0, 0)","transition":true,"requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-blur":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","requires":["icon-image"],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"icon-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["icon-image","icon-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-color":{"type":"color","default":"#000000","transition":true,"overridable":true,"requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-color":{"type":"color","default":"rgba(0, 0, 0, 0)","transition":true,"requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-blur":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","requires":["text-field"],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"text-translate-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"map","requires":["text-field","text-translate"],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_raster":{"raster-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-hue-rotate":{"type":"number","default":0,"period":360,"transition":true,"units":"degrees","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-brightness-min":{"type":"number","default":0,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-brightness-max":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-saturation":{"type":"number","default":0,"minimum":-1,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-contrast":{"type":"number","default":0,"minimum":-1,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-resampling":{"type":"enum","values":{"linear":{},"nearest":{}},"default":"linear","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"raster-fade-duration":{"type":"number","default":300,"minimum":0,"transition":false,"units":"milliseconds","expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_hillshade":{"hillshade-illumination-direction":{"type":"number","default":335,"minimum":0,"maximum":359,"transition":false,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-illumination-anchor":{"type":"enum","values":{"map":{},"viewport":{}},"default":"viewport","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-exaggeration":{"type":"number","default":0.5,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-shadow-color":{"type":"color","default":"#000000","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-highlight-color":{"type":"color","default":"#FFFFFF","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-accent-color":{"type":"color","default":"#000000","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_background":{"background-color":{"type":"color","default":"#000000","transition":true,"requires":[{"!":"background-pattern"}],"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"background-pattern":{"type":"resolvedImage","transition":true,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"cross-faded"},"background-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_sky":{"sky-type":{"type":"enum","values":{"gradient":{},"atmosphere":{}},"default":"atmosphere","expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"sky-atmosphere-sun":{"type":"array","value":"number","length":2,"units":"degrees","minimum":[0,0],"maximum":[360,180],"transition":false,"requires":[{"sky-type":"atmosphere"}],"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"sky-atmosphere-sun-intensity":{"type":"number","requires":[{"sky-type":"atmosphere"}],"default":10,"minimum":0,"maximum":100,"transition":false,"property-type":"data-constant"},"sky-gradient-center":{"type":"array","requires":[{"sky-type":"gradient"}],"value":"number","default":[0,0],"length":2,"units":"degrees","minimum":[0,0],"maximum":[360,180],"transition":false,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"sky-gradient-radius":{"type":"number","requires":[{"sky-type":"gradient"}],"default":90,"minimum":0,"maximum":180,"transition":false,"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"sky-gradient":{"type":"color","default":["interpolate",["linear"],["sky-radial-progress"],0.8,"#87ceeb",1,"white"],"transition":false,"requires":[{"sky-type":"gradient"}],"expression":{"interpolated":true,"parameters":["sky-radial-progress"]},"property-type":"color-ramp"},"sky-atmosphere-halo-color":{"type":"color","default":"white","transition":false,"requires":[{"sky-type":"atmosphere"}],"property-type":"data-constant"},"sky-atmosphere-color":{"type":"color","default":"white","transition":false,"requires":[{"sky-type":"atmosphere"}],"property-type":"data-constant"},"sky-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"transition":{"duration":{"type":"number","default":300,"minimum":0,"units":"milliseconds"},"delay":{"type":"number","default":0,"minimum":0,"units":"milliseconds"}},"property-type":{"data-driven":{"type":"property-type"},"cross-faded":{"type":"property-type"},"cross-faded-data-driven":{"type":"property-type"},"color-ramp":{"type":"property-type"},"data-constant":{"type":"property-type"},"constant":{"type":"property-type"}},"promoteId":{"*":{"type":"string"}}};

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
        for (var i = 0, list = filter.slice(1); i < list.length; i += 1) {
            var f = list[i];

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
function createFilter(filter, layerType) {
    if ( layerType === void 0 ) layerType = 'fill';

    if (filter === null || filter === undefined) {
        return {
            filter: function () { return true; },
            needGeometry: false,
            needFeature: false
        };
    }
    if (!isExpressionFilter(filter)) {
        filter = convertFilter(filter);
    }
    var filterExp = filter;
    var staticFilter = true;
    try {
        staticFilter = extractStaticFilter(filterExp);
    } catch (e) {
        console.warn(("Failed to extract static filter. Filter will continue working, but at higher memory usage and slower framerate.\nThis is most likely a bug, please report this via https://github.com/mapbox/mapbox-gl-js/issues/new?assignees=&labels=&template=Bug_report.md\nand paste the contents of this message in the report.\nThank you!\nFilter Expression:\n" + (JSON.stringify(filterExp, null, 2)) + "\n        "));
    }
    // Compile the static component of the filter
    var filterSpec = spec[("filter_" + layerType)];
    var compiledStaticFilter = createExpression(staticFilter, filterSpec);
    var filterFunc = null;
    if (compiledStaticFilter.result === 'error') {
        throw new Error(compiledStaticFilter.value.map(function (err) { return ((err.key) + ": " + (err.message)); }).join(', '));
    } else {
        filterFunc = function (globalProperties, feature, canonical) { return compiledStaticFilter.value.evaluate(globalProperties, feature, {}, canonical); };
    }
    // If the static component is not equal to the entire filter then we have a dynamic component
    // Compile the dynamic component separately
    var dynamicFilterFunc = null;
    var needFeature = null;
    if (staticFilter !== filterExp) {
        var compiledDynamicFilter = createExpression(filterExp, filterSpec);
        if (compiledDynamicFilter.result === 'error') {
            throw new Error(compiledDynamicFilter.value.map(function (err) { return ((err.key) + ": " + (err.message)); }).join(', '));
        } else {
            dynamicFilterFunc = function (globalProperties, feature, canonical, featureTileCoord, featureDistanceData) { return compiledDynamicFilter.value.evaluate(globalProperties, feature, {}, canonical, undefined, undefined, featureTileCoord, featureDistanceData); };
            needFeature = !isFeatureConstant(compiledDynamicFilter.value.expression);
        }
    }
    filterFunc = filterFunc;
    var needGeometry = geometryNeeded(staticFilter);
    return {
        filter: filterFunc,
        dynamicFilter: dynamicFilterFunc ? dynamicFilterFunc : undefined,
        needGeometry: needGeometry,
        needFeature: !!needFeature
    };
}
function extractStaticFilter(filter) {
    if (!isDynamicFilter(filter)) {
        return filter;
    }
    // Shallow copy so we can replace expressions in-place
    var result = deepUnbundle(filter);
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
    var collapsed = collapsedExpression(expression);
    if (collapsed === true) {
        return collapsed;
    } else {
        return collapsed.map(function (subExpression) { return collapseDynamicBooleanExpressions(subExpression); });
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
    var isBranchingDynamically = false;
    var branches = [];
    if (filter[0] === 'case') {
        for (var i = 1; i < filter.length - 1; i += 2) {
            isBranchingDynamically = isBranchingDynamically || isDynamicFilter(filter[i]);
            branches.push(filter[i + 1]);
        }
        branches.push(filter[filter.length - 1]);
    } else if (filter[0] === 'match') {
        isBranchingDynamically = isBranchingDynamically || isDynamicFilter(filter[1]);
        for (var i$1 = 2; i$1 < filter.length - 1; i$1 += 2) {
            branches.push(filter[i$1 + 1]);
        }
        branches.push(filter[filter.length - 1]);
    } else if (filter[0] === 'step') {
        isBranchingDynamically = isBranchingDynamically || isDynamicFilter(filter[1]);
        for (var i$2 = 1; i$2 < filter.length - 1; i$2 += 2) {
            branches.push(filter[i$2 + 1]);
        }
    }
    if (isBranchingDynamically) {
        filter.length = 0;
        filter.push.apply(filter, [ 'any' ].concat( branches ));
    }
    // traverse and recurse into children
    for (var i$3 = 1; i$3 < filter.length; i$3++) {
        unionDynamicBranches(filter[i$3]);
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
    for (var i = 1; i < filter.length; i++) {
        var child = filter[i];
        if (isDynamicFilter(child)) {
            return true;
        }
    }
    return false;
}
function isRootExpressionDynamic(expression) {
    return expression === 'pitch' || expression === 'distance-from-center';
}
var dynamicConditionExpressions = new Set([
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
        for (var i = 1; i < expression.length; i++) {
            var param = expression[i];
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
        { return false; }
    if (filter[0] === 'within')
        { return true; }
    for (var index = 1; index < filter.length; index++) {
        if (geometryNeeded(filter[index]))
            { return true; }
    }
    return false;
}
function convertFilter(filter) {
    if (!filter)
        { return true; }
    var op = filter[0];
    if (filter.length <= 1)
        { return op !== 'any'; }
    var converted = op === '==' ? convertComparisonOp(filter[1], filter[2], '==') : op === '!=' ? convertNegation(convertComparisonOp(filter[1], filter[2], '==')) : op === '<' || op === '>' || op === '<=' || op === '>=' ? convertComparisonOp(filter[1], filter[2], op) : op === 'any' ? convertDisjunctionOp(filter.slice(1)) : op === 'all' ? ['all'].concat(filter.slice(1).map(convertFilter)) : op === 'none' ? ['all'].concat(filter.slice(1).map(convertFilter).map(convertNegation)) : op === 'in' ? convertInOp(filter[1], filter.slice(2)) : op === '!in' ? convertNegation(convertInOp(filter[1], filter.slice(2))) : op === 'has' ? convertHasOp(filter[1]) : op === '!has' ? convertNegation(convertHasOp(filter[1])) : op === 'within' ? filter : true;
    return converted;
}
function convertComparisonOp(property, value, op) {
    switch (property) {
    case '$type':
        return [
            ("filter-type-" + op),
            value
        ];
    case '$id':
        return [
            ("filter-id-" + op),
            value
        ];
    default:
        return [
            ("filter-" + op),
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
            "filter-type-in",
            [
                'literal',
                values
            ]
        ];
    case '$id':
        return [
            "filter-id-in",
            [
                'literal',
                values
            ]
        ];
    default:
        if (values.length > 200 && !values.some(function (v) { return typeof v !== typeof values[0]; })) {
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
        return ["filter-has-id"];
    default:
        return [
            "filter-has",
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
    var result = {};
    for (var k in layer) {
        if (k !== 'ref') {
            result[k] = layer[k];
        }
    }
    refProperties.forEach(function (k) {
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
    var map = Object.create(null);
    for (var i = 0; i < layers.length; i++) {
        map[layers[i].id] = layers[i];
    }
    for (var i$1 = 0; i$1 < layers.length; i$1++) {
        if ('ref' in layers[i$1]) {
            layers[i$1] = deref(layers[i$1], map[layers[i$1].ref]);
        }
    }
    return layers;
}

var fontWeights = {
    thin: 100,
    hairline: 100,
    'ultra-light': 100,
    'extra-light': 100,
    light: 200,
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
    heavy: 800,
    black: 800,
    'extra-bold': 800,
    'ultra-black': 900,
    'extra-black': 900,
    'ultra-bold': 900,
    'heavy-black': 900,
    fat: 900,
    poster: 900
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
                parts.pop();
                maybeWeight = parts[parts.length - 1].toLowerCase();
            } else if (italicRE.test(maybeWeight)) {
                maybeWeight = maybeWeight.replace(italicRE, '');
                style = haveStyle ? style : parts[parts.length - 1].replace(maybeWeight, '');
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

var mapboxBaseUrl = 'https://api.mapbox.com';
/**
 * Gets the path from a mapbox:// URL.
 * @param {string} url The Mapbox URL.
 * @return {string} The path.
 * @private
 */
function getMapboxPath(url) {
    var startsWith = 'mapbox://';
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
    var mapboxPath = getMapboxPath(url);
    if (!mapboxPath) {
        return decodeURI(new URL(url, styleUrl).href);
    }
    var startsWith = 'sprites/';
    if (mapboxPath.indexOf(startsWith) !== 0) {
        throw new Error(("unexpected sprites url: " + url));
    }
    var sprite = mapboxPath.slice(startsWith.length);
    return (mapboxBaseUrl + "/styles/v1/" + sprite + "/sprite?access_token=" + token);
}
/**
 * Turns mapbox:// style URLs into resolvable URLs.
 * @param {string} url The style URL.
 * @param {string} token The access token.
 * @return {string} A resolvable URL.
 * @private
 */
function normalizeStyleUrl(url, token) {
    var mapboxPath = getMapboxPath(url);
    if (!mapboxPath) {
        return decodeURI(new URL(url, location.href).href);
    }
    var startsWith = 'styles/';
    if (mapboxPath.indexOf(startsWith) !== 0) {
        throw new Error(("unexpected style url: " + url));
    }
    var style = mapboxPath.slice(startsWith.length);
    return (mapboxBaseUrl + "/styles/v1/" + style + "?&access_token=" + token);
}
/**
 * Turns mapbox:// source URLs into vector tile URL templates.
 * @param {string} url The source URL.
 * @param {string} token The access token.
 * @param {string} tokenParam The access token key.
 * @param {string} styleUrl The style URL.
 * @return {string} A vector tile template.
 * @private
 */
function normalizeSourceUrl(url, token, tokenParam, styleUrl) {
    var urlObject = new URL(url, styleUrl);
    var mapboxPath = getMapboxPath(url);
    if (!mapboxPath) {
        if (!token) {
            return decodeURI(urlObject.href);
        }
        urlObject.searchParams.set(tokenParam, token);
        return decodeURI(urlObject.href);
    }
    return ("https://{a-d}.tiles.mapbox.com/v4/" + mapboxPath + "/{z}/{x}/{y}.vector.pbf?access_token=" + token);
}

function deg2rad(degrees) {
    return degrees * Math.PI / 180;
}
var defaultResolutions = function () {
    var resolutions = [];
    for (var res = 78271.51696402048; resolutions.length <= 24; res /= 2) {
        resolutions.push(res);
    }
    return resolutions;
}();
/**
 * @param {number} width Width of the canvas.
 * @param {number} height Height of the canvas.
 * @return {HTMLCanvasElement} Canvas.
 */
function createCanvas(width, height) {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && typeof OffscreenCanvas !== 'undefined') {
        // eslint-disable-line
        return new OffscreenCanvas(width, height);
    } else {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
}
function getZoomForResolution(resolution, resolutions) {
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
var pendingRequests = {};
/**
 * @param {ResourceType} resourceType Type of resource to load.
 * @param {string} url Url of the resource.
 * @param {Options} [options={}] Options.
 * @return {Promise<Object|Response>} Promise that resolves with the loaded resource
 * or rejects with the Response object.
 * @private
 */
function fetchResource(resourceType, url, options) {
    if ( options === void 0 ) options = {};

    if (url in pendingRequests) {
        return pendingRequests[url];
    } else {
        var request = options.transformRequest ? options.transformRequest(url, resourceType) || new Request(url) : new Request(url);
        if (!request.headers.get('Accept')) {
            request.headers.set('Accept', 'application/json');
        }
        var pendingRequest = fetch(request).then(function (response) {
            delete pendingRequests[url];
            return response.ok ? response.json() : Promise.reject(new Error('Error fetching source ' + url));
        }).catch(function (error) {
            delete pendingRequests[url];
            return Promise.reject(new Error('Error fetching source ' + url));
        });
        pendingRequests[url] = pendingRequest;
        return pendingRequest;
    }
}
function getGlStyle(glStyleOrUrl, options) {
    if (typeof glStyleOrUrl === 'string') {
        if (glStyleOrUrl.trim().startsWith('{')) {
            try {
                var glStyle = JSON.parse(glStyleOrUrl);
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
var tilejsonCache = {};
/**
 * @param {Object} glSource glStyle source object.
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {Object} TileJson
 */
function getTileJson(glSource, styleUrl, options) {
    if ( options === void 0 ) options = {};

    var cacheKey = [
        styleUrl,
        JSON.stringify(glSource)
    ].toString();
    var promise = tilejsonCache[cacheKey];
    if (!promise || options.transformRequest) {
        var url = glSource.url;
        if (url && !glSource.tiles) {
            var normalizedSourceUrl = normalizeSourceUrl(url, options.accessToken, options.accessTokenParam || 'access_token', styleUrl || location.href);
            if (url.startsWith('mapbox://')) {
                promise = Promise.resolve(Object.assign({}, glSource, {
                    url: undefined,
                    tiles: normalizedSourceUrl
                }));
            } else {
                promise = fetchResource('Source', normalizedSourceUrl, options).then(function (tileJson) {
                    for (var i = 0, ii = tileJson.tiles.length; i < ii; ++i) {
                        var tileUrl = tileJson.tiles[i];
                        if (options.transformRequest) {
                            var request = options.transformRequest(normalizedSourceUrl, 'Source');
                            if (request) {
                                normalizedSourceUrl = request.url;
                            }
                        }
                        var normalizedTileUrl = normalizeSourceUrl(tileUrl, options.accessToken, options.accessTokenParam || 'access_token', normalizedSourceUrl);
                        if (options.transformRequest) {
                            var transformedRequest = options.transformRequest(normalizedTileUrl, 'Tiles');
                            if (transformedRequest instanceof Request) {
                                normalizedTileUrl = decodeURI(transformedRequest.url);
                            }
                        }
                        tileJson.tiles[i] = normalizedTileUrl;
                    }
                    return Promise.resolve(tileJson);
                });
            }
        } else {
            glSource = Object.assign({}, glSource, {
                tiles: glSource.tiles.map(function (tileUrl) {
                    return normalizeSourceUrl(tileUrl, options.accessToken, options.accessTokenParam || 'access_token', styleUrl || location.href);
                })
            });
            promise = Promise.resolve(Object.assign({}, glSource));
        }
        tilejsonCache[cacheKey] = promise;
    }
    return promise;
}    /**
 * @typedef {import("./apply.js").Options} Options
 * @typedef {import('./apply.js').ResourceType} ResourceType
 * @private
 */

var hairSpacePool = Array(256).join('\u200A');
function applyLetterSpacing(text, letterSpacing) {
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
    return getMeasureContext().measureText(text).width + (text.length - 1) * letterSpacing;
}
var measureCache = {};
function wrapText(text, font, em, letterSpacing) {
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
            var lines$1 = [];
            // Pass 1 - wrap lines to not exceed maxWidth
            for (var i$1 = 0, ii$1 = words.length; i$1 < ii$1; ++i$1) {
                var word = words[i$1];
                var testLine = line + (line ? ' ' : '') + word;
                if (measureText(testLine, letterSpacing) <= maxWidth) {
                    line = testLine;
                } else {
                    if (line) {
                        lines$1.push(line);
                    }
                    line = word;
                }
            }
            if (line) {
                lines$1.push(line);
            }
            // Pass 2 - add lines with a width of less than 30% of maxWidth to the previous or next line
            for (var i$2 = 0, ii$2 = lines$1.length; i$2 < ii$2 && ii$2 > 1; ++i$2) {
                var line$1 = lines$1[i$2];
                if (measureText(line$1, letterSpacing) < maxWidth * 0.35) {
                    var prevWidth = i$2 > 0 ? measureText(lines$1[i$2 - 1], letterSpacing) : Infinity;
                    var nextWidth = i$2 < ii$2 - 1 ? measureText(lines$1[i$2 + 1], letterSpacing) : Infinity;
                    lines$1.splice(i$2, 1);
                    ii$2 -= 1;
                    if (prevWidth < nextWidth) {
                        lines$1[i$2 - 1] += ' ' + line$1;
                        i$2 -= 1;
                    } else {
                        lines$1[i$2] = line$1 + ' ' + lines$1[i$2];
                    }
                }
            }
            // Pass 3 - try to fill 80% of maxWidth for each line
            for (var i$3 = 0, ii$3 = lines$1.length - 1; i$3 < ii$3; ++i$3) {
                var line$2 = lines$1[i$3];
                var next = lines$1[i$3 + 1];
                if (measureText(line$2, letterSpacing) > maxWidth * 0.7 && measureText(next, letterSpacing) < maxWidth * 0.6) {
                    var lineWords = line$2.split(' ');
                    var lastWord = lineWords.pop();
                    if (measureText(lastWord, letterSpacing) < maxWidth * 0.2) {
                        lines$1[i$3] = lineWords.join(' ');
                        lines$1[i$3 + 1] = lastWord + ' ' + next;
                    }
                    ii$3 -= 1;
                }
            }
            wrappedText = lines$1.join('\n');
        } else {
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
            var styleSheet = styleSheets[i];
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
            } catch (e) {
            }
        }
    }
    return family in loadedFontFamilies;
}
var processedFontFamilies = {};
/**
 * @param {Array} fonts Fonts.
 * @return {Array} Processed fonts.
 * @private
 */
function getFonts(fonts) {
    var fontsKey = fonts.toString();
    if (fontsKey in processedFontFamilies) {
        return processedFontFamilies[fontsKey];
    }
    var googleFontDescriptions = [];
    for (var i = 0, ii = fonts.length; i < ii; ++i) {
        fonts[i] = fonts[i].replace('Arial Unicode MS', 'Arial');
        var font = fonts[i];
        var cssFont = mapboxToCssFont(font, 1);
        registerFont(cssFont);
        var parts = cssFont.split(' ');
        googleFontDescriptions.push([
            parts.slice(3).join(' ').replace(/"/g, ''),
            parts[1],
            parts[0]
        ]);
    }
    for (var i$1 = 0, ii$1 = googleFontDescriptions.length; i$1 < ii$1; ++i$1) {
        var googleFontDescription = googleFontDescriptions[i$1];
        var family = googleFontDescription[0];
        if (!hasFontFamily(family)) {
            if (checkedFonts.get(((googleFontDescription[2]) + "\n" + (googleFontDescription[1]) + " \n" + family)) !== 100) {
                var fontUrl = 'https://fonts.googleapis.com/css?family=' + family.replace(/ /g, '+') + ':' + googleFontDescription[1] + googleFontDescription[2];
                if (!document.querySelector('link[href="' + fontUrl + '"]')) {
                    var markup = document.createElement('link');
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
ol-mapbox-style - Use Mapbox Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
*/
/**
 * @typedef {import("ol/layer/Vector").default} VectorLayer
 * @typedef {import("ol/layer/VectorTile").default} VectorTileLayer
 * @typedef {import("ol/style/Style").StyleFunction} StyleFunction
 */
var types = {
    'Point': 1,
    'MultiPoint': 1,
    'LineString': 2,
    'MultiLineString': 2,
    'Polygon': 3,
    'MultiPolygon': 3
};
var anchor = {
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
var expressionData = function (rawExpression, propertySpec) {
    var compiledExpression = createPropertyExpression(rawExpression, propertySpec);
    if (compiledExpression.result === 'error') {
        throw new Error(compiledExpression.value.map(function (err) { return ((err.key) + ": " + (err.message)); }).join(', '));
    }
    return compiledExpression.value;
};
var emptyObj$1 = {};
var zoomObj = { zoom: 0 };
var renderFeatureCoordinates, renderFeature;
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
    var layerId = layer.id;
    if (!functionCache) {
        functionCache = {};
        console.warn('No functionCache provided to getValue()');    //eslint-disable-line no-console
    }
    if (!functionCache[layerId]) {
        functionCache[layerId] = {};
    }
    var functions = functionCache[layerId];
    if (!functions[property]) {
        var value = (layer[layoutOrPaint] || emptyObj$1)[property];
        var propertySpec = spec[(layoutOrPaint + "_" + (layer.type))][property];
        if (value === undefined) {
            value = propertySpec.default;
        }
        var isExpr = isExpression(value);
        if (!isExpr && isFunction(value)) {
            value = convertFunction(value, propertySpec);
            isExpr = true;
        }
        if (isExpr) {
            var compiledExpression = expressionData(value, propertySpec);
            functions[property] = compiledExpression.evaluate.bind(compiledExpression);
        } else {
            if (propertySpec.type == 'color') {
                value = Color.parse(value);
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
 * @param {Object} [functionCache] Function cache.
 * @return {"declutter"|"obstacle"|"none"} Value.
 */
function getIconDeclutterMode(layer, zoom, feature, functionCache) {
    var allowOverlap = getValue(layer, 'layout', 'icon-allow-overlap', zoom, feature, functionCache);
    if (!allowOverlap) {
        return 'declutter';
    }
    var ignorePlacement = getValue(layer, 'layout', 'icon-ignore-placement', zoom, feature, functionCache);
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
var renderTransparentEnabled = false;
/**
 * Configure whether features with a transparent style should be rendered. When
 * set to `true`, it will be possible to hit detect content that is not visible,
 * like transparent fills of polygons, using `ol/layer/Layer#getFeatures()` or
 * `ol/Map#getFeaturesAtPixel()`
 * @param {boolean} enabled Rendering of transparent elements is enabled.
 * Default is `false`.
 */
function renderTransparent(enabled) {
    renderTransparentEnabled = enabled;
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
        var a = color.a;
        opacity = opacity === undefined ? 1 : opacity;
        return a === 0 ? 'transparent' : 'rgba(' + Math.round(color.r * 255 / a) + ',' + Math.round(color.g * 255 / a) + ',' + Math.round(color.b * 255 / a) + ',' + a * opacity + ')';
    }
    return color;
}
var templateRegEx = /\{[^{}}]*\}/g;
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
var recordLayer = false;
/**
 * Turns recording of the Mapbox Style's `layer` on and off. When turned on,
 * the layer that a rendered feature belongs to will be set as the feature's
 * `mapbox-layer` property.
 * @param {boolean} record Recording of the style layer is on.
 */
function recordStyleLayer(record) {
    if ( record === void 0 ) record = false;

    recordLayer = record;
}
/**
 * Creates a style function from the `glStyle` object for all layers that use
 * the specified `source`, which needs to be a `"type": "vector"` or
 * `"type": "geojson"` source and applies it to the specified OpenLayers layer.
 *
 * Two additional properties will be set on the provided layer:
 *
 *  * `mapbox-source`: The `id` of the Mapbox Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
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
 * @param {string|Object} glStyle Mapbox Style object.
 * @param {string|Array<string>} sourceOrLayers `source` key or an array of layer `id`s
 * from the Mapbox Style object. When a `source` key is provided, all layers for
 * the specified source will be included in the style function. When layer `id`s
 * are provided, they must be from layers that use the same source.
 * @param {Array<number>} resolutions
 * Resolutions for mapping resolution to zoom level.
 * @param {Object} spriteData Sprite data from the url specified in
 * the Mapbox Style object's `sprite` property. Only required if a `sprite`
 * property is specified in the Mapbox Style object.
 * @param {string} spriteImageUrl Sprite image url for the sprite
 * specified in the Mapbox Style object's `sprite` property. Only required if a
 * `sprite` property is specified in the Mapbox Style object.
 * @param {function(Array<string>):Array<string>} getFonts Function that
 * receives a font stack as arguments, and returns a (modified) font stack that
 * is available. Font names are the names used in the Mapbox Style object. If
 * not provided, the font stack will be used as-is. This function can also be
 * used for loading web fonts.
 * @return {StyleFunction} Style function for use in
 * `ol.layer.Vector` or `ol.layer.VectorTile`.
 */
function stylefunction(olLayer, glStyle, sourceOrLayers, resolutions, spriteData, spriteImageUrl, getFonts) {
    if ( resolutions === void 0 ) resolutions = defaultResolutions;
    if ( spriteData === void 0 ) spriteData = undefined;
    if ( spriteImageUrl === void 0 ) spriteImageUrl = undefined;
    if ( getFonts === void 0 ) getFonts = undefined;

    if (typeof glStyle == 'string') {
        glStyle = JSON.parse(glStyle);
    }
    if (glStyle.version != 8) {
        throw new Error('glStyle version 8 required.');
    }
    var spriteImage, spriteImgSize;
    if (spriteImageUrl) {
        if (typeof Image !== 'undefined') {
            var img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function () {
                spriteImage = img;
                spriteImgSize = [
                    img.width,
                    img.height
                ];
                olLayer.changed();
                img.onload = null;
            };
            img.src = spriteImageUrl;
        } else if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
            //eslint-disable-line
            var worker = self;
            // Main thread needs to handle 'loadImage' and dispatch 'imageLoaded'
            worker.postMessage({
                action: 'loadImage',
                src: spriteImageUrl
            });
            worker.addEventListener('message', function handler(event) {
                if (event.data.action === 'imageLoaded' && event.data.src === spriteImageUrl) {
                    spriteImage = event.data.image;
                    spriteImgSize = [
                        spriteImage.width,
                        spriteImage.height
                    ];
                }
            });
        }
    }
    var allLayers = derefLayers(glStyle.layers);
    var layersBySourceLayer = {};
    var mapboxLayers = [];
    var iconImageCache = {};
    var patternCache = {};
    var functionCache = {};
    var filterCache = {};
    var mapboxSource;
    for (var i = 0, ii = allLayers.length; i < ii; ++i) {
        var layer = allLayers[i];
        var layerId = layer.id;
        if (typeof sourceOrLayers == 'string' && layer.source == sourceOrLayers || sourceOrLayers.indexOf(layerId) !== -1) {
            var sourceLayer = layer['source-layer'];
            if (!mapboxSource) {
                mapboxSource = layer.source;
                var source = glStyle.sources[mapboxSource];
                if (!source) {
                    throw new Error(("Source \"" + mapboxSource + "\" is not defined"));
                }
                var type = source.type;
                if (type !== 'vector' && type !== 'geojson') {
                    throw new Error(("Source \"" + mapboxSource + "\" is not of type \"vector\" or \"geojson\", but \"" + type + "\""));
                }
            } else if (layer.source !== mapboxSource) {
                throw new Error(("Layer \"" + layerId + "\" does not use source \"" + mapboxSource));
            }
            var layers = layersBySourceLayer[sourceLayer];
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
    var textHalo = new Stroke();
    var textColor = new Fill();
    var styles = [];
    var styleFunction = function (feature, resolution) {
        var properties = feature.getProperties();
        var layers = layersBySourceLayer[properties.layer];
        if (!layers) {
            return;
        }
        var zoom = resolutions.indexOf(resolution);
        if (zoom == -1) {
            zoom = getZoomForResolution(resolution, resolutions);
        }
        var type = types[feature.getGeometry().getType()];
        var f = {
            properties: properties,
            type: type
        };
        var featureState = olLayer.get('mapbox-featurestate')[feature.getId()];
        var stylesLength = -1;
        var featureBelongsToLayer;
        for (var i = 0, ii = layers.length; i < ii; ++i) {
            var layerData = layers[i];
            var layer = layerData.layer;
            var layerId = layer.id;
            var layout = layer.layout || emptyObj$1;
            var paint = layer.paint || emptyObj$1;
            if (layout.visibility === 'none' || 'minzoom' in layer && zoom < layer.minzoom || 'maxzoom' in layer && zoom >= layer.maxzoom) {
                continue;
            }
            var filter = layer.filter;
            if (!filter || evaluateFilter(layerId, filter, f, zoom, filterCache)) {
                featureBelongsToLayer = layer;
                var color = (void 0), opacity = (void 0), fill = (void 0), stroke = (void 0), strokeColor = (void 0), style = (void 0);
                var index = layerData.index;
                if (type == 3 && (layer.type == 'fill' || layer.type == 'fill-extrusion')) {
                    opacity = getValue(layer, 'paint', layer.type + '-opacity', zoom, f, functionCache, featureState);
                    if (layer.type + '-pattern' in paint) {
                        var fillIcon = getValue(layer, 'paint', layer.type + '-pattern', zoom, f, functionCache, featureState);
                        if (fillIcon) {
                            var icon = typeof fillIcon === 'string' ? fromTemplate(fillIcon, properties) : fillIcon.toString();
                            if (spriteImage && spriteData && spriteData[icon]) {
                                ++stylesLength;
                                style = styles[stylesLength];
                                if (!style || !style.getFill() || style.getStroke() || style.getText()) {
                                    style = new Style({ fill: new Fill() });
                                    styles[stylesLength] = style;
                                }
                                fill = style.getFill();
                                style.setZIndex(index);
                                var icon_cache_key = icon + '.' + opacity;
                                var pattern = patternCache[icon_cache_key];
                                if (!pattern) {
                                    var spriteImageData = spriteData[icon];
                                    var canvas = createCanvas(spriteImageData.width, spriteImageData.height);
                                    var ctx = canvas.getContext('2d');
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
                    color = !('line-pattern' in paint) && 'line-color' in paint ? colorWithOpacity(getValue(layer, 'paint', 'line-color', zoom, f, functionCache, featureState), getValue(layer, 'paint', 'line-opacity', zoom, f, functionCache, featureState)) : undefined;
                    var width = getValue(layer, 'paint', 'line-width', zoom, f, functionCache, featureState);
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
                var hasImage = false;
                var text = null;
                var placementAngle = 0;
                var icon$1 = (void 0), iconImg = (void 0), skipLabel = (void 0);
                if ((type == 1 || type == 2) && 'icon-image' in layout) {
                    var iconImage = getValue(layer, 'layout', 'icon-image', zoom, f, functionCache, featureState);
                    if (iconImage) {
                        icon$1 = typeof iconImage === 'string' ? fromTemplate(iconImage, properties) : iconImage.toString();
                        var styleGeom = undefined;
                        if (spriteImage && spriteData && spriteData[icon$1]) {
                            var iconRotationAlignment = getValue(layer, 'layout', 'icon-rotation-alignment', zoom, f, functionCache, featureState);
                            if (type == 2) {
                                var geom = feature.getGeometry();
                                // ol package and ol-debug.js only
                                if (geom.getFlatMidpoint || geom.getFlatMidpoints) {
                                    var extent = geom.getExtent();
                                    var size = Math.sqrt(Math.max(Math.pow((extent[2] - extent[0]) / resolution, 2), Math.pow((extent[3] - extent[1]) / resolution, 2)));
                                    if (size > 150) {
                                        //FIXME Do not hard-code a size of 150
                                        var midpoint = geom.getType() === 'MultiLineString' ? geom.getFlatMidpoints() : geom.getFlatMidpoint();
                                        if (!renderFeature) {
                                            renderFeatureCoordinates = [
                                                NaN,
                                                NaN
                                            ];
                                            renderFeature = new RenderFeature('Point', renderFeatureCoordinates, [], {}, null);
                                        }
                                        styleGeom = renderFeature;
                                        renderFeatureCoordinates[0] = midpoint[0];
                                        renderFeatureCoordinates[1] = midpoint[1];
                                        var placement = getValue(layer, 'layout', 'symbol-placement', zoom, f, functionCache, featureState);
                                        if (placement === 'line' && iconRotationAlignment === 'map') {
                                            var stride = geom.getStride();
                                            var coordinates = geom.getFlatCoordinates();
                                            for (var i$1 = 0, ii$1 = coordinates.length - stride; i$1 < ii$1; i$1 += stride) {
                                                var x1 = coordinates[i$1];
                                                var y1 = coordinates[i$1 + 1];
                                                var x2 = coordinates[i$1 + stride];
                                                var y2 = coordinates[i$1 + stride + 1];
                                                var minX = Math.min(x1, x2);
                                                var minY = Math.min(y1, y2);
                                                var maxX = Math.max(x1, x2);
                                                var maxY = Math.max(y1, y2);
                                                if (midpoint[0] >= minX && midpoint[0] <= maxX && midpoint[1] >= minY && midpoint[1] <= maxY) {
                                                    placementAngle = Math.atan2(y1 - y2, x2 - x1);
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (type !== 2 || styleGeom) {
                                var iconSize = getValue(layer, 'layout', 'icon-size', zoom, f, functionCache, featureState);
                                var iconColor = paint['icon-color'] !== undefined ? getValue(layer, 'paint', 'icon-color', zoom, f, functionCache, featureState) : null;
                                if (!iconColor || iconColor.a !== 0) {
                                    var icon_cache_key$1 = icon$1 + '.' + iconSize;
                                    if (iconColor !== null) {
                                        icon_cache_key$1 += '.' + iconColor;
                                    }
                                    iconImg = iconImageCache[icon_cache_key$1];
                                    if (!iconImg) {
                                        var spriteImageData$1 = spriteData[icon$1];
                                        var declutterMode = getIconDeclutterMode(layer, zoom, f, functionCache);
                                        iconImg = new Icon({
                                            color: iconColor ? [
                                                iconColor.r * 255,
                                                iconColor.g * 255,
                                                iconColor.b * 255,
                                                iconColor.a
                                            ] : undefined,
                                            img: spriteImage,
                                            imgSize: spriteImgSize,
                                            size: [
                                                spriteImageData$1.width,
                                                spriteImageData$1.height
                                            ],
                                            offset: [
                                                spriteImageData$1.x,
                                                spriteImageData$1.y
                                            ],
                                            rotateWithView: iconRotationAlignment === 'map',
                                            scale: iconSize / spriteImageData$1.pixelRatio,
                                            displacement: 'icon-offset' in layout ? getValue(layer, 'layout', 'icon-offset', zoom, f, functionCache, featureState).map(function (v) { return -v * spriteImageData$1.pixelRatio; }) : undefined,
                                            declutterMode: declutterMode
                                        });
                                        iconImageCache[icon_cache_key$1] = iconImg;
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
                    var circleRadius = 'circle-radius' in paint ? getValue(layer, 'paint', 'circle-radius', zoom, f, functionCache, featureState) : 5;
                    var circleStrokeColor = colorWithOpacity(getValue(layer, 'paint', 'circle-stroke-color', zoom, f, functionCache, featureState), getValue(layer, 'paint', 'circle-stroke-opacity', zoom, f, functionCache, featureState));
                    var circleColor = colorWithOpacity(getValue(layer, 'paint', 'circle-color', zoom, f, functionCache, featureState), getValue(layer, 'paint', 'circle-opacity', zoom, f, functionCache, featureState));
                    var circleStrokeWidth = getValue(layer, 'paint', 'circle-stroke-width', zoom, f, functionCache, featureState);
                    var cache_key = circleRadius + '.' + circleStrokeColor + '.' + circleColor + '.' + circleStrokeWidth;
                    iconImg = iconImageCache[cache_key];
                    if (!iconImg) {
                        iconImg = new Circle({
                            radius: circleRadius,
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
                var label = (void 0), font = (void 0), textLineHeight = (void 0), textSize = (void 0), letterSpacing = (void 0), maxTextWidth = (void 0);
                if ('text-field' in layout) {
                    textSize = Math.round(getValue(layer, 'layout', 'text-size', zoom, f, functionCache, featureState));
                    var fontArray = getValue(layer, 'layout', 'text-font', zoom, f, functionCache, featureState);
                    textLineHeight = getValue(layer, 'layout', 'text-line-height', zoom, f, functionCache, featureState);
                    font = mapboxToCssFont(getFonts ? getFonts(fontArray) : fontArray, textSize, textLineHeight);
                    if (!font.includes('sans-serif')) {
                        font += ',sans-serif';
                    }
                    letterSpacing = getValue(layer, 'layout', 'text-letter-spacing', zoom, f, functionCache, featureState);
                    maxTextWidth = getValue(layer, 'layout', 'text-max-width', zoom, f, functionCache, featureState);
                    var textField = getValue(layer, 'layout', 'text-field', zoom, f, functionCache, featureState);
                    if (typeof textField === 'object' && textField.sections) {
                        if (textField.sections.length === 1) {
                            label = textField.toString();
                        } else {
                            label = textField.sections.reduce(function (acc, chunk, i) {
                                var fonts = chunk.fontStack ? chunk.fontStack.split(',') : fontArray;
                                var chunkFont = mapboxToCssFont(getFonts ? getFonts(fonts) : fonts, textSize * (chunk.scale || 1), textLineHeight);
                                var text = chunk.text;
                                if (text === '\n') {
                                    acc.push('\n', '');
                                    return acc;
                                }
                                if (type == 2) {
                                    acc.push(applyLetterSpacing(text, letterSpacing), chunkFont);
                                    return;
                                }
                                text = wrapText(text, chunkFont, maxTextWidth, letterSpacing).split('\n');
                                for (var i$1 = 0, ii = text.length; i$1 < ii; ++i$1) {
                                    if (i$1 > 0) {
                                        acc.push('\n', '');
                                    }
                                    acc.push(text[i$1], chunkFont);
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
                    if (!style.getText()) {
                        style.setText(text || new Text({
                            padding: [
                                2,
                                2,
                                2,
                                2
                            ]
                        }));
                    }
                    text = style.getText();
                    var textTransform = layout['text-transform'];
                    if (textTransform == 'uppercase') {
                        label = Array.isArray(label) ? label.map(function (t, i) { return i % 2 ? t : t.toUpperCase(); }) : label.toUpperCase();
                    } else if (textTransform == 'lowercase') {
                        label = Array.isArray(label) ? label.map(function (t, i) { return i % 2 ? t : t.toLowerCase(); }) : label.toLowerCase();
                    }
                    var wrappedLabel = Array.isArray(label) ? label : type == 2 ? applyLetterSpacing(label, letterSpacing) : wrapText(label, font, maxTextWidth, letterSpacing);
                    text.setText(wrappedLabel);
                    text.setFont(font);
                    text.setRotation(deg2rad(getValue(layer, 'layout', 'text-rotate', zoom, f, functionCache, featureState)));
                    var textAnchor = getValue(layer, 'layout', 'text-anchor', zoom, f, functionCache, featureState);
                    var placement$1 = hasImage || type == 1 ? 'point' : getValue(layer, 'layout', 'symbol-placement', zoom, f, functionCache, featureState);
                    text.setPlacement(placement$1);
                    text.setOverflow(placement$1 === 'point');
                    var textHaloWidth = getValue(layer, 'paint', 'text-halo-width', zoom, f, functionCache, featureState);
                    var textOffset = getValue(layer, 'layout', 'text-offset', zoom, f, functionCache, featureState);
                    var textTranslate = getValue(layer, 'paint', 'text-translate', zoom, f, functionCache, featureState);
                    // Text offset has to take halo width and line height into account
                    var vOffset = 0;
                    var hOffset = 0;
                    if (placement$1 == 'point') {
                        var textAlign = 'center';
                        if (textAnchor.indexOf('left') !== -1) {
                            textAlign = 'left';
                            hOffset = textHaloWidth;
                        } else if (textAnchor.indexOf('right') !== -1) {
                            textAlign = 'right';
                            hOffset = -textHaloWidth;
                        }
                        text.setTextAlign(textAlign);
                        var textRotationAlignment = getValue(layer, 'layout', 'text-rotation-alignment', zoom, f, functionCache, featureState);
                        text.setRotateWithView(textRotationAlignment == 'map');
                    } else {
                        text.setMaxAngle(deg2rad(getValue(layer, 'layout', 'text-max-angle', zoom, f, functionCache, featureState)) * label.length / wrappedLabel.length);
                        text.setTextAlign();
                        text.setRotateWithView(false);
                    }
                    var textBaseline = 'middle';
                    if (textAnchor.indexOf('bottom') == 0) {
                        textBaseline = 'bottom';
                        vOffset = -textHaloWidth - 0.5 * (textLineHeight - 1) * textSize;
                    } else if (textAnchor.indexOf('top') == 0) {
                        textBaseline = 'top';
                        vOffset = textHaloWidth + 0.5 * (textLineHeight - 1) * textSize;
                    }
                    text.setTextBaseline(textBaseline);
                    text.setOffsetX(textOffset[0] * textSize + hOffset + textTranslate[0]);
                    text.setOffsetY(textOffset[1] * textSize + vOffset + textTranslate[1]);
                    textColor.setColor(colorWithOpacity(getValue(layer, 'paint', 'text-color', zoom, f, functionCache, featureState), opacity));
                    text.setFill(textColor);
                    var haloColor = colorWithOpacity(getValue(layer, 'paint', 'text-halo-color', zoom, f, functionCache, featureState), opacity);
                    if (haloColor) {
                        textHalo.setColor(haloColor);
                        // spec here : https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-symbol-text-halo-width
                        // Halo width must be doubled because it is applied around the center of the text outline
                        textHaloWidth *= 2;
                        // 1/4 of text size (spec) x 2
                        var halfTextSize = 0.5 * textSize;
                        textHalo.setWidth(textHaloWidth <= halfTextSize ? textHaloWidth : halfTextSize);
                        text.setStroke(textHalo);
                    } else {
                        text.setStroke(undefined);
                    }
                    var textPadding = getValue(layer, 'layout', 'text-padding', zoom, f, functionCache, featureState);
                    var padding = text.getPadding();
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
                if (typeof feature.set === 'function') {
                    // ol/Feature
                    feature.set('mapbox-layer', featureBelongsToLayer);
                } else {
                    // ol/render/Feature
                    feature.getProperties()['mapbox-layer'] = featureBelongsToLayer;
                }
            }
            return styles;
        }
    };
    olLayer.setStyle(styleFunction);
    olLayer.set('mapbox-source', mapboxSource);
    olLayer.set('mapbox-layers', mapboxLayers);
    olLayer.set('mapbox-featurestate', {});
    return styleFunction;
}

/*
ol-mapbox-style - Use Mapbox Style objects with OpenLayers
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
 * @property {function(string, ResourceType): (Request|void)} [transformRequest]
 * Function for controlling how `ol-mapbox-style` fetches resources. Can be used for modifying
 * the url, adding headers or setting credentials options. Called with the url and the resource
 * type as arguments, this function is supposed to return a `Request` object. Without a return value,
 * the original request will not be modified. For `Tiles` and `GeoJSON` resources, only the `url` of
 * the returned request will be respected.
 * @property {Array<number>} [resolutions] Resolutions for mapping resolution to zoom level.
 * Only needed when working with non-standard tile grids or projections.
 * @property {string} [styleUrl] URL of the Mapbox GL style. Required for styles that were provided
 * as object, when they contain a relative sprite url, or sources referencing data by relative url.
 * @property {string} [accessTokenParam='access_token'] Access token param. For internal use.
 */
/** @typedef {'Style'|'Source'|'Sprite'|'SpriteImage'|'Tiles'|'GeoJSON'} ResourceType */
/** @typedef {import("ol/layer/Layer").default} Layer */
/** @typedef {import("ol/source/Source").default} Source */
/**
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {Options} Completed options with accessToken and accessTokenParam.
 */
function completeOptions(styleUrl, options) {
    if (!options.accessToken) {
        options = Object.assign({}, options);
        var searchParams = new URL(styleUrl).searchParams;
        // The last search parameter is the access token
        searchParams.forEach(function (value, key) {
            options.accessToken = value;
            options.accessTokenParam = key;
        });
    }
    return options;
}
/**
 * Applies a style function to an `ol/layer/VectorTile` or `ol/layer/Vector`
 * with an `ol/source/VectorTile` or an `ol/source/Vector`. If the layer does not have a source
 * yet, it will be created and populated from the information in the `glStyle`.
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
 *  * `mapbox-source`: The `id` of the Mapbox Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * @param {VectorTileLayer|VectorLayer} layer OpenLayers layer. When the layer has a source configured,
 * it will be modified to use the configuration from the glStyle's `source`. Options specified on the
 * layer's source will override those from the glStyle's `source`, except for `url`,
 * `tileUrlFunction` and `tileGrid` (exception: when the source projection is not `EPSG:3857`).
 * @param {string|Object} glStyle Mapbox Style object.
 * @param {string|Array<string>} sourceOrLayers `source` key or an array of layer `id`s from the
 * Mapbox Style object. When a `source` key is provided, all layers for the
 * specified source will be included in the style function. When layer `id`s
 * are provided, they must be from layers that use the same source. When not provided or a falsey
 * value, all layers using the first source specified in the glStyle will be rendered.
 * @param {Options|string} optionsOrPath Options. Alternatively the path of the style file
 * (only required when a relative path is used for the `"sprite"` property of the style).
 * @param {Array<number>} resolutions Resolutions for mapping resolution to zoom level.
 * Only needed when working with non-standard tile grids or projections.
 * @return {Promise} Promise which will be resolved when the style can be used
 * for rendering.
 */
function applyStyle(layer, glStyle, sourceOrLayers, optionsOrPath, resolutions) {
    if ( sourceOrLayers === void 0 ) sourceOrLayers = '';
    if ( optionsOrPath === void 0 ) optionsOrPath = {};
    if ( resolutions === void 0 ) resolutions = undefined;

    var styleUrl, sourceId;
    /** @type {Options} */
    var options;
    if (typeof optionsOrPath === 'string') {
        styleUrl = optionsOrPath;
        options = {};
    } else {
        styleUrl = optionsOrPath.styleUrl;
        options = optionsOrPath;
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
            var type = layer instanceof VectorTileLayer ? 'vector' : 'geojson';
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
                return reject(new Error(("No " + type + " source found in the glStyle.")));
            }
            function assignSource() {
                if (layer instanceof VectorTileLayer) {
                    return setupVectorSource(glStyle.sources[sourceId], styleUrl, options).then(function (source) {
                        var targetSource = layer.getSource();
                        if (!targetSource) {
                            layer.setSource(source);
                        } else if (source !== targetSource) {
                            targetSource.setTileUrlFunction(source.getTileUrlFunction());
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
                        if (!isFinite(layer.getMaxResolution()) && !isFinite(layer.getMinZoom())) {
                            var tileGrid = layer.getSource().getTileGrid();
                            layer.setMaxResolution(tileGrid.getResolution(tileGrid.getMinZoom()));
                        }
                    });
                } else {
                    var glSource = glStyle.sources[sourceId];
                    var source = layer.getSource();
                    if (!source || source.get('mapbox-source') !== glSource) {
                        source = setupGeoJSONSource(glSource, styleUrl, options);
                    }
                    var targetSource = layer.getSource();
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
            }
            var spriteScale, spriteData, spriteImageUrl, style;
            function onChange() {
                if (!style && (!glStyle.sprite || spriteData)) {
                    style = stylefunction(layer, glStyle, sourceOrLayers, resolutions, spriteData, spriteImageUrl, getFonts);
                    if (!layer.getStyle()) {
                        reject(new Error(("Nothing to show for source [" + sourceId + "]")));
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
                var sprite = new URL(normalizeSpriteUrl(glStyle.sprite, options.accessToken, styleUrl || location.href));
                spriteScale = window.devicePixelRatio >= 1.5 ? 0.5 : 1;
                var sizeFactor = spriteScale == 0.5 ? '@2x' : '';
                var spriteUrl = sprite.origin + sprite.pathname + sizeFactor + '.json' + sprite.search;
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
                        var transformed = options.transformRequest(spriteImageUrl, 'SpriteImage');
                        if (transformed instanceof Request) {
                            spriteImageUrl = encodeURI(transformed.url);
                        }
                    }
                    onChange();
                }).catch(function (err) {
                    reject(new Error(("Sprites cannot be loaded: " + spriteUrl + ": " + (err.message))));
                });
            } else {
                onChange();
            }
        }).catch(reject);
    });
}
var emptyObj = {};
function setBackground(mapOrLayer, layer) {
    var background = {
        id: layer.id,
        type: layer.type
    };
    var functionCache = {};
    function updateStyle(resolution) {
        var layout = layer.layout || {};
        var paint = layer.paint || {};
        background['paint'] = paint;
        var zoom = typeof mapOrLayer.getSource === 'function' ? mapOrLayer.getSource().getTileGrid().getZForResolution(resolution) : mapOrLayer.getView().getZoom();
        var element = typeof mapOrLayer.getTargetElement === 'function' ? mapOrLayer.getTargetElement() : undefined;
        var bg, opacity;
        if (paint['background-color'] !== undefined) {
            bg = getValue(background, 'paint', 'background-color', zoom, emptyObj, functionCache);
            if (element) {
                element.style.background = Color.parse(bg).toString();
            }
        }
        if (paint['background-opacity'] !== undefined) {
            opacity = getValue(background, 'paint', 'background-opacity', zoom, emptyObj, functionCache);
            if (element) {
                element.style.opacity = opacity;
            }
        }
        if (layout.visibility == 'none') {
            if (element) {
                element.style.backgroundColor = '';
                element.style.opacity = '';
            }
            return undefined;
        }
        return colorWithOpacity(bg, opacity);
    }
    if (typeof mapOrLayer.getTargetElement === 'function') {
        if (mapOrLayer.getTargetElement()) {
            updateStyle();
        }
        mapOrLayer.on([
            'change:resolution',
            'change:target'
        ], updateStyle);
    } else if (typeof mapOrLayer.setBackground === 'function') {
        mapOrLayer.setBackground(updateStyle);
    } else {
        throw new Error('Unable to apply background.');
    }
}
function setFirstBackground(mapOrLayer, glStyle) {
    glStyle.layers.some(function (layer) {
        if (layer.type === 'background') {
            setBackground(mapOrLayer, layer);
            return true;
        }
    });
}
/**
 * Applies properties of the Mapbox Style's first `background` layer to the
 * provided map or VectorTile layer.
 *
 * **Example:**
 * ```js
 * import {applyBackground} from 'ol-mapbox-style';
 * import {Map} from 'ol';
 *
 * const map = new Map({target: 'map'});
 * applyBackground(map, 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_OPENMAPTILES_TOKEN');
 * ```
 * @param {Map|VectorTileLayer} mapOrLayer OpenLayers Map or VectorTile layer.
 * @param {Object|string} glStyle Mapbox Style object or url.
 * @param {Options} options Options.
 * @return {Promise} Promise that resolves when the background is applied.
 */
function applyBackground(mapOrLayer, glStyle, options) {
    if ( options === void 0 ) options = {};

    if (typeof glStyle === 'object') {
        setFirstBackground(mapOrLayer, glStyle);
        return Promise.resolve();
    }
    return getGlStyle(glStyle, options).then(function (glStyle) {
        setFirstBackground(mapOrLayer, glStyle);
    });
}
function getSourceIdByRef(layers, ref) {
    var sourceId;
    layers.some(function (layer) {
        if (layer.id == ref) {
            sourceId = layer.source;
            return true;
        }
    });
    return sourceId;
}
function extentFromTileJSON(tileJSON) {
    var bounds = tileJSON.bounds;
    if (bounds) {
        var ll = fromLonLat([
            bounds[0],
            bounds[1]
        ]);
        var tr = fromLonLat([
            bounds[2],
            bounds[3]
        ]);
        return [
            ll[0],
            ll[1],
            tr[0],
            tr[1]
        ];
    }
}
/**
 * Creates an OpenLayers VectorTile source for a gl source entry.
 * @param {Object} glSource "source" entry from a Mapbox Style object.
 * @param {string|undefined} styleUrl URL to use for the source. This is expected to be the complete http(s) url,
 * with access key applied.
 * @param {Options} options Options.
 * @return {Promise<import("ol/source/VectorTile").default>} Promise resolving to a VectorTile source.
 * @private
 */
function setupVectorSource(glSource, styleUrl, options) {
    return new Promise(function (resolve, reject) {
        getTileJson(glSource, styleUrl, options).then(function (tileJSON) {
            var tileJSONSource = new TileJSON({ tileJSON: tileJSON });
            var tileJSONDoc = tileJSONSource.getTileJSON();
            var tileGrid = tileJSONSource.getTileGrid();
            var extent = extentFromTileJSON(tileJSONDoc);
            var minZoom = tileJSONDoc.minzoom || 0;
            var maxZoom = tileJSONDoc.maxzoom || 22;
            var sourceOptions = {
                attributions: tileJSONSource.getAttributions(),
                format: new MVT(),
                tileGrid: new TileGrid({
                    origin: tileGrid.getOrigin(0),
                    extent: extent || tileGrid.getExtent(),
                    minZoom: minZoom,
                    resolutions: defaultResolutions.slice(0, maxZoom + 1),
                    tileSize: 512
                })
            };
            if (Array.isArray(tileJSONDoc.tiles)) {
                sourceOptions.urls = tileJSONDoc.tiles;
            } else {
                sourceOptions.url = tileJSONDoc.tiles;
            }
            if (tileJSON.olSourceOptions) {
                Object.assign(sourceOptions, tileJSON.olSourceOptions);
            }
            resolve(new VectorTileSource(sourceOptions));
        }).catch(reject);
    });
}
function setupVectorLayer(glSource, styleUrl, options) {
    var layer = new VectorTileLayer({
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
function setupRasterLayer(glSource, styleUrl, options) {
    var layer = new TileLayer();
    getTileJson(glSource, styleUrl, options).then(function (tileJson) {
        var source = new TileJSON({
            transition: 0,
            crossOrigin: 'anonymous',
            tileJSON: tileJson
        });
        var extent = extentFromTileJSON(tileJson);
        var tileGrid = source.getTileGrid();
        var tileSize = glSource.tileSize || tileJson.tileSize || 512;
        var minZoom = tileJson.minzoom || 0;
        var maxZoom = tileJson.maxzoom || 22;
        //@ts-ignore
        source.tileGrid = new TileGrid({
            origin: tileGrid.getOrigin(0),
            extent: extent || tileGrid.getExtent(),
            minZoom: minZoom,
            resolutions: createXYZ({
                maxZoom: maxZoom,
                tileSize: tileSize
            }).getResolutions(),
            tileSize: tileSize
        });
        var getTileUrl = source.getTileUrlFunction();
        source.setTileUrlFunction(function (tileCoord, pixelRatio, projection) {
            var src = getTileUrl(tileCoord, pixelRatio, projection);
            if (src.indexOf('{bbox-epsg-3857}') != -1) {
                var bbox = source.getTileGrid().getTileCoordExtent(tileCoord);
                src = src.replace('{bbox-epsg-3857}', bbox.toString());
            }
            return src;
        });
        source.set('mapbox-source', glSource);
        layer.setSource(source);
    }).catch(function (error) {
        layer.setSource(undefined);
    });
    return layer;
}
var geoJsonFormat = new GeoJSON();
/**
 * @param {Object} glSource glStyle source.
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {VectorSource} Configured vector source.
 */
function setupGeoJSONSource(glSource, styleUrl, options) {
    var data = glSource.data;
    var sourceOptions = {};
    if (typeof data == 'string') {
        var geoJsonUrl = normalizeSourceUrl(data, options.accessToken, options.accessTokenParam || 'access_token', styleUrl || location.href);
        if (options.transformRequest) {
            var transformed = options.transformRequest(geoJsonUrl, 'GeoJSON');
            if (transformed instanceof Request) {
                geoJsonUrl = encodeURI(transformed.url);
            }
        }
        sourceOptions.url = geoJsonUrl;
    } else {
        sourceOptions.features = geoJsonFormat.readFeatures(data, { featureProjection: getUserProjection() || 'EPSG:3857' });
    }
    var source = new VectorSource(Object.assign({
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
function updateRasterLayerProperties(glLayer, layer, view, functionCache) {
    var zoom = view.getZoom();
    var opacity = getValue(glLayer, 'paint', 'raster-opacity', zoom, emptyObj, functionCache);
    layer.setOpacity(opacity);
}
function processStyle(glStyle, map, styleUrl, options) {
    var promises = [];
    var view = map.getView();
    if (!view.isDef() && !view.getRotation() && !view.getResolutions()) {
        view = new View(Object.assign(view.getProperties(), { maxResolution: defaultResolutions[0] }));
        map.setView(view);
    }
    if ('center' in glStyle && !view.getCenter()) {
        view.setCenter(fromLonLat(glStyle.center));
    }
    if ('zoom' in glStyle && view.getZoom() === undefined) {
        view.setResolution(defaultResolutions[0] / Math.pow(2, glStyle.zoom));
    }
    if (!view.getCenter() || view.getZoom() === undefined) {
        view.fit(view.getProjection().getExtent(), {
            nearest: true,
            size: map.getSize()
        });
    }
    var glLayers = glStyle.layers;
    var layerIds = [];
    var glLayer, glSource, glSourceId, id, layer;
    for (var i = 0, ii = glLayers.length; i < ii; ++i) {
        glLayer = glLayers[i];
        var type = glLayer.type;
        if (type == 'heatmap' || type == 'hillshade') {
            //FIXME Unsupported layer type
            throw new Error((type + " layers are not supported"));
        } else if (type == 'background') {
            setBackground(map, glLayer);
        } else {
            id = glLayer.source || getSourceIdByRef(glLayers, glLayer.ref);
            // this technique assumes gl layers will be in a particular order
            if (id != glSourceId) {
                if (layerIds.length) {
                    promises.push(finalizeLayer(layer, layerIds, glStyle, styleUrl, map, options));
                    layerIds = [];
                }
                glSource = glStyle.sources[id];
                if (glSource.type == 'vector') {
                    layer = setupVectorLayer(glSource, styleUrl, options);
                } else if (glSource.type == 'raster') {
                    layer = setupRasterLayer(glSource, styleUrl, options);
                    layer.setVisible(glLayer.layout ? glLayer.layout.visibility !== 'none' : true);
                    var functionCache = {};
                    view.on('change:resolution', updateRasterLayerProperties.bind(this, glLayer, layer, view, functionCache));
                    updateRasterLayerProperties(glLayer, layer, view, functionCache);
                } else if (glSource.type == 'geojson') {
                    layer = setupGeoJSONLayer(glSource, styleUrl, options);
                }
                glSourceId = id;
                if (layer) {
                    layer.set('mapbox-source', glSourceId);
                }
            }
            layerIds.push(glLayer.id);
        }
    }
    promises.push(finalizeLayer(layer, layerIds, glStyle, styleUrl, map, options));
    map.set('mapbox-style', glStyle);
    return Promise.all(promises);
}
/**
 * Loads and applies a Mapbox Style object into an OpenLayers Map. This includes
 * the map background, the layers, the center and the zoom.
 *
 * **Example:**
 * ```js
 * import apply from 'ol-mapbox-style';
 *
 * apply('map', 'mapbox://styles/mapbox/bright-v9', {accessToken: 'YOUR_MAPBOX_TOKEN'});
 * ```
 *
 * The center and zoom will only be set if present in the Mapbox Style document,
 * and if not already set on the OpenLayers map.
 *
 * Layers will be added to the OpenLayers map, without affecting any layers that
 * might already be set on the map.
 *
 * Layers added by `apply()` will have two additional properties:
 *
 *  * `mapbox-source`: The `id` of the Mapbox Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * This function sets an additional `mapbox-style` property on the OpenLayers
 * map instance, which holds the Mapbox Style object.
 *
 * @param {Map|HTMLElement|string} map Either an existing OpenLayers Map
 * instance, or a HTML element, or the id of a HTML element that will be the
 * target of a new OpenLayers Map.
 * @param {string|Object} style JSON style object or style url pointing to a
 * Mapbox Style object. When using Mapbox APIs, the url is the `styleUrl`
 * shown in Mapbox Studio's "share" panel. In addition, the `accessToken` option
 * (see below) must be set.
 * When passed as JSON style object, all OpenLayers layers created by `apply()`
 * will be immediately available, but they may not have a source yet (i.e. when
 * they are defined by a TileJSON url in the Mapbox Style document). When passed
 * as style url, layers will be added to the map when the Mapbox Style document
 * is loaded and parsed.
 * @param {Options} options Options.
 * @return {Promise<Map>} A promise that resolves after all layers have been added to
 * the OpenLayers Map instance, their sources set, and their styles applied. The
 * `resolve` callback will be called with the OpenLayers Map instance as
 * argument.
 */
function apply(map, style, options) {
    if ( options === void 0 ) options = {};

    var promise;
    if (typeof map === 'string' || map instanceof HTMLElement) {
        map = new Map({ target: map });
    }
    if (typeof style === 'string') {
        var styleUrl = style.startsWith('data:') ? location.href : normalizeStyleUrl(style, options.accessToken);
        options = completeOptions(styleUrl, options);
        promise = new Promise(function (resolve, reject) {
            getGlStyle(style, options).then(function (glStyle) {
                processStyle(glStyle, map, styleUrl, options).then(function () {
                    resolve(map);
                }).catch(reject);
            }).catch(function (err) {
                reject(new Error(("Could not load " + style + ": " + (err.message))));
            });
        });
    } else {
        promise = new Promise(function (resolve, reject) {
            processStyle(style, map, !options.styleUrl || options.styleUrl.startsWith('data:') ? location.href : normalizeStyleUrl(options.styleUrl, options.accessToken), options).then(function () {
                resolve(map);
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
 * @param {Map} map OpenLayers Map.
 * @param {Options} options Options.
 * @return {Promise} Returns a promise that resolves after the source has
 * been set on the specified layer, and the style has been applied.
 * @private
 */
function finalizeLayer(layer, layerIds, glStyle, styleUrl, map, options) {
    if ( options === void 0 ) options = {};

    var minZoom = 24;
    var maxZoom = 0;
    var glLayers = glStyle.layers;
    for (var i = 0, ii = glLayers.length; i < ii; ++i) {
        var glLayer = glLayers[i];
        if (layerIds.indexOf(glLayer.id) !== -1) {
            minZoom = Math.min('minzoom' in glLayer ? glLayer.minzoom : 0, minZoom);
            maxZoom = Math.max('maxzoom' in glLayer ? glLayer.maxzoom : 24, maxZoom);
        }
    }
    return new Promise(function (resolve, reject) {
        var setStyle = function () {
            var source = layer.getSource();
            if (!source || source.getState() === 'error') {
                reject(new Error('Error accessing data for source ' + layer.get('mapbox-source')));
                return;
            }
            if ('getTileGrid' in source) {
                var tileGrid = /** @type {import("ol/source/Tile.js").default|import("ol/source/VectorTile.js").default} */
                source.getTileGrid();
                if (tileGrid) {
                    var sourceMinZoom = tileGrid.getMinZoom();
                    if (minZoom > 0 || sourceMinZoom > 0) {
                        layer.setMaxResolution(Math.min(defaultResolutions[minZoom], tileGrid.getResolution(sourceMinZoom)) + 1e-9);
                    }
                    if (maxZoom < 24) {
                        layer.setMinResolution(defaultResolutions[maxZoom] + 1e-9);
                    }
                }
            }
            if (source instanceof VectorSource || source instanceof VectorTileSource) {
                applyStyle(layer, glStyle, layerIds, Object.assign({ styleUrl: styleUrl }, options)).then(function () {
                    layer.setVisible(true);
                    resolve();
                }).catch(reject);
            } else {
                resolve();
            }
        };
        layer.set('mapbox-layers', layerIds);
        if (map.getLayers().getArray().indexOf(layer) === -1) {
            map.addLayer(layer);
        }
        if (layer.getSource()) {
            setStyle();
        } else {
            layer.once('change:source', setStyle);
        }
    });
}
/**
 * Get the OpenLayers layer instance that contains the provided Mapbox Style
 * `layer`. Note that multiple Mapbox Style layers are combined in a single
 * OpenLayers layer instance when they use the same Mapbox Style `source`.
 * @param {Map} map OpenLayers Map.
 * @param {string} layerId Mapbox Style layer id.
 * @return {Layer} OpenLayers layer instance.
 */
function getLayer(map, layerId) {
    var layers = map.getLayers().getArray();
    for (var i = 0, ii = layers.length; i < ii; ++i) {
        var mapboxLayers = layers[i].get('mapbox-layers');
        if (mapboxLayers && mapboxLayers.indexOf(layerId) !== -1) {
            return layers[i];
        }
    }
}
/**
 * Get the OpenLayers layer instances for the provided Mapbox Style `source`.
 * @param {Map} map OpenLayers Map.
 * @param {string} sourceId Mapbox Style source id.
 * @return {Array<Layer>} OpenLayers layer instances.
 */
function getLayers(map, sourceId) {
    var result = [];
    var layers = map.getAllLayers();
    for (var i = 0, ii = layers.length; i < ii; ++i) {
        if (layers[i].get('mapbox-source') === sourceId) {
            result.push(layers[i]);
        }
    }
    return result;
}
/**
 * Get the OpenLayers source instance for the provided Mapbox Style `source`.
 * @param {Map} map OpenLayers Map.
 * @param {string} sourceId Mapbox Style source id.
 * @return {Source} OpenLayers source instance.
 */
function getSource(map, sourceId) {
    var layers = map.getLayers().getArray();
    for (var i = 0, ii = layers.length; i < ii; ++i) {
        var source = /** @type {Layer} */
        layers[i].getSource();
        if (layers[i].get('mapbox-source') === sourceId) {
            return source;
        }
    }
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
    var layers = 'getLayers' in mapOrLayer ? getLayers(mapOrLayer, feature.source) : [mapOrLayer];
    for (var i = 0, ii = layers.length; i < ii; ++i) {
        var featureState = layers[i].get('mapbox-featurestate');
        if (featureState) {
            if (state) {
                featureState[feature.id] = state;
            } else {
                delete featureState[feature.id];
            }
            layers[i].changed();
        } else {
            throw new Error(("Map or layer for source \"" + (feature.source) + "\" not found."));
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
    var layers = 'getLayers' in mapOrLayer ? getLayers(mapOrLayer, feature.source) : [mapOrLayer];
    for (var i = 0, ii = layers.length; i < ii; ++i) {
        var featureState = layers[i].get('mapbox-featurestate');
        if (featureState && featureState[feature.id]) {
            return featureState[feature.id];
        }
    }
    return null;
}

export { apply, applyBackground, applyStyle, apply as default, getFeatureState, getLayer, getLayers, getSource, recordStyleLayer, renderTransparent, setFeatureState, stylefunction };
//# sourceMappingURL=index.js.map
