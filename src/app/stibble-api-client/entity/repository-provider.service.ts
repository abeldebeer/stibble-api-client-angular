import { EntityRepository } from './entity-repository';
import { Http } from '@angular/http';
import { TokenStorageProvider } from '../token/token-storage-provider.service';
import { ClientConfig } from '../client/client-config.service';
import { EntityGateway } from './entity-gateway';
import { Entity } from './entity';
import { Repository } from './repository';
import { EntityMetadataService } from './entity-metadata-service.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RepositoryProvider {

  constructor(
    private _metadataService: EntityMetadataService,
    private _clientConfig: ClientConfig,
    private _tokenStorageProvider: TokenStorageProvider,
    private _http: Http
  ) { }

  /**
   * Create a new repository for the provided entity.
   */
  public getRepository<T extends Entity>(type: { new (): T; }): Repository<T> {
    const gateway: EntityGateway = new EntityGateway(
      this._metadataService.getClassMetadata(type),
      this._clientConfig,
      this._tokenStorageProvider,
      this._http
    );

    return new EntityRepository(type, this._metadataService, gateway);
  }

}
