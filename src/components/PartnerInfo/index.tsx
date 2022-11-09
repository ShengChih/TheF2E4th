import Jira1x from './images/jira1x.png'
import Confluence1x from './images/confluence1x.png'
import Micro1x from './images/micro1x.png'
import Dottedsign1x from './images/dottedsign1x.png'

export default function PartnerInfo() {
	return (
			<div className={`mx-auto flex flex-row items-center justify-between xl:w-[1081px] h-full`}>
				<img alt={`jira`} src={Jira1x}  className={`bg-center bg-contain xl:w-[165px] xl:h-[55px]`} />
				<img alt={`confluence`} src={Confluence1x}  className={`bg-center bg-contain xl:w-[288px] xl:h-[36px]`} />
				<img alt={`micro`} src={Micro1x}  className={`bg-center bg-contain xl:w-[202px] xl:h-[63px]`} />
				<img alt={`dottedsign`} src={Dottedsign1x} className={`bg-center bg-contain xl:w-[273px] xl:h-[66px]`} />
			</div>
	)
}