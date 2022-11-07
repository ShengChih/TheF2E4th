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
		<div className={`flex justify-center bg-[#3C221B] font-serif font-black text-white desktop:text-[60px] desktop:leading-[86px] ${className}`}>{title}</div>
	)
}

export default React.memo(SectionTitle)