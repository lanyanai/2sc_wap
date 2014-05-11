/**
 * @file ��ײ��⣬����ָ����������������λ����ʾ
 * @import widget/popover/popover.js
 */
(function( gmu, $ ) {

    /**
     * @property {Boolean} [collision=true] ������ײ��⡣
     * @namespace options
     * @uses Popover.collision
     * @for Popover
     */
    gmu.Popover.options.collision = true;

    /**
     * ��ײ��⣬������placement����������Ƿ�����ȫ��ʾ���ݵĲ��ԣ���ѡ����ʵ�placement.
     * @class collision
     * @namespace Popover
     * @pluginfor Popover
     */
    gmu.Popover.option( 'collision', true, function() {
        var me = this,
            opts = me._options;

        // ��ȡwithin������Ϣ
        // ������window, document����element.
        // withinΪ��ײ����������
        function getWithinInfo( raw ) {
            var $el = $( raw );

            raw = $el[ 0 ];

            if ( raw !== window && raw.nodeType !== 9 ) {
                return $el.offset();
            }

            return {
                width: $el.width(),
                height: $el.height(),
                top: raw.pageYOffset || raw.scrollTop || 0,
                left: raw.pageXOffset || raw.scrollLeft || 0
            };
        }

        // �ж��Ƿ�û����ס
        function isInside( coord, width, height, within ) {
            return coord.left >= within.left &&
                    coord.left + width <= within.left + within.width &&
                    coord.top >= within.top &&
                    coord.top + height <= within.top + within.height;
        }

        // ���¼���Դ��placement.js, ��Ҫ�����޸Ķ�λ����ֵ��
        me.on( 'before.placement', function( e, coord, info, presets ) {
            var within = getWithinInfo( opts.within || window ),
                now = info.placement,
                orig = info.coord,
                aviable = Object.keys( presets ),
                idx = aviable.indexOf( now ) + 1,
                swap = aviable.splice( idx, aviable.length - idx );

            // �ӵ�ǰplacement����һ����ʼ����ೢ��һȦ��
            // �������ȫû�б���ס��λ�ã�������ѭ��
            // �������һȦ��û�к��ʵ�λ�ã�������ԭ���ĳ�ʼλ�ö�λ
            aviable = swap.concat( aviable );

            while ( aviable.length && !isInside( coord, orig.width,
                    orig.height, within ) ) {
                now = aviable.shift();
                $.extend( coord, presets[ now ]() );
            }
            info.preset = now;
        } );
    } );
})( gmu, gmu.$ );