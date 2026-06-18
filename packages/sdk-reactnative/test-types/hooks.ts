import { initSdk, startMessage, startSurvey } from '../src';

const hooks = {
  version: '1.0',
  onSurveyDisplayAllowed: async (payload: string) =>
    payload.includes('hook_id'),
};

initSdk('channel-id', 'user-id', { plan: 'pro' }, hooks);

startSurvey('survey-id', true, { source: 'test' }, true, hooks);

startMessage('message-id', true, { source: 'test' }, true, hooks);
