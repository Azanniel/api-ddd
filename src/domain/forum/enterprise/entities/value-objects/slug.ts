import { ValueObject } from '@/core/entities/value-object'

export interface SlugProps {
  value: string
}

export class Slug extends ValueObject<SlugProps> {
  get value() {
    return this.props.value
  }

  static create(slug: string) {
    return new Slug({ value: slug })
  }

  /**
   * Receives a string and normalized it as a slug
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '-')

    return new Slug({ value: slugText })
  }
}
