# 🌟 Anotações sobre a arquitetura da aplicação

A Clean architecture é uma arquitetura baseada em camadas da qual vamos nos basear para construção dessa aplicação.

Ela tem 4 camadas principais, sendo a mais externa a camada que interage com o meio externo. A próxima camada, adentrando as camadas do clean architecture, é a camada que vai adaptar as conversas ou trocas de informações ou mesmo requisições de um serviço para outro. A terceira camada, adentrando mais, ficam os casos de uso e por último, a camada de entidades.

As camadas de caso de uso e entidade andam muito próximas, pois fazem parte do domínio que estamos trabalhando se formos pensar em domain driven design.

Falando da aplicação sendo desenvolvida no nosso contexto, aplicado à arquitetura limpa, tudo vai nascer de uma requisição HTTP que vai bater dentro da camada mais externa da aplicação que é a infraestrutura. Essa camada vai enviar essa requisição para os controllers que por sua vez envia para os casos de uso e eles se comunicam com as entidades.

Além disso, é importante entender que o fluxo acima não é linear e é comum que se faça operações no banco de dados, por exemplo, quando um caso de uso de autenticação do usuário precisa voltar para uma camada mais externa para buscar dados dos repositórios que bate diretamente com o banco de dados. Um controller, também, pode chamar um presenter que pode adaptar a resposta para o cliente demonstrando que esse fluxo pode se comunicar com componentes da mesma camada.


## 🎲 Banco de dados

Na aplicação temos os repositórios na camada de domínio de fórum que nada mais são do que contratos que estipulam como as implementações devem interagir. Sendo assim na camada de infra criamos um módulo de banco de dados que utiliza dessas interfaces de repositórios e implementa com o Prisma as operações de banco de dados. 

O módulo de banco de dados funciona independente, pois, em algum momento, esse módulo pode conter a implementação usando outra tecnologia que não o prisma.

## 🗺️ Mappers

Os mappers são responsáveis por converter uma entidade de um formato para outro, permitindo que diferentes camadas da aplicação trabalhem com representações diferentes da mesma entidade.

Implementamos um exemplo de mapper nesta aplicação, o PrismaQuestionMapper, que converte uma entidade do Prisma para uma entidade do domínio. Isso nos permite retornar a entidade correta do repositório, evitando conflitos de tipos.

## 🚪 Gateway

É uma camada que atua como intermediária entre os componentes internos de um sistema de software e as fontes externas de dados, como bancos de dados, serviços web ou dispositivos de entrada/saída. Sua principal função é isolar as partes centrais do sistema das complexidades externas e das tecnologias específicas usadas para acessar dados ou interagir com o mundo exterior.

## 🎭 Stubs

Um stub é uma implementação fictícia de um contrato, usado para testes. Vamos criar uma classe chamada fakeHasher que implementa tanto o HashGenerator quanto o HashCompare.

## 📂 Upload de arquivos

Ao lidar com anexos, é interessante separar essa funcionalidade em uma rota específica, para evitar problemas com o envio de arquivos em formato JSON.
Uma ótima opção de upload de arquivos é o Cloudflare R2, que é mais barato e não cobra taxa de egressos.

## 🤷 Desafios usando REST

Existe um motivo pelo qual o GraphQL surgiu, todas as aplicações que utilizam REST, se tornaram mais complexas e complexas. Por isso, o GraphQL foi criado para trazer mais simplicidade e flexibilidade na aplicação.
No entanto, aqui utilizamos REST, e vamos discutir quais os desafios enfrentamos ao lidar com aplicações que usam REST(OverFetching & UnderFetching).

O OverFetching é quando retornamos informações demais do backend em rotas que não precisam daquelas informações. Por exemplo: Em uma requisição trazer os dados do autor, pergunta e respostas. No entanto se eu precisa dos dados de autor e pergunta somente eu não terei, pois terei uma rota que retorna tudo.

O UnderFetching é quando não estamos tendo dados suficientes com uma chamada para um endpoint do backed, forçando-nos a chamar um segundo endpoint. Ou seja, é quando temos dados de menos e temos que chamar outros endpoints para obter os dados que precisamos e acabamos executando muitas chamadas ao backend.

## 📦 Cache na aplicação

O cache é uma técnica utilizada para otimizar o desempenho de ações que podem levar mais tempo, como buscas de dados. Veremos que o cache pode armazenar informações estáticas, como dados de uma tabela que raramente mudam. No entanto, é importante ter cuidado, pois o cache pode conter informações desatualizadas.