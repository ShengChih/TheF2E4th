import { ComponentProps } from "react";
import baseStyles from './styles/base.module.scss'
import pcStyles from './styles/pc.module.scss'

type DivProps = ComponentProps<"div">

export default function Rectangle(props: DivProps) {
	return (
		<div
			{...props}
			className={`${baseStyles.icon} ${pcStyles.rectangle}`}
		></div>
	)
}
