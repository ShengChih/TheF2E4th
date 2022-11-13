import { MultipleImageSourcesProps, MediaImage  } from './type'

const MultipleImageSources = ({
	aliasName,
	mediaImages,
	imageElementProps,
	pictureElementProps
}: MultipleImageSourcesProps) => {
	const SourceElements = mediaImages.map(({
		minWidth, imageSrc
	}: MediaImage, index: number) => (
		<source key={`${aliasName ?? ''}${index}`} media={`(min-width: ${minWidth}px)`} srcSet={`${imageSrc}`}></source>
	))

	return (
		<>
			<picture {...pictureElementProps}>
				{ SourceElements }
				<img { ...imageElementProps } />
			</picture>
		</>
	)
}

export default MultipleImageSources