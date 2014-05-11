/**
 * @file �����������
 * @import core/widget.js, extend/touch.js, extend/highlight.js
 */
(function( $, win ) {

     /**
     * �����������
     *
     * @class Suggestion
     * @constructor Html����
     * ```html
     * <form action="http://www.baidu.com/s" method="get">
     *     <div class="search">
     *         <div class="search-input"><input type="text" id="input" name="wd"></div>
     *         <div class="search-button"><input type="submit" value="�ٶ�һ��"></div>
     *     </div>
     * </form>
     * ```
     *
     * javascript����
     * ```javascript
     * $('#input').suggestion({
     *      source: "../../data/suggestion.php"
     *  });
     * ```
     * @param {dom | zepto | selector} [el] ������ʼ��Suggestion��Ԫ��
     * @param {Object} [options] �����������������鿴[Options](#GMU:Suggestion:options)
     * @grammar $( el ).suggestion( options ) => zepto
     * @grammar new gmu.Suggestion( el, options ) => instance
     */
    
    var guid = 0;

    gmu.define( 'Suggestion', {

        // Ĭ��options
        options: {

            /**
             * @property {Element | Zepto | Selector} container ��Ԫ�أ���Ϊrenderģʽ����Ϊ��ѡ
             * @namespace options
             */
            
            /**
             * @property {String} source �������ݵ�url�������Զ���sendRequest����Ϊ��ѡ
             * @namespace options
             */
            
            /**
             * @property {String} [param=''] url���Ӳ���
             * @namespace options
             */
            
            /**
             * @property {String | Element} [form] �ύ�����ı���Ĭ��Ϊ����input��ĵ�һ������form
             * @namespace options
             */
            
            /**
             * @property {Boolean | String} [historyShare=true] ���sug֮���Ƿ�����ʷ��¼���ɴ���ָ����keyֵ������Ĭ�ϴ�true����ʹ��Ĭ��key��'SUG-Sharing-History'������false������ʾ������history������string����Ϊ��ֵ+'-SUG-Sharing-History'��Ϊkeyֵ
             * @namespace options
             */
            historyShare: true,

            /**
             * @property {Boolean} [confirmClearHistory=true] ɾ����ʷ��¼ʱ�Ƿ�ȷ��
             * @namespace options
             */
            confirmClearHistory: true,

            /**
             * @property {Boolean} [autoClose=true] ���input֮���Զ��ر�
             * @namespace options
             */
            autoClose: false
        },

        template: {

            // ui-suggestion��class������
            // ontent, button, clear, close�⼸��div�����У������Ŀ��Ը���
            wrapper: '<div class="ui-suggestion">' +
                '<div class="ui-suggestion-content"></div>' +
                '<div class="ui-suggestion-button">' +
                '<span class="ui-suggestion-clear">�����ʷ��¼</span>' +
                '<span class="ui-suggestion-close">�ر�</span>' +
                '</div></div>'
        },

        _initDom: function() {
            var me = this,
                $input = me.getEl().attr( 'autocomplete', 'off'),
                $parent = $input.parent('.ui-suggestion-mask');

            $parent.length ? me.$mask = $parent :
                    $input.wrap( me.$mask =
                    $( '<div class="ui-suggestion-mask"></div>' ) );

            // ������template��wrapper����Ⱦ�б�
            me.$mask.append( me.tpl2html( 'wrapper' ) );

            me.$wrapper = me.$mask.find( '.ui-suggestion' )
                    .prop('id', 'ui-suggestion-' + (guid++));
            me.$content = me.$wrapper
                    .css( 'top', $input.height() + (me.wrapperTop =
                    parseInt( me.$wrapper.css( 'top' ), 10 ) || 0) )
                    .find( '.ui-suggestion-content' );

            me.$btn = me.$wrapper.find( '.ui-suggestion-button' );
            me.$clearBtn = me.$btn.find( '.ui-suggestion-clear' );
            me.$closeBtn = me.$btn.find( '.ui-suggestion-close' );

            return me.trigger('initdom');
        },

        _bindEvent: function() {
            var me = this,
                $el = me.getEl(),
                ns = me.eventNs;

            me._options.autoClose && $( document ).on( 'tap' + ns, function( e ) {

                // ������ǵ�sug�����ر�sug
                !$.contains( me.$mask.get( 0 ), e.target ) && me.hide();
            } );

            $el.on( 'focus' + ns, function() {

                // ��sug�Ѿ�������ʾ״̬ʱ������Ҫ��showlist
                !me.isShow && me._showList().trigger( 'open' );
            } );

            $el.on( 'input' + ns, function() {

                // ���ǵ����ֻ�������Ƚ�������δ����ϡ�ʹ���
                me._showList();
            } );

            me.$clearBtn.on( 'click' + ns, function() {

                //�����ʷ��¼
                me.history( null );
            } ).highlight( 'ui-suggestion-highlight' );

            me.$closeBtn.on( 'click' + ns, function() {

                // ����sug
                me.getEl().blur();
                me.hide().trigger( 'close' );
            } ).highlight( 'ui-suggestion-highlight' );

            return me;
        },

        _create: function() {
            var me = this,
                opts = me._options,
                hs = opts.historyShare;

            opts.container && (me.$el = $(opts.container));

            // ����Ĭ�ϴ�true����ʹ��Ĭ��key��'SUG-Sharing-History'
            // ����false������ʾ������history���Ը�sug��id��Ϊkeyֵ
            // ����string�����ڴ˻����ϼ���'SUG-Sharing-History'
            me.key = hs ?
                    (($.type( hs ) === 'boolean' ? '' : hs + '-') +
                    'SUG-Sharing-History') :
                    me.getEl().attr( 'id' ) || ('ui-suggestion-' + (guid++));

            // localStorage�����ݷָ���
            me.separator = encodeURIComponent( ',' );

            // ����dom�����¼�
            me._initDom()._bindEvent();

            return me;
        },

        /**
         * չʾsuglist����Ϊquery���ںͲ�����
         * @private
         */
        _showList: function() {
            var me = this,
                query = me.value(),
                data;

            if ( query ) {

                // ��query��Ϊ�գ���input��focusʱ,input��ֵ
                // �û��Լ����������ֱ�ӱ������ݴ���������sendrequest�д���
                me.trigger( 'sendrequest', query, $.proxy( me._render, me ),
                        $.proxy( me._cacheData, me ));

            } else {

                // queryΪ�գ����տ�ʼfocusʱ����ȡlocalstorage�е�������Ⱦ
                (data = me._localStorage()) ?
                        me._render( query, data.split( me.separator ) ) :
                        me.hide();
            }

            return me;
        },

        _render: function( query, data ) {

            this.trigger( 'renderlist', data, query, $.proxy( this._fillWrapper, this ) );
        },

        /**
         * �����������sug wrapper
         * @listHtml ����sugƬ�Σ�Ĭ��Ϊ'<ul><li>...</li>...</ul>'
         * @private
         */
        _fillWrapper: function( listHtml ) {

            // ���ݲ���������ʷ��¼ʱ���������ʷ��¼��ť
            this.$clearBtn[ this.value() ? 'hide' : 'show' ]();
            listHtml ? (this.$content.html( listHtml ), this.show()) :
                    this.hide();

            return this;
        },

        _localStorage: function( value ) {
            var me = this,
                key = me.key,
                separator = me.separator,
                localStorage,
                data;

            try {

                localStorage = win.localStorage;

                if ( value === undefined ) {    // geter
                    return localStorage[ key ];

                } else if ( value === null ) {    // setter clear
                    localStorage[ key ] = '';

                } else if ( value ) {    // setter
                    data = localStorage[ key ] ?
                            localStorage[ key ].split( separator ) : [];

                    // ����ȥ�ش���
                    // todo ���ڼ����ϸ�ʽ����������һ������\u001e����δ���ж�
                    if ( !~$.inArray( value, data ) ) {
                        data.unshift( value );
                        localStorage[ key ] = data.join( separator );
                    }
                }

            } catch ( ex ) {
                console.log( ex.message );
            }

            return me;
        },

        _cacheData: function( key, value ) {
            this.cacheData || (this.cacheData = {});

            return value !== undefined ?
                this.cacheData[ key ] = value : this.cacheData[ key ];
        },

        /**
         * ��ȡinputֵ
         * @method value
         * @return {String} input�е�ֵ
         */
        value: function() {
            return this.getEl().val();
        },

        /**
         * ����|��ȡ|�����ʷ��¼
         * @method history
         * @param {String} [value] ����value��ʾ���sug��ʷ��¼����value��ʾ��ֵ
         */
        history: function( value ) {
            var me = this,
                clearHistory = value !== null || function() {
                    return me._localStorage( null).hide();
                };

            return value === null ? (me._options.confirmClearHistory ?
                win.confirm( '���ȫ����ѯ��ʷ��¼��' ) && clearHistory() :
                clearHistory()) : me._localStorage( value )
        },

        /**
         * ��ʾsug
         * @method show
         */
        show: function() {

            if ( !this.isShow ) {
                this.$wrapper.show();
                this.isShow = true;
                return this.trigger( 'show' );
            }else{
                return this;
            }

        },

        /**
         * ����sug
         * @method hide
         */
        hide: function() {

            if ( this.isShow ) {
                this.$wrapper.hide();
                this.isShow = false;
                return this.trigger( 'hide' );
            }else{
                return this;
            }

        },

        /**
         * �������
         * @method destroy
         */
        destroy: function() {
            var me = this,
                $el = me.getEl(),
                ns = me.ns;

            // ��ִ�и���destroy����֤�����option�е�destroy��ִ��
            me.trigger( 'destroy' );

            $el.off( ns );
            me.$mask.replaceWith( $el );
            me.$clearBtn.off( ns );
            me.$closeBtn.off( ns );
            me.$wrapper.children().off().remove();
            me.$wrapper.remove();
            me._options.autoClose && $( document ).off( ns );

            this.destroyed = true;

            return me;
        }

        /**
         * @event ready
         * @param {Event} e gmu.Event����
         * @description �������ʼ����󴥷���
         */

        /**
         * @event initdom
         * @param {Event} e gmu.Event����
         * @param {Zepto} $el sliderԪ��
         * @description DOM������ɺ󴥷�
         */
        
        /**
         * @event show
         * @param {Event} e gmu.Event����
         * @description ��ʾsugʱ����
         */
        
        /**
         * @event hide
         * @param {Event} e gmu.Event����
         * @param {Number} index ��ǰslide�����
         * @description ����sugʱ����
         */
        
        /**
         * @event sendrequest
         * @param {Event} e gmu.Event����
         * @param {String} query �û������ѯ��
         * @param {Function} render ����������ɺ����Ⱦ�ص������������Ϊquery,data
         * @param {Function} cacheData ����query�Ļص������������Ϊquery, data
         * @description ��������ʱ����
         */
        
        /**
         * @event renderlist
         * @param {Event} e gmu.Event����
         * @param {Array} data ��Ⱦ������
         * @param {String} query �û�����Ĳ�ѯ��
         * @param {Function} fillWrapper �б���Ⱦ��ɺ�Ļص�����������ΪlistHtmlƬ��
         * @description ��Ⱦsug listʱ����
         */
        
        /**
         * @event destroy
         * @param {Event} e gmu.Event����
         * @description ��������ٵ�ʱ�򴥷�
         */
    } );
})( gmu.$, window );
