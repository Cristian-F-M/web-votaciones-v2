import Check from '@/icons/Check'
import X from '@/icons/X'
import type { Item } from '@/types/ItemList'
import { useCallback, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface SingleItemListProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  item: Item
  handleRemoveItem: (id: string) => void
  name?: string
  idKey?: string
  textKey?: string
  removeItemProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  index: number
  fieldName?: string
}

export function SingleItemList({
  item,
  handleRemoveItem,
  name,
  idKey,
  textKey,
  className,
  removeItemProps,
  index,
  fieldName,
  onChange,
  ...props
}: SingleItemListProps) {
  const baseName = `${fieldName}[${index}]`
  const idInputName = `${baseName}[${idKey}]`
  const nameInputName = `${baseName}[${textKey}]`
  const [changed, setChanged] = useState(false)
  const [originalValue, setOriginalValue] = useState(item.text)
  const optionsButtonClassName =
    'cursor-pointer transition-colors p-0.5 rounded'
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAcceptChange = useCallback(() => {
    setChanged(false)
    if (inputRef.current) setOriginalValue(inputRef.current.value)
  }, [])

  const handleRejectChange = useCallback(() => {
    setChanged(false)
    if (inputRef.current) inputRef.current.value = originalValue
  }, [originalValue])

  return (
    <div className="flex flex-row justify-between items-center bg-gray-100 rounded border border-gray-300/80  text-pretty dark:bg-page-dark-bg-contrast dark:border-gray-700 has-[>_input:focus]:outline outline-primary dark:outline-dark-primary">
      <input type="hidden" name={idInputName} value={item.id} />
      <input
        ref={inputRef}
        className={twMerge(
          'w-full h-[stretch] px-3 py-2 outline-none',
          className
        )}
        defaultValue={item.text}
        name={nameInputName}
        type="text"
        {...props}
        onBlur={() => {
          console.log({ changed })
          // setChanged(false)
        }}
        onChange={(e) => {
          if (onChange) onChange(e)
          setChanged(e.target.value !== originalValue)
        }}
      />
      <div className="flex flex-row gap-2 [&_svg]:size-4 transition-colors p-0.5 rounded mr-1">
        {changed && (
          <>
            <button
              type="button"
              className={twMerge(
                optionsButtonClassName,
                'hover:bg-green-300 dark:hover:bg-green-800'
              )}
              title="Guardar cambios"
              onClick={handleAcceptChange}
            >
              <Check />
            </button>
            <button
              type="button"
              className={twMerge(
                optionsButtonClassName,
                'hover:bg-red-300 dark:hover:bg-red-800'
              )}
              title="Descartar cambios"
              onClick={handleRejectChange}
            >
              <X />
            </button>
          </>
        )}
        <button
          {...removeItemProps}
          className={twMerge(
            'mr-1 text-red-700 hover:bg-red-200 [&_svg]:size-4 cursor-pointer transition-colors p-0.5 rounded dark:text-red-500 dark:hover:bg-red-400/20',
            removeItemProps?.className,
            changed ? 'hidden' : ''
          )}
          type="button"
          onClick={() => handleRemoveItem(item.id)}
        >
          <X />
        </button>
      </div>
    </div>
  )
}
