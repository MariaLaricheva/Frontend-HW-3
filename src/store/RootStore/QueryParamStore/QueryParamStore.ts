import { action, makeObservable, observable } from "mobx";
import qs from "qs";

type PrivateFields = "_params";

export default class QueryParamStore{
  private _params: qs.ParsedQs = {};
  private _search: string = "";


  constructor() {
    makeObservable<QueryParamStore, PrivateFields>( this, {
      _params: observable.ref,
      setSearch: action,
    });
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    //return this._params[key];
    return this._params[key];
  }


  getSearch(): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    //return this._params[key];
    return this._search;
  }

  setSearch(search: string){
    search = search.startsWith("?") ? search.slice(1) : search;

    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
}


}