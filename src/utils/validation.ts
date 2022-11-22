import { DictObject } from '@/type'
import { ToastMessageKeyType } from '@/components/GNsign/type.d'

type CheckFileReturn = {
  result: boolean
  type: ToastMessageKeyType
}

export const getCheckFileFunc = (FileType: DictObject, MaximumFileSize: number) => {
  return (files: FileList): CheckFileReturn => {
    for (const file of files) {
      if (MaximumFileSize > 0 && file.size >= MaximumFileSize) {
        return {
          result: false,
          type: 'oversize',
        }
      }

      if (Object.keys(FileType).length > 0 && !Object.hasOwnProperty.call(FileType, file.type)) {
        return {
          result: false,
          type: 'filetype',
        }
      }
    }

    return {
      result: files.length > 0,
      type: 'success',
    }
  }
}
