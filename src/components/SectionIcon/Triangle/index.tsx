import { ComponentProps } from "react";
import pcStyles from './styles/pc.module.scss'
import Icon from './images/Triangle.svg'

type DivProps = ComponentProps<"div">

export default function Triangle(props: DivProps) {
	return (
		<div
			{...props}
			className={`${pcStyles.triangle}`}
			style={{
				backgroundImage: `url(${Icon})`,
				...props.style
			}}
		></div>
	)
}
