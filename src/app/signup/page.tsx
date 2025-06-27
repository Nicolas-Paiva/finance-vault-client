'use client';

import {Card} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Switch} from '@/components/ui/switch';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Button} from '@/components/ui/button';
import React, {useState} from 'react';
import {checkEmail, checkNumber} from '@/lib/utils/utils';
import {toast} from 'sonner';
import Navbar from '@/components/ui/navbar';

export default function SignUp() {

    // Data input
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState('');
    const [checked, setChecked] = useState(false);

    // Error messages
    const [nameError, setNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [notChecked, setNotChecked] = useState(false);


    function checkSubmission(): void {
        let isDataValid = true;

        if (name.length === 0) {
            setNameError(true);
            isDataValid = false;
        }

        if (lastName.length === 0) {
            setLastNameError(true);
            isDataValid = false;
        }

        if (!checkEmail(email)) {
            setEmailError(true);
            isDataValid = false;
        }

        if (!checkNumber(number)) {
            setNumberError(true);
            isDataValid = false;
        }

        if (!checked) {
            setNotChecked(true);
            isDataValid = false;
        }

        if (!isDataValid) {
            return;
        }

        toast.success('Message sent successfully!');
        setName('');
        setLastName('');
        setEmail('');
        setNumber('');
        setMessage('');
        setChecked(false);
    }


    return (
        <>
            <Navbar/>
            <section>
                <Card className="w-full lg:w-2/3 mx-auto p-4">
                    <div className="w-full md:w-[80%] md:mx-auto">
                        <div className="flex flex-col gap-y-4 md:flex-row md:justify-between">
                            <div className="md:w-1/3">
                                <Label htmlFor="first-name" className="ml-2 mb-1">First Name</Label>
                                <Input type="text"
                                       id="first-name"
                                       value={name}
                                       placeholder="John"
                                       onChange={(e) => setName(e.target.value)}
                                       onClick={() => setNameError(false)}
                                />
                                {nameError && <p className="ml-2 text-xs text-destructive">Please provide your name</p>}
                            </div>

                            <div className="md:w-1/3">
                                <Label htmlFor="last-name" className="ml-2 mb-2">Last Name</Label>
                                <Input type="text"
                                       id="last-name"
                                       value={lastName}
                                       placeholder="Doe"
                                       onChange={(e) => setLastName(e.target.value)}
                                       onClick={() => setLastNameError(false)}
                                />
                                {lastNameError &&
                                    <p className="ml-2 text-xs text-destructive">Please provide your last name</p>}
                            </div>
                        </div>

                        <div className="my-4">
                            <Label htmlFor="email" className="ml-2 mb-1">Email</Label>
                            <Input type="email"
                                   id="email"
                                   value={email}
                                   placeholder="your@email.com"
                                   onChange={(e) => setEmail(e.target.value)}
                                   onClick={() => setEmailError(false)}
                            />
                            {emailError && <p className="ml-2 text-xs text-destructive">Invalid email</p>}
                        </div>

                        <div>
                            <label htmlFor="contact-number" className="ml-2 text-sm font-medium mb-4">
                                Contact Number
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                       className="w-4 h-4">
                                    <path
                                        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                                        clipRule="evenodd"/>
                                  </svg>
                                </span>
                                <Input type="text"
                                       id="contact-number"
                                       value={number}
                                       placeholder="+351 123 456 789"
                                       className="pl-12"
                                       onChange={(e) => setNumber(e.target.value)}
                                       onClick={() => setNumberError(false)}
                                />
                            </div>
                            {numberError && <p className="ml-2 text-xs text-destructive">Invalid phone number</p>}
                            <p className="mt-2 text-xs text-slate-400">
                                Include your country code for international numbers.
                            </p>
                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                            <Switch id="privacy-policy"
                                    checked={checked}
                                    onClick={() => {
                                        setChecked(!checked);
                                        setNotChecked(false);
                                    }}/>
                            <Dialog>
                                <div className="flex">
                                    <DialogTrigger>
                                        <Label htmlFor="privacy-policy" className="pb-1 underline">By selecting this,
                                            you agree
                                            to our privacy
                                            policy
                                        </Label>
                                    </DialogTrigger>
                                </div>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Our data policy:</DialogTitle>
                                        <ScrollArea className="h-86 rounded-md border">
                                            <div className="p-4">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                    Aliquid corporis delectus excepturi exercitationem laudantium magni
                                                    necessitatibus pariatur quia sed sunt!
                                                    Aliquam animi cupiditate dolores earum, eius error ex excepturi
                                                    ipsum laudantium maiores molestiae neque non nostrum optio quaerat
                                                    quia quo sequi sunt totam vitae!
                                                    Ab accusamus aliquam atque corporis culpa cum cumque dolore eum,
                                                    natus nemo odit perferendis provident quis, vel. Aliquid aperiam
                                                    harum inventore quasi quidem quis rerum! Ab adipisci alias,
                                                    architecto cupiditate debitis dolore eius eum id incidunt ipsa ipsam
                                                    ipsum, nemo omnis porro, tempore.
                                                </p>
                                            </div>
                                        </ScrollArea>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                        {notChecked &&
                            <p className="text-xs text-destructive">Please agree to our terms before providing your
                                credentials.</p>}

                        <Button className="w-full mt-4" onClick={() => checkSubmission()}>Submit</Button>
                    </div>
                </Card>
            </section>
        </>
    );
};
