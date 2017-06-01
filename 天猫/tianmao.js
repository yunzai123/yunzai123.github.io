$(function(){
	let ban=$('.ban')[0];
	let imgbox=$('.imgbox')[0];
	let lis=$('li',imgbox);
	let btn=$('.btn')[0];
	
	let btns=$('li',btn);
	lis[0].style.zIndex=10;

	let index=0;
	let t=setInterval(move,500);

	for(let i=0;i<btns.length;i++){

        btns[i].onmouseenter=function(){
        	for(let j=0;j<btns.length;j++){
           lis[j].style.display='none';
           btns[j].className='';
        }
        lis[i].style.display='block';
           btns[i].className='hot';
           index=i;
	}
	}

	function move(){
		++index;
		if(index==lis.length){
             index=0;
		}
		for(let i=0;i<lis.length;i++){
             lis[i].style.display='none';
             btns[i].className='';
		}
		  lis[index].style.display='block';
             btns[index].className='hot';
	}
    ban.onmouseover=function(){
    	clearInterval(t);
    }
    ban.onmouseout=function(){
    	t=setInterval(move,500);
    }
	let paizi=$('.paizi')[0];
	let list=$('li',paizi);
	// for(let i=0;i<list.length;i++){
	let meng=$('.meng');
	// }

	for(let i=0;i<meng.length;i++){
	list[i].onmouseover=function(){
           meng[i].style.opacity='0.8'
	}
	list[i].onmouseout=function(){
           meng[i].style.opacity='0';
	}
	}

	let zuihou=$('.zuihou')[0];
	let xing=$('.xing')[0];
	let ada=$('a',zuihou)[0];
	zuihou.onmouseover=function(){
		xing.style.borderColor='#fff';
		xing.style.transform='rotateZ(360deg)';
		ada.style.color='#fff';
		zuihou.style.background='#DE2D2D';
	}
	zuihou.onmouseout=function(){
		xing.style.borderColor='#999999';
		ada.style.color='#999999';
		zuihou.style.background='#fff';
		xing.style.transform='rotateZ(0deg)';
	}
	let daohang=$('.daohang')[0];
	let hhh=$('.hhh')[0];
	let lid=$('li',hhh);
	let arre=['#DD2727','#EA5F8D','#0AA6E8','#64C333','#F15453','#19C8A9','#F7A945','#D20001'];
	
	for(let i=0;i<lid.length;i++){
		lid[i].onmouseenter=function(){
       lid[i].style.background=arre[i];
	}
	lid[i].onmouseleave=function(){
       lid[i].style.background='';
	}
	}
	 
     let guding1=$('.guding1')[0];

	document.onscroll=function(){
		let tops=document.body.scrollTop;
	console.log(tops)
	
	  if(tops<500){
	  	daohang.style.display='none';
	  }
	    if(tops>500){
	  	daohang.style.display='block';
	  	
	  }
	   if(tops<700){
       	guding1.style.height='0px';
       	guding1.style.display='none';
       }
       if(tops>700){
       	guding1.style.height='50px';
       	guding1.style.display='block';

       } 
	}



		let wh=window.innerHeight;
       let disan=document.querySelectorAll('.disan')
       let tops=document.body.scrollTop;
       console.log(disan)
      
       
 
         
       let arr=[]
       disan.forEach(function(value,index){
       	arr.push(value.offsetTop)
       })
       console.log(arr)
       

       window.onscroll=function(){
       	let tops=document.body.scrollTop;
     
       	for(let i=0;i<arr.length;i++){
       		/*if(tops + wh > arr[i]){
       			if(!flag){
       				return;
       			}*/
       			lid[n].classList.remove('hot')
       		    lid[i].classList.add('hot')
       		    n=i;
       			
               
       		}
       	}
       
       let n=0,flag=true;
       for(let i=0;i<lis.length;i++){
       	lid[i].onclick=function(){
       		lid[i].style.background=arre[i]
           lid[n].classList.remove('hot')
           lid[i].classList.add('hot')
           n=i;
           flag=false;
           animate(document.body,{scrollTop:arr[i]},function(){flag=true});
       	}
       }


})