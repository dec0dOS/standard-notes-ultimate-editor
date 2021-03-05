import { useState, useEffect } from 'react'
import useStateRef from 'react-usestateref'

import RichMarkdownEditor from 'rich-markdown-editor'
import { debounce } from 'lodash'

import BridgeManager from './lib/BridgeManager'
import theme from './lib/theme'
// import youtube_embed from './embeds/YouTube';

import { linkify, openLinkDesktop, openLinkMobile, resizeFile, platform } from './lib/utils'

export default function LocalEditor (props) {
  const [gNote, setGNote, gNoteRef] = useStateRef(null)
  const [gMarkdown, setGMarkdown] = useState('')

  const [editor, setEditor] = useState(null)

  useEffect(() => {
    BridgeManager.get().addUpdateObserver(() => {
      const note = BridgeManager.get().getNote()
      const refresh = !gNoteRef.current || (gNoteRef.current && gNoteRef.current.uuid !== note.uuid)
      setGNote(note)
      if (refresh) {
        updateMarkdown(note)
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const updateMarkdown = (note) => {
    if (note) {
      let markdown = note.content.text
      // onload replace links and fix ghost bug
      markdown = linkify(markdown)
      if (markdown === '') {
        markdown = '\n'
      }

      setGMarkdown(markdown)
    } else {
      setGMarkdown('')
    }
  }

  const onChange = debounce((value) => {
    if (gNote) {
      const text = value()
      const note = gNote
      note.content.text = text
      setGNote(note)
      BridgeManager.get().save()
    }
  })

  return (
    <RichMarkdownEditor
      value={gMarkdown}
      ref={setEditor}
      placeholder=''
      autoFocus
      onChange={onChange}
      theme={theme}
      className='editor'
      uploadImage={async file => {
        return await resizeFile(file)
      }}
      onClickLink={(href, event) => {
        // mobile RMe popup
        if (!(platform === 'Desktop' || platform === 'Browser')) {
          event.preventDefault()
          openLinkMobile(href)
        } else {
          // desktop CTRL/CMD+click
          if (event.ctrlKey || event.metaKey) {
            openLinkDesktop(href)
          } else {
            // desktop RMe popup
            if (event._reactName === 'onClick') {
              openLinkDesktop(href)
            }
          }
        }
      }}
      onHoverLink={event => {
        // mobile click on link
        if (!(platform === 'Desktop' || platform === 'Browser')) {
          event.preventDefault()
          openLinkMobile(event.target.href)
        }
      }}
      handleDOMEvents={{
        paste: () => updateMarkdown()
      }}
      embeds={[
      // youtube_embed,
      ]}
    />
  )
}
