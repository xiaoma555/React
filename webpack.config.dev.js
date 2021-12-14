const path =require("path");
const devMode=process.env.NODE_ENV!=='production'
const base=require("./webpack.config.base");
const {merge} =require('webpack-merge');  
module.exports=merge(base,{
     module:{
         rules:[
             {
                 test :/\.css$/,
                 //数组形式   总右到左
                 use:
                     [
                        //  "style-loader",  //将打包后的css文件  以style 的形式自动引入到head中
                       {
                           loader:'style-loader',
                        } ,  //不把css打包到js中  通过link引入到模板中
                        {
                            loader:"css-loader",//将css文件打包成一个独立文件
                            options:{
                                modules:false
                            }
                        }     
                     ], 
                 
             },
             {
                 test:/\.less$/,
                 //对象形式     从下到上
                 use:[
                     {
                        //  loader:'style-loader'  //将打包后的css文件以style 的形式 自动添加到head中
                        loader:'style-loader',
                     },
                     {
                         loader:'css-loader',   //将css 打包成独立的css文件
                         options:{
                             modules:false    //开启less模块化开发
                         }
                     },
                     {
                         loader:'less-loader'     //将less 转换成css
                     }
                 ]
             },
         ]
     },
    mode:"development",
    //devtool   打包映射文件map  体积过大    用于报错调试
    devtool:"source-map",
    devServer:{    //webpack-devserver  配置项
        contentBase: path.join(__dirname,'dist'),  //指定webpack-dev-server  网站根目录
        compress:true,    //会压缩和服务 所有来自项目根路径下/dist目录的文件
        port:9000,
        proxy:{
            "/data":{  //  接口文档上 ，真实接口地址
                "target":"http://www.bjlink32.com/data.php", //接口地址  跨域访问   --开发测试服务器接口地址
                //secure：false     //如果是https接口 需要配置该参数
                "changeOrigin":true,  //开启跨域
                "pathRewrite":{
                    "^/data":""
                }
            }
        },
        //报错 显示遮罩层   方便开发和维护 --derServer配置项
        overlay:{
            warnings:true,
            errors:true
        }
    }, 

}) 
