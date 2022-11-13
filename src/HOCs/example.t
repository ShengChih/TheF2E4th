import React, { useState } from 'react';

// First we need to add a type to let us extend the incoming component.
type ExtraInfoType = {
  extraInfo: string;
};
// Mark the function as a generic using P (or whatever variable you want)
export function withExtraInfo<P>(
  // Then we need to type the incoming component.
  // This creates a union type of whatever the component
  // already accepts AND our extraInfo prop
  WrappedComponent: React.ComponentType<P & ExtraInfoType>
) {
  const [extraInfo, setExtraInfo] = useState('');
  setExtraInfo('important data.');

  const ComponentWithExtraInfo = (props: P) => {
    // At this point, the props being passed in are the original props the component expects.
    return <WrappedComponent {...props} extraInfo={extraInfo} />;
  };
  return ComponentWithExtraInfo;
}

import { ComponentType, ComponentProps, ElementType } from 'react'


interface Props<T extends ElementType, P = ComponentProps<T>> {
	WrappedComponent: ComponentType<P>
	componentProps: ComponentProps<T> & {
		[key: string]: unknown
	}
}

export default function withAll<T extends ElementType>(
	WrappedComponent: ComponentType<ComponentProps<T>>
) {

	const ProxyPropsComponent = (props: ComponentProps<T>) => { 
		return <WrappedComponent {...props} />
	}

	return ProxyPropsComponent
}

import { ComponentType, ComponentProps, ElementType } from 'react'

type ExtraProps = {
	[key: string]: unknown
}

type ExtendProps<T extends ElementType> = ComponentProps<T> & ExtraProps
	
export default function withAll<T extends ElementType>(
	WrappedComponent: ComponentType<ExtendProps<T>>
) {

	const NewPropsComponent = (props: ExtendProps<T>) => { 
		return <WrappedComponent {...props} />
	}

	return NewPropsComponent
}