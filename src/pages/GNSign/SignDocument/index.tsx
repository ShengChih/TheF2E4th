import React, { useEffect, useState, useRef, MouseEvent, useCallback } from "react"
import * as pdf from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url'
import { jsPDF } from 'jspdf'
import { useNavigate } from 'react-router-dom'
import { fabric } from 'fabric'

import { flatClassName } from "@utils/reduce"
import { convertDataURIToBinary } from '@utils/converter'
import GNsignLoadingPage, { InitLoadingState } from "@components/GNsign/LoadingPage"
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

type ImageUrlRef = Object & {
	[key: string|number]: string
}

type ImageScaleRef = Object & {
	[key: string|number]: number
}

const SignDocument = () => {
	const draftFile = useAppSelector(selectDraftFile)
	const makeSign = useAppSelector(selectMakeSign)
	const navigate = useNavigate()

	const [loadingState, setLoadingState] = useState(InitLoadingState)
	const [canvas, setCanvas] = useState<Nullable<fabric.Canvas>>(null)
	const [pageState, setPageState] = useState<PageProps>({
		current: 0,
		maxPage: 0
	})
	const [toolState, setToolState] = useState<number>(0)
	const pdfDocumentProxy = useRef<Nullable<pdf.PDFDocumentProxy>>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const imageUrlsRef = useRef<ImageUrlRef>({})
	const imageScaleRef = useRef<ImageScaleRef>({})

	useEffect(() => {
		(async () => {
			setLoadingState({
				loadingText: '檔案載入中...',
				isLoading: true
			})

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
					const viewport = page.getViewport({
						scale: 1
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
					imageUrlsRef.current[index] = canvas.toDataURL('image/png', 1.0)
				})
			)
			setLoadingState({
				...loadingState,
				isLoading: false
			})
			setCanvas(new fabric.Canvas(canvasRef.current))
		})()
	}, [])

	useEffect(() => {
    if (pageState.current > 0 && canvasRef.current && imageUrlsRef.current[pageState.current - 1]) {
			const loadImage = document.createElement("img")
			loadImage.onload = () => {
				canvas!.setWidth(343)
				canvas!.setHeight(467)
				const scaleX = 343 / loadImage.width
				const scaleY = 467 / loadImage.height
				canvas!.setBackgroundImage(new fabric.Image(loadImage, {
					scaleX: scaleX,
					scaleY: scaleY,
				}), () => canvas!.renderAll())
			}
			loadImage.src = imageUrlsRef.current[pageState.current - 1]
    }
  }, [loadingState.isLoading, canvasRef, imageUrlsRef, pageState.current])

	//useEffect(() => {
	//	if (!draftFile) {
	//		navigate('/gnsign', { replace: true })
	//	}
	//}, [draftFile])
//
	//useEffect(() => {
	//	if (!makeSign) {
	//		navigate('/gnsign/makesign', { replace: true })
	//	}
	//}, [makeSign])

	const toggleTool = (e: MouseEvent) => {
		const toolIndex = parseInt((e.currentTarget.getAttribute("data-tool") ?? '0'))
    setToolState((0 | 1 << toolIndex)) /** 按鈕互斥 */
	}

	const getToolActiveClassName = (toolIndex: number) => {
		return (toolState & 1 << toolIndex)
			? {
				iconContainerClassName: `bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh`,
				iconClassName: `fill-white`,
				buttonClassName: `text-gnsign-green`,
			}
			: {
				iconContainerClassName: `bg-gnsign-background`,
				iconClassName: `fill-gnsign-gray`,
				buttonClassName: `text-gnsign-gray`,
			}
	}

	const clearFabricObjects = () => {
		let fabricObjects:fabric.Object[] = canvas!.getObjects() as fabric.Object[]

		canvas!.remove(...fabricObjects)
	}

	const goPrevious = (e: MouseEvent) => {
		if (pageState.current > 1) {
			clearFabricObjects()
			setPageState({
				...pageState,
				current: pageState.current - 1
			})
		}
	}

	const goNext = (e: MouseEvent) => {
		if (pageState.current < pageState.maxPage) {
			clearFabricObjects()
			setPageState({
				...pageState,
				current: pageState.current + 1
			})
		}
	}

	const insertSign = (e: MouseEvent) => {
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
		}
		img.src = makeSign
		toggleTool(e)
	}

	const insertText = useCallback((e: MouseEvent) => {
		let text = prompt("輸入文字")
		if (text != null && text != "") {
			canvas!.add(new fabric.IText(text))
		}
		toggleTool(e)
	}, [canvas])

	const insertDate = useCallback((e: MouseEvent) => {
		canvas!.add(new fabric.IText(new Date().toISOString().split('T')[0]))
		toggleTool(e)
	}, [canvas])

	const mergeModified = (e: MouseEvent) => {
		imageUrlsRef.current[pageState.current - 1] = canvas!.toDataURL({
			format: 'png',
			quality: 1
		})
		toggleTool(e)
	}

	const finishSignFlow = async (e: MouseEvent) => {
		setLoadingState({
			loadingText: '檔案儲存中...',
			isLoading: true
		})
		mergeModified(e)
		const length = Object.keys(imageUrlsRef.current).length
		const doc = new jsPDF()
		let offsetHeight = 0
		const width = doc.internal.pageSize.width;
		const height = doc.internal.pageSize.height
		for (let i = 0; i < length; i++) {
			const isOK = await new Promise((resolve) => {
				const img = document.createElement('img')
				img.onload = () => {
					doc.addPage()
					doc.setPage(i + 2)
					doc.addImage(img, "png", 0, 0,  width, height)
					offsetHeight += height
					console.log(imageUrlsRef.current[i])
					resolve(true)
				}
				img.src = imageUrlsRef.current[i]
			})
		}
		if (length > 0) {
			doc.deletePage(1)
		}
		doc.save("test.pdf")
		setLoadingState({
			...loadingState,
			isLoading: false
		})
	}

	const toolProps: ToolButtonProps[] = [
		{
			iconName: 'sign',
			buttonText: '簽名',
			handleClick: insertSign
		},
		{
			iconName: 'date',
			buttonText: '日期',
			handleClick: insertDate
		},
		{
			iconName: 'text',
			buttonText: '插入文字',
			handleClick: insertText
		},
		{
			iconName: 'check',
			buttonText: '合併修改',
			handleClick: mergeModified
		}
	]

	return (<>
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

				<div
					onClick={finishSignFlow}
					className={flatClassName({
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
					className={flatClassName({
						mobile: `sm:w-[343px] sm:h-[467px]`
					})}
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
						toolProps.map((props, index) => (
							<ToolButton
								dataToolIndex={`${index + 1}`}
								key={`tool-${index}`}
								{...props}
								{...getToolActiveClassName(index + 1)}
							/>
						))
					}
				</div>
			</div>

		</div>
		<GNsignLoadingPage className={`${loadingState.isLoading ? '': 'hidden'}`} text={loadingState.loadingText} />
	</>)
}

export default SignDocument