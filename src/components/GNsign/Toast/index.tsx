import { memo } from 'react'
import { flatClassName } from '@utils/reduce'
import { ToastProps } from './type.d'

export * from './type.d'

const Toast = ({
	toastClassName,
	messageText,
	onConfirm,
	buttonText,
}: ToastProps) => {
	return (
		<div className={flatClassName({
			common: `flex flex-col items-center bg-white rounded-[26px] ${toastClassName}`,
			mobile: `sm:w-[343px] sm:h-[156px] sm:py-[23px] sm:gap-y-[28px] `
		})}>
			<p className={flatClassName({
				common: `font-sans font-normal text-gnsign-black text-center`,
				mobile: `sm:text-[18px] sm:leading-[26px]`
			})}>{messageText}</p>
			<div
				className={flatClassName({
					common: `flex items-center justify-center bg-gnsign-green rounded-[16px] font-sans text-white`,
					mobile: `sm:text-[18px] sm:leading-[26px] sm:w-[229px] sm:h-[56px]`
				})}
				onClick={onConfirm}>{buttonText}</div>
		</div>
	)
}

export default memo(Toast)