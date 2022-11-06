import HexSchoolLogo from './images/HexSchool.svg'

export default function HostInfo() {
	return (
		<>
			<div
				style={{
					backgroundImage: `url(${HexSchoolLogo})`
				}}
				className={`mx-auto desktop:mt-[86px] desktop:w-[590px] desktop:h-[146.83px]`}>	
			</div>
			<div className={`mx-auto text-center font-medium font-sans text-[#38241B] desktop:leading-[62.26px] desktop:text-[43px] desktop:mt-[42.17px] desktop:w-[996px] desktop:h-[62px] desktop:tracking-[25px]`}>年度最強合作，三大關卡來襲</div>
			<div className={`border-[#38241B] desktop:w-[1200px] desktop:border-2 desktop:mt-[40px]`}></div>
			<div className={`border-[#38241B] desktop:w-[1200px] desktop:border-2 desktop:mt-[9px]`}></div>
		</>
	)
}