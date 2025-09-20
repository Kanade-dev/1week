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
 * マルコフ連鎖によるコード進行生成アルゴリズム
 * 既存のコード進行パターンから学習し、確率的に新しいコード進行を生成
 */
class MarkovChainChordGenerator {
    /**
     * コード進行の学習データから遷移行列を構築
     */
    static buildTransitionMatrix() {
        // 既存のコード進行データから学習
        const trainingData = [
            ['C', 'Am', 'F', 'G'],
            ['Am', 'F', 'C', 'G'],
            ['C', 'F', 'Am', 'G'],
            ['G', 'Am', 'F', 'C'],
            ['F', 'C', 'G', 'Am'],
            ['Em', 'Am', 'D', 'G'],
            ['C', 'G', 'Am', 'F'],
            ['Am', 'Dm', 'G', 'C'],
            ['F', 'G', 'Em', 'Am'],
            ['C', 'Am', 'Dm', 'G'],
            ['Dm', 'G', 'C', 'Am'],
            ['G', 'Em', 'C', 'D'],
            ['Am', 'F', 'G', 'Em'],
            ['C', 'Em', 'F', 'G'],
            ['F', 'Am', 'G', 'C']
        ];

        const transitions = {};
        
        // 各コード進行から遷移パターンを学習
        trainingData.forEach(progression => {
            for (let i = 0; i < progression.length - 1; i++) {
                const current = progression[i];
                const next = progression[i + 1];
                
                if (!transitions[current]) {
                    transitions[current] = {};
                }
                
                transitions[current][next] = (transitions[current][next] || 0) + 1;
            }
        });

        // 確率に正規化
        Object.keys(transitions).forEach(chord => {
            const total = Object.values(transitions[chord]).reduce((sum, count) => sum + count, 0);
            Object.keys(transitions[chord]).forEach(nextChord => {
                transitions[chord][nextChord] /= total;
            });
        });

        return transitions;
    }

    /**
     * マルコフ連鎖を使用してコード進行を生成
     * @param {Object} options - 生成オプション
     * @param {string} options.startChord - 開始コード (省略時はランダム)
     * @param {number} options.length - 長さ (デフォルト: 4)
     * @param {string} options.key - キー (省略時はC)
     * @returns {Object} 生成されたコード進行情報
     */
    static generate(options = {}) {
        const transitions = this.buildTransitionMatrix();
        const length = options.length || 4;
        const targetKey = options.key || 'C';
        
        // 開始コードの決定
        let currentChord = options.startChord;
        if (!currentChord) {
            const startCandidates = ['C', 'Am', 'F', 'G', 'Dm', 'Em'];
            currentChord = startCandidates[Math.floor(Math.random() * startCandidates.length)];
        }

        const progression = [currentChord];

        // マルコフ連鎖による次のコード選択
        for (let i = 1; i < length; i++) {
            const nextChord = this.selectNextChord(currentChord, transitions);
            if (nextChord) {
                progression.push(nextChord);
                currentChord = nextChord;
            } else {
                // フォールバック: ランダム選択
                const allChords = Object.keys(transitions);
                currentChord = allChords[Math.floor(Math.random() * allChords.length)];
                progression.push(currentChord);
            }
        }

        // 指定キーに移調
        const transposedProgression = this.transposeToKey(progression, targetKey);

        return {
            chords: transposedProgression.join(' - '),
            key: targetKey,
            algorithm: 'markov',
            originalKey: 'C',
            description: `マルコフ連鎖生成 (${targetKey}キー)`,
            probability: this.calculateProgressionProbability(progression, transitions)
        };
    }

    /**
     * 確率的に次のコードを選択
     */
    static selectNextChord(currentChord, transitions) {
        const nextChords = transitions[currentChord];
        if (!nextChords) return null;

        const random = Math.random();
        let cumulativeProbability = 0;

        for (const [chord, probability] of Object.entries(nextChords)) {
            cumulativeProbability += probability;
            if (random <= cumulativeProbability) {
                return chord;
            }
        }

        // フォールバック
        return Object.keys(nextChords)[0];
    }

    /**
     * コード進行全体の確率を計算
     */
    static calculateProgressionProbability(progression, transitions) {
        let totalProbability = 1;
        
        for (let i = 0; i < progression.length - 1; i++) {
            const current = progression[i];
            const next = progression[i + 1];
            const prob = transitions[current]?.[next] || 0.01; // 最小確率
            totalProbability *= prob;
        }

        return totalProbability;
    }

