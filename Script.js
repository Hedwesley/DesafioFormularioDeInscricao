document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inscricaoForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const cpf = document.getElementById("cpf").value.trim();
            const telefone = document.getElementById("telefone").value.trim();
            const termos = document.getElementById("termos").checked;

            if (nome === "" || email === "" || cpf === "" || telefone === "") {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            if (!validarEmail(email)) {
                alert("Insira um e-mail válido.");
                return;
            }

            if (!validarCPF(cpf)) {
                alert("CPF inválido. Insira um CPF válido no formato XXX.XXX.XXX-XX.");
                return;
            }

            if (!validarTelefone(telefone)) {
                alert("Número de telefone inválido. Use o formato (XX) XXXXX-XXXX.");
                return;
            }

            if (!termos) {
                alert("Você deve aceitar os Termos e Condições para continuar.");
                return;
            }

            alert("Inscrição realizada com sucesso!");
            form.submit();
        });
    }

    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    function validarCPF(cpf) {
        const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return regex.test(cpf);
    }

    function validarTelefone(telefone) {
        const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        return regex.test(telefone);
    }

    // Adicionando funcionalidade para abrir o gerenciador de arquivos ao clicar no ícone de upload
    const uploadContainer = document.querySelector(".upload-container");
    const uploadInput = document.querySelector("#identidade");

    if (uploadContainer && uploadInput) {
        uploadContainer.addEventListener("click", function () {
            uploadInput.click();
        });
    }

    // Adicionando cidades do Maranhão ao <select>
    const cidadesMaranhao = ["Açailândia", "Afonso Cunha", "Água Doce do Maranhão", "Alcântara", "Aldeias Altas",
        "Altamira do Maranhão", "Alto Alegre do Maranhão", "Alto Alegre do Pindaré", "Alto Parnaíba",
        "Amapá do Maranhão", "Amarante do Maranhão", "Anajatuba", "Anapurus", "Apicum-Açu",
        "Araguanã", "Araioses", "Arame", "Arari", "Axixá", "Bacabal", "Bacabeira", "Bacuri",
        "Bacurituba", "Balsas", "Barão de Grajaú", "Barra do Corda", "Barreirinhas", "Bela Vista do Maranhão",
        "Belágua", "Benedito Leite", "Bequimão", "Bernardo do Mearim", "Boa Vista do Gurupi",
        "Bom Jardim", "Bom Jesus das Selvas", "Bom Lugar", "Brejo", "Buriti", "Buriti Bravo",
        "Buriticupu", "Buritirana", "Cachoeira Grande", "Cajapió", "Cajari", "Campestre do Maranhão",
        "Cândido Mendes", "Cantanhede", "Capinzal do Norte", "Carolina", "Carutapera", "Caxias",
        "Cedral", "Central do Maranhão", "Chapadinha", "Cidelândia", "Codó", "Coelho Neto",
        "Colinas", "Coroatá", "Cururupu", "Davinópolis", "Dom Pedro", "Duque Bacelar",
        "Estreito", "Feira Nova do Maranhão", "Fernando Falcão", "Formosa da Serra Negra",
        "Fortaleza dos Nogueiras", "Fortuna", "Godofredo Viana", "Gonçalves Dias", "Grajaú",
        "Guimarães", "Humberto de Campos", "Icatu", "Igarapé do Meio", "Imperatriz",
        "Itapecuru-Mirim", "João Lisboa", "Lago da Pedra", "Lago do Junco", "Lago Verde",
        "Lagoa do Mato", "Lima Campos", "Loreto", "Magalhães de Almeida", "Maracaçumé",
        "Matinha", "Matões", "Mirador", "Miranda do Norte", "Monção", "Nova Iorque",
        "Paço do Lumiar", "Palmeirândia", "Paraibano", "Parnarama", "Pedreiras",
        "Penalva", "Peritoró", "Pinheiro", "Pio XII", "Porto Franco", "Presidente Dutra",
        "Raposa", "Rosário", "Santa Inês", "Santa Luzia", "Santa Quitéria do Maranhão",
        "São Bento", "São Bernardo", "São Domingos do Maranhão", "São João Batista",
        "São João dos Patos", "São José de Ribamar", "São Luís", "São Mateus do Maranhão",
        "São Raimundo das Mangabeiras", "Timbiras", "Timon", "Tufilândia", "Tuntum",
        "Turiaçu", "Tutóia", "Urbano Santos", "Vargem Grande", "Viana", "Vitória do Mearim",
        "Zé Doca"];
    const selectCidades = document.getElementById("cidades");

    if (selectCidades) {
        cidadesMaranhao.forEach(cidade => {
            let option = document.createElement("option");
            option.value = cidade;
            option.textContent = cidade;
            selectCidades.appendChild(option);
        });
    } else {
        console.error("Elemento 'cidades' não encontrado no HTML.");
    }
});
