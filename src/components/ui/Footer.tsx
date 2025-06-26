import {FaRegCopyright, FaGithub, FaLinkedin, FaGlobe} from 'react-icons/fa';

export default function FooterComponent() {
    return (
        <footer className="h-[75px] w-[90vw] lg:max-w-7xl mt-16 mx-auto
         border-t border-accent flex justify-center">
            <div className="flex-col">
                <div className="flex items-center gap-x-2">
                    <p>Nicolas Paiva</p>
                    <FaRegCopyright size={14} className="mt-1"/>
                </div>
                <div className="flex justify-between mt-2">
                    <a
                        href="https://github.com/Nicolas-Paiva"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500">
                        <FaGithub/>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/nicolas-paiva-garcia/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500">
                        <FaLinkedin/>
                    </a>
                    <a
                        href="https://github.com/Nicolas-Paiva"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500">
                        <FaGlobe/>
                    </a>
                </div>
            </div>
        </footer>
    );
}
