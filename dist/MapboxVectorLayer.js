var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { applyStyle } from './index';
import MVT from 'ol/format/MVT';
import SourceState from 'ol/source/State';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
var mapboxBaseURL = 'https://api.mapbox.com';
function getMapboxPath(url) {
    var startsWith = 'mapbox://';
    if (url.indexOf(startsWith) !== 0) {
        return '';
    }
    return url.slice(startsWith.length);
}
function normalizeSpriteURL(url, token) {
    var mapboxPath = getMapboxPath(url);
    if (!mapboxPath) {
        return url;
    }
    var startsWith = 'sprites/';
    if (mapboxPath.indexOf(startsWith) !== 0) {
        throw new Error("unexpected sprites url: " + url);
    }
    var sprite = mapboxPath.slice(startsWith.length);
    return mapboxBaseURL + "/styles/v1/" + sprite + "/sprite?access_token=" + token;
}
function normalizeStyleURL(url, token) {
    var mapboxPath = getMapboxPath(url);
    if (!mapboxPath) {
        return url;
    }
    var startsWith = 'styles/';
    if (mapboxPath.indexOf(startsWith) !== 0) {
        throw new Error("unexpected style url: " + url);
    }
    var style = mapboxPath.slice(startsWith.length);
    return mapboxBaseURL + "/styles/v1/" + style + "?&access_token=" + token;
}
function normalizeSourceURL(url, token) {
    var mapboxPath = getMapboxPath(url);
    if (!mapboxPath) {
        return url;
    }
    return "https://{a-d}.tiles.mapbox.com/v4/" + mapboxPath + "/{z}/{x}/{y}.vector.pbf?access_token=" + token;
}
var MapboxVectorLayer = /** @class */ (function (_super) {
    __extends(MapboxVectorLayer, _super);
    function MapboxVectorLayer(options) {
        var _this = this;
        var superOptions = Object.assign({
            declutter: true
        }, options);
        delete superOptions.styleURL;
        delete superOptions.source;
        delete superOptions.layers;
        delete superOptions.accessToken;
        superOptions.source = new VectorTileSource({
            state: SourceState.LOADING,
            format: new MVT()
        });
        _this = _super.call(this, superOptions) || this;
        _this.sourceId = options.source;
        _this.layers = options.layers;
        _this.accessToken = options.accessToken;
        _this.fetchStyle(options.styleURL);
        return _this;
    }
    MapboxVectorLayer.prototype.fetchStyle = function (styleURL) {
        var _this = this;
        var url = normalizeStyleURL(styleURL, this.accessToken);
        fetch(url).then(function (response) {
            if (!response.ok) {
                throw new Error("unexpected response when fetching style: " + response.status);
            }
            return response.json();
        }).then(function (style) {
            _this.onStyleLoad(style);
        }).catch(function (error) {
            _this.handleError(error);
        });
    };
    MapboxVectorLayer.prototype.onStyleLoad = function (style) {
        var _this = this;
        var sourceId;
        var sourceIdOrLayersList;
        if (this.layers) {
            // confirm all layers share the same source
            var lookup = {};
            for (var i = 0; i < style.layers.length; ++i) {
                var layer = style.layers[i];
                if (layer.source) {
                    lookup[layer.id] = layer.source;
                }
            }
            var firstSource = void 0;
            for (var i = 0; i < this.layers.length; ++i) {
                var candidate = lookup[this.layers[i]];
                if (!candidate) {
                    this.handleError(new Error("could not find source for " + this.layers[i]));
                    return;
                }
                if (!firstSource) {
                    firstSource = candidate;
                }
                else if (firstSource !== candidate) {
                    this.handleError(new Error("layers can only use a single source, found " + firstSource + " and " + candidate));
                    return;
                }
            }
            sourceId = firstSource;
            sourceIdOrLayersList = this.layers;
        }
        else {
            sourceId = this.sourceId;
            sourceIdOrLayersList = sourceId;
        }
        if (!sourceIdOrLayersList) {
            // default to the first source in the style
            sourceId = Object.keys(style.sources)[0];
            sourceIdOrLayersList = sourceId;
        }
        if (style.sprite) {
            style.sprite = normalizeSpriteURL(style.sprite, this.accessToken);
        }
        var styleSource = style.sources[sourceId];
        if (styleSource.type !== 'vector') {
            this.handleError(new Error("only works for vector sources, found " + styleSource.type));
            return;
        }
        var source = this.getSource();
        source.setUrl(normalizeSourceURL(styleSource.url, this.accessToken));
        applyStyle(this, style, sourceIdOrLayersList).then(function () {
            source.setState(SourceState.READY);
        }).catch(function (error) {
            _this.handleError(error);
        });
    };
    MapboxVectorLayer.prototype.handleError = function (error) {
        // TODO: make this error accessible to an error listener
        console.error(error); // eslint-disable-line
        var source = this.getSource();
        source.setState(SourceState.ERROR);
    };
    return MapboxVectorLayer;
}(VectorTileLayer));
export default MapboxVectorLayer;
//# sourceMappingURL=MapboxVectorLayer.js.map