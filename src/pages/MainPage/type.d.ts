import { MouseEvent } from 'react'
import { gsap } from "@animations/gsap"

export type MainPageHandle = {
	gotoHexSchoolAnchor: (e: MouseEvent) => void
	gotoScheduleInfoAnchor: (e: MouseEvent) => void
}

export type AnimationReturn = ReturnType<typeof gsap.context | typeof gsap.timeline | typeof gsap.fromTo>