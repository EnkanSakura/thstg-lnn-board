//import { table } from './index-table.js';

defaultpage=`<div class="table-container">
            <h1>东方STG榜单</h1>
            <div class="btn-container">
                <div class="btn btn-index" onclick="showpage('01-official')">官作LNN</div>
                <div class="btn btn-index" onclick="showpage('02-doujin')">同人作LNN</div>
                <!--<div class="btn btn-index" onclick="location.href='03-chicken.html'">鸡</div> -->
            </div>
        </div>`

document.addEventListener('DOMContentLoaded', function() {
    var contentbody = document.querySelector('.contentbody');
    var left = document.querySelector('.left');
    contentbody.innerHTML = defaultpage;
    left.innerHTML = ``;
});

function goBack(){
    var contentbody = document.querySelector('.contentbody');
    var left = document.querySelector('.left');
    contentbody.innerHTML = defaultpage;
    left.innerHTML = ``;
}

async function showpage(id){
    var contentbody = document.querySelector('.contentbody');
    var left = document.querySelector('.left');
    left.innerHTML = `<div class="btn btn-back" onclick="goBack()">
    <img src="res/back.svg" alt="Back">
</div>`;
    if(id=='01-official'){
        title='官作LNN榜'
    }else if(id=='02-doujin'){
        title='同人作LNN榜'
    }
    contentbody.innerHTML = `
    <div class="table-container">
        <h1>${title}</h1>
        <table>
            <thead>
            <tr>
                <th>昵称 - 机签</th>
                <th>作品</th>
                <th>机体</th>
                <th>REP</th>
                <th>直播</th>
                <th>实录</th>
                <th>手元</th>
                <th>按键</th>
                <th>屏摄</th>
                <th>视频链接</th>
                <th>达成时间</th>
                <th>备注</th>
            </tr>
            </thead>
            <tbody>
                <!-- Insert table data here using JavaScript -->
            </tbody>
        </table>
        <div class="loadingtext"></div>
    </div>`
    var loadingtext = document.querySelector('.loadingtext');
    loadingtext.innerHTML = `<div class="loadingtext">正在加载...</div>`;
    await table(id);
    loadingtext.innerHTML = ``;
}

// boolean row List
const boolKeyList = [
    'rep', 'live', 'record', 'hand', 'key', 'screen', 'link'
];
// id2name map
const officialGameMap = {
    '01': { 'zh': '灵异传', 'en': 'HRtP' },
    '02': { 'zh': '封魔录', 'en': 'SoEW' },
    '03': { 'zh': '梦时空', 'en': 'PoDD' },
    '04': { 'zh': '幻想乡', 'en': 'LLS' },
    '05': { 'zh': '怪绮谈', 'en': 'MS' },
    '06': { 'zh': '红魔乡', 'en': 'EoSD' },
    '07': { 'zh': '妖妖梦', 'en': 'PCB' },
    '08': { 'zh': '永夜抄', 'en': 'IN' },
    '09': { 'zh': '花映冢', 'en': 'PoFV' },
    '10': { 'zh': '风神录', 'en': 'MoF' },
    '11': { 'zh': '地灵殿', 'en': 'SA' },
    '12': { 'zh': '星莲船', 'en': 'UFO' },
    '13': { 'zh': '神灵庙', 'en': 'TD' },
    '14': { 'zh': '辉针城', 'en': 'DDC' },
    '15': { 'zh': '绀珠传', 'en': 'LoLK' },
    '16': { 'zh': '天空璋', 'en': 'HSiFS' },
    '17': { 'zh': '鬼形兽', 'en': 'WBaWC' },
    '18': { 'zh': '虹龙洞', 'en': 'UM' },
    '128': { 'zh': '妖精大战争', 'en': 'GFW' }
}
const doujinGameMap = {
    '光': '光条阁',
    '夏': '夏夜祭',
    '幕1': '幕华祭 红月',
    '幕2': '幕华祭 春雪',
    '潮': '潮圣书',
    '祈': '祈华梦',
    '栖': '栖霞园',
    '花': '花逐夜',
    '雪': '雪莲华',
    '导': '导命树',
    '桃': '桃源宫',
    '白': '白尘记',
    '真': '真珠岛',
    '邪': '邪星章',
    '鬼': '鬼葬剑',
    '魔': '魔宝城',
    '琴': '琴鼓歌',
    '门': '门殊钱',
    '危': '危险领',
    '宵': '宵海格',
    '梦': '梦终剧',
    '海': '海惠堂',
    '臑': '臑茶魔',
    '妖': '妖精郷',
    '远': '远空界',
    '催': '催狐谭',
    '实': '实在相',
    '眠': '眠世界',
    '百': '百花宴'
}

// get current page language

async function table(pid){

    const lang = document.querySelector('html').lang;
    const tableData = pid+".json";
    //console.log(pid)
    // load json data
    await fetch(`data/${tableData}`)
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
                                if (pid === '02-doujin') {
                                    gameCell.textContent = doujinGameMap[game] || game;
                                    
                                } else {
                                    gameCell.textContent = officialGameMap[game][lang.split('-')[0]];
                                }
                                row.appendChild(gameCell);
                                isGameRow = false;
                            }
                            const cell = document.createElement('td');
                            if (boolKeyList.indexOf(key) !== -1) {
                                if (record[key] === '' || record[key] === null) {
                                    // empty value, TODO: data need to be fixed
                                    cell.textContent = '-';
                                }
                                else if (typeof (record[key]) === 'boolean') {
                                    // boolean value
                                    cell.textContent = record[key] ? '√' : '×';
                                }
                                else {
                                    // if not boolean, it should be url
                                    // all string value will be treated as url
                                    const link = document.createElement('a');
                                    ltmp = record[key].split(' ');
                                    link.href = record[key].split(' ')[0];
                                    link.textContent = ltmp[1] ? ltmp[1] : '查看';
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
    
}