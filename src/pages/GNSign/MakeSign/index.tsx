import { flatClassName } from "@utils/reduce"

const MakeSign = () => {
	return (
		<div className={`font-sans font-normal w-screen h-screen bg-gnsign-background flex justify-center`}>
			<div className={flatClassName({
				common: `flex items-center absolute bg-white rounded-[14px]`,
				mobile: `sm:translate-y-[28px] sm:w-[240px] sm:h-[40px]`
			})}>
				<div className={flatClassName({
					common: `flex flex-1 items-center justify-center grow h-full bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh rounded-[14px] text-white`,
					mobile: `sm:text-[16px] sm:leading-[23px]`
				})}>手寫簽名</div>
				<div className={flatClassName({
					common: `flex flex-1 items-center justify-center grow h-full text-gnsign-green `,
					mobile: `sm:text-[16px] sm:leading-[23px]`
				})}>匯入簽名檔</div>
			</div>

			<div className={flatClassName({
				common: `absolute flex flex-no-wrap items-center justify-between`,
				mobile: `sm:w-[150px] sm:h-[34px] sm:translate-y-[121px]`
			})}>
				<div className={flatClassName({
					common: `bg-white rounded-full flex items-center justify-center`,
					mobile: `sm:w-[45px] sm:h-[45px]`
				})}>
					<div className={flatClassName({
						common: `bg-black rounded-full`,
						mobile: `sm:w-[35px] sm:h-[35px] `
					})}></div>
				</div>
				<div className={flatClassName({
					common: `bg-white rounded-full flex items-center justify-center`,
					mobile: `sm:w-[45px] sm:h-[45px]`
				})}>
					<div className={flatClassName({
						common: `bg-[#0014C7] rounded-full`,
						mobile: `sm:w-[35px] sm:h-[35px] `
					})}></div>
				</div>
				<div className={flatClassName({
					common: `bg-white rounded-full flex items-center justify-center`,
					mobile: `sm:w-[45px] sm:h-[45px]`
				})}>
					<div className={flatClassName({
						common: `bg-[#CA0000] rounded-full`,
						mobile: `sm:w-[35px] sm:h-[35px] `
					})}></div>
				</div>
			</div>

			<div className={flatClassName({
				common: `absolute flex items-center justify-center`,
				mobile: `sm:w-[343px] sm:h-[200px] sm:translate-y-[178px]`
			})}>在此書寫你的簽名</div>

			<div className={flatClassName({
				common: `absolute flex flex-no-wrap justify-between`,
				mobile: `sm:w-[343px] sm:h-[56px] sm:translate-y-[403px] sm:gap-x-[11.5px]`
			})}>
				<button className={flatClassName({
					common: `flex items-center justify-center h-full flex-1 text-gnsign-green bg-white rounded-[16px]`,
				})}>清除</button>
				<button className={flatClassName({
					common: `flex items-center justify-center h-full flex-1 text-white bg-gradient-to-b from-gnsign-greenl to-gnsign-greenh rounded-[16px]`,
				})}>建立簽名</button>
			</div>
		</div>
	)
}

export default MakeSign