import {applyStyle} from './index';
import MVT from 'ol/format/MVT';
import SourceState from 'ol/source/State';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';

const mapboxBaseURL = 'https://api.mapbox.com';

function getMapboxPath(url) {
  const startsWith = 'mapbox://';
  if (url.indexOf(startsWith) !== 0) {
    return '';
  }
  return url.slice(startsWith.length);
}

function normalizeSpriteURL(url, token) {
  const mapboxPath = getMapboxPath(url);
  if (!mapboxPath) {
    return url;
  }
  const startsWith = 'sprites/';
  if (mapboxPath.indexOf(startsWith) !== 0) {
    throw new Error(`unexpected sprites url: ${url}`);
  }
  const sprite = mapboxPath.slice(startsWith.length);

  return `${mapboxBaseURL}/styles/v1/${sprite}/sprite?access_token=${token}`;
}

function normalizeStyleURL(url, token) {
  const mapboxPath = getMapboxPath(url);
  if (!mapboxPath) {
    return url;
  }
  const startsWith = 'styles/';
  if (mapboxPath.indexOf(startsWith) !== 0) {
    throw new Error(`unexpected style url: ${url}`);
  }
  const style = mapboxPath.slice(startsWith.length);

  return `${mapboxBaseURL}/styles/v1/${style}?&access_token=${token}`;
}

function normalizeSourceURL(url, token) {
  const mapboxPath = getMapboxPath(url);
  if (!mapboxPath) {
    return url;
  }
  return `https://{a-d}.tiles.mapbox.com/v4/${mapboxPath}/{z}/{x}/{y}.vector.pbf?access_token=${token}`;
}

export default class MapboxLayer extends VectorTileLayer {
  constructor(options) {
    const superOptions = Object.assign({
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

    super(superOptions);

    this.sourceId = options.source;
    this.layers = options.layers;
    this.accessToken = options.accessToken;
    this.fetchStyle(options.styleURL);
  }

  fetchStyle(styleURL) {
    const url = normalizeStyleURL(styleURL, this.accessToken);
    fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(`unexpected response when fetching style: ${response.status}`);
      }
      return response.json();
    }).then(style => {
      this.onStyleLoad(style);
    }).catch(error => {
      this.handleError(error);
    });
  }

  onStyleLoad(style) {
    let sourceId;
    let sourceIdOrLayersList;
    if (this.layers) {
      // confirm all layers share the same source
      const lookup = {};
      for (let i = 0; i < style.layers.length; ++i) {
        const layer = style.layers[i];
        if (layer.source) {
          lookup[layer.id] = layer.source;
        }
      }
      let firstSource;
      for (let i = 0; i < this.layers.length; ++i) {
        const candidate = lookup[this.layers[i]];
        if (!candidate) {
          this.handleError(new Error(`could not find source for ${this.layers[i]}`));
          return;
        }
        if (!firstSource) {
          firstSource = candidate;
        } else if (firstSource !== candidate) {
          this.handleError(new Error(`layers can only use a single source, found ${firstSource} and ${candidate}`));
          return;
        }
      }
      sourceId = firstSource;
      sourceIdOrLayersList = this.layers;
    } else {
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

    const styleSource = style.sources[sourceId];
    if (styleSource.type !== 'vector') {
      this.handleError(new Error(`only works for vector sources, found ${styleSource.type}`));
      return;
    }

    const source = this.getSource();
    source.setUrl(normalizeSourceURL(styleSource.url, this.accessToken));

    applyStyle(this, style, sourceIdOrLayersList).then(() => {
      source.setState(SourceState.READY);
    }).catch(error => {
      this.handleError(error);
    });
  }

  handleError(error) {
    // TODO: make this error accessible to an error listener
    console.error(error); // eslint-disable-line
    const source = this.getSource();
    source.setState(SourceState.ERROR);
  }
}
