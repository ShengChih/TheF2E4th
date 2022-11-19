import React, {
	lazy,
	useEffect, useState, useRef,
	MouseEvent, useCallback, Suspense
} from "react"
import * as pdf from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url'
import { jsPDF } from 'jspdf'
import { useNavigate } from 'react-router-dom'
import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'


import { flatClassName } from "@utils/reduce"
import { convertDataURIToBinary } from '@utils/converter'
import GNsignLoadingPage, { InitLoadingState } from "@components/GNsign/LoadingPage"
import ToolButton, { ToolButtonProps } from "@components/GNsign/ToolButton"

import { useAppDispatch, useAppSelector } from "@/hooks"
import { selectDraftFile } from '@features/gnsign/files/selector'
import { MODIFY_DRAFT } from '@features/gnsign/files/sagaActions'
import { SAVE_TO_HISTORY } from '@features/gnsign/histories/sagaActions'

import { Nullable } from '@/type.d'
import { FileInfo } from '@features/gnsign/type.d'

const ConfirmForm = lazy(() => import('@components/GNsign/ConfirmForm'))
const TextBox = lazy(() => import('@components/GNsign/TextBox'))
const SignBox = lazy(() => import('@components/GNsign/SignBox'))
const Toast = lazy(() => import('@components/GNsign/Toast'))

pdf.GlobalWorkerOptions.workerSrc = pdfWorker

type PageProps = {
	current: number
	maxPage: number
}

type ImageUrlRef = Object & {
	[key: string|number]: string
}

