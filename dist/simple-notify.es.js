var fadeIn = function (self) {
    self.wrapper.classList.add('notify--fade');
    setTimeout(function () { self.wrapper.classList.add('notify--fadeIn'); }, 100);
};
var fadeOut = function (self) {
    self.wrapper.classList.remove('notify--fadeIn');
    setTimeout(function () { self.wrapper.remove(); }, self.speed);
};
var slideIn = function (self) {
    self.wrapper.classList.add('notify--slide');
    setTimeout(function () { self.wrapper.classList.add('notify--slideIn'); }, 100);
};
var slideOut = function (self) {
    self.wrapper.classList.remove('notify--slideIn');
    setTimeout(function () { self.wrapper.remove(); }, self.speed);
};

var Notify = /** @class */ (function () {
    function Notify(args) {
        var _this = this;
        this.notifyOut = function (callback) {
            callback(_this);
        };
        this.fadeIn = fadeIn;
        this.fadeOut = fadeOut;
        this.slideIn = slideIn;
        this.slideOut = slideOut;
        var _a = args.status, status = _a === void 0 ? null : _a, _b = args.type, type = _b === void 0 ? 1 : _b, _c = args.title, title = _c === void 0 ? null : _c, _d = args.text, text = _d === void 0 ? null : _d, _e = args.showIcon, showIcon = _e === void 0 ? true : _e, _f = args.customIcon, customIcon = _f === void 0 ? null : _f, _g = args.customClass, customClass = _g === void 0 ? null : _g, _h = args.speed, speed = _h === void 0 ? 500 : _h, _j = args.effect, effect = _j === void 0 ? 'fade' : _j, _k = args.showCloseButton, showCloseButton = _k === void 0 ? true : _k, _l = args.autoclose, autoclose = _l === void 0 ? false : _l, _m = args.autotimeout, autotimeout = _m === void 0 ? 3000 : _m, _o = args.gap, gap = _o === void 0 ? 20 : _o, _p = args.distance, distance = _p === void 0 ? 20 : _p, _q = args.position, position = _q === void 0 ? 'right top' : _q;
        this.status = status;
        this.title = title;
        this.text = text;
        this.showIcon = showIcon;
        this.customIcon = customIcon;
        this.customClass = customClass;
        this.speed = speed;
        this.effect = effect;
        this.showCloseButton = showCloseButton;
        this.autoclose = autoclose;
        this.autotimeout = autotimeout;
        this.gap = gap;
        this.distance = distance;
        this.type = type;
        this.position = position;
        if (!this.checkRequirements()) {
            console.error("You must specify 'title' or 'text' at least.");
            return;
        }
        // set outer container for all Notify's
        this.setContainer();
        // set wrapper for each Notify
        this.setWrapper();
        this.setPosition();
        // set icon in the left
        if (this.showIcon)
            this.setIcon();
        // set close button
        if (this.showCloseButton)
            this.setCloseButton();
        // set title, text
        this.setContent();
        // add the Notify to our container
        this.container.prepend(this.wrapper);
        // init effect
        this.setEffect();
        this.notifyIn(this.selectedNotifyInEffect);
        // init autoclose
        if (this.autoclose)
            this.autoClose();
        // check whether Notify is visible
        this.setObserver();
    }
    Notify.prototype.checkRequirements = function () {
        return !!(this.title || this.text);
    };
    Notify.prototype.setContainer = function () {
        var container = document.querySelector('.notifications-container');
        if (container) {
            this.container = container;
        }
        else {
            this.container = document.createElement('div');
            this.container.classList.add('notifications-container');
            document.body.appendChild(this.container);
        }
        this.container.style.setProperty('--distance', this.distance + "px");
    };
    Notify.prototype.setPosition = function () {
        var prefix = 'notify-is-';
        this.position === 'center' ? this.container.classList.add(prefix + "center") : this.container.classList.remove(prefix + "center");
        this.position.includes('left') ? this.container.classList.add(prefix + "left") : this.container.classList.remove(prefix + "left");
        this.position.includes('right') ? this.container.classList.add(prefix + "right") : this.container.classList.remove(prefix + "right");
        this.position.includes('x-center') ? this.container.classList.add(prefix + "x-center") : this.container.classList.remove(prefix + "x-center");
        this.position.includes('top') ? this.container.classList.add(prefix + "top") : this.container.classList.remove(prefix + "top");
        this.position.includes('bottom') ? this.container.classList.add(prefix + "bottom") : this.container.classList.remove(prefix + "bottom");
        this.position.includes('y-center') ? this.container.classList.add(prefix + "y-center") : this.container.classList.remove(prefix + "y-center");
    };
    Notify.prototype.setCloseButton = function () {
        var _this = this;
        var icon_close = '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.94 7.99988L13.14 3.80655C13.2655 3.68101 13.3361 3.51075 13.3361 3.33321C13.3361 3.15568 13.2655 2.98542 13.14 2.85988C13.0145 2.73434 12.8442 2.66382 12.6667 2.66382C12.4891 2.66382 12.3189 2.73434 12.1933 2.85988L8 7.05988L3.80667 2.85988C3.68113 2.73434 3.51087 2.66382 3.33333 2.66382C3.1558 2.66382 2.98554 2.73434 2.86 2.85988C2.73446 2.98542 2.66394 3.15568 2.66394 3.33321C2.66394 3.51075 2.73446 3.68101 2.86 3.80655L7.06 7.99988L2.86 12.1932C2.79751 12.2552 2.74792 12.3289 2.71407 12.4102C2.68023 12.4914 2.6628 12.5785 2.6628 12.6665C2.6628 12.7546 2.68023 12.8417 2.71407 12.9229C2.74792 13.0042 2.79751 13.0779 2.86 13.1399C2.92198 13.2024 2.99571 13.252 3.07695 13.2858C3.15819 13.3197 3.24533 13.3371 3.33333 13.3371C3.42134 13.3371 3.50848 13.3197 3.58972 13.2858C3.67096 13.252 3.74469 13.2024 3.80667 13.1399L8 8.93988L12.1933 13.1399C12.2553 13.2024 12.329 13.252 12.4103 13.2858C12.4915 13.3197 12.5787 13.3371 12.6667 13.3371C12.7547 13.3371 12.8418 13.3197 12.9231 13.2858C13.0043 13.252 13.078 13.2024 13.14 13.1399C13.2025 13.0779 13.2521 13.0042 13.2859 12.9229C13.3198 12.8417 13.3372 12.7546 13.3372 12.6665C13.3372 12.5785 13.3198 12.4914 13.2859 12.4102C13.2521 12.3289 13.2025 12.2552 13.14 12.1932L8.94 7.99988Z" fill="currentColor"/></svg>';
        var closeWrapper = document.createElement('div');
        closeWrapper.classList.add('notify__close');
        closeWrapper.innerHTML = icon_close;
        this.wrapper.appendChild(closeWrapper);
        closeWrapper.addEventListener('click', function () {
            _this.close();
        });
    };
    Notify.prototype.setWrapper = function () {
        var wrapper = document.createElement('div');
        this.wrapper = wrapper;
        this.wrapper.style.setProperty('--gap', this.gap + "px");
        this.wrapper.style.transitionDuration = this.speed + "ms";
        // set classes
        this.wrapper.classList.add('notify');
        this.wrapper.classList.add("notify--type-" + this.type);
        this.wrapper.classList.add("notify--" + this.status);
        if (this.customClass)
            this.wrapper.classList.add(this.customClass);
    };
    Notify.prototype.setContent = function () {
        var contentWrapper = document.createElement('div');
        contentWrapper.classList.add('notify-content');
        var titleElement = document.createElement('div');
        titleElement.classList.add('notify__title');
        titleElement.textContent = this.title;
        if (!this.showCloseButton)
            titleElement.style.paddingRight = '0';
        var textElement = document.createElement('div');
        textElement.classList.add('notify__text');
        textElement.textContent = this.text;
        if (!this.title)
            textElement.style.marginTop = '0';
        this.wrapper.appendChild(contentWrapper);
        contentWrapper.appendChild(titleElement);
        contentWrapper.appendChild(textElement);
    };
    Notify.prototype.setIcon = function () {
        var icon_success = '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M19.6267 11.7201L13.9067 17.4534L11.7067 15.2534C11.5871 15.1138 11.44 15.0005 11.2746 14.9204C11.1092 14.8404 10.929 14.7954 10.7454 14.7884C10.5618 14.7813 10.3787 14.8122 10.2076 14.8792C10.0365 14.9463 9.88107 15.0479 9.75113 15.1779C9.62119 15.3078 9.51951 15.4632 9.45248 15.6343C9.38545 15.8054 9.35451 15.9885 9.3616 16.1722C9.36869 16.3558 9.41366 16.536 9.4937 16.7014C9.57373 16.8668 9.68709 17.0139 9.82666 17.1334L12.96 20.2801C13.0846 20.4037 13.2323 20.5014 13.3948 20.5678C13.5572 20.6341 13.7312 20.6678 13.9067 20.6667C14.2564 20.6653 14.5916 20.5264 14.84 20.2801L21.5067 13.6134C21.6316 13.4895 21.7308 13.342 21.7985 13.1795C21.8662 13.017 21.9011 12.8428 21.9011 12.6667C21.9011 12.4907 21.8662 12.3165 21.7985 12.154C21.7308 11.9915 21.6316 11.844 21.5067 11.7201C21.2568 11.4717 20.9189 11.3324 20.5667 11.3324C20.2144 11.3324 19.8765 11.4717 19.6267 11.7201ZM16 2.66675C13.3629 2.66675 10.785 3.44873 8.59239 4.91382C6.39974 6.37891 4.69077 8.46129 3.6816 10.8976C2.67243 13.334 2.40839 16.0149 2.92286 18.6013C3.43733 21.1877 4.70721 23.5635 6.57191 25.4282C8.43661 27.2929 10.8124 28.5627 13.3988 29.0772C15.9852 29.5917 18.6661 29.3276 21.1024 28.3185C23.5388 27.3093 25.6212 25.6003 27.0863 23.4077C28.5513 21.215 29.3333 18.6372 29.3333 16.0001C29.3333 14.2491 28.9885 12.5153 28.3184 10.8976C27.6483 9.27996 26.6662 7.81011 25.4281 6.57199C24.19 5.33388 22.7201 4.35175 21.1024 3.68169C19.4848 3.01162 17.751 2.66675 16 2.66675ZM16 26.6667C13.8903 26.6667 11.828 26.0412 10.0739 24.8691C8.31979 23.697 6.95262 22.0311 6.14528 20.082C5.33795 18.133 5.12671 15.9882 5.53829 13.9191C5.94986 11.85 6.96576 9.94937 8.45752 8.45761C9.94928 6.96585 11.8499 5.94995 13.919 5.53837C15.9882 5.1268 18.1329 5.33803 20.082 6.14537C22.031 6.9527 23.6969 8.31987 24.869 10.074C26.0411 11.8281 26.6667 13.8904 26.6667 16.0001C26.6667 18.8291 25.5429 21.5422 23.5425 23.5426C21.5421 25.5429 18.829 26.6667 16 26.6667Z"/></svg>';
        var icon_error = '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M16 2.66675C13.3629 2.66675 10.785 3.44873 8.59239 4.91382C6.39974 6.37891 4.69077 8.46129 3.6816 10.8976C2.67243 13.334 2.40839 16.0149 2.92286 18.6013C3.43733 21.1877 4.70721 23.5635 6.57191 25.4282C8.43661 27.2929 10.8124 28.5627 13.3988 29.0772C15.9852 29.5917 18.6661 29.3276 21.1024 28.3185C23.5388 27.3093 25.6212 25.6003 27.0863 23.4077C28.5513 21.215 29.3333 18.6372 29.3333 16.0001C29.3333 14.2491 28.9885 12.5153 28.3184 10.8976C27.6483 9.27996 26.6662 7.81011 25.4281 6.57199C24.19 5.33388 22.7201 4.35175 21.1024 3.68169C19.4848 3.01162 17.751 2.66675 16 2.66675ZM16 26.6667C13.171 26.6667 10.4579 25.5429 8.45752 23.5426C6.45714 21.5422 5.33333 18.8291 5.33333 16.0001C5.33038 13.6312 6.12402 11.3301 7.58666 9.46675L22.5333 24.4134C20.6699 25.8761 18.3689 26.6697 16 26.6667ZM24.4133 22.5334L9.46666 7.58675C11.3301 6.1241 13.6311 5.33047 16 5.33341C18.829 5.33341 21.5421 6.45722 23.5425 8.45761C25.5429 10.458 26.6667 13.1711 26.6667 16.0001C26.6696 18.369 25.876 20.67 24.4133 22.5334Z"/></svg>';
        var icon_warning = '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M16 14.6667C15.6464 14.6667 15.3072 14.8072 15.0572 15.0573C14.8071 15.3073 14.6667 15.6465 14.6667 16.0001V21.3334C14.6667 21.687 14.8071 22.0262 15.0572 22.2762C15.3072 22.5263 15.6464 22.6667 16 22.6667C16.3536 22.6667 16.6928 22.5263 16.9428 22.2762C17.1929 22.0262 17.3333 21.687 17.3333 21.3334V16.0001C17.3333 15.6465 17.1929 15.3073 16.9428 15.0573C16.6928 14.8072 16.3536 14.6667 16 14.6667ZM16.5067 9.44008C16.182 9.30672 15.8179 9.30672 15.4933 9.44008C15.3297 9.50354 15.1801 9.59869 15.0533 9.72008C14.9356 9.84968 14.8409 9.9985 14.7733 10.1601C14.6987 10.3183 14.6622 10.4918 14.6667 10.6667C14.6656 10.8422 14.6993 11.0162 14.7656 11.1786C14.832 11.3411 14.9298 11.4888 15.0533 11.6134C15.1829 11.7312 15.3317 11.8259 15.4933 11.8934C15.6953 11.9764 15.9146 12.0085 16.1319 11.9869C16.3492 11.9653 16.5579 11.8906 16.7396 11.7695C16.9213 11.6484 17.0705 11.4845 17.174 11.2922C17.2775 11.0999 17.3322 10.8851 17.3333 10.6667C17.3284 10.3137 17.1903 9.97559 16.9467 9.72008C16.8199 9.59869 16.6703 9.50354 16.5067 9.44008ZM16 2.66675C13.3629 2.66675 10.785 3.44873 8.59239 4.91382C6.39974 6.37891 4.69077 8.46129 3.6816 10.8976C2.67243 13.334 2.40839 16.0149 2.92286 18.6013C3.43733 21.1877 4.70721 23.5635 6.57191 25.4282C8.43661 27.2929 10.8124 28.5627 13.3988 29.0772C15.9852 29.5917 18.6661 29.3276 21.1024 28.3185C23.5388 27.3093 25.6212 25.6003 27.0863 23.4077C28.5513 21.215 29.3333 18.6372 29.3333 16.0001C29.3333 14.2491 28.9885 12.5153 28.3184 10.8976C27.6483 9.27996 26.6662 7.81011 25.4281 6.57199C24.19 5.33388 22.7201 4.35175 21.1024 3.68169C19.4848 3.01162 17.751 2.66675 16 2.66675ZM16 26.6667C13.8903 26.6667 11.828 26.0412 10.0739 24.8691C8.31979 23.697 6.95262 22.0311 6.14528 20.082C5.33795 18.133 5.12671 15.9882 5.53829 13.9191C5.94986 11.85 6.96576 9.94937 8.45752 8.45761C9.94928 6.96585 11.8499 5.94995 13.919 5.53837C15.9882 5.1268 18.1329 5.33803 20.082 6.14537C22.031 6.9527 23.6969 8.31987 24.869 10.074C26.0411 11.8281 26.6667 13.8904 26.6667 16.0001C26.6667 18.8291 25.5429 21.5422 23.5425 23.5426C21.5421 25.5429 18.829 26.6667 16 26.6667Z"/></svg>';
        var computedIcon = function (status) {
            switch (status) {
                case 'success':
                    return icon_success;
                case 'warning':
                    return icon_warning;
                case 'error':
                    return icon_error;
            }
        };
        var iconWrapper = document.createElement('div');
        iconWrapper.classList.add('notify__icon');
        iconWrapper.innerHTML = this.customIcon || computedIcon(this.status);
        if (this.status || this.customIcon)
            this.wrapper.appendChild(iconWrapper);
    };
    Notify.prototype.setObserver = function () {
        var _this = this;
        var observer = new IntersectionObserver(function (entries) {
            if (!(entries[0].intersectionRatio <= 0)) {
                return;
            }
            else {
                _this.close();
            }
        }, {
            threshold: 0
        });
        setTimeout(function () {
            observer.observe(_this.wrapper);
        }, this.speed);
    };
    Notify.prototype.notifyIn = function (callback) {
        callback(this);
    };
    Notify.prototype.autoClose = function () {
        var _this = this;
        setTimeout(function () {
            _this.close();
        }, this.autotimeout + this.speed);
    };
    Notify.prototype.close = function () {
        this.notifyOut(this.selectedNotifyOutEffect);
    };
    Notify.prototype.setEffect = function () {
        switch (this.effect) {
            case 'fade':
                this.selectedNotifyInEffect = this.fadeIn;
                this.selectedNotifyOutEffect = this.fadeOut;
                break;
            case 'slide':
                this.selectedNotifyInEffect = this.slideIn;
                this.selectedNotifyOutEffect = this.slideOut;
                break;
            default:
                this.selectedNotifyInEffect = this.fadeIn;
                this.selectedNotifyOutEffect = this.fadeOut;
        }
    };
    return Notify;
}());

export default Notify;
