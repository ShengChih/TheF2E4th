import { ComponentType, ComponentProps, ElementType, CSSProperties } from 'react'

export default function withBackwardStyle<T extends ElementType>(
	WrappedComponent: ComponentType<ComponentProps<T>>,
	style: CSSProperties | undefined
) {

	const BackwardStyleComponent = (props: ComponentProps<T>) => {
		return <WrappedComponent
			{...props}
			style={{
				...props?.style,
				...style
			}}
		/>
	}

	return BackwardStyleComponent
}
