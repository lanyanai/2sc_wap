/**
 * @file Button�����
 * @module GMU
 * @import core/widget.js, extend/highlight.js
 * @importCss icons.css
 */
(function( gmu, $, undefined ) {

    /**
     * Button�����֧��icon, iconλ�����á�
     *
     * [![Live Demo](qrcode:http://gmu.baidu.com/demo/widget/button/button.html)](http://gmu.baidu.com/demo/widget/button/button.html "Live Demo")
     *
     * @class Button
     * @constructor
     * html����, ��������������domʵ����button
     * ```html
     * <a class="btn">��ť</a>
     * <span class="btn">��ť</span>
     * <button class="btn">��ť</button>
     * <input class="btn" type="button" value="��ť" />
     * <input class="btn" type="reset" value="��ť" />
     * <input class="btn" type="button" value="��ť" />
     * ```
     *
     * Javascript����
     * ```javascript
     * $( '.btn' ).button();
     * ```
     *
     * ���ϣ��֧��checkbox radio��ť����鿴[input���](#GMU:Button.input)��
     * @grammar new gmu.Button( el[, options]) => instance
     * @grammar $( el ).button([ options ]) => zepto
     */
    gmu.define( 'Button', {
        options: {

            /**
             * @property {String} [label] ��ť���֡�
             * @namespace options
             */

            /**
             * @property {String} [icon] ͼ�����ơ�ϵͳ�ṩ����ͼ�ꡣhome, delete, plus, arrow-u, arrow-d, check, gear, grid, star, arrow-r, arrow-l, minus, refresh, forward, back, alert, info, search,
             * @namespace options
             */

            /**
             * @property {String} [iconpos] ͼƬλ�á�֧�֣�left, right, top, bottom, notext.
             * @namespace options
             */
            iconpos: 'left'

            /**
             * @property {String} [state]
             * @description ���ó�ʼ״̬�����״ֵ̬Ϊ`disbaled`����ť�����ɵ����
             * @namespace options
             */

            /**
             * @property {String} [{$state}Text]
             * @description ���ö�Ӧ״̬���֣���button�����״̬ʱ����ť����ʾ��Ӧ�����֡�
             * @namespace options
             */
        },

        template: {
            icon: '<span class="ui-icon ui-icon-<%= name %>"></span>',
            text: '<span class="ui-btn-text"><%= text %></span>'
        },

        _getWrap: function( $el ) {
            return $el;
        },

        _init: function(){
            var me = this;

            me.$el = me.$el === undefined ? $('<span/>').appendTo( document.body ) : me.$el;
        },

        _create: function() {
            var me = this,
                opts = me._options,
                $wrap = me.$wrap = me._getWrap( me.getEl() ),
                input = $wrap.is( 'input' ),
                $label = $wrap.find( '.ui-btn-text' ),
                $icon = $wrap.find( '.ui-icon' );

            // ����label
            // ����ǿ��ַ��������ʾdom��д��data-label=""
            opts.label = opts.label === undefined ? $wrap[ input ? 'val' : 'text' ]() : opts.label;
            input || opts.label === undefined || !$label.length && ($label = $( me.tpl2html( 'text', {
                text: opts.label
            } ) )).appendTo( $wrap.empty() );
            me.$label = $label.length && $label;
            opts.resetText = opts.resetText || opts.label;

            // ���������icon��dom��û�У��򴴽�
            input || opts.icon && !$icon.length && ($icon = $( me.tpl2html( 'icon', {
                name: opts.icon
            } ) )).appendTo( $wrap );
            me.$icon = $icon.length && $icon;

            $wrap.addClass( 'ui-btn ' + (opts.label && opts.icon ?
                    'ui-btn-icon-' + opts.iconpos : opts.label ?
                    'ui-btn-text-only' : 'ui-btn-icon-only') );

            opts.state && setTimeout( function(){
                me.state( opts.state );
            }, 0 );
        },

        /**
         * ���û��߻�ȡ��ť״ֵ̬��
         *
         * ��������stateΪ"disabled", �˰�ť����ɲ��ɵ��״̬��
         *
         * ```javascript
         * // ��ʼ����ʱ����Ը�diabled״̬����Text
         * var btn = $( '#btn' ).button({
         *     disabledText: '���ɵ�'
         * });
         *
         * // ��ť����ɲ��ɵ��״̬��ͬʱ����Ҳ����ˡ����ɵ㡰
         * btn.button( 'state', 'disabled' );
         *
         * // ��ԭ��ť״̬
         * // ����Ҳ��ԭ��
         * btn.button( 'state', 'reset' );
         *
         * ```
         * @method state
         * @grammar state( value ) => self
         * @grammar state() => String
         * @param  {String} [state] ״ֵ̬��
         * @return {String} ��û�д���stateֵʱ���˷�����ΪΪgetter, ���ص�ǰstateֵ��
         * @return {self} ��������stateֵʱ���˷�����ΪΪsetter, ����ʵ������������ʽ���á�
         */
        state: function( state ) {

            // getter
            if ( state === undefined ) {
                return this._state;
            }

            // setter
            var me = this,
                $wrap = me.$wrap,
                input = $wrap.is( 'input' ),
                text = me._options[ state + 'Text' ];

            me.$wrap.removeClass( 'ui-state-' + me._state )
                    .addClass( 'ui-state-' + state );

            text === undefined || (input ? $wrap : me.$label)[ input ?
                    'val' : 'text' ]( text );

            me._state !== state && me.trigger( 'statechange', state, me._state );
            me._state = state;
            return me;
        },

        /**
         * �л���ťѡ��״̬
         * @method toggle
         * @grammar toggle() => self
         * @example
         * var btn = $( '#btn' );
         *
         * btn.on( 'click', function() {
         *     btn.button( 'toggle' );
         * } );
         */
        toggle: function() {
            this.state( this._state === 'active' ? 'reset' : 'active' );
            return this;
        }

        /**
         * @event ready
         * @param {Event} e gmu.Event����
         * @description �������ʼ����󴥷���
         */

        /**
         * @event statechange
         * @param {Event} e gmu.Event����
         * @param {String} state ��ǰstateֵ
         * @param {String} preState ǰһ��state��ֵ
         * @description �����״̬�仯ʱ������
         */

        /**
         * @event destroy
         * @param {Event} e gmu.Event����
         * @description ����������ٵ�ʱ�򴥷���
         */
    } );

    // dom ready
    $(function() {

        // ����̬��
        $( document.body ).highlight( 'ui-state-hover', '.ui-btn:not(.ui-state-disabled)' );
    });
})( gmu, gmu.$ );