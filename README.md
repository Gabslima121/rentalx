# Definição de Requisitos

---

## Cadastro de Carros:

**RF**
Deve ser possivel cadastrar um novo carro;

**RN**
Não deve ser possivel cadastrar um carro com uma placa ja existente;
Não deve ser possivel alterar a placa de um carro ja cadastrado;
Novos carros devem ser cadastrados como disponiveis para aluguel;
Apenas um usuário administrador deve ser capaz de cadastrar um novo carro;

---

## Listagem de Carros:

**RF**
Deve ser possivel listar todos os carros disponiveis;
Deve ser possivel listar todos os carros disponiveis pelo nome da categoria;
Deve ser possivel listar todos os carros disponiveis pelo nome da marca;
Deve ser possivel listar todos os carros disponiveis pelo nome do carro;

**RN**
O usuario nao precisa estar logado no sistema para visualizar os carros;

---

## Cadastro de Especificação do Carro:

**RF**
Deve ser possivel cadastrar uma especificacao para um carro;
Deve ser possivel listar todas as especificacoes;
Deve ser possivel lista todos os carros;

**RN**
Não deve ser possivel cadastrar uma especificação para um carro não existente;
Não deve ser possivel cadastrar uma especificação ja existente para o mesmo carro;
Apenas um usuário administrador deve ser capaz de cadastrar uma nova especificação;

---

## Cadastro de imagem do Carro:

**RF**
Deve ser possivel cadastrar a imagem do carro;
Deve ser possivel listar todos os carros;

**RNF**
Ultilizar o "Multer" para fazer upload de arquivos;

**RN**
O usuario deve poder cadastrar mais de uma imagem para o mesmo carro;
Usuario responsavel pelo cadastro deve ser o administrador;

---

## Agendamento de Aluguel:

**RF**
Deve ser possivel cadastrar um aluguel;

**RN**
O aluguel deve ter duracao minima de 24 horas;
Nao deve ser possivel cadastrar um novo aluguel caso ja esteja aberto para o mesmo usuario;
Nao deve ser possivel cadastrar um novo aluguel caso ja esteja aberto para o mesmo carro;