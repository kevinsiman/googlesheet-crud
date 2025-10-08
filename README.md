# 🚀 TO-DO List API - Google Sheets Backend

Uma API RESTful simples para gerenciamento de tarefas (TO-DO List), utilizando **Google Sheets** como banco de dados (Infraestrutura) e implementando princípios de **Arquitetura Limpa (Clean Architecture) e SOLID**.

## 🛠️ Tecnologias Utilizadas

  * **Node.js / Express:** Servidor back-end
  * **TypeScript:** Linguagem de desenvolvimento
  * **`google-spreadsheet`:** Biblioteca para interagir com o Google Sheets
  * **Arquitetura:** Use Cases, Repository Pattern, Custom Errors (SOLID)

## 🏗️ Arquitetura do Projeto (SOLID / Clean Architecture)

Este projeto foi desenhado para maximizar a **separação de responsabilidades (SRP)** e a **inversão de dependência (DIP)** entre as camadas:

| Camada | Arquivos Relacionados | Responsabilidade | Princípio Chave |
| :--- | :--- | :--- | :--- |
| **Infraestrutura** | `spreadsheet-repository.ts`, `getsheet-repository.ts` | Conexão com a fonte de dados (Google Sheets) e lógica de CRUD bruta. Lança exceções de domínio. | **DIP** (Implementa interfaces) |
| **Domínio / Use Cases** | `*usecase.ts` (ex: `create-todo-usecase.ts`) | Regras de negócio da aplicação. Orquestra a execução da tarefa, recebendo dados e chamando o repositório. | **SRP** (Uma classe por operação) |
| **Entrada / Adaptação** | `routes.ts` (Controladores) | Recebe a requisição HTTP, valida parâmetros simples e mapeia as exceções de domínio para respostas HTTP (Status Code). | **DIP** (Depende de Use Cases) |
| **Erros** | `base-error.ts`, `application-errors.ts` | Define um vocabulário de erros de domínio (`BadRequestError`, `NotFoundError`, `ConflictError`, `InternalServerError`). | **LSP** (Classes de erro herdam de BaseError) |

## 🔗 Endpoints da API

| Método (Verbo) | Rota | Descrição | Use Case |
| :--- | :--- | :--- | :--- |
| `POST` | `/create` | Cria uma nova tarefa. | `CreateTodoUseCase` |
| `POST` | `/read` | Retorna todas as tarefas. | `GetTodosUseCase` |
| `POST` | `/get` | Retorna uma tarefa específica por `id` (no corpo da requisição). | `GetTodoUseCase` |
| `PUT` | `/update` | Atualiza uma tarefa existente pelo `id`. | `UpdateTodoUseCase` |
| `DELETE` | `/delete` | Exclui uma tarefa pelo `id`. | `DeleteTodoUseCase` |


## 🛑 Tratamento de Erros

O tratamento de erros é centralizado no arquivo de rotas (`routes.ts`).

1.  Os Repositórios e Use Cases **lançam (throw)** as classes de erro personalizadas (ex: `NotFoundError`, `ConflictError`).
2.  A camada de Rotas **captura** a exceção.
3.  Se o erro for uma instância de `BaseError`, ela utiliza a propriedade **`httpStatus`** definida na classe de erro para retornar o Status Code correto (400, 404, 409, 500).

## ⚙️ Instalação e Configuração

### Pré-requisitos

  * Node.js (versão LTS)
  * Conta Google e acesso ao Google Sheets

### 1\. Configurar o Google Sheets

1.  Crie uma nova planilha no Google Sheets.
2.  Adicione as colunas exatas: **ID**, **DATA**, **DESC**, **STATUS**.
3.  Crie um projeto no Google Cloud Console e ative a **Google Sheets API**.
4.  Crie uma conta de serviço e baixe o arquivo de credenciais JSON (`client_secret.json`).
5.  **Compartilhe** a planilha criada (Passo 1) com o e-mail da sua Conta de Serviço.

### 2\. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis:

```env
# Seu Client Email da conta de serviço
GOOGLE_CLIENT_EMAIL="seu-email-aqui@gcp-project.iam.gserviceaccount.com"

# Sua chave privada da conta de serviço (Copie todo o valor, incluindo \n)
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..." 

# O ID da sua planilha (você pega na URL: /d/{ID_DA_PLANILHA}/edit)
NEXT_PUBLIC_SPREADSHEET_ID="id_da_sua_planilha"

# O nome exato da aba onde estão os dados (ex: 'Página1' ou 'Dados')
NEXT_PUBLIC_ABA_NAME="nome_exato_da_sua_aba" 
```

### 3\. Executar o Projeto

1.  Instale as dependências:
    ```bash
    npm install
    ```
2.  Inicie o servidor:
    ```bash
    npm run dev # ou o comando que você utiliza para iniciar o servidor Node/TypeScript
    ```

O servidor estará rodando em `http://localhost:3333`.
