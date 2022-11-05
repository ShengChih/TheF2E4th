import { useRef, useEffect, useLayoutEffect, ElementRef, Event } from "react"
import { gsap } from "gsap"

import { ScrollTrigger } from "gsap/ScrollTrigger"

import MainBannerContainer from "@components/MainBannerContainer";
import MainBanner from "@components/MainBanner";
import Header from '@components/Header'
import MainContainer from '@components/MainContainer'
import HostInfo from "@components/HostInfo";
import ScheduleTask from "@components/ScheduleTask"
import TaskCard from "@components/TaskCard"
import ScheduleInfo from "@components/ScheduleInfo"
import AwardInfo from "@components/AwardInfo"
import LiveShareVideo from "@components/LiveShareVideo"
import SponerInfo from "@components/SponerInfo"
import Footer from "@components/Footer"
import Vendetta from '@components/Vendetta'

//import RightBottomMasklv1 from './images/RightBottomMasklv1@1x.png'
//import TopMasklv2 from './images/TopMasklv2@1x.png'
//import LeftBottomMasklv3 from './images/LeftBottomMasklv3@1x.png'
//import RewardTask from './images/reward_task.svg'

const RightBottomMasklv1 = ''
const TopMasklv2 = ''
const LeftBottomMasklv3 = ''
const RewardTask = ''

import { TaskType, Tasks } from "@components/TaskCard/constants"

type MainVisualHandle = ElementRef<typeof MainBannerContainer>
type VendettaHandle = ElementRef<typeof Vendetta>
type ScheduleTaskHandle = ElementRef<typeof ScheduleTask>
type AwardInfoHandle = ElementRef<typeof AwardInfo>


function MainPage() {
  gsap.registerPlugin(ScrollTrigger)
  const MainBannerRef = useRef<MainVisualHandle>(null)
	const MaskLv1Ref = useRef<HTMLDivElement>(null)
	const MaskLv2Ref = useRef<HTMLDivElement>(null)
	const MaskLv3Ref = useRef<HTMLDivElement>(null)
	const VendettaRef = useRef<VendettaHandle>(null)
  const RewardTaskRef = useRef<HTMLImageElement>(null)
  const AwardInfoSectionRef = useRef<AwardInfoHandle>(null)
  const ScheduleTaskRefs = useRef<Array<ElementRef<typeof TaskCard>>>([])

  ScheduleTaskRefs.current = []

  useEffect(() => {
    // testing scroll postion
    const handleScroll = (e: Event<HTMLElement>) => {
      console.log('window.scrollY', window.pageYOffset)
      console.log(`MaskRef3:`, MaskLv3Ref.current?.getClientRects())
    }

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const addScheduleTaskRef = (ref: ElementRef<typeof TaskCard>) => {
    if (ref) {
      ScheduleTaskRefs.current.push(ref);
    }    
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
    let animations: ReturnType<typeof gsap.context | typeof gsap.timeline>[] = []

    animations.push(
      gsap.context(() => {
        if (MainBannerRef.current) {
          const bannerRef = MainBannerRef.current.getRef().current
          /** 置頂第一頁，滾動空白的二三頁 */
          ScrollTrigger.create({
            trigger: bannerRef,
            scrub: true,
            start: 'top top',
            end: `+=948px`,
            pin: true,
            markers: true
          })
        }
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
    animations.push(
      gsap.context(() => {
        gsap.fromTo(
          MaskLv2Ref.current,
          { x: 0, y: 0 },
          {
            scrollTrigger: {
              trigger: MaskLv2Ref.current,
              scrub: true,
              start: 'top top',
              end: `+=230`,
              //markers: true
            },
            x: 0, y: -230
          }
        )
      }, MaskLv2Ref)
    )

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
          x: 0, y: -594,
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
        { x: 462, y: 700 },
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
          start: 'top+=335 top',
          end: `+=354`,
          markers: true,
          onEnter: ({ scroller, start, end, trigger, progress, direction, isActive }) => {
            console.log('step3Timeline:', start, end, scroller, trigger, start, end)
          },
          onUpdate: ({ scroller, start, end, trigger, progress, direction, isActive }) => {
            console.log(`step3Timeline:`, start, end, trigger?.getBoundingClientRect())
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
        "<"
      )

      animations.push(step3Timeline)
    }

    console.log(animations.length)

		return () => {
      animations.map((animation) => animation.revert())
		}
	}, [])

  return (
    <>
      <MainBannerContainer className={`inset-0`} ref={MainBannerRef}>
        <Header />
        <MainBanner
          className={`mx-auto overflow-hidden	desktop:mt-[101px]`}
          BannerImage={<Vendetta className={`bg-[brown]`} ref={VendettaRef} />}
          RewardTaskImage={
            <img
              ref={RewardTaskRef}
              style={{
                backgroundImage: `url(${RewardTask})`
              }}
              className={`bg-[black] absolute desktop:w-[373px] desktop:h-[225px]`}
            />
          }
        />
      </MainBannerContainer>
      
      <div
				ref={MaskLv1Ref}
				style={{
					backgroundImage: `url(${RightBottomMasklv1})`
				}}
				className={`fixed bg-[yellow] z-10 left-0 top-0 bg-no-repeat bg-cover desktop:w-[1218px] desktop:h-[1008px]`}
			></div>
			<div
				ref={MaskLv2Ref}
				style={{
					backgroundImage: `url(${TopMasklv2})`
				}}
				className={`fixed bg-[pink] z-20 left-0 top-0 bg-no-repeat bg-cover desktop:w-[1280px] desktop:h-[720px]`}
			></div>
			<div
				ref={MaskLv3Ref}
				style={{
					backgroundImage: `url(${LeftBottomMasklv3})`,
					overflow: 'auto'
				}}
				className={`fixed bg-[purple] z-30 left-0 top-0 bg-no-repeat bg-cover desktop:w-[942px] desktop:h-[1058px]`}
			></div>
      <MainContainer>
        <HostInfo />
        <ScheduleTask>
          {
            Tasks.map(({
              title, subtitle, content, tipUrl, contributeUrl,
              TaskLogo,
              EnterpriseLogo
            }: TaskType, index: number) => {
              const props = {
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
        <ScheduleInfo></ScheduleInfo>
        <AwardInfo ref={AwardInfoSectionRef}></AwardInfo>
        <LiveShareVideo></LiveShareVideo>
        <SponerInfo></SponerInfo>
        <Footer></Footer>
      </MainContainer>
    </>
  );
}

export default MainPage;
