/**
 * @file ���������
 * @import core/widget.js
 * @module GMU
 */
(function( gmu, $ ) {
    /**
     * ���������
     *
     * @class Toolbar
     * @constructor Html����
     * ```html
     * <div id="J_toolbar">
     *      <a href="../">����</a>
     *      <h2>������</h2>
     *     <span class="btn_1"><span>�ٿ�</span></span>
     *     <span class="btn_1">֪��</span>
     * </div>
     * ```
     *
     * javascript����
     * ```javascript
     * $('#J_toolbar').toolbar({});
     * ```
     * @param {dom | zepto | selector} [el] ������ʼ����������Ԫ��
     * @param {Object} [options] �����������������鿴[Options](#GMU:Toolbar:options)
     * @grammar $( el ).toolbar( options ) => zepto
     * @grammar new gmu.Toolbar( el, options ) => instance
     */
    gmu.define( 'Toolbar', {

        options: {

            /**
             * @property {Zepto | Selector | Element} [container=document.body] toolbar�������Ԫ��
             * @namespace options
             */
            container: document.body,

            /**
             * @property {String} [title='����'] toolbar�ı���
             * @namespace options
             */
            title: '����',

            /**
             * @property {Array} [leftBtns] �������İ�ť�飬֧��html��gmu buttonʵ��
             * @namespace options
             */
            leftBtns: [],

            /**
             * @property {Array} [rightBtns] �����Ҳ�İ�ť�飬֧��html��gmu buttonʵ��
             * @namespace options
             */
            rightBtns: [],

            /**
             * @property {Boolean} [fixed=false] toolbar�Ƿ�̶�λ��
             * @namespace options
             */
            fixed: false
        },

        _init: function() {
            var me = this,
                opts = me._options,
                $el;

            // ����container��Ĭ��ֵ
            if( !opts.container ) {
                opts.container = document.body;
            }

            me.on( 'ready', function() {
                $el = me.$el;

                if( opts.fixed ) {
                    // TODO Ԫ��id�Ĵ���
                    var placeholder = $( '<div class="ui-toolbar-placeholder"></div>' ).height( $el.offset().height ).
                        insertBefore( $el ).append( $el ).append( $el.clone().css({'z-index': 1, position: 'absolute',top: 0}) ),
                        top = $el.offset().top,
                        check = function() {
                            document.body.scrollTop > top ? $el.css({position:'fixed', top: 0}) : $el.css('position', 'absolute');
                        },
                        offHandle;

                    $(window).on( 'touchmove touchend touchcancel scroll scrollStop', check );
                    $(document).on( 'touchend touchcancel', offHandle = function() {
                        setTimeout( function() {
                            check();
                        }, 200 );
                    } );
                    me.on( 'destroy', function() {
                        $(window).off('touchmove touchend touchcancel scroll scrollStop', check);
                        $(document).off('touchend touchcancel', offHandle);
                        
                        // ɾ��placeholder������ԭ����Toolbar�ڵ�
                        $el.insertBefore(placeholder);
                        placeholder.remove();
                        me._removeDom();
                    } );

                    check();
                }
            } );

            me.on( 'destroy', function() {
                me._removeDom();
            } );
        },

        _create: function() {
            var me = this,
                opts = me._options,
                $el = me.getEl(),
                container = $( opts.container ),
                children = [],
                btnGroups = me.btnGroups = {
                    left: [],
                    right: []
                },
                currentGroup = btnGroups['left'];

            // render��ʽ����Ҫ�ȴ���Toolbar�ڵ�
            if( !opts.setup ) {
                ($el && $el.length > 0) ?
                    $el.appendTo(container) :   // ���el��һ��HTMLƬ�Σ��������container��
                    ($el = me.$el = $('<div>').appendTo( container ));  // ���򣬴���һ����div���������container��
            }

            // ��DOM��ȡ����ť��
            children = $el.children();
            $toolbarWrap = $el.find('.ui-toolbar-wrap');
            if( $toolbarWrap.length === 0 ){
                $toolbarWrap = $('<div class="ui-toolbar-wrap"></div>').appendTo($el);
            }else{
                children = $toolbarWrap.children();
            }

            children.forEach( function( child ) {
                $toolbarWrap.append(child);

                /^[hH]/.test( child.tagName ) ? 
                    (currentGroup = btnGroups['right'], me.title = child) :
                    currentGroup.push( child );
            } );

            // ������ఴť�������
            var leftBtnContainer = $toolbarWrap.find('.ui-toolbar-left');
            var rightBtnContainer = $toolbarWrap.find('.ui-toolbar-right');
            if( leftBtnContainer.length === 0 ) {
                leftBtnContainer = children.length ? $('<div class="ui-toolbar-left">').insertBefore(children[0]) : $('<div class="ui-toolbar-left">').appendTo($toolbarWrap);
                btnGroups['left'].forEach( function( btn ) {
                    $(btn).addClass('ui-toolbar-button');
                    leftBtnContainer.append( btn );
                } );
                
                // û���������������ΪҲû���Ҳ�����������Ҫ���ж��Ƿ�����Ҳ�����
                rightBtnContainer = $('<div class="ui-toolbar-right">').appendTo($toolbarWrap);
                btnGroups['right'].forEach( function( btn ) {
                    $(btn).addClass('ui-toolbar-button');
                    rightBtnContainer.append( btn );
                } );
            }

            $el.addClass( 'ui-toolbar' );
            $(me.title).length ? $(me.title).addClass( 'ui-toolbar-title' ) : $('<h1 class="ui-toolbar-title">' + opts.title + '</h1>').insertAfter(leftBtnContainer);;

            me.btnContainer = {
                'left': leftBtnContainer,
                'right': rightBtnContainer
            };

            me.addBtns( 'left', opts.leftBtns );
            me.addBtns( 'right', opts.rightBtns );
        },

        _addBtn: function( container, btn ) {
            var me = this;

            $( btn ).appendTo( container ).addClass('ui-toolbar-button');
        },

        /**
         * ��Ӱ�ť��
         * @method addBtns
         * @param {String} [position=right] ��ť��ӵ�λ�ã�left����right
         * @param {Array} btns Ҫ��ӵİ�ť�飬ÿ����ť������һ��gmu Buttonʵ��������Ԫ�أ�����HTMLƬ��
         * @return {self} ���ر���
         */
        addBtns: function( position, btns ) {
            var me = this,
                btnContainer = me.btnContainer[position],
                toString = Object.prototype.toString;

            // ���¼��ݣ����û�д�position����Ϊ���Ҳ���Ӱ�ť
            if( toString.call(position) != '[object String]' ) {
                btns = position;
                btnContainer = me.btnContainer['right'];
            }

            btns.forEach( function( btn, index ) {
                // �����gmu���ʵ����ȡʵ����$el
                if( btn instanceof gmu.Base ) {
                    btn = btn.getEl();
                }
                me._addBtn( btnContainer, btn );
            });

            return me;
        },

        /**
         * ��ʾToolbar
         * @method show
         * @return {self} ���ر���
         */
        
        /**
         * @event show
         * @param {Event} e gmu.Event����
         * @description Toolbar��ʾʱ����
         */
        show: function() {
            var me = this;

            me.$el.show();
            me.trigger( 'show' );
            me.isShowing = true;

            return me;
        },

        /**
         * ����Toolbar
         * @method hide
         * @return {self} ���ر���
         */
        
        /**
         * @event hide
         * @param {Event} e gmu.Event����
         * @description Toolbar����ʱ����
         */
        hide: function() {
            var me = this;

            me.$el.hide();
            me.trigger( 'hide' );
            me.isShowing = false;

            return me;
        },

        /**
         * ����Toolbar����ʾ/���أ�״̬
         * @method toggle
         * @return {self} ���ر���
         */
        toggle: function() {
            var me = this;

            me.isShowing === false ? 
                me.show() : me.hide();

            return me;
        },

        _removeDom: function(){
            var me = this,
                $el = me.$el;

            if( me._options.setup === false ) {   // �����ͨ��renderģʽ�������Ƴ��ڵ�
                $el.remove();
            } else {    // �����ͨ��setupģʽ�����������ڵ�
                $el.css('position', 'static').css('top', 'auto');
            }
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
    } );
})( gmu, gmu.$ );
