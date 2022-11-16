import type { RootState } from '@store'

export const selectDraftSign = (state: RootState) => state.gnsignSigns.draft
export const selectMakeSign = (state: RootState) => state.gnsignSigns.sign