/**
 * @author YangLing
 * @date 2022/10/25 08:40
 */

// 等待页面所有dom节点加载完毕之后在执行
$(document).ready(function(){
    // 模拟概览的数据 (销售量的数据)
    const overViewData = [
        {
            id : 1,
            value : 30,
            desc : '当日销量',
            color : '#006cff'
        },
        {
            id : 1,
            value : 120,
            desc : '当日销量',
            color : '#6acca3'
        },
        {
            id : 1,
            value : 359,
            desc : '当日销量',
            color : '#6acca3'
        },
        {
            id : 1,
            value : "1,390",
            desc : '当日销量',
            color : '#ed3f35'
        }
    ]

    // 初始化一个变量，用来保存动态创建的dom节点
    let str = ""

    // 循环遍历数据，动态创建dom节点
    overViewData.forEach(item=>{
        str += `
            <li>
                <h4>${item.value}万</h4>
                <span><i class="icon-dot" style="color : ${item.color}"></i>${item.desc}</span>
            </li>
        `
    })

    // 获取ul， 并且动态渲染数据
    $(".overview ul").html(str)
})

// 等待页面所有dom节点加载完毕之后在执行
$(function (){
    // 设置实时交易详情默认选中
    $('.monitor .tabs a').eq(0).addClass('active')

    // 演示数据结构
    const monitor = [
        // 实时交易详情数据
        [
            {
                id : 1,
                time : '11:00:01',
                area : '北京市海淀区',
                money : 1000.00
            },
            {
                id : 2,
                time : '12:00:01',
                area : '北京市东城区',
                money : 1000.00
            },
            {
                id : 3,
                time : '13:00:01',
                area : '北京市房山区',
                money : 1000.00
            },
            {
                id : 4,
                time : '14:00:01',
                area : '北京市朝阳区',
                money : 1000.00
            },
            {
                id : 5,
                time : '15:00:01',
                area : '北京市大兴区',
                money : 1000.00
            },
            {
                id : 6,
                time : '11:00:01',
                area : '北京市海淀区',
                money : 1000.00
            },
            {
                id : 7,
                time : '12:00:01',
                area : '北京市东城区',
                money : 1000.00
            },
            {
                id : 8,
                time : '13:00:01',
                area : '北京市房山区',
                money : 1000.00
            },
            {
                id : 9,
                time : '14:00:01',
                area : '北京市朝阳区',
                money : 1000.00
            },
            {
                id : 10,
                time : '15:00:01',
                area : '北京市大兴区',
                money : 1000.00
            }
        ],
        // 实时注册详情数据
        [
            {
                id : 1,
                time : '8:00:07',
                area : '福建省厦门市湖里区',
                sex : '男'
            },
            {
                id : 2,
                time : '9:00:07',
                area : '福建省厦门市湖里区',
                sex : '男'
            },
            {
                id : 3,
                time : '10:00:07',
                area : '福建省厦门市湖里区',
                sex : '男'
            },
            {
                id : 4,
                time : '11:00:07',
                area : '福建省厦门市湖里区',
                sex : '男'
            },
            {
                id : 5,
                time : '12:00:07',
                area : '福建省厦门市湖里区',
                sex : '男'
            },
            {
                id : 1,
                time : '8:00:07',
                area : '福建省厦门市湖里区',
                sex : '男'
            },
            {
                id : 2,
                time : '9:00:07',
                area : '福建省厦门市湖里区',
                sex : '男'
            },
            {
                id : 3,
                time : '10:00:07',
                area : '福建省厦门市湖里区',
                sex : '男'
            },
            {
                id : 4,
                time : '11:00:07',
                area : '福建省厦门市湖里区',
                sex : '男'
            },
            {
                id : 5,
                time : '12:00:07',
                area : '福建省厦门市湖里区',
                sex : '男'
            }
        ]
    ]

    let i = 0

    // 获取到tabs里面的a标签， 并且绑定点击事件
    $(".monitor .tabs a").on('click', function (){
        // 给当前所点击的元素，添加active类型， 并获取到相邻的元素， 移除相邻元素的active类名
        $(this).addClass("active").siblings().removeClass("active")
        // 获取到当前所点击元素的下标
        const _index = $(this).index()
        console.log(_index)
        // 获取到monitor 里面的所有的context
        $(".monitor .content").eq(_index).show().siblings('.content').hide()

        asyncLoadMonitor(_index)

    })

    // 动态加载交易数据
    function asyncLoadMonitor(index){
        let str = ""

        monitor[index].forEach(item=>{
            str += `
            <div class="row">
               <span class="col">${item.time}</span>
               <span class="col">${item.area}</span>
               <span class="col">${ item.money ?  item.money : item.sex}</span>
           </div>
        `
        })

        $('.monitor .marquee-view .marquee').eq(index).html(str)

        cloneData()
    }
    asyncLoadMonitor(i)

    // 解决滚动到一半的时候没有数据的问题
    function cloneData(){
        $(".monitor .marquee-view .marquee").each(function(){
            const rows = $(this).children().clone()
            $(this).append(rows)
        })
    }
    cloneData()
})

// 等待页面所有dom节点加载完毕之后在执行
$(function (){
    // 3. 实例化echarts
    const pie = document.querySelector(".pie")
    const myCharts = echarts.init(pie)
    // 4. 设置配置数据
    const option = {
        color : ["#006cff","#60cda0", "#ed8884", "#ff9f7f", "#0096ff", "#9fe6b8", "#32c5e9", "#1d9dff"],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: '销售统计',
                type: 'pie',
                radius: ["10%", "70%"],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 0 // 扇形圆心的圆角
                },
                label : {
                    fontSize : 10, // 设置线条旁边文字的长度
                },
                labelLine : {
                    show : true, // 是否显示线条
                    length : 6, // 设置第一段线条的长度
                    length2 : 8  // 设置第二段线条的长度
                },
                data: [
                    { value: 22, name: "云南" },
                    { value: 28, name: "北京" },
                    { value: 25, name: "山东" },
                    { value: 25, name: "河北" },
                    { value: 32, name: "江苏" },
                    { value: 22, name: "浙江" },
                    { value: 31, name: "四川" },
                    { value: 42, name: "上海" }
                ]
            }
        ]
    }
    // 5. 进行渲染
    myCharts.setOption(option)

    // 6. 实现图表自适应
    window.addEventListener("resize",()=>{
        myCharts.resize()
    })
})


