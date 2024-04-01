# Map Reduce

Uma implementação do framework da Google, Map Reduce feita como atividade 1 da disciplina de Sistemas Distribuídos Map Reduce.

## Execução

Para executar esse código, você vai precisar criar uma pasta `/files` para que os arquivos iniciais sejam gerados.

Antes de executar o código em si, lembre-se de instalar as dependências do NPM.

Para criar os arquivos iniciais você deverá rodar `npm run generate-files -- <num-arquivos> <num-palavras>` onde `<num-arquivos>` equivale a em quantos arquivos as palavras geradas serão separadas e `<num-palavras>` equivale a quantas palavras no total serão geradas.

Depois de gerar os arquivos de entrada, você pode rodar o programa com `npm run start`. Os arquivos de saúda serão gerados na raíz do projeto.

Para usar o grep execute `node mapReduceGrep.js` a palavra pesquisada pode ser mudado no arquivo mapReduceGrep.

Os resultados serão exibidos no console
