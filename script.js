/**
 * コード進行生成アルゴリズムのデータソース
 * 
 * 【アルゴリズムの概要】
 * - 事前定義された25種類のコード進行から1つをランダム選択
 * - 各コード進行は音楽理論に基づいて選定済み
 * - 主にCメジャー/Aマイナーキーで構成
 * 
 * 【選択確率】
 * - 各コード進行: 1/25 = 4% (均等分布)
 * 
 * 【音楽理論的背景】
 * - I-vi-IV-V: 最もポピュラーなコード進行
 * - vi-IV-I-V: ポップスでよく使用される
 * - 循環コード、ケーデンス等を含む
 */
const musicData = {
    chordProgressions: [
        'C - Am - F - G',    // I-vi-IV-V (最もポピュラー)
        'Am - F - C - G',    // vi-IV-I-V (ポップス定番)
        'C - F - Am - G',    // I-IV-vi-V (バラード系)
        'G - Am - F - C',    // V-vi-IV-I (逆循環)
        'F - C - G - Am',    // IV-I-V-vi (ブルース系)
        'Em - Am - D - G',   // ii-vi-II-V (ジャズ的)
        'C - G - Am - F',    // I-V-vi-IV (ロック定番)
        'Am - Dm - G - C',   // vi-ii-V-I (完全終止)
        'F - G - Em - Am',   // IV-V-iii-vi (マイナー系)
        'C - Am - Dm - G',   // I-vi-ii-V (循環コード)
        'Dm - G - C - Am',   // ii-V-I-vi (ジャズ進行)
        'G - Em - C - D',    // V-iii-I-II (ブライト系)
        'Am - F - G - Em',   // vi-IV-V-iii (感情的)
        'C - Em - F - G',    // I-iii-IV-V (クラシック)
        'F - Am - G - C',    // IV-vi-V-I (安定系)
        'Dm - Am - G - F',   // ii-vi-V-IV (モダン)
        'C - F - G - C',     // I-IV-V-I (基本形)
        'Am - Dm - F - G',   // vi-ii-IV-V (展開形)
        'G - C - Em - Am',   // V-I-iii-vi (明るい系)
        'F - G - C - F',     // IV-V-I-IV (復帰型)
        'Em - C - G - D',    // iii-I-V-II (ドラマティック)
        'Am - G - F - E',    // vi-V-IV-III (下降型)
        'C - Dm - Em - F',   // I-ii-iii-IV (上行型)
        'G - F - Em - Dm',   // V-IV-iii-ii (下行型)
        'Am - C - F - Dm'    // vi-I-IV-ii (変化型)
    ],
    
    /**
     * 楽器ランダム選定アルゴリズムのデータソース
     * 
     * 【アルゴリズムの概要】
     * - 25種類の楽器組み合わせから1つをランダム選択
     * - 各組み合わせは音楽的に相性の良い楽器で構成
     * - 様々なジャンル・スタイルをカバー
     * 
     * 【選択確率】
     * - 各楽器組み合わせ: 1/25 = 4% (均等分布)
     * 
     * 【カテゴリ分類】
     * - アコースティック系: ピアノ+ギター、ウクレレ+カホン等
     * - エレクトリック系: エレキギター+ベース+ドラム等
     * - オーケストラ系: バイオリン+ピアノ、ストリングス系等
     * - ワールドミュージック系: バンジョー+フィドル、カリンバ等
     * - ジャズ系: ジャズギター+ブラシドラム等
     */
    instruments: [
        'ピアノ + ギター',                    // クラシック・ポップス (アコースティック)
        'アコースティックギター + ヴォーカル',   // フォーク・シンガーソングライター
        'エレキギター + ベース + ドラム',        // ロック・ポップス (電子楽器)
        'シンセサイザー + パッド',              // エレクトロニック・アンビエント
        'バイオリン + ピアノ',                 // クラシック・ネオクラシカル
        'ウクレレ + カホン',                   // トロピカル・リラックス
        'フルート + ハープ',                   // ファンタジー・ヒーリング
        'サックス + ピアノ',                   // ジャズ・ブルース
        'チェロ + ギター',                     // チェンバー・インディー
        'ドラム + ベース + シンセ',            // ファンク・ディスコ
        'オルガン + ヴォーカル',               // ゴスペル・ソウル
        'アコーディオン + バンジョー',          // フォーク・カントリー
        'トランペット + ピアノ',               // ジャズ・ブラス
        'ギター + ストリングス',               // オーケストラポップ
        'エレピ + ベース',                     // R&B・ネオソウル
        'マリンバ + フルート',                 // ワールド・エスニック
        'ハーモニカ + ギター',                 // ブルース・フォーク
        'オーボエ + ピアノ',                   // クラシック・映画音楽
        'バンジョー + フィドル',               // カントリー・ブルーグラス
        'シンセベース + パッド',               // エレクトロニック・チルアウト
        'クラリネット + ストリングス',          // クラシック・映画音楽
        'ジャズギター + ブラシドラム',          // ジャズ・ラウンジ
        'ティンパニ + オーケストラ',           // クラシック・壮大
        'エレキバイオリン + シンセ',           // モダン・エレクトロニック
        'カリンバ + アンビエント'              // ワールド・ヒーリング
    ]
};

// DOM elements
const generateBtn = document.getElementById('generateBtn');
const resultArea = document.getElementById('resultArea');
const chordValue = document.getElementById('chordValue');
const instrumentValue = document.getElementById('instrumentValue');
const algorithmSelect = document.getElementById('algorithmSelect');

// アルゴリズムモード管理
let algorithmMode = 'simple'; // 'simple' または 'advanced'

/**
 * アルゴリズムモード切り替え機能
 * @param {string} mode - 'simple' または 'advanced'
 */
