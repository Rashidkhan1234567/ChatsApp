import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Logout() {
const navigate = useNavigate()

    const logout = ()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('access');
                localStorage.removeItem('email');
                navigate('/login');
            }
        })
    }

  return (
    <button
      type="button"
      title="Logout"
      className="ms-3 text-4xl p-1 hover:bg-indigo-200 rounded-full active:bg-slate-400"
      onClick={logout}
    >
      <AiOutlineLogout />
    </button>
  );
}

export default Logout;
