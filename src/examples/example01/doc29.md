
```js
// 全局请求拦截器
Axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 跳转error页面
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);
// 全局响应拦截器
Axios.interceptors.response.use(
  res => {
    if (res.data.code === "401") {
      // 401表示没有登录
      // 提示没有登录
      Vue.prototype.notifyError(res.data.msg);
      // 修改vuex的showLogin状态,显示登录组件
      store.dispatch("setShowLogin", true);
    }
    if (res.data.code === "500") {
      // 500表示服务器异常
      // 跳转error页面
      router.push({ path: "/error" });
    }
    return res;
  },
  error => {
    // 跳转error页面
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);

// 全局拦截器,在进入需要用户权限的页面前校验是否已经登录
router.beforeResolve((to, from, next) => {
  const loginUser = store.state.user.user;
  // 判断路由是否设置相应校验用户权限
  if (to.meta.requireAuth) {
    if (!loginUser) {
      // 没有登录，显示登录组件
      store.dispatch("setShowLogin", true);
      if (from.name == null) {
        //此时，是在页面没有加载，直接在地址栏输入链接，进入需要登录验证的页面
        next("/");
        return;
      }
      // 终止导航
      next(false);
      return;
    }
  }
  next();
});

// 相对时间过滤器,把时间戳转换成时间
// 格式: 2020-02-25 21:43:23
Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);
  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str;
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});

```



这段代码主要涉及三个方面：Axios的请求和响应拦截器、Vue Router的导航守卫、以及Vue的过滤器。下面我将逐部分解释：

### 1. **Axios 请求和响应拦截器**

#### 请求拦截器
```js
Axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 跳转error页面
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);
```
- **请求拦截器**：拦截所有发出的请求，在请求被发送之前执行。`config`是请求的配置对象，拦截器可以修改这个对象（如添加请求头等）。
- 如果拦截器没有问题，直接返回`config`，即继续发出请求。
- 如果请求中出现错误（例如网络问题），则进入`error`部分，会跳转到错误页面（`/error`），然后返回拒绝的`Promise`，避免后续的处理。

#### 响应拦截器
```js
Axios.interceptors.response.use(
  res => {
    if (res.data.code === "401") {
      // 401表示没有登录
      Vue.prototype.notifyError(res.data.msg);
      store.dispatch("setShowLogin", true);  // 显示登录框
    }
    if (res.data.code === "500") {
      // 500表示服务器异常
      router.push({ path: "/error" });
    }
    return res;
  },
  error => {
    // 跳转error页面
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);
```
- **响应拦截器**：当服务器响应数据后，会先经过响应拦截器。
  - **成功的响应**：如果响应的数据（`res.data`）包含 `code` 为`401`，说明用户未登录，应该提示用户登录。这里通过`Vue.prototype.notifyError`弹出错误信息，并通过`store.dispatch`显示登录组件（`setShowLogin`是Vuex的一个action）。
  - 如果`code`为`500`，表示服务器错误，跳转到错误页面（`/error`）。
  - 最后，正常返回响应对象`res`。
  
- **失败的响应**：如果响应出现异常（比如网络问题或其他错误），则会跳转到错误页面并返回`Promise.reject`，使得错误得到进一步处理。

### 2. **路由导航守卫**

```js
router.beforeResolve((to, from, next) => {
  const loginUser = store.state.user.user;
  if (to.meta.requireAuth) {
    if (!loginUser) {
      store.dispatch("setShowLogin", true); // 显示登录组件
      if (from.name == null) {
        next("/");  // 如果是直接输入的链接，跳回首页
        return;
      }
      next(false); // 终止导航
      return;
    }
  }
  next(); // 允许路由继续执行
});
```
- **`beforeResolve`** 是Vue Router中的导航守卫，它会在路由解析完成后，视图渲染之前执行。
- 这段代码的功能是：检查目标路由（`to`）是否需要进行用户认证。通过 `to.meta.requireAuth` 判断是否需要权限验证。
  - 如果需要权限验证且用户未登录（`loginUser`为空），则：
    - 显示登录框（通过`store.dispatch("setShowLogin", true)`）。
    - 如果是从首页或没有历史记录的页面直接跳转到需要登录的页面，则跳转回首页。
    - 如果是正常导航，终止当前路由导航（`next(false)`），阻止进入目标页面。
  - 如果已登录，或者目标路由不需要权限验证，允许继续导航。

