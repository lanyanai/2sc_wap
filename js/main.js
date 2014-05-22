/**
 * Created by Administrator on 2014/4/21.
 */

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
        $("#browsing-record").html('<p>��ʱ�������¼</p>');
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
                $("#browsing-record").html('<p>��ʱ�������¼</p>');
            }
        });
    });
}

function initCollect(collectArr, carItem, shopItem)
{
    var len = collectArr.length;
    if(len === 0)
    {
        $("#collect-record").html('<p>��ʱ���ղؼ�¼</p>');
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
                $("#collect-record").html('<p>��ʱ���ղؼ�¼</p>');
            }
        });
    });
}

$(function()
{
    var $collectItems = $("#collect-record-list").find('li');
    var carItem = $collectItems[0], shopItem = $collectItems[1];
    //�����ʷ���ղ�����
    if(window.localStorage)
    {
        initCollect(collectList, carItem, shopItem);
        initHistory(historyList, carItem, shopItem);
        //��հ�ť
        $('#clearBtn').on('tap', function()
        {
            if($('#collect-record-wrap').hasClass('ui-state-active'))
            {
                collectList = [];
                window.localStorage.setItem('collectList', collectList);
                $('#collect-record-list').empty();
                $("#collect-record").html('<p>��ʱ���ղؼ�¼</p>');
            }
            else
            {
                historyList = [];
                window.localStorage.setItem('historyList', historyList);
                $('#history-record-list').empty();
                $("#history-record").html('<p>��ʱ�������¼</p>');
            }
        });
    }
    else
    {
        $("#collect-record").html('<p>�����������֧���ղ�</p>');
        $("#browsing-record").html('<p>�����������֧�ֲ鿴��ʷ��¼</p>');
    }

    //�رչ����
    $('#adBanner').find('.close').on('tap', function()
    {
        $('#adBanner').hide();
    });

    //��������
    $('#nav').navigator();

    $('#nav_arrow').on('tap', function(){
        $('#nav').iScroll( 'scrollTo', 100, 0, 400, true );
    });

    //չ����ر�
    $('.readmore').on('tap', function()
    {
        $(this).toggleClass('closemore').parent().next().toggle();
    });

    //�ֲ�
    $('#news-slider').slider({loop:true});
    $('#focusSlider').slider();

    //tabs�л�
    $(".history-tabs").tabs();

    //��ʷ���ղ�
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



    //������
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

    //���ԶԻ���
    $("#message-dialog").dialog({
        autoOpen:false,
        closeBtn:false,
        title:"����",
        buttons: {
            "ȡ��": function(){
                this.close();
            },
            "ȷ��": function(){
                this.close();
            }
        }
    });

    //����Ի���
    $("#suggest-dialog").dialog({
        autoOpen:false,
        closeBtn:false,
        buttons: {
            "ȡ��": function(){
                this.close();
            },
            "ȷ��": function(){
                this.close();
            }
        }
    });

    //��������Ի���
    $("#suggestion").on('tap', function()
    {
        $('#suggest-dialog').dialog('open');
    });

    //�������ԶԻ���
    $('.message').on('tap', function()
    {
        $('#message-dialog').dialog('open');
        return false;
    });


    $('#collect-record-wrap').iScroll();
    $('#browsing-record-wrap').iScroll();
});