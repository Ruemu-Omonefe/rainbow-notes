import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { stringToColor } from '../shared/utils/colorGenerator.util';
import { AppDispatch, RootState } from '../store';
import { logout } from '../store/authSlice';
import useIsDesktop from '../shared/utils/isDesktop.util';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type ProfileProps = {
    onClose?: () => void;
};


export default function Profile({onClose}: ProfileProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const initial = user?.username.charAt(0).toUpperCase();
    const bgColor = stringToColor(user?.username || "U");
    const isLargeScreen = useIsDesktop();

    function logOut() {
        dispatch(logout());
        navigate("/login", { replace: true , state: { message: "You have successfully logged out."} });
    }
    
    return (
        <div className="md:absolute md:right-0 md:top-0 md:w-2/6 bg-white shadow-lg z-60 text-sm text-gray-800 flex flex-col justify-between h-screen">
            <div className='p-3'>
                <div className="flex justify-between ">
                    {onClose && (<CloseIcon onClick={onClose} className="cursor-pointer" />)}
                    {!isLargeScreen && <ArrowBackIcon className="font-semibold text-lg" onClick={() => navigate(-1)} />}
                    <p className="text-red-500 font-semibold cursor-pointer" onClick={logOut}>Sign Out</p>
                </div>
                <div className={`rounded-full text-white w-10 h-10 flex justify-center items-center mx-auto mt-5 ${bgColor}`}>
                    <p className="text-2xl leading-0 font-medium">{initial}</p>
                </div>
                <p className="mt-2.5 font-semibold text-lg text-center mb-5">{user?.username}</p>
                <div className="flex justify-between items-center">
                    <div className="font-medium mt-3.5">
                        <p className=""><span>Email: </span>{user?.email}</p>
                        <p><span>User ID: </span><span className="">{user?.id}</span></p>
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
