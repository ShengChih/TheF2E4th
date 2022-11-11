import { MouseEvent } from 'react'
export { BasePageProps } from '@type.d'
import { gsap } from "@animations/gsap"

export type MainPageHandle = {
	gotoHexSchoolAnchor: (e: MouseEvent) => void
	gotoScheduleInfoAnchor: (e: MouseEvent) => void
}

export type AnimationReturn = ReturnType<typeof gsap.context | typeof gsap.timeline | typeof gsap.fromTo>