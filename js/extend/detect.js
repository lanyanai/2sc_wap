/**
 * @file ƽ̨���Լ��
 * @name detect
 * @short detect
 * @desc ��չzepto�ж�browser�ļ��
 * @import zepto.js
 */

(function( $, navigator ) {
    
    /**
     * @name $.browser
     * @desc ��չzepto�ж�browser�ļ��
     *
     * **��������**
     * - ***qq*** ���qq�����
     * - ***uc*** ���uc�����, ��Щ�ϰ汾��uc�����������userAgent��appVersion��ǣ��޷�������
     * - ***baidu*** ���baidu�����
     * - ***version*** ������汾
     *
     * @example
     * if ($.browser.qq) {      //��qq������ϴ����log
     *     console.log('this is qq browser');
     * }
     */
    var ua = navigator.userAgent,
        br = $.browser,
        detects = {
            qq: /MQQBrowser\/([\d.]+)/i,
            uc: /UCBrowser\/([\d.]+)/i,
            baidu: /baidubrowser\/.*?([\d.]+)/i
        },
        ret;

    $.each( detects, function( i, re ) {
        
        if ( (ret = ua.match( re )) ) {
            br[ i ] = true;
            br.version = ret[ 1 ];

            // �ն�ѭ��
            return false;
        }
    } );

    // uc����һ�ֹ��򣬾���appVersion�д� Uc�ַ�
    if ( !br.uc && /Uc/i.test( navigator.appVersion ) ) {
        br.uc = true;
    }

})( Zepto, navigator );
