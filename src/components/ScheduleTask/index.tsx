import { ComponentProps } from 'react'
type ScheduleTaskProps = Pick<ComponentProps<"div">, 'children'>

export default function ScheduleTask({ children }: ScheduleTaskProps) {
	return (
		<div className={`grid xl:gap-y-[42px]`}>{children}</div>
	)
}