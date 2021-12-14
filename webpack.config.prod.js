const base=require('./webpack.config.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {merge} =require('webpack-merge');
const TerserPlugin=require('terser-webpack-plugin');  //性能优化 --js压缩
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");  //css 压缩
//判断是否不是生产模式---判断是否是开发模式 
const devMode=process.env.NODE_ENV!=='production'
module.exports=merge(base,{
   
    plugins:[
          new MiniCssExtractPlugin({
              filename:devMode?'css/[name].css':'css/[name]-[hash].css',  //项目上线  带hash   生产模式 -production
              chunkFilename:devMode?'css/[id].css':'css/[id]-[hash].css'  //项目不上线  不带hash    开发模式
          }),
    ],
     module:{
         rules:[
             {
                 test:/\.(js|jsx)$/, //正则匹配扩展名 test()
                 exclude:/(node_modules|bower_components)/,   //忽略目录
                 use:{
                     loader:'babel-loader',  //loader名称
                     options:{
                        //  presets:[
                        //      '@babel/preset-env',  //ES6语法库
                        //      '@babel/preset-react' //react语法库
                        //  ]
                     }
                 }
             }
             ,
             {
                 test :/\.css$/,
                 //数组形式   总右到左
                 use:
                     [
                        //  "style-loader",  //将打包后的css文件  以style 的形式自动引入到head中
                       {
                           loader:devMode?'style-loader':MiniCssExtractPlugin.loader,
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
                        loader:devMode?'style-loader':MiniCssExtractPlugin.loader,
                     },
                     {
                         loader:'css-loader',   //将css 打包成独立的css文件
                         options:{
                             modules:true    //开启less模块化开发
                         }
                     },
                     {
                         loader:'less-loader'     //将less 转换成css
                     }
                 ]
             }, 
         ]
     },
    mode:"production",
    //devtool   打包映射文件map  体积过大    用于报错调试
    // devtool:"source-map",
    optimization: {
        minimize: true, //使用 TerserPlugin 压缩js,默认true
        minimizer: [   //自定义 TerserPlugin压缩
        new TerserPlugin({
        cache: true, //缓存 优化速度
        parallel: true
        }),
        new OptimizeCSSAssetsPlugin({})  //css压缩
        ]
        },
        

})
