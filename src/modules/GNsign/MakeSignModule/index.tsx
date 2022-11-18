import {
	lazy,
	useMemo,
	useState,
	useEffect,
	useCallback,
	useRef,
	MouseEvent,
	ChangeEvent,
	Suspense
} from 'react'
import useCanvasDrawer from '@hooks/useCanvasDrawer'
import { flatClassName } from "@utils/reduce"
import { getCheckFileFunc } from '@utils/validation'

import { useAppDispatch, useAppSelector } from "@/hooks"

import { selectDraftSign, selectMakeSign } from '@features/gnsign/signs/selector'
import { selectDraftFile } from '@features/gnsign/files/selector'
import { SAVE_DRAFT, SAVE_SIGN, ADD_NEW_TO_SIGN_BOX } from '@features/gnsign/signs/sagaActions'

import { ModeState } from './type.d'
import { CallbackFunctionVariadicAnyReturn } from '@/type.d'
import { HAND_WRITING, IMPORT_SIGN } from './constants'

const SignPalette = lazy(() => import("@components/GNsign/SignPalette"))

type MakeSignModuleProps = {
	canvasWidth: number
	canvasHeight: number
	isPageContent: boolean
	doLoading?: CallbackFunctionVariadicAnyReturn
	cancelLoading?: CallbackFunctionVariadicAnyReturn
	backToPrevView?: (e: MouseEvent) => void
}

