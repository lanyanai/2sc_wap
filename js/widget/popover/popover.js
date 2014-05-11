/**
 * @file ���������, �����汾��
 * @import core/widget.js
 * @module GMU
 */
(function( gmu, $, undefined ) {

    /**
     * ��������������е����ť����Χ������Ľ���Ч�������ڵ��������ݣ�����ͨ��`content`ֱ���������ݣ�
     * Ҳ����ͨ��`container`���������ڵ㡣��ť�͵�����֮��û��λ��������
     *
     * �����汾ֻ�м򵥵ĵ����ʾ���ٵ�����ع��ܡ����ø���Ĺ�����ο�[�������](#GMU:Popover:plugins)����.
     *
     * @class Popover
     * @constructor Html����
     * ```html
     * <a id="btn">��ť<a/>
     * ```
     *
     * javascript����
     * ```javascript
     * $('#btn').popover({
     *     content: 'Hello world'
     * });
     * ```
     * @param {dom | zepto | selector} [el] ��ť�ڵ�
     * @param {Object} [options] �����������������鿴[Options](#GMU:Popover:options)
     * @grammar $( el ).popover( options ) => zepto
     * @grammar new gmu.Popover( el, options ) => instance
     */
    gmu.define( 'Popover', {

        // Ĭ�������
        options: {

            /**
             * @property {Zepto | Selector} [container] ָ����������������룬�������el�ĺ����Զ�����һ����
             * @namespace options
             */
            container: null,

            /**
             * @property {String | Zepto | Selector } [content] ����������ݡ�
             * @namespace options
             */
            content: null,

            /**
             * @property {String} [event="click"] �����¼���, ����������ó�tap��
             * @namespace options
             */
            event: 'click'
        },

        template: {
            frame: '<div>'
        },

        /**
         * @event ready
         * @param {Event} e gmu.Event����
         * @description �������ʼ����󴥷���
         */

        // ����dom�Ĵ�����
        _create: function() {
            var me = this,
                opts = me._options,
                $el = opts.target && $( opts.target ) || me.getEl(),
                $root = opts.container && $( opts.container );

            // û�� ���� ���㴫����ѡ����������û���ҵ��ڵ㣬���ǵô���һ����
            $root && $root.length || ($root = $( me.tpl2html( 'frame' ) )
                    .addClass( 'ui-mark-temp' ));
            me.$root = $root;

            // ���������content, ����Ϊ���ݲ��뵽container��
            opts.content && me.setContent( opts.content );
            me.trigger( 'done.dom', $root.addClass( 'ui-' + me.widgetName ),
                    opts );

            // ����ڵ��Ƕ�̬�����ģ������ĵ����У��Ͱѽڵ���뵽$el���档
            $root.parent().length || $el.after( $root );

            me.target( $el );
        },

        // ɾ�����Ϊ�����ʱ��dom
        _checkTemp: function( $el ) {
            $el.is( '.ui-mark-temp' ) && $el.off( this.eventNs ) &&
                    $el.remove();
        },

        /**
         * @event beforeshow
         * @param {Event} e gmu.Event����
         * @description �������������ʾʱ����������ͨ��`e.preventDefault()`����ֹ��
         */


        /**
         * @event show
         * @param {Event} e gmu.Event����
         * @description ����������ʾ�󴥷���
         */


        /**
         * ��ʾ�����㡣
         * @method show
         * @chainable
         * @return {self} ���ر���
         */
        show: function() {
            var me = this,
                evt = gmu.Event( 'beforeshow' );

            me.trigger( evt );

            // ����ⲿ��ֹ�˹رգ���ʲôҲ������
            if ( evt.isDefaultPrevented() ) {
                return;
            }

            me.trigger( 'placement', me.$root.addClass( 'ui-in' ), me.$target );
            me._visible = true;
            return me.trigger( 'show' );
        },

        /**
         * @event beforehide
         * @param {Event} e gmu.Event����
         * @description ���������������ʱ����������ͨ��`e.preventDefault()`����ֹ��
         */


        /**
         * @event hide
         * @param {Event} e gmu.Event����
         * @description �����������غ󴥷���
         */

        /**
         * ���ص����㡣
         * @method hide
         * @chainable
         * @return {self} ���ر���
         */
        hide: function() {
            var me = this,
                evt = new gmu.Event( 'beforehide' );

            me.trigger( evt );

            // ����ⲿ��ֹ�˹رգ���ʲôҲ������
            if ( evt.isDefaultPrevented() ) {
                return;
            }

            me.$root.removeClass( 'ui-in' );
            me._visible = false;
            return me.trigger( 'hide' );
        },

        /**
         * �л����������ʾ�����ء�
         * @method toggle
         * @chainable
         * @return {self} ���ر���
         */
        toggle: function() {
            var me = this;
            return me[ me._visible ? 'hide' : 'show' ].apply( me, arguments );
        },

        /**
         * ���û��߻�ȡ��ǰ`��ť`(������Ķ���)��
         * @method target
         * @param {dom | selector | zepto} [el] target��ֵ��
         * @chainable
         * @return {self} ��������elʱ���˷���Ϊsetter, ����ֵΪself.
         * @return {dom} ��û�д���elʱ��Ϊgetter, ���ص�ǰtargetֵ��
         */
        target: function( el ) {

            // getter
            if ( el === undefined ) {
                return this.$target;
            }

            // setter
            var me = this,
                $el = $( el ),
                orig = me.$target,
                click = me._options.event + me.eventNs;

            orig && orig.off( click );

            // ���¼�
            me.$target = $el.on( click, function( e ) {
                e.preventDefault();
                me.toggle();
            } );

            return me;
        },

        /**
         * ���õ�ǰ�������ݡ�
         * @method setContent
         * @param {dom | selector | zepto} [value] ��������
         * @chainable
         * @return {self} �������
         */
        setContent: function( val ) {
            var container = this.$root;
            container.empty().append( val );
            return this;
        },

        /**
         * ��������������¼����ٺ�ɾ���Զ�������dom.
         * @method destroy
         * @chainable
         * @return {self} �������
         */
        destroy: function() {
            var me = this;

            me.$target.off( me.eventNs );
            me._checkTemp( me.$root );
            return me.$super( 'destroy' );
        }
    } );
})( gmu, gmu.$ );