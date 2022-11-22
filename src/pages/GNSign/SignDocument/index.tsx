import React, {
  lazy,
  useEffect,
  useState,
  useRef,
  MouseEvent,
  KeyboardEvent,
  useCallback,
  Suspense,
} from 'react'
import * as pdf from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url'
import { jsPDF } from 'jspdf'
import { useNavigate } from 'react-router-dom'
import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'

import { deviceWidth } from '@/utils/config'
import useCheckScreen from '@/hooks/useCheckScreen'
import { flatClassName } from '@/utils/reduce'
import { convertDataURIToBinary } from '@/utils/converter'
import GNsignLoadingPage, { InitLoadingState } from '@/components/GNsign/LoadingPage'
import ToolButton, { ToolButtonProps } from '@/components/GNsign/ToolButton'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { selectDraftFile } from '@/features/gnsign/files/selector'
import { MODIFY_DRAFT } from '@/features/gnsign/files/sagaActions'
import { SAVE_TO_HISTORY } from '@/features/gnsign/histories/sagaActions'

import { Nullable } from '@/type.d'
import { FileInfo } from '@/features/gnsign/type.d'
import PC_Logo from '@/pages/GNSign/Landing/images/desktop/logo.png'
import './styles/fullpage/base.scss'
import { GNsignFavicon } from '@/utils/favicon'

const ConfirmForm = lazy(() => import('@/components/GNsign/ConfirmForm'))
const TextBox = lazy(() => import('@/components/GNsign/TextBox'))
const SignBox = lazy(() => import('@/components/GNsign/SignBox'))
const Toast = lazy(() => import('@/components/GNsign/Toast'))

pdf.GlobalWorkerOptions.workerSrc = pdfWorker

type PageProps = {
  current: number
  maxPage: number
}

type ImageUrlRef = {
  [key: string | number]: string
}

