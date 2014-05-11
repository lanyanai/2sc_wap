/**
 * @file ���ݿɶ�̬�޸Ĳ��
 * �˲������slider�� �����ݿ��Զ�̬�޸ģ�������ģʽ�£�dom������items�ĸ����޹أ�
 * ��Զ��3��div�ֻ�������ͼƬ���Ƚ϶��ͼƬ�ֲ����������ַ�ʽ��
 * @import widget/slider/slider.js
 */
(function( gmu, $ ) {
    /**
     * @property {Number} [edgeThrottle=0] Ĭ�ϵ�slider��������һ�Ż��ߵ����һ��ʱ���ᴥ��edge�¼�����������ֵΪ1ʱ����slider���������ڶ���ʱ�ͻᴥ��edge�¼����Դ����ơ�
     * @namespace options
     * @for Slider
     * @uses Slider.dynamic
     */
    gmu.Slider.options.edgeThrottle = 0;

    /**
     * ���ݿɶ�̬�޸Ĳ�����˲������slider�� �����ݿ��Զ�̬�޸ģ�������ģʽ�£�dom������items�ĸ����޹أ���Զ��3��div�ֻ�������ͼƬ���Ƚ϶��ͼƬ�ֲ����������ַ�ʽ��
     * @class dynamic
     * @namespace Slider
     * @pluginfor Slider
     */
    gmu.Slider.register( 'dynamic', {
        _init: function() {
            var me = this;

            // ���������������
            me.on( 'slideend', me._adjustPos );
            me.getEl().on( 'touchstart' + me.eventNs, function() {
                me._adjustPos();
            } );
        },

        _create: function() {
            var me = this,
                opts = me._options,
                group;

            if ( !opts.content || opts.content.length < 3 ) {
                throw new Error( '�Զ�̬ģʽʹ��slider��������Ҫ����3������' );
            }

            opts.viewNum = 1;    // ֻ�ܴ���viewNumΪ1�����
            opts.loop = false;    // ��֧��loop

            this._group = group = $( '<div class="ui-slider-group"></div>' );
            me._renderItems( opts.content, opts.index, group );
            group.appendTo( me.getEl() );
            opts.index = me.index;

            me.origin();
            me._adjustPos( true );
        },

        trigger: function( e, to ) {

            if ( e === 'slide' || e.type === 'slide' ) {
                this._active = this._pool[ to ];
                this._flag = true;    // �����Ҫ����
            }
            return this.origin.apply( this, arguments );
        },

        slideTo: function( to, speed ) {
            var index = this.getIndex();

            // һ��ֻ�����ƶ�һ��
            if ( Math.abs( to - index ) !== 1 ) {
                return;
            }

            this._adjustPos();

            return this.origin( to + this.index - index, speed );
        },

        prev: function() {
            var index = this.getIndex();

            index > 0 && this.slideTo( index - 1 );

            return this;
        },

        next: function() {
            var index = this.getIndex();

            index < this._content.length - 1 && this.slideTo( index + 1 );

            return this;
        },

        // ����λ�ã�������ƶ��Ļ�������ǰ�������ƶ����м䡣
        _adjustPos: function( force, ignoreEdge ) {

            if ( !force && !this._flag ) {
                return;
            }

            var me = this,
                opts = me._options,
                content = me._content,
                group = me._group,
                index = $.inArray( me._active, content ),
                delta = me.index - 1,
                next = index + delta,
                item,
                elem;

            if ( delta && next < content.length && next >= 0 ) {
                item = content[ next ];
                elem = $( me.tpl2html( 'item', item ) );
                gmu.staticCall( me._items[ 1 - delta ], 'remove' );
                group[ delta < 0 ? 'prepend' : 'append' ]( elem );
                me.trigger( 'dom.change' );

                me._pool.splice( 1 - delta, 1 );
                me._pool[ delta < 0 ? 'unshift' : 'push' ]( item );

                me.index -= delta;
                me._items = group.children().toArray();
                me._arrange( me.width, me.index );
            }

            // �����Ե
            if ( !ignoreEdge && (index === opts.edgeThrottle || index ===
                    content.length - opts.edgeThrottle - 1) ) {
                me.trigger( 'edge', index === opts.edgeThrottle, me._active );
            }

            me._flag = false;
            return me;
        },

        _renderItems: function( content, index, group ) {
            var arr = content.slice( index, index + (index > 0 ? 2 : 3) ),
                rest = 3 - arr.length;

            // �����ⲿֱ���޸ģ�Ӱ���ڲ�����
            this._content = content.concat();
            this._active = content[ index ];
            rest && (arr = content.slice( index - rest, index )
                    .concat( arr ));
            this.index = rest;
            this._createItems( group, this._pool = arr );
        },

        /**
         * ��ȡ��ǰ��ʾ��Ԫ������
         * @method getIndex
         * @chainable
         * @return {Number} ��ǰ��ʾ��Ԫ������
         * @for Slider
         * @uses Slider.autoplay
         */
        getIndex: function() {
            return $.inArray( this._active, this._content );
        },

        /**
         * ��ȡ��ǰ��ʾ��Ԫ�����ݶ���
         * @method active
         * @chainable
         * @return {Number} ��ǰ��ʾ��Ԫ������
         * @for Slider
         * @uses Slider.autoplay
         */
        active: function() {
            return this._active;
        },

         /**
         * ��ȡ���ݻ��߸������ݣ�ֱ�ӻ���content�����ݣ�Ȼ��������Ⱦ�����õ����ݡ�����Ҫ��ʱ����ͼƬ���������ʹ�á�
         * @method content
         * @chainable
         * @return {Number} ��ǰ��ʾ��Ԫ������
         * @for Slider
         * @uses Slider.autoplay
         */
        content: function( content ) {

            // getter
            if ( !$.isArray( content ) ) {
                return this._content.concat();
            }

            var me = this,
                active = me._active,
                index = $.inArray( active, content ),
                group = this._group.empty();

            ~index || (index = 0);
            me._renderItems( content, index, group );
            me._items = group.children().toArray();
            me._arrange( me.width, me.index );

            me._adjustPos( false, true );
            me.trigger( 'dom.change' );
        }
    } );
})( gmu, gmu.$ );