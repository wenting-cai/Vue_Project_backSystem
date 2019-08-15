
let express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs');
let app = express();
app.listen(8000, () => console.log('8000 is on'));

app.use(express.static(__dirname));
app.use(bodyParser.json());

let readFile = path => JSON.parse(fs.readFileSync(path,'utf8'));
let userPath = __dirname + '/database/login.json';
let shopPath = __dirname + '/database/shopList.json';
let catoryPath = __dirname + '/database/optionsList.json';
let foodPath = __dirname + '/database/foodList.json';
let raurantPath = __dirname + '/database/restaurant.json';
let menuPath = __dirname + '/database/menu.json';
let foodCountPath = __dirname + '/database/foodCount.json';
let orderPath = __dirname + '/database/orderList.json';
let orderCountPath = __dirname + '/database/orderListCount.json';
let userInfoPath = __dirname + '/database/userInfo.json';
let adminListPath = __dirname + '/database/adminInfo.json';
let adminCountPath = __dirname + '/database/adminInfoCount.json';
let catoryListPath = __dirname + '/database/catoryList.json';
// 点击提交之后，前端会将用户名信息的发送给服务器，如果数据库中没有此用户名，则将它写入数据库中，如果存在此用户名则验证密码是否正确，如果密码正确返回code = 0
app.post('/api/UserLogIn',(req,res) => {
  let userInfo = req.body; 
  let con = readFile(userPath);
  let user = con.find(item => item.userName === userInfo.userName);
  if(user){
    if(user.password === userInfo.password) {
      res.send({
        code : 0,
        data: {
          token: '12432cxzwqfdsfd'
        },
        msg: 'ok'
      });
    } else {
      res.send({
        code : 1,
        data: null,
        msg: '密码不正确'
      });
    } 
  } else {
    userInfo.userId = +con[con.length - 1].userId + 1;
    // let date = (new Date().toLocaleString('chinese',{hour12:false}).replace(/\//g,'-'));
    let date = new Date();
    let year = date.getFullYear();
    let mis = date.getMonth() + 1;
    mis < '10' ? mis = '0' + mis : mis ;
    let d = date.getDate();
    d < '10' ? d = '0' + d : d ;
    let h = date.getHours();
    h < '10' ? h = '0' + h : h ;
    let m = date.getMinutes();
    m < '10' ? m = '0' + m : m ;
    userInfo.registerDate = `${year}-${mis}-${d}  ${h}:${m}`;
    userInfo.registerAddress = "北京";
    con.push(userInfo);
    fs.writeFileSync(userPath,JSON.stringify(con),'utf8');
    res.send({
      code: 0,
      data: null,
      msg: 'ok'
    })
  };
  fs.writeFileSync(__dirname + '/database/userCount.json' , con.length, 'utf8');
});

// 退出
app.get('/api/getOut', (req,res) => {
  res.send({
    code: 0,
    data: null,
    msg: 'ok'
  })
});

// 获取用户数据
app.get('/api/getUserList',(req,res) => {
  let { offset, limit } = req.query;
  let con = readFile(userPath);
  let result = con.slice(+offset,  (+offset) + (+limit ) );
  res.send({
    code: 0,
    data: result,
    msg: 'ok'
  })
});

// 获取用户数量
app.get('/api/getUserCount', (req,res) => {
  let count = fs.readFileSync(__dirname + '/database/userCount.json','utf8');
  res.send({
    code : 0,
    count: count,
    msg: 'ok'
  });
});

// 获取商家列表的信息
app.get('/api/getShopList',(req,res) => {
  let { offset, limit } = req.query;
  let con = readFile(shopPath);
  let result = con.slice(+offset,  (+offset) + (+limit ) );
  fs.writeFileSync(__dirname + '/database/shopCount.json', JSON.stringify(con.length),'utf8')
  res.send(result)
});

app.get('/api/getShopCount', (req,res) => {
  let count = fs.readFileSync(__dirname + '/database/shopCount.json','utf8');
  res.send({
    code : 0,
    count: count,
    msg: 'ok'
  });
});

// 获取所有的食品清单
app.get('/api/getCatoryList', (req, res) => {
   let con = readFile(catoryPath);
   res.send(con)
})
// 更改商铺信息
app.post('/api/updateCatoryList', (req, res) => {
  let con = readFile(shopPath);
  let result = req.body;
  if( result.ID === 1 ) {
    res.send({
      code: 1,
      data: null,
      msg: '此商铺不能用来更改'
    });
    return;
  };
  let newData = con.filter(item => +item.ID !== result.ID)
  newData.push(result);
  fs.writeFileSync(shopPath, JSON.stringify(newData), 'utf8');
  res.send({
    code: 0,
    data: null,
    msg: 'ok'
  })
})

// 删除商铺信息
app.get('/api/cancelList', (req, res) => {
  let { ID } = req.query;
  if ( ID === '1') {
    res.send({
      code: 1,
      data: null,
      msg: '没有权限删除'
    });
    return ;
  }
  let con = readFile(shopPath);
  con = con.filter(item => +item.ID !== +ID);
  fs.writeFileSync(shopPath, JSON.stringify(con), 'utf8');
  res.send({
    code: 0,
    data: null,
    msg: 'ok'
  })
})

