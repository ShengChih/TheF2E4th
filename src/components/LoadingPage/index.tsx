import { ReactNode, Fragment } from 'react'
import { LoadingPageProps, MediaImage } from './type.d'
import MultipleImageSources from '@components/ResponsiveImageContainer/MultipleImageSources'

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
	const SourceElements = mediaImages.map(({
		minWidth, imageSrc
	}: MediaImage, index: number) => (
		<source key={`${aliasName ?? ''}${index}`} media={`(min-width: ${minWidth}px)`} srcSet={`${imageSrc}`}></source>
	))

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
					? (<div className={`w-fit absolute inset-x-0 mx-auto font-julian text-[#38241B] xl:text-[23px] xl:top-[363px]`}>{content}</div>)
					: '' 
			}
			{
				extraInfo
					? (
						<div className={`w-fit absolute inset-x-0 mx-auto font-sans text-[#38241B] xl:text-[20px] xl:top-[448px]`}>
							{extraInfo.map((e: ReactNode, index: number) => <Fragment key={`extra-${index}`}>{e}</Fragment>)}
						</div>
					)
				: ''
			}
		</div>
	)
};