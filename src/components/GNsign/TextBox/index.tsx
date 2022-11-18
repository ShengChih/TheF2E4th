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
			mobile: `sm:w-[343px] sm:h-[204px] sm:py-[24px] sm:gap-y-[26px] `
		})}>
			<textarea
				placeholder={`輸入文字`}
				className={flatClassName({
					common: `font-sans font-normal text-black`,
					mobile: `sm:w-[284px] sm:h-[84px] sm:rounded-[16px] sm:text-[14px] sm:leading-[21px] sm:pt-[10px] sm:pl-[16px]`
				})}
				ref={textAreaRef}
			/>
			<div className={flatClassName({
				common: `flex flex-no-wrap`,
				mobile: `sm:gap-x-[12px]`
			})}>
				<div
					onClick={handleCancel}
					className={flatClassName({
					common: `flex items-center justify-center bg-white border-gnsign-green rounded-[16px] font-sans text-gnsign-green`,
					mobile: `sm:text-[18px] sm:leading-[26px] sm:w-[136px] sm:h-[56px]`
				})}>取消</div>
				<div
					className={flatClassName({
						common: `flex items-center justify-center bg-gnsign-green rounded-[16px] font-sans text-white`,
						mobile: `sm:text-[18px] sm:leading-[26px] sm:w-[136px] sm:h-[56px]`
					})}
					onClick={hanldeInsertTextBox}
				>使用</div>
			</div>
		</div>
	)
}

export default memo(TextBox)