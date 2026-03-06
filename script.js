document.getElementById('searchButton').addEventListener('click', async () => {
    const uf = document.getElementById('uf').value.trim().toUpperCase();
    const cidade = document.getElementById('cidade').value.trim();
    const logradouro = document.getElementById('logradouro').value.trim();

    // Validação básica
    if (!uf || uf.length !== 2 || !/[A-Z]{2}/.test(uf)) {
        alert('Informe a UF com exatamente 2 letras (ex: PR, SP, RJ).');
        return;
    }
    if (!cidade || cidade.length < 3) {
        alert('Informe o nome da cidade (mínimo 3 caracteres).');
        return;
    }
    if (!logradouro || logradouro.length < 3) {
        alert('Informe o logradouro/rua (mínimo 3 caracteres).');
        return;
    }

    const url = `https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const resultadoDiv = document.getElementById('resultados');
        resultadoDiv.innerHTML = '';

        if (Array.isArray(data) && data.length > 0) {
            data.forEach(endereco => {
                const item = document.createElement('div');
                item.innerHTML = `
                    <p><strong>CEP:</strong> ${endereco.cep}</p>
                    <p><strong>Logradouro:</strong> ${endereco.logradouro || '—'}</p>
                    <p><strong>Complemento:</strong> ${endereco.complemento || '—'}</p>
                    <p><strong>Bairro:</strong> ${endereco.bairro || '—'}</p>
                    <p><strong>Cidade:</strong> ${endereco.localidade}</p>
                    <p><strong>Estado:</strong> ${endereco.uf}</p>
                `;
                resultadoDiv.appendChild(item);
            });
        } else {
            resultadoDiv.innerHTML = '<p style="color: #d32f2f; text-align: center;">Nenhum endereço encontrado.<br>Tente mudar ou completar o nome da rua/cidade.</p>';
        }
    } catch (error) {
        console.error('Erro na consulta:', error);
        document.getElementById('resultados').innerHTML = '<p style="color: #d32f2f; text-align: center;">Erro ao consultar a API.<br>Verifique sua conexão ou tente novamente.</p>';
    }
});