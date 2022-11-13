import {
  ReactNode,
  useRef, useState, useEffect,
  ElementRef, MouseEvent,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  lazy, Suspense, useLayoutEffect
} from "react"
import _ from 'lodash'
import { deviceWidth } from '@utils/config'
import { BasePageProps, MainPageHandle } from './type.d'
import { gsap, AnimationReturn } from "@animations/gsap"

import { flatClassName } from '@utils/reduce'
import useCheckScreen from '@hooks/useCheckScreen'
import useImagePreloader from "@hooks/useImagePreloader"

import pcStyles from "./styles/fullpage/pc.module.scss"
import mobileStyles from "./styles/fullpage/mobile.module.scss"
import tabletStyles from "./styles/fullpage/tablet.module.scss"

import NewsPaperMask from "@components/NewsPaperMask"

import MainBanner from "@components/MainBanner"
import TaskCard from "@components/TaskCard"
import { TaskType, Tasks } from "@components/TaskCard/constants"
import ScheduleInfo from "@components/ScheduleInfo"
import AwardInfo from "@components/AwardInfo"


import Vendetta from '@components/Vendetta'

import MainImage from './images/BannerBgImage.svg'
import RewardTask from './images/reward_task.svg'
import ContentBgImage from '@images/loading_bg.jpg'

import PcNewspaper1 from './images/pc/Newspaper1.png'
import PcNewspaper1_1_5x from './images/pc/Newspaper1@1_5x.png'
import PcNewspaper2 from './images/pc/Newspaper2.png'
import PcNewspaper2_1_5x from './images/pc/Newspaper2@1_5x.png'
import PcNewspaper3 from './images/pc/Newspaper3.png'
import PcNewspaper3_1_5x from './images/pc/Newspaper3@1_5x.png'

import TabletNewspaper1 from './images/tablet/Newspaper1.png'
import TabletNewspaper2 from './images/tablet/Newspaper2.png'
import TabletNewspaper3 from './images/tablet/Newspaper3.png'

import MobileNewpaper1 from './images/mobile/Newspaper1.png'
import MobileNewpaper2 from './images/mobile/Newspaper2.png'
import MobileNewpaper3 from './images/mobile/Newspaper3.png'


const LiveShareVideo = lazy(() =>  import("@components/LiveShareVideo"))
const ScrollMouseIcon = lazy(() =>  import("@components/ScrollMouseIcon"))
const HostInfo = lazy(() => import("@components/HostInfo"))
const PartnerInfo = lazy(() => import("@components/PartnerInfo"))
const SponerInfo = lazy(() => import("@components/SponerInfo"))
const Footer = lazy(() => import("@components/Footer"))

type ScheduleInfoHandle = ElementRef<typeof ScheduleInfo>
type VendettaHandle = ElementRef<typeof Vendetta>
type AwardInfoHandle = ElementRef<typeof AwardInfo>
type NewsPaperHandle = ElementRef<typeof NewsPaperMask>
type TaskCardHandle = ElementRef<typeof TaskCard>


/** 控制 & 顯示彩蛋 + 顯示折扣視窗 */
const MaxEasterEggBit = 0b111110
const DeviceRequiredImageList = [
  [ContentBgImage],
  [MobileNewpaper1, MobileNewpaper2, MobileNewpaper3], // mobile
  [TabletNewspaper1, TabletNewspaper2, TabletNewspaper3, MainImage, RewardTask, ], // tablet
  [PcNewspaper1, PcNewspaper2, PcNewspaper3, MainImage, RewardTask], // 1280 Desktop
  [PcNewspaper1_1_5x, PcNewspaper2_1_5x, PcNewspaper3_1_5x, MainImage, RewardTask] // 1920 Desktop
]

