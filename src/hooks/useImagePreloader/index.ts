import { useEffect, useRef } from 'react'

export function preloadImage(src: string) {
  return new Promise<string>((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      resolve(src)
    }
    img.onerror = img.onabort = function () {
      reject(src)
    }
    img.src = src
  })
}

export type imageProgressMapProps = {
  [key: string]: boolean
}

export default function useImagePreloader(imageList: string[]) {
  const imagesPreloaded = useRef<boolean>(false)
  const imageProgressMap = useRef<imageProgressMapProps>({})

  useEffect(() => {
    /** check image progress */
    const todoImages: string[] = imageList.reduce((ret: string[], imageUrl) => {
      if (!Object.hasOwnProperty.call(imageProgressMap, imageUrl)) {
        ret.push(imageUrl)
      }
      return ret
    }, [])

    if (todoImages.length > 1) {
      return
    }

    imagesPreloaded.current = false

    let isCancelled = false

    async function effect() {
      if (isCancelled) {
        return
      }

      const imagesPromiseList: Promise<string>[] = []
      for (const i of todoImages) {
        imagesPromiseList.push(preloadImage(i))
      }

      const ret = await Promise.all(imagesPromiseList)

      if (isCancelled) {
        return
      }

      ret.forEach((val: string) => {
        imageProgressMap.current[val] = true
      })

      imagesPreloaded.current = true
    }

    effect()

    return () => {
      isCancelled = true
    }
  }, [imageList])

  return imagesPreloaded.current
}
