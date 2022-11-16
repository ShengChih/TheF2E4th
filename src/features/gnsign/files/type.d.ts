import { PayloadAction } from '@reduxjs/toolkit'

export interface FilesState {
	origin: string
  draft: string
}

export type UploadFilePayload = PayloadAction<string>