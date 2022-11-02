import { useState, useEffect } from 'react'
import { throttle } from 'lodash'
import Star from './images/star.png'
import baseStyles from './styles/base.module.scss'

const maxStar = 5
const offsetBase = 7

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function genStarPositions() {
	let ret = []

	for (let i = 0; i < maxStar; i++) {
		ret.push([getRandomInt(7), getRandomInt(7)])
	}

	return ret;
}

interface Position {
	x: number
	y: number
}

function StarIcon({ x, y }: Position) {
	return (
		<div
			style={{
				backgroundImage: `url(${Star})`,
				left: `${x * offsetBase}px`,
				top: `${y * offsetBase}px`
			}}
			className={`absolute bg-center bg-no-repeat ${baseStyles.star} desktop w-[7px] desktop:h-[7px]`}
		></div>
	)
}

const SparkleMouse = () => {
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
	const [hidden, setHidden] = useState<boolean>(false)
	const [stars, setStars] = useState<number[][]>([])
	const throttleSetStars = throttle(setStars, 1500)

  useEffect(() => {
		addEventListeners();
		return () => removeEventListeners()
  }, []);

	const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
		setPosition({
			x: clientX,
			y: clientY
		})
		throttleSetStars(genStarPositions())
	}

	const onMouseEnter = (e: MouseEvent) => {
		setHidden(false)
	}

	const onMouseLeave = (e: MouseEvent) => {
		setHidden(true)
	}

  const addEventListeners = () => {
		document.addEventListener("pointermove", onMouseMove)
		document.addEventListener("mouseenter", onMouseEnter)
		document.addEventListener("mouseleave", onMouseLeave)
	}

  const removeEventListeners = () => {
		document.removeEventListener("mousemove", onMouseMove)
	}

	const hiddenClassname = hidden
		? `${baseStyles['cursor--hidden']}`
		: ''

	return (
		<div
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`
			}}
			className={`${baseStyles.cursor} ${hiddenClassname}`}
		>
			{
				stars.map((starPosition, index: number) => {
					const [x, y] = starPosition
					return <StarIcon key={`star-${index}`} x={x} y={y} />
				})
			}
		</div >
	)
}

export default SparkleMouse