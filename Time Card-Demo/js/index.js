let curTime = new Date(),
    curYear = curTime.getFullYear(),
    curMonth = curTime.getMonth()+1,
    curDate = curTime.getDate();
console.log(curTime,curYear,curMonth,curDate);
document.getElementById("today").innerHTML="今天是"+curYear+curMonth+curDate;
//首先思考一下，日历该怎么做，想到的是需要一个渲染函数来动态渲染日期表格，那它需要什么参数呢，其实通过观察日历，月视图下，
// 肯定是显示当前月份，根据月的天数，如果恰好1号在第一行最后一个，31天的话，4*7=28，所以需要6行，行数是随天数改变的，
// 所以关键是确定当前月的天数，
//那天数跟什么有关呢，跟年是否平闰和月份有关。闰年2月29天，平年2月28天。所以参数就是年和月.
//闰年：能被4整除且不能被100整除，或能被400整除的数
//下一个问题是：星期几的问题，这个可以获取这个月的1号的周几就行了，js就有这个函数，然后依次就可以排下去
function isLeapYear(year) {
    return ((year%4===0)&& (year%100!==0) || (year%400=== 0) )
}
function render(sYear,sMonth) {
    let stmonth=sMonth-1;
    //判断是否闰年，并确定每个月的天数
    let daysInMonth = [31,isLeapYear(sYear)? 29:28, 31,30,31,30,31,31,30,31,30,31];

    //确定这个月的第一天是周几，getDay返回的是0-6，
    let firstdayInMonth = new Date(sYear,sMonth-1,1);
        firstDayweek = firstdayInMonth.getDay();
        //怎么确定行数呢？
        // 思路是这样的：总天数减去第一行的天数，然后除以7上取整，然后+1就是总行数。
        let CRows = Math.ceil((daysInMonth[sMonth-1]-(7-firstDayweek))/7)+1;

        //接下来就是渲染主要html内容了
        //用一个数组来存储所有的拼接的内容
        let rows=[];

        for (let i=0;i<CRows;i++){
        rows[i]='<div class="day-row">';
        //用idx给所有表格加索引，date来计算日
            for (let j=0;j<7;j++){
                let idx = i*7 + j,
                    date = idx -firstDayweek+1;
                if (date<=0 && j==0||date<=0 && j==6 || date>daysInMonth[sMonth-1]&&j==0 || date>daysInMonth[sMonth-1]&&j==6){
                    rows[i] +='<div class="div box green"><ul contentEditable><li contentEditable>测试文本</li></ul></div>';
                }else if (date<=0 || date>daysInMonth[sMonth-1]){
                    rows[i] +=`<div class="div box"></div>`;
                }
                else if (date===curDate && stmonth===curMonth){
                    rows[i] +=`<div class="div box curday"><span>${date}</span><ul contentEditable style="font-size: 14px;"><li contentEditable>测试文本可编辑</li></ul></div>`;
                }else if (j==0 || j==6){
                    rows[i] +=`<div class="div box green">${date}</div>`;
                }else{
                    rows[i]+=`<div class="div box">`+date+`</div>`;
                }
            }
            rows[i]+='</div>';
        }
        let dateStr = rows.join('');
    document.querySelector('.day-rows').innerHTML = dateStr;
    // let dom=document.getElementById()

}
render(curYear,curMonth+1);
function exet(obj) {
    this.name="active";
    var year =form1.years.value;
    var month = 0;
    switch(obj.value){
        case "Jan":
            month=1
            break;
        case "Feb":
            month=2
            break;
        case "Mar":
            month=3
            break;
        case "Apr":
            month=4
            break;
        case "May":
            month=5
            break;
            case "Jun":
            month=6
            break;
        case "Jul":
            month=7
            break;
        case "Aug":
            month=8
            break;
        case "Sept":
            month=9
            break;
        case "Oct":
            month=10
            break;
        case "Nov":
            month=11
            break;
        case "Dec":
            month=12
            break;
    }

    render(year,month);




}
function Today(){
    render(curYear,curMonth+1);
}
