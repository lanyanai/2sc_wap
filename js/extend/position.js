/**
 * @file ����Zepto��λ�����û�ȡ���
 * @import zepto.js, extend/offset.js
 * @module GMU
 */

(function ($, undefined) {
    var _position = $.fn.position,
        round = Math.round,
        rhorizontal = /^(left|center|right)([\+\-]\d+%?)?$/,
        rvertical = /^(top|center|bottom)([\+\-]\d+%?)?$/,
        rpercent = /%$/;

    function str2int( persent, totol ) {
        return (parseInt( persent, 10 ) || 0) * (rpercent.test( persent ) ?
                totol / 100 : 1);
    }

    function getOffsets( pos, offset, width, height ) {
        return [
            pos[ 0 ] === 'right' ? width : pos[ 0 ] === 'center' ?
                    width / 2 : 0,

            pos[ 1 ] === 'bottom' ? height : pos[ 1 ] === 'center' ?
                    height / 2 : 0,

            str2int( offset[ 0 ], width ),

            str2int( offset[ 1 ], height )
        ];
    }

    function getDimensions( elem ) {
        var raw = elem[ 0 ],
            isEvent = raw.preventDefault;

        raw = raw.touches && raw.touches[ 0 ] || raw;

        // ���⴦��document, window��event����
        if ( raw.nodeType === 9 || raw === window || isEvent ) {
            return {
                width: isEvent ? 0 : elem.width(),
                height: isEvent ? 0 : elem.height(),
                top: raw.pageYOffset || raw.pageY ||  0,
                left: raw.pageXOffset || raw.pageX || 0
            };
        }

        return elem.offset();
    }

    function getWithinInfo( el ) {
        var $el = $( el = (el || window) ),
            dim = getDimensions( $el );

        el = $el[ 0 ];

        return {
            $el: $el,
            width: dim.width,
            height: dim.height,
            scrollLeft: el.pageXOffset || el.scrollLeft,
            scrollTop: el.pageYOffset || el.scrollTop
        };
    }

    // ����������
    function filterOpts( opts, offsets ) {
        [ 'my', 'at' ].forEach(function( key ) {
            var pos = ( opts[ key ] || '' ).split( ' ' ),
                opt = opts[ key ] = [ 'center', 'center' ],
                offset = offsets[ key ] = [ 0, 0 ];

            pos.length === 1 && pos[ rvertical.test( pos[ 0 ] ) ? 'unshift' :
                    'push' ]( 'center' );

            rhorizontal.test( pos[ 0 ] ) && (opt[ 0 ] = RegExp.$1) &&
                    (offset[ 0 ] = RegExp.$2);

            rvertical.test( pos[ 1 ] ) && (opt[ 1 ] = RegExp.$1) &&
                    (offset[ 1 ] = RegExp.$2);
        });
    }

    /**
     * ��ȡԪ���������Ը���Ԫ�أ��������ΪpositionΪrelative��abosolute��fixed��Ԫ�أ�������λ�á�
     * @method $.fn.position
     * @grammar position()  => array
     * @grammar position(opts)  => self
     * @param {String} [my=center] �������ĵ㡣����Ϊ'left top', 'center bottom', 'right center'...ͬʱ����������ƫ�������� 'left+5 center-20%'
     * @param {String} [at=center] ���ö�λ��Ŀ��Ԫ�ص�ʲôλ�á�������ʽͬmy����һ��
     * @param {Object} [of=null] ����Ŀ��Ԫ��
     * @param {Function} [collision=null] ��ײ���ص�����
     * @param {Object} [within=window] ��ײ������
     * @example
     * var position = $('#target').position();
     * $('#target').position({
     *                          my: 'center',
     *                          at: 'center',
     *                          of: document.body
     *                      });
     */
    $.fn.position = function ( opts ) {
        if ( !opts || !opts.of ) {
            return _position.call( this );
        }

        opts = $.extend( {}, opts );

        var target = $( opts.of ),
            collision = opts.collision,
            within = collision && getWithinInfo( opts.within ),
            ofses = {},
            dim = getDimensions( target ),
            bPos = {
                left: dim.left,
                top: dim.top
            },
            atOfs;

        target[ 0 ].preventDefault && (opts.at = 'left top');
        filterOpts( opts, ofses );    // ����������

        atOfs = getOffsets( opts.at, ofses.at, dim.width, dim.height );
        bPos.left += atOfs[ 0 ] + atOfs[ 2 ];
        bPos.top += atOfs[ 1 ] + atOfs[ 3 ];

        return this.each(function() {
            var $el = $( this ),
                ofs = $el.offset(),
                pos = $.extend( {}, bPos ),
                myOfs = getOffsets( opts.my, ofses.my, ofs.width, ofs.height );

            pos.left = round( pos.left + myOfs[ 2 ] - myOfs[ 0 ] );
            pos.top = round( pos.top + myOfs[ 3 ] - myOfs[ 1 ] );

            collision && collision.call( this, pos, {
                of: dim,
                offset: ofs,
                my: opts.my,
                at: opts.at,
                within: within,
                $el : $el
            } );

            pos.using = opts.using;
            $el.offset( pos );
        });
    }
})( Zepto );