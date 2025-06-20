# Ghost API完全ガイド

## 📚 Ghost APIの概要

GhostにはコンテンツやサイトデータにアクセスするためのAPIが用意されています。

### APIの種類

1. **Content API** - 公開コンテンツの読み取り専用
2. **Admin API** - コンテンツの作成・更新・削除
3. **Members API** - メンバーシップとサブスクリプション管理

## 🔑 認証設定

### 1. Content API キーの取得（詳細手順）

1. Ghost管理画面（`https://あなたのサイト名.ghost.io/ghost`）にログイン
2. 左メニューの **Settings（設定）** → **Integrations（統合）** を選択
3. **Custom Integrations（カスタム統合）** の下にある **Add custom integration** をクリック
4. 任意の名前を入力（例：「My App」）して **Create** をクリック
5. 表示される **Content API Key** をコピー

### 2. Admin API キーの取得（詳細手順）

同じ統合設定画面で：
- **Admin API Key** をコピー（形式：`id:secret`）
  - `id`：キーの識別子
  - `secret`：トークンの生成に必要な秘密鍵
- **API URL** をメモ（例：`https://yoursite.ghost.io`）

## 🌐 Content API の使い方

### 基本的なリクエスト

#### cURLでの例（最もシンプル）

```bash
# 最新の投稿一覧を取得
curl "https://あなたのサイト名.ghost.io/ghost/api/content/posts/?key=YOUR_CONTENT_API_KEY"

# 特定の投稿を取得（IDで）
curl "https://あなたのサイト名.ghost.io/ghost/api/content/posts/{id}/?key=YOUR_CONTENT_API_KEY"

# タグを含めて取得
curl "https://あなたのサイト名.ghost.io/ghost/api/content/posts/?key=YOUR_CONTENT_API_KEY&include=tags,authors"
```

#### JavaScriptでの例（Fetch API）

```javascript
// シンプルなfetchの例
fetch('https://あなたのサイト名.ghost.io/ghost/api/content/posts/?key=YOUR_CONTENT_API_KEY')
  .then(res => res.json())
  .then(data => {
    console.log(data.posts);
  });
```

#### Ghost SDKを使用する例

```javascript
// Content APIクライアントの初期化
const GhostContentAPI = require('@tryghost/content-api');

const api = new GhostContentAPI({
  url: 'https://yoursite.ghost.io',
  key: 'your-content-api-key',
  version: 'v5.0'  // Ghostのバージョンに合わせる
});
```

### 1. 記事の取得

```javascript
// すべての記事を取得
async function getPosts() {
  try {
    const posts = await api.posts
      .browse({
        limit: 'all',
        include: 'tags,authors',
        fields: 'id,title,slug,feature_image,published_at,excerpt'
      });
    return posts;
  } catch (err) {
    console.error(err);
  }
}

// 特定の記事を取得
async function getPost(slug) {
  try {
    const post = await api.posts
      .read({
        slug: slug,
        include: 'tags,authors'
      });
    return post;
  } catch (err) {
    console.error(err);
  }
}

// フィルタリングして取得
async function getFeaturedPosts() {
  try {
    const posts = await api.posts
      .browse({
        filter: 'featured:true',
        limit: 5,
        include: 'tags'
      });
    return posts;
  } catch (err) {
    console.error(err);
  }
}
```

### 2. ページの取得

```javascript
// すべてのページを取得
async function getPages() {
  try {
    const pages = await api.pages
      .browse({
        limit: 'all',
        fields: 'id,title,slug,html'
      });
    return pages;
  } catch (err) {
    console.error(err);
  }
}

// スラッグでページを取得
async function getPage(slug) {
  try {
    const page = await api.pages
      .read({
        slug: slug
      });
    return page;
  } catch (err) {
    console.error(err);
  }
}
```

### 3. タグの取得

```javascript
// すべてのタグを取得
async function getTags() {
  try {
    const tags = await api.tags
      .browse({
        limit: 'all',
        include: 'count.posts'
      });
    return tags;
  } catch (err) {
    console.error(err);
  }
}

// 特定のタグの記事を取得
async function getPostsByTag(tagSlug) {
  try {
    const posts = await api.posts
      .browse({
        filter: `tag:${tagSlug}`,
        include: 'tags,authors'
      });
    return posts;
  } catch (err) {
    console.error(err);
  }
}
```

### 4. 著者の取得

