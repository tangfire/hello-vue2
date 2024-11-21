```js
<template>
    <div id="myList" class="myList">
        <ul>
            <li v-for="item in list" :key="item.product_id">
              <el-popover placement="top">
                <p>确定删除吗？</p>
                <div style="text-align: right; margin: 10px 0 0">
                  <el-button type="primary" size="mini" @click="deleteCollect(item.product_id)">确定</el-button>
                </div>
                <i class="el-icon-close delete" slot="reference" v-show="isDelete"></i>
               </el-popover>
                <router-link :to="{path: '/goods/details',query:{productID:item.product_id}}">
                    <img :src="$target + item.product_picture" alt="">
                    <h2>{{item.product_name}}</h2>
                    <h3>{{item.product_title}}</h3>
                    <p>
                        <span>{{item.product_selling_price}}元</span>
                        <span
                            v-show="item.product_price != item.product_selling_price"
                            class="del"
                        >{{item.product_price}}元</span>
                    </p>
                </router-link>
            </li>
            <li v-show="isMore && list.length >= 1" id="more">
                <router-link :to="{path: '/goods',query:{categoryID:categoryID}}">
                    浏览更多
                    <i class="el-icon-d-arrow-right"></i>
                </router-link>
            </li>

        </ul>
    </div>
</template>

<script>
export default {
  name: 'MyList',
  // list为父组件传过来的商品列表
  // isMore为是否显示“浏览更多”
  props: ['list', 'isMore', 'isDelete'],
  data () {
    return {}
  },
  computed: {
    // 通过list获取当前显示的商品的分类ID，用于“浏览更多”链接的参数
    categoryID: function () {
      const categoryID = []
      if (this.list !== '') {
        for (let i = 0; i < this.list.length; i++) {
          const id = this.list[i].category_id
          if (!categoryID.includes(id)) {
            categoryID.push(id)
          }
        }
      }
      return categoryID
    }
  },
  methods: {
    deleteCollect (productId) {
      this.$axios
        .post('/api/user/collect/deleteCollect', {
          user_id: this.$store.getters.getUser.user_id,
          product_id: productId
        })
        .then(res => {
          switch (res.data.code) {
            case '001':
            // 删除成功
            // 删除列表中的该商品信息
              for (let i = 0; i < this.list.length; i++) {
                const temp = this.list[i]
                if (temp.product_id === productId) {
                  this.list.splice(i, 1)
                }
              }
              // 提示删除成功信息
              this.notifySucceed(res.data.msg)
              break
            default:
              // 提示删除失败信息
              this.notifyError(res.data.msg)
          }
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
  }

}
</script>

<style scoped>
.myList ul li{
    z-index: 1;
    float: left;
    width: 234px;
    height: 280px;
    padding: 10px 0;
    margin: 0 0 14.5px 13.7px;
    background-color: white;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
    position: relative;
}

.myList ul li:hover {
  z-index: 2;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}

.myList ul li img{
display: block;
width: 160px;
height: 160px;
background: url(../assets/imgs/placeholder.png) no-repeat 50%;
margin: 0 auto;
}

.myList ul li h2{
    margin: 25px 10px 0;
    font-size: 14px;
    font-weight: 400;
    color: #333;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.myList ul li h3 {
  margin: 5px 10px;
  height: 18px;
  font-size: 12px;
  font-weight: 400;
  color: #b0b0b0;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.myList ul li p{
    margin: 10px 10px 10px;
    text-align: center;
    color: #ff6700;
}

.myList ul li p .del{
    margin-left: 0.5em;
    color: #b0b0b0;
    text-decoration: line-through;

}
.myList #more {
  text-align: center;
  line-height: 280px;
}

.myList #more a {
  font-size: 18px;
  color: #333;
}

.myList #more a:hover {
  color: #ff6700;
}

.myList ul li .delete {
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
}

.myList ul li:hover .delete {
  display: block
}

.myList ul li .delete:hover {
  color: #ff6700;
}

</style>

```

报错如下:
```
D:\Vue\myshop-demo\src\components\MyList.vue
  75:19  error  Unexpected mutation of "list" prop  vue/no-mutating-props     

✖ 1 problem (1 error, 0 warnings)

```





这个错误是因为在 Vue 中，不允许直接修改通过 `props` 传递的值（即你不能直接修改 `list`）。在你的代码中，`deleteCollect` 方法通过 `this.list.splice(i, 1)` 修改了 `list`，这导致了 `vue/no-mutating-props` 错误。

要解决这个问题，你可以通过在父组件中进行数据的更新，或者通过触发事件让父组件修改数据。比如，你可以使用一个事件将删除操作通知给父组件，让父组件更新 `list`。

修改方法如下：

1. 在 `deleteCollect` 方法中，替换修改 `list` 的代码为触发一个事件：
   ```js
   this.$emit('delete-collect', productId);
   ```

2. 在父组件中，监听 `delete-collect` 事件，并在父组件中更新 `list`。

例如，父组件代码：
```html
<MyList :list="list" @delete-collect="handleDeleteCollect" />
```
然后在父组件的 `methods` 中实现 `handleDeleteCollect`：
```js
methods: {
  handleDeleteCollect(productId) {
    this.list = this.list.filter(item => item.product_id !== productId);
  }
}
```

这样就避免了直接修改 `props`，符合 Vue 的最佳实践。