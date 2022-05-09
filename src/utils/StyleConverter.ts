export function px2Rem(px: number, base?: number) {
  return px / (base && !isNaN(base) && base > 0 ? base : 16) + 'rem'
}

function roundDown(num: number, decimal: number) {
  return Math.floor((num + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal);
}

export function getPxConverter(d_width: number) {
  /** d_width: device or design width */
  return {
    'px2vw': (px: number) => ((px / d_width) * 100) + 'vw'
  }
}