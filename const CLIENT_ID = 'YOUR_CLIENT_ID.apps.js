const CLIENT_ID = 'SUA_CLIENT_ID';
const API_KEY = 'SEU_API_KEY';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

// Corrigir o formato do SPREADSHEET_ID - remover a URL completa e manter apenas o ID
const SPREADSHEET_ID = 'SEU_SPREADSHEET_ID';
const RANGE = 'Sheet1!A:E'; // Atualizado para incluir a coluna E (categoria)

const authorizeButton = document.getElementById('authorize_button');
const signoutButton = document.getElementById('signout_button');
const financeForm = document.getElementById('financeForm');

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
        // Inicializar os gráficos após a autenticação
        initCharts();
        // Carregar dados iniciais
        loadData();
    }).catch(error => {
        showNotification('Erro ao inicializar: ' + error.details, 'danger');
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
}

financeForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = document.getElementById('data').value;
    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const tipo = document.getElementById('tipo').value;
    const values = [
        [data, descricao, valor, tipo]
    ];
    const body = { values };

    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
        valueInputOption: 'USER_ENTERED',
        resource: body
    }).then(response => {
        console.log(response);
        financeForm.reset();
    }, error => {
        console.error('Erro ao salvar dados: ' + error.result.error.message);
    });
});

// Inicia o carregamento do gapi
handleClientLoad();
