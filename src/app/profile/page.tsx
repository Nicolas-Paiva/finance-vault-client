'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import NotificationDropdown from '@/components/ui/notification-dropdown';
import React, {useState} from 'react';
import {useSummary} from '@/lib/hooks/useSummary';
import {useRouter} from 'next/navigation';
import {CgProfile} from 'react-icons/cg';
import {MdOutlineMailOutline} from 'react-icons/md';
import {GrCurrency} from 'react-icons/gr';
import {TbLockPassword} from 'react-icons/tb';
import ActionsNavbar from '@/components/ui/home-actions-navbar';
import ProfileSettingsModal from '@/components/ui/profile-settings-modal';
import {CiSettings} from 'react-icons/ci';
import {useMutation} from '@tanstack/react-query';
import {changeUserEmail, changeUserName, changeUserPassword} from '@/lib/services/profile-service';
import {ProfileDataChangeResponse} from '@/lib/types/profile';
import {toast} from 'sonner';

export default function Profile() {
    const {data, isPending, isError, refetch} = useSummary();

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const router = useRouter();

    const changeNameMutation = useMutation({
        mutationFn: changeUserName,

        onSuccess: (response: ProfileDataChangeResponse): void => {
            console.log('Name changed');
            localStorage.setItem('token', response.jwt);
            refetch();
        },

        onError: (e) => {
            toast.error(e.message);
        }
    })

    const changeEmailMutation = useMutation({
        mutationFn: changeUserEmail,

        onSuccess: (response: ProfileDataChangeResponse): void => {
            console.log('Email changed');
            localStorage.setItem('token', response.jwt);
            refetch();
        },

        onError: (e) => {
            toast.error(e.message);
        }
    })

    const changePasswordMutation = useMutation({
        mutationFn: changeUserPassword,

        onSuccess: (response: ProfileDataChangeResponse): void => {
            console.log('Password changed');
            localStorage.setItem('token', response.jwt);
        },

        onError: (e) => {
            toast.error(e.message);
        }
    })

    if (isError) {
        router.push('/login');
    }

    return (<div className="flex flex-col h-[100vh] md:h-auto">
            <div className="flex justify-end gap-x-4 mt-4 px-4">
                <ThemeToggle/>
                <NotificationDropdown numberOfNotifications={data?.numberOfNotifications || 0}/>
            </div>
            <ActionsNavbar className="h-[75px] md:w-[50%] md:mx-auto mt-6 hidden md:block"/>
            <Card className="md:w-[50%] md:mx-auto mt-16 pb-12 pt-6">
                <CardHeader className="flex justify-between">
                    <CardTitle className="text-center">Profile</CardTitle>
                    <CiSettings size={25} className="hover:text-violet-600" onClick={() => setIsEditing(!isEditing)}/>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-x-2">
                        <div className="flex items-center gap-x-2">
                            <CgProfile className="mt-1"/>
                            <h1 className="font-bold">Name</h1>
                        </div>
                        <p>{data?.name}</p>
                        {isEditing && <ProfileSettingsModal type="name" onSubmit={changeNameMutation.mutate} onSuccess={refetch}/>}
                    </div>

                    <div className="flex gap-x-2 mt-4">
                        <div className="flex items-center gap-x-2">
                            <MdOutlineMailOutline className="mt-1"/>
                            <h1 className="font-bold">Email</h1>
                        </div>
                        <p>{data?.email}</p>
                        {isEditing && <ProfileSettingsModal type="email" onSubmit={changeEmailMutation.mutate} onSuccess={refetch}/>}
                    </div>

                    <div className="flex gap-x-2 mt-4">
                        <div className="flex items-center gap-x-2">
                            <TbLockPassword className="mt-1"/>
                            <h1 className="font-bold">Password</h1>
                        </div>
                        <p>********</p>
                        {isEditing && <ProfileSettingsModal type="password" onSubmit={changePasswordMutation.mutate} onSuccess={refetch}/>}
                    </div>

                    <div className="flex gap-x-2 mt-4">
                        <div className="flex items-center gap-x-2">
                            <GrCurrency className="mt-1"/>
                            <h1 className="font-bold">Currency</h1>
                        </div>
                        <p>{data?.currency}</p>
                    </div>
                </CardContent>
            </Card>
            <ActionsNavbar className="h-[75px] md:w-[50%] md:mx-auto mt-auto mb-2 md:hidden"/>
        </div>
    );
};

