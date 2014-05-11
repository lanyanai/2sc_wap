/**
 * @file Calendar Picker���
 * @desc Ĭ�ϵ�Calendar�����ֻ����ָ�������������������ܣ����Ԫ�صĽ��������ڴ˲��������.
 * selector���ᱻ��Ϊ�ǿɸ�ֵ���󣬵�ȷ�ϰ�ť�������ѡ�����ڻḳֵ��selector��
 * @module GMU
 * @import widget/calendar/calendar.js, extend/event.ortchange.js
 */
(function( gmu, $ ) {
    function SlideUp(div, cb) {
        var
            //������¼div��ԭʼλ�õ�
            holder = $('<span class="ui-holder"></span>'),

            //dom
            root = $('<div class="ui-slideup-wrap">' +
                '   <div class="ui-slideup">' +
                '       <div class="header">' +
                '           <span class="ok-btn">ȷ��</span>' +
                '           <span class="no-btn">ȡ��</span>' +
                '       </div>' +
                '       <div class="frame"></div>' +
                '   </div>' +
                '</div>'),
            sDiv = $('.ui-slideup', root),
            frame = $('.frame', sDiv),

            //����ֻ����refresh��close����
            obj = {

                /**
                 * ˢ��������ʾ������Ļ��ת��ʱ��ʱ����Ҫ�ⲿ����
                 */
                refresh: function( callback ){
                    root.css({
                        top: window.pageYOffset + 'px',
                        height: window.innerHeight + 'px'
                    });

                    sDiv.animate({
                        translateY: '-' + sDiv.height() + 'px',
                        translateZ: '0'
                    }, 400, 'ease-out', function () {
                        callback && callback.call(obj);
                    });

                },

                /**
                 * �ر�����
                 */
                close: function( callback ){
                    var count = SlideUp.count = SlideUp.count - 1;

                    root.off('click.slideup' + id);

                    sDiv
                        .animate({
                            translateY: '0',
                            translateZ: '0'
                        }, 200, 'ease-out', function () {
                            callback && callback();

                            //��ԭdiv��λ��
                            holder.replaceWith(div);

                            //����
                            root.remove();
                            count === 0 && $(document).off('touchmove.slideup');
                        })
                        .find('.ok-btn, .no-btn')
                        .highlight();

                    return obj;
                }
            },

            //Ϊ�˽���¼��õ�
            id = SlideUp.id = ( SlideUp.id >>> 0 ) + 1,

            //��¼��ǰ�����˶��ٴ�
            count;

        frame.append( div.replaceWith( holder ) );

        count = SlideUp.count = ( SlideUp.count >>> 0 ) + 1;

        //�������ʱ��ֻ��ע��һ��
        count === 1 && $(document).on('touchmove.slideup', function (e) {

            //����ϵͳ����
            e.preventDefault();
        });

        root
            .on('click.slideup' + id, '.ok-btn, .no-btn', function () {
                cb.call(obj, $(this).is('.ok-btn')) !== false && obj.close();
            })
            .appendTo(document.body)
            .find('.ok-btn, .no-btn')
            .highlight('ui-state-hover');

        obj.refresh();

        return obj;
    }

    /**
     * Calendar Picker���
     *
     * Ĭ�ϵ�Calendar�����ֻ����ָ�������������������ܣ����Ԫ�صĽ��������ڴ˲��������.
     * selector���ᱻ��Ϊ�ǿɸ�ֵ���󣬵�ȷ�ϰ�ť�������ѡ�����ڻḳֵ��selector��
     *
     * @class picker
     * @namespace Calendar
     * @pluginfor Calendar
     */
    gmu.Calendar.register( 'picker', {

        _create: function () {
            var el = this.$el;

            if( !el ) {
                throw new Error("��ָ������ѡ�����ĸ�ֵ����");
            }
        },

        _init: function(){
            var el = this.$el,
                opts = this._options;

            this._container = $('<div></div>');

            //����г�ʼֵ����Ѵ�ֵ��ֵ��calendar
            opts.date || (opts.date = el[el.is('select, input')?'val':'text']());

            $(window).on('ortchange', $.proxy(this._eventHandler, this));
            this.on('commit', function(e, date){
                var str = $.calendar.formatDate(date);

                el[el.is('select, input')?'val':'text'](str);
            });

            this.on('destroy', function(){
                //���ortchange�¼�
                $(window).off('ortchange', this._eventHandler);
                this._frame && this._frame.close();
            });
        },

        _eventHandler: function(e){
            if(e.type === 'ortchange') {
                this._frame && this._frame.refresh();
            }else {
                this.origin( e );
            }
        },

        /**
         * ��ʾ���
         * @method show
         * @grammar show() => instance
         * @param {Function} [callback] ˢ��֮��Ļص�����
         * @for Calendar
         * @uses Calendar.picker
         */
        show: function(){
            var me = this,
                el;

            if( this._visible ) {
                return this;
            }

            el = this._container;

            this._visible = true;
            this.refresh();
            this._frame = SlideUp(el, function( confirm ){
                var date;
                if( confirm) {
                    date = me._option('selectedDate');
                    me.trigger('commit', date, $.calendar.formatDate(date), me);
                    me._option('date', date);
                } else {
                    me._option('selectedDate', me._option('date'));
                }
                me.hide();
                return false;
            });
            return this.trigger('show', this);
        },

        /**
         * �������
         * @method hide
         * @grammar hide() => instance
         * @param {Function} [callback] ˢ��֮��Ļص�����
         * @for Calendar
         * @uses Calendar.picker
         */
        hide: function(){
            var me = this,
                event;

            if (!this._visible) {
                return this;
            }

            event = new gmu.Event('beforehide');
            this.trigger(event, this);

            //����ⲿ��ֹ�˴��¼�����ֹͣ����ִ��
            if(event.isDefaultPrevented()){
                return this;
            }

            this._visible = false;

            this._frame.close(function(){
                me.trigger && me.trigger('hide');
            });

            this._frame = null;

            return this;
        }

        /**
         * @event show
         * @param {Event} e gmu.Event����
         * @param {Calendar} ui widgetʵ��
         * @description �������ʾ�󴥷�
         * @for Calendar
         * @uses Calendar.picker
         */

        /**
         * @event hide
         * @param {Event} e gmu.Event����
         * @param {Calendar} ui widgetʵ��
         * @description ��������غ󴥷�
         * @for Calendar
         * @uses Calendar.picker
         */

        /**
         * @event beforehide
         * @param {Event} e gmu.Event����
         * @param {Calendar} ui widgetʵ��
         * @description �������֮ǰ����������ͨ��e.preventDefault()����ֹ
         * @for Calendar
         * @uses Calendar.picker
         */

        /**
         * @event commit
         * @param {Event} e gmu.Event����
         * @param {Date} date ѡ�е�����
         * @param {String} dateStr ѡ�е������ַ���ʽ
         * @param {Calendar} ui widgetʵ��
         * @description ��ȷ��ѡ��ĳ�����ڵ�ʱ�򴥷�
         * @for Calendar
         * @uses Calendar.picker
         */
    } );

})( gmu, gmu.$ );
