import React from 'react'
import { flatClassName } from '@utils/reduce'
import useCheckScreen from '@hooks/useCheckScreen'
import { deviceWidth } from '@utils/config'

type SectionTitleProps = {
	className?: string
	title: string
}

const SectionTitle = ({
	className,
	title
}: SectionTitleProps) => {
	return (
		<div className={flatClassName({
			common: `flex justify-center bg-[#3C221B] font-serif font-black text-white ${className}`,
			desktop: `xl:text-[60px] xl:leading-[86px]`,
			tablet: `md:text-[40px] md:leading-[57px]`,
			mobile: ``
		})}>{title}</div>
	)
}

export default React.memo(SectionTitle)