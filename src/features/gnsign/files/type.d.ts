import { PayloadAction } from '@/reduxjs/toolkit'
export { FileInfo } from '@/features/gnsign/type.d'

export interface FilesState {
  origin: FileInfo | undefined
  draft: FileInfo | undefined
}

export type UploadFilePayload = PayloadAction<FileInfo>
export type UploadFilePayload = PayloadAction<FileInfo>
