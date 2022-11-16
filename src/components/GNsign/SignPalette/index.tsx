import { memo, MouseEvent } from 'react'
import { flatClassName } from "@utils/reduce"

type SignPaletteProps = {
	changeColor: (e: MouseEvent) => void
	defaultColor: string
}

const SignPalette = ({
	changeColor,
	defaultColor
}: SignPaletteProps) => (
	<div className={flatClassName({
		common: `absolute flex flex-no-wrap items-center justify-between`,
		mobile: `sm:w-[150px] sm:h-[34px] sm:translate-y-[121px]`
	})}>

		<div
			data-color="black"
			onClick={changeColor}
			className={flatClassName({
				common: `${defaultColor === 'black' ? 'bg-white border-black':''} rounded-full flex items-center justify-center`,
				mobile: `sm:w-[45px] sm:h-[45px]`
			})}>
			<div className={flatClassName({
				common: `bg-black rounded-full`,
				mobile: `sm:w-[35px] sm:h-[35px] `
			})}></div>
		</div>

		<div
			data-color="#0014C7"
			onClick={changeColor}
			className={flatClassName({
				common: `${defaultColor === '#0014C7' ? 'bg-white border-[#0014C7]':''} rounded-full flex items-center justify-center`,
				mobile: `sm:w-[45px] sm:h-[45px]`
			})}>
			<div className={flatClassName({
				common: `bg-[#0014C7] rounded-full`,
				mobile: `sm:w-[35px] sm:h-[35px] `
			})}></div>
		</div>

		<div
			data-color="#CA0000"
			onClick={changeColor}
			className={flatClassName({
				common: `${defaultColor === '#CA0000' ? 'bg-white border-[#CA0000]':''} rounded-full flex items-center justify-center`,
				mobile: `sm:w-[45px] sm:h-[45px]`
			})}
		>
			<div className={flatClassName({
				common: `bg-[#CA0000] rounded-full`,
				mobile: `sm:w-[35px] sm:h-[35px] `
			})}></div>
		</div>
	</div>
)

export default memo(SignPalette)