/**
 * @file ý���ѯ
 * @import zepto.js
 * @module GMU
 */

(function ($) {

    /**
     * ��ԭ����window.matchMedia������polyfill�����ڲ�֧��matchMedia�ķ���ϵͳ�������������[w3c window.matchMedia](http://www.w3.org/TR/cssom-view/#dom-window-matchmedia)�Ľӿ�
     * ���壬��matchMedia���������˷�װ��ԭ������css media query��transitionEnd�¼�����ɵġ���ҳ���в���media query��ʽ��Ԫ�أ���query��������ʱ�ı��Ԫ����ʽ��ͬʱ�����ʽ��transition���õ����ԣ�
     * ���������󼴻ᴥ��transitionEnd���ɴ˴���MediaQueryList���¼�����������transition��duration timeΪ0.001ms������ֱ��ʹ��MediaQueryList�����matchesȥ�жϵ�ǰ�Ƿ���queryƥ�䣬���в����ӳ٣�
     * ����ע��addListener�ķ�ʽȥ����query�ĸı䡣$.matchMedia����ϸʵ��ԭ�����ø÷���ʵ�ֵ�ת��ͳһ����������
     * [GMU Pages: ת���������($.matchMedia)](https://github.com/gmuteam/GMU/wiki/%E8%BD%AC%E5%B1%8F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88$.matchMedia)
     *
     * ����ֵMediaQueryList�������������<br />
     * - ***matches*** �Ƿ�����query<br />
     * - ***query*** ��ѯ��css query������\'screen and (orientation: portrait)\'<br />
     * - ***addListener*** ���MediaQueryList��������������ջص��������ص�����ΪMediaQueryList����<br />
     * - ***removeListener*** �Ƴ�MediaQueryList���������<br />
     *
     *
     * @method $.matchMedia
     * @grammar $.matchMedia(query)  ? MediaQueryList
     * @param {String} query ��ѯ��css query������\'screen and (orientation: portrait)\'
     * @return {Object} MediaQueryList
     * @example
     * $.matchMedia('screen and (orientation: portrait)').addListener(fn);
     */
    $.matchMedia = (function() {
        var mediaId = 0,
            cls = 'gmu-media-detect',
            transitionEnd = $.fx.transitionEnd,
            cssPrefix = $.fx.cssPrefix,
            $style = $('<style></style>').append('.' + cls + '{' + cssPrefix + 'transition: width 0.001ms; width: 0; position: absolute; clip: rect(1px, 1px, 1px, 1px);}\n').appendTo('head');

        return function (query) {
            var id = cls + mediaId++,
                $mediaElem,
                listeners = [],
                ret;

            $style.append('@media ' + query + ' { #' + id + ' { width: 1px; } }\n') ;   //ԭ��matchMediaҲ��Ҫ��Ӷ�Ӧ��@media������Ч

            // ͳһ��ģ��ģ�ʱ�����á�
            // if ('matchMedia' in window) {
            //     return window.matchMedia(query);
            // }

            $mediaElem = $('<div class="' + cls + '" id="' + id + '"></div>')
                .appendTo('body')
                .on(transitionEnd, function() {
                    ret.matches = $mediaElem.width() === 1;
                    $.each(listeners, function (i,fn) {
                        $.isFunction(fn) && fn.call(ret, ret);
                    });
                });

            ret = {
                matches: $mediaElem.width() === 1 ,
                media: query,
                addListener: function (callback) {
                    listeners.push(callback);
                    return this;
                },
                removeListener: function (callback) {
                    var index = listeners.indexOf(callback);
                    ~index && listeners.splice(index, 1);
                    return this;
                }
            };

            return ret;
        };
    }());
})(Zepto);
