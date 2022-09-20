import { action, makeObservable, observable } from 'mobx'
import qs from 'qs'

type PrivateFields = '_params'

export default class QueryParamStore {
  private _params: qs.ParsedQs = {}
  private _search = ''
  private _category = ''

  constructor() {
    makeObservable<QueryParamStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
      setCategory: action,
    })
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key]
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search

    if (this._search !== search) {
      this._search = search
      this._params = qs.parse(search)
    }
  }

  setCategory(category: string) {
    category = category.startsWith('?') ? category.slice(1) : category

    if (this._category !== category) {
      this._category = category
      this._params = qs.parse(category)
    }
  }
}
