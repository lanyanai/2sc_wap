/**
 * Created by zd on 2014/5/11 0011.
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

/* ��ʾ������ϵ��״̬�� */
function closeLinkInfo(type) {
    if (type == 1) {
        $('#LinkInfo').hide();
        $('#openLinkInfo').show();
    } else {
        $('#LinkInfo').show();
        $('#openLinkInfo').hide();
    }
}

$(function() {

    var $collectItems = $("#collect-record-list").find('li');
    var carItem = $collectItems[0], shopItem = $collectItems[1];
    //�����ʷ���ղ�����
    if(window.localStorage)
    {
        historyObj[location.href] =
        {
            'type':'car',
            'price':$('.car-price-con').text(),
            'name':$('.car-tit-con').find('h4').text()
        };
        historyObj.length++;
        localStorage.setItem('historyObj', JSON.stringify(historyObj));
        initCollect(collectObj, carItem, shopItem);
        initHistory(historyObj, carItem, shopItem);
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
                historyObj = {length:0};
                localStorage.setItem('historyObj', JSON.stringify(historyObj));
                $('#history-record-list').empty();
                $("#history-record").html('<p>��ʱ�������¼</p>');
            }
        });

        //�ղع���
        if(collectObj[location.href])
        {
            $('#collectBtn').addClass('active').text('ȡ���ղ�');
        }
        $('#collectBtn').on('tap', function()
        {
            if($(this).hasClass('active'))
            {
                $(this).removeClass('active').text('�ղش˳�');
                collectObj[location.href] = null;
                collectObj.length--;
                localStorage.setItem('collectObj', JSON.stringify(collectObj));
            }
            else
            {
                $(this).addClass('active').text('ȡ���ղ�');
                collectObj[location.href] =
                {
                    'type':'car',
                    'price':$('.car-price-con').text(),
                    'name':$('.car-tit-con').find('h4').text()
                };
                collectObj.length++;
                localStorage.setItem('collectObj', JSON.stringify(collectObj));
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
        return false;
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

    //��Դtab��
    $('#recommend-cars').tabs();

    //��������Ի���
    $("#suggestion").on('tap', function()
    {
        $('#suggest-dialog').dialog('open');
        return false;
    });

    //�����ٱ��Ի���
    $('.report').on('tap', function()
    {
        $('#report-dialog').dialog('open');
        return false;
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

    //�������ԶԻ���
    $('.message').on('tap', function()
    {
        $('#message-dialog').dialog('open');
        return false;
    });



    var $body = $('body');
    if(mapSetting){
        mapFunc.initialize({x:mapSetting.mapX,y:mapSetting.mapY,tit:mapSetting.title});
        mapFunc.busStartPos();
        if($body[0].style.overflow == 'hidden'){
            $body[0].style.overflow = 'auto';
        }
    }
});