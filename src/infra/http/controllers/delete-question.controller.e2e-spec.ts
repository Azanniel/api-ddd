import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { StudentFactory } from 'test/factories/make-student'
import { DatabaseModule } from '@/infra/database/database.module'
import { QuestionFactory } from 'test/factories/make-question'

describe('Delete question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let questionFactory: QuestionFactory
  let studentFactory: StudentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    questionFactory = moduleRef.get(QuestionFactory)
    studentFactory = moduleRef.get(StudentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /questions/:id', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .delete(`/questions/${questionId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.status).toBe(204)

    const questionOnDatabase = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    })

    expect(questionOnDatabase).toBeNull()
  })
})
