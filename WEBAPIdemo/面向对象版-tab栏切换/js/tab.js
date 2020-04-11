var that = null;
class Tab{
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');

        // li的父元素
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        //section 的父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    //获取所有的li和section
    // 因为我们动态添加元素，需要重新获取对应的元素
    updateNode(){
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
    }
    init(){
        this.updateNode();
        // init 初始化操作
        this.add.onclick = this.addTab;
        for (var i =0;i<this.lis.length;i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    // 1 切换功能
    toggleTab(){
        // console.log(this.index);
        that.clearClass();
        this.className = 'liactive';
        // console.log(that.sections[2]);
        that.sections[this.index].className = 'conactive';

    }
    clearClass(){
        for(var i =0;i<this.lis.length;i++){
            this.lis[i].className ='';
            this.sections[i].className= '';
        }
    }
    // 2 添加功能
    addTab(){
        //(1) 创建li元素和section元素
        var random= Math.random();
        that.clearClass();

        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试'+random+'</section>';
        // (2)把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML("beforeend", li);
        that.fsection.insertAdjacentHTML("beforeend", section);
        that.init();

    }
    // 3 删除功能
    removeTab(e){
        e.stopPropagation();  // 阻止冒泡 防止触发li 的切换点击事件
        var index = this.parentNode.index;
        console.log(index);
        // 根据索引号删除对应的li 和 section remove()方法可以直接删除指定的元素
        that.lis[index].remove();
        that.sections[index].remove();
        // 当我们删除了选中状态的这个li，的时候，让它的前一个 li 处于选定状态
        //当我们删除的不是选定状态的li 的时候，原来的选中状态不变
        if(document.querySelector('.liactive')) return;
        that.lis[index-1] && that.lis[index-1].click();
        that.init();

    }
    // 4 修改功能
    editTab(){
        var str = this.innerHTML;
        window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
        // console.log(11);
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        input.select();  // 文本框里面的文字处于选中状态
        // 当离开文本框，就把文本框里面的值给span
        input.onblur = function(){
            this.parentNode.innerHTML = this.value;
        };
        // 按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e){
            if(e.keyCode == 13){
                this.blur();
            }
        }

    }
}

var tab = new Tab('#tab');

