/**
 * @file gmu�ײ㣬�����˴���gmu����ķ���
 * @import core/gmu.js, core/event.js, extend/parseTpl.js
 * @module GMU
 */

(function( gmu, $, undefined ) {
    var slice = [].slice,
        toString = Object.prototype.toString,
        blankFn = function() {},

        // �ҵ�������ϵ����ԡ�����
        staticlist = [ 'options', 'template', 'tpl2html' ],

        // �洢�Ͷ�ȡ���ݵ�ָ�������κζ������dom����
        // ע�⣺���ݲ�ֱ�Ӵ洢��object�ϣ����Ǵ����ڲ��հ��У�ͨ��_gid����
        // record( object, key ) ��ȡobject��Ӧ��keyֵ
        // record( object, key, value ) ����object��Ӧ��keyֵ
        // record( object, key, null ) ɾ������
        record = (function() {
            var data = {},
                id = 0,
                ikey = '_gid';    // internal key.

            return function( obj, key, val ) {
                var dkey = obj[ ikey ] || (obj[ ikey ] = ++id),
                    store = data[ dkey ] || (data[ dkey ] = {});

                val !== undefined && (store[ key ] = val);
                val === null && delete store[ key ];

                return store[ key ];
            };
        })(),

        event = gmu.event;

    function isPlainObject( obj ) {
        return toString.call( obj ) === '[object Object]';
    }

    // ��������
    function eachObject( obj, iterator ) {
        obj && Object.keys( obj ).forEach(function( key ) {
            iterator( key, obj[ key ] );
        });
    }

    // ��ĳ��Ԫ���϶�ȡĳ�����ԡ�
    function parseData( data ) {
        try {    // JSON.parse���ܱ���

            // ��data===null��ʾ��û�д�����
            data = data === 'true' ? true :
                    data === 'false' ? false : data === 'null' ? null :

                    // ������������ͣ����ַ�������ת����������
                    +data + '' === data ? +data :
                    /(?:\{[\s\S]*\}|\[[\s\S]*\])$/.test( data ) ?
                    JSON.parse( data ) : data;
        } catch ( ex ) {
            data = undefined;
        }

        return data;
    }

    // ��DOM�ڵ��ϻ�ȡ������
    function getDomOptions( el ) {
        var ret = {},
            attrs = el && el.attributes,
            len = attrs && attrs.length,
            key,
            data;

        while ( len-- ) {
            data = attrs[ len ];
            key = data.name;

            if ( key.substring(0, 5) !== 'data-' ) {
                continue;
            }

            key = key.substring( 5 );
            data = parseData( data.value );

            data === undefined || (ret[ key ] = data);
        }

        return ret;
    }

    // ��$.fn�ϹҶ�Ӧ�����������
    // $('#btn').button( options );ʵ�������
    // $('#btn').button( 'select' ); ����ʵ������
    // $('#btn').button( 'this' ); ȡ���ʵ��
    // �˷�����ѭget first set allԭ��
    function zeptolize( name ) {
        var key = name.substring( 0, 1 ).toLowerCase() + name.substring( 1 ),
            old = $.fn[ key ];

        $.fn[ key ] = function( opts ) {
            var args = slice.call( arguments, 1 ),
                method = typeof opts === 'string' && opts,
                ret,
                obj;

            $.each( this, function( i, el ) {

                // �ӻ�����ȡ��û���򴴽�һ��
                obj = record( el, name ) || new gmu[ name ]( el,
                        isPlainObject( opts ) ? opts : undefined );

                // ȡʵ��
                if ( method === 'this' ) {
                    ret = obj;
                    return false;    // �Ͽ�eachѭ��
                } else if ( method ) {

                    // ��ȡ�ķ���������ʱ���׳�������Ϣ
                    if ( !$.isFunction( obj[ method ] ) ) {
                        throw new Error( '���û�д˷�����' + method );
                    }

                    ret = obj[ method ].apply( obj, args );

                    // �϶�����getter���ʵķ�����������Ҫ�Ͽ�eachѭ�����ѽ������
                    if ( ret !== undefined && ret !== obj ) {
                        return false;
                    }

                    // retΪobjʱΪ��Чֵ��Ϊ�˲�Ӱ�����ķ���
                    ret = undefined;
                }
            } );

            return ret !== undefined ? ret : this;
        };

        /*
         * NO CONFLICT
         * var gmuPanel = $.fn.panel.noConflict();
         * gmuPanel.call(test, 'fnname');
         */
        $.fn[ key ].noConflict = function() {
            $.fn[ key ] = old;
            return this;
        };
    }

    // ����ע���option
    function loadOption( klass, opts ) {
        var me = this;

        // �ȼ��ظ�����
        if ( klass.superClass ) {
            loadOption.call( me, klass.superClass, opts );
        }

        eachObject( record( klass, 'options' ), function( key, option ) {
            option.forEach(function( item ) {
                var condition = item[ 0 ],
                    fn = item[ 1 ];

                if ( condition === '*' ||
                        ($.isFunction( condition ) &&
                        condition.call( me, opts[ key ] )) ||
                        condition === opts[ key ] ) {

                    fn.call( me );
                }
            });
        } );
    }

    // ����ע��Ĳ��
    function loadPlugins( klass, opts ) {
        var me = this;

        // �ȼ��ظ�����
        if ( klass.superClass ) {
            loadPlugins.call( me, klass.superClass, opts );
        }

        eachObject( record( klass, 'plugins' ), function( opt, plugin ) {

            // ���������ر��ˣ������ô˲��
            if ( opts[ opt ] === false ) {
                return;
            }

            eachObject( plugin, function( key, val ) {
                var oringFn;

                if ( $.isFunction( val ) && (oringFn = me[ key ]) ) {
                    me[ key ] = function() {
                        var origin = me.origin,
                            ret;

                        me.origin = oringFn;
                        ret = val.apply( me, arguments );
                        origin === undefined ? delete me.origin :
                                (me.origin = origin);

                        return ret;
                    };
                } else {
                    me[ key ] = val;
                }
            } );

            plugin._init.call( me );
        } );
    }

    // �ϲ�����
    function mergeObj() {
        var args = slice.call( arguments ),
            i = args.length,
            last;

        while ( i-- ) {
            last = last || args[ i ];
            isPlainObject( args[ i ] ) || args.splice( i, 1 );
        }

        return args.length ?
                $.extend.apply( null, [ true, {} ].concat( args ) ) : last; // �����options��ĳ��Ϊobjectʱ�������в�����==�ж�
    }

    // ��ʼ��widget. ���ؾ���ϸ�ڣ���Ϊ������ڹ������еĻ����ǿ��Կ������������ݵ�
    // ͬʱ�˷������Թ��á�
    function bootstrap( name, klass, uid, el, options ) {
        var me = this,
            opts;

        if ( isPlainObject( el ) ) {
            options = el;
            el = undefined;
        }

        // options�д���elʱ������el
        options && options.el && (el = $( options.el ));
        el && (me.$el = $( el ), el = me.$el[ 0 ]);

        opts = me._options = mergeObj( klass.options,
                getDomOptions( el ), options );

        me.template = mergeObj( klass.template, opts.template );

        me.tpl2html = mergeObj( klass.tpl2html, opts.tpl2html );

        // ����eventNs widgetName
        me.widgetName = name.toLowerCase();
        me.eventNs = '.' + me.widgetName + uid;

        me._init( opts );

        // ����setup������ֻ�д����$el��DOM�У�����Ϊ��setupģʽ
        me._options.setup = (me.$el && me.$el.parent()[ 0 ]) ? true: false;

        loadOption.call( me, klass, opts );
        loadPlugins.call( me, klass, opts );

        // ���д���DOM�Ȳ���
        me._create();
        me.trigger( 'ready' );

        el && record( el, name, me ) && me.on( 'destroy', function() {
            record( el, name, null );
        } );

        return me;
    }

    /**
     * @desc ����һ���࣬���캯��Ĭ��Ϊinit����, superClassĬ��ΪBase
     * @name createClass
     * @grammar createClass(object[, superClass]) => fn
     */
    function createClass( name, object, superClass ) {
        if ( typeof superClass !== 'function' ) {
            superClass = gmu.Base;
        }

        var uuid = 1,
            suid = 1;

        function klass( el, options ) {
            if ( name === 'Base' ) {
                throw new Error( 'Base�಻��ֱ��ʵ����' );
            }

            if ( !(this instanceof klass) ) {
                return new klass( el, options );
            }

            return bootstrap.call( this, name, klass, uuid++, el, options );
        }

        $.extend( klass, {

            /**
             * @name register
             * @grammar klass.register({})
             * @desc ע����
             */
            register: function( name, obj ) {
                var plugins = record( klass, 'plugins' ) ||
                        record( klass, 'plugins', {} );

                obj._init = obj._init || blankFn;

                plugins[ name ] = obj;
                return klass;
            },

            /**
             * @name option
             * @grammar klass.option(option, value, method)
             * @desc ���������������
             */
            option: function( option, value, method ) {
                var options = record( klass, 'options' ) ||
                        record( klass, 'options', {} );

                options[ option ] || (options[ option ] = []);
                options[ option ].push([ value, method ]);

                return klass;
            },

            /**
             * @name inherits
             * @grammar klass.inherits({})
             * @desc �Ӹ���̳г�һ�����࣬���ᱻ�ҵ�gmu�����ռ�
             */
            inherits: function( obj ) {

                // ���� Sub class
                return createClass( name + 'Sub' + suid++, obj, klass );
            },

            /**
             * @name extend
             * @grammar klass.extend({})
             * @desc �����������
             */
            extend: function( obj ) {
                var proto = klass.prototype,
                    superProto = superClass.prototype;

                staticlist.forEach(function( item ) {
                    obj[ item ] = mergeObj( superClass[ item ], obj[ item ] );
                    obj[ item ] && (klass[ item ] = obj[ item ]);
                    delete obj[ item ];
                });

                // todo ��plugin��origin�߼�������һ��
                eachObject( obj, function( key, val ) {
                    if ( typeof val === 'function' && superProto[ key ] ) {
                        proto[ key ] = function() {
                            var $super = this.$super,
                                ret;

                            // todo ֱ����this.$super = superProto[ key ];
                            this.$super = function() {
                                var args = slice.call( arguments, 1 );
                                return superProto[ key ].apply( this, args );
                            };

                            ret = val.apply( this, arguments );

                            $super === undefined ? (delete this.$super) :
                                    (this.$super = $super);
                            return ret;
                        };
                    } else {
                        proto[ key ] = val;
                    }
                } );
            }
        } );

        klass.superClass = superClass;
        klass.prototype = Object.create( superClass.prototype );


        /*// �����ڷ�����ͨ��this.$super(name)�������ø����������磺this.$super('enable');
        object.$super = function( name ) {
            var fn = superClass.prototype[ name ];
            return $.isFunction( fn ) && fn.apply( this,
                    slice.call( arguments, 1 ) );
        };*/

        klass.extend( object );

        return klass;
    }

    /**
     * @method define
     * @grammar gmu.define( name, object[, superClass] )
     * @class
     * @param {String} name ������ֱ�ʶ����
     * @param {Object} object
     * @desc ����һ��gmu���
     * @example
     * ####�������
     * ```javascript
     * gmu.define( 'Button', {
     *     _create: function() {
     *         var $el = this.getEl();
     *
     *         $el.addClass( 'ui-btn' );
     *     },
     *
     *     show: function() {
     *         console.log( 'show' );
     *     }
     * } );
     * ```
     *
     * ####���ʹ��
     * html����
     * ```html
     * <a id='btn'>��ť</a>
     * ```
     *
     * javascript����
     * ```javascript
     * var btn = $('#btn').button();
     *
     * btn.show();    // => show
     * ```
     *
     */
    gmu.define = function( name, object, superClass ) {
        gmu[ name ] = createClass( name, object, superClass );
        zeptolize( name );
    };

    /**
     * @desc �ж�object�ǲ��� widgetʵ��, klass����ʱ��Ĭ��ΪBase����
     * @method isWidget
     * @grammar gmu.isWidget( anything[, klass] ) => Boolean
     * @param {*} anything ��Ҫ�жϵĶ���
     * @param {String|Class} klass �ַ��������ࡣ
     * @example
     * var a = new gmu.Button();
     *
     * console.log( gmu.isWidget( a ) );    // => true
     * console.log( gmu.isWidget( a, 'Dropmenu' ) );    // => false
     */
    gmu.isWidget = function( obj, klass ) {

        // �����ַ�����case
        klass = typeof klass === 'string' ? gmu[ klass ] || blankFn : klass;
        klass = klass || gmu.Base;
        return obj instanceof klass;
    };

    /**
     * @class Base
     * @description widget���ࡣ����ֱ��ʹ�á�
     */
    gmu.Base = createClass( 'Base', {

        /**
         * @method _init
         * @grammar instance._init() => instance
         * @desc ����ĳ�ʼ��������������Ҫ��д�÷���
         */
        _init: blankFn,

        /**
         * @override
         * @method _create
         * @grammar instance._create() => instance
         * @desc �������DOM�ķ�����������Ҫ��д�÷���
         */
        _create: blankFn,


        /**
         * @method getEl
         * @grammar instance.getEl() => $el
         * @desc ���������$el
         */
        getEl: function() {
            return this.$el;
        },

        /**
         * @method on
         * @grammar instance.on(name, callback, context) => self
         * @desc �����¼�
         */
        on: event.on,

        /**
         * @method one
         * @grammar instance.one(name, callback, context) => self
         * @desc �����¼���ִֻ��һ�Σ�
         */
        one: event.one,

        /**
         * @method off
         * @grammar instance.off(name, callback, context) => self
         * @desc ��������¼�
         */
        off: event.off,

        /**
         * @method trigger
         * @grammar instance.trigger( name ) => self
         * @desc �ɷ��¼�, ��trigger�����Ȱ�options�ϵ��¼��ص�������ִ��
         * options�ϻص���������ͨ������event.stopPropagation()����ֹ�¼�ϵͳ�����ɷ�,
         * ���ߵ���event.preventDefault()��ֹ�����¼�ִ��
         */
        trigger: function( name ) {
            var evt = typeof name === 'string' ? new gmu.Event( name ) : name,
                args = [ evt ].concat( slice.call( arguments, 1 ) ),
                opEvent = this._options[ evt.type ],

                // �ȴ�����������������ʹ�õ�ʱ�򣬿����Ѿ���destory��ɾ���ˡ�
                $el = this.getEl();

            if ( opEvent && $.isFunction( opEvent ) ) {

                // �������ֵ��false,�൱��ִ��stopPropagation()��preventDefault();
                false === opEvent.apply( this, args ) &&
                        (evt.stopPropagation(), evt.preventDefault());
            }

            event.trigger.apply( this, args );

            // triggerHandler��ð��
            $el && $el.triggerHandler( evt, (args.shift(), args) );

            return this;
        },

        /**
         * @method tpl2html
         * @grammar instance.tpl2html() => String
         * @grammar instance.tpl2html( data ) => String
         * @grammar instance.tpl2html( subpart, data ) => String
         * @desc ��template�����html�ַ����������� data ʱ��html��ͨ��$.parseTpl��Ⱦ��
         * template֧��ָ��subpart, ����subpartʱ��template����Ϊģ�壬����subpartʱ��
         * template[subpart]����Ϊģ�������
         */
        tpl2html: function( subpart, data ) {
            var tpl = this.template;

            tpl =  typeof subpart === 'string' ? tpl[ subpart ] :
                    ((data = subpart), tpl);

            return data || ~tpl.indexOf( '<%' ) ? $.parseTpl( tpl, data ) : tpl;
        },

        /**
         * @method destroy
         * @grammar instance.destroy()
         * @desc ע�����
         */
        destroy: function() {

            // ���element�ϵ��¼�
            this.$el && this.$el.off( this.eventNs );

            this.trigger( 'destroy' );
            // ��������Զ����¼�
            this.off();


            this.destroyed = true;
        }

    }, Object );

    // ���¼���
    $.ui = gmu;
})( gmu, gmu.$ );