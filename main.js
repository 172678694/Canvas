var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var lineWidth = 3

autoSetSize(canvas)
listenToUser(canvas)

var isUsingEraser = false
/*功能选择*/
eraser.onclick = function () {
    isUsingEraser = true
    $('.actions>li.active').removeClass('active')
    $('#eraser').addClass('active')
}

brush.onclick = function () {
    isUsingEraser = false
    $('.actions>li.active').removeClass('active')
    $('#brush').addClass('active')
}


$('#black').on('click',()=>{
    $('.colors>li.active').removeClass('active')
    $('#black').addClass('active')
})
// black.onclick = function () {
//     ctx.strokeStyle = "black"
//     black.classList.add('active')
//     red.classList.remove('active')
//     green.classList.remove('active')
//     blue.classList.remove('active')
//     //用jQuery上面三句可以用$('.active').removeClass('active')一句代替
// }
$('#white').on('click',()=>{
    $('.colors>li.active').removeClass('active')
    $('#white').addClass('active')
    ctx.strokeStyle = "white"
})
$('#red').on('click',()=>{
    $('.colors>li.active').removeClass('active')
    $('#red').addClass('active')
    ctx.strokeStyle = "red"
})
$('#green').on('click',()=>{
    $('.colors>li.active').removeClass('active')
    $('#green').addClass('active') 
    ctx.strokeStyle = "green"
})
$('#blue').on('click',()=>{
    $('.colors>li.active').removeClass('active')
    $('#blue').addClass('active')
    ctx.strokeStyle = "blue"
})
$('#grey').on('click',()=>{
    $('.colors>li.active').removeClass('active')
    $('#grey').addClass('active')
    ctx.strokeStyle = "grey"
})
$('#yellow').on('click',()=>{
    $('.colors>li.active').removeClass('active')
    $('#yellow').addClass('active')
    ctx.strokeStyle = "yellow"
})


thin.onclick = function () {
    lineWidth = 3
    $('.sizes>li.active').removeClass('active')
    $('#thin').addClass('active')
}
medium.onclick = function () {
    lineWidth = 6
    $('.sizes>li.active').removeClass('active')
    $('#medium').addClass('active')
}
thick.onclick = function () {
    lineWidth = 9
    $('.sizes>li.active').removeClass('active')
    $('#thick').addClass('active')
}

clear.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $('.actions>li.active').removeClass('active')
    $('#clear').addClass('active')
}

download.onclick = function () {
    var url = canvas.toDataURL("image/png")
    var saveCanvas = document.createElement('a')
    document.body.appendChild(saveCanvas)
    saveCanvas.href = url
    saveCanvas.download = "我的画"
    saveCanvas.target = "_blank"
    saveCanvas.click()
    $('.actions>li.active').removeClass('active')
    $('#download').addClass('active')
}


/********/

function autoSetSize(canvas) {
    setSize()
    window.onresize = function () {
        setSize()
    }

    function setSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
}

function listenToUser(canvas) {
    var using = false;
    var lastPoint = { x: undefined, y: undefined }

    if (document.body.ontouchstart !== undefined) {             //设备判断
        canvas.ontouchstart = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            using = true

            if (isUsingEraser) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { x: x, y: y }
            }
        }

        canvas.ontouchmove = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            if (!using) { return }
            if (isUsingEraser) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { x: x, y: y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function (e) {
            using = false
        }

    } else {   //非触屏设备
        canvas.onmousedown = function (e) {
            var x = e.clientX
            var y = e.clientY
            using = true

            if (isUsingEraser) {
                ctx.clearRect(x, y, 10, 10)
            } else {
                lastPoint = { x: x, y: y }
            }
        }

        canvas.onmousemove = function (e) {
            var x = e.clientX
            var y = e.clientY
            if (using){
                if (isUsingEraser) {
                    ctx.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    var newPoint = { x: x, y: y }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint
                }
            }
        }

        canvas.onmouseup = function (e) {
            using = false
        }
    }
}




