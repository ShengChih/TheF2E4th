import { PayloadAction } from '@reduxjs/toolkit'

export interface FilesState {
	origin: Blob
  draft: Blob
}

export type UploadFilePayload = PayloadAction<Blob>