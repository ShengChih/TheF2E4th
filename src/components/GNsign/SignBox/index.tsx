import React, {
  memo,
  useEffect,
  useState,
  useCallback,
  useRef,
  MouseEvent,
  FocusEvent,
  KeyboardEvent,
} from 'react'
import { flatClassName } from '@/utils/reduce'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { SAVE_SIGN_BOX } from '@/features/gnsign/signs/sagaActions'
import { selectSignBox } from '@/features/gnsign/signs/selector'

import { deviceWidth } from '@/utils/config'
import useCheckScreen from '@/hooks/useCheckScreen'
import MakeSignModule from '@/modules/GNsign/MakeSignModule'

type ImageUrls = {
  [key: string]: HTMLImageElement
}

type SignBoxProps = {
  insertSign: (img: HTMLImageElement) => void
  cancelSignBox: () => void
}

const SignBox = ({ insertSign, cancelSignBox }: SignBoxProps) => {
  const dispatch = useAppDispatch()
  const signBox = useAppSelector(selectSignBox)
  const [, , , isDesktop] = useCheckScreen(deviceWidth)

  const boxRef = useRef<HTMLDivElement>(null)
  const imageUrls = useRef<ImageUrls>({})
  const [showMakeSignModule, setMakeSignModule] = useState<boolean>(false)

  const [canvasWidth, canvasHeight] = isDesktop ? [590, 200] : [326, 200]

  useEffect(() => {
    ;(async () => {
      await Promise.all(
        signBox.map(async (dataUrl: string, index: number) => {
          if (Object.hasOwnProperty.call(imageUrls.current, dataUrl)) {
            return true
          }

          return new Promise(resolve => {
            const img = document.createElement('img')
            img.onload = () => {
              imageUrls.current[index] = img
              resolve(true)
            }
            img.onerror = () => {
              resolve(false)
            }
            img.src = dataUrl
          })
        }),
      )
      setMakeSignModule(false)
    })()
    boxRef.current && boxRef.current.focus()
  }, [signBox, setMakeSignModule])

  const handleBlur = showMakeSignModule
    ? undefined
    : (e: FocusEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          cancelSignBox()
        }
      }

  const getHandleDeleteSign = (signIndex: number) => {
    return () => {
      const newSignBox = [...signBox.slice(0, signIndex), ...signBox.slice(signIndex + 1)]
      dispatch({
        type: SAVE_SIGN_BOX,
        payload: newSignBox,
      })
    }
  }

  const back2SignBox = useCallback(() => {
    setMakeSignModule(false)
  }, [setMakeSignModule])

  const switch2MakeSignModule = () => {
    setMakeSignModule(true)
  }

  const handleInsertSign = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      const imageIndex = e.currentTarget
        ? parseInt(e.currentTarget.getAttribute('data-sign') ?? '-1')
        : '-1'
      if (imageIndex >= 0) {
        insertSign(imageUrls.current[imageIndex])
        cancelSignBox()
      }
    },
    [imageUrls, insertSign, cancelSignBox],
  )

  return (
    <div
      role="grid"
      tabIndex={0}
      ref={boxRef}
      onBlur={handleBlur}
      className={flatClassName({
        common: `relative h-max flex flex-col items-center bg-gnsign-background rounded-[26px]`,
        mobile: `sm:w-[343px] sm:p-[16px] sm:gap-y-[12px]`,
        tablet: `md:w-[343px] md:p-[16px] md:gap-y-[12px]`,
        desktop: `${
          showMakeSignModule ? 'xl:w-[610px]' : 'xl:w-[343px]'
        }  xl:p-[16px] xl:gap-y-[12px]`,
      })}
    >
      {!showMakeSignModule && (
        <>
          <p
            className={flatClassName({
              common: `font-sans text-gnsign-green w-full text-center`,
              mobile: `sm:text-[18px] sm:leading-[26px]`,
              tablet: `md:text-[18px] md:leading-[26px]`,
              desktop: `xl:text-[18px] xl:leading-[26px]`,
            })}
          >
            請選擇簽名
          </p>
          <div
            className={flatClassName({
              common: `flex flex-col`,
              mobile: `sm:gap-y-[12px] sm:w-[311px]`,
              tablet: `md:gap-y-[12px] md:w-[311px]`,
              desktop: `xl:gap-y-[12px] xl:w-[311px]`,
            })}
          >
            {signBox.map((dataUrl: string, index: number) => {
              return (
                <div
                  key={`sign-record-${index}`}
                  className={flatClassName({
                    common: `flex flex-no-wrap items-center w-full`,
                    mobile: `sm:gap-x-[16px]`,
                    tablet: `md:gap-x-[16px]`,
                    desktop: `xl:gap-x-[16px]`,
                  })}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={handleInsertSign}
                    onClick={handleInsertSign}
                    data-sign={`${index}`}
                    key={`sign-img-${index}`}
                  >
                    <img
                      alt={'custom-sign'}
                      className={flatClassName({
                        common: `object-contain bg-white`,
                        mobile: `sm:w-[271px] sm:h-[61px] sm:rounded-[16px]`,
                        tablet: `md:w-[271px] md:h-[61px] md:rounded-[16px]`,
                        desktop: `xl:w-[271px] xl:h-[61px] xl:rounded-[16px]`,
                      })}
                      src={dataUrl}
                    />
                  </div>
                  <div
                    key={`trash-icon-${index}`}
                    className={flatClassName({
                      mobile: `sm:w-[24px] sm:h-[24px]`,
                      tablet: `md:w-[24px] md:h-[24px]`,
                      desktop: `xl:w-[24px] xl:h-[24px]`,
                    })}
                    role="button"
                    tabIndex={0}
                    onKeyDown={getHandleDeleteSign(index)}
                    onClick={getHandleDeleteSign(index)}
                  >
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.29289 3.79289C9.48043 3.60536 9.73478 3.5 10 3.5H14C14.2652 3.5 14.5196 3.60536 14.7071 3.79289C14.8946 3.98043 15 4.23478 15 4.5V5.5H9V4.5C9 4.23478 9.10536 3.98043 9.29289 3.79289ZM7 5.5V4.5C7 3.70435 7.31607 2.94129 7.87868 2.37868C8.44129 1.81607 9.20435 1.5 10 1.5H14C14.7956 1.5 15.5587 1.81607 16.1213 2.37868C16.6839 2.94129 17 3.70435 17 4.5V5.5H19H21C21.5523 5.5 22 5.94772 22 6.5C22 7.05228 21.5523 7.5 21 7.5H20V20.5C20 21.2957 19.6839 22.0587 19.1213 22.6213C18.5587 23.1839 17.7957 23.5 17 23.5H7C6.20435 23.5 5.44129 23.1839 4.87868 22.6213C4.31607 22.0587 4 21.2957 4 20.5V7.5H3C2.44772 7.5 2 7.05228 2 6.5C2 5.94772 2.44772 5.5 3 5.5H5H7ZM8 7.5H16H18V20.5C18 20.7652 17.8946 21.0196 17.7071 21.2071C17.5196 21.3946 17.2652 21.5 17 21.5H7C6.73478 21.5 6.48043 21.3946 6.29289 21.2071C6.10536 21.0196 6 20.7652 6 20.5V7.5H8ZM10 10.5C10.5523 10.5 11 10.9477 11 11.5V17.5C11 18.0523 10.5523 18.5 10 18.5C9.44772 18.5 9 18.0523 9 17.5V11.5C9 10.9477 9.44772 10.5 10 10.5ZM15 17.5V11.5C15 10.9477 14.5523 10.5 14 10.5C13.4477 10.5 13 10.9477 13 11.5V17.5C13 18.0523 13.4477 18.5 14 18.5C14.5523 18.5 15 18.0523 15 17.5Z"
                        fill="#1C8B6A"
                      />
                    </svg>
                  </div>
                </div>
              )
            })}
          </div>
          <div
            role="button"
            tabIndex={0}
            onKeyDown={switch2MakeSignModule}
            onClick={switch2MakeSignModule}
            className={flatClassName({
              common: `font-sans font-normal text-gnsign-green w-full`,
              mobile: `sm:text-[16px] sm:leading-[23px] `,
              tablet: `md:text-[16px] md:leading-[23px] `,
              desktop: `xl:text-[16px] xl:leading-[23px] `,
            })}
          >
            + 新增簽名
          </div>
        </>
      )}
      {showMakeSignModule && (
        <MakeSignModule
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          isPageContent={false}
          backToPrevView={back2SignBox}
        />
      )}
    </div>
  )
}

export default memo(SignBox)
