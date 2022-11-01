import { ComponentProps } from 'react'
import MainBackground from './images/main_container_background.svg'

type MainContainerProps = Pick<ComponentProps<"div">, 'children'>

export default function MainContainer({ children }: MainContainerProps) {
	return (
		<div
			style={{
				backgroundImage: `url(${MainBackground})`
			}}
			className={`bg-no-repeat bg-center bg-cover flex flex-col items-center relative desktop:h-[6443px]`}
		>
			{children}
		</div>
	)
}