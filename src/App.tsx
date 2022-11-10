import React, { lazy, Suspense, useRef, MouseEvent } from 'react'
import { deviceWidth } from '@utils/config'
import useCheckScreen from '@hooks/useCheckScreen'

import Header from '@components/Header'
import LoadingPage from "@components/LoadingPage"
import MagicWand from '@components/MagicWand'

// import SparkleMouse from "@components/SparkleMouse"
import WandCursor from '@images/WandCursor.png'
import LoadingBg from './images/loading_bg.jpg'

import { MainPageHandle } from '@pages/MainPage/type.d'
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
        className={`fixed z-[5]`}
        gotoHexSchoolAnchor={gotoHexSchoolAnchor}
        gotoScheduleInfoAnchor={gotoScheduleInfoAnchor}
      />
      <Suspense fallback={(
        <LoadingPage
          className={`w-screen h-screen fixed`}
          loadingImg={<MagicWand className={`absolute inset-x-0 mx-auto w-[200px] h-[200px] xl:translate-y-[138px] md:translate-y-[76px]`} />}
          content={`${isDesktop ? '努力加載中...' : ''}`}
          extraInfo={(isDesktop ? ['網站中收集', <span className={`text-[#951205]`}>五顆</span>, '散落的柏蒂豆，即可獲得驚喜唷。'] : '')}
          mediaImages={[
            {
              minWidth: 768,
              imageSrc: LoadingBg
            },
            {
              minWidth: 1280,
              imageSrc: LoadingBg
            }
          ]}
          imageElementProps={{
            src: LoadingBg,
            className: 'w-screen h-full object-cover',
            srcSet: `${LoadingBg} 768w, ${LoadingBg} 1280w`,
            sizes: `100vw`
          }}
          pictureElementProps={{
            className: `absolute`
          }}
        />
      )}>
        <MainPage ref={MainPageRef} />
      </Suspense>
    </div>
  )
}

export default App;
