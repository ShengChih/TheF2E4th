import {
  useRef, useState, useEffect, useLayoutEffect,
  useCallback, ElementRef, MouseEvent
} from "react"
import { gsap } from "gsap"

import { px2mapping } from "@utils/converter"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import pcStyles from "./styles/fullpage/pc.module.scss"
import mobileStyles from "./styles/fullpage/mobile.module.scss"
import tabletStyles from "./styles/fullpage/tablet.module.scss"

import ScrollMouseIcon from "@components/ScrollMouseIcon"
import MainBanner from "@components/MainBanner"
import Header from '@components/Header'
import HostInfo from "@components/HostInfo"
import ScheduleTask from "@components/ScheduleTask"
import TaskCard from "@components/TaskCard"
import { TaskType, Tasks } from "@components/TaskCard/constants"
import ScheduleInfo from "@components/ScheduleInfo"
import AwardInfo from "@components/AwardInfo"
import LiveShareVideo from "@components/LiveShareVideo"
import SponerInfo from "@components/SponerInfo"
import PartnerInfo from "@components/PartnerInfo"
import Footer from "@components/Footer"
import Vendetta from '@components/Vendetta'

import MainImage from './images/BannerBgImage.svg'
import RightBottomMasklv1 from './images/RightBottomMasklv1@1x.png'
import TopMasklv2 from './images/TopMasklv2@1x.png'
import LeftBottomMasklv3 from './images/LeftBottomMasklv3@1x.png'
import RewardTask from './images/reward_task.svg'
import ContentBgImage from './images/ContentBgImage.svg'

//const RightBottomMasklv1 = ''
//const TopMasklv2 = ''
//const LeftBottomMasklv3 = ''
//const RewardTask = ''



type VendettaHandle = ElementRef<typeof Vendetta>
type AwardInfoHandle = ElementRef<typeof AwardInfo>

const MaxEasterEgg = 5

