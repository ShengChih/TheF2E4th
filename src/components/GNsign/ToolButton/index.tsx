import React, { MouseEvent, memo } from 'react'
import { flatClassName } from '@/utils/reduce'

export type IconProps = {
  className?: string
}
export type IconName = 'sign' | 'check' | 'date' | 'text'
export type ToolButtonProps = {
  dataToolIndex?: string
  iconContainerClassName?: string
  iconName: IconName
  iconClassName?: string
  buttonText: string
  buttonClassName?: string
  handleClick?: (e: MouseEvent) => void
}

const SignIcon = ({ className }: IconProps) => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      className={`${className}`}
      d="M17.9337 16.8395C18.5217 16.8395 19 17.3241 19 17.9198C19 18.5166 18.5217 19 17.9337 19H11.9063C11.3183 19 10.84 18.5166 10.84 17.9198C10.84 17.3241 11.3183 16.8395 11.9063 16.8395H17.9337ZM13.7537 0.737901L15.3107 1.97472C15.9492 2.47398 16.3748 3.1321 16.5204 3.82427C16.6884 4.58565 16.5092 5.33341 16.0052 5.98019L6.73064 17.9739C6.305 18.5186 5.67774 18.8249 5.00567 18.8363L1.30931 18.8817C1.10769 18.8817 0.939669 18.7455 0.894865 18.5526L0.0547817 14.9102C-0.0908327 14.2408 0.0547817 13.5486 0.480424 13.0153L7.05547 4.50508C7.16749 4.36892 7.36911 4.34736 7.50352 4.44835L10.2702 6.64965C10.4494 6.79716 10.6958 6.87659 10.9535 6.84255C11.5023 6.77447 11.872 6.27521 11.8159 5.7419C11.7823 5.46957 11.6479 5.24263 11.4687 5.07243C11.4127 5.02704 8.78045 2.91651 8.78045 2.91651C8.61243 2.78035 8.57883 2.53072 8.71324 2.36165L9.75494 1.01023C10.7182 -0.226589 12.3984 -0.340058 13.7537 0.737901Z"
      fill="#B7B7B7"
    />
  </svg>
)

const CheckIcon = ({ className }: IconProps) => (
  <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      className={`${className}`}
      d="M6.99409 14.3627C6.52084 14.3627 6.04759 14.1832 5.68631 13.8219L0.672777 8.80835C-0.0497799 8.08579 -0.0497799 6.91534 0.672777 6.19489C1.39533 5.47234 2.56368 5.47022 3.28624 6.19278L6.99409 9.90064L15.7155 1.17925C16.438 0.45669 17.6064 0.45669 18.3289 1.17925C19.0515 1.9018 19.0515 3.07226 18.3289 3.79482L8.30188 13.8219C7.9406 14.1832 7.46735 14.3627 6.99409 14.3627Z"
      fill="#B7B7B7"
    />
  </svg>
)

