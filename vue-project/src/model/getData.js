import axios from './config'
export let userLogIn = data => axios.post('/api/UserLogIn', data)

// 获取用户登录信息
export let adminInfo = () => axios.get('/api/getAdminInfo')

// 注销
export let getOut = () => axios.get('/api/getOut')

// 获取用户数据
export let getUserList = (options) => axios.get('/api/getUserList', {
  params: options
})

// 获取用户数量
export let userCount = () => axios.get('/api/getUserCount')

// 获取商铺的数据
export let getShopList = (options) => axios.get('/api/getShopList', {
  params: options
})

// 获取商铺的数量
export let getShopCount = () => axios.get('/api/getShopCount')

// 获取所有食品的列表
export let getCatoryList = () => axios.get('/api/getCatoryList')

// 更改商铺信息
export let updateShopList = (options) => axios.post('/api/updateCatoryList', options)

// 删除商铺
export let cancelList = (param) => axios.get('/api/cancelList', { params: param })

// 获取食物列表
export let getFoodList = (options) => axios.get('/api/getFoodList', {
  params: options
})

// 获取食物列表的数量
export let getFoodCount = () => axios.get('/api/getFoodCount')

// 获取餐馆的信息
export let getRestaurant = (id) => axios.get('/api/getRestaurant?id=' + id)

// 获取食品分类信息
export let getMenu = (id) => axios.get('/api/getMenu?id=' + id)

// 获取食物列表
export let getMenuList = () => axios.get('/api/getMenuList')

// 更改食品信息
export let updateFoodList = (op) => axios.post('/api/updateFood', op)

// 删除食品信息
export let cancelFoodList = (options) => axios.get('/api/deleteFood', { params: options })

// 获取订单列表的数量
export let getOrderCount = () => axios.get('/api/getOrderCount')

// 获取订单列表
export let getOrderList = (options) => axios.get('/api/getOrderList', { params: options })

// 获取指定的用户列表信息
export let getUserInfo = (userId) => axios.get('/api/getUserInfo?userId=' + userId)

// 获取管理员列表

export let getAdminList = (options) => axios.get('/api/getAdminList', { params: options })
export let getAdminCount = () => axios.get('/api/getAdminCount')

// 添加商铺列表
export let submitShopList = (options) => axios.post('/api/submitShopList', options)

// 获取食品列表
// export let getFoodsCatoryList = () => axios.get('/api/getCatoryFoodsList')
// 添加食品种类
export let addFoodsCatory = (options) => axios.post('/api/addFoodsCatory',options)

// 添加食品
export let addFoods = (options) => axios.post('/api/addFoods', options)