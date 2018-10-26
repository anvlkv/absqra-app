import { ApiRoute } from 'api';
    
    export const DesignerRouter: {
            saveTopSequenceOfProject: ApiRoute;
            viewReferableSteps: ApiRoute;
    } = {
    saveTopSequenceOfProject: {
        path: '/designer/save-top-sequence/:projectId',
        params: ['projectId'],
        typeName: 'sequence'
    },
    viewReferableSteps: {
        path: '/designer/referable-steps/:projectId/:stepId',
        params: ['projectId', 'stepId'],
        typeName: 'viewReferableSteps'
    }
};
