import {Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Label} from '@/components/ui/label';
import {FiEdit2} from 'react-icons/fi';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {EmailChangeRequest, NameChangeRequest, PasswordChangeRequest} from '@/lib/types/profile';

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

    const [emailError, setEmailError] = useState(false);

    // Changes the name state and enables the button
    // if there is also a last name
    function nameChange(value: string): void {
        setNewName(value);

        if (newLastName.length !== 0) {
            setButtonInactive(false);
        }

        if (newLastName.length === 0) {
            setButtonInactive(true);
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
    }


    return (
        <Dialog>
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

                <Label htmlFor={`new-${type}`}>{type === 'name' ? 'Name' : 'New ' + type}</Label>
                <Input type={type} id={`new-${type}`} onChange={(e) => {
                    switch (type) {
                        case 'name':
                            nameChange(e.target.value);
                            break;
                        case 'email':
                            setEmail(e.target.value);
                            break;
                        case 'password':
                            setNewPassword(e.target.value);
                    }
                }}/>

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
                    <>
                        <Label htmlFor={`confirm-new-${type}`}>Confirm new {type}</Label>
                        <Input id={`confirm-new-${type}`} type={type} onChange={(e) => {
                            switch (type) {
                                case 'email':
                                    setConfirmationEmail(e.target.value);
                                    break;
                                case 'password':
                                    setNewConfirmationPassword(e.target.value);
                            }
                        }}/>
                    </>
                }
                <DialogClose asChild>
                    <Button disabled={buttonInactive} type="submit" className="mt-2" onClick={changeData}>Save</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};
