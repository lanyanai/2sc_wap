/**
 * @file ajax���
 * @import widget/tabs/tabs.js
 */
(function ($, undefined) {
    var idRE = /^#.+$/,
        loaded = {},
        tpl = {
            loading: '<div class="ui-loading">Loading</div>',
            error: '<p class="ui-load-error">���ݼ���ʧ��!</p>'
        };

    /**
     * ��a����href���õ��ǵ�ַ��������id���������Ϊ���Ϊajax���͵ġ���options�ϴ���ajax�����������[ajaxѡ��](#$.ajax)
     * @class ajax
     * @namespace Tabs
     * @pluginfor Tabs
     */
    gmu.Tabs.register( 'ajax', {
        _init:function () {
            var _opts = this._options, items, i, length;

            this.on( 'ready', function(){
                items = _opts.items;
                for (i = 0, length = items.length; i < length; i++) {
                    items[i].href && !idRE.test(items[i].href) && (items[i].isAjax = true);
                }
                this.on('activate', this._onActivate);
                items[_opts.active].isAjax && this.load(_opts.active);//�����ǰ��ajax
            } );
        },

        destroy:function () {
            this.off('activate', this._onActivate);
            this.xhr && this.xhr.abort();
            return this.origin();
        },

        _fitToContent: function(div) {
            var _opts = this._options;

            if(!_opts._fitLock)return this.origin(div);
        },

        _onActivate:function (e, to) {
            to.isAjax && this.load(to.index);
        },

        /**
         * �������ݣ�ָ����tab������ajax���͡����ص����ݻỺ�����������Ҫǿ���ٴμ��أ��ڶ�����������true
         * @method load
         * @param {Number} index Tab���
         * @param {Boolean} [force=false] �Ƿ�ǿ�����¼���
         * @for Tabs
         * @uses Tabs.ajax
         * @return {self} ���ر���
         */
        load:function (index, force) {
            var me = this, _opts = me._options, items = _opts.items, item, $panel, prevXHR;

            if (index < 0 ||
                index > items.length - 1 ||
                !(item = items[index]) || //�����Χ����
                !item.isAjax || //�������ajax���͵�
                ( ( $panel = me._getPanel(index)).text() && !force && loaded[index] ) //���û�м��ع�������tab����Ϊ��
                )return this;

            (prevXHR = me.xhr) && setTimeout(function(){//���г�ȥû�м������xhr abort��
                prevXHR.abort();
            }, 400);

            _opts._loadingTimer = setTimeout(function () {//���������50ms������ˣ���û��Ҫ��ȥ��ʾ loading��
                $panel.html(tpl.loading);
            }, 50);

            _opts._fitLock = true;

            me.xhr = $.ajax($.extend(_opts.ajax || {}, {
                url:item.href,
                context:me.$el.get(0),
                beforeSend:function (xhr, settings) {
                    var eventData = gmu.Event('beforeLoad');
                    me.trigger(eventData, xhr, settings);
                    if (eventData.isDefaultPrevented())return false;
                },
                success:function (response, xhr) {
                    var eventData = gmu.Event('beforeRender');
                    clearTimeout(_opts._loadingTimer);//�����ʾloading�ļ�ʱ��
                    me.trigger(eventData, response, $panel, index, xhr)//�ⲿ�����޸�data������ֱ�Ӱ�pannel�޸���
                    if (!eventData.isDefaultPrevented()) {
                        $panel.html(response);
                    }
                    _opts._fitLock = false;
                    loaded[index] = true;
                    me.trigger('load', $panel);
                    delete me.xhr;
                    me._fitToContent($panel);
                },
                error:function () {
                    var eventData = gmu.Event('loadError');
                    clearTimeout(_opts._loadingTimer);//�����ʾloading�ļ�ʱ��
                    loaded[index] = false;
                    me.trigger(eventData, $panel);
                    if(!eventData.isDefaultPrevented()){
                        $panel.html(tpl.error);
                    }
                    delete me.xhr;
                }
            }));
        }
        
        /**
         * @event beforeLoad
         * @param {Event} e gmu.Event����
         * @param {Object} xhr xhr����
         * @param {Object} settings ajax����Ĳ���
         * @description ������ǰ����������ͨ��e.preventDefault()��ȡ���˴�ajax����
         * @for Tabs
         * @uses Tabs.ajax
         */
        
        /**
         * @event beforeRender
         * @param {Event} e gmu.Event����
         * @param {Object} response ����ֵ
         * @param {Object} panel ��Ӧ��Tab���ݵ�����
         * @param {Number} index Tab�����
         * @param {Object} xhr xhr����
         * @description ajax����������ݣ���render��div��֮ǰ����������json���ݣ�����ͨ���˷�������дrender��Ȼ��ͨ��e.preventDefault()����ֹ����response�����div��
         * @for Tabs
         * @uses Tabs.ajax
         */
        
        /**
         * @event load
         * @param {Event} e gmu.Event����
         * @param {Zepto} panel ��Ӧ��Tab���ݵ�����
         * @description ��ajax���󵽵����ݹ�����ƽ�Ѿ�Render��div���˺󴥷�
         * @for Tabs
         * @uses Tabs.ajax
         */
        
        /**
         * @event loadError
         * @param {Event} e gmu.Event����
         * @param {Zepto} panel ��Ӧ��Tab���ݵ�����
         * @description ��ajax��������ʧ��ʱ������������¼���preventDefault�ˣ��򲻻���Դ��Ĵ�����ϢRender��div��
         * @for Tabs
         * @uses Tabs.ajax
         */
    } );
})(Zepto);
