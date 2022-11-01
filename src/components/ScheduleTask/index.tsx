import { ComponentProps } from 'react'
type ScheduleTaskProps = Pick<ComponentProps<"div">, 'children'>

export default function ScheduleTask({ children }: ScheduleTaskProps) {
	return (
		<div className={`grid desktop:gap-y-[42px] desktop:pt-[99px] desktop:pb-[175px] desktop:w-[1200px]`}>{children}</div>
	)
}