import ComponentRelay from "@standardnotes/component-relay";

export default class BridgeManager {
  /* Singleton */
  static instance = null;
  static get() {
    if (this.instance == null) {
      this.instance = new BridgeManager();
    }
    return this.instance;
  }

  constructor() {
    this.updateObservers = [];
    this.initiateBridge();
  }

  addUpdateObserver(callback) {
    const observer = { callback: callback };
    this.updateObservers.push(observer);
    return observer;
  }

  notifyObserversOfUpdate() {
    for (const observer of this.updateObservers) {
      observer.callback();
    }
  }

  getNote() {
    return this.note;
  }

  initiateBridge() {
    this.componentRelay = new ComponentRelay({
      targetWindow: window,
      onReady: () => {
        // On ready and permissions authorization
        document.documentElement.classList.add(this.componentRelay.platform);
      },
    });

    this.componentRelay.streamContextItem((note) => {
      this.note = note;

      this.notifyObserversOfUpdate();
    });
  }

  save() {
    if (this.note) {
      const note = this.note;

      if (note.content && note.content.text) {
        note.content.text = note.content.text.replace(/\n\\/g, "\n");
      }

      this.componentRelay.saveItemWithPresave(note, () => {
        note.content.text = this.note.content.text;
        note.content.preview_plain = this.note.content.text;
        note.content.preview_html = null;
      });
    }
  }
}
