var canvas=document.getElementById('xxx');
var ctx=canvas.getContext('2d');
var lineWidth=5;

autoSetCanvasSize(canvas)
listenToUser(canvas)

var eraserEnabled= false
eraser.onclick=function(){
  eraserEnabled=true;
  eraser.classList.add('active')
  pen.classList.remove('active')
}
pen.onclick=function(){
  eraserEnabled=false;
  pen.classList.add('active')
  eraser.classList.remove('active')
}

red.onclick=function(){
  ctx.strokeStyle='red';
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')

}
green.onclick=function(){
  ctx.strokeStyle='green'
  red.classList.remove('active')
  green.classList.add('active')
  blue.classList.remove('active')

}
blue.onclick=function(){
  ctx.strokeStyle='blue'
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.add('active')

}
thin.onclick=function(){
  lineWidth=5
}
thick.onclick=function(){
  lineWidth=10
}
clear.onclick=function(){
  ctx.clearRect(0,0,canvas.width,canvas.height)

}
download.onclick=function(){
  var url=canvas.toDataURL("image/png")
  console.log(url)
  var xxx=document.createElement('a')
  document.body.appendChild(xxx)
  xxx.href=url
  xxx.download="我的画"
  xxx.target="_blank"
  xxx.click()
}

/*************/
function autoSetCanvasSize(canvas){
  setCanvasSize()
  window.onresize=function (){
  setCanvasSize()
  }

  function setCanvasSize(){
    var pageWidth=document.documentElement.clientWidth
    var pageHeight=document.documentElement.clientHeight
    canvas.width=pageWidth
    canvas.height=pageHeight
  }

}

function listenToUser(canvas){
  var using=false
  var lastPoint
  if (document.body.ontouchstart !== undefined) {
//触屏设备
    canvas.ontouchstart=function(aaa){
     console.log("开始摸我了hhhh")
     
     var x=aaa.touches[0].clientX
     var y=aaa.touches[0].clientY
     using=true
      if (eraserEnabled) {
          ctx.clearRect(x-5,y-5,10,10)
      }else{ 
        lastPoint={"x":x,"y":y}
      } 
    
    }
    canvas.ontouchmove=function(bbb){
      console.log("边摸边动")
      
      var x=bbb.touches[0].clientX
      var y=bbb.touches[0].clientY
      if (!using) {return}else{
          if(eraserEnabled){
          ctx.clearRect(x-5,y-5,10,10)
          }else{
          var nextPoint={"x":x,"y":y}
          drawLine(lastPoint.x,lastPoint.y,nextPoint.x,nextPoint.y)
          lastPoint=nextPoint
          }
      } 
    }
    canvas.ontouchend=function(){
    console.log("摸完了")
    using=false
    }
      }else{
    //非触屏设备

    canvas.onmousedown=function(aaa){
        var x=aaa.clientX
        var y=aaa.clientY
         using=true
      if (eraserEnabled) {
          ctx.clearRect(x-5,y-5,10,10)
      }else{ 
        lastPoint={"x":x,"y":y}
      } 
    }
    canvas.onmousemove=function(bbb){
        var x=bbb.clientX
        var y=bbb.clientY
        if (!using) {return}else{
          if(eraserEnabled){
          ctx.clearRect(x-5,y-5,10,10)
          }else{
          var nextPoint={"x":x,"y":y}
          drawLine(lastPoint.x,lastPoint.y,nextPoint.x,nextPoint.y)
          lastPoint=nextPoint
          }
        } 
    }
    canvas.onmouseup=function(ccc){
      using=false
    }  
  }
}

  

function drawCircle(x,y,r){
  ctx.beginPath();
 
  ctx.arc(x,y,r,0,Math.PI*2);
  ctx.fill();
}

function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.lineWidth=lineWidth;
    
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
  
}

