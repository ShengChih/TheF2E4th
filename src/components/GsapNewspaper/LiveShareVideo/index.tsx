import React, { useCallback, useState, ReactNode } from 'react'
import MagicWand from '@/components/GsapNewspaper/MagicWand'
import SectionTitle from '@/components/GsapNewspaper/SectionTitle'
import { flatClassName } from '@/utils/reduce'
import BlockStudioSpeaker from './images/Speaker1.gif'
import LeoSpeaker from './images/Speaker2.gif'
import DraggableSpeaker from './images/FakeSpeaker3.gif'
import CreativeSpeaker from './images/Speaker4.gif'
import NameBgImage from './images/NameBgImage1x.png'

interface ShareSpeakerCardProps {
  SubjectStyle: string
  SubjectTitle: string
  SpeakerImage: string
  SpeakerInfo: string
  SpeakerTitleStyle: string
  SpeakerTitle: string
  ActivityPeriodsStyle: string
  ActivityInfo: string
  VideoLink?: string
}

interface LiveShareState {
  displayCard: boolean
}

const initState = {
  displayCard: false,
}

const ShareSpeakerCard = ({
  SubjectStyle,
  SubjectTitle,
  SpeakerImage,
  SpeakerTitleStyle,
  SpeakerTitle,
  ActivityPeriodsStyle,
  ActivityInfo,
  VideoLink,
}: ShareSpeakerCardProps) => {
  const go2Link = VideoLink
    ? () => {
        window.open(VideoLink, '_blank')
      }
    : undefined

  return (
    <div
      role="link"
      tabIndex={0}
      onKeyDown={go2Link}
      onClick={go2Link}
      style={{
        backgroundImage: `url(${SpeakerImage})`,
      }}
      className={flatClassName({
        common: `relative flex flex-col items-center bg-contain`,
        desktop: `xl:w-[522px] xl:h-[738.5px]`,
        tablet: `md:w-[343.px] md:h-[485.26px]`,
        mobile: `sm:w-[343.px] sm:h-[485.26px]`,
      })}
    >
      <div
        className={flatClassName({
          common: `text-center font-serif font-black mx-auto ${SubjectStyle}`,
          tablet: `md:absolute`,
          mobile: `sm:absolute`,
        })}
      >
        {SubjectTitle}
      </div>
      <div
        style={{
          backgroundImage: `url(${NameBgImage})`,
        }}
        className={flatClassName({
          common: `absolute flex items-center`,
          desktop: `xl:w-[259px] xl:h-[66px] xl:top-[583px]`,
          tablet: `md:w-[170.19px] md:h-[43.37px] md:top-[383.08px] md:justify-center`,
          mobile: `sm:w-[170.19px] sm:h-[43.37px] sm:top-[383.08px] sm:justify-center`,
        })}
      >
        <div
          className={flatClassName({
            common: `flex items-center relative whitespace-pre text-center text-white font-sans font-bold ${SpeakerTitleStyle}`,
          })}
        >
          {SpeakerTitle}
        </div>
      </div>
      <div
        className={flatClassName({
          common: `absolute font-roboto font-black text-center text-[#38241B] ${ActivityPeriodsStyle}`,
        })}
      >
        {ActivityInfo}
      </div>
    </div>
  )
}

const MemorizedShareSpeakerCard = React.memo(ShareSpeakerCard)

