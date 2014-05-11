/**
 * @file ����������Ե��ʱ���Զ�����һ��������
 * @import widget/navigator/navigator.js, widget/navigator/$scrollable.js
 */
(function( gmu, $, undefined ) {
    gmu.Navigator.options.isScrollToNext = true;

    /**
     * ����������Ե��ʱ���Զ�����һ��������
     * @class isScrollToNext
     * @namespace Navigator
     * @pluginfor Navigator
     */
    gmu.Navigator.option( 'isScrollToNext', true, function() {
        var me = this,
            prevIndex;

        me.on( 'select', function( e, to, el ) {
            
            // ��һ���õ�ʱ��û��prevIndex, �̸���this.index�����Ʒ���
            if ( prevIndex === undefined ) {
                prevIndex = me.index ? 0 : 1;
            }

            var dir = to > prevIndex,

                // �������������prev������next
                target = $( el )[ dir ? 'next' : 'prev' ](),

                // ���û�����ڵģ��Լ���λ��Ҳ��Ҫ��⡣�����������
                // ������İ�ť��ֻ��ʾ��һ��
                offset = target.offset() || $( el ).offset(),
                within = me.$el.offset(),
                listOffset;

            if ( dir ? offset.left + offset.width > within.left +
                    within.width : offset.left < within.left ) {
                listOffset = me.$list.offset();

                me.$el.iScroll( 'scrollTo', dir ? within.width -
                        offset.left + listOffset.left - offset.width :
                        listOffset.left - offset.left, 0, 400 );
            }

            prevIndex = to;
        } );
    } );
})( gmu, gmu.$ );