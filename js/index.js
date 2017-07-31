$(function() {
    var myswiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            switch (swiper.activeIndex) {
                case 1:
                    setTimeout(function(){
                        $(".que2 img").css({
                            animation: 'mysec 0.5s linear 2'
                        })
                    },600);//定时器时间是上一个动画执行时间
                    break;
            }
        }
    });

    $('.up').click(function(){
        setTimeout(function() {
            myswiper.slideNext();
        }, 500);
    })

    var answers={};
    //单选题点击
    $('.one button').click(function() {
        if ($(this).children('div').css('display') == 'none') {
            $(this).children('div').show();
        } else {
            $(this).children('div').hide();
        }
        $(this).siblings().children('div').hide();
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
        // if(arr1.length>1){
        //     setTimeout(function() {
        //         myswiper.slideNext();
        //     }, 1000)
        // }
    });
    $('#qudao button').click(function(){
        $(this).children('div').show();
        var index=$(this).parent().attr("id");
        if($(this).children('div:visible')){
            arr2.push($(this).children('span').text())
        }
        answers[index]=arr2;
    });

    //判断最后一页的背景图是什么
    var src;
    if(answers.sex =='男'){
        if(answers.yusuan =="1万以下"){
            
        }else if(answers.yusuan == "1~3万"){

        }else if(answers.yusuan == "3~5万"){
            
        }else if(answers.yusuan == "5~10万"){
            
        }else{
            
        }
    }else{

    }
    $('#save').click(function(){
        answers.name=$('.answer9 input').val();
        console.log(answers);
        $(".result").html(answers.name);
    })

  
    


    


    
})
