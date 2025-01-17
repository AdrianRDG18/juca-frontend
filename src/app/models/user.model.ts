
export class User{
    constructor(
        public uid: string,
        public name: string,
        public email: string,
        public role: string,
        public status: string,
        public password: string,
        public image?: string,
        public google?: string,
    ){}
}