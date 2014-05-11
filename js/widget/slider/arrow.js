/**
 * @file ͼƬ�ֲ���ͷ��ť
 * @import widget/slider/slider.js
 */
(function( gmu, $, undefined ) {
    $.extend( true, gmu.Slider, {

        template: {
            prev: '<span class="ui-slider-pre"></span>',
            next: '<span class="ui-slider-next"></span>'
        },

        options: {
            /**
             * @property {Boolean} [arrow=true] �Ƿ���ʾ��
             * @namespace options
             * @for Slider
             * @uses Slider.arrow
             */
            arrow: true,

            /**
             * @property {Object} [select={prev:'.ui-slider-pre',next:'.ui-slider-next'}] ��һ�ź���һ�Ű�ť��ѡ����
             * @namespace options
             * @for Slider
             * @uses Slider.arrow
             */
            select: {
                prev: '.ui-slider-pre',    // ��һ�Ű�ťѡ����
                next: '.ui-slider-next'    // ��һ�Ű�ťѡ����
            }
        }
    } );

    /**
     * ͼƬ�ֲ���ͷ��ť
     * @class arrow
     * @namespace Slider
     * @pluginfor Slider
     */
    gmu.Slider.option( 'arrow', true, function() {
        var me = this,
            arr = [ 'prev', 'next' ];

        this.on( 'done.dom', function( e, $el, opts ) {
            var selector = opts.selector;

            arr.forEach(function( name ) {
                var item = $el.find( selector[ name ] );
                item.length || $el.append( item = $( me.tpl2html( name ) ) );
                me[ '_' + name ] = item;
            });
        } );

        this.on( 'ready', function() {
            arr.forEach(function( name ) {
                me[ '_' + name ].on( 'tap' + me.eventNs, function() {
                    me[ name ].call( me );
                } );
            });
        } );

        this.on( 'destroy', function() {
            me._prev.off( me.eventNs );
            me._next.off( me.eventNs );
        } );
    } );
})( gmu, gmu.$ );