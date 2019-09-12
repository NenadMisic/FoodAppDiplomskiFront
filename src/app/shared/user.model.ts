export class User {

    email: string;
    username: string;
    admin: boolean;

    constructor(email: string, username: string, admin: boolean) {
        this.email = email;
        this.username = this.setUserName(username);
        this.admin = admin;
    }

    private setUserName(username): string {
        let newUsername: string;
        if (!username && !this.username) {
            newUsername = this.email.substring(0, this.email.indexOf('@'));
        } else {
            newUsername = username;
        }
        console.log(newUsername);
        return newUsername;
    }

}
