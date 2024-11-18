```js
/*
 * @Description: 用户登录状态模块
 * @Author: hai-27
 * @Date: 2020-02-19 17:42:11
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-26 23:14:32
 */
export default {
  state: {
    user: "", // 登录的用户
    showLogin: false // 用于控制是否显示登录组件
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getShowLogin (state) {
      return state.showLogin
    }
  },
  mutations: {
    setUser (state, data) {
      state.user = data;
    },
    setShowLogin (state, data) {
      state.showLogin = data;
    }
  },
  actions: {
    setUser ({ commit }, data) {
      commit('setUser', data);
    },
    setShowLogin ({ commit }, data) {
      commit('setShowLogin', data);
    }
  }
}
```

这段代码是 Vuex 中一个模块的配置，它用于管理与 **用户登录状态** 相关的状态、行为和操作。可以看出，这个模块包含了 `state`、`getters`、`mutations` 和 `actions` 四个主要部分。下面详细解释每一部分的作用：

### 1. **模块描述**
```javascript
/*
 * @Description: 用户登录状态模块
 * @Author: hai-27
 * @Date: 2020-02-19 17:42:11
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-26 23:14:32
 */
```
这是代码文件的注释部分，描述了该文件的功能和作者信息。根据注释，模块是用来处理 **用户登录状态** 的，作者是 `hai-27`。

### 2. **state:**
```javascript
state: {
  user: "", // 登录的用户
  showLogin: false // 用于控制是否显示登录组件
}
```
`state` 是 Vuex 中用来存储应用的 **状态**（数据）的地方。在这个模块中，`state` 里面包含了两个属性：

- `user`：存储当前已登录的用户信息，初始化为一个空字符串（`""`），表示没有登录用户。
- `showLogin`：用来控制是否显示登录组件的布尔值，初始化为 `false`，表示默认不显示登录界面。

### 3. **getters:**
```javascript
getters: {
  getUser (state) {
    return state.user
  },
  getShowLogin (state) {
    return state.showLogin
  }
}
```
`getters` 是 Vuex 中用于 **获取 state 中的数据** 的计算属性。它们的作用是通过 `state` 返回一些经过加工的、或者直接需要暴露的值。

- `getUser(state)`：返回 `state.user`，即当前登录的用户信息。
- `getShowLogin(state)`：返回 `state.showLogin`，即控制是否显示登录组件的布尔值。

`getters` 类似于 Vue 组件中的 **computed** 属性，可以用来从 `state` 中派生出其他值。

### 4. **mutations:**
```javascript
mutations: {
  setUser (state, data) {
    state.user = data;
  },
  setShowLogin (state, data) {
    state.showLogin = data;
  }
}
```
`mutations` 用来 **同步地修改 state**。它们是唯一能够直接修改 Vuex `state` 的方法。

- `setUser(state, data)`：修改 `state.user`，用传入的 `data` 替换当前的用户信息。`data` 参数就是要设置的用户信息。
- `setShowLogin(state, data)`：修改 `state.showLogin`，用传入的 `data` 来设置是否显示登录组件的值。`data` 是一个布尔值（`true` 或 `false`）。

注意：`mutations` 必须是同步的，即它们的执行不能是异步的。这样做的目的是确保对 `state` 的修改具有可追溯性和可调试性。

### 5. **actions:**
```javascript
actions: {
  setUser ({ commit }, data) {
    commit('setUser', data);
  },
  setShowLogin ({ commit }, data) {
    commit('setShowLogin', data);
  }
}
```
`actions` 用来 **处理异步操作** 或者 **提交 mutations**。在 `actions` 中，通常会调用 `commit` 来触发相应的 mutation。

- `setUser({ commit }, data)`：通过 `commit` 调用 `setUser` mutation，修改 `user` 的状态。
- `setShowLogin({ commit }, data)`：通过 `commit` 调用 `setShowLogin` mutation，修改 `showLogin` 的状态。

`actions` 的主要作用是封装业务逻辑或异步操作，然后通过 `commit` 调用 `mutations` 来修改 `state`。

### 总结：
这个 Vuex 模块管理了用户的登录状态，包含了以下几个部分：

1. **state**：存储数据，包含 `user` 和 `showLogin` 两个属性。
2. **getters**：用于访问 state 中的数据，提供 `getUser` 和 `getShowLogin` 两个 getter。
3. **mutations**：用于同步修改 `state`，提供 `setUser` 和 `setShowLogin` 两个 mutation。
4. **actions**：用于触发 mutations，提供 `setUser` 和 `setShowLogin` 两个 action。

这个模块的作用是管理登录状态和控制登录组件的显示与隐藏。在 Vuex 中，`mutations` 用于同步改变 `state`，而 `actions` 用于处理一些业务逻辑或者异步操作并最终提交 `mutations` 来更新 `state`。



--------------------------


