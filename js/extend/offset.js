/**
 * @file �޸�Zepto��offset setter bug
 * ���� ����λԪ��������������ʱ���ᶨλ����ȷ
 * 1. ����λԪ�ز��ǵ�һ���ڵ㣬��prev�ֵܽڵ����з�absolute����fixed��λ��Ԫ��
 * 2. ����λԪ��Ϊ��absolute����fixed��λ��
 * issue: https://github.com/gmuteam/GMU/issues/101
 * @import zepto.js
 * @module GMU
 */

(function( $ ) {
    var _offset = $.fn.offset,
        round = Math.round;

    // zepto��offset bug����Ҫ�����ǵ�position:relative��ʱ��û�п���Ԫ�صĳ�ʼֵ��
    // ��ʼֵ����ָpositon:relative; top: 0; left: 0; bottom:0; right:0; ��ʱ��
    // ��Ԫ�ص�λ�ã�zepto�е�offset�Ǽٶ������ֵ����{left:0, top: 0}; ʵ����ǰ�����ֵ�
    // �ڵ��Ҳ�Ϊpostion: absolute|fixed ��λʱʱ����Ԫ�صĳ�ʼλ�ò�����{left:0, top: 0}
    // �����ǰ���ֵܽڵ�����ݴ�С����һ����
    function setter( coord ) {
        return this.each(function( idx ) {
            var $el = $( this ),
                coords = $.isFunction( coord ) ? coord.call( this, idx,
                    $el.offset() ) : coord,

                position = $el.css( 'position' ),

                // positionΪabsolute����fixed��λ��Ԫ�أ���Ԫ�صĳ�ʼλ��û�й�ϵ
                // ���Բ���Ҫȡ��ʼλ��
                pos = position === 'absolute' || position === 'fixed' ||
                    $el.position();

            // �����positionΪrelative, �Ҵ��� top, right, bottom, leftֵ
            // positionֵ�����ܴ����ʼֵ����Ҫ��ԭһ��
            // ���� top: 1px, ��Ҫ��positionȡ�õ�ֵ��ȥ1px���Ǹ�Ԫ�صĳ�ʼλ��
            // ���������top:auto, bottom: 1px; ����Ҫ��1px, ��������Ĵ���Ҫ���Ը�-1
            if ( position === 'relative' ) {
                pos.top -= parseFloat( $el.css( 'top' ) ) ||
                        parseFloat( $el.css( 'bottom' ) ) * -1 || 0;
                pos.left -= parseFloat( $el.css( 'left' ) ) ||
                        parseFloat( $el.css( 'right' ) ) * -1 || 0;
            }

            parentOffset = $el.offsetParent().offset(),

            // ����������chrome�����offset���õ�top,left�������ͣ��ᵼ��popOver��arrow��ʽ�����⡣
            props = {
              top:  round( coords.top - (pos.top || 0)  - parentOffset.top ),
              left: round( coords.left - (pos.left || 0) - parentOffset.left )
            }

            if ( position == 'static' ){
                props['position'] = 'relative';
            }

            // ���Կ��Ǹ���animate������
            if ( coords.using ) {
                coords.using.call( this, props, idx );
            } else {
                $el.css( props );
            }
        });
    }

    $.fn.offset = function( corrd ) {
        return corrd ? setter.call( this, corrd ): _offset.call( this );
    }
})( Zepto );