    /**
     * 簡単な移調機能
     */
    static transposeToKey(progression, targetKey) {
        // 簡単な移調マップ（Cメジャーキーから他のキーへ）
        const keyMaps = {
            'C': { 'C': 'C', 'Dm': 'Dm', 'Em': 'Em', 'F': 'F', 'G': 'G', 'Am': 'Am', 'Bdim': 'Bdim' },
            'G': { 'C': 'G', 'Dm': 'Am', 'Em': 'Bm', 'F': 'C', 'G': 'D', 'Am': 'Em', 'Bdim': 'F#dim' },
            'D': { 'C': 'D', 'Dm': 'Em', 'Em': 'F#m', 'F': 'G', 'G': 'A', 'Am': 'Bm', 'Bdim': 'C#dim' },
            'F': { 'C': 'F', 'Dm': 'Gm', 'Em': 'Am', 'F': 'Bb', 'G': 'C', 'Am': 'Dm', 'Bdim': 'Edim' }
        };

        const keyMap = keyMaps[targetKey] || keyMaps['C'];
        
        return progression.map(chord => keyMap[chord] || chord);
    }
}

/**
 * 機能和声理論に基づくコード進行生成アルゴリズム
 * 厳密な音楽理論ルールに基づいて音楽的に自然なコード進行を生成
 */
class FunctionalHarmonyGenerator {
    /**
     * 機能和声ルールの定義
     */
    static getHarmonyRules() {
        return {
            // トニック機能 (安定)
            tonic: {
                chords: [0, 2, 5], // I, iii, vi
                canGoTo: ['subdominant', 'dominant', 'tonic'],
                probability: { subdominant: 0.4, dominant: 0.4, tonic: 0.2 }
            },
            // サブドミナント機能 (不安定、準備)
            subdominant: {
                chords: [1, 3], // ii, IV
                canGoTo: ['dominant', 'tonic'],
                probability: { dominant: 0.7, tonic: 0.3 }
            },
            // ドミナント機能 (緊張、解決を求める)
            dominant: {
                chords: [4, 6], // V, vii°
                canGoTo: ['tonic'],
                probability: { tonic: 1.0 }
            }
        };
    }

    /**
     * 機能和声に基づいてコード進行を生成
     * @param {Object} options - 生成オプション
     * @param {string} options.key - キー (デフォルト: C)
     * @param {number} options.length - 長さ (デフォルト: 4)
     * @param {string} options.cadence - 終止形 ('authentic', 'plagal', 'deceptive')
     * @returns {Object} 生成されたコード進行情報
     */
    static generate(options = {}) {
        const key = options.key || this.selectRandomKey();
        const length = options.length || 4;
        const cadence = options.cadence || this.selectRandomCadence();
        
        const scale = musicTheory.keys[key].major;
        const rules = this.getHarmonyRules();
        
        // 開始は必ずトニック
        const progression = [];
        const functionSequence = ['tonic'];
        
        // 中間部分の生成
        let currentFunction = 'tonic';
        for (let i = 1; i < length - 1; i++) {
            const nextFunction = this.selectNextFunction(currentFunction, rules);
            functionSequence.push(nextFunction);
            currentFunction = nextFunction;
        }
        
        // 終止形の適用
        const finalSequence = this.applyCadence(functionSequence, cadence);
        
        // 機能から具体的なコードへ変換
        finalSequence.forEach(func => {
            const chordDegree = this.selectChordFromFunction(func, rules);
            progression.push(scale[chordDegree]);
        });

        return {
            chords: progression.join(' - '),
            key: key,
            algorithm: 'functional',
            cadence: cadence,
            functions: finalSequence,
            description: `機能和声生成 (${cadence}終止, ${key}キー)`,
            analysis: this.analyzeProgression(progression, finalSequence)
        };
    }

    /**
     * 次の機能を確率的に選択
     */
    static selectNextFunction(currentFunction, rules) {
        const current = rules[currentFunction];
        const random = Math.random();
        let cumulative = 0;

        for (const [nextFunc, prob] of Object.entries(current.probability)) {
            cumulative += prob;
            if (random <= cumulative) {
                return nextFunc;
            }
        }

        return current.canGoTo[0]; // フォールバック
    }

