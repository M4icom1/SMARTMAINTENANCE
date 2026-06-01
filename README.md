# 🛠️ SmartMaintenance - Sistema de Gestão Industrial

O **SmartMaintenance** é uma aplicação web voltada para a gestão de ativos industriais, agendamento de manutenções (preventivas, preditivas e corretivas) e acompanhamento de indicadores de performance (KPIs). 

O sistema foi construído como uma *Single Page Application (SPA)* utilizando apenas tecnologias base (Vanilla JS, HTML5, CSS3) aliadas ao poder do Tailwind CSS para uma estilização rápida e responsiva.

## ✨ Funcionalidades

- **🔒 Autenticação de Acesso**: Tela de login integrada com validação simples.
- **📊 Dashboard Interativo**: Painel com indicadores chave (KPIs) de equipamentos, manutenções programadas, alertas críticos e taxa de eficácia global.
- **🏭 Gestão de Ativos (Equipamentos)**: Listagem e cadastro de novos maquinários, divididos por setor e com geração de código de patrimônio.
- **📅 Ordens de Manutenção**: Cronograma e registro de novas ordens de serviço por equipamento e tipo (Corretiva, Preventiva, Preditiva).
- **📈 Análise de Eficácia**: Gráficos dinâmicos interativos (gerados via Chart.js) permitindo o filtro por período e equipamento.
- **👥 Controle de Usuários**: Listagem, cadastro e exclusão de usuários do sistema, separando-os por níveis de acesso (Administrador / Técnico).
- **📱 100% Responsivo**: Layout adaptável para computadores, tablets e smartphones (Mobile First), incluindo menu lateral retrátil em dispositivos menores.

## 🚀 Tecnologias Utilizadas

- **HTML5** (Estrutura semântica)
- **CSS3 / Tailwind CSS** (Estilização via CDN, focado em responsividade)
- **JavaScript (ES6+)** (Lógica de negócio, manipulação do DOM e banco de dados em memória)
- **Chart.js** (Renderização gráfica de dados via CDN)
- **FontAwesome** (Ícones da interface via CDN)

## 📂 Estrutura do Projeto

```text
📁 SMARTMAINTENANCE/
│
├── 📄 index.html    # Estrutura principal da aplicação e de todas as telas
├── 📄 styles.css    # Estilização complementar e variáveis customizadas
├── 📄 app.js        # Lógica de negócio, roteamento, CRUDs e gráficos
└── 📄 README.md     # Documentação do projeto
```

## ⚙️ Como Executar o Projeto

Por ser um projeto puramente *Client-Side* (Front-end Vanilla), você não precisa de nenhum servidor complexo ou Node.js para rodá-lo localmente.

1. Faça o clone do repositório ou baixe os arquivos da pasta do projeto.
2. Navegue até o diretório `SMARTMAINTENANCE`.
3. Dê um duplo clique no arquivo `index.html` para abri-lo no seu navegador padrão (Google Chrome, Edge, Firefox, Safari, etc).
   * *Opcional: Você pode utilizar extensões como o "Live Server" no VS Code para uma melhor experiência de desenvolvimento.*

## 🔑 Credenciais de Acesso (Teste)

Ao abrir a aplicação, você se deparará com a tela de Login. Utilize as seguintes credenciais fictícias presentes no código para acessar:

- **E-mail:** `admin@gmail.com`
- **Senha:** `admin`

## 🚧 Próximos Passos & Melhorias (Roadmap)

- [ ] Conectar os dados a um LocalStorage para persistência de dados no navegador.
- [ ] Desenvolver um back-end (Node.js/Python) com um banco de dados real (MySQL/PostgreSQL/MongoDB).
- [ ] Implementar paginação nas tabelas de equipamentos e manutenções.
- [ ] Adicionar exportação de relatórios em PDF/Excel.
- [ ] Criar alertas/toasts animados de feedback (ex: "Equipamento salvo com sucesso").

---

Desenvolvido com 💡 e ☕ para otimizar o setor de manutenção industrial.