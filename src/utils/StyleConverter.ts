export function px2Rem(px: number, base?: number) {
  return `${px / (base && !Number.isNaN(base) && base > 0 ? base : 16)}rem`;
}

export function roundDown(num: number, decimal: number) {
  return Math.floor((num + Number.EPSILON) * 10 ** decimal) / 10 ** decimal;
}

export function getPxConverter(dWidth: number) {
  /** d_width: device or design width */
  return {
    px2vw: (px: number) => `${(px / dWidth) * 100}vw`,
  };
}

export function getDeviceViewWidth() {
  return 1920;
}

export function autoDetectDeviceConverter() {
  return getPxConverter(getDeviceViewWidth());
}
