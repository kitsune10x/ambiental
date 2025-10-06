/* ...existing code... */
const reviewsData = [
  {name: "Mariana", text: "O projeto ajudou nossa comunidade a economizar água e melhorar áreas verdes."},
  {name: "Carlos", text: "Relatórios simples e ações que deram resultado rápido."},
  {name: "Juliana", text: "Excelente iniciativa, fácil de entender e se envolver."},
  {name: "Ricardo", text: "Monitoramento preciso. Vimos a qualidade do ar melhorar."},
  {name: "Ana", text: "Voluntários locais amaram as diretrizes de ação."},
  {name: "Marcos", text: "Com os reportes consegui sinalizar um terreno baldio cheio de lixo e a prefeitura recolheu rápido."},
  {name: "Beatriz", text: "Usei o mapa para marcar descarte irregular perto do lago — viram o problema e plantaram árvores no local."},
  {name: "Felipe", text: "A funcionalidade de nível de alerta ajudou a priorizar limpezas em áreas críticas como rios."},
  {name: "Lúcia", text: "Facilitou o engajamento da vizinhança; organizamos uma mutirão após alguns reportes."},
  {name: "Paulo", text: "Ótimo para monitorar pontos de descarte e reduzir denúcias repetidas."},
  {name: "Sofia", text: "Informações claras e mapas tornaram a fiscalização mais eficiente."},
  {name: "Gustavo", text: "Enviei fotos e coordenadas — a resposta foi rápida e coordenada com serviços locais."}
];

function el(q){return document.querySelector(q)}
function createReviewNode(r){
  const div = document.createElement('div');
  div.className = 'review';
  // generate random star count 4 or 5
  const stars = '★'.repeat(4 + Math.floor(Math.random()*2)) + '☆'.repeat(0);
  // generate random date between 2024-01-01 and today
  const start = new Date('2024-01-01').getTime();
  const end = Date.now();
  const rand = new Date(start + Math.random() * (end - start));
  const dateStr = rand.toLocaleDateString();
  div.innerHTML = `<div><strong>${r.name}</strong></div><div class="meta">${stars} • ${dateStr}</div><p>${r.text}</p>`;
  return div;
}

function renderReviews(count = 3){
  const container = el('#reviewsList');
  container.innerHTML = '';
  const shuffled = reviewsData.slice().sort(()=>0.5 - Math.random());
  shuffled.slice(0, count).forEach(r => container.appendChild(createReviewNode(r)));
}

document.addEventListener('DOMContentLoaded', () => {
  // year
  el('#year').textContent = new Date().getFullYear();

  // initial reviews
  renderReviews(3);
  el('#moreReviews').addEventListener('click', () => {
    renderReviews(5);
  });

  // modal controls
  const loginBtn = el('#loginBtn');
  const modal = el('#loginModal');
  const closeModal = el('#closeModal');
  const cancelBtn = el('#cancelBtn');
  const loginForm = el('#loginForm');

  function openModal(){
    modal.setAttribute('aria-hidden','false');
    modal.querySelector('input')?.focus();
  }
  function close(){
    modal.setAttribute('aria-hidden','true');
  }

  loginBtn.addEventListener('click', openModal);
  closeModal.addEventListener('click', close);
  cancelBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if(e.target === modal) close(); });

  loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = new FormData(loginForm);
    const username = (form.get('username') || '').trim();
    const pass = (form.get('password') || '').trim();

    // hard-coded users
    const users = {
      'mathias': {password: '12345', role: 'user', landing: 'user.html', email: 'mathias@example.com', phone: '+55 11 90000-0001'},
      'vinicius': {password: '54321', role: 'admin', landing: 'control.html', email: 'vinicius@example.com', phone: '+55 11 90000-0002'}
    };

    const key = username.toLowerCase();
    if(users[key] && users[key].password === pass){
      // simulate session and redirect to role-specific page
      localStorage.setItem('currentUser', JSON.stringify({name: key, role: users[key].role, email: users[key].email, phone: users[key].phone}));
      // close modal then navigate
      close();
      window.location.href = users[key].landing;
      return;
    }

    if(pass.length < 6){ alert('Senha precisa ter pelo menos 6 caracteres.'); return; }
    // invalid credentials
    alert('Credenciais inválidas. Verifique o nome do cadastrado e a senha.');
    return;


  });

  // forgot password link: navigate to reset password page
  el('#forgotPwd').addEventListener('click', (ev)=>{
    ev.preventDefault();
    close();
    window.location.href = 'reset_password.html';
  });

  // theme toggle
  const themeToggle = el('#themeToggle');
  function setTheme(isDark){
    document.body.classList.toggle('dark', isDark);
    // preserve icon spans; toggle aria-pressed
    themeToggle.setAttribute('aria-pressed', String(isDark));
    // update visible icons via class on body (CSS handles icon opacity)
    localStorage.setItem('darkMode', isDark ? '1' : '0');
  }
  const saved = localStorage.getItem('darkMode');
  setTheme(saved === '1');
  themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));
});
/* ...existing code... */