/**
 * 拡張アルゴリズム実装 - Enhanced Algorithms
 * 
 * より高度なコード進行生成と楽器選択のアルゴリズム
 * 音楽理論に基づく動的生成機能を提供
 */

/**
 * 音楽理論データベース - Music Theory Database
 */
const musicTheory = {
    // 各キーのスケール定義
    keys: {
        'C': { major: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'], relative_minor: 'Am' },
        'G': { major: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'], relative_minor: 'Em' },
        'D': { major: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'], relative_minor: 'Bm' },
        'A': { major: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'], relative_minor: 'F#m' },
        'E': { major: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'], relative_minor: 'C#m' },
        'F': { major: ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'], relative_minor: 'Dm' }
    },

    // コード進行パターン（度数表記）
    progressionPatterns: [
        { name: 'ポップス王道', pattern: [0, 5, 3, 4], description: 'I-vi-IV-V' },
        { name: 'カノン進行', pattern: [0, 4, 5, 3, 0, 3, 4, 4], description: 'I-V-vi-IV-I-IV-V-V' },
        { name: '小室進行', pattern: [5, 3, 4, 0], description: 'vi-IV-V-I' },
        { name: 'ジャズ循環', pattern: [0, 5, 1, 4], description: 'I-vi-ii-V' },
        { name: 'ブルース', pattern: [0, 0, 3, 0, 4, 3, 0, 4], description: '12小節ブルース' },
        { name: 'ダイアトニック上行', pattern: [0, 1, 2, 3], description: 'I-ii-iii-IV' },
        { name: 'ダイアトニック下行', pattern: [4, 3, 2, 1], description: 'V-IV-iii-ii' },
        { name: 'ドミナント連鎖', pattern: [0, 6, 3, 4], description: 'I-vii°-IV-V' }
    ],

    // ジャンル別コード進行の重み
    genreWeights: {
        'pop': { patterns: [0, 1, 2], weight: [0.4, 0.3, 0.3] },
        'jazz': { patterns: [3, 4], weight: [0.6, 0.4] },
        'rock': { patterns: [0, 2, 6], weight: [0.5, 0.3, 0.2] },
        'classical': { patterns: [5, 6, 7], weight: [0.4, 0.3, 0.3] }
    }
};

/**
 * 楽器カテゴリデータベース
 */
const instrumentDatabase = {
    categories: {
        acoustic: {
            lead: ['アコースティックギター', 'ピアノ', 'バイオリン', 'フルート', 'ハーモニカ'],
            rhythm: ['アコースティックギター', 'ウクレレ', 'バンジョー'],
            bass: ['アップライトベース', 'アコースティックベース'],
            percussion: ['カホン', 'ボンゴ', 'タンバリン', 'シェイカー']
        },
        electric: {
            lead: ['エレキギター', 'シンセリード', 'エレキバイオリン', 'エレキピアノ'],
            rhythm: ['エレキギター', 'エレキピアノ', 'シンセパッド'],
            bass: ['エレキベース', 'シンセベース'],
            percussion: ['ドラムセット', 'エレクトロニックドラム']
        },
        orchestral: {
            strings: ['バイオリン', 'ビオラ', 'チェロ', 'コントラバス'],
            woodwind: ['フルート', 'オーボエ', 'クラリネット', 'ファゴット'],
            brass: ['トランペット', 'ホルン', 'トロンボーン', 'チューバ'],
            percussion: ['ティンパニ', 'グロッケン', 'ウッドブロック']
        },
        world: {
            string: ['シタール', 'カリンバ', 'ウード', 'バラライカ'],
            wind: ['尺八', 'ディジュリドゥ', 'バグパイプ'],
            percussion: ['タブラ', 'ジャンベ', 'マリンバ', 'ガムラン']
        }
    },

    // ジャンル別楽器選択ルール
    genreInstrumentRules: {
        'pop': {
            required: ['lead', 'rhythm', 'bass'],
            categories: ['acoustic', 'electric'],
            maxInstruments: 4
        },
        'jazz': {
            required: ['lead', 'rhythm', 'bass', 'percussion'],
            categories: ['acoustic', 'electric'],
            maxInstruments: 5
        },
        'orchestral': {
            required: ['strings', 'woodwind'],
            categories: ['orchestral'],
            maxInstruments: 6
        },
        'world': {
            required: ['string', 'percussion'],
            categories: ['world', 'acoustic'],
            maxInstruments: 3
        }
    }
};

/**
 * 拡張コード進行生成アルゴリズム
 * 音楽理論に基づいて動的にコード進行を生成
 */
class EnhancedChordProgressionGenerator {
    /**
     * 指定されたパラメータに基づいてコード進行を生成
     * @param {Object} options - 生成オプション
     * @param {string} options.key - キー (省略時はランダム)
     * @param {string} options.genre - ジャンル (省略時はランダム)
     * @param {number} options.length - 長さ (デフォルト: 4)
     * @returns {Object} 生成されたコード進行情報
     */
    static generate(options = {}) {
        const key = options.key || this.selectRandomKey();
        const genre = options.genre || this.selectRandomGenre();
        const length = options.length || 4;

        // ジャンルに基づくパターン選択
        const pattern = this.selectPatternByGenre(genre);
        
        // パターンを指定キーに変換
        const chords = this.convertPatternToChords(pattern, key, length);
        
        return {
            chords: chords.join(' - '),
            key: key,
            genre: genre,
            pattern: pattern,
            description: this.getProgressionDescription(pattern, genre)
        };
    }

    /**
     * ランダムキー選択
     */
    static selectRandomKey() {
        const keys = Object.keys(musicTheory.keys);
        return keys[Math.floor(Math.random() * keys.length)];
    }

    /**
     * ランダムジャンル選択
     */
    static selectRandomGenre() {
        const genres = Object.keys(musicTheory.genreWeights);
        return genres[Math.floor(Math.random() * genres.length)];
    }

    /**
     * ジャンルに基づくパターン選択（重み付き）
     */
    static selectPatternByGenre(genre) {
        const genreData = musicTheory.genreWeights[genre];
        if (!genreData) {
            // フォールバック: ランダム選択
            const patterns = musicTheory.progressionPatterns;
            return patterns[Math.floor(Math.random() * patterns.length)];
        }

        // 重み付きランダム選択
        const random = Math.random();
        let cumulativeWeight = 0;
        
        for (let i = 0; i < genreData.patterns.length; i++) {
            cumulativeWeight += genreData.weight[i];
            if (random <= cumulativeWeight) {
                return musicTheory.progressionPatterns[genreData.patterns[i]];
            }
        }

        return musicTheory.progressionPatterns[genreData.patterns[0]];
    }

    /**
     * パターンを具体的なコードに変換
     */
    static convertPatternToChords(patternObj, key, length) {
        const scale = musicTheory.keys[key].major;
        const pattern = patternObj.pattern.slice(0, length);
        
        return pattern.map(degree => scale[degree]);
    }

    /**
     * コード進行の説明文生成
     */
    static getProgressionDescription(pattern, genre) {
        return `${genre}スタイル: ${pattern.description}`;
    }
}

/**
 * 拡張楽器選択アルゴリズム
 * 音楽的相性とジャンル適性を考慮した楽器組み合わせ生成
 */
class EnhancedInstrumentSelector {
    /**
     * 指定されたパラメータに基づいて楽器組み合わせを生成
     * @param {Object} options - 選択オプション
     * @param {string} options.genre - ジャンル
     * @param {string} options.mood - ムード
     * @param {number} options.size - 編成サイズ
     * @returns {Object} 選択された楽器情報
     */
    static select(options = {}) {
        const genre = options.genre || this.selectRandomGenre();
        const mood = options.mood || this.selectRandomMood();
        const size = options.size || this.selectRandomSize();

        // ジャンルに基づく基本編成を決定
        const baseInstrumentation = this.getBaseInstrumentation(genre);
        
        // ムードに基づく調整
        const adjustedInstrumentation = this.adjustForMood(baseInstrumentation, mood);
        
        // サイズに基づく最終選択
        const finalSelection = this.selectInstruments(adjustedInstrumentation, size);
        
        return {
            instruments: finalSelection.join(' + '),
            genre: genre,
            mood: mood,
            size: size,
            description: this.getInstrumentDescription(finalSelection, genre, mood)
        };
    }

    /**
     * ジャンルに基づく基本楽器選択
     */
    static getBaseInstrumentation(genre) {
        const rules = instrumentDatabase.genreInstrumentRules[genre] || 
                     instrumentDatabase.genreInstrumentRules['pop'];
        
        const instruments = [];
        const availableCategories = rules.categories;
        
        // 必須楽器役割を満たす
        for (const requiredRole of rules.required) {
            const category = this.selectRandomFromArray(availableCategories);
            const categoryData = instrumentDatabase.categories[category];
            
            if (categoryData[requiredRole]) {
                const instrument = this.selectRandomFromArray(categoryData[requiredRole]);
                instruments.push(instrument);
            }
        }
        
        return instruments;
    }

    /**
     * ムードに基づく楽器調整
     */
    static adjustForMood(instruments, mood) {
        const moodAdjustments = {
            'bright': ['ウクレレ', 'マリンバ', 'トランペット'],
            'dark': ['チェロ', 'オーボエ', 'シンセパッド'],
            'energetic': ['エレキギター', 'ドラムセット', 'エレキベース'],
            'calm': ['ピアノ', 'フルート', 'ハープ'],
            'mysterious': ['シンセパッド', 'カリンバ', 'エレキバイオリン']
        };

        const adjusted = [...instruments];
        const moodInstruments = moodAdjustments[mood];
        
        if (moodInstruments && Math.random() > 0.5) {
            const moodInstrument = this.selectRandomFromArray(moodInstruments);
            adjusted.push(moodInstrument);
        }

        return adjusted;
    }

    /**
     * 最終楽器選択（サイズ調整）
     */
    static selectInstruments(candidates, targetSize) {
        if (candidates.length <= targetSize) {
            return candidates;
        }

        // 重要度に基づく選択（簡略化）
        const shuffled = [...candidates].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, targetSize);
    }

    /**
     * ランダムジャンル選択
     */
    static selectRandomGenre() {
        const genres = Object.keys(instrumentDatabase.genreInstrumentRules);
        return genres[Math.floor(Math.random() * genres.length)];
    }

    /**
     * ランダムムード選択
     */
    static selectRandomMood() {
        const moods = ['bright', 'dark', 'energetic', 'calm', 'mysterious'];
        return moods[Math.floor(Math.random() * moods.length)];
    }

    /**
     * ランダムサイズ選択
     */
    static selectRandomSize() {
        return Math.floor(Math.random() * 3) + 2; // 2-4楽器
    }

    /**
     * 配列からランダム選択
     */
    static selectRandomFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * 楽器説明文生成
     */
    static getInstrumentDescription(instruments, genre, mood) {
        return `${genre} (${mood}): ${instruments.length}楽器編成`;
    }
}

/**
 * 拡張機能統合クラス
 * 既存のシンプルアルゴリズムと拡張アルゴリズムを統合管理
 */
class AlgorithmManager {
    /**
     * 指定されたモードでチャレンジを生成
     * @param {string} mode - 'simple' または 'advanced'
     * @param {Object} options - 生成オプション
     * @returns {Object} 生成結果
     */
    static generateChallenge(mode = 'simple', options = {}) {
        if (mode === 'advanced') {
            return this.generateAdvancedChallenge(options);
        } else {
            return this.generateSimpleChallenge();
        }
    }

    /**
     * 拡張アルゴリズムによるチャレンジ生成
     */
    static generateAdvancedChallenge(options = {}) {
        const chordResult = EnhancedChordProgressionGenerator.generate(options);
        const instrumentResult = EnhancedInstrumentSelector.select({
            genre: chordResult.genre,
            ...options
        });

        return {
            chord: chordResult.chords,
            instrument: instrumentResult.instruments,
            metadata: {
                chordInfo: chordResult,
                instrumentInfo: instrumentResult,
                mode: 'advanced'
            }
        };
    }

    /**
     * シンプルアルゴリズムによるチャレンジ生成
     */
    static generateSimpleChallenge() {
        // 既存のgetRandomItem関数を使用
        const randomChord = getRandomItem(musicData.chordProgressions);
        const randomInstrument = getRandomItem(musicData.instruments);

        return {
            chord: randomChord,
            instrument: randomInstrument,
            metadata: {
                mode: 'simple'
            }
        };
    }
}

// 拡張機能をグローバルに公開
window.EnhancedChordProgressionGenerator = EnhancedChordProgressionGenerator;
window.EnhancedInstrumentSelector = EnhancedInstrumentSelector;
window.AlgorithmManager = AlgorithmManager;