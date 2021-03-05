import Alert from "./Alert";
import Resizer from "react-image-file-resizer";

function linkify(inputText) {
  // URLs starting with http://, https://
  const replacePattern = /(\b(^https?):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
  const replacedText = inputText.replace(replacePattern, "<$1>");

  return replacedText;
}

function getPlatform() {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.indexOf(" electron/") > -1) {
    return "Desktop";
  } else if (
    /(Version\/\d+.*\/\d+.0.0.0 Mobile|; ?wv|(iPhone|iPad|Macintosh).*AppleWebKit(?!.*Safari))/i.test(
      navigator.userAgent
    )
  ) {
    if (
      navigator.userAgent.indexOf("iP") > -1 ||
      navigator.userAgent.indexOf("Macintosh") > -1
    ) {
      return "iOS";
    } else {
      return "Android";
    }
  } else {
    return "Browser";
  }
}

const platform = getPlatform();

function openLinkDesktop(url) {
  // more compatible way to open links
  const invisibleA = document.createElement("a");

  invisibleA.style.display = "none";
  invisibleA.href = url;
  invisibleA.target = "_blank";

  document.body.appendChild(invisibleA);

  invisibleA.click();
  invisibleA.remove();
}

function openLinkMobile(url) {
  let buttons;
  if (platform === "iOS") {
    buttons = [
      {
        text: "CANCEL",
        style: "info",
        action: function () {},
      },
      {
        text: "OPEN",
        url: url,
        style: "info",
        action: function () {},
      },
    ];
  } else {
    // Android
    buttons = [
      {
        text: "CANCEL",
        style: "info",
        action: function () {},
      },
      {
        text: "OPEN",
        url: "",
        style: "info",
        action: function () {
          window.open(url, "_blank");
        },
      },
    ];
  }
  const alert = new Alert({
    title: "Open Link",
    text: "Do you want to open <u>" + url + "</u> ?",
    buttons,
  });
  alert.present();
}

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500,
      500,
      "JPEG",
      10,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export { linkify, openLinkDesktop, openLinkMobile, resizeFile, platform };
