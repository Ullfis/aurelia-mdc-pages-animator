"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_pal_1 = require("aurelia-pal");
var aurelia_logging_1 = require("aurelia-logging");
var AureliaMdcPagesAnimator = (function () {
    function AureliaMdcPagesAnimator(element) {
        this.element = element;
        this.forwardClass = 'go-forward';
        this.backClass = 'go-back';
        this.eventBegin = aurelia_templating_1.animationEvent.leaveBegin;
        this.eventTimeout = aurelia_templating_1.animationEvent.leaveTimeout;
        this.eventDone = aurelia_templating_1.animationEvent.leaveDone;
        this.history = [];
        this.log = aurelia_logging_1.getLogger('aurelia-mdc-pages-animator');
    }
    AureliaMdcPagesAnimator.prototype.attached = function () {
        this.onPopState();
        aurelia_pal_1.PLATFORM.global.addEventListener('popstate', this.onPopState.bind(this));
        aurelia_pal_1.DOM.addEventListener(this.eventBegin, this.onAnimationBegin.bind(this), false);
        aurelia_pal_1.DOM.addEventListener(this.eventTimeout, this.onAnimationTimeout.bind(this), false);
        aurelia_pal_1.DOM.addEventListener(this.eventDone, this.onAnimationDone.bind(this), false);
    };
    AureliaMdcPagesAnimator.prototype.detached = function () {
        aurelia_pal_1.DOM.removeEventListener(this.eventBegin, this.onAnimationBegin.bind(this), false);
        aurelia_pal_1.DOM.removeEventListener(this.eventTimeout, this.onAnimationTimeout.bind(this), false);
        aurelia_pal_1.DOM.removeEventListener(this.eventDone, this.onAnimationDone.bind(this), false);
        aurelia_pal_1.PLATFORM.global.removeEventListener('popstate', this.onPopState.bind(this));
    };
    AureliaMdcPagesAnimator.prototype.onAnimationBegin = function (event) {
        if (event.type !== this.eventBegin) {
            return;
        }
        if (event.detail.parentElement !== this.element) {
            return;
        }
        this.log.debug('begin');
        var body = aurelia_pal_1.DOM.querySelectorAll('body')[0];
        body.style.overflow = 'hidden';
    };
    AureliaMdcPagesAnimator.prototype.onAnimationTimeout = function (event) {
        if (event.type !== this.eventTimeout) {
            return;
        }
        if (event.detail.parentElement !== this.element) {
            return;
        }
        this.log.debug('timeout');
        this.animationDone();
    };
    AureliaMdcPagesAnimator.prototype.onAnimationDone = function (event) {
        if (event.type !== this.eventDone) {
            return;
        }
        if (event.detail.parentElement !== this.element) {
            return;
        }
        this.log.debug('done');
        this.animationDone();
    };
    AureliaMdcPagesAnimator.prototype.animationDone = function () {
        var body = aurelia_pal_1.DOM.querySelectorAll('body')[0];
        body.style.overflow = 'auto';
        this.element.classList.remove(this.backClass, this.forwardClass);
        this.fireEvent(this.element, 'on-animation-done');
    };
    AureliaMdcPagesAnimator.prototype.onPopState = function () {
        var addClass = '';
        var target = aurelia_pal_1.PLATFORM.location.href;
        var atIndex = this.history.indexOf(target);
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
    };
    AureliaMdcPagesAnimator.prototype.fireEvent = function (element, event, data) {
        var e = new CustomEvent(event, {
            bubbles: true,
            detail: data
        });
        element.dispatchEvent(e);
        return e;
    };
    AureliaMdcPagesAnimator.inject = [Element];
    __decorate([
        aurelia_templating_1.bindable(),
        __metadata("design:type", Object)
    ], AureliaMdcPagesAnimator.prototype, "forwardClass", void 0);
    __decorate([
        aurelia_templating_1.bindable(),
        __metadata("design:type", Object)
    ], AureliaMdcPagesAnimator.prototype, "backClass", void 0);
    AureliaMdcPagesAnimator = __decorate([
        aurelia_templating_1.customAttribute('aurelia-mdc-pages-animator'),
        __metadata("design:paramtypes", [Element])
    ], AureliaMdcPagesAnimator);
    return AureliaMdcPagesAnimator;
}());
exports.AureliaMdcPagesAnimator = AureliaMdcPagesAnimator;
