/**
 * Created by Administrator on 2014/4/21.
 */
$(function()
{
    var left = $('#nav ul').offset().left;
    $('#nav').navigator();

    $('#nav_arrow').on('click', function(){
        $('#nav').iScroll( 'scrollTo', 100, 0, 400, true );
    });

    $('.readmore').on('tap', function()
    {
        $(this).toggleClass('closemore').parent().next().toggle();
    });

    $('#news-slider').slider();
    $('#focusSlider').slider();
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

    $('.message').on('tap', function()
    {
        $('#message-dialog').dialog('open');
        return false;
    });


});