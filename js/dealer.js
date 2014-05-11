/**
 * Created by zd on 2014/5/5 0005.
 */
$(function() {
    var left = $('#nav ul').offset().left;
    $('#nav').navigator();

    $('#nav_arrow').on('click', function () {
        $('#nav').iScroll('scrollTo', 100, 0, 400, true);
    });

    $(".history-tabs").tabs();
    $("#history").on("tap", function()
    {
        $('.search-wrap').hide();
        $('.history-wrap').toggle();
    });
    $("#search").on("tap", function()
    {
        $('.history-wrap').hide();
        $('.search-wrap').toggle();
    });

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

    $("#suggestion").on('tap', function()
    {
        $('#suggest-dialog').dialog('open');
    });

    $("#tab-car").tabs();

    //ָ����ͼ������id
    sogou.maps.MAPCONTAINER = "shop-map";
    //���еı����Ϣ
    sogou.maps.MAPDATA=[
        {
            "id":"1",
            "name":"�������Դ�ѧ",
            "address":"�����к�����ѧԺ·15�ű������Դ�ѧ",
            "point":"12951574.035764,4837419.72754194"
        }
    ];
    //����Ϣ���м��빤�����
    sogou.maps.TOOLPANEL=true;

    (function(){
        if(!sogou.maps.MAPCONTAINER ||!sogou.maps.MAPDATA)return;
        //--------------------------ȫ�ֱ���-----------------------------
        var a=sogou.maps.MAPCONTAINER,b=sogou.maps.MAPDATA,markers=[],c=document.getElementById(a),infowin=new sogou.maps.InfoWindow();
        if(sogou.maps.TOOLPANEL)var tpn=new sogou.maps.ToolPanel();
        //--------------------------������ͼ-----------------------------
        //if(!c.clientWidth)c.style.width='400px';//���õ�ͼ�Ŀ��
        //if(!c.clientHeight)c.style.height='400px';
        var map=new sogou.maps.Map(c,{});
        //-------------------------��������------------------------------
        function getInfowinMessage(f){
            //��Ϣ������ʾ������
            var container=document.createElement('ul');
            container.style.listStyle='none';
            container.style.margin='10px';
            container.style.padding='0px';
            container.style.lineHeight='18px';
            container.style.fontSize='12px';
            for(var i in f){
                if(i=='id'||i=='point')continue;
                var li=document.createElement('li');
                var key=i.replace('name','\u540D\u79F0').replace('address','\u5730\u5740').replace('phone','\u7535\u8BDD').replace('intro','\u7B80\u4ECB');
                li.innerHTML='<span style="font-weight:bolder">'+key+'\uFF1A</span>'+f[i].toString();
                container.appendChild(li);
            }
            return container;
        }
        //-------------------------��ӱ�ǵ�----------------------------
        for(var i=0;i<b.length;i++){
            var o=b[i];
            var x,y;
            x=parseFloat(o.point.split(',')[0]);
            y=parseFloat(o.point.split(',')[1]);
            o.point=new sogou.maps.Point(x,y);
            var m=new sogou.maps.Marker({'id':o.id,'map':map,'position':o.point,'title':o.name,'styleId':'S189'+i});
            m.info=o;
            markers.push(m);
            sogou.maps.event.addListener(m,'click',function(){
                if(c.clientWidth<300||c.clientHeight<300){
                    window.open('http://map.sogou.com/#c='+this.info.point.x+','+this.info.point.y+','+map.getZoom()+'&tip='+this.info.name+','+this.info.point.x+','+this.info.point.y);
                }else{
                    infowin.open(map,this);
                    var div=document.createElement('div');
                    var ul=getInfowinMessage(this.info);
                    div.appendChild(ul);
                    if(tpn){tpn.setPoint(this.getPosition());tpn.setPanel(div);tpn.setCallback(function(a){infowin.setContent(a,1)})}
                    else infowin.setContent(getInfowinMessage(this.info),1);
                }

            });
        }
        //-------------------------������Ұ-------------------------------
        var bounds=new sogou.maps.Bounds();
        for(var i=0;i<markers.length;i++){
            bounds.extend(markers[i].getPosition());
        }
        map.fitBounds(bounds);
    })();

    $('.readmore').on('tap', function()
    {
        $(this).toggleClass('closemore').parent().next().toggle();
    });
});