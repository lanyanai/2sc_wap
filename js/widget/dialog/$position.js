/**
 * @file Dialog �� ���������
 * @module GMU
 * @import widget/dialog/dialog.js, extend/position.js
 */
(function( gmu, $, undefined ) {
    /**
     * @name dialog.position
     * @desc ��zepto.position����λdialog
     */
    /**
     * ��zepto.position����λdialog
     *
     * @class position
     * @namespace Dialog
     * @pluginfor Dialog
     */
    gmu.Dialog.register( 'position', {

        _init: function(){
            var opts = this._options;

            opts.position = opts.position || {of: opts.container || window, at: 'center', my: 'center'};
        },

        /**
         * �������õ������λ�ã�������������ã����Ĭ��Ϊ�������Ҿ��ж��롣λ�ò������ܣ���ֵ���ٷֱȣ�����λ����ֵ������'center'��
         * ��: 100�� 100px, 100em, 10%, center;��ʱ��֧�� left, right, top, bottom.
         * @method position
         * @param {String|Number} [x] X��λ��
         * @param {String|Number} [y] Y��λ��
         * @for Dialog
         * @uses Dialog.position
         * @return {self} ���ر���
         */
        position: function(x, y){
            var opts = this._options;
            if(!$.isPlainObject(x)){//�����ϸ�ʽ��
                opts.position.at = 'left'+(x>0?'+'+x: x)+' top'+(y>0?'+'+y: y);
            } else $.extend(opts.position, x);
            return this.refresh();
        },

        _calculate:function () {
            var me = this,
                opts = me._options,
                position = opts.position,
                ret = me.origin();

            opts._wrap.position($.extend(position, {
                using: function(position){
                    ret.wrap = position;
                }
            }));

            return ret;
        }
    } );
})( gmu, gmu.$);
