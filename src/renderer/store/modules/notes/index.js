
import '../../../typedef';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const InitialState = { data: [] };

export default {
  namespaced: false,
  state: InitialState,
  mutations,
  actions,
  getters
};

export {
  InitialState, mutations, actions, getters
};
