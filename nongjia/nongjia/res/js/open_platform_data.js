$(document).ready(function () {
    var url = location.href;
    var dataId = parse_url(url);
    data_select(dataId['dataId']);
    $('.list').click(function () {
        var index = $(this).index();
        data_select(index);
    });

    function data_select(num) {
        $('.list').eq(num).addClass('select').siblings().removeClass('select');
    }

});