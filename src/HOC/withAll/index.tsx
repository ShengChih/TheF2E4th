import { ComponentType, ComponentProps, ElementType } from 'react'


interface Props<T extends ElementType, P = any> {
	WrappedComponent: ComponentType<P>
	componentProps: ComponentProps<T> & {
		[key: string]: unknown
	}
}

export default function withAll<T extends ElementType, P = any>(
	{ WrappedComponent, componentProps }: Props<T,P>
) {
	return (
		<>
			<WrappedComponent {...componentProps} />
		</>
	)
}
