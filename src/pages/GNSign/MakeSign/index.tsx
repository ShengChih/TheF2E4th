import {
	lazy,
	useState,
	useEffect,
	useCallback,
	useRef,
	MouseEvent,
	ChangeEvent,
	Suspense
} from 'react'
import { useNavigate } from 'react-router-dom'
import useCanvasDrawer from '@hooks/useCanvasDrawer'
import { flatClassName } from "@utils/reduce"
import { getCheckFileFunc } from '@utils/validation'

import { useAppDispatch, useAppSelector } from "@/hooks"

import GNsignLoadingPage, { InitLoadingState } from "@components/GNsign/LoadingPage"
import { selectDraftSign, selectMakeSign } from '@features/gnsign/signs/selector'
import { selectDraftFile } from '@features/gnsign/files/selector'
import { SAVE_DRAFT, SAVE_SIGN } from '@features/gnsign/signs/sagaActions'

import { ModeState } from './type.d'
import { HAND_WRITING, IMPORT_SIGN } from './constants'

const SignPalette = lazy(() => import("@components/GNsign/SignPalette"))

const MakeSign = () => {
	const [loadingState, setLoadingState] = useState(InitLoadingState)
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
		hanldeRemoveWhiteBg
	} = useCanvasDrawer(canvasRef, 343, 200, true)
	const dispatch = useAppDispatch()
	const makeSign = useAppSelector(selectMakeSign)
	const draftFile = useAppSelector(selectDraftFile)
	const navigate = useNavigate()

	useEffect(() => {
		//if (!draftFile) {
		//	navigate('/gnsign', { replace: true })
		//}
	}, [])

	useEffect(() => {
		if (!draftFile) {
			navigate('/gnsign', { replace: true })
		}
	}, [draftFile])

	useEffect(() => {
		setLoadingState({
			...loadingState,
			isLoading: false
		})

		if (makeSign && draftFile) {
			navigate('/gnsign/signdoc', { replace: true })
		}
	}, [makeSign])

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

	const finishPreprocessImage = (status: boolean) => {
		setLoadingState({
			...loadingState,
			isLoading: false
		})
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

		setLoadingState({
			...loadingState,
			isLoading: true
		})

		handleLoadImage(e.target.files[0], finishPreprocessImage)
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
		const image = canvasRef.current.toDataURL()
		setLoadingState({
			...loadingState,
			isLoading: true
		})
		dispatch({ type: SAVE_SIGN, payload: image })
	}

	return (<>
		<div className={`font-sans font-normal w-screen h-screen bg-gnsign-background flex justify-center`}>
			<div className={flatClassName({
				common: `flex items-center absolute bg-white rounded-[14px]`,
				mobile: `sm:translate-y-[28px] sm:w-[240px] sm:h-[40px]`
			})}>
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
				!isImportMode && <Suspense fallback={``}>
					<SignPalette defaultColor={defaultColor} changeColor={changeColor} />
				</Suspense>
			}

			<div
				className={flatClassName({
					common: `bg-white relative flex items-center justify-center`,
					mobile: `sm:w-[343px] sm:h-[200px] sm:translate-y-[178px]`
				})}
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
					width={343}
					height={200}
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
					onClick={createSign}
					className={flatClassName({
						common: `flex items-center justify-center h-full flex-1 text-white bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh rounded-[16px]`,
					})}>建立簽名</button>
			</div>
		</div>
		<GNsignLoadingPage className={`${loadingState.isLoading ? '': 'hidden'}`} text={'簽名優化中...'} />
	</>)
}

export default MakeSign