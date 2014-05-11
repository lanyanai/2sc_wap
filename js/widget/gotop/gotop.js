/**
 * @file ���ض������
 * @import core/widget.js, extend/fix.js, extend/throttle.js, extend/event.scrollStop.js, extend/event.ortchange.js
 * @module GMU
 */
(function( gmu, $, undefined ) {

    /**
     * ���ض������
     *
     * @class Gotop
     * @constructor Html����
     * ```html
     * <div id="gotop"></div>
     * ```
     *
     * javascript����
     * ```javascript
     * $('#gotop').gotop();
     * ```
     * @param {dom | zepto | selector} [el] ������ʼ�������Ԫ��
     * @param {Object} [options] �����������������鿴[Options](#GMU:Gotop:options)
     * @grammar $( el ).gotop( options ) => zepto
     * @grammar new gmu.Gotop( el, options ) => instance
     */
    gmu.define( 'Gotop', {
        options: {
            /**
             * @property {selector} [container=document.body] �������
             * @namespace options
             */
            container:          '',
            /**
             * @property {Boolean} [useFix=true] �Ƿ�ʹ�ù̶�Ч��
             * @namespace options
             */
            useFix:             true,
            /**
             * @property {Boolean} [useHide=true] �Ƿ���touchmove��ʱ������gotopͼ��
             * @namespace options
             */
            useHide:            true,
            /**
             * @property {Boolean} [useAnimation=false] ���ض���ʱ�Ƿ�ʹ�ö���,��ʹ��iScrollʱ,���ض����Ķ�����iScrollʵ��ִ��,�˲�����Ч
             * @namespace options
             */
            useAnimation:       false,
            /**
             * @property {Object} [position={bottom:10,right:10}] ʹ��fixЧ��ʱ��Ҫ�õ�λ�ò���
             * @namespace options
             */
            position:           {bottom: 10, right: 10},
            /**
             * @property {Function} [afterScroll=null] ���ض�����ִ�еĻص�����
             * @namespace options
             */
        	afterScroll:        null
        },

        _init: function() {
            var me = this,
                $el,
                _opts = me._options,
                _eventHandler;

            if($.os.version && $.os.version.substr(0, 3) >= 7.0) {
                _opts.position.bottom = 40;
            }

            me.on( 'ready', function(){
                $el = me.$el;
                _eventHandler = $.proxy(me._eventHandler, me);

                _opts['useHide'] && $(document).on('touchmove', _eventHandler);
                $(window).on('touchend touchcancel scrollStop', _eventHandler);
                $(window).on('scroll ortchange', _eventHandler);
                $el.on('click', _eventHandler);
                me.on('destroy', function() {
                    $(window).off('touchend touchcancel scrollStop', _eventHandler);
                    $(document).off('touchmove', _eventHandler);
                    $(window).off('scroll ortchange', _eventHandler);
                });
                _opts['useFix'] && $el.fix(_opts['position']);
                _opts['root'] = $el[0];
            } );

            // ����������ģʽ�����ģ�destroyʱ����Ԫ���Ƴ�
            me.on( 'destroy', function() {
                me.$el.remove();
            } );
        },

        _create: function() {
            var me = this;

            if( !me.$el ) {
                me.$el = $('<div></div>');
            }
            me.$el.addClass('ui-gotop').append('<div></div>').appendTo(me._options['container'] || (me.$el.parent().length ? '' : document.body));

            return me;
        },

        /**
         * �¼���������
         */
        _eventHandler: function(e) {
            var me = this;

            switch (e.type) {
                case 'touchmove':
                    me.hide();
                    break;
                case 'scroll':
                    clearTimeout(me._options['_TID']);
                    break;
                case 'touchend':
                case 'touchcancel':
                    clearTimeout(me._options['_TID']);
                    me._options['_TID'] = setTimeout(function(){
                        me._check.call(me);
                    }, 300);
                    break;
                case 'scrollStop':
                    me._check();
                    break;
                case 'ortchange':
                    me._check.call(me);
                    break;
                case 'click':
                    me._scrollTo();
                    break;
            }
        },

        /**
         * �ж��Ƿ���ʾgotop
         */
        _check: function(position) {
            var me = this;

            (position !== undefined ? position : window.pageYOffset) > document.documentElement.clientHeight ? me.show() : me.hide();
            
            return  me;
        },

		/**
         * ������������ָ���ڵ�λ��
         */
		_scrollTo: function() {
            var me = this,
                from = window.pageYOffset;

            me.hide();
            clearTimeout(me._options['_TID']);
            if (!me._options['useAnimation']) {
                window.scrollTo(0, 1);
                me.trigger('afterScroll');
            } else {
                me._options['moveToTop'] = setInterval(function() {
                    if (from > 1) {
                        window.scrollBy(0, -Math.min(150,from - 1));
                        from -= 150;
                    } else {
                        clearInterval(me._options['moveToTop']);
                        me.trigger('afterScroll');
                    }
                }, 25, true);
            }
            return me;
		},

        /**
         * ��ʾgotop
         * @method show
         * @return {self} ���ر���
         */
        show: function() {
            this._options.root.style.display = 'block';

            return this;
        },

        /**
         * ����gotop
         * @method hide
         * @chainable
         * @return {self} ���ر���
         */
        hide: function() {
            this._options.root.style.display = 'none';
            
            return this;
        }

        /**
         * @event ready
         * @param {Event} e gmu.Event����
         * @description �������ʼ����󴥷�
         */

        /**
         * @event afterScroll
         * @param {Event} e gmu.Event����
         * @description ���ض����󴥷����¼�
         */
        
        /**
         * @event destroy
         * @param {Event} e gmu.Event����
         * @description ��������ٵ�ʱ�򴥷�
         */
    });
})( gmu, gmu.$ );
