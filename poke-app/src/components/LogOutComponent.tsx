import { useRouter } from "next/router";

const LogOutComponent = () => {

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }

    return (
        <>
            <div className="flex flex-end">
                <div className="pr-4">
                    <button onClick={handleLogout}
                        className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2" >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default LogOutComponent;