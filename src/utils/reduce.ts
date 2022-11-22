interface IflatClassName {
  common?: string[] | string
  desktop?: string[] | string
  tablet?: string[] | string
  mobile?: string[] | string
}

export function flatClassName({ common, desktop, tablet, mobile }: IflatClassName) {
  return [
    '',
    Array.isArray(common) ? common.join(' ') : common ?? '',
    Array.isArray(mobile) ? mobile.join(' ') : mobile ?? '',
    Array.isArray(tablet) ? tablet.join(' ') : tablet ?? '',
    Array.isArray(desktop) ? desktop.join(' ') : desktop ?? '',
    '',
  ].join(' ')
}
