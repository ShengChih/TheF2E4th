import { ComponentProps } from 'react'

import NeckImage from './images/hoodie_neck.svg'
import BodyImage from './images/hoodie_body.svg'
import LeftSideImage from './images/hoodie_left_side.svg'
import RightSideImage from './images/hoodie_right_side.svg'
import FaceProfile from './images/face_profile.svg'
import HoodedHat from './images/hooded_hat.svg'
import HatFixer from './images/hat_fixer.svg'
import Hatbrim from './images/hat_brim.svg'

import LeftEyebrow from './images/left_eye_brow.svg'
import RightEyebrow from './images/right_eye_brow.svg'
import LeftEye from './images/left_eye.svg'
import RightEye from './images/right_eye.svg'
import Nose from './images/nose.svg'
import Mouse from './images/mouse.svg'
import LeftBeard from './images/left_beard.svg'
import RightBeard from './images/right_beard.svg'
import Goatee from './images/goatee.svg'

type VendettaProps = ComponentProps<"div">

export default function Vendetta(props: VendettaProps) {
	return (
		<div className={`relative desktop:w-[632.89px] desktop:h-[529.05px] ${props.className}`}>
			<div
				style={{
					backgroundImage: `url(${NeckImage})`
				}}
				className={`absolute bg-no-repeat bg-cover desktop:w-[379.15px] desktop:h-[369.41px] desktop:left-[103.38px] desktop:top-[159.61px]`}></div>
			<div
				style={{
					backgroundImage: `url(${BodyImage})`
				}}
				className={`absolute bg-no-repeat bg-cover w-full desktop:h-[208.35px] desktop:top-[320.70px]`}></div>
			<div
				style={{
					backgroundImage: `url(${LeftSideImage})`
				}}
				className={`absolute bg-no-repeat bg-cover desktop:w-[195.19px] desktop:h-[295.03px] desktop:left-[103.4px] desktop:top-[234.02px]`}></div>
			<div
				style={{
					backgroundImage: `url(${RightSideImage})`
				}}
				className={`absolute bg-no-repeat bg-cover desktop:w-[187.44px] desktop:h-[291.73px] desktop:left-[298.61px] desktop:top-[237.35px]`}></div>
			<div
				style={{
					backgroundImage: `url(${FaceProfile})`
				}}
				className={`absolute bg-no-repeat bg-cover desktop:w-[220.85px] desktop:h-[227.77px] desktop:left-[184.21px] desktop:top-[180.52px]`}
			>
				<div
					style={{
						backgroundImage: `url(${LeftEyebrow})`
					}}
					className={`absolute bg-no-repeat bg-cover desktop:w-[88.05px] desktop:h-[34.21px] desktop:left-[9.47px] desktop:top-[15.22px]`}
				></div>
				<div
					style={{
						backgroundImage: `url(${RightEyebrow})`
					}}
					className={`absolute bg-no-repeat bg-cover desktop:w-[88.04px] desktop:h-[34.73px] desktop:left-[131.39px] desktop:top-[15.22px]`}
				></div>
				<div
					style={{
						backgroundImage: `url(${LeftEye})`
					}}
					className={`absolute bg-no-repeat bg-cover desktop:w-[50.49px] desktop:h-[16.83px] desktop:left-[32.12px] desktop:top-[56.86px]`}
				></div>
				<div
					style={{
						backgroundImage: `url(${RightEye})`
					}}
					className={`absolute bg-no-repeat bg-cover desktop:w-[50.51px] desktop:h-[16.83px] desktop:left-[150.02px] desktop:top-[57.87px]`}
				></div>
				<div
					style={{
						backgroundImage: `url(${Nose})`
					}}
					className={`absolute bg-no-repeat bg-cover desktop:w-[59.04px] desktop:h-[25.96px] desktop:left-[84.85px] desktop:top-[117.9px]`}
				></div>
				<div
					style={{
						backgroundImage: `url(${Mouse})`
					}}
					className={`absolute bg-no-repeat bg-cover desktop:w-[89.55px] desktop:h-[16.33px] desktop:left-[72.8px] desktop:top-[154.57px]`}
				></div>
				<div
					style={{
						backgroundImage: `url(${LeftBeard})`
					}}
					className={`absolute bg-no-repeat bg-cover desktop:w-[95.91px] desktop:h-[67.51px] desktop:left-[20.63px] desktop:top-[99.27px]`}
				></div>
				<div
					style={{
						backgroundImage: `url(${RightBeard})`
					}}
					className={`absolute bg-no-repeat bg-cover desktop:w-[95.91px] desktop:h-[67.51px] desktop:left-[114.36px] desktop:top-[99.27px]`}
				></div>
				<div
					style={{
						backgroundImage: `url(${Goatee})`
					}}
					className={`absolute bg-no-repeat bg-cover desktop:w-[28.97px] desktop:h-[49.51px] desktop:left-[97.63px] desktop:top-[176.43px]`}
				></div>
			</div>
			<div
				style={{
					backgroundImage: `url(${HoodedHat})`
				}}
				className={`absolute bg-no-repeat bg-cover desktop:w-[382.8px] desktop:h-[251.19px] desktop:left-[103.32px]`}
			>
				<div
					style={{
						backgroundImage: `url(${HatFixer})`
					}}
					className={`absolute bg-no-repeat bg-cover desktop:w-[159.96.8px] desktop:h-[186.6px] desktop:left-[112.2px] desktop:top-[16.04px]`}
				></div>
				<div
					style={{
						backgroundImage: `url(${Hatbrim})`
					}}
					className={`absolute bg-no-repeat bg-cover desktop:w-[346.33px] desktop:h-[57.66px] desktop:left-[18.38px] desktop:top-[184.72px]`}
				></div>
			</div>
		</div>
	)
}