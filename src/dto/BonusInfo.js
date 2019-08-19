let BonusInfo = class {
    constructor(index, count, type, label, lotNum) {
      this.index = index  // インデックス（連番）
      this.count = count  // 抽選数
      this.type = type  // ボーナス種類
      this.label = label  // ラベル
      this.lotNumber = lotNum  // 抽選値
    }
    // ゲッター
    // get area() {
    //   return this.calcArea();
    // }
    // メソッド
    // calcArea() {
    //   return this.height * this.width;
    // }
}

export default BonusInfo