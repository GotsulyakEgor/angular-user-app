export class UserModel {

  constructor() {
  }


  id: number = 0;
  name: string = '';
  username:  string = '';
  email:  string = '';
  address: any = {
    street: "Apt. 556",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    }
  };
  phone:  string = '';
  website:  string = '';
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  } | undefined
}
