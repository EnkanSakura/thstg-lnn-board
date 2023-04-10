// boolean row List
const boolKeyList = [
  'rep', 'live', 'record', 'hand', 'key', 'screen', 'link'
];
// id2name map
const gameMap = {
  '01': {'zh': '灵异传', 'en': 'HRtP'},
  '02': {'zh': '封魔录', 'en': 'SoEW'},
  '03': {'zh': '梦时空', 'en': 'PoDD'},
  '04': {'zh': '幻想乡', 'en': 'LLS'},
  '05': {'zh': '怪绮谈', 'en': 'MS'},
  '06': {'zh': '红魔乡', 'en': 'EoSD'},
  '07': {'zh': '妖妖梦', 'en': 'PCB'},
  '08': {'zh': '永夜抄', 'en': 'IN'},
  '09': {'zh': '花映冢', 'en': 'PoFV'},
  '10': {'zh': '风神录', 'en': 'MoF'},
  '11': {'zh': '地灵殿', 'en': 'SA'},
  '12': {'zh': '星莲船', 'en': 'UFO'},
  '13': {'zh': '神灵庙', 'en': 'TD'},
  '14': {'zh': '辉针城', 'en': 'DDC'},
  '15': {'zh': '绀珠传', 'en': 'LoLK'},
  '16': {'zh': '天空璋', 'en': 'HSiFS'},
  '17': {'zh': '鬼形兽', 'en': 'WBaWC'},
  '18': {'zh': '虹龙洞', 'en': 'UM'},
  '128': {'zh': '妖精大战争', 'en': 'GFW'}
}

// get current page language
const lang = document.querySelector('html').lang;

// get current page json file name
const url = new URL(window.location.href);
const page = url.pathname.split('/').pop();
const tableData = page.replace('.html', '.json');

// load json data
fetch(`data/${tableData}`)
  .then(response => response.json())
  .then(data => {
    // get table element
    const table = document.querySelector('tbody');
    // sort by id
    let idList = Object.keys(data).sort(function (a, b) {
      const aid = a.replace(' ', '').split('-');
      const bid = b.replace(' ', '').split('-');
      if (aid[1].localeCompare(bid[1]) === 0) {
        return aid[0].localeCompare(bid[0]);
      } else {
        return aid[1].localeCompare(bid[1]);
      }
    });
    // render table data
    idList.forEach(id => {
      const userData = data[id];
      let isIdRow = true;
      // sort by game
      let gameList = Object.keys(userData).sort(function (a, b) {
        return parseInt(a) - parseInt(b);
      });
      gameList.forEach(game => {
        const recordData = userData[game];
        let isGameRow = true;
        recordData.forEach(record => {
          const row = document.createElement('tr');
          if (isIdRow) {
            // add id row, merge row
            const idCell = document.createElement('td');
            let rowspan = 0;
            gameList.forEach(game => {
              rowspan += userData[game].length;
            });
            idCell.rowSpan = rowspan;
            idCell.textContent = id;
            row.appendChild(idCell);
            isIdRow = false;
          }
          for (let key in record) {
            if (isGameRow) {
              // add game row, merge row
              const gameCell = document.createElement('td');
              gameCell.rowSpan = recordData.length;
              gameCell.textContent = gameMap[game][lang.split('-')[0]];
              row.appendChild(gameCell);
              isGameRow = false;
            }
            const cell = document.createElement('td');
            if (boolKeyList.indexOf(key) !== -1) {
              if (record[key] === '' || record[key] === null) {
                // empty value, TODO: data need to be fixed
                cell.textContent = '-';
              }
              else if (typeof(record[key]) === 'boolean') {
                // boolean value
                cell.textContent = record[key] ? '√' : '×';
              }
              else {
                // if not boolean, it should be url
                // all string value will be treated as url
                const link = document.createElement('a');
                link.href = record[key];
                link.textContent = '查看';
                link.target = '_blank';
                link.className = 'btn btn-url'
                cell.appendChild(link);
              }
            }
            else {
              // normal string value
              cell.textContent = record[key];
            }
            row.appendChild(cell);
          }
          table.appendChild(row);
        });// end of recordData.forEach
      });// end of gameList.forEach
    });// end of idList.forEach
  }// end of fetch.then
);// end of fetch

function goBack() {
  location.assign(location.href.split('/').slice(0, -1).join('/'));
}
