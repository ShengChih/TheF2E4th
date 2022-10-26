import React, { ReactNode } from "react";

import styles from "./styles/base.module.scss"

interface Grid2x2Props {
	className?: string | undefined
	data: ReactNode[]
}

export default function Grid2x2({ className, data }: Grid2x2Props) {
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