const SignDocument = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const draftFile: FileInfo = useAppSelector(selectDraftFile)
	const [showSave, setSave] = useState<boolean>(false)
	const [loadingState, setLoadingState] = useState(InitLoadingState)
	const [canvas, setCanvas] = useState<Nullable<fabric.Canvas>>(null)
	const [pageState, setPageState] = useState<PageProps>({
		current: 0,
		maxPage: 0
	})
	const [mergeCount, setMergeCount] = useState<number>(0)
	const [showToast, setToast] = useState<boolean>(false)
	const [downloadCount, setDownloadCount] = useState<number>(0)
	const [showConfirmForm, setConfirmForm] = useState<boolean>(false)
	const [showTextBox, setTextBox] = useState<boolean>(false)
	const [showSignBox, setSignBox] = useState<boolean>(false)
	const [toolState, setToolState] = useState<number>(0)
	const pdfDocumentProxy = useRef<Nullable<pdf.PDFDocumentProxy>>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const imageUrlsRef = useRef<ImageUrlRef>({})

	useEffect(() => {
		(async () => {
			setLoadingState({
				loadingText: '檔案載入中...',
				isLoading: true
			})

			const pdfAsArray = convertDataURIToBinary(draftFile.url)
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
  }, [loadingState.isLoading, canvasRef, imageUrlsRef, pageState.current, mergeCount])

	const toggleTool = useCallback((e: MouseEvent) => {
		const toolIndex = parseInt((e.currentTarget.getAttribute("data-tool") ?? '0'))
    setToolState((0 | 1 << toolIndex)) /** 按鈕互斥 */
	}, [setToolState])

	const getToolActiveClassName = useCallback((toolIndex: number) => {
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
	}, [toolState])

	const clearFabricObjects = useCallback(() => {
		let fabricObjects:fabric.Object[] = canvas!.getObjects() as fabric.Object[]

		canvas!.remove(...fabricObjects)
	}, [canvas])

	const goPrevious = useCallback((e: MouseEvent) => {
		if (pageState.current > 1) {
			clearFabricObjects()
			setPageState({
				...pageState,
				current: pageState.current - 1
			})
		}
	}, [setPageState, clearFabricObjects, pageState.current])

	const goNext = useCallback((e: MouseEvent) => {
		if (pageState.current < pageState.maxPage) {
			clearFabricObjects()
			setPageState({
				...pageState,
				current: pageState.current + 1
			})
		}
	}, [setPageState, clearFabricObjects, pageState.current])

	const displaySignBox = (e: MouseEvent) => {
		setSignBox(true)
		toggleTool(e)
		e.preventDefault()
	}

	const cancleSignBox = () => {
		setSignBox(false)
	}

	const insertSign = useCallback((img: HTMLImageElement) => {
		canvas!.add(new fabric.Image(img, {
			width: img.width,
			height: img.height,
			top: 0,
			left: 0,
			scaleX: 0.5,
			scaleY: 0.5
		}))
	}, [canvas])

	const insertText = useCallback((textBoxMessage: string) => {
		canvas!.add(new fabric.IText(textBoxMessage))
	}, [canvas])

	const insertDate = useCallback((e: MouseEvent) => {
		canvas!.add(new fabric.IText(new Date((+new Date() + (60 * 60 * 8 * 1000))).toISOString().split('T')[0]))
		toggleTool(e)
	}, [canvas, toggleTool])

	const checkCanvasObjects = useCallback(() => {
		let fabricObjects:fabric.Object[] = canvas!.getObjects() as fabric.Object[]
		return fabricObjects.length > 0
	}, [canvas])

	const handleConfirmToast = useCallback((e: MouseEvent) => {
		setToast(false)
	}, [setToast])

	const mergeModified = useCallback((e: MouseEvent) => {
		if (!checkCanvasObjects()) {
			return
		}
		imageUrlsRef.current[pageState.current - 1] = canvas!.toDataURL({
			format: 'png',
			quality: 1
		})
		toggleTool(e)
		setMergeCount(mergeCount + 1)
		clearFabricObjects()
	}, [pageState, canvas, toggleTool, setMergeCount, mergeCount, checkCanvasObjects])

	const downalodFile = async (e: MouseEvent) => {
		try {
			setLoadingState({
				loadingText: '檔案儲存中...',
				isLoading: true
			})
			mergeModified(e)
			const length = Object.keys(imageUrlsRef.current).length
			const doc = new jsPDF()
			const width = doc.internal.pageSize.width;
			const height = doc.internal.pageSize.height
			for (let i = 0; i < length; i++) {
				await new Promise((resolve) => {
					const img = document.createElement('img')
					img.onload = () => {
						doc.addPage()
						doc.setPage(i + 2)
						doc.addImage(img, "png", 0, 0,  width, height)
						console.log(imageUrlsRef.current[i])
						resolve(true)
					}
					img.src = imageUrlsRef.current[i]
				})
			}
			if (length > 0) {
				doc.deletePage(1)
			}

			dispatch({ type: SAVE_TO_HISTORY, payload: {
				fileId: uuidv4(),
				filename: draftFile.filename,
				url: doc.output('datauristring'),
				ctime: new Date((+new Date() + (60 * 60 * 8 * 1000))),
				mtime: new Date((+new Date() + (60 * 60 * 8 * 1000)))
			}})
			/** 超鬆散寫 */
			doc.save(`${draftFile.filename}.pdf`.replaceAll(/\.pdf\.pdf/g, '.pdf'))
			
			navigate('/gnsign/download?status=success', { replace: true })
		} catch (error) {
			navigate('/gnsign/download?status=error', { replace: true })
		}
		setDownloadCount(downloadCount + 1)
		dispatch({ type: MODIFY_DRAFT, payload: '' })
	}

	const finishSignFlow = (e: MouseEvent) => {
		if (mergeCount > 0 && !checkCanvasObjects()) {
			setSave(true)
			return
		}
		setToast(true)
	}

	const goLanding = useCallback((e: MouseEvent) => {
		navigate('/gnsign', { replace: true })
		dispatch({ type: MODIFY_DRAFT, payload: '' })
	}, [navigate])

	const checkDownloadCount = useCallback((e: MouseEvent) => {
		e.preventDefault()
		if (downloadCount > 0) {
			goLanding(e)
			return
		}
		setConfirmForm(true)
	}, [setConfirmForm, goLanding])

	const cancleConfirmForm = useCallback((e: MouseEvent) => {
		e.preventDefault()
		setConfirmForm(false)
	}, [setConfirmForm])

	const displayTextBox = useCallback((e: MouseEvent) => {
		setTextBox(true)
		toggleTool(e)
		e.preventDefault()
	}, [setTextBox, toggleTool])

	const cancleTextBox = useCallback((e: MouseEvent) => {
		e.preventDefault()
		setTextBox(false)
	}, [setTextBox])

	const toolProps: ToolButtonProps[] = [
		{
			iconName: 'sign',
			buttonText: '簽名',
			handleClick: displaySignBox
		},
		{
			iconName: 'date',
			buttonText: '日期',
			handleClick: insertDate
		},
		{
			iconName: 'text',
			buttonText: '插入文字',
			handleClick: displayTextBox
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
				{
					showSave
					? (
						<div
							onClick={checkDownloadCount}
							className={flatClassName({
							common: `font-sans font-normal flex items-center justify-center text-gnsign-green bg-white`,
							mobile: `sm:w-[130px] sm:h-[58px] sm:text-[18px] sm:leading-[26px] sm:rounded-[16px]`
						})}>回首頁</div>
					)
					: (
						<div
							onClick={finishSignFlow}
							className={flatClassName({
							common: `font-sans font-normal flex items-center justify-center bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh text-white`,
							mobile: `sm:w-[130px] sm:h-[58px] sm:text-[18px] sm:leading-[26px] sm:rounded-[16px]`
						})}>完成簽署</div>
					)
				}
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
				{
					showSave
					? (<button
						onClick={downalodFile}
						className={flatClassName({
						common: ` text-white font-sans font-normal  flex items-center justify-center bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh`,
						mobile: ` sm:text-[18px] sm:leading-[26px] sm:w-[260px] sm:h-[56px] sm:rounded-[16px]`
					})}>儲存</button>)
					: (
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
					)
				}
				</div>
		</div>
		<div className={flatClassName({
				common: `w-screen h-screen fixed inset-0 flex items-center justify-center bg-gnsign-black/[.54] ${showSignBox || showTextBox || showConfirmForm || showToast ? "":"hidden"}`
		})}>
			<Suspense fallback={<p className={`hidden`}></p>}>
				{ showSignBox ? <SignBox insertSign={insertSign} cancleSignBox={cancleSignBox} /> : '' }
				{ showTextBox ? <TextBox
					handleInsert={insertText}
					handleCancel={cancleTextBox}
				/> : '' }
				{ showConfirmForm ? <ConfirmForm
					messageText={`尚未儲存文件，確定要離開？`}
					rightButtonText={`確定`}
					handleRightButton={goLanding}
					leftButtonText={`取消`}
					handleLeftButton={cancleConfirmForm}
				/> : '' }
				{
					showToast ? <Toast
						messageText={'請置入簽名後再完成簽署'}
						buttonText={`確定`}
						onConfirm={handleConfirmToast}
					></Toast>
					: ''
				}
			</Suspense>
		</div>
		<GNsignLoadingPage className={`${loadingState.isLoading ? '': 'hidden'}`} text={loadingState.loadingText} />
	</>)
}

export default SignDocument