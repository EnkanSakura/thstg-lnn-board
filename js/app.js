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
    const table = document.querySelector('table');
    // 渲染表头
    const headerRow = document.createElement('tr');
    data[0].forEach(cellData => {
      const cell = document.createElement('th');
      cell.textContent = cellData;
      headerRow.appendChild(cell);
    });
    table.appendChild(headerRow);

    // 渲染表格数据
    for (let i = 1; i < data.length; i++) {
      const rowData = data[i];
      const row = document.createElement('tr');
      // rowData.forEach(cellData => {
      //   const cell = document.createElement('td');
      //   cell.textContent = cellData;
      //   row.appendChild(cell);
      // });
      for (let j = 0; j < rowData.length; j++) {
        const cell = document.createElement('td');
        if (page.startsWith('01_lnn') && j > 2) {
          cell.textContent = (rowData[j] == 1) ? '√' : '×';
          row.appendChild(cell);
        } else {
          cell.textContent = rowData[j];
          row.appendChild(cell);
        }
      }
      table.appendChild(row);
    }
  }
);

function goBack() {
  window.history.back();
}
