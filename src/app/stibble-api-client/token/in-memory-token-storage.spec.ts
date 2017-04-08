import {InMemoryTokenStorage} from './in-memory-token-storage';

describe('InMemoryTokenStorage', () => {
  it('should create an instance', () => {
    expect(new InMemoryTokenStorage()).toBeTruthy();
  });
});
