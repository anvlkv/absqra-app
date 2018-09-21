import { SequenceResponseModule } from './sequence-response.module';

describe('SequenceResponseModule', () => {
  let sequenceResponseModule: SequenceResponseModule;

  beforeEach(() => {
    sequenceResponseModule = new SequenceResponseModule();
  });

  it('should create an instance', () => {
    expect(sequenceResponseModule).toBeTruthy();
  });
});
