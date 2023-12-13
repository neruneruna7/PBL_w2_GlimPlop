/**
 * Print all Labels in the authorized user's inbox. If no labels
 * are found an appropriate message is printed.
 */

function setGmailToken(){
    // Retrieve the token from local storage
    const tokenString = localStorage.getItem('gmailToken');

    if (tokenString == null) {
        console.log('No token found.');
        return false;
    }

    const token = JSON.parse(tokenString);
    gapi.client.setToken(token);
    console.log('token: retrieved from local storage');

    return true;
}

function getGmailToken(){
    gapi.client.getToken();
}

function deleteGmailToken(){
    gapi.client.setToken('');
}
function authClick2(){
    const token = gapi.client.getToken();
    console.log('token');
    console.log(token);
}

async function listLabels() {
    let response;
    let res2;
    let res3;
    let res_label_vec;
    try {
        console.log('token label');
        const token = gapi.client.getToken();
        console.log(token);

        // Save the token to local storage
        localStorage.setItem('gmailToken', JSON.stringify(token));

        // response = await gapi.client.gmail.users.labels.list({
        // 'userId': 'me',
        // });

        // ドキュメントのURLとか諸々をもとに，次のようにリクエストを送信できそう
        res2 = await gapi.client.request({
        'method': 'GET',
        'path': 'https://gmail.googleapis.com/gmail/v1/users/me/labels',
        'params': {'access_token': gapi.client.getToken().access_token}
        });

        // // 指定したラベルを持つメールを取得したい
        // res_label_vec = await gapi.client.request({
        // 'method': 'GET',
        // 'path': 'https://gmail.googleapis.com/gmail/v1/users/me/labels',
        // 'params': {'access_token': gapi.client.getToken().access_token}
        // });


        // フィルターを設定したい
        // res3 = await gapi.client.request({
        //   'method': 'POST',
        //   'path': 'https://gmail.googleapis.com/gmail/v1/users/me/settings/filters',
        //   'params': {'access_token': gapi.client.getToken().access_token},
        //   'body': {
        //     'criteria': {
        //       'from': 'from:

        // console.log(res2);
    } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
    }
    const labels = res2.result.labels;
    if (!labels || labels.length == 0) {
        document.getElementById('content').innerText = 'No labels found.';
        return;
    }
    // Flatten to string to display
    const output = labels.reduce(
        (str, label) => `${str}${label.name}\n`,
        'Labels:\n');
    document.getElementById('content').innerText = output;
}

/**
 * @param {string[]} labels - The labels to search for.
 * 文字列配列で渡したラベルがついたメッセージという条件をとり，その論理和を取ったメッセージidの集合を取得する
 */
async function listMessages(labels) {
    const labelQuery = labels.map(label => `label:${label}`).join(' OR ');
    const response = await gapi.client.gmail.users.messages.list({
        'userId': 'me',
        'q': labelQuery
    });

    const messages = response.result.messages;
    console.log(messages);

    return messages;
}

async function getMessage(messageId) {
    const response = await gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': messageId,
        'format': 'full'
    });

    // const message = response.result;
    // const payload = message.payload;
    // const headers = payload.headers;
    // const subjectHeader = headers.find(header => header.name === 'Subject');
    // const subject = subjectHeader ? subjectHeader.value : '';

    // const parts = payload.parts;
    // const bodyPart = parts.find(part => part.mimeType === 'text/plain');
    // const body = bodyPart ? atob(bodyPart.body.data) : '';

    // console.log(`Subject: ${subject}`);
    // console.log(`Body: ${body}`);
    console.log(response);

    return response;
}

    /**
 * @param {string[]} labels - The labels to search for.
 * 文字列配列で渡したラベルがついたメッセージという条件をとり，その論理和を取ったメッセージidの集合を取得する
 * さらにそのメッセージの内容を取得する
 */
async function listMessagesAndFetchContent(labels) {
    const messages = await listMessages(labels);
    const messageContents = await Promise.all(
        messages.map(message => getMessage(message.id)));
    console.log(messageContents);
}

/**
 * フィルタを作成する
 **/
async function createFilter() {
    const response = await gapi.client.gmail.users.settings.filters.create({
        'userId': 'me',
        'resource': {
            'criteria': {
                'from': 'example@example.com',
                'subject': '特定の文字列'
            },
            'action': {
                'addLabelIds': ['INBOX'],
            }
        }
    });

    console.log(response);
}