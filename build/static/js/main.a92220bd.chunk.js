(this["webpackJsonpsn-ultimate-editor"]=this["webpackJsonpsn-ultimate-editor"]||[]).push([[0],{135:function(t,e,n){},140:function(t,e,n){},434:function(t,e,n){"use strict";n.r(e);n(135);var o=n(2),s=n.n(o),r=n(11),i=n.n(r),a=(n(140),n(129)),c=n.n(a),l=n(50),d=n(133),u=n.n(d);class v{static get(){return null==this.instance&&(this.instance=new v),this.instance}constructor(){this.updateObservers=[],this.initiateBridge()}addUpdateObserver(t){const e={callback:t};return this.updateObservers.push(e),e}notifyObserversOfUpdate(){for(const t of this.updateObservers)t.callback()}getNote(){return this.note}initiateBridge(){this.componentRelay=new u.a({targetWindow:window,options:{coallesedSavingDelay:200},onReady:()=>{document.documentElement.classList.add(this.componentRelay.platform)}}),this.componentRelay.streamContextItem((t=>{this.note=t,this.notifyObserversOfUpdate()}))}save(){if(this.note){const t=this.note;this.componentRelay.saveItemWithPresave(t,(()=>{t.content.text=this.note.content.text,t.content.preview_plain=this.note.content.text,t.content.preview_html=null}))}}}v.instance=null;var k={fontFamily:"var(--sn-stylekit-sans-serif-font)",fontFamilyMono:"var(--sn-stylekit-monospace-font)",fontWeight:400,zIndex:100,link:"var(--sn-stylekit-info-color)",placeholder:"var(--sn-stylekit-input-placeholder-color)",textSecondary:"#4E5C6E",textLight:"var(--sn-stylekit-paragraph-text-color)",textHighlight:"#ff0",selected:"var(--sn-stylekit-info-color)",codeComment:"var(--sn-stylekit-secondary-foreground-color)",codePunctuation:"var(--sn-stylekit-contrast-backround-color)",codeNumber:"#d73a49",codeProperty:"#c08b30",codeTag:"#3d8fd1",codeString:"var(--sn-stylekit-success-color)",codeSelector:"#6679cc",codeAttr:"#c76b29",codeEntity:"#22a2c9",codeKeyword:"var(--sn-stylekit-info-color)",codeFunction:"#6f42c1",codeStatement:"#22a2c9",codePlaceholder:"#3d8fd1",codeInserted:"#202746",codeImportant:"#c94922",blockToolbarBackground:"var(--sn-stylekit-contrast-background-color)",blockToolbarTrigger:"var(--sn-stylekit-info-color)",blockToolbarTriggerIcon:"var(--sn-stylekit-paragraph-text-color)",blockToolbarItem:"var(--sn-stylekit-paragraph-text-color)",blockToolbarText:"var(--sn-stylekit-paragraph-text-color)",blockToolbarHoverBackground:"var(--sn-stylekit-neutral-contrast-color)",blockToolbarDivider:"var(--sn-stylekit-paragraph-text-color)",noticeInfoBackground:"var(--sn-stylekit-info-color)",noticeInfoText:"var(--sn-stylekit-info-contrast-color)",noticeTipBackground:"var(--sn-stylekit-success-color)",noticeTipText:"var(--sn-stylekit-success-contrast-color)",noticeWarningBackground:"var(--sn-stylekit-warning-color)",noticeWarningText:"var(--sn-stylekit-warning-contrast-color)",background:"transparent",text:"var(--sn-stylekit-paragraph-text-color)",code:"var(--sn-stylekit-secondary-foreground-color)",cursor:"var(--sn-stylekit-contrast-foreground-color)",divider:"var(--sn-stylekit--secondary-contrast-border-color)",toolbarBackground:"var(--sn-stylekit-secondary-background-color)",toolbarInput:"var(--sn-stylekit-secondary-background-color)",toolbarItem:"var(--sn-stylekit-paragraph-text-color)",tableDivider:"var(--sn-stylekit-secondary-foreground-color)",tableSelected:"var(--sn-stylekit-secondary-foreground-color)",tableSelectedBackground:"var(--sn-stylekit-contrast-background-color)",quote:"var(--sn-stylekit-secondary-foreground-color)",codeBackground:"var(--sn-stylekit-secondary-background-color)",codeBorder:"var(--sn-stylekit-secondary-foreground-color)",horizontalRule:"var(--sn-stylekit-input-placeholder-color)",imageErrorBackground:"var(--sn-stylekit-neutral-color)"};class h{constructor({title:t,text:e,buttons:n}){this.title=t,this.text=e,this.buttons=n}buttonsString(){return`\n        <div class='sk-button-group'>\n          ${this.buttons.map((function(t,e){return function(t,e){return t.url?`\n                <a href='${t.url}' target="_blank">\n              <div id='button-${e}' class='sk-button ${t.style}'>\n                <div class='sk-label'>${t.text}</div>\n              </div>\n                </a>\n            `:`\n          <div id='button-${e}' class='sk-button ${t.style}'>\n            <div class='sk-label'>${t.text}</div>\n          </div>\n        `}(t,e)})).join("")}\n        </div>\n      `}templateString(){let t,e;this.buttons?(t=`\n          <div class="sk-panel-row" style='margin-top: 8px;'>\n            ${this.buttonsString()}\n          </div>\n        `,e=""):(t="",e='style="padding-bottom: 8px"');return`\n        <div class="sk-modal">\n          <div class="sk-modal-background"></div>\n          <div class="sk-modal-content">\n            <div class="sn-component">\n              <div class="sk-panel">\n                <div class="sk-panel-content" ${e}>\n                  <div class="sk-panel-section">\n                    ${this.title?`<div class='sk-h3 sk-panel-section-title'>${this.title}</div>`:""}\n  \n                    <div class="sk-panel-row">\n                      ${this.text?`<p class='sk-p'>${this.text}</p>`:""}\n                    </div>\n  \n                    ${t}\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      `}dismiss(){this.onElement.removeChild(this.element),document.removeEventListener("keyup",this.keyupListener)}primaryButton(){let t=this.buttons.find((t=>!0===t.primary));return t||(t=this.buttons[this.buttons.length-1]),t}keyupListener(t){if("Enter"===t.key){const t=this.primaryButton();t.action&&t.action(),this.dismiss()}}present(t=null){t||(t=document.body),this.onElement=t,this.element=document.createElement("div"),this.element.className="sn-component",this.element.innerHTML=this.templateString().trim(),this.buttons&&(document.addEventListener("keyup",this.keyupListener),this.buttons.forEach(((t,e)=>{this.element.querySelector(`#button-${e}`).onclick=()=>{t.action&&t.action(),this.dismiss()}}))),t.appendChild(this.element)}}var p=n(134),y=n.n(p);const b=navigator.userAgent.toLowerCase().indexOf(" electron/")>-1?"Desktop":/(Version\/\d+.*\/\d+.0.0.0 Mobile|; ?wv|(iPhone|iPad|Macintosh).*AppleWebKit(?!.*Safari))/i.test(navigator.userAgent)?navigator.userAgent.indexOf("iP")>-1||navigator.userAgent.indexOf("Macintosh")>-1?"iOS":"Android":"Browser";function g(t){const e=document.createElement("a");e.style.display="none",e.href=t,e.target="_blank",document.body.appendChild(e),e.click(),e.remove()}function m(t){let e;e="iOS"===b?[{text:"CANCEL",style:"info",action:function(){}},{text:"OPEN",url:t,style:"info",action:function(){}}]:[{text:"CANCEL",style:"info",action:function(){}},{text:"OPEN",url:"",style:"info",action:function(){window.open(t,"_blank")}}];new h({title:"Open Link",text:"Do you want to open <u>"+t+"</u> ?",buttons:e}).present()}var f=n(16);class x extends s.a.Component{constructor(t){super(t),this.onChange=Object(l.debounce)((t=>{if(this.state.note){const e=t(),n=this.state.note;n.content.text=e,this.setState({note:n}),v.get().save()}})),this.state={}}componentDidMount(){v.get().addUpdateObserver((()=>{const t=v.get().getNote(),e=!this.state.note||this.state.note&&this.state.note.uuid!==t.uuid;this.setState({note:t}),e&&this.updateMarkdown()}))}updateMarkdown(){let t=this.state.note.content.text;var e;t=(e=t,e.replace(/(\b(^https?):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim,"<$1>")).replace(/(\n{2})(\n+)/g,((t,e,n)=>e+n.replace(/(\n)/g,"\\$1"))),""===t&&(t="\n"),this.setState({markdown:t})}render(){return Object(f.jsx)("div",{children:Object(f.jsx)(c.a,{value:this.state.markdown,placeholder:"",autoFocus:!0,onChange:this.onChange.bind(this),theme:k,className:"editor",uploadImage:async t=>await(t=>new Promise((e=>{y.a.imageFileResizer(t,500,500,"JPEG",10,0,(t=>{e(t)}),"base64")})))(t),onClickLink:(t,e)=>{"Desktop"!==b&&"Browser"!==b?(e.preventDefault(),m(t)):(e.ctrlKey||e.metaKey||"onClick"===e._reactName)&&g(t)},onHoverLink:t=>{"Desktop"!==b&&"Browser"!==b&&(t.preventDefault(),m(t.target.href))},embeds:[]})})}}var w=function(){return Object(f.jsx)("div",{className:"App",children:Object(f.jsx)(x,{})})};i.a.render(Object(f.jsx)(s.a.StrictMode,{children:Object(f.jsx)(w,{})}),document.getElementById("root"))}},[[434,1,2]]]);
//# sourceMappingURL=main.a92220bd.chunk.js.map