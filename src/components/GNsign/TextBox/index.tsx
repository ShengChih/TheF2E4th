import { memo, useRef, MouseEvent, ChangeEvent, useCallback } from 'react'
import { flatClassName } from '@utils/reduce'

type TextBoxProps = {
	handleInsert: (textBoxMessage: string) => void
	handleCancel: (e: MouseEvent) => void
}

const TextBox = ({
	handleInsert,
	handleCancel
}: TextBoxProps) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null)

	const hanldeInsertTextBox = (e: MouseEvent) => {
		if (textAreaRef.current) {
			handleInsert(textAreaRef.current.value)
			textAreaRef.current.value = ''
		}
		handleCancel(e)
		e.preventDefault()
	}

	return (
		<div className={flatClassName({
			common: `flex flex-col items-center bg-gnsign-background rounded-[26px]`,
			mobile: `sm:w-[343px] sm:h-[204px] sm:py-[24px] sm:gap-y-[26px]`,
			tablet: `md:w-[343px] md:h-[204px] md:py-[24px] md:gap-y-[26px]`,
			desktop: `xl:w-[343px] xl:h-[204px] xl:py-[24px] xl:gap-y-[26px]`
		})}>
			<textarea
				placeholder={`輸入文字`}
				className={flatClassName({
					common: `font-sans font-normal text-black`,
					mobile: `sm:w-[284px] sm:h-[84px] sm:rounded-[16px] sm:text-[14px] sm:leading-[21px] sm:pt-[10px] sm:pl-[16px]`,
					tablet: `md:w-[284px] md:h-[84px] md:rounded-[16px] md:text-[14px] md:leading-[21px] md:pt-[10px] md:pl-[16px]`,
					desktop: `xl:w-[284px] xl:h-[84px] xl:rounded-[16px] xl:text-[14px] xl:leading-[21px] xl:pt-[10px] xl:pl-[16px]`
				})}
				ref={textAreaRef}
			/>
			<div className={flatClassName({
				common: `flex flex-no-wrap`,
				mobile: `sm:gap-x-[12px]`,
				tablet: `md:gap-x-[12px]`,
				desktop: `xl:gap-x-[12px]`,
			})}>
				<div
					onClick={handleCancel}
					className={flatClassName({
						common: `flex items-center justify-center bg-white border-gnsign-green rounded-[16px] font-sans text-gnsign-green`,
						mobile: `sm:text-[18px] sm:leading-[26px] sm:w-[136px] sm:h-[56px]`,
						tablet: `md:text-[18px] md:leading-[26px] md:w-[136px] md:h-[56px]`,
						desktop: `xl:text-[18px] xl:leading-[26px] xl:w-[136px] xl:h-[56px]`,
				})}>取消</div>
				<div
					className={flatClassName({
						common: `flex items-center justify-center bg-gnsign-green rounded-[16px] font-sans text-white`,
						mobile: `sm:text-[18px] sm:leading-[26px] sm:w-[136px] sm:h-[56px]`,
						tablet: `md:text-[18px] md:leading-[26px] md:w-[136px] md:h-[56px]`,
						desktop: `xl:text-[18px] xl:leading-[26px] xl:w-[136px] xl:h-[56px]`,
					})}
					onClick={hanldeInsertTextBox}
				>使用</div>
			</div>
		</div>
	)
}

export default memo(TextBox)