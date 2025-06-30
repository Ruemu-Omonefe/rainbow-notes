import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { useNavigate } from 'react-router-dom';

type ProfileProps = {
    onClose: () => void;
};


export default function Profile({onClose}: ProfileProps) {
    const navigate = useNavigate();
    
    function logOut() {
        localStorage.clear();
        navigate("/login", { replace: true , state: { message: "You have successfully logged out."} });
    }
    
    return (
        <div className="absolute right-0 top-0 w-2/6 bg-white shadow-lg z-60 text-sm text-gray-800 flex flex-col justify-between h-screen">
            <div className='p-3'>
                <div className="flex justify-between ">
                    <CloseIcon onClick={onClose} className='cursor-pointer'/>
                    <p className="text-red-500 font-semibold cursor-pointer" onClick={logOut}>Sign Out</p>
                </div>
                <div className="rounded-full text-white bg-amber-900 w-10 h-10 flex justify-center items-center mx-auto mt-5">
                    <p className="text-2xl leading-0 font-medium">M</p>
                </div>
                <p className="mt-2.5 font-semibold text-lg text-center mb-5">Marvin Storm</p>
                <div className="flex justify-between items-center">
                    <div className="font-medium mt-3.5">
                        <p className="">marvinstorm@gmail.com</p>
                        <p><span>User ID:</span><span className="">23232</span></p>
                    </div>
                    <MoreHorizIcon/>
                </div>
            </div>
            <div className="bg-gray-100 bg-opacity-50 align-bottom px-3 py-7" >
               <div className="mb-10">
                    <p className=" font-bold mb-5">Help</p>
                    <div className="mb-3">
                        <EmailOutlinedIcon/> <span className="font-medium">Feedback</span>
                    </div>
                    <div className="mb-3">
                        <QuizOutlinedIcon/> <span className="font-medium">FAQ</span>
                    </div>
               </div>
               <div className="mb-5">
                    <p className=" font-bold mb-5">Contact us</p>
                    <div className="mb-3">
                        <ChatOutlinedIcon/> <span className="font-medium">Chat with us</span>
                    </div>
                    <div className="mb-3">
                        <PhoneOutlinedIcon/> <span className="font-medium">Call us</span>
                    </div>
               </div>
            </div>
        </div>
    )
}
