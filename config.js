// Configurações do Google Sheets API
const CONFIG = {
    CLIENT_ID: 'SUA_CLIENT_ID',
    API_KEY: 'SEU_API_KEY',
    SPREADSHEET_ID: 'SEU_SPREADSHEET_ID',
    DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    SCOPES: "https://www.googleapis.com/auth/spreadsheets",
    RANGE: 'Sheet1!A:E'
};

// Verificar se as configurações estão corretas
console.log('CLIENT_ID:', CONFIG.CLIENT_ID);
console.log('API_KEY:', CONFIG.API_KEY);
console.log('SPREADSHEET_ID:', CONFIG.SPREADSHEET_ID);
console.log('SCOPES:', CONFIG.SCOPES);
console.log('RANGE:', CONFIG.RANGE);
