import { PayloadAction } from '@reduxjs/toolkit'
export { FileInfo } from '@features/gnsign/type.d'

export interface HistoryState {
	history: FileInfo[]
}

export type HistoryPayload = PayloadAction<FileInfo>