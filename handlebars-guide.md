# Ghost Handlebars初心者ガイド

## 📚 Handlebarsとは？

HandlebarsはGhostで使用されるテンプレートエンジンです。HTMLの中に特別な構文を使って、動的なコンテンツを表示できます。

## 🎯 基本構文

### 1. 変数の表示 `{{変数名}}`

```handlebars
<h1>{{title}}</h1>
<p>{{excerpt}}</p>
```

これは記事のタイトルと抜粋を表示します。

### 2. HTMLエスケープを無効にする `{{{変数名}}}`

```handlebars
{{{content}}}
```

HTMLタグを含むコンテンツをそのまま表示します。

### 3. コメント `{{! コメント }}`

```handlebars
{{! これはコメントです。ブラウザには表示されません }}
```

## 🔧 条件分岐

### if文 - 条件が真の場合に表示

```handlebars
{{#if feature_image}}
    <img src="{{feature_image}}" alt="{{title}}">
{{/if}}
```

### if-else文 - 条件による分岐

```handlebars
{{#if @site.logo}}
    <img src="{{@site.logo}}" alt="{{@site.title}}">
{{else}}
    <span>{{@site.title}}</span>
{{/if}}
```

### unless文 - 条件が偽の場合に表示

```handlebars
{{#unless @member}}
    <a href="/signin/">ログイン</a>
{{/unless}}
```

### 複数条件の確認

```handlebars
{{#if title}}
    {{#if feature_image}}
        <div class="has-title-and-image">
            <!-- 両方ある場合 -->
        </div>
    {{/if}}
{{/if}}
```

## 🔁 ループ処理

### each文 - 配列の繰り返し

```handlebars
{{#foreach posts}}
    <article>
        <h2>{{title}}</h2>
        <p>{{excerpt}}</p>
    </article>
{{/foreach}}
```

### ループ内の特殊変数

```handlebars
{{#foreach tags}}
    {{#if @first}}<ul>{{/if}}
        <li>{{name}}</li>
    {{#if @last}}</ul>{{/if}}
{{/foreach}}
```

- `@first` - 最初の要素
- `@last` - 最後の要素
- `@index` - インデックス番号（0から）
- `@number` - 順番（1から）
- `@odd` - 奇数番目
- `@even` - 偶数番目

## 🎨 Ghostの特殊ヘルパー

### 1. img_url - 画像URLの生成

```handlebars
{{!-- 基本的な使い方 --}}
<img src="{{img_url feature_image}}">

{{!-- サイズ指定 --}}
<img src="{{img_url feature_image size="m"}}">

{{!-- レスポンシブ画像 --}}
<img src="{{img_url feature_image size="xl"}}" 
     srcset="{{img_url feature_image size="s"}} 300w,
             {{img_url feature_image size="m"}} 600w,
             {{img_url feature_image size="l"}} 1000w,
             {{img_url feature_image size="xl"}} 2000w">
```

### 2. date - 日付フォーマット

```handlebars
{{!-- デフォルト形式 --}}
{{date}}

{{!-- カスタム形式 --}}
{{date format="YYYY年MM月DD日"}}
{{date published_at format="MMMM DD, YYYY"}}

{{!-- 相対時間 --}}
{{date published_at timeago="true"}}
```

### 3. excerpt - 抜粋の表示

```handlebars
{{!-- デフォルト（50単語） --}}
{{excerpt}}

{{!-- 文字数指定 --}}
{{excerpt characters="120"}}

{{!-- カスタム抜粋がある場合はそれを、なければ自動生成 --}}
{{#if custom_excerpt}}
    {{custom_excerpt}}
{{else}}
    {{excerpt}}
{{/if}}
```

### 4. content - コンテンツの表示

```handlebars
{{!-- 完全なコンテンツ --}}
{{content}}

{{!-- 文字数制限 --}}
{{content words="50"}}
```

### 5. url - URL生成

```handlebars
{{!-- 記事のURL --}}
<a href="{{url}}">続きを読む</a>

{{!-- 絶対URL --}}
<a href="{{url absolute="true"}}">{{title}}</a>
```

### 6. navigation - ナビゲーションメニュー

```handlebars
{{navigation}}

{{!-- カスタムナビゲーション --}}
<nav>
    {{#foreach navigation}}
        <a href="{{url}}" {{#if current}}class="active"{{/if}}>
            {{label}}
        </a>
    {{/foreach}}
</nav>
```

## 🌐 グローバルデータ

### @site - サイト情報

```handlebars
{{@site.title}} - サイトタイトル
{{@site.description}} - サイト説明
{{@site.url}} - サイトURL
{{@site.logo}} - ロゴ画像URL
{{@site.icon}} - ファビコンURL
{{@site.accent_color}} - アクセントカラー
```

### @config - 設定情報

```handlebars
{{@config.posts_per_page}} - 1ページの記事数
{{@config.image_sizes}} - 画像サイズ設定
```

### @page - ページ情報

```handlebars
{{!-- ベータエディターのページ設定 --}}
{{#unless @page.show_title_and_feature_image}}
    {{!-- タイトルと画像を非表示 --}}
{{/unless}}
```

