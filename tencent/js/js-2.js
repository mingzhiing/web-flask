$(function (){
    if($('.navigation-3')[0]){


        $('.navigation-3 .popup_yead .yead').click(function (){
            if($('#years_'+parseInt($(this).text()))[0]){
                var year = $(this).html();
                $('body,html').animate({'scrollTop':$('#years_'+$(this).html()).offset().top},400);

                $('.navigation-3 .yead .line').remove();

                $('.navigation-3 .left .yead').each(function (){
                    if($(this).text() == year){
                        $(this).append('<div class="line"></div>');
                        // console.log($(this)[0].offsetLeft,$(this).html());
                        $('.navigation-3 .wrap').css({'left':$(this).offset().left});
                    }
                });
            }


        });


        $('.page-main .bg').click(function (){
            $('.page-main .bg').css('display','none');
            $('.navigation-3').removeClass('an');
        })


    }
})
