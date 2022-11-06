import { gsap } from "gsap"

export function px2vw(px: number) {
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
	// const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

	return Math.ceil(px / vw * 100)
}

export function px2mapping(px: number) {
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
	return gsap.utils.mapRange(0, px, 0, vw)
}