const avatar = document.querySelector('.avatar');
const nome = document.querySelector('.nome');
const status = document.querySelector('.status');
const card = document.querySelector('.card');

const btn = document.getElementById('btn');

btn.addEventListener('click', async () => {

  status.textContent = "Carregando...";
  btn.disabled = true;
  // console.log("desabilitado?", btn.disabled);
  nome.textContent = "";
  avatar.src = "";
  card.classList.remove('ativo');

  const id = Math.floor(Math.random() * 12) + 1;

  try {
    const resposta = await fetch(`https://reqres.in/api/users/${id}`, {
      headers: {
        "x-api-key": "free_user_3CrFNjFc3gfXNbbHlbwRkCah4U0"
      }
    });
    // await new Promise(resolve => setTimeout(resolve, 1500));

    if (!resposta.ok) {
      throw new Error("Erro ao buscar usuário");
    }

    const dados = await resposta.json();
    const usuario = dados.data;

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    nome.textContent = `${usuario.first_name} ${usuario.last_name}`;
    avatar.src = `https://api.dicebear.com/7.x/initials/svg?seed=${usuario.first_name}`;

    status.textContent = "Usuário carregado ✔️";
    card.classList.add('ativo');
    btn.disabled = false;

  } catch (erro) {
    status.textContent = "Erro ao carregar usuário. Tente novamente ❌";
  }finally {
  btn.disabled = false;
}

});