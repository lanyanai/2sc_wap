/**
 * @file ��ʷ��¼���
 * @import core/widget.js, extend/touch.js, widget/dialog.js
 * @module GMU
 */

 // TODO �б�����֧��iScroll
(function( gmu, $ ) {
    
    /**
     * ��ʷ��¼���
     *
     * @class Historylist
     * @constructor Html����
     * ```html
     * <div>
     *     <p><input type="text" class="input-text" id="J_input" /><input type="button" value="ȡ��" class="input-button" /></p>
     *     <div id="J_historyWrap"></div>
     * </div>
     * ```
     *
     * javascript����
     * ```javascript
     * var instance = new gmu.Historylist({
     *     container: $('#J_historyWrap'), // ҳ������Ҫ��һ���Ѿ����ڵ�������������
     *     items: [
     *             {'value': 'global', 'context': '<b>global</b> adj. ȫ��ģ��ۺϵ�'},
     *             'google',
     *             {'value': 'visual', 'context': '<b>visual</b> adj. �Ӿ���'},
     *             'alibaba',
     *             'taobao'
     *            ],   // ��ʷ��¼���б�
     *     itemTouch: function(e, data) {  // ĳ����¼����������Ӧ�¼�
     *         console.log( 'item touched: ' + data.item );   // data.item��ĳ����¼������
     *         $('#J_input').val(data.item);
     *     },
     *     itemDelete: function(e, data) { // ĳ����¼��ɾ�������Ӧ�¼�
     *         console.log( 'item delete:' + data.item );   // data.item��ĳ����¼������
     *     },
     *     clear: function() {  // �û�ȷ�����������ʷ�����Ӧ�¼�
     *         // ������ɾ��localstorage��������ʷ����
     *         console.log( 'clear triggered' );
     *     }
     * });
     * ```
     * @param {dom | zepto | selector} [el] ������ʼ�������Ԫ��
     * @param {Object} [options] �����������������鿴[Options](#GMU:Historylist:options)
     * @grammar $( el ).historylist( options ) => zepto
     * @grammar new gmu.Historylist( el, options ) => instance
     */
    gmu.define( 'Historylist', {

        options: {

            /**
             * @property {Zepto | Selector | Element} [container=document.body] ������Ĭ��Ϊ document.body 
             * @namespace options
             */
            container: document.body,

            /**
             * @property {Boolean} [deleteSupport=true] �Ƿ�֧�ֻ���ɾ����¼��Ĭ��֧��
             * @namespace options
             */
            deleteSupport: true,

            /**
             * @property {Array} [items=Array()] ��ʷ��¼������
             * @namespace options
             */
            items: []
        },

        template: {
            wrap: '<ul class="ui-historylist">',
            item: '<li data-id="<%=id%>"><p class="ui-historylist-itemwrap"><span class="ui-historylist-item"><%=context%></span></p></li>',
            clear: '<p class="ui-historylist-clear">���������ʷ</p>'
        },

        _init: function() {
            var me = this,
                opts = me._options;

            // js��һ������ҳ��β����������init��Ҫ���¸�ֵ
            me.$el = opts.container = opts.container || document.body;

            me.items = [];

            me.on( 'ready', function() {
                me._bindUI();
            } );

            me.on( 'itemDelete', function() {
                // ��ʷ��¼Ϊ��ʱ������
                if( me.items.length === 0 ) {
                    me.hide();
                }
            } );
        },

        _create: function() {
            var me = this,
                opts = me._options;

            me.$el.hide();
            me.$wrap = $( me.tpl2html( 'wrap' ) ).appendTo( opts.container );

            me.$clear = $( me.tpl2html( 'clear' ) ).appendTo( opts.container );
            !me._options.deleteSupport && me.$clear.hide();

            me.addItems( opts.items );

            me.show();
        },

        _filterItemsById: function( id, callback ) {
            var me = this;

            me.items.forEach( function( _item, index ) {
                if ( _item.id === id ) {
                    callback.call( me, _item, index );

                    return;
                }
            } );
        },

        _bindUI: function() {
            var me = this,
                touch,
                $target,
                itemId,
                startTimestamp,
                endTimestamp,
                wantDelete = false,
                timeout,
                touchstartX,
                currentX,
                touchstartY,
                currentY,
                velocity,
                movedPercentage,
                moved,
                movedDistance;

            me.$clear.on( 'tap' + me.eventNs, function( ev ) {
                // ��ֹ��͸
                setTimeout( function() {
                    gmu.Dialog({
                        closeBtn: false,
                        buttons: {
                            '���': function(){
                                me.clear();
                                this.destroy();
                            },
                            'ȡ��': function(){
                                this.destroy();
                            }
                        },
                        title: '�����ʷ',
                        content: '<p>�Ƿ����������ʷ��</p>',
                        open: function(){
                            this._options._wrap.addClass( 'ui-historylist-dialog' );
                        }
                    });
                }, 10 );

                ev.preventDefault();
                ev.stopPropagation();
            } );

            me.$wrap.on( 'tap' + me.eventNs, function(ev) {
                if( me._options.deleteSupport ) {
                    return;
                }

                $target = $( ev.target );

                if( !$target.hasClass( 'ui-historylist-itemwrap' ) && 
                    !($target = $target.parents( '.ui-historylist-itemwrap' )).length ) {
                    $target = null;
                    return;
                }

                itemId = $target.parent().attr( 'data-id' );
                me._filterItemsById( itemId, function( _item ) {
                    me.trigger( 'itemTouch', {'item': _item.value} );
                });

            } );

            me.$wrap.on( 'touchstart' + me.eventNs, function(ev) {

                if( !me._options.deleteSupport ) {
                    return;
                }
                touch = ev.touches[0];
                $target = $( touch.target );
                startTimestamp = ev.timeStamp;
                currentX = touchstartX = parseInt( touch.pageX );
                currentY = touchstartY = parseInt( touch.pageY );
                moved = false;
                wantDelete = false;

                if( !$target.hasClass( 'ui-historylist-itemwrap' ) && 
                    !($target = $target.parents( '.ui-historylist-itemwrap' )).length ) {
                    $target = null;
                    return;
                }

                $target.addClass( 'ui-historylist-ontap' );

                // TODO ����-webkit-box���Ͳ���Ҫȥ��̬����width��
                $target.css( 'width',  $target.width() - parseInt( $target.css( 'border-left-width' ) ) - parseInt( $target.css( 'border-right-width' ) ));
            } );

            me.$wrap.on( 'touchmove' + me.eventNs, function(ev) {
                if( !$target ) {
                    return;
                }

                currentX = ev.touches[0].pageX;
                currentY = ev.touches[0].pageY;
                timeout === undefined && (timeout = setTimeout( function() {
                    // �����ƶ��ľ�����ں����ƶ������һ��ʱ����Ϊ�û�����ͼ������������ɾ��
                    if( Math.abs( currentY - touchstartY ) > Math.abs (currentX - touchstartX )/2 ){
                        wantDelete = false;
                    }else{
                        wantDelete = true;
                    }

                }, 10 ));
                
                moved = moved || ((currentX - touchstartX >= 3 || currentY - touchstartY >= 3) ? true : false);
                if( !wantDelete ) {
                    setTimeout( function() {
                        $target && $target.removeClass( 'ui-historylist-ontap' );
                    }, 150 );   // ��ʱ��һ�㣬����������Ϊclass�ı�̫�죬������
                    return;
                }

                movedPercentage = (currentX - touchstartX)/me.$wrap.width();

                // TODO ��Щ�豸���е㿨����Ҫ�Ż�
                $target.addClass( 'ui-historylist-itemmoving' );
                $target.removeClass( 'ui-historylist-ontap' );
                $target.css( '-webkit-transform', 'translate3d(' + (currentX - touchstartX) + 'px, 0, 0)' );
                $target.css( 'opacity', 1 - movedPercentage );
                
                ev.preventDefault();
                ev.stopPropagation();
            } );

            me.$wrap.on( 'touchend' + me.eventNs + ' touchcancel' + me.eventNs, function(ev) {
                if( !$target) {
                    return;
                }

                clearTimeout(timeout);
                timeout = undefined;

                itemId = $target.parent().attr( 'data-id' );
                endTimestamp = ev.timeStamp;
                velocity = (currentX - touchstartX) / (endTimestamp - startTimestamp);
                movedDistance = Math.abs( currentX - touchstartX );

                $target.removeClass( 'ui-historylist-ontap' );
                $target.removeClass( 'ui-historylist-itemmoving' );

                // ���ƶ��ľ���С�� 1/3 ʱ���ٶȿ���ɾ�����ٶ�����ԭ
                if( ((movedDistance < me.$wrap.width()/3 && Math.abs( velocity ) > 0.1) && wantDelete) ||
                     (movedDistance >= me.$wrap.width()/3 && wantDelete) ) {
                        me.removeItem( itemId, $target );
                } else {
                    $target.css( 'width', 'auto' );
                    $target.css( '-webkit-transform', 'translate3d(0, 0, 0)' );
                    $target.css( 'opacity', 1 );

                    // �ƶ�С��3������ʱ������Ϊ�ǵ�����ɷ� itemTouch �¼�
                    // ����Ƴ�3�����⣬���Ƶ�3�����ڣ���Ϊ���ǵ��
                    !moved && movedDistance < 3 && me._filterItemsById( itemId, function( _item ) {
                        me.trigger( 'itemTouch', {'item': _item.value} );
                    });
                }

                $target = null;
            } );
        },

        /**
         * ��ʾHistorylist
         * @method show
         * @return {self} ���ر���
         */
        show: function() {
            var me = this;

            // û����ʷ��¼ʱ������ʾ
            if( me.items.length === 0 ) {
                return;
            }

            if( me.sync === false ) {
                me.$wrap.html( '' );
                me.addItems( me.syncitems );
                me.sync = true;
            }
            me.$el.show();
            me.isShow = true;

            return me;
        },

        /**
         * ����Historylist
         * @method hide
         * @return {self} ���ر���
         */
        hide: function() {
            var me = this;

            me.$el.hide();
            me.isShow = false;

            return me;
        },

        _getItemId: function() {
            var me = this;

            me._itemId === undefined ? (me._itemId = 1) : ++me._itemId;

            return '__dd__' + me._itemId;
        },

        _getFormatItem: function( item ) {
            var me = this;

            if( Object.prototype.toString.call( item ) === '[object String]' ) {
                return {
                    'context': item,
                    'value': item,
                    'id': me._getItemId()
                }
            } else {
                return {
                    'context': item.context || item.value,
                    'value': item.value || item.context,
                    'id': me._getItemId()
                }
            }
        },

        /**
         * ���һ����ʷ��¼
         * @method addBtns
         * @param {String|Object} item ��ʷ��¼���������ַ�����Ҳ�����Ǳ�׼��ʽ�Ķ��󣨰���context��value��
         * @return {self} ���ر���
         */
        addItem: function( item ) {
            var me = this,
                item = me._getFormatItem( item );

            // ���me.items���Ƿ��Ѵ��ڸ���
            me.items.forEach( function( _item, index ) {
                if ( _item.value === item.value ) {
                    me.items.splice( index, 1);
                    $( me.$wrap.children()[index] ).remove();

                    return;
                }
            } );

            me.$wrap.children().length === 0 ? 
                me.$wrap.append( me.tpl2html( 'item', item ) ) : 
                $( me.tpl2html( 'item', item ) ).insertBefore( me.$wrap.children()[0] );
            
            me.items.unshift( item );

            return me;
        },

        /**
         * ��Ӷ�����ʷ��¼
         * @method addBtns
         * @param {Array} item ��ʷ��¼
         * @return {self} ���ر���
         */
        addItems: function( items ) {
            var me = this;

            items.forEach( function( item ) {
                me.addItem( item );
            } );

            return me;
        },

        /**
         * �������ݣ�������Ⱦ�б�
         * @method update
         * @param {Array} item �µ���ʷ��¼
         * @return {self} ���ر���
         */
        update: function( items ) {
            var me = this;


            if( me.isShow ) {
                me.$wrap.html( '' );
                me.addItems( items );
                me.sync = true;
            } else {
                me.syncitems = items;
                me.sync = false;
            }

            return me;
        },

        removeItem: function( itemId, $itemTarget ) {
            var me = this,
                distance,
                transform,
                x;

            // ���ݵ�ǰλ�Ƶ��������ж��Ǵ��һ������Ǵ��󻬳�
            transform = $itemTarget.css( '-webkit-transform');
            x = /translate3d\((.*?),.*/.test(transform) ? RegExp.$1: 0;
            distance = parseInt( x, 10) >= 0 ? $itemTarget.width() : -$itemTarget.width();
            $itemTarget.css( '-webkit-transform', 'translate3d(' + distance + 'px, 0, 0)' );

            // TODO ����λ�Ƹı�͸���ȣ��о���������û��Ҫ��

            $itemTarget.on( 'transitionEnd' + me.eventNs +  ' webkitTransitionEnd' + me.eventNs, function() {
                $itemTarget.parent().remove();

                me._filterItemsById( itemId, function( _item, index ) {
                    me.items.splice( index, 1);
                    me.trigger( 'itemDelete', {'item': _item.value} );
                });
            } );

        },

        /**
         * �����ʷ��¼
         * @method clear
         * @return {self} ���ر���
         */
        clear: function() {
            var me = this;

            me.$wrap.html( '' );
            me.items = [];
            me.sync = true;
            me.hide();
            me.trigger( 'clear' );

            return me;
        },

        /**
         * ����ɾ������
         * @method disableDelete
         * @return {self} ���ر���
         */
        disableDelete: function() {
            var me = this;

            me._options.deleteSupport = false;
            me.$clear.hide();

            return me;
        },

        /**
         * ����ɾ������
         * @method enableDelete
         * @return {self} ���ر���
         */
        enableDelete: function() {
            var me = this;

            me._options.deleteSupport = true;
            me.$clear.show();

            return me;
        },

        /**
         * �������
         * @method destroy
         */
        destroy: function() {
            var me = this;

            me.$wrap.off( me.eventNs );
            me.$clear.off( me.eventNs );

            me.$wrap.remove();
            me.$clear.remove();

            return me.$super( 'destroy' );
        }

        /**
         * @event ready
         * @param {Event} e gmu.Event����
         * @description �������ʼ����󴥷���
         */

        /**
         * @event itemTouch
         * @param {Event} e gmu.Event����
         * @param {String} item ������ļ�¼��value
         * @description ���ĳ����ʷ��¼ʱ����
         */

        /**
         * @event itemDelete
         * @param {Event} e gmu.Event����
         * @param {String} item ��ɾ���ļ�¼��value
         * @description ɾ��ĳ����ʷ��¼ʱ����
         */

        /**
         * @event clear
         * @param {Event} e gmu.Event����
         * @description �����ʷ��¼ʱ����
         */

        /**
         * @event destroy
         * @param {Event} e gmu.Event����
         * @description ��������ٵ�ʱ�򴥷�
         */
    } );
})( gmu, gmu.$ );

