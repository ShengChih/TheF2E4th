import { ReactNode, ComponentProps } from 'react'
import styled from 'styled-components'

import MagicWand from '@components/MagicWand'
import LoadingBgImage1x from './images/LoadingBackgroundImage1x.png'
import LoadingBgImage1_5x from './images/LoadingBackgroundImage1_5x.png'

export type PageProps = ComponentProps<"div"> & {
	content?: ReactNode
	extraInfo?: ReactNode
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

export default function LoadingPage({ content, extraInfo, ...props }: PageProps) {
	return (
		<Page {...props} >
			<MagicWand className={`absolute inset-x-0 mx-auto desktop:w-[200px] desktop:h-[200px] desktop:top-[138px]`} />
			{
				content
					? (<div className={`w-fit absolute inset-x-0 mx-auto font-julian text-[#38241B] desktop:text-[23px] desktop:top-[363px]`}>{content}</div>)
					: '' 
			}
			{
				extraInfo
				? (<div className={`w-fit absolute inset-x-0 mx-auto font-sans text-[#38241B] desktop:text-[20px] desktop:top-[448px]`}>{extraInfo}</div>)
				: ''
			}
		</Page>
	)
};