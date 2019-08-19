<template>
  <div class="title">
    <div>
      <span>シンフォギアチャンス</span>
    </div>
    <div>
      <span>{{showBonusCount}}</span>
    </div>
    <div>
      <button @click="onClickStart">{{buttonLabel}}</button>
    </div>
    <div>
      <div v-for="msg in messages" :key="msg">{{msg}}</div>
    </div>
  </div>
</template>
<script>
// import utils from '@/utility/utils.js'
import BonusInfo from '@/dto/BonusInfo.js'

export default {
  name: 'SymphogearChance',
  data () {
    return {
      winFlg: false,
      count: 0,  // チャンス回数
      messages: [] // 結果Messageを配列で
    }
  },
  computed: {
    // Ｘ唱目
    showBonusCount: function () {
      let count = this.$store.state.bonusHistory.length
      return `${count}唱目`
    },
    buttonLabel: function () {
      if (this.winFlg) {
        return 'チャンス継続'
      } else if (this.count <= 7) {
        return 'ＳＣ開始' 
      } else if (this.count <= 11) {
        return '流れ星判定'
      }
      return 'ＳＣ終了'
    },
    // lotStock[0]参照
    lot0: function () {
      return this.$store.state.lotStock[0]
    }
  },
  methods: {
    // 初期化処理
    initSC: function() {
      this.winFlg = false // 勝利フラグ
      this.count = 0  // カウント
      this.messages = []  // メッセージ
    },
    // ボタン処理
    onClickStart: function() {
      // 勝利判定ＯＮの場合
      if (this.winFlg) {
        // ボーナス履歴保存
        this.saveBonus()
        // ＳＣ初期化
        this.initSC()
        // Stock[0]を削除する
        this.$store.commit('shiftLot')          

        // 処理終了
        return
      } else if (this.count > 11) {
        // 結果画面へ遷移
        this.$store.commit('saveScreenName', 4)
      }

      // カウント数アップ
      ++this.count 
      // count7以下の場合抽選を行う（保留ストック）
      if (this.count <= 7) {
        this.$store.dispatch('lotStock')
        console.log('SC', `count = ${this.count} // lotRes = ${this.lot0.id}`) 
      } else {
        console.log('SC', this.lot0) 
      }

      // SC抽選表示
      if (this.count <= 7) {
        let msg = `BATTELE ${this.count}`

        // 当選判定
        if (this.lot0.id === 0) {
          // ハズレ
          msg += ' | 敗北' 
          // Stock[0]を削除する
          this.$store.commit('shiftLot')          
        } else {
          // 当選
          if (this.lot0.vStock) {
            // vStock告知済み
            msg += ' | 勝利 >>> ' + this.lot0.label
          } else {
            // vStock判定を行う
            msg += ' | 勝利 >>> ' + this.lot0.label
          }
          // 勝利フラグON
          this.winFlg = true
        }
        this.messages.push(msg)
      } else if (this.count <= 11) {
        console.log('流れ星判定')
        // 流れ星判定（保留当選）
        while (this.count < 12) {
          // 保留にあたりがある場合
          if (this.lot0.id > 0) {
            this.winFlg = true
            // 処理終了
            break
          }
          // カウント数アップ
          ++this.count
          // Stock[0]を削除する
          this.$store.commit('shiftLot')
        }

        // 流れ星成功
        if (this.winFlg) {
          // 流れ星当選
          let msg = `まだ響と流れ星を見ていない！（抽選${this.count}回目当選 >>> ${this.lot0.label}` 
          this.messages.push(msg)          
        } else {
          // 流れ星失敗
          this.messages.push('流れ星ありませんでした')
          this.messages.push('ＳＣ終了')
        }
      }
    },
    // ボーナス履歴保存
    saveBonus: function(count) {
      // ボーナス情報を記録する
      let bonus = new BonusInfo(
        this.$store.getters.nextBonusIndex,
        count,
        this.lot0.id,
        this.lot0.label,
        this.lot0.lot
      )
      console.log('BonusInfo', bonus)
      this.$store.commit('saveBonus', bonus)      
    }
  }
}
</script>