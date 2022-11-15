import { PayloadAction } from '@reduxjs/toolkit'

export interface SignsState {
	sign: string
	draft: string
}

export type SignPayload = PayloadAction<string>