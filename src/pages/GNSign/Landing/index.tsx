import {
  useRef,
  useState,
  useEffect,
  useCallback,
  MouseEvent,
  ChangeEvent
} from "react"
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { deviceWidth } from '@utils/config'
import { flatClassName } from '@utils/reduce'
import { getCheckFileFunc } from '@utils/validation'
import useCheckScreen from '@hooks/useCheckScreen'
import useImagePreloader from "@hooks/useImagePreloader"
import GNsignLoadingPage, { LoadingPageState, InitLoadingState} from "@components/GNsign/LoadingPage"

import { useAppDispatch, useAppSelector } from "@/hooks"
import { selectDraftFile } from '@features/gnsign/files/selector'
import { UPLOAD_FILE } from '@features/gnsign/files/sagaActions'
import { SAVE_TO_HISTORY } from '@features/gnsign/histories/sagaActions'


import MB_Greenlive from './images/mobile/green_live.png'
import MB_Logo from './images/mobile/logo.png'
import MB_Watermark from './images/mobile/watermark.png'

import TB_Greenlive from './images/tablet/green_live.png'
import TB_Logo from './images/tablet/logo.png'
import TB_Watermark from './images/tablet/watermark.png'

import { ToastState } from './type'
import {
	MaximumFileSize,
	FileType,
	InitToastState,
	ToastMessages
} from './constants'

import MultipleImageSources from '@components/shared/ResponsiveImageContainer/MultipleImageSources'
import Footer from '@components/shared/Footer'
import Toast from '@components/GNsign/Toast'

const DeviceRequiredImageList = [
  [],
  [MB_Logo, MB_Watermark, MB_Greenlive], // mobile
  [TB_Logo, TB_Watermark, TB_Greenlive], // tablet
  [], // 1280 Desktop
]

