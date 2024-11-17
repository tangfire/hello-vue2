
# 点击相同路由时会产生 `NavigationDuplicated` 错误

这段代码的目的是为了处理 Vue Router 在 3.1 版本之后引入的 `Promise` 机制，特别是为了防止全局路由错误处理打印一些不必要的错误信息，特别是在点击相同路由时会产生 `NavigationDuplicated` 错误。



### 代码分析：

```javascript
/* 
  由于Vue-router在3.1之后把$router.push()方法改为了Promise。
  所以假如没有回调函数，错误信息就会交给全局的路由错误处理。
  vue-router先报了一个Uncaught(in promise)的错误(因为push没加回调)，
  然后再点击路由的时候才会触发NavigationDuplicated的错误(路由出现的错误，全局错误处理打印了出来)。
*/
// 禁止全局路由错误处理打印
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
```

配置在路由文件里面

### 1. **Vue Router 3.1 之后的变化：**

在 Vue Router 3.1 版本之后，`$router.push()` 方法返回一个 `Promise`。这意味着 `push` 方法本身不再直接处理回调函数，而是返回一个 Promise，这样你可以使用 `.then()` 和 `.catch()` 来处理成功与失败的结果。

例如：

```javascript
this.$router.push('/new-page')
  .then(() => {
    // 成功的逻辑
  })
  .catch((err) => {
    // 失败的逻辑
  });
```

但是如果你没有传入回调函数，`push` 会返回一个 Promise，而且当发生错误时（比如你尝试导航到当前路由），错误会被抛出，并传递给全局的错误处理器。这可能会导致一些不必要的 `Uncaught (in promise)` 错误，尤其是当用户点击了相同的路由时，Vue Router 会产生 `NavigationDuplicated` 错误。

### 2. **问题的具体描述：**

- 如果你没有提供 `onResolve` 和 `onReject` 回调函数，而直接调用 `push()`，那么会返回一个 `Promise`。
- 在这种情况下，如果你尝试导航到当前路由，Vue Router 会抛出一个 `NavigationDuplicated` 错误。这个错误会被交给全局路由错误处理程序，并且会在控制台中打印出 `"Uncaught (in promise)"` 错误信息。
- 这种情况通常是因为用户点击了同一个路由地址，或者尝试在同一个视图中进行重复的路由导航。

### 3. **代码的目的：**

这段代码通过重写 `Router.prototype.push` 方法来避免出现全局错误处理打印不必要的错误信息，特别是 `NavigationDuplicated` 错误。

#### 代码解释：

- **保存原始的 `push` 方法**：
  
  ```javascript
  const originalPush = Router.prototype.push;
  ```

  这里先将原来的 `push` 方法保存到 `originalPush` 中，防止后续覆盖导致无法调用原始功能。

- **重写 `push` 方法**：

  ```javascript
  Router.prototype.push = function push(location, onResolve, onReject) {
  ```

  通过修改 `Router.prototype.push`，我们可以自定义 `push` 方法的行为。

- **判断是否传入了 `onResolve` 和 `onReject` 回调函数**：

  ```javascript
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  ```

  如果用户传入了 `onResolve` 和 `onReject` 回调函数，则调用原始的 `push` 方法，并传递这些回调函数。这样，你就可以在 `push` 后使用回调来处理导航的成功或失败。

- **如果没有传入回调函数，仍然调用 `originalPush`，但捕获错误**：

  ```javascript
  return originalPush.call(this, location).catch(err => err)
  ```

  如果没有传入回调函数，`push` 会返回一个 `Promise`，我们调用 `originalPush.call(this, location)` 来执行路由跳转，并在 `catch` 中捕获任何错误。这里的 `catch` 会捕获所有错误（包括 `NavigationDuplicated` 错误），但是不会将错误信息抛出到全局错误处理器，而是直接返回错误对象。

  这样就避免了 `Uncaught (in promise)` 错误出现在控制台，因为错误被捕获并返回，而不会触发全局错误处理。

### 4. **最终效果：**

- 如果调用 `this.$router.push()` 并且没有提供回调，且发生了 `NavigationDuplicated` 错误，错误会被捕获并且不会显示在控制台中，避免了 `"Uncaught (in promise)"` 错误。
- 如果你提供了回调函数（`onResolve` 和 `onReject`），则正常使用原始的 `push` 方法，并且错误会通过回调处理。

### 5. **总结：**

这段代码的目的是为了避免 Vue Router 3.1+ 在没有回调函数时产生不必要的 `Uncaught (in promise)` 错误，尤其是在路由导航重复时（如点击相同的路由）。通过捕获错误并返回错误对象，避免了错误信息被全局处理器打印出来，保持控制台的整洁。