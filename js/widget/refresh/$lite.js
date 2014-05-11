/**
 * @file lite������������ظ��࣬����ԭ����������ʹ��iscroll
 * @import widget/refresh/refresh.js
 */

(function( gmu, $, undefined ) {
    
    /**
     * lite������������ظ��࣬����ԭ����������ʹ��iscroll
     * @class lite
     * @namespace Refresh
     * @pluginfor Refresh
     */
    /**
     * @property {Number} [threshold=5] ���صķ�ֵ��Ĭ����ָ����Ļ��һ�룬�����������볬��10px���ɴ������ز��������ø�ֵ�󣬿��Խ���ָ����Ļλ�ý����������ظģ�����Ҫʵ����������Ч�����ɽ���ֵ���úܴ���1000��
     * @namespace options
     * @for Refresh
     * @uses Refresh.lite
     */
    /**
     * @property {Boolean} [seamless=false] �Ƿ��������أ��������threshold�ڲ����ֻ��Ϲ��Թ�����������Ͽ�ʱ������touchmove������
     * @namespace options
     * @for Refresh
     * @uses Refresh.lite
     */
    gmu.Refresh.register( 'lite', {
        _init: function () {
            var me = this,
                opts = me._options,
                $el = me.$el;

            opts.seamless && $(window).on('scroll',$.throttle(1000, function(e)
                {
                    me._eventHandler(e);
                })
            );
            /*$el.on('touchstart touchmove touchend touchcancel', $.throttle(1000, function(e)
                {
                    me._eventHandler(e);
                })
            );*/
            opts.wrapperH = $el.height();
            opts.wrapperTop = $el.offset().top;
            opts._win = window;
            opts._body = document.body;
            return me;
        },
        _changeStyle: function (dir, state) {
            var me = this,
                refreshInfo = me._options.refreshInfo[dir];

            if (state == 'beforeload') {
                refreshInfo['$icon'].removeClass('ui-loading');
            }
            return me.origin(dir, state);
        },
        _startHandler: function (e) {
            this._options._startY = e.touches[0].pageY;
        },
        _moveHandler: function (e) {
            var me = this,
                opts = me._options,
                startY = opts._startY,
                movedY = startY - e.touches[0].pageY,
                winHeight = opts._win.innerHeight,
                threshold = opts.threshold || (opts.wrapperH < winHeight ? (opts.wrapperH / 2 + opts.wrapperTop || 0) : winHeight / 2);     //Ĭ��ֵΪ��������߶ȵ�һ�룬��wrapper�߶Ȳ�����Ļһ��ʱ����Ϊlist��һ��

            if (!me._status('down') || movedY < 0) return;
            if (!opts['_refreshing'] && (startY >= opts._body.scrollHeight - winHeight + threshold) && movedY > 10) {    //�±߰�ť����������
                me._setStyle('down', 'beforeload');
                opts['_refreshing'] = true;
            }
            return me;
        },

        _endHandler: function () {
            var me = this,
                opts = me._options;
            me._setStyle('down', 'loading');
            me._loadingAction('down', 'pull');
            opts['_refreshing'] = false;
            return me;
        },

        _eventHandler: function (e) {
            var me = this,
                opts = me._options;

            switch (e.type) {
                case 'touchstart':
                    me._startHandler(e);
                    break;
                case 'touchmove':
                    clearTimeout(opts._endTimer);        //�������android�ϣ�touchmoveδ����ʱ��touchend����������
                    opts._endTimer = setTimeout( function () {
                        me._endHandler();
                    }, 300);
                    me._moveHandler(e);
                    break;
                case 'touchend':
                case 'touchcancel':
                    clearTimeout(opts._endTimer);
                    opts._refreshing && me._endHandler();
                    break;
                case 'scroll':
                    (!opts._refreshing && opts._win.pageYOffset >= opts._body.scrollHeight - opts._win.innerHeight + (opts.threshold || -1)) && me._endHandler();
                    break;
            }
            return me;
        }
    } );
})( gmu, gmu.$ );