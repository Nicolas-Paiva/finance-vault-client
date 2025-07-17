import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import React, {useState} from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

type PasswordInputProps = {
    value: string,
    setPassword: (value: string) => void,
    setError: (value: boolean) => void
}

export default function PasswordInput({value, setPassword, setError}: PasswordInputProps) {
    const [inputType, setInputType] = useState('password');

    return (
        <div className="relative">
            <Label htmlFor="password" className="ml-2 mb-1 mt-4">Password</Label>
            <Input type={inputType}
                   id="password"
                   value={value}
                   placeholder="Password"
                   onChange={(e) => setPassword(e.target.value)}
                   onClick={() => setError(false)}
            />
            <span className="absolute top-[38%] translate-y-1/2 right-2 hover:cursor-pointer"
                  onClick={() => {
                      if (inputType === 'password') {
                          setInputType('text');
                      } else {
                          setInputType('password');
                      }
                  }}>
                {inputType === 'password' ? <FaEye/> : <FaEyeSlash/>}
            </span>
        </div>
    );
};
