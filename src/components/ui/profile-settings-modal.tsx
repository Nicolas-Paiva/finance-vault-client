import {Dialog, DialogContent, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Label} from '@/components/ui/label';
import {FiEdit2} from 'react-icons/fi';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

type ProfileSettingsModalProps = {
    type: string
}

export default function ProfileSettingsModal({type}: ProfileSettingsModalProps) {
    return (
        <Dialog>
            <div className="flex">
                <DialogTrigger>
                        <FiEdit2 className="ml-4" />
                </DialogTrigger>
            </div>
            <DialogContent>
                <DialogTitle>Change {type}</DialogTitle>
                <Label htmlFor={`new-${type}`}>New {type}</Label>
                <Input type={type} id={`new-${type}`}></Input>

                <Label htmlFor={`confirm-new-${type}`}>Confirm new {type}</Label>
                <Input id={`confirm-new-${type}`}></Input>
                <Button className="mt-2">Save</Button>
            </DialogContent>
        </Dialog>
    )
};
