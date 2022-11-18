import { useAppSelector } from "@/hooks"
import { selectDraftFile } from '@features/gnsign/files/selector'
import { Navigate } from "react-router-dom"

type DocumentCheckRouteProps = {
	children: JSX.Element
}

const DocumentCheckRoute = ({ children }: DocumentCheckRouteProps) => {
  const uploadFile = useAppSelector(selectDraftFile)
  if (!uploadFile) {
    return <Navigate to={"/gnsign"} />
  }
  return children;
}

export default DocumentCheckRoute