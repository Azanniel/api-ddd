import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subscriber created (listen response event created)
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Create a response, but it not persist in database
    const aggregate = CustomAggregate.create()

    // Event created, but not been called
    expect(aggregate.domainEvents).toHaveLength(1)

    // I am saving to the database and triggering the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // Subscriber listen the event
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
