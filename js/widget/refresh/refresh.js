/**
 * @file ���ظ������
 * @import core/widget.js
 * @importCSS loading.css
 * @module GMU
 */

(function( gmu, $, undefined ) {
    
    /**
     * ���ظ������
     *
     * @class Refresh
     * @constructor Html����
     * ```html
     * <div class="ui-refresh">
     *    <ul class="data-list">...</ul>
     *    <div class="ui-refresh-down"></div><!--setup��ʽ����classΪui-refresh-down��ui-refresh-up��Ԫ�ر�����ϣ����ڷ�refresh��ť-->
     * </div>

     * ```
     *
     * javascript����
     * ```javascript
     * $('.ui-refresh').refresh({
     *      load: function (dir, type) {
     *          var me = this;
     *          $.getJSON('../../data/refresh.php', function (data) {
     *              var $list = $('.data-list'),
     *                      html = (function (data) {      //������Ⱦ
     *                          var liArr = [];
     *                          $.each(data, function () {
     *                              liArr.push(this.html);
     *                          });
     *                          return liArr.join('');
     *                      })(data);
     *              $list[dir == 'up' ? 'prepend' : 'append'](html);
     *              me.afterDataLoading();    //���ݼ�����ɺ�ı�״̬
     *          });
     *      }
     *  });
     * ```
     * @param {dom | zepto | selector} [el] ������ʼ��Refresh��Ԫ��
     * @param {Object} [options] �����������������鿴[Options](#GMU:Refresh:options)
     * @grammar $( el ).refresh( options ) => zepto
     * @grammar new gmu.Refresh( el, options ) => instance
     */
    gmu.define( 'Refresh', {
        options: {

            /**
             * @property {Function} load �������ť�����߻����ﵽ�ɼ�����������ʱ���˷����ᱻ���á���Ҫ�ڴ˷����������ajax�������󣬲���������󣬵���afterDataLoading()��֪ͨrefresh������ı�״̬��
             * @namespace options
             */
            load: null,

            /**
             * @property {Function} [statechange=null] ��ʽ�ı�ʱ���������¼����Ա���ֹ����ֹ������Զ��������ʽ���ص�������event(�¼�����), elem(refresh��ťԪ��), state(״̬), dir(����)
             * @namespace options
             */
            statechange: null
        },

        _init: function() {
            var me = this,
                opts = me._options;

            me.on( 'ready', function(){
                $.each(['up', 'down'], function (i, dir) {
                    var $elem = opts['$' + dir + 'Elem'],
                        elem = $elem.get(0);

                    if ($elem.length) {
                        me._status(dir, true);    //��ʼ���ü���״̬Ϊ����
                        if (!elem.childNodes.length || ($elem.find('.ui-refresh-icon').length && $elem.find('.ui-refresh-label').length)) {    //������Ϊ���򴴽�����������icon��label��Ҫ����������
                            !elem.childNodes.length && me._createBtn(dir);
                            opts.refreshInfo || (opts.refreshInfo = {});
                            opts.refreshInfo[dir] = {
                                $icon: $elem.find('.ui-refresh-icon'),
                                $label: $elem.find('.ui-refresh-label'),
                                text: $elem.find('.ui-refresh-label').html()
                            }
                        }
                        $elem.on('click', function () {
                            if (!me._status(dir) || opts._actDir) return;         //����Ƿ��ڿ���״̬��ͬһ�����ϵ����ڼ����У����߲�ͬ����Ļ�δ������� traceID:FEBASE-569
                            me._setStyle(dir, 'loading');
                            me._loadingAction(dir, 'click');
                        });
                    }
                });
            } );

            me.on( 'destroy', function(){
                me.$el.remove();
            } );
        },

        _create: function(){
            var me = this,
                opts = me._options,
                $el = me.$el;

            if( me._options.setup ) {
                // ֵ֧��setupģʽ������ֱ�Ӵ�DOM��ȡԪ��
                opts.$upElem = $el.find('.ui-refresh-up');
                opts.$downElem = $el.find('.ui-refresh-down');
                $el.addClass('ui-refresh');
            }
        },

        _createBtn: function (dir) {
            this._options['$' + dir + 'Elem'].html('<span class="ui-refresh-icon"></span><span class="ui-refresh-label">���ظ���</span>');

            return this;
        },

        _setStyle: function (dir, state) {
            var me = this,
                stateChange = $.Event('statechange');

            me.trigger(stateChange, me._options['$' + dir + 'Elem'], state, dir);
            if ( stateChange.defaultPrevented ) {
                return me;
            }

            return me._changeStyle(dir, state);
        },

        _changeStyle: function (dir, state) {
            var opts = this._options,
                refreshInfo = opts.refreshInfo[dir];

            switch (state) {
                case 'loaded':
                    refreshInfo['$label'].html(refreshInfo['text']);
                    refreshInfo['$icon'].removeClass();
                    opts._actDir = '';
                    break;
                case 'loading':
                    refreshInfo['$label'].html('������...');
                    refreshInfo['$icon'].addClass('ui-loading');
                    opts._actDir = dir;
                    break;
                case 'disable':
                    refreshInfo['$label'].html('û�и���������');
                    break;
            }

            return this;
        },

        _loadingAction: function (dir, type) {
            var me = this,
                opts = me._options,
                loadFn = opts.load;

            $.isFunction(loadFn) && loadFn.call(me, dir, type);
            me._status(dir, false);

            return me;
        },

        /**
         * ���������load����load��ͨ��ajax�������ݻ�������Ҫ���ô˷��������ı�refresh״̬��
         * @method afterDataLoading
         * @param {String} dir ���صķ���'up' | 'down'��
         * @chainable
         * @return {self} ���ر���
         */
        afterDataLoading: function (dir) {
            var me = this,
                dir = dir || me._options._actDir;

            me._setStyle(dir, 'loaded');
            me._status(dir, true);

            return me;
        },

        /**
         * �������ü����Ƿ���ã��ַ���ġ�
         * @param {String} dir ���صķ���'up' | 'down'��
         * @param {String} status ״̬��true | false��
         */
        _status: function(dir, status) {
            var opts = this._options;

            return status === undefined ? opts['_' + dir + 'Open'] : opts['_' + dir + 'Open'] = !!status;
        },

        _setable: function (able, dir, hide) {
            var me = this,
                opts = me._options,
                dirArr = dir ? [dir] : ['up', 'down'];

            $.each(dirArr, function (i, dir) {
                var $elem = opts['$' + dir + 'Elem'];
                if (!$elem.length) return;
                //����enable������ֱ����ʾ��disable�����text�Ƿ���true��ȷ���Ƿ�����
                able ? $elem.show() : (hide ?  $elem.hide() : me._setStyle(dir, 'disable'));
                me._status(dir, able);
            });

            return me;
        },

        /**
         * ����������ݿɼ���ʱ�����Ե��ô˷�����������Refresh��
         * @method disable
         * @param {String} dir ���صķ���'up' | 'down'��
         * @param {Boolean} hide �Ƿ����ذ�ť�����������Ϊfalse����ֻ�����ֱ仯��
         * @chainable
         * @return {self} ���ر���
         */
        disable: function (dir, hide) {
            return this._setable(false, dir, hide);
        },

        /**
         * �������
         * @method enable
         * @param {String} dir ���صķ���'up' | 'down'��
         * @chainable
         * @return {self} ���ر���
         */
        enable: function (dir) {
            return this._setable(true, dir);
        }

        /**
         * @event ready
         * @param {Event} e gmu.Event����
         * @description �������ʼ����󴥷���
         */
        
        /**
         * @event statechange
         * @param {Event} e gmu.Event����
         * @param {Zepto} elem ��ťԪ��
         * @param {String} state ��ǰ�����״̬('loaded'��Ĭ��״̬��'loading'��������״̬��'disabled'������״̬����ʾ�����ݼ����ˣ�'beforeload'������û���ɿ�ǰ������ص�����״̬�� ��Ҫ���������д�״̬��lite��iscroll������iOS5)
         * @param {String} dir ���صķ���'up' | 'down'��
         * @description �������״̬�仯ʱ�ᴥ��
         */
        
        /**
         * @event destroy
         * @param {Event} e gmu.Event����
         * @description ��������ٵ�ʱ�򴥷�
         */

    } );
})( gmu, gmu.$ );
