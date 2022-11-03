import { ComponentProps, useLayoutEffect, useRef, ElementRef } from 'react'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import RightBottomMasklv1 from './images/RightBottomMasklv1@1x.png'
import TopMasklv2 from './images/TopMasklv2@1x.png'
import LeftBottomMasklv3 from './images/LeftBottomMasklv3@1x.png'
import MainImage from './images/background.png'
import MainTitle from './images/title.svg'
import RewardTask from './images/reward_task.svg'
import Attendee1158 from './images/1158.svg'
import Attendee1052 from './images/1052.svg'
import Attendee41 from './images/41.svg'

import Vendetta from '@components/Vendetta'

type MainBannerProps = ComponentProps<"div">
type VendettaHandle = ElementRef<typeof Vendetta>

export default function MainBanner(props: MainBannerProps) {
	gsap.registerPlugin(ScrollTrigger)
	const MainBannerRef = useRef<HTMLDivElement>(null)
	const MaskLv1Ref = useRef<HTMLDivElement>(null)
	const MaskLv2Ref = useRef<HTMLDivElement>(null)
	const MaskLv3Ref = useRef<HTMLDivElement>(null)
	const VendettaRef = useRef<VendettaHandle>(null)

	useLayoutEffect(() => {
		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: document.body,
				markers: true,
				scrub: true,
				start: 'top bottom',
				end: 'bottom bottom'
			}
		})

		if (VendettaRef.current) {
			gsap.fromTo(VendettaRef.current.getRef().current,
				{
					x: 326, y: 169
				},
				{
					x: 326, y: 69,
					duration: 3
				}
			)
		}

		gsap.fromTo(
			MaskLv1Ref.current,
			{
				x: 463, y: 287
			},
			{
				x: 462, y: 700,
				duration: 3
			}
		)

		gsap.fromTo(
			MaskLv2Ref.current,
			{
				x: 0, y: 0
			},
			{
				x: 0,
				y: -720,
				duration: 3
			}
		)

		gsap.fromTo(
			MaskLv3Ref.current,
			{
				x: -247, y: 261
			},
			{
				x: -248,
				y: 718,
				duration: 3
			}
		)

		return () => {
			timeline.revert()
		}
	}, [])

	return (
		<>
		<div
			{...props}
			style={{
				...props?.style,
				backgroundImage: `url(${MainImage})`
			}}
			className={`desktop:w-[1200px] desktop:h-[597px] relative bg-no-repeat bg-center bg-contain ${props?.className}`}
			ref={MainBannerRef}
		>
			<div className={`absolute font-julian text-[#38241B] desktop:w-[313px] desktop:h-[90px] desktop:text-[80px] desktop:leading-[89.84px] font-medium	left-[56px] top-[51px]`}>THE F2E</div>
			<div className={`absolute font-sans drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-[#951205] text-white text-[32px] leading-[46.34px] flex justify-center items-center desktop:w-[109px] desktop:h-[46px] desktop:left-[385px] desktop:top-[76px] rounded-[14px]`}>4th</div>
			<div className={`absolute font-black font-serif text-[#38241B] desktop:w-[343px] desktop:h-[180px] desktop:leading-[60.35px] desktop:text-[42px] desktop:left-[59px] desktop:top-[177px]`}>前端工程師和介面設計師，攜手合作拿獎金</div>
			<div className={`absolute font-normal font-sans text-[#38241B] desktop:w-[283px] desktop:h-[140px] desktop:leading-[34.75px] desktop:text-[24px] desktop:left-[59px] desktop:top-[372px]`}>羨慕別人的酷酷網頁動畫？ 滿足不了同事的許願？ 動畫技能樹太雜無從下手？</div>
			<Vendetta ref={VendettaRef}  />
			<div
				style={{
					backgroundImage: `url(${MainTitle})`
				}}
				className={`absolute bg-no-repeat bg-center desktop:w-[554px] desktop:h-[79px] desktop:left-[366px] desktop:top-[498px]`}
			></div>
			<img
				style={{
					backgroundImage: `url(${RewardTask})`
				}}
				className={`absolute desktop:w-[373px] desktop:h-[225px] desktop:left-[850px] desktop:top-[-25px]`}
			/>
			<div
				style={{
					backgroundImage: `url(${Attendee1158})`
				}}
				className={`absolute bg-no-repeat bg-left-top	 desktop:w-[302px] desktop:h-[56px] desktop:left-[845px] desktop:top-[207px]`}
			></div>
			<div
				style={{
					backgroundImage: `url(${Attendee1052})`
				}}
				className={`absolute bg-no-repeat bg-left-top	 desktop:w-[302px] desktop:h-[56px] desktop:left-[845px] desktop:top-[271px]`}
			></div>
			<div
				style={{
					backgroundImage: `url(${Attendee41})`
				}}
				className={`absolute bg-no-repeat bg-left-top	 desktop:w-[302px] desktop:h-[56px] desktop:left-[845px] desktop:top-[335px]`}
			></div>
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
		</div>
		</>
	)
}