### 3. **Vue 过滤器 - 时间格式化**

```js
Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);
  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str;
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});
```
- **自定义过滤器**：这个过滤器用于将一个时间戳（或时间字符串）格式化为 `YYYY-MM-DD HH:MM:SS` 格式的时间字符串。
- 首先，将输入的`dataStr`转为`Date`对象。
- 然后定义了一个辅助函数`timeAdd0`，如果时间小于10，前面会加上0（例如：1变成01）。
- 最后，提取年月日时分秒并拼接成标准的时间格式返回。

### 总结

- **请求和响应拦截器**：用于全局处理请求前后的行为，如错误处理、用户未登录提示等。
- **路由守卫**：在访问需要权限的页面时，检查用户是否已登录，如果没有登录，则显示登录框并阻止进入该页面。
- **自定义过滤器**：格式化时间戳为可读的时间字符串。

这段代码在实际项目中有助于提升用户体验和代码结构的清晰度，尤其是在处理请求、路由保护和时间显示方面。


----------------------


```js
// 全局拦截器,在进入需要用户权限的页面前校验是否已经登录
router.beforeResolve((to, from, next) => {
  const loginUser = store.state.user.user;
  // 判断路由是否设置相应校验用户权限
  if (to.meta.requireAuth) {
    if (!loginUser) {
      // 没有登录，显示登录组件
      store.dispatch("setShowLogin", true);
      if (from.name == null) {
        //此时，是在页面没有加载，直接在地址栏输入链接，进入需要登录验证的页面
        next("/");
        return;
      }
      // 终止导航
      next(false);
      return;
    }
  }
  next();
});
```



这段代码是用于 Vue.js 路由守卫中的 `beforeResolve` 钩子，主要功能是在用户尝试访问需要授权的页面时，进行用户登录状态的校验。具体解释如下：

### 背景
- **`router.beforeResolve`**：Vue Router 提供的钩子之一，在路由解析时触发，`beforeResolve` 会在所有异步路由组件被解析完之前执行，这个钩子可以用来做一些路由跳转的前置校验或数据预加载操作。
  
- **`store`**：通常是 Vuex 的实例，用于存储全局状态。在这个场景中，`store.state.user.user` 存储了当前登录用户的信息。

- **`to`、`from`、`next`**：这是 `beforeResolve` 钩子的三个参数，分别代表：
  - `to`: 目标路由对象，包含即将进入的路由信息。
  - `from`: 当前导航的来源路由对象。
  - `next`: 一个函数，调用 `next()` 后路由才会继续执行。可以传递不同的参数来控制路由的跳转。

### 代码解释

```javascript
router.beforeResolve((to, from, next) => {
  // 获取当前用户信息
  const loginUser = store.state.user.user;
  
  // 判断目标路由是否需要用户权限验证
  if (to.meta.requireAuth) {
    // 如果需要权限验证，并且当前没有登录
    if (!loginUser) {
      // 显示登录弹框或登录页
      store.dispatch("setShowLogin", true);
      
      // 如果是从一个没有页面状态的地方进入（比如直接输入地址），则跳转到首页
      if (from.name == null) {
        next("/");  // 重定向到首页
        return;
      }
      
      // 如果是通过其他页面导航而来，终止当前导航
      next(false);  // 终止导航
      return;
    }
  }
  
  // 如果不需要权限或已登录，正常执行路由跳转
  next();
});
```

