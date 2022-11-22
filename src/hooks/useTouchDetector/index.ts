import { TouchEvent } from 'react'

interface TouchDetectorProps {
  findFunc?: (taret: HTMLElement) => void
  entryFunc?: (element: HTMLElement | undefined) => void
  leaveFunc?: (element: HTMLElement | undefined) => void
  stayFunc?: (element: HTMLElement | undefined) => void
}

type LastVistedDOM = {
  type: 'entry' | 'leave' | 'stay'
  node: HTMLElement | undefined
}

const InitLastVistedDOM: LastVistedDOM = {
  type: 'stay',
  node: undefined,
}

export default function useTouchDetector({
  findFunc,
  entryFunc,
  leaveFunc,
  stayFunc,
}: TouchDetectorProps): (e: TouchEvent<HTMLElement>) => void {
  let lastVisitedDOM: LastVistedDOM = InitLastVistedDOM

  const entryDOM = (visitDOM: HTMLElement | undefined) => {
    leaveDOM()
    lastVisitedDOM = {
      type: 'entry',
      node: visitDOM,
    }
    entryFunc && entryFunc(visitDOM)
  }

  const leaveDOM = () => {
    leaveFunc && leaveFunc(lastVisitedDOM.node)
    lastVisitedDOM = InitLastVistedDOM
  }

  const stayDOM = () => {
    lastVisitedDOM.type = 'stay'
    stayFunc && stayFunc(lastVisitedDOM.node)
  }

  const onTouchControl = (e: TouchEvent) => {
    e.stopPropagation()

    if (e.type === 'touchend') {
      leaveDOM()
      return
    }

    if (!findFunc) {
      return
    }

    const touch = e.touches[0]
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY) as HTMLElement[]

    const currentElementTouched = elements.find(findFunc)
    if (lastVisitedDOM.node && currentElementTouched === lastVisitedDOM.node) {
      stayDOM()
      return
    }

    if (currentElementTouched) {
      entryDOM(currentElementTouched)
    } else if (lastVisitedDOM.node) {
      lastVisitedDOM = InitLastVistedDOM
    }
  }

  return onTouchControl
}
