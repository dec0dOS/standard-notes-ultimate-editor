// Modified SKAlert from StyleKit
// TODO: migrate to React component

export default class Alert {
  /*
        buttons: [{text, style, action}]
  */
  constructor({ title, text, buttons }) {
    this.title = title;
    this.text = text;
    this.buttons = buttons;
  }

  buttonsString() {
    const genButton = function (buttonDesc, index) {
      if (buttonDesc.url) {
        return `
                <a href='${buttonDesc.url}' target="_blank">
              <div id='button-${index}' class='sk-button ${buttonDesc.style}'>
                <div class='sk-label'>${buttonDesc.text}</div>
              </div>
                </a>
            `;
      } else {
        return `
          <div id='button-${index}' class='sk-button ${buttonDesc.style}'>
            <div class='sk-label'>${buttonDesc.text}</div>
          </div>
        `;
      }
    };

    const buttonString = this.buttons
      .map(function (buttonDesc, index) {
        return genButton(buttonDesc, index);
      })
      .join("");

    const str = `
        <div class='sk-button-group'>
          ${buttonString}
        </div>
      `;
    return str;
  }

  templateString() {
    let buttonsTemplate;
    let panelStyle;
    if (this.buttons) {
      buttonsTemplate = `
          <div class="sk-panel-row" style='margin-top: 8px;'>
            ${this.buttonsString()}
          </div>
        `;
      panelStyle = "";
    } else {
      buttonsTemplate = "";
      panelStyle = 'style="padding-bottom: 8px"';
    }
    const titleTemplate = this.title
      ? `<div class='sk-h3 sk-panel-section-title'>${this.title}</div>`
      : "";
    const messageTemplate = this.text ? `<p class='sk-p'>${this.text}</p>` : "";

    const template = `
        <div class="sk-modal">
          <div class="sk-modal-background"></div>
          <div class="sk-modal-content">
            <div class="sn-component">
              <div class="sk-panel">
                <div class="sk-panel-content" ${panelStyle}>
                  <div class="sk-panel-section">
                    ${titleTemplate}
  
                    <div class="sk-panel-row">
                      ${messageTemplate}
                    </div>
  
                    ${buttonsTemplate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

    return template;
  }

  dismiss() {
    this.onElement.removeChild(this.element);
    document.removeEventListener("keyup", this.keyupListener);
  }

  primaryButton() {
    let primary = this.buttons.find((button) => button.primary === true);
    if (!primary) {
      primary = this.buttons[this.buttons.length - 1];
    }
    return primary;
  }

  keyupListener(event) {
    if (event.key === "Enter") {
      const primaryButton = this.primaryButton();
      primaryButton.action && primaryButton.action();
      this.dismiss();
    }
  }

  present(onElement = null) {
    if (!onElement) {
      onElement = document.body;
    }

    this.onElement = onElement;

    this.element = document.createElement("div");
    this.element.className = "sn-component";
    this.element.innerHTML = this.templateString().trim();

    if (this.buttons) {
      document.addEventListener("keyup", this.keyupListener);

      this.buttons.forEach((buttonDesc, index) => {
        const buttonElem = this.element.querySelector(`#button-${index}`);
        buttonElem.onclick = () => {
          buttonDesc.action && buttonDesc.action();
          this.dismiss();
        };
      });
    }

    onElement.appendChild(this.element);
  }
}
