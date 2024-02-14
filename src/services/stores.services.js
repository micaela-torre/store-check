import {callApi} from './utilServices';

export const StoresServices = (callService => {
  const getAllStores = ({data, signal = null}) => {
    return callService({endpoint: 'stores', params: data, signal});
  };
  const checkInStore = ({data, signal = null}) => {
    return callService({endpoint: 'checkin', method: 'post', data, signal});
  };
  return {getAllStores, checkInStore};
})(callApi);
