Documentos

- Documentos sao a unidade basica de informacao
- Todo dado e armazenado em documentos (databases, collections, indexes)
- Documentos podem ser aninhados
- O valor de qualquer chave pode ser um documento
- Todo documento pertence a uma collection especifica similar a uma tabela
- Todos os documentos tem:
  - Um identificador chamado "Ref"
    - A Referência do documento é um valor composto que compreende sua coleção junto com um ID de documento exclusivo
  - Uma Referência é um identificador exclusivo para o documento dentro do escopo do banco de dados no qual está armazenado. A ID do documento é um número inteiro de 64 bits codificado em string.
  - os documentos especificados pelo ser têm um registro de data e hora (ts) que identifica quando o documento foi atualizado mais recentemente.
  -

Collections

- Sao containers para guardar documentos
- Um db pode ter uma ou mais collections
- Uma collection pode ter um ou mais documentos
