import { ReactNode, ComponentProps } from 'react'
import styled from 'styled-components'

import MagicWand from '@components/MagicWand'
import LoadingBgImage1x from './images/LoadingBackgroundImage1x.png'
import LoadingBgImage1_5x from './images/LoadingBackgroundImage1_5x.png'

export type PageProps = ComponentProps<"div"> & {
	content?: ReactNode
}

const Page: React.FC<PageProps> = styled.div`
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;

	@media (max-width: 1280px) {
		background-image: url(${LoadingBgImage1x});
	}

	@media (max-width: 1921px) {
		background-image: url(${LoadingBgImage1_5x});
	}
}
`

export default function LoadingPage({ content, ...props }: PageProps) {
	return (
		<Page {...props} >
			<MagicWand className={`absolute left-[50%] desktop:w-[200px] desktop:h-[200px] desktop:top-[138px] desktop:translate-x[-100px]`} />
			{content}
		</Page>
	)
};