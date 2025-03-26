# 共同輸送システムプロジェクト - フロントエンド

## 概要・目的
このリポジトリは、共同輸送システムプロジェクトのフロントエンド部分を管理するものです。本システムは、運送能力情報を効率的に管理し、可視化し、ユーザーにとって使いやすいインターフェースを提供することを目的としています。

## 技術スタック
- **フレームワーク:** Next.js 14.2
- **プログラミング言語:** TypeScript
- **スタイル:** Tailwind CSS, Hero UI
- **状態管理:** Redux Toolkit
- **API通信:** Axios
- **フォームバリデーション:** Yup, React Hook Form

## 前提環境
- **Node.js:** v18 以上
- **パッケージマネージャ:** npm / yarn / pnpm (いずれかを選択)

## 環境構築・起動手順
### 1. リポジトリのクローン
```bash
git clone https://github.com/NextLogisticsJapan/release_OSS.git
cd release_OSS/co-operator-frontend
```

### 2. パッケージのインストール
```bash
npm install  # または yarn install / pnpm install
```

### 3. 環境変数の設定
`.env.local` ファイルを作成し、以下のように環境変数を設定します。
```
NEXT_PUBLIC_API_TRANSACTION=your_api_url_here
NEXT_PUBLIC_API_CARRIER=your_api_url_here
NEXT_PUBLIC_API_SHIPPER=your_api_url_here
```

### 4. 開発サーバーの起動
```bash
npm run dev  # または yarn dev / pnpm dev
```

ブラウザで `http://localhost:3000` にアクセスして確認してください。

## ビルド手順
本番環境向けに最適化されたビルドを作成するには、以下のコマンドを実行します。
```bash
npm run build  # または yarn build / pnpm build
```
## 設計標準
### 主な機能
- ユーザーインターフェース
  - 直感的な操作性を重視したUI設計
  - レスポンシブデザインによるマルチデバイス対応

- システム連携
  - RESTful APIとの通信
  - エラーハンドリング

### コンポーネント設計
- Atomic Designパターンの採用
  - atoms: 最小単位のUIパーツ
  - molecules: 複数のatomsの組み合わせ
  - organisms: 特定の機能を持つ複合コンポーネント
  - templates: ページレイアウト
  - pages: 実際のページコンポーネント

### ディレクトリ構成
```
/frontend
├── public/            # 静的ファイル
├── src/
│   ├── components/    # UIコンポーネント
│   ├── apps/          # Next.js のページルーティング
│   ├── constants/     # 共通で使用する定数を定義
│   ├── store/         # Redux Toolkit ストア
│   ├── hooks/         # カスタムフック
│   ├── utils/         # ユーティリティ関数
│   ├── lib/           # 共通ライブラリを定義 (dayjs、マッチング計算など)
│   ├── images/        # プロジェクトで使用する画像を格納 (ロゴ、トレーラー、トラクターなど)
│   ├── icons/         # SVG アイコンを格納 (https://fonts.google.com/icons にない場合)
│   ├── styles/        # Tailwind のスタイル設定
│   ├── messages/      # 共通テキストファイルを格納
│   ├── services/      # API サービスを格納
│   └── config/        # 設定ファイル
└── .env.local         # 環境変数（ローカル専用）
```

## コーディング規約
- **コーディングスタイル:** ESLint + Prettier を使用
- **コミットメッセージ:** `feat: 新機能追加`, `fix: バグ修正`, `docs: ドキュメント更新` など
- **ブランチ戦略:** `main`（本番） / `develop`（開発） / `feature/*`（機能ごと）

## 処理概要
- 配送管理


## 問合せ・要望
問題が発生した場合や質問がある場合は、[サポートページ](https://github.com/NextLogisticsJapan/frontend/issues) にて Issue を作成してください。

## ライセンス
このプロジェクトは [MITライセンス](LICENSE.txt) のもとで公開されています。  
詳細についてはリポジトリ内の `LICENSE` ファイルをご確認ください。

## 免責事項
このソフトウェアは「現状のまま」提供され、明示または黙示を問わず、いかなる保証も行いません。

## その他
プロジェクトへの貢献を歓迎します。貢献する前に、`CONTRIBUTING.md` を必ず確認してください。

