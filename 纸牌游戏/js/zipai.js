$(function(){
    $('.tan button').eq(0).click(function(){
        $('.tan').css('display','none');
        $('.box').css('display','block');

        let poke=[];
        let biao={};
        let colo=['r','f','m','b'];
        let huase,shuzi;
        let aa=null;
        let sum;
        //r红桃 m梅花 f方块  b黑桃
        for(let i=0;i<52;i++){
            do {
                shuzi=Math.floor(Math.random()*13+1);
                huase=colo[Math.floor(Math.random()*4)];
            }while(biao[huase+'_'+shuzi]){
                biao[huase+'_'+shuzi]=true;
                poke.push({huase,shuzi})
            }
        }
        let index=0;
        for(let i=0;i<7;i++){
            for(let j=0;j<=i;j++){
                let item=poke[index];
                index++;
                $('<div></div>').addClass('poke').prop('id',`${i}_${j}`).data('num',item.shuzi).css('background-image',`url(img/${item.huase}${item.shuzi}.png)`).delay(30*j).animate({left:500-i*50+103*j,top:60*i,opacity:1}).appendTo('.desk')
            }
        }

        for(;index<poke.length;index++){
            let item=poke[index];
            $('<div>').addClass('poke zuo').data('num',item.shuzi).css('background-image',`url(img/${item.huase}${item.shuzi}.png)`).delay(30*index).animate({left:350,top:540,opacity:1}).appendTo('.desk')
        }

        $('.poke').on('click',function(){
            let arr=$(this)[0].id.split('_');
            let a=parseInt(arr[0])+1;
            let b=parseInt(arr[1]);
            let c=parseInt(arr[1])+1;
            let cur=$(`#${a}_${b}`);
            let cur1=$(`#${a}_${c}`);
            if(cur.length == 1 || cur1.length == 1){
                return ;
            }
            $(this).toggleClass('active');
            if($(this).hasClass('active')){
                // $(this).stop();
                $(this).animate({top:'-=10'})
                //消除
            }else{
                $(this).animate({top:"+=10"})
            }

            if($(this).data('num') == 13){
                $(this).animate({top:0,left:0},function(){
                    $(this).remove()
                })
            }
            if(!aa){
                aa=this
            }else{
                sum = $(aa).data('num') + $(this).data('num');
                if(sum == 13){
                    $(this).animate({top:0,left:0},function(){
                        $(this).remove()
                    })
                    $(aa).animate({top:0,left:0},function(){
                        $(aa).remove()
                    })
                }else{
                    $(".active").animate({top:"+=10"},function(){
                        $(this).removeClass("active")
                    });
                    aa=null;
                }
            }

        });
        let z = 0;
        $('.right').click(function(){
            z++;
            let zuo = $('.zuo');
            if(zuo.length==0){
                return ;
            }
            $(zuo[zuo.length-1]).animate({left:'+=200',top:540}).removeClass('zuo').removeClass('active').addClass('you').css('zIndex',z);
        });

        $('.left').click(function(){
            let you = $('.you');
            for(let i=you.length-1;i>=0;i--){
                $(you[i]).delay(i*150).animate({left:'-=200'},function(){
                    $(this).css('zIndex',0)
                }).addClass('zuo').removeClass('you')
            }
        });

        if(poke.length==0){

        }
    });

    $('.tan button').eq(1).click(function(){
        window.close();
    })
});
