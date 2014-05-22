/**
 * Created by zd on 2014/5/11 0011.
 */
/*生成品牌选择表
function createBrandList()
{
    var $container = $('#m-car-logo').children('ul').empty();
    var brand_len = brandMods.length;
    var curCh = '';
    var $curChCon;
    var $curChUl;
    for(var i = 0; i < brand_len; ++i)
    {
        var brand = brandMods[i];
        if(curCh !== brand.n[0])
        {
            curCh = brand.n[0];
            if($curChCon)
            {
                $container.append($curChCon);
            }
            $curChCon = $('<li id="char_nav_'+ curCh + '" class="m-root m-popup-arrow"><strong>'+ curCh + '</strong><ul class="m-root-item clearfix"></ul></li>');
            $curChUl = $curChCon.children('ul');
        }
        $curChUl.append('<li id="mb_'+ brand.i + '"><a href="javascript:;" class="m-brand m_'+ brand.i + '_b"></a><a href="javascript:;" class="m-car-name">' + brand.n.substring(2) + '</a></li>');
    }
    $container.append($curChCon);
}*/
var CarMasterSelect = {
    masterId: 0,
    masterName: "",
    key: false,
    outclick: null,
    data: {}, //保存请求过的主品牌数据
    //绑定主品牌点击事件
    BindMasterTap: function () {
        var mbLogo = document.getElementById("m-car-logo");
        var liList = mbLogo.getElementsByTagName("li");
        var self = this;
        for (var i = 0; i < liList.length; i++) {
            if (liList[i].id && liList[i].id.indexOf("mb_") != -1) {
                $(liList[i]).on('tap', function()
                {
                    self.MasterTapEvent(this);
                });
            }
        }
    },
    //滚动动画效果
    scrollAnimate: function (currentY, scrollY) {
        var begin = +new Date();
        var from = scrollY;
        var to = currentY;
        var duration = currentY - scrollY;
        var easing = function (time, duration) {
            return -(time /= duration) * (time - 2);
        };
        var timer = setInterval(function () {
            var time = new Date() - begin;
            var pos, now;
            if (time > duration) {
                clearInterval(timer);
                now = to;
            }
            else {
                pos = easing(time, duration);
                now = pos * (to - from) + from;
            }
            if (typeof document.compatMode != 'undefined' && document.compatMode === 'CSS1Compat') {
                document.body.scrollTop = now;
            } else {
                document.documentElement.scrollTop = now;
            }
        }, 20);
    },
    //获取当前元素距顶高度
    getNodeTop: function (curNode) {
        var top = 0;
        if (!curNode)
            return top;
        while (curNode) {
            top += curNode.offsetTop;
            curNode = curNode.offsetParent;
        }
        return top;
    },
    //设置滚动高度
    setPosition: function (currNode) {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.body.scrollHeight || document.documentElement.scrollHeight;
        var currNodeTop = parseInt(this.getNodeTop(currNode)) - 10; //10 是li paddingTop值
        if (top == currNodeTop) return;
        this.scrollAnimate(currNodeTop, top);
        //		if (document.body.scrollTop) {
        //			document.body.scrollTop = currNodeTop;
        //		} else {
        //			document.documentElement.scrollTop = currNodeTop;
        //		}
    },
    //主品牌点击事件
    MasterTapEvent: function (node) {
        var currNode = node;
        var self = CarMasterSelect;
        var mbId = currNode.id.replace("mb_", "");
        var popupItem = document.getElementById("popupitem" + mbId);
        //二次点击打开关闭
        if (popupItem) {
            var b = currNode.getElementsByTagName("b");
            if (!self.key) {
                popupItem.style.display = "block";
                if (b.length > 0) {
                    b[0].style.display = "block";
                }
                self.key = true;
                return;
            } else {
                popupItem.style.display = "none";
                if (b.length > 0) {
                    b[0].style.display = "none";
                }
                self.key = false;
                return;
            }
        }
        self.key = true;
        self.ChangeMaster(currNode, false);
        if (self.outclick != null) {
            self.outclick();
            return;
        }
        //如果此主品牌有数据直接加载
        if (self.data[self.masterId]) {
            self.setCallBack(self.data[self.masterId]);
            return;
        }
    },
    //创建弹出层节点元素
    CreateElementNode: function (loadInfo) {
        //创建元素
        var popupItem = document.createElement("li");
        popupItem.className = "m-popup-item";
        popupItem.id = "popupitem" + this.masterId;

        var popupBox = document.createElement("div");
        popupBox.className = "m-popup-box";
        popupBox.innerHTML = loadInfo;
        popupBox.id = "popupbox" + this.masterId;
        popupItem.appendChild(popupBox);
        return popupItem;
    },
    //改变主品牌弹出层位置
    ChangeMaster: function (currNode, isorientationchange) {
        var loadInfo = "正在加载...";
        var tempCurrNode = currNode;
        if (isorientationchange) {
            if (this.masterId <= 0) return;
            var tempPopupBoxObj = document.getElementById("popupbox" + this.masterId);
            loadInfo = tempPopupBoxObj.innerHTML;
        }
        //删除之前弹出节点
        if (this.masterId > 0) {
            var popupItem = document.getElementById("popupitem" + this.masterId);
            if (popupItem) {
                popupItem.parentNode.removeChild(popupItem);
                var masterLi = document.getElementById("mb_" + this.masterId);
                masterLi.removeChild(masterLi.getElementsByTagName("b")[0]);
            }
        }
        this.setPosition(tempCurrNode); //定位
        this.masterId = tempCurrNode.id.replace("mb_", "");
        this.masterName = tempCurrNode.childNodes[1].innerHTML;
        var popupItem = this.CreateElementNode(loadInfo);
        var b = document.createElement("b");
        tempCurrNode.appendChild(b);
        //转屏显示判断
        if (this.key) {
            popupItem.style.display = "block";
            tempCurrNode.getElementsByTagName("b")[0].style.display = "block";
        }
        else {
            popupItem.style.display = "none";
            tempCurrNode.getElementsByTagName("b")[0].style.display = "none";
        }
        var leftNode = this.getMasterLeft(currNode);
        while (currNode) {
            var tempNode = currNode.nextSibling;
            if (!tempNode) {
                currNode.parentNode.appendChild(popupItem);
                break;
            }
            currNode = tempNode;
            var currLeftNode = this.getMasterLeft(currNode);
            //alert(currLeftNode + "|" + currNode.id);
            if (currLeftNode <= leftNode) {
                var appandNode = currNode.previousSibling;
                appandNode.parentNode.insertBefore(popupItem, appandNode.nextSibling);
                break;
            }
        }
    },
    //获取主品牌居左距离
    getMasterLeft: function (curNode) {
        var left = 0;
        if (!curNode)
            return left;
        while (curNode && curNode.tagName != "UL") {
            left += curNode.offsetLeft;
            curNode = curNode.offsetParent;
        }
        return left;
    },
    //设置回调数据
    setCallBack: function (strHtml) {
        var popupBoxObj = document.getElementById("popupbox" + this.masterId);
        if (popupBoxObj) {
            popupBoxObj.innerHTML = strHtml;
        }
    }
};

