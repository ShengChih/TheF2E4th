import React, { lazy, Suspense } from 'react'

import { deviceWidth } from '@utils/config'
import useCheckScreen from '@hooks/useCheckScreen'

const App = () => {
  const [notDefined, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)

  if (notDefined) {
    return <div className={`w-screen h-screen flex items-center justify-center`}>不支援此裝置</div>
  }

  return (
    <>
    <Suspense fallback={(<div>loading</div>)}>
    </Suspense>
    </>
  )
}

export default App;
