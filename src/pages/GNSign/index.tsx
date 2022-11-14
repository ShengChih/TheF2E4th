import {
	memo,
  useRef,
  useState,
  useEffect,
  useCallback,
  ElementRef, MouseEvent,
  lazy, Suspense, useLayoutEffect, ChangeEvent
} from "react"

import { deviceWidth } from '@utils/config'
import { flatClassName } from '@utils/reduce'
import useCheckScreen from '@hooks/useCheckScreen'
import useImagePreloader from "@hooks/useImagePreloader"
import { useAppDispatch, useAppSelector } from "@/hooks"

import { selectDraft, selectOrigin } from '@features/gnsign/files/selector'
import { UPLOAD_FILE, MODIFY_FILE } from '@features/gnsign/files/action'


import LoadingPage from '@components/shared/LoadingPage'

import MB_Loading from './images/mobile/loading.png'
import MB_Drawstring from './images/mobile/drawstring.png'
import MB_Grass from './images/mobile/grass.png'
import MB_Logo from './images/mobile/logo.png'
import MB_People1 from './images/mobile/people1.png'
import MB_People2 from './images/mobile/people2.png'
import MB_People3 from './images/mobile/people3.png'
import MB_Watermark from './images/mobile/watermark.png'
import MB_Plant from './images/mobile/plant.png'

import { ToastState } from './type.d'
import {
	MaximumFileSize,
	FileType,
	InitToastState,
	ToastMessages
} from './constants'

const MultipleImageSources = lazy(
	() => import('@components/shared/ResponsiveImageContainer/MultipleImageSources'))
const Footer = lazy(
	() => import('@components/shared/Footer')
)
const Toast = lazy(
	() => import('@components/GNsign/Toast')
)

const CustomLoadingPage = memo(({ text }: { text: string }) => {
	return (
		<LoadingPage
			loadingImg={<img src={MB_Loading} className={`absolute`} />}
			content={<p className={flatClassName({
				common: `absolute`,
				mobile: `sm:translate-y-[308px]`
			})}>{text}</p>}
			className={flatClassName({
				common: `w-screen h-screen bg-gnsign-background fixed flex justify-center`,
				mobile: `sm:translate-y-[176px]`
			})}
		/>
	)
})