function SetJsonToData(bsid, data) {
    var popupBox = "";
    if (bsid > 0 && data) {
        popupBox += "<div class=\"m-popup m-cars\">";
        popupBox += '<dd class="select-all"><a href="">不限</a></dd>';
        for (var i = 0; i < data.length; i++) {
            var brand = data[i];
            popupBox += "<dl>";
            var brandName = brand.n;
            popupBox += '<dt>' + brandName + '</dt>';
            for (var j = 0; j < brand.b.length; j++) {
                var serial = brand.b[j];
                popupBox += '<dd><a href="">' + serial.n + '</a></dd>';
            }
            popupBox += "</dl>";
        }
        popupBox += "<div class=\"clear\"></div>";
        popupBox += "</div>";
        CarMasterSelect.data[bsid] = popupBox;
    }
    return popupBox;
}

//屏幕旋转事件
function orientationChange() {
    var master = document.getElementById("mb_" + CarMasterSelect.masterId);
    switch (window.orientation) {
        case 0:
        case 180:
        case -90:
        case 90:
            if (CarMasterSelect.masterId > 0) {
                CarMasterSelect.ChangeMaster(master, true);
            }
            break;
    }
}
//window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationChange, false);
window.onorientationchange = orientationChange;

var sWidth = getWinWidth();
function resizePosition() {
    var resizeWidth = getWinWidth();
    if (sWidth != resizeWidth) {
        sWidth = resizeWidth;
        var master = document.getElementById("mb_" + CarMasterSelect.masterId);
        if (CarMasterSelect.masterId > 0) {
            CarMasterSelect.ChangeMaster(master, true);
        }
    }
}
addEvent(window, "resize", resizePosition, false);

