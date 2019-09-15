export class User {

    email: string;
    username: string;
    admin: boolean;

    constructor(email: string, username: string, admin: number) {
        this.email = email;
        this.username = this.setUserName(username);
        if (admin <= 0) {
            this.admin = false;
        } else {
            this.admin = true;
        }
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
