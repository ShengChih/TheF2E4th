import App from '@/App'
import GNSign from "@pages/GNSign"
import GsapNewspaper from "@pages/GsapNewspaper/root"
import ErrorPage from '@pages/ErrorPage'

const router = [
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/gnsign",
		element: <GNSign />,
	},
	{
		path: "/gsapnewspaper",
		element: <GsapNewspaper />
	}
]

export default router