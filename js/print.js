$("#inputCPF").mask("000.000.000-00");
$("#inputCEP").mask("00000-000");
$('#inputValor').mask("#.##0,00", { reverse: true });

$(function () {

    var $inputs = $("#inputNome, #inputCPF, #inputEndereco, #inputCEP, #inputValor, #inputDescricao, #stateSelector, #citySelector"),
        $button = $("#btnAceitar");

    var limpos = 0;

    $inputs.each(function () {
        var $this = $(this);
        var val = $this.val();
        val || limpos++;
        $this.data("val-antigo", val);
    });
    
    $button.prop("disabled", !!limpos);

    $inputs.on("change keyup mouseup", function () {
        var $this = $(this);
        var val = $this.val();
        limpos += (val ? 0 : 1) - ($this.data("val-antigo") ? 0 : 1);
        $this.data("val-antigo", val);
        $button.prop("disabled", !!limpos);
    });
});

    function salvarDados(event) {
        event.preventDefault();
    }
    
    function CriaPDF(event) {
        
    const title = "Recibo de Pagamento"

    const ValueInputCpf = document.querySelector('#inputCPF').value;
    const ValueInputNome = document.querySelector('#inputNome').value;
    const ValueInputEndereco = document.querySelector('#inputEndereco').value;
    const ValueInputValor = document.querySelector('#inputValor').value;
    const ValueInputDescricao = document.querySelector('#inputDescricao').value;
    const ValueInputCidade = document.querySelector('#citySelector').value;
    const ValueDate = new Intl.DateTimeFormat('pt-BR').format(new Date());

    const pdf = `
        <div class="content">
            <h1>${title}</h1>
                <div class="info">
                    <p>
                        Eu, <strong> ${ValueInputNome}</strong>, 
                        inscrito com CPF <strong>${ValueInputCpf}</strong>, 
                        endereço <strong>${ValueInputEndereco}</strong> 
                        declaro ter recebido o valor de R$ <strong>${ValueInputValor}<strong> 
                        referente a ${ValueInputDescricao}.
                    </p>
                    <hr/>
                </div>
                <div class="ass">
                    <p>${ValueInputCidade}, ${ValueDate}</p>
                    <p>Assinatura ${ValueInputNome}</p>
                </div>
        </div>
        `
    console.log(pdf)
    const style = `@page { margin-top:180px } 
        @media print {
            .content { 
                display:flex;
                flex-direction: column;
                align-items: center;
            } 
            h1 { 
            .ass{
                display:flex;
                flex-direction: column;
                align-items: center;   
            }
        `
    printJS({
        printable: pdf,
        type: 'raw-html',
        style: style
    })
}
