export declare class AureliaMdcPagesAnimator {
    private element;
    static inject: {
        new (): Element;
        prototype: Element;
    }[];
    forwardClass: string;
    backClass: string;
    private log;
    private eventBegin;
    private eventTimeout;
    private eventDone;
    private history;
    constructor(element: Element);
    private attached();
    private detached();
    private onAnimationBegin(event);
    private onAnimationTimeout(event);
    private onAnimationDone(event);
    private animationDone();
    private onPopState();
    private fireEvent(element, event, data?);
}
