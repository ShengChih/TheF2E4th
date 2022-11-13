import React, { ReactNode, lazy, Suspense, useRef, MouseEvent } from 'react'
import { deviceWidth } from '@utils/config'
import useCheckScreen from '@hooks/useCheckScreen'

import Header from '@components/Header'
import LoadingPage from "@components/LoadingPage"
import MagicWand from '@components/MagicWand'

// import SparkleMouse from "@components/SparkleMouse"
import WandCursor from '@images/WandCursor.png'
import LoadingBg from './images/loading_bg.jpg'
import MobileBgImage from './images/mobile/full_bg.png'

import { MainPageHandle } from '@pages/MainPage/type.d'
import { flatClassName } from '@utils/reduce'
const MainPage = lazy(() => import("@pages/MainPage"))


const App = () => {
  const MainPageRef = useRef<MainPageHandle>(null)
  const [notDefined, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)

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

  const FullPageContent = ({ children }: { children: ReactNode }) => {
    return isMobile
      ? <div style={{
        backgroundImage: `url(${MobileBgImage})`
      }}>
        {children}
      </div>
      : <>{children}</>
  }

  const NewHeader = ({ className }: { className?: string }) => (
    <Header
      className={(className ?? '')}
      gotoHexSchoolAnchor={gotoHexSchoolAnchor}
      gotoScheduleInfoAnchor={gotoScheduleInfoAnchor}
    />
  )

  const LoadingMask = () => (
    <>
      <LoadingPage
        className={`w-screen h-screen fixed z-10`}
        loadingImg={<MagicWand className={flatClassName({
          common: `absolute inset-x-0 mx-auto w-[200px] h-[200px] translate-y-[138px]`,
        })} />}
        content={`${isDesktop ? '努力加載中...' : ''}`}
        extraInfo={(isDesktop ? ['網站中收集', <span className={`text-[#951205]`}>五顆</span>, '散落的柏蒂豆，即可獲得驚喜唷。'] : '')}
        mediaImages={[
          {
            minWidth: 375,
            imageSrc: LoadingBg
          },
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
          className: 'w-screen h-screen object-cover',
          srcSet: `${LoadingBg} 375w, ${LoadingBg} 768w, ${LoadingBg} 1280w`,
          sizes: `100vw`
        }}
        pictureElementProps={{
          className: `absolute`
        }}
      />
      <NewHeader />
    </>
  )

  if (notDefined) {
    return <FullPageContent>
      <div className={`w-screen h-screen flex items-center justify-center`}>不支援此裝置</div>
    </FullPageContent>
  }

  return (
    <div
      style={{
        cursor: `url(${WandCursor}), auto`
      }}
      className={`relative`}
    >
      <>
        <Suspense fallback={(<LoadingMask />)}>
          <FullPageContent>
            <MainPage ref={MainPageRef} Header={<NewHeader />} LoadingPage={<LoadingMask />} />
          </FullPageContent>
        </Suspense>
      </>
    </div>
  )
}

export default App;
