// Configurações do Google Sheets API
const CONFIG = {
    CLIENT_ID: '949830020354-9lrrn42760jue4j04kfai3bk09p4upkd.apps.googleusercontent.com',
    API_KEY: 'AIzaSyB86hsVeUrzwQYwzbaRCYdU3paEj736MG8',
    SPREADSHEET_ID: '1_Gstx0m4xoNA5ynVTjMoUE33vB63JqOueXh5PLkLMS4',
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
