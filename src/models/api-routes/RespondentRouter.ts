import { ApiRoute } from 'api';
    
    export const RespondentRouter: {
            saveStepResponse: ApiRoute;
            viewExecutableQuestion: ApiRoute;
    } = {
    saveStepResponse: {
        path: '/respondent/step-response/:sequenceId/:stepId',
        params: ['sequenceId', 'stepId'],
        typeName: 'stepResponseResult'
    },
    viewExecutableQuestion: {
        path: '/respondent/question-exec/:executableQuestionId/:responseId',
        params: ['executableQuestionId', 'responseId'],
        typeName: 'executableQuestion'
    }
};