这段代码是 **Vuex** 中的 **`actions`** 部分，定义了两个 **action** 方法：`setUser` 和 `setShowLogin`。在 Vuex 中，**action** 用于处理异步操作或者触发某些变更（通常是通过 **`mutations`**）来修改状态（`state`）。让我们逐行解释这段代码。

### 1. **`actions` 作用**
```javascript
actions: {
  setUser ({ commit }, data) {
    commit('setUser', data);
  },
  setShowLogin ({ commit }, data) {
    commit('setShowLogin', data);
  }
}
```
`actions` 是一个对象，它包含多个方法。这些方法的主要功能是通过调用 **`commit`** 来触发 **mutations**，从而更新 Vuex 状态（`state`）。在这个例子中，这些 actions 主要用来设置用户信息和控制是否显示登录组件。

### 2. **`setUser` action**
```javascript
setUser ({ commit }, data) {
  commit('setUser', data);
}
```
- **参数**:
  - `commit`: `commit` 是 Vuex 提供的一个方法，用来触发 `mutations` 中定义的函数，最终会更新 `state` 的数据。它接收两个参数，第一个是要调用的 mutation 的名字，第二个是要传递给 mutation 的数据。
  - `data`: 这个参数是 `setUser` action 接收到的外部数据，可以是任何类型。在这里，它代表要设置的用户信息。

- **作用**:
  该 `setUser` action 会调用 `commit('setUser', data)`，也就是说它会触发 **`mutations`** 中的 `setUser` 函数，并将 `data` 作为参数传递过去，从而更新 Vuex 中的 `state.user`。

  比如：
  ```javascript
  commit('setUser', { name: 'John Doe', id: 1 });
  ```

### 3. **`setShowLogin` action**
```javascript
setShowLogin ({ commit }, data) {
  commit('setShowLogin', data);
}
```
- **参数**:
  - `commit`: 同样是 Vuex 提供的一个方法，用来触发 mutations 中的方法。
  - `data`: 这里的 `data` 通常是一个布尔值（`true` 或 `false`），表示是否显示登录组件。

- **作用**:
  该 `setShowLogin` action 会调用 `commit('setShowLogin', data)`，触发 **`mutations`** 中的 `setShowLogin` 方法，并将 `data` 作为参数传递过去，从而更新 Vuex 中的 `state.showLogin`。

  例如：
  ```javascript
  commit('setShowLogin', true);
  ```

### 总结
1. **`actions`** 用于处理异步操作或触发 mutations，进而修改 Vuex 中的状态（`state`）。
2. `setUser` action 会调用 `mutations` 中的 `setUser` 方法，并将 `data` 传递给它，从而更新用户信息。
3. `setShowLogin` action 会调用 `mutations` 中的 `setShowLogin` 方法，并将 `data` 传递给它，从而控制登录组件的显示状态。
4. 在 Vue 组件中，你可以通过 `this.$store.dispatch('setUser', data)` 或 `this.$store.dispatch('setShowLogin', data)` 来触发这些 actions。

**区别于 `mutations`**：`actions` 允许你处理异步逻辑，通常会在异步操作完成后再通过 `commit` 来调用 mutation。如果你只是需要同步更新状态，可以直接在组件中调用 `commit`。



-----------------------




# 问:

一定要叫getters吗??

# 答:

在 **Vuex** 中，**`getters`** 是一个固定的名称，并且是 Vuex 提供的一个专门用于访问和派发状态（state）数据的选项。在 Vuex 的模块化管理中，你无法将 `getters` 改名为其他名称。它是 Vuex 设计中固定的 API。

### 为什么需要 `getters`？

`getters` 主要是为了让你能以 **计算属性** 的方式访问 Vuex 中的状态（`state`）。它们就像 Vue 组件中的 `computed`，可以用来返回基于 `state` 的衍生数据，或者对数据进行处理后再返回。

例如：
```javascript
getters: {
  getUser(state) {
    return state.user;
  },
  getShowLogin(state) {
    return state.showLogin;
  }
}
```

### 你能做的修改：
虽然你不能修改 `getters` 的名称本身，但你可以根据需要 **定义多个 getter**，这些 getter 的名字是你可以自由命名的。所以在 `getters` 对象内部，你的 getter 函数的名字是自定义的。例如，你可以给 `getUser` 取一个不同的名字，只要它在 `getters` 对象内部即可。

### 举个例子：
```javascript
export default {
  state: {
    user: "John Doe"
  },
  getters: {
    // 你可以根据实际需求自由命名getter
    currentUser: state => state.user,
    userName: state => state.user.split(" ")[0] // 获取用户的名字部分
  }
}
```
在这个例子中，你可以通过 `this.$store.getters.currentUser` 和 `this.$store.getters.userName` 来访问这些值。

### 总结：
- **`getters`** 是 Vuex 的一个约定名称，你不能改名。
- 你可以在 `getters` 中定义多个属性，名字可以自由命名。
- `getters` 用来计算并返回基于 `state` 的衍生数据。

