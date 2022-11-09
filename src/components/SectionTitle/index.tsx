import React from 'react'

type SectionTitleProps = {
	className?: string
	title: string
}

const SectionTitle = ({
	className,
	title
}: SectionTitleProps) => {
	return (
		<div className={`flex justify-center bg-[#3C221B] font-serif font-black text-white xl:text-[60px] xl:leading-[86px] ${className}`}>{title}</div>
	)
}

export default React.memo(SectionTitle)