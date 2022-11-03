import { ReactNode } from 'react'
import MainImage from './images/background.svg'

interface MainVisualProps {
	className?: string
	children: ReactNode | ReactNode[]
}

export default function MainBannerContainer({ className, children }: MainVisualProps) {
	return (
		<div
			style={{
				backgroundImage: `url(${MainImage})`
			}}
			className={`bg-no-repeat bg-cover desktop:h-[720px] ${className ?? ''}`}
		>{children}</div>
	)
}