import type { RootState } from '@/store'

export const selectDraftFile = (state: RootState) => state.gnsignFiles.draft
export const selectOriginFile = (state: RootState) => state.gnsignFiles.origin
