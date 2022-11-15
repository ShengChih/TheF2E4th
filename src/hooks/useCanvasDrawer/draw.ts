import { Position, Box } from '@/type.d'

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
	img: CanvasImageSource,
	{ width, height }: Box
) => {
	context.drawImage(img, 0, 0, width, height)
}