function addEvent(elm, type, fn, useCapture) {
    if (!elm) return;
    if (elm.addEventListener) {
        elm.addEventListener(type, fn, useCapture);
        return true;
    } else if (elm.attachEvent) {
        var r = elm.attachEvent('on' + type, fn);
        return r;
    } else {
        elm['on' + type] = fn;
    }
}
function getWinWidth() {
    var winW = 0;
    if (window.innerHeight) {
        winW = Math.min(window.innerWidth, document.documentElement.clientWidth);
    } else if (document.documentElement && document.documentElement.clientWidth) {
        winW = document.documentElement.clientWidth;
    } else if (document.body) {
        winW = document.body.clientWidth;
    }
    return winW;
}

function createCarItem(itemExample ,itemData)
{
    var $item = $(itemExample.cloneNode(true));
    $item.find(".carItem").text(itemData.name);
    $item.find(".carPrice").find('i').text(itemData.price);
    return $item;
}

function createShopItem(itemExample ,itemData)
{
    var $item = $(itemExample.cloneNode(true));
    $item.find(".shopItem").text(itemData.name);
    $item.find(".shopPhone").text(itemData.phone);
    return $item;
}

function initHistory(historyArr, carItem, shopItem)
{
    var len = historyArr.length;
    if(len === 0)
    {
        $("#browsing-record").html('<p>暂时无浏览记录</p>');
        return;
    }
    var $container = $('#browsing-record-list').empty();
    for(var i = 0; i < len; ++i)
    {
        var $item;
        if(historyArr[i].type == "car")
        {
            $item = createCarItem(carItem, historyArr[i]);
        }
        else
        {
            $item = createShopItem(shopItem, historyArr[i]);
        }
        $container.append($item);
    }
    $container.find(".deleteBtn").each(function(i, item)
    {
        $(this).on("tap", function()
        {
            $container.find('li').eq(i).remove();
            historyList.splice(i, 1);
            window.localStorage.setItem('historyList', JSON.stringify(historyList));
            if(historyList.length === 0)
            {
                $("#browsing-record").html('<p>暂时无浏览记录</p>');
            }
        });
    });
}

function initCollect(collectArr, carItem, shopItem)
{
    var len = collectArr.length;
    if(len === 0)
    {
        $("#collect-record").html('<p>暂时无收藏记录</p>');
        return;
    }
    var $container = $('#collect-record-list').empty();
    for(var i = 0; i < len; ++i)
    {
        var $item;
        if(collectArr[i].type == "car")
        {
            $item = createCarItem(carItem, collectArr[i]);
        }
        else
        {
            $item = createShopItem(shopItem, collectArr[i]);
        }
        $container.append($item);
    }
    $container.find(".deleteBtn").each(function(i, item)
    {
        $(this).on("tap", function()
        {
            $container.find('li').eq(i).remove();
            collectList.splice(i, 1);
            window.localStorage.setItem('collectList', JSON.stringify(collectList));
            if(collectList.length === 0)
            {
                $("#collect-record").html('<p>暂时无收藏记录</p>');
            }
        });
    });
}

