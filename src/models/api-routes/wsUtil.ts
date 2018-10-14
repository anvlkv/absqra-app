import { ApiRoute } from 'api';
    
    export const wsUtil: {
            clientReload: ApiRoute;
    } = {
    clientReload: {
        path: 'ws://localhost:8090/util/client-reload',
        params: [],
        typeName: ''
    }
};
