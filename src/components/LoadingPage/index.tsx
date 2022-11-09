import { ReactNode, ComponentProps } from 'react'
import styled from 'styled-components'

import MagicWand from '@components/MagicWand'
import TabletLoadingBgImage1x from './images/tablet/LoadingBackgroundImage@1x.png'
import PcLoadingBgImage1x from './images/pc/LoadingBackgroundImage1x.jpg'

export type PageProps = ComponentProps<"div"> & {
	content?: ReactNode
	extraInfo?: ReactNode
}

const Page: React.FC<PageProps> = styled.div`
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;

	@media (min-width: 768px) {
		background-image: url(${TabletLoadingBgImage1x});
	}

	@media (min-width: 1280px) {
		background-image: url(${PcLoadingBgImage1x});
	}

	@media (min-width: 1921px) {
		background-image: url(${PcLoadingBgImage1x});
	}
}
`

export default function LoadingPage({ content, extraInfo, ...props }: PageProps) {
	return (
		<Page {...props} >
			<MagicWand className={`absolute inset-x-0 mx-auto xl:w-[200px] xl:h-[200px] xl:top-[138px]`} />
			{
				content
					? (<div className={`w-fit absolute inset-x-0 mx-auto font-julian text-[#38241B] xl:text-[23px] xl:top-[363px]`}>{content}</div>)
					: '' 
			}
			{
				extraInfo
				? (<div className={`w-fit absolute inset-x-0 mx-auto font-sans text-[#38241B] xl:text-[20px] xl:top-[448px]`}>{extraInfo}</div>)
				: ''
			}
		</Page>
	)
};