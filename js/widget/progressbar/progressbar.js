/**
 * @file ���������
 * @import extend/touch.js, core/widget.js
 * @module GMU
 */
(function( gmu, $, undefined ) {
    
    /**
     * ���������
     *
     * @class Progressbar
     * @constructor Html����
     * ```html
     * <div id="progressbar"></div>
     * ```
     *
     * javascript����
     * ```javascript
     * $('#progressbar').progressbar();
     * ```
     * @param {dom | zepto | selector} [el] ������ʼ����������Ԫ��
     * @param {Object} [options] �����������������鿴[Options](#GMU:Progressbar:options)
     * @grammar $( el ).progressbar( options ) => zepto
     * @grammar new gmu.Progressbar( el, options ) => instance
     */
    gmu.define('Progressbar', {

        options: {

            /**
             * @property {Nubmer} [initValue=0] ��ʼʱ���ȵİٷֱȣ���Ҫ�ٷֺ�
             * @namespace options
             */
            initValue:          0,

            /**
             * @property {Boolean} [horizontal=true] ����Ƿ�Ϊ����(����Ϊfalse,��Ϊ����)
             * @namespace options
             */
            horizontal:         true,

            /**
             * @property {Number} [transitionDuration=300] ��ť����ʱ����Ч��������ʱ��,��λΪms,��Ϊ0���޶���
             * @namespace options
             */
            transitionDuration: 300,
            _isShow:            true,
            _current:           0,
            _percent:           0
        },

        _init: function() {
            var me = this,
                $el,
                _eventHandler,
                _button,
                _background,
                _offset;

            me.on( 'ready', function(){
                $el = me.$el,
                _eventHandler = $.proxy(me._eventHandler, me),
                _button = $el.find('.ui-progressbar-button'),
                _background = $el.find('.ui-progressbar-bg'),
                _offset = $el.offset();

                _button.on('touchstart touchmove touchend touchcancel', _eventHandler);
                _background.on('touchstart', _eventHandler);
                $.extend( me._options, {
                    _button:        _button[0],
                    $_background:    _background,
                    _filled:        $el.find('.ui-progressbar-filled')[0],
                    _width:         _offset.width,
                    _height:        _offset.height
                });
                me._options['horizontal'] && _offset.width && $el.width(_offset.width);
                me._options['initValue'] > 0 && me.value( me._options['initValue']);
            } );

            me.on( 'destroy', function() {
                if ( !me._options.setup ) {
                    me.$el.remove();
                }
            } );
        },

        _create: function() {
            var me = this,
                direction = me._options['horizontal'] ? 'h' : 'v';

            if ( !me.$el ) {
                me.$el = $('<div></div>');
            }
            me.$el.addClass('ui-progressbar-' + direction).appendTo(me._options['container'] || (me.$el.parent().length ? '' : document.body)).html(
                ('<div class="ui-progressbar-bg"><div class="ui-progressbar-filled"></div><div class="ui-progressbar-button"><div><b></b></div></div></div>'));
        },

        _eventHandler: function(e) {
            var me = this;

            switch (e.type) {
                case 'touchmove':
                    me._touchMove(e);
                    break;
                case 'touchstart':
                    $(e.target).hasClass('ui-progressbar-bg') ? me._click(e) : me._touchStart(e);
                    break;
                case 'touchcancel':
                case 'touchend':
                    me._touchEnd();
                    break;
                case 'tap':
                    me._click(e);
                    break;
            }
        },

        _touchStart: function(e) {
            var me = this,
                opts = me._options;

            $.extend( me._options, {
                pageX:      e.touches[0].pageX,
                pageY:      e.touches[0].pageY,
                S:          false,      //isScrolling
                T:          false,      //isTested
                X:          0,          //horizontal moved
                Y:          0           //vertical moved
            });

            opts._button.style.webkitTransitionDuration = '0ms';
            opts._filled.style.webkitTransitionDuration = '0ms';
            $(opts._button).addClass('ui-progressbar-button-pressed');
            me.trigger('dragStart');
        },

        _touchMove: function(e) {
            var me = this,
                opts = me._options,
                touch = e.touches[0],
                X = touch.pageX - opts.pageX,
                Y = touch.pageY - opts.pageY,
                _percent;

            if(!opts.T) {
                var S = Math.abs(X) < Math.abs(touch.pageY - opts.pageY);
                opts.T = true;
                opts.S = S;
            }
            if(opts.horizontal) {
                if(!opts.S) {
                    e.stopPropagation();
                    e.preventDefault();
                    _percent =  (X + opts._current) / opts._width * 100;
                    if(_percent <= 100 && _percent >= 0) {
                        opts._percent = _percent;
                        opts.X = X;
                        opts._button.style.webkitTransform = 'translate3d(' + (opts.X + opts._current) + 'px,0,0)';
                        opts._filled.style.width = _percent + '%';
                        me.trigger('valueChange');
                    }
                    me.trigger('dragMove');
                }
            } else {
                if(opts.S) {
                    e.stopPropagation();
                    e.preventDefault();
                    _percent = -(opts._current + Y) / opts._height * 100;
                    if(_percent <= 100 && _percent >= 0) {
                        opts._percent = _percent;
                        opts.Y = Y;
                        opts._button.style.webkitTransform = 'translate3d(0,' + (Y + opts._current) + 'px,0)';
                        opts._filled.style.cssText += 'height:' + _percent + '%;top:' + (opts._height + Y + opts._current) + 'px';
                        me.trigger('valueChange');
                    }
                    me.trigger('dragMove');
                }
            }
        },

        _touchEnd: function() {
            var me = this,
                opts = me._options;

            opts._current += opts.horizontal ? opts.X : opts.Y;
            $(opts._button).removeClass('ui-progressbar-button-pressed');
            me.trigger('dragEnd');
        },

        _click: function(e) {
            var me = this,
                opts = me._options,
                rect = opts.$_background.offset(),
                touch = e.touches[0];

            opts.horizontal ?
                me.value((touch.pageX - rect.left) / opts._width * 100) :
                me.value((opts._height - touch.pageY + rect.top) / opts._height * 100);
        },

        /**
         * ��ȡ/����progressbar��ֵ
         * @method value
         * @param {Number} [opts] Ҫ���õ�ֵ��������ʾȡֵ
         * @chainable
         * @return {self} ���ر���
         */
        value: function(value) {
            var me = this,
                opts = me._options,
                _current, duration;

            if(value === undefined) {
                return opts._percent;
            } else {
                value = parseFloat(value);
                if(isNaN(value)) return me;
                value = value > 100 ? 100 : value < 0 ? 0 : value;
                opts._percent = value;
                duration = ';-webkit-transition-duration:' + opts.transitionDuration + 'ms';
                if(opts.horizontal) {
                    _current = opts._current = opts._width * value / 100;
                    opts._button.style.cssText += '-webkit-transform:translate3d(' + _current + 'px,0,0)' + duration;
                    opts._filled.style.cssText += 'width:'+ value + '%' + duration;
                } else {
                    _current = opts._current = opts._height * value / -100;
                    opts._button.style.cssText += '-webkit-transform:translate3d(0,' + _current + 'px,0)' + duration;
                    opts._filled.style.cssText += 'height:' + value + '%;top:' + (opts._height + _current) + 'px' + duration;
                }
                me.trigger('valueChange');
                return me;
            }
        },

        /**
         * ��ʾprogressbar
         * @method show
         * @chainable
         * @return {self} ���ر���
         */
        show: function() {
            var me = this;

            if(!me._options['_isShow']){
                me.$el.css('display', 'block');
                me._options['_isShow'] = true;
            }

            return me;
        },

        /**
         * ����progressbar
         * @method hide
         * @chainable
         * @return {self} ���ر���
         */
        hide: function() {
            var me = this;

            if(me._options['_isShow']) {
                me.$el.css('display', 'none');
                me._options['_isShow'] = false;
            }

            return me;
        }

        /**
         * @event ready
         * @param {Event} e gmu.Event����
         * @description �������ʼ����󴥷���
         */
        
        /**
         * @event dragStart
         * @param {Event} e gmu.Event����
         * @description �϶���������ʼʱ�������¼�
         */
        
        /**
         * @event dragMove
         * @param {Event} e gmu.Event����
         * @description �϶������������д������¼�
         */
        
        /**
         * @event dragEnd
         * @param {Event} e gmu.Event����
         * @description �϶�����������ʱ�������¼�
         */
        
        /**
         * @event valueChange
         * @param {Event} e gmu.Event����
         * @description progressbar��ֵ�б仯ʱ�������϶�progressbarʱ��ֵ��һ����仯��
         */
        
        /**
         * @event destroy
         * @param {Event} e gmu.Event����
         * @description ��������ٵ�ʱ�򴥷�
         */
    });
})( gmu, gmu.$ );
