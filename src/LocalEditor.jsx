import { useState, useEffect } from "react";
import useStateRef from "react-usestateref";

import RichMarkdownEditor from "rich-markdown-editor";

import BridgeManager from "./lib/BridgeManager";
import theme from "./lib/theme";

import {
  linkify,
  openLinkDesktop,
  openLinkMobile,
  platform,
} from "./lib/utils";

export default function LocalEditor() {
  const [gNote, setGNote, gNoteRef] = useStateRef(null);
  const [gMarkdown, setGMarkdown] = useState("");

  const [, setEditor] = useState(null);

  useEffect(() => {
    BridgeManager.get().addUpdateObserver(() => {
      const note = BridgeManager.get().getNote();
      const refresh =
        !gNoteRef.current ||
        (gNoteRef.current && gNoteRef.current.uuid !== note.uuid);
      setGNote(note);
      if (refresh) {
        updateMarkdown(note);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateMarkdown = (note) => {
    if (note) {
      let markdown = note.content.text.replace(
        /(\n{2})(\n+)(?!:::)(?!---)/g,
        (m, p, q) => p + q.replace(/(\n)/g, "\\$1")
      );
      // onload replace links and fix ghost bug
      markdown = linkify(markdown);
      if (markdown === "") {
        markdown = "\n";
      }

      setGMarkdown(markdown);
    } else {
      setGMarkdown("");
    }
  };

  const onChange = (value) => {
    if (gNote) {
      const text = value();
      const note = gNote;
      note.content.text = text;
      setGNote(note);
      BridgeManager.get().save();
    }
  };

  return (
    // @ts-ignore
    <RichMarkdownEditor
      value={gMarkdown}
      ref={setEditor}
      placeholder=""
      autoFocus
      onChange={onChange}
      theme={theme}
      className="editor"
      onClickLink={(href, event) => {
        // mobile RMe popup
        if (!(platform === "Desktop" || platform === "Browser")) {
          event.preventDefault();
          openLinkMobile(href);
        } else {
          // desktop CTRL/CMD+click
          if (event.ctrlKey || event.metaKey) {
            openLinkDesktop(href);
          } else {
            // desktop RMe popup
            // @ts-ignore
            if (event._reactName === "onClick") {
              openLinkDesktop(href);
            }
          }
        }
      }}
      onHoverLink={(event) => {
        // mobile click on link
        if (!(platform === "Desktop" || platform === "Browser")) {
          event.preventDefault();
          // @ts-ignore
          openLinkMobile(event.target.href);
        }
      }}
    />
  );
}
