import App from '@/App'
import GNSignLanding from "@pages/GNSign/Landing"
import GsapNewspaper from "@pages/GsapNewspaper/root"
import ErrorPage from '@pages/ErrorPage'
import MakeSign from '@pages/GNSign/MakeSign'

const router = [
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/gnsign",
		element: <GNSignLanding />,
	},
	{
		path: "/gnsign/sign",
		element: <MakeSign />,
	},
	{
		path: "/gsapnewspaper",
		element: <GsapNewspaper />
	}
]

export default router