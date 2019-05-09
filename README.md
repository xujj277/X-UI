# XUI  --- 一个 VUE UI 组件库

[![Build Status](https://travis-ci.org/xujj277/X-UI.svg?branch=master)](https://travis-ci.org/xujj277/X-UI)

## 介绍

这是我在学习 Vue 过程中做的一个 UI 框架，希望对你有用。

## 开始使用

1. 添加 CSS 样式

    使用本框架前，请在 CSS 中开启 border-box
    ```css
    *，*::before, *::after{box-sizing: border-box;}
    ``` 
    IE 8 及以上浏览器都支持此样式。
    
    你还需要设置默认颜色等变量（后续会改成 SCSS 变量）
    
    ```css
    html {
      --button-height: 32px;
      --font-size: 14px;
      --button-bg: #fff;
      --button-active-bg: #eee;
      --border-radius: 4px;
      --color: #999;
      --border-color: #999;
      --border-color-hover: #666;
    }
    ```
    IE 15 及以上浏览器都支持此样式。
    
2. 安装 XUI
    ```
    npm i --save xujinjun-test-1
    ```
3. 引入 gulu

    ```javascript
    import {Button, ButtonGroup, Icon} from 'xujinjun-test-1'
    import 'xujinjun-test-1/dist/index.css'
    
    export default {
      name: 'app',
      components: {
        'x-button': Button,
        'x-icon': Icon
      }
    }
    ```
    
4. 引入 svg symbols

    ```javascript
      <script src="//at.alicdn.com/t/font_1152690_8ialcfnb8r.js"></script>
    ```
   

## 文档

## 变更记录

## 联系方式

## 贡献代码


作者： 徐金俊

