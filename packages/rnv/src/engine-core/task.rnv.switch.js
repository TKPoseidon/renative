/* eslint-disable import/no-cycle */
import { logTask } from '../core/systemManager/logger';
import { copyRuntimeAssets, copySharedPlatforms } from '../core/projectManager/projectParser';
import { generateRuntimeConfig } from '../core/configManager/configParser';
import { executeTask } from '../core/engineManager';
import { TASK_SWITCH, TASK_PROJECT_CONFIGURE } from '../core/constants';

export const taskRnvSwitch = async (c, parentTask, originTask) => {
    logTask('taskRnvSwitch', `parent:${parentTask} origin:${originTask}`);

    await executeTask(c, TASK_PROJECT_CONFIGURE, TASK_SWITCH, originTask);

    await copyRuntimeAssets(c);
    await copySharedPlatforms(c);
    await generateRuntimeConfig(c);

    return true;
};

export default {
    description: '',
    fn: taskRnvSwitch,
    task: TASK_SWITCH,
    params: [],
    platforms: [],
};
