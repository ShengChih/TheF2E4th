import { useRef, useState, useEffect, RefObject, MouseEvent, TouchEvent } from "react"
import { movePostion, drawTracking, preprocessUploadImage, removeWhiteBg } from './draw'
import WebWorker from './worker?worker'
import { Position, CallbackFunctionVariadicAnyReturn } from '@/type.d'
import {
	INIT_CANVAS,
	MOVE_IN_CANVAS,
	DRAW_IN_CANVAS,
	UPLOAD_IMAGE_TO_CANVAS,
	CLEAR_ALL,
	REMOVE_WHITE_BG
} from './constants'

const useCanvasDrawer = (
	canvasRef: RefObject<HTMLCanvasElement>,
	containerWidth: number,
	containerHeight: number,
	needWorker = false
) => {
	const [worker, setWoker] = useState<Worker | null>(null)
	const [canvas, setCanvas] = useState<HTMLCanvasElement>()
	const [offscreen, setOffscreen] = useState<OffscreenCanvas>()
	const [context, setContext] = useState<CanvasRenderingContext2D>()
	const [isDrawing, setDrawing] = useState<boolean>(false)
	const [defaultColor, setColor] = useState<string>('black')

	useEffect(() => {
		let worker: Worker | null = null

		if (canvasRef.current) {
			setCanvas(canvasRef.current)

			if (needWorker && "OffscreenCanvas" in window) {
				worker = new WebWorker()
				setWoker(worker)
				setOffscreen(canvasRef.current.transferControlToOffscreen())
			} else {
				const context = canvasRef.current.getContext('2d')
				if (context) {
					setContext(context)
				}
			}
		}

		return () => {
			if (worker) worker.terminate()
		}
	}, [])

	useEffect(() => {
		if (worker && offscreen) {
			worker.postMessage({
				type: INIT_CANVAS,
				canvas: offscreen,
				size: {
					containerWidth,
					containerHeight
				}
			}, [offscreen])
		}
	}, [worker, offscreen])

	const getMousePos = (e: MouseEvent): Position => {
		if (!canvasRef.current) {
			return { x: 0, y: 0 }
		}

		const rect = canvasRef.current.getBoundingClientRect()

		/**
		 * 這裡假定觸發事件 mouse 在 canvas 內，
		 * 因此用兩個相對於視窗的位置做相減，即滑鼠於 canvas 偏移量
		 * */
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		}
	}

	const getTouchPos = (e: TouchEvent): Position => {
		if (!canvas) {
			return { x: 0, y: 0 }
		}

		const rect = canvas.getBoundingClientRect()

		return {
			x: e.touches[0].clientX - rect.left,
			y: e.touches[0].clientY - rect.top
		}
	}

	const handleMouseDown = (e: MouseEvent) => {
		setDrawing(true)
		const pos = getMousePos(e)
		if (worker) {
			setDrawing(true)
			worker.postMessage({
				type: MOVE_IN_CANVAS,
				postion: pos
			})
		} else if (context) {
			setDrawing(true)
			movePostion(context, pos)
		}
		e.stopPropagation()
	}

	const handleMouseMove = (e: MouseEvent) => {
		const pos = getMousePos(e)
		if (worker) {
			setDrawing(true)
			worker.postMessage({
				type: DRAW_IN_CANVAS,
				postion: pos,
				defaultColor: defaultColor
			})
		} else if (context) {
			setDrawing(true)
			drawTracking(context, pos, defaultColor)
		}
	}

	const handleMouseUp = (e: MouseEvent) => {
		setDrawing(false)
	}

	const handleTouchStart = (e: TouchEvent) => {
		const pos = getTouchPos(e)
		if (worker) {
			setDrawing(true)
			worker.postMessage({
				type: MOVE_IN_CANVAS,
				postion: pos
			})
		} else if (context) {
			setDrawing(true)
			movePostion(context, pos)
		}

    e.stopPropagation()
  }

	const handleTouchMove = (e: TouchEvent) => {
		const pos = getTouchPos(e)

    if (worker) {
			worker.postMessage({
				type: DRAW_IN_CANVAS,
				postion: pos,
				defaultColor: defaultColor
			})
		} else if (context) {
			drawTracking(context, pos, defaultColor)
		}
  }

	const handleTouchEnd = (e: TouchEvent) => {
    setDrawing(false)
  }

	const handleClear = (e: MouseEvent) => {
		if (worker) {
			worker.postMessage({
				type: CLEAR_ALL,
				size: {
					containerWidth,
					containerHeight
				}
			})
		} else if (context) {
			context.fillStyle = 'white'
			context.fillRect(0, 0, containerWidth, containerHeight)
		}
	}

	const handleLoadImage = (inputImage: File, callback?: CallbackFunctionVariadicAnyReturn) => {
		setDrawing(true)
		createImageBitmap(inputImage).then((imgBitmap: ImageBitmap) => {
			if (worker) {
				new Promise((resolve, reject) => {
					/** side effect call */
					/**
					 * 這是全域的 message event 這邊應該會補捉到別人的
					 * 最好的改法是重新 renew 獨立 worker
					 * 有點懶得改，先這樣
					 * or pass callback 給 worker 呼叫 (看可行性？)
					 * */
					worker.onmessage = (e: MessageEvent) => {
						if (e.data?.type === UPLOAD_IMAGE_TO_CANVAS) {
							e.data.status === 'success' ? resolve(true) : reject(false)
						}
					}

					worker.postMessage({
						type: UPLOAD_IMAGE_TO_CANVAS,
						image: imgBitmap,
						size: {
							containerWidth,
							containerHeight
						}
					})
				}).then(() => {
					callback && callback(true)
				}).catch(() => {
					callback && callback(false)
				}).finally(() => {
					worker.onmessage = null
				})
			} else if (context) {
				try {
					preprocessUploadImage(
						context,
						containerWidth,
						containerHeight,
						imgBitmap
					)
					callback && callback(true)
				} catch (error) {
					callback && callback(false)
				}
			}
		})
	}

	const hanldeRemoveWhiteBg = (inputImage: File | Blob, callback?: CallbackFunctionVariadicAnyReturn) => {
		setDrawing(true)
		createImageBitmap(inputImage).then((imgBitmap: ImageBitmap) => {
			if (worker) {
				new Promise((resolve, reject) => {
					/** side effect call */
					/**
					 * 這是全域的 message event 這邊應該會補捉到別人的
					 * 最好的改法是重新 renew 獨立 worker
					 * 有點懶得改，先這樣
					 * or pass callback 給 worker 呼叫 (看可行性？)
					 * */
					worker.onmessage = (e: MessageEvent) => {
						if (e.data?.type === REMOVE_WHITE_BG) {
							e.data.status === 'success' ? resolve(true) : reject(false)
						}
					}

					worker.postMessage({
						type: REMOVE_WHITE_BG,
						image: imgBitmap,
						size: {
							containerWidth,
							containerHeight
						}
					})
				}).then(() => {
					callback && callback(true)
				}).catch(() => {
					callback && callback(false)
				}).finally(() => {
					worker.onmessage = null
				})
			} else if (context) {
				try {
					removeWhiteBg(
						context,
						imgBitmap
					)
					callback && callback(true)
				} catch (error) {
					callback && callback(false)
				}
			}
		})
	}


	return {
		defaultColor,
		isDrawing,
		setColor,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		handleClear,
		handleLoadImage,
		hanldeRemoveWhiteBg
	}
}

export default useCanvasDrawer