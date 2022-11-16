import { memo } from 'react'
import { flatClassName } from '@utils/reduce'
import LoadingPage from '@components/shared/LoadingPage'

import MB_Loading from './images/mobile/loading.png'

export * from './constants'
export * from './type.d'

const GNsignLoadingPage = memo(({ className, text }: { className?: string, text: string }) => {
	return (
		<LoadingPage
			loadingImg={<img src={MB_Loading} className={`absolute sm:translate-y-[176px]`} />}
			content={<p className={flatClassName({
				common: `absolute`,
				mobile: `sm:translate-y-[308px]`
			})}>{text}</p>}
			className={flatClassName({
				common: `w-screen h-screen bg-gnsign-background absolute inset-0 flex justify-center ${className}`,
			})}
		/>
	)
})

export default GNsignLoadingPage