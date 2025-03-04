function preventCaching() {
    // Prevenir cache do navegador
    window.addEventListener('load', function() {
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    });
}

preventCaching();

let despesasChart;
let balancoChart;

function initCharts() {
    // Gráfico de Despesas
    const despesasCtx = document.getElementById('despesas-chart').getContext('2d');
    despesasChart = new Chart(despesasCtx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuição de Despesas'
                }
            }
        }
    });

    // Gráfico de Balanço
    const balancoCtx = document.getElementById('balanco-chart').getContext('2d');
    balancoChart = new Chart(balancoCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Balanço Mensal',
                data: [],
                backgroundColor: '#3498db'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Balanço Mensal'
                }
            }
        }
    });
}

function updateDashboard(data) {
    let totalEntradas = 0;
    let totalSaidas = 0;
    const despesasPorCategoria = {};

    data.forEach(row => {
        const valor = parseFloat(row[2]);
        if (row[3] === 'entrada') {
            totalEntradas += valor;
        } else {
            totalSaidas += valor;
            if (!despesasPorCategoria[row[1]]) {
                despesasPorCategoria[row[1]] = 0;
            }
            despesasPorCategoria[row[1]] += valor;
        }
    });

    // Atualiza cards de resumo
    document.getElementById('saldo-total').textContent = `R$ ${(totalEntradas - totalSaidas).toFixed(2)}`;
    document.getElementById('total-entradas').textContent = `R$ ${totalEntradas.toFixed(2)}`;
    document.getElementById('total-saidas').textContent = `R$ ${totalSaidas.toFixed(2)}`;

    // Atualiza gráfico de despesas
    despesasChart.data.labels = Object.keys(despesasPorCategoria);
    despesasChart.data.datasets[0].data = Object.values(despesasPorCategoria);
    despesasChart.update();

    // Adiciona totais por categoria
    const totalPorCategoria = {};
    data.forEach(row => {
        if (row[3] === 'saida') {
            const categoria = row[4] || 'outros';
            totalPorCategoria[categoria] = (totalPorCategoria[categoria] || 0) + parseFloat(row[2]);
        }
    });

    // Atualiza o gráfico de despesas por categoria
    despesasChart.data.labels = Object.keys(totalPorCategoria);
    despesasChart.data.datasets[0].data = Object.values(totalPorCategoria);
    despesasChart.update();

    // Atualiza lista de transações
    updateTransactionsList(data);
}

function updateTransactionsList(data) {
    const container = document.getElementById('transactions-list');
    container.innerHTML = '';
    
    data.slice(-5).forEach(row => {
        const div = document.createElement('div');
        div.classList.add('transaction');
        div.innerHTML = `
            <p>${row[0]} - ${row[1]}</p>
            <p class="${row[3]}">R$ ${parseFloat(row[2]).toFixed(2)}</p>
        `;
        container.appendChild(div);
    });
}

// Modifique a função handleClientLoad para inicializar os gráficos
function handleClientLoad() {
    initCharts();
    gapi.load('client:auth2', initClient);
}

// Modifique a função de callback do formulário para atualizar o dashboard
financeForm.addEventListener('submit', async event => {
    event.preventDefault();
    
    try {
        if (!gapi?.auth2?.getAuthInstance()?.isSignedIn?.get()) {
            showNotification('Por favor, faça login primeiro!', 'danger');
            return;
        }
        
        const data = document.getElementById('data').value;
        const descricao = document.getElementById('descricao').value;
        const valor = parseFloat(document.getElementById('valor').value).toFixed(2);
        const tipo = document.getElementById('tipo').value;
        const categoria = document.getElementById('categoria').value;

        // Validação dos campos
        if (!data || !descricao || !valor || !tipo || !categoria) {
            showNotification('Preencha todos os campos!', 'danger');
            return;
        }

        const values = [[data, descricao, valor, tipo, categoria]];

        console.log('Enviando dados para a planilha...');
        gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: CONFIG.SPREADSHEET_ID,
            range: CONFIG.RANGE,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: values
            }
        }).then(response => {
            console.log('Dados salvos:', response);
            showNotification('Transação registrada com sucesso!', 'success');
            financeForm.reset();
            loadData(); // Recarrega os dados após salvar
        }).catch(error => {
            console.error('Erro ao salvar:', error);
            showNotification('Erro ao salvar dados: ' + (error.result?.error?.message || error.message), 'danger');
        });
        
    } catch (error) {
        console.error('Erro na autenticação:', error);
        showNotification('Erro na autenticação. Por favor, faça login novamente.', 'danger');
    }
});

// Função para verificar se a planilha existe e tem as permissões corretas
function verificarPlanilha() {
    gapi.client.sheets.spreadsheets.get({
        spreadsheetId: CONFIG.SPREADSHEET_ID
    }).then(response => {
        console.log('Planilha encontrada:', response);
        loadData();
    }).catch(error => {
        console.error('Erro detalhado:', error);
        showNotification('Erro ao acessar planilha: ' + (error.result?.error?.message || error.message), 'danger');
    });
}

// Modificar a função initClient para garantir que o gapi esteja carregado
async function initClient() {
    try {
        console.log('Inicializando a API do Google...');
        await gapi.client.init({
            apiKey: CONFIG.API_KEY,
            clientId: CONFIG.CLIENT_ID,
            discoveryDocs: CONFIG.DISCOVERY_DOCS,
            scope: CONFIG.SCOPES
        });

        // Verificar se o gapi.auth2 está disponível
        if (!gapi.auth2) {
            console.log('Carregando gapi.auth2...');
            await new Promise((resolve) => gapi.load('auth2', resolve));
        }

        const auth2 = gapi.auth2.init();
        auth2.isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(auth2.isSignedIn.get());

        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;

        if (auth2.isSignedIn.get()) {
            console.log('Usuário está autenticado. Verificando a planilha...');
            verificarPlanilha();
        } else {
            console.log('Usuário não está autenticado.');
        }

    } catch (error) {
        console.error('Erro na inicialização:', error);
        showNotification('Erro ao inicializar. Por favor, recarregue a página.', 'danger');
    }
}

function loadData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: CONFIG.SPREADSHEET_ID,
        range: CONFIG.RANGE
    }).then(response => {
        const values = response.result.values || [];
        updateDashboard(values);
    }).catch(error => {
        console.error('Erro ao carregar dados:', error);
        showNotification('Erro ao carregar dados', 'danger');
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

function filtrarPorMes() {
    const mesFiltro = document.getElementById('mes-filtro').value;
    if (!mesFiltro) return;
    
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: CONFIG.SPREADSHEET_ID,
        range: CONFIG.RANGE
    }).then(response => {
        const values = response.result.values || [];
        const dadosFiltrados = values.filter(row => {
            const data = new Date(row[0]);
            const mesAno = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
            return mesAno === mesFiltro;
        });
        updateDashboard(dadosFiltrados);
    });
}
