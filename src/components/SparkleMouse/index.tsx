import React, {
	useRef, useState, useEffect, forwardRef, useImperativeHandle,
	ForwardRefRenderFunction, ElementRef
} from 'react'
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
	clientX?: number,
	clientY?: number
}

const initStarState = {
	x: 0,
	y: 0,
	clientX: innerWidth / 2,
	clientY: innerHeight / 2
}

type StarHandle = {
	moveTo: (postion: StarState) => void
}

const StarBase: ForwardRefRenderFunction<StarHandle, StarProps> = ({ delay }, ref) => {
	const el = useRef<HTMLDivElement>(null)
	const [position, setPosition] = useState<StarState>(initStarState)

	useImperativeHandle(ref, () => {
		return {
			moveTo({ clientX, clientY, x, y }: StarState) {
				let newX = x ?? position.x ?? 0
				let newY = y ?? position.y ?? 0
				let newClientX = (clientX ?? position.clientX ?? innerWidth / 2) + (newX * offsetBase)
				let newClientY = (clientY ?? position.clientY ?? innerHeight / 2) + (newY * offsetBase)

				if (!!el.current) {
					el.current.style.transform = `translate3d(${newClientX}px, ${newClientY}px, 0)`
					el.current.style.transition = `transform ${delay} ease`
					setPosition({
						clientX,
						clientY,
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
			className={`fixed bg-center bg-no-repeat ${baseStyles.star} desktop w-[7px] desktop:h-[7px]`}
			ref={el}
		></div>
	)
}

const StarIcon = forwardRef(StarBase)

const SparkleMouse = () => {
	const starRefs = useRef<Array<ElementRef<typeof StarIcon>>>([])
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

	const onPointerMove = ({ clientX, clientY }: MouseEvent) => {
		stars && starRefs.current.forEach((ref, index) => {
			const [x, y] = stars.hasOwnProperty(index) ? stars[index] : [0, 0]
			ref.moveTo({
				clientX,
				clientY,
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

	const addStarRef = (ref: ElementRef<typeof StarIcon>) => {
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