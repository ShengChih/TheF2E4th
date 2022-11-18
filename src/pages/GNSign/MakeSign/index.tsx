import {
	lazy,
	useState,
	useEffect,
	useCallback,
	useRef,
	MouseEvent,
	ChangeEvent,
	Suspense
} from 'react'
import { useNavigate } from 'react-router-dom'
import { flatClassName } from "@utils/reduce"
import { getCheckFileFunc } from '@utils/validation'

import { useAppDispatch, useAppSelector } from "@/hooks"

import GNsignLoadingPage, { InitLoadingState } from "@components/GNsign/LoadingPage"
import { selectDraftSign, selectMakeSign } from '@features/gnsign/signs/selector'
import { selectDraftFile } from '@features/gnsign/files/selector'
import MakeSignModule from '@modules/GNsign/MakeSignModule'

const MakeSign = () => {
	const [loadingState, setLoadingState] = useState(InitLoadingState)
	const makeSign = useAppSelector(selectMakeSign)
	const draftFile = useAppSelector(selectDraftFile)
	const navigate = useNavigate()

	useEffect(() => {
		setLoadingState({
			...loadingState,
			isLoading: false
		})

		if (makeSign && draftFile) {
			navigate('/gnsign/signdoc', { replace: true })
		}
	}, [makeSign])

	const doLoading = useCallback(() => {
		setLoadingState({
			...loadingState,
			isLoading: true
		})
	}, [setLoadingState, loadingState])

	const cancelLoading = useCallback(() => {
		setLoadingState({
			...loadingState,
			isLoading: false
		})
	}, [setLoadingState, loadingState])


	return (<>
		<div className={`font-sans font-normal w-screen h-screen bg-gnsign-background flex justify-center`}>
			<MakeSignModule
				canvasWidth={343}
				canvasHeight={200}
				doLoading={doLoading}
				cancelLoading={cancelLoading}
				isPageContent={true}
			/>
		</div>
		<GNsignLoadingPage className={`${loadingState.isLoading ? '': 'hidden'}`} text={'簽名優化中...'} />
	</>)
}

export default MakeSign