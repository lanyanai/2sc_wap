/**
 * @file ͼƬ�ֲ���ʾ�㹦��
 * @import widget/slider/slider.js
 */
(function( gmu, $, undefined ) {
    $.extend( gmu.Slider.options, {
        /**
         * @property {Number} [viewNum=2] ��sliderΪmultiviewģʽʱ������ָ��һҳ��ʾ���ٸ�ͼƬ��
         * @namespace options
         * @for Slider
         * @uses Slider.multiview
         */
        viewNum: 2,
        /**
         * @property {Number} [travelSize=2] ����ָ�����������µ���ʱ��һ�λ������ٸ���ͼƬ��������ֵ��viewNumֵһ�£�����һ�λ���һ����Ч����
         * @namespace options
         * @for Slider
         * @uses Slider.multiview
         */
        travelSize: 2
    } );

    /**
     * ͼƬ�ֲ���ʾ�㹦��
     * @class multiview
     * @namespace Slider
     * @pluginfor Slider
     */
    gmu.Slider.register( 'multiview', {
        _arrange: function( width, index ) {
            var items = this._items,
                viewNum = this._options.viewNum,
                factor = index % viewNum,
                i = 0,
                perWidth = this.perWidth = Math.ceil( width / viewNum ),
                item,
                len;

            this._slidePos = new Array( items.length );

            for ( len = items.length; i < len; i++ ) {
                item = items[ i ];

                item.style.cssText += 'width:' + perWidth + 'px;' +
                        'left:' + (i * -perWidth) + 'px;';
                item.setAttribute( 'data-index', i );

                i % viewNum === factor && this._move( i,
                        i < index ? -width : i > index ? width : 0,
                        0, Math.min( viewNum, len - i ) );
            }

            this._container.css( 'width', perWidth * len );
        },

        _move: function( index, dist, speed, immediate, count ) {
            var perWidth = this.perWidth,
                opts = this._options,
                i = 0;

            count = count || opts.viewNum;

            for ( ; i < count; i++ ) {
                this.origin( opts.loop ? this._circle( index + i ) :
                        index + i, dist + i * perWidth, speed, immediate );
            }
        },

        _slide: function( from, diff, dir, width, speed, opts, mode ) {
            var me = this,
                viewNum = opts.viewNum,
                len = this._items.length,
                offset,
                to;

            // ������loopʱ��diff���ܴ���ʵ�����ƶ��ķ�Χ
            opts.loop || (diff = Math.min( diff, dir > 0 ?
                            from : len - viewNum - from ));

            to = me._circle( from - dir * diff );

            // �������loopģʽ����ʵ��λ�õķ���Ϊ׼
            opts.loop || (dir = Math.abs( from - to ) / (from - to));

            diff %= len;    // ����diff����len�����

            // �෴�ľ����viewNumС��������������Ĺ�����
            if ( len - diff < viewNum ) {
                diff = len - diff;
                dir = -1 * dir;
            }

            offset = Math.max( 0, viewNum - diff );

            // ������ʼλ�ã�����Ѿ���λ���ϲ����ظ�����
            // touchend��ִ�й����ģ�����ִ�����´���
            if ( !mode ) {
                this._move( to, -dir * this.perWidth *
                        Math.min( diff, viewNum ), 0, true );
                this._move( from + offset * dir, offset * dir *
                        this.perWidth, 0, true );
            }

            this._move( from + offset * dir, width * dir, speed );
            this._move( to, 0, speed );

            this.index = to;
            return this.trigger( 'slide', to, from );
        },

        prev: function() {
            var opts = this._options,
                travelSize = opts.travelSize;

            if ( opts.loop || (this.index > 0, travelSize =
                    Math.min( this.index, travelSize )) ) {

                this.slideTo( this.index - travelSize );
            }

            return this;
        },

        next: function() {
            var opts = this._options,
                travelSize = opts.travelSize,
                viewNum = opts.viewNum;

            if ( opts.loop || (this.index + viewNum < this.length &&
                    (travelSize = Math.min( this.length - 1 - this.index,
                    travelSize ))) ) {

                this.slideTo( this.index + travelSize );
            }

            return this;
        }
    } );
})( gmu, gmu.$ );