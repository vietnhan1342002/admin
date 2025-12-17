import { CrudAction } from '../Enum/messages';

export const buildCrudMessage = (resource: string, action: CrudAction) =>
  `${resource} ${action}`;
