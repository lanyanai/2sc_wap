/**
 * @file Gotop �� iscroll���
 * @module GMU
 * @import extend/iscroll.js, widget/gotop/gotop.js
 */
(function( gmu, $, undefined) {
    /**
     * @name gotop.iscroll
     * @desc ��ʹ��iScroll��ҳ����ʹ��gotop���ʱ����Ҫ����ò��
     * @desc ʹ��iscroll��useAnimation������������
     * **Options**
     * - ''iScrollInstance'' {Object}: (��ѡ)
     */

    /**
     * Gotop �� iscroll�������ʹ��iScroll��ҳ����ʹ��gotop���ʱ����Ҫ����ò����ʹ��iscroll��useAnimation������������
     *
     * @class iscroll
     * @namespace Gotop
     * @pluginfor Gotop
     */
    gmu.Gotop.register( 'iscroll', {
        _init: function () {
            var me = this,
                opts = me._options,
                $el,

                /**
                 * @property {Object} iScrollInstance �����õ�iScrollʵ��,ʹ��iscrollʱ��Ҫ����iScrollʵ��,�����ж���ʾ�����ء�useAnimation������ʧЧ��
                 * @namespace options
                 * @for Gotop
                 * @uses Gotop.iscroll
                 */
                iscroll = opts.iScrollInstance,
                _move = iscroll.options.onScrollMove,       //��ֹ��д
                _end = iscroll.options.onScrollEnd;

            iscroll.options.onScrollMove = function() {
                _move && _move.call(iscroll, arguments);
                opts.useHide && me.hide();
            };
            iscroll.options.onScrollEnd = function() {
                _end && _end.call(iscroll, arguments);
                me._check(Math.abs(iscroll.y));
                if(opts._scrollClick) {    //ֻ��click֮���scrollEnd����afterScroll�¼�
                    me.trigger('afterScroll');
                    opts._scrollClick = false;
                }
            };

            me.on( 'ready', function() {
                $el = me.$el;

                $el.on('click', function() {
                    opts._scrollClick = true;
                    iscroll.scrollTo(0, 0);
                });
                
                opts.useFix && $el.fix(opts.position);
                opts.root = $el[0];
            } );

            me.on('destroy', function() {
                iscroll.options.onScrollMove = _move;       //�ָ�����
                iscroll.options.onScrollEnd = _end;
            });
        },

        _eventHandler: function(e) {},

        _scrollTo: function(){}
    } );
})( gmu, gmu.$ );