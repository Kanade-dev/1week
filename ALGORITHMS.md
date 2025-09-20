# アルゴリズム説明 - Algorithm Documentation

## 概要

このドキュメントでは、1Week Music Challengeアプリで使用されているコード進行の生成アルゴリズムと楽器のランダム選定アルゴリズムについて詳しく説明します。

## 1. コード進行生成アルゴリズム

### 現在の実装

コード進行の生成は、事前に定義された25種類のコード進行から1つをランダムに選択する方式を採用しています。

#### データ構造
```javascript
const musicData = {
    chordProgressions: [
        'C - Am - F - G',    // I-vi-IV-V (Cメジャーキー)
        'Am - F - C - G',    // vi-IV-I-V 
        'C - F - Am - G',    // I-IV-vi-V
        // ... 計25種類
    ]
};
```

#### アルゴリズムの流れ
1. **入力**: なし（ユーザーのボタンクリック）
2. **処理**: 
   - `getRandomItem(musicData.chordProgressions)` 関数を呼び出し
   - `Math.random()` を使用して0-1の乱数を生成
   - 配列の長さ（25）を掛けて0-24.999...の範囲に変換
   - `Math.floor()` で整数に変換（0-24のインデックス）
   - 該当インデックスのコード進行を返却
3. **出力**: 選択されたコード進行文字列

#### 数学的表現
```
index = Math.floor(Math.random() * array.length)
selected_chord = chordProgressions[index]
```

### 特徴とメリット
- **シンプル**: 実装が簡単で理解しやすい
- **予測可能**: 音楽的に成立するコード進行のみを提供
- **多様性**: 25種類の異なるパターンを提供
- **パフォーマンス**: O(1)の時間計算量

### 制限事項
- **静的**: 新しいコード進行は生成されない
- **キー固定**: 主にCメジャー/Aマイナーキーに限定
- **理論的拡張性なし**: 音楽理論に基づく動的生成はなし

## 2. 楽器ランダム選定アルゴリズム

### 現在の実装

楽器の選定も同様に、事前に定義された25種類の楽器組み合わせから1つをランダムに選択します。

#### データ構造
```javascript
const musicData = {
    instruments: [
        'ピアノ + ギター',
        'アコースティックギター + ヴォーカル',
        'エレキギター + ベース + ドラム',
        // ... 計25種類
    ]
};
```

#### アルゴリズムの流れ
1. **入力**: なし（コード進行と同時に実行）
2. **処理**: コード進行と同じ`getRandomItem()`関数を使用
3. **出力**: 選択された楽器組み合わせ文字列

### 特徴とメリット
- **バランス**: 楽器の組み合わせが音楽的に妥当
- **多様性**: アコースティックからエレクトロニックまで幅広い選択肢
- **ジャンル配慮**: 異なる音楽ジャンルに対応

## 3. 共通のユーティリティ関数

### `getRandomItem(array)` 関数

```javascript
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}
```

#### 動作原理
1. `Math.random()`: 0以上1未満の疑似乱数を生成
2. `array.length`: 配列の要素数を取得
3. 乗算: 乱数を配列のインデックス範囲に拡大
4. `Math.floor()`: 小数点以下を切り捨てて整数インデックス化
5. 配列アクセス: 計算されたインデックスで要素を取得

#### 確率分布
- 各要素が選択される確率: `1/array.length = 1/25 = 4%`
- 均等分布: すべての要素が同じ確率で選択される

## 4. 実行フロー

### `generateChallenge()` 関数での処理順序

```javascript
function generateChallenge() {
    // 1. UI状態の更新（ローディング表示）
    generateBtn.classList.add('loading');
    generateBtn.disabled = true;
    
    // 2. アルゴリズムの実行
    const randomChord = getRandomItem(musicData.chordProgressions);
    const randomInstrument = getRandomItem(musicData.instruments);
    
    // 3. 結果の表示（アニメーション付き）
    animateValueChange(chordValue, randomChord, 0);
    animateValueChange(instrumentValue, randomInstrument, 200);
    
    // 4. UI状態の復元
    // ...
}
```

## 5. パフォーマンス分析

### 時間計算量
- コード進行選択: O(1)
- 楽器選択: O(1)
- 全体: O(1)

### 空間計算量
- データ保存: O(n) ただしnは固定値（25×2=50要素）
- 実行時: O(1)

## 6. 改善案（将来の拡張可能性）

### 6.1 動的コード進行生成
```javascript
// 音楽理論に基づくコード進行生成の例
function generateChordProgression(key, length = 4) {
    const scales = {
        'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
        'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
        // ... 他のキー
    };
    
    const progressionRules = [
        [0, 5, 3, 4], // I-vi-IV-V
        [5, 3, 0, 4], // vi-IV-I-V
        // ... 他のパターン
    ];
    
    // ランダムなキーとパターンを選択
    // 選択されたパターンに基づいてコード進行を構築
}
```

### 6.2 インテリジェント楽器選択
```javascript
// ジャンルやムードに基づく楽器選択の例
function selectInstruments(genre, mood, chordProgression) {
    const instrumentsByGenre = {
        'rock': ['エレキギター', 'ベース', 'ドラム'],
        'jazz': ['ピアノ', 'ベース', 'ドラム', 'サックス'],
        'classical': ['ピアノ', 'バイオリン', 'チェロ']
    };
    
    // ジャンルとムードに基づいて楽器を動的に選択
}
```

### 6.3 機械学習による生成
- ユーザーの選択履歴を学習
- 好みに基づいたパーソナライズされた提案
- より高度な音楽理論の適用

## 7. まとめ

現在のアルゴリズムは、シンプルで効率的な実装により、確実に音楽的に妥当な結果を提供します。将来的には、音楽理論に基づく動的生成や機械学習を活用した改善が可能です。