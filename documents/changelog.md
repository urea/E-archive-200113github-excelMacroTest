# 改訂履歴

## バージョン 1.0
-   **日付:** 2024-06-06
-   **変更内容:**
    -   神経衰弱ゲームの新規作成 (HTML構造 `index.html`, スタイル `style.css`, ゲームロジック `script.js`)
    -   基本的なゲームロジックの実装:
        -   カード値の定義と管理
        -   カードのランダムシャッフル機能 (`shuffleCards`)
        -   ゲームボードの動的生成 (`createBoard`)
        -   カードクリック時の反転処理 (`handleCardClick`, `flipCard`)
        -   2枚のカードの一致/不一致判定 (`checkForMatch`)
        -   一致したカードの無効化 (`disableCards`)
        -   不一致カードの自動再反転 (`unflipCards`)
        -   試行回数のカウントと表示 (`attempts`, `updateAttemptsCounter`)
        -   ゲームクリア判定とメッセージ表示 (`checkGameCompletion`)
        -   ゲームリセット機能 (`resetGame`, リセットボタン)
    -   基本的なUI要素の配置とスタイリング:
        -   ゲーム盤のグリッドレイアウト
        -   カードの表裏デザインと3D反転アニメーション
        -   試行回数カウンターとリセットボタンのスタイル
    -   基本設計書 (`documents/basic_design.md`) の作成
```
