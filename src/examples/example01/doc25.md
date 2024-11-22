# 刷新浏览器，Vuex中存储的状态会丢失

默认情况下，当你刷新浏览器时，**Vuex 中存储的状态会丢失**。这是因为 Vuex 的状态存储在内存中，而浏览器刷新会导致页面重新加载，页面中的 JavaScript 状态也会被清除。

### 如何解决？

如果你希望在浏览器刷新后 Vuex 中的状态仍然保持，可以使用以下几种方法：

#### 1. 使用 `localStorage` 或 `sessionStorage`
可以将 Vuex 状态保存到 `localStorage` 或 `sessionStorage` 中，刷新页面后从这些存储中恢复状态。

- **`localStorage`** 会持久化存储，即使关闭浏览器后也会保留。
- **`sessionStorage`** 只会在浏览器会话期间存储数据，当会话结束（即浏览器关闭）时数据会丢失。

示例代码：

```js
// vuex store
const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    loadUserFromStorage({ commit }) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        commit('setUser', user);
      }
    },
    saveUserToStorage({ state }) {
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  }
});

// 在 Vue 实例中加载和保存状态
new Vue({
  store,
  created() {
    this.$store.dispatch('loadUserFromStorage');
  },
  watch: {
    '$store.state.user': function(newUser) {
      this.$store.dispatch('saveUserToStorage');
    }
  }
});
```

#### 2. 使用 Vuex 插件（如 `vuex-persistedstate`）
为了更方便地将 Vuex 状态持久化到 `localStorage` 或 `sessionStorage`，可以使用第三方插件 `vuex-persistedstate`。

安装插件：

```bash
npm install vuex-persistedstate
```

然后在 `store` 配置中使用它：

```js
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persistedstate';

const store = new Vuex.Store({
  plugins: [VuexPersistence()],
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  }
});
```

通过这种方式，`vuex-persistedstate` 会自动将 Vuex 中的状态持久化到浏览器的 `localStorage`，刷新页面后恢复之前的状态。

#### 3. 使用服务器端存储
如果你不想将用户数据保存在浏览器端，还可以将 Vuex 的状态保存在服务器上。例如，可以在用户登录时将一些关键数据存储在服务器端，刷新页面时从服务器端获取并恢复 Vuex 状态。

---

### 总结

默认情况下，刷新页面会导致 Vuex 状态丢失。要持久化状态，可以使用 `localStorage`、`sessionStorage`，或者使用如 `vuex-persistedstate` 这样的第三方插件。如果希望更安全或灵活的存储方式，也可以考虑将数据存储在服务器上。