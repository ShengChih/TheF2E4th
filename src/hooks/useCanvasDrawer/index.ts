import { useState, useEffect, RefObject, MouseEvent, TouchEvent } from "react"

const useCanvasDrawer = (canvasRef: RefObject<HTMLCanvasElement>) => {
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
	const [isDrawing, setDrawing] = useState<boolean>(false)
	const [defaultColor, setColor] = useState<string>('black')

	const canvas = canvasRef.current

	useEffect(() => {
		if (canvas) {
			setContext(canvas.getContext('2d'))
		}
	}, [canvasRef])

	const getMousePos = (e: MouseEvent) => {
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

	const getTouchPos = (e: TouchEvent) => {
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
		if (!context) return
		setDrawing(true)
		const mousePos = getMousePos(e)
		context.beginPath()
		context.moveTo(mousePos.x, mousePos.y)
		e.preventDefault()
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (!context || !isDrawing) return
		const mousePos = getMousePos(e)
		context.lineWidth = 2
    context.lineCap = "round" // 繪制圓形的結束線帽
    context.lineJoin = "round" // 兩條線條交匯時，建立圓形邊角
    context.shadowBlur = 1 // 邊緣模糊，防止直線邊緣出現鋸齒
    context.shadowColor = defaultColor // 陰影顏色
		context.fillStyle = defaultColor // 線體顏色
		context.strokeStyle = defaultColor // 線框顏色
    context.lineTo(mousePos.x, mousePos.y)
    context.stroke()
	}

	const handleMouseUp = (e: MouseEvent) => {
		setDrawing(false)
	}

	const handleTouchStart = (e: TouchEvent) => {
		if (!context) return
    setDrawing(true)
    const { x, y } = getTouchPos(e)
    context.beginPath()
    context.moveTo(x, y)
    e.preventDefault()
  }

	const handleTouchMove = (e: TouchEvent) => {
    if (!context || !isDrawing) return
    const touchPos = getTouchPos(e)
    context.lineWidth = 2
    context.lineCap = "round" // 繪制圓形的結束線帽
    context.lineJoin = "round" // 兩條線條交匯時，建立圓形邊角
    context.shadowBlur = 1 // 邊緣模糊，防止直線邊緣出現鋸齒
    context.shadowColor = defaultColor // 陰影顏色
		context.fillStyle = defaultColor // 線體顏色
		context.strokeStyle = defaultColor // 線框顏色
    context.lineTo(touchPos.x, touchPos.y)
    context.stroke()
  }

	const handleTouchEnd = (e: TouchEvent) => {
    setDrawing(false)
  }

	const handleClear = (e: MouseEvent) => {
		if (!context || !canvas) return
		context.clearRect(0, 0, canvas.width, canvas.height)
	}

	return {
		defaultColor,
		setColor,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		handleClear,
	}
}

export default useCanvasDrawer