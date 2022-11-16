import { ToastMessagesType, ToastMessageKeyType } from '@components/GNsign/type.d'

export const MaximumFileSize = 10 * 1024 * 1024

export const FileExtension = '.pdf,.jpg'
export const FileType = {
	'application/pdf': true,
	'image/jpeg': true,
}

export const InitToastState = {
	toastMessage: '',
	displayToast: false
}

export const ToastMessages: ToastMessagesType = {
	'oversize': '檔案超過10MB，請重新選擇',
	'filetype': '檔案格式錯誤，請重新選擇',
	'success': ''
}