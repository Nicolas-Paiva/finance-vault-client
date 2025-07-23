import {ScaleLoader} from 'react-spinners';

export default function Loading() {
    return <div className="h-[100vh] w-[100%] flex justify-center items-center">
        <ScaleLoader color="#7f22fe"/>
    </div>;
};
