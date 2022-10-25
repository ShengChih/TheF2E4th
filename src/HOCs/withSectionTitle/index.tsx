import { ComponentType } from 'react'
import SectionTitle from "@components/SectionTitle"

import baseStyles from "./styles/base.module.scss"
import pcStyles from "./styles/pc.module.scss"

type SectionTitleProps<P = {}> = {
	WrappedContainer: ComponentType<P>
	title: string,
	iconUrl: string
}

export default function withSectionTitle({
	WrappedContainer,
	title,
	iconUrl
}: SectionTitleProps) {
	
	return () => (
		<>
			<SectionTitle
				title={title}
				sectionClassName={`${baseStyles.city_title} ${pcStyles.city_title}`}
				iconProps={{
					style: {
						backgroundImage: `url(${iconUrl})`
					},
					className: `${baseStyles.city_title__icon} ${pcStyles.city_title__icon}`
				}}
			/>
			<WrappedContainer />
		</>
	)
}
