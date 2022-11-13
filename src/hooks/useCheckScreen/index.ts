import { useEffect, useState } from "react";


const useCheckScreen = (minDeviceWidthInterval: number[]) => {
  const [maxWidth, setMaxWidth] = useState(window.innerWidth);
  const maxIntervalIndex = minDeviceWidthInterval.length - 1

  const detectDevices = (width: number) => {
    let devices: boolean[] = []

    for (const [index, deviceWidth] of minDeviceWidthInterval.entries()) {
      if (0 === index) {
        devices.push(width < deviceWidth)
      } else if (maxIntervalIndex === index) {
        devices.push(width < deviceWidth && width >= minDeviceWidthInterval[index - 1], width >= deviceWidth)
      } else {
        devices.push(width < deviceWidth && width >= minDeviceWidthInterval[index - 1])
      }
    }

    return devices
  }

  const handleWindowSizeChange = () => {
    const width = window.innerWidth
    setMaxWidth(width)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  console.info(`device Width: ${maxWidth}`)

  return detectDevices(maxWidth)
}

export default useCheckScreen