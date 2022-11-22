import React, { ComponentProps } from 'react'
import Lottie from 'lottie-react'
import MagicStickyAnimation from './images/magic_sticky.json'

type MagicWandProps = ComponentProps<'div'>

const MagicWand = (props: MagicWandProps) => {
  return (
    <div {...props}>
      <Lottie animationData={MagicStickyAnimation} loop={true} />
    </div>
  )
}

export default React.memo(MagicWand)
