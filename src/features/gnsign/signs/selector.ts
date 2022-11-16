import type { RootState } from '@store'

export const selectDraft = (state: RootState) => state.gnsignSigns.draft
export const selectSign = (state: RootState) => state.gnsignSigns.sign