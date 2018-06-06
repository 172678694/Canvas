var canvas=document.getElementById('xxx');
var ctx=canvas.getContext('2d');

autoSetCanvasSize(canvas)
listenToMouse(canvas)

var eraserEnabled= false
eraser.onclick=function(){
  eraserEnabled=true;
  actions.className="actions x"
}
brush.onclick=function(){
  eraserEnabled=false;
  actions.className="actions "
}


/*************/
function autoSetCanvasSize(canvas){
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

function listenToMouse(canvas){
  var using=false
  var lastPoint

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

function drawCircle(x,y,r){
  ctx.beginPath();
  ctx.fillStyle='black'
  ctx.arc(x,y,r,0,Math.PI*2);
  ctx.fill();
}

function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.lineWidth=5
    ctx.strokeStyle='black';
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
  
}
