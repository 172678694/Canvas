document.body.ontouchstart=function(eee){
  eee.preventDefault()
}
var canvas=document.getElementById('canvas')
var ctx=canvas.getContext('2d')
var lineWidth= 3

autoSetSize(canvas)
listenToUser(canvas)

var usingEraser=false
eraser.onclick=function(){
  usingEraser = true
  eraser.classList.add('active')
  brush.classList.remove('active')
}

brush.onclick=function(){
  usingEraser = false
  brush.classList.add('active')
  eraser.classList.remove('active')
}

black.onclick=function(){
  ctx.strokeStyle="black"
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}

red.onclick=function(){
  ctx.strokeStyle="red"
  red.classList.add('active')
  black.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}

green.onclick=function(){
  ctx.strokeStyle="green"
  green.classList.add('active')
  black.classList.remove('active')
  red.classList.remove('active')
  blue.classList.remove('active')
}

blue.onclick=function(){
  ctx.strokeStyle="blue"
  blue.classList.add('active')
  black.classList.remove('active')
  red.classList.remove('active')
  green.classList.remove('active')
}

thin.onclick=function(){
  lineWidth= 3
}

thick.onclick=function(){
  lineWidth= 6
}

clear.onclick=function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

download.onclick=function(){
  var url=canvas.toDataURL("image/png")
  var saveCanvas=document.createElement('a')
  document.body.appendChild(saveCanvas)
  saveCanvas.href=url
  saveCanvas.download="我的画"
  saveCanvas.target="_blank"
  saveCanvas.click()
}


/********/

function autoSetSize(canvas){
  setSize()
  window.onresize=function(){
  setSize()
  }

  function setSize(){
      var pageWidth=document.documentElement.clientWidth
      var pageHeight=document.documentElement.clientHeight
      canvas.width=pageWidth
      canvas.height=pageHeight
  }
}

function listenToUser(canvas){
  var using=false;
  var lastPoint={x:undefined,y:undefined}
  
  if(document.body.ontouchstart !== undefined){
      //触屏设备
      canvas.ontouchstart=function(a){
          console.log('开始触屏')
          var x=a.touches[0].clientX
          var y=a.touches[0].clientY
          using=true
      
          if (usingEraser){
              ctx.clearRect(x-5,y-5,10,10)
          }else{         
              lastPoint={x:x,y:y}
          }
  
      }
      
      canvas.ontouchmove=function(a){
          console.log('持续触屏')
          var x=a.touches[0].clientX
          var y=a.touches[0].clientY
          if(!using){return}
          if(usingEraser){                
              ctx.clearRect(x-5,y-5,10,10)
          }else{
              var newPoint={x:x,y:y}
              drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
              lastPoint=newPoint              
          }
      }
      
      canvas.ontouchend=function(a){
          console.log('结束触屏')
          using=false
      }
  }else{
      //非触屏设备
      canvas.onmousedown=function(a){
          var x=a.clientX
          var y=a.clientY
          using=true
      
          if (usingEraser){
              ctx.clearRect(x,y,10,10)
          }else{         
              lastPoint={x:x,y:y}
          }
      }
      
      canvas.onmousemove=function(a){
          var x=a.clientX
          var y=a.clientY
          if(!using){return}
          if(usingEraser){
              
              ctx.clearRect(x-5,y-5,10,10)
          }else{
              var newPoint={x:x,y:y}
              drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
              lastPoint=newPoint              
          }
      }
      
      canvas.onmouseup=function(a){
          using=false
      }
  }
}


function drawLine(x1,y1,x2,y2){
  ctx.lineWidth=lineWidth
  ctx.beginPath();           
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);           
  ctx.stroke()
}


