import Jira1x from './images/jira1x.png'
import Confluence1x from './images/confluence1x.png'
import Micro1x from './images/micro1x.png'
import Dottedsign1x from './images/dottedsign1x.png'

export default function PartnerInfo() {
	return (
			<div className={`mx-auto flex flex-row items-center justify-between desktop:w-[1081px] h-full`}>
				<img alt={`jira`} src={Jira1x}  className={`bg-center bg-contain desktop:w-[165px] desktop:h-[55px]`} />
				<img alt={`confluence`} src={Confluence1x}  className={`bg-center bg-contain desktop:w-[288px] desktop:h-[36px]`} />
				<img alt={`micro`} src={Micro1x}  className={`bg-center bg-contain desktop:w-[202px] desktop:h-[63px]`} />
				<img alt={`dottedsign`} src={Dottedsign1x} className={`bg-center bg-contain desktop:w-[273px] desktop:h-[66px]`} />
			</div>
	)
}