import { TestBed, inject } from '@angular/core/testing';

import { TokenStorageProvider } from './token-storage-provider.service';

describe('TokenStorageProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenStorageProvider]
    });
  });

  it('should ...', inject([TokenStorageProvider], (service: TokenStorageProvider) => {
    expect(service).toBeTruthy();
  }));
});
