import { TokenStorageProvider } from './token-storage-provider.service';
import { Http, BaseRequestOptions, HttpModule } from '@angular/http';
import { ClientConfig } from './../client/client-config.service';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { TokenGateway } from './token-gateway.service';

describe('TokenGateway', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenGateway,
        ClientConfig,
        TokenStorageProvider,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([TokenGateway], (service: TokenGateway) => {
    expect(service).toBeTruthy();
  }));
});
