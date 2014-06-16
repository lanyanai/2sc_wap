/**
 * Created by zd on 2014/5/5 0005.
 */

//��ͼ-------------start
(function (win) {
    var map,
        dPos,
        oPos,
        _flag = 1,//1-bus search,2-car search
        _initialize = function (cfg) {
            var _cfg = {};
            _cfg.x = cfg.x || 0;
            _cfg.y = cfg.y || 0;
            _cfg.tit = cfg.tit|| "";
            _cfg.z = cfg.zoom || 15;
            var myLatlng = new sogou.maps.Point(parseFloat(_cfg.x), parseFloat(_cfg.y));
            var myOptions = {
                'zoom': _cfg.z,
                'center': myLatlng,
                'mapTypeId': sogou.maps.MapTypeId.ROADMAP
            }
            map = new sogou.maps.Map(document.getElementById("shop-map"), myOptions);
            var marker = new sogou.maps.Marker({'position': myLatlng,map: map,title:_cfg.tit});
            dPos = myLatlng;
            $('body').removeAttr('style');
        },
    /*������ѯ�ص�function */
        _busCallback = function (a){
            var option={
                'map':map,
                'busResult':a
            };
            map.clearAll();
            var bRender=new sogou.maps.BusRenderer(option);
        },
    /*������ѯ */
        _setBusLine = function (start, dest, maxDist) {
            var request={
                'map':map,        //Map
                'destination':dest,//Ŀ��λ�á�Ҫ���е�ַ�������ַ����� LatLng����Ϊ�ѹ���ͼ���ꡣ���
                'origin':start,        //ԭ���λ�á�Ҫ���е�ַ�������ַ����� LatLng����Ϊ�ѹ���ͼ���ꡣ���
                'maxDist':maxDist//���Ĳ��о��롣��ѡ
            }

            var bus = new sogou.maps.Bus();

            bus.route(request, _busCallback);
        },
    /*�ݳ���ѯ����ʾ��� */
        _setCarLine = function (start, dest, tactic) {
            var request={
                'map':map,
                'destination':dest,
                'origin':start,
                'tactic':tactic       //�ݳ����ԡ� 0�� ����̣�1 ��ʱ��� Ĭ�ϲ��� ����ѡΪ1����2 �����߸���
            }
            var nav=new sogou.maps.Driving();
            nav.route(request);
            map.clearAll();
            //���
            nav.setRenderer(new sogou.maps.DrivingRenderer());
        },
    //ѡbus��ѯ
        _busSelected = function (e) {
            var self = $(this),
                $carSelectBtn = $('#carSelectBtn'),
                $busWrap = $('#busWrap'),
                $carWrap = $('#carWrap');
            if (self.hasClass('cur')) {
                return;
            }
            _flag = 1;
            $carSelectBtn.removeClass('cur');
            self.addClass('cur');
            $busWrap.css('display','block');
            $carWrap.css('display','none');
        },
    //ѡcar��ѯ
        _carSelected = function (e) {
            var self = $(this),
                $busSelectBtn = $('#busSelectBtn'),
                $busWrap = $('#busWrap'),
                $carWrap = $('#carWrap');
            if (self.hasClass('cur')) {
                return;
            }
            _flag = 2;
            $busSelectBtn.removeClass('cur');
            self.addClass('cur');
            $carWrap.css('display','block');
            $busWrap.css('display','none');
        },
    //��ʼbus��ѯ
        _startBusSearch = function (e) {
            var $s = $('#busStart'),
                sval = $s.val();
            //console.log(sval+'  '+eval);
            if (!sval) {
                alert('��������ʼ�ص㣡');
                $s[0].focus();
                return;
            }
            _setBusLine(oPos,dPos,1000);
        },
    //��ʼcar��ѯ
        _startCarSearch = function (e) {
            var $s = $('#carStart'),
                sval = $s.val();
            //console.log(sval+'  '+eval);
            if (!sval) {
                alert('��������ʼ�ص㣡');
                $s[0].focus();
                return;
            }
            _setCarLine(oPos,dPos,2);
        },
    //��ַ�����ص�
        _geocoderCallback = function (a){
            if(_flag === 1){
                $('#busSearchBtn').removeAttr('disabled');
            }else {
                $('#carSearchBtn').removeAttr('disabled');
            }
            if(a.status == 'ok'){
                var geometry=a.data[0];
                oPos = geometry.location;
            } else {
                alert('��������ʼ��ַ����');
            }
        },
    //��ַ����
        _geocoderFunc = function (cfg) {
            if(!cfg){
                return;
            }
            if(_flag === 1){
                $('#busSearchBtn').attr('disabled',true);
            }else {
                $('#carSearchBtn').attr('disabled',true);
            }
            var geo=new sogou.maps.Geocoder();
            geo.geocode(cfg,_geocoderCallback);
        },

        _busStartPos = function (e) {
            var v, cfg;
            v = $('#busStart').val();
            if(!v){
                return;
            }
            cfg= {
                address:{
                    addr:v,
                    city:mapSetting.city
                }
            };
            _geocoderFunc(cfg);
        },
        _carStartPos = function (e) {
            var v, cfg;
            v = $('#busStart').val();
            if(!v){
                return;
            }
            cfg= {
                address:{
                    addr:v,
                    city:mapSetting.city
                }
            };
            _geocoderFunc(cfg);
        },
        _initEvent = function () {
            $('#busSelectBtn').click(_busSelected);
            $('#carSelectBtn').click(_carSelected);
            $('#busSearchBtn').click(_startBusSearch);
            $('#carSearchBtn').click(_startCarSearch);
            $('#busStart').blur(_busStartPos);
            $('#carStart').blur(_carStartPos);
        };

    win['mapFunc'] = {
        initialize : _initialize,
        initEvent : _initEvent,
        busStartPos : _busStartPos
    }

})(window);

