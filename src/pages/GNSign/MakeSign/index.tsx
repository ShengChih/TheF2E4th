import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks'
import useCheckScreen from '@/hooks/useCheckScreen'
import { deviceWidth } from '@/utils/config'
import GNsignLoadingPage, { InitLoadingState } from '@/components/GNsign/LoadingPage'
import { selectMakeSign } from '@/features/gnsign/signs/selector'
import { selectDraftFile } from '@/features/gnsign/files/selector'
import MakeSignModule from '@/modules/GNsign/MakeSignModule'
import PC_Logo from '@/pages/GNSign/Landing/images/desktop/logo.png'
import { GNsignFavicon } from '@/utils/favicon'

const MakeSign = () => {
  const [loadingState, setLoadingState] = useState(InitLoadingState)
  const makeSign = useAppSelector(selectMakeSign)
  const draftFile = useAppSelector(selectDraftFile)
  const navigate = useNavigate()
  const [, isMobile, , isDesktop] = useCheckScreen(deviceWidth)
  const [canvasWidth, canvasHeight] = isMobile ? [343, 200] : [590, 224]
  GNsignFavicon()

  useEffect(() => {
    if (makeSign && draftFile) {
      navigate('/gnsign/signdoc', { replace: true })
      return
    }

    setLoadingState({
      ...loadingState,
      isLoading: false,
    })
  }, [draftFile, makeSign, navigate])

  const doLoading = useCallback(() => {
    setLoadingState({
      ...loadingState,
      isLoading: true,
    })
  }, [setLoadingState, loadingState])

  const cancelLoading = useCallback(() => {
    setLoadingState({
      ...loadingState,
      isLoading: false,
    })
  }, [setLoadingState, loadingState])

  return (
    <>
      <div
        className={`relative font-sans font-normal w-screen h-screen bg-gnsign-background flex justify-center`}
      >
        {isDesktop ? (
          <img
            alt={`gnsign-logo`}
            className={`absolute w-fit h-fit xl:left-[40px] xl:top-[28px]`}
            src={PC_Logo}
          />
        ) : (
          ''
        )}
        <MakeSignModule
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          doLoading={doLoading}
          cancelLoading={cancelLoading}
          isPageContent={true}
        />
      </div>
      <GNsignLoadingPage isLoading={loadingState.isLoading} text={'簽名優化中...'} />
    </>
  )
}

export default MakeSign
