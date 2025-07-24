import {Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Label} from '@/components/ui/label';
import {FiEdit2} from 'react-icons/fi';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import React, {useEffect, useState} from 'react';
import {EmailChangeRequest, NameChangeRequest, PasswordChangeRequest} from '@/lib/types/profile';
import {
    isEmailValid,
    isPasswordValid,
    passwordContainsSpecialCharacter,
    passwordContainsUppercase
} from '@/lib/utils/utils';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

type ProfileSettingsModalProps = {
    type: string,
    onSubmit: (request: EmailChangeRequest | PasswordChangeRequest | NameChangeRequest) => void,
}

export default function ProfileSettingsModal({type, onSubmit}: ProfileSettingsModalProps) {
    const [inputType1, setInputType1] = useState(type);
    const [inputType2, setInputType2] = useState(type);
    const [inputType3, setInputType3] = useState(type);

    // Email
    const [newEmail, setEmail] = useState('');
    const [newEmailConfirmation, setConfirmationEmail] = useState('');

    // Name
    const [newName, setNewName] = useState('');
    const [newLastName, setNewLastName] = useState('');

    // Password
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewConfirmationPassword] = useState('');

    const [buttonInactive, setButtonInactive] = useState(true);

    // Email error
    const [emailError, setEmailError] = useState(false);
    const [confirmationEmailError, setConfirmationEmailError] = useState(false);

    // Password error
    const [tooShort, setTooShort] = useState(false);
    const [noSpecialCharacter, setNoSpecialCharacter] = useState(false);
    const [noUpperCaseLetter, setNoUpperCaseLetter] = useState(false);

    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmationError, setPasswordConfirmationError] = useState('');


    /**
     * Password hidden/unhidden functionality
     */
    function changePasswordInput1(): void {
        setInputType1((prev: string) => {
            return prev === 'password' ? 'text' : 'password';
        });
    }


    function changePasswordInput2(): void {
        setInputType2((prev: string) => {
            return prev === 'password' ? 'text' : 'password';
        });
    }


    function changePasswordInput3(): void {
        setInputType3((prev: string) => {
            return prev === 'password' ? 'text' : 'password';
        });
    }


    /**
     * Enables the submit button only if name and last name
     * have a length superior greater or equal to 1
     */
    useEffect(() => {
        if (newName.length > 0 && newLastName.length > 0) {
            setButtonInactive(false);
        } else {
            setButtonInactive(true);
        }
    }, [newName, newLastName]);

    /**
     * Enables the submit button only if both
     * email match and have a length greater
     * or equal to 1
     */
    useEffect(() => {
        if (newEmail === newEmailConfirmation && newEmail.length > 0) {
            setButtonInactive(false);
        } else {
            setButtonInactive(true);
        }
    }, [newEmail, newEmailConfirmation]);

    /**
     * Displays errors and enables submission for
     * the password
     */
    useEffect(() => {

        if (newPasswordConfirmation === newPassword
            && oldPassword.length > 0
            && newPassword.length > 0
        ) {
            setButtonInactive(false);
        }

        if (newPassword.length < 8) {
            setTooShort(true);
        } else {
            setTooShort(false);
        }

        if (!passwordContainsSpecialCharacter(newPassword)) {
            setNoSpecialCharacter(true);
        } else {
            setNoSpecialCharacter(false);
        }

        if (!passwordContainsUppercase(newPassword)) {
            setNoUpperCaseLetter(true);
        } else {
            setNoUpperCaseLetter(false);
        }

        if (newPassword !== newPasswordConfirmation) {
            setPasswordConfirmationError('Both password must match');
        } else {
            setPasswordConfirmationError('');
        }

    }, [newPassword, newPasswordConfirmation, oldPassword]);


    /**
     * Checks whether the provided email has a valid format
     * setting/removing the error message
     */
    function emailValidation(email: string): void {
        setEmail(email);

        if (!isEmailValid(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }


    /**
     * Sets the error in the confirmation email
     * if it does not match the provided email
     */
    function confirmationEmailValidation(email: string): void {
        setConfirmationEmail(email);

        if (email !== newEmail) {
            setConfirmationEmailError(true);
        } else {
            setConfirmationEmailError(false);
        }
    }


    /**
     * Submits the data for change
     */
    function changeData(): void {
        const nameRequest: NameChangeRequest = {
            newName,
            newLastName
        };

        const emailRequest: EmailChangeRequest = {
            newEmail,
            newEmailConfirmation
        };


        const passwordRequest: PasswordChangeRequest = {
            oldPassword,
            newPassword,
            newPasswordConfirmation
        };

        switch (type) {
            case 'name':
                onSubmit(nameRequest);
                break;
            case 'email':
                onSubmit(emailRequest);
                break;
            case 'password':
                onSubmit(passwordRequest);
                break;
        }

        setButtonInactive(true);
    }


    /**
     * Resets the state back to default
     */
    function resetModal(): void {
        setNewName('');
        setNewLastName('');
        setEmail('');
        setConfirmationEmail('');
        setOldPassword('');
        setNewPassword('');
        setNewConfirmationPassword('');
        setButtonInactive(true);
        setEmailError(false);
        setConfirmationEmailError(false);
    }


    return (
        <Dialog onOpenChange={resetModal}>
            <div className="flex">
                <DialogTrigger>
                    <FiEdit2 className="ml-4 hover:text-violet-600"/>
                </DialogTrigger>
            </div>
            <DialogContent>
                <DialogTitle>Change {type}</DialogTitle>

                {/* Old password input */}
                {type === 'password' &&
                    <div>
                        <Label htmlFor="old-password" className="mb-2">Old password</Label>
                        <div className="relative">
                            <Input type={inputType1} id="old-password" onChange={(e) =>
                                setOldPassword(e.target.value)}/>
                            <span className="absolute top-[10] right-4" onClick={changePasswordInput1}>
                                {inputType1 === 'password' ?
                                    <FaEye/>
                                    :
                                    <FaEyeSlash/>
                                }
                            </span>
                        </div>
                    </div>
                }

                <div>
                    <Label htmlFor={`new-${type}`} className="mb-2">{type === 'name' ? 'Name' : 'New ' + type}</Label>
                    <div className="relative">
                        <Input type={inputType2}
                               className="mb-0"
                               id={`new-${type}`} onChange={(e) => {
                            switch (type) {
                                case 'name':
                                    setNewName(e.target.value);
                                    break;
                                case 'email':
                                    emailValidation(e.target.value);
                                    break;
                                case 'password':
                                    setNewPassword(e.target.value);
                            }
                        }}/>
                        {type === 'password' &&
                            <span className="absolute top-[10] right-4" onClick={changePasswordInput2}>
                                {inputType2 === 'password' ?
                                    <FaEye/>
                                    :
                                    <FaEyeSlash/>
                                }
                            </span>}
                    </div>
                    {emailError && <p className="text-xs text-destructive">Please provide a valid email</p>}

                    {type === 'password' && <ul>
                        <li className={`ml-6 list-disc text-xs ${tooShort ? 'text-destructive' : 'text-muted-foreground'}`}>At
                            least 8 characters
                        </li>
                        <li className={`ml-6 list-disc text-xs  ${noSpecialCharacter ? 'text-destructive' : 'text-muted-foreground'}`}>At
                            least 1 special character
                        </li>
                        <li className={`ml-6 list-disc text-xs  ${noUpperCaseLetter ? 'text-destructive' : 'text-muted-foreground'}`}>At
                            least 1 uppercase letter
                        </li>
                    </ul>}
                </div>


                {/* Last name input */}
                {type === 'name' &&
                    <div>
                        <Label htmlFor="last-name" className="mb-2">Last name</Label>
                        <Input type="text" id="last-name" onChange={(e) =>
                            setNewLastName(e.target.value)}/>
                    </div>
                }

                {/* Confirmation password/email */}

                {type === 'name' ? '' :
                    <div>
                        <Label htmlFor={`confirm-new-${type}`} className="mb-2">Confirm new {type}</Label>
                        <div className="relative">
                            <Input id={`confirm-new-${type}`} type={inputType3} onChange={(e) => {
                                switch (type) {
                                    case 'email':
                                        confirmationEmailValidation(e.target.value);
                                        break;
                                    case 'password':
                                        setNewConfirmationPassword(e.target.value);
                                }
                            }}/>
                            {type === 'password' &&
                                <span className="absolute top-[10] right-4" onClick={changePasswordInput3}>
                                    {inputType3 === 'password' ?
                                        <FaEye/>
                                        :
                                        <FaEyeSlash/>
                                    }
                                </span>}
                        </div>
                        {confirmationEmailError && <p className="text-xs text-destructive">Both email must match</p>}
                        {passwordConfirmationError &&
                            <p className="text-xs text-destructive">{passwordConfirmationError}</p>}
                    </div>
                }
                <DialogClose asChild>
                    <Button disabled={buttonInactive} type="submit" className="mt-2" onClick={() => {
                        changeData();
                    }}>Save</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};