function scrollShow()
{
    var offset = $('#shop-cars').offset();
    if((offset.top > $(window).scrollTop() && offset.top < $(window).scrollTop() + window.screen.availHeight)
        || (offset.top + offset.height > $(window).scrollTop() && offset.top + offset.height < $(window).scrollTop() + window.screen.availHeight)
        || (offset.top < $(window).scrollTop() && offset.top + offset.height > $(window).scrollTop() + window.screen.availHeight))
    {
        $('#page-head').hide();
        $('#toolbar').show();
    }
    else
    {
        $('#page-head').show();
        $('#toolbar').hide();
    }
}

$(function() {
    CarMasterSelect.BindMasterTap();
    try {
        if (typeof (brandMods) != "undefined") {
            var len = brandMods.length;
            for (var i = 0; i <= brandMods.length; i++) {
                SetJsonToData(brandMods[i].i, brandMods[i].s);
            }
        }
    }
    catch (err) { }
    var $collectItems = $("#collect-record-list").find('li');
    var carItem = $collectItems[0], shopItem = $collectItems[1];
    //填充历史与收藏数据
    if(window.localStorage)
    {
        initCollect(collectList, carItem, shopItem);
        initHistory(historyList, carItem, shopItem);
        //清空按钮
        $('#clearBtn').on('tap', function()
        {
            if($('#collect-record-wrap').hasClass('ui-state-active'))
            {
                collectList = [];
                window.localStorage.setItem('collectList', collectList);
                $('#collect-record-list').empty();
                $("#collect-record").html('<p>暂时无收藏记录</p>');
            }
            else
            {
                historyList = [];
                window.localStorage.setItem('historyList', historyList);
                $('#history-record-list').empty();
                $("#history-record").html('<p>暂时无浏览记录</p>');
            }
        });
    }
    else
    {
        $("#collect-record").html('<p>您的浏览器不支持收藏</p>');
        $("#browsing-record").html('<p>您的浏览器不支持查看历史记录</p>');
    }

    //关闭广告栏
    $('#adBanner').find('.close').on('tap', function()
    {
        $('#adBanner').hide();
    });

    //滑动导航
    $('#nav').navigator();

    $('#nav_arrow').on('tap', function(){
        $('#nav').iScroll( 'scrollTo', 100, 0, 400, true );
    });

    //展开与关闭
    $('.readmore').on('tap', function()
    {
        $(this).toggleClass('closemore').parent().next().toggle();
    });

    //tabs切换
    $(".history-tabs").tabs();

    //历史与收藏
    $("#history").on("tap", function()
    {
        $('.search-wrap').css('visibility', 'hidden');

        var $history_wrap = $('.history-wrap');
        if($history_wrap.css('visibility') == 'hidden')
        {
            $history_wrap.css('visibility', 'visible');
            $("#static-part").hide();
        }
        else
        {
            $history_wrap.css('visibility', 'hidden');
            $("#static-part").show();
        }
    });
    $('#closeBtn').on('tap', function()
    {
        $('.history-wrap').css('visibility', 'hidden');
        $("#static-part").show();
    });



    //搜索框
    $("#search").on("tap", function()
    {
        $('.history-wrap').css('visibility', 'hidden');
        var $search_wrap = $('.search-wrap');
        if($search_wrap.css('visibility') == 'hidden')
        {
            $search_wrap.css('visibility', 'visible');
            $("#static-part").hide();
        }
        else
        {
            $search_wrap.css('visibility', 'hidden');
            $("#static-part").show();
        }
    });

    //留言对话框
    $("#message-dialog").dialog({
        autoOpen:false,
        closeBtn:false,
        title:"留言",
        buttons: {
            "取消": function(){
                this.close();
            },
            "确定": function(){
                this.close();
            }
        }
    });

    //建议对话框
    $("#suggest-dialog").dialog({
        autoOpen:false,
        closeBtn:false,
        buttons: {
            "取消": function(){
                this.close();
            },
            "确定": function(){
                this.close();
            }
        }
    });

    //弹出建议对话框
    $("#suggestion").on('tap', function()
    {
        $('#suggest-dialog').dialog('open');
    });

    //弹出留言对话框
    $('.message').on('tap', function()
    {
        $('#message-dialog').dialog('open');
        return false;
    });
    $(".tab-car").tabs();
    $("#shop-cars").tabs();



    $(window).on('scroll', scrollShow);

    //筛选品牌
    $('#selectBrand').on('tap', function()
    {
        $('#toolbar').children('.option').removeClass('active');
        $("#price-page").hide();
        $("#year-page").hide();
        $("#more-page").hide();
        $("#level-page").hide();
        $("#mile-page").hide();
        $("#displacement-page").hide();
        $("#gearbox-page").hide();
        $("#color-page").hide();
        $("#main-page").hide();
        $("#brand-page").show();
        window.scrollTo(0,0);
    });
    $(".goBack").on("tap", function()
    {
        $("#main-page").show();
        $("#brand-page").hide();
        window.scrollTo(0,0);
    });

    //筛选
    $("#selectPrice").on('tap', function()
    {
        //其他正在显示且需要显示
        if(!$(this).hasClass('active'))
        {
            $('#toolbar').children('.option').removeClass('active');
            $(this).toggleClass('active');
            $("#year-page").hide();
            $("#more-page").hide();
            $("#level-page").hide();
            $("#mile-page").hide();
            $("#displacement-page").hide();
            $("#gearbox-page").hide();
            $("#color-page").hide();

            $(window).off('scroll');
            $("#main-page").hide();
            $("#price-page").show();
        }
        //需要隐藏
        else
        {
            $(this).toggleClass('active');
            $(window).on('scroll', scrollShow);
            $("#main-page").show();
            $("#price-page").hide();
        }
        isShow = !isShow;
    });

    $("#selectYear").on('tap', function()
    {
        if(!$(this).hasClass('active'))
        {
            $('#toolbar').children('.option').removeClass('active');
            $(this).toggleClass('active');
            $("#price-page").hide();
            $("#more-page").hide();
            $("#level-page").hide();
            $("#mile-page").hide();
            $("#displacement-page").hide();
            $("#gearbox-page").hide();
            $("#color-page").hide();

            $(window).off('scroll');
            $("#main-page").hide();
            $("#year-page").show();
        }
        else
        {
            $(this).toggleClass('active');
            $(window).on('scroll', scrollShow);
            $("#main-page").show();
            $("#year-page").hide();
        }
    });

    $("#selectMore").on('tap', function()
    {
        if(!$(this).hasClass('active'))
        {
            $('#toolbar').children('.option').removeClass('active');
            $(this).toggleClass('active');
            $("#year-page").hide();
            $("#price-page").hide();
            $("#level-page").hide();
            $("#mile-page").hide();
            $("#displacement-page").hide();
            $("#gearbox-page").hide();
            $("#color-page").hide();

            $(window).off('scroll');
            $("#main-page").hide();
            $("#more-page").show();
        }
        else
        {
            $(this).toggleClass('active');
            $(window).on('scroll', scrollShow);
            $("#main-page").show();
            $("#more-page").hide();
            $("#level-page").hide();
            $("#mile-page").hide();
            $("#displacement-page").hide();
            $("#gearbox-page").hide();
            $("#color-page").hide();
        }
    });

    $('#more-page').find('li').on("tap", function()
    {
        var target = '#' + $(this).attr('id').split('-')[0] + '-page';
        $('#more-page').hide();
        $(target).show();
    });

    $('.page-head').find('span').on('tap', function()
    {
        $(this).parent().parent().hide();
        $("#more-page").show();
    });

    $('#collect-record-wrap').iScroll();
    $('#browsing-record-wrap').iScroll();
});