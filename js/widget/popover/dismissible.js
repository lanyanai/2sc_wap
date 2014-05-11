/**
 * @file �Ƿ����������򣬹ر��Լ�
 * @import widget/popover/popover.js
 */
(function( gmu, $ ) {
    var Popover = gmu.Popover;

    /**
     * @property {Boolean} [dismissible=true] �Ƿ����������򣬹ر��Լ�.
     * @namespace options
     * @uses Popover.dismissible
     * @for Popover
     */
    Popover.options.dismissible = true;

    /**
     * ����ʵ���Զ��رչ��ܣ��ڵ�����򿪵������£��������λ�ã����Զ��رմ˵����㡣
     * �˹��ܰ������ʵ����Ļ��⹦�ܡ�
     * @class dismissible
     * @namespace Popover
     * @pluginfor Popover
     */
    Popover.option( 'dismissible', true, function() {
        var me = this,
            $doc = $( document ),
            click = 'click' + me.eventNs;

        function isFromSelf( target ) {
            var doms = me.$target.add( me.$root ).get(),
                i = doms.length;

            while ( i-- ) {
                if ( doms[ i ] === target ||
                        $.contains( doms[ i ], target ) ) {
                    return true;
                }
            }
            return false;
        }

        me.on( 'show', function() {
            $doc.off( click ).on( click, function( e ) {
                isFromSelf( e.target ) || me.hide();
            } );
        } );

        me.on( 'hide', function() {
            $doc.off( click );
        } );
    } );
})( gmu, gmu.$ );