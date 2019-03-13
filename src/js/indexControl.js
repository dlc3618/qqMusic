(function($,root){
    function Control(len){
       this.index = 0;
       this.len = len;
    }
    Control.prototype = {
        prev:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(1);
        },
        getIndex:function(val){
            //当前对应索引
            var index = this.index;
            var len = this.len;
            var curIndex = (index + val +len) % len;
            //数据总长度
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlIndex = Control;
})(window.Zepto,window.player || (window.player = {}));