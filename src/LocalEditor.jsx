import React from 'react';
import RichMarkdownEditor from "rich-markdown-editor";
import { debounce } from "lodash";

import BridgeManager from "./lib/BridgeManager";
import theme from './lib/theme';
// import youtube_embed from './embeds/YouTube';

import { linkify, openLinkDesktop, openLinkMobile, resizeFile, platform } from './lib/utils';


export default class LocalEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        BridgeManager.get().addUpdateObserver(() => {
            const note = BridgeManager.get().getNote();
            const refresh = !this.state.note
                || (this.state.note && this.state.note.uuid !== note.uuid);
            this.setState({
                note: BridgeManager.get().getNote(),
            });
            if (refresh) {
                if (note.isMetadataUpdate) { return; }

                this.updateMarkdown();
            }
        });
    }

    updateMarkdown() {
        let markdown = this.state.note.content.text
        // onload replace links
        markdown = linkify(markdown)
        //     .replace(/(\n{2})(\n+)/g, (m, p, q) => p + q.replace(/(\n)/g, '\\$1'));
        // if (markdown === "") {
        //     markdown = "\n";
        // }

        this.setState({ markdown });
    }

    onChange = debounce((value) => {
        const text = value();
        if (this.state.note) {
            let note = this.state.note;
            note.content.text = text;
            this.setState({ note: note });
        }
        BridgeManager.get().save();
    })

    getNoteContents() {
        if (this.state.note) {
            return this.state.note.content.text;
        }
        return '';
    }

    render() {
        return (
            <div>
                <RichMarkdownEditor
                    value={this.state.markdown}
                    placeholder=""
                    autoFocus
                    onChange={this.onChange.bind(this)}
                    theme={theme}
                    className="editor"
                    uploadImage={async file => {
                        return await resizeFile(file);
                    }}
                    onClickLink={(href, event) => {
                        // mobile RMe popup
                        if (!(platform == "Desktop" || platform == "Browser")) {
                            event.preventDefault();
                            openLinkMobile(href);
                        }
                        else {
                            // desktop CTRL/CMD+click
                            if (event.ctrlKey || event.metaKey) {
                                openLinkDesktop(href);
                            } else {
                                // desktop RMe popup
                                if (event._reactName === "onClick") {
                                    openLinkDesktop(href);
                                }
                            }
                        }
                    }}
                    onHoverLink={event => {
                        // mobile click on link
                        if (!(platform == "Desktop" || platform == "Browser")) {
                            event.preventDefault();
                            openLinkMobile(event.target.href);
                        }
                    }}
                    embeds={[
                        // youtube_embed,
                    ]}
                />
            </div>
        );
    }
}