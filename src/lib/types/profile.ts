export type EmailChangeRequest = {
    newEmail: string,
    newEmailConfirmation: string
}

export type PasswordChangeRequest = {
    oldPassword: string,
    newPassword: string,
    newPasswordConfirmation: string
}

export type NameChangeRequest = {
    newName: string,
    newLastName: string
}

export type ProfileDataChangeResponse = {
    success: boolean,
    message: string,
    jwt: string
}