### 详细解析

1. **`const loginUser = store.state.user.user;`**  
   这行代码从 Vuex 的状态管理中获取当前登录的用户信息。如果 `loginUser` 是 `null` 或 `undefined`，意味着用户没有登录。

2. **`if (to.meta.requireAuth)`**  
   这行代码检查目标路由（`to`）是否设置了 `meta.requireAuth`，这个属性通常用来标识需要权限验证的页面。比如，在定义路由时，开发者可能会这样设置：
   ```javascript
   {
     path: '/profile',
     meta: { requireAuth: true },
     component: Profile
   }
   ```
   如果 `requireAuth` 是 `true`，就需要进行用户权限校验。

3. **`if (!loginUser)`**  
   如果当前用户没有登录（`loginUser` 为假值），就会执行以下操作：

   - **`store.dispatch("setShowLogin", true);`**  
     调用 Vuex 的 `dispatch` 方法，触发一个 action，通常是用来控制登录组件的显示，`setShowLogin` 可能是一个用于显示登录框的 action。

   - **`if (from.name == null)`**  
     这段代码检查是否是从一个没有任何历史记录的页面进入（例如用户直接在浏览器地址栏中输入了需要授权的页面链接）。如果 `from.name` 为 `null`，表示这次路由跳转是从浏览器地址栏直接访问的。

     - 如果是这种情况，`next("/")` 会将用户重定向到首页（`/`）。

   - **`next(false);`**  
     如果用户没有登录且访问的是需要权限的页面，且不是直接输入 URL 的情况（即用户是通过其他页面跳转到这个页面），则调用 `next(false)` 来终止路由跳转，阻止访问目标页面。

4. **`next();`**  
   如果上述条件都不满足，表示要么用户已经登录，或者目标路由不需要权限验证。调用 `next()` 允许路由继续跳转到目标页面。

### 总结
这段代码实现了以下功能：
- 在路由进入之前，判断目标页面是否需要登录权限。
- 如果需要登录且用户没有登录，显示登录框。
- 如果是直接通过地址栏访问需要登录的页面，重定向到首页。
- 如果是通过其他页面跳转到需要登录的页面，阻止跳转，并提示用户登录。
- 如果条件允许，正常执行路由跳转。




---------------------------

```js
// 全局请求拦截器
Axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 跳转error页面
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);
```



这段代码是使用 Axios 进行 **全局请求拦截器** 的配置。Axios 是一个基于 Promise 的 HTTP 客户端，用于浏览器和 Node.js 中发送 HTTP 请求。请求拦截器的作用是，在请求发送之前对请求做一些处理，或者对错误进行统一处理。

具体来说，代码的工作原理如下：

### 代码解析：

```javascript
// 全局请求拦截器
Axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 跳转error页面
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);
```

1. **`Axios.interceptors.request.use()`**  
   这是 Axios 提供的请求拦截器方法，它接受两个参数：
   - **第一个参数**（`config => { return config; }`）：是请求成功时的回调函数。在请求发起之前，这个函数会对请求的配置对象（`config`）进行操作和修改，返回的 `config` 会继续传递给请求。这里的 `config` 是 Axios 的配置对象，包含了 URL、请求头、请求参数等信息。在这段代码中，拦截器没有对 `config` 做任何修改，直接返回了它。
   - **第二个参数**（`error => { ... }`）：是请求失败（即请求出错时）的回调函数。如果在请求发送过程中发生了错误（如网络错误等），这个函数会被调用。函数内的代码处理错误时会执行，比如你可以进行错误记录或界面跳转等。

2. **`config => { return config; }`**  
   这个部分表示请求被发送之前不会进行任何处理，直接返回请求的配置对象。通常你可以在这个地方对请求进行修改，比如添加认证 token 或设置请求头等。如果没有特殊需要，这里就只是简单地返回原始的请求配置。

