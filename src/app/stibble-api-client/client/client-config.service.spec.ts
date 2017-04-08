import { TokenStorageProvider } from './../token/token-storage-provider.service';
import { TestBed, inject } from '@angular/core/testing';

import { ClientConfig } from './client-config.service';

describe('ClientConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientConfig, TokenStorageProvider]
    });
  });

  it('should ...', inject([ClientConfig], (service: ClientConfig) => {
    expect(service).toBeTruthy();
  }));
});
