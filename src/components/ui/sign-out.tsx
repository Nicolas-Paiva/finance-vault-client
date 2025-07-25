import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {CiLogout} from 'react-icons/ci';
import {Button} from '@/components/ui/button';

export default function SignOut() {
    const router = useRouter();

    function performSignOut(): void {
        localStorage.removeItem("token");
        router.push("/")
    }

    return (
        <button className="bg-muted p-[7.5] rounded-full hover:cursor-pointer" onClick={performSignOut}><CiLogout /></button>
    );
};
