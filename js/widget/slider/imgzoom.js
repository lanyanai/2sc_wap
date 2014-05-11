/**
 * @file ͼƬ�Զ���Ӧ����
 * @import widget/slider/slider.js
 */
(function( gmu ) {

    /**
     * @property {Boolean} [imgZoom=true] �Ƿ���ͼƬ����Ӧ
     * @namespace options
     * @for Slider
     * @uses Slider.dots
     */
    gmu.Slider.options.imgZoom = true;

    /**
     * ͼƬ�Զ���Ӧ����
     * @class imgZoom
     * @namespace Slider
     * @pluginfor Slider
     */
    gmu.Slider.option( 'imgZoom', function() {
        return !!this._options.imgZoom;
    }, function() {
        var me = this,
            selector = me._options.imgZoom,
            watches;

        selector = typeof selector === 'string' ? selector : 'img';

        function unWatch() {
            watches && watches.off( 'load' + me.eventNs, imgZoom );
        }

        function watch() {
            unWatch();
            watches = me._container.find( selector )
                    .on( 'load' + me.eventNs, imgZoom );
        }

        function imgZoom( e ) {
            var img = e.target || this;
            var heightTop;
            if(me._options.viewNum == 1)
            {
                img.style.width = me.width  + 'px';
            }
            else
            {
                img.style.width = (me.width / me._options.viewNum - 6) + 'px';
            }
        }

        me.on( 'ready dom.change', watch );
        me.on( 'width.change', function() {
            watches && watches.each( imgZoom );
        } );
        me.on( 'destroy', unWatch );
    } );
})( gmu );