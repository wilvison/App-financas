# Estrutura da Planilha

## Nome da Planilha: Controle Financeiro Familiar

### Aba: Sheet1
Estrutura das colunas:

| A    | B          | C      | D      | E          |
|------|------------|--------|---------|------------|
| Data | Descrição  | Valor  | Tipo    | Categoria  |

### Configurações de Formatação

1. **Coluna A (Data)**
   - Formato: Data
   - Exemplo: DD/MM/AAAA

2. **Coluna B (Descrição)**
   - Formato: Texto
   - Exemplo: Salário, Aluguel, Supermercado

3. **Coluna C (Valor)**
   - Formato: Moeda
   - Configurar como "R$ #.##0,00"

4. **Coluna D (Tipo)**
   - Formato: Texto
   - Valores permitidos: entrada, saida
   - Dica: Use validação de dados para limitar as entradas

5. **Coluna E (Categoria)**
   - Formato: Texto
   - Valores permitidos: salario, moradia, alimentacao, transporte, lazer, outros
   - Dica: Use validação de dados para limitar as entradas

### Passos para Configuração

1. Abra o Google Sheets
2. Crie uma nova planilha
3. Renomeie a primeira aba para "Sheet1"
4. Adicione os cabeçalhos na primeira linha:
   ```
   A1: Data
   B1: Descrição
   C1: Valor
   D1: Tipo
   E1: Categoria
   ```
5. Configure a formatação:
   - Selecione A2:A
   - Menu > Formato > Número > Data
   
   - Selecione C2:C
   - Menu > Formato > Número > Moeda

6. Configure a validação de dados para a coluna Tipo:
   - Selecione D2:D
   - Menu > Dados > Validação de dados
   - Critérios: Lista de itens
   - Items: entrada, saida

7. Configure a validação de dados para a coluna Categoria:
   - Selecione E2:E
   - Menu > Dados > Validação de dados
   - Critérios: Lista de itens
   - Items: salario, moradia, alimentacao, transporte, lazer, outros

8. Copie o ID da planilha da URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```

9. Cole o ID no arquivo script.js na constante SPREADSHEET_ID

### Exemplo de Dados

| Data       | Descrição     | Valor    | Tipo    | Categoria  |
|------------|---------------|----------|---------|------------|
| 01/01/2024 | Salário      | 5000,00  | entrada | salario    |
| 05/01/2024 | Aluguel      | 1200,00  | saida   | moradia    |
| 10/01/2024 | Supermercado | 800,00   | saida   | alimentacao|
