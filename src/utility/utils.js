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
    let lot = 0
    let result = 0
    while (hitFlg) {
        ++count
        lot = Math.floor(Math.random()*maxLot)
        result = getLotResult(lot)
        // 4R,15R当選の場合はループ終了
        if (result > 1) {
            hitFlg = false
        }
    }
    // 抽選結果をオブジェクトに詰めて返却
    return {
        count: count,
        lotResult: result
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
        switch (result) {
            case rightAttack.id:  // 右打ち判定
                calcValue -= lose.value
                if (calcValue < rightAttack.value) {
                    roopFlg = false
                }
                break
            case normal4R.id:  // 4R判定
                calcValue -= lose.value
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
                break
        }
    }
    // 結果返却
    return result
}

const utils = {
    normalLot,
    lose,
    rightAttack,
    normal4R,
    normal15R
}
export default utils
export {
    normalLot,
    lose,
    rightAttack,
    normal4R,
    normal15R
}