const liveShares = [
  {
    SubjectStyle: flatClassName({
      desktop: `xl:text-[57px] xl:leading-[62px] xl:mt-[47.68px] xl:mb-[45.32px] xl:w-[402.39px] xl:h-[62px]`,
      tablet: `md:text-[37px] md:leading-[36px] md:absolute md:inset-x-0 md:mx-auto md:top-[13.59px] md:w-[264.4px] md:h-[77.19px]`,
      mobile: `sm:text-[37px] sm:leading-[36px] sm:absolute sm:inset-x-0 sm:mx-auto sm:top-[13.59px] sm:w-[264.4px] sm:h-[77.19px]`,
    }),
    SubjectTitle: `網站的動態趨勢`,
    SpeakerImage: BlockStudioSpeaker,
    SpeakerInfo: `李明-版塊設計創辦人兼總監`,
    SpeakerTitleStyle: flatClassName({
      common: ``,
      desktop: `xl:w-[200px] xl:h-[52px] xl:left-[35px] xl:text-[20px] xl:leading-[26px]`,
      tablet: `md:text-[13px] md:leading-[16px] md:w-[142.59px] md:h-[34.17px]`,
      mobile: `sm:text-[13px] sm:leading-[15.6px] sm:w-[142.59px] sm:h-[34.17px]`,
    }),
    SpeakerTitle: '李明\n版塊設計創辦人兼總監',
    ActivityPeriodsStyle: flatClassName({
      desktop: `xl:text-[35px] xl:leading-[67px] xl:w-[402.39px] xl:h-[58.74px] xl:top-[652px]`,
      tablet: `md:flex md:justify-center md:items-center md:text-[24px] md:leading-[67px] md:w-[259px] md:h-[42px] md:top-[433px]`,
      mobile: `sm:flex sm:justify-center sm:items-center sm:text-[24px] sm:leading-[67px] sm:w-[259px] sm:h-[42px] sm:top-[433px]`,
    }),
    ActivityInfo: `11/03(四)20:00 ~ 21:30`,
    VideoLink: `https://www.youtube.com/watch?v=9gzDFKTIFB4`,
  },
  {
    SubjectStyle: flatClassName({
      desktop: `xl:text-[49px] xl:leading-[62px] xl:mt-[20.68px] xl:mb-[16.84px] xl:w-[402.39px] xl:h-[117.47px]`,
      tablet: `md:text-[30px] md:leading-[36px] md:mt-[14px] md:w-[264.4px] md:h-[77.19px]`,
      mobile: `sm:text-[30px] sm:leading-[36px] sm:mt-[14px] sm:w-[264.4px] sm:h-[77.19px]`,
    }),
    SubjectTitle: `jQuery 也可以做到的互動效果`,
    SpeakerImage: LeoSpeaker,
    SpeakerInfo: `Leo-Angular Taiwan 傳教士`,
    SpeakerTitleStyle: flatClassName({
      common: ``,
      desktop: `xl:w-[217px] xl:h-[52px] xl:left-[27px] xl:text-[20px] xl:leading-[26px]`,
      tablet: ` md:text-[13px] md:leading-[16px]`,
      mobile: `sm:text-[13px] sm:leading-[15.6px]`,
    }),
    SpeakerTitle: 'Leo\nAngular Taiwan 傳教士',
    ActivityPeriodsStyle: flatClassName({
      common: ``,
      desktop: `xl:w-[402.39px] xl:h-[58.74px] xl:top-[652px] xl:text-[35px] xl:leading-[67px]`,
      tablet: `md:flex md:justify-center md:items-center md:text-[24px] md:leading-[67px] md:w-[259px] md:h-[42px] md:top-[433px]`,
      mobile: `sm:flex sm:justify-center sm:items-center sm:text-[24px] sm:leading-[67px] sm:w-[259px] sm:h-[42px] sm:top-[433px]`,
    }),
    ActivityInfo: `11/10(四)20:00 ~ 21:30`,
    VideoLink: `https://www.youtube.com/watch?v=ywPkqeXYVAU&ab_channel=%E5%85%AD%E8%A7%92%E5%AD%B8%E9%99%A2`,
  },
  {
    SubjectStyle: flatClassName({
      desktop: `xl:text-[46px] xl:leading-[62px] xl:mt-[20.68px] xl:mb-[16.84px] xl:w-[402.39px] xl:h-[117.47px]`,
      tablet: `md:text-[30px] md:leading-[36px] md:mt-[14px] md:w-[264.4px] md:h-[77.19px]`,
      mobile: `sm:text-[30px] sm:leading-[36px] sm:mt-[14px] sm:w-[264.4px] sm:h-[77.19px]`,
    }),
    SubjectTitle: `網頁可以拖拖拉拉draggable.js 介紹`,
    SpeakerImage: DraggableSpeaker,
    SpeakerInfo: `邱繼緯-前端工程師`,
    SpeakerTitleStyle: flatClassName({
      common: ``,
      desktop: `xl:w-[100px] xl:h-[52px] xl:left-[85px] xl:text-[20px] xl:leading-[26px]`,
      tablet: `md:text-[13px] md:leading-[16px]`,
      mobile: `sm:text-[13px] sm:leading-[16px]`,
    }),
    SpeakerTitle: '邱繼緯\n前端工程師',
    ActivityPeriodsStyle: flatClassName({
      desktop: `xl:text-[35px] xl:leading-[67px] xl:w-[402.39px] xl:h-[58.74px] xl:top-[652px]`,
      tablet: `md:flex md:justify-center md:items-center md:text-[24px] md:leading-[67px] md:w-[259px] md:h-[42px] md:top-[433px]`,
      mobile: `sm:flex sm:justify-center sm:items-center sm:text-[24px] sm:leading-[67px] sm:w-[259px] sm:h-[42px] sm:top-[433px]`,
    }),
    ActivityInfo: `11/17(四)20:00 ~ 21:30`,
  },
  {
    SubjectStyle: flatClassName({
      desktop: `xl:text-[44px] xl:leading-[62px] xl:mt-[20.68px] xl:mb-[16.84px] xl:w-[402.39px] xl:h-[117.47px]`,
      tablet: `md:text-[29px] md:leading-[36px] md:mt-[14px] md:w-[264.4px] md:h-[77.19px]`,
      mobile: `sm:text-[29px] sm:leading-[36px] sm:mt-[14px] sm:w-[264.4px] sm:h-[77.19px]`,
    }),
    SubjectTitle: `互動式網頁設計工程師該具備哪些技能？`,
    SpeakerImage: CreativeSpeaker,
    SpeakerInfo: `吳哲宇-墨雨互動設計 創辦人`,
    SpeakerTitleStyle: flatClassName({
      desktop: `xl:text-[20px] xl:leading-[26px] xl:w-[185px] xl:h-[52px] xl:left-[43px]`,
      tablet: `md:text-[13px] md:leading-[16px]`,
      mobile: `sm:text-[13px] sm:leading-[16px]`,
    }),
    SpeakerTitle: '吳哲宇\n墨雨互動設計 創辦人',
    ActivityPeriodsStyle: flatClassName({
      common: `xl:text-[35px] xl:leading-[67px] xl:w-[402.39px] xl:h-[58.74px] xl:top-[652px]`,
      tablet: `md:flex md:justify-center md:items-center md:text-[24px] md:leading-[67px] md:w-[259px] md:h-[42px] md:top-[433px]`,
      mobile: `sm:flex sm:justify-center sm:items-center sm:text-[24px] sm:leading-[67px] sm:w-[259px] sm:h-[42px] sm:top-[433px]`,
    }),
    ActivityInfo: `11/24(四)20:00 ~ 21:30`,
  },
]

