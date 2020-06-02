JS三大部分：EcmaScript(JS核心),DOM,BOM



一、原型链与继承（看前几天ES6复习过内容）

二、闭包（英文：closure）

	1. 闭包是一个函数与作用域环境(即**词法环境**)形成的闭包
 	2. 闭包的理解：

```
广义的闭包：1.函数  2.这个函数能访问到函数外部的状态（也称函数外部的变量）
平时理解的闭包：
   特点：函数嵌套函数，并且内部函数通过return返回到外部，外部可以访问内部函数的变量
   
总结：闭包=函数+自由变量

自由变量：即可以是外部的变量，也可是父级函数的形参

闭包特点：

   闭包中自由变量长期驻留内存，长期驻留内存中的变量如果处理不当，会导致内存泄露，不用的话要将闭包置为null
   可以隔离作用域，模拟块级作用域
   

自由变量：就是在函数外部定义的，并且在函数内部可以访问到的变量就叫自由变量
```

3.具体讲一下闭包的实际应用举例

   - 作用域链:通过在当前函数内部查找要访问的变量，如果有则访问，没有则向上一级查找此变量，上级有则访问之，没有再再往上上一级查找，以此类推，直到找到全部window下有没有，有则访问，没有些报错

     > 是否有点像原型链的查找呢？？？？非常像

     

   - 闭包应用举例:

     计数器

     ```
     
     //功能：递增，递减，获取递增或递减之后的值
     var Counter=function() {
         //私有变量
         var num=0;
         //私有函数
         var changeValue=function(n) {
     
             return num+=n;
     
         }
     
     
        return {
            //增
            increment:function() {
                 changeValue(1)
            },
            //减
            decrement:function() {
                 changeValue(-1)
            },
            //获取值
            getValue:function() {
                return num;
            }
        }
     }
     
     ```

     

     改变页面字号

     ```
     function setSize(size) {
     
        return function() {
     
          document.body.style.fontSize=size+'px'
     
        }
     
     }
     
     var size12=setSize(12);
     
     var size40=setSize(40)
     
     var size50=setSize(50);
     ```

     

     定时器累加

     ```
     //要求每隔1秒打印1,2,3,.....10
     
       //setTimeout是异步执行的，异步队列
     
     /*
       for(var i=1;i<=10;i++) {
          
          (function(j) {
             setTimeout(function() {
                 console.log('i=j的值：',j)
             },2000*j)
          })(i)
     
       }
     
       console.log('最后打印：',i)
     
       */
     
     
        for(let i=1;i<=10;i++) {
         
             setTimeout(function() {
                 console.log('i的值：',i)
             },1000*i)
        
     
       }
     ```

     

     封装组件：

     ```
     立即调用函数
     (function(win,doc) {
     
       //尽情写你的代码啦！
       //私有变量
       
       //私有方法
       
       
       return {
       
       	暴露出去的方法
       
       }
     
     
     
     
     })(window,document)
     ```

     

     三、this: 

     

     **1.运行时**：this它才是真正在运行时的环境为准 ，也就是说this是动态改变的

     **2.词法环境**:即变量和函数在定义时的环境，即为词法环境

     3.this各种场景大集合：

      ```
     a.在全局环境下：this===window===全局
     b.在普通函数内：this === window
     c.在构造函数内：this永远指向当前被实例化的对象
     
       例如：f1,f2
       
        function Fn(name='张三',age=0) {
            this.name=name
            this.age=age
            //指向实现化的对象,分别：this===f1  //true
            console.log('this:',this)
        }
     
       var f1=new Fn('盖威',20)
       var f2=new Fn('姚杰',18)
       
       
     d.在对象中：
      var value='React'
     
         var obj={
             value:'vuejs',
             getValue:function() {
                 //this=== obj //true
                 
                 function getValue2() {
                     console.log('obj内部this:',this.value)  //this === window
                 }
     
                 getValue2()
     
                 return this.value;
             }
         }
     
         obj.getValue()
     
     e.在dom中:
     
         <button class="btn">改变当前按钮背景色</button>
     
     <script>
      var btn=document.querySelector('.btn')
      btn.onclick=function() {
          console.log(this===btn)
          this.style.background='#f00'
      }
     </script>
     f.在定时器中
     
       var value='React'
     
         var obj={
             value:'vuejs',
             getValue:function() {
               var _this=this;
                 setTimeout(function() {
                     console.log(this)  //定时器中的this永远指向window
                     console.log(this.value)
                 },2000)
             }
         }
     
         obj.getValue()
         
         解决方案：通过保存this或箭头函数或call,apply,bind来实现
     
      ```

     

     **总结一下：**

     this:谁调用this，this就指向谁？？？？？？难道这句话真的正确吗？？？？？

     

     答案是否的

     ```
      var value='React';
     
        var obj={
            value:'Vuejs',
            getValue:function() {
                console.log(this===window)
                console.log(this.value);
            }
        }
     
       // obj.getValue();   // this===obj
      // console.log((obj.getValue)())   //this===obj
     
      //console.log((obj.getValue=obj.getValue)())  //this===window
      //console.log((false || obj.getValue)())   //this===window
      //console.log((false,obj.getValue)())    //this===window
     ```

     

     

     从JS官方规范来解读，才能解读清楚上面的一切现象！！！！！！！

     ES5中文官方文档：http://yanhaijing.com/es5/#about

     

     --------

     ## 一、call,apply,bind

     ```
主要用于改变this指向的
     1.call格式：函数名.call(上下文环境，参数)
     
      说明：
      
         上下文环境：就是应用函数的作用域范围
         参数：是以逗号分隔的参数列表
         
         例如：getMsg.call(obj,'微信小程序','Angular');
     
     特点：1.改变this指向，2.函数被执行了
     
     2. apply格式:函数名.apply(上下文环境，参数)
     
        说明：
         上下文环境：就是应用函数的作用域范围
         参数：是用数组形式传递的参数列表
         
         例如：getMsg.apply(obj,['微信小程序111','Angular222']);
         
     特点：同call的特点
     
     3. bind格式：函数名.bind(上下文环境，参数)
     
       bind传参调用：
       
       getMsg.bind(obj,'微信小程序','Angular')()
       getMsg.bind(obj)('微信小程序','Angular')
     
     
     特点：1.改变this指向，2.返回调用函数本身，函数没有被执行
     
       回顾一下React中的事件绑定：<div onClick={this.play.bind(this)}>
       
       
     面试官问：call,apply,bind区别？自己总结
     ```
     
     
     
     二、说一下call和apply的实现原理？
     
     
     
       ```
     问到xxxx原理？其实是在问你实现的底层，再本质一点，是再问是否会造这个轮子！！！！！
       ```
     
     > 记住：函数由Function构造器实例化
     
     > 平时创建一个函数：
     >
     > 1.函数声明
     >
     > function Fn() {
     >
     > }
     >
     > 2. 函数表达式
     >
     >     var Fn=function() {
     >
     >     
     >
     >     }
     >
     > 3. 用new的方式创建一个函数
     >
     >     var Fn=new Function('函数参数','函数执行体'')
     
     
     
     ```
     eval:可以将内部的字符串解析成代码或表达式去执行
     例如：
     eval('1+2')
     3
     eval('alert("1906A")')
     
     参考官方文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval
     ```
     
     ```
     call实现原理，模拟call的实现：
     
     //用JS原生模拟call
     
     Function.prototype.call2=function(context) {
     
        var ctx=context || window;
     
        //将函数临时添加到对象上 
        ctx.fn=this;  //其中this代码要调用的函数
     
     
       //处理参数接收问题，arguments
       var args=[];
       for(var i=1,len=arguments.length;i<len;i++) {
           //将获取的每个参数压入数组中
           args.push('arguments['+i+']');  
       }
     
       //最后得到： args[arguments[0],arguments[1],arguments[2]]
     
     
        //执行对象上的函数，eval,用于执行字符串代码的
        var result=eval('ctx.fn('+args+')')  //ctx.fn(args)
        
        //最后删除掉这个函数
        delete ctx.fn
     
       return result;
        
     }
     ```
     
     ```
     
     apply实现原理，模拟apply实现：
     
     Function.prototype.apply2=function(context,arr) {
     
        var ctx=context || window;
     
        //将函数临时添加到对象上 
        ctx.fn=this;  //其中this代码要调用的函数
     
       //对是否有arr进行处理
       if(!arr) {
           ctx.fn();
       }else {
     
         //处理参数接收问题，arguments
         var args=[];
         for(var i=1,len=arr.length;i<len;i++) {
             //将获取的每个参数压入数组中
             args.push('arguments['+i+']');  
         }
     
         //最后得到： args[arguments[0],arguments[1],arguments[2]]
     
         //执行对象上的函数，eval,用于执行字符串代码的
         var result=eval('ctx.fn('+args+')')  //ctx.fn(args)
     
       }
        //最后删除掉这个函数
        delete ctx.fn
     
       return result;
        
     }
     ```
     
     
     
     三、防抖和节流实现原理？
     
       
     
        1. 防抖和节流解决什么问题？
     
           ```
           解决页面高频触发或向后端连续请求的优化逻辑问题 例如：搜索，滚动加载
           
           键盘：onkeydown（键盘按下）,onkeyup（键盘抬起）
           鼠标：onmousemove（鼠标移动）
           浏览器事件：onresize（改变窗口尺寸）,onscroll(滚动事件)
           
           ```
     
           
     
     2. 防抖：
     
         ```
         生活比喻：比如电脑屏保，电梯的开关
         防抖：即在固定n秒间隔内，不会执行代码逻辑，除非n秒内有事件触发，则会再延长n秒，直到n秒没有触发的事件，则在n秒后执行代码逻辑
         
         代码实现思路：
         
         1.主要利用定时器实现
         2.考虑this指向问题
         3.考虑事件对象是否使用 事件对象属于事件处理函数的参数
         
         //防抖函数具体实现
           /*
           * { function }func:代表对哪个高频函数进行防抖
           * { number } wait:代表防抖的时间间隔
           */
          function debounce(func,wait) {
               var timeout;
               return function() {
                   var _this=this;
                   var args=arguments;
                   clearTimeout(timeout)
                   timeout=setTimeout(function() {
                       func.apply(_this,args)
                   },wait)
         
               }
           }
         
         ```
     
         
     
     3. 节流
     
         ```
         生活比喻：每天有规律的时间学习，吃饭，跑步,不会因为杂事儿所打乱，类似闹钟是有规律的
         节流：固定的时间节点，执行固定的代码逻辑
         ```
     
         > **时间戳实现节流**
     
         ```
         
          //节流函数
           /*
           * { function }func:代表对哪个高频函数进行节流
           * { number } wait:代表节流的时间间隔
           * 节流有两种实现方式：时间戳方式，定时器方式
           */
           function throttle(func,wait) {
               var _this;
               var args;
               var previous=0; //记录历史时间戳
         
               return function() {
                   var now=+new Date();  //生成一个当前的时间戳
                   args=arguments;
                   _this=this;
         
                  //用当前时间now减去历史时间previous大于wait，就会执行事件处理函数，并且更新历史时间
                   if(now-previous>wait) {
                       //执行事件处理函数
                       func.apply(_this,args)
                       //更新历史时间戳
                       previous=now;
                   }
               }
           }
         ```
     
         > **定时器实现节流**
     
         ```
         
          //节流函数
           /*
           * { function }func:代表对哪个高频函数进行节流
           * { number } wait:代表节流的时间间隔
           * 节流有两种实现方式：时间戳方式，定时器方式
           */
           function throttle(func,wait) {
              var timeout;
              var args;
              var _this;
              
               return function() {
                   _this=this;
                   args=arguments;
                 if(!timeout) {
                     timeout=setTimeout(function() {
                         func.apply(_this,args)
                         timeout=null;
         
                     },wait)
                     
                 }
         
                 
               }
           }
         ```
     
         
     
         语言组织：
     
            用一句话告诉我：功能？，性能？
     
         
     
            功能：就是代表能用！
     
            性能：就是代表好用！
     
         
     
         
     
     四、new的实例原理：
     
     
     
       ```
     面试官可能会这样问：
      1.new一个构造函数时，中间发生了什么？
      2.或者new一个构造函数，中间执行了哪些步骤？
      
      答：
      第一步：创建一个临时对象obj
      第二步：获取构造函数赋值给Constructor
      第三步：将obj的原型指向Constructor的原型,目的可以让实例化对象找到构造器原型上的方法
      第四步：让Constructor属性作用于obj上，从而可以操作this.xxx的实例属性
      第五步：返回临时对象obj
      
      
      封装的new代码如下：
      
     function new1() {
        // 创建一个临时对象
        var obj={};
       //获取构造函数赋值给Constructor
       var Constructor=[].shift.apply(arguments)
       //然后arguments中的值只能除第一个值之外的参数了
       //将obj的原型指向Constructor的原型,目的可以让实例化对象找到构造器原型上的方法
       obj.__proto__=Constructor.prototype
       
       //让Constructor属性作用于obj上，从而可以操作this.xxx的实例属性
       Constructor.apply(obj,arguments)
     
       //返回obj
       return obj;
     }
     
       ```
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     



   



 









