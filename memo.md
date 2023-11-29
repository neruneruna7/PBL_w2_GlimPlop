{
  "access_token": "ya29.a0AfB_byCuHm2-qQhGQC0fEVuHD1wtxipzV5AP8H33r0vKXQfOODrcGjPGLPVuDMv9XMEbBdOPvvDhwC-xPyrhsjnuCuMCmfTv-Yt7_cCxctYEFv0O9Frz4mZXkdL5mZ_FUugn-GdNcaDP-C9QW2n9kYrUDjIC7ucmSwaCgYKAWsSARESFQHGX2MiGUYCmw145PxAiif_eAqDEQ0169",
  "token_type": "Bearer",
  "expires_in": 3599,
  "scope": "https://www.googleapis.com/auth/gmail.readonly"
}

# 方針
トークンをセッションストレージに保存する．

ログイン時にトークンを取得し，セッションストレージに保存する．
ログアウト時にセッションストレージからトークンを削除する．

トークンがセッションストレージに存在する場合は，トークンを取得し，ログインをスキップする．