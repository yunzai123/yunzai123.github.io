function Palette(obj,ctx,tian,miao){
 this.obj=obj;
 this.ctx=ctx;
 this.tian=tian;
 this.miao=miao;

 this.lineWidth=2;
 this.fillStyle='#000';
 this.strokeStyle='#000';
 this.width=obj.width;
 this.height=obj.height;
 this.history=[];
 this.bian=5;
 this.type='fill';

}



Palette.prototype={
    init:function(){
		this.ctx.fillStyle=this.fillStyle;
		this.ctx.strokeStyle=this.strokeStyle;
	},
	/*键盘撤销*/
    cexiao:function(){
    	let self=this;
    	document.body.onkeydown=function(e){
    		if(e.ctrlKey&&e.keyCode==90){
    			if(self.history.length>0){
    				let last=self.history.pop();
    				self.ctx.putImageData(last,0,0);
    			}else if(self.history.length==0){
    				self.ctx.clearRect(0, 0, self.width, self.height);
    			}
    		}
    	}
    },
    /*鼠标*/
    subiao:function(){
    	let self=this;
    	if(self.history.length>0){
    		let last=self.history.pop();
    		self.ctx.putImageData(last,0,0);
    	}
    },
	/*直线*/
	line:function(){
		let self=this;
		self.obj.onmousedown=function(e){
         
         let ox=e.offsetX,oy=e.offsetY;
         self.obj.onmousemove=function(e){
         	let mx=e.offsetX,my=e.offsetY;
         	self.ctx.clearRect(0, 0, self.width, self.height);
         	if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }

         	self.init();
         	self.ctx.beginPath();
         	self.ctx.moveTo(ox, oy);
         	self.ctx.setLineDash([0,0]);
         	self.ctx.lineTo(mx, my);
         	self.ctx.stroke();
         }
         self.obj.onmouseup=function(){
         	self.history.push(self.ctx.getImageData(0,0,self.width,self.height));

            self.obj.onmouseup=null;
            self.obj.onmousemove=null;
         }
		}
	},
	/*铅笔*/
	pencil:function(){
		let self=this;
		self.obj.onmousedown=function(e){
         
         let ox=e.offsetX,oy=e.offsetY;
         	if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }

         	self.init();
         	self.ctx.beginPath();
         	self.ctx.moveTo(ox, oy);
         self.obj.onmousemove=function(e){
         	let mx=e.offsetX,my=e.offsetY;
         	/*self.ctx.clearRect(0, 0, self.width, self.height);*/
         
         	self.ctx.lineTo(mx, my);
         	self.ctx.stroke();
         }
         self.obj.onmouseup=function(){
         	self.history.push(self.ctx.getImageData(0,0,self.width,self.height));

            self.obj.onmouseup=null;
            self.obj.onmousemove=null;
         }
		}
	
	},

    /*三角形*/
	triangle:function(){
		let self=this;
		self.obj.onmousedown=function(e){
         let ox=e.offsetX,oy=e.offsetY;
         	self.obj.onmousemove=function(e){
         	let mx=e.offsetX,my=e.offsetY;
         	self.ctx.clearRect(0, 0, self.width, self.height);
         	if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
            self.init();
         	self.ctx.beginPath();
         	self.ctx.moveTo(ox, oy);
         	self.ctx.lineTo(mx, my);
         	self.ctx.lineTo(ox, my);
         	self.ctx.closePath();
         	self.ctx[self.type]();
         }
         self.obj.onmouseup=function(){
         	self.history.push(self.ctx.getImageData(0,0,self.width,self.height));

            self.obj.onmouseup=null;
            self.obj.onmousemove=null;
         }
		}
	
	},
	/*圆角矩形*/
	yuanjiao:function(){
		let self=this;
		self.obj.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			self.obj.onmousemove=function(e){
				let mx=e.offsetX,my=e.offsetY;
				let num,num2;
                if(Math.abs((mx-ox)/10)>=Math.abs((my-oy)/10)){
                	num=num2=Math.abs((my-oy)/10);
                }else if(Math.abs((mx-ox)/10)<Math.abs((my-oy)/10)){
                    num=num2=Math.abs((mx-ox)/10);
                }

				if(mx<ox&&my<oy){
					num*=-1;
					num2*=-1;
				};
				if(mx<ox&&my>oy){
					num*=-1;
				}
				if(mx>ox&&my<oy){
					num2*=-1;
				}
				self.ctx.clearRect(0, 0, self.width, self.height);
         	if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.moveTo(ox+num, oy);
                self.ctx.lineTo(mx-num, oy);
                self.ctx.quadraticCurveTo(mx, oy, mx, oy+num2);
                self.ctx.lineTo(mx, my-num2);
                self.ctx.quadraticCurveTo(mx, my, mx-num, my);
                self.ctx.lineTo(ox+num, my);
                self.ctx.quadraticCurveTo(ox, my, ox, my-num2);
                self.ctx.lineTo(ox, oy+num2);
                self.ctx.quadraticCurveTo(ox, oy, ox+num, oy);
                self.ctx.closePath();
                self.ctx[self.type]();
                }
             self.obj.onmouseup=function(){
         	self.history.push(self.ctx.getImageData(0,0,self.width,self.height));

            self.obj.onmouseup=null;
            self.obj.onmousemove=null;
         }
		}
	},
	/*五角星*/
	wujiao:function(){
		let self=this;
		self.obj.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			let r;
			let angle=(360/10)/180*Math.PI;
            self.obj.onmousemove=function(e){
            	let mx=e.offsetX,my=e.offsetY;
            	r=(mx-ox)/Math.sin(Math.tan((mx-ox)/(my-oy)));
            	self.ctx.clearRect(0, 0, self.width, self.height);
            	if(self.history.length>0){
                 self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.moveTo(ox+r*Math.sin(angle*0), oy+r*Math.cos(angle*0));
                for(let i=0;i<10;i++){
                	let x,y;
                	if(i%2==0){
                		x=ox+r*Math.sin(angle*i);
                		y=oy+r*Math.cos(angle*i);
                	}else if(i%2==1){
                		x=ox+r/2*Math.sin(angle*i);
                		y=oy+r/2*Math.cos(angle*i);
                	}
                	self.ctx.lineTo(x, y);
                }
                self.ctx.closePath();
                self.ctx[self.type]();
            };
             self.obj.onmouseup=function(){
         	self.history.push(self.ctx.getImageData(0,0,self.width,self.height));

            self.obj.onmouseup=null;
            self.obj.onmousemove=null;
         }
		}
	},

		/*虚线*/
		xuxian:function(){
		let self=this;
		self.obj.onmousedown=function(e){
         
         let ox=e.offsetX,oy=e.offsetY;
         self.obj.onmousemove=function(e){
         	let mx=e.offsetX,my=e.offsetY;
         	self.ctx.clearRect(0, 0, self.width, self.height);
         	if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }

         	self.init();
         	self.ctx.beginPath();
         	self.ctx.moveTo(ox, oy);
         	self.ctx.setLineDash([5,10]);
         	self.ctx.lineTo(mx, my);
         	self.ctx[self.type]();
         }
         self.obj.onmouseup=function(){
         	self.history.push(self.ctx.getImageData(0,0,self.width,self.height));

            self.obj.onmouseup=null;
            self.obj.onmousemove=null;
         }
		}
	},
	/*矩形*/
    juxing:function(){
    	let self=this;
		self.obj.onmousedown=function(e){
         
         let ox=e.offsetX,oy=e.offsetY;
         self.obj.onmousemove=function(e){
         	let mx=e.offsetX,my=e.offsetY;
         	self.ctx.clearRect(0, 0, self.width, self.height);
         	if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }

         	self.init();
         	self.ctx.beginPath();
         	self.ctx.strokeRect(ox, oy, mx-ox, my-oy);
         	self.ctx.closePath();
         	self.ctx[self.type]();

         }
         self.obj.onmouseup=function(){
         	self.history.push(self.ctx.getImageData(0,0,self.width,self.height));

            self.obj.onmouseup=null;
            self.obj.onmousemove=null;
         }
		}
    },
    /*清除*/
   clear:function(){
   	let self=this;
   	this.ctx.clearRect(0, 0, self.width, self.height);
   	self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
   },
  /* 圆*/
    yuan:function(){
    	let self=this;
    	self.obj.onmousedown=function(e){
    		let ox=e.offsetX,oy=e.offsetY;
    		self.obj.onmousemove=function(e){
    			let mx=e.offsetX,my=e.offsetY;
    			self.ctx.clearRect(0, 0, self.width, self.height);
    			if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.init();
                self.ctx.beginPath();
                self.ctx.arc(ox, oy, Math.abs(mx-ox),0,2*Math.PI);
                self.ctx.closePath();
                self.ctx[self.type]();
    		};
    		 self.obj.onmouseup=function(){
         	self.history.push(self.ctx.getImageData(0,0,self.width,self.height));

            self.obj.onmouseup=null;
            self.obj.onmousemove=null;
         }
    	}

    },
    /*多边形*/
    duobianxing:function(){
    	let self=this;
    	self.obj.onmousedown=function(e){
        let ox=e.offsetX,oy=e.offsetY;
        let r;
        let angle=(360/self.bian)/180*Math.PI;
        self.obj.onmousemove=function(e){
          let mx=e.offsetX,my=e.offsetY;
          r=(mx-ox)/Math.sin(Math.tan((mx-ox)/(my-oy)));
          self.ctx.clearRect(0, 0, self.width, self.height);
          if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
           self.init();
           self.ctx.beginPath();
           self.ctx.moveTo(ox+r*Math.sin(angle*0), oy+r*Math.cos(angle*0));
           for(let i=0;i<self.bian;i++){
           	let x=ox+r*Math.sin(angle*i);
           	let y=oy+r*Math.cos(angle*i);
           	self.ctx.lineTo(x, y);
           }
           self.ctx.closePath();
           self.ctx[self.type]();
        };
         self.obj.onmouseup=function(){
         	self.history.push(self.ctx.getImageData(0,0,self.width,self.height));

            self.obj.onmouseup=null;
            self.obj.onmousemove=null;
         }
    	}
    },
    /*橡皮擦*/
      pica:function(w,h){
        let self=this;
        self.obj.onmousedown=function(e){
            self.obj.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY; 
                self.ctx.clearRect(mx, my, 300, 300);
            }
            self.obj.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.obj.onmousemove=null;
                self.obj.onmouseup=null;
            }
        }
    },

   /*填充描边*/
   tianmiao:function(){
   	let self=this;
   	self.tian.onclick=function(){
   		self.type='fill';
   	}
        self.miao.onclick=function(){
        self.type='stroke';
    }
   },

   

   wenzi:function(){
    let self=this;
    let flag=true;
    let arr1=[];
    self.obj.onmousedown=function(e){
        if(!flag){
            return;
        }
        flag=false;
        let ox=e.offsetX,oy=e.offsetY;
        let ax=e.offsetX,ay=e.offsetY;
        let divs=document.createElement('div');
        self.obj.onmousemove=function(e){
            let cx=e.offsetX,cy=e.offsetY;
            if(arr1.length>0){
                document.body.removeChild(arr1.pop());

            }
            
            divs.cssText=`width:${cx-ox}px;height:${cy-oy}px;position: absolute;left:${ox}px;top:${oy}px;border:1px solid #000000;font-size:16px;`
         document.body.appendChild(divs);
        divs.contentEditable='true';
        console.log(divs)
        arr1.push(divs);
        divs.focus();
        arr1[0].onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            arr1[0].onmousemove=function(e){
              let cx=e.clientX,cy=e.clientY;
              let left=cx-ox,top=cy-oy;
              ax=left-130;
              ay=top-47;
              this.style.left=left+'px';
              this.style.top=top+'px';
            };
            arr1[0].onmouseup=function(){
                arr1[0].onmousemove=null;
                arr1[0].onmouseup=null;
            }
        }
        };
       self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
    }
    document.body.onmouseup=function(){
        self.obj.onmousemove=null;
        if(arr1.length>0){
            arr1[0].onblur=function(){
                flag=true;
                this.onblur=null;
                self.ctx.font=`20px black`;
                document.body.removeChild(this);
                self.ctx.fillText(this,innerText,ax,ay);

            }
        }else{
            flag=true;
        }
        document.onmouseup=null;
    }
   },
   /*新建*/
   baocun:function () {
            let self=this;
           let flag=confirm("是否保存");
           if(flag){
               let data=self.obj.toDataURL('image/png').replace('data:image/png','data:stream/octet');
               location.href=data;
           }
            self.history=[];
            self.ctx.clearRect(0,0,self.width,self.height)

       },


}

