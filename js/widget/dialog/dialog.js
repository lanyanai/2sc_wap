/**
 * @file ���������
 * @import core/widget.js, extend/highlight.js, extend/parseTpl.js, extend/event.ortchange.js
 * @module GMU
 */
(function( gmu, $, undefined ) {
    var tpl = {
        close: '<a class="ui-dialog-close" title="�ر�"><span class="ui-icon ui-icon-delete"></span></a>',
        mask: '<div class="ui-mask"></div>',
        title: '<div class="ui-dialog-title">'+
                    '<h3><%=title%></h3>'+
                '</div>',
        wrap: '<div class="ui-dialog">'+
            '<div class="ui-dialog-content"></div>'+
            '<% if(btns){ %>'+
            '<div class="ui-dialog-btns">'+
            '<% for(var i=0, length=btns.length; i<length; i++){var item = btns[i]; %>'+
            '<a class="ui-btn ui-btn-<%=item.index%>" data-key="<%=item.key%>"><%=item.text%></a>'+
            '<% } %>'+
            '</div>'+
            '<% } %>' +
            '</div> '
    };

    /**
     * ���������
     *
     * @class Dialog
     * @constructor Html����
     * ```html
     * <div id="dialog1" title="��½��ʾ">
     *     <p>��ʹ�ðٶ��˺ŵ�¼��, ��ø�����Ի���ɫ����</p>
     * </div>
     * ```
     *
     * javascript����
     * ```javascript
     *  $('#dialog1').dialog({
     *      autoOpen: false,
     *      closeBtn: false,
     *      buttons: {
     *          'ȡ��': function(){
     *              this.close();
     *          },
     *          'ȷ��': function(){
     *              this.close();
     *              $('#dialog2').dialog('open');
     *          }
     *      }
     *  });
     * ```
     * @param {dom | zepto | selector} [el] ������ʼ���Ի����Ԫ��
     * @param {Object} [options] �����������������鿴[Options](#GMU:Dialog:options)
     * @grammar $( el ).dialog( options ) => zepto
     * @grammar new gmu.Dialog( el, options ) => instance
     */
    gmu.define( 'Dialog', {
        options: {
            /**
             * @property {Boolean} [autoOpen=true] ��ʼ�����Ƿ��Զ�����
             * @namespace options
             */
            autoOpen: true,
            /**
             * @property {Array} [buttons=null] �������ϵİ�ť
             * @namespace options
             */
            buttons: null,
            /**
             * @property {Boolean} [closeBtn=true] �Ƿ���ʾ�رհ�ť
             * @namespace options
             */
            closeBtn: true,
            /**
             * @property {Boolean} [mask=true] �Ƿ������ֲ�
             * @namespace options
             */
            mask: true,
            /**
             * @property {Number} [width=300] ��������
             * @namespace options
             */
            width: 300,
            /**
             * @property {Number|String} [height='auto'] ������߶�
             * @namespace options
             */
            height: 'auto',
            /**
             * @property {String} [title=null] ���������
             * @namespace options
             */
            title: null,
            /**
             * @property {String} [content=null] ����������
             * @namespace options
             */
            content: null,
            /**
             * @property {Boolean} [scrollMove=true] �Ƿ���õ�scroll���ڵ�����ʱ��
             * @namespace options
             */
            scrollMove: true,
            /**
             * @property {Element} [container=null] ����������
             * @namespace options
             */
            container: null,
            /**
             * @property {Function} [maskClick=null] �������ϵ��ʱ�������¼�
             * @namespace options
             */
            maskClick: null,
            position: null //��Ҫdialog.position���������
        },

        /**
         * ��ȡ�����Ľڵ�
         * @method getWrap
         * @return {Element} �����Ľڵ�
         */
        getWrap: function(){
            return this._options._wrap;
        },

        _init: function(){
            var me = this, opts = me._options, btns,
                i= 0, eventHanlder = $.proxy(me._eventHandler, me), vars = {};

            me.on( 'ready', function() {
                opts._container = $(opts.container || document.body);
                (opts._cIsBody = opts._container.is('body')) || opts._container.addClass('ui-dialog-container');
                vars.btns = btns= [];
                opts.buttons && $.each(opts.buttons, function(key){
                    btns.push({
                        index: ++i,
                        text: key,
                        key: key
                    });
                });
                opts._mask = opts.mask ? $(tpl.mask).appendTo(opts._container) : null;
                opts._wrap = $($.parseTpl(tpl.wrap, vars)).appendTo(opts._container);
                opts._content = $('.ui-dialog-content', opts._wrap);

                opts._title = $(tpl.title);
                opts._close = opts.closeBtn && $(tpl.close).highlight('ui-dialog-close-hover');
                me.$el = me.$el || opts._content;//�������Ҫ֧��renderģʽ���˾�Ҫɾ��

                me.title(opts.title);
                me.content(opts.content);

                btns.length && $('.ui-dialog-btns .ui-btn', opts._wrap).highlight('ui-state-hover');
                opts._wrap.css({
                    width: opts.width,
                    height: opts.height
                });

                //bind events���¼�
                $(window).on('ortchange', eventHanlder);
                opts._wrap.on('click', eventHanlder);
                opts._mask && opts._mask.on('click', eventHanlder);
                opts.autoOpen && me.open();
            } );
        },

        _create: function(){
            var opts = this._options;

            if( this._options.setup ){
                opts.content = opts.content || this.$el.show();
                opts.title = opts.title || this.$el.attr('title');
            }
        },

        _eventHandler: function(e){
            var me = this, match, wrap, opts = me._options, fn;
            switch(e.type){
                case 'ortchange':
                    this.refresh();
                    break;
                case 'touchmove':
                    opts.scrollMove && e.preventDefault();
                    break;
                case 'click':
                    if(opts._mask && ($.contains(opts._mask[0], e.target) || opts._mask[0] === e.target )){
                        return me.trigger('maskClick');
                    }
                    wrap = opts._wrap.get(0);
                    if( (match = $(e.target).closest('.ui-dialog-close', wrap)) && match.length ){
                        me.close();
                    } else if( (match = $(e.target).closest('.ui-dialog-btns .ui-btn', wrap)) && match.length ) {
                        fn = opts.buttons[match.attr('data-key')];
                        fn && fn.apply(me, arguments);
                    }
            }
        },

        _calculate: function(){
            var me = this, opts = me._options, size, $win, root = document.body,
                ret = {}, isBody = opts._cIsBody, round = Math.round;

            opts.mask && (ret.mask = isBody ? {
                width:  '100%',
                height: Math.max(root.scrollHeight, root.clientHeight)-1//����1�Ļ�uc���������ת��ʱ�򲻴���resize.���⣡
            }:{
                width: '100%',
                height: '100%'
            });

            size = opts._wrap.offset();
            $win = $(window);
            ret.wrap = {
                left: '50%',
                marginLeft: -round(size.width/2) +'px',
                top: isBody?round($win.height() / 2) + window.pageYOffset:'50%',
                marginTop: -round(size.height/2) +'px'
            }
            return ret;
        },

        /**
         * �������µ�����λ�ú�mask��С���縸������С�����仯ʱ�����ܵ�����λ�ò��ԣ������ⲿ����refresh��������
         * @method refresh
         * @return {self} ���ر���
         */
        refresh: function(){
            var me = this, opts = me._options, ret, action;
            if(opts._isOpen) {

                action = function(){
                    ret = me._calculate();
                    ret.mask && opts._mask.css(ret.mask);
                    opts._wrap.css(ret.wrap);
                }

                //����м����ڣ���Ҫ�����ʱ
                if( $.os.ios &&
                    document.activeElement &&
                    /input|textarea|select/i.test(document.activeElement.tagName)){

                    document.body.scrollLeft = 0;
                    setTimeout(action, 200);//do it later in 200ms.

                } else {
                    action();//do it now
                }
            }
            return me;
        },

        /**
         * �������������������λ�ã��ڲ�����ֵת��[position](widget/dialog.js#position)������
         * @method open
         * @param {String|Number} [x] X��λ��
         * @param {String|Number} [y] Y��λ��
         * @return {self} ���ر���
         */
        open: function(x, y){
            var opts = this._options;
            opts._isOpen = true;

            opts._wrap.css('display', 'block');
            opts._mask && opts._mask.css('display', 'block');

            x !== undefined && this.position ? this.position(x, y) : this.refresh();

            $(document).on('touchmove', $.proxy(this._eventHandler, this));
            return this.trigger('open');
        },

        /**
         * �رյ�����
         * @method close
         * @return {self} ���ر���
         */
        close: function(){
            var eventData, opts = this._options;

            eventData = $.Event('beforeClose');
            this.trigger(eventData);
            if(eventData.defaultPrevented)return this;

            opts._isOpen = false;
            opts._wrap.css('display', 'none');
            opts._mask && opts._mask.css('display', 'none');

            $(document).off('touchmove', this._eventHandler);
            return this.trigger('close');
        },

        /**
         * ���û��߻�ȡ��������⡣value���ܴ�html��ǩ�ַ���
         * @method title
         * @param {String} [value] ���������
         * @return {self} ���ر���
         */
        title: function(value) {
            var opts = this._options, setter = value !== undefined;
            if(setter){
                value = (opts.title = value) ? '<h3>'+value+'</h3>' : value;
                opts._title.html(value)[value?'prependTo':'remove'](opts._wrap);
                opts._close && opts._close.prependTo(opts.title? opts._title : opts._wrap);
            }
            return setter ? this : opts.title;
        },

        /**
         * ���û��߻�ȡ���������ݡ�value���ܴ�html��ǩ�ַ�����zepto����
         * @method content
         * @param {String|Element} [val] ����������
         * @return {self} ���ر���
         */
        content: function(val) {
            var opts = this._options, setter = val!==undefined;
            setter && opts._content.empty().append(opts.content = val);
            return setter ? this: opts.content;
        },

        /**
         * @desc ���������
         * @name destroy
         */
        destroy: function(){
            var opts = this._options, _eventHander = this._eventHandler;
            $(window).off('ortchange', _eventHander);
            $(document).off('touchmove', _eventHander);
            opts._wrap.off('click', _eventHander).remove();
            opts._mask && opts._mask.off('click', _eventHander).remove();
            opts._close && opts._close.highlight();
            return this.$super('destroy');
        }

        /**
         * @event ready
         * @param {Event} e gmu.Event����
         * @description �������ʼ����󴥷���
         */

        /**
         * @event open
         * @param {Event} e gmu.Event����
         * @description �������򵯳��󴥷�
         */

        /**
         * @event beforeClose
         * @param {Event} e gmu.Event����
         * @description �ڵ�����ر�֮ǰ����������ͨ��e.preventDefault()����ֹ
         */

        /**
         * @event close
         * @param {Event} e gmu.Event����
         * @description �ڵ�����ر�֮�󴥷�
         */

        /**
         * @event destroy
         * @param {Event} e gmu.Event����
         * @description ��������ٵ�ʱ�򴥷�
         */
    });
})( gmu, gmu.$ );
