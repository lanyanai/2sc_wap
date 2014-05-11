/**
 * @file iScroll�����sug�б�ʹ��iScrollչʾ
 * @import widget/suggestion/suggestion.js, extend/iscroll.js
 */
(function( gmu, $ ) {

    /**
     * iScroll�����sug�б�ʹ��iScrollչʾ
     * @class iscroll
     * @namespace Suggestion
     * @pluginfor Suggestion
     */
    gmu.Suggestion.register( 'iscroll', {

        _init: function() {
            var me = this;

            me.on( 'ready', function() {

                // ����һ��scroller�ṹ
                me.$scroller =
                        $( '<div class="ui-suggestion-scroller"></div>' );

                // ��ʼ��iScroll������Ҫ����wrapper�߶ȣ�������ʽ����max-height
                me.$content
                        .wrapInner( me.$scroller )
                        .iScroll({

                            hScroll: false,

                            onRefresh: function() {

                                // ����iScrollʱ���ض���
                                this.y && this.scrollTo( 0, 0 );
                            }
                        });

                // ����iscroll��destroy
                me.on( 'destroy', function() {
                    me.$content.iScroll('destroy');
                } );
            } );

            return me;
        },

        /**
         * ��д_fillWrapper���������ݼ���ť����˳��
         * */
        _fillWrapper: function( listHtml ) {

            // ���ݲ���������ʷ��¼ʱ���������ʷ��¼��ť
            this.$clearBtn[ this.value() ? 'hide' : 'show' ]();

            if ( listHtml ) {
                this.show().$scroller.html( listHtml );
                this.$content.iScroll( 'refresh' );

            } else {
                this.hide();
            }

            return this;
        }
    } );

})( gmu, gmu.$ );