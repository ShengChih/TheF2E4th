export * from '@/type.d'
import { gsap, ScrollTrigger } from '@/animations/gsap'

export type NewsPaperHandle = {
  initTimelineScroller: (config: ScrollTrigger.Vars) => gsap.core.Timeline
  initTimelineLocation: (
    tl: gsap.core.Timeline,
    vars: gsap.TweenVars,
    position?: gsap.Position,
  ) => gsap.core.Timeline
  moveAnimation: (
    tl: gsap.core.Timeline,
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars,
    position?: gsap.Position,
  ) => gsap.core.Timeline
}
