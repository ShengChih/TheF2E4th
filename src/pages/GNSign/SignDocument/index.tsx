import React, { useEffect, useState, useRef, MouseEvent, useCallback } from "react"
import * as pdf from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url'
import { useNavigate } from 'react-router-dom'
import { fabric } from 'fabric'

import { flatClassName } from "@utils/reduce"
import { convertDataURIToBinary } from '@utils/converter'
import ToolButton, { ToolButtonProps } from "@components/GNsign/ToolButton"

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
	const [toolState, setToolState] = useState<number>(0)
	const pdfDocumentProxy = useRef<Nullable<pdf.PDFDocumentProxy>>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const imageUrlsRef = useRef<{ [key:string|number]: string}>({})

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
				canvas!.setBackgroundImage(new fabric.Image(loadImage, {
					scaleX: scale,
					scaleY: scale,
				}), () => canvas!.renderAll())
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

	const toggleTool = (e: MouseEvent) => {
		const toolIndex = parseInt((e.currentTarget.getAttribute("data-tool") ?? '0'))
    setToolState((0 | 1 << toolIndex)) /** 按鈕互斥 */
	}

	const getToolClassName = (toolIndex: number) => {
		return (toolState & 1 << toolIndex)
			? `bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh`
			: ``
	}

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

	const insertSign = (e: MouseEvent) => {
		const scale = 1 / window.devicePixelRatio
		const img = document.createElement('img')
		img.onload = () => {
			canvas!.add(new fabric.Image(img, {
				width: img.width,
				height: img.height,
				top: 0,
				left: 0,
				scaleX: 0.5,
				scaleY: 0.5
			}))

			toggleTool(e)
		}
		img.src = makeSign
	}

	const toolProps: ToolButtonProps[] = [
		{
			iconName: 'sign',
			buttonText: '簽名',
			handleClick: insertSign
		},
		{
			iconName: 'check',
			buttonText: '勾選',
			handleClick: insertSign
		},
		{
			iconName: 'date',
			buttonText: '日期',
			handleClick: insertSign
		},
		{
			iconName: 'text',
			buttonText: '插入文字',
			handleClick: insertSign
		}
	]

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
					{
						toolProps.map((props, index) => (<ToolButton data-tool={`${index + 1}`} key={`tool-${index}`} {...props} />))
					}
				</div>
			</div>

		</div>
	)
}

export default SignDocument