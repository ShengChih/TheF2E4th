import React, { lazy, Suspense, useRef, MouseEvent } from 'react'
import { deviceWidth } from '@utils/config'
import useCheckScreen from '@hooks/useCheckScreen'

import F2E4thWeek1LoadingPage from '@components/F2E4thWeek1LoadingPage'
import Header from '@components/Header'

// import SparkleMouse from "@components/SparkleMouse"
import WandCursor from '@images/WandCursor.png'
import MobileBgImage from './images/mobile/full_bg.png'

const MainPage = lazy(() => import("@pages/MainPage"))


const App = () => {
  const [notDefined, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)

  if (notDefined) {
    return <div className={`w-screen h-screen flex items-center justify-center`}>不支援此裝置</div>
  }

  return (
    <div
      style={{
        cursor: `url(${WandCursor}), auto`
      }}
      className={`relative`}
    >
      <>
        <Suspense fallback={(<><F2E4thWeek1LoadingPage /><Header /></>)}>
          <div style={isMobile ? {
            backgroundImage: `url(${MobileBgImage})`
          } : {}}>
            <MainPage />
          </div>
        </Suspense>
      </>
    </div>
  )
}

export default App;
