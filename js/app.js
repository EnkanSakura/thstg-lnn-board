const boolKeyList = [
  'rep', 'live', 'hand', 'key', 'screen', 'link'
];

// 获取当前页面的 URL
const url = new URL(window.location.href);

// 获取当前页面的文件名
const page = url.pathname.split('/').pop();
// 获取当前页面对应的表格数据文件名
const tableData = page.replace('.html', '.json');

// 加载表格数据
fetch(`data/${tableData}`)
  .then(response => response.json())
  .then(data => {
    // 查找表格元素
    const table = document.querySelector('tbody');

    // 渲染表格数据
    for (let id in data) {
      const userData = data[id];
      userData.forEach(recordData => {
        console.log(recordData);
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        idCell.textContent = id;
        row.appendChild(idCell);
        for (let key in recordData) {
          console.log(key, recordData[key]);
          const cell = document.createElement('td');
          if (boolKeyList.indexOf(key) !== -1) {
            if (typeof(recordData[key]) === 'boolean') {
              cell.textContent = recordData[key] ? '√' : '×';
            }
            else {
              const link = document.createElement('a');
              link.href = recordData[key];
              link.textContent = '查看';
              link.target = '_blank';
              link.className = 'btn btn-url'
              cell.appendChild(link);
            }
          }
          else {
            cell.textContent = recordData[key];
          }
          row.appendChild(cell);
        }
        table.appendChild(row);
      });
    }
  }
);

function goBack() {
  location.assign(location.href.split('/').slice(0, -1).join('/'));
}
