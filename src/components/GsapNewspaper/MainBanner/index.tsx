import React, { ComponentProps, ReactNode } from 'react'
import styled from 'styled-components'
import useCheckScreen from '@/hooks/useCheckScreen'
import { flatClassName } from '@/utils/reduce'

import ScrollMouseIcon from '@/components/GsapNewspaper/ScrollMouseIcon'
import PcMainImage from './images/pc/background.png'
import TabletMainImage from './images/tablet/background.png'
import MobileMainImage from './images/mobile/background.png'

type MainBannerProps = Pick<ComponentProps<'div'>, 'className'> & {
  BannerImage?: ReactNode
  RewardTaskImage?: ReactNode
}

const BaseBanner: React.FC<ComponentProps<'div'>> = styled.div`
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;

	@/media (min-width: 375px) {
		background-image: url(${MobileMainImage});
	}

	@/media (min-width: 768px) {
		background-image: url(${TabletMainImage});
	}

	@/media (min-width: 1280px) {
		background-image: url(${PcMainImage});
	}
}
`

export default function MainBanner({ BannerImage, RewardTaskImage, className }: MainBannerProps) {
  const [, , isTablet, isDesktop] = useCheckScreen([375, 768, 1280])
  return (
    <BaseBanner
      className={
        flatClassName({
          common: ['relative bg-no-repeat bg-center bg-cover'],
          desktop: ['xl:w-[1200px]', 'xl:h-[597px]'],
          tablet: ['md:w-[736px]', 'md:h-[902px]'],
          mobile: ['sm:w-full', 'sm:h-[864px]', 'sm:flex', 'sm:justify-center'],
        }) + `${className ?? ''}`
      }
    >
      <div
        className={flatClassName({
          common: [
            'absolute font-ebgaramond font-bold text-[#38241B] leading-[104px] w-[320px] h-[104px]',
          ],
          desktop: ['xl:translate-x-[56px]', 'xl:translate-y-[51px]', 'xl:text-[76px]'],
          tablet: ['md:translate-x-[39px]', 'md:translate-y-[93px]', 'md:text-[76px]'],
          mobile: [
            'sm:traslate-x-[22px]',
            'sm:translate-y-[43px]',
            'sm:text-[60px]',
            'sm:leading-[80px]',
          ],
        })}
      >
        THE F2E
      </div>
      <div
        className={flatClassName({
          common: [
            'rounded-[14px] w-[109px] h-[46px] flex justify-center items-center absolute font-roboto font-bold text-white leading-[40px] text-[34px] bg-[#951205] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]',
          ],
          desktop: ['xl:translate-x-[385px]', 'xl:translate-y-[76px]'],
          tablet: ['md:translate-x-[368px]', 'md:translate-y-[118px]'],
          mobile: ['sm:w-[85px]', 'sm:h-[36px]', 'sm:translate-x-[269px]', 'sm:translate-y-[61px]'],
        })}
      >
        4th
      </div>
      <div
        className={flatClassName({
          common: ['absolute font-black font-serif text-[#38241B]'],
          desktop: [
            'xl:w-[343px]',
            'xl:h-[180px]',
            'xl:leading-[60px]',
            'xl:text-[42px]',
            'xl:translate-x-[59px]',
            'xl:translate-y-[177px]',
          ],
          tablet: [
            'md:w-[607px]',
            'md:h-[144px]',
            'md:leading-[72px]',
            'md:text-[50px]',
            'md:translate-x-[39px]',
            'md:translate-y-[183px]',
          ],
          mobile: [
            'sm:text-center',
            'sm:w-[313px]',
            'sm:h-[168px]',
            'sm:translate-y-[507px]',
            'sm:text-[39px]',
            'sm:leading-[56px]',
          ],
        })}
      >
        前端工程師和介面設計師，攜手合作拿獎金
      </div>

      {BannerImage}
      {RewardTaskImage}
      {isTablet ? (
        ''
      ) : (
        <div
          className={flatClassName({
            common: `absolute font-normal font-sans text-[#38241B]`,
            desktop: `xl:w-[283px] xl:h-[140px] xl:leading-[34.75px] xl:text-[24px] xl:left-[59px] xl:top-[372px]`,
            mobile: `sm:w-[313px] sm:h-[96px] sm:leading-[32px] sm:text-[22px] sm:translate-y-[688px]`,
          })}
        >
          羨慕別人的酷酷網頁動畫？ 滿足不了同事的許願？ 動畫技能樹太雜無從下手？
        </div>
      )}
      {isDesktop ? (
        <>
          <div
            className={`flex items-center justify-center flex-wrap absolute text-[#38241B] xl:w-[294px] xl:h-[191px] xl:left-[845px] xl:top-[215px]`}
          >
            {[
              {
                name: '報名總人數',
                amount: '1158',
                unit: '人',
              },
              {
                name: '個人賽人數',
                amount: '1052',
                unit: '人',
              },
              {
                name: '團體賽人數',
                amount: '41',
                unit: '人',
              },
            ].map(({ name, amount, unit }, index: number) => (
              <div className={`flex items-center`} key={`attendee-${index}`}>
                <div className={`font-julian xl:w-[140px] xl:h-[31px] xl:text-[28px]`}>{name}</div>
                <div
                  className={`font-ebgaramond text-right xl:w-[109px] xl:h-[65px] xl:text-[50px]`}
                >
                  {amount}
                </div>
                <div className={`font-julian xl:w-[28px] xl:h-[31px] xl:text-[28px]`}>{unit}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        ''
      )}

      {isDesktop ? (
        <ScrollMouseIcon className={`absolute translate-x-[1085px] translate-y-[467px]`} />
      ) : (
        ''
      )}
    </BaseBanner>
  )
}
