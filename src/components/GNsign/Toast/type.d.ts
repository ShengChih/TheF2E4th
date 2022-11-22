import { MouseEvent } from 'react'

export type ToastProps = {
  toastClassName?: string
  messageText?: string
  buttonText?: string
  onConfirm?: (e: MouseEvent) => void
}
