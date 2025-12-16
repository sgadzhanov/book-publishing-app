'use client'
import { useState } from "react"

type AccordionItemType = {
  question: string
  answer: string
}

function AccordionItem({ question, answer }: AccordionItemType) {
  const [open, setOpen] = useState(false)

  return (
    <li className="py-6 border-b border-slate-400">
      <button className="w-full bg-none border-none text-xl flex justify-between cursor-pointer p-0" onClick={() => setOpen(!open)}>
        <p className="text-lg">{question}</p>
        <p className="material-symbols-outlined">
          {open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
        </p>
      </button>
      {open && <p className="mt-1 text-slate-600">{answer}</p>}
    </li>
  )
}

export default AccordionItem