```javascript
// すべての著者を取得
async function getAuthors() {
  try {
    const authors = await api.authors
      .browse({
        limit: 'all',
        include: 'count.posts'
      });
    return authors;
  } catch (err) {
    console.error(err);
  }
}

// 特定の著者の記事を取得
async function getPostsByAuthor(authorSlug) {
  try {
    const posts = await api.posts
      .browse({
        filter: `author:${authorSlug}`,
        include: 'authors'
      });
    return posts;
  } catch (err) {
    console.error(err);
  }
}
```

### 5. 設定の取得

```javascript
// サイト設定を取得
async function getSettings() {
  try {
    const settings = await api.settings.browse();
    return settings;
  } catch (err) {
    console.error(err);
  }
}
```

## 🔧 Admin API の使い方

コンテンツの作成、更新、削除など、管理者レベルの操作ができます。Admin APIの認証にはJWT（JSON Web Token）を使います。

### SDKのインストール

```bash
npm install @tryghost/admin-api
```

### Ghost Admin SDK を使用した例（最も簡単）

```javascript
const GhostAdminAPI = require('@tryghost/admin-api');

// Admin APIクライアントの初期化
const api = new GhostAdminAPI({
  url: 'https://あなたのサイト名.ghost.io',
  key: 'YOUR_ADMIN_API_KEY',  // id:secret形式のキー
  version: 'v5.0'  // Ghostのバージョンに合わせる
});

// 投稿の作成例
api.posts.add({
  title: 'APIから投稿した記事',
  html: '<p>これはAPIで作成した記事です。</p>',
  status: 'published'
}).then(post => {
  console.log('投稿が作成されました:', post);
}).catch(err => {
  console.error('エラー:', err);
});
```

### 手動でJWTトークンを生成する方法

```javascript
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Admin APIキーを分割（id:secret形式）
const [id, secret] = adminApiKey.split(':');

// JWTトークンを生成
const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
  keyid: id,
  algorithm: 'HS256',
  expiresIn: '5m',
  audience: `/admin/`
});

// Axiosインスタンスを作成
const adminApi = axios.create({
  baseURL: 'https://yoursite.ghost.io/ghost/api/admin',
  headers: {
    'Authorization': `Ghost ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### 1. 記事の作成

```javascript
async function createPost(postData) {
  try {
    const response = await adminApi.post('/posts/', {
      posts: [{
        title: postData.title,
        slug: postData.slug,
        mobiledoc: postData.content,
        status: 'published',
        feature_image: postData.feature_image,
        tags: postData.tags,
        meta_title: postData.meta_title,
        meta_description: postData.meta_description
      }]
    });
    return response.data.posts[0];
  } catch (err) {
    console.error(err.response.data);
  }
}

// Markdownを使用する場合
async function createPostWithMarkdown(postData) {
  const mobiledoc = {
    version: '0.3.1',
    markups: [],
    atoms: [],
    cards: [['markdown', {
      cardName: 'markdown',
      markdown: postData.markdown
    }]],
    sections: [[10, 0]]
  };

  try {
    const response = await adminApi.post('/posts/', {
      posts: [{
        title: postData.title,
        mobiledoc: JSON.stringify(mobiledoc),
        status: 'published'
      }]
    });
    return response.data.posts[0];
  } catch (err) {
    console.error(err);
  }
}
```

### 2. 記事の更新

```javascript
async function updatePost(postId, updates) {
  try {
    // 現在のバージョンを取得
    const currentPost = await adminApi.get(`/posts/${postId}/`);
    const post = currentPost.data.posts[0];

    // 更新
    const response = await adminApi.put(`/posts/${postId}/`, {
      posts: [{
        ...updates,
        updated_at: post.updated_at // 楽観的ロック
      }]
    });
    return response.data.posts[0];
  } catch (err) {
    console.error(err.response.data);
  }
}
```

### 3. 記事の削除

```javascript
async function deletePost(postId) {
  try {
    await adminApi.delete(`/posts/${postId}/`);
    return { success: true };
  } catch (err) {
    console.error(err.response.data);
    return { success: false, error: err.response.data };
  }
}
```

### 4. 画像のアップロード

```javascript
const FormData = require('form-data');
const fs = require('fs');

async function uploadImage(imagePath) {
  const form = new FormData();
  form.append('file', fs.createReadStream(imagePath));
  form.append('purpose', 'image');

  try {
    const response = await adminApi.post('/images/upload/', form, {
      headers: {
        ...form.getHeaders()
      }
    });
    return response.data.images[0];
  } catch (err) {
    console.error(err.response.data);
  }
}
```

