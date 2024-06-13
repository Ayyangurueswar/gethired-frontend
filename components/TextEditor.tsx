'use client'
import React, {useState} from 'react'
import { createEditor, BaseEditor, Descendant } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const TextEditor = ({setDescription, value}: {
    setDescription: React.Dispatch<React.SetStateAction<Descendant[]>>,
    value?: Descendant[]
}) => {
  const [editor] = useState(() => withReact(createEditor()));
  const initialValue: Descendant[] = value || [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]
  return (
    <Slate editor={editor} initialValue={initialValue}
    onChange={(value) => {
        const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type
        )
        if(isAstChange){
            setDescription(value);
        }
    }}>
        <Editable className='w-1/2 h-36 border border-slate-700 rounded-md outline-none px-4 py-2 overflow-y-auto'/>
    </Slate>
  )
}

export default TextEditor