const MainPage: ForwardRefRenderFunction<MainPageHandle, BasePageProps> = ({ Header, LoadingPage }, forwardref) => {
  const [isReadyPage, setReadyPage] = useState<boolean>(false)
  const [easterEggBit, setEasterEggBit] = useState<number>(0)
  let [notDefined, isMobile, isTablet, isDesktop, isDesktop1920] = useCheckScreen([...deviceWidth, 1920])

  const [commonResources, mobileResoures, tabletResources, desktopResoures, biggerDesktopResources] = DeviceRequiredImageList
  const deivceResources = isDesktop ? desktopResoures : (
    isDesktop1920 ? biggerDesktopResources : (
      isTablet ? tabletResources : (
        isMobile ? mobileResoures : []
      )
    )
  )

  const { imagesPreloaded } = useImagePreloader([...commonResources, ...deivceResources])

  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const hexSchoolAnchorRef = useRef<HTMLDivElement>(null)
  const scheduleInfoAnchorRef = useRef<HTMLElement>(null)
  const scheduleInfoRef = useRef<ScheduleInfoHandle>(null)

  const ScrollMouseTopRef = useRef<HTMLDivElement>(null)
  const FullPageRef = useRef<HTMLDivElement>(null)
  const MainBannerRef = useRef<HTMLDivElement>(null)
  const MaskLv1Ref = useRef<NewsPaperHandle>(null)
  const MaskLv2Ref = useRef<NewsPaperHandle>(null)
  const MaskLv3Ref = useRef<NewsPaperHandle>(null)
  const VendettaRef = useRef<VendettaHandle>(null)
  const RewardTaskRef = useRef<HTMLImageElement>(null)

  const AwardInfoSectionRef = useRef<AwardInfoHandle>(null)
  const ScheduleTaskRefs = useRef<Array<TaskCardHandle>>([])

  ScheduleTaskRefs.current = []
  isDesktop = isDesktop || isDesktop1920

  useEffect(() => {
    if (anchor) {
      const y = anchor.getBoundingClientRect().top + window.pageYOffset - 10;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [anchor])

  useImperativeHandle(forwardref, () => {
    return {
      gotoHexSchoolAnchor(e: MouseEvent) {
        setAnchor(hexSchoolAnchorRef.current)
      },
      gotoScheduleInfoAnchor(e: MouseEvent) {
        setAnchor(scheduleInfoAnchorRef.current)
      }
    }
  }, [])

  const handleEasterEggBit = (e: MouseEvent) => {
    console.log(`handleEasterEggBit render`)
    const eggOffset = parseInt((e.currentTarget.getAttribute('data-egg-offset') ?? '0')) 
    setEasterEggBit((easterEggBit | 1 << eggOffset))
  }

  const appendDisplayEasterEggClassName = (eggOffset: number): string => {
    return !((easterEggBit & (1 << eggOffset)) > 0) ? 'opacity-100' : 'opacity-0'
  }

  /** testing scroll postion
  useEffect(() => {
    const handleScroll = (e: Event) => {
      console.log('window.scrollY', window.pageYOffset)
    }

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])
  */

  const addScheduleTaskRef = (ref: ElementRef<typeof TaskCard>) => {
    if (ref) {
      ScheduleTaskRefs.current.push(ref);
    }    
  }

  const initDesktopAnimations = () => {
    let animations: ReturnType<typeof gsap.context | typeof gsap.timeline | typeof gsap.fromTo>[] = []

    let mainVisualAnimations = gsap.timeline({
      scrollTrigger: {
        id: 'fullpin',
        trigger: MainBannerRef.current,
        scrub: true,
        pin: FullPageRef.current,
        pinSpacing: false 
      }
    })

    if (MaskLv1Ref.current && MaskLv2Ref.current && MaskLv3Ref.current && VendettaRef.current) {
      mainVisualAnimations = MaskLv2Ref.current.moveAnimation(mainVisualAnimations, { x: 0, y: 0 }, { x: 0, y: -230 }).to(
        ScrollMouseTopRef.current,
        { visibility: 'hidden' },
      )

      mainVisualAnimations = MaskLv2Ref.current.moveAnimation(mainVisualAnimations, { x: 0, y: -230 }, { x: 0, yPercent: '-100' }).fromTo(
        VendettaRef.current.getRef().current,
        { x: 314, y: 597 }, 
        { x: 314, y: 259 },
        "<"
      )
      mainVisualAnimations = MaskLv1Ref.current.moveAnimation(mainVisualAnimations, { x: 462, y: 287 }, { x: 462, yPercent: '40', opacity: 0 }, "<")
      mainVisualAnimations = MaskLv3Ref.current.moveAnimation(mainVisualAnimations, { x: -248, y: 261 }, { x: -248, y: 364 }, "<")
      
      mainVisualAnimations = MaskLv3Ref.current.moveAnimation(mainVisualAnimations, { x: -248, y: 364 }, { x: -248, y: 718, opacity: 0 }).to(
        VendettaRef.current.getRef().current,
        { x: 314, y: 36 },
        "<"
      ).fromTo(
        RewardTaskRef.current,
        { x: 856, y: -25, opacity: 0 },
        { x: 856, y: -25, opacity: 1 },
      )
    }
    animations.push(mainVisualAnimations)

    const cardTriggers = (ScheduleTaskRefs.current.map(
      (ref: ElementRef<typeof TaskCard>) => ref.getRef().current
    )) as gsap.DOMTarget[]

    const cardEffects: gsap.TweenVars[][] = [
      [{ xPercent: "-150"}, { xPercent: "0", duration: 0.3 }],
      [{ xPercent: "150" }, { xPercent: "0", duration: 0.3 }],
      [{ xPercent: "-150" }, { xPercent: "0", duration: 0.3 }],
    ]

    for (const [index, cardEffect] of cardEffects.entries()) {
      const [from, to] = cardEffect
      const el = cardTriggers[index]
      const animation = gsap.effects.timelineScroller(el, {
        start: "center center",
        id: `card_${index}`,
        once: true,
      }).fromTo(el, from, to)

      animations.push(animation)
    }

    if (AwardInfoSectionRef.current) {
      const awardEl = AwardInfoSectionRef.current
      const awardAnimationTrigger = awardEl.getSectionRef().current
      const rewardTrigger = [
        {
          el: awardEl.getTeamAwardRef().current,
          from: { yPercent: "-100", visibility: 'hidden' },
          to: { yPercent: "0", duration: 0.9, visibility: 'visible' },
          order: "<"
        },
        {
          el: awardEl.getPersonalAwardRef().current,
          from: { yPercent: "-100", visibility: 'hidden' },
          to: { yPercent: "0", duration: 0.6, visibility: 'visible' },
          order: "<"
        },
        {
          el: awardEl.getShortListAwardRef().current,
          from: { yPercent: "-100", visibility: 'hidden' },
          to: { yPercent: "0", duration: 0.3, visibility: 'visible' },
          order: "<"
        },
        {
          el: awardEl.getBottomTextRef().current,
          from: { opacity: 0 },
          to: { duration: 2, opacity: 1, delay: 2 },
          order: ""
        }
      ]

      const animation = gsap.effects.timelineScroller(awardAnimationTrigger, {
        id: `reward`,
        start: 'center center',
        once: true,
      })

      rewardTrigger.map(({ el, from, to, order }) => {
        animation.fromTo(el, from, to, order)
      })

      animations.push(animation)
    }

    return animations
  }

  const initTabletAnimations = () => {
    let animations: AnimationReturn[] = []
    let mainVisualAnimations = gsap.timeline({
      scrollTrigger: {
        id: 'fullpin',
        trigger: MainBannerRef.current,
        scrub: true,
        pin: FullPageRef.current,
      }
    })
    if (VendettaRef.current && MaskLv1Ref.current && MaskLv2Ref.current && MaskLv3Ref.current) {
      mainVisualAnimations = MaskLv2Ref.current.moveAnimation(mainVisualAnimations, { x: -144, y: 0 }, { x: -144, y: -200 })
      mainVisualAnimations = MaskLv3Ref.current.moveAnimation(mainVisualAnimations, { x: -343, y: 211 }, { x: -381, y: 431 }, "<")
      mainVisualAnimations = MaskLv1Ref.current.moveAnimation(mainVisualAnimations, { x: 230, y: 221 }, { x: 305, y: 598 }, "<")
        .fromTo(
          VendettaRef.current.getRef().current,
          { y: 974, opacity: 0 },
          { y: 721, opacity: 1 }
        ).fromTo(
          RewardTaskRef.current,
          { x: 408, y: -18, opacity: 0 },
          { x: 408, y: -18, opacity: 1 },
        )

      mainVisualAnimations = MaskLv2Ref.current.moveAnimation(mainVisualAnimations, { x: -144, y: -200 }, { x: -144, y: -480 })
      mainVisualAnimations = MaskLv1Ref.current.moveAnimation(mainVisualAnimations, { x: 305, y: 536 }, { x: 404, y: 918, opacity: 0 }, "<")
        .fromTo(
          VendettaRef.current.getRef().current,
          { y: 721, opacity: 1 },
          { y: 539 },
          "<"
      )

      mainVisualAnimations = MaskLv3Ref.current.moveAnimation(mainVisualAnimations, { x: -381, y: 431 }, { x: -669, y: 863, opacity: 0 })
        .fromTo(
          VendettaRef.current.getRef().current,
          { y: 539 },
          { y: 337 },
          "<"
      ).to(
        ScrollMouseTopRef.current,
        { visibility: 'hidden' },
      )

      animations.push(mainVisualAnimations)
    }

    let cardTriggers = (ScheduleTaskRefs.current.map(
      (ref: ElementRef<typeof TaskCard>) => ref.getRef().current
    )) as gsap.DOMTarget[]
    cardTriggers.splice(0, 0, hexSchoolAnchorRef.current)

    const cardEffects: gsap.TweenVars[][] = [
      [{ xPercent: "-150"}, { xPercent: "0", duration: 0.3 }],
      [{ xPercent: "150" }, { xPercent: "0", duration: 0.3 }],
      [{ xPercent: "-150" }, { xPercent: "0", duration: 0.3 }],
      [{ xPercent: "150" }, { xPercent: "0", duration: 0.3 }],
    ]

    for (const [index, cardEffect] of cardEffects.entries()) {
      const [from, to] = cardEffect
      const el = cardTriggers[index]
      const animation = gsap.effects.timelineScroller(el, {
        start: "center+=1024 center",
        id: `card_${index}`,
      }).fromTo(el, from, to)

      animations.push(animation)
    }

    if (scheduleInfoAnchorRef.current && scheduleInfoRef.current) {
      const scheduleInfoSectionElement = scheduleInfoRef.current
      let scheduleInfoSilder = gsap.effects.timelineScroller(scheduleInfoAnchorRef.current, {
        id: `schedule_info`,
        pin: FullPageRef.current,
        start: 'center+=1070 center',
        end: `+=400`,
        scrub: true,
      })
      scheduleInfoSilder = scheduleInfoSectionElement.movePointAnimation(scheduleInfoSilder)
    }

    if (AwardInfoSectionRef.current) {
      const awardEl = AwardInfoSectionRef.current
      const awardAnimationTrigger = awardEl.getSectionRef().current
      const rewardTrigger = [
        {
          el: awardEl.getTeamAwardRef().current,
          from: { yPercent: "-100", visibility: 'hidden' },
          to: { yPercent: "0", duration: 0.9, visibility: 'visible' },
          order: "<"
        },
        {
          el: awardEl.getPersonalAwardRef().current,
          from: { yPercent: "-100", visibility: 'hidden' },
          to: { yPercent: "0", duration: 0.6, visibility: 'visible' },
          order: "<"
        },
        {
          el: awardEl.getShortListAwardRef().current,
          from: { yPercent: "-100", visibility: 'hidden' },
          to: { yPercent: "0", duration: 0.3, visibility: 'visible' },
          order: "<"
        },
        {
          el: awardEl.getBottomTextRef().current,
          from: { opacity: 0 },
          to: { duration: 2, opacity: 1, delay: 2 },
          order: ""
        }
      ]

      const animation = gsap.effects.timelineScroller(awardAnimationTrigger, {
        id: `reward`,
        start: 'center+=1350 center',
        once: true
      })

      rewardTrigger.map(({ el, from, to, order }) => {
        animation.fromTo(el, from, to, order)
      })
    }

    return animations
  }

  const initMobileAnimations = () => {
    let animations: AnimationReturn[] = []
    let mainVisualAnimations = gsap.timeline({
      scrollTrigger: {
        id: 'fullpin',
        trigger: MainBannerRef.current,
        scrub: true,
        pin: FullPageRef.current,
      }
    })

    if (VendettaRef.current && MaskLv1Ref.current && MaskLv2Ref.current && MaskLv3Ref.current) {
      mainVisualAnimations = MaskLv2Ref.current.moveAnimation(mainVisualAnimations, { x: -150, y: -5 }, { x: -150, y: -140 })
      mainVisualAnimations = MaskLv3Ref.current.moveAnimation(mainVisualAnimations, { x: -283, y: 135 }, { x: -345, y: 248 }, "<")
      mainVisualAnimations = MaskLv1Ref.current.moveAnimation(mainVisualAnimations, { x: 96, y: 147 }, { x: 96, y: 318 }, "<")
        .fromTo(
          VendettaRef.current.getRef().current,
          { y: 683, opacity: 0 },
          { y: 464, opacity: 1 }
        )

      mainVisualAnimations = MaskLv3Ref.current.moveAnimation(mainVisualAnimations, { x: -345, y: 248 }, { x: -365, y: 413})
      mainVisualAnimations = MaskLv2Ref.current.moveAnimation(mainVisualAnimations, { x: -150, y: -140 }, { x: -150, y: -330, visibility: 'hidden'}, "<")
      mainVisualAnimations = MaskLv1Ref.current.moveAnimation(mainVisualAnimations, { x: 96, y: 318 }, { x: 96, y: 616, visibility: 'hidden' }, "<")
        .fromTo(
          VendettaRef.current.getRef().current,
          { y: 464, opacity: 1 },
          { y: 331, opacity: 1 },
          "<"
        ).to(
          ScrollMouseTopRef.current,
          { visibility: 'hidden' },
          "<"
        )

      mainVisualAnimations = MaskLv3Ref.current.moveAnimation(
        mainVisualAnimations,
        { x: -365, y: 413 },
        { x: -375, y: 667, visibility: 'hidden' }
      ).fromTo(
        VendettaRef.current.getRef().current,
        { y: 331 },
        { y: 125 },
        "<"
      )

      animations.push(mainVisualAnimations)
    }

    let cardTriggers = (ScheduleTaskRefs.current.map(
      (ref: ElementRef<typeof TaskCard>) => ref.getRef().current
    )) as gsap.DOMTarget[]

    const cardEffects: gsap.TweenVars[][] = [
      [{ xPercent: "-110"}, { xPercent: "0", duration: 0.3 }],
      [{ xPercent: "110" }, { xPercent: "0", duration: 0.3 }],
      [{ xPercent: "-110" }, { xPercent: "0", duration: 0.3 }],
    ]

    for (const [index, cardEffect] of cardEffects.entries()) {
      const [from, to] = cardEffect
      const el = cardTriggers[index]
      const animation = gsap.effects.timelineScroller(el, {
        start: "center+=800 center",
        id: `card_${index}`,
      }).fromTo(el, from, to)

      animations.push(animation)
    }

    if (scheduleInfoAnchorRef.current && scheduleInfoRef.current) {
      const scheduleInfoSectionElement = scheduleInfoRef.current
      let scheduleInfoSilder = gsap.effects.timelineScroller(scheduleInfoAnchorRef.current, {
        id: `schedule_info`,
        pin: FullPageRef.current,
        start: 'center+=1000 center',
        end: `+=800`,
        scrub: true
      })
      scheduleInfoSilder = scheduleInfoSectionElement.movePointAnimation(scheduleInfoSilder)
    }

    if (AwardInfoSectionRef.current) {
      const awardEl = AwardInfoSectionRef.current
      const awardAnimationTrigger = awardEl.getSectionRef().current
      const rewardTrigger = [
        {
          el: awardEl.getTeamAwardRef().current,
          from: { yPercent: "-100", visibility: 'hidden' },
          to: { yPercent: "0", duration: 0.9, visibility: 'visible' },
          order: "<"
        },
        {
          el: awardEl.getPersonalAwardRef().current,
          from: { yPercent: "-100", visibility: 'hidden' },
          to: { yPercent: "0", duration: 0.6, visibility: 'visible' },
          order: "<"
        },
        {
          el: awardEl.getShortListAwardRef().current,
          from: { yPercent: "-100", visibility: 'hidden' },
          to: { yPercent: "0", duration: 0.3, visibility: 'visible' },
          order: "<"
        },
        {
          el: awardEl.getBottomTextRef().current,
          from: { opacity: 0 },
          to: { duration: 2, opacity: 1, delay: 2 },
          order: ""
        }
      ]

      const animation = gsap.effects.timelineScroller(awardAnimationTrigger, {
        id: `reward`,
        start: 'center+=1187 center',
        once: true
      })

      rewardTrigger.map(({ el, from, to, order }) => {
        animation.fromTo(el, from, to, order)
      })
    }

    return animations
  }

  useEffect(() => {
    console.log(`MainPage useEffect dep: [imagePreloaded]`)
    if (imagesPreloaded) {
      setReadyPage(true)
    }
  }, [imagesPreloaded])

  useEffect(() => {
    console.log(`MainPage useEffect dep: [isReadyPage]`)
    let animations: AnimationReturn[] = []
    
    if (isReadyPage) {
      if (isDesktop) {
        animations = initDesktopAnimations()
      } else if (isMobile) {
        animations = initMobileAnimations()
      } else if (isTablet) {
        animations = initTabletAnimations()
      }
    }

    return () => {
      animations.map((animation) => animation.revert())
    }
  }, [isReadyPage])

  useLayoutEffect(() => {
    console.log(`MainPage useLayoutEffect`)
    let animations: AnimationReturn[] = []
    
    if (isReadyPage) {
      if (isDesktop) {
        animations = initDesktopAnimations()
      } else if (isMobile) {
        animations = initMobileAnimations()
      } else if (isTablet) {
        animations = initTabletAnimations()
      }
    }

    return () => {
      animations.map((animation) => animation.revert())
    }
  }, [])


  if ((!isReadyPage || !imagesPreloaded) && LoadingPage) {
    return <>{LoadingPage}</>
  }

  console.log(`MainPage render`)

  return (
    <>
      {/** postion:fixed element */ ''}
      { isReadyPage ? (Header ?? '') : '' }

      <div className={flatClassName({
        common: `fixed w-fit h-fit m-auto inset-0 z-10 ${easterEggBit === MaxEasterEggBit ? 'opacity-100': 'translate-x-[-100vw] opacity-0'}`,
      })}>
        <div className={flatClassName({
          common: `flex items-center justify-center font-sans font-normal text-[#38241B] m-auto bg-white`,
          desktop: `xl:w-[527px] xl:h-[310px]`,
          tablet: `md:w-[420px] md:h-[230px]`,
          mobile: `sm:w-[300px] sm:h-[150px]`
        })}>
          <div className={flatClassName({
            common: `whitespace-pre-line flex flex-col items-center justify-center`,
            desktop: `xl:leading-[55px] xl:text-[25px] xl:w-[420px] xl:h-[104px]`,
            tablet: `md:leading-[55px] md:text-[22px] md:w-[370px] xl:h-[104px]`,
            mobile: `sm:leading-[55px] sm:text-[16px]`
          })}>{'恭喜您！獲得六角課程專屬折扣碼\n'}
            <span className={flatClassName({
              common: `font-sans font-bold text-[#951205]`,
              desktop: `xl:leading-[55px] xl:text-[40px]`,
              tablet: `md:leading-[55px] md:text-[20px]`,
              mobile: ``
            })}>【HEXSCHOOL2022】</span>
        </div>
        <div 
          onClick={handleEasterEggBit}
          className={flatClassName({
            common: `absolute bg-[#38241B] top-0 right-0 flex items-center justify-center rounded-[50px] `,
            desktop: `xl:w-[72px] xl:h-[72px] xl:translate-x-[36px] xl:translate-y-[-36px]`,
            tablet: `md:w-[36px] md:h-[36px] md:translate-x-[18px] md:translate-y-[-18px]`,
            mobile: `sm:w-[30px] sm:h-[30px] sm:translate-x-[15px] sm:translate-y-[-15px]`
          })}
          data-egg-offset={0}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.0418 12.9994L24.4553 6.58506C25.8482 5.19188 25.8482 2.93807 24.4553 1.54489C23.0623 0.151705 20.804 0.151705 19.411 1.54489L12.9976 7.95447L6.58895 1.54489C5.19597 0.151705 2.93772 0.151705 1.54474 1.54489C0.151754 2.93807 0.151754 5.19188 1.54474 6.58506L7.95816 12.9994L1.54474 19.4137C0.151754 20.8069 0.151754 23.0607 1.54474 24.4539C2.24361 25.1529 3.15641 25.5 4.06922 25.5C4.97728 25.5 5.89008 25.1529 6.58895 24.4539L12.9976 18.0443L19.411 24.4539C20.1099 25.1529 21.018 25.5 21.9308 25.5C22.8436 25.5 23.7564 25.1529 24.4553 24.4539C25.8482 23.0607 25.8482 20.8069 24.4553 19.4137L18.0418 12.9994Z" fill="white"/>
          </svg>
        </div>
        </div>
      </div>
      {
        [
          {
            ref: MaskLv1Ref,
            aliasName: "newspaper1",
            mediaImages: [
              {
                minWidth: 1920,
                imageSrc: PcNewspaper1_1_5x
              },
              {
                minWidth: 1280,
                imageSrc: PcNewspaper1
              },
              {
                minWidth: 768,
                imageSrc: TabletNewspaper1
              },
              {
                minWidth: 375,
                imageSrc: MobileNewpaper1
              }
            ],
            imageElementProps: {
              src: TabletNewspaper1,
              className: 'w-full h-full object-cover',
              srcSet: `${MobileNewpaper1} 375w, ${TabletNewspaper1} 750w, ${PcNewspaper1} 1280w, ${PcNewspaper1_1_5x} 1920w`,
              sizes: `(min-width:375px) 650px, (min-width: 768px) 983px, (min-width: 1280px) 1218px`
            },
            className: flatClassName({
              common: `fixed z-10`,
              desktop: `xl:translate-x-[462px] xl:translate-y-[287px] ${pcStyles.masklv1}`,
              tablet: `md:translate-x-[230px] md:translate-y-[169px] ${tabletStyles.masklv1}`,
              mobile: `sm:translate-x-[96px] sm:translate-y-[616px] ${mobileStyles.masklv1}`
            })
          },
          {
            ref: MaskLv2Ref,
            aliasName: "newspaper2",
            mediaImages: [
              {
                minWidth: 1920,
                imageSrc: PcNewspaper2_1_5x
              },
              {
                minWidth: 1280,
                imageSrc: PcNewspaper2
              },
              {
                minWidth: 768,
                imageSrc: TabletNewspaper2
              },
              {
                minWidth: 375,
                imageSrc: MobileNewpaper2
              }
            ],
            imageElementProps: {
              src: TabletNewspaper2,
              className: 'w-full h-full object-cover',
              srcSet: `${MobileNewpaper2} 375w, ${TabletNewspaper2} 750w, ${PcNewspaper2} 1280w, ${PcNewspaper2_1_5x} 1920w`,
              sizes: `(min-width:375px) 683px, (min-width: 768px) 768px, (min-width: 1280px) 1280px, (min-width: 1920px) 1920px`
            },
            className: flatClassName({
              common: `fixed z-10`,
              desktop: `xl:translate-x-0 xl:translate-y-0 ${pcStyles.masklv2}`,
              tablet: `md:translate-x-[-144px] md:translate-y-[-62px] ${tabletStyles.masklv2}`,
              mobile: `sm:translate-x-[-150px] sm:translate-y-[-330px] ${mobileStyles.masklv2}`
            })
          },
          {
            ref: MaskLv3Ref,
            aliasName: "newspaper3",
            mediaImages: [
              {
                minWidth: 1920,
                imageSrc: PcNewspaper3_1_5x
              },
              {
                minWidth: 1280,
                imageSrc: PcNewspaper3
              },
              {
                minWidth: 768,
                imageSrc: TabletNewspaper3
              },
              {
                minWidth: 375,
                imageSrc: MobileNewpaper3
              }
            ],
            imageElementProps: {
              src: TabletNewspaper3,
              className: 'w-full h-full object-cover',
              srcSet: `${MobileNewpaper3} 375w, ${TabletNewspaper3} 750w, ${PcNewspaper3} 1280w, ${PcNewspaper3_1_5x} 1920w`,
              sizes: `(min-width:375px) 503px, (min-width: 768px) 760px, (min-width: 1280px) 942px`
            },
            className: flatClassName({
              common: `fixed z-10`,
              desktop: `xl:translate-x-[-248px] xl:translate-y-[261px] ${pcStyles.masklv3}`,
              tablet: `md:translate-x-[-343px] md:translate-y-[149px] ${tabletStyles.masklv3}`,
              mobile: `sm:translate-x-[-337px] sm:translate-y-[667px] ${mobileStyles.masklv3}`
            })
          }
        ].map((props, index: number) => (
          <NewsPaperMask {...props} key={`mask-${index}`} />
        ))
      }

      <div ref={ScrollMouseTopRef} className={flatClassName({
        common: `fixed z-10 w-fit h-fit left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]`,
      })}>
        <Suspense fallback={(<div>loading...</div>)}>
          <ScrollMouseIcon className={`w-fit h-fit absolute flex justify-center`}  />
        </Suspense>
      </div>

      { isReadyPage ? '': LoadingPage }
      
      <div ref={FullPageRef}>  
        <div
          style={isMobile ? {} : {
            backgroundImage: `url(${MainImage })`
          }}
          className={
            flatClassName({
              common: `flex bg-no-repeat bg-cover`,
              desktop: ['xl:h-[720px]'],
              tablet: ['md:h-[1024px]'],
              mobile: ['sm:h-[938px]']
            })
          }
          ref={MainBannerRef}
        >
          <MainBanner
            className={
              flatClassName({
                common: `inset-0 mx-auto`,
                desktop: ['xl:mt-[101px]', 'xl:mb-[22px]'],
                tablet: ['md:mt-[91px]', 'md:mb-[32px]'],
                mobile: ['sm:mt-[74px]']
              })
            }
            BannerImage={<Vendetta className={flatClassName({
              tablet: `md:left-0 md:right-0 md:mx-auto`,
              mobile: ``
            })} ref={VendettaRef} />}
            RewardTaskImage={
              isMobile ? '' : (
                <img
                  ref={RewardTaskRef}
                  src={RewardTask}
                  className={
                    flatClassName({
                      common: `absolute object-contain`,
                      desktop: ['xl:w-[373px]', 'xl:h-[225px]'],
                      tablet: ['md:w-[331.44px]', 'md:h-[200.29px]'],
                    })
                  }
                />
              )
            }
          />
        </div>

        <div
          style={{
            backgroundImage: `url(${ContentBgImage})`
          }}
          className={flatClassName({
            common: `bg-no-repeat bg-center bg-cover flex flex-col items-center relative  `,
            desktop: `xl:h-[6535px]`,
            tablet: `md:h-[5135px]`,
            mobile: `sm:h-[7461px]`
          })}
        >
          <div className={flatClassName({
            desktop: `xl:mb-[175px] xl:h-[2328px]`,
            tablet: `md:mt-[60px] md:mb-[103.98px] md:h-[1127.02px] `,
            mobile: `sm:mb-[85.98px] sm:mt-[45px] sm:h-[2002.02px]`,
          })}>
            <div className={flatClassName({
              common: `grid`,
              desktop: `xl:grid-cols-1 xl:gap-y-[42px] xl:w-[1200px] xl:h-[2328px]`,
              tablet: `md:grid-cols-2 md:gap-[22px] md:w-[712px] md:h-[1126px]`,
              mobile: `sm:grid-cols-1 sm:w-[343px] sm:h-[2002.02px] sm:content-start`
            })}>
              <div className={flatClassName({
                common: `relative flex flex-wrap items-ceneter justify-center`,
                desktop: `xl:w-[1200px] xl:h-[386px] xl:mb-[57px]`,
                tablet: `md:w-[343px] md:h-[552px]`,
                mobile: `sm:w-[338px] sm:h-[231px] sm:mb-[7.02px]`
              })} ref={hexSchoolAnchorRef}>
                <Suspense fallback={(<div>loading...</div>)}>
                  <HostInfo />
                </Suspense>
              </div>
              {
                Tasks.map(({
                  title, subtitle, content, tipUrl, contributeUrl,
                  TaskLogo,
                  EnterpriseLogo
                }: TaskType, index: number) => {
                  const props = {
                    className: flatClassName({
                      desktop: `xl:w-[1200px] xl:h-[528px]`,
                      tablet: `md:w-[343.03px] md:h-[552.02px]`,
                      mobile: `sm:w-[343.03px] sm:h-[552.02px] sm:mt-[35.98px]`
                    }),
                    title: title,
                    subtitle: subtitle,
                    content: content, 
                    EnterpriseLogo: EnterpriseLogo,
                    TaskLogo: TaskLogo,
                    forwardTips: () => {
                      window.open(tipUrl, "_blank")
                    },
                    forwardContribute: () => {
                      window.open(contributeUrl, "_blank")
                    }
                  }
                  return <TaskCard {...props} key={`task-grid-${index}`} ref={addScheduleTaskRef} />
                })
              }
            </div>
            <div
              className={flatClassName({
                common: `${appendDisplayEasterEggClassName(1)} relative w-fit  h-fit`,
                desktop: `xl:translate-x-[-29.4px] xl:translate-y-[19.21px]`,
                tablet: `md:translate-x-[-27.4px] md:translate-y-[20px]`,
                mobile: ``
              })}
              onClick={handleEasterEggBit}
              data-egg-offset={1}
            >
              <svg width="52" height="56" viewBox="0 0 52 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.3277 18.4826C16.8383 20.9163 16.7976 23.3058 16.2063 25.6897L16.2083 25.6954C15.7512 30.2328 11.8572 34.5053 11.0233 39.0724C10.5296 41.7509 11.2839 44.0341 12.1945 45.6811L13.3134 47.2418C13.4495 47.4261 13.5855 47.6104 13.731 47.785C13.8671 47.8596 23.3725 53.1204 32.1672 40.6443C41.0277 28.0803 41.0406 12.5211 36.7807 6.72514C33.9427 4.17071 29.958 2.95695 25.9362 3.79579C19.2275 5.1959 14.9256 11.7682 16.3277 18.4826Z" fill="#CEA809"/>
                <path d="M32.1707 40.6361C23.376 53.1123 13.8706 47.8514 13.7345 47.7768C18.7273 53.9853 28.385 53.7902 33.0559 47.1845C33.1086 47.1142 33.1592 47.0383 33.2119 46.9681C40.4821 36.5726 43.0458 24.9665 40.6265 13.3961C40.509 12.8438 40.3591 12.3094 40.1767 11.7929C39.4717 9.79571 38.2883 8.07065 36.7842 6.71698C41.0441 12.5129 41.0255 28.0742 32.1707 40.6361Z" fill="#AA8900"/>
              </svg>
            </div>
          </div>

          <section className={flatClassName({
            common: `w-full`,
            desktop: `xl:h-[1040px]`,
            tablet: `md:h-[731px]`,
            mobile: ``
          })} ref={scheduleInfoAnchorRef}>
            <ScheduleInfo ref={scheduleInfoRef}>
              <div
                className={flatClassName({
                  common: `${appendDisplayEasterEggClassName(2)} absolute top-0 left-0 w-fit  h-fit`,
                  desktop: `xl:translate-x-[904px] xl:translate-y-[264px]`,
                  tablet: `md:translate-x-[500px] md:translate-y-[264px]`,
                  mobile: ``
                })}
                onClick={handleEasterEggBit}
                data-egg-offset={2}
              >
                <svg width="51" height="56" viewBox="0 0 51 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.816 17.953C16.2747 20.397 16.1833 22.7852 15.5414 25.1559L15.5433 25.1617C14.9898 29.6883 11.006 33.8771 10.0752 38.4254C9.52461 41.0929 10.2302 43.3915 11.1056 45.0576L12.1911 46.6417C12.3232 46.8288 12.4554 47.016 12.5971 47.1936C12.7316 47.2711 22.123 52.7328 31.1809 40.4463C40.3064 28.0735 40.6499 12.5181 36.5142 6.6329C33.7312 4.01873 29.7731 2.72056 25.7344 3.47374C18.9975 4.73095 14.5569 11.2103 15.816 17.953Z" fill="#0A4891"/>
                  <path d="M31.1853 40.4381C22.1275 52.7245 12.736 47.2628 12.6016 47.1853C17.4613 53.4985 27.1209 53.5087 31.9312 47.0038C31.9853 46.9347 32.0376 46.8598 32.0917 46.7907C39.5812 36.5521 42.391 25.0031 40.2182 13.384C40.1124 12.8293 39.9739 12.2918 39.8026 11.7715C39.1401 9.75981 37.9937 8.00999 36.5187 6.62466C40.6544 12.5098 40.3051 28.0672 31.1853 40.4381Z" fill="#05396D"/>
                </svg>
              </div>
              <div
                className={flatClassName({
                  common: `${appendDisplayEasterEggClassName(3)} absolute top-0 left-0 w-fit  h-fit `,
                  desktop: `xl:translate-x-[1135px] xl:translate-y-[702.58px]`,
                  tablet: `md:translate-x-[620px] md:translate-y-[430px]`,
                  mobile:`sm:translate-x-[310px] sm:translate-y-[280px]`
                })}
                onClick={handleEasterEggBit}
                data-egg-offset={3}
              >
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.7925 42.3084C26.8383 40.8947 29.0569 40.0064 31.4836 39.6279L31.4881 39.6238C35.8482 38.2872 41.2957 40.2214 45.8292 39.2206C48.4898 38.6379 50.3023 37.0579 51.4679 35.5802L52.4731 33.944C52.5903 33.7472 52.7075 33.5503 52.812 33.3485C52.828 33.1942 53.9949 22.3929 39.0857 19.1193C24.0701 15.8191 9.72127 21.836 6.02862 28.0088C4.77337 31.6149 5.19839 35.7586 7.53 39.1412C11.4201 44.7833 19.1459 46.2026 24.7925 42.3084Z" fill="#064928"/>
                  <path d="M39.0763 19.1192C53.9855 22.3927 52.8187 33.194 52.8026 33.3484C56.5915 26.34 52.6738 17.5169 44.7701 15.7658C44.685 15.7445 44.5953 15.7272 44.5102 15.7059C32.1098 13.0315 20.417 15.1651 10.6879 21.8785C10.2242 22.2008 9.78967 22.5461 9.38415 22.9144C7.81615 24.3382 6.68437 26.0975 6.01923 28.0086C9.71188 21.8358 24.0648 15.8234 39.0763 19.1192Z" fill="#0A3820"/>
                </svg>
              </div>
            </ScheduleInfo>
          </section>

          <AwardInfo ref={AwardInfoSectionRef}></AwardInfo>

          <section className={flatClassName({
            common: `w-full relative`,
            desktop: `xl:h-[1825px]`,
            tablet: `md:h-[1216.52px]`,
            mobile: `sm:h-[2203px]`
          })}>
            <Suspense fallback={<div>loading...</div>}>
              <LiveShareVideo>
                <div
                  className={flatClassName({
                    common: `${appendDisplayEasterEggClassName(4)} mx-auto absolute top-0 inset-x-0 w-fit  h-fit`,
                    desktop: `xl:translate-x-[-562px] xl:translate-y-[973.42px]`,
                    tablet: `md:translate-x-[-333px] md:translate-y-[630px]`,
                    mobile: `sm:translate-x-[100px] sm:translate-y-[60px]`
                  })}
                  onClick={handleEasterEggBit}
                  data-egg-offset={4}
                >
                  <svg width="59" height="60" viewBox="0 0 59 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.0828 16.7714C31.1877 18.3816 29.0685 19.4861 26.6914 20.1041L26.6873 20.1087C22.4818 21.8723 16.8689 20.4894 12.4575 21.9361C9.86801 22.7805 8.22163 24.5329 7.20878 26.1192L6.37128 27.8473C6.27424 28.0548 6.1772 28.2623 6.09327 28.4735C6.09265 28.6287 6.00576 39.4925 21.1666 41.267C36.4361 43.0575 50.1153 35.6435 53.1758 29.1341C54.0662 25.421 53.2311 21.3401 50.5747 18.2062C46.1427 12.9789 38.3141 12.3349 33.0828 16.7714Z" fill="#603813"/>
                    <path d="M21.1751 41.2667C6.01426 39.4921 6.10113 28.6283 6.10176 28.4732C3.02861 35.8236 7.80895 44.2174 15.843 45.1697C15.9299 45.1825 16.0208 45.1907 16.1077 45.2035C28.7125 46.6314 40.1352 43.3455 49.1484 35.6977C49.5777 35.3309 49.9758 34.9441 50.3426 34.5374C51.7613 32.9647 52.7125 31.1015 53.1842 29.1337C50.1238 35.6432 36.44 43.0532 21.1751 41.2667Z" fill="#42210B"/>
                  </svg>
                </div>
              </LiveShareVideo>
            </Suspense>
          </section>

          <div className={flatClassName({
            common: `bg-white w-full`,
            desktop: `xl:h-[96px]`,
            tablet: `md:h-[192px]`,
            mobile: `sm:h-[384px] sm:bg-white`
          })}>
            <Suspense fallback={(<div>loading...</div>)}>
              <PartnerInfo></PartnerInfo>
            </Suspense>
          </div>
          
          <div className={`w-full relative sm:h-[543px] md:h-[543px] xl:h-[366px] bg-[#3C221B]`}>
            <div className={flatClassName({
              desktop: `xl:mt-[60px] xl:mb-[36px]`,
              tablet: `md:mt-[52px] md:mb-[50px]`,
              mobile: `sm:mt-[52px] sm:mb-[50px]`
            })}>
              <Suspense fallback={(<div>loading...</div>)}>
                <SponerInfo></SponerInfo>
              </Suspense>
            </div>
            <div className={`xl:mb-[8px]`}>
              <Suspense fallback={(<div>loading...</div>)}>
                <Footer></Footer>
              </Suspense>
            </div>
            <div
              onClick={handleEasterEggBit}
              className={flatClassName({
                common: `${appendDisplayEasterEggClassName(5)} absolute w-fit  h-fit  top-0 inset-x-0 mx-auto`,
                desktop: `xl:translate-y-[64px] xl:translate-x-[458.91px]`,
                tablet: `md:translate-y-[64px] md:translate-x-[230px]`,
                mobile: `sm:translate-y-[128px] sm:translate-y-[-100px]`
              })}
              data-egg-offset={5}
            >
              <svg width="46" height="38" viewBox="0 0 46 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34.8607 13.1082C32.3958 12.7795 30.1561 11.9457 28.1051 10.5946H28.099C23.9726 8.65313 21.2399 3.55903 17.2109 1.25238C14.8495 -0.104833 12.4454 -0.153522 10.5892 0.156872L8.74506 0.692452C8.52596 0.7594 8.30686 0.826347 8.09385 0.905467C7.97821 1.00893 -0.146796 8.22101 8.69029 20.6672C17.5882 33.2046 32.2558 38.3961 39.1393 36.3086C42.4927 34.4827 44.9637 31.1293 45.5115 27.0576C46.4244 20.2655 41.6589 14.0211 34.8607 13.1082Z" fill="#AD0C18"/>
                <path d="M8.69586 20.6733C-0.141221 8.22108 7.98378 1.009 8.09942 0.911621C0.583028 3.55301 -2.44787 12.7248 2.22629 19.3283C2.27498 19.4013 2.32976 19.4744 2.37844 19.5474C9.76094 29.8634 19.8518 36.1443 31.5676 37.7145C32.1275 37.7876 32.6814 37.8241 33.2291 37.8241C35.3471 37.8241 37.3677 37.2824 39.1448 36.3147C32.2614 38.4023 17.5938 33.2047 8.69586 20.6733Z" fill="#870818"/>
              </svg>
            </div>
          </div>

        </div>
      </div>
      
    </>
  );
}

export default forwardRef(MainPage);
