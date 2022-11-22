import React from 'react'
import SectionTitle from '@/components/GsapNewspaper/SectionTitle'
import { flatClassName } from '@/utils/reduce'

import BlockStudioLogo from './images/BlockStudioLogo.svg'
import KdanLogo from './images/KdanLogo.svg'
import TitansoftLogo from './images/TitansoftLogo.svg'

export default function SponerInfo() {
  return (
    <div
      className={flatClassName({
        common: `w-full`,
        desktop: `xl:h-[219px]`,
        tablet: `md:h-[398px]`,
        mobile: `sm:h-[398px]`,
      })}
    >
      <SectionTitle
        className={flatClassName({
          common: `mb-[50px]`,
          desktop: `xl:h-[86px]`,
          tablet: `md:h-[43px]`,
          mobile: `sm:h-[43px] mb-[54.92px]`,
        })}
        title={`贊助單位`}
      />
      <div
        className={flatClassName({
          common: `mx-auto flex  items-center justify-between `,
          desktop: `xl:w-[1148px] xl:h-[83px] xl:flex-row`,
          tablet: `md:w-[303px] md:h-[305px] md:flex-col`,
          mobile: `sm:w-[303px] sm:h-[305px] sm:flex-col`,
        })}
      >
        <img
          className={flatClassName({
            common: `bg-contain`,
            desktop: `xl:w-[344px] xl:h-[69px]`,
            tablet: `md:w-[303px] md:h-[64px]`,
            mobile: `sm:w-[303px] sm:h-[64px]`,
          })}
          alt={`Block studio`}
          src={BlockStudioLogo}
        />
        <img
          className={flatClassName({
            common: `bg-contain `,
            desktop: `xl:w-[190px] xl:h-[83px]`,
            tablet: `md:w-[169px] md:h-[73px]`,
            mobile: `sm:w-[168px] sm:h-[73px]`,
          })}
          alt={`Kdan`}
          src={KdanLogo}
        />
        <img
          className={flatClassName({
            common: `bg-contain`,
            desktop: `xl:w-[354px] xl:h-[67px]`,
            tablet: `md:w-[303px] md:h-[58.16px]`,
            mobile: `sm:w-[303px] sm:h-[58.16px]`,
          })}
          alt={`Titansoft`}
          src={TitansoftLogo}
        />
      </div>
    </div>
  )
}
