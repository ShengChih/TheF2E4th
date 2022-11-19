import {
	useState,
	useEffect,
	useCallback,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from "@/hooks"
import useCheckScreen from '@hooks/useCheckScreen'
import { deviceWidth } from '@utils/config'
import GNsignLoadingPage, { InitLoadingState } from "@components/GNsign/LoadingPage"
import { selectMakeSign } from '@features/gnsign/signs/selector'
import { selectDraftFile } from '@features/gnsign/files/selector'
import MakeSignModule from '@modules/GNsign/MakeSignModule'

const MakeSign = () => {
	const [loadingState, setLoadingState] = useState(InitLoadingState)
	const makeSign = useAppSelector(selectMakeSign)
	const draftFile = useAppSelector(selectDraftFile)
	const navigate = useNavigate()
	const [_, isMobile] = useCheckScreen(deviceWidth)
	const [canvasWidth, canvasHeight] = isMobile ? [343, 200] : [590, 224]

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
				canvasWidth={canvasWidth}
				canvasHeight={canvasHeight}
				doLoading={doLoading}
				cancelLoading={cancelLoading}
				isPageContent={true}
			/>
		</div>
		<GNsignLoadingPage className={`${loadingState.isLoading ? '': 'hidden'}`} text={'簽名優化中...'} />
	</>)
}

export default MakeSign