function setAlgorithmMode(mode) {
    algorithmMode = mode;
    if (algorithmSelect) {
        algorithmSelect.value = mode;
    }
    console.log(`🎵 Algorithm mode changed to: ${mode}`);
}

/**
 * ランダム選択アルゴリズム - 核となるユーティリティ関数
 * 
 * 【アルゴリズムの詳細】
 * 1. Math.random(): 0以上1未満の疑似乱数を生成
 * 2. array.length倍: 乱数を配列のインデックス範囲(0〜length-1)に拡大
 * 3. Math.floor(): 小数点以下を切り捨てて整数インデックスに変換
 * 4. 配列アクセス: 計算されたインデックスで要素を取得
 * 
 * 【数学的表現】
 * index = Math.floor(Math.random() * array.length)
 * selected_item = array[index]
 * 
 * 【確率分布】
 * - 各要素の選択確率: 1/array.length
 * - 25要素配列の場合: 各要素4%の確率で選択
 * - 完全な均等分布を実現
 * 
 * 【時間計算量】O(1) - 定数時間
 * 【空間計算量】O(1) - 定数空間
 * 
 * @param {Array} array - 選択対象の配列
 * @returns {*} 配列からランダムに選択された要素
 */
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Animation helper functions
function animateValueChange(element, newValue, delay = 0) {
    setTimeout(() => {
        element.style.transform = 'translateX(-10px)';
        element.style.opacity = '0.7';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        }, 150);
    }, delay);
}

/**
 * メインアルゴリズム実行関数 - コード進行と楽器をランダム生成
 * 
 * 【処理フロー】
 * 1. UI状態管理: ローディング状態を設定
 * 2. アルゴリズム実行: 
 *    - モードに応じてSimple/Advancedアルゴリズムを選択
 *    - コード進行をランダム選択/生成
 *    - 楽器組み合わせをランダム選択/生成
 * 3. 結果表示: アニメーション付きでUIに反映
 * 4. 状態復元: ローディング状態を解除
 * 
 * 【アルゴリズムの特徴】
 * Simple Mode:
 * - 2つの独立したランダム選択を並行実行
 * - 各選択は他に影響されない（独立性）
 * - 総合確率: 1/25 × 1/25 = 1/625 (各組み合わせ0.16%)
 * 
 * Advanced Mode:
 * - 音楽理論に基づく動的生成
 * - ジャンル・ムード・キーを考慮した関連性のある選択
 * - より音楽的に整合性のある組み合わせを生成
 * 
 * 【ユーザビリティ考慮】
 * - 人工的な遅延でローディング感を演出
 * - 段階的なアニメーションで視覚的フィードバック
 * - ボタン無効化で重複実行を防止
 */
function generateChallenge() {
    // UI状態管理 - ローディング開始
    generateBtn.classList.add('loading');
    generateBtn.disabled = true;
    
    // 視覚的フィードバック - 結果エリア一時隠し
    resultArea.style.transform = 'translateY(10px)';
    resultArea.style.opacity = '0.8';
    
    // 【核心アルゴリズム実行部分】
    let randomChord, randomInstrument, metadata = {};
    
    if (algorithmMode === 'advanced' && window.AlgorithmManager) {
        // 拡張アルゴリズム使用
        const result = window.AlgorithmManager.generateAdvancedChallenge();
        randomChord = result.chord;
        randomInstrument = result.instrument;
        metadata = result.metadata;
        console.log('🎵 Advanced algorithm result:', metadata);
    } else {
        // シンプルアルゴリズム使用（デフォルト）
        randomChord = getRandomItem(musicData.chordProgressions);
        randomInstrument = getRandomItem(musicData.instruments);
        metadata = { mode: 'simple' };
        console.log('🎵 Simple algorithm used');
    }
    
    // UX向上のための人工的遅延とアニメーション
    setTimeout(() => {
        // 結果表示 - 段階的アニメーション
        animateValueChange(chordValue, randomChord, 0);
        animateValueChange(instrumentValue, randomInstrument, 200);
        
        // メタデータをデータ属性として保存（デバッグ用）
        resultArea.dataset.metadata = JSON.stringify(metadata);
        
        // UI復元処理
        setTimeout(() => {
            resultArea.classList.add('show');
            resultArea.style.transform = 'translateY(0)';
            resultArea.style.opacity = '1';
        }, 400);
        
        // ローディング状態解除
        setTimeout(() => {
            generateBtn.classList.remove('loading');
            generateBtn.disabled = false;
        }, 600);
        
    }, 800);
}

// Event listeners
generateBtn.addEventListener('click', generateChallenge);

// Algorithm selector event listener
if (algorithmSelect) {
    algorithmSelect.addEventListener('change', function() {
        setAlgorithmMode(this.value);
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !generateBtn.disabled) {
        event.preventDefault();
        generateChallenge();
    }
});

// Add some interactive hover effects
document.querySelectorAll('.result-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to button
generateBtn.addEventListener('mousedown', function() {
    this.style.transform = 'translateY(2px) scale(0.98)';
});

generateBtn.addEventListener('mouseup', function() {
    this.style.transform = 'translateY(-2px) scale(1)';
});

generateBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
});

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Add entrance animation to elements
    const elements = document.querySelectorAll('.challenge-card, .header, .footer');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    console.log('🎵 1Week Music Challenge - Ready to generate topics!');
    console.log('🎵 Current algorithm mode:', algorithmMode);
    console.log('🎵 Enhanced algorithms available:', !!window.AlgorithmManager);
    
    // 開発者向け: アルゴリズムモード切り替え関数をグローバルに公開
    window.setAlgorithmMode = setAlgorithmMode;
    window.getCurrentMode = () => algorithmMode;
});