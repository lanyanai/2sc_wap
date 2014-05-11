/**
 * @file �Զ����Ų��
 * @import widget/slider/slider.js
 */
(function( gmu, $ ) {
    $.extend( true, gmu.Slider, {
        options: {
            /**
             * @property {Boolean} [autoPlay=true] �Ƿ����Զ�����
             * @namespace options
             * @for Slider
             * @uses Slider.autoplay
             */
            autoPlay: true,
            /**
             * @property {Number} [interval=4000] �Զ����ŵļ��ʱ�䣨���룩
             * @namespace options
             * @for Slider
             * @uses Slider.autoplay
             */
            interval: 4000
        }
    } );

    /**
     * �Զ����Ų��
     * @class autoplay
     * @namespace Slider
     * @pluginfor Slider
     */
    gmu.Slider.register( 'autoplay', {
        _init: function() {
            var me = this;
            me.on( 'slideend ready', me.resume )

                    // ���timer
                    .on( 'destory', me.stop );

            // ���⻬��ʱ���Զ��л�
            me.getEl()
                    .on( 'touchstart' + me.eventNs, $.proxy( me.stop, me ) )
                    .on( 'touchend' + me.eventNs, $.proxy( me.resume, me ) );
        },

        /**
         * �ָ��Զ����š�
         * @method resume
         * @chainable
         * @return {self} ���ر���
         * @for Slider
         * @uses Slider.autoplay
         */
        resume: function() {
            var me = this,
                opts = me._options;

            if ( opts.autoPlay && !me._timer ) {
                me._timer = setTimeout( function() {
                    me.slideTo( me.index + 1 );
                    me._timer = null;
                }, opts.interval );
            }
            return me;
        },

        /**
         * ֹͣ�Զ�����
         * @method stop
         * @chainable
         * @return {self} ���ر���
         * @for Slider
         * @uses Slider.autoplay
         */
        stop: function() {
            var me = this;

            if ( me._timer ) {
                clearTimeout( me._timer );
                me._timer = null;
            }
            return me;
        }
    } );
})( gmu, gmu.$ );