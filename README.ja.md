# Ghost ポートフォリオテーマ

ダークモード対応と美しいアニメーションを備えた、Ghost CMS用のモダンでレスポンシブなポートフォリオテーマです。

![Ghost Portfolio Theme](https://img.shields.io/badge/Ghost-5.x-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎨 機能

- **モダンなデザイン**: 作品を魅力的に見せるクリーンでプロフェッショナルなレイアウト
- **ダークモード**: 自動および手動でのダーク/ライトテーマ切り替え
- **レスポンシブ対応**: すべてのデバイスで美しく表示される完全レスポンシブデザイン
- **ポートフォリオグリッド**: ホバーエフェクト付きの美しいグリッドレイアウト
- **カスタマイズ可能**: Ghost管理画面から色、フォント、レイアウトを簡単にカスタマイズ
- **パフォーマンス**: 遅延読み込み画像による高速読み込みの最適化
- **SEO対応**: SEOベストプラクティスに基づいて構築

## 📸 スクリーンショット

### ライトモード
- コンテンツに焦点を当てたクリーンでミニマルなデザイン
- CTA（コールトゥアクション）ボタン付きのグラデーションヒーローセクション
- グリッドベースのポートフォリオショーケース

### ダークモード
- 目に優しいダークテーマ
- 読みやすさと視覚的階層を維持
- テーマ間のスムーズな切り替え

## 🚀 クイックスタート

### 1. Ghostをインストール
```bash
# Ghost-CLIをインストール
npm install ghost-cli -g

# 新しいディレクトリを作成してGhostをインストール
mkdir my-portfolio
cd my-portfolio
ghost install local
```

### 2. ポートフォリオテーマをインストール
1. このリポジトリをダウンロードまたはクローン
2. `content/themes/portfolio`フォルダをGhostインストールの`content/themes/`ディレクトリにコピー
3. Ghostを再起動: `ghost restart`
4. Ghost管理画面 → 設定 → デザイン → テーマを変更 に移動
5. 「Portfolio」テーマを有効化

### 3. サイトを設定
1. **サイト設定**: Ghost管理画面 → 設定 → 一般 でサイトタイトル、説明、ロゴを更新
2. **ナビゲーション**: Ghost管理画面 → 設定 → ナビゲーション でメニューを設定
   - 推奨構成:
     - ホーム → `/`
     - ポートフォリオ → `/portfolio/`
     - 自己紹介 → `/about/`
     - ブログ → `/blog/`
     - お問い合わせ → `/contact/`

### 4. コンテンツを作成

#### ポートフォリオアイテム
1. 新しい投稿を作成し、ポートフォリオに表示するために「注目」に設定
2. 作品を分類するためのタグを追加（例：「ウェブ開発」、「デザイン」、「写真」）
3. 最良の結果を得るために高品質なアイキャッチ画像を使用

#### 必須ページ
完全なポートフォリオサイトのために以下のページを作成:
- **ポートフォリオ** (slug: `portfolio`) - ポートフォリオグリッドテンプレートを使用
- **自己紹介** (slug: `about`) - 個人または会社の情報
- **お問い合わせ** (slug: `contact`) - お問い合わせフォームと情報

## 🎨 カスタマイズオプション

### テーマ設定
Ghost管理画面 → 設定 → デザイン で利用可能:

- **ナビゲーションレイアウト**: ロゴを左寄せまたは中央配置
- **ヒーロースタイル**: フルスクリーン、大、中、小
- **ポートフォリオレイアウト**: グリッド、マサonリー、リスト
- **アクセントカラー**: リンクとボタンのプライマリカラー
- **背景色**: ライトモードとダークモード用の個別の色
- **ソーシャルリンク**: ソーシャルメディアアイコンの表示切り替え

### カスタムCSS
Ghost管理画面 → 設定 → コードインジェクション → サイトヘッダー でカスタムスタイルを追加:
```css
<style>
  :root {
    --accent-color: #your-color;
    --font-body: 'Your Font', sans-serif;
  }
</style>
```

## 📁 テーマ構造

```
portfolio/
├── assets/
│   ├── css/
│   │   └── style.css       # メインスタイルシート
│   └── built/
│       └── style.css       # 本番用CSS
├── partials/
│   ├── navigation.hbs      # ナビゲーションメニュー
│   └── email-subscription.hbs # ニュースレター登録
├── default.hbs             # ベーステンプレート
├── index.hbs              # ホームページ
├── post.hbs               # ブログ投稿テンプレート
├── page.hbs               # 静的ページテンプレート
├── page-portfolio.hbs     # ポートフォリオページテンプレート
├── page-contact.hbs       # お問い合わせページテンプレート
└── package.json           # テーマ設定
```

## 🛠️ 開発

### 前提条件
- Node.js (v18.12.1以上)
- Ghost-CLI
- Handlebarsテンプレートの基本知識

### ローカル開発
1. このリポジトリをクローン
2. テーマをローカルのGhostインストールにリンク
3. 変更を加える
4. 異なるデバイスとブラウザで十分にテスト

### アセットのビルド
テーマは標準的なCSSを使用。スタイルを変更するには:
1. `assets/css/style.css`を編集
2. 本番用に`assets/built/style.css`にコピー
3. 必要に応じてGhostのキャッシュをクリア

## 📝 サンプルコンテンツ

詳細なサンプルコンテンツの作成手順については`portfolio-setup-guide.md`を参照:
- 6つのポートフォリオプロジェクト例
- 自己紹介ページの内容
- お問い合わせページの設定
- ブログ投稿の例

## 🤝 貢献

貢献を歓迎します！プルリクエストをお気軽に送信してください。

1. リポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを開く

## 📄 ライセンス

このテーマはMITライセンスの下でリリースされています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 🙏 クレジット

- [Ghost CMS](https://ghost.org)向けに構築
- アイコン: [Heroicons](https://heroicons.com)
- フォント: [Inter](https://fonts.google.com/specimen/Inter)と[Playfair Display](https://fonts.google.com/specimen/Playfair+Display)

## 💬 サポート

- テーマ固有の問題については、[GitHub Issues](https://github.com/katzkawai/my-second-ghost/issues)を使用してください
- Ghost関連の質問については、[Ghostフォーラム](https://forum.ghost.org)をご覧ください
- 一般的なサポートについては、[Ghostドキュメント](https://ghost.org/docs/)を確認してください

---

Ghostコミュニティのために❤️を込めて作成