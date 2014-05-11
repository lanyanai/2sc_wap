/**
 * @file ���ٶԷ������¼���ִ��Ƶ�ʣ���ε��ã���ָ����ʱ����ֻ��ִ��һ��
 * @import zepto.js
 * @module GMU
 */

(function ($) {
    /**
     * ����ִ��Ƶ��, ��ε��ã���ָ����ʱ���ڣ�ֻ��ִ��һ�Ρ�
     * ```
     * ||||||||||||||||||||||||| (����) |||||||||||||||||||||||||
     * X    X    X    X    X    X      X    X    X    X    X    X
     * ```
     * 
     * @method $.throttle
     * @grammar $.throttle(delay, fn) ? function
     * @param {Number} [delay=250] ��ʱʱ��
     * @param {Function} fn ��ϡ�͵ķ���
     * @param {Boolean} [debounce_mode=false] �Ƿ�������ģʽ, true:start, false:end
     * @example var touchmoveHander = function(){
     *     //....
     * }
     * //���¼�
     * $(document).bind('touchmove', $.throttle(250, touchmoveHander));//Ƶ��������ÿ250ms��ִ��һ��touchmoveHandler
     *
     * //����¼�
     * $(document).unbind('touchmove', touchmoveHander);//ע��������unbind����touchmoveHander,������$.throttle���ص�function, ��Ȼunbind�Ǹ�Ҳ��һ����Ч��
     *
     */
    $.extend($, {
        throttle: function(delay, fn, debounce_mode) {
            var last = 0,
                timeId;

            if (typeof fn !== 'function') {
                debounce_mode = fn;
                fn = delay;
                delay = 250;
            }

            function wrapper() {
                var that = this,
                    period = Date.now() - last,
                    args = arguments;

                function exec() {
                    last = Date.now();
                    fn.apply(that, args);
                };

                function clear() {
                    timeId = undefined;
                };

                if (debounce_mode && !timeId) {
                    // debounceģʽ && ��һ�ε���
                    exec();
                }

                timeId && clearTimeout(timeId);
                if (debounce_mode === undefined && period > delay) {
                    // throttle, ִ�е���delayʱ��
                    exec();
                } else {
                    // debounce, �����start��clearTimeout
                    timeId = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - period : delay);
                }
            };
            // for event bind | unbind
            wrapper._zid = fn._zid = fn._zid || $.proxy(fn)._zid;
            return wrapper;
        },

        /**
         * @desc ����ִ��Ƶ��, ��ָ����ʱ����, ��ε��ã�ֻ��ִ��һ�Ρ�
         * **options:**
         * - ***delay***: ��ʱʱ��
         * - ***fn***: ��ϡ�͵ķ���
         * - ***t***: ָ�����ڿ�ʼ��ִ�У����ǽ�����ִ��, true:start, false:end
         *
         * ��at_beginģʽ
         * <code type="text">||||||||||||||||||||||||| (����) |||||||||||||||||||||||||
         *                         X                                X</code>
         * at_beginģʽ
         * <code type="text">||||||||||||||||||||||||| (����) |||||||||||||||||||||||||
         * X                                X                        </code>
         *
         * @grammar $.debounce(delay, fn[, at_begin]) ? function
         * @name $.debounce
         * @example var touchmoveHander = function(){
         *     //....
         * }
         * //���¼�
         * $(document).bind('touchmove', $.debounce(250, touchmoveHander));//Ƶ��������ֻҪ���ʱ�䲻����250ms, ��һϵ���ƶ���ֻ��ִ��һ��
         *
         * //����¼�
         * $(document).unbind('touchmove', touchmoveHander);//ע��������unbind����touchmoveHander,������$.debounce���ص�function, ��Ȼunbind�Ǹ�Ҳ��һ����Ч��
         */
        debounce: function(delay, fn, t) {
            return fn === undefined ? $.throttle(250, delay, false) : $.throttle(delay, fn, t === undefined ? false : t !== false);
        }
    });
})(Zepto);