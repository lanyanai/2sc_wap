/**
 * @file iOS5�����������iOS5������
 * @import widget/refresh/refresh.js,extend/throttle.js
 */
(function( gmu, $, undefined ) {
    
    /**
     * iOS5�����֧��iOS5�������豸��ʹ��ϵͳ�Դ����ڹ�����
     * @class iOS5
     * @namespace Refresh
     * @pluginfor Refresh
     */
    /**
     * @property {Number} [threshold=5] ���صķ�ֵ��Ĭ�����ϻ������������볬��5px�����ɴ���������������ֵֻ��Ϊ��ֵ������ֵ��10������Ҫ�����������15px�ſɴ������ز���
     * @namespace options
     * @for Refresh
     * @uses Refresh.iOS5
     */
    /**
     * @property {Number} [topOffset=0] �ϱ������ľ��룬Ĭ��Ϊrefresh��ť�ĸ߶ȣ����鲻Ҫ�޸�
     * @namespace options
     * @for Refresh
     * @uses Refresh.iOS5
     */
    gmu.Refresh.register( 'iOS5', {
        _init: function () {
            var me = this,
                opts = me._options,
                $el = me.$el;

            $el.css({
                'overflow': 'scroll',
                '-webkit-overflow-scrolling': 'touch'
            });
            opts.topOffset = opts['$upElem'] ? opts['$upElem'].height() : 0;
            opts.iScroll = me._getiScroll();
            $el.get(0).scrollTop = opts.topOffset;
            $el.on('touchstart touchmove touchend', $.proxy(me._eventHandler, me));
        },
        _changeStyle: function (dir, state) {
            var me = this,
                opts = me._options,
                refreshInfo = opts.refreshInfo[dir];

            me.origin(dir, state);
            switch (state) {
                case 'loaded':
                    refreshInfo['$icon'].addClass('ui-refresh-icon');
                    opts._actDir = '';
                    break;
                case 'beforeload':
                    refreshInfo['$label'].html('�ɿ���������');
                    refreshInfo['$icon'].addClass('ui-refresh-flip');
                    break;
                case 'loading':
                    refreshInfo['$icon'].removeClass().addClass('ui-loading');
                    break;
            }
            return me;
        },

        _scrollStart: function (e) {
            var me = this,
                opts = me._options,
                topOffset = opts.topOffset,
                $upElem = opts.$upElem,
                wrapper = me.$el.get(0),
                _scrollFn = function () {
                    clearTimeout(opts.topOffsetTimer);
                    if ($upElem && $upElem.length && wrapper.scrollTop <= topOffset && !opts['_upRefreshed']) {

                        wrapper.scrollTop = topOffset;
                    }
                };

            me.trigger('scrollstart', e);
            me._enableScroll()._bindScrollStop(wrapper, _scrollFn);      //��֤wrapper���Ử����ײ��������ʹ�䴦�ڿɻ���״̬
            opts.maxScrollY = wrapper.offsetHeight - wrapper.scrollHeight;
            opts._scrollFn = _scrollFn;

            return me;
        },

        _scrollMove: function () {
            var me = this,
                opts = me._options,
                up = opts.$upElem && opts.$upElem.length ,
                down = opts.$downElem && opts.$downElem.length,
                wrapper = me.$el.get(0),
                threshold = opts.threshold || 5;

            me._scrollMove = function (e) {
                var maxScrollY = opts.maxScrollY,
                    scrollY = wrapper.scrollTop,
                    lastMoveY = opts.lastMoveY || scrollY,
                    upRefreshed = opts['_upRefreshed'],
                    downRefreshed = opts['_downRefreshed'],
                    upStatus = me._status('up'),
                    downStatus = me._status('down');

                if (up && !upStatus || down && !downStatus) return;    //�����������ڼ����У����ϴμ��ػ�δ��ɣ�ֱ�ӷ���, �������°�ť��ͬʱ���ش��� traceID:FEBASE-569, trace:FEBASE-775
                opts.iScroll.deltaY = scrollY - lastMoveY;    //ÿ����touchmoveʱ����ƫ������ֵ
                if (downStatus && down && !downRefreshed && -scrollY < (maxScrollY - threshold)) {      //�±߰�ť����������
                    me._setMoveState('down', 'beforeload', 'pull');
                } else if (downStatus && down && downRefreshed && -scrollY > (maxScrollY - threshold) && -scrollY !== maxScrollY) {   //�±߰�ť�������ָ�  -scrollY !== maxScrollY for trace784
                    me._setMoveState('down', 'loaded', 'restore');
                } else if (upStatus && up && !upRefreshed && -scrollY > threshold ) {      //�ϱ߰�ť����������
                    me._setMoveState('up', 'beforeload', 'pull');
                } else if (upStatus && up && upRefreshed && -scrollY < threshold && scrollY) {       //�ϱ߰�ť�������ָ���scrollY !== 0  for trace784
                    me._setMoveState('up', 'loaded', 'restore');
                }

                opts.lastMoveY = scrollY;
                opts._moved = true;
                return me.trigger('scrollmove', e, scrollY, scrollY - lastMoveY);
            };
            me._scrollMove.apply(me, arguments);
        },

        _scrollEnd: function (e) {
            var me = this,
                opts = me._options,
                wrapper = me.$el.get(0),
                topOffset = opts.topOffset,
                actDir = opts._actDir,
                restoreDir = opts._restoreDir;

            /*�ϱߵ��ť���أ��������������¼���
             1.�ϱ߰�ť��ԭ����: restoreDir == 'up'���ӳ�200ms
             2.�ϱ߰�ť��������С���룬δ��������: scrollTop <= topOffset���ӳ�800ms
             3.�ϱ߰�ť��������С���룬δ�������أ����Իص���scrollTop <= topOffset���ӳ�800ms
             4.�ϱ߰�ť������������룬�ٻ������������Իص�scrollTop <= topOffset����������touchstartʱ�İ󶨵�scroll�¼�
             5.�ϱ߰�ť���������������أ���action�еĻص�
             */
            if ((restoreDir == 'up' || wrapper.scrollTop <= topOffset) && !actDir && opts._moved) {
                me._options['topOffsetTimer'] = setTimeout( function () {
                    $(wrapper).off('scroll', opts._scrollFn);     //scroll�¼�����Ҫ�ٴ���
                    wrapper.scrollTop = topOffset;
                }, 800);
            }

            if (actDir && me._status(actDir)) {
                me._setStyle(actDir, 'loading');
                me._loadingAction(actDir, 'pull');
            }

            opts._moved = false;
            return me.trigger('scrollend', e);
        },

        _enableScroll: function () {
            var me = this,
                wrapper = me.$el.get(0),
                scrollY = wrapper.scrollTop;

            scrollY <= 0 && (wrapper.scrollTop = 1);       //���������Ϸ�
            if (scrollY + wrapper.offsetHeight >= wrapper.scrollHeight) {    //���������·�
                wrapper.scrollTop = wrapper.scrollHeight - wrapper.offsetHeight - 1;
            }

            return me;
        },

        _bindScrollStop: function (elem, fn) {
            var me = this,
                $elem = $(elem);

            $elem.off('scroll', me._options._scrollFn).on('scroll', $.debounce(100, function(){
                $elem.off('scroll', arguments.callee).one('scroll', fn);
            }, false));

            return me;
        },

        _getiScroll: function () {
            var me = this,
                $wrapper = me.$el,
                wrapper = $wrapper[0];
            return {
                el: wrapper,
                deltaY: 0,
                scrollTo: function (y, time, relative) {
                    if (relative) {
                        y = wrapper.scrollTop + y;
                    }
                    $wrapper.css({
                        '-webkit-transition-property':'scrollTop',
                        '-webkit-transition-duration':y + 'ms'
                    });
                    wrapper.scrollTop = y;
                },

                disable: function (destroy) {
                    destroy && me.destroy();
                    $wrapper.css('overflow', 'hidden');
                },

                enable:function () {
                    $wrapper.css('overflow', 'scroll');
                }
            }
        },

        _setMoveState: function (dir, state, actType) {
            var me = this,
                opts = me._options;

            me._setStyle(dir, state);
            opts['_' + dir + 'Refreshed'] = actType == 'pull';
            opts['_actDir'] = actType == 'pull' ? dir : '';
            opts['_restoreDir'] = dir == 'up' && actType == 'restore' ? dir : ''
            return me;
        },

        _eventHandler: function (e) {
            var me = this;
            switch(e.type) {
                case 'touchstart':
                    me._scrollStart(e);
                    break;
                case 'touchmove':
                    me._scrollMove(e);
                    break;
                case 'touchend':
                    me._scrollEnd(e);
                    break;
            }
        },
        afterDataLoading: function (dir) {
            var me = this,
                opts = me._options,
                dir = dir || opts._actDir;

            opts['_' + dir + 'Refreshed'] = false;
            dir == 'up' && (me.$el.get(0).scrollTop = opts.topOffset);
            return me.origin(dir);
        }
    } );
})( gmu, gmu.$ );