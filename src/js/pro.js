(function($,root){
    var duration = 0;
    var frameId = null;
    var startTime = null;
    var lastPer = 0;
    //渲染总时间
    function renderAllTime(time){
        duration = time;
        time = formatTime(time);
        lastPer = 0;
        $('.all-time').html(time);
    }
    //格式化，将秒转换为分
    function formatTime(t){
        t = Math.round(t);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        if (m < 10){
            m = '0'+ m
        }
        if (s < 10){
            s = '0'+ s
        }
        return m + ":" + s;
    }
   
    function start (p) { 
        lastPer = p === undefined ? lastPer : p;
        //存储当前点击播放的时间戳
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (duration * 1000);
            update(per);
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }
    function stop() {
         cancelAnimationFrame(frameId);
        var curTime = new Date().getTime();
        var per = (curTime - startTime) / (duration * 1000);
        lastPer += per;
    }
    //更新当前时间和进度条
    function update(per) {
        var curTime = per * duration;
        curTime = formatTime(curTime);
        $('.cur-time').html(curTime);
        var translateX = (per - 1) * 100 + '%';
        $('.pro-top').css({
            transform: 'translateX(' + translateX +')'
        })
    }
    root.pro = {
        renderAllTime : renderAllTime, 
        start : start,
        stop : stop,
        update : update 
    }
})(window.Zepto, window.player || (window.player = {}))