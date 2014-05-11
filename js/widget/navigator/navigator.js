/**
 * @file ���������
 * @import core/widget.js, extend/highlight.js
 * @module GMU
 */
(function( gmu, $, undefined ) {
    
    /**
     * ���������
     *
     * @class Navigator
     * @constructor Html����
     * ```html
     * 
     * ```
     *
     * javascript����
     * ```javascript
     * 
     * ```
     * @param {dom | zepto | selector} [el] ������ʼ����������Ԫ��
     * @param {Object} [options] �����������������鿴[Options](#GMU:Navigator:options)
     * @grammar $( el ).navigator( options ) => zepto
     * @grammar new gmu.Navigator( el, options ) => instance
     */
    gmu.define( 'Navigator', {
        options: {

            /**
             * @property {Array} [content=null] �˵�����
             * @namespace options
             */
            content: null,

            /**
             * @property {String} [event='click'] �����¼���
             * @namespace options
             */
            event: 'click'
        },

        template: {
            list: '<ul>',
            item: '<li><a<% if( href ) { %> href="<%= href %>"<% } %>>' +
                    '<%= text %></a></li>'
        },

        _create: function() {
            var me = this,
                opts = me._options,
                $el = me.getEl(),
                $list = $el.find( 'ul' ).first(),
                name = 'ui-' + me.widgetName,
                renderer,
                html;

            // ���û�а���ul�ڵ㣬��˵��ͨ��ָ��content��create
            // �����createģʽ�����ȥ���ܶ�ʱ������д����dom���ˡ�
            if ( !$list.length && opts.content ) {
                $list = $( me.tpl2html( 'list' ) );
                renderer = me.tpl2html( 'item' );

                html = '';
                opts.content.forEach(function( item ) {

                    // ������ṩĬ��ֵ��Ȼ��ͬʱĳЩkeyû�д�ֵ��parseTpl�ᱨ��
                    item = $.extend( {
                        href: '',
                        text: ''
                    }, typeof item === 'string' ? {
                        text: item
                    } : item );

                    html += renderer( item );
                });

                $list.append( html ).appendTo( $el );
            } else {
                
                // ����ֱ��ͨ��ul��ʼ�������
                if ( $el.is( 'ul, ol' ) ) {
                    $list = $el.wrap( '<div>' );
                    $el = $el.parent();
                }

                if ( opts.index === undefined ) {

                    // ���opts��û��ָ��index, ���Դ�dom�в鿴�Ƿ��бȽ�Ϊui-state-active��
                    opts.index = $list.find( '.ui-state-active' ).index();
                    
                    // û�ҵ����Ǹ�ֵΪ0
                    ~opts.index || (opts.index = 0);
                }
            }

            me.$list = $list.addClass( name + '-list' );
            me.trigger( 'done.dom', $el.addClass( name ), opts );

            // bind Events
            $list.highlight( 'ui-state-hover', 'li' );
            $list.on( opts.event + me.eventNs,
                    'li:not(.ui-state-disable)>a', function( e ) {
                me._switchTo( $( this ).parent().index(), e );
            } );

            me.index = -1;
            me.switchTo( opts.index );
        },

        _switchTo: function( to, e ) {
            if ( to === this.index ) {
                return;
            }

            var me = this,
                list = me.$list.children(),
                evt = gmu.Event( 'beforeselect', e ),
                cur;
                
            me.trigger( evt, list.get( to ) );
            
            if ( evt.isDefaultPrevented() ) {
                return;
            }

            cur = list.removeClass( 'ui-state-active' )
                    .eq( to )
                    .addClass( 'ui-state-active' );

            me.index = to;
            return me.trigger( 'select', to, cur[ 0 ] );
        },

        /**
         * �л�����������ĳһ��
         * @param {Number} to ���
         * @method switchTo
         */
        switchTo: function( to ) {
            return this._switchTo( ~~to );
        },

        /**
         * ȡ��ѡ��
         * @method unselect
         */
        unselect: function() {
            this.index = -1;
            this.$list.children().removeClass( 'ui-state-active' );
        },

        /**
         * ��ȡ��ǰѡ�е����
         * @method getIndex
         */
        getIndex: function() {
            return this.index;
        }

        /**
         * @event ready
         * @param {Event} e gmu.Event����
         * @description �������ʼ����󴥷���
         */

        /**
         * @event beforeselect
         * @param {Event} e gmu.Event����
         * @param {Element} Ŀ��Ԫ��
         * @description ��ѡ�����ŷ����л�ǰ����
         */
        
        /**
         * @event select
         * @param {Event} e gmu.Event����
         * @param {Event} ��ǰѡ������
         * @param {Element} ��һ��ѡ���Ԫ��
         * @description ��ѡ�����ŷ����л��󴥷�
         */
        
        /**
         * @event destroy
         * @param {Event} e gmu.Event����
         * @description ��������ٵ�ʱ�򴥷�
         */
    } );
})( gmu, gmu.$ );