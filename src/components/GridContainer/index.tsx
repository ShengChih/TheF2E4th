import React, { ReactNode } from "react";

import "./styles/base.scss"

interface GridContainerProps {
	data: ReactNode[]
}

export default function GridContainer({ data }: GridContainerProps) {
	return (
		<section className="grid_section">
			{
				data.map((node: ReactNode) => (<div>{node}</div>))
			}
		</section>
	)	
}
