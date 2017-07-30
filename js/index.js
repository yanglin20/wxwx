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

    var answers={};
    //单选题点击
    $('.one button').click(function() {
        if ($(this).children('div').css('display') == 'none') {
            $(this).children('div').show();
        } else {
            $(this).children('div').hide();
        }
        var index=$(this).parent().attr("id");
        answers[index]=$(this).children('div:visible').parent().children('span').text();
        console.log(answers);
        setTimeout(function() {
            myswiper.slideNext();
        }, 600)
    });
    var arr1=[];
    var arr2=[];
    //多选题点击
    $('#changsuo button').click(function(){
        $(this).children('div').show();
        var index=$(this).parent().attr("id");
        if($(this).children('div:visible')){
            arr1.push($(this).children('span').text())
        }
        answers[index]=arr1;
        if(arr1.length>1){
            setTimeout(function() {
                myswiper.slideNext();
            }, 1000)
        }
    });
    $('#qudao button').click(function(){
        $(this).children('div').show();
        var index=$(this).parent().attr("id");
        if($(this).children('div:visible')){
            arr2.push($(this).children('span').text())
        }
        answers[index]=arr2;
        if(arr2.length>1){
            setTimeout(function() {
                myswiper.slideNext();
            }, 1000)
        }
    });
    $('#save').click(function(){
        answers.name=$('.answer9 input').val();
        console.log(answers);
        $(".result").html(answers.name);
    })
    
})
