/**
 * @file ʵ����ͨ��fix������
 * @name Fix
 * @import zepto.js, extend/event.scrollStop.js, extend/event.ortchange.js
 */

/**
 * @name fix
 * @grammar fix(options) => self
 * @desc �̶�fix�������Բ�֧��position:fixed���豸�Ͻ�Ԫ��position��Ϊabsolute��
 * ��ÿ��scrollstopʱ����opts�������õ�ǰ��ʾ��λ�ã�����fixЧ����
 *
 * Options:
 * - ''top'' {Number}: ���붥����pxֵ
 * - ''left'' {Number}: ��������pxֵ
 * - ''bottom'' {Number}: ����ײ���pxֵ
 * - ''right'' {Number}: �����Ҳ��pxֵ
 * @example
 * var div = $('div');
 * div.fix({top:0, left:0}); //��div�̶������Ͻ�
 * div.fix({top:0, right:0}); //��div�̶������Ͻ�
 * div.fix({bottom:0, left:0}); //��div�̶������½�
 * div.fix({bottom:0, right:0}); //��div�̶������½�
 *
 */

(function ($, undefined) {
    $.extend($.fn, {
        fix: function(opts) {
            var me = this;                      //���һ�������еĵ�һԪ����fix������Ϊ������ϵ�����Ԫ����fix��
            if(me.attr('isFixed')) return me;   //�����ڲ���ʱ�Ϳ�����Լ��Ͻ��в��������ص������¼�ȥ����
            me.css(opts).css('position', 'fixed').attr('isFixed', true);
            var buff = $('<div style="position:fixed;top:10px;"></div>').appendTo('body'),
                top = buff[0].getBoundingClientRect().top,
                checkFixed = function() {
                    if(window.pageYOffset > 0) {
                        if(buff[0].getBoundingClientRect().top !== top) {
                            me.css('position', 'absolute');
                            doFixed();
                            $(window).on('scrollStop', doFixed);
                            $(window).on('ortchange', doFixed);
                        }
                        $(window).off('scrollStop', checkFixed);
                        buff.remove();
                    }
                },
                doFixed = function() {
                    me.css({
                        top: window.pageYOffset + (opts.bottom !== undefined ? window.innerHeight - me.height() - opts.bottom : (opts.top ||0)),
                        left: opts.right !== undefined ? document.body.offsetWidth - me.width() - opts.right : (opts.left || 0)
                    });
                    opts.width == '100%' && me.css('width', document.body.offsetWidth);
                };

            $(window).on('scrollStop', checkFixed);

            return me;
        }
    });
}(Zepto));