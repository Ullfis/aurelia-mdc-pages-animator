import { animationEvent, bindable, customAttribute } from 'aurelia-templating';
import { DOM, PLATFORM } from 'aurelia-pal';
import { Logger, getLogger } from 'aurelia-logging';

@customAttribute('aurelia-mdc-pages-animator')
export class AureliaMdcPagesAnimator {
  public static inject = [Element];

  @bindable() public forwardClass = 'go-forward';
  @bindable() public backClass = 'go-back';

  private log: Logger;
  private eventBegin = animationEvent.leaveBegin;
  private eventTimeout = animationEvent.leaveTimeout;
  private eventDone = animationEvent.leaveDone;
  private history: string[] = [];

  constructor(private element: Element) {
    this.log = getLogger('aurelia-mdc-pages-animator');
  }

  private attached() {
    this.onPopState();
    PLATFORM.global.addEventListener('popstate', this.onPopState.bind(this));
    DOM.addEventListener(this.eventBegin, this.onAnimationBegin.bind(this), false);
    DOM.addEventListener(this.eventTimeout, this.onAnimationTimeout.bind(this), false);
    DOM.addEventListener(this.eventDone, this.onAnimationDone.bind(this), false);
  }

  private detached() {
    DOM.removeEventListener(this.eventBegin, this.onAnimationBegin.bind(this), false);
    DOM.removeEventListener(this.eventTimeout, this.onAnimationTimeout.bind(this), false);
    DOM.removeEventListener(this.eventDone, this.onAnimationDone.bind(this), false);
    PLATFORM.global.removeEventListener('popstate', this.onPopState.bind(this));
  }

  // animation begins
  private onAnimationBegin(event) {
    if (event.type !== this.eventBegin) { return; }
    if (event.detail.parentElement !== this.element) { return; }
    this.log.debug('begin');
    const body = DOM.querySelectorAll('body')[0] as HTMLBodyElement;
    body.style.overflow = 'hidden';
  }

  // animation done
  private onAnimationTimeout(event) {
    if (event.type !== this.eventTimeout) { return; }
    if (event.detail.parentElement !== this.element) { return; }
    this.log.debug('timeout');
    this.animationDone();
  }

  // animation done
  private onAnimationDone(event) {
    if (event.type !== this.eventDone) { return; }
    if (event.detail.parentElement !== this.element) { return; }
    this.log.debug('done');
    this.animationDone();
  }

  // animation done
  private animationDone() {
    const body = DOM.querySelectorAll('body')[0] as HTMLBodyElement;
    body.style.overflow = 'auto';
    this.element.classList.remove(this.backClass, this.forwardClass);
    this.fireEvent(this.element, 'on-animation-done');
  }

  // forward or back?
  private onPopState() {
    let addClass = '';
    const target = PLATFORM.location.href;
    const atIndex = this.history.indexOf(target);

    if (atIndex === -1) {
      // not registred in history?.
      // use forward class and push target to history.
      this.history.push(target);
      addClass = this.forwardClass;

      // already registred in history?
      // use back class and reset history to that point.
    } else {
      this.history.splice(atIndex + 1, this.history.length - atIndex);
      addClass = this.backClass;
    }
    if (this.element) {
      this.log.debug('adding class', addClass);
      this.element.classList.remove(this.backClass, this.forwardClass);
      this.element.classList.add(addClass);
    }
  }

  private fireEvent(element: Element, event: string, data?: any): CustomEvent {
    const e = new CustomEvent(event, {
      bubbles: true,
      detail: data
    });
    element.dispatchEvent(e);
    return e;
  }
}
