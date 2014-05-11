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
            "取消": function(){
                this.close();
            },
            "确定": function(){
                this.close();
            }
        }
    });

    $("#suggestion").on('tap', function()
    {
        $('#suggest-dialog').dialog('open');
    });

    $("#tab-car").tabs();

    //指定地图容器的id
    sogou.maps.MAPCONTAINER = "shop-map";
    //所有的标记信息
    sogou.maps.MAPDATA=[
        {
            "id":"1",
            "name":"北京语言大学",
            "address":"北京市海淀区学院路15号北京语言大学",
            "point":"12951574.035764,4837419.72754194"
        }
    ];
    //在信息窗中加入工具面板
    sogou.maps.TOOLPANEL=true;

    (function(){
        if(!sogou.maps.MAPCONTAINER ||!sogou.maps.MAPDATA)return;
        //--------------------------全局变量-----------------------------
        var a=sogou.maps.MAPCONTAINER,b=sogou.maps.MAPDATA,markers=[],c=document.getElementById(a),infowin=new sogou.maps.InfoWindow();
        if(sogou.maps.TOOLPANEL)var tpn=new sogou.maps.ToolPanel();
        //--------------------------创建地图-----------------------------
        //if(!c.clientWidth)c.style.width='400px';//设置地图的宽高
        //if(!c.clientHeight)c.style.height='400px';
        var map=new sogou.maps.Map(c,{});
        //-------------------------公共方法------------------------------
        function getInfowinMessage(f){
            //信息窗内显示的内容
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
        //-------------------------添加标记点----------------------------
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
        //-------------------------调整视野-------------------------------
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