/**
 * Created by Administrator on 2017/9/20.
 */
$(document).ready(function () {
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
var edit = function () {
    $('#editContent').summernote({
        lang: 'zh-CN',
        focus: true
    });
};

//预览（保存）
var save = function () {
    var markup = $('#editContent').summernote('code'); //save HTML If you need.
    $('#editContent').summernote('destroy');
    //console.log(markup)
};

//截取指定区域
function takeScreenShot() {
    var editContent = document.getElementById('editContent');
    html2canvas(editContent, {
        onrendered: function (canvas) {
            if (editContent.style.display == 'none') {
                $('#tipModal').modal('show');
            }else {
                var preview = document.getElementsByClassName('preview')[0];
                //转换成base64
                var imgUrl = canvas.toDataURL("image/png");
                var imgLabel = document.createElement("img");//创建a标签
                preview.appendChild(imgLabel);
                imgLabel.setAttribute("src", imgUrl);
                imgLabel.className = "img-rounded";
                preview.append(imgLabel);
            }
        },
        allowTaint: true
        // width: 300,
        // height: 300
    });
}