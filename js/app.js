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
    // 按 ID 排序
    let keySort = Object.keys(data);
    // let keySort = Object.keys(data).sort(function (a, b) {
    //   const aid = a.replace(' ', '').split('-');
    //   const bid = b.replace(' ', '').split('-');
    //   if (aid[0].localeCompare(bid[0]) === 0) {
    //     return aid[1].localeCompare(bid[1]);
    //   } else {
    //     return aid[0].localeCompare(bid[0]);
    //   }
    // });
    // 渲染表格数据
    keySort.forEach(id => {
      const userData = data[id];
      let firstLine = true;
      userData.forEach(recordData => {
        const row = document.createElement('tr');
        if (firstLine) {
          // 第一行添加ID, 合并行
          const idCell = document.createElement('td');
          idCell.rowSpan = userData.length;
          idCell.textContent = id;
          row.appendChild(idCell);
          firstLine = false;
        }
        for (let key in recordData) {
          const cell = document.createElement('td');
          if (boolKeyList.indexOf(key) !== -1) {
            if (recordData[key] === '' || recordData[key] === null) {
              cell.textContent = '-';
            }
            else if (typeof(recordData[key]) === 'boolean') {
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
    });
  }
);

function goBack() {
  location.assign(location.href.split('/').slice(0, -1).join('/'));
}
