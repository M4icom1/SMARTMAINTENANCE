// Estado inicial em memória (Mock DB)
let dbEquips = [
    { nome: 'Compressor Principal', codigo: 'COMP-01', setor: 'Utilidades' },
    { nome: 'Gerador Diesel B2', codigo: 'GEN-02', setor: 'Energia' },
    { nome: 'Torno CNC Router', codigo: 'CNC-10', setor: 'Produção' },
    { nome: 'Ponte Rolante 10T', codigo: 'PR-05', setor: 'Logística' },
    { nome: 'Caldeira Vapor A1', codigo: 'CAL-01', setor: 'Utilidades' },
    { nome: 'Bomba de Recalque', codigo: 'BMB-03', setor: 'Utilidades' }
];
let dbMaints = [
    { equip: 'Compressor Principal', data: '10/06/2026', tipo: 'Preditiva', resp: 'Eng. Roberto' },
    { equip: 'Caldeira Vapor A1', data: '15/06/2026', tipo: 'Preventiva', resp: 'Tec. Márcio' }
];
let dbUsers = [
    { nome: 'Administrador Geral', email: 'admin@gmail.com', perfil: 'Administrador' }
];

const mesesLabel = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// Autenticação
function validarLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-senha').value;

    if (email === "admin@gmail.com" && pass === "admin") {
        showScreen('screen-app');
    } else {
        alert("Acesso Negado! Verifique e-mail e senha.");
    }
}

function logout() {
    document.getElementById('login-email').value = "";
    document.getElementById('login-senha').value = "";
    showScreen('screen-login');
}

// Controle de Interface e Navegação
function showScreen(id) {
    document.querySelectorAll('[id^="screen-"]').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if(id === 'screen-app') renderAll();
}

function showSection(id, el) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('sidebar-active'));
    document.getElementById(id).classList.remove('hidden');
    if(el) el.classList.add('sidebar-active');
    else if(id.includes('usuario')) document.getElementById('nav-usuarios').classList.add('sidebar-active');

    document.getElementById('page-title').innerText = id.replace('section-', '').toUpperCase();
    if(id === 'section-analise') setTimeout(initChart, 100);

    // Autoclose do menu mobile ao selecionar uma opção de navegação
    const sidebar = document.getElementById('sidebar');
    if(sidebar && window.innerWidth < 768) {
        sidebar.classList.add('hidden');
        sidebar.classList.remove('flex');
    }
}

// Alternância de visibilidade do menu em dispositivos móveis
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
    sidebar.classList.toggle('flex');
}

// Atualização de dados no DOM (Renderização)
function renderAll() {
    document.getElementById('lista-equipamentos').innerHTML = dbEquips.map(e => `<tr><td class="p-4 font-bold">${e.nome}</td><td class="p-4 text-slate-500">${e.codigo}</td><td class="p-4">${e.setor}</td><td class="p-4"><span class="status-badge status-ok">Operando</span></td></tr>`).join('');
    
    const options = dbEquips.map(e => `<option value="${e.nome}">${e.nome}</option>`).join('');
    document.getElementById('m-equip').innerHTML = options;
    document.getElementById('f-equip').innerHTML = `<option value="todos">-- Todos os Ativos --</option>` + options;

    document.getElementById('lista-manutencoes').innerHTML = dbMaints.map(m => `<tr><td class="p-4 font-bold text-slate-700">${m.equip}</td><td class="p-4 font-bold">${m.data}</td><td class="p-4"><span class="font-bold ${m.tipo === 'Corretiva' ? 'text-red-600' : 'text-blue-600'}">${m.tipo}</span></td><td class="p-4">${m.resp}</td></tr>`).join('');

    document.getElementById('lista-usuarios').innerHTML = dbUsers.map((u, i) => `
        <tr><td class="p-4 font-bold">${u.nome}</td><td class="p-4">${u.email}</td><td class="p-4 font-bold text-blue-600 text-xs">${u.perfil}</td>
        <td class="p-4 text-center"><button onclick="excluirUser(${i})" class="text-red-400 hover:text-red-700"><i class="fas fa-trash-alt"></i></button></td></tr>
    `).join('');

    document.getElementById('dash-equip-count').innerText = String(dbEquips.length).padStart(2, '0');
    document.getElementById('dash-maint-count').innerText = String(dbMaints.length).padStart(2, '0');
}

// Operações CRUD (Create, Read, Update, Delete)
function salvarEquipamento(e) { e.preventDefault(); dbEquips.push({ nome: document.getElementById('e-nome').value, codigo: document.getElementById('e-codigo').value, setor: document.getElementById('e-setor').value }); renderAll(); showSection('section-equipamentos'); e.target.reset(); }
function salvarManutencao(e) { e.preventDefault(); dbMaints.push({ equip: document.getElementById('m-equip').value, data: document.getElementById('m-data').value.split('-').reverse().join('/'), tipo: document.getElementById('m-tipo').value, resp: document.getElementById('m-resp').value }); renderAll(); showSection('section-manutencoes'); e.target.reset(); }
function salvarNovoUsuario(e) { e.preventDefault(); dbUsers.push({ nome: document.getElementById('u-nome').value, email: document.getElementById('u-email').value, perfil: document.getElementById('u-perfil').value }); renderAll(); showSection('section-usuarios'); e.target.reset(); }
function excluirUser(i) { if(confirm("Deseja deletar este usuário?")) { dbUsers.splice(i, 1); renderAll(); } }

// Configuração e Atualização de Gráficos (Chart.js)
let chart = null;
function initChart() {
    const ctx = document.getElementById('eficaciaChart').getContext('2d');
    if(chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [
                { label: 'Preventiva', data: [20, 25, 30, 35, 32, 40], borderColor: '#2563eb', tension: 0.3, fill: false },
                { label: 'Preditiva', data: [5, 10, 15, 20, 25, 30], borderColor: '#059669', tension: 0.3, fill: false },
                { label: 'Corretiva', data: [30, 20, 15, 8, 10, 4], borderColor: '#dc2626', tension: 0.3, fill: false }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });
}

function updateChart() {
    if(!chart) return;

    const start = document.getElementById('f-inicio').value;
    const end = document.getElementById('f-fim').value;
    const equip = document.getElementById('f-equip').value;

    // Ajuste dinâmico do eixo X baseado no range de datas selecionado
    if (start && end) {
        const sDate = new Date(start);
        const eDate = new Date(end);
        let newLabels = [];
        let tempDate = new Date(sDate);

        while (tempDate <= eDate && newLabels.length < 12) {
            newLabels.push(mesesLabel[tempDate.getMonth()]);
            tempDate.setMonth(tempDate.getMonth() + 1);
        }
        chart.data.labels = newLabels;
    } else {
        chart.data.labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    }

    // Geração de dados mockados para o gráfico baseada no equipamento filtrado
    const factor = equip === 'todos' ? 1 : 0.4;
    chart.data.datasets.forEach(d => {
        d.data = chart.data.labels.map(() => Math.floor(Math.random() * 30 * factor) + 5);
    });
    chart.update();
}