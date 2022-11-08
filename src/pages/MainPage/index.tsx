import {
  useRef, useState, useEffect, useLayoutEffect,
  useCallback, ElementRef, MouseEvent
} from "react"
import { gsap } from "gsap"

//import { px2mapping } from "@utils/converter"
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
  const FullPageRef = useRef<HTMLDivElement>(null)
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

  const handleEasterEggCount = useCallback((e: MouseEvent) => {
    setEasterEggCount(easterEggCount + 1)
  }, [easterEggCount])


  /** testing scroll postion */
  useEffect(() => {
    const handleScroll = (e: Event) => {
      console.log('window.scrollY', window.pageYOffset)
    }

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])
  /**/

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
    let animations: ReturnType<typeof gsap.context | typeof gsap.timeline | typeof gsap.fromTo>[] = []

    animations.push(
      gsap.context(() => {
        /** 置頂 Banner 後，滾動動畫效果 */
        ScrollTrigger.create({
          id: 'fullpin',
          trigger: MainBannerRef.current,
          scrub: true,
          start: `top top`, /** 滾動軸還未滾之前就要將 banner 透過 pin fixed 起來，滾動才不會滾到 banner，因此填 0 */
          end: `+=948`,//`+=948`, /** 滾完第一頁動畫，要很順接第二頁，230 + 364 + 354 */
          pin: FullPageRef.current,
          pinSpacing: false,
          // markers: true,
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
        // markers: true,
        // onEnterBack: ({ start, end, progress, direction, isActive }) => {
        //   /** scroll trigger 有時候回捲不一定會觸發 */
        //   console.debug('step0 onEnterBack:', start, end, progress, direction, isActive)
        // },
        // onLeaveBack: ({ start, end, progress, direction, isActive }) => {
        //   /** scroll trigger 有時候回捲不會觸發  */
        //   console.debug('step0 onLeaveBack:', start, end, progress, direction, isActive)
        // }
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
          // markers: true,
          // onEnter: ({ scroller, start, end, trigger, progress, direction, isActive }) => {
          //   console.log('step2Timeline:', scroller, trigger, start, end)
          // },
          // onUpdate: ({ scroller, trigger, progress, direction, isActive }) => {
          //   console.log(`step2Timeline:`, trigger?.getBoundingClientRect())
          // }
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
      [{ xPercent: "-150"}, { xPercent: "0", duration: 0.8 }],
      [{ xPercent: "150" }, { xPercent: "0", duration: 0.8 }],
      [{ xPercent: "-150" }, { xPercent: "0", duration: 0.8 }],
    ]

    for (let i = 0; i < cardEffects.length; i++) {
      const [from, to] = cardEffects[i]
      let el = cardTriggers[i]
      let cardtimeline = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "center+=948 center",
          id: `card_${i}`,
          once: true,
          // markers: true,
        }
      })
      cardtimeline.fromTo(el, from, to)

      animations.push(cardtimeline)
    }

    if (AwardInfoSectionRef.current) {
      const awardEl = AwardInfoSectionRef.current
      const awardAnimationTrigger = awardEl.getSectionRef().current
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
          id: `reward`,
          trigger: awardAnimationTrigger,
          start: 'center+=948 center',
          once: true,
          // markers: true,
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
      < Header
        className={`fixed z-[5]`}
        gotoHexSchoolAnchor={gotoHexSchoolAnchor}
        gotoScheduleInfoAnchor={gotoScheduleInfoAnchor}
      />
      <div ref={FullPageRef}>  
        <div
          style={{
            backgroundImage: `url(${MainImage})`
          }}
          className={`flex bg-no-repeat bg-cover desktop:h-[720px]`}
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
          className={`bg-no-repeat bg-center bg-cover flex flex-col items-center relative desktop:h-[6535px]`}
        >
          <div className={`relative desktop:w-[1200px] desktop:h-[386px]`} ref={hexSchoolAnchorRef}>
            <HostInfo />
          </div>

          <div className={`desktop:pt-[99px] desktop:pb-[175px] desktop:w-[1200px] desktop:h-[1942px]`}>
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
            <div className={`relative w-[52px] h-[56px] desktop:translate-x-[-29.4px] desktop:translate-y-[19.21px]`} onClick={handleEasterEggCount}>
              <svg width="52" height="56" viewBox="0 0 52 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.3277 18.4826C16.8383 20.9163 16.7976 23.3058 16.2063 25.6897L16.2083 25.6954C15.7512 30.2328 11.8572 34.5053 11.0233 39.0724C10.5296 41.7509 11.2839 44.0341 12.1945 45.6811L13.3134 47.2418C13.4495 47.4261 13.5855 47.6104 13.731 47.785C13.8671 47.8596 23.3725 53.1204 32.1672 40.6443C41.0277 28.0803 41.0406 12.5211 36.7807 6.72514C33.9427 4.17071 29.958 2.95695 25.9362 3.79579C19.2275 5.1959 14.9256 11.7682 16.3277 18.4826Z" fill="#CEA809"/>
                <path d="M32.1707 40.6361C23.376 53.1123 13.8706 47.8514 13.7345 47.7768C18.7273 53.9853 28.385 53.7902 33.0559 47.1845C33.1086 47.1142 33.1592 47.0383 33.2119 46.9681C40.4821 36.5726 43.0458 24.9665 40.6265 13.3961C40.509 12.8438 40.3591 12.3094 40.1767 11.7929C39.4717 9.79571 38.2883 8.07065 36.7842 6.71698C41.0441 12.5129 41.0255 28.0742 32.1707 40.6361Z" fill="#AA8900"/>
              </svg>
            </div>
          </div>

          <section className={`w-full desktop:h-[1040px]`} ref={scheduleInfoAnchorRef}>
            <ScheduleInfo>
              <div
                className={`absolute top-0 left-0 w-[51px] h-[56px] desktop:translate-x-[904px] desktop:translate-y-[264px]`}
                onClick={handleEasterEggCount}
              >
                <svg width="51" height="56" viewBox="0 0 51 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.816 17.953C16.2747 20.397 16.1833 22.7852 15.5414 25.1559L15.5433 25.1617C14.9898 29.6883 11.006 33.8771 10.0752 38.4254C9.52461 41.0929 10.2302 43.3915 11.1056 45.0576L12.1911 46.6417C12.3232 46.8288 12.4554 47.016 12.5971 47.1936C12.7316 47.2711 22.123 52.7328 31.1809 40.4463C40.3064 28.0735 40.6499 12.5181 36.5142 6.6329C33.7312 4.01873 29.7731 2.72056 25.7344 3.47374C18.9975 4.73095 14.5569 11.2103 15.816 17.953Z" fill="#0A4891"/>
                  <path d="M31.1853 40.4381C22.1275 52.7245 12.736 47.2628 12.6016 47.1853C17.4613 53.4985 27.1209 53.5087 31.9312 47.0038C31.9853 46.9347 32.0376 46.8598 32.0917 46.7907C39.5812 36.5521 42.391 25.0031 40.2182 13.384C40.1124 12.8293 39.9739 12.2918 39.8026 11.7715C39.1401 9.75981 37.9937 8.00999 36.5187 6.62466C40.6544 12.5098 40.3051 28.0672 31.1853 40.4381Z" fill="#05396D"/>
                </svg>
              </div>
              <div
                className={`absolute top-0 left-0 w-[60px] h-[60px] desktop:translate-x-[1135px] desktop:translate-y-[702.58px]`}
                onClick={handleEasterEggCount}
              >
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.7925 42.3084C26.8383 40.8947 29.0569 40.0064 31.4836 39.6279L31.4881 39.6238C35.8482 38.2872 41.2957 40.2214 45.8292 39.2206C48.4898 38.6379 50.3023 37.0579 51.4679 35.5802L52.4731 33.944C52.5903 33.7472 52.7075 33.5503 52.812 33.3485C52.828 33.1942 53.9949 22.3929 39.0857 19.1193C24.0701 15.8191 9.72127 21.836 6.02862 28.0088C4.77337 31.6149 5.19839 35.7586 7.53 39.1412C11.4201 44.7833 19.1459 46.2026 24.7925 42.3084Z" fill="#064928"/>
                  <path d="M39.0763 19.1192C53.9855 22.3927 52.8187 33.194 52.8026 33.3484C56.5915 26.34 52.6738 17.5169 44.7701 15.7658C44.685 15.7445 44.5953 15.7272 44.5102 15.7059C32.1098 13.0315 20.417 15.1651 10.6879 21.8785C10.2242 22.2008 9.78967 22.5461 9.38415 22.9144C7.81615 24.3382 6.68437 26.0975 6.01923 28.0086C9.71188 21.8358 24.0648 15.8234 39.0763 19.1192Z" fill="#0A3820"/>
                </svg>
              </div>
            </ScheduleInfo>
          </section>

          <AwardInfo ref={AwardInfoSectionRef}></AwardInfo>

          <section className={`w-full desktop:h-[1825px] mx-auto`}>
            <LiveShareVideo></LiveShareVideo>
            <div
              className={`absolute top-0 left-0 w-[59px] h-[60px] desktop:translate-x-[1135px] desktop:translate-y-[702.58px]`}
              onClick={handleEasterEggCount}
            >
              <svg width="59" height="60" viewBox="0 0 59 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.0828 16.7714C31.1877 18.3816 29.0685 19.4861 26.6914 20.1041L26.6873 20.1087C22.4818 21.8723 16.8689 20.4894 12.4575 21.9361C9.86801 22.7805 8.22163 24.5329 7.20878 26.1192L6.37128 27.8473C6.27424 28.0548 6.1772 28.2623 6.09327 28.4735C6.09265 28.6287 6.00576 39.4925 21.1666 41.267C36.4361 43.0575 50.1153 35.6435 53.1758 29.1341C54.0662 25.421 53.2311 21.3401 50.5747 18.2062C46.1427 12.9789 38.3141 12.3349 33.0828 16.7714Z" fill="#603813"/>
                <path d="M21.1751 41.2667C6.01426 39.4921 6.10113 28.6283 6.10176 28.4732C3.02861 35.8236 7.80895 44.2174 15.843 45.1697C15.9299 45.1825 16.0208 45.1907 16.1077 45.2035C28.7125 46.6314 40.1352 43.3455 49.1484 35.6977C49.5777 35.3309 49.9758 34.9441 50.3426 34.5374C51.7613 32.9647 52.7125 31.1015 53.1842 29.1337C50.1238 35.6432 36.44 43.0532 21.1751 41.2667Z" fill="#42210B"/>
              </svg>
            </div>
          </section>

          <PartnerInfo></PartnerInfo>

          <div className={`w-full desktop:h-[366px] bg-[#3C221B]`}>
            <div className={`mt-[60px] mb-[36px]`}>
              <SponerInfo></SponerInfo>
            </div>
            <div className={`desktop:mb-[8px]`}>
              <Footer></Footer>
            </div>
          </div>
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
      <div className={`fixed flex items-center justify-center font-sans font-normal text-[#38241B] z-50 top-1/2 left-1/2 m-auto bg-white  desktop:w-[527px] desktop:h-[310px] desktop:translate-y-[-152px] ${isDisplayDiscount? 'desktop:translate-x-[-263.5px] opacity-100': 'desktop:translate-x-[-100vw] opacity-0'}`}>
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
    </>
  );
}

export default MainPage;
