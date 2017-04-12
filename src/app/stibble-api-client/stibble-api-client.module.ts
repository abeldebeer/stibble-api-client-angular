import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { TokenService } from './token/token-service.service';
import { TokenStorageProvider } from './token/token-storage-provider.service';
import { TokenGateway } from './token/token-gateway.service';
import { ClientConfig } from './client/client-config.service';
import { EntityMetadataService } from './entity/entity-metadata-service.service';
import { RepositoryProvider } from './entity/repository-provider.service';
import { repositoryFactories } from './stibble-api-client-injection';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
    ],
    providers: [
        ClientConfig,
        EntityMetadataService,
        TokenGateway,
        TokenService,
        TokenStorageProvider,
        RepositoryProvider,
        ...repositoryFactories
    ]
})
export class StibbleApiClientModule { }
