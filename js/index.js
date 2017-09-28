/**
 * Created by Administrator on 2017/9/20.
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
        lang: 'zh-CN',
    });

    //初始化summernote
    $('#editContent').summernote({
        lang: 'zh-CN',
        focus: true,
        height: 300
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

    //监听文档是否保存，进行shake提示
    //$("#save").effect("shake");

    //初始化滑块
    var $document = $(document);
    var selector = '[data-rangeslider]';
    var $inputRange = $(selector);
    // Example functionality to demonstrate a value feedback
    // and change the output's value.
    function valueOutput(element) {
        var value = element.value;
        var output = element.parentNode.getElementsByTagName('output')[0];
        output.innerHTML = value;
        calcWidth(element, value);
    }

    // Initial value output
    for (var i = $inputRange.length - 1; i >= 0; i--) {
        valueOutput($inputRange[i]);
    }
    // Update value output
    $document.on('input', selector, function (e) {
        valueOutput(e.target);
    });
    // Initialize the elements
    $inputRange.rangeslider({
        polyfill: false
    });
    //滑块结束
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

//计算宽度
function calcWidth(ele, val) {
    var flag = $(ele).attr('data-flag');
    //计算文档整体宽度
    if (flag == 'total') {
        $('#editContent').css('width', val + '%');
        $('#sizeSelfTotal').val($('#editContent').css('width'));
    } else if (flag == 'show') {
        var idName = "magicdomid";
        if (val) {
            var itemList = $('#editContent').children();
            for (var i = 0; i < itemList.length; i++) {
                if ($(itemList[i]).attr('id') && $(itemList[i]).attr('id').indexOf(idName) > -1) {
                    $(itemList[i]).css({"padding-left": val + "px", "padding-right": "0"});
                    $('#sizeSelfShow').val($(itemList[i]).css('padding-left'));
                    //$(itemList[i]).css({"padding": "0  " + val + " "});
                }
            }
        }
    }
}


//自定义文档整体宽度
function sizeSelfTotalFunc() {
    var sizeSelf = $('#sizeSelfTotal').val();
    if (sizeSelf) {
        $('#editContent').css('width', sizeSelf);
    }
}

//自定义文档内容显示宽度
function sizeSelfTShowFunc() {
    var val = $('#sizeSelfShow').val();
    var idName = "magicdomid";
    var itemList = $('#editContent').children();
    if (val) {
        for (var i = 0; i < itemList.length; i++) {
            if ($(itemList[i]).attr('id') && $(itemList[i]).attr('id').indexOf(idName) > -1) {
                $(itemList[i]).css({"padding-left": val, "padding-right": "0"});
            }
        }
    }
}


//截取指定区域
function takeScreenShot() {
    if ($('#editContent').css('display') == 'none') {
        $('#tipModal').modal('show');
    } else {
        //开启动画
        $("#main-loading").loading({state: "open"});
        $("#createPic").html("生成中…");
        $('#img-content').attr({"src": "", "data-original": ""});
        //隐藏图片区域
        $("#img-area").css("display","none");
        html2canvas($('#editContent'), {
            onrendered: function (canvas) {
                //转换成base64
                var imgUrl = canvas.toDataURL("image/png");
                $('#img-content').attr({"src": imgUrl, "data-original": imgUrl});
                $('.preview').viewer();
                //关闭动画
                $("#main-loading").loading({state: "close"});
                $("#createPic").html("生成长图");
                //显示图片区域
                $("#img-area").css("display","block");
            },
            allowTaint: true
        });
    }
}
