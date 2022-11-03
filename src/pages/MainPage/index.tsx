import { useRef, useLayoutEffect, ElementRef } from "react"
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

import RightBottomMasklv1 from './images/RightBottomMasklv1@1x.png'
import TopMasklv2 from './images/TopMasklv2@1x.png'
import LeftBottomMasklv3 from './images/LeftBottomMasklv3@1x.png'
import RewardTask from './images/reward_task.svg'

import { TaskType, Tasks } from "@components/TaskCard/constants"

type VendettaHandle = ElementRef<typeof Vendetta>
type ScheduleTaskHandle = ElementRef<typeof ScheduleTask>
type AwardInfoHandle = ElementRef<typeof AwardInfo>


function MainPage() {
  gsap.registerPlugin(ScrollTrigger)

	const MaskLv1Ref = useRef<HTMLDivElement>(null)
	const MaskLv2Ref = useRef<HTMLDivElement>(null)
	const MaskLv3Ref = useRef<HTMLDivElement>(null)
	const VendettaRef = useRef<VendettaHandle>(null)
  const RewardTaskRef = useRef<HTMLImageElement>(null)
  const BlankSectionRef1 = useRef<HTMLDivElement>(null)
  const BlankSectionRef2 = useRef<HTMLDivElement>(null)
  const AwardInfoSectionRef = useRef<AwardInfoHandle>(null)
  const ScheduleTaskRefs = useRef<Array<ElementRef<typeof TaskCard>>>([])

  ScheduleTaskRefs.current = []

  const addScheduleTaskRef = (ref: ElementRef<typeof TaskCard>) => {
    if (ref) {
      ScheduleTaskRefs.current.push(ref);
    }    
  }

  useLayoutEffect(() => {
		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: document.body,
				markers: true,
				scrub: true,
				start: 'top 30%',
				end: 'bottom bottom'
			}
		})

		if (VendettaRef.current) {
      timeline.fromTo(
        VendettaRef.current.getRef().current,
				{ x: 326, y: 169 },
				{ x: 326, y: 69, duration: 3 }
			)
		}

		timeline.fromTo(
			MaskLv1Ref.current,
			{ x: 463, y: 287 },
			{ x: 462, y: 700, duration: 3 },
			"<"
		)

		timeline.fromTo(
			MaskLv2Ref.current,
			{ x: 0, y: 0 },
			{ x: 0, y: -720, duration: 3 },
			"<"
		)

		timeline.fromTo(
			MaskLv3Ref.current,
			{ x: -247, y: 261 },
			{ x: -248, y: 718, duration: 3 }
		)

		timeline.fromTo(
			RewardTaskRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 1 },
		)

		return () => {
			timeline.revert()
		}
	}, [])

  return (
    <>
      <MainBannerContainer className={`fixed inset-0`}>
        <Header />
        <MainBanner
          className={`mx-auto mt-[39px]`}
          BannerImage={<Vendetta ref={VendettaRef} />}
          RewardTaskImage={
            <img
              ref={RewardTaskRef}
              style={{
                backgroundImage: `url(${RewardTask})`
              }}
              className={`absolute desktop:w-[373px] desktop:h-[225px] desktop:left-[850px] desktop:top-[-25px]`}
            />
          }
        />
      </MainBannerContainer>
      <div
				ref={MaskLv1Ref}
				style={{
					backgroundImage: `url(${RightBottomMasklv1})`
				}}
				className={`fixed z-10 left-0 top-0 bg-no-repeat desktop:w-[1218px] desktop:h-[1008px]`}
			></div>
			<div
				ref={MaskLv2Ref}
				style={{
					backgroundImage: `url(${TopMasklv2})`
				}}
				className={`fixed z-10 left-0 top-0 bg-no-repeat desktop:w-[1280px] desktop:h-[720px]`}
			></div>
			<div
				ref={MaskLv3Ref}
				style={{
					backgroundImage: `url(${LeftBottomMasklv3})`,
					overflow: 'auto'
				}}
				className={`fixed z-10 left-0 top-0 bg-no-repeat desktop:w-[942px] desktop:h-[1058px]`}
			></div>
      <div ref={BlankSectionRef1}  className={`w-screen h-screen relative`}></div>
      <div ref={BlankSectionRef2} className={`w-screen h-screen relative`}></div>
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
