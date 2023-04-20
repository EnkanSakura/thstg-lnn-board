// 返回键
function goBack() {
  location.assign(location.href.split('/').slice(0, -1).join('/'));
}
