export abstract class ValueObject<Props> {
  protected props: Props

  protected constructor(props: Props) {
    this.props = props
  }

  public equals(valueObject: ValueObject<Props>) {
    if (valueObject === null || valueObject === undefined) {
      return false
    }

    if (valueObject.props === undefined) {
      return false
    }

    return JSON.stringify(valueObject.props) === JSON.stringify(this.props)

    /**
     * A condição abaixo deve ser verdadeira para o ValueObject?
     * { name: 'Leandro' } === { name: 'Leandro' }
     *
     * Resposta: Não
     *
     * Pois o sinal de igualdade estrita compara se os dois objetos estão ocupando
     * o mesmo espaço de memória(Comparação referencial). Logo devemos
     * usar o JSON.stringify para comparar os objetos em sua unidade
     * de estrutura de dados mais simples comparando o conteúdo.
     */
  }
}
