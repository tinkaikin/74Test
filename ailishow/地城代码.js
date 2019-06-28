// // for(var i=1; i<10;i++){
// //   for(var j = 1; j < i +1; j++){
// //     console.log(i + "X" + j)
// //   }
// // }
// // var arr = [12,45,1,48,3,59,16]
// // for (var i = 0; i < arr.length; i++){
// //   for (var j = 0; j < arr.length ; j++){
// //     var arrlal = [];
// //     if (arr[i] > arr[j]) {
// //       arrlal = arr[i];
// //       arr[i] = arr[j];
// //       arr[j] = arrlal;
// //     }
// //     console.log(arr);
// //   }
// // }

// function obj(name) {
//   // this.name = name;
//   if (name) {
//     this.name = name;
//   } else {
//     return this
//   }

// }
// obj.prototype.name = "name2";
// var a = obj("name1");
// var b = new obj;      // this.name = 'name2';

// //a.name = “name1”; b.name = “name2”;

// // 创建 cookie
// function setCookie(name, value, expires, path, domain, secure) {
//   var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
//   if (expires instanceof Date) {
//     cookieText += '; expires=' + expires;
//   }
//   if (path) {
//     cookieText += '; expires=' + expires;
//   }
//   if (domain) {
//     cookieText += '; domain=' + domain;
//   }
//   if (secure) {
//     cookieText += '; secure';
//   }
//   document.cookie = cookieText;
// }
// // 获取 cookie
// function getCookie(name) {
//   var cookieName = encodeURIComponent(name) + '=';
//   var cookieStart = document.cookie.indexOf(cookieName);
//   var cookieValue = null;
//   if (cookieStart > -1) {
//     var cookieEnd = document.cookie.indexOf(';', cookieStart);
//     if (cookieEnd == -1) {
//       cookieEnd = document.cookie.length;
//     }
//     cookieValue = decodeURIComponent(document.cookie.substring(cookieStart +
//       cookieName.length, cookieEnd));
//   }
//   return cookieValue;
// }
// // 删除 cookie
// function unsetCookie(name) {
//   document.cookie = name + "= ; expires=" + new Date(0);
// }


// Array.prototype.uniq = function () {
//   // 长度只有 1，直接返回当前的拷贝
//   if (this.length <= 1) {
//     return this.slice(0);
//   }
//   var aResult = [];
//   for (var i = 0, l = this.length; i < l; i++) {
//     if (!_fExist(aResult, this[i])) {
//       aResult.push(this[i]);
//     }
//   }
//   return aResult;
//   // 判断是否重复
//   function _fExist(aTmp, o) {
//     if (aTmp.length === 0) {
//       return false;
//     }
//     var tmp;
//     for (var i = 0, l = aTmp.length; i < l; i++) {
//       tmp = aTmp[i];
//       if (tmp === o) {
//         return true;
//       }
//       // NaN 需要特殊处理
//       if (!o && !tmp && tmp !== undefined && o !== undefined && isNaN(tmp) &&
//         isNaN(o)) {
//         return true;
//       }
//     }
//     return false;
//   }
// }



let 发布者 = {
  list: [],
  listen: function (fn) {      //客户订阅是调用方法
    this.list.push(fn);
  },
  trigger: function () {      //发布者 发布时 调用的方法
    this.list.forEach(fn => {
      fn.apply(this, arguments);
    });
  }
}
//小红准备订阅 颜色和 尺寸
发布者.listen(function (color, size) {
  console.log('颜色:' + color);
  console.log('尺寸:' + size);
})
//小明
发布者.listen(function (color, size) {
  console.log('颜色:' + color);
  console.log('尺寸:' + size);
})

//过几天了鞋来货了 准备发布消息

// 发布者.trigger('红色', '50');

// console.log(Array.prototype.shift.call(['红色', '50']))


let 发布者2 = {
  list: [],      //订阅者集合
  listen: function () {    //添加订阅者
    //将接受2个参数
    let [key, ...argument] = arguments;
    console.log(key, argument)
    if (this.list[key]) {
      this.list[key] = [];
    } else {

    }
    this.list[key]
  }
}

// 发布者2.listen('lala', function () { console.log(123) })


function Traverse(p_element,p_callback) {
  p_callback(p_element);
  var list = p_element.children;
  for (var i = 0; i < list.length; i++) {
      Traverse(list[i],p_callback);  // recursive call
  }
}

// 此函数的参数为：

// DOM元素

// 回调函数（将DOM元素作为其参数）



