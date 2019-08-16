'use strict'
// 抽選定数
const maxLot = 14865120
const lose = {
    id: 0,
    value: 12792720,
    label: 'ハズレ'
}
const rightAttack = {
    id: 1,
    value: 1998000,
    label: '右打ち当選'
}
const normal4R = {
    id: 2,
    value: 73656,
    label: '通常４Ｒ'
}
const normal15R = {
    id: 3,
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

// 通常状態の抽選
function normalLot() {
    let count = 0
    let hitFlg = true
    let res = {}
    while (hitFlg) {
        ++count
        res = randamLot()
        // 4R,15R当選の場合はループ終了
        if (res.result > 1) {
            hitFlg = false
        }
    }
    // 抽選結果をオブジェクトに詰めて返却
    return {
        count: count,
        lotResult: res.result
    }
}

// 抽選と結果を返す
function randamLot() {
    let lot = Math.floor(Math.random()*maxLot)
    let result = getLotResult(lot)
    return {
        lot: lot,
        result: result
    }
}

// 抽選結果
// result 0: ハズレ
// result 1: 右打ちアタリ
// result 2: 通常4R
// result 3: 通常15R
function getLotResult(value) {
    let result = 0
    let roopFlg = true
    let calcValue = value
    // ハズレ判定
    if (value < lose.value) {
        roopFlg = false
    }
    while (roopFlg) {
        ++result
        // console.log('calcValue = ', calcValue)
        switch (result) {
            case rightAttack.id:  // 右打ち判定
                calcValue -= lose.value
                if (calcValue < rightAttack.value) {
                    roopFlg = false
                }
                break
            case normal4R.id:  // 4R判定
                calcValue -= rightAttack.value
                if (calcValue < normal4R.value) {
                    roopFlg = false
                }
                break
            case normal15R.id:  //15R判定
                calcValue -= normal4R.value
                if (calcValue < normal15R.value) {
                    roopFlg = false
                }
                break
            default:
                roopFlg = false
                break
        }
    }
    // console.log('result calcValue = ', calcValue)

    // 結果返却
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

// 最終決戦勝利時パネル
function patternWinLBC() {
    let lot = Math.floor(Math.random()*7)
    let type = 0
    // 選択パネル
    if (lot < 2) {
        // ちょせえ
        type = 1
    } else if (lot < 4) {
        // 防人
        type = 2
    } else if (lot < 6) {
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
    rightAttack,
    normal4R,
    normal15R,
    lastBattlePannel
}
export default utils
export {
    normalLot,
    getLastBattleCharactor,
    lose,
    rightAttack,
    normal4R,
    normal15R,
    getLotResult,
    lastBattlePannel
}
