import { useEffect, useState } from "react";

interface useCheckScreenProps {
  minDeviceWidthInterval: number[]
}

const useCheckScreen = ({ minDeviceWidthInterval }: useCheckScreenProps) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [devicesWidth, setDevicesWidth] = useState<boolean[]>([]);

  const maxIntervalIndex = minDeviceWidthInterval.length - 1
  const handleWindowSizeChange = () => {
    let devices: boolean[] = []
    const width = window.innerWidth

    for (const [index, deviceWidth] of minDeviceWidthInterval.entries()) {
      if (0 === index) {
        devices.push(width < deviceWidth)
      } else if (maxIntervalIndex === index) {
        devices.push(width < deviceWidth && width >= minDeviceWidthInterval[index - 1], width >= deviceWidth)
      } else {
        devices.push(width < deviceWidth && width >= minDeviceWidthInterval[index - 1])
      }
    }

    setDevicesWidth(devicesWidth)
    setWidth(width)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  return [width, devicesWidth]
}

export default useCheckScreen