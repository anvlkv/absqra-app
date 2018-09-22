import { ApiRoute } from 'api';
    
    export const ViewRouter: {
            viewExecutableQuestion: ApiRoute;
    } = {
    viewExecutableQuestion: {
        path: '/view/question-exec/:executableQuestionId',
        params: ['executableQuestionId'],
        typeName: 'executableQuestion'
    }
};
