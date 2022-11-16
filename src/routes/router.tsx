import App from '@/App'
import GNSignLanding from "@pages/GNSign/Landing"
import GsapNewspaper from "@pages/GsapNewspaper/root"
import ErrorPage from '@pages/ErrorPage'
import MakeSign from '@pages/GNSign/MakeSign'
import SignDocument from '@pages/GNSign/SignDocument'

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
		path: "/gnsign/makesign",
		element: <MakeSign />,
	},
	{
		path: "/gnsign/signdoc",
		element: <SignDocument />
	},
	{
		path: "/gsapnewspaper",
		element: <GsapNewspaper />
	}
]

export default router