import olms, {
  apply,
  applyBackground,
  applyStyle,
  getFeatureState,
  setFeatureState,
} from './index.js';
import stylefunction, {
  recordStyleLayer,
  renderTransparent,
} from './stylefunction.js';
import {assign} from 'ol/obj.js';

assign(olms, {
  apply,
  applyBackground,
  applyStyle,
  setFeatureState,
  getFeatureState,
  stylefunction,
  recordStyleLayer,
  renderTransparent,
});

export default olms;
