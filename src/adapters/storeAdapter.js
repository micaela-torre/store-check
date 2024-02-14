export const adaptStoreInfo = storeInfo => {
  return storeInfo.map(store => {
    const {
      id,
      name,
      address: {direction},
      open,
      schedule: {from, end},
      tasks,
    } = store;

    const adaptedTasks = tasks.map(task => ({
      id: task.id || '',
      description: task.description || '',
      assigned: task.assigned || '',
    }));

    return {
      id,
      name,
      address: direction,
      open,
      schedule: {from, end},
      tasks: adaptedTasks,
    };
  });
};
