 var root = window.player;
 var dataList = [];
 var len = 0;
 var audio = root.audioManager; 
 var control = null; 
 var timer = null;
 var duration = 0;

 console.log(audio);
function getData(url) {
    $.ajax({
        type:'GET',
        url: url,
        success: function(data){
            console.log(data);
            len = data.length;
            control = new root.controlIndex(len);
            dataList = data;
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            root.pro.renderAllTime(data[0].duration);
            duration = data[0].duration;
            bindEvent();
            bindTouchEvent();
        },
        error: function () { 
            console.log('error');
        }
    })
}
function bindEvent() {
    $('body').on('play:change',function(e,index){
        root.render(dataList[index]);
        audio.getAudio(dataList[index].audio);
        root.pro.renderAllTime(dataList[index].duration);
        duration = dataList[index].duration;
        if(audio.status == 'play'){
            audio.play();
            root.pro.start(0);
            rotated(0);
        }else {
            root.pro.update(0);
        }
        $('.img-box').attr('data-deg',0);
        $('.img-box').css({
            'transform':'rotateZ(0deg)',
            'transition':'none'
        })
    })
    $('.prev').on('click',function(){
        var i = control.prev();
        $('body').trigger('play:change',i);
    })
    $('.next').on('click',function(){
        var i = control.next();
        $('body').trigger('play:change',i);
    })

    $('.play').on('click',function(){
        if(audio.status == 'pause'){
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg); 
        }
        else{
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
    })
}

function bindTouchEvent() {
    var left =  $('.pro-bottom').offset().left;
    var width = $('.pro-bottom').offset().width;
    $('.spot').on('touchstart',function (e) {
        root.pro.stop();
    }).on('touchmove',function (e) {
        var x = e.changedTouches[0].clientX - left;//相对视口
        var per = x / width;
        if(per >=0 && per < 1){
            root.pro.update(per);
        }
    }).on('touchend',function (e) {
        var x = e.changedTouches[0].clientX - left;//相对视口
        var per = x / width;
        var curTime = per * duration;
       
        if(per >=0 && per < 1){
            audio.playTo(curTime);
            audio.play();
            root.pro.start(per);
            $('.play').addClass('playing');
        }
    })
}
$(audio.audio).on('ended',function(){
    $('.next').trigger('click');
})
function rotated(deg) {
    clearInterval(timer);
    deg = +deg;
    timer = setInterval(function(){
        deg += 2;
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({
            'transform':'rotateZ(' + deg + 'deg)',
            'transition':'all 1s ease-out'
        });
        return deg;
    },200);
}

getData('../mock/data.json');

