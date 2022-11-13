import { ResponsiveImageContainerProps } from './type'
import MultipleImageSources from './MultipleImageSources'

const ResponsiveImageContainer = ({
	aliasName,
	mediaImages,
	imageElementProps,
	children,
	...props
}: ResponsiveImageContainerProps) => {
	return (
		<div
			{...props}
		>
			<MultipleImageSources aliasName={aliasName} mediaImages={mediaImages} imageElementProps={imageElementProps} />
			{ children }
		</div>
	)
}

export default ResponsiveImageContainer