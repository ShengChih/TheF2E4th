import { PayloadAction } from '@/reduxjs/toolkit'

export interface SignsState {
  sign: string
  draft: string
  signBox: string[]
}

export type SignPayload = PayloadAction<string>
export type SignBoxPayload = PayloadAction<string[]>
