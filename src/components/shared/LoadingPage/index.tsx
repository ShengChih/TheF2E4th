import React, { ReactNode, Fragment } from 'react'
import { LoadingPageProps } from './type'
import MultipleImageSources from '@/components/shared/ResponsiveImageContainer/MultipleImageSources'
import { flatClassName } from '@/utils/reduce'

export default function LoadingPage({
  content,
  extraInfo,
  loadingImg,
  aliasName,
  mediaImages,
  imageElementProps,
  pictureElementProps,
  className,
}: LoadingPageProps) {
  return (
    <div className={className}>
      {mediaImages ? (
        <MultipleImageSources
          aliasName={aliasName}
          mediaImages={mediaImages}
          imageElementProps={imageElementProps}
          pictureElementProps={pictureElementProps}
        />
      ) : (
        ''
      )}
      {loadingImg}
      {content}
      {extraInfo ? (
        <div
          className={flatClassName({
            common: `w-fit absolute inset-x-0 mx-auto font-sans text-[#38241B]`,
            desktop: `xl:text-[20px] xl:top-[448px]`,
          })}
        >
          {extraInfo.map((e: ReactNode, index: number) => (
            <Fragment key={`extra-${index}`}>{e}</Fragment>
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
