/**
 * @file panel���
 * @import extend/touch.js, core/widget.js, extend/throttle.js, extend/event.scrollStop.js, extend/event.ortchange.js
 * @module GMU
 */
(function( gmu, $, undefined ) {

    var cssPrefix = $.fx.cssPrefix,
        transitionEnd = $.fx.transitionEnd;
    /**
     * panel���
     *
     * @class Panel
     * @constructor Html����
     * ```html
     * <div id="page">
     *     <div class="cont">panel����</div>
     * </div>
     * ```
     *
     * javascript����
     * ```javascript
     * $('.panel').panel({
     *     contentWrap: $('.cont')
     * });
     * ```
     * @param {dom | zepto | selector} [el] ������ʼ��Panel��Ԫ��
     * @param {Object} [options] �����������������鿴[Options](#GMU:Panel:options)
     * @grammar $( el ).panel( options ) => zepto
     * @grammar new gmu.Panel( el, options ) => instance
     */
    
    gmu.define( 'Panel', {
        options: {

            /**
             * @property {Dom | Zepto | selector} [contentWrap=''] ��������dom������������Ĭ��Ϊpanel��next�ڵ�
             * @namespace options
             */
            contentWrap: '',

            /**
             * @property {String} [scrollMode='follow'] Panel������ʽ��follow��ʾ����ҳ�滬����hide��ʾҳ�滬��ʱpanel��ʧ, fix��ʾpanel�̶���ҳ����
             * @namespace options
             */
            scrollMode: 'follow',

            /**
             * @property {String} [display='push'] ��ѡֵ��('overlay' | 'reveal' | 'push') Panel����ģʽ��overlay��ʾ����reveal��ʾ��content�±�չʾ��push��ʾpanel��content�Ƴ�
             * @namespace options
             */
            display: 'push',

            /**
             * @property {String} [position='right'] ��ѡֵ��('left' | 'right'�� ���ұ߻����
             * @namespace options
             */
            position: 'right',

            /**
             * @property {Boolean} [dismissible=true] (renderģʽ�±���)�Ƿ���������������panel��ʧ
             * @namespace options
             */
            dismissible: true,

            /**
             * @property {Boolean} [swipeClose=true] ��panel�ϻ�����panel�Ƿ�ر�
             * @namespace options
             */
            swipeClose: true
        },

        _init: function () {
            var me = this,
                opts = me._options;

            me.on( 'ready', function(){
                me.displayFn = me._setDisplay();
                me.$contentWrap.addClass('ui-panel-animate');
                me.$el.on(transitionEnd, $.proxy(me._eventHandler, me)).hide();  //��ʼ״̬����panel
                opts.dismissible && me.$panelMask.hide().on('click', $.proxy(me._eventHandler, me));    //��mask�ϵĹر��¼�
                opts.scrollMode !== 'follow' && $(window).on('scrollStop', $.proxy(me._eventHandler, me));
                $(window).on('ortchange', $.proxy(me._eventHandler, me));
            } );
        },

        _create: function () {
            if(this._options.setup){
                var me = this,
                    opts = me._options,
                    $el = me.$el.addClass('ui-panel ui-panel-'+ opts.position);

                me.panelWidth = $el.width() || 0;
                me.$contentWrap = $(opts.contentWrap || $el.next());
                opts.dismissible && ( me.$panelMask = $('<div class="ui-panel-dismiss"></div>').width(document.body.clientWidth - $el.width()).appendTo('body') || null);
            }else{
                throw new Error('panel�����֧��createģʽ����ʹ��setupģʽ');
            }
        },
        
        /**
         * ����displayģʽ����
         * */
        _setDisplay: function () {
            var me = this,
                $panel = me.$el,
                $contentWrap = me.$contentWrap,
                transform = cssPrefix + 'transform',
                posData = me._transDisplayToPos(),
                obj = {}, panelPos, contPos;

            $.each(['push', 'overlay', 'reveal'], function (i,display) {
                obj[display] = function (isOpen, pos, isClear) {   //isOpen:�Ǵ򿪻��ǹرղ�����pos:���һ����򿪹رգ�isClear:�Ƿ��ǳ�ʼ������
                    panelPos = posData[display].panel, contPos = posData[display].cont;
                    $panel.css(transform, 'translate3d(' + me._transDirectionToPos(pos, panelPos[isOpen]) + 'px,0,0)');
                    if (!isClear) {
                        $contentWrap.css(transform, 'translate3d(' + me._transDirectionToPos(pos, contPos[isOpen]) + 'px,0,0)');
                        me.maskTimer = setTimeout(function () {      //��ֹ���ע��tap��͸���������ӳ�
                            me.$panelMask && me.$panelMask.css(pos, $panel.width()).toggle(isOpen);
                        }, 400);    //�ı�mask left/rightֵ
                    }
                    return me;
                }
            });
            return obj;
        },
        /**
         * ��ʼ��panelλ�ã�ÿ�δ�֮ǰ����λ�ÿ��ܲ�ͬ�����Ծ�������
         * */
        _initPanelPos: function (dis, pos) {
            this.displayFn[dis](0, pos, true);
            this.$el.get(0).clientLeft;    //����ҳ��reflow��ʹ��ui-panel-animate��ʽ����Ч
            return this;
        },
        /**
         * ��λ�ã�����ң�ת��Ϊ��ֵ
         * */
        _transDirectionToPos: function (pos, val) {
            return pos === 'left' ? val : -val;
        },
        /**
         * ����ģʽ��push,overlay,reveal��ת��Ϊ��ֵ
         * */
        _transDisplayToPos: function () {
            var me = this,
                panelWidth = me.panelWidth;
            return {
                push: {
                    panel: [-panelWidth, 0],    //[from, to] for panel
                    cont: [0, panelWidth]       //[from, to] for contentWrap
                },
                overlay: {
                    panel: [-panelWidth, 0],
                    cont: [0, 0]
                },
                reveal: {
                    panel: [0, 0],
                    cont: [0, panelWidth]
                }
            }
        },
        /**
         * ������ʾ��رգ��ر�ʱ�Ĳ���������ģʽ�������������ʱ��ͬ
         * */
        _setShow: function (isOpen, dis, pos) {
            var me = this,
                opts = me._options,
                eventName = isOpen ? 'open' : 'close',
                beforeEvent = $.Event('before' + eventName),
                changed = isOpen !== me.state(),
                _eventBinder = isOpen ? 'on' : 'off',
                _eventHandler = isOpen ? $.proxy(me._eventHandler, me) : me._eventHandler,
                _dis = dis || opts.display,
                _pos = pos || opts.position;

            me.trigger(beforeEvent, [dis, pos]);
            if (beforeEvent.isDefaultPrevented()) return me;
            if (changed) {
                me._dealState(isOpen, _dis, _pos);    //�رջ���ʾʱ������״̬
                me.displayFn[_dis](me.isOpen = Number(isOpen), _pos);   //����ģʽ�ʹ򿪷��򣬲���panel
                opts.swipeClose && me.$el[_eventBinder]($.camelCase('swipe-' + _pos), _eventHandler);     //����panel�ر�
                opts.display = _dis, opts.position = _pos;
            }
            return me;
        },
        /**
         * �򿪻�ر�ǰ��״̬���ò�����������ʽ��λ�õ�
         * */
        _dealState: function (isOpen, dis, pos) {
            var me = this,
                opts = me._options,
                $panel = me.$el,
                $contentWrap = me.$contentWrap,
                addCls = 'ui-panel-' + dis + ' ui-panel-' + pos,
                removeCls = 'ui-panel-' + opts.display + ' ui-panel-' + opts.position + ' ui-panel-animate';

            if (isOpen) {
                $panel.removeClass(removeCls).addClass(addCls).show();
                opts.scrollMode === 'fix' && $panel.css('top', $(window).scrollTop());    //fixģʽ��
                me._initPanelPos(dis, pos);      //panel��contentWrapλ�ó�ʼ��
                if (dis === 'reveal') {
                    $contentWrap.addClass('ui-panel-contentWrap').on(transitionEnd, $.proxy(me._eventHandler, me));    //revealģʽ��panel������transitionEnd;
                } else {
                    $contentWrap.removeClass('ui-panel-contentWrap').off(transitionEnd, $.proxy(me._eventHandler, me));
                    $panel.addClass('ui-panel-animate');
                }
                me.$panelMask && me.$panelMask.css({     //panel mask״̬��ʼ��
                    'left': 'auto',
                    'right': 'auto',
                    'height': document.body.clientHeight
                });
            }
            return me;
        },

        _eventHandler: function (e) {
            var me = this,
                opts = me._options,
                scrollMode = opts.scrollMode,
                eventName = me.state() ? 'open' : 'close';

            switch (e.type) {
                case 'click':
                case 'swipeLeft':
                case 'swipeRight':
                    me.close();
                    break;
                case 'scrollStop':
                    scrollMode === 'fix' ? me.$el.css('top', $(window).scrollTop()) : me.close();
                    break;
                case transitionEnd:
                    me.trigger(eventName, [opts.display, opts.position]);
                    break;
                case 'ortchange':   //����ת��ʱ��mask�Ĵ���
                    me.$panelMask && me.$panelMask.css('height', document.body.clientHeight);
                    scrollMode === 'fix' && me.$el.css('top', $(window).scrollTop());     //ת������topֵ
                    break;
            }
        },
        
        /**
         * ��panel
         * @method open
         * @param {String} [display] ��ѡֵ��('overlay' | 'reveal' | 'push')��Ĭ��Ϊ��ʼ��ʱ���õ�ֵ��Panel����ģʽ��overlay��ʾ����reveal��ʾ��content�±�չʾ��push��ʾpanel��content�Ƴ�
         * @param {String} position ��ѡֵ��('left' | 'right'����Ĭ��Ϊ��ʼ��ʱ���õ�ֵ�����ұ߻����
         * @chainable
         * @return {self} ���ر���
         */
        open: function (display, position) {
            return this._setShow(true, display, position);
        },
        
        /**
         * �ر�panel
         * @method close
         * @chainable
         * @return {self} ���ر���
         */
        close: function () {
            return this._setShow(false);
        },
        
        /**
         * �л�panel�Ĵ򿪻�ر�״̬
         * @method toggle
         * @param {String} [display] ��ѡֵ��('overlay' | 'reveal' | 'push')��Ĭ��Ϊ��ʼ��ʱ���õ�ֵ��Panel����ģʽ��overlay��ʾ����reveal��ʾ��content�±�չʾ��push��ʾpanel��content�Ƴ�
         * @param {String} position ��ѡֵ��('left' | 'right'����Ĭ��Ϊ��ʼ��ʱ���õ�ֵ�����ұ߻����
         * @chainable
         * @return {self} ���ر���
         */
        toggle: function (display, position) {
            return this[this.isOpen ? 'close' : 'open'](display, position);
        },
        
        /**
         * ��ȡ��ǰpanel״̬����Ϊtrue,�ر�Ϊfalse
         * @method state
         * @chainable
         * @return {self} ���ر���
         */
        state: function () {
            return !!this.isOpen;
        },
        
        /**
         * �������
         * @method destroy
         */
        destroy:function () {
            this.$panelMask && this.$panelMask.off().remove();
            this.maskTimer && clearTimeout(this.maskTimer);
            this.$contentWrap.removeClass('ui-panel-animate');
            $(window).off('scrollStop', this._eventHandler);
            $(window).off('ortchange', this._eventHandler);
            return this.$super('destroy');
        }
        
        /**
         * @event ready
         * @param {Event} e gmu.Event����
         * @description �������ʼ����󴥷���
         */
        
        /**
         * @event beforeopen
         * @param {Event} e gmu.Event����
         * @description panel��ǰ����������ͨ��e.preventDefault()����ֹ
         */
        
        /**
         * @event open
         * @param {Event} e gmu.Event����
         * @description panel�򿪺󴥷�
         */
        
        /**
         * @event beforeclose
         * @param {Event} e gmu.Event����
         * @description panel�ر�ǰ����������ͨ��e.preventDefault()����ֹ
         */
        
        /**
         * @event close
         * @param {Event} e gmu.Event����
         * @description panel�رպ󴥷�
         */
        
        /**
         * @event destroy
         * @param {Event} e gmu.Event����
         * @description ��������ٵ�ʱ�򴥷�
         */
    });

})( gmu, gmu.$ );
