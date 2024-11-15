interface IUserBody extends Document {
    _id: string;
    name: string;
    email:string,
    password: string;
}

export {IUserBody}