import HexSchoolLogo from './images/HexSchool.svg'

export default function HostInfo() {
	return (
		<>
			<div
				style={{
					backgroundImage: `url(${HexSchoolLogo})`
				}}
				className={`mx-auto xl:mt-[86px] xl:w-[590px] xl:h-[146.83px]`}>	
			</div>
			<div className={`mx-auto text-center font-medium font-sans text-[#38241B] xl:leading-[62.26px] xl:text-[43px] xl:mt-[42.17px] xl:w-[996px] xl:h-[62px] xl:tracking-[25px]`}>年度最強合作，三大關卡來襲</div>
			<div className={`border-[#38241B] xl:w-[1200px] xl:border-2 xl:mt-[40px]`}></div>
			<div className={`border-[#38241B] xl:w-[1200px] xl:border-2 xl:mt-[9px]`}></div>
		</>
	)
}