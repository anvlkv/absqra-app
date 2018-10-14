import { ApiRoute } from 'api';
    
    export const CRUDRouter: {
            entityFormatConstraint: ApiRoute;
            entityLogic: ApiRoute;
            entityProject: ApiRoute;
            entityQuestion: ApiRoute;
            entityQuestionAsset: ApiRoute;
            entityQuestionContentAsset: ApiRoute;
            entityRespondent: ApiRoute;
            entityRespondentsList: ApiRoute;
            entityResponseAsset: ApiRoute;
            entitySequence: ApiRoute;
            entitySequenceHeader: ApiRoute;
            entitySequenceResponse: ApiRoute;
            entityStep: ApiRoute;
            entityStepAsset: ApiRoute;
            entityStepResponse: ApiRoute;
            entityTask: ApiRoute;
            repoFormatConstraintsOfQuestion: ApiRoute;
            repoLogicsOfSequence: ApiRoute;
            repoProjects: ApiRoute;
            repoQuestionAssetsOfQuestion: ApiRoute;
            repoQuestionContentAssets: ApiRoute;
            repoQuestions: ApiRoute;
            repoRespondentsLists: ApiRoute;
            repoRespondentsOfRespondentsList: ApiRoute;
            repoResponseAssetsOfQuestion: ApiRoute;
            repoSequenceHeaders: ApiRoute;
            repoSequenceResponses: ApiRoute;
            repoSequences: ApiRoute;
            repoStepAssetsOfSequence: ApiRoute;
            repoStepResponsesOfSequenceResponse: ApiRoute;
            repoStepsOfSequence: ApiRoute;
            repoStepsOfSequenceResponse: ApiRoute;
            repoTasksOfSequence: ApiRoute;
    } = {
    entityFormatConstraint: {
        path: '/crud/formatConstraints/:formatConstraintId',
        params: ['formatConstraintId'],
        typeName: 'formatConstraint'
    },
    entityLogic: {
        path: '/crud/logics/:logicId',
        params: ['logicId'],
        typeName: 'logic'
    },
    entityProject: {
        path: '/crud/projects/:projectId',
        params: ['projectId'],
        typeName: 'project'
    },
    entityQuestion: {
        path: '/crud/questions/:questionId',
        params: ['questionId'],
        typeName: 'question'
    },
    entityQuestionAsset: {
        path: '/crud/questionAssets/:questionAssetId',
        params: ['questionAssetId'],
        typeName: 'questionAsset'
    },
    entityQuestionContentAsset: {
        path: '/crud/questionContentAssets/:questionContentAssetId',
        params: ['questionContentAssetId'],
        typeName: 'questionContentAsset'
    },
    entityRespondent: {
        path: '/crud/respondents/:respondentId',
        params: ['respondentId'],
        typeName: 'respondent'
    },
    entityRespondentsList: {
        path: '/crud/respondentsLists/:respondentsListId',
        params: ['respondentsListId'],
        typeName: 'respondentsList'
    },
    entityResponseAsset: {
        path: '/crud/responseAssets/:responseAssetId',
        params: ['responseAssetId'],
        typeName: 'responseAsset'
    },
    entitySequence: {
        path: '/crud/sequences/:sequenceId',
        params: ['sequenceId'],
        typeName: 'sequence'
    },
    entitySequenceHeader: {
        path: '/crud/sequenceHeaders/:sequenceHeaderId',
        params: ['sequenceHeaderId'],
        typeName: 'sequenceHeader'
    },
    entitySequenceResponse: {
        path: '/crud/sequenceResponses/:sequenceResponseId',
        params: ['sequenceResponseId'],
        typeName: 'sequenceResponse'
    },
    entityStep: {
        path: '/crud/steps/:stepId',
        params: ['stepId'],
        typeName: 'step'
    },
    entityStepAsset: {
        path: '/crud/stepAssets/:stepAssetId',
        params: ['stepAssetId'],
        typeName: 'stepAsset'
    },
    entityStepResponse: {
        path: '/crud/stepResponses/:stepResponseId',
        params: ['stepResponseId'],
        typeName: 'stepResponse'
    },
    entityTask: {
        path: '/crud/tasks/:taskId',
        params: ['taskId'],
        typeName: 'task'
    },
    repoFormatConstraintsOfQuestion: {
        path: '/crud/questions/:questionId/formatConstraints',
        params: ['questionId'],
        typeName: 'formatConstraint'
    },
    repoLogicsOfSequence: {
        path: '/crud/sequences/:sequenceId/logics',
        params: ['sequenceId'],
        typeName: 'logic'
    },
    repoProjects: {
        path: '/crud/projects',
        params: [],
        typeName: 'project'
    },
    repoQuestionAssetsOfQuestion: {
        path: '/crud/questions/:questionId/questionAssets',
        params: ['questionId'],
        typeName: 'questionAsset'
    },
    repoQuestionContentAssets: {
        path: '/crud/questionContentAssets',
        params: [],
        typeName: 'questionContentAsset'
    },
    repoQuestions: {
        path: '/crud/questions',
        params: [],
        typeName: 'question'
    },
    repoRespondentsLists: {
        path: '/crud/respondentsLists',
        params: [],
        typeName: 'respondentsList'
    },
    repoRespondentsOfRespondentsList: {
        path: '/crud/respondentsLists/:respondentsListId/respondents',
        params: ['respondentsListId'],
        typeName: 'respondent'
    },
    repoResponseAssetsOfQuestion: {
        path: '/crud/questions/:questionId/responseAssets',
        params: ['questionId'],
        typeName: 'responseAsset'
    },
    repoSequenceHeaders: {
        path: '/crud/sequenceHeaders',
        params: [],
        typeName: 'sequenceHeader'
    },
    repoSequenceResponses: {
        path: '/crud/sequenceResponses',
        params: [],
        typeName: 'sequenceResponse'
    },
    repoSequences: {
        path: '/crud/sequences',
        params: [],
        typeName: 'sequence'
    },
    repoStepAssetsOfSequence: {
        path: '/crud/sequences/:sequenceId/stepAssets',
        params: ['sequenceId'],
        typeName: 'stepAsset'
    },
    repoStepResponsesOfSequenceResponse: {
        path: '/crud/sequenceResponses/:sequenceResponseId/stepResponses',
        params: ['sequenceResponseId'],
        typeName: 'stepResponse'
    },
    repoStepsOfSequence: {
        path: '/crud/sequences/:sequenceId/steps',
        params: ['sequenceId'],
        typeName: 'step'
    },
    repoStepsOfSequenceResponse: {
        path: '/crud/sequenceResponses/:sequenceResponseId/steps',
        params: ['sequenceResponseId'],
        typeName: 'step'
    },
    repoTasksOfSequence: {
        path: '/crud/sequences/:sequenceId/tasks',
        params: ['sequenceId'],
        typeName: 'task'
    }
};
