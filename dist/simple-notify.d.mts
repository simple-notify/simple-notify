declare const NOTIFY_STATUS_ENUMS: {
    readonly ERROR: "error";
    readonly WARNING: "warning";
    readonly SUCCESS: "success";
    readonly INFO: "info";
};
declare const NOTIFY_TYPE_ENUMS: {
    readonly OUTLINE: "outline";
    readonly FILLED: "filled";
};
declare const NOTIFY_ANIMATION_ENUMS: {
    readonly FADE: "fade";
    readonly SLIDE: "slide";
};

type NotifyPosition = 'left top' | 'top left' | 'right top' | 'top right' | 'left bottom' | 'bottom left' | 'right bottom' | 'bottom right' | 'center' | 'left y-center' | 'right y-center' | 'y-center left' | 'y-center right' | 'top x-center' | 'bottom x-center' | 'x-center top' | 'x-center bottom';
type NotifyType = (typeof NOTIFY_TYPE_ENUMS)[keyof typeof NOTIFY_TYPE_ENUMS];
type NotifyEffect = (typeof NOTIFY_ANIMATION_ENUMS)[keyof typeof NOTIFY_ANIMATION_ENUMS];
type NotifyStatus = (typeof NOTIFY_STATUS_ENUMS)[keyof typeof NOTIFY_STATUS_ENUMS];
interface IArgs {
    status?: NotifyStatus;
    type?: NotifyType;
    effect?: NotifyEffect;
    position?: NotifyPosition;
    title?: string;
    text?: string;
    showIcon?: boolean;
    customIcon?: string;
    showCloseButton?: boolean;
    customClass?: string;
    speed?: number;
    autoclose?: boolean;
    autotimeout?: number;
    notificationsGap?: number;
    notificationsPadding?: number;
    customWrapper?: string;
}

declare class Notify {
    wrapper: HTMLElement;
    customWrapper: string;
    container: HTMLElement;
    status: NotifyStatus;
    type: NotifyType;
    effect: NotifyEffect;
    position: NotifyPosition;
    title: string;
    text: string;
    showIcon: boolean;
    customIcon: string;
    showCloseButton: boolean;
    customClass: string;
    speed: number;
    autoclose: boolean;
    autotimeout: number;
    notificationsGap: number;
    notificationsPadding: number;
    selectedNotifyInEffect: (self: Notify) => void;
    selectedNotifyOutEffect: (self: Notify) => void;
    constructor(args: IArgs);
    private checkRequirements;
    private setContainer;
    private setPosition;
    private setCloseButton;
    private setWrapper;
    private setContent;
    private setIcon;
    private setObserver;
    private notifyIn;
    private notifyOut;
    private autoClose;
    close(): void;
    private setEffect;
}

export { Notify as default };
