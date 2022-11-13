import { useEffect, useState } from "react";

const detectDevices = (minDeviceWidthInterval: number[], width: number) => {
  const maxIntervalIndex = minDeviceWidthInterval.length - 1
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

const useCheckScreen = (minDeviceWidthInterval: number[]) => {
  const [input, setInput] = useState<number[]>([])
  const [maxWidth, setMaxWidth] = useState<number>(window.innerWidth);
  const [deviceBoundaries, setDeviceBoundaries] = useState<boolean[]>([])

  const handleWindowSizeChange = () => {
    const width = window.innerWidth
    setMaxWidth(width)
  }

  useEffect(() => {
    setInput(minDeviceWidthInterval)
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  useEffect(() => {
    if (!input || maxWidth <= 0) {
      return
    }
    setDeviceBoundaries(
      detectDevices(
        input,
        maxWidth
      )
    )
  }, [maxWidth, input])

  return deviceBoundaries
}

export default useCheckScreen