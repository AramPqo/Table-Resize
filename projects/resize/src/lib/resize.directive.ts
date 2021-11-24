import { Directive, ElementRef, Input, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[tableResize]'
})
export class ResizeDirective implements AfterViewInit {

    @Input('fixed') isFixed = false;

    table: HTMLTableElement;
    private thCollection: HTMLCollectionOf<HTMLTableCellElement>;
    private th: HTMLTableCellElement;
    private nextTh: HTMLTableCellElement;
    private index: number;
    private lineCollection: HTMLDivElement[] = [];
    private width: number;
    private cursorStartPosition = 0;
    private nextWidth: number;
    private listeners: Function[] = [];
    private dragStart = false;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) { }

    ngAfterViewInit() {
        this.create();
    }

    create() {
        this.table = this.element.nativeElement;
        this.thCollection = this.table.getElementsByTagName('th');

        for (let i = 0; i < this.thCollection.length; i++) {
            if (i !== this.thCollection.length - 1) {
                const resizeHandle = document.createElement('div');
                this.setLineStyles(resizeHandle);
                this.renderer.addClass(resizeHandle, 'resize-handle');
                this.lineCollection.push(resizeHandle);
                this.renderer.appendChild(this.thCollection[i], resizeHandle);
                this.renderer.setStyle(this.thCollection[i], 'position', 'relative');
            }

            let width: string | number;

            if (this.isFixed && i === 0) {
                width = 'auto';
                this.setWidth(this.thCollection[i], 'auto');
            } else {
                width = Math.round(this.thCollection[i].getBoundingClientRect().width);
            }

            this.setWidth(this.thCollection[i], width);
        }

        this.createEvents();
    }

    createEvents() {
        const tableCellArr = Array.from(this.table.getElementsByTagName('th')).filter((v, i, arr) => i !== arr.length - 1);

        for (let i = 0; i < tableCellArr.length; i++) {
            this.renderer.listen(this.lineCollection[i], 'mousedown', this.mouseDown);
            this.renderer.setAttribute(this.lineCollection[i], 'tr-resize', `${i}`);
        }
    }

    setLineStyles(el: HTMLDivElement) {
        this.renderer.setStyle(el, 'position', 'absolute');
        this.renderer.setStyle(el, 'cursor', 'e-resize');
        this.renderer.setStyle(el, 'width', '8px');
        this.renderer.setStyle(el, 'right', '0');
        this.renderer.setStyle(el, 'top', '0');
        this.renderer.setStyle(el, 'height', '100%');
        this.renderer.setStyle(el, 'background', '#cbd1d8');
        this.renderer.setStyle(el, 'position', 'absolute');
    }

    setWidth(element: HTMLTableCellElement, width: number | string) {
        this.renderer.setStyle(element, 'width', width + (width === 'auto' ? '' : 'px'));
    }

    endDrag = () => {
        this.renderer.removeStyle(this.table.firstElementChild, 'cursor');
        if (this.dragStart) {
            this.dragStart = false;
        }

        this.listeners.forEach(fn => fn());
        this.listeners = [];
    }

    mouseDown = (event: MouseEvent) => {
        const theadRow = this.table.firstElementChild;
        this.renderer.setStyle(theadRow, 'cursor', 'e-resize');

        const listenerMove = this.renderer.listen(theadRow, 'mousemove', this.mouseMove);
        const listenerLeave = this.renderer.listen(theadRow, 'mouseleave', this.endDrag);
        const listenerUp = this.renderer.listen(theadRow, 'mouseup', this.endDrag);

        this.listeners.push(listenerMove, listenerLeave, listenerUp);

        const resize = event.target;
        this.index = parseInt(`${(resize as HTMLDivElement).getAttribute('tr-resize')}`);
        this.th = this.thCollection[this.index];
        this.nextTh = this.thCollection[this.index + 1];
        this.dragStart = true;
        this.cursorStartPosition = event.pageX;
        this.width = parseInt(getComputedStyle(this.isFixed ? this.nextTh : this.th, null).getPropertyValue('width'), 10);

        if (this.nextTh != undefined && !this.isFixed) {
            this.nextWidth = parseInt(getComputedStyle(this.nextTh, null).getPropertyValue('width'), 10);
        }
    }

    resizeFixed(cursorPosition: number, newWidth: number) {
        if (!this.firstThLimit() && cursorPosition < this.cursorStartPosition) {
            return;
        } else {
            this.setWidth(this.nextTh, newWidth);
        }
    }

    resize(newNextWidth: number, newWidth: number) {
        this.setWidth(this.th, newWidth);
        if (this.nextTh != undefined) {
            this.setWidth(this.nextTh, newNextWidth);
        }
    }

    firstThLimit() {
        const leftPd = parseInt(getComputedStyle(this.th, null).getPropertyValue('padding-left'), 10);
        const rightPd = parseInt(getComputedStyle(this.th, null).getPropertyValue('padding-right'), 10);
        const offset = leftPd + rightPd;
        return ((Math.round(this.thCollection[0].getBoundingClientRect().width) - offset) > 60);
    }

    mouseMove = (event: MouseEvent) => {
        if (this.dragStart) {
            const cursorPosition = event['pageX'];
            const mouseMoved = (cursorPosition - this.cursorStartPosition);
            const newWidth = this.isFixed ? this.width - mouseMoved : this.width + mouseMoved;

            let newNextWidth = this.nextWidth;

            if (this.nextTh !== undefined && this.nextWidth !== undefined) {
                if (this.isFixed) {
                    newNextWidth = - mouseMoved;
                } else {
                    newNextWidth = this.nextWidth - mouseMoved;
                }
            }

            if (this.isFixed && newWidth && newWidth > 50 && this.isFixed) {
                this.resizeFixed(cursorPosition, newWidth);
            }

            if (newWidth > 50 && (newNextWidth > 50 || this.nextTh == undefined)) {
                this.resize(newNextWidth, newWidth);
            }
        }
    }
}