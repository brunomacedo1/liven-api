### Tabela usuário
id - uuid
username - varchar
password - varchar
birth_date - datetime
created_at - timestamp
name - varchar
email - varchar

- Permitir que um usuário crie uma conta com dados pessoais.
- Permitir que o usuário consiga visualizar seus dados. Incluir na resposta a lista de endereços do usuário.
- Permitir que o usuário consiga alterar seus dados.
- Permitir que o usuário remova sua conta do sistema.

### Tabela de endereço
id - uuid
address - varchar
zipcode - integer
state - varchar
country - varchar (Abreviação dos países ex: BR, EUA)
user_id

- Permitir que um usuário crie um novo endereço.
- Permitir que o usuário consiga visualizar seus endereços criados
    
    
  👉 **Querystring e params**: Você também deve permitir o uso de querystring (ex: `GET [localhost:3000/user/address?country=BR](http://localhost:3000/user?idade=18)` para pegar todos os endereços cujo campo `country=BR`, e query params (ex: `GET localhost:3000/user/address/123`, para pegar o endereço de ID=123)
   
    
- Permitir que o usuário consiga alterar os dados de um endereço.
- Permitir que o usuário remova um endereço do sistema