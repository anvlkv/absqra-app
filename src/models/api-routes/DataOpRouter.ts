import { ApiRoute } from 'api';
    
    export const DataOpRouter: {
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
            repoSequenceResponsesOfProject: ApiRoute;
            repoSequences: ApiRoute;
            repoStepAssetsOfSequence: ApiRoute;
            repoStepResponsesOfSequenceResponse: ApiRoute;
            repoStepResponsesOfSequenceResponseOfProject: ApiRoute;
            repoStepsOfSequence: ApiRoute;
            repoStepsOfSequenceResponse: ApiRoute;
            repoStepsOfSequenceResponseOfProject: ApiRoute;
            repoTasksOfSequence: ApiRoute;
    } = {
    entityFormatConstraint: {
        path: '/data-op/formatConstraints/:formatConstraintId/:operationType',
        params: ['formatConstraintId', 'operationType'],
        typeName: 'formatConstraint'
    },
    entityLogic: {
        path: '/data-op/logics/:logicId/:operationType',
        params: ['logicId', 'operationType'],
        typeName: 'logic'
    },
    entityProject: {
        path: '/data-op/projects/:projectId/:operationType',
        params: ['projectId', 'operationType'],
        typeName: 'project'
    },
    entityQuestion: {
        path: '/data-op/questions/:questionId/:operationType',
        params: ['questionId', 'operationType'],
        typeName: 'question'
    },
    entityQuestionAsset: {
        path: '/data-op/questionAssets/:questionAssetId/:operationType',
        params: ['questionAssetId', 'operationType'],
        typeName: 'questionAsset'
    },
    entityQuestionContentAsset: {
        path: '/data-op/questionContentAssets/:questionContentAssetId/:operationType',
        params: ['questionContentAssetId', 'operationType'],
        typeName: 'questionContentAsset'
    },
    entityRespondent: {
        path: '/data-op/respondents/:respondentId/:operationType',
        params: ['respondentId', 'operationType'],
        typeName: 'respondent'
    },
    entityRespondentsList: {
        path: '/data-op/respondentsLists/:respondentsListId/:operationType',
        params: ['respondentsListId', 'operationType'],
        typeName: 'respondentsList'
    },
    entityResponseAsset: {
        path: '/data-op/responseAssets/:responseAssetId/:operationType',
        params: ['responseAssetId', 'operationType'],
        typeName: 'responseAsset'
    },
    entitySequence: {
        path: '/data-op/sequences/:sequenceId/:operationType',
        params: ['sequenceId', 'operationType'],
        typeName: 'sequence'
    },
    entitySequenceHeader: {
        path: '/data-op/sequenceHeaders/:sequenceHeaderId/:operationType',
        params: ['sequenceHeaderId', 'operationType'],
        typeName: 'sequenceHeader'
    },
    entitySequenceResponse: {
        path: '/data-op/sequenceResponses/:sequenceResponseId/:operationType',
        params: ['sequenceResponseId', 'operationType'],
        typeName: 'sequenceResponse'
    },
    entityStep: {
        path: '/data-op/steps/:stepId/:operationType',
        params: ['stepId', 'operationType'],
        typeName: 'step'
    },
    entityStepAsset: {
        path: '/data-op/stepAssets/:stepAssetId/:operationType',
        params: ['stepAssetId', 'operationType'],
        typeName: 'stepAsset'
    },
    entityStepResponse: {
        path: '/data-op/stepResponses/:stepResponseId/:operationType',
        params: ['stepResponseId', 'operationType'],
        typeName: 'stepResponse'
    },
    entityTask: {
        path: '/data-op/tasks/:taskId/:operationType',
        params: ['taskId', 'operationType'],
        typeName: 'task'
    },
    repoFormatConstraintsOfQuestion: {
        path: '/data-op/questions/:questionId/formatConstraints/:operationType',
        params: ['questionId', 'operationType'],
        typeName: 'formatConstraint'
    },
    repoLogicsOfSequence: {
        path: '/data-op/sequences/:sequenceId/logics/:operationType',
        params: ['sequenceId', 'operationType'],
        typeName: 'logic'
    },
    repoProjects: {
        path: '/data-op/projects/:operationType',
        params: ['operationType'],
        typeName: 'project'
    },
    repoQuestionAssetsOfQuestion: {
        path: '/data-op/questions/:questionId/questionAssets/:operationType',
        params: ['questionId', 'operationType'],
        typeName: 'questionAsset'
    },
    repoQuestionContentAssets: {
        path: '/data-op/questionContentAssets/:operationType',
        params: ['operationType'],
        typeName: 'questionContentAsset'
    },
    repoQuestions: {
        path: '/data-op/questions/:operationType',
        params: ['operationType'],
        typeName: 'question'
    },
    repoRespondentsLists: {
        path: '/data-op/respondentsLists/:operationType',
        params: ['operationType'],
        typeName: 'respondentsList'
    },
    repoRespondentsOfRespondentsList: {
        path: '/data-op/respondentsLists/:respondentsListId/respondents/:operationType',
        params: ['respondentsListId', 'operationType'],
        typeName: 'respondent'
    },
    repoResponseAssetsOfQuestion: {
        path: '/data-op/questions/:questionId/responseAssets/:operationType',
        params: ['questionId', 'operationType'],
        typeName: 'responseAsset'
    },
    repoSequenceHeaders: {
        path: '/data-op/sequenceHeaders/:operationType',
        params: ['operationType'],
        typeName: 'sequenceHeader'
    },
    repoSequenceResponses: {
        path: '/data-op/sequenceResponses/:operationType',
        params: ['operationType'],
        typeName: 'sequenceResponse'
    },
    repoSequenceResponsesOfProject: {
        path: '/data-op/projects/:projectId/sequenceResponses/:operationType',
        params: ['projectId', 'operationType'],
        typeName: 'sequenceResponse'
    },
    repoSequences: {
        path: '/data-op/sequences/:operationType',
        params: ['operationType'],
        typeName: 'sequence'
    },
    repoStepAssetsOfSequence: {
        path: '/data-op/sequences/:sequenceId/stepAssets/:operationType',
        params: ['sequenceId', 'operationType'],
        typeName: 'stepAsset'
    },
    repoStepResponsesOfSequenceResponse: {
        path: '/data-op/sequenceResponses/:sequenceResponseId/stepResponses/:operationType',
        params: ['sequenceResponseId', 'operationType'],
        typeName: 'stepResponse'
    },
    repoStepResponsesOfSequenceResponseOfProject: {
        path: '/data-op/projects/:projectId/sequenceResponses/:sequenceResponseId/stepResponses/:operationType',
        params: ['projectId', 'sequenceResponseId', 'operationType'],
        typeName: 'stepResponse'
    },
    repoStepsOfSequence: {
        path: '/data-op/sequences/:sequenceId/steps/:operationType',
        params: ['sequenceId', 'operationType'],
        typeName: 'step'
    },
    repoStepsOfSequenceResponse: {
        path: '/data-op/sequenceResponses/:sequenceResponseId/steps/:operationType',
        params: ['sequenceResponseId', 'operationType'],
        typeName: 'step'
    },
    repoStepsOfSequenceResponseOfProject: {
        path: '/data-op/projects/:projectId/sequenceResponses/:sequenceResponseId/steps/:operationType',
        params: ['projectId', 'sequenceResponseId', 'operationType'],
        typeName: 'step'
    },
    repoTasksOfSequence: {
        path: '/data-op/sequences/:sequenceId/tasks/:operationType',
        params: ['sequenceId', 'operationType'],
        typeName: 'task'
    }
};
