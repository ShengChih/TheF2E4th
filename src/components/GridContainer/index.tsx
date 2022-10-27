import React, { ReactNode } from "react";

import styles from "./styles/base.module.scss"

interface GridContainerProps {
	className?: string | undefined
	data: ReactNode[]
}

export default function GridContainer({ className, data }: GridContainerProps) {
	return (
		<section className={`${styles.grid_container} ${className}`}>
			{
				data.map((node: ReactNode, index: number) => (
					<div key={`grid-${index}`}>{node}</div>
				))
			}
		</section>
	)	
}