    /**
     * 機能から具体的なコード度数を選択
     */
    static selectChordFromFunction(functionName, rules) {
        const chords = rules[functionName].chords;
        return chords[Math.floor(Math.random() * chords.length)];
    }

    /**
     * 終止形を適用
     */
    static applyCadence(sequence, cadenceType) {
        const result = [...sequence];
        
        switch (cadenceType) {
            case 'authentic': // V-I
                if (result.length >= 2) {
                    result[result.length - 2] = 'dominant';
                    result[result.length - 1] = 'tonic';
                }
                break;
                
            case 'plagal': // IV-I
                if (result.length >= 2) {
                    result[result.length - 2] = 'subdominant';
                    result[result.length - 1] = 'tonic';
                }
                break;
                
            case 'deceptive': // V-vi
                if (result.length >= 2) {
                    result[result.length - 2] = 'dominant';
                    result[result.length - 1] = 'tonic'; // vi はトニック機能として扱う
                }
                break;
        }
        
        return result;
    }

    /**
     * ランダムな終止形を選択
     */
    static selectRandomCadence() {
        const cadences = ['authentic', 'plagal', 'deceptive'];
        const weights = [0.6, 0.25, 0.15]; // 本格終止が最も一般的
        
        const random = Math.random();
        let cumulative = 0;
        
        for (let i = 0; i < cadences.length; i++) {
            cumulative += weights[i];
            if (random <= cumulative) {
                return cadences[i];
            }
        }
        
        return 'authentic';
    }

    /**
     * ランダムキー選択
     */
    static selectRandomKey() {
        const keys = Object.keys(musicTheory.keys);
        return keys[Math.floor(Math.random() * keys.length)];
    }

    /**
     * コード進行の和声分析
     */
    static analyzeProgression(progression, functions) {
        return {
            chordCount: progression.length,
            functionFlow: functions.join(' → '),
            hasProperCadence: functions[functions.length - 1] === 'tonic',
            complexity: this.calculateComplexity(functions)
        };
    }

    /**
     * 和声の複雑さを計算
     */
    static calculateComplexity(functions) {
        const uniqueFunctions = new Set(functions);
        const transitions = functions.length - 1;
        return {
            uniqueFunctions: uniqueFunctions.size,
            totalTransitions: transitions,
            complexity: uniqueFunctions.size / functions.length
        };
    }
}

/**
 * 拡張機能統合クラス
 * 既存のシンプルアルゴリズムと拡張アルゴリズムを統合管理
 */
class AlgorithmManager {
    /**
     * 指定されたモードでチャレンジを生成
     * @param {string} mode - 'simple', 'advanced', 'markov', 'functional'
     * @param {Object} options - 生成オプション
     * @returns {Object} 生成結果
     */
    static generateChallenge(mode = 'simple', options = {}) {
        switch (mode) {
            case 'advanced':
                return this.generateAdvancedChallenge(options);
            case 'markov':
                return this.generateMarkovChallenge(options);
            case 'functional':
                return this.generateFunctionalChallenge(options);
            default:
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
     * マルコフ連鎖アルゴリズムによるチャレンジ生成
     */
    static generateMarkovChallenge(options = {}) {
        const chordResult = MarkovChainChordGenerator.generate(options);
        const instrumentResult = EnhancedInstrumentSelector.select({
            genre: 'pop', // マルコフ連鎖はポップス寄りとして扱う
            ...options
        });

        return {
            chord: chordResult.chords,
            instrument: instrumentResult.instruments,
            metadata: {
                chordInfo: chordResult,
                instrumentInfo: instrumentResult,
                mode: 'markov'
            }
        };
    }

    /**
     * 機能和声アルゴリズムによるチャレンジ生成
     */
    static generateFunctionalChallenge(options = {}) {
        const chordResult = FunctionalHarmonyGenerator.generate(options);
        const instrumentResult = EnhancedInstrumentSelector.select({
            genre: 'classical', // 機能和声はクラシック寄りとして扱う
            ...options
        });

        return {
            chord: chordResult.chords,
            instrument: instrumentResult.instruments,
            metadata: {
                chordInfo: chordResult,
                instrumentInfo: instrumentResult,
                mode: 'functional'
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
window.MarkovChainChordGenerator = MarkovChainChordGenerator;
window.FunctionalHarmonyGenerator = FunctionalHarmonyGenerator;
window.AlgorithmManager = AlgorithmManager;