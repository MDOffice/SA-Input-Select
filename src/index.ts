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
        this._input.removeEventListener('change', this.makeChangeEvent);

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
        this._input.addEventListener('click', this.handleInputClick.bind(this));
        this._input.addEventListener('keydown', this.hideDropdown.bind(this));
        this._input.addEventListener('change', this.makeChangeEvent.bind(this));

        shadow.appendChild(this._input);
    }

    makeDropdown(shadow: HTMLElement) {
        this._dropdown = document.createElement('ul');
        this._dropdown.setAttribute('class', this.getAttribute('dropdown-class') || 'dropdown-menu');
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
        shadow.appendChild(this._dropdown);
    }

    hideDropdown() {
        if (this._dropdown.classList.contains('open')) {
            this._dropdown.classList.remove('open');
        }
    }

    handleInputClick(ev: MouseEvent) {
        ev.stopPropagation();

        if (this._dropdown.classList.contains('open')) {
            this._dropdown.classList.remove('open');
        } else {
            this._dropdown.classList.add('open');
            this._dropdown.style.top = ev.target.offsetTop + ev.target.offsetHeight;
            this._dropdown.style.left = ev.target.offsetLeft;
        }
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
        const event = new Event('change');
        this.dispatchEvent(event);
    }

    assignEvent() {
        document.addEventListener('click', this.hideDropdown.bind(this));
    }

    render() {
        this.$element.removeAttr('name');// after copy to Input
    }

    static get observedAttributes() {
        return ['data-is-append', 'data-append-separator'];
    }
}

customElements.define('sa-input-select', SAInputSelect);
