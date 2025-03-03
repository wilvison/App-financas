# Controle Financeiro Familiar

Este projeto é um aplicativo web simples que utiliza a API do Google Sheets para armazenar dados financeiros.

## Pré-requisitos

- Navegador atualizado.
- Conta Google com API do Google Sheets habilitada.
- Credenciais: Client ID, API Key e Spreadsheet ID.

## Instalação

1. Clone ou faça o download do projeto.
2. Abra o arquivo `index.html` em seu navegador.

## Configuração da API

1. Acesse o [Google Developers Console](https://console.developers.google.com/) e crie um novo projeto.
2. Ative a API do Google Sheets e gere as credenciais:
   - Insira o Client ID e API Key no arquivo `script.js` nos placeholders `YOUR_CLIENT_ID` e `YOUR_API_KEY`.
   - Crie ou utilize uma planilha existente e atualize o `SPREADSHEET_ID` em `script.js`.
3. Certifique-se de que a planilha possua uma aba chamada "Sheet1" ou altere o valor da variável `RANGE` conforme necessário.

## Uso

- Clique em **Autorizar** para realizar o login com sua conta Google.
- Preencha o formulário com data, descrição, valor e tipo (entrada/saída).
- Clique em **Salvar** para enviar os dados à planilha.

## Estrutura do Repositório

```
project/
├── index.html
├── script.js
└── style.css
```

## Estrutura da Planilha

A planilha do Google Sheets deve conter as seguintes colunas:
- A: Data
- B: Descrição
- C: Valor
- D: Tipo (entrada/saída)

## Autor

Nome: Wilvison Ralis Cardoso
Email: wilvison@gmail.com
GitHub: [\[wilvison\]](https://github.com/wilvison)

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](https://github.com/wilvison/App-financas/tree/main#:~:text=3%20minutes%20ago-,License.md,-publica%C3%A7%C3%A3o%20no%20github) para detalhes.
