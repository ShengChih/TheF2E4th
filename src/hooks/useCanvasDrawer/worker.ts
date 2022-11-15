import { Nullable, DictObject } from '@/type.d'
import { movePostion, drawTracking } from './draw'
import { toGrayscaleImage, scaleInContainer } from './photo'
import {
	INIT_CANVAS,
	MOVE_IN_CANVAS,
	DRAW_IN_CANVAS,
	UPLOAD_IMAGE_TO_CANVAS,
	CLEAR_ALL
} from './constants'

let canvasElement: Nullable<HTMLCanvasElement> = null
let offscreenCanvas: Nullable<OffscreenCanvas> = null
let context: Nullable<CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D> = null

self.onmessage = function(e) {
	let response: DictObject = {
		status: 'error'
	}

	try {
		if (e.data.type === CLEAR_ALL) {
			if (!context) {
				throw new Error("get Context failure")
			}

			if (!e.data.size) {
				throw new Error("get clear size failure")
			}
			const { containerWidth, containerHeight } = e.data.size
			context.fillStyle = 'white'
			context.fillRect(0, 0, containerWidth, containerHeight)
		} else if (
			e.data.type === INIT_CANVAS &&
			e.data.canvas
		) {
			console.log(e.data.canvas.toString)
			if (e.data.canvas.toString() === '[object HTMLCanvasElement]') {
				canvasElement = e.data.canvas
				offscreenCanvas = e.data.canvas.transferControlToOffscreen()
			} else if (e.data.canvas.toString() === '[object OffscreenCanvas]') {
				offscreenCanvas = e.data.canvas
			} else {
				throw new Error("Crate offscreen canvas failure")
			}
	
			if (!offscreenCanvas) {
				throw new Error("Crate offscreen canvas failure")
			}

			context = offscreenCanvas.getContext('2d', { alpha: false })

			if (!context) {
				throw new Error("get Context failure")
			}

			const { containerWidth, containerHeight } = e.data.size
			context.fillStyle = 'white'
			context.fillRect(0, 0, containerWidth, containerHeight)
		} else if (
			e.data.type === MOVE_IN_CANVAS &&
			e.data.postion
		) {
			if (!context) {
				throw new Error("get Context failure")
			}
			movePostion(context, e.data.postion)
		} else if (
			e.data.type === DRAW_IN_CANVAS &&
			e.data.postion &&
			e.data.defaultColor
		) {
			if (!context) {
				throw new Error("get Context failure")
			}
			drawTracking(context, e.data.postion, e.data.defaultColor)
		} else if (
			e.data.type === UPLOAD_IMAGE_TO_CANVAS &&
			e.data.image
		) {
			const image: Exclude<CanvasImageSource, HTMLOrSVGImageElement> = e.data.image
			const { containerWidth, containerHeight } = e.data.size
			
			if ("OffscreenCanvas" in window) {
				offscreenCanvas = new OffscreenCanvas(containerWidth, containerHeight)
			} else {
				canvasElement = document.createElement('canvas')
				offscreenCanvas = canvasElement.transferControlToOffscreen()
			}
	
			context = offscreenCanvas.getContext('2d')
	
			if (!context) {
				throw new Error("get Context failure")
			}
	
			offscreenCanvas.width = containerWidth
			offscreenCanvas.height = containerHeight
	
			const [newWidth, newHeight] = scaleInContainer(
				containerWidth,
				containerHeight,
				image.width,
				image.height
			)
	
			context.drawImage(image, 0, 0, image.width, image.height, 0, 0, newWidth, newHeight)
			const newImageData = toGrayscaleImage(
				context.getImageData(0, 0, newWidth, newWidth)
			)
			context.fillStyle = 'white'
			context.fillRect(0, 0, containerWidth, containerHeight)
			context.putImageData(newImageData, 0, 0, 0, 0, newWidth, newHeight)
	
			response = {
				...response,
				imageBitmap: offscreenCanvas.transferToImageBitmap(),
			}
		} else {
			throw new Error("Unprocess error")
		}
	} catch (error) {
		console.trace(error)
		const { message } = error
		self.postMessage({
			...response,
			type: e?.data?.type ?? 'error type',
			message: message ?? '',
			status: 'error'
		})
		return
	}

	self.postMessage({
		...response,
		type: e.data.type,
		status: 'success'
	})
}