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
  const PI = Math.PI;
  const azimuth = (data.sunAz * PI) / 180 + PI;
  const shadowColor = data.shadowColor;
  const highlightColor = data.highlightColor;
  const accentColor = data.accentColor;
  const encoding = data.encoding;
  const intensity = data.exaggeration;

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
    base,
    scaledSlope,
    accent,
    shade,
    accentScale,
    shadeScale,
    shade_r,
    shade_g,
    shade_b,
    shade_a,
    accent_r,
    accent_g,
    accent_b,
    accent_a;

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
    return 0;
  }

  function get_aspect(dzdx, dzdy) {
    if (dzdx !== 0) {
      return Math.atan2(dzdy, -dzdx);
    }
    return (PI / 2) * (dzdy > 0 ? 1 : -1);
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
      z0 = calculateElevation(pixel, encoding);

      // determine elevation for (x1, pixelY)
      offset = (pixelY * width + x1) * 4;
      pixel[0] = elevationData[offset];
      pixel[1] = elevationData[offset + 1];
      pixel[2] = elevationData[offset + 2];
      pixel[3] = elevationData[offset + 3];
      z1 = calculateElevation(pixel, encoding);

      dzdx = (z1 - z0) / dp;

      // determine elevation for (pixelX, y0)
      offset = (y0 * width + pixelX) * 4;
      pixel[0] = elevationData[offset];
      pixel[1] = elevationData[offset + 1];
      pixel[2] = elevationData[offset + 2];
      pixel[3] = elevationData[offset + 3];
      z0 = calculateElevation(pixel, encoding);

      // determine elevation for (pixelX, y1)
      offset = (y1 * width + pixelX) * 4;
      pixel[0] = elevationData[offset];
      pixel[1] = elevationData[offset + 1];
      pixel[2] = elevationData[offset + 2];
      pixel[3] = elevationData[offset + 3];
      z1 = calculateElevation(pixel, encoding);

      dzdy = (z1 - z0) / dp;

      /*
       * The following is port of MapLibre's standrad_hillshade
       * https://github.com/maplibre/maplibre-gl-js/blob/main/src/shaders/hillshade.fragment.glsl
       */
      slope = Math.atan(0.625 * Math.sqrt(dzdx * dzdx + dzdy * dzdy));
      aspect = get_aspect(dzdx, dzdy);

      // Intensity basis for hillshade opacity
      base = 1.875 - intensity * 1.75;
      const maxValue = 0.5 * PI;

      // Intensity interpolation
      if (intensity !== 0.5) {
        scaledSlope =
          ((Math.pow(base, slope) - 1) / (Math.pow(base, maxValue) - 1)) *
          maxValue;
      } else {
        scaledSlope = slope;
      }

      // Accent
      accent = Math.cos(scaledSlope);
      const intensityScale = Math.min(Math.max(intensity * 2, 0), 1);
      accentScale = (1 - accent) * intensityScale;
      accent_r = accentColor.r * accentScale;
      accent_g = accentColor.g * accentScale;
      accent_b = accentColor.b * accentScale;
      accent_a = accentColor.a * accentScale;

      // Shade
      let val = (aspect + azimuth) / PI + 0.5;
      val = val % 2;
      if (val < 0) {
        val += 2;
      }
      shade = Math.abs(val - 1);

      shadeScale = Math.sin(scaledSlope) * intensityScale;
      shade_r =
        (shadowColor.r * (1 - shade) + highlightColor.r * shade) * shadeScale;
      shade_g =
        (shadowColor.g * (1 - shade) + highlightColor.g * shade) * shadeScale;
      shade_b =
        (shadowColor.b * (1 - shade) + highlightColor.b * shade) * shadeScale;
      shade_a =
        (shadowColor.a * (1 - shade) + highlightColor.a * shade) * shadeScale;

      const r = accent_r * (1 - shade_a) + shade_r;
      const g = accent_g * (1 - shade_a) + shade_g;
      const b = accent_b * (1 - shade_a) + shade_b;
      const a = accent_a * (1 - shade_a) + shade_a;

      // Fill in result color value
      offset = (pixelY * width + pixelX) * 4;
      shadeData[offset] = r * 255;
      shadeData[offset + 1] = g * 255;
      shadeData[offset + 2] = b * 255;
      shadeData[offset + 3] = a * 255;
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

  let pixelX, pixelY, offset;

  /*
   * The following functions have the same math as <https://github.com/maplibre/maplibre-gl-js/blob/5518ede00ef769fed1ca4f54f6d970885987fb22/src/render/program/raster_program.ts#L76>
   *   - calculateContrastFactor
   *   - calculateSaturationFactor
   *   - generateSpinWeights
   */
  function calculateContrastFactor(contrast) {
    return contrast > 0 ? 1 / (1 - contrast) : 1 + contrast;
  }

  function calculateSaturationFactor(saturation) {
    return saturation > 0 ? 1 - 1 / (1.001 - saturation) : -saturation;
  }

  function generateSpinWeights(angle) {
    angle *= Math.PI / 180;
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    return [
      (2 * c + 1) / 3,
      (-Math.sqrt(3) * s - c + 1) / 3,
      (Math.sqrt(3) * s - c + 1) / 3,
    ];
  }

  const sFactor = calculateSaturationFactor(data.saturation);
  const cFactor = calculateContrastFactor(data.contrast);

  const cSpinWeights = generateSpinWeights(data.hueRotate);
  const cSpinWeightsXYZ = cSpinWeights;
  const cSpinWeightsZXY = [cSpinWeights[2], cSpinWeights[0], cSpinWeights[1]];
  const cSpinWeightsYZX = [cSpinWeights[1], cSpinWeights[2], cSpinWeights[0]];

  const bLow = data.brightnessLow;
  const bHigh = data.brightnessHigh;

  for (pixelY = 0; pixelY <= maxY; ++pixelY) {
    for (pixelX = 0; pixelX <= maxX; ++pixelX) {
      offset = (pixelY * width + pixelX) * 4;
      pixel[0] = imageData[offset];
      pixel[1] = imageData[offset + 1];
      pixel[2] = imageData[offset + 2];
      pixel[3] = imageData[offset + 3];

      const or = pixel[0];
      const og = pixel[1];
      const ob = pixel[2];

      const dotProduct = (vector1, vector2) => {
        let result = 0;
        for (let i = 0; i < vector1.length; i++) {
          result += vector1[i] * vector2[i];
        }
        return result;
      };

      // hue-rotate
      let r = dotProduct([or, og, ob], cSpinWeightsXYZ);
      let g = dotProduct([or, og, ob], cSpinWeightsZXY);
      let b = dotProduct([or, og, ob], cSpinWeightsYZX);

      // saturation
      const average = (r + g + b) / 3;
      r += (average - r) * sFactor;
      g += (average - g) * sFactor;
      b += (average - b) * sFactor;

      // contrast
      r = (r - 0.5) * cFactor + 0.5;
      g = (g - 0.5) * cFactor + 0.5;
      b = (b - 0.5) * cFactor + 0.5;

      // brightness
      r = bLow * (255 - r) + bHigh * r;
      g = bLow * (255 - g) + bHigh * g;
      b = bLow * (255 - b) + bHigh * b;

      shadeData[offset] = r;
      shadeData[offset + 1] = g;
      shadeData[offset + 2] = b;
      shadeData[offset + 3] = pixel[3];
    }
  }

  return new ImageData(shadeData, width, height);
}