### 5. タグの管理

```javascript
// タグの作成
async function createTag(tagData) {
  try {
    const response = await adminApi.post('/tags/', {
      tags: [{
        name: tagData.name,
        slug: tagData.slug,
        description: tagData.description,
        feature_image: tagData.feature_image
      }]
    });
    return response.data.tags[0];
  } catch (err) {
    console.error(err.response.data);
  }
}

// タグの更新
async function updateTag(tagId, updates) {
  try {
    const response = await adminApi.put(`/tags/${tagId}/`, {
      tags: [updates]
    });
    return response.data.tags[0];
  } catch (err) {
    console.error(err.response.data);
  }
}
```

## 🔍 高度なフィルタリング

### フィルタ構文

```javascript
// 複数条件のAND
filter: 'featured:true+tag:news'

// 複数条件のOR
filter: 'tag:[news,updates]'

// NOT条件
filter: 'tag:-news'

// 日付範囲
filter: 'published_at:>\'2023-01-01\''

// 複雑な条件
filter: 'featured:true+tag:[portfolio,work]+published_at:>\'2023-01-01\''
```

### ページネーション

```javascript
async function getPaginatedPosts(page = 1, limit = 10) {
  try {
    const posts = await api.posts.browse({
      page: page,
      limit: limit,
      include: 'tags,authors'
    });
    
    return {
      posts: posts,
      pagination: posts.meta.pagination
    };
  } catch (err) {
    console.error(err);
  }
}
```

## 🚀 実践的な例

### 1. ブログ検索機能の実装

```javascript
async function searchPosts(query) {
  try {
    // タイトルと内容から検索
    const posts = await api.posts.browse({
      limit: 'all',
      include: 'tags,authors',
      fields: 'id,title,slug,excerpt,published_at'
    });
    
    // クライアントサイドでフィルタリング
    const results = posts.filter(post => {
      const searchContent = `${post.title} ${post.excerpt}`.toLowerCase();
      return searchContent.includes(query.toLowerCase());
    });
    
    return results;
  } catch (err) {
    console.error(err);
  }
}
```

### 2. 関連記事の取得

```javascript
async function getRelatedPosts(currentPost, limit = 3) {
  try {
    // 現在の記事のタグを取得
    const tagSlugs = currentPost.tags.map(tag => tag.slug);
    
    // 同じタグを持つ記事を取得
    const posts = await api.posts.browse({
      filter: `tag:[${tagSlugs.join(',')}]+id:-${currentPost.id}`,
      limit: limit,
      include: 'tags'
    });
    
    return posts;
  } catch (err) {
    console.error(err);
  }
}
```

### 3. サイトマップの生成

```javascript
async function generateSitemap() {
  try {
    const [posts, pages, tags, authors] = await Promise.all([
      api.posts.browse({ limit: 'all', fields: 'slug,updated_at' }),
      api.pages.browse({ limit: 'all', fields: 'slug,updated_at' }),
      api.tags.browse({ limit: 'all', fields: 'slug,updated_at' }),
      api.authors.browse({ limit: 'all', fields: 'slug,updated_at' })
    ]);
    
    const sitemap = {
      posts: posts.map(p => ({ 
        url: `/blog/${p.slug}/`, 
        lastmod: p.updated_at 
      })),
      pages: pages.map(p => ({ 
        url: `/${p.slug}/`, 
        lastmod: p.updated_at 
      })),
      tags: tags.map(t => ({ 
        url: `/tag/${t.slug}/`, 
        lastmod: t.updated_at 
      })),
      authors: authors.map(a => ({ 
        url: `/author/${a.slug}/`, 
        lastmod: a.updated_at 
      }))
    };
    
    return sitemap;
  } catch (err) {
    console.error(err);
  }
}
```

### 4. RSSフィードの生成

