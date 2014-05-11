/**
 * @file ��iOS�н�ҳ�����Ϊ����ͼ��(��֧��Androidϵͳ)
 * @import core/widget.js, extend/fix.js
 * @module GMU
 */
(function( gmu, $, undefined ) {
    /**
     * ��iOS�н�ҳ�����Ϊ����ͼ��(��֧��Androidϵͳ)
     * @class Add2desktop
     * @constructor Html����
     *
     * javascript����
     * ```javascript
     * gmu.Add2desktop({icon:'../../../examples/assets/icon.png'});
     * ```
     * @param {dom | zepto | selector} [el] ������ʼ����������Ԫ��
     * @param {Object} [options] �����������������鿴[Options](#GMU:Toolbar:options)
     * @grammar  gmu.Add2desktop([el [,options]]) =>instance
     * @grammar  $(el).add2desktop(options) => zepto
     */
    gmu.define('Add2desktop', {
        options: {
            /**
             * @property {String} icon ��Ʒ��ICON��URL
             * @namespace options
             */
            icon: '',
            /**
             * @property {selector} [container=document.body] �������
             * @namespace options
             */
            container:  '',
            /**
             * @property {String} [key='_gmu_adddesktop_key'] LocalStorage��keyֵ
             * @namespace options
             */
            key:'_gmu_adddesktop_key',
            /**
             * @property {Boolean} [useFix=true] �Ƿ�ʹ��fix�̶�Ч��
             * @namespace options
             */
            useFix: true,
            /**
             * @property {Object} [position={bottom:12,left:50%}] �̶�ʱʹ�õ�λ�ò���
             * @namespace options
             */
            position: {
                bottom: 12,
                left: '50%'
            },
            /**
             * @property {Function} [beforeshow=fn}] ��ʾǰ�������¼�������e.preventDefault()������ֹ��ʾ
             * @namespace options
             */
            beforeshow : function(e){
                this.key() && e.preventDefault()
            },
            /**
             * @property {Function} [afterhide=fn}] ���غ󴥷����¼�������������дLocalStorage��ֵ
             * @namespace options
             */
            afterhide : function(){
                this.key(1)
            },
            _isShow:false
        },

        _init: function() {
            var me = this;

            me.on( 'ready', function(){
                me.$el.find('.ui-add2desktop-close').on('click',function () {
                    me.hide();
                });
                me._options['useFix'] && me.$el.fix(me._options['position']);

                me.show();
            } );

            me.on( 'destroy', function(){
                me.$el.remove();
            } );
        },

        _create: function() {
            var me = this,
                $el,
                version = ($.os.version && $.os.version.substr(0, 3) > 4.1 ? 'new' :'old');

            if($.os.version && $.os.version.substr(0, 3) >= 7.0) {
                version = 'iOS7';
            }

            if( me._options.setup ) {
                var src = me.$el.children('img').attr('src');
                src && (me._options['icon'] = src);
            }
            $el = me.$el || (me.$el = $('<div></div>'));
            $el.addClass('ui-add2desktop').appendTo(me._options['container'] || (me.$el.parent().length ? '' : document.body)),

            $el.html('<img src="' + me._options['icon'] + '"/><p>�ȵ��<span class="ui-add2desktop-icon-' + version +'"></span>��<br />��"��ӵ�����Ļ"</p><span class="ui-add2desktop-close"><b></b></span><div class="ui-add2desktop-arrow"><b></b></div>');
        },

        /**
         * �洢/��ȡLocalStorage�ļ�ֵ
         * @method key
         * @param {String} [value] LocalStorage�ļ�ֵ��������ʾȡֵ
         * @return {self} LocalStorage��ֵ
         */
        key : function(value){
            var ls = window.localStorage;
            return value !== undefined ? ls.setItem(this._options['key'], value) : ls.getItem(this._options['key']);
        },

        /**
         * ��ʾadd2desktop
         * @method show
         * @return {self} ���ر���
         */

        /**
         * @event beforeshow
         * @param {Event} e gmu.Event����
         * @description add2desktop��ʾǰ����
         */
        show: function() {
            var me = this;

            if( !me._options['_isShow'] ) {
                if(!$.os.ios || $.browser.uc || $.browser.qq || $.browser.chrome) return me; //todo ���iOSԭ����������ж�
                var event = new gmu.Event('beforeshow');
                me.trigger(event);
                if(event.isDefaultPrevented()) return me;
                me.$el.css('display', 'block');
                me._options['_isShow'] = true;
            }

            return me;
        },

        /**
         * ����add2desktop
         * @method hide
         * @return {self} ���ر���
         */

        /**
         * @event afterhide
         * @param {Event} e gmu.Event����
         * @description add2desktop��ʾ�󴥷�
         */
        hide: function() {
            var me = this;

            if(me._options['_isShow']) {
                me.$el.css('display', 'none');
                me._options['_isShow'] = false;
                me.trigger('afterhide');
            }

            return me;
        }
        
        /**
         * @event ready
         * @param {Event} e gmu.Event����
         * @description �������ʼ����󴥷���
         */
        
        /**
         * @event destroy
         * @param {Event} e gmu.Event����
         * @description ��������ٵ�ʱ�򴥷�
         */
    });

})( gmu, gmu.$ );
