import App from '@/App'
import GNSignLanding from "@pages/GNSign/Landing"
import GsapNewspaper from "@pages/GsapNewspaper/root"
import ErrorPage from '@pages/ErrorPage'
import MakeSign from '@pages/GNSign/MakeSign'
import SignDocument from '@pages/GNSign/SignDocument'
import DownloadStatus from '@pages/GNSign/DownloadStatus'
import SignHistory from "@pages/GNSign/SignHistory"
import DocumentCheckRoute from "@routes/DocumentCheckRoute"



const router = [
	{
		path: '/',
		//element: <App />,
		element: <GsapNewspaper />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/gnsign",
		element: <GNSignLanding />,
	},
	{
		path: "/gnsign/history",
		element: <SignHistory />
	},
	{
		path: "/gnsign/makesign",
		element: <DocumentCheckRoute>
			<MakeSign />
		</DocumentCheckRoute>,
	},
	{
		path: "/gnsign/signdoc",
		element: <DocumentCheckRoute>
			<SignDocument />
		</DocumentCheckRoute>
	},
	{
		path: "/gnsign/download",
		element: <DownloadStatus />
	},
	{
		path: "/gsapnewspaper",
		element: <GsapNewspaper />
	}
]

export default router