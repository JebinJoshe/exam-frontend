import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Photo from '../assests/images/image-removebg-preview.png';
import axios from "axios"
import { useRecoilState } from 'recoil';
import { userDataAtom } from '../stat';

function Login() {
  const navigate = useNavigate(); // Hook for navigation
  const [userName,setUserName] = useState();
  const [password,setPassword] = useState();
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const [userData,setUserData] = useRecoilState(userDataAtom)

//   React.useEffect(()=>{
//     const check = localStorage.getItem("token");
//     if (token){

//     }
//   },[])

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission (default behavior)
    setLoading(true)
    if (userName && password){
        setError("");
        let data ={
            username: userName,
            password: password
        } 
        try {
            const response = await axios.post(
                "https://exam-backend-1.onrender.com/exam/login",
                data,
                { headers: { "Content-Type": "application/json" } }
              );
              if (response?.data?.code === 200){
              localStorage.setItem("token",JSON.stringify(response?.data?.token))
              setUserData(response?.data)
            navigate('/quiz');
              } else{
                setError(error?.response?.data?.message || "Login error!!")
              }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.message || "Login error!!")
            setLoading(false)
        }
       
    } else {
        setError("UserName and Password are reequired!!")
        setLoading(false)
    }
    // Replace '/nextpage' with your desired route
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Left Panel */}
      <div className="w-full md:w-4/12 bg-emerald-400 flex flex-col justify-center items-center text-white p-6 md:p-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-5">Welcome</h2>
          <p className="text-base md:text-lg mb-4 md:mb-8">Let's Code An Amazing Tomorrow</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-8/12 bg-white flex justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Logo */}
          <div className="mb-6 md:mb-8">
            <img
              src={Photo}
              alt="Logo"
              className="max-w-[200px] md:max-w-xs h-auto -mt-20 md:-mt-60"
            />
          </div>

          {/* Login Content */}
          <div className="w-full text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-gray-800">LOG IN</h2>
            
            <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8 px-4">
              Please use your Gmail address as the username and your phone number as the password to log in.
            </p>

            {/* Login Form */}
            <form className="space-y-4 md:space-y-6 w-full px-4 md:px-0" onSubmit={handleLogin}>
              <div>
                <input 
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2 md:py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm md:text-base"
                />
              </div>
              
              <div>
                <input 
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 md:py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm md:text-base"
                />
              </div>

              {loading  ? <button 
                type="submit"
                disabled
                className="w-full bg-emerald-400 opacity-40 cursor-not-allowed text-white rounded-full py-2 md:py-3 font-medium hover:bg-emerald-500 transition-colors text-sm md:text-base"
              >
                LOG IN
              </button> :
               <button 
               type="submit"
               className="w-full bg-emerald-400 text-white rounded-full py-2 md:py-3 font-medium hover:bg-emerald-500 transition-colors text-sm md:text-base"
             >
               LOG IN
             </button>}
             {error &&<p className='text-red-600 text-base'>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
