Resumo das alterações e próximas ações

O que foi feito
- Removidas seções e CTAs duplicadas (seção "Chamar no WhatsApp" e card de contato no `#contato`).
- Mantido CTA contextual em `product.html` ("Consultar no WhatsApp").
- Adicionado CTA principal fixo no cabeçalho (`Fale conosco`) — agora em destaque no canto direito.
- Integração do visualizador de PDF com PDF.js em `catalogo-apresentacao.html`.
- Adicionado efeito de zoom nas imagens do catálogo/coleções.
- Removidas regras CSS e marcação relacionadas à seção de categorias que foi eliminada.
- PDF do catálogo adicionado em `catalog/catalogo-apresentacao.pdf` (arquivo original ~11MB).

Checklist de verificação
- [x] Todos os commits locais foram enviados para `origin/main`.
- [x] `catalogo-apresentacao.html` disponível publicamente (Pages).
- [x] Visualizador embutido disponível na página de catálogo.

Compressão do PDF (recomendada)
- Recomendo recomprimir o PDF para reduzir o tempo de download e uso de banda. Opções:
  - Ghostscript (Windows):

    gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
      -dNOPAUSE -dQUIET -dBATCH -sOutputFile=catalog/catalogo-apresentacao-compress.pdf \
      catalog/catalogo-apresentacao.pdf

  - Se preferir usar ferramentas gráficas: Adobe Acrobat (Salvar como PDF otimizado) ou serviços confiáveis de compressão.

Observação técnica: o ambiente atual não tem Ghostscript instalado, por isso não recomprime automaticamente. Se você enviar o PDF otimizado eu atualizo o repositório.

Recomendações finais
- Manter apenas o CTA fixo no header + CTAs contextuais por produto (já aplicado).
- Substituir o PDF por uma versão comprimida (recomendo /ebook ou /screen settings do Ghostscript).
- Manter monitoramento do workflow de deploy no GitHub Actions para garantir publicação automática.

Próximos passos que posso executar
- Substituir o PDF no repositório por uma versão comprimida que você enviar (eu commito e push).
- Remover imagens específicas do `img/` se você confirmar quais não quer manter (faço backup antes de deletar).
- Ajustar intensidade do zoom ou comportamento do CTA fixo (se preferir menor destaque).

Se quiser que eu proceda com alguma dessas ações, me diga qual (ex.: "upload PDF otimizado" ou "remover imagens: material-ouro.jpg, material-prata.jpg").
