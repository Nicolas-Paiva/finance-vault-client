'use client';

import {Card} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import React, {useState} from 'react';
import {checkEmail} from '@/lib/utils/utils';
import {toast} from 'sonner';
import Navbar from '@/components/ui/navbar';
import {Checkbox} from '@/components/ui/checkbox';
import CurrencySelect from '@/components/ui/currency-select';

export default function SignUp() {

    // Data input
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [checked, setChecked] = useState(false);

    // Error messages
    const [nameError, setNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [notCheckedError, setNotCheckedError] = useState(false);

    function toggleTermsError(): void {
        if (!checked) {
            setChecked(true);
            setNotCheckedError(false);
            return;
        }

        setChecked(false);
    }


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

        if (!checked) {
            setNotCheckedError(true);
            isDataValid = false;
        }

        if (!isDataValid) {
            return;
        }

        toast.success('Message sent successfully!');
        setName('');
        setLastName('');
        setEmail('');
        setChecked(false);
    }


    return (
        <>
            <Navbar showSignup={false}/>

            <h1 className="text-center text-3xl md:text-5xl mt-24">Sign Up</h1>

            <section className="flex items-center justify-center mt-4 md:mt-12">
                <Card className="w-full lg:w-2/3 mx-auto px-4 py-12">
                    <div className="w-full md:w-[80%] md:mx-auto">
                        <div className="flex flex-col justify-around h-full gap-y-4 md:flex-row md:justify-between">
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

                        <CurrencySelect className="w-full mt-6 mb-6"/>


                            <div className="flex items-start gap-3">
                                <Checkbox id="terms-2" defaultChecked={false} onClick={toggleTermsError}/>
                                <div className="grid gap-2">
                                    <Label htmlFor="terms-2">Accept terms and conditions</Label>
                                    <p className="text-muted-foreground text-sm">
                                        By clicking this checkbox, you agree to the terms and conditions.
                                    </p>
                                </div>
                            </div>
                            {notCheckedError &&
                                <p className="text-xs text-destructive mb-6">Please agree to our terms before providing your
                                    credentials.
                                </p>
                            }

                            <div className="flex items-center gap-3 mt-4">
                                <Checkbox id="terms"/>
                                <Label htmlFor="terms">Receive newsletter by email</Label>
                            </div>

                        <Button className="w-full mt-6" onClick={() => checkSubmission()}>Submit</Button>
                    </div>
                </Card>
            </section>
        </>
    );
};
