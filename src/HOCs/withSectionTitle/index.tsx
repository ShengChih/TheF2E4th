import { ReactNode, ComponentType, ComponentProps, ElementType } from 'react'
import SectionTitle from "@components/SectionTitle"

import baseStyles from "./styles/base.module.scss"
import pcStyles from "./styles/pc.module.scss"

type ComponentAnyProps<T extends ElementType> = ComponentProps<T>

type SectionTitleProps<T extends ElementType> = {
	WrappedContainer: ComponentType<ComponentAnyProps<T>>
	title: string,
	icon?: ReactNode
}

export default function withSectionTitle<T extends ElementType>({
	WrappedContainer,
	title,
	icon
}: SectionTitleProps<T>) {
	return (props: ComponentAnyProps<T>) => (
		<>
			<SectionTitle
				title={title}
				sectionClassName={`${baseStyles.section_title} ${pcStyles.section_title}`}
				icon={icon}
			/>
			<WrappedContainer {...props} />
		</>
	)
}
