/**
 *  @file ����Zepto��ͼƬ�ӳټ��ز��
 *  @name Imglazyload
 *  @desc ͼƬ�ӳټ���
 *  @import zepto.js, extend/event.scrollStop.js, extend/event.ortchange.js
 */
(function ($) {
    /**
     * @name imglazyload
     * @grammar  imglazyload(opts) => self
     * @desc ͼƬ�ӳټ���
     * **Options**
     * - ''placeHolder''     {String}:              (��ѡ, Ĭ��ֵ:\'\')ͼƬ��ʾǰ��ռλ��
     * - ''container''       {Array|Selector}:      (��ѡ, Ĭ��ֵ:window)ͼƬ�ӳټ�����������innerScrollΪtrue�������wrapper��������
     * - ''threshold''       {Array|Selector}:      (��ѡ, Ĭ��ֵ:0)��ֵ��Ϊ��ֵ����ǰ����
     * - ''urlName''         {String}:              (��ѡ, Ĭ��ֵ:data-url)ͼƬurl����
     * - ''eventName''       {String}:              (��ѡ, Ĭ��ֵ:scrollStop)���¼���ʽ
     * - --''refresh''--     {Boolean}              --(��ѡ, Ĭ��ֵ:false)�Ƿ��Ǹ��²���������ҳ��׷��ͼƬ�����Խ��ò�����Ϊtrue--���ò����Ѿ�ɾ��������ʹ�øò���������ͬ��Ϊ׷�ӵ�ͼƬ�����ӳټ��أ�
     * - ''innerScroll''     {Boolean}              (��ѡ, Ĭ��ֵ:false)�Ƿ����ڹ������ڹ����򲻰�eventName�¼����û������ⲿ����Ӧ���¼����ɵ�$.fn.imglazyload.detectȥ���ͼƬ�Ƿ������container��
     * - ''isVertical''      {Boolean}              (��ѡ, Ĭ��ֵ:true)�Ƿ�����
     *
     * **events**
     * - ''startload'' ��ʼ����ͼƬ
     * - ''loadcomplete'' �������
     * - ''error'' ����ʧ��
     *
     * ʹ��img��ǩ��Ϊ��ʼ��ǩʱ��placeHolder��Ч���ɿ�����img�����class�����placeHolderЧ����������ɺ��Ƴ���ʹ������Ԫ����Ϊ��ʼ��ǩʱ��placeHolder����ӵ���ǩ�ڲ�������ͼƬ������ɺ��滻��
     * ԭʼ��ǩ����\"data-\"��ͷ�����Ի��Զ���ӵ����غ��ͼƬ�У������Զ���������Ҫ����ͼƬ�еĿ��Կ�����data-��ͷ
     * @example $('.lazy-load').imglazyload();
     * $('.lazy-load').imglazyload().on('error', function (e) {
     *     e.preventDefault();      //��ͼƬ���ټ���
     * });
     */
    var pedding = [];
    $.fn.imglazyload = function (opts) {
        var splice = Array.prototype.splice,//����ɾ��Ԫ����
            opts = $.extend({
                threshold:0,
                container:window,
                urlName:'data-url',
                placeHolder:'',
                eventName:'scrollStop',
                innerScroll: false,
                isVertical: true
            }, opts),
            $viewPort = $(opts.container),
            isVertical = opts.isVertical,
            isWindow = $.isWindow($viewPort.get(0)),
            OFFSET = {
                win: [isVertical ? 'scrollY' : 'scrollX', isVertical ? 'innerHeight' : 'innerWidth'],
                img: [isVertical ? 'top' : 'left', isVertical ? 'height' : 'width']
            },
            $plsHolder = $(opts.placeHolder).length ? $(opts.placeHolder) : null,
            isImg = $(this).is('img');

        !isWindow && (OFFSET['win'] = OFFSET['img']);   //��container����window����OFFSET��ȡֵͬimg

        function isInViewport(offset) {      //ͼƬ�����ڿ�����������
            var viewOffset = isWindow ? window : $viewPort.offset(),
                viewTop = viewOffset[OFFSET.win[0]],
                viewHeight = viewOffset[OFFSET.win[1]];
            return viewTop >= offset[OFFSET.img[0]] - opts.threshold - viewHeight && viewTop <= offset[OFFSET.img[0]] + offset[OFFSET.img[1]];
        }

        pedding = Array.prototype.slice.call($(pedding.reverse()).add(this), 0).reverse();    //����peddingֵ��������ҳ��׷��ͼƬ
        if ($.isFunction($.fn.imglazyload.detect)) {    //��������ͼƬ������placeHolder
            _addPlsHolder();
            return this;
        };

        function _load(div) {     //����ͼƬ���������¼�
            var $div = $(div),
                attrObj = {},
                $img = $div;

            if (!isImg) {
                $.each($div.get(0).attributes, function () {   //������img��Ϊ���������������к���data-�ľ����ӵ�ͼƬ��
                    ~this.name.indexOf('data-') && (attrObj[this.name] = this.value);
                });
                $img = $('<img />').attr(attrObj);
            }
            $div.trigger('startload');
            $img.on('load',function () {
                !isImg && $div.replaceWith($img);     //������img����ԭ���������滻������img����ֱ�ӽ�src�滻
                $div.trigger('loadcomplete');
                $img.off('load');
            }).on('error',function () {     //ͼƬ����ʧ�ܴ���
                var errorEvent = $.Event('error');       //������������¼�
                $div.trigger(errorEvent);
                errorEvent.defaultPrevented || pedding.push(div);
                $img.off('error').remove();
            }).attr('src', $div.attr(opts.urlName));
        }

        function _detect() {     //���ͼƬ�Ƿ�����ڿ��������������������Ŀ�ʼ����
            var i, $image, offset, div;
            for (i = pedding.length; i--;) {
                $image = $(div = pedding[i]);
                offset = $image.offset();
                isInViewport(offset) && (splice.call(pedding, i, 1), _load(div)) && console.log('load');
            }
        }

        function _addPlsHolder () {
            !isImg && $plsHolder && $(pedding).append($plsHolder);   //���ǲ���img����ֱ��append
        }

        $(document).ready(function () {    //ҳ�����ʱ�������
            _addPlsHolder();     //����ʱ��placeHolder����
            _detect();
        });

        !opts.innerScroll && $(window).on(opts.eventName + ' ortchange', function () {    //�����ڹ�ʱ����window�ϰ��¼�
            _detect();
        });

        $.fn.imglazyload.detect = _detect;    //��¶��ⷽ�������ⲿ����

        return this;
    };

})(Zepto);
