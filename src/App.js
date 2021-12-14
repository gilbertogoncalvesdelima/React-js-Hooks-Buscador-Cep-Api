import { useState } from "react";
import api from './services/api'
import './styles.css'

import { FiSearch } from 'react-icons/fi'

function App() {

  //input, para saber o valor do estado
  //setInput, passar um valor novo para este estado

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({}) // passando um objeto vazio
  
  async function handleSearch (){ // como vamos ter que fazer algo assincrono, fazer a requisição na api, entao transformados a função async
  //alert("Valor do Input " + input)
  //01310930/json/
  if(input === ''){
  alert("Preencha algum cep!")
  return;
  }
  try{  //try o que você quer fazer, pode dar errado

  const response = await api.get(`${input}/json`) // trazendo informações api.get, pegando o valo de dentro de nosso input, /json que é o formato que queremos trazer
  //console.log(response.data)
  setCep(response.data)
  setInput("")
  }catch{ // casso der errado, o catch assume, caso o cep estiver errado
  alert("Ops erro ao buscar")
  setInput("") // limpando input
  
  }
  }

  return (

    

    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      

      <div className="containerInput">
        <input type="text" 
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value)} //passando para o setInput o que eu digitei
        />

        <button className="buttonSearch" onClick={handleSearch}>
     <FiSearch size={25} color='#FFF' />    
        
        </button>
      </div>
     
      {Object.keys(cep).length > 0 && ( // verificando se contem alguma coisa dentro de nosso objeto
        <main className="main">
        {/*Verificando dados da Api: 
        {
         "cep": "03541-000",
         "logradouro": "Rua Abadiânia",
         "complemento": "",
         "bairro": "Vila Guilhermina",
         "localidade": "São Paulo",
         "uf": "SP",
         "ibge": "3550308",
         "gia": "1004",
         "ddd": "11",
         "siafi": "7107"
       }*/}
        
        <h2>CEP: {cep.cep}</h2>
   
        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
        
        </main>
      )}
    <br/>
    <footer className="footer">
    <p>&copy; Gilberto Gonçalves de Lima</p>
    </footer>

    </div>
  );
}

export default App;
