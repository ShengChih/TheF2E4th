import { ComponentType } from 'react'

interface Props<P = any> {
	WrappedComponent: ComponentType<P>
	componentProps: P
}

export default function withAll({WrappedComponent, componentProps}: Props) {
	return (
		<>
			<WrappedComponent {...componentProps} />
		</>
	)
}
