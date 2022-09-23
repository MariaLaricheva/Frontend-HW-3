import { ILocalStore } from 'utils/useLocalStore'
import { Meta } from 'utils/meta'
import { computed, makeObservable, observable, runInAction } from 'mobx'
import { normalizeUserType, UserTypeApi, UserTypeModel } from 'models/userTypeModel'
import { getUsers } from 'utils/fetchApi'
import { getInitialCollectionModel, normalizeCollection } from 'models/shared/collectionModel'
import rootStore from 'store/RootStore'

type PrivateFields =
  | '_meta'
  | '_user'

/* если нужен - добавить в имплемент после айЛокалСтор
export interface IProductDetailStore {
  getProductDetailByID: (id: string | number) => Promise<void>
}
 */

const storageUser = JSON.parse(localStorage.getItem('u') || 'null')
//почему-то когда key = 'user', в браузере выпадает ошибка
//мол json не может найти элемент с key = u

export default class UserStore implements ILocalStore {
  private _meta: Meta = Meta.initial
  private _user: UserTypeModel | null =
    storageUser !== null
      ? storageUser
      : null

  constructor() {
    makeObservable<UserStore, PrivateFields>(this, {
      // observable - отслеживаем внутри стора
      _meta: observable,
      _user: observable,
      // computed - получаем в компонентах
      meta: computed,
      user: computed,
      //actions - менять observable (переменные внутри стора)

    })
  }

  get meta(): Meta {
    return this._meta
  }

  get user(): UserTypeModel | null {
    return this._user
  }

  register(user: UserTypeModel) {
    this._meta = Meta.loading;
    this._user = {
      id: user.id,
      username: user.username,
      password: user.password,
      name: {
        firstName: user.name.firstName,
        lastName: user.name.lastName,
        middleName: user.name.middleName,
      },
      country: user.country,
      birthday: user.birthday,
      email: user.email,
      phone: user.phone,
    }
    this._meta = Meta.success;
    localStorage.setItem('u', JSON.stringify(user))
    //по идее сейчас менять мету здесь нет смысла т.к. нет асинхронности но
    //если бы у нас была работающая регистрация в api,
    //надо было бы отправлять запрос на сервер
  }

  async login(login: string, password: string) {
    this._meta = Meta.loading;
    try {
      const response = await getUsers()
      runInAction(() => {
        if (!response.data) {
          this._meta = Meta.error
          this._user = null;
        } else {
          response.data.map((user: UserTypeApi) => {
            if (login === user.email || login === user.phone || login === user.username) {
              if (password === user.password){
                this._meta = Meta.success
                this._user = normalizeUserType(user)
                localStorage.setItem('u', JSON.stringify(user))
              }
              else {
                this._meta = Meta.error
              }
              //если пользователь нашёлся, то не надо идти дальше по циклу,
              //независимо от того, правильный пароль или нет
              return
            }
          })
          if (this._user === null) {
            this._meta = Meta.error
          }
        }
      })
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error
        this._user = null
      })
    }
  }

  logout(){
    this._user = null;
    localStorage.setItem('u', JSON.stringify(this._user))
  }


  destroy() {}
}