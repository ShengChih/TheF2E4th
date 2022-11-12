import { ReactNode, Fragment } from 'react'
import { LoadingPageProps } from './type.d'
import MultipleImageSources from '@components/ResponsiveImageContainer/MultipleImageSources'
import { flatClassName } from '@utils/reduce'

export default function LoadingPage({
	content,
	extraInfo,
	loadingImg,
	aliasName,
	mediaImages,
	imageElementProps,
	pictureElementProps,
	...props
}: LoadingPageProps) {
	return (
		<div
			{...props}
		>
			<MultipleImageSources
				aliasName={aliasName}
				mediaImages={mediaImages}
				imageElementProps={imageElementProps}
				pictureElementProps={pictureElementProps}
			/>
			{ loadingImg }
			{
				content
					? (<div className={flatClassName({
						common: `w-fit absolute inset-x-0 mx-auto font-julian text-[#38241B]`,
						desktop: `xl:text-[23px] xl:top-[363px]`
					})}>{content}</div>)
					: '' 
			}
			{
				extraInfo
					? (
						<div className={flatClassName({
							common: `w-fit absolute inset-x-0 mx-auto font-sans text-[#38241B]`,
							desktop: `xl:text-[20px] xl:top-[448px]`
						})}>
							{extraInfo.map((e: ReactNode, index: number) => <Fragment key={`extra-${index}`}>{e}</Fragment>)}
						</div>
					)
				: ''
			}
		</div>
	)
};