/**
 * Created by Administrator on 2017/10/9.
 */
//上传图片
document.getElementById('file').addEventListener('change', function (e) {
    var file = e.target.files;
    if (file.length) {
        file = file[0];
        var r = new FileReader();
        r.readAsDataURL(file);
        r.onload = function (e) {
            img.src = this.result;
        };
        clearAll();
    }
});

var main = document.getElementById('main');
var img = document.getElementById('img');
var c = document.getElementById("myCanvas");
c.width = c.parentNode.offsetWidth;
var ctx = c.getContext("2d");

//初始化识别任务
var faceLeft = 0;
var faceTop = 0;
var prop = 1;
var tracker = new tracking.ObjectTracker('face');
tracker.on('track', function (event) {
    if (!event.data.length) {
        comBtn.forEach(function (e) {
            e.classList.add('hide');
        });
        $.seaToast("失败", "未检测到人脸！", "error", {
            stack: true,
            timeout: 5e3,
            has_progress: true
        });
        $('.compound-tool').css('display', 'none');
    } else {
        //识别成功，关闭动画
        $("#main-loading").loading({state: "close"});
        comBtn.forEach(function (e) {
            e.classList.remove('hide');
        });
        var faceArr;
        //识别结果排序
        if (event.data.length == 1) {
            faceArr = event.data;
        } else {
            faceArr = arraySort(event.data, 'x');
        }
        faceArr.forEach(function (rect, i) {
            if (!i) {
                theFace = rect;
            }
            plot(rect.x, rect.y, rect.width, rect.height);
            ctx.drawImage(img, rect.x * prop, rect.y * prop, rect.width * prop, rect.height * prop, faceLeft, faceTop, rect.width * prop, rect.height * prop);
            if (faceLeft + (rect.width * prop + 10) < 500) {
                faceLeft += (rect.width * prop + 10);
            } else {
                faceLeft = 0;
                faceTop += 200;
            }
        });
    }
});

var trackerTask;
//开始识别
document.getElementById('track').addEventListener('click', function () {
    //正在识别，开启动画
    $("#main-loading").loading({state: "open"});
    if (!img.src) {
        $.seaToast("失败", "未检测到照片！", "error", {
            stack: true,
            timeout: 5e3,
            has_progress: true
        });
        $('.compound-tool').css('display', 'none');
        return null;
    }
    restore();
    c.width = img.width;
    c.height = img.height;
    var stepSize = 1.5;
    var trackMode = 1.5;
    //console.log("识别步长:", stepSize, "比例因子:" + trackMode);
    tracker.setStepSize(stepSize);
    tracker.setScaleFactor(trackMode);
    if (trackerTask) {
        trackerTask.stop();
    }
    if (img.naturalWidth > img.width) {
        prop = img.naturalWidth / img.width;
    } else {
        prop = 1;
    }
    trackerTask = tracking.track(img, tracker);
});

//识别区域划线
function plot(x, y, w, h) {
    var rect = document.createElement('div');
    document.querySelector('.view-container').appendChild(rect);
    rect.classList.add('rect');
    rect.style.width = w + 'px';
    rect.style.height = h + 'px';
    rect.style.left = (img.offsetLeft + x) + 'px';
    rect.style.top = (img.offsetTop + y) + 'px';
    $('.compound-tool').css('display', 'block');
}

//恢复现场
function restore() {
    theFace = null;
    faceLeft = 0;
    faceTop = 0;
    document.getElementById('file').value = '';
    var rects = document.querySelectorAll('.rect');
    if (rects) {
        var i = 0;
        for (; i < rects.length; i++) {
            main.removeChild(rects[i]);
        }
    }
    $('.compound-tool').css('display', 'none');
}

//清空
function clearAll() {
    img.removeAttribute('src');
    ctx.clearRect(0, 0, c.width, c.height);
    comBtn.forEach(function (e) {
        e.classList.add('hide');
    });
    restore();
}

//图片合成
var theFace;
var faceImg = document.getElementById('theFace');
var faceC = document.getElementById('faceCtx');
var faceCtx = faceC.getContext('2d');
var comBtn = document.querySelectorAll('.compound');
var maleBg = document.getElementById('maleBg');
var femaleBg = document.getElementById('femaleBg');
comBtn.forEach(function (btn) {
    btn.addEventListener('click', function () {
        var isMale = btn.classList.contains('male');
        c.width = 400;
        c.height = 480;
        ctx.clearRect(0, 0, c.width, c.height);
        if (theFace) {
            //开启动画
            $("#main-loading").loading({state: "open", time: 3e3});
            faceC.width = theFace.width * prop;
            faceC.height = theFace.height * prop;
            faceCtx.clearRect(0, 0, faceC.width, faceC.height);
            faceCtx.drawImage(img, theFace.x * prop, theFace.y * prop, theFace.width * prop, theFace.height * prop, 0, 0, theFace.width * prop, theFace.height * prop);
            faceImg.src = faceC.toDataURL("image/jpeg", 1.0);
            faceImg.loadOnce(function () {
                if (isMale) {
                    AlloyImage(this).act("灰度处理").add(
                        AlloyImage(this.width, this.height, "#808080")
                            .act("高斯模糊", 4)
                            .act("色相/饱和度调节", 22, 45, 0, true),
                        "叠加"
                    ).replace(this);
                } else {
                    AlloyImage(this).act("灰度处理").add(
                        AlloyImage(this.width, this.height, "#808080")
                            .act("高斯模糊", 4)
                            .act("色相/饱和度调节", 28, 55, 0, true),
                        "叠加"
                    ).replace(this);
                }
                setTimeout(function () {
                    var newFace = document.getElementById('theFace');
                    if (isMale) {
                        ctx.drawImage(newFace, 0, 0, theFace.width * prop, theFace.height * prop, 95, 100, 186, 186);
                        ctx.drawImage(maleBg, 0, 0);
                    } else {
                        ctx.drawImage(newFace, 0, 0, theFace.width * prop, theFace.height * prop, 117, 74, 194, 194);
                        ctx.drawImage(femaleBg, 0, 0);
                    }
                    //关闭动画
                    $("#main-loading").loading({state: "close"});
                }, 400);
            });
        } else {
            //关闭动画
            $("#main-loading").loading({state: "close"});
            $.seaToast("失败", "未检测到人脸！", "error", {
                stack: true,
                timeout: 5e3,
                has_progress: true
            });
        }
    });
});