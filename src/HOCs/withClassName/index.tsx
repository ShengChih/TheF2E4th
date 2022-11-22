import React, { ComponentType, ComponentProps, ElementType } from 'react'

export default function withClassName<T extends ElementType>(
  WrappedComponent: ComponentType<ComponentProps<T>>,
  className: string | undefined,
) {
  const NewClassNameComponent = (props: ComponentProps<T>) => {
    return <WrappedComponent {...props} className={`${className} ${props?.className}`} />
  }

  return NewClassNameComponent
}
