import QueryParamStore from './QueryParamStore'

export default class RootStore {
  readonly query = new QueryParamStore()
}
