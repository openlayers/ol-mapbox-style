/**
 * Generates a shaded relief image given elevation data.  Uses a 3x3
 * neighborhood for determining slope and aspect.
 * @param {Array<ImageData>} inputs Array of input images.
 * @param {Object} data Data added in the "beforeoperations" event.
 * @return {ImageData} Output image.
 */
export function hillshade(inputs, data) {
  const elevationImage = inputs[0];
  const width = elevationImage.width;
  const height = elevationImage.height;
  const elevationData = elevationImage.data;
  const shadeData = new Uint8ClampedArray(elevationData.length);
  const dp = data.resolution * 2;
  const maxX = width - 1;
  const maxY = height - 1;
  const pixel = [0, 0, 0, 0];
  const twoPi = 2 * Math.PI;
  const halfPi = Math.PI / 2;
  const sunEl = (Math.PI * data.sunEl) / 180;
  const sunAz = (Math.PI * data.sunAz) / 180;
  const cosSunEl = Math.cos(sunEl);
  const sinSunEl = Math.sin(sunEl);
  const highlightColor = data.highlightColor;
  const shadowColor = data.shadowColor;
  const accentColor = data.accentColor;
  const encoding = data.encoding;

  let pixelX,
    pixelY,
    x0,
    x1,
    y0,
    y1,
    offset,
    z0,
    z1,
    dzdx,
    dzdy,
    slope,
    aspect,
    accent,
    scaled,
    shade,
    scaledAccentColor,
    compositeShadeColor,
    clamp,
    slopeScaleBase,
    scaledSlope,
    cosIncidence;

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
      cosIncidence =
        sinSunEl * Math.cos(slope) +
        cosSunEl * Math.sin(slope) * Math.cos(sunAz - aspect);
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
      scaledSlope =
        data.opacity !== 0.5
          ? halfPi *
            ((Math.pow(slopeScaleBase, slope) - 1) /
              (Math.pow(slopeScaleBase, halfPi) - 1))
          : slope;

      // Accent hillshade color with given accentColor to emphasize rougher terrain
      scaledAccentColor = {
        r: (1 - accent) * accentColor.r * clamp * 255,
        g: (1 - accent) * accentColor.g * clamp * 255,
        b: (1 - accent) * accentColor.b * clamp * 255,
        a: (1 - accent) * accentColor.a * clamp * 255,
      };

      // Allows highlight vs shadow discrimination
      shade = Math.abs((((aspect + sunAz) / Math.PI + 0.5) % 2) - 1);
      // Creates a composite color mix between highlight & shadow colors to emphasize slopes
      compositeShadeColor = {
        r: (highlightColor.r * (1 - shade) + shadowColor.r * shade) * scaled,
        g: (highlightColor.g * (1 - shade) + shadowColor.g * shade) * scaled,
        b: (highlightColor.b * (1 - shade) + shadowColor.b * shade) * scaled,
        a: (highlightColor.a * (1 - shade) + shadowColor.a * shade) * scaled,
      };

      // Fill in result color value
      offset = (pixelY * width + pixelX) * 4;
      shadeData[offset] =
        scaledAccentColor.r * (1 - shade) + compositeShadeColor.r;
      shadeData[offset + 1] =
        scaledAccentColor.g * (1 - shade) + compositeShadeColor.g;
      shadeData[offset + 2] =
        scaledAccentColor.b * (1 - shade) + compositeShadeColor.b;
      // Key opacity on the scaledSlope to improve legibility by increasing higher elevation rates' contrast
      shadeData[offset + 3] =
        elevationData[offset + 3] *
        data.opacity *
        clamp *
        Math.sin(scaledSlope);
    }
  }

  return new ImageData(shadeData, width, height);
}

export function raster(inputs, data) {
  const image = inputs[0];
  const width = image.width;
  const height = image.height;
  const imageData = image.data;
  const shadeData = new Uint8ClampedArray(imageData.length);
  const maxX = width - 1;
  const maxY = height - 1;
  const pixel = [0, 0, 0, 0];

  let pixelX, pixelY, x0, offset;

  // [start] from <https://stackoverflow.com/a/9493060>
  const hueToRgb = (p, q, t) => {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  };

  /**
   * @param {number} h  The hue value
   * @param {number} s  The saturation value
   * @param {number} l  The lightness value
   *
   * @return {[number, number, number]} [r,g,b] 0-255
   */
  function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
      r = l;
      g = l;
      b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  /**
   * Converts an RGB color value to HSL. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
   * Assumes r, g, and b are contained in the set [0, 255] and
   * returns h, s, and l in the set [0, 1].
   *
   * @param   {number}  r       The red color value
   * @param   {number}  g       The green color value
   * @param   {number}  b       The blue color value
   * @return  {Array}           The HSL representation
   */
  function rgbToHsl(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);
    const vmax = Math.max(r, g, b),
      vmin = Math.min(r, g, b);
    let h;
    const l = (vmax + vmin) / 2;

    if (vmax === vmin) {
      return [0, 0, l]; // achromatic
    }

    const d = vmax - vmin;
    const s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
    if (vmax === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    }
    if (vmax === g) {
      h = (b - r) / d + 2;
    }
    if (vmax === b) {
      h = (r - g) / d + 4;
    }
    h /= 6;

    return [h, s, l];
  }
  // [end] from <https://stackoverflow.com/a/9493060>

  const hOffset = (1 / 360) * data.hue;
  // const sOffset = data.saturation;

  for (pixelY = 0; pixelY <= maxY; ++pixelY) {
    for (pixelX = 0; pixelX <= maxX; ++pixelX) {
      x0 = pixelX === 0 ? 0 : pixelX - 1;

      offset = (pixelY * width + x0) * 4;
      pixel[0] = imageData[offset];
      pixel[1] = imageData[offset + 1];
      pixel[2] = imageData[offset + 2];
      pixel[3] = imageData[offset + 3];

      const hsl = rgbToHsl(pixel[0], pixel[1], pixel[2]);
      let [h, s] = hsl;
      const l = hsl[2];

      h += hOffset;
      h = h % 1;

      // s += sOffset;
      // s = Math.max(0, Math.min(s, 1));

      const [r, g, b] = hslToRgb(h, s, l);
      shadeData[offset] = r;
      shadeData[offset + 1] = g;
      shadeData[offset + 2] = b;
      shadeData[offset + 3] =
        data.opacity !== undefined ? data.opacity * 255 : pixel[3];
    }
  }

  return new ImageData(shadeData, width, height);
}
