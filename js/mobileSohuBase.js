"use strict";
"undefined" == typeof window.SA && (window.SA = function ()
{
	var a = {},
	b = [],
	c = [],
	$ = Zepto;
	a.inc = function ()
    {
		return !0
	};
    //注册组件
	a.register = function (d, e)
    {
		for (var f = d.split("."), g = a, h = null; h = f.shift(); )
        {
			if (f.length)
            {
				void 0 === g[h] && (g[h] = {});//给a注册上事件，void 0返回undefine
				g = g[h];//
			}
            else
            {
				if (void 0 === g[h])
                {
                    g[h] = e(a, $);//执行e
                    c.push(d);//组件字符串
				}
			}
		}
	};
    //解除注册组件
	a.unregister = function (n)
    {
		for (var b = 0, f = c.length; b < f; b += 1)
        {
			if (c[b] === n)
            {
				for (var f = n.split("."), g = a, h = null; h = f.shift(); )
                {
					if (f.length)
                    {
						void 0 === g[h] && (g[h] = {});
						g = g[h];
					}
                    else
                    {
						if (void 0 !== g[h])
                        {
							g[h] = void 0;
						}
					}
				}
				return c[b] = null,
				c.splice(b, 1),
				!0
			}
		}
		return 0;//没找到返回0
	};

    a.checkRegister = function (a) {
		for (var b = 0, f = c.length; b < f; b += 1) {
			if (c[b] === a) {
				return !0
			}
		}
		return !1
	};
	a.regShort = function (b, c) {
		if (void 0 !== a[b]) {
			throw "[" + b + "] : short : has been register"
		}
		a[b] = c
	};
	a.log = function (m, c, l, t) {
		var z = [m, l || "error", c || "system", t || (new Date).getTime()];
		b.push(z);
		if (a.DEBUG) {
			try {
				console.log(z)
			} catch (e) {}

		}
	};
	a.getLogList = function (a) {
		return b.splice(0, a || b.length)
	};
	a.IE = $.browser.msie;
	return a
}
	());
