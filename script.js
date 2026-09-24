const texto = document.getElementById("texto");
const contador = document.getElementById("contador");
const botaoPostar = document.getElementById("postar");
const lista = document.getElementById("lista");
const busca = document.getElementById("busca");

let posts = [
  { id: 1, nome: "Empresa tal", user: "@talcara", data: "21 de set", texto: "Testando a Tv", midia: true, respostas: 24, reposts: 310, curtidas: 4200, curtido: false, repostado: false },
];
let proximoId = 3;

const fmt = n => n >= 1000 ? (n / 1000).toFixed(1).replace(".0", "").replace(".", ",") + " mil" : n;

function criarPost(p) {
  const el = document.createElement("article");
  el.className = "post";
  el.innerHTML = `
    <div class="avatar">${p.nome[0]}</div>
    <div class="post-corpo">
      <div class="post-topo"><b></b><span class="selo">✔</span><small>${p.user} · ${p.data}</small><button class="mais" title="Excluir">⋯</button></div>
      <p></p>
      ${p.midia ? '<div class="midia"></div>' : ""}
      <div class="acoes">
        <button>💬 ${fmt(p.respostas)}</button>
        <button class="repost ${p.repostado ? "repostado" : ""}">🔁 ${fmt(p.reposts)}</button>
        <button class="curtir ${p.curtido ? "curtido" : ""}">${p.curtido ? "❤️" : "🤍"} ${fmt(p.curtidas)}</button>
        <button>📊</button>
      </div>
    </div>`;
  el.querySelector("b").textContent = p.nome;   // textContent evita injeção de HTML
  el.querySelector("p").textContent = p.texto;
  el.querySelector(".curtir").onclick = () => { p.curtido = !p.curtido; p.curtidas += p.curtido ? 1 : -1; desenhar(); };
  el.querySelector(".repost").onclick = () => { p.repostado = !p.repostado; p.reposts += p.repostado ? 1 : -1; desenhar(); };
  el.querySelector(".mais").onclick = () => { posts = posts.filter(x => x.id !== p.id); desenhar(); };
  return el;
}

function desenhar() {
  const filtro = busca.value.trim().toLowerCase();
  lista.innerHTML = "";
  posts.filter(p => p.texto.toLowerCase().includes(filtro)).forEach(p => lista.appendChild(criarPost(p)));
}

texto.addEventListener("input", () => {
  texto.style.height = "auto";
  texto.style.height = texto.scrollHeight + "px";
  const restante = 280 - texto.value.length;
  contador.textContent = restante;
  contador.classList.toggle("limite", restante < 20);
  botaoPostar.disabled = texto.value.trim() === "";
});

botaoPostar.addEventListener("click", () => {
  posts.unshift({ id: proximoId++, nome: "Matheus", user: "@matheus", data: "agora", texto: texto.value.trim(), midia: false, respostas: 0, reposts: 0, curtidas: 0, curtido: false, repostado: false });
  texto.value = ""; texto.style.height = "auto";
  contador.textContent = 280; botaoPostar.disabled = true;
  desenhar();
});

// abas: só alterna o destaque visual
document.getElementById("abas").addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return;
  document.querySelectorAll("#abas button").forEach(b => b.classList.remove("ativa"));
  e.target.classList.add("ativa");
});

document.getElementById("tema").onclick = () => {
  const raiz = document.documentElement;
  raiz.dataset.tema = raiz.dataset.tema === "claro" ? "" : "claro";
};

document.querySelectorAll(".fechar").forEach(b => b.onclick = () => b.parentElement.remove());
busca.addEventListener("input", desenhar);
desenhar();
