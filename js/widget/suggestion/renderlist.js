/**
 * @file renderList
 * @import widget/suggestion/suggestion.js, extend/highlight.js
 */
(function( $ ) {

    $.extend( gmu.Suggestion.options, {

        /**
         * @property {Boolean} [isHistory=true] �Ƿ���localstorage�д洢�û���ѯ��¼���൱��2.0.5��ǰ�汾�е�isStorage
         * @namespace options
         * @for Suggestion
         * @uses Suggestion.renderlist
         */
        isHistory: true,

        /**
         * @property {Boolean} [usePlus=false] �Ƿ�ʹ��+��ʹsug item����input��
         * @namespace options
         * @for Suggestion
         * @uses Suggestion.renderlist
         */
        usePlus: false,

        /**
         * @property {Number} [listCount=5] sug�б�����
         * @namespace options
         * @for Suggestion
         * @uses Suggestion.renderlist
         */
        listCount: 5,

        /**
         * @property {Function} [renderlist=null] �Զ�����Ⱦ�б��������Ը���Ĭ����Ⱦ�б�ķ���
         * @namespace options
         * @for Suggestion
         * @uses Suggestion.renderlist
         */
        renderlist: null
    } );

    /**
     * renderList���ṩĬ���б���Ⱦ������Ҫ�Լ���Ⱦsug�б���renderListΪFunction���ͣ�����Ҫʹ�ô˲��<br />
     * Ĭ����jsonp�������󣬵��û���option��������renderListʱ����Ҫ������e.preventDefault����Ĭ���������ݷ���
     * @class renderlist
     * @namespace Suggestion
     * @pluginfor Suggestion
     */
    gmu.Suggestion.option( 'renderlist', function() {

        // ��renderList����Function����ʱ����option������Ч
        return $.type( this._options.renderlist ) !== 'function';

    }, function() {

        var me = this,
            $xssElem = $( '<div></div>'),
            _xssFilter = function( str ) {
                return $xssElem.text( str ).html();
            },

            // ��Ⱦsug list�б�����list array
            _createList = function( query, sugs ) {
                var opts = me._options,
                    html = [],
                    str = '',
                    sug,
                    len,
                    i;

                if ( !sugs || !sugs.length ) {
                    me.hide();
                    return html;
                }

                sugs = sugs.slice( 0, opts.listCount );

                // ��ֹxssע�룬ͨ��text()����ת��һ��
                query = _xssFilter( query || '' );

                // sug�б���Ⱦ�Ƚ�Ƶ�����ʲ�����ģ��������
                for ( i = 0, len = sugs.length; i < len; i++ ) {
                    str = _xssFilter( sug = sugs[ i ] );

                    // ����queryΪ������Ҫ�����滻
                    query && (str = $.trim( sug )
                        .replace( query, '<span>' + query + '</span>' ));

                    opts.usePlus &&
                            (str += '<div class="ui-suggestion-plus" ' +
                                'data-item="' + sug + '"></div>');

                    html.push( '<li>' + str + '</li>' );
                }

                return html;
            };

        me.on( 'ready', function() {
            var me = this,
                ns = me.eventNs,
                $form = $( me._options.form || me.getEl().closest( 'form' ));

            // ��form��submit�¼�
            $form.size() && (me.$form = $form .on( 'submit' + ns,
                    function( e ) {
                        var submitEvent = gmu.Event('submit');

                        me._options.isHistory &&
                        me._localStorage( me.value() );

                        me.trigger( submitEvent );

                        // ��ֹ��Ĭ���ύ�¼�
                        submitEvent.isDefaultPrevented() && e.preventDefault();
                    }));

            // todo ����֤������ҳ�治���и�bug�����Ų�ԭ���������벻��ת��bug
            me.$content.on( 'touchstart' + ns, function(e) {
                e.preventDefault();
            });

            // ע��tap�¼������������뷨ʱ��touch�¼�����submit
            me.$content.on( 'tap' + ns, function(e) {
                var $input = me.getEl(),
                    $elem = $( e.target );

                // ����Ӻţ�inputֵ�Ͽ�
                if ( $elem.hasClass( 'ui-suggestion-plus' ) ) {
                    $input.val( $elem.attr( 'data-item' ) );
                } else if ( $.contains( me.$content.get( 0 ),
                    $elem.get( 0 ) ) ) {

                    // ���sug item, ��ֹʹ��tap��ɴ�͸
                    setTimeout( function() {
                        $input.val( $elem.text() );
                        me.trigger( 'select', $elem )
                            .hide().$form.submit();
                    }, 400 );
                }
            }).highlight( 'ui-suggestion-highlight' );

            me.on( 'destroy', function() {
                $form.size() && $form.off( ns );
                me.$content.off();
            } );
        } );

        me.on( 'renderlist', function( e, data, query, callback ) {
            var ret = _createList( query, data );

            // �ص���Ⱦsuglist
            return callback( ret.length ?
                        '<ul>' + ret.join( ' ' ) + '</ul>' : '' );
        } );
    } );

})( gmu.$ );