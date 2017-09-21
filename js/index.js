/**
 * Created by Administrator on 2017/9/20.
 */
$(document).ready(function () {
    //监听模式切换时
    window.onresize = function () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            $("#platformModal").modal('show');
        }
    };

    //移动orPC
    (function browserRedirect() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            $("#platformModal").modal('show');
        }
    })();

    //设置背景色
    $('#color-picker').colorpicker({
        align: 'left',
    }).on('changeColor', function (e) {
        $('#editContent')[0].style.backgroundColor = e.color.toString('rgba');
        if ($('#editContent').css('display') == 'none') {
            $('.note-editable')[0].style.backgroundColor = e.color.toString('rgba');
        }
    });

    //summernote加载中文语言包
    $('.summernote').summernote({
        lang: 'zh-CN'
    });

    //智能隐藏导航栏
    var new_scroll_position = 0;
    var last_scroll_position;
    //设置滚动多少隐藏
    var setHeight = 50;
    var header = document.getElementById("menu-nav");
    window.addEventListener('scroll', function (e) {
        last_scroll_position = window.scrollY;
        // 向下滚动
        if (new_scroll_position < last_scroll_position && last_scroll_position > setHeight) {
            header.classList.remove("slideDown");
            header.classList.add("slideUp");
            // 向上滚动
        } else if (new_scroll_position > last_scroll_position) {
            header.classList.remove("slideUp");
            header.classList.add("slideDown");
            $(".web-code-div").css("display", "none");
        }
        new_scroll_position = last_scroll_position;
    });

    //默认隐藏返回顶部按钮
    $(function () {
        //移动距离超过一定距离时出现
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $(".back-top").fadeIn("normal");
            } else {
                $(".back-top").fadeOut("normal");
            }
        });
        //返回顶部
        $(".back-top").click(function (e) {
            e.preventDefault();
            var speed = 500;//滑动的速度
            $('body,html').animate({scrollTop: 0}, speed);
            return false;
        });
    });
});

//编辑
function edit() {
    $('#editContent').summernote({
        lang: 'zh-CN',
        focus: true
    });
}

//预览（保存）
function save() {
    var markup = $('#editContent').summernote('code'); //save HTML If you need.
    $('#editContent').summernote('destroy');
}

//截取指定区域
function takeScreenShot() {
    //开启动画
    $("#main-loading").loading({state: "open"});
    $("#createPic").html("生成中…");
    $('#img-content').attr({"src": "", "data-original": ""});
    html2canvas($('#editContent'), {
        onrendered: function (canvas) {
            //关闭动画
            $("#main-loading").loading({state: "close"});
            $("#createPic").html("生成长图");
            if ($('#editContent').css('display') == 'none') {
                $('#tipModal').modal('show');
            } else {
                //转换成base64
                var imgUrl = canvas.toDataURL("image/png");
                $('#img-content').attr({"src": imgUrl, "data-original": imgUrl});
                $('.preview').viewer();
            }
        },
        allowTaint: true
        // width: 300,
        // height: 300
    });
}
