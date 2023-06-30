import { Slug } from './slug'

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example question title')

  expect(slug.value).toEqual('example-question-title')
})

test('it should be able to create a new slug from complex text', () => {
  const slug = Slug.createFromText('Example With Çomplex Text_And_Underscore')

  expect(slug.value).toEqual('example-with-complex-text-and-underscore')
})
