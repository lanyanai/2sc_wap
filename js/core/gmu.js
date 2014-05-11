// Copyright (c) 2013, Baidu Inc. All rights reserved.
//
// Licensed under the BSD License
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://gmu.baidu.com/license.html
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @file ����gmu�����ռ�
 * @namespace gmu
 * @import zepto.js
*/

/**
 * GMU�ǻ���zepto��������mobile UI����⣬����jquery uiʹ�ù淶���ṩwebapp��pad�˼����õ�UI�����Ϊ�˼�С��������������ܣ�����ٲ����������iOS3+ / android2.1+��֧�ֹ��������ƶ������������safari, chrome, UC, qq�ȡ�
 * GMU�ɰٶ�GMUС�鿪�������ڿ�ԴBSDЭ�飬֧����ҵ�ͷ���ҵ�û������ʹ�ú������޸ģ�������ͨ��[get started](http://gmu.baidu.com/getstarted)�����˽⡣
 *
 * ###Quick Start###
 * + **������**http://gmu.baidu.com/
 * + **API��**http://gmu.baidu.com/doc
 *
 * ###��ʷ�汾###
 *
 * ### 2.0.5 ###
 * + **DEMO: ** http://gmu.baidu.com/demo/2.0.5
 * + **API��** http://gmu.baidu.com/doc/2.0.5
 * + **���أ�** http://gmu.baidu.com/download/2.0.5
 *
 * @module GMU
 * @title GMU API �ĵ�
 */
var gmu = gmu || {
    version: '@version',
    $: window.Zepto,

    /**
     * ���ô˷��������Լ�С�ظ�ʵ����Zepto�Ŀ���������ͨ���˷������õģ���������һ��Zeptoʵ����
     * ��������Zeptoʵ�������Ŀ��������ô˷�����
     * @method staticCall
     * @grammar gmu.staticCall( dom, fnName, args... )
     * @param  {DOM} elem Dom����
     * @param  {String} fn Zepto��������
     * @param {*} * zepto�ж�Ӧ�ķ���������
     * @example
     * // ����dom��className��dom2, ���õ���zepto�ķ���������ֻ��ʵ����һ��Zepto�ࡣ
     * var dom = document.getElementById( '#test' );
     *
     * var className = gmu.staticCall( dom, 'attr', 'class' );
     * console.log( className );
     *
     * var dom2 = document.getElementById( '#test2' );
     * gmu.staticCall( dom, 'addClass', className );
     */
    staticCall: (function( $ ) {
        var proto = $.fn,
            slice = [].slice,

            // ���ô�zeptoʵ��
            instance = $();

        instance.length = 1;

        return function( item, fn ) {
            instance[ 0 ] = item;
            return proto[ fn ].apply( instance, slice.call( arguments, 2 ) );
        };
    })( Zepto )
};