import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository"
import { AnswerQuestionUseCase } from "./answer-question"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase /** SUT -> System under test */

describe('Create answer to a question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da resposta'
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
