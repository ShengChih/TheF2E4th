export type ToastMessageKeyType = 'oversize' | 'filetype' | 'success'
export type ToastMessagesType = {
  [key in ToastMessageKeyType]: string
}
