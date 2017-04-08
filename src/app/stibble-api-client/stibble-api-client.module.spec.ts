import { StibbleApiClientModule } from './stibble-api-client.module';

describe('StibbleApiClientModule', () => {
  let stibbleApiClientModule;

  beforeEach(() => {
    stibbleApiClientModule = new StibbleApiClientModule();
  });

  it('should create an instance', () => {
    expect(stibbleApiClientModule).toBeTruthy();
  });
});
