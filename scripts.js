$(document).ready(function () {
    let veiculos = {
        "014111-9": ["Honda HR-V 2024 1.5 Advance Turbo Flex Aut. 5P", "Honda HR-V 2023 Advance 1.5 Turbo"],
        "014109-7": ["Honda HR-V 2024 1.5 Ex Flex Aut. 5p", "Honda HR-V 2023 EX 1.5 I-VTEC CVT", "Honda HR-V 2025 EX 1.5 I-VTEC CVT"],
        "014102-0": ["Honda HR-V 2024 1.5 Touring Turbo Flex Aut. 5P", "Honda HR-V 2023 Touring 1.5 Turbo", "Honda HR-V 2025 Touring 1.5 Turbo"],
        "014110-0": ["Honda HR-V 2024 1.5 Exl Flex Aut. 5p", "Honda HR-V 2023 EXL 1.5 I-VTEC CVT", "Honda HR-V 2025 EXL 1.5 I-VTEC CVT"]
    };

    $("#pesquisarBtn").click(function () {
        let alertBox = $("#alertBox");
        let mensagens = [];

        $(".codigoInput").each(function () {
            let codigo = $(this).val().trim();
            let statusId = `status-${codigo}`;

            if (codigo && veiculos[codigo]) {
                // Código encontrado imediatamente no veiculos
                let listaVeiculos = veiculos[codigo].map(veiculo => `<li>${veiculo}</li>`).join('');
                mensagens.push(`<div class="alert alert-success" role="alert">
                                    <strong>${veiculos[codigo].length} veículo(s) encontrado(s) para código ${codigo}:</strong>
                                    <ul>${listaVeiculos}</ul>
                                </div>`);
            } else if (codigo) {
                // Código não encontrado, simula busca na seguradora
                mensagens.push(`<div class="alert alert-warning" role="alert" id="${statusId}">
                                    Código ${codigo} não encontrado, buscando nas seguradoras...
                                </div>`);

                // Simula consulta à seguradora após 3 segundos
                setTimeout(() => {
                    let veiculosFicticios = [
                        `Código Fipe: ${codigo} - "Hyundai HB20 Limited 1.0 2024"`,
                        `Código Fipe: ${codigo} - "Hyundai HB20 Limited Plus 1.0 (Mec.) 2024"`
                    ];

                    let listaVeiculos = veiculosFicticios.map(veiculo => `<li>${veiculo}</li>`).join('');
                    $(`#${statusId}`).removeClass("alert-warning").addClass("alert-success")
                                     .html(`Código ${codigo} encontrado na API da Porto Seguro.<br><ul>${listaVeiculos}</ul>`);
                }, 1000);
            }
        });

        // Exibe as mensagens iniciais
        if (mensagens.length > 0) {
            alertBox.html(mensagens.join("<br>"));
            alertBox.show();
        } else {
            alertBox.hide();
        }
    });

    // Adicionar e remover campos de entrada
    $("#inputContainer").on("click", ".addInput", function () {
        let newInput = `<div class="input-group mb-3">
                            <input type="text" class="form-control codigoInput" placeholder="Digite o código">
                            <button class="btn btn-danger removeInput" type="button">-</button>
                        </div>`;
        $("#inputContainer").append(newInput);
    });

    $("#inputContainer").on("click", ".removeInput", function () {
        $(this).closest(".input-group").remove();
    });
});
