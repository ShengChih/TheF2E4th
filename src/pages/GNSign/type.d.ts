export type ToastState = {
	toastMessage: string
	displayToast: boolean
}

export type ToastMessageKeyType = 'oversize' | 'filetype'
export type ToastMessagesType = {
	[key in ToastMessageKeyType]: string
}