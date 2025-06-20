// Ghost Admin API を使用してサンプルコンテンツを作成するスクリプト
const GhostAdminAPI = require('@tryghost/admin-api');
const path = require('path');

// Ghost Admin API の設定
// 注意: 実際の使用では、Admin API key を Ghost 管理画面から取得する必要があります
// Settings > Integrations > Custom Integration を作成して Admin API Key を取得

async function createSampleContent() {
    console.log(`
===========================================
ポートフォリオサンプルコンテンツの作成
===========================================

このスクリプトを実行するには、Ghost管理画面でカスタムインテグレーションを作成し、
Admin API Keyを取得する必要があります。

手順:
1. Ghost管理画面 (http://localhost:2368/ghost/) にログイン
2. Settings > Integrations に移動
3. "Add custom integration" をクリック
4. 名前を入力（例: "Portfolio Content Creator"）
5. 作成されたAdmin API Keyをコピー
6. このスクリプトのapi変数に設定

現在は手動で以下の手順でサンプルコンテンツを作成してください:

1. Ghost管理画面で新しい投稿を作成
2. 投稿を "Featured" に設定（ポートフォリオに表示されます）
3. タグを追加（例: Web Development, Design, etc.）
4. 以下のサンプルコンテンツを使用:
`);

    const samplePosts = [
        {
            title: "Modern E-Commerce Platform",
            content: `
このプロジェクトは、ReactとNode.jsで構築された最新のeコマースソリューションを紹介しています。

## 主な機能
- すべてのデバイスに最適化されたレスポンシブデザイン
- リアルタイム在庫追跡
- Stripeによる安全な決済統合
- AI駆動の商品レコメンデーション
- 分析機能付き管理ダッシュボード

## 使用技術
- フロントエンド: React, Redux, Tailwind CSS
- バックエンド: Node.js, Express, PostgreSQL
- 決済: Stripe API
- デプロイ: AWS, Docker
`,
            tags: ["Web Development", "React", "Node.js", "E-commerce"]
        },
        {
            title: "Mobile Banking App UI/UX Design", 
            content: `
デジタルバンキングアプリケーションの包括的なUI/UXリデザイン。

## デザインプロセス
50人以上の銀行顧客へのインタビューを含む広範なユーザーリサーチから始めました。

## 主な改善点
- 直感的なジェスチャーコントロールによるナビゲーションの簡素化
- セキュリティ強化のための生体認証
- 視認性向上のためのダークモード対応
- WCAGガイドラインに準拠したアクセシブルデザイン
- より良いユーザーフィードバックのためのマイクロインタラクション

## 成果
リデザインにより、ユーザーエンゲージメントが40%増加し、ナビゲーション関連のサポートチケットが60%減少しました。
`,
            tags: ["UI/UX Design", "Mobile App", "Banking", "Figma"]
        },
        {
            title: "AI-Powered Content Management System",
            content: `
人工知能を活用してコンテンツクリエイターの作品を最適化する革新的なCMS。

## コア機能
- AI駆動のコンテンツ提案
- 自動SEO最適化
- AI翻訳による多言語サポート
- スマート画像最適化とタグ付け
- コンテンツパフォーマンス分析

## 技術的実装
自然言語処理を使用してコンテンツを分析し、改善のためのリアルタイム提案を提供します。

## インパクト
AIの提案する最適化を実装した後、ユーザーは平均35%のオーガニックトラフィック増加を報告しています。
`,
            tags: ["AI/ML", "Content Management", "Python", "SEO"]
        }
    ];

    console.log("\nサンプル投稿内容:");
    console.log("=================");
    samplePosts.forEach((post, index) => {
        console.log(`\n${index + 1}. ${post.title}`);
        console.log(`タグ: ${post.tags.join(", ")}`);
        console.log("---");
    });

    console.log(`
手動作成の推奨事項:
1. 各投稿に魅力的なアイキャッチ画像を追加
2. 投稿を "Featured" に設定してポートフォリオに表示
3. ナビゲーションメニューを更新:
   - Home (/)
   - Portfolio (/portfolio/)
   - About (/about/)
   - Blog (/blog/)
   - Contact (/contact/)

ページの作成:
1. "Portfolio" ページ (slug: portfolio)
2. "About" ページ (slug: about)
3. "Contact" ページ (slug: contact)
`);
}

// 実行
createSampleContent();