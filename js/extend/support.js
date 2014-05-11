/**
 * @file ���÷���������֧���Լ��
 * @import zepto.js
 * @module GMU
 */

(function($, undefined) {
    
    /**
     * ����豸��ĳЩ���Ի򷽷���֧�����
     * @method $.support
     * @grammar $.support.orientation => Boolean
     * @param {Boolean} orientation ����Ƿ�֧��ת���¼���UC�д���orientaion����ת�����ᴥ�����¼�����UC���ڲ�֧��ת���¼�(iOS 4��qq, chrome�����������)
     * @param {Boolean} touch ����Ƿ�֧��touch����¼�
     * @param {Boolean} cssTransitions ����Ƿ�֧��css3��transition
     * @param {Boolean} has3d ����Ƿ�֧��translate3d��Ӳ������
     * @example
     * if ($.support.has3d) {      //��֧��3d���豸��ʹ��
     *     console.log('you can use transtion3d');
     * }
     */

    // TODO����Ƿ�֧��position: fixed
    function detectPosFixed () {

    }

    var br = $.browser;

    $.support = $.extend($.support || {}, {
        orientation: !(br.uc || (parseFloat($.os.version)<5 && (br.qq || br.chrome))) && !($.os.android && parseFloat($.os.version) > 3) && "orientation" in window && "onorientationchange" in window,
        touch: "ontouchend" in document,
        cssTransitions: "WebKitTransitionEvent" in window,
        has3d: 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
        // fix: detectPosFixed,
        pushState: "pushState" in history && "replaceState" in history,
        scrolling: '',
        requestAnimationFrame: 'webkitRequestAnimationFrame' in window
    });

})(Zepto);