## 🏗️ テンプレートの継承

### 親テンプレートの指定

```handlebars
{{!< default}}
```

これは`default.hbs`を親テンプレートとして使用します。

### コンテンツの挿入

親テンプレート（default.hbs）:
```handlebars
<!DOCTYPE html>
<html>
<head>
    {{ghost_head}}
</head>
<body>
    {{{body}}}
    {{ghost_foot}}
</body>
</html>
```

子テンプレート（index.hbs）:
```handlebars
{{!< default}}
<h1>ホームページ</h1>
```

## 🎯 実践的な例

### 1. 記事一覧の表示

```handlebars
<div class="post-list">
    {{#foreach posts}}
        <article class="post-card">
            {{#if feature_image}}
                <div class="post-image">
                    <img src="{{img_url feature_image size="m"}}" alt="{{title}}">
                </div>
            {{/if}}
            
            <div class="post-content">
                <h2><a href="{{url}}">{{title}}</a></h2>
                
                <div class="post-meta">
                    <time datetime="{{date published_at format="YYYY-MM-DD"}}">
                        {{date published_at format="YYYY年MM月DD日"}}
                    </time>
                    {{#if tags}}
                        <span class="tags">
                            {{#foreach tags}}
                                <a href="{{url}}">#{{name}}</a>
                            {{/foreach}}
                        </span>
                    {{/if}}
                </div>
                
                <p>{{excerpt characters="160"}}</p>
                
                <a href="{{url}}" class="read-more">続きを読む →</a>
            </div>
        </article>
    {{/foreach}}
</div>
```

### 2. 著者情報の表示

```handlebars
{{#author}}
    <div class="author-box">
        {{#if profile_image}}
            <img src="{{img_url profile_image size="s"}}" alt="{{name}}">
        {{/if}}
        
        <div class="author-info">
            <h3>{{name}}</h3>
            {{#if bio}}
                <p>{{bio}}</p>
            {{/if}}
            
            {{#if website}}
                <a href="{{website}}" target="_blank">ウェブサイト</a>
            {{/if}}
        </div>
    </div>
{{/author}}
```

### 3. ページネーション

```handlebars
{{#if pagination}}
    <nav class="pagination">
        {{#if prev}}
            <a href="{{page_url prev}}">← 前のページ</a>
        {{/if}}
        
        <span class="page-number">
            {{page}} / {{pages}}
        </span>
        
        {{#if next}}
            <a href="{{page_url next}}">次のページ →</a>
        {{/if}}
    </nav>
{{/if}}
```

### 4. タグクラウド

```handlebars
{{#get "tags" limit="all" include="count.posts"}}
    <div class="tag-cloud">
        {{#foreach tags}}
            <a href="{{url}}" class="tag-{{count.posts}}">
                {{name}} ({{count.posts}})
            </a>
        {{/foreach}}
    </div>
{{/get}}
```

## 🔍 デバッグのヒント

### 1. ログ出力

```handlebars
{{log this}} {{!-- 現在のコンテキストをコンソールに出力 --}}
{{log "タイトル:" title}} {{!-- 特定の変数を出力 --}}
```

### 2. データの確認

```handlebars
<pre>
    {{!-- デバッグ用：オブジェクトの内容を表示 --}}
    {{#foreach @site}}
        {{@key}}: {{this}}
    {{/foreach}}
</pre>
```

## ⚠️ よくある間違いと解決方法

### 1. 変数が表示されない

```handlebars
{{!-- 間違い --}}
{{post.title}}

{{!-- 正しい --}}
{{title}}
```

### 2. 条件分岐が動作しない

```handlebars
{{!-- 間違い --}}
{{#if feature_image != ""}}

{{!-- 正しい --}}
{{#if feature_image}}
```

### 3. ループ内での変数アクセス

```handlebars
{{!-- 間違い --}}
{{#foreach posts}}
    {{posts.title}}
{{/foreach}}

{{!-- 正しい --}}
{{#foreach posts}}
    {{title}}
{{/foreach}}
```

### 4. HTMLのエスケープ

```handlebars
{{!-- HTMLタグがエスケープされる --}}
{{content}}

{{!-- HTMLタグがそのまま表示される --}}
{{{content}}}
```

## 📚 参考リンク

- [Ghost Handlebars Theme Helpers](https://ghost.org/docs/themes/helpers/)
- [Handlebars公式ドキュメント](https://handlebarsjs.com/)
- [Ghost Theme Development](https://ghost.org/docs/themes/)

## 💡 プロのヒント

1. **パーシャルを活用**: 繰り返し使用する部分は`partials/`フォルダに分離
2. **条件分岐を簡潔に**: 複雑な条件はカスタムヘルパーで処理
3. **パフォーマンスを意識**: 不要なループや条件分岐を避ける
4. **セマンティックHTML**: アクセシビリティを考慮した構造に
5. **エラーハンドリング**: 存在しない可能性のあるデータは必ず条件分岐で確認

---

このガイドがGhostテーマ開発の第一歩となることを願っています！🚀