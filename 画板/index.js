window.onload=function(){

let canvas=document.querySelector('canvas');
let ctx=canvas.getContext("2d");
let line=document.querySelector('.icon-zhixianceliang');
let pencil=document.querySelector('.icon-qianbi');
let triangle=document.querySelector('.icon-sanjiaoxing');
let yuanjiao=document.querySelector('.icon-yuanjiaojuxing');
let wujiao=document.querySelector('.icon-wujiaoxingkong');
let xuxian=document.querySelector('.icon-xuxian');
let juxing=document.querySelector('.icon-juxing');
let clear=document.querySelector('.icon-qingkong');
let yuan=document.querySelector('.icon-yuan');
let duobianxing=document.querySelector('.icon-iconfontwubianxing');
let subiao=document.querySelector('.icon-iocnchexiao');
let pica=document.querySelector('.icon-xiangpi');
let ca=document.querySelector('.pica');
let baocun=document.querySelector('.icon-baocun');
let miao=document.querySelector('.miao');
let tian=document.querySelector('.tian');
let wen=document.querySelector('.wen');
let palette=new Palette(canvas,ctx,tian,miao)
    line.onclick=function(){
		palette.line();
	}
	pencil.onclick=function(){
		palette.pencil();
	}
	triangle.onclick=function(){
		palette.triangle();
	}
	yuanjiao.onclick=function(){
		palette.yuanjiao();
	}
	wujiao.onclick=function(){
		palette.wujiao();
	}
	xuxian.onclick=function(){
		palette.xuxian();
	}
	juxing.onclick=function(){
		palette.juxing();
	}
	clear.onclick=function(){
		palette.clear();
	}
	yuan.onclick=function(){
		palette.yuan();
	}
	duobianxing.onclick=function(){
		palette.duobianxing();
	}
	subiao.onclick=function(){
		palette.subiao();
	}
	pica.onclick=function(){
		palette.pica();
	}

   document.body.onkeydown=function(){
	
	palette.cexiao();
}
  tian.onclick=function(){
  	palette.tianmiao();
  }
   miao.onclick=function(){
  	palette.tianmiao();
  }
  wen.onclick=function(){
  	palette.wenzi();
  }
  baocun.onclick=function(){
  	palette.baocun();
  }

}
