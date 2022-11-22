import React, {
  ComponentProps,
  ForwardRefRenderFunction,
  useRef,
  useImperativeHandle,
  forwardRef,
  RefObject,
} from 'react'
import { flatClassName } from '@/utils/reduce'
import EntireImage from './images/entire.svg'

//const EntireImage = ''

type VendettaProps = ComponentProps<'div'>

type VendettaHandle = {
  getRef: () => RefObject<HTMLDivElement>
}

const Vendetta: ForwardRefRenderFunction<VendettaHandle, VendettaProps> = (
  { className }: VendettaProps,
  forwardref,
) => {
  const el = useRef<HTMLDivElement>(null)

  useImperativeHandle(
    forwardref,
    () => {
      return {
        getRef: () => {
          return el ?? {}
        },
      }
    },
    [],
  )

  return (
    <div
      style={{
        backgroundImage: `url(${EntireImage})`,
      }}
      className={flatClassName({
        common: `absolute bg-no-repeat bg-center bg-cover w-[672.27px] h-[562px] ${className}`,
        mobile: `sm:w-[441.4px] sm:h-[369px] sm:flex sm:justify-center`,
      })}
      ref={el}
    >
      <div
        className={flatClassName({
          common: 'relative ',
          desktop: `xl:grid xl:grid-flow-row xl:grid-cols-2 xl:gap-x-[22px] xl:h-[73px] xl:left-[50px] xl:top-[461px] xl:w-[560.86px]`,
          tablet: `md:grid md:grid-flow-row md:grid-cols-2 md:gap-x-[22px] md:h-[73px] md:left-[50px] md:top-[461px] md:w-[560.86px]`,
          mobile: `sm:flex sm:flex-nowrap sm:w-[347px] sm:h-[42px] sm:gap-x-[8px] sm:top-[306px]`,
        })}
      >
        <div
          className={flatClassName({
            common: `flex w-[254.43px]`,
            mobile: `sm:w-[161px] sm:flex sm:items-center sm:text-center`,
          })}
        >
          <div
            className={flatClassName({
              common: `font-sans text-white leading-[41px] text-[28px] w-[84px]`,
              desktop: `xl:pt-[23px] xl:pb-[9px]`,
              tablet: `md:pt-[23px] md:pb-[9px]`,
              mobile: `sm:w-[60px] sm:h-[29px] sm:text-[20px] sm:leading-[29px]`,
            })}
          >
            個人獎
          </div>
          <div
            className={flatClassName({
              common: `font-ebgaramond font-bold text-[#951205] ml-[8.43px] leading-[73px] w-[162px] text-[56px]`,
              mobile: `sm:ml-[8px] sm:leading-[42px] sm:text-[32px] sm:w-[93px]`,
            })}
          >
            $3,000
          </div>
        </div>
        <div
          className={flatClassName({
            common: `flex w-[284.43px]`,
            mobile: `sm:w-[178px] sm:flex sm:items-center sm:text-center`,
          })}
        >
          <div
            className={flatClassName({
              common: `font-sans text-white leading-[41px] text-[28px] w-[84px]`,
              desktop: `xl:pt-[23px] xl:pb-[9px]`,
              tablet: `md:pt-[23px] md:pb-[9px]`,
              mobile: `sm:w-[60px] sm:h-[29px] sm:text-[20px] sm:leading-[29px]`,
            })}
          >
            團體獎
          </div>
          <div
            className={flatClassName({
              common: `font-ebgaramond font-bold text-[#951205] ml-[8.43px] leading-[73px] w-[192px] text-[56px]`,
              mobile: `sm:ml-[8px] sm:leading-[42px] sm:text-[32px] sm:w-[110px]`,
            })}
          >
            $10,000
          </div>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(Vendetta)
