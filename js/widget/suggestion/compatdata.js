/**
 * @file compatData
 * @import widget/suggestion/suggestion.js
 */
(function( $, win ) {

    // �Ƿ����1.x�汾�е���ʷ����
    gmu.Suggestion.options.compatdata = true;


    /**
     * compatdata����������û���ʷlocalstorge��gmu 1.x�汾�û�������ʷͨ��','�ָ����ݣ�Ϊ�˽��','���ܱ���������⣬���ڲ���encodeURIComponent(',')���������ݣ�����Ҫ�����ϵ���ʷ���ݡ���������Ϊtrue���������ݼ��ݴ���
     * @class compatdata
     * @namespace Suggestion
     * @pluginfor Suggestion
     */
    gmu.Suggestion.option( 'compatdata', true, function() {

        this.on( 'ready', function() {
            var key = this.key,
                flagKey = 'SUG-History-DATATRANS',
                localdata,
                dataArr;

            try {
                localdata = win.localStorage[ key ];

                // ���������ݣ���ǰ�ԡ�,���ָ�localstorage�е����ݣ����ڸ�ΪencodeURIComponent(',')�ָ�
                if ( localdata && !win.localStorage[ flagKey ] ) {

                    // �洢�Ƿ�ת������ʷ���ݵı��
                    win.localStorage[ flagKey ] = '\u001e';

                    dataArr = localdata.split( ',' );
                    win.localStorage[ key ] = dataArr.join( this.separator );
                }

            }catch ( e ) {
                console.log( e.message );
            }
        } )
    } );
})( gmu.$, window );