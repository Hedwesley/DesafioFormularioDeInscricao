document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inscricaoForm");

    /*if (form) {
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
*/
    /*Validação de Nome*/
    const nomeInput = document.getElementById("nome");
    const erroNome = document.getElementById("erroNome");

    nomeInput.addEventListener("input", function () {
    const nome = nomeInput.value.trim();

    // Verifica se está vazio
    if (nome === "") {
        erroNome.textContent = "O campo de nome é obrigatório.";
        erroNome.style.color = "red";
        return;
    }

    // Verifica se tem pelo menos 2 palavras
    const palavras = nome.split(" ").filter(p => p.length > 0);
    if (palavras.length < 2) {
        erroNome.textContent = "Digite o nome completo (nome e sobrenome).";
        erroNome.style.color = "red";
        return;
    }

    // Verifica se contém apenas letras e espaços
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!regex.test(nome)) {
        erroNome.textContent = "O nome deve conter apenas letras e espaços.";
        erroNome.style.color = "red";
        return;
    }

    // Tamanho mínimo (opcional)
    if (nome.length < 5) {
        erroNome.textContent = "O nome é muito curto.";
        erroNome.style.color = "red";
        return;
    }

    erroNome.innerHTML = "Nome válido &#9989";
    erroNome.style.color = "green";
    });

    /*Validação de Idade*/
    const nascimentoInput = document.getElementById("nascimento");
    const erroNascimento = document.getElementById("erroNascimento");

    nascimentoInput.addEventListener("input", function () {
    const dataNascimento = new Date(this.value);
    const hoje = new Date();

    // Verifica se a data é válida
    if (isNaN(dataNascimento)) {
        erroNascimento.textContent = "Data de nascimento inválida.";
        erroNascimento.style.color = "red";
        return;
    }

    // Calcula a idade
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    // Valida idade mínima
    if (idade < 16 || idade > 100) {
        erroNascimento.textContent = "Idade Inválida ou menor que 16 anos.";
        erroNascimento.style.color = "red";
    } else {
        erroNascimento.innerHTML = "Idade válida &#9989";
        erroNascimento.style.color = "green";
    }
    });

    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
      
        let soma = 0;
        for (let i = 0; i < 9; i++) {
          soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digito1 = resto >= 10 ? 0 : resto;
        if (parseInt(cpf.charAt(9)) !== digito1) return false;
      
        soma = 0;
        for (let i = 0; i < 10; i++) {
          soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digito2 = resto >= 10 ? 0 : resto;
      
        return parseInt(cpf.charAt(10)) === digito2;
      }
      
      // Máscara + validação em tempo real
      const cpfInput = document.getElementById("cpf");
      const erroCPF = document.getElementById("erroCPF");
      
      cpfInput.addEventListener("input", function () {
        let cpf = this.value.replace(/\D/g, "");
        if (cpf.length > 11) cpf = cpf.slice(0, 11);
      
        // Aplica máscara
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        this.value = cpf;
      
        // Valida CPF se tiver 11 dígitos
        if (cpf.replace(/\D/g, "").length === 11) {
          if (validarCPF(cpf)) {
            erroCPF.style.color = "green";
            erroCPF.textContent = "CPF válido ✅";
          } else {
            erroCPF.style.color = "red";
            erroCPF.textContent = "CPF inválido ❌";
          }
        } else {
          erroCPF.textContent = ""; // limpa se ainda não completou os 11 dígitos
        }
      });
  

    const emailInput = document.getElementById("email");
    const mensagemValidacao = document.getElementById("mensagemValidacao");
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailInput.addEventListener("input", function () {
    const email = emailInput.value.trim();

    if (email !== "" && !regexEmail.test(email)) {
        mensagemValidacao.textContent = "Formato de e-mail inválido.";
    } else{
        mensagemValidacao.innerHTML = "E-mail válido &#9989";
        mensagemValidacao.style.color = "green";
      }
    })

    /*Validação de Telefone*/
    const telefoneInput = document.getElementById("telefone");
    const erroTelefone = document.getElementById("erroTelefone");

    // Máscara ao digitar
    telefoneInput.addEventListener("input", function () {
    let tel = this.value.replace(/\D/g, "");
    if (tel.length > 11) tel = tel.slice(0, 11);

    // Aplica a máscara: (99) 99999-9999
    if (tel.length >= 2) {
        tel = tel.replace(/^(\d{2})(\d)/g, "($1) $2");
    }
    if (tel.length >= 7) {
        tel = tel.replace(/(\d{5})(\d)/, "$1-$2");
    }

    this.value = tel;

    // Validação ao preencher
    if (tel.replace(/\D/g, "").length === 11) {
        erroTelefone.innerHTML = "Telefone válido &#9989";
        erroTelefone.style.color = "green";
    } else {
        erroTelefone.textContent = "Telefone inválido. Use o formato (99) 99999-9999.";
        erroTelefone.style.color = "red";
    }
    });

    // Adicionando funcionalidade para abrir o gerenciador de arquivos ao clicar no ícone de upload
    const uploadContainer = document.querySelector(".upload-container");
    const uploadInput = document.querySelector("#identidade");

    if (uploadContainer && uploadInput) {
        uploadContainer.addEventListener("click", function () {
            uploadInput.click();
        });
    }

    /*Validacao de endereco -> CEP - Rua - Número*/
    // CEP
    const cepInput = document.getElementById("cep");
    const erroCEP = document.getElementById("erroCEP");

    cepInput.addEventListener("input", function () {
    let cep = this.value.replace(/\D/g, "");
    if (cep.length > 8) cep = cep.slice(0, 8);

    // Máscara CEP: XXXXX-XXX
    if (cep.length > 5) {
        cep = cep.replace(/(\d{5})(\d)/, "$1-$2");
    }
    this.value = cep;

    if (cep.replace(/\D/g, "").length === 8) {
        erroCEP.textContent = "CEP válido ✅";
        erroCEP.style.color = "green";
    } else {
        erroCEP.textContent = "CEP inválido. Use o formato XXXXX-XXX.";
        erroCEP.style.color = "red";
    }
    });

    // Rua
    const ruaInput = document.getElementById("rua");
    const erroRua = document.getElementById("erroRua");

    ruaInput.addEventListener("input", function () {
    const valor = this.value.trim();
    const regex = /^[A-Za-zÀ-ÿ\s]{3,}$/;

    if (regex.test(valor)) {
        erroRua.textContent = "Rua válida ✅";
        erroRua.style.color = "green";
    } else {
        erroRua.textContent = "Digite um nome de rua válido (mín. 3 letras, sem números).";
        erroRua.style.color = "red";
    }
    });

    // Número
    const numeroInput = document.getElementById("numero");
    const erroNumero = document.getElementById("erroNumero");

    numeroInput.addEventListener("input", function () {
    const valor = this.value.trim();
    const regex = /^[0-9]{1,6}$/; // até 6 dígitos

    if (regex.test(valor)) {
        erroNumero.textContent = "Número válido ✅";
        erroNumero.style.color = "green";
    } else {
        erroNumero.textContent = "Digite apenas números.";
        erroNumero.style.color = "red";
    }
    });
    
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

    /*Valida UserID e senha*/
    const usuarioInput = document.getElementById("usuario");
    const senhaInput = document.getElementById("senha");
    const feedbackUsuario = document.getElementById("usuario-feedback");
    const feedbackSenha = document.getElementById("senha-feedback");
    
    // Validação do usuário com pelo menos 4 caracteres
    usuarioInput.addEventListener("input", () => {
      const valor = usuarioInput.value.trim();
    
      if (valor.length < 4) {
        feedbackUsuario.textContent = "O ID do usuário deve ter pelo menos 4 caracteres.";
      } else {
        feedbackUsuario.textContent = "";
      }
    });
    
    // Validação da senha com pelo menos 6 caracteres
    senhaInput.addEventListener("input", () => {
      const valor = senhaInput.value.trim();
    
      if (valor.length < 6) {
        feedbackSenha.textContent = "A senha deve ter pelo menos 6 caracteres.";
      } else {
        feedbackSenha.textContent = "";
      }
    });

    /*Validacao de todos os campos antes de salvar*/

        const submitbtn = document.getElementById("submitbtn");

        // Campos
        const campos = {
          nome: document.getElementById("nome"),
          email: document.getElementById("email"),
          cpf: document.getElementById("cpf"),
          telefone: document.getElementById("telefone"),
          nascimento: document.getElementById("nascimento"),
          cep: document.getElementById("cep"),
          rua: document.getElementById("rua"),
          numero: document.getElementById("numero"),
        };
        
        // Validações
        function validarNome(nome) {
          return /^[A-Za-zÀ-ÿ\s]{3,}$/.test(nome.trim()) && nome.trim().split(" ").length >= 2;
        }
        
        function validarEmail(email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        }
        
        function validarCPF(cpf) {
          return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf.trim());
        }
        
        function validarTelefone(tel) {
          return /^\(\d{2}\)\s\d{5}-\d{4}$/.test(tel.trim());
        }
        
        function validarNascimento(data) {
          const nascimento = new Date(data);
          const hoje = new Date();
          if (isNaN(nascimento)) return false;
          let idade = hoje.getFullYear() - nascimento.getFullYear();
          const m = hoje.getMonth() - nascimento.getMonth();
          if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
          return idade >= 18;
        }
        
        function validarCEP(cep) {
          return /^\d{5}-\d{3}$/.test(cep.trim());
        }
        
        function validarRua(rua) {
          return /^[A-Za-zÀ-ÿ\s]{3,}$/.test(rua.trim());
        }
        
        function validarNumero(numero) {
          return /^\d{1,6}$/.test(numero.trim());
        }
        
        // Validação geral no clique do botão
        submitbtn.addEventListener('click', (event) => {
          event.preventDefault(); // impede envio do formulário
        
          const camposInvalidos = [];
        
          if (!validarNome(campos.nome.value)) camposInvalidos.push("Nome");
          if (!validarEmail(campos.email.value)) camposInvalidos.push("E-mail");
          if (!validarCPF(campos.cpf.value)) camposInvalidos.push("CPF");
          if (!validarTelefone(campos.telefone.value)) camposInvalidos.push("Telefone");
          if (!validarNascimento(campos.nascimento.value)) camposInvalidos.push("Data de nascimento");
          if (!validarCEP(campos.cep.value)) camposInvalidos.push("CEP");
          if (!validarRua(campos.rua.value)) camposInvalidos.push("Rua");
          if (!validarNumero(campos.numero.value)) camposInvalidos.push("Número");
        
          if (camposInvalidos.length > 0) {
            alert(`Os seguintes campos estão inválidos:\n- ${camposInvalidos.join('\n- ')}`);
          } else {
            salvarInformacoes();
            alert("Inscrição feita com sucesso ✅");
          }
        });

        /*Salva as informações com localStorage*/
        function salvarInformacoes () {
            document.getElementById('submitbtn').addEventListener('click', (e) => {
                e.preventDefault();            
                // coleta os dados
                const dadosUsuario = {
                    nome: document.getElementById("nome").value,
                    email: document.getElementById("email").value,
                    cpf: document.getElementById("cpf").value,
                    telefone: document.getElementById("telefone").value,
                    nascimento: document.getElementById("nascimento").value,
                    cep: document.getElementById("cep").value,
                    rua: document.getElementById("rua").value,
                    numero: document.getElementById("numero").value,
                    usuario: document.getElementById("usuario").value,
                    senha: document.getElementById("senha").value,
                };

                // salva no localStorage
                localStorage.setItem("usuarioCadastrado", JSON.stringify(dadosUsuario));
                //alert("Usuário cadastrado com sucesso!");
                });
        }
});
