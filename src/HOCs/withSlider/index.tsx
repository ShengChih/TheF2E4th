import React, { ComponentType, ComponentProps, ElementType, ReactNode, MouseEvent } from 'react'

import useSlider from '@/hooks/useSlider'

type ComponentAnyProps<T extends ElementType> = ComponentProps<T>
type ButtonComponentProps = {
  onClick: (e: MouseEvent<HTMLElement>) => void
}

interface SliderProps<T extends ElementType> {
  WrappedContainer: ComponentType<ComponentAnyProps<T>>
  LeftButton: ComponentType<ButtonComponentProps>
  RightButton: ComponentType<ButtonComponentProps>
  totalRows: number
  maxRowsInContainer: number
}

export default function withSlider<T extends ElementType>({
  WrappedContainer,
  LeftButton,
  RightButton,
  totalRows,
  maxRowsInContainer,
}: SliderProps<T>) {
  const SliderContainer = (props: ComponentAnyProps<T>, data: ReactNode[], dataKey: string) => {
    const { start, end, currentPage, maxPage, handleLeftClick, handleRightClick } = useSlider({
      totalRows: totalRows,
      maxRowsInContainer: maxRowsInContainer,
    })

    const newProps = {
      ...props,
      [dataKey]: data.slice(start, end),
    }

    return (
      <>
        <WrappedContainer {...newProps} />
        {currentPage > 1 ? <LeftButton onClick={handleLeftClick} /> : ''}
        {currentPage < maxPage ? <RightButton onClick={handleRightClick} /> : ''}
      </>
    )
  }

  return SliderContainer
}
