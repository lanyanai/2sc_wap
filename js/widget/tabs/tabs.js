/**
 * @file ѡ����
 * @import extend/touch.js, core/widget.js, extend/highlight.js, extend/event.ortchange.js
 * @importCSS transitions.css, loading.css
 * @module GMU
 */

(function( gmu, $, undefined ) {
    var _uid = 1,
        uid = function(){
            return _uid++;
        },
        idRE = /^#(.+)$/;

    /**
     * ѡ����
     *
     * @class Tabs
     * @constructor Html����
     * ```html
     * <div id="tabs">
     *      <ul>
     *         <li><a href="#conten1">Tab1</a></li>
     *         <li><a href="#conten2">Tab2</a></li>
     *         <li><a href="#conten3">Tab3</a></li>
     *     </ul>
     *     <div id="conten1">content1</div>
     *     <div id="conten2"><input type="checkbox" id="input1" /><label for="input1">ѡ���Һ�tabs�����л�</label></div>
     *     <div id="conten3">content3</div>
     * </div>
     * ```
     *
     * javascript����
     * ```javascript
     * $('#tabs').tabs();
     * ```
     * @param {dom | zepto | selector} [el] ������ʼ��Tab��Ԫ��
     * @param {Object} [options] �����������������鿴[Options](#GMU:Tabs:options)
     * @grammar $( el ).tabs( options ) => zepto
     * @grammar new gmu.Tabs( el, options ) => instance
     */
    gmu.define( 'Tabs', {
        options: {

            /**
             * @property {Number} [active=0] ��ʼʱ�ĸ�Ϊѡ��״̬�����ʱsetupģʽ�������2��li�ϼ���ui-state-active��ʽʱ��activeֵΪ1
             * @namespace options
             */
            active: 0,

            /**
             * @property {Array} [items=null] ��renderģʽ����Ҫ�������� ��ʽΪ\[{title:\'\', content:\'\', href:\'\'}\], href���Բ��裬������������ajax����
             * @namespace options
             */
            items:null,

            /**
             * @property {String} [transition='slide'] �����л�������Ŀǰֻ֧��slide���������޶���
             * @namespace options
             */
            transition: 'slide'
        },

        template: {
            nav:'<ul class="ui-tabs-nav">'+
                '<% var item; for(var i=0, length=items.length; i<length; i++) { item=items[i]; %>'+
                    '<li<% if(i==active){ %> class="ui-state-active"<% } %>><a href="javascript:;"><%=item.title%></a></li>'+
                '<% } %></ul>',
            content:'<div class="ui-viewport ui-tabs-content">' +
                '<% var item; for(var i=0, length=items.length; i<length; i++) { item=items[i]; %>'+
                    '<div<% if(item.id){ %> id="<%=item.id%>"<% } %> class="ui-tabs-panel <%=transition%><% if(i==active){ %> ui-state-active<% } %>"><%=item.content%></div>'+
                '<% } %></div>'
        },

        _init:function () {
            var me = this, _opts = me._options, $el, eventHandler = $.proxy(me._eventHandler, me);

            me.on( 'ready', function(){
                $el = me.$el;
                $el.addClass('ui-tabs');
                _opts._nav.on('click', eventHandler).children().highlight('ui-state-hover');
            } );

            $(window).on('ortchange', eventHandler);
        },

        _create:function () {
            var me = this, _opts = me._options;

            if( me._options.setup && me.$el.children().length > 0 ) {
                me._prepareDom('setup', _opts);
            } else {
                _opts.setup = false;
                me.$el = me.$el || $('<div></div>');
                me._prepareDom('create', _opts);
            }
        },

        _prepareDom:function (mode, _opts) {
            var me = this, content, $el = me.$el, items, nav, contents, id;
            switch (mode) {
                case 'setup':
                    _opts._nav =  me._findElement('ul').first();
                    if(_opts._nav) {
                        _opts._content = me._findElement('div.ui-tabs-content');
                        _opts._content = ((_opts._content && _opts._content.first()) || $('<div></div>').appendTo($el)).addClass('ui-viewport ui-tabs-content');
                        items = [];
                        _opts._nav.addClass('ui-tabs-nav').children().each(function(){
                            var $a = me._findElement('a', this), href = $a?$a.attr('href'):$(this).attr('data-url'), id, $content;
                            id = idRE.test(href)? RegExp.$1: 'tabs_'+uid();
                            ($content = me._findElement('#'+id) || $('<div id="'+id+'"></div>'))
                                .addClass('ui-tabs-panel'+(_opts.transition?' '+_opts.transition:''))
                                .appendTo(_opts._content);
                            items.push({
                                id: id,
                                href: href,
                                title: $a?$a.attr('href', 'javascript:;').text():$(this).text(),//���href��ɾ���Ļ�����ַ������֣�Ȼ��һ������ʧ��
                                content: $content
                            });
                        });
                        _opts.items = items;
                        _opts.active = Math.max(0, Math.min(items.length-1, _opts.active || $('.ui-state-active', _opts._nav).index()||0));
                        me._getPanel().add(_opts._nav.children().eq(_opts.active)).addClass('ui-state-active');
                        break;
                    } //if cannot find the ul, switch this to create mode. Doing this by remove the break centence.
                default:
                    items = _opts.items = _opts.items || [];
                    nav = [];
                    contents = [];
                    _opts.active = Math.max(0, Math.min(items.length-1, _opts.active));
                    $.each(items, function(key, val){
                        id = 'tabs_'+uid();
                        nav.push({
                            href: val.href || '#'+id,
                            title: val.title
                        });
                        contents.push({
                            content: val.content || '',
                            id: id
                        });
                        items[key].id = id;
                    });
                    _opts._nav = $( this.tpl2html( 'nav', {items: nav, active: _opts.active} ) ).prependTo($el);
                    _opts._content = $( this.tpl2html( 'content', {items: contents, active: _opts.active, transition: _opts.transition} ) ).appendTo($el);
                    _opts.container = _opts.container || ($el.parent().length ? null : 'body');
            }
            _opts.container && $el.appendTo(_opts.container);
            me._fitToContent(me._getPanel());
        },

        _getPanel: function(index){
            var _opts = this._options;
            return $('#' + _opts.items[index === undefined ? _opts.active : index].id);
        },

        _findElement:function (selector, el) {
            var ret = $(el || this.$el).find(selector);
            return ret.length ? ret : null;
        },

        _eventHandler:function (e) {
            var match, _opts = this._options;
            switch(e.type) {
                case 'ortchange':
                    this.refresh();
                    break;
                default:
                    if((match = $(e.target).closest('li', _opts._nav.get(0))) && match.length) {
                        e.preventDefault();
                        this.switchTo(match.index());
                    }
            }
        },

        _fitToContent: function(div) {
            var _opts = this._options, $content = _opts._content;
            _opts._plus === undefined && (_opts._plus = parseFloat($content.css('border-top-width'))+parseFloat($content.css('border-bottom-width')))
            $content.height( div.height() + _opts._plus);
            return this;
        },

        /**
         * �л���ĳ��Tab
         * @method switchTo
         * @param {Number} index Tab���
         * @chainable
         * @return {self} ���ر���
         */
        switchTo: function(index) {
            var me = this, _opts = me._options, items = _opts.items, eventData, to, from, reverse, endEvent;
            if(!_opts._buzy && _opts.active != (index = Math.max(0, Math.min(items.length-1, index)))) {
                to = $.extend({}, items[index]);//copy it.
                to.div = me._getPanel(index);
                to.index = index;

                from = $.extend({}, items[_opts.active]);//copy it.
                from.div = me._getPanel();
                from.index = _opts.active;

                eventData = gmu.Event('beforeActivate');
                me.trigger(eventData, to, from);
                if(eventData.isDefaultPrevented()) return me;

                _opts._content.children().removeClass('ui-state-active');
                to.div.addClass('ui-state-active');
                _opts._nav.children().removeClass('ui-state-active').eq(to.index).addClass('ui-state-active');
                if(_opts.transition) { //use transition
                    _opts._buzy = true;
                    endEvent = $.fx.animationEnd + '.tabs';
                    reverse = index>_opts.active?'':' reverse';
                    _opts._content.addClass('ui-viewport-transitioning');
                    from.div.addClass('out'+reverse);
                    to.div.addClass('in'+reverse).on(endEvent, function(e){
                        if (e.target != e.currentTarget) return //�����ð�������ģ��򲻲���
                        to.div.off(endEvent, arguments.callee);//�����
                        _opts._buzy = false;
                        from.div.removeClass('out reverse');
                        to.div.removeClass('in reverse');
                        _opts._content.removeClass('ui-viewport-transitioning');
                        me.trigger('animateComplete', to, from);
                        me._fitToContent(to.div);
                    });
                }
                _opts.active = index;
                me.trigger('activate', to, from);
                _opts.transition ||  me._fitToContent(to.div);
            }
            return me;
        },

        /**
         * ���ⲿ�޸�tabs���ݺã���Ҫ����refresh��tabs�Զ����¸߶�
         * @method refresh
         * @chainable
         * @return {self} ���ر���
         */
        refresh: function(){
            return this._fitToContent(this._getPanel());
        },

        /**
         * �������
         * @method destroy
         */
        destroy:function () {
            var _opts = this._options, eventHandler = this._eventHandler;
            _opts._nav.off('tap', eventHandler).children().highlight();
            _opts.swipe && _opts._content.off('swipeLeft swipeRight', eventHandler);

            if( !_opts.setup ) {
                this.$el.remove();
            }
            return this.$super('destroy');
        }

        /**
         * @event ready
         * @param {Event} e gmu.Event����
         * @description �������ʼ����󴥷���
         */

        /**
         * @event beforeActivate
         * @param {Event} e gmu.Event����
         * @param {Object} to �����������ԣ�div(����div), index(λ��), title(����), content(����), href(����)
         * @param {Object} from �����������ԣ�div(����div), index(λ��), title(����), content(����), href(����)
         * @description �����л�֮ǰ����������ͨ��e.preventDefault()����ֹ
         */

        /**
         * @event activate
         * @param {Event} e gmu.Event����
         * @param {Object} to �����������ԣ�div(����div), index(λ��), title(����), content(����), href(����)
         * @param {Object} from �����������ԣ�div(����div), index(λ��), title(����), content(����), href(����)
         * @description �����л�֮�󴥷�
         */

        /**
         * @event animateComplete
         * @param {Event} e gmu.Event����
         * @param {Object} to �����������ԣ�div(����div), index(λ��), title(����), content(����), href(����)
         * @param {Object} from �����������ԣ�div(����div), index(λ��), title(����), content(����), href(����)
         * @description ������ɺ�ִ�У����û�����ö�������ʱ�䲻�ᴥ��
         */

        /**
         * @event destroy
         * @param {Event} e gmu.Event����
         * @description ��������ٵ�ʱ�򴥷�
         */
    });
})( gmu, gmu.$ );