import { ComponentType } from 'react'
import SectionTitle from "@components/SectionTitle"

import baseStyles from "./styles/base.module.scss"
import pcStyles from "./styles/pc.module.scss"

type SectionTitleProps<P = any> = {
	WrappedContainer: ComponentType<P>
	title: string,
	iconUrl: string
}

export default function withSectionTitle<P = any>({
	WrappedContainer,
	title,
	iconUrl
}: SectionTitleProps) {
	
	return (props: P) => (
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
