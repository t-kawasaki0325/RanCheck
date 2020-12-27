export const MESSAGE = {
  INVALID_TYPE: '正しい形式で入力してください',
  NOT_EXISTS_URL: '対象のサイトが存在しません',
  ALREADY_EXISTS: '既に登録された情報があるため登録に失敗しました',
  DUPLICATE_KEYWORDS: '重複したキーワードがあるため登録に失敗しました',
  SEARCHING: '現在検索中です。\n検索が終了すると操作を行えるようになります。',
  ALL_SEARCHED:
    '本日は全ての検索が完了しています。\nまた明日以降検索が行えます。',
  SEARCH_ERROR: 'エラーが発生しました。\n再度時間を置いて実行し直してください。',
  INVALID_TOKEN_FORMAT: 'トークンの形式が不正です。\nトークンは13文字の英数字です。',
  INPUT_TOKEN: 'メールに記載されたアクセストークンを入力してください'
}

export const DELETE_CONFIRM = (keyword: string) =>
  `「${keyword}」を削除します。よろしいですか？`
