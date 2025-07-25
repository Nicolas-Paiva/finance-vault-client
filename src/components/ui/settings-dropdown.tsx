/* eslint-disable */
// @ts-nocheck

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {CiSettings} from 'react-icons/ci';
import React from 'react';
import ProfileSettingsModal from '@/components/ui/profile-settings-modal';

export default function SettingsDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                    <CiSettings size={25} />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
                {/*<DropdownMenuLabel>Notifications</DropdownMenuLabel>*/}
                {/*<DropdownMenuSeparator/>*/}
                <DropdownMenuItem>
                    <ProfileSettingsModal type={'name'}/>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <ProfileSettingsModal type={'email'}/>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <ProfileSettingsModal type={'password'}/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
