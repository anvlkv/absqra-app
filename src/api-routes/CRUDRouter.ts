export const CRUDRouter = {
    repoProjects: {
        path: '/crud/projects',
        params: [],
    },
    entityProject: {
        path: '/crud/projects/:projectId',
        params: ['projectId'],
    },
    repoSequenceResponsesOfProject: {
        path: '/crud/projects/:projectId/sequenceResponses',
        params: ['projectId'],
    },
    entitySequenceResponseOfProject: {
        path: '/crud/projects/:projectId/sequenceResponses/:sequenceResponseId',
        params: ['projectId', 'sequenceResponseId'],
    },
    repoStepResponsesOfSequenceResponseOfProject: {
        path: '/crud/projects/:projectId/sequenceResponses/:sequenceResponseId/stepResponses',
        params: ['projectId', 'sequenceResponseId'],
    },
    entityStepResponseOfSequenceResponseOfProject: {
        path: '/crud/projects/:projectId/sequenceResponses/:sequenceResponseId/stepResponses/:stepResponseId',
        params: ['projectId', 'sequenceResponseId', 'stepResponseId'],
    },
    repoSequences: {
        path: '/crud/sequences',
        params: [],
    },
    entitySequence: {
        path: '/crud/sequences/:sequenceId',
        params: ['sequenceId'],
    },
    repoStepsOfSequence: {
        path: '/crud/sequences/:sequenceId/steps',
        params: ['sequenceId'],
    },
    entityStepOfSequence: {
        path: '/crud/sequences/:sequenceId/steps/:stepId',
        params: ['sequenceId', 'stepId'],
    },
    repoSteps: {
        path: '/crud/steps',
        params: [],
    },
    entityStep: {
        path: '/crud/steps/:stepId',
        params: ['stepId'],
    },
    repoQuestions: {
        path: '/crud/questions',
        params: [],
    },
    entityQuestion: {
        path: '/crud/questions/:questionId',
        params: ['questionId'],
    },
    repoFormatConstraintsOfQuestion: {
        path: '/crud/questions/:questionId/formatConstraints',
        params: ['questionId'],
    },
    entityFormatConstraintOfQuestion: {
        path: '/crud/questions/:questionId/formatConstraints/:formatConstraintId',
        params: ['questionId', 'formatConstraintId'],
    },
    repoQuestionAssetsOfQuestion: {
        path: '/crud/questions/:questionId/questionAssets',
        params: ['questionId'],
    },
    entityQuestionAssetOfQuestion: {
        path: '/crud/questions/:questionId/questionAssets/:questionAssetId',
        params: ['questionId', 'questionAssetId'],
    },
    repoResponseAssetsOfQuestion: {
        path: '/crud/questions/:questionId/responseAssets',
        params: ['questionId'],
    },
    entityResponseAssetOfQuestion: {
        path: '/crud/questions/:questionId/responseAssets/:responseAssetId',
        params: ['questionId', 'responseAssetId'],
    },
    repoSequenceResponses: {
        path: '/crud/sequenceResponses',
        params: [],
    },
    entitySequenceResponse: {
        path: '/crud/sequenceResponses/:sequenceResponseId',
        params: ['sequenceResponseId'],
    },
    repoStepResponsesOfSequenceResponse: {
        path: '/crud/sequenceResponses/:sequenceResponseId/stepResponses',
        params: ['sequenceResponseId'],
    },
    entityStepResponseOfSequenceResponse: {
        path: '/crud/sequenceResponses/:sequenceResponseId/stepResponses/:stepResponseId',
        params: ['sequenceResponseId', 'stepResponseId'],
    },
    repoRespondentsLists: {
        path: '/crud/respondentsLists',
        params: [],
    },
    entityRespondentsList: {
        path: '/crud/respondentsLists/:respondentsListId',
        params: ['respondentsListId'],
    },
    repoRespondentsOfRespondentsList: {
        path: '/crud/respondentsLists/:respondentsListId/respondents',
        params: ['respondentsListId'],
    },
    entityRespondentOfRespondentsList: {
        path: '/crud/respondentsLists/:respondentsListId/respondents/:respondentId',
        params: ['respondentsListId', 'respondentId'],
    }
};
