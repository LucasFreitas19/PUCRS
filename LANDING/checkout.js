// Lógica para simular o pagamento e redirecionar
document.addEventListener('DOMContentLoaded', () => {
    const formPagamento = document.getElementById('form-pagamento');
    const btnPagar = document.getElementById('btn-pagar');

    if(formPagamento) {
        formPagamento.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio real do formulário
            
            // Efeito visual de carregamento
            const textoOriginal = btnPagar.innerHTML;
            btnPagar.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Processando Pagamento...';
            btnPagar.disabled = true;
            btnPagar.style.backgroundColor = '#ea5d1c';

            // Simula um delay de comunicação com banco (2 segundos)
            setTimeout(() => {
                btnPagar.innerHTML = '<i class="fas fa-check-circle me-2"></i> Pagamento Aprovado!';
                btnPagar.style.backgroundColor = '#28a745'; // Fica verde
                
                // Redireciona para o painel principal (aplicação) após 1 segundo
                setTimeout(() => {
                    window.location.href = '../APP/index.html';
                }, 1000);
                
            }, 2000);
        });
    }
});