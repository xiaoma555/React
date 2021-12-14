import One from './One'
// import '@babel/polyfill'     //新版本 无需配置    自己封装了很多函数来支持    会破坏作用域  用的少
const test=(num)=>{
    console.log("test函数 已转换为ES5 哈哈哈")
}
test(One.x);
///装饰器语法
//创建一个装饰器函数 不调用      --动态给类添加属性和方法
function testable(target){
    target.isTestable=true;
}
@testable   //调用装饰器函数
class MyTestableClass {}      // 把MyTestableClass当作参数床给装饰器函数  （MyTestableClass=target）
console.log("装饰器语法",MyTestableClass.isTestable)
const delay=new Promise(resolve=>console.log("new Promise()"));
function* helloWorldGenerator() {
    yield 'hello';
   yield 'world';
   return 'ending';
}
var hw = helloWorldGenerator();
