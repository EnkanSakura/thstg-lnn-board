const template = document.createElement('template');

template.innerHTML = `
<style>
    :host {
        position: absolute;
        display: none;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0 0 5px rgba(0,0,0,0.2);
    }
</style>
<div class="hover-box">
    <div class="title">Title</div>
    <div class="description">
        <p>Hover over the box to see the hover box.</p>
    </div>
</div>
`;

class HoverBox extends HTMLElement {
    constructor() {
        super();
        this._sR = this.attachShadow({ mode: 'open' });
        this._sR.appendChild(template.content.cloneNode(true));
        this.$title = this._sR.querySelector('.title');
        this.$description = this._sR.querySelector('.description');
    }

    static get observedAttributes() {
        return ['title', 'description'];
    }

    get title() {
        return this.getAttribute('title');
    }

    set title(value) {
        this.setAttribute('title', value);
    }

    get description() {
        return this.getAttribute('description');
    }

    set description(value) {
        this.setAttribute('description', value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }
    
    render() {
        this.$title.innerHTML = this.title;
        this.$description.innerHTML = this.description;
    }
}

window.customElements.define('hover-box', HoverBox);
