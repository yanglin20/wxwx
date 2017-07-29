$(function() {
    var myswiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper) {
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }
    });

    $('.up').click(function(){
        setTimeout(function() {
            myswiper.slideNext();
        }, 500)
    })


    var answers = {
        'age': '',
        'sex': '',
        'chuxing': '',
        'changsuo': [],
        'qudao':[],
        'yusuan':'',
        'duoshanqian':'',
        'style':'',
        'name':''
    };

    // $('.answer button').attr('flag',false);
    $('.answer button').click(function() {
        if ($(this).children('div').css('display') == 'none') {
            $(this).children('div').show();
        } else {
            $(this).children('div').hide();
        }

        if ($(this).siblings().length < 4) { //单选
            $(this).siblings().children('div').hide();
            setTimeout(function() {
                myswiper.slideNext();
            }, 500)
        }

  

    });
    
    $('#save').click(function(){
        answers.changsuo=[];//清空数组
    	answers.qudao=[];
    	answers.age=$('.answer1 button div:visible').parent().children('span').text();
    	answers.sex=$('.answer2 button div:visible').parent().children('span').text();
        answers.chuxing=$('.answer3 button div:visible').parent().children('span').text();
        $('.answer4 button div:visible').each(function(index, el) {
            answers.changsuo.push($(this).parent().children('span').text())
        });
        $('.answer5 button div:visible').each(function(index, el) {
            answers.qudao.push($(this).parent().children('span').text())
        });
        answers.yusuan=$('.answer6 button div:visible').parent().children('span').text();
        answers.duoshanqian=$('.answer7 button div:visible').parent().children('span').text();
        answers.style=$('.answer8 button div:visible').parent().children('span').text();
    	answers.name=$('.answer9 input').val();

        console.log(answers);
        console.log(answers.name);
        $(".result").html(answers.name);
    })
    
})
