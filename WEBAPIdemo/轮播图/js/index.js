window.addEventListener('load',function () {
    //1、鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮。
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter',function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave',function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            //手动调用点击事件
            arrow_r.click();
        },2000);
    });

    //2、动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0;i<ul.children.length;i++){
        var li = document.createElement('li');
        li.setAttribute('index',i);
        ol.appendChild(li);
        li.addEventListener('click',function () {
            for (var i =0 ;i<ol.children.length;i++){
                ol.children[i].className='';
            };
            this.className = 'current';

            //3.点击小圆圈，移动图片
            // ul的移动距离 索引*图片宽度
            var index = this.getAttribute('index');
            //当点击了li，就把这个小li的索引号给num
            num = index;
            circle = index;
            animate(ul,- index*focusWidth);
        })
    };
    ol.children[0].className = 'current';

    //4.克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮一次，图片往左播放一张
    var num = 0;
    var circle = 0;
    // flag 节流阀
    var flag = true;

    arrow_r.addEventListener('click',function () {
        if (flag){
            //关闭节流阀
            flag = false;
            if(num === ul.children.length -1){
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul,-num*focusWidth,function () {
                //打开节流阀
                flag = true;
            });
            // 8.图片播放的同时，下面小圆圈模块跟随一起变化
            circle++;
            if(circle === ol.children.length){
                circle =0;
            }
            // // 先清除其余小圆圈current
            // for (var i = 0;i<ol.children.length;i++){
            //     ol.children[i].className = '';
            // }
            // ol.children[circle].className = 'current';
            //调用函数
            circlechange();
        }
    });
    arrow_l.addEventListener('click',function () {
       if (flag){
           flag = false;
           if(num === 0){
               num = ul.children.length -1;
               ul.style.left = -num *focusWidth+'px';
           }
           num--;
           animate(ul,-num*focusWidth,function () {
                flag = true;
           });
           // 8.图片播放的同时，下面小圆圈模块跟随一起变化
           circle--;
           if(circle < 0){
               circle = ol.children.length-1;
           }
           //调用函数
           circlechange();
       }
    });
    function circlechange(){
        // 先清除其余小圆圈current
        for (var i = 0;i<ol.children.length;i++){
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    };
    //自动播放轮播图
    var timer = setInterval(function () {
        //手动调用点击事件
        arrow_r.click();
    },2000);


})