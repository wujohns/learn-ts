# 前端 ts 工程使用案例
这里采用的前端方案是 `ts + react + less` 的一套方案，构建工具使用的是基于 `webpack` 包装的 `webpack-2b`

## 为什么使用 typescript
ts 的主要优势：  
1. 完整的面向对象特性支持  
1. 类型检查以及interface的支持  

由于有这些支持使得在大型工程的开发中对开发过程管理更为方便明了

## 工程结构介绍
```
ts
+-dist  编译后文件所在目录
+-scripts
    +-package.json.js   依赖文件（执行后生成package.json）
    +-tsconfig.json.js  ts编译配置（执行后生成tsconfig.json）
+-src   源码所在目录
    +-antd.js     antd的自定义抽取
    +-index.less  测试页面依赖的样式文件
    +-index.less.d.ts  index.less所对应的类型定义文件（不用手写，由webpack编译自动生成）
    +-index.tsx   测试页面的逻辑部分
```

在该项目的根目录下：  
执行 `make init` 即可生成 `package.json` 与 `tsconfig.json` 文件  
执行 `make install` 即可完成依赖安装  
在依赖安装与 `tsconfig.json` 执行 `gulp dev` 即可进行编译，亦可 `gulp libs` 或 `gulp pages` 单独对 libs 与 pages 进行编译  
编译工作完成后打开 index.html 文件即可查看相应效果  

## ts 相关
### typescript 的安装
由于需要对 .ts 或 .tsx 文件进行编译，所以需要预先在全局安装 `typescript`，执行  
`npm install typescript -g`  
即可。

### typescript 编译配置
虽然在与 `webpack` 的配合中使用 `ts-loader`，但对 ts 的编译配置还是位于工程根目录的 `tsconfig.json` 文件，对于配合 `antd` 的前端工程来说，其配置如下：
```
{
  "compilerOptions": {
    "target": "es5",
    "outDir": "dist",
    "module": "commonjs",
    "jsx": "react",
    "allowSyntheticDefaultImports": true,
    "noImplicitAny": true,
    "sourceMap": true
  },
  "includes": [
    "src/*.ts"
  ]
}
```
其中 `compilerOptions` 为 ts 的编译配置，用到的属性作用如下：  
`target` - 编译后的语法标准  
`outDir` - 输出目录（配合webpack的ts-loader后这里并不生效）  
`module` - 模块的标准，这里使用 commonjs 规范  
`jsx` - 对 jsx 语法的支持  
`allowSyntheticDefaultImports` - 在引入第三方包时默认会从 @types 引入相应的声明文件，但部分第三方已经在工程中支持了 typescript 特性，将该参数置为 true 时则在 import 时，会依据包里相应文件所在目录的 .d.ts 作为类型声明文件（比如原生支持ts的antd）  
`noImplicitAny` - 默认为 false，置为 true 则会在编译时在没有规定类型的地方报warning  
`sourceMap` - 置为 true 后配合 webpack 中的 sourceMap 配置从而提供 sourceMap 特性支持

`includes` 则是需要编译的文件

### 第三方包引入问题
在 ts 前端工程中有时需要引入相应的 npm 包，但这些npm包中一般都只有js文件，为了提供类型支持，需要额外安装 @types 包，例如在前端使用 `lodash` 时，就需要额外安装 `@types/lodash`，不然在编译 `import` 了 `lodash` 的 ts 文件时编译时的类型检查会报错（对应的编辑器或ide也会有高亮提示）。

## webpack 相关
1. `webpack` 中使用 `ts-loader` 对 ts 的编译  
1. 在页面 ts 的编译中还使用了 `typings-for-css-modules-loader` 作为 `css-loader` 的替代，为没有类型声明的 less 文件自动生成 .d.ts 文件，从而支持在 ts 中 import 相应 less（css-module 特性支持）。  

## antd 相关 *
官方提供的方案依旧是和 `babel-import-plugin` 一样蛋疼的 `ts-import-plugin`，建议不要使用。

作为替代，这里使用 `webpack-2b` 的 `libsPack` 功能，将自己对 `antd` 的按需引入也 expose 为 `antd`，从而使得在具体页面的 ts 文件中引入 `antd` 时即只引入需要的部分，又利用 `antd` 本身的 ts 类型支持。

详细可以参考 `src/antd.js` 以及 `src/index.tsx` 中与 `antd` 相关的部分

## 遇到的奇葩问题
less 的 3.x 版本有较多 bug，建议使用 less@2.7.3  