
//获取文档中指定的元素
function $(selector,ranger=document){
    let type=typeof selector;
    if(type=='string'){
        //获取
        let select=selector.trim();
        let slice=select.substring(1);
        let firstChar=select.charAt(0);
        if(firstChar=='.'){
            return ranger.getElementsByClassName(slice);
        }else if(firstChar=='#'){
            return document.getElementById(slice);
        }else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(select)){
            return ranger.getElementsByTagName(select);
        }
        //创建元素
        else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(select)){
            //<div>
            return document.createElement(select.slice(1,-1))
        }
    }else if(type=='function'){
        //添加
        // window.onload=function(){
        // 	selector();
        addEvent(window,'load',selector);
    }
}

/*
 * addEvent(obj,type,fn)
 * */
function addEvent(obj,type,fn){
    obj.addEventListener(type,fn,false);
}
//获取文档中指定元素的属性 有兼容性
function getStyle(obj,attr){
    if(window.getComputedStyle){
        return getComputedStyle(obj,null)[attr];
    }else{
        return obj.currentStyle[attr];
    }
}
//修改指定元素中的内容
function xiuGai(obj,content){
    console.log(obj,content);
    if(content){
        obj.innerHTML=content;
    }else{
        return obj.innerHTML;
    }
}
//获取指定元素的子元素节点
function getChilds(obj){
    var childs=obj.childNodes;
    var arr=[];
    childs.forEach(function(value){
        if(value.nodeType==1){
            arr.push(value);
        }
    });
    return arr;
}
//获取第一个
function getFirst(obj){
    return getChilds(obj)[0];
}
//获取最后一个
function getLast(obj){
    let childs=getChilds(obj);
    return childs[childs.length-1];
}
//随机一个
function getRandom(obj,index){
    let childs=getChilds(obj);
    return childs[index];
}
//getNext()  获取下一个元素节点
//思路：先得到下一个兄弟节点a，进行判断；
//若不是,继续找下一个兄弟节点
function getNext(obj){
    let a=obj.nextSibling;
    //如果没有兄弟节点怎么办
    if(a===null){
        return false;
    }
    //如果有
    while(a.nodeType!==1){
        a=a.nextSibling;
        if(a===null){
            return false;
        }
    }
    return a;
}



//轮播图
function lunbo(obj,num){
    var imgbox=$('.imgbox',obj)[0];
    var lis=$('li',imgbox);
    var widths=parseInt(getStyle(lis[0],'width'))+parseInt(getStyle(lis[0],'margin-right'));
    var btnl=document.querySelector('.btnl');
    var btnr=document.querySelector('.btnr');
    var t=setInterval(fun,2000);
    var flag=true;
    obj.onmouseenter=function(){
        clearInterval(t);
    }
    obj.onmouseleave=function(){
        t=setInterval(fun,2000);
    }
    btnl.onclick=function(){
        if(!flag){
            return;
        }
        fun();
        flag=false;
    }
    btnr.onclick=function(){
        if(!flag){
            return;
        }
        fun1();
        flag=false;
    }
    // 从右往左
    function fun(){
        animate(imgbox,{left:-num*widths},function(){
            for(let i=0;i<num;i++){
                let first=getFirst(imgbox);
                imgbox.appendChild(first);
                imgbox.style.left=0;
            }
            flag=true;
        });
    }
    //从左往右
    // setInterval(fun1,2000);
    function fun1(){
        for(let i=0;i<num;i++){
            let last=getLast(imgbox);
            let first=getFirst(imgbox);
            imgbox.insertBefore(last,first);
            imgbox.style.left=-num*widths+'px';
            animate(imgbox,{left:0},function(){
                flag=true;
            });
        }
    }
}

//添加滚轮事件
mouseWheel=function(obj,upFn,downFn){
    obj.addEventListener('mousewheel',fn,false);
    function fn(e){

    }
}



