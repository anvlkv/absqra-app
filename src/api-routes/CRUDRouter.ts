import { ApiRoute } from 'api';
    
    export const CRUDRouter: {[routeName: string]: ApiRoute} = {
    repoProjects: {
        path: '/crud/projects',
        params: [],
        typeName: 'project'
    },
    entityProject: {
        path: '/crud/projects/:projectId',
        params: ['projectId'],
        typeName: 'project'
    },
    repoSequenceResponsesOfProject: {
        path: '/crud/projects/:projectId/sequenceResponses',
        params: ['projectId'],
        typeName: 'sequenceResponse'
    },
    entitySequenceResponseOfProject: {
        path: '/crud/projects/:projectId/sequenceResponses/:sequenceResponseId',
        params: ['projectId', 'sequenceResponseId'],
        typeName: 'sequenceResponse'
    },
    repoStepResponsesOfSequenceResponseOfProject: {
        path: '/crud/projects/:projectId/sequenceResponses/:sequenceResponseId/stepResponses',
        params: ['projectId', 'sequenceResponseId'],
        typeName: 'stepResponse'
    },
    entityStepResponseOfSequenceResponseOfProject: {
        path: '/crud/projects/:projectId/sequenceResponses/:sequenceResponseId/stepResponses/:stepResponseId',
        params: ['projectId', 'sequenceResponseId', 'stepResponseId'],
        typeName: 'stepResponse'
    },
    repoSequences: {
        path: '/crud/sequences',
        params: [],
        typeName: 'sequence'
    },
    entitySequence: {
        path: '/crud/sequences/:sequenceId',
        params: ['sequenceId'],
        typeName: 'sequence'
    },
    repoStepsOfSequence: {
        path: '/crud/sequences/:sequenceId/steps',
        params: ['sequenceId'],
        typeName: 'step'
    },
    entityStepOfSequence: {
        path: '/crud/sequences/:sequenceId/steps/:stepId',
        params: ['sequenceId', 'stepId'],
        typeName: 'step'
    },
    repoSteps: {
        path: '/crud/steps',
        params: [],
        typeName: 'step'
    },
    entityStep: {
        path: '/crud/steps/:stepId',
        params: ['stepId'],
        typeName: 'step'
    },
    repoQuestions: {
        path: '/crud/questions',
        params: [],
        typeName: 'question'
    },
    entityQuestion: {
        path: '/crud/questions/:questionId',
        params: ['questionId'],
        typeName: 'question'
    },
    repoFormatConstraintsOfQuestion: {
        path: '/crud/questions/:questionId/formatConstraints',
        params: ['questionId'],
        typeName: 'formatConstraint'
    },
    entityFormatConstraintOfQuestion: {
        path: '/crud/questions/:questionId/formatConstraints/:formatConstraintId',
        params: ['questionId', 'formatConstraintId'],
        typeName: 'formatConstraint'
    },
    repoQuestionAssetsOfQuestion: {
        path: '/crud/questions/:questionId/questionAssets',
        params: ['questionId'],
        typeName: 'questionAsset'
    },
    entityQuestionAssetOfQuestion: {
        path: '/crud/questions/:questionId/questionAssets/:questionAssetId',
        params: ['questionId', 'questionAssetId'],
        typeName: 'questionAsset'
    },
    repoResponseAssetsOfQuestion: {
        path: '/crud/questions/:questionId/responseAssets',
        params: ['questionId'],
        typeName: 'responseAsset'
    },
    entityResponseAssetOfQuestion: {
        path: '/crud/questions/:questionId/responseAssets/:responseAssetId',
        params: ['questionId', 'responseAssetId'],
        typeName: 'responseAsset'
    },
    repoSequenceResponses: {
        path: '/crud/sequenceResponses',
        params: [],
        typeName: 'sequenceResponse'
    },
    entitySequenceResponse: {
        path: '/crud/sequenceResponses/:sequenceResponseId',
        params: ['sequenceResponseId'],
        typeName: 'sequenceResponse'
    },
    repoStepResponsesOfSequenceResponse: {
        path: '/crud/sequenceResponses/:sequenceResponseId/stepResponses',
        params: ['sequenceResponseId'],
        typeName: 'stepResponse'
    },
    entityStepResponseOfSequenceResponse: {
        path: '/crud/sequenceResponses/:sequenceResponseId/stepResponses/:stepResponseId',
        params: ['sequenceResponseId', 'stepResponseId'],
        typeName: 'stepResponse'
    },
    repoRespondentsLists: {
        path: '/crud/respondentsLists',
        params: [],
        typeName: 'respondentsList'
    },
    entityRespondentsList: {
        path: '/crud/respondentsLists/:respondentsListId',
        params: ['respondentsListId'],
        typeName: 'respondentsList'
    },
    repoRespondentsOfRespondentsList: {
        path: '/crud/respondentsLists/:respondentsListId/respondents',
        params: ['respondentsListId'],
        typeName: 'respondent'
    },
    entityRespondentOfRespondentsList: {
        path: '/crud/respondentsLists/:respondentsListId/respondents/:respondentId',
        params: ['respondentsListId', 'respondentId'],
        typeName: 'respondent'
    }
};
