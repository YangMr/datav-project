/**
 * @author YangLing
 * @date 2022/10/25 08:40
 */

// 渲染概览数据
$(function(){
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

// 渲染交易数据
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

// module 实现饼图
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
                radius: ["10%", "50%"],
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
                    { value: 22, name: "云南", label : {color : '#006cff'} },
                    { value: 28, name: "北京", label : {color : '#60cda0'} },
                    { value: 25, name: "山东", label : {color : '#ed8884'} },
                    { value: 25, name: "河北", label : {color : '#ff9f7f'} },
                    { value: 32, name: "江苏", label : {color : '#0096ff'} },
                    { value: 22, name: "浙江", label : {color : '#9fe6b8'} },
                    { value: 31, name: "四川", label : {color : '#32c5e9'} },
                    { value: 42, name: "上海", label : {color : '#1d9dff'} }
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

// module 实现柱状图
$(function(){
    const item = {
            value : 1200,
            itemStyle : {
                color : "#254065"
            },
            tooltip : {
                extraCssText : 'opacity:0'
            }
    }
    // 1. 安装并引入echarts
    // 2. 创建渲染echarts的画布
    // 3. 获取画布并实例化echarts
    const bar = document.querySelector(".bar")
    const myCharts = echarts.init(bar)
    // 4. 设置配置数据
    const option = {
        color : {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#00fffb' // 0% 处的颜色
            }, {
                offset: 1, color: '#0061ce' // 100% 处的颜色
            }],
            global: false // 缺省为 false
        },
        tooltip: {
            formatter: '{a}<br />{b}: {c}',
            backgroundColor : "rgba(0,0,0,0.5)",
            borderColor : "rgba(0,0,0,0)",
            textStyle : {
                color : "#fff"
            },
            trigger: 'axis',
            axisPointer: {
                type: 'none'
            }
        },
        grid: {
            top : "3%",
            left: '0%',
            right: '3%',
            bottom: '3%',
            containLabel: true,
            show : true,
            borderColor : "rgba(0,240,255,0.3)"
        },
        xAxis: [
            {
                type: 'category',
                data: [
                    "上海",
                    "广州",
                    "北京",
                    "深圳",
                    "合肥",
                    "",
                    "......",
                    "",
                    "杭州",
                    "厦门",
                    "济南",
                    "成都",
                    "重庆"
                ],
                axisTick: {
                    alignWithLabel: false,
                    show : false
                },
                axisLine : {
                    lineStyle : {
                        color : "rgba(0,240,255,0.3)"
                    }
                },
                axisLabel : {
                    show :true,
                    color : '#4c9bfd'
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel : {
                    color : '#4c9bfd'
                },
                splitLine : {
                    lineStyle : {
                        color : "rgba(0,240,255,0.3)"
                    }
                },
            }
        ],
        series: [
            {
                name: '用户总量',
                type: 'bar',
                barWidth: '60%',
                data: [
                    2100,
                    1900,
                    1700,
                    1560,
                    1400,
                    item,
                    item,
                    item,
                    900,
                    750,
                    600,
                    480,
                    240
                ]
            }
        ]
    };
    // 5. 渲染图表
    myCharts.setOption(option)
    // 6. 设置图表自适应
    window.addEventListener("resize", function (){
        myCharts.resize()
    })
})

// module 实现订单
$(function(){
    // 模拟订单量数据
    const data = {
        day365 : {
            orders : '30,321,988',
            amount : 99882
        },
        day90 : {
            orders : '301,987',
            amount : 9876
        },
        day30 : {
            orders : '1,987',
            amount : 3834
        },
        day1 : {
            orders : '987',
            amount : 835
        }
    }
    const order = [
        {
            orders : '30,321,988',
            amount : 99882
        },
        {
            orders : '301,987',
            amount : 9876
        },
        {
            orders : '1,987',
            amount : 3834
        },
        {
            orders : '987',
            amount : 835
        }
    ]
    let $h4Order = $('.order h4:eq(0)')
    let $h4Amount = $('.order h4:eq(1)')
    $h4Order.html(data['day365'].orders)
    $h4Amount.html(data['day365'].amount)
    // this.dataset.type 获取标签自定义属性的值
    $(".order .filter a").on("click", function(){
        $(this).addClass("active").siblings().removeClass("active")
        const currentData = data[this.dataset.type]
        $h4Order.html(currentData.orders)
        $h4Amount.html(currentData.amount)
        console.log(currentData)
    })
})

// module 实现销售额
$(function (){
    let _index = 0
    let timer
    $(".sales .caption a").eq(_index).addClass("active")

    function autoToggle(){
        timer = setInterval(()=>{
            _index++
            if( _index === 4){
                _index = 0
            }
            asyncAddClass(_index)
            handleToggleData(_index)
        },1000)
    }
    autoToggle()



    function asyncAddClass(index){
        $(".sales .caption a").eq(index).addClass('active').siblings("a").removeClass('active')
    }

    $(".sales").hover(function(){
        clearInterval(timer)
        timer = null
    },function(){
        if(timer === null){
            autoToggle()
        }
    })


    // 模拟销售额数据
    const data = {
        // 年
        year : {
            info:["2099年","2199年","2299年","2399年","2499年","2599年","2699年","2799年","2899年","2999年","3099年","3199年"],
            detail:[
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ],
        },
        // 季
        quarter : {
            info:["1季度","2季度","3季度","4季度"],
            detail: [
                [23, 75, 12, 97],
                [43, 31, 65, 23]
            ],
        },
        // 月
        month : {
            info:["1月", "2月", "3月", "4月", "5月", "6月", "7月","8月","9月","10月","11月","12月"],
            detail: [
                [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
                [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
            ],
        },
        // 周
        week : {
            info: ["近1周", "近2周", "近3周", "近4周", "近5周", "近6周"],
            detail: [
                [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
                [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
            ]
        }
    }

    // 1. 安装echarts并引入
    // 2. 创建渲染echarts的画布
    // 3. 获取画布并对echarts进行初始化
    const line = document.querySelector(".line")
    const myCharts = echarts.init(line)
    // 4. 设置配置项数据
    const option = {
        color : ["#00f2f1","#ed3f35"],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            right : "10%",
            textStyle : {
                color : "#4c9bfd"
            },
            data: ['预期销售额', '实际销售额'],
        },
        grid: {
            top : "20%",
            left: '5%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            show : true,
            borderColor : "#012f4a",
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["2099年","2199年","2299年","2399年","2499年","2599年","2699年","2799年","2899年","2999年","3099年","3199年"],
            axisLabel : {
                color : "#4c9bfd"
            },
            axisTick : {
                show : false
            },
            axisLine : {
                lineStyle : {
                    color : "#012f4a"
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel : {
                color : "#4c9bfd"
            },
            splitLine : {
                lineStyle : {
                    color : "#012f4a"
                }
            }
        },
        series: [
            {
                name: '预期销售额',
                type: 'line',
                stack: 'Total',
                data:  [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                smooth : true
            },
            {
                name: '实际销售额',
                type: 'line',
                stack: 'Total',
                data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
                smooth : true
            }
        ]
    }
    // 5. 渲染图表
    myCharts.setOption(option)
    // 6. 设置图表自适应
    window.addEventListener("resize", function(){
        myCharts.resize()
    })

    $(".sales .caption a").on("click", function(){
        _index = $(this).index() - 1
        asyncAddClass(_index)
        handleToggleData(_index)
    })

    function handleToggleData(i){
        const currentAttr =  $(".sales .caption a").get(i).dataset.type
        const currentData = data[currentAttr]
        option.xAxis.data = currentData.info
        option.series[0].data = currentData.detail[0]
        option.series[1].data = currentData.detail[1]
        myCharts.setOption(option)
    }
})

// module 实现渠道分布
$(function (){
    // 1. 安装并引入echarts
    // 2. 创建渲染echarts的画布
    // 3. 获取创建的echarts画布， 并进行初始化
    const radar = document.querySelector(".radar")
    const myCharts = echarts.init(radar)
    // 4. 设置配置项数据
    const dataBJ = [
        [110, 90, 80, 60, 30]
    ]
    const lineStyle = {
        width: 3,
    };
    const option = {
        tooltip : {
            show: true,
            position: ["50%", "50%"],
            textStyle:{
                fontSize: 12,
                color : "#fff"
            },
            backgroundColor : 'rgba(0,0,0,0.5)',
            borderColor: 'rgba(0,0,0,0.5)',
        },

        radar: {
            center : ["50%","50%"],
            radius : "50%",
            indicator: [
                { name: '淘宝', max: 120,  },
                { name: '京东', max: 120,  },
                { name: '苏宁', max: 120, },
                { name: '微商', max: 120,  },
                { name: '其他', max: 120, },
            ],
            shape: 'circle',
            splitNumber: 4,
            axisName: {
                color: '#4c9bfd'
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.5)"
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.5)"
                }
            }
        },
        series: [
            {
                name: '上海',
                type: 'radar',
                lineStyle: lineStyle,
                data: dataBJ,
                symbol: 'circle',
                symbolSize : 5,
                itemStyle: {
                    color: '#fff'
                },
                areaStyle: {
                    color: 'rgba(238, 197, 102, 0.6)',
                }
            }
        ]
    }
    // 5. 渲染图表
    myCharts.setOption(option)
    // 6. 设置图表自适应
    window.addEventListener("resize", function (){
        myCharts.resize()
    })
})

// module 实现销售进度图表
$(function(){
    const gauge = document.querySelector(".gauge")
    const myCharts = echarts.init(gauge)
    const option = {
        color : ["#f60", "yellow", "green"],
        series: [
            {
                name: 'Access From',
                startAngle: 180,
                type: 'pie',
                radius: ['130%', '150%'],
                center : ["48%","86%"],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {
                        value: 100,
                        itemStyle: {
                            color : new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {offset : 0, color : "#00c9e0"},
                                    {offset : 1, color : "#005fc1"}
                                ])
                        }

                    },
                    { value: 100, itemStyle : {
                            color : '#12274d'
                        } },
                    {
                        value: 200,
                        itemStyle : {
                            color : 'transparent'
                        }
                    },

                ]
            }
        ]
    };
    myCharts.setOption(option)
    window.addEventListener("resize", function(){
        myCharts.resize()
    })
})

// module 全国热榜
$(function(){

    // 模拟服务端返回的数据
    const hotData = [
        {
            city: "北京", // 城市
            sales: "35, 279", // 销售额
            flag: true, //  上升还是下降
            brands: [
                //  品牌种类数据
                {name: "华为", num: "9,086", flag: true},
                {name: "小米", num: "8,341", flag: true},
                {name: "oppo", num: "7,407", flag: false},
                {name: "vivo", num: "6,080", flag: false},
                {name: "荣耀", num: "6,724", flag: false},
                {name: "iphone", num: "2,170", flag: true}
            ]
        },
        {
            city: "河北",
            sales: "23,252",
            flag: false,
            brands: [
                {name: "华为", num: "3,457", flag: false},
                {name: "小米", num: "2,124", flag: true},
                {name: "oppo", num: "8,907", flag: false},
                {name: "vivo", num: "6,080", flag: true},
                {name: "荣耀", num: "1,724", flag: false},
                {name: "iphone", num: "1,170", flag: false}
            ]
        },
        {
            city: "上海",
            sales: "20,760",
            flag: true,
            brands: [
                {name: "华为", num: "2,345", flag: true},
                {name: "小米", num: "7,109", flag: true},
                {name: "oppo", num: "3,701", flag: false},
                {name: "vivo", num: "6,080", flag: false},
                {name: "荣耀", num: "2,724", flag: false},
                {name: "iphone", num: "2,998", flag: true}
            ]
        },
        {
            city: "江苏",
            sales: "23,252",
            flag: false,
            brands: [
                {name: "华为", num: "2,156", flag: false},
                {name: "小米", num: "2,456", flag: true},
                {name: "oppo", num: "9,737", flag: true},
                {name: "vivo", num: "2,080", flag: true},
                {name: "荣耀", num: "8,724", flag: true},
                {name: "iphone", num: "1,770", flag: false}
            ]
        },
        {
            city: "山东",
            sales: "20,760",
            flag: true,
            brands: [
                {name: "华为", num: "9,567", flag: true},
                {name: "小米", num: "2,345", flag: false},
                {name: "oppo", num: "9,037", flag: false},
                {name: "vivo", num: "1,080", flag: true},
                {name: "荣耀", num: "4,724", flag: false},
                {name: "iphone", num: "9,999", flag: true}
            ]
        }
    ];

    // str保存的时候最终要渲染的DOM结构与数据
    let str = ""

    // 遍历数据
    hotData.forEach(item=>{
        str += `
            <li>
                <span>${item.city}</span>
                <span>${item.sales} <i class="${item.flag ? 'icon-up' : 'icon-down'}" style="color : #f60;"></i></span>
            </li>
        `
    })

    // 将数据渲染到.sup这个dom节点里面
    $(".province .sup").html(str)

    let _index = 0
    let timer


    function addClass(i){
        // 设置第一个li为选中的状态
        $(".province .sup li").eq(i).addClass("active").siblings().removeClass("active")
    }
    addClass(_index)

    function autoPlay(){
        timer = setInterval(function(){
            _index++
            if(_index === 5){
                _index = 0
            }
            addClass(_index)
            handleToggleData(_index)
        },1000)
    }

    autoPlay()

    function handleToggleData(i){
        // 获取到第一条数据里面的子数据
        const currentFirstChild = hotData[i].brands
        // 创建一个变量,保存要渲染的DOM节点与数据
        let childStr = ""
        // 遍历数据
        currentFirstChild.forEach(item=>{
            console.log(item)
            childStr += `
             <li>
                <span>${item.name}</span>
                <span>${item.num}<i class="${item.flag ? 'icon-up' : 'icon-down'}"></i></span>
             </li>
        `
        })
        // 将数据渲染到.sub这个dom节点里面
        $(".province .sub").html(childStr)
    }
    handleToggleData(_index)


    $(".sup li").hover(function(){
        clearInterval(timer)
        timer = null
        $(this).addClass("active").siblings().removeClass("active")
        _index = $(this).index()
        handleToggleData(_index)
    },function(){
        if(timer === null){
            autoPlay()
        }

    })
})





