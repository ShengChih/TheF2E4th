import React, { ComponentType, ComponentProps, ElementType, CSSProperties } from 'react'

export default function withForwardStyle<T extends ElementType>(
  WrappedComponent: ComponentType<ComponentProps<T>>,
  style: CSSProperties | undefined,
) {
  const ForwardStyleComponent = (props: ComponentProps<T>) => {
    return (
      <WrappedComponent
        {...props}
        style={{
          ...style,
          ...props?.style,
        }}
      />
    )
  }

  return ForwardStyleComponent
}
