var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { animationEvent, bindable, customAttribute } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';
import { getLogger } from 'aurelia-logging';
let AureliaMdcPagesAnimator = class AureliaMdcPagesAnimator {
    constructor(element) {
        this.element = element;
        this.forwardClass = 'go-forward';
        this.backClass = 'go-back';
        this.eventBegin = animationEvent.leaveBegin;
        this.eventTimeout = animationEvent.leaveTimeout;
        this.eventDone = animationEvent.leaveDone;
        this.history = [];
        this.log = getLogger('aurelia-mdc-pages-animator');
    }
    attached() {
        this.onPopState();
        PLATFORM.global.addEventListener('popstate', this.onPopState.bind(this));
        DOM.addEventListener(this.eventBegin, this.onAnimationBegin.bind(this), false);
        DOM.addEventListener(this.eventTimeout, this.onAnimationTimeout.bind(this), false);
        DOM.addEventListener(this.eventDone, this.onAnimationDone.bind(this), false);
    }
    detached() {
        DOM.removeEventListener(this.eventBegin, this.onAnimationBegin.bind(this), false);
        DOM.removeEventListener(this.eventTimeout, this.onAnimationTimeout.bind(this), false);
        DOM.removeEventListener(this.eventDone, this.onAnimationDone.bind(this), false);
        PLATFORM.global.removeEventListener('popstate', this.onPopState.bind(this));
    }
    onAnimationBegin(event) {
        if (event.type !== this.eventBegin) {
            return;
        }
        if (event.detail.parentElement !== this.element) {
            return;
        }
        this.log.debug('begin');
        const body = DOM.querySelectorAll('body')[0];
        body.style.overflow = 'hidden';
    }
    onAnimationTimeout(event) {
        if (event.type !== this.eventTimeout) {
            return;
        }
        if (event.detail.parentElement !== this.element) {
            return;
        }
        this.log.debug('timeout');
        this.animationDone();
    }
    onAnimationDone(event) {
        if (event.type !== this.eventDone) {
            return;
        }
        if (event.detail.parentElement !== this.element) {
            return;
        }
        this.log.debug('done');
        this.animationDone();
    }
    animationDone() {
        const body = DOM.querySelectorAll('body')[0];
        body.style.overflow = 'auto';
        this.element.classList.remove(this.backClass, this.forwardClass);
        this.fireEvent(this.element, 'on-animation-done');
    }
    onPopState() {
        let addClass = '';
        const target = PLATFORM.location.href;
        const atIndex = this.history.indexOf(target);
        if (atIndex === -1) {
            this.history.push(target);
            addClass = this.forwardClass;
        }
        else {
            this.history.splice(atIndex + 1, this.history.length - atIndex);
            addClass = this.backClass;
        }
        if (this.element) {
            this.log.debug('adding class', addClass);
            this.element.classList.remove(this.backClass, this.forwardClass);
            this.element.classList.add(addClass);
        }
    }
    fireEvent(element, event, data) {
        const e = new CustomEvent(event, {
            bubbles: true,
            detail: data
        });
        element.dispatchEvent(e);
        return e;
    }
};
AureliaMdcPagesAnimator.inject = [Element];
__decorate([
    bindable(),
    __metadata("design:type", Object)
], AureliaMdcPagesAnimator.prototype, "forwardClass", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], AureliaMdcPagesAnimator.prototype, "backClass", void 0);
AureliaMdcPagesAnimator = __decorate([
    customAttribute('aurelia-mdc-pages-animator'),
    __metadata("design:paramtypes", [Element])
], AureliaMdcPagesAnimator);
export { AureliaMdcPagesAnimator };
