(function($,root){
    function AudioManager(){
        this.audio = new Audio();
        // this.src = src;
        this.status = 'pause';
        // console.log(src);
    }
    AudioManager.prototype = {
        play: function () {
            this.audio.play(); 
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function (src) {
            // console.log(src);
            this.audio.src = src;
            this.audio.load();
        },
        playTo: function (time) {
            this.audio.currentTime = time;
        }
    }

    root.audioManager = new AudioManager();
})(window.Zepto,window.player || (window.play = {}))