3. **`error => { ... }`**  
   如果请求发生错误（比如网络问题或其他错误），该函数会被触发。在这个错误回调函数中，代码做了以下两件事：
   - **`router.push({ path: "/error" })`**：当请求失败时，使用 Vue Router 的 `push` 方法跳转到一个 `/error` 页面，这通常是一个全局的错误提示页面，用于展示请求失败的信息。
   - **`return Promise.reject(error);`**：在拦截器内部返回 `Promise.reject(error)`，表示请求出错并将错误对象传递出去，便于后续的错误处理机制（如在 `.catch()` 中捕获和处理错误）。

### 总结：
- 这段代码定义了一个 **全局请求拦截器**，它会在每个请求发起之前检查请求的配置（虽然在这里没有做修改），如果请求发生错误，它会跳转到 `/error` 页面。
- 拦截器的作用是帮助你集中处理请求前后的逻辑，比如错误处理、认证 token 自动添加、请求头的配置等。

### 使用场景：
- **错误处理**：请求失败时，可以统一跳转到一个错误页面。
- **请求配置修改**：在发起请求之前，可以根据需要动态修改请求的配置，例如添加认证信息或处理请求的头部信息。


---------------------

```js

// 全局响应拦截器
Axios.interceptors.response.use(
  res => {
    if (res.data.code === "401") {
      // 401表示没有登录
      // 提示没有登录
      Vue.prototype.notifyError(res.data.msg);
      // 修改vuex的showLogin状态,显示登录组件
      store.dispatch("setShowLogin", true);
    }
    if (res.data.code === "500") {
      // 500表示服务器异常
      // 跳转error页面
      router.push({ path: "/error" });
    }
    return res;
  },
  error => {
    // 跳转error页面
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);

```



这段代码是设置 **Axios 的响应拦截器**，用于全局处理 HTTP 响应结果。响应拦截器允许你在收到服务器响应后，对响应进行处理或统一错误处理。具体来说，这段代码做了以下几件事：

### 代码解析：

```javascript
// 全局响应拦截器
Axios.interceptors.response.use(
  res => {
    if (res.data.code === "401") {
      // 401表示没有登录
      // 提示没有登录
      Vue.prototype.notifyError(res.data.msg);
      // 修改vuex的showLogin状态,显示登录组件
      store.dispatch("setShowLogin", true);
    }
    if (res.data.code === "500") {
      // 500表示服务器异常
      // 跳转error页面
      router.push({ path: "/error" });
    }
    return res;
  },
  error => {
    // 跳转error页面
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);
```

### 1. **`Axios.interceptors.response.use()`**

这是 Axios 提供的响应拦截器方法，它接受两个回调函数作为参数：
- **第一个回调函数**：在响应成功时被调用，接收服务器返回的响应（`res`），你可以对返回的数据进行处理，或者直接返回数据。
- **第二个回调函数**：在响应失败时被调用，接收错误对象（`error`），你可以在这里处理请求失败的情况。

### 2. **成功响应的处理**

```javascript
res => {
  if (res.data.code === "401") {
    // 401表示没有登录
    // 提示没有登录
    Vue.prototype.notifyError(res.data.msg);
    // 修改vuex的showLogin状态,显示登录组件
    store.dispatch("setShowLogin", true);
  }
  if (res.data.code === "500") {
    // 500表示服务器异常
    // 跳转error页面
    router.push({ path: "/error" });
  }
  return res;
}
```

- **`res.data.code === "401"`**：  
  这一行判断返回的响应数据中的 `code` 是否为 `401`。通常，`401` 状态码表示 **未授权**，即用户未登录或登录信息过期。此时：
  - **`Vue.prototype.notifyError(res.data.msg)`**：调用 Vue 实例上的 `notifyError` 方法，向用户显示错误消息，提示他们未登录（`res.data.msg` 是服务器返回的错误消息）。
  - **`store.dispatch("setShowLogin", true)`**：调用 Vuex 的 `dispatch` 方法，触发 `setShowLogin` 这个 action，将 `showLogin` 状态设为 `true`，用于控制显示登录组件，提示用户登录。

