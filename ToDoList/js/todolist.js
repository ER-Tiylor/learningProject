$(function(){
    load();
    $("#title").on("keydown",function(event){
        if (event.keyCode === 13){
            //先读取本地存储原来的数据
            var local = getData();
            console.log(local);
            //把local数组进行更新数据，把最新的数据追加给local数组
            local.push({title:$(this).val(),done:false});
            // 把这个数组local 存储给本地存储
            saveData(local);
            //2、把本地存储的数据渲染到页面当中
            load();
            $(this).val("");
        }
    });
    //4、正在进行和已完成选项操作
    $("ol ,ul").on("click","input",function () {
        // 先获取本地数据
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        // 修改数据
        //自定义属性与自有属性
        data[index].done = $(this).prop("checked");
        console.log(data);
        // 保存到本地数据
        saveData(data);
        // 重新渲染页面
        load();
    })


    //读取本地存储的数据
    function getData(){
        var data = localStorage.getItem("todolist");
        if(data !==null){
            return JSON.parse(data);
        }else{
            return [];
        }
    };
    function saveData(data){
        //JSON.stringify 将对象转换为字符串
        localStorage.setItem("todolist",JSON.stringify(data));
    }
    //注意这里的事件委托 
    $("ol,ul").on("click","a",function () {
        //先获取本地存储
        var data = getData();
        //修改数据
        //attr和prro
        var index = $(this).attr("id");
        console.log(index);
        data.splice(index,1);
        //保存到本地存储
        saveData(data);
        //重新渲染页面
        load();

    })

    function load() {
        //获取本地存储数据
        var data = getData();
        // console.log(data);
        //遍历之前清空ol的内容
        $("ol,ul").empty();
        var todoCount = 0;
        var doneCount = 0;
        //遍历这个数据
        $.each(data,function(i,n){
            if (n.done){ $("ul").prepend("<li><input type='checkbox' checked><p>"+n.title+" </p> <a href='javascript:;' id=" + i + "></a></li>");doneCount++;}else{
                $("ol").prepend("<li><input type='checkbox'><p>"+n.title+" </p> <a href='javascript:;' id=" + i + "></a></li>");todoCount++;
            }

        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})