// 获取食物列表
app.get('/api/getFoodList', (req, res) => {
  let { offset, limit } = req.query;
  let con = readFile(foodPath);
  let result = con.slice(+offset,  (+offset) + (+limit ) );
  // fs.writeFileSync(foodCountPath, JSON.stringify(con.length), 'utf8');
  res.send(result);
})

// 获取食物列表的数量
app.get('/api/getFoodCount', (req, res) => {
  let con = readFile(foodCountPath);
  res.send({
    code: 0,
    count: con,
    msg: 'ok'
  })
})

// 获取餐馆的信息
app.get('/api/getRestaurant', (req, res) => {
  let { id } = req.query;
  let con = readFile(raurantPath);
  let result = con.find(item => +item.id === +id);
  res.send(result)
})

// 获取食品分类信息
app.get('/api/getMenu', (req, res) => {
  let { id } = req.query;
  let con = readFile(menuPath);
  let result = con.find(item => +item.id === +id);
  res.send(result)
})

app.get('/api/getMenuList', (req, res) => {
  let con = readFile(menuPath);
  res.send(con);
})

// 更新食品信息
app.post('/api/updateFood', (req, res) => {
  let con = readFile(foodPath);
  let options = req.body;
  console.log(options)
  let data = con.findIndex(item => item.item_id === options.item_id);
  con[data] = options;
  fs.writeFileSync(foodPath, JSON.stringify(con), 'utf8')
  res.send({
    code: 0,
    data: null,
    msg: 'ok'
  })
  // console.log(options)
})

// 删除食品信息
app.get('/api/deleteFood', (req, res) => {
  let { ID } = req.query;
  if ( ID === '1') {
    res.send({
      code: 1,
      data: null,
      msg: '没有权限删除'
    });
    return ;
  }
  let con = readFile(foodPath);
  con = con.filter(item => +item.item_id !== +ID);
  fs.writeFileSync(foodPath, JSON.stringify(con), 'utf8');
  res.send({
    code: 0,
    data: null,
    msg: 'ok'
  })
})

// 获取订单列表
app.get('/api/getOrderList', (req, res) => {
  let { offset, limit } = req.query;
  let con = readFile(orderPath);
  let result = con.slice(+offset,  (+offset) + (+limit ) );
  fs.writeFileSync(orderCountPath, JSON.stringify(con.length), 'utf8');
  res.send(result);
})

// 获取订单列表的数量
app.get('/api/getOrderCount', (req, res) => {
  let con = readFile(orderPath);
  fs.writeFileSync(orderCountPath , JSON.stringify(con.length), 'utf8');
  con = readFile(orderCountPath);
  res.send({
    code: 0,
    count: con,
    msg: 'ok'
  })
})

// 获取用户列表的信息
app.get('/api/getUserInfo', (req, res) => {
  let { userId } = req.query;
  let con = readFile(userInfoPath);
  let result = con.find(item => +item.user_id === +userId);
  res.send(result)
})


// 获取管理员数据
app.get('/api/getAdminList',(req,res) => {
  let { offset, limit } = req.query;
  let con = readFile(adminListPath);
  let result = con.slice(+offset,  (+offset) + (+limit ) );
  res.send(result);
});

// 获取管理员数量
app.get('/api/getAdminCount', (req,res) => {
  let con = readFile(adminListPath);
  fs.writeFileSync(adminCountPath , JSON.stringify(con.length), 'utf8');
  let count = readFile(adminCountPath);
  res.send({
    code : 0,
    count: count,
    msg: 'ok'
  });
});

// 添加商铺信息
app.post('/api/submitShopList', (req, res) => {
  let param = req.body;
  // console.log(param)
  let con = readFile(shopPath);
  con.push(param)
  fs.writeFileSync(shopPath, JSON.stringify(con), 'utf8');
  res.send({
    code: 0,
    data: null,
    msg: 'ok'
  })
})

// 获取食品分类信息
app.get('/api/getCatoryFoodsList', (req, res) => {
  let con = readFile(catoryListPath);
  res.send(con);
})
// 添加食品种类
app.post('/api/addFoodsCatory', (req, res) => {
  let params = req.body ;
  let con = readFile(menuPath);
  params.id = con[con.length -1].id + 1;
  params.restaurant_id = con[con.length -1].restaurant_id + 1;
  con.push(params);
  fs.writeFileSync(menuPath, JSON.stringify(con), 'utf8');
  res.send({
    code: '0',
    data: null,
    msg: 'ok'
  })
})

// 添加食品信息
app.post('/api/addFoods', (req, res) => {
  let con = readFile(foodPath);
  let result = req.body;
  result.item_id = con[con.length -1].item_id + 1;
  result.month_sales = con[con.length -1].month_sales + 1;
  con.push(result)
  fs.writeFileSync(foodPath, JSON.stringify(con), 'utf8')
  res.send({
    code: 0,
    data: null,
    msg: 'ok'
  })
})