/**
 * Created by Administrator on 2014/5/26.
 */

$(function()
{
    var $collectItems = $("#collect-record-list").find('li');
    var carItem = $collectItems[0], shopItem = $collectItems[1];
    //填充历史与收藏数据
    if(window.localStorage)
    {
        initCollect(collectObj, carItem, shopItem);
        initHistory(historyCarArr, historyShopArr, carItem, shopItem);
        //清空按钮
        $('#clearBtn').on('tap', function()
        {
            if($('#collect-record-wrap').hasClass('ui-state-active'))
            {
                collectObj = {length:0};
                localStorage.setItem('collectObj', JSON.stringify(collectObj));
                $('#collect-record-list').empty();
                $("#collect-record").html('<p>暂时无收藏记录</p>');
            }
            else
            {
                historyCarArr = historyShopArr = [];
                localStorage.setItem('historyCarArr', JSON.stringify(historyCarArr));
                localStorage.setItem('historyShopArr', JSON.stringify(historyShopArr));
                $('#history-record-list').empty();
                $("#history-record-list").html('<p>暂时无浏览记录</p>');
            }
        });
    }
    else
    {
        $("#collect-record").html('<p>您的浏览器不支持收藏</p>');
        $("#browsing-record").html('<p>您的浏览器不支持查看历史记录</p>');
    }

    //关闭广告栏
    $('#adBanner').find('.close').on('click', function()
    {
        $('#adBanner').hide();
        return false;
    });

    //滑动导航
    $('#nav').navigator();

    $('#nav_arrow').on('tap', function(){
        $('#nav').iScroll( 'scrollTo', 100, 0, 400, true );
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
            initHistory(historyObj, carItem, shopItem);
            initCollect(collectObj, carItem, shopItem);
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

});