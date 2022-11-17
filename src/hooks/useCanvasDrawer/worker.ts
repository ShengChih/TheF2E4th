import { Nullable, DictObject } from '@/type.d'
import { movePostion, drawTracking, preprocessUploadImage, removeWhiteBg } from './draw'
import { toGrayscaleImage, scaleInContainer } from './photo'
import {
	INIT_CANVAS,
	MOVE_IN_CANVAS,
	DRAW_IN_CANVAS,
	UPLOAD_IMAGE_TO_CANVAS,
	CLEAR_ALL,
	REMOVE_WHITE_BG
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
				throw Error("get Context failure")
			}

			if (!e.data.size) {
				throw Error("get clear size failure")
			}
			const { containerWidth, containerHeight } = e.data.size
			context.clearRect(0, 0, containerWidth, containerHeight)
		} else if (
			e.data.type === INIT_CANVAS &&
			e.data.canvas
		) {
			if (e.data.canvas.toString() === '[object HTMLCanvasElement]') {
				canvasElement = e.data.canvas
				offscreenCanvas = e.data.canvas.transferControlToOffscreen()
			} else if (e.data.canvas.toString() === '[object OffscreenCanvas]') {
				offscreenCanvas = e.data.canvas
			} else {
				throw  Error("Crate offscreen canvas failure")
			}

			if (!offscreenCanvas) {
				throw Error("Crate offscreen canvas failure")
			}

			context = offscreenCanvas.getContext('2d')

			if (!context) {
				throw Error("get Context failure")
			}
		} else if (
			e.data.type === MOVE_IN_CANVAS &&
			e.data.postion
		) {
			if (!context) {
				throw Error("get Context failure")
			}
			movePostion(context, e.data.postion)
		} else if (
			e.data.type === DRAW_IN_CANVAS &&
			e.data.postion &&
			e.data.defaultColor
		) {
			if (!context) {
				throw Error("get Context failure")
			}
			drawTracking(context, e.data.postion, e.data.defaultColor)
		} else if (
			e.data.type === UPLOAD_IMAGE_TO_CANVAS &&
			e.data.image
		) {
			const image: Exclude<CanvasImageSource, HTMLOrSVGImageElement> = e.data.image
			const { containerWidth, containerHeight } = e.data.size

			if (!offscreenCanvas && "OffscreenCanvas" in window) {
				offscreenCanvas = new OffscreenCanvas(containerWidth, containerHeight)
				offscreenCanvas.width = containerWidth
				offscreenCanvas.height = containerHeight
			} else if (!canvasElement && !offscreenCanvas) {
				canvasElement = document.createElement('canvas')
				offscreenCanvas = canvasElement.transferControlToOffscreen()
				context = offscreenCanvas.getContext('2d')
			}

			if (!offscreenCanvas) {
				throw Error("get offscreenCanvas failure")
			}

			if (!context) {
				throw Error("get Context failure")
			}

			preprocessUploadImage(
				context,
				containerWidth,
				containerHeight,
				image
			)
		} else if (
			e.data.type === REMOVE_WHITE_BG &&
			e.data.image
		) {
			const image: Exclude<CanvasImageSource, HTMLOrSVGImageElement> = e.data.image
			const [ containerWidth, containerHeight ] = [e.data.image.width, e.data.image.height]

			if (!offscreenCanvas && "OffscreenCanvas" in window) {
				offscreenCanvas = new OffscreenCanvas(containerWidth, containerHeight)
				offscreenCanvas.width = containerWidth
				offscreenCanvas.height = containerHeight
			} else if (!canvasElement && !offscreenCanvas) {
				canvasElement = document.createElement('canvas')
				offscreenCanvas = canvasElement.transferControlToOffscreen()
				context = offscreenCanvas.getContext('2d')
			}

			if (!offscreenCanvas) {
				throw Error("get offscreenCanvas failure")
			}

			if (!context) {
				throw Error("get Context failure")
			}

			removeWhiteBg(
				context,
				image
			)
		} else {
			throw Error("Unprocess error")
		}
	} catch (error) {
		console.trace(error)
		let err = error as Error
		const { message } = err
		self.postMessage({
			...response,
			type: e?.data?.type ?? 'error type',
			message: message ?? '',
			status: 'error'
		})
		return
	}
	console.log(1)
	self.postMessage({
		...response,
		type: e.data.type,
		status: 'success'
	})
}