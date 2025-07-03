import {GrTransaction} from 'react-icons/gr';

export default function Transaction() {
    return <div className="flex items-center mb-3">
        <GrTransaction className="mr-4 text-destructive"/>
        <div className="flex justify-between w-full mx-auto items-center">
            <div className="flex flex-col">
                <p>Nicolas Paiva</p>
                <span className="text-xs text-slate-500">12/06/25</span>
            </div>
            <p className="font-bold">+ 1200 €</p>
        </div>
    </div>;
};
