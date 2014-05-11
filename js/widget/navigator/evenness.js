/**
 * @file ƽ�����䰴ť�����ݴ����visibleCount, ��ƽ��������, �˲����Ҫ������ǿ
 * scrollable, ������ݲ��ɹ����ô���ʽ����ʵ����顣
 * @import widget/navigator/navigator.js, widget/navigator/$scrollable.js
 */
(function( gmu, $, undefined ) {
    gmu.Navigator.options.visibleCount = 4;

    /**
     * ƽ�����䰴ť�����ݴ����visibleCount, ��ƽ��������, �˲����Ҫ������ǿ
     * scrollable, ������ݲ��ɹ����ô���ʽ����ʵ����顣
     * @class visibleCount
     * @namespace Navigator
     * @pluginfor Navigator
     */
    gmu.Navigator.option( 'visibleCount', '*', function() {
        var me = this,
            opts = me._options,
            counts = $.type( opts.visibleCount ) === 'number' ? {
                portrait: opts.visibleCount,
                landscape: Math.floor( opts.visibleCount * 3 / 2 )
            } : opts.visibleCount;

        me.on( 'init.iScroll refresh.iScroll', arrage );

        function arrage( e ) {
            
            // todo ����һ�ָ���׼�ķ�������ȡ������
            var ort = window.innerWidth > window.innerHeight ?
                    'landscape' : 'portrait',
                count = counts[ ort ],
                $el = me.$el;
            
            //TODO �������л�ʱ�������Զ��������
            me.$list.children().width( $el.width() / count );
            me.$list.width($el.width() / count * me.$list.children().length);
        }
    } );
})( gmu, gmu.$ );