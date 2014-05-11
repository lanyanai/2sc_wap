/**
 * @file �����������
 * @import core/widget.js, widget/popover/popover.js, extend/highlight.js
 * @module GMU
 */
(function( gmu, $ ) {

    /**
     * �����������
     *
     * @class Dropmenu
     * @constructor Html����
     * ```html
     * <a id="btn1" class="btn">Dropmenu</a>
     * ```
     *
     * javascript����
     * ```javascript
     * $('#btn1').dropmenu({
     *  content: [
     *      
     *      'Action',
     *  
     *      'Another Action',
     *  
     *      'Someone else here',
     *  
     *      'divider',
     *  
     *      {
     *          text: 'Open Baidu',
     *          icon: 'grid',
     *          href: 'http://www.baidu.com'
     *      },
     *  ]
     * })
     * ```
     * @param {dom | zepto | selector} [el] ������ʼ�������Ԫ��
     * @param {Object} [options] �����������������鿴[Options](#GMU:Dropmenu:options)
     * @grammar $( el ).dropmenu( options ) => zepto
     * @grammar new gmu.Dropmenu( el, options ) => instance
     */
    gmu.define( 'Dropmenu', {
        options: {

            // ע��: ��ǰ�ǽ�items, Ϊ�����������ͳһ�����Ը�����content
            /**
             * @property {Array} [content=null] ���������ݣ�ÿ����¼Ϊһ��Object�������� {text:'', icon: '', href:'' }
             * @namespace options
             */
            content: null
        },

        template: {

            item: '<li><a <% if ( href ) { %>href="<%= href %>"<% } %>>' +
                    '<% if ( icon ) { %><span class="ui-icon ui-icon-' +
                    '<%= icon %>"></span><% } %><%= text %></a></li>',

            divider: '<li class="divider"></li>',

            wrap: '<ul>'
        },

        _init: function() {
            var me = this;

            // �洢ul
            me.on( 'done.dom', function( e, $root ) {
                me.$list = $root.find( 'ul' ).first()
                        .addClass( 'ui-dropmenu-items' )
                        .highlight( 'ui-state-hover',
                                '.ui-dropmenu-items>li:not(.divider)' );
            } );
        },

        _create: function() {
            var me = this,
                opts = me._options,
                content = '';

            // ����opts.content����ul>li
            if ( $.type( opts.content ) === 'array' ) {
                
                opts.content.forEach(function( item ) {
                    
                    item = $.extend( {
                        href: '',
                        icon: '',
                        text: ''
                    }, typeof item === 'string' ? {
                        text: item
                    } : item );

                    content += me.tpl2html( item.text === 'divider' ?
                            'divider' : 'item', item );
                });
                opts.content = $( me.tpl2html( 'wrap' ) ).append( content );
            }

            me.$super( '_create' );
            me.$list.on( 'click' + me.eventNs, '.ui-dropmenu-items>li:not(' +
                    '.ui-state-disable):not(.divider)', function( e ) {

                var evt = gmu.Event( 'itemclick', e );
                me.trigger( evt, this );

                if ( evt.isDefaultPrevented() ) {
                    return;
                }
                
                me.hide();
            } );
        }

        /**
         * @event ready
         * @param {Event} e gmu.Event����
         * @description �������ʼ����󴥷���
         */

        /**
         * @event itemclick
         * @param {Event} e gmu.Event����
         * @param {Element} item ��ǰ�������Ŀ
         * @description ĳ����Ŀ�����ʱ����
         */
        
        /**
         * @event destroy
         * @param {Event} e gmu.Event����
         * @description ��������ٵ�ʱ�򴥷�
         */
    }, gmu.Popover );

})( gmu, gmu.$ );