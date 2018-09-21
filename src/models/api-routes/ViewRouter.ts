import { ApiRoute } from 'api';
    
    export const ViewRouter: {
            viewExecutableQuestion: ApiRoute;
    } = {
    viewExecutableQuestion: {
        path: '/view/question-exec/:questionId',
        params: ['questionId'],
        typeName: 'question'
    }
};
