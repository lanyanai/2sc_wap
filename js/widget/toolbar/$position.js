/**
 * @file Toolbar fix���
 * @module GMU
 * @import widget/toolbar/toolbar.js, extend/fix.js
 */
(function( gmu, $ ) {
    /**
     * Toolbar position���������position�������Խ�Toolbar�̶���ĳ��λ�á�
     *
     * @class position
     * @namespace Toolbar
     * @pluginfor Toolbar
     */
    gmu.Toolbar.register( 'position', {
        /**
         * ��λToolbar
         * @method position
         * @param {Object} opts ��λ��������ʽ��$.fn.fix������ʽ��ͬ
         * @for Toolbar
         * @uses Toolbar.position
         * @return {self} ���ر���
         */
        position: function( opts ) {
            this.$el.fix( opts );

            return this;
        }
    } );
})( gmu, gmu.$ );