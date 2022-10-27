import { ComponentType, ComponentProps, ElementType } from 'react'
import SectionTitle from "@components/SectionTitle"

import baseStyles from "./styles/base.module.scss"
import pcStyles from "./styles/pc.module.scss"

type ComponentAnyProps<T extends ElementType> = ComponentProps<T>

type SectionTitleProps<T extends ElementType> = {
	WrappedContainer: ComponentType<ComponentAnyProps<T>>
	title: string,
	iconUrl: string
}

export default function withSectionTitle<T extends ElementType>({
	WrappedContainer,
	title,
	iconUrl
}: SectionTitleProps<T>) {
	return (props: ComponentAnyProps<T>) => (
		<>
			<SectionTitle
				title={title}
				sectionClassName={`${baseStyles.section_title} ${pcStyles.section_title}`}
				iconProps={{
					style: {
						backgroundImage: `url(${iconUrl})`
					},
					className: `${baseStyles.section_title__icon} ${pcStyles.section_title__icon}`
				}}
			/>
			<WrappedContainer {...props} />
		</>
	)
}
