const path =require("path");
//引入html-webpack-plugin插件   --把public中的模板拷贝到发布目录dist下，
                                //将生成的打包文件 自动引入到模板文件中
const HtmlWebpackPlugin=require("html-webpack-plugin");
//引入clean -webpack-plugin 插件 每次打包自动删除dist
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const webpackBar =require('webpackbar');

module.exports={
    //入口文件
    entry:{
        index:"./src/index.js",
        //  two:"./src/two.js"
    },
    //出口文件
    output:{
        //__dirname  --项目根目录
        path:path.resolve(__dirname,"dist"),
        //打包文件名
        //1. hash  --项目文件有修改 hash就变
        //2.chunkhash  --不同的入口entry 会生成不同的chunkhash值
        //3.contenthash  --文件内容不变 contenthash就不变
        filename:"js/[name].[chunkhash].main.js"
    },
    plugins:[
          //配置多个应用
          new webpackBar(),
          new CleanWebpackPlugin(),
          new HtmlWebpackPlugin({//假设是前台应用入口
              title:'首页',
              filename:'index.html',
              template:'./public/index.html',
              chunks:["index"]    //chunks  指定需要引入的入口模块的链名 index:"./src/index.js"
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
                test:/\.(png|jpe?g|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{ //选项
                            limit:99999,  //指定多少字节B的图片 自动转码成base64
                            publicPath:'./../img',
                            output:'img/'
                        }
                    }
                ]
            },
            {
                test:/\.(ttf|eot|woff|woff2)$/,
                loader:'file-loader',
                options:{
                    name:'[name].[ext]',
                    publicPath:'./../fonts',
                    outputPath:'fonts/'
                }
            }
         ]
     },  
    resolve:{
        //扩展名，  可以省略的扩展名
        extensions:['.jsx','.less','.js','.css']
    }

}
