const avgColorAlgo = (r:number, g:number, b:number) => 
	(r + g + b) / 3
const luminancePreserveAlgo = (r:number, g:number, b:number) => 
	0.2126 * r + 0.7152 * g + 0.0722 * b

export const toGrayscaleImage = (imageData: ImageData, algo = 'lumin') => {
	const algoCallback = algo == 'lumin' ? luminancePreserveAlgo : avgColorAlgo
	const imageColors = imageData.data
	for  (let i = 0; i < imageColors.length; i += 4) {
		let red = imageColors[i];
		let green = imageColors[i + 1];
		let blue = imageColors[i + 2];
		let alpha = imageColors[i + 3];
				
		let gray =  algoCallback(red, green, blue)
				
		imageData.data[i] = gray;
		imageData.data[i + 1] = gray;
		imageData.data[i + 2] = gray;
		imageData.data[i + 3] = alpha; // not changing the transparency
	}

	return imageData
}

export const toTransparentImage = (imageData: ImageData) => {
	const imageColors = imageData.data
	const tolerance = 60
	const [red0, green0, blue0, alpha0] = [255, 255, 255, 255] /** 白色背景 */

	for  (let i = 0; i < imageColors.length; i += 4) {
		let red = imageColors[i];
		let green = imageColors[i + 1];
		let blue = imageColors[i + 2];
		let alpha = imageColors[i + 3];
				
		let t = Math.sqrt(
			(red - red0) ** 2 + (green - green0) ** 2 + (blue - blue0) ** 2 + (alpha - alpha0) ** 2
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
	imageHeight: number
): number[] => {
	if (imageWidth <= containerWidth && imageHeight <= containerHeight) {
		return [Math.floor(imageWidth), Math.floor(imageHeight)]
	}

	let newWidth = 0
	let newHeight = 0

	if (imageWidth > containerWidth) {
		newWidth = containerWidth
		newHeight = imageHeight / imageWidth * containerWidth
	} else if (imageHeight > containerHeight) {
		newHeight = containerHeight
		newWidth = imageWidth / imageHeight * containerHeight
	}

	return scaleInContainer(
		containerWidth,
		containerHeight,
		newWidth,
		newHeight
	)
}