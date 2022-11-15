import { useRef, MouseEvent } from 'react'
import useCanvasDrawer from '@hooks/useCanvasDrawer'
import { flatClassName } from "@utils/reduce"

import { useAppDispatch, useAppSelector } from "@/hooks"
import { selectDraft, selectOrigin } from '@features/gnsign/files/selector'
import { UPLOAD_FILE, MODIFY_FILE } from '@features/gnsign/files/sagaActions'

const MakeSign = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const {
		defaultColor,
		setColor,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		handleClear,
	} = useCanvasDrawer(canvasRef)

	const changeColor = (e: MouseEvent) => {
		const selectedColor = e.currentTarget.getAttribute("data-color") ?? 'black'
		setColor(selectedColor)
	}

	const createSign = (e: MouseEvent) => {
		if (!canvasRef.current) return
		const image = canvasRef.current.toDataURL()

	}

	return (
		<div className={`font-sans font-normal w-screen h-screen bg-gnsign-background flex justify-center`}>
			<div className={flatClassName({
				common: `flex items-center absolute bg-white rounded-[14px]`,
				mobile: `sm:translate-y-[28px] sm:w-[240px] sm:h-[40px]`
			})}>
				<div className={flatClassName({
					common: `flex flex-1 items-center justify-center grow h-full bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh rounded-[14px] text-white`,
					mobile: `sm:text-[16px] sm:leading-[23px]`
				})}>手寫簽名</div>
				<div className={flatClassName({
					common: `flex flex-1 items-center justify-center grow h-full text-gnsign-green `,
					mobile: `sm:text-[16px] sm:leading-[23px]`
				})}>匯入簽名檔</div>
			</div>

			<div className={flatClassName({
				common: `absolute flex flex-no-wrap items-center justify-between`,
				mobile: `sm:w-[150px] sm:h-[34px] sm:translate-y-[121px]`
			})}>
				<div
					data-color="black"
					onClick={changeColor}
					className={flatClassName({
						common: `${defaultColor === 'black' ? 'bg-white border-black':''} rounded-full flex items-center justify-center`,
						mobile: `sm:w-[45px] sm:h-[45px]`
					})}>
					<div className={flatClassName({
						common: `bg-black rounded-full`,
						mobile: `sm:w-[35px] sm:h-[35px] `
					})}></div>
				</div>
				<div
					data-color="#0014C7"
					onClick={changeColor}
					className={flatClassName({
						common: `${defaultColor === '#0014C7' ? 'bg-white border-[#0014C7]':''} border-rounded-full flex items-center justify-center`,
						mobile: `sm:w-[45px] sm:h-[45px]`
					})}>
					<div className={flatClassName({
						common: `bg-[#0014C7] rounded-full`,
						mobile: `sm:w-[35px] sm:h-[35px] `
					})}></div>
				</div>
				<div
					data-color="#CA0000"
					onClick={changeColor}
					className={flatClassName({
						common: `${defaultColor === '#CA0000' ? 'bg-white border-[#CA0000]':''} rounded-full flex items-center justify-center`,
						mobile: `sm:w-[45px] sm:h-[45px]`
					})}
				>
					<div className={flatClassName({
						common: `bg-[#CA0000] rounded-full`,
						mobile: `sm:w-[35px] sm:h-[35px] `
					})}></div>
				</div>
			</div>

			<canvas
				ref={canvasRef}
				width={343}
				height={200}
				onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
				onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
				className={flatClassName({
					common: `bg-white`,
					mobile: `sm:w-[343px] sm:h-[200px] sm:translate-y-[178px]`
				})}
			>在此書寫你的簽名</canvas>

			<div className={flatClassName({
				common: `absolute flex flex-no-wrap justify-between`,
				mobile: `sm:w-[343px] sm:h-[56px] sm:translate-y-[403px] sm:gap-x-[11.5px]`
			})}>
				<button
					onClick={handleClear}
					className={flatClassName({
						common: `flex items-center justify-center h-full flex-1 text-gnsign-green bg-white rounded-[16px]`,
					})}>清除</button>
				<button
					onClick={``}
					className={flatClassName({
						common: `flex items-center justify-center h-full flex-1 text-white bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh rounded-[16px]`,
					})}>建立簽名</button>
			</div>
		</div>
	)
}

export default MakeSign