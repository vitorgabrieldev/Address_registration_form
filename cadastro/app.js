'use strict';

const cleanForm = (endereco) =>{
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
};

const fillOutForm= (endereco) =>{
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
};

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const searchCEP = async() => {
    cleanForm();
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;
    
    if(cepValido(cep.value)){
        const dados = await fetch(url);
        const addres = await dados.json();
        
        if(addres.hasOwnProperty('erro')){ 
            Swal.fire(
                'CEP não encontrado!',
                'Digite um cep válido!',
                'error'
            );
        }else {
            fillOutForm(addres);
        };
    }else{
        Swal.fire(
            'CEP incorreto!',
            'Digite um cep válido',
            'error'
        );
    };
};

document.getElementById('cep').addEventListener('focusout', searchCEP);

const registerAdress = () => {

    if (document.getElementById("rua").value) {
        Swal.fire(
            'Cadastro realizado com sucesso!',
            'Você será redirecionado em alguns instantes...',
            'success'
        );   
    } else {
        Swal.fire(
            'Erro de cadastro!',
            'Preenche todos os campos',
            'error'
        );
    };
};