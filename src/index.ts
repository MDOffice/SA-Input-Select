import './index.css';

class SAInputSelect extends HTMLElement {

    _isAppend: boolean;
    _appendSeparator: string;
    _input: HTMLInputElement;
    _dropdown: HTMLElement;

    get value() {
        return this.getAttribute('value');
    }

    set value(text) {
        this.setAttribute('value', text);
        if (this._input) {
            this._input.value = text;
        }
    }

    constructor() {
        super();

        this._isAppend = false;
        this._appendSeparator = ' ';

        this.handleInputClick = this.handleInputClick.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === 'data-is-append') {
            if (newValue != undefined) {
                this._isAppend = newValue === 'true' || newValue === '1' || newValue == '';
            } else {
                this._isAppend = false;
            }
        } else if (attrName === 'data-append-separator') {
            if (newValue) {
                this._appendSeparator = newValue;
            } else {
                this._appendSeparator = ' ';
            }
        }
    }

    connectedCallback() {
        const mountPoint = document.createElement('div');
        this.appendChild(mountPoint);
        //const mountPoint = this.attachShadow({ mode: 'open' });
        //mountPoint.innerHTML = '<style>.dropdown-menu {display: none;position: absolute;}.dropdown-menu.open {display: block;}</style>';

        this.makeInput(mountPoint);
        this.makeDropdown(mountPoint);
        this.assignEvent();
    }

    disconnectedCallback() {
        this._input.removeEventListener('click', this.handleInputClick);
        this._input.removeEventListener('keydown', this.hideDropdown);
        this._input.removeEventListener('change', this.handleInputChange);

        this.removeChild(this.getElementsByTagName('div').item(0));
        delete this._input;
        delete this._dropdown;

        document.removeEventListener('click', this.hideDropdown);
    }

    makeInput(shadow: HTMLElement) {
        this._input = document.createElement('input');
        this._input.autocomplete = 'off';
        this._input.setAttribute('class', this.getAttribute('input-class') || '');
        const readonly = this.getAttribute('readonly');
        if (readonly != undefined)
            this._input.setAttribute('readonly', this.getAttribute('readonly'));
        const disabled = this.getAttribute('disabled');
        if (disabled != undefined)
            this._input.setAttribute('disabled', this.getAttribute('disabled'));
        this._input.value = this.getAttribute('value') || '';
        this._input.addEventListener('click', this.handleInputClick);
        this._input.addEventListener('keydown', this.hideDropdown);
        this._input.addEventListener('change', this.handleInputChange);

        shadow.appendChild(this._input);
    }

    makeDropdown(shadow: HTMLElement) {
        this._dropdown = document.createElement('ul');
        this._dropdown.setAttribute('class', 'sa-input-select-dropdown ' + this.getAttribute('dropdown-class') || '');
        //this._dropdown.className = 'dropdown-menu';
        const options = this.getElementsByTagName('option');
        Array.from(options).forEach((el: HTMLOptionElement) => {
            const text = el.innerHTML;
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.innerHTML = text.replace(/^$/, '&nbsp;');
            a.addEventListener('click', (ev) => {
                ev.preventDefault();
                this.handleItemClick(a.innerHTML);
            });
            li.appendChild(a);
            this._dropdown.appendChild(li);
        });
        //shadow.appendChild(this._dropdown);
    }

    hideDropdown() {
        const body = document.getElementsByTagName('body').item(0);

        if (this._dropdown.classList.contains('open')) {
            body.removeChild(this._dropdown);
            this._dropdown.classList.remove('open');
        }
    }

    handleInputClick(ev: MouseEvent) {
        ev.stopPropagation();

        const body = document.getElementsByTagName('body').item(0);

        if (this._dropdown.classList.contains('open')) {
            body.removeChild(this._dropdown);
            this._dropdown.classList.remove('open');
        } else {
            body.appendChild(this._dropdown);
            this._dropdown.classList.add('open');
            const el = ev.target as HTMLInputElement;
            const height = el.offsetHeight;
            const { left: offsetLeft, top: offsetTop } = this.getGlobalOffset(el);
            console.log(offsetLeft, offsetTop);
            this._dropdown.style.top = (offsetTop + height) + 'px';
            this._dropdown.style.left = offsetLeft + 'px';
        }
    }

    getGlobalOffset(el: HTMLElement): {left: number, top: number} {
        let x = 0, y = 0;
        while (el) {
            x += el.offsetLeft;
            y += el.offsetTop;
            el = el.offsetParent as HTMLElement;
        }
        return { left: x, top: y };
    }

    handleInputChange(ev: MouseEvent) {
        ev.stopPropagation();
        const el = ev.target as HTMLInputElement;
        this.value = el.value;
        this.makeChangeEvent();
    }

    handleItemClick(text: string) {
        if (this._isAppend) {
            this.value += this._appendSeparator + text.replace(/^&nbsp;$/, '');
        } else {
            this.value = text.replace(/^&nbsp;$/, '');
        }
        this.makeChangeEvent();
        this.hideDropdown();
    }

    makeChangeEvent() {
        const event = new Event('change', { bubbles: true });
        this.dispatchEvent(event);
    }

    assignEvent() {
        document.addEventListener('click', this.hideDropdown);
    }

    static get observedAttributes() {
        return ['data-is-append', 'data-append-separator'];
    }
}

customElements.define('sa-input-select', SAInputSelect);
