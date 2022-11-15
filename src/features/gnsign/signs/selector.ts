import type { RootState } from '@store'

export const selectDraft = (state: RootState) => state.gnsignFiles.draft
export const selectOrigin = (state: RootState) => state.gnsignFiles.origin