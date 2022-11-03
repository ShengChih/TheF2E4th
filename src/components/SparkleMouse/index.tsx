import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle, RefObject } from 'react'
import { throttle } from 'lodash'
import Star from './images/star.png'
import baseStyles from './styles/base.module.scss'

const maxStar = 6
const offsetBase = 8

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

interface StarProps {
	delay: string
}

interface StarState {
	x?: number
	y?: number
	pageX?: number,
	pageY?: number
}

const initStarState = {
	x: 0,
	y: 0,
	pageX: innerWidth / 2,
	pageY: innerHeight / 2
}

const StarIcon = forwardRef(({ delay }: StarProps, ref) => {
	const el = useRef<HTMLDivElement>(null)
	const [position, setPosition] = useState<StarState>(initStarState)

	useImperativeHandle(ref, () => {
		return {
			moveTo({ pageX, pageY, x, y }: StarState) {
				let newX = x ?? position.x ?? 0
				let newY = y ?? position.y ?? 0
				let newPageX = (pageX ?? position.pageX ?? innerWidth / 2) + (newX * offsetBase)
				let newPageY = (pageY ?? position.pageY ?? innerHeight / 2) + (newY * offsetBase)

				if (!!el.current) {
					el.current.style.transform = `translate3d(${newPageX}px, ${newPageY}px, 0)`
					el.current.style.transition = `transform ${delay} ease`
					setPosition({
						pageX,
						pageY,
						x,
						y
					})
				}
			}
		}
	}, [delay])

	return (
		<div
			style={{
				backgroundImage: `url(${Star})`,
			}}
			className={`absolute bg-center bg-no-repeat ${baseStyles.star} desktop w-[7px] desktop:h-[7px]`}
			ref={el}
		></div>
	)
})

const SparkleMouse = () => {
	const starRefs = useRef<Array<RefObject<HTMLDivElement>>>([])
	const [stars, setStars] = useState<number[][]>([])
	const throttleSetStars = throttle(setStars, 5000)

	starRefs.current = []

	useEffect(() => {
		addEventListeners();
		return () => removeEventListeners()
  }, []);

	useEffect(() => {
		stars && starRefs.current.forEach((ref, index) => {
			const [x, y] = stars[index]
			ref.moveTo({
				x,
				y
			})
		})
	}, [stars])

	const onPointerMove = ({ pageX, pageY }: MouseEvent) => {
		stars && starRefs.current.forEach((ref, index) => {
			const [x, y] = stars.hasOwnProperty(index) ? stars[index] : [0, 0]
			ref.moveTo({
				pageX,
				pageY,
				x,
				y
			})
		})

		throttleSetStars(genStarPositions())
	}

  const addEventListeners = () => {
		document.addEventListener("pointermove", onPointerMove)
	}

  const removeEventListeners = () => {
		document.removeEventListener("pointermove", onPointerMove)
	}

	const addStarRef = (ref: RefObject<HTMLDivElement>) => {
    if (ref) {
      starRefs.current.push(ref);
    }    
  }

	return (
		<>
			{
				stars.map((ignore, index: number) => {
					return <StarIcon key={`star-${index}`} delay={`${index * 100}ms`} ref={addStarRef} />
				})
			}
		</>
	)
}

export default SparkleMouse