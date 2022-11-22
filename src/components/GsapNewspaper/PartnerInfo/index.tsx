import React from 'react'
import Jira1x from './images/jira1x.png'
import Confluence1x from './images/confluence1x.png'
import Micro1x from './images/micro1x.png'
import Dottedsign1x from './images/dottedsign1x.png'
import { flatClassName } from '@/utils/reduce'

export default function PartnerInfo() {
  return (
    <div
      className={flatClassName({
        common: `h-full`,
        desktop: `xl:w-[1081px] xl:mx-auto xl:flex xl:flex-row xl:items-center xl:justify-between`,
        tablet: `md:w-[768px] md:flex md:flex-wrap md:justify-center`,
        mobile: `sm:w-[375px] sm:flex sm:flex-wrap sm:justify-center`,
      })}
    >
      <div
        className={flatClassName({
          desktop: `xl:flex xl:flex-nowrap xl:w-[505px] xl:justify-between xl:items-center`,
          tablet: `md:h-[96px] md:w-[505px] md:flex md:items-center md:justify-between`,
          mobile: `sm:h-[192px] sm:w-[375px] sm:flex sm:flex-wrap sm:items-center sm:justify-center`,
        })}
      >
        <img
          className={flatClassName({
            common: `bg-center bg-contain w-[165px] h-[55px]`,
            desktop: ``,
            tablet: ``,
            mobile: ``,
          })}
          alt={`jira`}
          src={Jira1x}
        />
        <img
          className={flatClassName({
            common: `bg-center bg-containw-[288px] h-[36px]`,
            desktop: ``,
            tablet: ``,
            mobile: ``,
          })}
          alt={`confluence`}
          src={Confluence1x}
        />
      </div>
      <div
        className={flatClassName({
          desktop: `xl:flex xl:flex-nowrap xl:w-[526px] xl:justify-between xl:items-center`,
          tablet: `md:h-[96px] md:w-[526px] md:flex md:items-center md:justify-between`,
          mobile: `sm:h-[192px] sm:w-[375px] sm:flex sm:flex-wrap sm:items-center sm:justify-center`,
        })}
      >
        <img
          className={flatClassName({
            common: `bg-center bg-contain w-[202px] h-[63px]`,
            desktop: ``,
            tablet: ``,
            mobile: ``,
          })}
          alt={`micro`}
          src={Micro1x}
        />
        <img
          className={flatClassName({
            common: `bg-center bg-contain w-[273px] h-[66px]`,
            desktop: ``,
            tablet: ``,
            mobile: ``,
          })}
          alt={`dottedsign`}
          src={Dottedsign1x}
        />
      </div>
    </div>
  )
}
