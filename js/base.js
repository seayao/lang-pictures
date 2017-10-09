/**
 * Created by Administrator on 2017/10/9.
 */
$(document).ready(function () {
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
            //$("#platformModal").modal('show');
        }
    })();

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

    //点击扫码
    $(".scan-log").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".web-code-div").fadeToggle("fast");
    });

    //全屏检测二维码如存在则点击消失
    $(window).click(function () {
        $(".web-code-div").fadeOut("fast");
    });

    //bootstrap禁止点击隐藏下拉框组
    $(function () {
        $("ul.dropdown-menu").on("click", "[data-stopPropagation]", function (even) {
            even.stopPropagation();
        });
    });
});