SA.DEBUG = false;
SA.global = this;
SA.register("empty", function (a, $) {
	return function () {}
});
SA.register("templet",function(){return function(a,b){return a.replace(/\#\<(.+?)\>/gi,function(a,d){for(var e=d.replace(/\s/gi,""),f=a,e=e.split("||"),g=0,h=e.length;g<h;g+=1){if(/^default:.*$/.test(e[g])){f=e[g].replace(/^default:/,"");break}if(void 0!==b[e[g]]){f=b[e[g]];break}}return f})}});
SA.register("ui.tab",function(g,c){var d=function(a){a=this.tabs.index(a);a!=this.index&&(this.index=a,this.currentTab&&this.currentTab.removeClass("cur"),this.currentTab=this.tabs.eq(a).addClass("cur"),this.currentContent&&this.currentContent.hide(),this.currentContent=this.contents.eq(a).show())};return function(a,e,f){var b=this;this.change=d;this.tabs=c(a).children();this.contents=c(e).children();this.index=f?this.tabs.index(this.tabs.filter(".cur")):0;this.currentTab=this.tabs.eq(this.index); this.currentContent=this.contents.eq(this.index);this.time=null;this.tabs.mouseover(function(){window.beginTime=(new Date).getTime();b.time&&clearTimeout(b.time);var a=this;b.time=setTimeout(function(){b.change(a)},100)}).mouseout(function(){clearTimeout(b.time)})}});
SA.register("util.getUniqueKey", function () {
	var a = (new Date).getTime().toString(),
	b = 1;
	return function () {
		return a + b++
	}
});
SA.register("scriptLoader", function (a, $) {
	var b = {},
	c = {
		url : "",
		charset : "gb2312",
		timeout : 3e4,
		onComplete : a.empty,
		onTimeout : a.empty,
		isEncode : !1,
		uniqueID : null
	};
	return function (option) {
		var e,
		f,
		g = $.extend({}, c, option);
		if ("" == g.url) {
			throw "scriptLoader: url is null"
		}
		var d = g.uniqueID || a.util.getUniqueKey();
		e = b[d];
		null != e && !0 != a.IE && ($(e).remove(), e = null);
		null == e && (e = b[d] = document.createElement("script"));
		e.charset = g.charset;
		e.id = "scriptRequest_script_" + d;
		e.type = "text/javascript";
		null != g.onComplete && (a.IE ? e.onreadystatechange = function () {
			if ("loaded" == e.readyState.toLowerCase() || "complete" == e.readyState.toLowerCase()) {
				try {
					clearTimeout(f),
					document.getElementsByTagName("head")[0].removeChild(e),
					e.onreadystatechange = null
				} catch (a) {}
				g.onComplete()
			}
		}
			 : e.onload = function () {
			try {
				clearTimeout(f),
				$(e).remove()
			} catch (b) {}
			g.onComplete()
		});
		e.src = g.url;
		document.getElementsByTagName("head")[0].appendChild(e);
		0 < g.timeout && (f = setTimeout(function () {
					try {
						document.getElementsByTagName("head")[0].removeChild(e)
					} catch (a) {}
					g.onTimeout()
				}, g.timeout));
		return e
	}
});
SA.register("util.cookie",function(){var a={set:function(c,a,f){var h=[];f=$.extend({},{expire:null,path:"/",domain:null,secure:null,encode:!0},f);!0==f.encode&&(a=escape(a));h.push(c+"="+a);null!=f.path&&h.push("path="+f.path);null!=f.domain&&h.push("domain="+f.domain);null!=f.secure&&h.push(f.secure);null!=f.expire&&(c=new Date,a=c.getTime()+36E5*f.expire,c.setTime(a),h.push("expires="+c.toGMTString()));document.cookie=h.join(";")},get:function(a){a=a.replace(/([\.\[\]\$])/g,"\\$1");return(a=(document.cookie+ ";").match(RegExp(a+"=([^;]*)?;","i")))?a[1]||"":""},remove:function(c,e){e=e||{};e.expire=-10;a.set(c,"",e)}};return a});
SA.register("util.addFavorite",function(a){return function(c,e){c=c||window.location.href;e=e||window.document.title;try{document.all?window.external.addFavorite(c,e):alert("请使用快捷键Ctrl+D进行收藏")}catch(f){a.log(f,"util.addFavorite")}}}); 
SA.register('ui.blink',function(a,$){
    return function( $el ){
        var self=this;
        this.$el=$el.removeClass('inputno');
        this.n=6;
        this.i=150;
        this.t=setInterval(function(){
            self.n--;
            if(self.n<=0){
                self.$el.removeClass('ui-blink');
                clearInterval(self.t);
            }else{
                self.$el.toggleClass('ui-blink');
            }
        },this.i);
        clearInterval( $el.data( 'blink.t' ) );
        $el.data( 'blink.t', this.t );
    }
});
SA.register("ui.menuSelect",function(a,$){
	
	var els=[],group=[];
	
	var Menu=function( el, groupName, groupIndex, dropHeight ){
		var $el=typeof el=='string' ? $(el) : el
            , $menuList=$el.find('>.menu-list') ;
		var self=this;
		if( !$el.length ) return;
		
        self.dropHeight= dropHeight || parseInt( $menuList.css('height') ) || 240;
		

		if( typeof groupName=='string' && typeof groupIndex=='number' ){
			typeof group[groupName]=='undefined'&&( group[groupName]=[] );
			group[groupName][groupIndex]=this;
			this.groupName=groupName;
			this.groupIndex=groupIndex;
            this.isSingle=false;
		}else{
            this.isSingle=true;
        }
		this.$el=$el;
		this.isActive=false;
		this.isActiveTime=null;
		
		els.push( this );
		
		$menuList.find('ul:first').delegate(".option","click",function(event){
			var option=$(this);
			var name=option.find('span.item-text').text();
			var value=option.attr("value");
			if(value=="") return;
			
			option.closest('ul').find('li').removeClass('current');
			option.parent().addClass('current')
			
			$el.children(".menu-name").html(name).attr("value",value);
			$el.trigger("change",[{name:name,value:value,$el:option}]);
		});
		//$menuList.click(function(e){
		//	return $(e.target).closest('.option', this).length==1;
		//});
		$el.click(function(e){
			self.isActive=true;
			self.isActiveTime&&clearTimeout(self.isActiveTime);
			self.isActiveTime=setTimeout(function(){ self.isActive=false; },50);
			//clearMenu(this);
			if( $el.hasClass('disabled') && self.groupName ){
				runBlink( self, false );
				return;
			};
            var isShow= !$el.hasClass('ui-select-active');
			$el.toggleClass('ui-select-active');

            if( isShow ){
                $menuList.css({height:'auto'});
                $menuList[0].scrollHeight > self.dropHeight && $menuList.css('height', self.dropHeight );
            }
		});
		$el.bind('ui.menu.checkvalue',function(){
			runBlink( self, true );
		});
	}
	
	function clearMenu(){
		for(var i=0,j=els.length;i<j;i++){
			!els[i].isActive && els[i].$el.removeClass('ui-select-active');
		}
	}
	
	function runBlink( obj, checkAll ){
		if( obj.isSingle ){      //检查单个menu
            obj.$el.hasClass('novalue') && new a.ui.blink( obj.$el );
        }else{
            var g=obj.groupName && group[obj.groupName]
                , groupIndex=obj.groupIndex;
            for(var i=0,j=g.length; i<j; i++){
                if( (checkAll||i<groupIndex) &&g[i].$el.hasClass('novalue')){
                    new a.ui.blink( g[i].$el );
                }
            }
        }
	}

	$(document).bind('click.menu',function(){clearMenu();});

	return Menu;
});


SA.register('ui.menu',function(a,$){
	var menus=[];
	function closeMenu()
	{
		for(var i=0;i<menus.length;i++){
			menus[i].hide();
		}
	}
	$(document).bind('click.menu',closeMenu);

	function menu( $wrapper )
	{
		this.E={};
		this.isIntWidth=false;
		this.E={
			$wrapper:$wrapper,
			$menu:$wrapper.find('>div.sMenu'),
			$text:$wrapper.find('h3'),
			$bg:$wrapper.children('div.tBg')
		};
		var self=this;

		var $menu=this.E.$menu,$wrapper=this.E.$wrapper,$text=this.E.$text;

		$wrapper.click(function(e){
			self.show();
			return false;
		});

		$menu.click(function(e){
			var $target=$(e.target);
			if(!$target.attr('data-id')) return;

			$text.text( $.trim( $target.text().replace('&nbsp;','') ) );

			$wrapper.trigger('change',[$target.attr('data-id'),$target.attr('data-index'),self,$target] );

			self.hide();
			return false;
		});
		menus.push( this );
	}
	menu.prototype={
		show:function(){
			var $bg=this.E.$bg,$menu=this.E.$menu,$wrapper=this.E.$wrapper;
			closeMenu();

			$menu.removeClass("hasScroll").css('width','auto');

			$menu.width($wrapper.width()-10>$menu.width() ? $wrapper.outerWidth() : $menu.width()+20 );
			$menu.height()>300 ? $menu.addClass("hasScroll") : $menu.removeClass("hasScroll");

			$menu.show();
			$bg.css({"width":$menu.width(),"height":$menu.height(),"opacity":.2}).show()

			$wrapper.addClass('selShow');
		},
		hide:function(){
			this.E.$menu.hide();
			this.E.$bg.hide();
			this.E.$wrapper.removeClass('selShow');
		}
	};
	return menu;
});


SA.register("app.carSelect",function(a,$){
	
	var trims=[]
		, first=true
		, useIndex=0;

	var Data=function( url ){ this.url=url;}
	Data.prototype={
			cache:{
				brands:null,
				models:{},
				trims:{}
			},
			status:{
				init:false,
				list:[]
			},
			getBrand:function(callBack){
				var self=this;
				if( this.cache['brands'] ){
					callBack(this.cache['brands']);
				}else{
					this.status.list.push(callBack);
					if( !this.status.init ){
						this.status.init=true;
						a.scriptLoader({
							url : self.url.brand,
							onComplete : function() {
								self.cache['brands']=[];
								var json = window.brandMods;
								var ch =/^[a-zA-Z]{1}/;
								for(var i=0, len =json.length;i<len;i++){
									self.cache['brands'].push({i:json[i].i,n:json[i].n});
									self.cache['models'][json[i].i] = { l:json[i].s, i:json[i].i };
								}
								for(var i=0, j=self.status.list.length; i<j; i++){
									self.status.list[i](self.cache['brands']);
								}
							}
						})
					}
				}
			},
			getModel:function(bid,callBack){
				var self=this;
				if( !bid||bid=='-1' ){
					callBack([]);
				}else{
					this.cache['models'][bid] ? callBack(this.cache['models'][bid]) : callBack([]); 
				}
			},
			getTrim:function(mid,callBack){
				var self=this;
				if( !mid||mid=='-1' ){
					callBack([]);
				}else{
					this.cache['trims'][mid] ? callBack(this.cache['trims'][mid]) : 
					$.getJSON(self.url.trim, {modelid:mid}, function(json){
						var data=json.l;
						data=data.sort(function(a,b){
							return b.y-a.y;
						})
						self.cache['trims'][mid]=data;
						callBack(data);
					});
				}
			}
	}

	var view={
		renderBrand:function(data){
			var self=this
				, name=this.option.bText
				, options='<li><i class="item-index">A</i>'
				, id=this.current.brand.value||-1
				, index='A'
				, lastIndex='A'
				, indexHtml=''
				, brandName='';
			$(data).each(function(i,v){
				index=v.n.split(' ')[0]
				, brandName=v.n.split(' ')[1];
				if( index==lastIndex ){
					options+='<a href="javascript:void(0)" class="option" title="'+brandName+'" value="'+v.i+'">'+indexHtml+'<span class="item-text">'+brandName+'</span></a>';
				}else{
					options+='</li><li><i class="item-index">'+index+'</i><a href="javascript:void(0)" class="option" title="'+brandName+'" value="'+v.i+'">'+indexHtml+'<span class="item-text">'+brandName+'</span></a>'
				}
				if( id==v.i ){
					name=brandName;
				}
				lastIndex=index;
			});
			options+='</li>';
			self.E.$brand.find('ul:first').html(options);
			self.E.$brand.find('>.menu-name').text(name);
			
		},
		renderModel:function(data){
			var self=this
			, id=self.current.model.value||-1
			, name=this.option.mText;
			var options='<li><span class="item-sep" value="0">'+name+'</span></li>';

			$(data.l).each(function(i,v){
		        options+='<li><span class="item-group">'+v.n+'</span></li>';
		        $(v.b).each(function(i,v){
					options+='<li><a href="javascript:void(0)" class="option" title="'+v.n+'" value="'+v.i+'"><span class="item-text">'+v.n+'</span></a></li>';
					if( id==v.i ){
						name=v.n;
					}
				});
			});
			self.E.$model.find('ul:first').html(options);
			self.E.$model.find('>.menu-name').text(name);

		},
		renderTrim:function(data){
			var self=this
				, id=self.current.trim.value||-1
				, name=this.option.tText
				, options='<li><span class="item-sep" value="0">'+name+'</span></li>'
				, groups=''
				, first=true;

			//@todo 年款匹配	
			$(data).each(function(i,v){
				if( $(v.t).length ){
					groups+='<li'+(first?' class="cur"':'')+'><a href="javascript:void(0)" class="item-group">'+v.y+'</a></li>';
					options+=first?'<div>':'<div style="display:none;">'
					$(v.t).each(function(i,t){
						options+='<li><a href="javascript:void(0)" class="option" title="'+t.n+'" value="'+v.y+'|'+t.i+'"><span class="item-text">'+t.n+'</span></a></a></li>';
						if( id==t.i ){
							name=t.n;
						}
					});
					options+='</div>'
					first=false;
				}
			});
			self.E.$trim.find('div.years:first').html(groups);
			self.E.$trim.find('ul:first').html(options);
			self.E.$trim.find('>.menu-name').text(name);

		}
	};
	var carSelect=function(option){
		
		this.option=$.extend({},this.defaultOption,option);
		this.current={
				brand:{ name:'', value:this.option.bid },
				model:{ name:'', value:this.option.mid },
				year:{ name:'', value:this.option.yid },
				trim:{ name:'', value:this.option.tid }
		};
		
		var self=this,o=this.option;
		
		this.E={
			$brand:$(o.b),
			$model:$(o.m),
			$trim:$(o.t)
		};
		
		var groupName='carSelect'+useIndex;
		
		new a.ui.menuSelect( this.E.$brand, groupName, 0, 376 );
		new a.ui.menuSelect( this.E.$model, groupName, 1, 376 );
		new a.ui.menuSelect( this.E.$trim, groupName, 2, 376 );
		
		useIndex++;
		
		this.E.$brand.change(function(event,data){
			self.current.brand=data;
			self.onModelChange();
			self.option.onChange.call(self,'brand',self.current.brand);
			self.current.select='brand';
			
			data.value&&data.value!='-1' ? self.E.$brand.removeClass('novalue') : self.E.$brand.addClass('novalue');
			data.value&&data.value!='-1' ? self.E.$model.removeClass('disabled') : self.E.$model.addClass('disabled');
			return false;
		});
		this.E.$model.change(function(event,data){
			self.current.model=data;
			self.onTrimChange();
			self.option.onChange.call(self,'model',self.current.model);
			self.current.select='model';
			
			data.value&&data.value!='-1' ? self.E.$model.removeClass('novalue') : self.E.$model.addClass('novalue');
			data.value&&data.value!='-1' ? self.E.$trim.removeClass('disabled') : self.E.$trim.addClass('disabled');
			return false;
		});
		
		this.E.$trim.length && (function(){
		
			self.E.$trim.change(function(event,data){
				if( data ){
					var v=data.value.split('|');
					self.current.year={name:v[0],value:v[0]};
					data.value=v[1];
					self.current.trim=data;
				}else{
					self.current.year={name:'',value:-1};
					self.current.trim={name:'',value:-1};
				}
				self.option.onChange.call(self,'trim',self.current.trim);
				self.current.select='trim';
				
				data.value&&data.value!='-1' ? self.E.$trim.removeClass('novalue') : self.E.$trim.addClass('novalue');
				return false;
			});
			
			var $year=self.E.$trim.find('div.years'),
				$list=self.E.$trim.find('div.trim-list');
			
			$year.delegate('li','mouseover',function(e){
				e.stopPropagation();
				var $this=$(this)
				, $children=$year.children()
				, index=$children.index(this)
				;
				
				$children.removeClass('cur').eq(index).addClass('cur');
				$list.find('div').hide().eq(index).show();
				
			});
			$year.click(function(){
				return false;
			});
		})();
		
		this.Data=new Data( this.option.url );
		this.View=this.option.view;
		
		this.Data.getBrand(function(data){
			self.View.renderBrand.call(self,data);
			
			self.current.brand.value&&self.current.brand.value!='-1' ? self.E.$brand.removeClass('novalue') : self.E.$brand.addClass('novalue');
			self.current.brand.value&&self.current.brand.value!='-1' ? self.E.$model.removeClass('disabled') : self.E.$model.addClass('disabled');
			
			self.Data.getModel(self.current.brand.value,function(data){
				self.View.renderModel.call(self,data);
				
				self.current.model.value&&self.current.model.value!='-1' ? self.E.$model.removeClass('novalue') : self.E.$model.addClass('novalue');
				self.current.model.value&&self.current.model.value!='-1' ? self.E.$trim.removeClass('disabled') : self.E.$trim.addClass('disabled');
			
				self.E.$trim.length && self.Data.getTrim(self.current.model.value,function(data){
					self.View.renderTrim.call(self,data);
					
					self.current.trim.value&&self.current.trim.value!='-1' ? self.E.$trim.removeClass('novalue') : self.E.$trim.addClass('novalue');
				})
			})
		});
	};
	carSelect.prototype={
		defaultOption:{
			b:'',
			bid:'-1',
			bText:'选择品牌',
			m:'',
			mid:'-1',
			mText:'选择车型',
			t:'',
			yid:'-1',
			tid:'-1',
			tText:'选择车款',
			url:{
				brand:'http://2sc.sohu.com/js/new_model.js',
				trim:'/util/getTrimmModelListJson.jsp'
			},
			onChange:function(){},
			view:view
		},
		onBrandChange:function(event,data){
			this.current.brand=data||{};
			this.option.onChange.call(this,'brand',this.current.brand);
			this.onModelChange();
		},
		onModelChange:function(event,data){
			var self=this;
			this.current.model=data||{};
			this.Data.getModel(this.current.brand?this.current.brand.value:0,function(json){

				self.View.renderModel.call(self,json);
				
				self.option.onChange.call(self,'model',self.current.model);
				self.onTrimChange();
			});
			
		},
		onTrimChange:function(event,data){
            if( !this.E.$trim.length ) return;
			var self=this;
			this.current.trim=data||{};
			this.Data.getTrim(this.current.model?this.current.model.value:0,function(json){
				
				self.View.renderTrim.call(self,json) 
				self.option.onChange.call(self,'trim',self.current.trim);
			});
			
		},
		clear:function(){
			this.E.$brand.find('.menu-name').text( this.option.bText );
			this.E.$brand.find('ul:first').children().removeClass('current');
			this.E.$brand.trigger("change",[{name:'',value:''}]);
		}
	}
	return carSelect;
});

SA.register('DATA.AREA',function(a,$){
	var areas=[["北京","bj,110000"],
		["天津","tj,120000"],
		["河北","hb,130000","石家庄","sjz,130100","唐山","tangshan,130200","秦皇岛","qinhuangdao,130300","邯郸","handan,130400","邢台","xingtai,130500","保定","baoding,130600","张家口","zhangjiakou,130700","承德","chengde,130800","沧州","cangzhou,130900","廊坊","langfang,131000","衡水","hengshui,131100"],
		["山西","shanxi,140000","太原","ty,140100","大同","datong,140200","阳泉","yangquan,140300","长治","changzhi,140400","晋城","jincheng,140500","朔州","shuozhou,140600","晋中","jinzhong,140700","运城","yuncheng,140800","忻州","xinzhou,140900","临汾","linfen,141000","吕梁","lvliang,141100"],
		["内蒙古","nmg,150000","呼和浩特","hhht,150100","包头","baotou,150200","乌海","wuhai,150300","赤峰","chifeng,150400","通辽","tongliao,150500","鄂尔多斯","eerduosi,150600","呼伦贝尔","hulunbeier,150700","巴彦淖尔","bayannaoer,150800","乌兰察布","wulanchabu,150900","兴安盟","xinganmeng,152200","锡林郭勒","xilinguolemeng,152500","阿拉善","alashanmeng,152900"],
		["辽宁","ln,210000","沈阳","sy,210100","大连","dl,210200","鞍山","anshan,210300","抚顺","fushun,210400","本溪","benxi,210500","丹东","dandong,210600","锦州","jinzhou,210700","营口","yingkou,210800","阜新","fuxin,210900","辽阳","liaoyang,211000","盘锦","panjin,211100","铁岭","tieling,211200","朝阳市","chaoyangshi,211300","葫芦岛","huludao,211400"],
		["吉林","jl,220000","长春","cc,220100","吉林市","jilin,220200","四平","siping,220300","辽源","liaoyuan,220400","通化","tonghua,220500","白山","baishan,220600","松原","songyuan,220700","白城","baicheng,220800","延边","ybcxz,222400"],
		["黑龙江","hlj,230000","哈尔滨","hrb,230100","齐齐哈尔","qiqihaer,230200","鸡西","jixi,230300","鹤岗","hegang,230400","双鸭山","shuangyashan,230500","大庆","daqing,230600","伊春","yichunshi,230700","佳木斯","jiamusi,230800","七台河","qitaihe,230900","牡丹江","mudanjiang,231000","黑河","heihe,231100","绥化","suihua,231200","大兴安岭","dxaldq,232700"],
		["上海","sh,310000"],
		["江苏","js,320000","南京","nj,320100","无锡","wuxi,320200","徐州","xuzhou,320300","常州","changzhou,320400","苏州","suzhou,320500","南通","nantong,320600","连云港","lianyungang,320700","淮安","huaian,320800","盐城","yancheng,320900","扬州","yangzhou,321000","镇江","zhenjiang,321100","泰州","jstaizhou,321200","宿迁","suqian,321300"],
		["浙江","zj,330000","杭州","hz,330100","宁波","ningbo,330200","温州","wenzhou,330300","嘉兴","jiaxing,330400","湖州","huzhou,330500","绍兴","shaoxing,330600","金华","jinhua,330700","衢州","quzhou,330800","舟山","zhoushan,330900","台州","taizhou,331000","丽水","lishui,331100"],
		["安徽","ah,340000","合肥","hf,340100","芜湖","wuhu,340200","蚌埠","bengbu,340300","淮南","huainan,340400","马鞍山","maanshan,340500","淮北","huaibei,340600","铜陵","tongling,340700","安庆","anqing,340800","黄山","huangshan,341000","滁州","chuzhou,341100","阜阳","fuyang,341200","宿州","ahsuzhou,341300","巢湖","chaohu,341400","六安","liuan,341500","亳州","bozhou,341600","池州","chizhou,341700","宣城","xuancheng,341800"],
		["福建","fj,350000","福州","fz,350100","厦门","xiamen,350200","莆田","putian,350300","三明","sanming,350400","泉州","quanzhou,350500","漳州","zhangzhou,350600","南平","nanping,350700","龙岩","longyan,350800","宁德","ningde,350900"],
		["江西","jx,360000","南昌","nc,360100","景德镇","jingdezhen,360200","萍乡","pingxiang,360300","九江","jiujiang,360400","新余","xinyu,360500","鹰潭","yingtan,360600","赣州","ganzhou,360700","吉安","jian,360800","宜春","yichun,360900","抚州","fuzhou,361000","上饶","shangrao,361100"],
		["山东","sd,370000","济南","jn,370100","青岛","qd,370200","淄博","zibo,370300","枣庄","zaozhuang,370400","东营","dongying,370500","烟台","yantai,370600","潍坊","weifang,370700","济宁","jining,370800","泰安","taian,370900","威海","weihai,371000","日照","rizhao,371100","莱芜","laiwu,371200","临沂","linyi,371300","德州","dezhou,371400","聊城","liaocheng,371500","滨州","binzhou,371600","菏泽","heze,371700"],
		["河南","hn,410000","郑州","zz,410100","开封","kaifeng,410200","洛阳","luoyang,410300","平顶山","pingdingshan,410400","安阳","anyang,410500","鹤壁","hebi,410600","新乡","xinxiang,410700","焦作","jiaozuo,410800","濮阳","puyang,410900","许昌","xuchang,411000","漯河","luohe,411100","三门峡","sanmenxia,411200","南阳","nanyang,411300","商丘","shangqiu,411400","信阳","xinyang,411500","周口","zhoukou,411600","驻马店","zhumadian,411700"],
		["湖北","hubei,420000","武汉","wx,420100","黄石","huangshi,420200","十堰","shiyan,420300","宜昌","yichang,420500","襄阳","xiangfan,420600","鄂州","ezhou,420700","荆门","jingmen,420800","孝感","xiaogan,420900","荆州","jingzhou,421000","黄冈","huanggang,421100","咸宁","xianning,421200","随州","suizhou,421300","恩施","estjzmz,422800","仙桃","xiantao,429004","潜江","hbqianjiang,429005","天门","tianmen,429006"],
		["湖南","hunan,430000","长沙","cs,430100","株洲","zhuzhou,430200","湘潭","xiangtan,430300","衡阳","hengyang,430400","邵阳","shaoyang,430500","岳阳","yueyang,430600","常德","changde,430700","张家界","zhangjiajie,430800","益阳","yiyang,430900","郴州","chenzhou,431000","永州","yongzhou,431100","怀化","huaihua,431200","娄底","loudi,431300","湘西","xxtjzmz,433100"],
		["广东","gd,440000","广州","gz,440100","韶关","shaoguan,440200","深圳","sz,440300","珠海","zhuhai,440400","汕头","shantou,440500","佛山","foshan,440600","江门","jiangmen,440700","湛江","zhanjiang,440800","茂名","maoming,440900","肇庆","zhaoqing,441200","惠州","huizhou,441300","梅州","meizhou,441400","汕尾","shanwei,441500","河源","heyuan,441600","阳江","yangjiang,441700","清远","qingyuan,441800","东莞","dongguan,441900","中山","zhongshan,442000","潮州","chaozhou,445100","揭阳","jieyang,445200","云浮","yunfu,445300"],
		["广西","gx,450000","南宁","nn,450100","柳州","liuzhou,450200","桂林","guilin,450300","梧州","wuzhou,450400","北海","beihai,450500","防城港","fangchenggang,450600","钦州","qinzhou,450700","贵港","guigang,450800","玉林","yulinshi,450900","百色","baise,451000","贺州","hezhou,451100","河池","hechi,451200","来宾","laibin,451300","崇左","chongzuo,451400"],
		["海南","hainan,460000","海口","haikou,460100","三亚","sanya,460200","五指山","wuzhishan,469001","琼海","qionghai,469002","儋州","danzhou,469003","文昌","wenchang,469005","万宁","wanning,469006","东方","dongfang,469007","定安","dingan,469025","屯昌","tunchang,469026","澄迈","chengmai,469027","临高","lingao,469028","白沙","bslz,469030","昌江","cjlz,469031","乐东","ldlz,469033","陵水","lslz,469034","保亭","btlzmz,469035","琼中","qzlzmz,469036","西沙","xisha,469037","南沙","nansha,469038"],
		["重庆","cq,500000"],
		["四川","sc,510000","成都","cd,510100","自贡","zigong,510300","攀枝花","panzhihua,510400","泸州","luzhou,510500","德阳","deyang,510600","绵阳","mianyang,510700","广元","guangyuan,510800","遂宁","suining,510900","内江","neijiang,511000","乐山","leshan,511100","南充","nanchong,511300","眉山","meishan,511400","宜宾","yibin,511500","广安","guangan,511600","达州","dazhou,511700","雅安","yaan,511800","巴中","bazhong,511900","资阳","ziyang,512000","阿坝","abzzqz,513200","甘孜","gzzz,513300","凉山","lsyz,513400"],
		["贵州","guizhou,520000","贵阳","gy,520100","六盘水","liupanshui,520200","遵义","zunyi,520300","安顺","anshun,520400","铜仁","tongren,522200","黔西南","qxnbyzmz,522300","毕节","bijie,522400","黔东南","qdnmzdz,522600","黔南","qnbyzmz,522700"],
		["云南","yn,530000","昆明","km,530100","曲靖","qujing,530300","玉溪","yuxi,530400","保山","baoshanshi,530500","昭通","zhaotong,530600","丽江","lijiang,530700","思茅","simao,530800","临沧","lincang,530900","楚雄","cxyz,532300","红河","hhhnzyz,532500","文山","wszzmz,532600","西双版纳","xsbndz,532800","大理","dlbz,532900","德宏","dhdzjpz,533100","怒江","njlsz,533300","迪庆","dqzz,533400"],
		["西藏","xz,540000","拉萨","lasa,540100","昌都","changdou,542100","山南","shannan,542200","日喀则","rikaze,542300","那曲","neiqu,542400","阿里","ali,542500","林芝","linzhi,542600"],
		["陕西","sx,610000","西安","xa,610100","铜川","tongchuan,610200","宝鸡","baoji,610300","咸阳","xianyang,610400","渭南","weinan,610500","延安","yanan,610600","汉中","hanzhong,610700","榆林","yulin,610800","安康","ankang,610900","商洛","shangluo,611000"],
		["甘肃","gs,620000","兰州","lz,620100","嘉峪关","jiayuguan,620200","金昌","jinchang,620300","白银","baiyin,620400","天水","tianshui,620500","武威","wuwei,620600","张掖","zhangye,620700","平凉","pingliang,620800","酒泉","jiuquan,620900","庆阳","qingyang,621000","定西","dingxi,621100","陇南","longnan,621200","临夏","lxhz,622900","甘南","gnzz,623000"],
		["青海","qh,630000","西宁","xn,630100","海东","haidong,632100","海北","hbzz,632200","黄南","huangnanzz,632300","海南藏族","hnzz,632500","果洛","glzz,632600","玉树","yszz,632700","海西","hxmg,632800"],
		["宁夏","nx,640000","银川","yc,640100","石嘴山","shizuishan,640200","吴忠","wuzhong,640300","固原","guyuan,640400","中卫","zhongwei,640500"],
		["新疆","xj,650000","乌鲁木齐","wlmq,650100","克拉玛依","kelamayi,650200","吐鲁番","tulufan,652100","哈密","hami,652200","昌吉","cjhz,652300","博尔塔拉","betlmg,652700","巴音郭楞","byglmg,652800","阿克苏","akesu,652900","克孜勒苏","kzlskekz,653000","喀什","kashen,653100","和田","hetian,653200","伊犁","ylhsk,654000","塔城","tacheng,654200","阿勒泰","aletai,654300","石河子","shihezi,659001","阿拉尔","alaer,659002","图木舒克","tumushuke,659003","五家渠","wujiaqu,659004"],
		["台湾","tw,710000"],
		["香港","xg,810000"],
		["澳门","am,820000"]]
	return areas;
});


/*
* 
* 地区选择
*
*/
SA.register('app.areaSelect',function(a,$){
	var useIndex=0;
	var areaSelect=function(option){
		var _default={
			p:'#province',
			c:'#city',
			pid:'-1',
			cid:'-1',
			onChange:function(){},
			pText:'选择地区',
			cText:'选择城市',
			areas:a.DATA.AREA
		};
		var o=$.extend({},_default,option);

		var $province=$(o.p),
			$city=$(o.c),
			onChange=o.onChange||function(){},
			pTxt=o.pText,
			cTxt=o.cText,
			areas=o.areas;

		var $pTxt=$province.find('>span.menu-name');
		var $pMenuList=$province.find('ul:first');

		var $cTxt=$city.find('>span.menu-name');
		var $cMenuList=$city.find('ul:first');
		
		var cityDataIndex=0;
		function showProvince(id){
			var txt=pTxt;
			var chip=[''];
			for (var i=areas.length-1,j=0; j<i; j++)
			{
				var nt=areas[j][1].split(',');
				if( id==nt[1] ){
					txt=areas[j][0];
					cityDataIndex=j;
				}
				chip.push('<li><a class="option" data-index="'+j+'" data-name="'+nt[0]+'" value="'+nt[1]+'" href="javascript:void(0)"><span class="item-text">'+areas[j][0]+'</span></a></li>');
			}
			chip[0]='<li><span class="item-sep">'+pTxt+'</span></li>';
			$pMenuList.html( chip.join("\r\n") );
			$pTxt.text( txt );
			
			id&&id!='-1' && $province.removeClass('novalue');
			id&&id!='-1' && $city.removeClass('disabled');
		}

		function showCity(index,id){
			var txt=cTxt;
			var chip=[''];
			for (var i=areas[index]?areas[index].length:0,j=2; j<i; j+=2)
			{
				var nt=areas[index][j+1].split(',');
				if( id==nt[1] )
					txt=areas[index][j];
				chip.push('<li><a class="option" data-name="'+nt[0]+'" value="'+nt[1]+'" href="javascript:void(0)"><span class="item-text">'+areas[index][j]+'</span></a></li>');
			}
			chip[0]='<li><span class="item-sep">'+cTxt+'</span></li>';
			$cMenuList.html( chip.join("\r\n") );
			chip.length==1 ? $city.hide() : $city.show();
			$cTxt.text( txt );
			
			id&&id!='-1' && $province.removeClass('novalue');
		}

		$province.bind('change',function(e,data){
			showCity( data.$el.attr('data-index') );
			data.value=='-1' ? $city.addClass('disabled') : $city.removeClass('disabled');
			onChange('province',data);
		});

		$city.bind('change',function(e,data){
			onChange('city',data);
		});

		var groupName='areaSelect'+useIndex;
		
		new a.ui.menuSelect( $province, groupName, 0 );
		new a.ui.menuSelect( $city, groupName, 1 );
		
		useIndex++;

		showProvince( o.pid );
		if(o.pid!='-1'){
			showCity( cityDataIndex, o.cid );
		}
	}
	return areaSelect;
});

SA.register('util.soip',function(a,$){
	var url='http://txt.go.sohu.com/ip/soip',
		list=[],
		isGet=false,isLoad=false;
	function ipLoaded(){
		for(var i=0,j=list.length;i<j;i++){
			try{ list[i]() }catch(e){}
		}
	}
	function getIp(){
		if(isGet) return;
		isGet=true;
		if( typeof(window.sohu_IP_Loc)=="undefined" ){
			a.scriptLoader({
				url:url,
				onComplete:function(){
					isLoad=true;
					ipLoaded();
				}
			});
		}else{
			isLoad=true;
			ipLoaded();
		}
	}
	return function( func ){
		if( isLoad ){
			func();
		}else{
			getIp();
			list.push( func );
		}
	}
});

SA.register('app.iplocation',function(a,$){
	var Config={url:'http://txt.go.sohu.com/ip/soip'},
		area=a.DATA.AREA,
		baseUrl='/';

	function getItemByCode( code ){
		var nt='',nt2='';
		if( !/^[0-9]+$/.test(code) ) return null;
		for( var i=0,j=area.length; i<j; i++ ){
			nt=area[i][1].split(',');
			if( nt[1].indexOf(code)==0 ){
				return { name:area[i][0], path:nt[0], code:nt[1] };
				break;
			}else{
				var d=area[i];
				for( var x=2,y=d.length; x<y; x+=2 ){
					nt2=d[x+1].split(',');
					if( nt2[1].indexOf(code)==0 ){
						return { name:d[x], path:nt[0]+'-'+nt2[0], code:nt2[1] };
						break;
					}
				}
			}
		}
		return null;
	}

	function findItemByPath( path ){
		var rs=/^\/([a-z]+)(-([a-z]+))?\//.exec( path ),nt='',nt2='';
		var province=rs[1],city=rs[3];
		if(province&&city){
			for( var i=0,j=area.length; i<j; i++ ){
				nt=area[i][1].split(',');
				if( nt[0]==province ){
					if( city ){
						var d=area[i];
						for( var x=2,y=d.length; x<y; x+=2 ){
							nt2=d[x+1].split(',');
							if( nt2[0]==city ){
								return { name:d[x], path:nt[0]+'-'+nt2[0], code:nt2[1] };
							}
						}
					}
					return { name:area[i][0], path:nt[0]+'-'+nt2[0], code:nt2[1] };
				}
			}
		}else if( province ){
			for( var i=0,j=area.length; i<j; i++ ){
				nt=area[i][1].split(',');
				if( nt[0]==province ){
					return { name:area[i][0], path:nt[0], code:nt[1] };
				}
				var d=area[i];
				for( var x=2,y=d.length; x<y; x+=2 ){
					nt2=d[x+1].split(',');
					if( nt2[0]==province ){
						return { name:d[x], path:nt[0]+'-'+nt2[0], code:nt2[1] };
					}
				}
			}
		}
		return null;
	}

	function drawHtml( item ){
		$('#cityName').text( item.name );
		if( item.path=='' ) return;
		var p1=item.path;
		var p2=item.path.match('-') ? item.path : item.path;
		$('#navlist>li>a').each(function(){
			var $t=$(this),href=$t.attr('data');
			href && $t.attr('href', href.replace('{1}',p1).replace('{2}',p2) );
		});
	}

	function ipLoaded( jump ){
		var code=window.sohu_IP_Loc.substr(2,6);
		var item=getItemByCode( code );
		if( !item ) return;
		SA.util.cookie.set('CITYCODE',item.code);
		drawHtml( item );
		jump && ( window.location.href=baseUrl+item.path+'/' );
	};

	return function(){
		var cookieCode=a.util.cookie.get('CITYCODE'), path=window.location.pathname;
		if(/^\/[a-z]+(-[a-z]+)?\/$/.test( path )){    //城市主页
			var item=findItemByPath( path );
			if( item ){
				drawHtml( item );
				SA.util.cookie.set('CITYCODE',item.code);
			}else{
				a.util.soip( function(){ ipLoaded(false); } );
			}
		}else if(path=='/'){    //如果是首页
			if( cookieCode ){   //有cookie 通过cookie判断并跳转
				if( cookieCode=='000000' ){
					drawHtml( {name:'全国', path:'' } );
					return;
				}
				var item=getItemByCode( cookieCode );
				if( !item ){
					a.util.soip( function(){ ipLoaded(true); } );
				}else{
					drawHtml( item );
					window.location.href=baseUrl+item.path+'/'
				}
			}else{   //没有cookie 通过ip判断并跳转
				a.util.soip( function(){ ipLoaded(true); } );
			}
		}else if(path!='/'){    //如果不是首页
			if( cookieCode ){   //有cookie 通过cookie判断
				if( cookieCode=='000000' ){
					drawHtml( {name:'全国', path:'' } );
					return;
				}
				var item=getItemByCode( cookieCode );
				if( !item ){
					a.util.soip( function(){ ipLoaded(false); } );
				}else{
					drawHtml( item );
				}
			}else{   //没有cookie 通过ip判断
				a.util.soip( function(){ ipLoaded(false); } );
			}
		}
	}
});

SA.register('app.passport',function(a,$){
	window.Passport= {
		setOptions: function(options){
			this.userInfoUrl = options.userInfoUrl || '/util/getUserInfo.jsp';        // 获取用户信息的URL
			this.noticeUrl = options.noticeUrl || 'http://i.auto.sohu.com/user/message/listNotice.at';         // 通知的URL
			this.messageUrl = options.messageUrl || 'http://i.auto.sohu.com/user/message/listRec.at';                // 站内信的URL
			this.nicknameUrl = options.nicknameUrl || 'http://i.auto.sohu.com/user/inner/mainUser.at';               // 昵称的URL
			this.activateUrl = options.activateUrl || 'http://saa.auto.sohu.com/reg/active.at';                  // 激活页面的URL
			this.registerUrl = options.registerUrl || 'http://saa.auto.sohu.com/reg/register.at';                // 注册的URL
			this.onlineUrl = options.onlineUrl || 'http://suvset.auto.sohu.com/autoOnlineTimer/touch';               // 在线统计URL
			this.levelUrl = options.levelUrl || 'http://saa.auto.sohu.com/club/10815/thread-TPVW7WOJ4z80hKBAAAA-1.shtml';	// 等级的URL
			this.isShowLevel = options.isShowLevel || false;
			this.onlineModule = options.onlineModule || '';

		},
		init: function(id, options){
			if( !PassportSC.cookieHandle() ) return;
			var that = this;
		
			/* 登录成功后 */
			PassportSC.drawPassportCard = function(){
				//this.cElement.innerHTML = '<span id="logoutBox"></span><span id="ppcontid"></span>';
				this._drawPassportCard();
			};
			PassportSC._drawPassportCard = function(){
				//this.cElement.innerHTML = '<span id="logoutBox"></span><span id="ppcontid"></span>';
				that.getUserInfo();
			};
			
			
			this.setOptions(options);
			PassportSC.drawLoginForm = function(){
				return;
				this.cElement.innerHTML = '<form onsubmit="return PassportSC.doLogin();" method="post" name="loginform">'+
					'<span id="ppcontid">'+
					'<input value="1" type="hidden" name="persistentcookie" /> '+
					'<label for="username">用户名：</label> '+
					'<input id="username" class="hl_input" value="通行证帐号/手机号" name="email" autocomplete="off" disableautocomplete="" />'+

					'<label for="passwd">密码：</label> '+
					'<input id="passwd" class="hl_input" value="" type="password" name="password" autocomplete="off" disableautocomplete="" />'+
					'<input class="hl_login" value="登录" type="submit" />'+
					'<a class="register" href="http://saa.auto.sohu.com/reg/register.at" target="_blank">注册</a></span>'+
					'</form>';
			};
			/* 登录等待信息 */
			PassportSC.drawPassportWait = function(A){
				//this.cElement.innerHTML = '<span>系统正在登录，请稍候…</span>';
			};
			PassportSC.doLogout=function(){
				document.location.href="http://passport.sohu.com/sso/logout_js.jsp?s="+(new Date()).getTime() + "&ru="+document.location.href;
			}

			var possportCard = document.getElementById(id);
			PassportSC.appid = 1066;
			PassportSC.drawPassport( possportCard );
		},
		getUserInfo: function(){
			var self = this;
			//var param={t:new Date().getTime(),func:'SA.app.passport.onUserInfoComplete'};
			//a.scriptLoader({url:this.userInfoUrl+'?'+$.param(param)});
			var getUserInfoUrl = this.userInfoUrl+'?passport='+PassportSC.cookieHandle();
			$.ajax({url:getUserInfoUrl, type:"post", success:function (data) {
					self.onUserInfoComplete(data);
				}
			})
		},
		onUserInfoComplete: function(data){
			var that = this;
			var dataObj = eval("("+data+")");
			if(dataObj.flag == 0){
				var userName = dataObj.userName;
				var carSize = dataObj.dealerCarSize;
				var text = '<a href="http://mobile.auto.sohu.com/mainpage/ershou.jsp" target="_blank">手机买卖二手车</a>&nbsp;|&nbsp;'
						+'<strong class="self-message">您好，'+userName+'</strong>&nbsp;&nbsp;'
		      			+'<a href="/usercenter/car/" target="_blank">管理我的二手车('+carSize+'台)</a>&nbsp;&nbsp;'
		      			+'<a href="/usercenter/favorite/" target="_blank">查看我的收藏</a>&nbsp;&nbsp;'
		      			+'<a href="/sell/addCar_1.shtml" target="_blank">发布车源</a>&nbsp;&nbsp;'
	      				+'<a href="javascript:logout();">退出</a>';
	      		PassportSC.cElement.innerHTML = text;
			}else if(dataObj.flag == 1){
				var userName = dataObj.userName;
				var dealerId = dataObj.dealerId;
				var dealerUrl = '/dealer/'+dealerId+'/';
				var text = '<a href="http://mobile.auto.sohu.com/mainpage/ershou.jsp" target="_blank">手机买卖二手车</a>&nbsp;|&nbsp;'
					+'<strong class="self-message">您好，'+ userName+'</strong>&nbsp;&nbsp;'
			      		+'<a href="http://2sc.sohu.com/ctb/" target="_blank">进入车通宝</a>&nbsp;&nbsp;'
			      		+'<a href="http://2sc.sohu.com/ctb/uscar-carAdd.do" target="_blank">发布车源</a>&nbsp;&nbsp;'
			      		+'<a href="'+dealerUrl+'" target="_blank">查看店铺</a>&nbsp;&nbsp;'
			      		+'<a href="javascript:logout();">退出</a>&nbsp;&nbsp;'
			      		+'<a href="http://2sc.sohu.com/t/" target="_blank" class="red">车商助手下载</a>&nbsp;&nbsp;'
			      		+'<a href="/s2013/2scganendapaisong/index.shtml" target="_blank" class="red">推荐有奖</a>';
				PassportSC.cElement.innerHTML = text;
			}else{
				var text = '<a href="http://mobile.auto.sohu.com/mainpage/ershou.jsp" target="_blank">手机买卖二手车</a>&nbsp;|&nbsp;'
						+'<strong>个人：</strong>'
						+'<a href="http://2sc.sohu.com/bj/sell/addCar_1.shtml" target="_blank">发布车源</a>&nbsp;'
						+'<a href="/usercenter/phone/" target="_blank">车源管理</a>&nbsp;'
						+'<a href="/usercenter/login/" target="_blank">我的收藏</a>&nbsp;|&nbsp;'
						+'<strong>商家：</strong>'
						+'<a href="http://2sc.sohu.com/ctb/" target="_blank">登录</a>&nbsp;'
						+'<a href="http://2sc.sohu.com/ctb/dealer-regDealer.do" target="_blank">申请免费无限量发车</a>&nbsp;'
						+'<a href="http://2sc.sohu.com/t/" target="_blank" class="red">车商助手下载</a>&nbsp;'
						+'<a href="/s2013/2scganendapaisong/index.shtml" target="_blank" class="red">推荐有奖</a>';
				PassportSC.cElement.innerHTML = text;
			}
		},
		setOnline: function(userid){
			return;
			var passport = PassportSC.cookieHandle();
			var module = this.onlineModule;
			if(module!=''){
				var param = {'passport': passport, 'module': module};
				a.scriptLoader({url:this.onlineUrl+'?'+$.param(param)});
			}
		}
	};

	return Passport
});


/**
 * @param {Bool} type [0,1,2]
 * @param {function} func
 */
SA.register('job',function(a,$){
	var jobs=[];
	var Job={
		add:function(namespace,func)
		{
			var s=namespace.split('.');
			jobs.push({category:s[1]||'global',name:s[0],func:func});
		},
		run:function( category )
		{
			for(var i=0,j=jobs.length;i<j;i++){
				if( !( category && jobs[i].category==category || jobs[i].category=='global') ) continue;

				try {
					var z=jobs[i],beginTime=(new Date).getTime();
					z.func(a,$);
					a.log( '{job:'+z.name+', category:'+z.category+'} have been run, use ' + ( (new Date).getTime()-beginTime ) + ' ms', 'profile', 'SA.job' );
				} catch (e) {
					a.log( e, 'SA.job');
				}
			}
		}
	}
	return Job;
});




var cityProvince2sc={hot:[{n:"全国",en:"",i:'000000'},{n:"北京",en:"bj",i:110000},{n:"上海",en:"sh",i:310000},{n:"广州",en:"gd-gz",i:440100},{n:"深圳",en:"gd-sz",i:440300},{n:"成都",en:"sc-cd",i:510100},{n:"重庆",en:"cq",i:500000},{n:"杭州",en:"zj-hz",i:330100},{n:"苏州",en:"js-suzhou",i:320500},{n:"郑州",en:"hn-zz",i:410100},{n:"武汉",en:"hubei-wx",i:420100},{n:"青岛",en:"sd-qd",i:370200},{n:"沈阳",en:"ln-sy",i:210100}],letter:[{a:[{n:"安徽",en:"ah",i:"340000",c:[{n:"合肥",en:"hf",i:"340100"},{n:"芜湖",en:"wuhu",i:"340200"},{n:"蚌埠",en:"bengbu",i:"340300"},{n:"淮南",en:"huainan",i:"340400"},{n:"马鞍山",en:"maanshan",i:"340500"},{n:"淮北",en:"huaibei",i:"340600"},{n:"铜陵",en:"tongling",i:"340700"},{n:"安庆",en:"anqing",i:"340800"},{n:"黄山",en:"huangshan",i:"341000"},{n:"滁州",en:"chuzhou",i:"341100"},{n:"阜阳",en:"fuyang",i:"341200"},{n:"宿州",en:"ahsuzhou",i:"341300"},{n:"巢湖",en:"chaohu",i:"341400"},{n:"六安",en:"liuan",i:"341500"},{n:"亳州",en:"bozhou",i:"341600"},{n:"池州",en:"chizhou",i:"341700"},{n:"宣城",en:"xuancheng",i:"341800"}]}]},{b:[{n:"北京",en:"bj",i:"110000",c:[]}]},{c:[{n:"重庆",en:"cq",i:"500000",c:[]}]},{d:[]},{e:[]},{f:[{n:"福建",en:"fj",i:"350000",c:[{n:"福州",en:"fz",i:"350100"},{n:"厦门",en:"xiamen",i:"350200"},{n:"莆田",en:"putian",i:"350300"},{n:"三明",en:"sanming",i:"350400"},{n:"泉州",en:"quanzhou",i:"350500"},{n:"漳州",en:"zhangzhou",i:"350600"},{n:"南平",en:"nanping",i:"350700"},{n:"龙岩",en:"longyan",i:"350800"},{n:"宁德",en:"ningde",i:"350900"}]}]},{g:[{n:"广东",en:"gd",i:"440000",c:[{n:"广州",en:"gz",i:"440100"},{n:"韶关",en:"shaoguan",i:"440200"},{n:"深圳",en:"sz",i:"440300"},{n:"珠海",en:"zhuhai",i:"440400"},{n:"汕头",en:"shantou",i:"440500"},{n:"佛山",en:"foshan",i:"440600"},{n:"江门",en:"jiangmen",i:"440700"},{n:"湛江",en:"zhanjiang",i:"440800"},{n:"茂名",en:"maoming",i:"440900"},{n:"肇庆",en:"zhaoqing",i:"441200"},{n:"惠州",en:"huizhou",i:"441300"},{n:"梅州",en:"meizhou",i:"441400"},{n:"汕尾",en:"shanwei",i:"441500"},{n:"河源",en:"heyuan",i:"441600"},{n:"阳江",en:"yangjiang",i:"441700"},{n:"清远",en:"qingyuan",i:"441800"},{n:"东莞",en:"dongguan",i:"441900"},{n:"中山",en:"zhongshan",i:"442000"},{n:"潮州",en:"chaozhou",i:"445100"},{n:"揭阳",en:"jieyang",i:"445200"},{n:"云浮",en:"yunfu",i:"445300"}]},{n:"广西",en:"gx",i:"450000",c:[{n:"南宁",en:"nn",i:"450100"},{n:"柳州",en:"liuzhou",i:"450200"},{n:"桂林",en:"guilin",i:"450300"},{n:"梧州",en:"wuzhou",i:"450400"},{n:"北海",en:"beihai",i:"450500"},{n:"防城港",en:"fangchenggang",i:"450600"},{n:"钦州",en:"qinzhou",i:"450700"},{n:"贵港",en:"guigang",i:"450800"},{n:"玉林",en:"yulinshi",i:"450900"},{n:"百色",en:"baise",i:"451000"},{n:"贺州",en:"hezhou",i:"451100"},{n:"河池",en:"hechi",i:"451200"},{n:"来宾",en:"laibin",i:"451300"},{n:"崇左",en:"chongzuo",i:"451400"}]},{n:"贵州",en:"guizhou",i:"520000",c:[{n:"贵阳",en:"gy",i:"520100"},{n:"六盘水",en:"liupanshui",i:"520200"},{n:"遵义",en:"zunyi",i:"520300"},{n:"安顺",en:"anshun",i:"520400"},{n:"铜仁",en:"tongren",i:"522200"},{n:"黔西南",en:"qxnbyzmz",i:"522300"},{n:"毕节",en:"bijie",i:"522400"},{n:"黔东南",en:"qdnmzdz",i:"522600"},{n:"黔南",en:"qnbyzmz",i:"522700"}]},{n:"甘肃",en:"gs",i:"620000",c:[{n:"兰州",en:"lz",i:"620100"},{n:"嘉峪关",en:"jiayuguan",i:"620200"},{n:"金昌",en:"jinchang",i:"620300"},{n:"白银",en:"baiyin",i:"620400"},{n:"天水",en:"tianshui",i:"620500"},{n:"武威",en:"wuwei",i:"620600"},{n:"张掖",en:"zhangye",i:"620700"},{n:"平凉",en:"pingliang",i:"620800"},{n:"酒泉",en:"jiuquan",i:"620900"},{n:"庆阳",en:"qingyang",i:"621000"},{n:"定西",en:"dingxi",i:"621100"},{n:"陇南",en:"longnan",i:"621200"},{n:"临夏",en:"lxhz",i:"622900"},{n:"甘南",en:"gnzz",i:"623000"}]}]},{h:[{n:"河北",en:"hb",i:"130000",c:[{n:"石家庄",en:"sjz",i:"130100"},{n:"唐山",en:"tangshan",i:"130200"},{n:"秦皇岛",en:"qinhuangdao",i:"130300"},{n:"邯郸",en:"handan",i:"130400"},{n:"邢台",en:"xingtai",i:"130500"},{n:"保定",en:"baoding",i:"130600"},{n:"张家口",en:"zhangjiakou",i:"130700"},{n:"承德",en:"chengde",i:"130800"},{n:"沧州",en:"cangzhou",i:"130900"},{n:"廊坊",en:"langfang",i:"131000"},{n:"衡水",en:"hengshui",i:"131100"}]},{n:"黑龙江",en:"hlj",i:"230000",c:[{n:"哈尔滨",en:"hrb",i:"230100"},{n:"齐齐哈尔",en:"qiqihaer",i:"230200"},{n:"鸡西",en:"jixi",i:"230300"},{n:"鹤岗",en:"hegang",i:"230400"},{n:"双鸭山",en:"shuangyashan",i:"230500"},{n:"大庆",en:"daqing",i:"230600"},{n:"伊春",en:"yichunshi",i:"230700"},{n:"佳木斯",en:"jiamusi",i:"230800"},{n:"七台河",en:"qitaihe",i:"230900"},{n:"牡丹江",en:"mudanjiang",i:"231000"},{n:"黑河",en:"heihe",i:"231100"},{n:"绥化",en:"suihua",i:"231200"},{n:"大兴安岭",en:"dxaldq",i:"232700"}]},{n:"河南",en:"hn",i:"410000",c:[{n:"郑州",en:"zz",i:"410100"},{n:"开封",en:"kaifeng",i:"410200"},{n:"洛阳",en:"luoyang",i:"410300"},{n:"平顶山",en:"pingdingshan",i:"410400"},{n:"安阳",en:"anyang",i:"410500"},{n:"鹤壁",en:"hebi",i:"410600"},{n:"新乡",en:"xinxiang",i:"410700"},{n:"焦作",en:"jiaozuo",i:"410800"},{n:"濮阳",en:"puyang",i:"410900"},{n:"许昌",en:"xuchang",i:"411000"},{n:"漯河",en:"luohe",i:"411100"},{n:"三门峡",en:"sanmenxia",i:"411200"},{n:"南阳",en:"nanyang",i:"411300"},{n:"商丘",en:"shangqiu",i:"411400"},{n:"信阳",en:"xinyang",i:"411500"},{n:"周口",en:"zhoukou",i:"411600"},{n:"驻马店",en:"zhumadian",i:"411700"}]},{n:"湖北",en:"hubei",i:"420000",c:[{n:"武汉",en:"wx",i:"420100"},{n:"黄石",en:"huangshi",i:"420200"},{n:"十堰",en:"shiyan",i:"420300"},{n:"宜昌",en:"yichang",i:"420500"},{n:"襄樊",en:"xiangfan",i:"420600"},{n:"鄂州",en:"ezhou",i:"420700"},{n:"荆门",en:"jingmen",i:"420800"},{n:"孝感",en:"xiaogan",i:"420900"},{n:"荆州",en:"jingzhou",i:"421000"},{n:"黄冈",en:"huanggang",i:"421100"},{n:"咸宁",en:"xianning",i:"421200"},{n:"随州",en:"suizhou",i:"421300"},{n:"恩施",en:"estjzmz",i:"422800"},{n:"仙桃",en:"xiantao",i:"429004"},{n:"潜江",en:"hbqianjiang",i:"429005"},{n:"天门",en:"tianmen",i:"429006"}]},{n:"湖南",en:"hunan",i:"430000",c:[{n:"长沙",en:"cs",i:"430100"},{n:"株洲",en:"zhuzhou",i:"430200"},{n:"湘潭",en:"xiangtan",i:"430300"},{n:"衡阳",en:"hengyang",i:"430400"},{n:"邵阳",en:"shaoyang",i:"430500"},{n:"岳阳",en:"yueyang",i:"430600"},{n:"常德",en:"changde",i:"430700"},{n:"张家界",en:"zhangjiajie",i:"430800"},{n:"益阳",en:"yiyang",i:"430900"},{n:"郴州",en:"chenzhou",i:"431000"},{n:"永州",en:"yongzhou",i:"431100"},{n:"怀化",en:"huaihua",i:"431200"},{n:"娄底",en:"loudi",i:"431300"},{n:"湘西",en:"xxtjzmz",i:"433100"}]},{n:"海南",en:"hainan",i:"460000",c:[{n:"海口",en:"haikou",i:"460100"},{n:"三亚",en:"sanya",i:"460200"},{n:"五指山",en:"wuzhishan",i:"469001"},{n:"琼海",en:"qionghai",i:"469002"},{n:"儋州",en:"danzhou",i:"469003"},{n:"文昌",en:"wenchang",i:"469005"},{n:"万宁",en:"wanning",i:"469006"},{n:"东方",en:"dongfang",i:"469007"},{n:"定安",en:"dingan",i:"469025"},{n:"屯昌",en:"tunchang",i:"469026"},{n:"澄迈",en:"chengmai",i:"469027"},{n:"临高",en:"lingao",i:"469028"},{n:"白沙",en:"bslz",i:"469030"},{n:"昌江",en:"cjlz",i:"469031"},{n:"乐东",en:"ldlz",i:"469033"},{n:"陵水",en:"lslz",i:"469034"},{n:"保亭",en:"btlzmz",i:"469035"},{n:"琼中",en:"qzlzmz",i:"469036"},{n:"西沙",en:"xisha",i:"469037"},{n:"南沙",en:"nansha",i:"469038"}]}]},{i:[]},{j:[{n:"吉林",en:"jl",i:"220000",c:[{n:"长春",en:"cc",i:"220100"},{n:"吉林市",en:"jilin",i:"220200"},{n:"四平",en:"siping",i:"220300"},{n:"辽源",en:"liaoyuan",i:"220400"},{n:"通化",en:"tonghua",i:"220500"},{n:"白山",en:"baishan",i:"220600"},{n:"松原",en:"songyuan",i:"220700"},{n:"白城",en:"baicheng",i:"220800"},{n:"延边",en:"ybcxz",i:"222400"}]},{n:"江苏",en:"js",i:"320000",c:[{n:"南京",en:"nj",i:"320100"},{n:"无锡",en:"wuxi",i:"320200"},{n:"徐州",en:"xuzhou",i:"320300"},{n:"常州",en:"changzhou",i:"320400"},{n:"苏州",en:"suzhou",i:"320500"},{n:"南通",en:"nantong",i:"320600"},{n:"连云港",en:"lianyungang",i:"320700"},{n:"淮安",en:"huaian",i:"320800"},{n:"盐城",en:"yancheng",i:"320900"},{n:"扬州",en:"yangzhou",i:"321000"},{n:"镇江",en:"zhenjiang",i:"321100"},{n:"泰州",en:"jstaizhou",i:"321200"},{n:"宿迁",en:"suqian",i:"321300"}]},{n:"江西",en:"jx",i:"360000",c:[{n:"南昌",en:"nc",i:"360100"},{n:"景德镇",en:"jingdezhen",i:"360200"},{n:"萍乡",en:"pingxiang",i:"360300"},{n:"九江",en:"jiujiang",i:"360400"},{n:"新余",en:"xinyu",i:"360500"},{n:"鹰潭",en:"yingtan",i:"360600"},{n:"赣州",en:"ganzhou",i:"360700"},{n:"吉安",en:"jian",i:"360800"},{n:"宜春",en:"yichun",i:"360900"},{n:"抚州",en:"fuzhou",i:"361000"},{n:"上饶",en:"shangrao",i:"361100"}]}]},{k:[]},{l:[{n:"辽宁",en:"ln",i:"210000",c:[{n:"沈阳",en:"sy",i:"210100"},{n:"大连",en:"dl",i:"210200"},{n:"鞍山",en:"anshan",i:"210300"},{n:"抚顺",en:"fushun",i:"210400"},{n:"本溪",en:"benxi",i:"210500"},{n:"丹东",en:"dandong",i:"210600"},{n:"锦州",en:"jinzhou",i:"210700"},{n:"营口",en:"yingkou",i:"210800"},{n:"阜新",en:"fuxin",i:"210900"},{n:"辽阳",en:"liaoyang",i:"211000"},{n:"盘锦",en:"panjin",i:"211100"},{n:"铁岭",en:"tieling",i:"211200"},{n:"朝阳市",en:"chaoyangshi",i:"211300"},{n:"葫芦岛",en:"huludao",i:"211400"}]}]},{m:[]},{n:[{n:"内蒙古",en:"nmg",i:"150000",c:[{n:"呼和浩特",en:"hhht",i:"150100"},{n:"包头",en:"baotou",i:"150200"},{n:"乌海",en:"wuhai",i:"150300"},{n:"赤峰",en:"chifeng",i:"150400"},{n:"通辽",en:"tongliao",i:"150500"},{n:"鄂尔多斯",en:"eerduosi",i:"150600"},{n:"呼伦贝尔",en:"hulunbeier",i:"150700"},{n:"巴彦淖尔",en:"bayannaoer",i:"150800"},{n:"乌兰察布",en:"wulanchabu",i:"150900"},{n:"兴安盟",en:"xinganmeng",i:"152200"},{n:"锡林郭勒",en:"xilinguolemeng",i:"152500"},{n:"阿拉善盟",en:"alashanmeng",i:"152900"}]},{n:"宁夏",en:"nx",i:"640000",c:[{n:"银川",en:"yc",i:"640100"},{n:"石嘴山",en:"shizuishan",i:"640200"},{n:"吴忠",en:"wuzhong",i:"640300"},{n:"固原",en:"guyuan",i:"640400"},{n:"中卫",en:"zhongwei",i:"640500"}]}]},{o:[]},{p:[]},{q:[{n:"青海",en:"qh",i:"630000",c:[{n:"西宁",en:"xn",i:"630100"},{n:"海东",en:"haidong",i:"632100"},{n:"海北",en:"hbzz",i:"632200"},{n:"黄南",en:"huangnanzz",i:"632300"},{n:"海南",en:"hnzz",i:"632500"},{n:"果洛",en:"glzz",i:"632600"},{n:"玉树",en:"yszz",i:"632700"},{n:"海西",en:"hxmg",i:"632800"}]}]},{r:[]},{s:[{n:"山西",en:"shanxi",i:"140000",c:[{n:"太原",en:"ty",i:"140100"},{n:"大同",en:"datong",i:"140200"},{n:"阳泉",en:"yangquan",i:"140300"},{n:"长治",en:"changzhi",i:"140400"},{n:"晋城",en:"jincheng",i:"140500"},{n:"朔州",en:"shuozhou",i:"140600"},{n:"晋中",en:"jinzhong",i:"140700"},{n:"运城",en:"yuncheng",i:"140800"},{n:"忻州",en:"xinzhou",i:"140900"},{n:"临汾",en:"linfen",i:"141000"},{n:"吕梁",en:"lvliang",i:"141100"}]},{n:"上海",en:"sh",i:"310000",c:[]},{n:"山东",en:"sd",i:"370000",c:[{n:"济南",en:"jn",i:"370100"},{n:"青岛",en:"qd",i:"370200"},{n:"淄博",en:"zibo",i:"370300"},{n:"枣庄",en:"zaozhuang",i:"370400"},{n:"东营",en:"dongying",i:"370500"},{n:"烟台",en:"yantai",i:"370600"},{n:"潍坊",en:"weifang",i:"370700"},{n:"济宁",en:"jining",i:"370800"},{n:"泰安",en:"taian",i:"370900"},{n:"威海",en:"weihai",i:"371000"},{n:"日照",en:"rizhao",i:"371100"},{n:"莱芜",en:"laiwu",i:"371200"},{n:"临沂",en:"linyi",i:"371300"},{n:"德州",en:"dezhou",i:"371400"},{n:"聊城",en:"liaocheng",i:"371500"},{n:"滨州",en:"binzhou",i:"371600"},{n:"菏泽",en:"heze",i:"371700"}]},{n:"四川",en:"sc",i:"510000",c:[{n:"成都",en:"cd",i:"510100"},{n:"自贡",en:"zigong",i:"510300"},{n:"攀枝花",en:"panzhihua",i:"510400"},{n:"泸州",en:"luzhou",i:"510500"},{n:"德阳",en:"deyang",i:"510600"},{n:"绵阳",en:"mianyang",i:"510700"},{n:"广元",en:"guangyuan",i:"510800"},{n:"遂宁",en:"suining",i:"510900"},{n:"内江",en:"neijiang",i:"511000"},{n:"乐山",en:"leshan",i:"511100"},{n:"南充",en:"nanchong",i:"511300"},{n:"眉山",en:"meishan",i:"511400"},{n:"宜宾",en:"yibin",i:"511500"},{n:"广安",en:"guangan",i:"511600"},{n:"达州",en:"dazhou",i:"511700"},{n:"雅安",en:"yaan",i:"511800"},{n:"巴中",en:"bazhong",i:"511900"},{n:"资阳",en:"ziyang",i:"512000"},{n:"阿坝",en:"abzzqz",i:"513200"},{n:"甘孜",en:"gzzz",i:"513300"},{n:"凉山",en:"lsyz",i:"513400"}]},{n:"陕西",en:"sx",i:"610000",c:[{n:"西安",en:"xa",i:"610100"},{n:"铜川",en:"tongchuan",i:"610200"},{n:"宝鸡",en:"baoji",i:"610300"},{n:"咸阳",en:"xianyang",i:"610400"},{n:"渭南",en:"weinan",i:"610500"},{n:"延安",en:"yanan",i:"610600"},{n:"汉中",en:"hanzhong",i:"610700"},{n:"榆林",en:"yulin",i:"610800"},{n:"安康",en:"ankang",i:"610900"},{n:"商洛",en:"shangluo",i:"611000"}]}]},{t:[{n:"天津",en:"tj",i:"120000",c:[]}]},{u:[]},{v:[]},{w:[]},{x:[{n:"西藏",en:"xz",i:"540000",c:[{n:"拉萨",en:"lasa",i:"540100"},{n:"昌都",en:"changdou",i:"542100"},{n:"山南",en:"shannan",i:"542200"},{n:"日喀则",en:"rikaze",i:"542300"},{n:"那曲",en:"neiqu",i:"542400"},{n:"阿里",en:"ali",i:"542500"},{n:"林芝",en:"linzhi",i:"542600"}]},{n:"新疆",en:"xj",i:"650000",c:[{n:"乌鲁木齐",en:"wlmq",i:"650100"},{n:"克拉玛依",en:"kelamayi",i:"650200"},{n:"吐鲁番",en:"tulufan",i:"652100"},{n:"哈密",en:"hami",i:"652200"},{n:"昌吉",en:"cjhz",i:"652300"},{n:"博尔塔拉",en:"betlmg",i:"652700"},{n:"巴音郭楞",en:"byglmg",i:"652800"},{n:"阿克苏",en:"akesu",i:"652900"},{n:"克孜勒苏",en:"kzlskekz",i:"653000"},{n:"喀什",en:"kashen",i:"653100"},{n:"和田",en:"hetian",i:"653200"},{n:"伊犁",en:"ylhsk",i:"654000"},{n:"塔城",en:"tacheng",i:"654200"},{n:"阿勒泰",en:"aletai",i:"654300"},{n:"石河子",en:"shihezi",i:"659001"},{n:"阿拉尔",en:"alaer",i:"659002"},{n:"图木舒克",en:"tumushuke",i:"659003"},{n:"五家渠",en:"wujiaqu",i:"659004"}]}]},{y:[{n:"云南",en:"yn",i:"530000",c:[{n:"昆明",en:"km",i:"530100"},{n:"曲靖",en:"qujing",i:"530300"},{n:"玉溪",en:"yuxi",i:"530400"},{n:"保山",en:"baoshanshi",i:"530500"},{n:"昭通",en:"zhaotong",i:"530600"},{n:"丽江",en:"lijiang",i:"530700"},{n:"思茅",en:"simao",i:"530800"},{n:"临沧",en:"lincang",i:"530900"},{n:"楚雄",en:"cxyz",i:"532300"},{n:"红河",en:"hhhnzyz",i:"532500"},{n:"文山",en:"wszzmz",i:"532600"},{n:"西双版纳",en:"xsbndz",i:"532800"},{n:"大理",en:"dlbz",i:"532900"},{n:"德宏",en:"dhdzjpz",i:"533100"},{n:"怒江",en:"njlsz",i:"533300"},{n:"迪庆",en:"dqzz",i:"533400"}]}]},{z:[{n:"浙江",en:"zj",i:"330000",c:[{n:"杭州",en:"hz",i:"330100"},{n:"宁波",en:"ningbo",i:"330200"},{n:"温州",en:"wenzhou",i:"330300"},{n:"嘉兴",en:"jiaxing",i:"330400"},{n:"湖州",en:"huzhou",i:"330500"},{n:"绍兴",en:"shaoxing",i:"330600"},{n:"金华",en:"jinhua",i:"330700"},{n:"衢州",en:"quzhou",i:"330800"},{n:"舟山",en:"zhoushan",i:"330900"},{n:"台州",en:"taizhou",i:"331000"},{n:"丽水",en:"lishui",i:"331100"}]}]}]};
SA.register('twosc.selectcity', function(a,$){
	var Data,
		View,
		hotArr = null,
		prov = [],
		cityobj ={},
		menuArr = [],
		select = null;
	var closeMenu = function (){
		for(var i=0,l=menuArr.length;i<l;i++){
			menuArr[i].css('display','none');
		}
		if(select){
			select.removeClass('city-select-active');
			select = null;
		}
	};
	Data ={
		source: cityProvince2sc,
		getProvs: function(data){
			hotArr = data.hot;
			var arr = data.letter,
				len = arr.length,
				temp;
			for(var i = 0; i< len; i++){
				temp = arr[i];
				for( var x in temp){
					prov.push({zm:x,v:temp[x]});
					var a = temp[x],
						l = a.length;
					for(var j = 0;j<l;j++){
						cityobj[a[j].i] = a[j].c;
					}
				}
			}
		},
		getCity: function(i){
			return cityobj[i];
		}
	};
	View={
		drawProvince: function(p,h,hd,pd){
			var pul = p.find('ul'),
				hhtml = [],
				phtml = [],
				hlen = hd.length,
				plen = pd.length;
			for(var i=0;i<hlen;i++){
				var item = hd[i];
				if(item.en){
					hhtml.push('<a data-index="'+item.i+'" href="/'+item.en+'/" >'+item.n+'</a>');
				}else{
					hhtml.push('<a data-index="'+item.i+'" href="/'+item.en+'" >'+item.n+'</a>');
				}
			}
			for(var j=0;j<plen;j++){
				var temp = pd[j];
				var letter = temp.zm;
				var arr = temp.v;
				var arrlen = arr.length;
				if(arrlen == 0){
					continue;
				}
				phtml.push('<li><strong>'+letter.toUpperCase()+'</strong>');
				for(var x=0; x<arrlen; x++){
					var item1 = arr[x];
					phtml.push('<a data-index="'+item1.i+'" href="/'+item1.en+'/" >'+item1.n+'</a>');
				}
				phtml.push('</li>');
			}
			pul.html(phtml.join(''));
			h.html(hhtml.join(''));
		},
		drawCity: function($wrapper,$obj,$tpl,data,prov){
			var chip=[],
			d = data;
			for (var i=0,j=d.length; i<j; i++) {
				var item1 = d[i];
				chip.push('<a data-index="'+item1.i+'" href="/'+prov+'-'+item1.en+'/" >'+item1.n+'</a>');
			}

			if( !chip.length ) return;
			var width=$wrapper.width();

			var o1=$obj.offset(),o2=$wrapper.offset();
			var top=o1.top-o2.top+$obj.innerHeight()-4;
			var left=o1.left-o2.left;

			if( left<width/2 ){
				$tpl.html( chip.join("\r\n") ).css({
					top:top,
					left:left+$obj.innerWidth()-8,
					right:'auto'
				}).show();
			}else{
				$tpl.html( chip.join("\r\n") ).css({
					top:top,
					right:width-left,
					left:'auto'
				}).show();
			}
		}
	};
	var selectCity = function(box){
		this.box = box;
		this.selectBtn = box.find('.city-select');
		this.contentBox = box.find('.city-content');
		this.hotbox = box.find('.hot-city-content');
		this.province = box.find('.provinces-content');
		this.city =$("<div class='city-box' style='display:none;'></div>");
		this.time = null;
		this.init();
	}
	selectCity.prototype = {
		init: function(){
			var k = this,
				delay=200;
			k.contentBox.append(k.city);
			k.city.hide;
			k.box.mouseover(function(e){
				e.stopPropagation()
				k.showprv.call(k,e);
			});
			k.contentBox.click(function(e){
				k.tocity.call(k, e);
			});
			Data.getProvs(Data.source);
			View.drawProvince(k.province,k.hotbox,hotArr,prov);
			k.province.mouseover(function(e){
				var t=$(e.target);
				if(!t.is('a')) return;
				clearTimeout(k.time);
				k.city.hide();
				k.time=setTimeout(function(){
					k.showcity.call(k,t,e);
				},delay)
			}).mouseout(function(){
					clearTimeout(k.time);
					k.time=setTimeout(function(){
						k.city.hide();
					},delay)
				});
			k.city.mouseover(function(){
				clearTimeout(k.time);
			}).mouseout(function(){
					k.time=setTimeout(function(){
						k.city.hide();
					},delay);
				});
			$(document).bind('mouseover.menu',closeMenu);
		},
		showprv: function(e){
			e.preventDefault();
			var k = this;
			k.contentBox.css('display','block');
			k.selectBtn.addClass('city-select-active');
			menuArr.push(k.contentBox);
			select = k.selectBtn;
			e.stopPropagation();
		},
		showcity: function (el, e) {
			var k  = this;
			var idx = el.attr('data-index');
			var uri = el.attr('href');
			if(uri.indexOf('2sc.sohu.com') != -1){
				uri = uri.replace('http://2sc.sohu.com','');
			}
			uri = uri.substring(1,uri.length-1);
			//alert(cityobj[idx]);
			var data = cityobj[idx];
			View.drawCity(k.contentBox, el, k.city, data, uri);
		},
		tocity: function(e){
			var t = e.target;
			if(t.tagName.toLowerCase() === 'a'){

				var code = $(t).attr('data-index');
				if(code!='')
					SA.util.cookie.set('CITYCODE',code,{expire:24})
				
			}
		}
		
	};
	return selectCity;
});

SA.job.add('passport',function(a,$){
	document.getElementById("passportDiv") && a.scriptLoader({url:'http://js.sohu.com/passport/pp18030_27.js',onComplete:function(){
		a.app.passport.init("passportDiv", {onlineModule: 'INDEX_AUTO'});
	}})
});
SA.job.add('iplocation',function(a,$){
	new SA.app.iplocation();
});
SA.job.add('selectcity',function(a,$){
	new SA.twosc.selectcity($('#citybox'));
});

function doBrandSubmit(){
	var brand = document.getElementById("brand-input").value;
	var model = document.getElementById("model-input").value;
	var url = "http://2sc.sohu.com/db/searchModel.jsp";
	window.open(url + "?cityId=110000" + "&brandId=" + brand + "&modelId=" + model);
}
	
function searchDealer() {
	var brand = document.getElementById("tjshbvalue").value;
	var model = document.getElementById("tjshmvalue").value;
	
	if (model == null || model == "" || model == "-1") {
		alert("请选择车型。");
		return false;
	}
	var action = "http://db.auto.sohu.com/model_" + model +  "/news_2.shtml";
	
	document.dealerSearch.action = action;
	document.dealerSearch.submit();
}


//自动搜索提示
function doKeyWordSubmit(){  
	//var key= document.getElementById("serchkey").value;
	//var url=$("#serchkey").attr("url");
	//document.keyWordForm.action=url;
	document.keyWordForm.submit();
}
//自动搜索提示
function KeyDown() 
{ 
	if (event.keyCode == 13) 
	{ 
	event.returnValue=false; 
	event.cancel = true; 
	var key= document.getElementById("serchkey").value;
	var url="http://www.sogou.com/web?query="+key+"+site%3A%2F%2F2sc.sohu.com";
	//document.keyWordForm.action=url;
	document.keyWordForm.submit(); 
	} 
} 

$(function(){
	var myserch=$("#serchkey");
	var myrsearch=$("#rsearch ul");			
    myserch.bind('input propertychange',function(){		
	var mypichtml="";
	var status="";
	var action = "";
	var  myval=$(this).val(); //输入的字母；
	var getPricesJsonUrl ="/util/searchSuggest.jsp?keyword=" + myval+"&province="+pp+"&city="+ccc;
	getPricesJsonUrl = encodeURI(getPricesJsonUrl);
	getPricesJsonUrl = encodeURI(getPricesJsonUrl);
	//$.ajax({url:getPricesJsonUrl,
	//	dataType: "json",
	//	async: false,
	//	success: function(data){
	//		 status = data;
		
	//	}
	//});
	var isTo2sc = false;
	var targetUrl = "";
	$.ajax({url:getPricesJsonUrl, type:"post", success:function (data) {
		var dataObj = eval("(" + data + ")");
		status = dataObj;
		isTo2sc = status.flag;
		if(status.arr){
		 var mylen=status.arr.length;
			if(myval){
				if(mylen > 0){
					for(var i=0;i<mylen;i++){
						mypichtml+= "<li><span style='float:right;font-size: 12px;' class='mynum'>约"+status.arr[i].size+"条车源</span><a target='_blank' href='"+status.arr[i].url+"' >"+status.arr[i].name+"</a></li>";
					}
					myrsearch.empty().append(mypichtml);
					$("#rsearch").show();
					myserch.unbind('keypress');
					keySearch(mylen,isTo2sc);
				}else{
					isTo2sc = false;
					myserch.unbind('keypress');
					keySearch(mylen,isTo2sc);
				}
				
			}else{
				isTo2sc = false;
				myserch.unbind('keypress');
				keySearch(mylen,isTo2sc);
				$("#rsearch").hide();
			}
		}else{
			isTo2sc = false;
			myserch.unbind('keypress');
			keySearch(mylen,isTo2sc);
			$("#rsearch").hide();
			
		}
		if(isTo2sc){
			targetUrl = status.targetUrl;
			document.getElementById("keywordForm").action = targetUrl;
		}else{
		 	document.getElementById("keywordForm").action ="http://www.sogou.com/web?query="+myval+"+site%3A%2F%2F2sc.sohu.com";
		}
		 $('#rsearch li').hover(function(){
			$('#rsearch li').removeClass('addbg');
			$(this).addClass('addbg');
		});
		$('#rsearch li').click(function(){
			myserch.attr('value',$(this).find("a").text()).attr("url",$(this).find("a").attr("value"));
			//window.open($(this).find("a").attr("href"));
		    $("#rsearch").hide();
		});
	}});

 //status ={arr:[{name:'奥迪',url:'http://2sc.sohu.com/auto-audi/',size:1779},{name:'阿斯顿马丁',url:'http://2sc.sohu.com/auto-astonmartin/',size:12}]};
	
	if(targetUrl == ""){
		var textValue = document.getElementById("serchkey").value;
		document.getElementById("keywordForm").action ="http://www.sogou.com/web?query="+textValue+"+site%3A%2F%2F2sc.sohu.com";
	}
//键盘监听

	function keySearch(resultLe,flag){
		var resultLen = 0;
		if(resultLen){
			resultLen = resultLe-1;
		}
		var keyNo = 0; //记录键盘上下变量
		
		$('#serchkey').bind('keypress',function (e) {
			var key = e.keyCode; //e.which是按键的值
			//向下
			if (key === 40) {
				$('#rsearch li').removeClass('addbg');
				var key = $('#rsearch li:eq('+ keyNo +')');
				key.addClass('addbg');
				if(keyNo >=resultLen){
					keyNo = 0;
				}else{
					keyNo++;
				}
			
			}
			//向上
			if (key === 38) {
				$('#rsearch li').removeClass('addbg');
				var key = $('#rsearch li:eq('+ keyNo +')');
				key.addClass('addbg');
				if(keyNo <= 0){
					keyNo = resultLen;
				}else{
					keyNo--;
				}
			}
			
			if(key === 13){
				var key = document.getElementById("serchkey").value;
				var resultUrl = "";
				if(flag){
					resultUrl = targetUrl;
				}else{
					resultUrl ="http://www.sogou.com/web?query="+key+"+site%3A%2F%2F2sc.sohu.com";
				}
				window.open(resultUrl);
				return false;
			}
		});
	}
	
});

$('body').click(function(){
	$('#rsearch').hide();
});

});
