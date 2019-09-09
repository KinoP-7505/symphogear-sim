<template>
  <div class="title">
    <div>
      <span>最終決戦</span>
    </div>
    <div>
      <button @click="onClickStart">{{buttonLabel}}</button>
    </div>
    <div>
      <span>{{panels[0]}}</span>
    </div>
    <div>
      <span>{{panels[1]}}</span>
    </div>
    <div>
      <span>{{panels[2]}}</span>
    </div>
    <div>
      <span>{{panels[3]}}</span>
    </div>
    <div>
      <span>{{panels[4]}}</span>
    </div>
  </div>
</template>
<script>
import utils from '@/utility/utils.js'
import BonusInfo from '@/dto/BonusInfo.js'
export default {
  name: 'LastBattle',
  data () {
    let panels = [
      'パネル１',
      'パネル２',
      'パネル３',
      'パネル４',
      'パネル５'
    ]
    return {
      status: 0,  // 現在のボタン状態
      panels: panels,  // パネル情報
      stock: []  // 内部５回の当落情報
    }
  },
  computed: {
    buttonLabel: function () {
      let label = ''
      // ボタン名を変える
      switch (this.status) {
        case 0:
            label = '右を狙って！！'
            break
        case 1:
            label = '１戦目の結果'
            break
        case 2:
            label = '２戦目の結果'
            break
        case 3:
            label = '３戦目の結果'
            break
        case 4:
            label = '４戦目の結果'
            break
        case 5:
            label = '５戦目の結果'
            break
        case 6:
            label = '不承不承ながら左打ちしましょう'
            break
        case 99:
            label = 'ＳＣ突入'
            break
        default:
            label = 'リセット'
            break
      }
      return label
    }
  },
  methods: {
    onClickStart: function() {
      if (this.status === 0) {
        // 最終決戦抽選とキャラパネル表示
        this.$store.dispatch('lotStock')
        // ディープコピーを行う
        this.stock = this.$store.state.lotStock
        for (let index = 0; index < 5; index++) {
          let panel = utils.getLastBattleCharactor(this.stock[index].id)
          this.panels[index] = panel.name
          console.log('stock result', `index[${index}] : ${this.stock[index].label}`)
        }
      } else if (1 <= this.status && this.status <= 5) {
        let idx = this.status - 1
        if (this.stock[0].id > 0) {
          // 当選
          this.panels[idx] = this.panels[idx] + '　>>> 勝利 ' + this.stock[0].label
          // ボーナス情報を記録する
          let bonus = new BonusInfo(
            this.$store.getters.nextBonusIndex,
            this.status,
            this.stock[0].id,
            this.stock[0].label,
            this.stock[0].lot
          )
          console.log('BonusInfo', bonus)
          this.$store.commit('saveBonus', bonus)
          let payload = {
            type: bonus.type,
            mode: 2,
            count: bonus.count
          }
          // this.$store.commit('GameInfo/updateHisBonusType', payload)
          // ゲーム数をコストへ  costTama, loseCost
          this.$store.dispatch('GameInfo/playGame', payload)          

          // VStock判定
          this.$store.commit('saveVStock')
          let numVStock = this.$store.getters.numVStock
          console.log('VStock', numVStock)
          if (numVStock > 0) {
            // VStock数を表示
            this.panels[idx] = this.panels[idx] + ` >>> [VStock ${numVStock}]`
          } 

          // 勝利時は状態を勝利に書き換える
          this.status = 99

          return
        } else {
          // 5戦目の敗北
          if (this.status === 5) {
            this.panels[idx] += ' >>> わたしは勝機を零しました'
            let payload = {
              index: 0,
              mode: 3,
              count: 5
            }
            this.$store.commit('GameInfo/updateHisBonusType', payload)
          } else {
            this.panels[idx] += ' >>> 敗北'
          }
        }
        // Stock[0]を削除する
        this.$store.commit('shiftLot')
      } else if (this.status === 99) {
        // Stock[0]を削除する
        this.$store.commit('shiftLot')
        // ＳＣ画面へ遷移する
        this.$store.commit('saveScreenName', 3)
        return
      } else if (this.status === 6) {
        // 結果画面へ
        console.log('最終決戦敗北')
        this.$store.commit('saveScreenName', 4)
      }
      // 状態を１上げる
      ++this.status
    }
  }
}
</script>
