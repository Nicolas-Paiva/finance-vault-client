import {DropdownMenu, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {CiSettings} from 'react-icons/ci';

export default function SettingsDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                    <CiSettings size={25} />
            </DropdownMenuTrigger>
        </DropdownMenu>
    );
};
