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

     

     

     

     

     



   



 









