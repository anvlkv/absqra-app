import { SequenceDesignModule } from './sequence-design.module';

describe('SequenceDesignModule', () => {
  let sequenceDesignModule: SequenceDesignModule;

  beforeEach(() => {
    sequenceDesignModule = new SequenceDesignModule();
  });

  it('should create an instance', () => {
    expect(sequenceDesignModule).toBeTruthy();
  });
});
