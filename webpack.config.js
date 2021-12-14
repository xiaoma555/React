//记载DEV配置 =dev专有配置+base公共配置
const dev=require('./webpack.config.dev.js');
//记载Prod配置 =prod专有配置+base公共配置
const prod=require('./webpack.config.prod.js');
 //process  nodejs内置对象   ---进程对象
//   const Target=process.env.npm_lifecycle_event;
const Target=process.env.NODE_ENV;
  //运行npm run dev  Target 值就是"dev"
  //运行npm run build  Tarfet 值 就是"build"
  console.log(Target);
  if(Target==="dev"){
      //导出dev配置s
      module.exports=dev;
  }
  if(Target==="build"){
      //导出build配置
      module.exports=prod;
  }