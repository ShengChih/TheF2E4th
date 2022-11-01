import { ReactNode } from 'react'
import MainImage from './images/background.svg'

interface MainVisualProps {
	children: ReactNode | ReactNode[]
}

export default function MainBannerContainer({ children }: MainVisualProps) {
	return (
		<div
			style={{
				backgroundImage: `url(${MainImage})`
			}}
			className={`bg-no-repeat bg-contain relative desktop:h-[720px]`}>{ children }</div>
	)
}