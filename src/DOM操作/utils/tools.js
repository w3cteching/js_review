//封装一个$
function $(selector) {
    return typeof selector==='string' ? document.querySelector(selector) : selector
}

//还可以继续封装其他工具方法

