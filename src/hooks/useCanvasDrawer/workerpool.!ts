import { useEffect } from "react"

type Pool = Array<Worker>
type WorkerState = {
	[key:number]: boolean
}

type RequestPromise = Promise<string|number>
type ResloveOrReject = (workId: string|number) => void
type Requests = {
	[key:string]: Array<ResloveOrReject>
}

const workerPool: Pool = []
const busyWorker: WorkerState = {}
const idleWorker: WorkerState = {}
const requestResolvers:Array<Array<ResloveOrReject>> = []

const useWorkerPool = (workerClass, workerNum: number) => {
	useEffect(() => {
		for (let i = 0; i < workerNum; i++) {
			const worker = new workerClass()
			workerPool.push(worker)
			idleWorker[i] = false
		}

		return () => {
			workerPool.map((worker, index:number) => {
				delete workerPool[index]
				worker.terminate()
			})
		}
	}, [])

	const consumer = async () => {
		while (true) {

		}
	}

	const requestWorker = async () => {
		return new Promise((resolve, reject) => {
			requestResolvers[] = [resolve, reject]
		})
	}

	const free = (e: MessageEvent) => {
		const { workId } = e.data
		delete busyWorker[workId]
		idleWorker[workId] = true
	}

	const sleep = (ms: number) => {
		return new Promise((reslove)=> setTimeout(reslove, ms))
	}

	const findIdleWorker = async() => {
		while (true) {
			for (let workId in idleWorker) {
				busyWorker[workId] = true
				return parseInt(workId)
			}

			await sleep(100)
		}
	}

	const execute = async (data: any) => {
		return new Promise(async (resolve, reject) => {
			const idleWorkerId: number = await findIdleWorker()
			workerPool[idleWorkerId].onmessage = e => {
				const { workId } = e.data
				delete busyWorker[workId]
				idleWorker[workId] = true
				resolve(e)
				// reject(e)
			}
			workerPool[idleWorkerId].postMessage({
				...data,
				workId: idleWorkerId
			})
		})
	}
}

export default useWorkerPool