/**
 * @file ģ�����
 * @import zepto.js
 * @module GMU
 */
(function( $, undefined ) {
    
    /**
     * ����ģ��tpl����dataδ����ʱ���ر�������������ĳ��template��Ҫ��ν���ʱ�����鱣�������������Ȼ����ô˺������õ������
     * 
     * @method $.parseTpl
     * @grammar $.parseTpl(str, data)  => string
     * @grammar $.parseTpl(str)  => Function
     * @param {String} str ģ��
     * @param {Object} data ����
     * @example var str = "<p><%=name%></p>",
     * obj = {name: 'ajean'};
     * console.log($.parseTpl(str, data)); // => <p>ajean</p>
     */
    $.parseTpl = function( str, data ) {
        var tmpl = 'var __p=[];' + 'with(obj||{}){__p.push(\'' +
                str.replace( /\\/g, '\\\\' )
                .replace( /'/g, '\\\'' )
                .replace( /<%=([\s\S]+?)%>/g, function( match, code ) {
                    return '\',' + code.replace( /\\'/, '\'' ) + ',\'';
                } )
                .replace( /<%([\s\S]+?)%>/g, function( match, code ) {
                    return '\');' + code.replace( /\\'/, '\'' )
                            .replace( /[\r\n\t]/g, ' ' ) + '__p.push(\'';
                } )
                .replace( /\r/g, '\\r' )
                .replace( /\n/g, '\\n' )
                .replace( /\t/g, '\\t' ) +
                '\');}return __p.join("");',

            /* jsbint evil:true */
            func = new Function( 'obj', tmpl );
        
        return data ? func( data ) : func;
    };
})( Zepto );