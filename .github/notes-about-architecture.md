# 🌟 Anotações sobre a arquitetura da aplicação

A Clean architecture é uma arquitetura baseada em camadas da qual vamos nos basear para construção dessa aplicação.

Ela tem 4 camadas principais, sendo a mais externa a camada que interage com o meio externo. A próxima camada, adentrando as camadas do clean architecture, é a camada que vai adaptar as conversas ou trocas de informações ou mesmo requisições de um serviço para outro. A terceira camada, adentrando mais, ficam os casos de uso e por último, a camada de entidades.

As camadas de caso de uso e entidade andam muito próximas, pois fazem parte do domínio que estamos trabalhando se formos pensar em domain driven design.

Falando da aplicação sendo desenvolvida no nosso contexto, aplicado à arquitetura limpa, tudo vai nascer de uma requisição HTTP que vai bater dentro da camada mais externa da aplicação que é a infraestrutura. Essa camada vai enviar essa requisição para os controllers que por sua vez envia para os casos de uso e eles se comunicam com as entidades.

Além disso, é importante entender que o fluxo acima não é linear e é comum que se faça operações no banco de dados, por exemplo, quando um caso de uso de autenticação do usuário precisa voltar para uma camada mais externa para buscar dados dos repositórios que bate diretamente com o banco de dados. Um controller, também, pode chamar um presenter que pode adaptar a resposta para o cliente demonstrando que esse fluxo pode se comunicar com componentes da mesma camada.