/**
 * Created by Administrator on 2014/5/26.
 */

$(function()
{
    var $collectItems = $("#collect-record-list").find('li');
    var carItem = $collectItems[0], shopItem = $collectItems[1];
    //�����ʷ���ղ�����
    if(window.localStorage)
    {
        initCollect(collectObj, carItem, shopItem);
        initHistory(historyCarArr, historyShopArr, carItem, shopItem);
        //��հ�ť
        $('#clearBtn').on('tap', function()
        {
            if($('#collect-record-wrap').hasClass('ui-state-active'))
            {
                collectObj = {length:0};
                localStorage.setItem('collectObj', JSON.stringify(collectObj));
                $('#collect-record-list').empty();
                $("#collect-record").html('<p>��ʱ���ղؼ�¼</p>');
            }
            else
            {
                historyCarArr = historyShopArr = [];
                localStorage.setItem('historyCarArr', JSON.stringify(historyCarArr));
                localStorage.setItem('historyShopArr', JSON.stringify(historyShopArr));
                $('#history-record-list').empty();
                $("#history-record-list").html('<p>��ʱ�������¼</p>');
            }
        });
    }
    else
    {
        $("#collect-record").html('<p>�����������֧���ղ�</p>');
        $("#browsing-record").html('<p>�����������֧�ֲ鿴��ʷ��¼</p>');
    }

    //�رչ����
    $('#adBanner').find('.close').on('click', function()
    {
        $('#adBanner').hide();
        return false;
    });

    //��������
    $('#nav').navigator();

    $('#nav_arrow').on('tap', function(){
        $('#nav').iScroll( 'scrollTo', 100, 0, 400, true );
    });

    //tabs�л�
    $(".history-tabs").tabs();

    //��ʷ���ղ�
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

});