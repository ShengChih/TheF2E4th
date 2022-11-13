import React, { lazy, Suspense } from 'react'
import { deviceWidth } from '@utils/config'
import useCheckScreen from '@hooks/useCheckScreen'

const GNSign = lazy(() => import('@pages/GNSign'))

const App = () => {
  const [notDefined, isMobile, isTablet, isDesktop] = useCheckScreen(deviceWidth)

  return (
    <Suspense fallback={(<div>loading</div>)}>
      <GNSign />
    </Suspense>
  )
}

export default App;
