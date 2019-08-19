'use strict'
// 抽選定数
const maxLot = 14865120
const lose = {
    id: 0,
    value: 12792720,
    label: 'ハズレ'
}
const ra4R = {
    id: 1,
    value: 999000,
    label: '電チュー４Ｒ'
}
const ra8R = {
    id: 2,
    value: 139860,
    label: '電チュー８Ｒ'
}
const ra12R = {
    id: 3,
    value: 59940,
    label: '電チュー１２Ｒ'
}
const ra15R = {
    id: 4,
    value: 799200,
    label: '電チュー１５Ｒ'
}
const normal4R = {
    id: 5,
    value: 73656,
    label: '通常４Ｒ'
}
const normal15R = {
    id: 6,
    value: 744,
    label: '通常１５Ｒ'
}
// 右打ちV入賞振分定数
/*
const v4R = {
    value: 50,
    label: 'Ｖ入賞４Ｒ'
}
const v8R = {
    value: 7,
    label: 'Ｖ入賞８Ｒ'
}
const v12R = {
    value: 3,
    label: 'Ｖ入賞１２Ｒ'
}
const v15R = {
    value: 40,
    label: 'Ｖ入賞１５Ｒ'
}
*/

const lastBattlePannel = [
    { type: 0, name: '未抽選' },
    { type: 1, name: 'クリス' },
    { type: 2, name: 'さきもり' },
    { type: 3, name: 'ビッキー' },
    { type: 4, name: '絶唱' },
    { type: 5, name: '全員' },
    { type: 77, name: 'ＷＩＮ' },
    { type: 88, name: 'ＬＯＳＥ' }
]

// 通常状態の抽選
function normalLot() {
    let count = 0
    let hitFlg = true
    let res = {}
    while (hitFlg) {
        ++count
        res = randamLot()
        // 4R,15R当選の場合はループ終了
        if (res.id === 5 || res.id === 6) {
            hitFlg = false
        }
    }
    // 抽選結果をオブジェクトに詰めて返却
    return {
        count: count,
        id: res.id,
        label: res.label
    }
}

// 抽選と結果を返す
function randamLot() {
    let lot = Math.floor(Math.random()*maxLot)
    let result = getLotResult(lot)
    return {
        lot: lot,
        id: result.id,
        label: result.label,
        vStock: false
    }
}

// 抽選結果
// result 0: ハズレ
// result 1: 右打ちアタリ4R
// result 2: 右打ちアタリ8R
// result 3: 右打ちアタリ12R
// result 4: 右打ちアタリ15R
// result 5: 通常4R
// result 6: 通常15R
function getLotResult(value) {
    let result = {}
    // 判定閾値
    let res0Val = lose.value
    let res1Val = res0Val + ra4R.value
    let res2Val = res1Val + ra8R.value
    let res3Val = res2Val + ra12R.value
    let res4Val = res3Val + ra15R.value
    let res5Val = res4Val + normal4R.value

    if (value < res0Val) {
        result = lose
    } else if (value < res1Val) {
        result = ra4R
    } else if (value < res2Val) {
        result = ra8R
    } else if (value < res3Val) {
        result = ra12R
    } else if (value < res4Val) {
        result = ra15R
    } else if (value < res5Val) {
        result = normal4R
    } else {
        result = normal15R
    }
    // 結果返却
    // id, value, labelのobj
    return result
}

// 最終決戦のパネルを取得する
function getLastBattleCharactor(result) {
    let panelType = 0
    if (result === 0) {
        panelType = patternLoseLBC()
    } else {
        panelType = patternWinLBC()
    }
    // パネルobjを返す
    return lastBattlePannel[panelType]
}

// 最終決戦敗北時パネル
function patternLoseLBC() {
    let lot = Math.floor(Math.random()*251)
    let type = 0
    // 選択パネル
    if (lot < 92) {
        // ちょせえ
        type = 1
    } else if (lot < (92 + 91)) {
        // 防人
        type = 2
    } else if (lot < (92 + 91 + 60)) {
        // ビッキー
        type = 3
    } else {
        // 絶唱
        type = 4
    }
    return type
}

// 最終決戦勝利時パネル
function patternWinLBC() {
    let lot = Math.floor(Math.random()*313)
    let type = 0
    // 選択パネル
    if (lot < 53) {
        // ちょせえ
        type = 1
    } else if (lot < (53 + 55)) {
        // 防人
        type = 2
    } else if (lot < (53 + 55 + 113)) {
        // ビッキー
        type = 3
    } else {
        // 絶唱
        type = 4
    }
    return type
}

const utils = {
    normalLot,
    randamLot,
    getLastBattleCharactor,
    lose,
    ra4R, ra8R, ra12R, ra15R,
    normal4R,
    normal15R,
    lastBattlePannel
}
export default utils
export {
    normalLot,
    getLastBattleCharactor,
    lose,
    ra4R, ra8R, ra12R, ra15R,
    normal4R,
    normal15R,
    getLotResult,
    lastBattlePannel
}
