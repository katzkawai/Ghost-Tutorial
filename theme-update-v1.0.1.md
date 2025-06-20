# テーマアップデート v1.0.1

## 🔧 修正内容

### Ghost.ioアップロードエラーの修正
- `page.hbs`で`@page.show_title_and_feature_image`設定に対応
- ベータエディターで作成されたページの表示設定を適切に処理

### 修正詳細
```handlebars
{{#unless @page.show_title_and_feature_image}}
    {{!-- タイトルとアイキャッチ画像を非表示 --}}
{{else}}
    {{!-- タイトルとアイキャッチ画像を表示 --}}
{{/unless}}
```

この修正により、Ghost管理画面のページ設定で「Show title and feature image」のオン/オフが正しく反映されるようになりました。

## 📦 更新されたファイル
- `portfolio.zip` - 修正版のテーマパッケージ

## 🚀 再アップロード手順
1. Ghost管理画面にログイン
2. Settings → Design → Change theme
3. 既存の「Portfolio」テーマの上に新しい`portfolio.zip`をアップロード
4. エラーが解消されていることを確認
5. 「Activate」をクリック

## ✅ 期待される結果
- アップロード時のエラーメッセージが表示されなくなります
- ページ設定の「Show title and feature image」オプションが正しく機能します
- 既存のカスタマイズ設定は保持されます