function MainPage() {
  gsap.registerPlugin(ScrollTrigger)

  const [isDisplayDiscount, setDisplayDiscount] = useState<boolean>(false)
  const [easterEggCount, setEasterEggCount] = useState<number>(0)
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const hexSchoolAnchorRef = useRef<HTMLDivElement>(null)
  const scheduleInfoAnchorRef = useRef<HTMLElement>(null)

  const ScrollMouseTopRef = useRef<HTMLDivElement>(null)
  const MainBannerRef = useRef<HTMLDivElement>(null)
	const MaskLv1Ref = useRef<HTMLDivElement>(null)
	const MaskLv2Ref = useRef<HTMLDivElement>(null)
	const MaskLv3Ref = useRef<HTMLDivElement>(null)
	const VendettaRef = useRef<VendettaHandle>(null)
  const RewardTaskRef = useRef<HTMLImageElement>(null)

  const AwardInfoSectionRef = useRef<AwardInfoHandle>(null)
  const ScheduleTaskRefs = useRef<Array<ElementRef<typeof TaskCard>>>([])

  ScheduleTaskRefs.current = []

  useEffect(() => {
    if (anchor) {
      const y = anchor.getBoundingClientRect().top + window.pageYOffset - 10;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [anchor])

  useEffect(() => {
    if (easterEggCount === MaxEasterEgg) {
      setDisplayDiscount(true)
    }
  }, [easterEggCount])

  const handleCloseDiscount = (e: MouseEvent) => {
    setDisplayDiscount(false)
  }

  const handleEasterEggCount = (e: MouseEvent) => {
    setEasterEggCount(easterEggCount + 1)
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

  const gotoHexSchoolAnchor = (e: MouseEvent) => {
    setAnchor(hexSchoolAnchorRef.current)
  }

  const gotoScheduleInfoAnchor = (e: MouseEvent) => {
    setAnchor(scheduleInfoAnchorRef.current)
  }

  useLayoutEffect(() => {
    /**
     * [實作想法]:
     * 
     * 用不用 pin 在於 pin 會對 trigger DOM 加上 postion: fixed
     * 如果 trigger selector 是目標本身而不是 container，
     * 且我的圖片起始位置是相對於 container 位置，那麼要注意位置會錯。
     * 
     * 另外設計圖是前景動畫移動，不是背景動畫移動
     * 目前只想到的實作是：
     * 因此一開始先對 Banner fixed
     * 之後滾動完這一頁動畫後，Banner 要可以被下一頁滾動
     * 1. 需要將 Banner 變成從 fixed 變回 relative 之類 ? (可能會突然位置跳動很大？)
     * 2. 偽裝自己滾動，一樣 fixed 只是位置變動假裝滾動 ？ (這可能比較好做)
     * 
     * 嗯~ 又想到一個更好的做法，用 pin 的話：
     * 塞一頁空白 100% 的頁面，空白頁用來滾動動畫，讓 scroll trigger 自動將 header & banner fixed 起來
     * 進來 pin 的機制，會把 fixed 拿掉，自然就被第二頁滾走?
     * (這好像比較好，跟上面 1. 方法差在要自己手動處理，scroll 結束的 callback 不用自己寫 function)
     * */

    /** 讓第一頁的空白頁滾動，置頂第二頁 */
    let animations: ReturnType<typeof gsap.context | typeof gsap.timeline | typeof gsap.fromTo>[]  = []

    animations.push(
      gsap.context(() => {
        /** 置頂 Banner 後，滾動動畫效果 */
        ScrollTrigger.create({
          trigger: MainBannerRef.current,
          scrub: true,
          start: `top top`, /** 滾動軸還未滾之前就要將 banner 透過 pin fixed 起來，滾動才不會滾到 banner，因此填 0 */
          end: `+=948`,//`+=948`, /** 滾完第一頁動畫，要很順接第二頁，230 + 364 + 354 */
          pin: true,
          //markers: true,
          //onLeave: ({ start, end, progress, direction, isActive }) => {
          //  console.log('onLeave pin:', start, end, progress, direction, isActive)
          //}
        })
      }, MainBannerRef)
    )

    /**
     * 先移上方圖 往 y 方向 -230px，滾動軸也卷動 1:1 的 230px
     * 
     * 移動 px 跟滾動 px 1:1 好處理，不用映射距離範圍
     * 若要映射或裝置要算，可用 gsap.mapRanges 映射，就是滾動 1px 圖要移動多少 px 概念。
     * 
     * 錯誤用法: 一個 timeline, 塞很多不同的 scrollTrigger，官方建議獨立 scrollTrigger 事件
     * */

    const step1Tl = gsap.timeline({
      scrollTrigger: {
        trigger: MaskLv2Ref.current,
        scrub: true,
        start: 'top top',
        end: `+=230`,
        //markers: true,
        onEnterBack: ({ start, end, progress, direction, isActive }) => {
          /** scroll trigger 有時候回捲不一定會觸發 */
          console.debug('step0 onEnterBack:', start, end, progress, direction, isActive)
        },
        onLeaveBack: ({ start, end, progress, direction, isActive }) => {
          /** scroll trigger 有時候回捲不會觸發  */
          console.debug('step0 onLeaveBack:', start, end, progress, direction, isActive)
        }
      },
    })
    step1Tl.fromTo(
      MaskLv2Ref.current,
      { x: 0, y: 0 },
      { x: 0, y: -230 },
    )

    step1Tl.to(
      ScrollMouseTopRef.current,
      { visibility: 'hidden' },
    )
    animations.push(step1Tl)

    /**
     * 接著第二步一起移動
     * 1280 * 720
     * 1. 上方圖: 往 y 方向移動 -364px (已看不到圖)
     * 2. 左下圖: 往 y 方向移動 103px
     * 3. 右下圖: 往 y 方向移動 413px (已看不到圖)
     * 4. 人頭 + 獎金: 往 y 移動，上移至 0 + 360px
     * 
     * */
    if (VendettaRef.current) {
      let step2Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: MaskLv2Ref.current,
          scrub: true,
          start: `230 top`,
          end: `+=364`,
          //markers: true,
          //onEnter: ({ scroller, start, end, trigger, progress, direction, isActive }) => {
          //  console.log('step2Timeline:', scroller, trigger, start, end)
          //},
          //onUpdate: ({ scroller, trigger, progress, direction, isActive }) => {
          //  console.log(`step2Timeline:`, trigger?.getBoundingClientRect())
          //}
        },
      })

      step2Timeline.to(
        MaskLv2Ref.current,
        {
          x: 0, yPercent: '-100'
        },
      )

      step2Timeline.fromTo(
        VendettaRef.current.getRef().current,
        { x: 314, y: 597 }, 
        { x: 314, y: 259 }, // 動畫結束後，暫停至新的相對位置
        "<"
      )

      step2Timeline.fromTo(
        MaskLv1Ref.current,
        { x: 462, y: 287 },
        {
          x: 462,
          y: function (index, target, targets) { //function-based value
            const { top } = target.getBoundingClientRect()
            return top + (window.innerHeight - top);
          },
        },
        "<"
      )

      step2Timeline.fromTo(
        MaskLv3Ref.current,
        { x: -248, y: 261 },
        { x: -248, y: 364 },
        "<"
      )

      animations.push(step2Timeline)
    }

    if (VendettaRef.current) {
      let step3Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: MaskLv3Ref.current,
          scrub: true,
          start: 'top+=333 top', /** > (第一次滾動軸)230px + (第二次滾動軸偏移量 364 - 261) 103px */
          end: `+=354`,
          //markers: true,
          //onEnter: ({ scroller, start, end, trigger, progress, direction, isActive }) => {
          //  console.log('step3Timeline:', start, end, scroller, trigger, start, end)
          //},
          //onUpdate: ({ scroller, start, end, trigger, progress, direction, isActive }) => {
          //  console.log(`step3Timeline:`, start, end, trigger?.getBoundingClientRect())
          //}
          onEnterBack: ({ start, end, progress, direction, isActive }) => {
            console.debug('step3 onEnterBack:', start, end, progress, direction, isActive)
          },
          onLeaveBack: ({ start, end, progress, direction, isActive }) => {
            console.debug('step3 onLeaveBack:', start, end, progress, direction, isActive)
          }
        },
      })
    
      step3Timeline.to(
        MaskLv3Ref.current,
        { x: -248, y: 718, opacity: 0 }
      )
    
      step3Timeline.to(
        VendettaRef.current.getRef().current,
        { x: 314, y: 36 },
        "<"
      )

      step3Timeline.fromTo(
        RewardTaskRef.current,
        { x: 856, y: -25, opacity: 0 },
        { x: 856, y: -25, opacity: 1 },
      )

      animations.push(step3Timeline)
    }

    const cardTriggers = (ScheduleTaskRefs.current.map(
      (ref: ElementRef<typeof TaskCard>) => ref.getRef().current
    )) as gsap.DOMTarget[]

    const cardEffects: gsap.TweenVars[][] = [
      [{ xPercent: "-110" }, { xPercent: "0", duration: 0.8 }],
      [{ xPercent: "110" }, { xPercent: "0", duration: 0.8 }],
      [{ xPercent: "-110" }, { xPercent: "0", duration: 0.8 }],
    ]

    for (let i = 0; i < cardEffects.length; i++) {
      const [from, to] = cardEffects[i]
      let el = cardTriggers[i]
      animations.push(
        gsap.context(() => {
          ScrollTrigger.create({
            once: true,
            trigger: el,
            start: "top-=5% bottom",
            onEnter: () => {
              gsap.fromTo(el, from, to)
            }
          })
        }, [el])
      )
    }

    if (AwardInfoSectionRef.current) {
      const awardEl = AwardInfoSectionRef.current
      const rewardTrigger = [
        {
          el: awardEl.getTeamAwardRef().current,
          from: { yPercent: "-100", visibility: 'hidden' },
          to: { yPercent: "0", duration: 1.2, visibility: 'visible' },
          order: "<"
        },
        {
          el: awardEl.getPersonalAwardRef().current,
          from: { yPercent: "-100", visibility: 'hidden' },
          to: { yPercent: "0", duration: 0.8, visibility: 'visible' },
          order: "<"
        },
        {
          el: awardEl.getShortListAwardRef().current,
          from: { yPercent: "-100", visibility: 'hidden' },
          to: { yPercent: "0", duration: 0.6, visibility: 'visible' },
          order: "<"
        },
        {
          el: awardEl.getBottomTextRef().current,
          from: { opacity: 0 },
          to: { duration: 2, opacity: 1, delay: 2 },
          order: ""
        }
      ]

      const rewardTimeline = gsap.timeline({
        scrollTrigger: {
          once: true,
          trigger: (awardEl.getSectionTitleRef().current as gsap.DOMTarget),
          start: 'top top',
        }
      })

      rewardTrigger.map(({ el, from, to, order }) => {
        rewardTimeline.fromTo(el, from, to, order)
      })
      animations.push(rewardTimeline)
    }


    console.log(animations.length)

		return () => {
      animations.map((animation) => animation.revert())
		}
	}, [])

  return (
    <>
      <Header
        className={`fixed z-[5]`}
        gotoHexSchoolAnchor={gotoHexSchoolAnchor}
        gotoScheduleInfoAnchor={gotoScheduleInfoAnchor}
      />
      <div className={`w-full h-screen`}>
        <div
          style={{
            backgroundImage: `url(${MainImage})`
          }}
          className={`flex bg-no-repeat bg-cover desktop:h-screen`}
          ref={MainBannerRef}
        >
          <MainBanner
            className={`inset-0 mx-auto desktop:mt-[101px] desktop:mb-[22px]`}
            BannerImage={<Vendetta className={`tbg-[brown]`} ref={VendettaRef} />}
            RewardTaskImage={
              <img
                ref={RewardTaskRef}
                style={{
                  backgroundImage: `url(${RewardTask})`
                }}
                className={`tbg-[black] absolute desktop:w-[373px] desktop:h-[225px]`}
              />
            }
          />
        </div>
        <div
          style={{
            backgroundImage: `url(${ContentBgImage})`
          }}
          className={`bg-no-repeat bg-center bg-cover flex flex-col items-center relative desktop:h-[6443px]`}
        >
          <div className={`relative`} ref={hexSchoolAnchorRef}>
            <HostInfo />
          </div>
          <ScheduleTask>
            {
              Tasks.map(({
                title, subtitle, content, tipUrl, contributeUrl,
                TaskLogo,
                EnterpriseLogo
              }: TaskType, index: number) => {
                const props = {
                  className: `desktop:w-[1200px] desktop:h-[528px] `,
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
          </ScheduleTask>
          <section className={`w-full desktop:h-[1040px]`} ref={scheduleInfoAnchorRef}>
            <ScheduleInfo></ScheduleInfo>
          </section>
          <AwardInfo ref={AwardInfoSectionRef}></AwardInfo>
          <LiveShareVideo></LiveShareVideo>
          <PartnerInfo></PartnerInfo>
          <SponerInfo></SponerInfo>
          <Footer></Footer>
        </div>
      </div>
      <div
				ref={MaskLv1Ref}
				style={{
					backgroundImage: `url(${RightBottomMasklv1})`
				}}
				className={`fixed tbg-[yellow] z-10 left-0 top-0 bg-no-repeat bg-cover ${pcStyles.masklv1}`}
			></div>
			<div
				ref={MaskLv2Ref}
				style={{
					backgroundImage: `url(${TopMasklv2})`
				}}
				className={`fixed tbg-[pink] z-20 left-0 top-0 bg-no-repeat bg-cover ${pcStyles.masklv2}`}
			></div>
			<div
				ref={MaskLv3Ref}
				style={{
					backgroundImage: `url(${LeftBottomMasklv3})`,
					overflow: 'auto'
				}}
				className={`fixed tbg-[purple] z-30 left-0 top-0 bg-no-repeat bg-cover ${pcStyles.masklv3}`}
			></div>
      <div ref={ScrollMouseTopRef} className={`fixed z-40 left-1/2 top-1/2 translate-x-[-32px] translate-y-[-50.05px]`}>
        <ScrollMouseIcon />
      </div>
      {
        true || isDisplayDiscount
          ? (
            <div className={`fixed flex items-center justify-center font-sans font-normal text-[#38241B] z-50 top-1/2 left-1/2 m-auto bg-white  desktop:w-[527px] desktop:h-[310px] desktop:translate-x-[-263.5px] desktop:translate-y-[-152px]`}>
              <div className={`whitespace-pre-line flex flex-col items-center justify-center desktop:leading-[55px] desktop:text-[25px] desktop:w-[420px] desktop:h-[104px]`}>
                {'恭喜您！獲得六角課程專屬折扣碼\n'}<span className={`font-sans font-bold text-[#951205] desktop:leading-[55px] desktop:text-[40px]`}>【HEXSCHOOL2022】</span>
              </div>
              <div 
                onClick={handleCloseDiscount}
                className={`absolute bg-[#38241B] top-0 right-0 flex items-center justify-center desktop:rounded-[50px] desktop:w-[72px] desktop:h-[72px] desktop:translate-x-[36px] desktop:translate-y-[-36px]`}
              >
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.0418 12.9994L24.4553 6.58506C25.8482 5.19188 25.8482 2.93807 24.4553 1.54489C23.0623 0.151705 20.804 0.151705 19.411 1.54489L12.9976 7.95447L6.58895 1.54489C5.19597 0.151705 2.93772 0.151705 1.54474 1.54489C0.151754 2.93807 0.151754 5.19188 1.54474 6.58506L7.95816 12.9994L1.54474 19.4137C0.151754 20.8069 0.151754 23.0607 1.54474 24.4539C2.24361 25.1529 3.15641 25.5 4.06922 25.5C4.97728 25.5 5.89008 25.1529 6.58895 24.4539L12.9976 18.0443L19.411 24.4539C20.1099 25.1529 21.018 25.5 21.9308 25.5C22.8436 25.5 23.7564 25.1529 24.4553 24.4539C25.8482 23.0607 25.8482 20.8069 24.4553 19.4137L18.0418 12.9994Z" fill="white"/>
                </svg>
              </div>
            </div>
          )
          : ''
      }
    </>
  );
}

export default MainPage;
