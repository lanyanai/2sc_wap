/**
 * @file Button input���
 * @module GMU
 * @import widget/button/button.js
 */
(function( gmu, $ ) {
    var uid = 0;

    /**
     * Button input�������button֧��checkbox��radio��ʵ������
     *
     * ��:
     * ```html
     * <input type="checkbox" data-label="��ť" />
     * <input type="radio" data-label="��ť" />
     * ```
     *
     * �Ҵ��ఴť�������ʱ����Զ��л�active״̬����Ӧ��input��checkedֵҲ��仯��
     *
     * @class input
     * @namespace Button
     * @pluginfor Button
     */
    gmu.Button.register( 'input', {
        _getWrap: function( $el ) {
            var id, el, $wrap;

            // ����Ǳ�Ԫ�ء�
            if ( $el.is( 'input[type="checkbox"], input[type="radio"]' ) ) {
                el = $el.addClass( 'ui-hidden' )[ 0 ];
                (id = el.id) || (el.id = id = 'input_btn_' + uid++);
                $wrap = $( 'label[for=' + id + ']', el.form || el.ownerDocument || undefined );
                $wrap.length || ($wrap = $( '<label for="' + id + '"></label>' ).insertBefore( $el ));

                $el.prop( 'checked' ) && (this._options.state = 'active');
                return $wrap;
            }

            return $el;
        },

        toggle: function() {
            var $el = this.$el;

            if ( $el.is( 'input[type="radio"]' ) ) {
                $radios = $( "[name='" + $el.attr('name') + "']", $el[ 0 ].form
                        || $el[ 0 ].ownerDocument || undefined );

                $radios.button( 'state', 'reset' );
            }
            return this.origin.apply( this, arguments );
        },

        state: function( state ) {
            var $el = this.$el;

            // ����disabled״̬
            if ( $el.is( 'input[type="checkbox"], input[type="radio"]' ) ) {
                $el.prop( 'disabled', state === 'disabled' );
                $el.prop( 'checked', state === 'checked' );
            }

            return this.origin.apply( this, arguments );
        }
    } );


    // dom ready
    $(function() {
        $( document.body ).on( 'click.button',
                'label.ui-btn:not(.ui-state-disabled)', function() {

            $( '#' + this.getAttribute( 'for' ) ).button( 'toggle' );
        });
    });
})( gmu, gmu.$ );