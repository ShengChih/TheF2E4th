import { ReactNode, ComponentProps } from 'react'
import styled from 'styled-components'

import LoadingBgImage1x from './images/LoadingBackgroundImage1x.png'
import LoadingBgImage1_5x from './images/LoadingBackgroundImage1_5x.png'

export type PageProps = ComponentProps<"div"> & {
	content?: ReactNode
}

const Page: React.FC<PageProps> = styled.div`
	background-postion: center;
	background-repeat: no-repeat;
	background-size: contain;

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
			{content}
		</Page>
	)
};