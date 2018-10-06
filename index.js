const NO_VALID_PRICE = "No valid price.";

let tmpl = document.createElement("template");
tmpl.id = "etn-vendor-payment";
tmpl.innerHTML = `
  <style>
    :host {
      display: block; /* by default, custom elements are display: inline */
      contain: content; /* CSS containment FTW. */
    }
    #errors {
      color: red;
    }
    #qr div {
      position: relative;
      box-sizing: content-box;
      border: 4px solid #333333;
      border-radius: 4px;
    }
    #qr img {
      box-sizing: border-box;
      border: 8px solid #FFFFFF;
      width: 100%;
    }
  </style>
  <slot></slot>
  <slot id="errors"></slot>
  <slot id="qr"></slot>
`;

export default class EtnVendorPayment extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["amount"];
  }

  attributeChangedCallback() {
    if (!this.shadowRoot) {
      return
    }
    this.removeChildrenElement('errors');
    this.removeChildrenElement('qr');

    if (this.amount <= 0) {
      return this.renderError();
    }
    this.renderQr();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }

  buildPaymentString() {
      return this.outletId + "/" + this.paymentId  + "/"  +  this.amount
  }

  buildQrCode(paymentString) {
    return (
      "https://chart.googleapis.com/chart?cht=qr&chs=300x300&chld=L|0&chl=" +
      encodeURI(
        "https://link.electroneum.com/jWEpM5HcxP?vendor=" + paymentString
      )
    );
  }

  renderError() {
    const errorsElement = this.shadowRoot.getElementById("errors");
    let p = document.createElement("p");
    p.innerHTML = NO_VALID_PRICE;
    errorsElement.appendChild(p);
  }

  renderQr() {
    const qrElement = this.shadowRoot.getElementById("qr")
    let content = document.createElement("div");

    let qrImg = document.createElement("img");
    qrImg.src = this.buildQrCode(this.buildPaymentString());

    content.appendChild(qrImg);
    qrElement.appendChild(content);
  }

  removeChildrenElement(selector) {
    const element = this.shadowRoot.getElementById(selector)
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  get amount() {
    if (!this.getAttribute("amount")) {
      return 0;
    }
    return this.getAttribute("amount");
  }

  set amount(value) {
    this.setAttribute("amount", value);
  }

  get outletId() {
    return this.getAttribute("outletId");
  }

  set outletId(value) {
    this.setAttribute("outletId", value);
  }

  get paymentId() {
    return this.getAttribute("paymentId");
  }

  set paymentId(vlaue) {
    this.setAttribute("paymentId");
  }
}
