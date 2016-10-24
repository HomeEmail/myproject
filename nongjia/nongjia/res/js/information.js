$(document).ready(function () {
    $('.showTag div').click(function () {
        var info_arrow = $('.info_arrow');
        var index = $(this).index();
        var width =info_arrow.eq(index).parent().width();
        var left = parseInt((width - 20 ) / 2);
        info_arrow.css('left',left);
        $(this).addClass('select').siblings().removeClass('select');
    });
    var times = 0;
    var time = setInterval(animate,2500)
    var titles = [
        {'title':"关于农村土地继承的问题有些什么法律规定?"},
        {'title':"关于农村土地继承的问题有些什么法律规定2?"},
        {'title':"关于农村土地继承的问题有些什么法律规定3?"},
        {'title':"关于农村土地继承的问题有些什么法律规定4?"},
        {'title':"关于农村土地继承的问题有些什么法律规定5?"}
    ]
    function animate() {
        times ++;
        if(times > 2){
            times = 0;
        }
        $('.dots a').eq(times).addClass('choose').siblings().removeClass('choose');
        var right = (times * 100)+"%";
        $('.news_img').animate({'right':right},1000)
        $('.change_title').html(titles[times].title)
    }
    $('.dots a').click(function () {
        var index = $(this).index();
        var right = (index * 100)+"%";
        $('.dots a').eq(index).addClass('choose').siblings().removeClass('choose');
        $('.news_img').animate({'right':right},1000)
        $('.change_title').html(titles[index].title)
        clearInterval(time)
        times = index;
        time = setInterval(animate,2000)
    })
});