export function deg2rad(degrees) {
  return degrees * Math.PI / 180;
}

export function getZoomForResolution(resolution, resolutions) {
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
