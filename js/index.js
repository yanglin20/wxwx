$(function() {
    var n = 0;
    var myswiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        noSwiping: true,
        noSwipingClass: 'stop-swiping',

        onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlidePrevEnd: function (swiper) {
            n++;
            myswiper.unlockSwipeToNext();
        },
        onSlideNextEnd: function (swiper) {
            if (n > 1) {
                n--;
            } else {
                myswiper.lockSwipeToNext();
                n--;
            }
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            switch (swiper.activeIndex) {
                case 1:
                    setTimeout(function () {
                        $(".que2 img").css({
                            animation: 'mysec 0.5s linear 2'
                        })
                    }, 600);//定时器时间是上一个动画执行时间
                    break;
            }
        }
    });

    $('.up').click(function () {
        myswiper.unlockSwipeToNext();
        if(n != 0){
            n--;
        }
        setTimeout(function () {
            n++;
            myswiper.slideNext();
        }, 500);
    });
    var answers = {};
 
    //单选题点击
    $('.one button').click(function () {
        if (this.name == "save") return;
        var index = $(this).parent().attr("id");
        if(answers[index] != ''){
            if(n != 0){
                n--;
            }
        }
        if ($(this).children('div').css('display') == 'none') {
            $(this).children('div').show();
            $(this).parent().parent().parent().removeClass('stop-swiping');
            myswiper.unlockSwipeToNext();
        } else {
            $(this).children('div').hide();
        }
        $(this).siblings().children('div').hide();
        answers[index] = $(this).children('div:visible').parent().children('span').text();
        setTimeout(function () {
            n++;
            myswiper.slideNext();
        }, 600);


    });

    //多选题点击
    var a = 0;
    var b = 0;
    $('#changsuo button').click(function () {
        var index = $(this).parent().attr("id");
        if ($(this).children('div').css('display') == 'none') {
            $(this).children('div').show();
            a++;
        } else {
            $(this).children('div').hide();
            a--;
        }
        if (a > 1) {
            $('#up1').show();
        } else {
            $('#up1').hide();
        }
    });
    $('#qudao button').click(function () {
        var index = $(this).parent().attr("id");
        if ($(this).children('div').css('display') == 'none') {
            $(this).children('div').show();
            b++;
        } else {
            $(this).children('div').hide();
            b--;
        }
        if (b > 1) {
            $('#up2').show();
        } else {
            $('#up2').hide();
        }
    });

  
    $('#save').click(function () {
        if ($('.answer9 input').val() == "") return;
        answers.changsuo = [];
        answers.qudao = [];
        $('#changsuo button div:visible').each(function (index, el) {
            answers.changsuo.push($(this).parent().children('span').text())
        });
        $('#qudao button div:visible').each(function (index, el) {
            answers.qudao.push($(this).parent().children('span').text())
        });
        console.log(answers);
        //根据答案来进行结果展示
        //$(".result").html(UName);
        GetResult();
        GetResultImage();
        UploadAnswer();
        myswiper.unlockSwipeToNext();
        setTimeout(function () {
            myswiper.slideNext();
            myswiper.lockSwipeToNext();
        }, 600);
    })
    $('#saveImage').click(function () {
        var myCanvas = document.getElementById("maincanvas");
        var image = myCanvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
        window.location.href = image;
    })
    function GetResult()
    {
        var ResultImageUrl = "";
        switch (answers.yusuan) {
            case "10万以上": ResultImageUrl = answers.sex == "女" ? "images/result/1爱马仕.png" : "images/result/9百达翡丽.png"; break;
            case "7~10万": ResultImageUrl = answers.sex == "女" ? "images/result/2爱马仕.png" : "images/result/10江诗丹顿.png"; break;
            case "3~6万": ResultImageUrl = answers.sex == "女" ? "images/result/3爱马仕.png" : "images/result/11卡地亚.png"; break;
            case "1~3万":
                var TempArray = ["images/result/4香奈儿.png", "images/result/5LV.png"];
                ResultImageUrl = ResultImageUrl = answers.sex == "女" ? TempArray[Math.floor(Math.random() * TempArray.length)] :"images/result/12劳力士.png"; break;
            case "1万以下":
                var TempArray = ["images/result/6迪奥.png", "images/result/7GUCCI.png", "images/result/8宝格丽.png"];
                ResultImageUrl = ResultImageUrl = answers.sex == "女" ? TempArray[Math.floor(Math.random() * TempArray.length)] :"images/result/13万国.png"
                break;
        }
        document.getElementById("resultImg").src = ResultImageUrl;
    }
    function GetResultImage() {
        var UName = $('.answer9 input').val();
        var mainCtx = document.getElementById("maincanvas").getContext("2d");
        var maxWidth = document.body.clientWidth;
        var maxHeight = document.body.clientHeight;
        document.getElementById("maincanvas").width = maxWidth;
        document.getElementById("maincanvas").height = maxHeight;
        mainCtx.clearRect(0, 0, maxWidth, maxHeight);
        //获取图片的实际路径
        var starImg = new Image();
        starImg.src = $('#resultImg').attr('src');
        //合成
        var x = (maxWidth / 750) * 500, y = (maxHeight / 1206) * 1120;
        
        starImg.onload = function () {
            mainCtx.drawImage(starImg, 0, 0, maxWidth, maxHeight);
            mainCtx.font = "0.24rem qianming";
            mainCtx.fillStyle = "black";
            mainCtx.fillText(UName, x, y);
        };
    }
    function UploadAnswer() {
        var UName = $('.answer9 input').val();
        var AnswerXml = "<Questionnaire>";
        for (var Question in answers) {
            AnswerXml += '<Question Name="' + Question + '">';
            if (Object.prototype.toString.call(answers[Question]) == '[object Array]') {
                for (var answer in answers[Question]) {
                    AnswerXml += "<Answer>" + answers[Question][answer] + "</Answer>";
                }
            }
            else
                AnswerXml += "<Answer>" + answers[Question] + "</Answer>";
            AnswerXml += "</Question>";
        }
        AnswerXml += "</Questionnaire>";
        return;
        //提交答案
        $.ajax({
            url: '//api.zhids.cn/api/Questionnaire/update',
            data: { Subject: "装X一下", UserName: UName, Answer: AnswerXml },
            type: 'POST',
            dataType: 'json',
            success: function (json) {
            },
            error: function () {
            }
        });
    }
})
