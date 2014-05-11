/**
 * @file ��չת���¼�
 * @name ortchange
 * @short ortchange
 * @desc ��չת���¼�orientation�����ԭ��ת���¼��ļ���������
 * @import zepto.js, extend/matchMedia.js
 */

$(function () {
    /**
     * @name ortchange
     * @desc ��չת���¼�orientation�����ԭ��ת���¼��ļ���������
     * - ***ortchange*** : ��ת����ʱ�򴥷�������uc��������֧��orientationchange���豸������css media queryʵ�֣������ת����ʱ��orientation�¼��ļ���������
     * $(window).on('ortchange', function () {        //��ת����ʱ�򴥷�
     *     console.log('ortchange');
     * });
     */
    //��չ����media query
    $.mediaQuery = {
        ortchange: 'screen and (width: ' + window.innerWidth + 'px)'
    };
    //ͨ��matchMedia����ת���¼�
    $.matchMedia($.mediaQuery.ortchange).addListener(function () {
        $(window).trigger('ortchange');
    });
});