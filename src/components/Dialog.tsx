import { useEffect, useRef, type ReactNode } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  label: string
  variant: 'drawer' | 'sheet' | 'menu'
  children: ReactNode
}

/** <dialog> nativo: aporta foco atrapado, Esc y capa superior; la animación vive en CSS. */
export function Dialog({ open, onClose, label, variant, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={`dialog dialog--${variant}`}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      {children}
    </dialog>
  )
}