```javascript
const RSS = require('rss');

async function generateRSS() {
  try {
    const [settings, posts] = await Promise.all([
      api.settings.browse(),
      api.posts.browse({ 
        limit: 15, 
        include: 'tags,authors',
        fields: 'id,title,slug,excerpt,html,published_at,feature_image'
      })
    ]);
    
    const feed = new RSS({
      title: settings.title,
      description: settings.description,
      feed_url: `${settings.url}/rss.xml`,
      site_url: settings.url,
      image_url: settings.logo,
      language: settings.lang || 'ja'
    });
    
    posts.forEach(post => {
      feed.item({
        title: post.title,
        description: post.excerpt,
        url: `${settings.url}/${post.slug}/`,
        date: post.published_at,
        author: post.primary_author.name,
        enclosure: post.feature_image ? {
          url: post.feature_image
        } : undefined
      });
    });
    
    return feed.xml();
  } catch (err) {
    console.error(err);
  }
}
```

## 🛡️ エラーハンドリング

### APIエラーの種類

```javascript
// エラーハンドリングの例
async function safeApiCall(apiFunction) {
  try {
    return await apiFunction();
  } catch (error) {
    if (error.response) {
      // APIからのエラーレスポンス
      switch (error.response.status) {
        case 400:
          console.error('Bad Request:', error.response.data);
          break;
        case 401:
          console.error('Unauthorized: APIキーを確認してください');
          break;
        case 404:
          console.error('Not Found: リソースが見つかりません');
          break;
        case 422:
          console.error('Validation Error:', error.response.data.errors);
          break;
        case 429:
          console.error('Rate Limit: リクエストが多すぎます');
          break;
        default:
          console.error('API Error:', error.response.status, error.response.data);
      }
    } else if (error.request) {
      // リクエストは送信されたがレスポンスがない
      console.error('Network Error: サーバーに接続できません');
    } else {
      // その他のエラー
      console.error('Error:', error.message);
    }
    return null;
  }
}
```

## 🚦 レート制限

Ghost APIには以下のレート制限があります：

- **Content API**: 制限なし（キャッシュ推奨）
- **Admin API**: 
  - 読み取り: 120リクエスト/分
  - 書き込み: 60リクエスト/分

### レート制限の対処法

```javascript
// リトライ機能付きリクエスト
async function requestWithRetry(apiCall, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // レート制限エラーの場合、待機してリトライ
        const retryAfter = error.response.headers['retry-after'] || 60;
        console.log(`Rate limited. Retrying after ${retryAfter} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries exceeded');
}
```

## 🔒 セキュリティベストプラクティス

### 1. APIキーの保護

```javascript
// 環境変数を使用
require('dotenv').config();

const api = new GhostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: 'v5.0'
});
```

### 2. クライアントサイドでの使用

```javascript
// Content APIのみをクライアントサイドで使用
// Admin APIは絶対にクライアントサイドで使用しない

// Next.jsの例
export async function getServerSideProps() {
  const posts = await getPosts();
  return {
    props: { posts }
  };
}
```

### 3. CORSの設定

```javascript
// Express.jsでのCORS設定例
const cors = require('cors');

app.use(cors({
  origin: ['https://yoursite.com'],
  credentials: true
}));
```

## 📊 パフォーマンス最適化

### 1. キャッシュの実装

```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10分のキャッシュ

