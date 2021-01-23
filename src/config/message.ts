export const MESSAGE = {
  INVALID_TYPE: '正しい形式で入力してください',
  NOT_EXISTS_URL: '対象のサイトが存在しません',
  ALREADY_EXISTS: '既に登録された情報があるため登録に失敗しました',
  DUPLICATE_KEYWORDS: '重複したキーワードがあるため登録に失敗しました',
  SEARCHING: '現在検索中です。\n検索が終了すると操作を行えるようになります。',
  ALL_SEARCHED:
    '本日は全ての検索が完了しています。\nまた明日以降検索が行えます。',
  SEARCH_ERROR: 'エラーが発生しました。\n再度時間を置いて実行し直してください。',
  INVALID_TOKEN_FORMAT: 'トークンの形式が不正です。\n確認の上、再度ご入力ください。',
  INVALID_TOKEN: 'トークンが誤っています。\n再度入力をご確認ください。',
  INPUT_TOKEN: 'メールに記載されたアクセストークンを入力してください',
  INVALID_ADD_SITE: (num: number) => `現在のプランではサイトを${num}個までしか追加できません`,
  INVALID_ADD_KEYWORD: (num: number, current: number) =>
    `現在のプランではキーワードを${num}個までしか登録できません（現在登録数：${current}）`
}

export const ERROR_MESSAGE = {
  NETWORK: 'ネットワークに接続されていないため失敗しました',
  SERVER: 'サーバーエラーが発生しました。\n再度お試しください'
}

export const NOTIFICATION = {
  TOKEN_INPUT_COMPLETED: 'トークンを有効化しました',
  TOKEN_ACTIVATED: 'トークンは有効化されています'
}

export const DELETE_CONFIRM = (keyword: string) =>
  `「${keyword}」を削除します。よろしいですか？`
