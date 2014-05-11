/**
 * @file ͼƬ�ֲ����
 * @import extend/touch.js, extend/event.ortchange.js, core/widget.js
 * @module GMU
 */
(function( gmu, $, undefined ) {
    var cssPrefix = $.fx.cssPrefix,
        transitionEnd = $.fx.transitionEnd,

        // todo ���3d�Ƿ�֧�֡�
        translateZ = ' translateZ(0)';
    
    /**
     * ͼƬ�ֲ����
     *
     * @class Slider
     * @constructor Html����
     * ```html
     * <div id="slider">
     *   <div>
     *       <a href="http://www.baidu.com/"><img lazyload="image1.png"></a>
     *       <p>1,��Coron��̫�����Լ�ɹ�ڡ�С��</p>
     *   </div>
     *   <div>
     *       <a href="http://www.baidu.com/"><img lazyload="image2.png"></a>
     *       <p>2,��Coron��̫�����Լ�ɹ�ڡ�С��</p>
     *   </div>
     *   <div>
     *       <a href="http://www.baidu.com/"><img lazyload="image3.png"></a>
     *       <p>3,��Coron��̫�����Լ�ɹ�ڡ�С��</p>
     *   </div>
     *   <div>
     *       <a href="http://www.baidu.com/"><img lazyload="image4.png"></a>
     *       <p>4,��Coron��̫�����Լ�ɹ�ڡ�С��</p>
     *   </div>
     * </div>
     * ```
     *
     * javascript����
     * ```javascript
     * $('#slider').slider();
     * ```
     * @param {dom | zepto | selector} [el] ������ʼ��Slider��Ԫ��
     * @param {Object} [options] �����������������鿴[Options](#GMU:Slider:options)
     * @grammar $( el ).slider( options ) => zepto
     * @grammar new gmu.Slider( el, options ) => instance
     */
    gmu.define( 'Slider', {

        options: {

            /**
             * @property {Boolean} [loop=false] �Ƿ���������
             * @namespace options
             */
            loop: false,
            
            /**
             * @property {Number} [speed=400] ����ִ���ٶ�
             * @namespace options
             */
            speed: 400,

            /**
             * @property {Number} [index=0] ��ʼλ��
             * @namespace options
             */
            index: 0,

            /**
             * @property {Object} [selector={container:'.ui-slider-group'}] �ڲ��ṹѡ��������
             * @namespace options
             */
            selector: {
                container: '.ui-slider-group'    // ������ѡ����
            }
        },

        template: {
            item: '<div class="ui-slider-item"><div href="<%= href %>">' +
                    '<img src="<%= pic %>" alt="" /></div>' +
                    '<% if( title ) { %><p><%= title %></p><% } %>' +
                    '</div>'
        },

        _create: function() {
            var me = this,
                $el = me.getEl(),
                opts = me._options;

            me.index = opts.index;

            // ��ʼdom�ṹ
            me._initDom( $el, opts );

            // ����width
            me._initWidth( $el, me.index );
            me._container.on( transitionEnd + me.eventNs,
                    $.proxy( me._tansitionEnd, me ) );

            // ת���¼����
            $( window ).on( 'ortchange' + me.eventNs, function() {
                me._initWidth( $el, me.index );
            } );
        },

        _initDom: function( $el, opts ) {
            var selector = opts.selector,
                viewNum = opts.viewNum || 1,
                items,
                container;

            // ��������ڵ��Ƿ�ָ��
            container = $el.find( selector.container );

            // û��ָ�������򴴽�����
            if ( !container.length ) {
                container = $( '<div></div>' );

                // ���û�д���content, ��root�ĺ�����Ϊ�ɹ���item
                if ( !opts.content ) {

                    // ���⴦��ֱ����ul��ʼ��slider��case
                    if ( $el.is( 'ul' ) ) {
                        this.$el = container.insertAfter( $el );
                        container = $el;
                        $el = this.$el;
                    } else {
                        container.append( $el.children() );
                    }
                } else {
                    this._createItems( container, opts.content );
                }

                container.appendTo( $el );
            }

            // ����Ƿ񹹳�ѭ������
            if ( (items = container.children()).length < viewNum + 1 ) {
                opts.loop = false;
            }

            // ����ڵ����ˣ���Ҫ���Ƽ���
            while ( opts.loop && container.children().length < 3 * viewNum ) {
                container.append( items.clone() );
            }

            this.length = container.children().length;

            this._items = (this._container = container)
                    .addClass( 'ui-slider-group' )
                    .children()
                    .addClass( 'ui-slider-item' )
                    .toArray();

            this.trigger( 'done.dom', $el.addClass( 'ui-slider' ), opts );
        },

        // ����items��������ݰ���render���뵽container��
        _createItems: function( container, items ) {
            var i = 0,
                len = items.length;

            for ( ; i < len; i++ ) {
                container.append( this.tpl2html( 'item', items[ i ] ) );
            }
        },

        _initWidth: function( $el, index, force ) {
            var me = this,
                width;

            // widthû�б仯����Ҫ����
            if ( !force && (width = $el.width()) === me.width ) {
                return;
            }

            me.width = width;
            me._arrange( width, index );
            me.height = $el.height();
            me.trigger( 'width.change');
        },

        // ����items
        _arrange: function( width, index ) {
            var items = this._items,
                i = 0,
                item,
                len;

            this._slidePos = new Array( items.length );

            for ( len = items.length; i < len; i++ ) {
                item = items[ i ];
                
                item.style.cssText += 'width:' + width + 'px;' +
                        'left:' + (i * -width) + 'px;';
                item.setAttribute( 'data-index', i );

                this._move( i, i < index ? -width : i > index ? width : 0, 0 );
            }

            this._container.css( 'width', width * len );
        },

        _move: function( index, dist, speed, immediate ) {
            var slidePos = this._slidePos,
                items = this._items;

            if ( slidePos[ index ] === dist || !items[ index ] ) {
                return;
            }

            this._translate( index, dist, speed );
            slidePos[ index ] = dist;    // ��¼Ŀ��λ��

            // ǿ��һ��reflow
            immediate && items[ index ].clientLeft;
        },

        _translate: function( index, dist, speed ) {
            var slide = this._items[ index ],
                style = slide && slide.style;

            if ( !style ) {
                return false;
            }

            style.cssText += cssPrefix + 'transition-duration:' + speed + 
                    'ms;' + cssPrefix + 'transform: translate(' + 
                    dist + 'px, 0)' + translateZ + ';';
        },

        _circle: function( index, arr ) {
            var len;

            arr = arr || this._items;
            len = arr.length;

            return (index % len + len) % arr.length;
        },

        _tansitionEnd: function( e ) {

            // ~~��������ת�����ȼ���parseInt( str, 10 );
            if ( ~~e.target.getAttribute( 'data-index' ) !== this.index ) {
                return;
            }
            
            this.trigger( 'slideend', this.index );
        },

        _slide: function( from, diff, dir, width, speed, opts ) {
            var me = this,
                to;

            to = me._circle( from - dir * diff );

            // �������loopģʽ����ʵ��λ�õķ���Ϊ׼
            if ( !opts.loop ) {
                dir = Math.abs( from - to ) / (from - to);
            }
            
            // ������ʼλ�ã�����Ѿ���λ���ϲ����ظ�����
            this._move( to, -dir * width, 0, true );

            this._move( from, width * dir, speed );
            this._move( to, 0, speed );

            this.index = to;
            return this.trigger( 'slide', to, from );
        },

        /**
         * �л����ڼ���slide
         * @method slideTo
         * @chainable
         * @param {Number} to Ŀ��slide�����
         * @param {Number} [speed] �л����ٶ�
         * @return {self} ���ر���
         */
        slideTo: function( to, speed ) {
            if ( this.index === to || this.index === this._circle( to ) ) {
                return this;
            }

            var opts = this._options,
                index = this.index,
                diff = Math.abs( index - to ),
                
                // 1����-1����
                dir = diff / (index - to),
                width = this.width;

            speed = speed || opts.speed;

            return this._slide( index, diff, dir, width, speed, opts );
        },

        /**
         * �л�����һ��slide
         * @method prev
         * @chainable
         * @return {self} ���ر���
         */
        prev: function() {
            
            if ( this._options.loop || this.index > 0 ) {
                this.slideTo( this.index - 1 );
            }

            return this;
        },

        /**
         * �л�����һ��slide
         * @method next
         * @chainable
         * @return {self} ���ر���
         */
        next: function() {
            
            if ( this._options.loop || this.index + 1 < this.length ) {
                this.slideTo( this.index + 1 );
            }

            return this;
        },

        /**
         * ���ص�ǰ��ʾ�ĵڼ���slide
         * @method getIndex
         * @chainable
         * @return {Number} ��ǰ��silde���
         */
        getIndex: function() {
            return this.index;
        },

        /**
         * �������
         * @method destroy
         */
        destroy: function() {
            this._container.off( this.eventNs );
            $( window ).off( 'ortchange' + this.eventNs );
            return this.$super( 'destroy' );
        }

        /**
         * @event ready
         * @param {Event} e gmu.Event����
         * @description �������ʼ����󴥷���
         */

        /**
         * @event done.dom
         * @param {Event} e gmu.Event����
         * @param {Zepto} $el sliderԪ��
         * @param {Object} opts �����ʼ��ʱ��������
         * @description DOM������ɺ󴥷�
         */
        
        /**
         * @event width.change
         * @param {Event} e gmu.Event����
         * @description slider������ȷ����仯ʱ����
         */
        
        /**
         * @event slideend
         * @param {Event} e gmu.Event����
         * @param {Number} index ��ǰslide�����
         * @description slide�л���ɺ󴥷�
         */
        
        /**
         * @event slide
         * @param {Event} e gmu.Event����
         * @param {Number} to Ŀ��slide�����
         * @param {Number} from ��ǰslide�����
         * @description slide�л�ʱ����������л�ʱ�ж��������¼�����ʱ��slide��һ���Ѿ�����л���
         */
        
        /**
         * @event destroy
         * @param {Event} e gmu.Event����
         * @description ��������ٵ�ʱ�򴥷�
         */
    } );

})( gmu, gmu.$ );