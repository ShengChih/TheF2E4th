import React, { lazy, Suspense, useRef, MouseEvent } from 'react'

import Header from '@components/Header'
import LoadingPage from "@components/LoadingPage"
// import SparkleMouse from "@components/SparkleMouse"
import WandCursor from '@images/WandCursor.png'

import { MainPageHandle } from '@pages/MainPage/type'
const MainPage = lazy(() => import("@pages/MainPage"))


const App = () => {
  const MainPageRef = useRef<MainPageHandle>(null)

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
        className={`fixed z-[5]`}
        gotoHexSchoolAnchor={gotoHexSchoolAnchor}
        gotoScheduleInfoAnchor={gotoScheduleInfoAnchor}
      />
      <Suspense fallback={<LoadingPage className={`w-screen h-screen`} />}>
        <MainPage ref={MainPageRef} />
      </Suspense>
    </div>
  )
}

export default App;
