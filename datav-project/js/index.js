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


    // 获取到tabs里面的a标签， 并且绑定点击事件
    $(".monitor .tabs a").on('click', function (){
        // 给当前所点击的元素，添加active类型， 并获取到相邻的元素， 移除相邻元素的active类名
        $(this).addClass("active").siblings().removeClass("active")
        // 获取到当前所点击元素的下标
        const _index = $(this).index()
        console.log(_index)
        // 获取到monitor 里面的所有的context
        $(".monitor .content").eq(_index).show().siblings('.content').hide()
    })
})