const MakeSignModule = ({
	canvasWidth,
	canvasHeight,
	doLoading,
	cancelLoading,
	isPageContent,
	backToPrevView
}: MakeSignModuleProps) => {
	const dispatch = useAppDispatch()
	const [mode, setMode] = useState<ModeState>(HAND_WRITING)
	const inputFileRef = useRef<HTMLInputElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const {
		defaultColor,
		setColor,
		isDrawing,
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		handleClear,
		handleLoadImage,
	} = useCanvasDrawer(canvasRef, canvasWidth, canvasHeight, true)

	useEffect(() => {
		if (isDrawing) {
			setMode({
				...mode,
				canvasText: ''
			})
		}
	}, [isDrawing])

	const isImportMode = mode.mode === IMPORT_SIGN.mode

	const checkFile = getCheckFileFunc({
		'image/jpeg': true,
		'image/png': true,
	}, -1)

	const handleSelectedFileButton = (e: MouseEvent) => {
		if (isImportMode && inputFileRef.current) {
			inputFileRef.current.click()
		}
	}

	const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()

		if (!e.target.files) {
			return
		}

		const { result, type } = checkFile(e.target.files)
		if (!result) {
			return
		}

		doLoading && doLoading()
		handleLoadImage(e.target.files[0], cancelLoading ?? undefined)
	}

	const changeMode = (e: MouseEvent) => {
		const selectedMode = e.currentTarget.getAttribute("data-mode") ?? HAND_WRITING.mode
		setMode(IMPORT_SIGN.mode === selectedMode ? IMPORT_SIGN : HAND_WRITING)
		handleClear(e)
	}

	const changeColor = useCallback((e: MouseEvent) => {
		const selectedColor = e.currentTarget.getAttribute("data-color") ?? 'black'
		setColor(selectedColor)
	}, [setColor])

	const createSign = async (e: MouseEvent) => {
		if (!canvasRef.current) return
		const image = canvasRef.current.toDataURL('image/png', 1.0)
		doLoading && doLoading()
		dispatch({ type: ADD_NEW_TO_SIGN_BOX, payload: image })
		dispatch({ type: SAVE_SIGN, payload: image })
	}

	const { handleLeftButton, leftButtonText } = isPageContent ? {
		handleLeftButton: handleClear,
		leftButtonText: '清除'
	}: {
		handleLeftButton: backToPrevView,
		leftButtonText: '取消'
	}

	const signPaletteClassName: string = isPageContent
		? flatClassName({
			common: `absolute`,
			mobile: `sm:translate-y-[121px]`,
		})
		: flatClassName({
			common: `flex items-center justify-between`,
			mobile: `sm:w-[284px] sm:h-[45px]`,
		})

	const ModeClassName = isPageContent
		? flatClassName({
			common: `flex items-center absolute bg-white rounded-[14px]`,
			mobile: `sm:translate-y-[28px] sm:w-[240px] sm:h-[40px]`
		})
		: flatClassName({
			common: `flex items-center bg-white rounded-[14px]`,
			mobile: `sm:w-[240px] sm:h-[40px]`
		})

	const ButtonGroupClassName = isPageContent
		? flatClassName({
			common: `absolute flex flex-no-wrap justify-between`,
			mobile: `sm:w-[343px] sm:h-[56px] sm:translate-y-[403px] sm:gap-x-[11.5px]`
		})
		: flatClassName({
			common: `flex flex-no-wrap justify-between`,
			mobile: `sm:w-[284px] sm:h-[56px] sm:gap-x-[12px]`
		})

	const CanvasContainerClassName = isPageContent
		? flatClassName({
			common: `bg-white relative flex items-center justify-center`,
			mobile: `sm:w-[343px] sm:h-[200px] sm:translate-y-[178px]`
		})
		: flatClassName({
			common: `bg-white flex items-center justify-center`,
			mobile: `sm:w-[326px] sm:h-[200px]`
		})

	return (<>
			<div className={ModeClassName}>
				<div
					onClick={changeMode}
					data-mode={HAND_WRITING.mode}
					className={flatClassName({
						common: `flex flex-1 items-center justify-center grow h-full bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh rounded-[14px] text-white`,
						mobile: `sm:text-[16px] sm:leading-[23px]`
					})}
				>手寫簽名</div>
				<div
					onClick={changeMode}
					data-mode={IMPORT_SIGN.mode}
					className={flatClassName({
						common: `flex flex-1 items-center justify-center grow h-full text-gnsign-green `,
						mobile: `sm:text-[16px] sm:leading-[23px]`
					})}
				>匯入簽名檔</div>
			</div>

			{
				!isImportMode && <Suspense fallback={<p className={`hidden`}></p>}>
					<div className={signPaletteClassName} >
						<SignPalette defaultColor={defaultColor} changeColor={changeColor} />
						{ !isPageContent && <div className={flatClassName({
							common: `font-sans font-normal text-gnsign-green`,
							mobile: `sm:text-[18px] sm:leading-[26px]`
						})}
						onClick={handleClear}
						>清除</div>}
					</div>
				</Suspense>
			}

			<div
				className={CanvasContainerClassName}
				onClick={handleSelectedFileButton}
			>
				<input
					ref={inputFileRef}
					type="file"
					className="hidden"
					onChange={handleChangeFile}
				/>
				<canvas
					ref={canvasRef}
					width={canvasWidth}
					height={canvasHeight}
					onMouseDown={isImportMode ? undefined : handleMouseDown}
					onMouseMove={isImportMode ? undefined : handleMouseMove}
					onMouseUp={isImportMode ? undefined : handleMouseUp}
					onTouchStart={isImportMode ? undefined : handleTouchStart}
					onTouchMove={isImportMode ? undefined : handleTouchMove}
					onTouchEnd={isImportMode ? undefined : handleTouchEnd}
				></canvas>
				<div className={flatClassName({
					common: `absolute text-gnsign-gray`,
					mobile: `sm:text-[18px] sm:leading-[26px]`
				})}>{isDrawing ? '' : mode.canvasText}</div>
			</div>

			<div className={ButtonGroupClassName}>
				<button
					onClick={handleLeftButton}
					className={flatClassName({
						common: `flex items-center justify-center h-full flex-1 text-gnsign-green bg-white rounded-[16px]`,
					})}
				>{leftButtonText}</button>
				<button
					onClick={createSign}
					className={flatClassName({
						common: `flex items-center justify-center h-full flex-1 text-white bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh rounded-[16px]`,
					})}
				>建立簽名</button>
			</div>
	</>)
}

export default MakeSignModule