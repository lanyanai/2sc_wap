/**
 * @file �Ƿ���ʵ��ͷ
 * @import widget/popover/popover.js
 */
(function( gmu ) {
    var Popover = gmu.Popover;

    Popover.template.arrow = '<span class="ui-arrow"></span>';

    /**
     * @property {Boolean} [arrow=true] �Ƿ���ʾ��ͷ
     * @namespace options
     * @for Popover
     * @uses Popover.arrow
     */
    Popover.options.arrow = true;    // Ĭ�Ͽ���arrow

    /**
     * ��չPopover��ʾ��ͷ���ܡ������ļ������Popoverʵ�����Զ�������ʾ��ͷ��
     * ��ͷ��λ�û���ݲ�ͬ��placement��ʾ�ڲ�ͬ��λ�á�
     * @class arrow
     * @namespace Popover
     * @pluginfor Popover
     */
    Popover.option( 'arrow', true, function() {
        var me = this,
            opts = me._options;

        // ��û�д���offset��ʱ��Ĭ����arrow�ͻ��10pxƫ��
        opts.offset = opts.offset || function( coord, placement ) {
            placement = placement.split( '_' )[ 0 ];
            return {
                left: (placement === 'left' ? -1 :
                        placement === 'right' ? 1 : 0) * 15,
                top: (placement === 'top' ? -1 :
                        placement === 'bottom' ? 1 : 0) * 15
            };
        };

        me.on( 'done.dom', function( e, $root ) {
            $root.append( me.tpl2html( 'arrow' ) ).addClass( 'ui-pos-default' );
        } );

        me.on( 'after.placement', function( e, coord, info ) {
            var root = this.$root[ 0 ],
                cls = root.className,
                placement = info.placement,
                align = info.align || '';

            root.className = cls.replace( /(?:\s|^)ui-pos-[^\s$]+/g, '' ) +
                ' ui-pos-' + placement + (align ? '-' + align : '');
        } );
    } );
})( gmu );