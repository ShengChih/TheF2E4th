import { Position, Box } from '@/type.d'
import { scaleInContainer, toGrayscaleImage } from './photo'

export const movePostion = (
	context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
	{ x, y }: Position
) => {
	context.beginPath()
	context.moveTo(x, y)
}

export const drawTracking = (
	context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
	{ x, y }: Position,
	defaultColor: string
) => {
	context.lineWidth = 2
	context.lineCap = "round" // 繪制圓形的結束線帽
	context.lineJoin = "round" // 兩條線條交匯時，建立圓形邊角
	context.shadowBlur = 1 // 邊緣模糊，防止直線邊緣出現鋸齒
	context.shadowColor = defaultColor // 陰影顏色
	context.fillStyle = defaultColor // 線體顏色
	context.strokeStyle = defaultColor // 線框顏色
	context.lineTo(x, y)
	context.stroke()
}

export const drawScaleImage = (
	context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
	img: Exclude<CanvasImageSource, HTMLOrSVGImageElement>,
	{ width, height }: Box
) => {
	context.drawImage(img, 0, 0, width, height)
}

export const preprocessUploadImage = (
	context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
	containerWidth: number,
	containerHeight: number,
	image: Exclude<CanvasImageSource, HTMLOrSVGImageElement>
) => {
	const [newWidth, newHeight] = scaleInContainer(
		containerWidth,
		containerHeight,
		image.width,
		image.height
	)

	context.drawImage(image, 0, 0, image.width, image.height, 0, 0, newWidth, newHeight)
	const newImageData = toGrayscaleImage(
		context.getImageData(0, 0, newWidth, newHeight)
	)
	context.fillStyle = 'white'
	context.fillRect(0, 0, containerWidth, containerHeight)
	context.putImageData(newImageData, 0, 0, 0, 0, newWidth, newHeight)
}