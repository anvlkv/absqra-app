import { ApiRoute } from 'api';
    
    export const wsUtil: {
            clientReload: ApiRoute;
    } = {
    clientReload: {
        path: 'ws://localhost:8080/util/client-reload',
        params: [],
        typeName: ''
    }
};