async function getCachedPosts() {
  const cacheKey = 'all-posts';
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  const posts = await api.posts.browse({ limit: 'all' });
  cache.set(cacheKey, posts);
  
  return posts;
}
```

### 2. 必要なフィールドのみ取得

```javascript
// 必要最小限のフィールドを指定
const posts = await api.posts.browse({
  fields: 'id,title,slug,published_at',
  limit: 10
});
```

### 3. 並列リクエスト

```javascript
// Promise.allで並列実行
const [posts, pages, tags] = await Promise.all([
  api.posts.browse({ limit: 5 }),
  api.pages.browse({ limit: 5 }),
  api.tags.browse({ limit: 10 })
]);
```

## 📋 APIエンドポイント一覧

### Content API エンドポイント（読み取り専用）

| エンドポイント | 説明 | 例 |
|------------|------|-----|
| `/ghost/api/content/posts/` | 投稿一覧取得 | `GET /ghost/api/content/posts/?key=API_KEY` |
| `/ghost/api/content/posts/{id}/` | 特定の投稿取得（ID） | `GET /ghost/api/content/posts/5a7b4f8c9d3e2a1b3c4d5e6f/?key=API_KEY` |
| `/ghost/api/content/posts/slug/{slug}/` | 特定の投稿取得（スラッグ） | `GET /ghost/api/content/posts/slug/my-post/?key=API_KEY` |
| `/ghost/api/content/pages/` | ページ一覧取得 | `GET /ghost/api/content/pages/?key=API_KEY` |
| `/ghost/api/content/tags/` | タグ一覧取得 | `GET /ghost/api/content/tags/?key=API_KEY` |
| `/ghost/api/content/authors/` | 著者一覧取得 | `GET /ghost/api/content/authors/?key=API_KEY` |
| `/ghost/api/content/settings/` | サイト設定取得 | `GET /ghost/api/content/settings/?key=API_KEY` |

### Admin API エンドポイント（管理者用）

| エンドポイント | メソッド | 説明 | 例 |
|------------|---------|------|-----|
| `/ghost/api/admin/posts/` | POST | 投稿作成 | `POST /ghost/api/admin/posts/` |
| `/ghost/api/admin/posts/{id}/` | PUT | 投稿更新 | `PUT /ghost/api/admin/posts/{id}/` |
| `/ghost/api/admin/posts/{id}/` | DELETE | 投稿削除 | `DELETE /ghost/api/admin/posts/{id}/` |
| `/ghost/api/admin/pages/` | POST | ページ作成 | `POST /ghost/api/admin/pages/` |
| `/ghost/api/admin/tags/` | POST | タグ作成 | `POST /ghost/api/admin/tags/` |
| `/ghost/api/admin/users/` | GET | ユーザー一覧 | `GET /ghost/api/admin/users/` |
| `/ghost/api/admin/images/upload/` | POST | 画像アップロード | `POST /ghost/api/admin/images/upload/` |

## 🎯 クイックスタート例

### Content API - 最新5件の記事を取得

```javascript
// Node.js環境での例
const fetch = require('node-fetch');

async function getLatestPosts() {
  const apiUrl = 'https://あなたのサイト名.ghost.io';
  const contentApiKey = 'YOUR_CONTENT_API_KEY';
  
  const response = await fetch(
    `${apiUrl}/ghost/api/content/posts/?key=${contentApiKey}&limit=5&include=tags,authors`
  );
  
  const data = await response.json();
  
  data.posts.forEach(post => {
    console.log(`タイトル: ${post.title}`);
    console.log(`URL: ${post.url}`);
    console.log(`公開日: ${post.published_at}`);
    console.log('---');
  });
}

getLatestPosts();
```

### Admin API - 新規記事を投稿

```javascript
const GhostAdminAPI = require('@tryghost/admin-api');

const api = new GhostAdminAPI({
  url: 'https://あなたのサイト名.ghost.io',
  key: 'YOUR_ADMIN_API_KEY',
  version: 'v5.0'
});

async function createNewPost() {
  try {
    const post = await api.posts.add({
      title: '新しい記事のタイトル',
      html: '<h2>見出し</h2><p>これは本文です。</p>',
      status: 'published',
      tags: ['API', 'テスト'],
      meta_title: 'SEO用のタイトル',
      meta_description: 'SEO用の説明文'
    });
    
    console.log('記事が作成されました:', post.url);
  } catch (error) {
    console.error('エラー:', error);
  }
}

createNewPost();
```

## 🔗 便利なツールとライブラリ

### 公式ライブラリ

- [@tryghost/content-api](https://www.npmjs.com/package/@tryghost/content-api) - Content API JavaScript SDK
- [@tryghost/admin-api](https://www.npmjs.com/package/@tryghost/admin-api) - Admin API JavaScript SDK

### サードパーティツール

- [gatsby-source-ghost](https://www.gatsbyjs.com/plugins/gatsby-source-ghost/) - Gatsby統合
- [ghost-nextjs](https://github.com/styxlab/next-cms-ghost) - Next.js統合

### 開発に便利なツール

- [Postman](https://www.postman.com/) - API テストツール
- [Thunder Client](https://www.thunderclient.io/) - VS Code拡張機能
- [httpie](https://httpie.io/) - コマンドラインHTTPクライアント

## 📚 参考リンク

- [Ghost Content API Documentation](https://ghost.org/docs/content-api/) - Content API公式ドキュメント
- [Ghost Admin API Documentation](https://ghost.org/docs/admin-api/) - Admin API公式ドキュメント
- [Ghost API Webhooks](https://ghost.org/docs/webhooks/) - Webhook設定
- [Ghost API SDK](https://ghost.org/docs/api/javascript/) - JavaScript SDK
- [Ghost API Tutorials](https://ghost.org/tutorials/) - 公式チュートリアル

---

このガイドを参考に、Ghost APIを活用した強力なアプリケーションを構築してください！🚀