- **`res.data.code === "500"`**：  
  判断响应数据中的 `code` 是否为 `500`，表示 **服务器错误**。如果是服务器异常（如服务端崩溃或数据库错误），则：
  - **`router.push({ path: "/error" })`**：使用 Vue Router 跳转到 `/error` 页面，通常这个页面用于显示通用的错误信息，告诉用户出现了问题。

- **`return res;`**：  
  最后，返回响应数据 `res`，让请求继续执行。由于拦截器只是在响应数据到达前进行处理，返回 `res` 使得请求链条中的 `.then()` 方法可以继续接收到响应数据。

### 3. **失败响应的处理**

```javascript
error => {
  // 跳转error页面
  router.push({ path: "/error" });
  return Promise.reject(error);
}
```

- 如果响应发生了错误（例如网络问题、服务器未响应等），则会进入这个 `error` 回调。通常情况下，这里会跳转到一个错误页面。
  - **`router.push({ path: "/error" })`**：跳转到 `/error` 页面，这个页面通常会显示一个通用的错误提示。
  - **`return Promise.reject(error)`**：返回一个拒绝的 Promise，将错误对象传递出去，通常用来在 `.catch()` 中处理错误。

### 总结：

1. **成功响应的处理**：
   - 如果响应的 `code` 是 `401`，表示用户没有登录，则会提示用户未登录，并显示登录组件。
   - 如果响应的 `code` 是 `500`，表示服务器出现异常，跳转到错误页面。

2. **失败响应的处理**：
   - 如果请求失败（例如网络错误或服务器没有响应），则跳转到错误页面，并将错误传递给后续处理。

### 使用场景：
- **全局错误处理**：统一处理 HTTP 请求中的认证错误（如 401）和服务器错误（如 500）。
- **用户体验**：根据不同的错误码给出适当的提示或引导，例如未登录时弹出登录框，服务器异常时引导用户到错误页面。
- **集中管理**：通过拦截器实现统一的错误页面跳转和状态管理，避免在每个请求中都重复写错误处理代码。

### 补充说明：
- **`Vue.prototype.notifyError`**：假设 `notifyError` 是 Vue 原型链上的一个方法，通常它是一个全局的方法，用于显示错误提示。可以通过第三方库（如 `Vue-notification` 或自定义的消息组件）来实现。
- **`store.dispatch("setShowLogin", true)`**：这行代码依赖于 Vuex，用于触发一个 action 来改变应用的登录状态，通常是控制一个 `showLogin` 的状态，控制登录组件的显示与隐藏。


------------------------

```js
// 相对时间过滤器,把时间戳转换成时间
// 格式: 2020-02-25 21:43:23
Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);
  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str;
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});

```

这段代码定义了一个 **Vue.js 的全局过滤器**，用于将一个 **时间戳** 或 **日期字符串** 转换为 **标准日期时间格式**，具体格式为：`YYYY-MM-DD HH:MM:SS`。这个过滤器的名称为 `dateFormat`，并且可以在 Vue 模板中用于格式化时间。

### 代码解析：

```javascript
// 相对时间过滤器,把时间戳转换成时间
// 格式: 2020-02-25 21:43:23
Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);  // 将输入的时间字符串或时间戳转换为 Date 对象

  function timeAdd0 (str) {
    // 这个函数用于将小于 10 的数字前面加上 '0'，使其符合两位数格式
    if (str < 10) {
      str = '0' + str;  // 小于 10 时，前面加 '0'
    }
    return str;
  }

  // 获取年份、月份、日期、小时、分钟、秒数
  var y = time.getFullYear();   // 获取完整的年份（四位数）
  var m = time.getMonth() + 1;  // 获取月份，注意：JavaScript 中的月份是从 0 开始的，所以需要加 1
  var d = time.getDate();       // 获取日（1~31）
  var h = time.getHours();      // 获取小时（0~23）
  var mm = time.getMinutes();   // 获取分钟（0~59）
  var s = time.getSeconds();    // 获取秒数（0~59）

  // 返回格式化后的日期字符串：YYYY-MM-DD HH:MM:SS
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});
```