type ClickBlockProps = {
  handleClick: () => void
}

const ClickBlock = ({ handleClick }: ClickBlockProps) => (
  <div
    role="button"
    tabIndex={0}
    onKeyDown={handleClick}
    onClick={handleClick}
    className={flatClassName({
      common: `relative w-[504px] h-[245px] font-serif font-black text-[72px] leading-[103px] mx-auto text-center text-[#3C221B]`,
      desktop: `xl:mt-[215px]`,
      tablet: `md:mt-[132px]`,
      mobile: `sm:w-[266px] sm:h-[135px] sm:mt-[27px] sm:text-[38px] sm:leading-[55px]`,
    })}
  >
    意想不到的好康
    <span className={`text-[#951205]`}>請點擊</span>
    <MagicWand
      className={flatClassName({
        common: `absolute top-0 left-0 w-[200px] h-[200px] translate-y-[135px] translate-x-[316px]`,
        mobile: `sm:translate-y-[144px] sm:translate-x-[66px]`,
      })}
    />
  </div>
)

const MemorizedClickBlock = React.memo(ClickBlock)

type LiveShareVideoProps = {
  children?: ReactNode | ReactNode[]
}

export default function LiveShareVideo({ children }: LiveShareVideoProps) {
  const [state, setState] = useState<LiveShareState>(initState)

  const handleClick = useCallback(() => {
    setState({
      displayCard: true,
    })
  }, [])

  return state.displayCard ? (
    <>
      <SectionTitle
        className={flatClassName({
          common: `animate-fade-in items-center`,
          desktop: `xl:h-[170px]`,
          tablet: `md:h-[114px]`,
          mobile: `sm:h-[114px]`,
        })}
        title={`各界大神直播分享`}
      />
      <div
        className={flatClassName({
          common: `mx-auto flex items-center justify-center`,
          desktop: `xl:w-[1280px] xl:h-[1656px]`,
          tablet: `md:w-[768px] md:h-[1102.52px]`,
          mobile: `sm:w-[376px] sm:h-[2089px]`,
        })}
      >
        <div
          className={flatClassName({
            common: `animate-fade-in grid grid-flow-row mx-auto`,
            desktop: `xl:w-[1064px] xl:h-[1529px] xl:gap-x-[20px] xl:gap-y-[52px] xl:grid-cols-2`,
            tablet: `md:w-[710px] md:h-[1014.52px] md:gap-x-[24px] md:gap-y-[44px] md:grid-cols-2`,
            mobile: `sm:w-[343px] sm:h-[2001.04px] sm:gap-y-[20px] sm:grid-cols-1`,
          })}
        >
          {liveShares.map((speaker, index: number) => (
            <MemorizedShareSpeakerCard {...speaker} key={`speaker-${index}`} />
          ))}
        </div>
      </div>
      {children}
    </>
  ) : (
    <MemorizedClickBlock handleClick={handleClick} />
  )
}