$(function() {
    var $collectItems = $("#collect-record-list").find('li');
    var carItem = $collectItems[0], shopItem = $collectItems[1];
    //�����ʷ���ղ�����
    if(window.localStorage)
    {
        var index = indexOfArr(historyShopArr, location.href);
        if(index === -1)
        {
            historyShopArr.push({
                'type':'car',
                'price':$('.car-price-con').find('.left').text() + $('.car-price-con').find('.right').text(),
                'name':$('.car-tit-con').find('h4').text(),
                'url':location.href
            });
            if(historyShopArr.length > 5)
            {
                historyShopArr.shift();
            }
            localStorage.setItem('historyShopArr', JSON.stringify(historyShopArr));
        }
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
    $('#adBanner').find('.close').on('click', function () {
        $('#adBanner').hide();
        return false;
    });

    //��������
    $('#nav').navigator();

    $('#nav_arrow').on('tap', function () {
        $('#nav').iScroll('scrollTo', 100, 0, 400, true);
    });

    //չ����ر�
    $('.readmore').on('tap', function () {
        $(this).toggleClass('closemore').parent().next().toggle();
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

    //�ٱ��Ի���
    $("#report-dialog").dialog({
        autoOpen:false,
        closeBtn:false,
        title:"�ٱ�",
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
        return false;
    });

    //�������ԶԻ���
    $('.report').on('tap', function()
    {
        $('#report-dialog').dialog('open');
        return false;
    });
    $(".tab-car").tabs();
    $("#shop-cars").tabs();

    /*����Ի���

    //����
    $('#shop-share').on('tap', function()
    {

    });*/

    //��ͼ
    var $body = $('body');
    if(mapSetting){
        mapFunc.initialize({x:mapSetting.mapX,y:mapSetting.mapY,tit:mapSetting.title});
        mapFunc.busStartPos();
        if($body[0].style.overflow == 'hidden'){
            $body[0].style.overflow = 'auto';
        }
    }
});