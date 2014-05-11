/**
 * @file �򵥰涨λ
 * @import widget/popover/popover.js, extend/offset.js
 */
(function( gmu, $ ) {

    /**
     * @property {String} [placement="bottom"] ���ö�λλ�á�
     * @namespace options
     * @uses Popover.placement
     * @for Popover
     */

    /**
     * @property {Object|Function} [offset=null] ����ƫ������
     * @namespace options
     * @for Popover
     * @uses Popover.placement
     */
    $.extend( gmu.Popover.options, {
        placement: 'bottom',    // Ĭ���������·���ʾ
        offset: null
    } );

    /**
     * ֧�ֵ���������ڰ�ť�������Ҷ�λ��
     * @class placement
     * @namespace Popover
     * @pluginfor Popover
     */
    gmu.Popover.option( 'placement', function( val ) {
        return ~[ 'top', 'bottom', 'left', 'right' ].indexOf( val );
    }, function() {

        var me = this,

            // ��һ��ֵ�������Ŀ��λ�õ�ˮƽλ��
            // �ڶ���ֵ�������Ŀ��λ�õĴ�ֱλ��
            // ������ֵ�����ĵ��ˮƽλ��
            // ���ĸ�ֵ�����ĵ�Ĵ�ֱλ��
            config = {
                'top': 'center top center bottom',
                'right': 'right center left center',
                'bottom': 'center bottom center top',
                'left': 'left center right center'
            },
            presets = {},    // ֧�ֵĶ�λ��ʽ��

            info;

        // �������������ɷ�����
        $.each( config, function( preset, args ) {
            args = args.split( /\s/g );
            args.unshift( preset );
            presets[ preset ] = function() {
                return placement.apply( null, args );
            };
        } );

        function getPos( pos, len ) {
            return pos === 'right' || pos === 'bottom' ? len :
                        pos === 'center' ? len / 2 : 0;
        }

        // ��ʱ�ü򵥵ķ�ʽʵ�֣��Ժ��ǲ���position.js
        function placement( preset, atH, atV, myH, myV ) {
            var of = info.of,
                coord = info.coord,
                offset = info.offset,
                top = of.top,
                left = of.left;

            left += getPos( atH, of.width ) - getPos( myH, coord.width );
            top += getPos( atV, of.height ) - getPos( myV, coord.height );

            // offset������fn
            offset = typeof offset === 'function' ? offset.call( null, {
                left: left,
                top: top
            }, preset ) : offset || {};

            return {
                left: left + (offset.left || 0),
                top: top + (offset.top || 0)
            };
        }

        // ���¼���
        this.on( 'placement', function( e, $el, $of ) {
            var me = this,
                opts = me._options,
                placement = opts.placement,
                coord;

            info = {
                coord: $el.offset(),
                of: $of.offset(),
                placement: placement,
                $el: $el,
                $of: $of,
                offset: opts.offset
            };

            // ���ó�ʼֵ
            coord = presets[ placement ]();

            // �ṩ����������֮ǰ�޸�λ��
            me.trigger( 'before.placement', coord, info, presets );
            info.preset && (info.placement = info.preset);
            $el.offset( coord );

            // �ṩ��arrowλ�ö�λ��
            me.trigger( 'after.placement', coord, info );
        } );

        // ����Ļ��ת��ʱ����Ҫ��Ҫ���¼��㡣
        $( window ).on( 'ortchange', function() {
            me._visible && me.trigger( 'placement', me.$target, me.$root );
        } );
    } );
})( gmu, gmu.$ );