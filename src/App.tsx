import React, { lazy, Suspense, useRef, MouseEvent } from 'react'
import { deviceWidth } from '@utils/config'
import useCheckScreen from '@hooks/useCheckScreen'
import Header from '@components/Header'
import LoadingPage from "@components/LoadingPage"
// import SparkleMouse from "@components/SparkleMouse"
import WandCursor from '@images/WandCursor.png'

import { MainPageHandle } from '@pages/MainPage/type'
const MainPage = lazy(() => import("@pages/MainPage"))


const App = () => {
  const MainPageRef = useRef<MainPageHandle>(null)
  const [ignore, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)
  const gotoHexSchoolAnchor = (e: MouseEvent) => {
    if (MainPageRef.current) {
      MainPageRef.current.gotoHexSchoolAnchor(e)
    }
  }

  const gotoScheduleInfoAnchor = (e: MouseEvent) => {
    if (MainPageRef.current) {
      MainPageRef.current.gotoScheduleInfoAnchor(e)
    }
  }

  return (
    <div
      style={{
        cursor: `url(${WandCursor}), auto`
      }}
      className={`relative`}
    >
      <Header
        className={`${isDesktop ? 'fixed z-[5]': ''}`}
        gotoHexSchoolAnchor={gotoHexSchoolAnchor}
        gotoScheduleInfoAnchor={gotoScheduleInfoAnchor}
      />
      <Suspense fallback={(
        <LoadingPage
          className={`w-screen h-screen`}
          content={`努力加載中...`}
          extraInfo={['網站中收集', <span className={`text-[#951205]`}>五顆</span>, '散落的柏蒂豆，即可獲得驚喜唷。']}
        />
      )}>
        <MainPage ref={MainPageRef} />
      </Suspense>
    </div>
  )
}

export default App;
