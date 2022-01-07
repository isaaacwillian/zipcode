let submitButton = document.getElementsByTagName('button')[0];
let zipCodeField = document.getElementsByTagName('input')[0];
let content = document.getElementsByTagName('div')[0];

submitButton.addEventListener('click', run);
zipCodeField.addEventListener('keydown', e => {
    if (e.code == 'Enter') {
        e.preventDefault();
        submitButton.click();
    }
});
function run(event) {
    event.preventDefault();

    let zipCode = zipCodeField.value;
    zipCode = zipCode.replace(' ', '').replace('-', '').replace('.', '').trim();
    axios.get(`https://viacep.com.br/ws/${zipCode}/json/`)
        .then(response => {
            if (response.data.erro) {
                throw new Error('CPF inválido');
            }
            let adress = response.data;
            content.innerHTML = `${adress.localidade}/${adress.uf}<br>
                                 ${adress.bairro}<br>
                                 ${adress.logradouro}`;
        }).catch((err) => {
            content.innerText = 'CEP inválido';
            console.log(err)
        })
}