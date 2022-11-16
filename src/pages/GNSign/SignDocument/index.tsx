import React, { useEffect, useState, useRef, MouseEvent } from "react"
import * as pdf from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url'
import { useNavigate } from 'react-router-dom'
import { fabric } from 'fabric'

import { flatClassName } from "@utils/reduce"
import { convertDataURIToBinary } from '@utils/converter'

import { useAppDispatch, useAppSelector } from "@/hooks"
import { selectDraftFile } from '@features/gnsign/files/selector'
import { UPLOAD_FILE, MODIFY_FILE } from '@features/gnsign/files/sagaActions'
import { selectDraftSign, selectMakeSign } from '@features/gnsign/signs/selector'
import { SAVE_DRAFT, SAVE_SIGN } from '@features/gnsign/signs/sagaActions'

import { Nullable } from '@/type.d'

pdf.GlobalWorkerOptions.workerSrc = pdfWorker

type PageProps = {
	current: number
	maxPage: number
}

const SignDocument = () => {
	const draftFile = useAppSelector(selectDraftFile)
	const makeSign = useAppSelector(selectMakeSign)
	const navigate = useNavigate()

	const [canvas, setCanvas] = useState<Nullable<fabric.Canvas>>(null)
	const [imageConverted, setImageConverted] = useState<boolean>(false)
	const [pageState, setPageState] = useState<PageProps>({
		current: 0,
		maxPage: 0
	})
	const pdfDocumentProxy = useRef<Nullable<pdf.PDFDocumentProxy>>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const imageUrlsRef = useRef<{ [key:string|number]: string}>({})

	const goPrevious = (e: MouseEvent) => {
		if (pageState.current > 1) {
			setPageState({
				...pageState,
				current: pageState.current - 1
			})
		}
	}

	const goNext = (e: MouseEvent) => {
		if (pageState.current < pageState.maxPage) {
			setPageState({
				...pageState,
				current: pageState.current + 1
			})
		}
	}

	useEffect(() => {
		(async () => {
			const pdfAsArray = convertDataURIToBinary(draftFile)
			const pdfDocument = await pdf.getDocument(pdfAsArray).promise
			pdfDocumentProxy.current = pdfDocument

			setPageState({
				current: 1,
				maxPage: pdfDocument.numPages
			})

			const tasks = new Array(pdfDocument.numPages).fill(null)
			await Promise.all(
				tasks.map(async (_, index: number) => {
					if (imageUrlsRef.current[index]) {
						return
					}
					const page = await pdfDocument.getPage(index + 1)
					const scale = canvasRef.current!.width / page.getViewport({ scale: 1.0 }).width
					const viewport = page.getViewport({
						scale: scale
					})
					const canvas = document.createElement('canvas')
					canvas.width = viewport.width
					canvas.height = viewport.height
					const context = canvas.getContext("2d") as CanvasRenderingContext2D
					const renderTask = page.render({
						canvasContext: context,
						viewport
					})
					await renderTask.promise
					imageUrlsRef.current[index] = canvas.toDataURL('image/png')
				})
			)
			setImageConverted(true)
			setCanvas(new fabric.Canvas(canvasRef.current))
		})()
	}, [])

	useEffect(() => {
		const scale = 1 / window.devicePixelRatio
    if (pageState.current > 0 && canvasRef.current && imageUrlsRef.current[pageState.current - 1]) {
			const loadImage = document.createElement("img")
			loadImage.onload = () => {
				canvas!.add(new fabric.Image(loadImage, {
					scaleX: scale,
					scaleY: scale,
				}))
			}
			loadImage.src = imageUrlsRef.current[pageState.current - 1]
    }
  }, [imageConverted, canvasRef, imageUrlsRef, pageState.current])

	useEffect(() => {
		if (!draftFile) {
			navigate('/gnsign', { replace: true })
		}
	}, [draftFile])

	useEffect(() => {
		if (!makeSign) {
			navigate('/gnsign/makesign', { replace: true })
		}
	}, [makeSign])

	return (
		<div className={`w-screen h-screen flex flex-wrap justify-center bg-gnsign-background`}>
			<div className={flatClassName({
				common: `w-full flex justify-between`,
				mobile: `sm:h-[90px] sm:p-[16px]`
			})}>

				<div className={flatClassName({
					common: `relative flex justify-between bg-white`,
					mobile: `sm:w-[204px] sm:h-[58px] sm:p-[14px] sm:rounded-[16px]`
				})}>
					<div
						className={flatClassName({
							common: `bg-gnsign-green flex justify-center items-center`,
							mobile: `sm:w-[30px] sm:h-[30px] sm:rounded-[12px]`
						})}
						onClick={goPrevious}
					>
						<svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.16244 4.49911L5.16965 0.491906C5.44661 0.214937 5.89448 0.214937 6.1685 0.491906L6.83441 1.15781C7.11137 1.43478 7.11137 1.88264 6.83441 2.15667L3.99695 5.00002L6.83735 7.84042C7.11432 8.11739 7.11432 8.56525 6.83735 8.83927L6.17145 9.50812C5.89448 9.78509 5.44662 9.78509 5.17259 9.50812L1.16538 5.50092C0.885469 5.22395 0.885469 4.77608 1.16244 4.49911Z" fill="white"/>
						</svg>
					</div>

					<p className={flatClassName({
						common: `font-roboto font-normal text-gnsign-black flex items-center`,
						mobile: `sm:text-[16px] sm:leading-[19px]`
					})}>{`${pageState.current} / ${pageState.maxPage}`}</p>

					<div
						className={flatClassName({
							common: `bg-gnsign-green flex justify-center items-center`,
							mobile: `sm:w-[30px] sm:h-[30px] sm:rounded-[12px]`
						})}
						onClick={goNext}
					>
						<svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6.83762 5.50112L2.82847 9.51027C2.55137 9.78737 2.10329 9.78737 1.82913 9.51027L1.16291 8.84404C0.885802 8.56694 0.885802 8.11886 1.16291 7.8447L4.00468 5.00293L1.16291 2.16115C0.885802 1.88405 0.885802 1.43596 1.16291 1.16181L1.82618 0.489687C2.10329 0.212585 2.55137 0.212585 2.82552 0.489687L6.83467 4.49883C7.11472 4.77594 7.11472 5.22402 6.83762 5.50112Z" fill="white"/>
						</svg>
					</div>
				</div>

				<div className={flatClassName({
					common: `font-sans font-normal flex items-center justify-center bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh text-white`,
					mobile: `sm:w-[130px] sm:h-[58px] sm:text-[18px] sm:leading-[26px] sm:rounded-[16px]`
				})}>完成簽署</div>
			</div>

			

			<div className={flatClassName({
				common: `relative`,
				mobile: `sm:w-[343px] h-[457px]`
			})}>
				<canvas
					ref={canvasRef}
					width={343}
					height={457}
				></canvas>
			</div>

			<div className={flatClassName({
				common: `relative w-full flex items-center justify-center`,
				mobile: `sm:h-[120px]`
			})}>
				<div className={flatClassName({
					common: `flex items-center justify-center bg-white`,
					mobile: `sm:w-[343px] sm:h-[72px] sm:rounded-[16px]`
				})}>
					<div className={flatClassName({
						common: `flex flex-col items-center justify-center`,
						mobile: `sm:w-[56px] sm:h-[59px]`
					})}>
						<div className={flatClassName({
							common: `bg-gnsign-background rounded-[9px] flex items-center justify-center`,
							mobile: `sm:w-[40px] sm:h-[40px]`
						})}>
							<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M17.9337 16.8395C18.5217 16.8395 19 17.3241 19 17.9198C19 18.5166 18.5217 19 17.9337 19H11.9063C11.3183 19 10.84 18.5166 10.84 17.9198C10.84 17.3241 11.3183 16.8395 11.9063 16.8395H17.9337ZM13.7537 0.737901L15.3107 1.97472C15.9492 2.47398 16.3748 3.1321 16.5204 3.82427C16.6884 4.58565 16.5092 5.33341 16.0052 5.98019L6.73064 17.9739C6.305 18.5186 5.67774 18.8249 5.00567 18.8363L1.30931 18.8817C1.10769 18.8817 0.939669 18.7455 0.894865 18.5526L0.0547817 14.9102C-0.0908327 14.2408 0.0547817 13.5486 0.480424 13.0153L7.05547 4.50508C7.16749 4.36892 7.36911 4.34736 7.50352 4.44835L10.2702 6.64965C10.4494 6.79716 10.6958 6.87659 10.9535 6.84255C11.5023 6.77447 11.872 6.27521 11.8159 5.7419C11.7823 5.46957 11.6479 5.24263 11.4687 5.07243C11.4127 5.02704 8.78045 2.91651 8.78045 2.91651C8.61243 2.78035 8.57883 2.53072 8.71324 2.36165L9.75494 1.01023C10.7182 -0.226589 12.3984 -0.340058 13.7537 0.737901Z" fill="#B7B7B7"/>
							</svg>
						</div>
						<div className={flatClassName({
							common: `w-full text-gnsign-gray font-sans font-nomal text-center`,
							mobile: `sm:h-[17px] sm:text-[12px] sm:leading-[17px]`
						})}>簽名</div>
					</div>

					<div className={flatClassName({
						common: `flex flex-col items-center justify-center`,
						mobile: `sm:w-[56px] sm:h-[59px]`
					})}>
						<div className={flatClassName({
							common: `bg-gnsign-background rounded-[9px] flex items-center justify-center`,
							mobile: `sm:w-[40px] sm:h-[40px]`
						})}>
							<svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.99409 14.3627C6.52084 14.3627 6.04759 14.1832 5.68631 13.8219L0.672777 8.80835C-0.0497799 8.08579 -0.0497799 6.91534 0.672777 6.19489C1.39533 5.47234 2.56368 5.47022 3.28624 6.19278L6.99409 9.90064L15.7155 1.17925C16.438 0.45669 17.6064 0.45669 18.3289 1.17925C19.0515 1.9018 19.0515 3.07226 18.3289 3.79482L8.30188 13.8219C7.9406 14.1832 7.46735 14.3627 6.99409 14.3627Z" fill="#B7B7B7"/>
							</svg>
						</div>
						<div className={flatClassName({
							common: `w-full text-gnsign-gray font-sans font-nomal text-center`,
							mobile: `sm:h-[17px] sm:text-[12px] sm:leading-[17px]`
						})}>勾選</div>
					</div>

					<div className={flatClassName({
						common: `flex flex-col items-center justify-center`,
						mobile: `sm:w-[56px] sm:h-[59px]`
					})}>
						<div className={flatClassName({
							common: `bg-gnsign-background rounded-[9px] flex items-center justify-center`,
							mobile: `sm:w-[40px] sm:h-[40px]`
						})}>
							<svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M13.3524 0.94446C13.8006 0.943408 14.1549 1.29157 14.1559 1.75578L14.157 2.54705C17.0647 2.77493 18.9854 4.75628 18.9885 7.79475L19 16.6886C19.0042 20.0014 16.9229 22.0397 13.5869 22.045L5.43811 22.0556C2.12293 22.0598 0.0156467 19.9729 0.011478 16.6507L6.99559e-06 7.86122C-0.0041547 4.8027 1.84884 2.82663 4.75652 2.55971L4.75548 1.76844C4.75444 1.30423 5.09836 0.955013 5.55692 0.955013C6.01547 0.953958 6.35939 1.30212 6.36044 1.76633L6.36148 2.50485L12.552 2.49641L12.551 1.75789C12.5499 1.29368 12.8939 0.945518 13.3524 0.94446ZM13.7776 15.9248H13.7672C13.2878 15.9364 12.9032 16.3384 12.9137 16.8237C12.9147 17.309 13.3014 17.7088 13.7808 17.7194C14.2695 17.7183 14.6656 17.3164 14.6645 16.8205C14.6645 16.3246 14.2675 15.9248 13.7776 15.9248ZM5.19007 15.9258C4.71067 15.9469 4.33548 16.3489 4.33652 16.8342C4.35841 17.3195 4.75444 17.6993 5.23384 17.6772C5.70386 17.6561 6.078 17.2541 6.05612 16.7688C6.0457 16.2941 5.65905 15.9248 5.19007 15.9258ZM9.48385 15.9206C9.00445 15.9427 8.6303 16.3436 8.6303 16.8289C8.65219 17.3143 9.04822 17.693 9.52762 17.6719C9.9966 17.6498 10.3718 17.2489 10.3499 16.7625C10.3395 16.2888 9.95283 15.9195 9.48385 15.9206ZM5.18486 12.1277C4.70545 12.1489 4.33131 12.5508 4.33235 13.0361C4.3532 13.5214 4.75027 13.9012 5.22967 13.8791C5.69865 13.858 6.07279 13.456 6.05091 12.9707C6.04049 12.496 5.65488 12.1267 5.18486 12.1277ZM9.47968 12.0908C9.00028 12.1119 8.62509 12.5139 8.62613 12.9992C8.64698 13.4845 9.04405 13.8633 9.52345 13.8422C9.99243 13.82 10.3666 13.4191 10.3457 12.9338C10.3343 12.459 9.94866 12.0898 9.47968 12.0908ZM13.7735 12.0961C13.2941 12.1066 12.9189 12.497 12.9199 12.9823V12.9939C12.9303 13.4792 13.3264 13.8474 13.8068 13.8369C14.2758 13.8253 14.6499 13.4233 14.6395 12.938C14.6176 12.4738 14.2414 12.095 13.7735 12.0961ZM12.5541 4.12115L6.36356 4.12959L6.3646 4.98311C6.3646 5.43782 6.02173 5.79653 5.56317 5.79653C5.10461 5.79759 4.75965 5.43993 4.75965 4.98522L4.75861 4.17285C2.72636 4.37647 1.60184 5.57076 1.60496 7.85911L1.60601 8.18722L17.3846 8.16612V7.79686C17.3398 5.52856 16.2017 4.33848 14.1591 4.16124L14.1601 4.97361C14.1601 5.42727 13.8068 5.78704 13.3587 5.78704C12.9001 5.78809 12.5552 5.42938 12.5552 4.97572L12.5541 4.12115Z" fill="#B7B7B7"/>
							</svg>
						</div>
						<div className={flatClassName({
							common: `w-full text-gnsign-gray font-sans font-nomal text-center`,
							mobile: `sm:h-[17px] sm:text-[12px] sm:leading-[17px]`
						})}>日期</div>
					</div>

					<div className={flatClassName({
						common: `flex flex-col items-center justify-center`,
						mobile: `sm:w-[56px] sm:h-[59px]`
					})}>
						<div className={flatClassName({
							common: `bg-gnsign-background rounded-[9px] flex items-center justify-center`,
							mobile: `sm:w-[40px] sm:h-[40px]`
						})}>
							<svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5.72684 18.6539V3.44263H0.5V0.346191H14.5V3.44263H9.28393V18.6516H5.72684V18.6539Z" fill="#B7B7B7"/>
							</svg>
						</div>
						<div className={flatClassName({
							common: `w-full text-gnsign-gray font-sans font-nomal text-center`,
							mobile: `sm:h-[17px] sm:text-[12px] sm:leading-[17px]`
						})}>插入文字</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default SignDocument