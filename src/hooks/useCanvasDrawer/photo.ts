const avgColorAlgo = (r: number, g: number, b: number) => (r + g + b) / 3
const luminancePreserveAlgo = (r: number, g: number, b: number) =>
  0.2126 * r + 0.7152 * g + 0.0722 * b

export const toGrayscaleImage = (imageData: ImageData, algo = 'lumin') => {
  const algoCallback = algo == 'lumin' ? luminancePreserveAlgo : avgColorAlgo
  const imageColors = imageData.data
  for (let i = 0; i < imageColors.length; i += 4) {
    const red = imageColors[i]
    const green = imageColors[i + 1]
    const blue = imageColors[i + 2]
    const alpha = imageColors[i + 3]

    const gray = algoCallback(red, green, blue)

    imageData.data[i] = gray
    imageData.data[i + 1] = gray
    imageData.data[i + 2] = gray
    imageData.data[i + 3] = alpha // not changing the transparency
  }

  return imageData
}

export const toTransparentImage = (imageData: ImageData) => {
  const imageColors = imageData.data
  const tolerance = 60
  const [red0, green0, blue0, alpha0] = [255, 255, 255, 255] /** 白色背景 */

  for (let i = 0; i < imageColors.length; i += 4) {
    const red = imageColors[i]
    const green = imageColors[i + 1]
    const blue = imageColors[i + 2]
    const alpha = imageColors[i + 3]

    const t = Math.sqrt(
      (red - red0) ** 2 + (green - green0) ** 2 + (blue - blue0) ** 2 + (alpha - alpha0) ** 2,
    )

    if (t <= tolerance) {
      imageData.data[i] = 0
      imageData.data[i + 1] = 0
      imageData.data[i + 2] = 0
      imageData.data[i + 3] = 0
    }
  }

  return imageData
}

export const scaleInContainer = (
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number,
): number[] => {
  if (imageWidth <= containerWidth && imageHeight <= containerHeight) {
    return [Math.floor(imageWidth), Math.floor(imageHeight)]
  }

  let newWidth = 0
  let newHeight = 0

  if (imageWidth > containerWidth) {
    newWidth = containerWidth
    newHeight = (imageHeight / imageWidth) * containerWidth
  } else if (imageHeight > containerHeight) {
    newHeight = containerHeight
    newWidth = (imageWidth / imageHeight) * containerHeight
  }

  return scaleInContainer(containerWidth, containerHeight, newWidth, newHeight)
}

// function changeResolution(canvas: HTMLCanvasElement, scaleFactor: number) {
//   // Set up CSS size.
//   canvas.style.width = canvas.style.width || canvas.width + 'px'
//   canvas.style.height = canvas.style.height || canvas.height + 'px'
//
//   // Resize canvas and scale future draws.
//   canvas.width = Math.ceil(canvas.width * scaleFactor)
//   canvas.height = Math.ceil(canvas.height * scaleFactor)
//   const ctx = canvas.getContext('2d')
//   ctx!.scale(scaleFactor, scaleFactor)
// }
//
// function setDPISample(canvas: HTMLCanvasElement, dpi: number) {
//   // Set up CSS size.
//   canvas.style.width = canvas.style.width || canvas.width + 'px'
//   canvas.style.height = canvas.style.height || canvas.height + 'px'
//
//   // Resize canvas and scale future draws.
//   const scaleFactor = dpi / 96
//   canvas.width = Math.ceil(canvas.width * scaleFactor)
//   canvas.height = Math.ceil(canvas.height * scaleFactor)
//   const ctx = canvas.getContext('2d')
//   ctx!.scale(scaleFactor, scaleFactor)
// }
//
// function setDPI(canvas: HTMLCanvasElement, dpi: number) {
//   // Set up CSS size.
//   canvas.style.width = canvas.style.width || canvas.width + 'px'
//   canvas.style.height = canvas.style.height || canvas.height + 'px'
//
//   // Get size information.
//   const scaleFactor = dpi / 96
//   const width = parseFloat(canvas.style.width)
//   const height = parseFloat(canvas.style.height)
//
//   // Backup the canvas contents.
//   const oldScale = canvas.width / width
//   const backupScale = scaleFactor / oldScale
//   const backup = canvas.cloneNode(false) as HTMLCanvasElement
//   backup!.getContext('2d')!.drawImage(canvas, 0, 0)
//
//   // Resize the canvas.
//   const ctx = canvas.getContext('2d')
//   canvas.width = Math.ceil(width * scaleFactor)
//   canvas.height = Math.ceil(height * scaleFactor)
//
//   // Redraw the canvas image and scale future draws.
//   ctx!.setTransform(backupScale, 0, 0, backupScale, 0, 0)
//   ctx!.drawImage(backup, 0, 0)
//   ctx!.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0)
// }
