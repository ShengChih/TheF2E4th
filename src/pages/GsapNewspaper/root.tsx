import React, { lazy, Suspense } from 'react'
import { deviceWidth } from '@/utils/config'
import useCheckScreen from '@/hooks/useCheckScreen'

import F2E4thWeek1LoadingPage from '@/components/GsapNewspaper/F2E4thWeek1LoadingPage'
import Header from '@/components/GsapNewspaper/Header'

// import SparkleMouse from "@/components/GsapNewspaper/SparkleMouse"
import WandCursor from '@/pages/GsapNewspaper/images/pc/WandCursor.png'
import MobileBgImage from '@/pages/GsapNewspaper/images/mobile/full_bg.png'
import { NewsPaperFavicon } from '@/utils/favicon'

const MainPage = lazy(() => import('./index'))

const EntryRoot = () => {
  const [notDefined, isMobile] = useCheckScreen(deviceWidth)
  NewsPaperFavicon()
  if (notDefined) {
    return <div className={`w-screen h-screen flex items-center justify-center`}>不支援此裝置</div>
  }

  return (
    <div
      style={{
        cursor: `url(${WandCursor}), auto`,
      }}
      className={`relative`}
    >
      <>
        <Suspense
          fallback={
            <>
              <F2E4thWeek1LoadingPage />
              <Header />
            </>
          }
        >
          <div
            style={
              isMobile
                ? {
                    backgroundImage: `url(${MobileBgImage})`,
                  }
                : {}
            }
          >
            <MainPage />
          </div>
        </Suspense>
      </>
    </div>
  )
}

export default EntryRoot
