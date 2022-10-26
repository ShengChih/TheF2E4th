import React, { ReactNode } from "react";

import styles from "./styles/base.module.scss"

interface Grid2x5Props {
	className?: string | undefined
	data: ReactNode[]
}

export default function Grid2x5({ className, data }: Grid2x5Props) {
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
