// クライアント ID とクライアントシークレットを取得する
const clientId = "804203482601-g0o335vhgor6e83evbht2tvau9l2o000.apps.googleusercontent.com";
const clientSecret = "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";

// Google OAuth2 クライアントを作成
const oauth2 = new google.auth.OAuth2(clientId, clientSecret, "https://www.googleapis.com/auth/gmail.readonly");

// ログイン画面を表示する
const url = oauth2.generateAuthUrl();
window.location.href = url;

// ログイン後に実行される関数
async function onSignIn(authResult) {
  // 認証結果を取得する
  const credentials = authResult.credentials;

  // Gmail API クライアントを作成
  const gmail = new google.gmail.v1.Gmail({
    auth: credentials,
  });

  // メールの一覧を取得する
  const listResponse = await gmail.users.messages.list({
    userId: "me",
  });

  // メールの件名を表示する
  for (const message of listResponse.messages) {
    console.log(message.payload.headers.subject);
  }
}

// イベントリスナーを登録する
google.auth.attachBrowserEventListener(onSignIn);
