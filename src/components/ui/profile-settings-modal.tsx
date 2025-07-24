import {Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Label} from '@/components/ui/label';
import {FiEdit2} from 'react-icons/fi';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useEffect, useState} from 'react';
import {EmailChangeRequest, NameChangeRequest, PasswordChangeRequest} from '@/lib/types/profile';
import {isEmailValid} from '@/lib/utils/utils';
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

    // Error
    const [emailError, setEmailError] = useState(false);
    const [confirmationEmailError, setConfirmationEmailError] = useState(false);


    /**
     * Password hidden/unhidden functionality
     */
    function changePasswordInput1(): void {
        if (inputType1 === 'password') {
            setInputType1('text');
        } else {
            setInputType1('password');
        }
    }


    function changePasswordInput2(): void {
        if (inputType2 === 'password') {
            setInputType2('text');
        } else {
            setInputType2('password');
        }
    }


    function changePasswordInput3(): void {
        if (inputType3 === 'password') {
            setInputType3('text');
        } else {
            setInputType3('password');
        }
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
