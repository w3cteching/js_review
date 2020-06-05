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

     

     ## 一、第三方函数工具库

     1. lodash:

       语法：_.方法名()

       使用方法：

        ```
     第一种：通过script标签去使用
     <script src=".js/lodash.min.js"></script>
     
     第二种：通过npm结合脚手架去使用
     npm install lodash -D
     
     var _ = require('lodash');
     或
     import _ from 'lodash'
     
     然后再vue组件中就可以使用了
     _.debounce()
        ```

     

       

     例如：

     ```
     数组扁平化：_.flattenDepth(数组名,扁平化的层数),
     数组排序：_.orderBy(数组名,[排序字段]，[排序方式desc,asc]),
     数组去重.uniq(要去重的数组名)
     ```

     2. moment库

     ```
     主要用于处理日期和时间的
     
     github官方仓库：https://github.com/moment/moment
     官网：https://momentjs.com/
     
     使用：npm install moment --save
     ```

     3.css动画库：animate.css

     

     ```
     npmp install animate.css -D
     
     官方github仓库：https://github.com/animate-css/animate.css
      
     ```

     

     css动画在vue中使用

     1.纯css3动画实现：你平时写的css动画

       主要通过vue内置的transition组件来实现

      ```
     <transition name='动画名'>
        //要做动画的组件
     </transition>
     
     有四个状态：
     
     准备进入：.动画名-enter {}
     
     离开后：.动画名-leave-to {}
     
     进入过程中：.动画名-enter-active {}
     
     离开过程中：动画名-leave-active{}
      ```

     

     2.用第三方动画库实现：animate.css

     ```
     第一步：安装animate.css
     npm install animate.css -S
     
     第二步：在main.js中引入
     // 引入animate.css
     import 'animate.css/animate.css'
     
     第三步：在要应用的页面或组件中使用
     
      <transition
            enter-active-class="animate__animated animate__heartBeat"
            leave-active-class="animate__animated animate__backOutDown"
       >
           <router-view></router-view>
      </transition>
      
      说明：
        enter-active-class:进入过程中的动画类
        leave-active-class:离开过程中的动画类
     ```

     

     ## 二、javaScript深浅拷贝

     ```
     何为基本数据类型
     
       基本类型的同仁，是复制的数据内容（基本数据number,string,boolean,null,undefined,symbol）
       
     何为对象数据类型（或称引用类型）
       对象之间的赋值，是复制的地址
       
     浅拷贝：只是复制外层的地址，没有继续往内部找到基本类型数据
     深拷贝：递归的复制内部数据走到找到基本类型数据才复制出来
     
     如何实现一个深拷贝呢？
     1.SON.parse(JSON.stringify(arr))
       
       优点：简单，缺点：不能复制函数
       
     2.用递归去实现深拷贝
     
     //只遍历对象自身的属性，不遍历原型链的属性 hasOwnProperty() boolean
     
     
     function deepCopy(arr) {
     
         var newObj;
         //初始化
         newObj= arr instanceof Array ? [] : {}
     
         //遍历检测数组或对象元素
         for(var key in arr) {  //arr[0]
             // 只遍历对象自身的属性
             if(arr.hasOwnProperty(key)) {
                newObj[key] = typeof arr[key] === 'object' ? deepCopy(arr[key]) : arr[key]
             }
         }
     
       return newObj;
     
     }
     
     知乎上关于深拷贝的理解：
     https://www.zhihu.com/question/23031215
     
     //深复制，要想达到深复制就需要用递归
     	  function deepCopy(o,c){
     	    var c = c || {}
     	    for(var i in o){
     	    if(typeof o[i] === 'object'){
     	  	   	   	  //要考虑深复制问题了
                           if(o[i].constructor === Array){
                         	//这是数组
                         	c[i] =[]
                         }else{
                         	//这是对象
                         	c[i] = {}
                         }
                         deepCopy(o[i],c[i])
     	  	   	   }else{
     	  	   	   	 c[i] = o[i]
     	  	   	   }
     	  	   }
     	  	   return c
     	  }
     
     
     3. 通过loadsh库去实现
      var arr=[
             {id:1001,name:'ipad2',price:2300},
             {id:1002,name:'vivo',price:2350},
             {id:1003,name:'oppor',price:1300}
         ]
         
        var result=_.cloneDeep(arr);
        result[2].name='nokia'
        console.log('arr:',arr)
        console.log('result:',result)
     ```

     

     

     ##  三、javaScript中的DOM操作方法

     ```
     现在是数据驱动，组件化，模块化，虚拟DOM的天下！！！！
     
     但上面的前提是你得在某个框架（Angular(2009年),React（2013.4）,vuejs（2014.3）,Flutter（）2018.12....）下才能开始使用~~~
     
     频繁操作DOM,会引起浏览器的重绘和回流，降低页面性能
     
     DOM操作方法：
     
     jQuery:操作dom神器  $('')
     
     JS原生事件绑定：
     
        1.html绑定事件
        
        例如：<button class="btn" onclick="alert(1111)">事件绑定</button>
        
        2.dom0级绑定事件
         //先获取dom
         var btn=document.querySelector('.btn');
          //再给dom绑定事件
          btn.onclick=function(e) {
            console.log(e.target)
          }
          
          dom0移除： dom元素.onclick=null
          
          优点：兼容性好
          缺点：不支持同一事件的多次绑定，只支持事件冒泡
        
        3.dom2级绑定事件【主流绑定事件的方式，特别是适合原生移动端的JS】
        
        //先获取dom
         var btn=document.querySelector('.btn');
         //再给dom绑定dom2级事件
         //dom元素.addEventListener('事件名',事件监听函数,是否冒泡或捕获)
         btn.addEventListener('click',func,false)
     
         function func() {
             console.log(1111)
         }
         
          优点：支持同一事件的多次绑定,除了事件冒泡外，还支持事件捕获
          缺点：兼容性一般，不过在移动端无压力
          
          检测js,css兼容浏览器的网站：https://caniuse.com/
          
          移除事件： btn.removeEventListener('事件类型',要移除的事件名,false)
     
     
     dom操作方法：增，删，改，查
     
     
     ```

     

     -------

     ## 一、事件流

       ```
     事件流：事件触发的顺序
     事件流包括三个阶段：捕获阶段，目标阶段，冒泡阶段
     
     冒泡阶段：事件由最具体元素触发，向上传播的过程
     目标阶段：就是你最终触发的那个元素（即目标元素）
     捕获阶段：事件由不具体的元素向下查找，直到找到你触发的那个元素，与事件冒泡相反
     
     冒泡排序：是数组排序算法 注意和事件冒泡是不同
     
     阻止冒泡： e.stopPropagation();   //同时会阻止冒泡和捕获
     
     
     
     事件代理（事件委托）：实现原理就是事件冒泡
     
     问题：通过循环遍历，给每一个li都绑定事件，添加事件监听函数，性能有问题
     
     解决方案：通过事件代理的方式来解决
     
     通过事件对象来获取事件目标：e.target
     
     JS原生实现事件代理：在父级元素上绑定事件处理函数，通过e.target来获取触发的目标来做后续操作
     
     jQuery如何实现事件代理：
        //jQuery事件代理如何实现
            $('.list').on('click','li',function() {
                console.log($(this))
                $(this).addClass('bg')
            })
     
     
     jQuery搞明白：把在线的JS原生小案例，写在jQuery版本
     
     JS版本
     JQuery版本
     
     
     阻止默认行为: e.preventDefault();
        
        默认行为：元素本身带的一个特性 例如：超链接点击就会中转，form通过submit可提交，右键菜单
     
     
     
       ```

     

     ## 二、DOM常用操作方法

     > 节点类型: nodeType
     >
     > 1. ELEMENT===1:元素节点
     >
     > 2. attribute:属性节点
     > 3. text===3:文本节点
     > 4. comment:注释节点
     > 5. document:文档节点 代表整体页面
     > 6. .....
     >
     > 节点类型官方文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType

     

     > 通常面试官会这样问：给我说几个常用的dom操作方法？？？？

     1. 创建（增）

         ```
         1.createElement() 创建标签
         2.createTextNode() 创建文本
         3.createDocumentFragment() 创建文档碎片,所有的操作是在内存中进行的
          
           为了避免重绘和回流：咱们插入dom时可采用createDocumentFragment，最后一次性的再添加到页面的dom中
           
             //先创建li，然后插入到ul中
             var oul=document.querySelector('.list')
             //先创建一个文档碎片
             var fragment=document.createDocumentFragment();
            for(var i=0;i<100;i++) {
                 var newLi=document.createElement('li');
                 newLi.textContent=`项目${i+1}` 
                 fragment.appendChild(newLi)  //已经将100个li添加到fragment上了
         
            }
         
            oul.appendChild(fragment);
         
         
         4.cloneNode(true)  克隆  //添加true代表深度克隆，包括子节点的所有内容也可以克隆过来
         
           
         
         例如：
          //需求：创建一个div，并添加文字，追加到页面上
          var odiv=document.createElement('div');
          var otext=document.createTextNode('1906A')
         
         //将文本追加到div上  appendChild
         odiv.appendChild(otext);
         
         //再将div追加到body上
         document.body.appendChild(odiv)
         ```

     2. 修改:

         ```
         父节点.appendChild(子节点)  尾追加
         父节点.insertBefore(新节点,参考节点) 前追加
         父级节点.removeChild(要删除的子级节点) 移除节点
         replaceChild(新节点，旧节点)  替换节点
         ```

         

     3. 查询

         ```
         getElementById()  获取id ，如果页面上有多个相同id，只返回第一个
         getElementsByTagName() 获取标签名 返回是类数组
         getElementsByName()  获取表单中name名称  返回类数组
         getElementsByClassName  只能获取class名称  返回类数组
         querySelector  只获取匹配的第一个css选择器  //特别适合移动端
         querySelectorAll  获取匹配的css选择器类数组 //特别适合移动端
         
         //封装一个$
         function $(selector) {
             return typeof selector==='string' ? document.querySelector(selector) : selector
         }
         
         
         //难怪人有说有了querySelector，可以放弃jQuery了！！！！！！
         ```

     3. 节点关系

         ```
         parentNode:找父节点
         parentElement：找父元素
         
         previousSibling：找前一个兄弟节点
         previousElementSibling：找前一个兄弟元素
         nextSibling：找后一个兄弟节点
         nextElementSibling：找后一个元素节点
         
         childNodes:属性，即包括元素节点，也包括文本节点
         children:属性 只获取直接子级元素，不获取文本节点（元素类型===1）
         firstNode：找第一个节点
         lastNode：找最后一个节点
         hasChildNodes：用于判断是否有子元素
         ```

         5. 属性型

         ```
         setAttribute
         getAttribute
         
         例如：
         $('a').getAttribute('title')
         $('a').setAttribute('title','1906A')
         ```

         6. 样式型

             ```
             window.getComputedStyle：获取css样式
             getBoundingClientRect  获取dom的位置信息
             
             参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
             
             https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle
             ```
             
             

     ```
     参考链接：https://www.cnblogs.com/lrzw32/p/5008913.html
     ```

     

     ## 产品形态：

     ### 一、App：

     > anrdoid：java开发，ios：Object-c或swift,统称都叫Native开发

     ​    App开发：

     ​    优点：性能好

     ​    缺点：开发成本高（要招一个android工程师，ios工程师）

     ## 二、pc网站：

     1. C端：customer针对最终用户   例如：京东：https://www.jd.com/
     2. B端：例如：后台管理系统，主要用于集团或企业内部管理平台

     ```
     图表：echarts
     
      ui框架：Element ui  85%以上公司都用它来开发 后台管理系统
     
     vue-simplemde：编辑markdown
     
     富文本编辑与element ui集成
     
     头像上传
     
     导出excel
     
     导出压缩文件
     
     多语言支持（国际化）
     
     登录：
     
     表单编辑
     
     表格 分页
     ```

     

     

     > 后台管理github地址1(简单):https://github.com/bailicangdu/vue2-manage
     >
     > 后台管理github地址2（功能全面，复杂）：https://github.com/PanJiaChen/vue-element-admin/tree/i18n
     >
     > 后台管理文档：https://panjiachen.github.io/vue-element-admin-site/zh/

     ```
     git clone https://github.com/PanJiaChen/vue-element-admin/tree/i18n
     cd 进入克隆的目录
     npm install 安装包
     npm run dev
     ```

     ## 三、微信公众号（H5）：是基于微信的H5页面+微信内置的api

     ## 四、小程序:基于微信运行的应用

     ## 五、基于H5移动端网站（M站）

     https://m.jd.com/

     ## 六、flutter:可以做多端混合开发   google开发 的

      web开发：

      优点：跨平台（android,ios,windows....），开发成本低

      缺点：性能差一些

     

     ## 七、周末后台管理任务

     ```
     一、每个组要挑选后台管理的5个功能研究，尽量实现
     
     1.表格和分页（包括搜索，增删改查）
     2.图表
     3.富文本编辑器
     4.导出文件（excel,压缩文件）
     5.国际化（中，英文，。。。。）
     6.头像上传
     7.登录（包括权限验证）
     
     二、在日报中描述简历中的个人评价，技能列表
     ```

     

     ## 八 简历，项目

     > 一定要不浮躁！！！！！！！！！！

     

     简历内容：

     **一、个人信息：**

     ```
     姓名：xxx  手机号：如果面试北京的公司就用北京的手机号（和微信同步）  
     学历：本科（立即办下来）
     邮箱：xxxx@xx.com（主要用于发面试邀请或给你发offer用的） 
     工作经验：3年（工作经验<3年，面试量都很少）
     年龄：通常大学本科毕业23-24+3年工作经验，倒推一下下你的出生年龄
        你现在就要写一个你从出生到现在的时间表
        出生：xxx
        小学：xxx
        初中：xxx
        高中:xx
        大学：xxx
        第一家公司：xxx(时间)
        第二家公司：xxxx（时间）
     ```

     

     **二、求职意向：**

     前端开发工程师

     前端主管

     前端技术经理

     H5工程师

     - 薪资要求: **都写面议 ** 
     - 工作城市: 北京，浙江 杭州 ，江苏南京，广州，深圳，上海
     - 工作性质: 全职
     - 期望行业: 互联网

     1. **个人评价，技能列表**

           ```
           版本一、个人评价：out啦！！！
     
     ​       1.熟练使用xxxx,
     
     ​       2.了解.....
     
     ​       3.精通....【绝对不能出现精通字眼】
     
     ​       4.
     
     ​       5.....
     
     
     版本二、
     
     ​     写成一段段文字描述的形式
     
        本人有3年的前端工作经验，供职过2家公司，主导/参与过电商，旅游的，金融，医疗项目等，主要用的技术栈有vue,xxx.........,有良好的JS开发习惯，熟练掌握JS原生开发。。。。。
     
     ​     本人有良好的团队协作能力，抗压能力强，有较强解决问题的能力，在工作之余本人有写博客分享的习惯，分享项目中的遇到的坑和解决方案，平时喜欢爬山，唱歌，来缓解工作压力 
     
     
     
     ​  励志名言：你刚好需要，我刚好专业，仅次而已
     
     ​  我是码农界一股清流
     
     
        关键词要有力度！主导，负责，领导
     
     ​  参与，了解，
     
        本人所掌握技术栈：
     
     ​    1.vue
     
        2.React
     
       3.微信小程序
     
       4.git
     
      5........
     
     
           ```

     

        

     **三、工作经历** （要写的两家公司）

     

       ```
      公司选择：
     
     ​    地域： 老家的公司，二是北京的公司
     
     ​    公司性质：外包公司，二是做自有产品的公司（自营）
     
     ​    外包公司：承接其他公司的项目开发任务 例如：软通动力，文思海辉，瑞友，。。。。
     
       找公司：从熟人的了解，或者上招聘网站上去查
     
       我怎么知道是外包公司？IT服务商，服务众多企业，各个行业全覆盖
     
       学信网可查：
       ```

     

     

     

     **四、项目**：至少5个

     ```
     行业所属包括：电商，医疗，教育，旅游，金融。。。
     
     产品形态:移动端(m站)，pc
     
     不能全班用一个项目：例如天使童装（再找一个功能类似的并且能说明白电商小程序）
     
     简历最重点要的是差异化！
     
     pc至少一个项目，vue项目2个，小程序2个
     
     不用太操心项目上线时间，重点关注项目里的功能能否给面试官请清楚，难点，兼容，踩坑和如何解决
     
     项目简介：
     
     职责描述：
     ```

     

     

     **五、教育背景：**

     ```
     学历：本科，专业（计算机相关专业），毕业时间 :2014-2018 我大学还实习一年
     
     ​     还有的地方小学是5年制
     
     ​    我上面3个姐，2哥，计划生育，晚上了
     
     ​    为上当兵，户口上晚。。。
     
        或上说派出所上户口，那个警官写错了
     
     ​    如果人家在不信，你说我可以在老家给你开证明。。。。
     
     
        大学要了解的内容：大学所学课程：数据结构，操作系统，离散数学，汇编语言，c语言，微信原理，编译原理。。。。大学一年学费，大学校训，参加过什么社团，拿过奖学金，谈过恋爱吗，大学附近有没有特色美食，景点啊。。。。。你是哪个系  系>专业>课程
     ```

     

     

     **六、语言能力：**英语读写良好，听说一般

     ```
     简历写好只是第一步：A简历
     
     熟悉简历的各个细节:B简历
     
     B简历：对A简历的详解问答
     ```

     

     

     

     

     

     

     

     



   



 









