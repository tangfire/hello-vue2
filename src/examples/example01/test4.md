# localStorage


`localStorage.setItem('user', user)` 是 Web 存储 API 的一部分，`localStorage` 允许你在浏览器的本地存储中保存数据，这些数据会在浏览器关闭后依然保留，并且可以跨页面或会话访问。理解 `localStorage` 和如何使用它对前端开发非常重要，尤其是当你需要持久化某些用户数据（例如用户的登录状态、偏好设置等）时。

### `localStorage` 的基本用法：
- `localStorage` 是一个键值对存储机制，它可以用来存储数据。
- `setItem(key, value)` 用于设置数据，其中 `key` 是存储数据的键（名称），`value` 是你想存储的数据。
- `getItem(key)` 用来获取数据。
- `removeItem(key)` 用来删除某个键对应的数据。
- `clear()` 用来清除所有存储的数据。

### 让我们通过一个简单的案例来帮助你理解如何使用 `localStorage`。

#### 案例：用户登录信息存储

假设我们正在开发一个简单的登录系统，用户登录后，我们想把用户的基本信息（比如用户名）存储在 `localStorage` 中，以便下次用户访问网站时能够自动显示其用户名。

### 1. 存储用户数据

首先，当用户登录时，我们通过表单获取用户信息，并将这些信息存储在 `localStorage` 中。我们会使用 `localStorage.setItem` 来实现这一点。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LocalStorage 示例</title>
</head>
<body>
  <h1>登录页面</h1>
  <form id="loginForm">
    <label for="username">用户名：</label>
    <input type="text" id="username" placeholder="输入用户名" required><br><br>
    <button type="submit">登录</button>
  </form>

  <div id="greeting" style="display: none;">
    <h2>欢迎回来，<span id="user"></span>!</h2>
    <button onclick="logout()">退出登录</button>
  </div>

  <script>
    // 检查是否已登录，如果已登录，显示欢迎信息
    window.onload = function () {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        document.getElementById('greeting').style.display = 'block';
        document.getElementById('user').textContent = storedUser;
      } else {
        document.getElementById('loginForm').style.display = 'block';
      }
    };

    // 登录表单提交事件
    document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;

      // 存储用户信息到 localStorage
      localStorage.setItem('user', username);

      // 隐藏登录表单，显示欢迎信息
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('greeting').style.display = 'block';
      document.getElementById('user').textContent = username;
    });

    // 退出登录，清除 localStorage 中的数据
    function logout() {
      localStorage.removeItem('user');  // 清除存储的用户信息
      document.getElementById('loginForm').style.display = 'block';
      document.getElementById('greeting').style.display = 'none';
    }
  </script>
</body>
</html>
```

### 代码说明：
1. **页面初始加载时：**
   - `window.onload` 函数会在页面加载完成时执行。我们首先检查 `localStorage` 中是否有存储的 `user` 数据。如果有，则显示欢迎信息并显示存储的用户名；如果没有，则显示登录表单。

2. **用户登录：**
   - 当用户填写完用户名并点击登录按钮时，表单的 `submit` 事件被触发。我们阻止表单的默认提交行为，并通过 `localStorage.setItem('user', username)` 将用户的用户名存储到本地存储中。
   - 随后，我们隐藏登录表单并显示欢迎信息，欢迎信息中显示了用户名。

3. **用户退出：**
   - 当用户点击 "退出登录" 按钮时，调用 `localStorage.removeItem('user')` 清除存储的 `user` 数据，并切换回显示登录表单的状态。

### 运行效果：
- 如果用户首次访问页面，看到的是登录表单。
- 用户输入用户名并点击登录后，用户名会被存储在 `localStorage` 中。然后页面显示 "欢迎回来，用户名" 的欢迎信息。
- 如果用户刷新页面或重新访问该网站，由于用户名保存在 `localStorage` 中，页面会自动加载欢迎信息，不需要重新登录。
- 用户点击 "退出登录" 后，用户名信息被移除，重新显示登录表单。

### `localStorage` 的特点：
- **持久性**：存储在 `localStorage` 中的数据是持久性的，即使浏览器关闭后数据也不会丢失，直到用户主动删除。
- **限制大小**：每个域名下的 `localStorage` 存储容量通常是 5MB 左右，因此适合存储少量的用户数据，如登录信息、主题设置等。
- **存储的是字符串**：所有存储的数据都以字符串形式存储。如果你想存储对象或数组，可以使用 `JSON.stringify()` 将其转换为字符串，存储后再用 `JSON.parse()` 转换回对象。

### 示例扩展：
- **存储复杂数据**：如果你想存储对象，可以将其转换为 JSON 字符串：

```javascript
const user = { username: 'alice', role: 'admin' };
localStorage.setItem('user', JSON.stringify(user));

// 获取并解析数据
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser.username);  // "alice"
```

### 总结：
`localStorage` 是一种简单而强大的 Web 存储方式，可以在客户端保存数据。通过 `setItem` 和 `getItem` 方法，你可以方便地存储和获取数据，尤其适合存储一些需要在多个页面间共享的数据，如用户的登录信息、偏好设置等。它的持久性和跨会话访问能力使得它在很多场景下非常有用。