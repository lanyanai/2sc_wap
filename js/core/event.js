/**
 * @file Event���, ��widget�ṩ�¼���Ϊ��Ҳ���Ը����������ṩ�¼���Ϊ��
 * @import core/gmu.js
 * @module GMU
 */
(function( gmu, $ ) {
    var slice = [].slice,
        separator = /\s+/,

        returnFalse = function() {
            return false;
        },

        returnTrue = function() {
            return true;
        };

    function eachEvent( events, callback, iterator ) {

        // ��֧�ֶ���ֻ֧�ֶ��event�ÿո����
        (events || '').split( separator ).forEach(function( type ) {
            iterator( type, callback );
        });
    }

    // ����ƥ��namespace����
    function matcherFor( ns ) {
        return new RegExp( '(?:^| )' + ns.replace( ' ', ' .* ?' ) + '(?: |$)' );
    }

    // ����event name��event namespace
    function parse( name ) {
        var parts = ('' + name).split( '.' );

        return {
            e: parts[ 0 ],
            ns: parts.slice( 1 ).sort().join( ' ' )
        };
    }

    function findHandlers( arr, name, callback, context ) {
        var matcher,
            obj;

        obj = parse( name );
        obj.ns && (matcher = matcherFor( obj.ns ));
        return arr.filter(function( handler ) {
            return handler &&
                    (!obj.e || handler.e === obj.e) &&
                    (!obj.ns || matcher.test( handler.ns )) &&
                    (!callback || handler.cb === callback ||
                    handler.cb._cb === callback) &&
                    (!context || handler.ctx === context);
        });
    }

    /**
     * Event�࣬���gmu.eventһ��ʹ��, ����ʹ�κζ�������¼���Ϊ����������`preventDefault()`, `stopPropagation()`������
     * ���ǵ����¼�û��Domð�ݸ������û��`stopImmediatePropagation()`��������`stopProgapation()`�����þ���
     * ��֮���handler����ִ�С�
     *
     * @class Event
     * @constructor
     * ```javascript
     * var obj = {};
     *
     * $.extend( obj, gmu.event );
     *
     * var etv = gmu.Event( 'beforeshow' );
     * obj.trigger( etv );
     *
     * if ( etv.isDefaultPrevented() ) {
     *     console.log( 'before show has been prevented!' );
     * }
     * ```
     * @grammar new gmu.Event( name[, props]) => instance
     * @param {String} type �¼�����
     * @param {Object} [props] ���Զ��󣬽������ƽ�event����
     */
    function Event( type, props ) {
        if ( !(this instanceof Event) ) {
            return new Event( type, props );
        }

        props && $.extend( this, props );
        this.type = type;

        return this;
    }

    Event.prototype = {

        /**
         * @method isDefaultPrevented
         * @grammar e.isDefaultPrevented() => Boolean
         * @desc �жϴ��¼��Ƿ���ֹ
         */
        isDefaultPrevented: returnFalse,

        /**
         * @method isPropagationStopped
         * @grammar e.isPropagationStopped() => Boolean
         * @desc �жϴ��¼��Ƿ�ֹͣ����
         */
        isPropagationStopped: returnFalse,

        /**
         * @method preventDefault
         * @grammar e.preventDefault() => undefined
         * @desc ��ֹ�¼�Ĭ����Ϊ
         */
        preventDefault: function() {
            this.isDefaultPrevented = returnTrue;
        },

        /**
         * @method stopPropagation
         * @grammar e.stopPropagation() => undefined
         * @desc ��ֹ�¼�����
         */
        stopPropagation: function() {
            this.isPropagationStopped = returnTrue;
        }
    };

    /**
     * @class event
     * @static
     * @description event���󣬰���һ��event�������������Խ��˶������ŵ���������������¼���Ϊ��
     *
     * ```javascript
     * var myobj = {};
     *
     * $.extend( myobj, gmu.event );
     *
     * myobj.on( 'eventname', function( e, var1, var2, var3 ) {
     *     console.log( 'event handler' );
     *     console.log( var1, var2, var3 );    // =>1 2 3
     * } );
     *
     * myobj.trigger( 'eventname', 1, 2, 3 );
     * ```
     */
    gmu.event = {

        /**
         * ���¼���
         * @method on
         * @grammar on( name, fn[, context] ) => self
         * @param  {String}   name     �¼���
         * @param  {Function} callback �¼�������
         * @param  {Object}   context  �¼��������������ġ�
         * @return {self} ��������������ʽ
         * @chainable
         */
        on: function( name, callback, context ) {
            var me = this,
                set;

            if ( !callback ) {
                return this;
            }

            set = this._events || (this._events = []);

            eachEvent( name, callback, function( name, callback ) {
                var handler = parse( name );

                handler.cb = callback;
                handler.ctx = context;
                handler.ctx2 = context || me;
                handler.id = set.length;
                set.push( handler );
            } );

            return this;
        },

        /**
         * ���¼����ҵ�handlerִ������Զ�����󶨡�
         * @method one
         * @grammar one( name, fn[, context] ) => self
         * @param  {String}   name     �¼���
         * @param  {Function} callback �¼�������
         * @param  {Object}   context  �¼��������������ġ�
         * @return {self} ��������������ʽ
         * @chainable
         */
        one: function( name, callback, context ) {
            var me = this;

            if ( !callback ) {
                return this;
            }

            eachEvent( name, callback, function( name, callback ) {
                var once = function() {
                        me.off( name, once );
                        return callback.apply( context || me, arguments );
                    };

                once._cb = callback;
                me.on( name, once, context );
            } );

            return this;
        },

        /**
         * ����¼���
         * @method off
         * @grammar off( name[, fn[, context] ] ) => self
         * @param  {String}   name     �¼���
         * @param  {Function} callback �¼�������
         * @param  {Object}   context  �¼��������������ġ�
         * @return {self} ��������������ʽ
         * @chainable
         */
        off: function( name, callback, context ) {
            var events = this._events;

            if ( !events ) {
                return this;
            }

            if ( !name && !callback && !context ) {
                this._events = [];
                return this;
            }

            eachEvent( name, callback, function( name, callback ) {
                findHandlers( events, name, callback, context )
                        .forEach(function( handler ) {
                            delete events[ handler.id ];
                        });
            } );

            return this;
        },

        /**
         * �����¼�
         * @method trigger
         * @grammar trigger( name[, ...] ) => self
         * @param  {String | Event }   evt     �¼�����gmu.Event����ʵ��
         * @param  {*} * �������
         * @return {self} ��������������ʽ
         * @chainable
         */
        trigger: function( evt ) {
            var i = -1,
                args,
                events,
                stoped,
                len,
                ev;

            if ( !this._events || !evt ) {
                return this;
            }

            typeof evt === 'string' && (evt = new Event( evt ));

            args = slice.call( arguments, 1 );
            evt.args = args;    // handler�п���ֱ��ͨ��e.args��ȡtrigger����
            args.unshift( evt );

            events = findHandlers( this._events, evt.type );

            if ( events ) {
                len = events.length;

                while ( ++i < len ) {
                    if ( (stoped = evt.isPropagationStopped()) ||  false ===
                            (ev = events[ i ]).cb.apply( ev.ctx2, args )
                            ) {

                        // ���return false���൱��stopPropagation()��preventDefault();
                        stoped || (evt.stopPropagation(), evt.preventDefault());
                        break;
                    }
                }
            }

            return this;
        }
    };

    // expose
    gmu.Event = Event;
})( gmu, gmu.$ );