### 详细解释：

1. **`Vue.filter('dateFormat', ...)`**：
   - `Vue.filter()` 用于在 Vue 中注册全局过滤器。此过滤器可以在模板中直接使用。过滤器的名称为 `'dateFormat'`，在 Vue 模板中你可以通过 `{{ timestamp | dateFormat }}` 这样的方式使用它。
   - 过滤器的作用是将 `dataStr`（一个时间戳或日期字符串）格式化为 `YYYY-MM-DD HH:MM:SS` 的形式。

2. **`new Date(dataStr)`**：
   - `new Date(dataStr)` 将传入的 `dataStr`（可以是时间戳、ISO 格式的日期字符串，或者其他可以被 JavaScript 解析的日期格式）转化为 `Date` 对象。`Date` 对象可以让我们方便地提取具体的时间信息，如年份、月份、日期等。

3. **`timeAdd0(str)`**：
   - 这是一个辅助函数，用来确保数字（如月份、日期、小时等）在小于 10 时，自动在其前面加上 `'0'`，使它们符合两位数格式。例如，`9` 会被转换为 `'09'`。
   - **用途**：在时间格式化时，确保输出的每部分（如 `m`, `d`, `h` 等）始终为两位数，这样格式更规范（比如 `01` 而不是 `1`）。

4. **提取时间信息**：
   - `time.getFullYear()`：返回 `Date` 对象中的完整年份（四位数）。
   - `time.getMonth() + 1`：返回 `Date` 对象中的月份，`getMonth()` 返回的是 0 到 11 的整数（即 0 代表 1 月，1 代表 2 月，依此类推），因此需要加 1 以得到实际的月份。
   - `time.getDate()`：返回 `Date` 对象中的日期，范围是 1 到 31。
   - `time.getHours()`：返回 `Date` 对象中的小时数，范围是 0 到 23。
   - `time.getMinutes()`：返回 `Date` 对象中的分钟数，范围是 0 到 59。
   - `time.getSeconds()`：返回 `Date` 对象中的秒数，范围是 0 到 59。

5. **返回格式化日期字符串**：
   - 最终，函数将返回一个格式化后的日期字符串，格式为：`YYYY-MM-DD HH:MM:SS`。
   - 通过字符串拼接，将年、月、日、小时、分钟、秒拼接在一起，并通过 `timeAdd0` 确保每一部分都为两位数。

### 例子：

假设 `dataStr` 为 `'2020-02-25T21:43:23.000Z'`（这是一个 ISO 格式的时间字符串），经过这个过滤器处理后，返回的结果会是：

```
"2020-02-25 21:43:23"
```

### 使用场景：

这个过滤器非常适合在 Vue 应用中对时间戳或日期字符串进行格式化，以便用户看到友好的时间格式。你可以在模板中这样使用它：

```html
<p>{{ timestamp | dateFormat }}</p>
```

其中，`timestamp` 可以是一个日期时间戳或 ISO 格式的日期字符串。过滤器会将其转换为 `YYYY-MM-DD HH:MM:SS` 格式，便于用户阅读。

### 总结：

- **功能**：将时间戳或日期字符串格式化为 `YYYY-MM-DD HH:MM:SS` 的标准日期时间格式。
- **实现**：通过 `Date` 对象获取具体的年、月、日、时、分、秒，并使用辅助函数确保所有小于 10 的数字前加上 `0`。
- **使用**：在 Vue 模板中作为过滤器使用，便于对时间进行统一格式化显示。