const GNSign = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const draftFile = useAppSelector(selectDraftFile)

	const inputFileRef = useRef<HTMLInputElement>(null)
	const [toastState, setToastState] = useState<ToastState>(InitToastState)
	const [loadingState, setLoadingState] = useState<LoadingPageState>(InitLoadingState)
	const [notDefined, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)

	const [commonResources, mobileResoures, tabletResources, desktopResoures] = DeviceRequiredImageList
  const deivceResources = isDesktop ? desktopResoures : (
    (
      isTablet ? tabletResources : (
        isMobile ? mobileResoures : []
      )
    )
  )
	const { imagesPreloaded } = useImagePreloader([...commonResources, ...deivceResources])

	useEffect(() => {
		setLoadingState({
			loadingText: '載入中...',
			isLoading: true
		})
	}, [])

	useEffect(() => {
		if (draftFile) {
			setLoadingState({
				...loadingState,
				isLoading: false
			})
			navigate('/gnsign/makesign', { replace: true })
		}
	}, [draftFile])

	useEffect(() => {
    if (imagesPreloaded) {
      setLoadingState({
				...loadingState,
				isLoading: false,
			})
    }
  }, [imagesPreloaded])

	const handleConfirmToast = useCallback(() => {
		setToastState(InitToastState)
	}, [])

	const handleSelectedFileButton = (e: MouseEvent<HTMLButtonElement>) => {
		if (inputFileRef.current) {
			inputFileRef.current.click()
		}
	}

	const checkFile = getCheckFileFunc({
		'application/pdf': true
	}, MaximumFileSize)

	const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()

		if (!e.target.files) {
			return
		}

		const { result, type } = checkFile(e.target.files)
		if (!result) {
			setToastState({
				toastMessage: ToastMessages[type],
				displayToast: true
			})
			return
		}

		setLoadingState({
			loadingText: '上傳中...',
			isLoading: true
		})
		const file = e.target.files[0];
		const fileInfo = {
			fileId: uuidv4(),
			filename: file.name,
			ctime: new Date((+new Date() + (60 * 60 * 8 * 1000))),
			mtime: new Date((+new Date() + (60 * 60 * 8 * 1000)))
		}

		if (file.type === 'image/jpeg' || file.type === 'image/png') {
			dispatch({
				type: UPLOAD_FILE,
				payload: {
					url: window.URL.createObjectURL(file),
					...fileInfo
				}
			})
			//dispatch({ type: SAVE_TO_HISTORY, payload: {
			//	url: window.URL.createObjectURL(file),
			//	...fileInfo,
			//	ctime: new Date((+new Date() - (60 * 60 * 24 * 365 * 1000))),
			//	mtime: new Date((+new Date() - (60 * 60 * 24 * 365 * 1000))),
			//}})
		} else if (file.type === 'application/pdf') {
			const fileReader = new FileReader()
			fileReader.onload = () => {
				dispatch({
					type: UPLOAD_FILE,
					payload: {
						url: fileReader.result,
						...fileInfo
					}
				})
				//dispatch({ type: SAVE_TO_HISTORY, payload: {
				//	url: fileReader.result,
				//	...fileInfo,
				//	ctime: new Date((+new Date() - (60 * 60 * 24 * 365 * 1000))),
				//	mtime: new Date((+new Date() - (60 * 60 * 24 * 365 * 1000))),
				//}})
			}
			fileReader.readAsDataURL(file)
		}
	}

	const gotoHistory = (e: MouseEvent) => {
		navigate('/gnsign/history', { replace: true })
	}

	return (<>
		{
			loadingState.isLoading
			? ''
			: (
				<div className={flatClassName({
					common: `w-screen h-screen relative bg-gnsign-background flex flex-col items-center`
				})}>
					<div className={flatClassName({
						common: `flex justify-between`,
						mobile: `sm:w-[299px] sm:h-[64.95px] sm:mt-[26.05px] sm:mb-[12px]`,
						tablet: `md:w-[517px] md:h-[87.57px] md:mt-[26.05px] md:mb-[21.38px]`
					})}>
						<div className={flatClassName({
							common: `relative self-start`,
							mobile: `sm:w-[88.21px] sm:h-[59.35px]`,
							tablet: `md:w-[130.75px] md:h-[87.57px]`,
						})}>
							<MultipleImageSources
								aliasName={`GNSign`}
								mediaImages={[
									{
										minWidth: 768,
										imageSrc: TB_Logo
									},
									{
										minWidth: 375,
										imageSrc: MB_Logo
									}
								]}
								imageElementProps={{
									src: MB_Logo,
									className: 'w-full h-full object-contain',
									srcSet: `${MB_Logo} 375w, ${TB_Logo} 375w`,
									sizes: `(min-width: 375px) 88.21px, (min-width: 768px) 130.75px`
								}}
							/>
						</div>
						<div
							onClick={gotoHistory}
							className={flatClassName({
								common: `self-end font-normal font-sans text-gnsign-black underline`,
								mobile: `sm:text-[18px] sm:leading-[32px] sm:leading-[26px]`,
								tablet: `md:text-[18px] md:leading-[32px] md:leading-[26px]`
							})}
						>歷史記錄</div>
					</div>
					<div className={flatClassName({
						common: `flex flex-col items-center bg-white border-dashed rounded-[26px] border-gnsign-gray border-2 box-border`,
						mobile: `sm:w-[299px] sm:h-[384px]`,
						tablet: `md:w-[547px] md:h-[567px]`
					})}>
						<div className={flatClassName({
							common: `absolute`,
							mobile: `sm:w-[134px] sm:h-[110px] sm:translate-y-[48.5px]`,
							tablet: `md:w-[225px] md:h-[183px] md:translate-y-[78.5px]`
						})}>
							<MultipleImageSources
								aliasName={`Watermark`}
								mediaImages={[
									{
										minWidth: 768,
										imageSrc: TB_Watermark
									},
									{
										minWidth: 375,
										imageSrc: MB_Watermark
									}
								]}
								imageElementProps={{
									src: MB_Watermark,
									className: 'w-full h-full object-contain',
									srcSet: `${MB_Watermark} 375w, ${TB_Watermark} 768w`,
									sizes: `(min-width: 375px) 134px,(min-width: 768px) 225px`
								}}
							/>
						</div>
						<div className={flatClassName({
							common: `flex flex-col absolute bg-white`,
							mobile: `sm:w-[209px] sm:h-[95px] sm:gap-y-[15px] sm:translate-y-[178.5px]`,
							tablet: `md:w-[360px] md:h-[110px] md:gap-y-[15px] md:translate-y-[296.5px]`
						})}>
							<input
								ref={inputFileRef}
								type="file"
								className="hidden"
								onChange={handleChangeFile}
							/>
							<button
								onClick={handleSelectedFileButton}
								className={flatClassName({
									common: `font-sans font-normal text-white flex items-center justify-center w-full bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh rounded-[16px]`,
									mobile: `sm:text-[18px] sm:leading-[26px] sm:w-[209px] sm:h-[60px]`,
									tablet: `md:text-[18px] md:leading-[26px] md:w-[360px] md:h-[75px]`,
								})}
							>選擇檔案</button>
							<p className={flatClassName({
								common: `flex justify-center font-sans font-normal bg-clip-text bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh text-fill-transparent`,
								mobile: `sm:text-[14px] sm:leading-[20px]`,
								tablet: `md:text-[14px] md:leading-[20px]`,
							})}>(限10MB 內的PDF或JPG檔)</p>
						</div>
		
		
						<div className={flatClassName({
							common: `absolute top-0`,
							mobile: `sm:w-[362px] sm:h-[228px] sm:translate-x-[2.5px] sm:translate-y-[412px]`,
							tablet: `md:w-[696px] md:h-[438px] md:translate-x-[-4px] md:translate-y-[549px]`
						})}>
							<MultipleImageSources
								aliasName={`Green live`}
								mediaImages={[
									{
										minWidth: 768,
										imageSrc: TB_Greenlive
									},
									{
										minWidth: 375,
										imageSrc: MB_Greenlive
									}
								]}
								imageElementProps={{
									src: MB_Greenlive,
									className: 'w-full h-full object-contain',
									srcSet: `${MB_Greenlive} 375w, ${TB_Greenlive} 768w`,
									sizes: `(min-width: 375px) 362px, (min-width: 768px) 696px`
								}}
							/>
						</div>
					</div>
					<Footer className={flatClassName({
						common: `flex items-center justify-center font-sans font-normal text-gnsign-black w-full absolute bottom-0`,
						mobile: `sm:h-[37px] sm:text-[12px] sm:leading-[17px]`
					})} content={`小綠簽 © Code: Alex  /  Design: KT`} />
				</div>
			)
		}

		<div className={flatClassName({
			common: `w-screen h-screen fixed inset-0 flex items-center justify-center bg-gnsign-black/[.54] ${toastState.displayToast ? "":"hidden"}`
		})}>
			<Toast
				messageText={toastState.toastMessage}
				buttonText={`確定`}
				onConfirm={handleConfirmToast}
			></Toast>
		</div>
		<GNsignLoadingPage className={`${loadingState.isLoading ? '': 'hidden'}`} text={loadingState.loadingText} />
	</>)
}

export default GNSign