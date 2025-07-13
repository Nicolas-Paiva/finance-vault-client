'use client';

import {Card} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import React, {useState} from 'react';
import {toast} from 'sonner';
import Navbar from '@/components/ui/navbar';
import {LoginRequest, LoginSuccessResponse} from '@/lib/types/auth';
import {login} from '@/lib/services/auth-service';
import {useMutation} from '@tanstack/react-query';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Loader2Icon} from 'lucide-react';
import {useRouter} from 'next/navigation';


export default function SignUp() {

    // Data input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Error messages
    const [badCredentials, setBadCredentials] = useState(false);

    const router = useRouter();


    /**
     * Builds the registration request with
     * form data
     */
    function buildRequest(): LoginRequest {
        return {
            email,
            password
        };
    }


    const loginMutation = useMutation({
        mutationFn: async (request: LoginRequest) => {
            return await login(request);
        },

        onSuccess: (data: LoginSuccessResponse) => {
            toast.success('User logged in successfully!');
            localStorage.setItem('token', data.jwtToken);
            setEmail('');
            setPassword('');
            router.push('/home');
        },

        onError: () => {
            toast.error('Invalid username or password');
            setBadCredentials(true);
        }
    });


    return (
        <>
            <Navbar showLogin={false}/>

            <h1 className="text-center text-3xl md:text-5xl mt-24">Log in</h1>

            <section className="flex items-center justify-center mt-4 md:mt-12">
                <Card className="w-full lg:w-[45%] mx-auto px-4 py-12 md:h-[400px]">
                    <div className="w-full md:w-[70%] md:mx-auto my-auto">

                        <Label htmlFor="email" className="ml-2 mb-1">Email</Label>
                        <Input type="email"
                               id="email"
                               value={email}
                               placeholder="your@email.com"
                               onChange={(e) => setEmail(e.target.value)}
                               onClick={() => setBadCredentials(false)}
                        />

                        <Label htmlFor="password" className="ml-2 mb-1 mt-4">Password</Label>
                        <Input type="password"
                               id="password"
                               value={password}
                               placeholder="Password"
                               onChange={(e) => setPassword(e.target.value)}
                               onClick={() => setBadCredentials(false)}
                        />

                        {badCredentials && <p className="text-sm text-destructive">Invalid username or password</p>}

                        {loginMutation.isPending ?
                            <Button disabled className="w-full mt-6">
                                <Loader2Icon className="animate-spin"/>Please wait
                            </Button>
                            :
                            <Button className="w-full mt-4"
                                    onClick={() => {
                                        const request = buildRequest();
                                        loginMutation.mutate(request);
                                    }
                                    }>
                                Submit
                            </Button>
                        }


                        <p className="text-xs md:text-sm mt-2">Don&#39;t have an account? <Link
                            className="underline text-violet-400" href="/signup">Create one here</Link></p>
                    </div>
                </Card>
            </section>
        </>
    );
};
