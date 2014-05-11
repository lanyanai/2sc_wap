/**
 * @file Dropmenu ֧��ˮƽ���в��
 * @module GMU
 * @import widget/dropmenu/dropmenu.js
 */
(function( gmu ) {

    gmu.Dropmenu.options.horizontal = true;

    /**
     * Dropmenu ֧��ˮƽ���в��
     *
     * @class horizontal
     * @namespace Dropmenu
     * @pluginfor Dropmenu
     */
    gmu.Dropmenu.option( 'horizontal', true, function() {
        var me = this;

        me.on( 'done.dom', function( e, $root ) {
            $root.addClass( 'ui-horizontal' );
        } );
    } );
})( gmu, gmu.$ );