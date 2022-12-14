import React, {
  useMemo,
  useLayoutEffect,
  useEffect,
  useRef,
  forwardRef,
  ReactNode,
  RefObject,
  ForwardedRef,
} from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

gsap.registerEffect({
  name: 'timelineScroller',
  effect: (target: gsap.DOMTarget, config: ScrollTrigger.Vars) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: target,
        ...config,
      },
    })
    return tl
  },
})

export * from 'gsap'
export * from 'gsap/ScrollTrigger'

interface GsapEffectProps {
  children: ReactNode | ReactNode[]
  effect: string | number
  targetRef: RefObject<unknown>
  vars: unknown
}

const GsapEffect = (
  { children, effect, targetRef, vars }: GsapEffectProps,
  ref: ForwardedRef<HTMLElement | null>,
) => {
  const animation = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (gsap.effects[effect]) {
      animation.current = gsap.effects[effect](targetRef.current, vars)
    }
  }, [effect, targetRef, vars])

  useEffect(() => {
    // forward the animation instance if a ref is passed
    if (typeof ref === 'function') {
      ref(animation.current)
    } else if (ref) {
      ref.current = animation.current
    }
  }, [ref])

  return <>{children}</>
}

export const GsapEffectComponent = forwardRef(GsapEffect)

export function useGsapContext(scope: RefObject<HTMLElement>) {
  const ctx = useMemo(
    () =>
      gsap.context(() => {
        return
      }, scope),
    [scope],
  )
  return ctx
}
export type AnimationReturn = ReturnType<
  typeof gsap.context | typeof gsap.timeline | typeof gsap.fromTo
>
