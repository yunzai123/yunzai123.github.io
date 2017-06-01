$(function(){
	 let box10=$('.box10')[0];
	let imgbox=$('.imgbox')[0];
	let lis=$('li',imgbox);
     let btn=$('.btn')[0];
     let btns=$('li',btn);
	lis[0].style.zIndex=10;

	let index=0;
	let t;
	t=setInterval(move,2000);

	function move(){
		index++;
		if(index==lis.length){
			index=0;
		}
		for(let i=0;i<lis.length;i++){
			lis[i].style.display='none';
			btns[i].className='';
		}
		btns[index].className='hot';
		lis[index].style.display='block';
	}
     

         box10.onmouseover=function(){
       	  clearInterval(t);
       }
        box10.onmouseout=function(){
       	t=setInterval(move,2000);

       }
	let wenzi=$('.wenzi')[0];
	let list=$('li',wenzi)[0];
	let ass=$('a',list);
	  let imgs=$('img',wenzi);
	  console.log(imgs)
	  console.log(ass)
	  console.log(list)
	  console.log(wenzi)

	for(let i=0;i<ass.length;i++){

			ass[i].onmouseover=function(){
				ass[i].style.color='orange';
				
				imgs[i].style.height='230px';

			}
			ass[i].onmouseout=function(){
				
				ass[i].style.color='black';
			    imgs[i].style.height='0';

			}
		}

		let zuojian=$('.zuojian')[0];
		let youjian=$('.youjian')[0];
		console.log(zuojian)

		zuojian.onmouseover=function(){
			zuojian.style.opacity='0.5'
		}
        zuojian.onmouseout=function(){
			zuojian.style.opacity='0'
		}
       youjian.onmouseover=function(){
			youjian.style.opacity='0.5'
		}
        youjian.onmouseout=function(){
			youjian.style.opacity='0'
		}
		function arr1(){
			index++;
			if(index<0){
				index=4;
			}
			for(let i=0;i<lis.length;i++){
                lis[i].style.opacity='0';
                btns[i].className='';
			}
			 lis[index].style.opacity='1';
                btns[index].className='hot';
		}
		zuojian.onclick=function(){
			arr1();
		}
		youjian.onclick=function(){
			move();
		}
       
   
})