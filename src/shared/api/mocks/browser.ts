import { setupWorker } from 'msw/browser';
import { boardsHandler } from './handlers/boards';
import { authHandlers } from './handlers/auth';

export const worker = setupWorker(...boardsHandler, ...authHandlers);
