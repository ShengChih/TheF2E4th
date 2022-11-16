import { ModeState } from './type.d'

export const HAND_WRITING: ModeState = {
	mode: 'handwriting',
	canvasText: `在此書寫你的簽名`,
}
export const IMPORT_SIGN: ModeState = {
	mode: 'importsign',
	canvasText: `請選擇檔案`
}