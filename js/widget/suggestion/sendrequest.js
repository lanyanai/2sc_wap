/**
 * @file sendRequest
 * @import widget/suggestion/suggestion.js
 */

(function( $, win ) {

    $.extend( gmu.Suggestion.options, {

        /**
         * @property {Boolean} [isCache=true] �������󷵻����ݺ��Ƿ񻺴�query������
         * @namespace options
         * @for Suggestion
         * @uses Suggestion.sendrequest
         */
        isCache: true,

        /**
         * @property {String} [queryKey='wd'] ��������ʱquery��keyֵ
         * @namespace options
         * @for Suggestion
         * @uses Suggestion.sendrequest
         */
        
        queryKey: 'wd',

        /**
         * @property {String} [cbKey='cb'] ��������ʱcallback��name
         * @namespace options
         * @for Suggestion
         * @uses Suggestion.sendrequest
         */
        cbKey: 'cb',

        /**
         * @property {Function} [sendrequest=null] �Զ��巢�������������Ը���Ĭ�Ϸ�������ķ���
         * @namespace options
         * @for Suggestion
         * @uses Suggestion.sendrequest
         */
        sendrequest: null
    } );

    /**
     * sendRequest��Ĭ��sendRequestΪjsonp��ʽȡ���ݣ����û��Լ����������sug������optionΪFunction���ͣ�����Ҫʹ�ô˲��<br />
     * Ĭ����jsonp�������󣬵��û���option��������sendRequestʱ����Ҫ������e.preventDefault����Ĭ���������ݷ���
     * @class sendrequest
     * @namespace Suggestion
     * @pluginfor Suggestion
     */
    gmu.Suggestion.option( 'sendrequest', function() {

        // ��sendRequest����Function����ʱ����option������Ч
        return $.type( this._options.sendrequest ) !== 'function';

    }, function() {
        var me = this,
            opts = me._options,
            queryKey = opts.queryKey,
            cbKey = opts.cbKey,
            param = opts.param,
            isCache = opts.isCache,
            cdata;

        this.on( 'sendrequest', function( e, query, callback, cacheData ) {

            var url = opts.source,

            // ��date��Ϊ��׺��Ӧ�ò����ظ����ʲ���origin
                cb = 'suggestion_' + (+new Date());

            // �������д��������query���ݣ��򲻷�������
            if ( isCache && (cdata = cacheData( query )) ) {
                callback( query, cdata );
                return me;

            }

            // �滻url���һ�����������ӷ�?&��&Ϊ?
            url = (url + '&' + queryKey + '=' + encodeURIComponent( query ))
                    .replace( /[&?]{1,2}/, '?' );

            !~url.indexOf( '&' + cbKey ) &&  (url += '&' + cbKey + '=' + cb);

            param && (url += '&' + param);

            win[ cb ] = function( data ) {

                /*
                 * ��Ⱦ���ݲ�������������
                 * ���ص����ݸ�ʽ���£�
                 * {
                 *     q: "a",
                 *     p: false,
                 *     s: ["angelababy", "akb48", "after school",
                 *     "android", "angel beats!", "a pink", "app"]
                 * }
                 */
                callback( query, data.s );

                // ���������query
                isCache && cacheData( query, data.s );

                delete win[ cb ];
            };

            // ��jsonp��ʽ��������
            $.ajax({
                url: url,
                dataType: 'jsonp'
            });

            return me;
        } );

    } );
})( gmu.$, window );