/**
 * @file λ������Ӧ���
 * @import widget/suggestion/suggestion.js, extend/event.ortchange.js
 */
(function( $, win ) {
    var reverse = Array.prototype.reverse;

    // ָ��sug list��item��selector������item��ķ�ת
    // ����list������$contentԪ�ؽ��в��ҵ�
    gmu.Suggestion.options.listSelector = 'li';

    /**
     * λ������Ӧ�������Ҫ�������ڵ�sug����ҳ��ײ�ʱ���轫sug��ת����������ʾ
     * @class posadapt
     * @namespace Suggestion
     * @pluginfor Suggestion
     */
    gmu.Suggestion.register( 'posadapt', {

        _init: function() {
            var me = this,
                $list;

            me.on( 'show ortchange', function() {

                if ( me._checkPos() ) {

                    me.$wrapper.css( 'top', - me.$wrapper.height()- me.wrapperTop );

                    // sug list��ת
                    reverse.call( $list =
                        me.$content.find( me._options.listSelector ) );
                    $list.appendTo( $list.parent() );

                    // ������ťλ��
                    me.$btn.prependTo( me.$wrapper );
                }

            } );
        },

        _checkPos: function() {
            var sugH = this._options.height || 66,
                upDis = this.getEl().offset().top - win.pageYOffset;

            // ���±ߵĸ߶�С��sug�ĸ߶Ȳ����ϱߵĸ߶ȴ���sug�ĸ߶�
            return $( win ).height() - upDis < sugH && upDis >= sugH;
        }

    } );
})( gmu.$, window );