import { MouseEvent } from 'react'
export { BasePageProps } from '@type.d'
import { gsap } from "@animations/gsap"

export type MainPageHandle = {
	gotoHexSchoolAnchor: (e: MouseEvent) => void
	gotoScheduleInfoAnchor: (e: MouseEvent) => void
}