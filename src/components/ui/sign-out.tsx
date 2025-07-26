import {useRouter} from 'next/navigation';
import {CiLogout} from 'react-icons/ci';

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
