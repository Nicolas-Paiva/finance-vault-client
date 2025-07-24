import {Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Label} from '@/components/ui/label';
import {FiEdit2} from 'react-icons/fi';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useEffect, useState} from 'react';
import {EmailChangeRequest, NameChangeRequest, PasswordChangeRequest} from '@/lib/types/profile';
import {isEmailValid} from '@/lib/utils/utils';

type ProfileSettingsModalProps = {
    type: string,
    onSubmit: (request: EmailChangeRequest | PasswordChangeRequest | NameChangeRequest) => void,
}

export default function ProfileSettingsModal({type, onSubmit}: ProfileSettingsModalProps) {
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

    // Error
    const [emailError, setEmailError] = useState(false);
    const [confirmationEmailError, setConfirmationEmailError] = useState(false);

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

    function confirmationEmailValidation(email: string): void {
        setConfirmationEmail(email);

        if (email !== newEmail) {
            setConfirmationEmailError(true);
        } else {
            setConfirmationEmailError(false);
        }
    }


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
                    <>
                        <Label htmlFor="old-password">Old password</Label>
                        <Input type="password" id="old-password" onChange={(e) =>
                            setOldPassword(e.target.value)}/>
                    </>
                }

                <div>
                    <Label htmlFor={`new-${type}`} className="mb-2">{type === 'name' ? 'Name' : 'New ' + type}</Label>
                    <Input type={type}
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
                    {emailError && <p className="text-xs text-destructive">Please provide a valid email</p>}
                </div>

                {/* Last name input */}
                {type === 'name' &&
                    <>
                        <Label htmlFor="last-name">Last name</Label>
                        <Input type="text" id="last-name" onChange={(e) =>
                            setNewLastName(e.target.value)}/>
                    </>
                }

                {/* Confirmation password/email */}

                {type === 'name' ? '' :
                    <div>
                        <Label htmlFor={`confirm-new-${type}`} className="mb-2">Confirm new {type}</Label>
                        <Input id={`confirm-new-${type}`} type={type} onChange={(e) => {
                            switch (type) {
                                case 'email':
                                    confirmationEmailValidation(e.target.value)
                                    break;
                                case 'password':
                                    setNewConfirmationPassword(e.target.value);
                            }
                        }}/>
                        {confirmationEmailError && <p className="text-xs text-destructive">Both email must match</p>}
                    </div>
                }
                <DialogClose asChild>
                    <Button disabled={buttonInactive} type="submit" className="mt-2" onClick={changeData}>Save</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};
