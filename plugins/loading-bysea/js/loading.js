/**
 * Created by Administrator on 2017/9/21.
 */
(function ($) {
    $.fn.loading = function (options) {
        var parameter = {
            state: "open",        //open，close，加载状态，默认open
            type: false,             //0-11，图片类型，false默认随机
            anim: false,            //0-2，动画类型，false默认随机
            rgba: "rgba(0,0,0,0.3)",  //0-1，背景，默认0.3
            time: false             //超时关闭，false默认不关闭
        };
        var ops = $.extend(parameter, options);
        var $this = $(this);
        var _this = this;
        var _state = ops.state;
        var _type = ops.type;
        var _anim = ops.anim;
        var _rgba = ops.rgba;
        var _time = ops.time;
        if (_state == 'open') {
            _this.css({
                "display": "none",
                "position": "fixed",
                "left": 0,
                "top": 0,
                "right": 0,
                "bottom": 0,
                "width": "100%",
                "height": "100%",
                "z-index": 999999,
                "background-color": _rgba
            });
            if (!_type || isNaN(_type)) {
                _type = parseInt(Math.random() * 12);
            } else {
                _type = parseInt(_type) % 12;
            }
            var loadHtml = '';
            loadHtml += '<div class="yhy-loading-con">';
            loadHtml += '<div class="yhy-loading-circle"></div>';
            loadHtml += '<img class="yhy-pre-load-img" src="./plugins/loading-bysea/img/lol/' + _type + '.jpg">';
            loadHtml += ' </div>';
            _this.append(loadHtml);

            if (!_anim || isNaN(_anim))_anim = parseInt(Math.random() * 3);
            switch (_anim % 3) {
                case 0 :
                    $this.fadeIn("normal");
                    break;
                case 1 :
                    $this.slideDown("normal");
                    break;
                case 2 :
                    _this.css("display", "block");
                    break;
            }

            if (!_time || isNaN(_time)) {
                return;
            } else {
                setTimeout(function () {
                    switch (_anim) {
                        case 0 :
                            $this.fadeOut("normal");
                            break;
                        case 1 :
                            $this.slideUp("normal");
                            break;
                        case 2 :
                            _this.css("display", "none");
                            break;
                    }
                }, _time);
            }
        } else if (_state == 'close') {
            _this.css({"display": "none"});
        } else {
            _this.css({"display": "none"});
        }
    }
})(jQuery);