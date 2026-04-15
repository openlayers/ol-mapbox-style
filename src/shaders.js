/**
 * Generates a shaded relief image given elevation data.  Uses a 3x3
 * neighborhood for determining slope and aspect.
 * Supports multiple hillshade algorithms matching MapLibre's
 * {@link https://github.com/maplibre/maplibre-gl-js/blob/main/src/shaders/hillshade.fragment.glsl hillshade.fragment.glsl}:
 * standard, basic, combined, igor, and multidirectional.
 * @type {import('ol/source/Raster.js').Operation}
 */
export function hillshade(inputs, data) {
  const elevationImage = /** @type {ImageData} */ (inputs[0]);
  const width = elevationImage.width;
  const height = elevationImage.height;
  const elevationData = elevationImage.data;
  const shadeData = new Uint8ClampedArray(elevationData.length);
  const dp = data.resolution * 2;
  const maxX = width - 1;
  const maxY = height - 1;
  const pixel = [0, 0, 0, 0];
  const PI = Math.PI;
  const encoding = data.encoding;
  const intensity = data.exaggeration;
  const zoom = data.zoom;
  const method = data.method || 'standard';

  // Colors
  const accentColor = data.accentColor;
  const shadowColors = data.shadowColors || [data.shadowColor];
  const highlightColors = data.highlightColors || [data.highlightColor];

  // Azimuths in radians
  const azimuths = data.azimuths || [data.sunAz];
  const azimuthsRad = azimuths.map((a) => (a * PI) / 180);

  // Altitudes in radians (for basic, combined, multidirectional)
  const altitudes = data.altitudes || [45];
  const altitudesRad = altitudes.map((a) => (a * PI) / 180);

  // Number of light sources (for multidirectional, max 4)
  const numSources = Math.min(
    azimuthsRad.length,
    altitudesRad.length,
    shadowColors.length,
    highlightColors.length,
    4,
  );

  // Zoom-dependent exaggeration factor from MapLibre's hillshade_prepare.fragment.glsl
  // At low zooms, derivatives are amplified so hillshading remains visible.
  const exaggerationFactor = zoom < 2 ? 0.4 : zoom < 4.5 ? 0.35 : 0.3;
  const zoomExaggeration =
    zoom < 15 ? Math.pow(2, (15 - zoom) * exaggerationFactor) : 1;

  function calculateElevation(pixel, encoding = 'mapbox') {
    if (encoding === 'mapbox') {
      return (pixel[0] * 256 * 256 + pixel[1] * 256 + pixel[2]) * 0.1 - 10000;
    }
    if (encoding === 'terrarium') {
      return pixel[0] * 256 + pixel[1] + pixel[2] / 256 - 32768;
    }
    return 0;
  }

  function getAspect(dzdx, dzdy) {
    if (dzdx !== 0) {
      return Math.atan2(dzdy, -dzdx);
    }
    return (PI / 2) * (dzdy > 0 ? 1 : -1);
  }

  // Per-pixel shading for standard (legacy) algorithm
  function standardShade(dzdx, dzdy) {
    const azimuth = azimuthsRad[0] + PI;
    const slope = Math.atan(0.625 * Math.sqrt(dzdx * dzdx + dzdy * dzdy));
    const aspect = getAspect(dzdx, dzdy);

    const base = 1.875 - intensity * 1.75;
    const maxValue = 0.5 * PI;
    const scaledSlope =
      intensity !== 0.5
        ? ((Math.pow(base, slope) - 1) / (Math.pow(base, maxValue) - 1)) *
          maxValue
        : slope;

    // Accent color
    const accent = Math.cos(scaledSlope);
    const intensityScale = Math.min(Math.max(intensity * 2, 0), 1);
    const accentScale = (1 - accent) * intensityScale;
    const ac = accentColor;
    const ar = ac.r * accentScale;
    const ag = ac.g * accentScale;
    const ab = ac.b * accentScale;
    const aa = ac.a * accentScale;

    // Shade color
    let val = (aspect + azimuth) / PI + 0.5;
    val = val % 2;
    if (val < 0) {
      val += 2;
    }
    const shade = Math.abs(val - 1);

    const shadeScale = Math.sin(scaledSlope) * intensityScale;
    const sc = shadowColors[0];
    const hc = highlightColors[0];
    const sr = (sc.r * (1 - shade) + hc.r * shade) * shadeScale;
    const sg = (sc.g * (1 - shade) + hc.g * shade) * shadeScale;
    const sb = (sc.b * (1 - shade) + hc.b * shade) * shadeScale;
    const sa = (sc.a * (1 - shade) + hc.a * shade) * shadeScale;

    // Composite (premultiplied alpha)
    return [
      ar * (1 - sa) + sr,
      ag * (1 - sa) + sg,
      ab * (1 - sa) + sb,
      aa * (1 - sa) + sa,
    ];
  }

  // Igor algorithm - minimizes effects on underlying map features
  // Based on Maperitive's Igor algorithm
  function igorShade(dzdx, dzdy) {
    dzdx *= intensity * 2;
    dzdy *= intensity * 2;
    const aspect = getAspect(dzdx, dzdy);
    const azimuth = azimuthsRad[0] + PI;
    const slopeStrength =
      Math.atan(Math.sqrt(dzdx * dzdx + dzdy * dzdy)) * (2 / PI);

    let val = (aspect + azimuth) / PI + 0.5;
    val = val % 2;
    if (val < 0) {
      val += 2;
    }
    const aspectStrength = 1 - Math.abs(val - 1);

    const shadowStr = slopeStrength * aspectStrength;
    const highlightStr = slopeStrength * (1 - aspectStrength);

    const sc = shadowColors[0];
    const hc = highlightColors[0];
    return [
      sc.r * shadowStr + hc.r * highlightStr,
      sc.g * shadowStr + hc.g * highlightStr,
      sc.b * shadowStr + hc.b * highlightStr,
      sc.a * shadowStr + hc.a * highlightStr,
    ];
  }

  // Basic hillshade - simple physics-based model (similar to GDAL default)
  function basicShade(dzdx, dzdy) {
    dzdx *= intensity * 2;
    dzdy *= intensity * 2;
    const azimuth = azimuthsRad[0] + PI;
    const cosAz = Math.cos(azimuth);
    const sinAz = Math.sin(azimuth);
    const cosAlt = Math.cos(altitudesRad[0]);
    const sinAlt = Math.sin(altitudesRad[0]);

    const cang =
      (sinAlt - (dzdy * cosAz * cosAlt - dzdx * sinAz * cosAlt)) /
      Math.sqrt(1 + dzdx * dzdx + dzdy * dzdy);
    const shade = Math.max(0, Math.min(1, cang));

    if (shade > 0.5) {
      const f = 2 * shade - 1;
      const c = highlightColors[0];
      return [c.r * f, c.g * f, c.b * f, c.a * f];
    }
    const f = 1 - 2 * shade;
    const c = shadowColors[0];
    return [c.r * f, c.g * f, c.b * f, c.a * f];
  }

  // Combined hillshade - combines slope and oblique shading (similar to GDAL -combined)
  function combinedShade(dzdx, dzdy) {
    dzdx *= intensity * 2;
    dzdy *= intensity * 2;
    const azimuth = azimuthsRad[0] + PI;
    const cosAz = Math.cos(azimuth);
    const sinAz = Math.sin(azimuth);
    const cosAlt = Math.cos(altitudesRad[0]);
    const sinAlt = Math.sin(altitudesRad[0]);

    let cang = Math.acos(
      (sinAlt - (dzdy * cosAz * cosAlt - dzdx * sinAz * cosAlt)) /
        Math.sqrt(1 + dzdx * dzdx + dzdy * dzdy),
    );
    cang = Math.max(0, Math.min(PI / 2, cang));

    const slopeAtan =
      Math.atan(Math.sqrt(dzdx * dzdx + dzdy * dzdy)) * (4 / PI / PI);
    const shade = cang * slopeAtan;
    const highlight = (PI / 2 - cang) * slopeAtan;

    const sc = shadowColors[0];
    const hc = highlightColors[0];
    return [
      sc.r * shade + hc.r * highlight,
      sc.g * shade + hc.g * highlight,
      sc.b * shade + hc.b * highlight,
      sc.a * shade + hc.a * highlight,
    ];
  }

  // Multidirectional hillshade - combines illumination from multiple light sources
  // Based on USGS methodology
  function multidirectionalShade(dzdx, dzdy) {
    dzdx *= intensity * 2;
    dzdy *= intensity * 2;
    const dotDeriv = dzdx * dzdx + dzdy * dzdy;
    const sqrtDot = Math.sqrt(1 + dotDeriv);

    let rr = 0;
    let rg = 0;
    let rb = 0;
    let ra = 0;

    for (let i = 0; i < numSources; i++) {
      const cosAlt = Math.cos(altitudesRad[i]);
      const sinAlt = Math.sin(altitudesRad[i]);
      // Note: multidirectional uses -cos/-sin (no +PI offset)
      const cosAz = -Math.cos(azimuthsRad[i]);
      const sinAz = -Math.sin(azimuthsRad[i]);

      const cang =
        (sinAlt - (dzdy * cosAz * cosAlt - dzdx * sinAz * cosAlt)) / sqrtDot;
      const shade = Math.max(0, Math.min(1, cang));

      const sc = shadowColors[Math.min(i, shadowColors.length - 1)];
      const hc = highlightColors[Math.min(i, highlightColors.length - 1)];

      if (shade > 0.5) {
        const f = (2 * shade - 1) / numSources;
        rr += hc.r * f;
        rg += hc.g * f;
        rb += hc.b * f;
        ra += hc.a * f;
      } else {
        const f = (1 - 2 * shade) / numSources;
        rr += sc.r * f;
        rg += sc.g * f;
        rb += sc.b * f;
        ra += sc.a * f;
      }
    }

    return [rr, rg, rb, ra];
  }

  // Select shading function based on method
  const shadeFn =
    method === 'igor'
      ? igorShade
      : method === 'basic'
        ? basicShade
        : method === 'combined'
          ? combinedShade
          : method === 'multidirectional'
            ? multidirectionalShade
            : standardShade;

  let pixelX, pixelY, x0, x1, y0, y1, offset, z0, z1, dzdx, dzdy;

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

      dzdx = ((z1 - z0) / dp) * zoomExaggeration;

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

      dzdy = ((z1 - z0) / dp) * zoomExaggeration;

      // Compute shading (result is premultiplied alpha)
      const result = shadeFn(dzdx, dzdy);

      // Un-premultiply for Canvas ImageData (straight alpha)
      const a = result[3];
      offset = (pixelY * width + pixelX) * 4;
      if (a > 0) {
        shadeData[offset] = (result[0] / a) * 255;
        shadeData[offset + 1] = (result[1] / a) * 255;
        shadeData[offset + 2] = (result[2] / a) * 255;
      }
      shadeData[offset + 3] = a * 255;
    }
  }

  return new ImageData(shadeData, width, height);
}

/** @type {import('ol/source/Raster.js').Operation} */
export function raster(inputs, data) {
  const image = /** @type {ImageData} */ (inputs[0]);
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
      r = (r - 127.5) * cFactor + 127.5;
      g = (g - 127.5) * cFactor + 127.5;
      b = (b - 127.5) * cFactor + 127.5;

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