const DateIcon = ({ className }: IconProps) => (
  <svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      className={`${className}`}
      d="M13.3524 0.94446C13.8006 0.943408 14.1549 1.29157 14.1559 1.75578L14.157 2.54705C17.0647 2.77493 18.9854 4.75628 18.9885 7.79475L19 16.6886C19.0042 20.0014 16.9229 22.0397 13.5869 22.045L5.43811 22.0556C2.12293 22.0598 0.0156467 19.9729 0.011478 16.6507L6.99559e-06 7.86122C-0.0041547 4.8027 1.84884 2.82663 4.75652 2.55971L4.75548 1.76844C4.75444 1.30423 5.09836 0.955013 5.55692 0.955013C6.01547 0.953958 6.35939 1.30212 6.36044 1.76633L6.36148 2.50485L12.552 2.49641L12.551 1.75789C12.5499 1.29368 12.8939 0.945518 13.3524 0.94446ZM13.7776 15.9248H13.7672C13.2878 15.9364 12.9032 16.3384 12.9137 16.8237C12.9147 17.309 13.3014 17.7088 13.7808 17.7194C14.2695 17.7183 14.6656 17.3164 14.6645 16.8205C14.6645 16.3246 14.2675 15.9248 13.7776 15.9248ZM5.19007 15.9258C4.71067 15.9469 4.33548 16.3489 4.33652 16.8342C4.35841 17.3195 4.75444 17.6993 5.23384 17.6772C5.70386 17.6561 6.078 17.2541 6.05612 16.7688C6.0457 16.2941 5.65905 15.9248 5.19007 15.9258ZM9.48385 15.9206C9.00445 15.9427 8.6303 16.3436 8.6303 16.8289C8.65219 17.3143 9.04822 17.693 9.52762 17.6719C9.9966 17.6498 10.3718 17.2489 10.3499 16.7625C10.3395 16.2888 9.95283 15.9195 9.48385 15.9206ZM5.18486 12.1277C4.70545 12.1489 4.33131 12.5508 4.33235 13.0361C4.3532 13.5214 4.75027 13.9012 5.22967 13.8791C5.69865 13.858 6.07279 13.456 6.05091 12.9707C6.04049 12.496 5.65488 12.1267 5.18486 12.1277ZM9.47968 12.0908C9.00028 12.1119 8.62509 12.5139 8.62613 12.9992C8.64698 13.4845 9.04405 13.8633 9.52345 13.8422C9.99243 13.82 10.3666 13.4191 10.3457 12.9338C10.3343 12.459 9.94866 12.0898 9.47968 12.0908ZM13.7735 12.0961C13.2941 12.1066 12.9189 12.497 12.9199 12.9823V12.9939C12.9303 13.4792 13.3264 13.8474 13.8068 13.8369C14.2758 13.8253 14.6499 13.4233 14.6395 12.938C14.6176 12.4738 14.2414 12.095 13.7735 12.0961ZM12.5541 4.12115L6.36356 4.12959L6.3646 4.98311C6.3646 5.43782 6.02173 5.79653 5.56317 5.79653C5.10461 5.79759 4.75965 5.43993 4.75965 4.98522L4.75861 4.17285C2.72636 4.37647 1.60184 5.57076 1.60496 7.85911L1.60601 8.18722L17.3846 8.16612V7.79686C17.3398 5.52856 16.2017 4.33848 14.1591 4.16124L14.1601 4.97361C14.1601 5.42727 13.8068 5.78704 13.3587 5.78704C12.9001 5.78809 12.5552 5.42938 12.5552 4.97572L12.5541 4.12115Z"
      fill="#B7B7B7"
    />
  </svg>
)

const TextIcon = ({ className }: IconProps) => (
  <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      className={`${className}`}
      d="M5.72684 18.6539V3.44263H0.5V0.346191H14.5V3.44263H9.28393V18.6516H5.72684V18.6539Z"
      fill="#B7B7B7"
    />
  </svg>
)

const getIconByName = (name: IconName) => {
  let iconElement = null
  switch (name) {
    case 'sign':
      iconElement = SignIcon
      break
    case 'check':
      iconElement = CheckIcon
      break
    case 'date':
      iconElement = DateIcon
      break
    case 'text':
      iconElement = TextIcon
      break
  }
  return iconElement
}

const ToolButton = ({
  dataToolIndex,
  iconContainerClassName,
  iconName,
  iconClassName,
  buttonText,
  buttonClassName,
  handleClick,
}: ToolButtonProps) => {
  const Icon = getIconByName(iconName)

  return (
    <div
      data-tool={dataToolIndex}
      onClick={handleClick}
      className={flatClassName({
        common: `flex flex-col items-center justify-center `,
        mobile: `sm:w-[56px] sm:h-[59px]`,
        tablet: `md:w-[56px] md:h-[59px]`,
        desktop: `xl:w-[56px] xl:h-[59px]`,
      })}
    >
      <div
        className={flatClassName({
          common: `rounded-[9px] flex items-center justify-center ${iconContainerClassName}`,
          mobile: `sm:w-[40px] sm:h-[40px]`,
          tablet: `md:w-[40px] md:h-[40px]`,
          desktop: `xl:w-[40px] xl:h-[40px]`,
        })}
      >
        <Icon className={iconClassName} />
      </div>
      <div
        className={flatClassName({
          common: `w-full font-sans font-nomal text-center ${buttonClassName}`,
          mobile: `sm:h-[17px] sm:text-[12px] sm:leading-[17px]`,
          tablet: `md:h-[17px] md:text-[12px] md:leading-[17px]`,
          desktop: `xl:h-[17px] xl:text-[12px] xl:leading-[17px]`,
        })}
      >
        {buttonText}
      </div>
    </div>
  )
}

export default memo(ToolButton)
