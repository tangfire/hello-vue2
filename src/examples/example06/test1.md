# Global.js

```js
/*
 * @Description: 全局变量
 * @Author: hai-27
 * @Date: 2020-02-23 13:40:18
 * @LastEditors: hai-27
 * @LastEditTime: 2021-02-27 04:29:16
 */
exports.install = function (Vue) {
  Vue.prototype.$target = "http://8.141.3.248:3000/"; // 线上后端地址
  // Vue.prototype.$target = "http://localhost:3000/"; // 本地后端地址
  // 封装提示成功的弹出框
  Vue.prototype.notifySucceed = function (msg) {
    this.$notify({
      title: "成功",
      message: msg,
      type: "success",
      offset: 100
    });
  };
  // 封装提示失败的弹出框
  Vue.prototype.notifyError = function (msg) {
    this.$notify.error({
      title: "错误",
      message: msg,
      offset: 100
    });
  };
}
```

这段代码是一个 Vue 插件的安装代码，主要定义了一些全局的变量和方法，供整个 Vue 应用使用。具体分析如下：

### 1. 插件的导出部分
```javascript
exports.install = function (Vue) {
  // ...
}
```
这部分代码定义了一个 `install` 方法，这也是 Vue 插件的标准接口。当你使用 `Vue.use(插件)` 注册插件时，Vue 会自动调用插件的 `install` 方法，将 `Vue` 实例作为参数传入，允许插件扩展 Vue 的功能。

### 2. 配置全局变量 `$target`
```javascript
Vue.prototype.$target = "http://8.141.3.248:3000/"; // 线上后端地址
// Vue.prototype.$target = "http://localhost:3000/"; // 本地后端地址
```
- `Vue.prototype` 允许我们为所有的 Vue 实例添加自定义的属性或方法，这样每个 Vue 组件都可以通过 `this.$target` 访问该属性。
- 这段代码定义了一个 `$target` 变量，并给它赋值为后端服务器的地址。注释中的两行代码表示，可以切换使用线上地址或本地地址。

  - 线上地址：`http://8.141.3.248:3000/`
  - 本地地址：`http://localhost:3000/`（这行被注释掉了）

这个 `$target` 属性可以在项目中的任何 Vue 组件中通过 `this.$target` 来访问，通常用来存储后端的 API 地址。

### 3. 定义全局方法 `notifySucceed` 和 `notifyError`
这部分代码封装了两个方法，分别用于显示成功和错误的提示消息。

#### `notifySucceed`：封装成功提示框
```javascript
Vue.prototype.notifySucceed = function (msg) {
  this.$notify({
    title: "成功",
    message: msg,
    type: "success",
    offset: 100
  });
};
```
- `this.$notify` 是 Vue 通知插件的一部分，用来显示通知消息。
- `title` 设置通知的标题为 `"成功"`。
- `message` 设置通知的内容为传入的 `msg` 参数。
- `type` 设置通知类型为 `"success"`，这表示该通知为成功类型，通常表现为绿色。
- `offset` 设置通知的偏移量，使得通知弹出的位置有所偏移。

#### `notifyError`：封装错误提示框
```javascript
Vue.prototype.notifyError = function (msg) {
  this.$notify.error({
    title: "错误",
    message: msg,
    offset: 100
  });
};
```
- `this.$notify.error` 是另一个通知类型，它用于显示错误类型的通知。
- `title` 设置通知的标题为 `"错误"`。
- `message` 设置通知的内容为传入的 `msg` 参数。
- `offset` 设置通知的偏移量。

这两个方法封装了通知的弹出逻辑，可以在 Vue 组件中方便地调用，例如：
```javascript
this.notifySucceed("操作成功！");
this.notifyError("操作失败！");
```
这些方法会显示不同类型的弹出通知，帮助用户了解操作结果。

### 总结
这段代码的作用是：
- **定义全局变量**：通过 `Vue.prototype.$target` 全局配置后端 API 地址，可以在整个应用中使用。
- **封装通知方法**：通过 `Vue.prototype.notifySucceed` 和 `Vue.prototype.notifyError` 定义了简洁的成功和错误提示弹窗，方便在各个组件中复用。

这样做的好处是能提高代码复用性，减少重复代码，并且增强用户体验。

## 可以在main.js中写:

```js
// 全局函数及变量
import Global from './Global';
Vue.use(Global);
```

这段代码展示了如何在 Vue 项目中使用插件的基本方式。具体步骤和解释如下：

### 1. `import Global from './Global';`

这一行代码通过 `import` 语法导入了一个名为 `Global` 的模块或文件，假设 `Global` 是一个文件路径为 `./Global` 的模块。

- **`./Global`**：这个路径表示当前文件目录下的 `Global.js`（或类似文件，如 `Global/index.js`，取决于文件的结构）。这意味着 `Global` 可能是一个包含插件定义或其他功能的文件。
- **`Global`**：导入的模块对象或类，通常是一个插件或包含功能的对象。它通常会包含一个 `install` 方法，这个方法用于在 Vue 中注册插件。

### 2. `Vue.use(Global);`

- **`Vue.use()`**：这是 Vue.js 插件机制中的一个方法，用于安装插件。任何符合 Vue 插件规范的对象都可以通过 `Vue.use()` 被安装到 Vue 应用中。
  
  - 当你使用 `Vue.use(plugin)` 时，Vue 会调用插件对象的 `install` 方法（如果插件对象定义了该方法）。`install` 方法接收 Vue 构造函数作为参数，在其中你可以做一些 Vue 的全局注册，如添加全局组件、指令、过滤器、挂载原型方法等。
  - `install` 方法只会被调用一次，因此你可以在插件中进行一些全局的配置或初始化操作。

- **`Global`**：这里是你导入的插件或模块。通过 `Vue.use(Global)`，Vue 会自动调用 `Global` 插件中的 `install` 方法，并把 Vue 构造函数作为参数传入。通过 `install` 方法，你可以将插件提供的功能注册到 Vue 实例中。




