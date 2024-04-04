let participantes = [
  {
   nome: "Diego",
   email: "Diego@gmail.com",
   dataInscricao: new Date(2024, 2, 22, 19, 20),
   dataCheckIn: null
  },
  {
   nome: "Marcos",
   email: "Marcos@gmail.com",
   dataInscricao: new Date(2024, 1, 22, 20, 20),
   dataCheckIn: null
  },
  {
   nome: "Maria",
   email: "Maria@gmail.com",
   dataInscricao: new Date(2024, 0, 22, 20, 20),
   dataCheckIn: new Date(2024, 2, 20, 21, 00),
  },
  {
   nome: "Mario",
   email: "Mario@gmail.com",
   dataInscricao: new Date(2023, 11, 22, 19, 20),
   dataCheckIn: new Date(2024, 2, 2, 22, 00),
  },
  {
   nome: "Junior",
   email: "Junior@gmail.com",
   dataInscricao: new Date(2022, 10, 22, 20, 20),
   dataCheckIn: new Date(2024, 2, 18, 21, 00),
  },
  {
   nome: "Joao",
   email: "Joao@gmail.com",
   dataInscricao: new Date(2020, 5, 22, 20, 20),
   dataCheckIn: new Date(2024, 2, 16, 21, 00),
  },
 ];

 const criaNovoParticipante = (participante) => {
 const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
 let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)


//condicional
if(participante.dataCheckIn == null) {
 dataCheckIn = `
  <button
   data-email="${participante.email}"
   onclick="fazerCheckIn(event)"
  >
    Confirmar check-in
  </button>
 `
}

return `
 <tr>
  <td>
    <Strong>
      ${participante.nome}
    </Strong>
    <br>
    <small>
      ${participante.email}
    </small>
  </td>
  <td>${dataInscricao}</td>
  <td>${dataCheckIn}</td>
 </tr>
 `
 }

const atualizarLista = (participantes) => {
  let output = ""
  //estrutura de repetição - loop
  for(let participante of participantes) {
   output = output + criaNovoParticipante(participante)
  }

 // Substituir informação do HTML
 document
 .querySelector ('tbody')
 .innerHTML = output
 }


atualizarLista(participantes)


const adicionarParticipante = (event) => {
  event.preventDefault()
 
  const dadosDoFormulario = new FormData(event.target)

  const participante = {
   nome: dadosDoFormulario.get('nome'),
   email: dadosDoFormulario.get('email'),
   dataInscricao: new Date(),
   dataCheckIn: null
  }

    //verrificar se o participanmte ja existe
    const participanteExiste = participantes.find(
     (p) => {
      return p.email == participante.email
      
     }
    )
     if(participanteExiste) {
      alert('Email já castrado!')
      return
     }


  participantes = [participante, ...participantes]
  atualizarLista(participantes)
  // Limpar formulario 
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
} 

const fazerCheckIn = (event) => {
   // confirmar check-in
   const mensagemConfirmacao = 'tem certeza que deseja fazer o check-in?'
    if (confirm(mensagemConfirmacao) == false) {
       
       return 

    }
   
   
   // encontrar o participante dentro da lista 
    const participante = participantes.find((p) => {
      return p.email == event.target.dataset.email 
    })

   // atualizar o check-in do participante
    participante.dataCheckIn = new Date()
   // atualizar a lista de participantes
   atualizarLista(participantes)
}
