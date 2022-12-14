import React, { memo, MouseEvent, KeyboardEvent } from 'react'
import { flatClassName } from '@/utils/reduce'

type ConfirmFormProps = {
  messageText: string
  rightButtonText: string
  handleRightButton: () => void
  leftButtonText: string
  handleLeftButton: (e: MouseEvent | KeyboardEvent) => void
}

const ConfirmForm = ({
  messageText,
  rightButtonText,
  handleRightButton,
  leftButtonText,
  handleLeftButton,
}: ConfirmFormProps) => {
  return (
    <div
      className={flatClassName({
        common: `flex flex-col items-center bg-gnsign-background rounded-[26px]`,
        mobile: `sm:w-[343px] sm:h-[156px] sm:py-[23px] sm:gap-y-[28px] `,
        tablet: `md:w-[343px] md:h-[156px] md:py-[23px] md:gap-y-[28px] `,
        desktop: `xl:w-[343px] xl:h-[156px] xl:py-[23px] xl:gap-y-[28px] `,
      })}
    >
      <p
        className={flatClassName({
          common: `font-sans font-normal text-gnsign-black text-center`,
          mobile: `sm:text-[18px] sm:leading-[26px]`,
          tablet: `md:text-[18px] md:leading-[26px]`,
          desktop: `xl:text-[18px] xl:leading-[26px]`,
        })}
      >
        {messageText}
      </p>
      <div
        className={flatClassName({
          common: `flex flex-no-wrap`,
          mobile: `sm:gap-x-[12px]`,
          tablet: `md:gap-x-[12px]`,
          desktop: `xl:gap-x-[12px]`,
        })}
      >
        <div
          role="button"
          tabIndex={0}
          onKeyDown={handleLeftButton}
          onClick={handleLeftButton}
          className={flatClassName({
            common: `flex items-center justify-center bg-white border-gnsign-green rounded-[16px] font-sans text-gnsign-green`,
            mobile: `sm:text-[18px] sm:leading-[26px] sm:w-[136px] sm:h-[56px]`,
            tablet: `md:text-[18px] md:leading-[26px] md:w-[136px] md:h-[56px]`,
            desktop: `xl:text-[18px] xl:leading-[26px] xl:w-[136px] xl:h-[56px]`,
          })}
        >
          {leftButtonText}
        </div>
        <div
          className={flatClassName({
            common: `flex items-center justify-center bg-gnsign-green rounded-[16px] font-sans text-white`,
            mobile: `sm:text-[18px] sm:leading-[26px] sm:w-[136px] sm:h-[56px]`,
            tablet: `md:text-[18px] md:leading-[26px] md:w-[136px] md:h-[56px]`,
            desktop: `xl:text-[18px] xl:leading-[26px] xl:w-[136px] xl:h-[56px]`,
          })}
          onClick={handleRightButton}
          onKeyDown={handleRightButton}
          tabIndex={0}
          role="button"
        >
          {rightButtonText}
        </div>
      </div>
    </div>
  )
}

export default memo(ConfirmForm)
