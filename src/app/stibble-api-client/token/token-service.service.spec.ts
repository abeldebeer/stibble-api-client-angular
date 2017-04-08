import { TokenStorageProvider } from './token-storage-provider.service';
import { TokenGateway } from './token-gateway.service';
import { TestBed, inject } from '@angular/core/testing';
import { TokenService } from './token-service.service';

class FakeTokenGateway extends TokenGateway {
  constructor() {
    super(null, null);
  }
}

describe('TokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenService,
        TokenStorageProvider,
        { provide: TokenGateway, useValue: FakeTokenGateway }
      ]
    });
  });

  it('should ...', inject([TokenService], (service: TokenService) => {
    expect(service).toBeTruthy();
  }));
});