const SignDocument = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)
  const draftFile: FileInfo = useAppSelector(selectDraftFile)
  const [showSave, setSave] = useState<boolean>(false)
  const [loadingState, setLoadingState] = useState(InitLoadingState)
  const [canvas, setCanvas] = useState<Nullable<fabric.Canvas>>(null)
  const [pageState, setPageState] = useState<PageProps>({
    current: 0,
    maxPage: 0,
  })
  const [scaleState, setScaleState] = useState<number>(1) /** 100% */
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

  const [canvasWidth, canvasHeight] = isMobile
    ? [343, 457]
    : isTablet
    ? [736, 981]
    : isDesktop
    ? [793, 1053]
    : [-1, -1]
  GNsignFavicon()

  useEffect(() => {
    ;(async () => {
      setLoadingState({
        loadingText: '檔案載入中...',
        isLoading: true,
      })

      const pdfAsArray = convertDataURIToBinary(draftFile.url)
      const pdfDocument = await pdf.getDocument(pdfAsArray).promise
      pdfDocumentProxy.current = pdfDocument

      setPageState({
        current: 1,
        maxPage: pdfDocument.numPages,
      })
      const tasks = new Array(pdfDocument.numPages).fill(null)
      await Promise.all(
        tasks.map(async (_, index: number) => {
          if (imageUrlsRef.current[index]) {
            return
          }
          const page = await pdfDocument.getPage(index + 1)
          const viewport = page.getViewport({
            scale: 1,
          })
          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          const context = canvas.getContext('2d') as CanvasRenderingContext2D
          const renderTask = page.render({
            canvasContext: context,
            viewport,
          })
          await renderTask.promise
          imageUrlsRef.current[index] = canvas.toDataURL('image/png', 1.0)
        }),
      )
      setLoadingState({
        ...loadingState,
        isLoading: false,
      })
      setCanvas(new fabric.Canvas(canvasRef.current))
    })()
  }, [draftFile.url, loadingState])

  useEffect(() => {
    if (pageState.current > 0 && canvasRef.current && imageUrlsRef.current[pageState.current - 1]) {
      const loadImage = document.createElement('img')
      loadImage.onload = () => {
        canvas && canvas.setWidth(canvasWidth * scaleState)
        canvas && canvas.setHeight(canvasHeight * scaleState)
        const scaleX = (canvasWidth / loadImage.width) * scaleState
        const scaleY = (canvasHeight / loadImage.height) * scaleState
        canvas &&
          canvas.setBackgroundImage(
            new fabric.Image(loadImage, {
              scaleX: scaleX,
              scaleY: scaleY,
            }),
            () => canvas && canvas.renderAll(),
          )
      }
      loadImage.src = imageUrlsRef.current[pageState.current - 1]
    }
  }, [
    loadingState.isLoading,
    canvasRef,
    imageUrlsRef,
    pageState,
    mergeCount,
    scaleState,
    canvas,
    canvasHeight,
    canvasWidth,
  ])

  const toggleTool = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      const toolIndex = parseInt(e.currentTarget.getAttribute('data-tool') ?? '0')
      setToolState(0 | (1 << toolIndex)) /** 按鈕互斥 */
    },
    [setToolState],
  )

  const getToolActiveClassName = useCallback(
    (toolIndex: number) => {
      return toolState & (1 << toolIndex)
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
    },
    [toolState],
  )

  const clearFabricObjects = useCallback(() => {
    const fabricObjects: fabric.Object[] =
      (canvas && (canvas.getObjects() as fabric.Object[])) ?? []

    canvas && canvas.remove(...fabricObjects)
  }, [canvas])

  const roundDecimal = (val: number, precision: number) => {
    return (
      Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) /
      Math.pow(10, precision || 0)
    )
  }

  const goPrevious = useCallback(() => {
    if (pageState.current > 1) {
      clearFabricObjects()
      setPageState({
        ...pageState,
        current: pageState.current - 1,
      })
    }
  }, [setPageState, clearFabricObjects, pageState])

  const goNext = useCallback(() => {
    if (pageState.current < pageState.maxPage) {
      clearFabricObjects()
      setPageState({
        ...pageState,
        current: pageState.current + 1,
      })
    }
  }, [setPageState, clearFabricObjects, pageState])

  const scaleLess = () => {
    const ret = roundDecimal(scaleState - 0.1, 1)
    if (ret < 0.5) {
      return
    }
    setScaleState(ret)
  }

  const scaleMore = () => {
    const ret = roundDecimal(scaleState + 0.1, 1)
    if (ret > 1.5) {
      return
    }
    setScaleState(ret)
  }

  const displaySignBox = (e: MouseEvent | KeyboardEvent) => {
    setSignBox(true)
    toggleTool(e)
    e.preventDefault()
  }

  const cancelSignBox = () => {
    setSignBox(false)
  }

  const insertSign = useCallback(
    (img: HTMLImageElement) => {
      canvas &&
        canvas.add(
          new fabric.Image(img, {
            width: img.width,
            height: img.height,
            top: 0,
            left: 0,
            scaleX: 0.5,
            scaleY: 0.5,
          }),
        )
    },
    [canvas],
  )

  const insertText = useCallback(
    (textBoxMessage: string) => {
      canvas && canvas.add(new fabric.IText(textBoxMessage))
    },
    [canvas],
  )

  const insertDate = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      canvas &&
        canvas &&
        canvas.add(
          new fabric.IText(new Date(+new Date() + 60 * 60 * 8 * 1000).toISOString().split('T')[0]),
        )
      toggleTool(e)
    },
    [canvas, toggleTool],
  )

  const checkCanvasObjects = useCallback(() => {
    const fabricObjects: fabric.Object[] =
      (canvas && (canvas.getObjects() as fabric.Object[])) ?? []
    return fabricObjects.length > 0
  }, [canvas])

  const handleConfirmToast = useCallback(() => {
    setToast(false)
  }, [setToast])

  const mergeModified = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      if (!checkCanvasObjects()) {
        return
      }
      imageUrlsRef.current[pageState.current - 1] =
        (canvas &&
          canvas.toDataURL({
            format: 'png',
            quality: 1,
          })) ??
        ''
      toggleTool(e)
      setMergeCount(mergeCount + 1)
      clearFabricObjects()
    },
    [
      pageState,
      canvas,
      toggleTool,
      setMergeCount,
      mergeCount,
      checkCanvasObjects,
      clearFabricObjects,
    ],
  )

  const downloadFile = async (e: MouseEvent) => {
    try {
      setLoadingState({
        loadingText: '檔案儲存中...',
        isLoading: true,
      })
      mergeModified(e)
      const length = Object.keys(imageUrlsRef.current).length
      const doc = new jsPDF()
      const width = doc.internal.pageSize.width
      const height = doc.internal.pageSize.height
      for (let i = 0; i < length; i++) {
        await new Promise(resolve => {
          const img = document.createElement('img')
          img.onload = () => {
            doc.addPage()
            doc.setPage(i + 2)
            doc.addImage(img, 'png', 0, 0, width, height)
            console.log(imageUrlsRef.current[i])
            resolve(true)
          }
          img.src = imageUrlsRef.current[i]
        })
      }
      if (length > 0) {
        doc.deletePage(1)
      }

      dispatch({
        type: SAVE_TO_HISTORY,
        payload: {
          fileId: uuidv4(),
          filename: draftFile.filename,
          url: doc.output('datauristring'),
          ctime: new Date(+new Date() + 60 * 60 * 8 * 1000),
          mtime: new Date(+new Date() + 60 * 60 * 8 * 1000),
        },
      })
      /** 超鬆散寫 */
      doc.save(`${draftFile.filename}.pdf`.replaceAll(/\.pdf\.pdf/g, '.pdf'))

      navigate('/gnsign/download?status=success', { replace: true })
    } catch (error) {
      navigate('/gnsign/download?status=error', { replace: true })
    }
    setDownloadCount(downloadCount + 1)
    dispatch({ type: MODIFY_DRAFT, payload: '' })
  }

  const finishSignFlow = () => {
    if (mergeCount > 0 && !checkCanvasObjects()) {
      setSave(true)
      return
    }
    setToast(true)
  }

  const goLanding = useCallback(() => {
    navigate('/gnsign', { replace: true })
    dispatch({ type: MODIFY_DRAFT, payload: '' })
  }, [navigate, dispatch])

  const checkDownloadCount = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      e.preventDefault()
      if (downloadCount > 0) {
        goLanding()
        return
      }
      setConfirmForm(true)
    },
    [setConfirmForm, goLanding, downloadCount],
  )

  const cancelConfirmForm = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      e.preventDefault()
      setConfirmForm(false)
    },
    [setConfirmForm],
  )

  const displayTextBox = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      setTextBox(true)
      toggleTool(e)
      e.preventDefault()
    },
    [setTextBox, toggleTool],
  )

  const cancelTextBox = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      e.preventDefault()
      setTextBox(false)
    },
    [setTextBox],
  )

  const toolProps: ToolButtonProps[] = [
    {
      iconName: 'sign',
      buttonText: '簽名',
      handleClick: displaySignBox,
    },
    {
      iconName: 'date',
      buttonText: '日期',
      handleClick: insertDate,
    },
    {
      iconName: 'text',
      buttonText: '插入文字',
      handleClick: displayTextBox,
    },
    {
      iconName: 'check',
      buttonText: '合併修改',
      handleClick: mergeModified,
    },
  ]

  return (
    <>
      <div className={`w-screen h-screen flex flex-wrap justify-center`}>
        {isDesktop ? (
          <img
            alt={`gnsign-logo`}
            className={`absolute w-fit h-fit xl:left-[40px] xl:top-[28px]`}
            src={PC_Logo}
          />
        ) : (
          ''
        )}

        <div
          className={flatClassName({
            common: `relative overflow-auto flex justify-center`,
            mobile: `sm:w-[343px] sm:h-[457px] sm:translate-y-[90px]`,
            tablet: `md:w-[736px] md:h-[814px] md:translate-y-[90px]`,
            desktop: `xl:w-[793px] xl:grow xl:mt-[56px]`,
          })}
        >
          <canvas
            ref={canvasRef}
            className={flatClassName({
              mobile: `sm:w-[343px] sm:h-[457px]`,
              tablet: `md:w-[736px] md:h-[981px]`,
            })}
          ></canvas>
        </div>

        <div
          className={flatClassName({
            common: `absolute w-full flex`,
            mobile: `sm:h-[90px] sm:p-[16px] sm:justify-between`,
            tablet: `md:h-[90px] md:p-[16px] md:justify-between`,
            desktop: `xl:justify-center xl:bottom-0 xl:absolute xl:items-center xl:bg-white xl:h-[92px]`,
          })}
        >
          <div
            className={flatClassName({
              common: `flex justify-between bg-white`,
              mobile: `sm:relative sm:w-[204px] sm:h-[58px] sm:py-[14px] sm:px-[16px] sm:rounded-[16px]`,
              tablet: `md:relative md:w-[560px] md:h-[58px] md:py-[14px] md:px-[16px] md:rounded-[16px]`,
              desktop: `xl:absolute xl:translate-x-[-281px] xl:w-[199px] xl:h-[58px] xl:py-[14px] xl:px-[16px] xl:rounded-[16px] xl:shadow-[0_4px_6px_rgba(0,0,0,0.11)]`,
            })}
          >
            <div
              className={flatClassName({
                common: `bg-gnsign-green flex justify-center items-center`,
                mobile: `sm:w-[30px] sm:h-[30px] sm:rounded-[12px]`,
                tablet: `md:w-[30px] md:h-[30px] md:rounded-[12px]`,
                desktop: `xl:w-[30px] xl:h-[30px] xl:rounded-[12px]`,
              })}
              onClick={goPrevious}
              onKeyDown={goPrevious}
              role="button"
              tabIndex={0}
            >
              <svg
                width="8"
                height="10"
                viewBox="0 0 8 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.16244 4.49911L5.16965 0.491906C5.44661 0.214937 5.89448 0.214937 6.1685 0.491906L6.83441 1.15781C7.11137 1.43478 7.11137 1.88264 6.83441 2.15667L3.99695 5.00002L6.83735 7.84042C7.11432 8.11739 7.11432 8.56525 6.83735 8.83927L6.17145 9.50812C5.89448 9.78509 5.44662 9.78509 5.17259 9.50812L1.16538 5.50092C0.885469 5.22395 0.885469 4.77608 1.16244 4.49911Z"
                  fill="white"
                />
              </svg>
            </div>

            <p
              className={flatClassName({
                common: `font-roboto font-normal text-gnsign-black flex items-center`,
                mobile: `sm:text-[16px] sm:leading-[19px]`,
                tablet: `md:text-[16px] md:leading-[19px]`,
                desktop: `xl:text-[16px] xl:leading-[19px]`,
              })}
            >{`${pageState.current} / ${pageState.maxPage}`}</p>

            <div
              className={flatClassName({
                common: `bg-gnsign-green flex justify-center items-center`,
                mobile: `sm:w-[30px] sm:h-[30px] sm:rounded-[12px]`,
                tablet: `md:w-[30px] md:h-[30px] md:rounded-[12px]`,
                desktop: `xl:w-[30px] xl:h-[30px] xl:rounded-[12px]`,
              })}
              onClick={goNext}
              onKeyDown={goNext}
              role="button"
              tabIndex={0}
            >
              <svg
                width="8"
                height="10"
                viewBox="0 0 8 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.83762 5.50112L2.82847 9.51027C2.55137 9.78737 2.10329 9.78737 1.82913 9.51027L1.16291 8.84404C0.885802 8.56694 0.885802 8.11886 1.16291 7.8447L4.00468 5.00293L1.16291 2.16115C0.885802 1.88405 0.885802 1.43596 1.16291 1.16181L1.82618 0.489687C2.10329 0.212585 2.55137 0.212585 2.82552 0.489687L6.83467 4.49883C7.11472 4.77594 7.11472 5.22402 6.83762 5.50112Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          {isDesktop ? (
            <div
              className={flatClassName({
                common: `flex justify-between bg-white`,
                mobile: `sm:relative sm:w-[204px] sm:h-[58px] sm:py-[14px] sm:px-[16px] sm:rounded-[16px]`,
                tablet: `md:relative md:w-[560px] md:h-[58px] md:py-[14px] md:px-[16px] md:rounded-[16px]`,
                desktop: `xl:absolute xl:translate-x-[-72px] xl:w-[199px] xl:h-[58px] xl:py-[14px] xl:px-[16px] xl:rounded-[16px] xl:shadow-[0_4px_6px_rgba(0,0,0,0.11)]`,
              })}
            >
              <div
                className={flatClassName({
                  common: `flex justify-center items-center`,
                  desktop: `xl:w-[27px] xl:h-[27px]`,
                })}
                onClick={scaleMore}
                onKeyDown={scaleMore}
                role="button"
                tabIndex={0}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.3582 2.99036C19.2703 2.99036 23.2524 6.97245 23.2524 11.8846C23.2524 16.7968 19.2703 20.7789 14.3582 20.7789C11.955 20.7789 9.77444 19.8258 8.17385 18.277C8.14491 18.238 8.11276 18.2007 8.07741 18.1653C8.04206 18.13 8.00473 18.0978 7.96577 18.0689C6.41699 16.4683 5.46392 14.2878 5.46392 11.8846C5.46392 6.97245 9.44601 2.99036 14.3582 2.99036ZM5.97996 18.8486C4.40886 16.9605 3.46392 14.5329 3.46392 11.8846C3.46392 5.86788 8.34145 0.990356 14.3582 0.990356C20.3749 0.990356 25.2524 5.86788 25.2524 11.8846C25.2524 17.9014 20.3749 22.7789 14.3582 22.7789C11.7099 22.7789 9.28227 21.8339 7.39417 20.2628L2.6974 24.9595C2.30688 25.3501 1.67371 25.3501 1.28319 24.9595C0.892666 24.569 0.892666 23.9359 1.28319 23.5453L5.97996 18.8486ZM19.0684 11.8846C19.0684 12.4369 18.6207 12.8846 18.0684 12.8846H15.3584V15.5949C15.3584 16.1472 14.9107 16.5949 14.3584 16.5949C13.8061 16.5949 13.3584 16.1472 13.3584 15.5949V12.8846H10.6477C10.0954 12.8846 9.64768 12.4369 9.64768 11.8846C9.64768 11.3323 10.0954 10.8846 10.6477 10.8846H13.3584V8.17425C13.3584 7.62197 13.8061 7.17425 14.3584 7.17425C14.9107 7.17425 15.3584 7.62197 15.3584 8.17425V10.8846H18.0684C18.6207 10.8846 19.0684 11.3323 19.0684 11.8846Z"
                    fill="#1C8B6A"
                  />
                </svg>
              </div>

              <p
                className={flatClassName({
                  common: `font-roboto font-normal text-gnsign-black flex items-center`,
                  desktop: `xl:text-[16px] xl:leading-[19px]`,
                })}
              >{`${Math.round(scaleState * 100)} %`}</p>

              <div
                className={flatClassName({
                  common: `flex justify-center items-center`,
                  desktop: `xl:w-[27px] xl:h-[27px]`,
                })}
                onClick={scaleLess}
                onKeyDown={scaleLess}
                role="button"
                tabIndex={0}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.883 2.98853C6.97086 2.98853 2.98877 6.97062 2.98877 11.8828C2.98877 16.7949 6.97086 20.777 11.883 20.777C14.2861 20.777 16.4666 19.824 18.0672 18.2753C18.0962 18.2363 18.1283 18.1989 18.1637 18.1635C18.1991 18.1281 18.2365 18.0959 18.2755 18.067C19.8242 16.4664 20.7773 14.2859 20.7773 11.8828C20.7773 6.97062 16.7952 2.98853 11.883 2.98853ZM11.883 22.777C14.5313 22.777 16.9589 21.8321 18.847 20.261L23.5437 24.9577C23.9343 25.3482 24.5674 25.3482 24.9579 24.9577C25.3485 24.5672 25.3485 23.934 24.9579 23.5435L20.2612 18.8468C21.8323 16.9587 22.7773 14.5311 22.7773 11.8828C22.7773 5.86605 17.8998 0.988525 11.883 0.988525C5.86629 0.988525 0.98877 5.86605 0.98877 11.8828C0.98877 17.8995 5.86629 22.777 11.883 22.777ZM8.17267 10.8825C7.62038 10.8825 7.17267 11.3302 7.17267 11.8825C7.17267 12.4348 7.62038 12.8825 8.17267 12.8825H15.5934C16.1456 12.8825 16.5934 12.4348 16.5934 11.8825C16.5934 11.3302 16.1456 10.8825 15.5934 10.8825H8.17267Z"
                    fill="#1C8B6A"
                  />
                </svg>
              </div>
            </div>
          ) : (
            ''
          )}

          {showSave ? (
            <div
              onClick={checkDownloadCount}
              onKeyDown={checkDownloadCount}
              role="button"
              tabIndex={0}
              className={flatClassName({
                common: `font-sans font-normal flex items-center justify-center text-gnsign-green bg-white`,
                mobile: `sm:w-[130px] sm:h-[58px] sm:text-[18px] sm:leading-[26px] sm:rounded-[16px]`,
                tablet: `md:w-[167px] md:h-[58px] md:text-[18px] md:leading-[26px] md:rounded-[16px]`,
                desktop: `xl:absolute xl:translate-x-[508.5px] xl:w-[183px] xl:h-[56px] xl:text-[18px] xl:leading-[26px] xl:rounded-[16px]`,
              })}
            >
              回首頁
            </div>
          ) : (
            <div
              onClick={finishSignFlow}
              onKeyDown={finishSignFlow}
              role="button"
              tabIndex={0}
              className={flatClassName({
                common: `font-sans font-normal flex items-center justify-center bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh text-white`,
                mobile: `sm:w-[130px] sm:h-[58px] sm:text-[18px] sm:leading-[26px] sm:rounded-[16px]`,
                tablet: `md:w-[167px] md:h-[58px] md:text-[18px] md:leading-[26px] md:rounded-[16px]`,
                desktop: `xl:absolute xl:translate-x-[508.5px] xl:w-[183px] xl:h-[56px] xl:text-[18px] xl:leading-[26px] xl:rounded-[16px]`,
              })}
            >
              完成簽署
            </div>
          )}
        </div>

        <div
          className={flatClassName({
            common: `absolute  flex items-center justify-center bottom-0`,
            mobile: `sm:h-[120px]`,
            tablet: `md:h-[120px]`,
            desktop: `xl:h-[92px] xl:translate-x-[210px]`,
          })}
        >
          {showSave ? (
            <button
              onClick={downloadFile}
              className={flatClassName({
                common: `text-white font-sans font-normal  flex items-center justify-center bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh`,
                mobile: `sm:text-[18px] sm:leading-[26px] sm:w-[260px] sm:h-[56px] sm:rounded-[16px]`,
                tablet: `md:text-[18px] md:leading-[26px] md:w-[260px] md:h-[56px] md:rounded-[16px]`,
                desktop: `xl:translate-x-[105.5px] xl:text-[18px] xl:leading-[26px] xl:w-[183px] xl:h-[56px] xl:rounded-[16px]`,
              })}
            >
              儲存
            </button>
          ) : (
            <div
              className={flatClassName({
                common: `flex items-center justify-center bg-white`,
                mobile: `sm:w-[343px] sm:h-[72px] sm:gap-x-[8px] sm:rounded-[16px]`,
                tablet: `md:w-[736px] md:h-[72px] md:gap-x-[8px] md:rounded-[16px]`,
                desktop: `xl:w-[343px] xl:h-[72px] xl:gap-x-[8px] xl:rounded-[16px]`,
              })}
            >
              {toolProps.map((props, index) => (
                <ToolButton
                  dataToolIndex={`${index + 1}`}
                  key={`tool-${index}`}
                  {...props}
                  {...getToolActiveClassName(index + 1)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className={flatClassName({
          common: `w-screen h-screen fixed inset-0 flex items-center justify-center bg-gnsign-black/[.54] ${
            showSignBox || showTextBox || showConfirmForm || showToast ? '' : 'hidden'
          }`,
        })}
      >
        <Suspense fallback={<p className={`hidden`}></p>}>
          {showSignBox ? <SignBox insertSign={insertSign} cancelSignBox={cancelSignBox} /> : ''}
          {showTextBox ? <TextBox handleInsert={insertText} handleCancel={cancelTextBox} /> : ''}
          {showConfirmForm ? (
            <ConfirmForm
              messageText={`尚未儲存文件，確定要離開？`}
              rightButtonText={`確定`}
              handleRightButton={goLanding}
              leftButtonText={`取消`}
              handleLeftButton={cancelConfirmForm}
            />
          ) : (
            ''
          )}
          {showToast ? (
            <Toast
              messageText={'請置入簽名後再完成簽署'}
              buttonText={`確定`}
              onConfirm={handleConfirmToast}
            ></Toast>
          ) : (
            ''
          )}
        </Suspense>
      </div>
      <GNsignLoadingPage isLoading={loadingState.isLoading} text={loadingState.loadingText} />
    </>
  )
}

export default SignDocument
