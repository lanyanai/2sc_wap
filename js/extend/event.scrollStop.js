/**
 * @file ����ֹͣ�¼�
 * @name scrollStop
 * @short scrollStop
 * @desc ����ֹͣ�¼�
 * @import zepto.js, extend/throttle.js
 */
(function ($, win) {
    /**
     * @name scrollStop
     * @desc ��չ���¼�������ֹͣ�¼�
     * - ***scrollStop*** : ��document��������scrollStop�¼��ϣ�scrollͣ����ʱ����, ����ǰ�����ߺ��˺�scroll�¼������������
     * @example $(document).on('scrollStop', function () {        //scrollͣ����ʱ��ʾscrollStop
     *     console.log('scrollStop');
     * });
     */

    function registerScrollStop() {
        $(win).on('scroll', $.debounce(80, function () {
            $(win).trigger('scrollStop');
        }, false));
    }

    function backEventOffHandler() {
        //���뿪ҳ�棬ǰ������˻ص�ҳ������°�scroll, ��Ҫoff�����е�scroll������scrollʱ�䲻����
        $(win).off('scroll');
        registerScrollStop();
    }
    registerScrollStop();

    //todo ��ͳһ��������¼���������
    $(win).on('pageshow', function (e) {
        //����Ǵ�bfcache�м���ҳ�棬Ϊ�˷�ֹ���ע�ᣬ��Ҫ��off��
        e.persisted && $(win).off('touchstart', backEventOffHandler).one('touchstart', backEventOffHandler);
    });

})(Zepto, window);