const GNSign = () => {
	const dispatch = useAppDispatch()
	const [isReadyPage, setReadyPage] = useState<boolean>(false)
	const [selectedFile, setSelectedFile] = useState<HTMLInputElement | null>(null)
	const [toastState, setToastState] = useState<ToastState>(InitToastState)

	const inputFileRef = useRef<HTMLInputElement>(null)
	
	const { imagesPreloaded } = useImagePreloader([
		MB_Logo,
		MB_Watermark,
		MB_Drawstring,
		MB_Grass,
		MB_People1,
		MB_People2,
		MB_People3,
		MB_Plant
	])

	useEffect(() => {
    if (imagesPreloaded) {
      setReadyPage(true)
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

	const checkFile = (files: FileList) => {
		for (const file of files) {
			if (file.size >= MaximumFileSize) {
				setToastState({
					toastMessage: ToastMessages['oversize'],
					displayToast: true
				})
				return false
			}

			if (file.type !== FileType) {
				setToastState({
					toastMessage: ToastMessages['filetype'],
					displayToast: true
				})
				return false
			}
		}

		return files.length > 0
	}

	const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()

		if (e.target.files && checkFile(e.target.files)) {
			const file = e.target.files[0];
			const localImageUrl = window.URL.createObjectURL(file);

			dispatch({
				type: UPLOAD_FILE,
				payload: localImageUrl
			})
		}
	}

	return (<>
		
		<div className={flatClassName({
			common: `w-screen h-screen relative bg-gnsign-background flex flex-col items-center`
		})}>
			{  !isReadyPage ? ( <CustomLoadingPage text={`載入中...`} /> ): '' }

			<div className={flatClassName({
				common: `flex justify-between`,
				mobile: `sm:w-[299px] sm:h-[64.95px] sm:mt-[21px] sm:mb-[14.05px]`
			})}>
				<div className={flatClassName({
					common: `relative self-start`,
					mobile: `sm:w-[88.21px] sm:h-[59.35px]`
				})}>
					<Suspense fallback={``}>
						<MultipleImageSources
							aliasName={`GNSign`}
							mediaImages={[
								{
									minWidth: 375,
									imageSrc: MB_Logo
								}
							]}
							imageElementProps={{
								src: MB_Logo,
								className: 'w-full h-full object-contain',
								srcSet: `${MB_Logo} 375w`,
								sizes: `(min-width: 375px) 88.21px`
							}}
						/>
					</Suspense>
				</div>
				<div className={flatClassName({
					common: `self-end font-normal font-sans text-gnsign-black underline`,
					mobile: `sm:text-[18px] sm:leading-[32px] sm:leading-[26px]`
				})}>歷史記錄</div>
			</div>
			<div className={flatClassName({
				common: `flex flex-col items-center bg-white border-dashed rounded-[26px] border-gnsign-gray border-2 box-border`,
				mobile: `sm:w-[299px] sm:h-[384px]`
			})}>
				<div className={flatClassName({
					common: `absolute`,
					mobile: `sm:w-[134px] sm:h-[110px] sm:translate-y-[48.5px]`
				})}>
					<Suspense fallback={``}>
						<MultipleImageSources
							aliasName={`Watermark`}
							mediaImages={[
								{
									minWidth: 375,
									imageSrc: MB_Watermark
								}
							]}
							imageElementProps={{
								src: MB_Watermark,
								className: 'w-full h-full object-contain',
								srcSet: `${MB_Watermark} 375w`,
								sizes: `(min-width: 375px) 299px`
							}}
						/>
					</Suspense>
				</div>
				<div className={flatClassName({
					common: `flex flex-col absolute bg-white`,
					mobile: `sm:w-[209px] sm:h-[95px] sm:gap-y-[15px] sm:translate-y-[178.5px]`
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
							common: `font-sans font-normal text-white flex items-center justify-center w-full bg-gradient-to-b	from-gnsign-greenl to-gnsign-greenh rounded-[16px]`,
							mobile: `sm:text-[18px] sm:leading-[26px] sm:w-[209px] sm:h-[60px]`
						})}
					>選擇檔案</button>
					<p className={flatClassName({
						common: `flex justify-center font-sans font-normal bg-clip-text bg-gradient-to-b	from-gnsign-greenl to-gnsign-greenh text-fill-transparent`,
						mobile: `sm:text-[14px] sm:leading-[20px]`
					})}>(限10MB 內的PDF或JPG檔)</p>
				</div>


				<div className={flatClassName({
					common: `absolute top-0`,
					mobile: `sm:w-[362px] sm:h-[228px] sm:translate-x-[2.5px] sm:translate-y-[412px]`
				})}>
					<div className={flatClassName({
						common: `absolute`,
						mobile: `sm:w-[355px] sm:h-[59px] sm:translate-x-[7px] sm:translate-y-[169px]`
					})}>
						<Suspense fallback={``}>
							<MultipleImageSources
								aliasName={`Grass`}
								mediaImages={[
									{
										minWidth: 375,
										imageSrc: MB_Grass
									}
								]}
								imageElementProps={{
									src: MB_Grass,
									className: 'w-full h-full object-contain',
									srcSet: `${MB_Grass} 375w`,
									sizes: `(min-width: 375px) 355px`
								}}
							/>
						</Suspense>
					</div>
					<div className={flatClassName({
						common: `absolute`,
						mobile: `sm:w-[142px] sm:h-[202px] sm:translate-x-0 sm:translate-y-0`
					})}>
						<Suspense fallback={``}>
							<MultipleImageSources
								aliasName={`People1`}
								mediaImages={[
									{
										minWidth: 375,
										imageSrc: MB_People1
									}
								]}
								imageElementProps={{
									src: MB_People1,
									className: 'w-full h-full object-contain',
									srcSet: `${MB_People1} 375w`,
									sizes: `(min-width: 375px) 142px`
								}}
							/>
						</Suspense>
					</div>
					<div className={flatClassName({
						common: `absolute`,
						mobile: `sm:w-[97px] sm:h-[164px] sm:translate-x-[124px] sm:translate-y-[45px]`
					})}>
						<Suspense fallback={``}>
							<MultipleImageSources
								aliasName={`People2`}
								mediaImages={[
									{
										minWidth: 375,
										imageSrc: MB_People2
									}
								]}
								imageElementProps={{
									src: MB_People2,
									className: 'w-full h-full object-contain',
									srcSet: `${MB_People2} 375w`,
									sizes: `(min-width: 375px) 97px`
								}}
							/>
						</Suspense>
					</div>
					<div className={flatClassName({
						common: `absolute`,
						mobile: `sm:w-[76px] sm:h-[127px] sm:translate-x-[205px] sm:translate-y-[82px]`
					})}>
						<Suspense fallback={``}>
							<MultipleImageSources
								aliasName={`Plant`}
								mediaImages={[
									{
										minWidth: 375,
										imageSrc: MB_Plant
									}
								]}
								imageElementProps={{
									src: MB_Plant,
									className: 'w-full h-full object-contain',
									srcSet: `${MB_Plant} 375w`,
									sizes: `(min-width: 375px) 76px`
								}}
							/>
						</Suspense>
					</div>
					<div className={flatClassName({
						common: `absolute`,
						mobile: `sm:w-[21px] sm:h-[27px] sm:translate-x-[251px] sm:translate-y-[187px]`
					})}>
						<Suspense fallback={``}>
							<MultipleImageSources
								aliasName={`Drawstring`}
								mediaImages={[
									{
										minWidth: 375,
										imageSrc: MB_Drawstring
									}
								]}
								imageElementProps={{
									src: MB_Drawstring,
									className: 'w-full h-full object-contain',
									srcSet: `${MB_Drawstring} 375w`,
									sizes: `(min-width: 375px) 21px`
								}}
							/>
						</Suspense>
					</div>
					<div className={flatClassName({
						common: `absolute`,
						mobile: `sm:w-[108px] sm:h-[188px] sm:translate-x-[239px] sm:translate-y-[7px]`
					})}>
						<Suspense fallback={``}>
							<MultipleImageSources
								aliasName={`People3`}
								mediaImages={[
									{
										minWidth: 375,
										imageSrc: MB_People3
									}
								]}
								imageElementProps={{
									src: MB_People3,
									className: 'w-full h-full object-contain',
									srcSet: `${MB_People3} 375w`,
									sizes: `(min-width: 375px) 108px`
								}}
							/>
						</Suspense>
					</div>
					
				</div>
			</div>
			<Footer className={flatClassName({
				common: `flex items-center justify-center font-sans font-normal text-gnsign-black w-full absolute bottom-0`,
				mobile: `sm:h-[37px] sm:text-[12px] sm:leading-[17px]`
			})} content={`小綠簽 © Code: Alex  /  Design: KT`} />
		</div>
		<Suspense fallback={``}>
			<div className={flatClassName({
				common: `w-screen h-screen absolute inset-0 flex items-center justify-center bg-gnsign-black/[.54] ${toastState.displayToast ? "":"hidden"}`
			})}>
				<Toast
					messageText={toastState.toastMessage}
					buttonText={`確定`}
					onConfirm={handleConfirmToast}
				></Toast>
			</div>
		</Suspense>
	</>)
}

export default GNSign