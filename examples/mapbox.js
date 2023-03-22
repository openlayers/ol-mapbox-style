/*
 * @Description: 
 * @Date: 2023-03-22 15:03:53
 * @LastEditors: Yuanxy
 * @LastEditTime: 2023-03-22 15:25:06
 * @FilePath: \ol-mapbox-style\examples\mapbox.js
 * @Author: Yuanxy 
 */
import 'ol/ol.css';
import {apply,updateMapboxLayer} from 'ol-mapbox-style';

let key = document.cookie.replace(
  /(?:(?:^|.*;\s*)mapbox_access_token\s*\=\s*([^;]*).*$)|^.*$/,
  '$1'
);
if (!key) {
  key = window.prompt('Enter your Mapbox API access token:');
  if (key) {
    document.cookie =
      'mapbox_access_token=' + key + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
  }
}

apply('map', 'mapbox://styles/mapbox/bright-v9', {accessToken: key}).then((res) => {
  updateMapboxLayer(res,{
    "id": "landuse_overlay_national_park",
    "type": "fill",
    "source": "mapbox",
    "source-layer": "landuse_overlay",
    "filter": [
      "==",
      "class",
      "national_park"
    ],
    "paint": {
      "fill-color": "#0000CD",
      "fill-opacity": 0.75
    },
    "metadata": {
      "mapbox:group": "1444849388993.3071"
    },
    "interactive": true
  })
})


