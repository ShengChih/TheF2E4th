import React from 'react'

import LoadingPage from '@components/LoadingPage'

type LazyProps = {

}

export default function withPageLoading<T = {}>(asyncModule: any): React.FC<LazyProps & T> {
  const WrappedComponent: React.FC = React.lazy(asyncModule)

  const Comp: React.FC<any> = ({
    isComponent = false,
    content = "",
    ...props
  }) => {
    return (
      <React.Suspense
        fallback={<LoadingPage content={`努力加載中…`} />}
      >
        <WrappedComponent {...props} />
      </React.Suspense>
    )
  }

  return Comp;
}