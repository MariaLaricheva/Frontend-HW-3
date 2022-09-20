export type UserTypeApi = {
  id: number
  username: string,
  password: string,
  email: string,
  phone: string,
  name: {
    firstname: string
    lastname: string
  }
  address: {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: {
      lat: string
      long: string
    }
    __v: number
  }
}

export type UserTypeModel = {
  id: number,
  password: string,
  username: string,
  name: {
    firstName: string
    lastName: string
    middleName: string | null,
  }
  country: string | null
  birthday: string | null
  email: string
  phone: string
}

export const normalizeUserType = (
  from: UserTypeApi
): UserTypeModel => ({
  id: from.id,
  password: from.password,
  username: from.username,
  name: {
    firstName: from.name.firstname,
    lastName: from.name.lastname,
    middleName: null,
  },
  country: null,
  birthday: null,
  email: from.email,
  phone: from.phone
})