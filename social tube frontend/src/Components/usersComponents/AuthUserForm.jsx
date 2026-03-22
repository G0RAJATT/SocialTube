import { useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { LoginUser } from "../../features/userFeatures/userThunks";
import { NavLink, useNavigate } from "react-router-dom";

function AuthUserForm() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {

    if(user){
      setEmail("")
      setPassword("")
      setUsername("")
      setShowPassword(false)

      console.log("---User loged in--- \n" , user);
      
    }
  } , [user])

    useEffect(() => {
      if (error) console.log("--Error--\n",error);
    }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: username.toLowerCase(),
      email,
      password
    };

   const result = await dispatch(LoginUser(formData));

   if(result.meta.requestStatus === "fulfilled"){
    navigate("/");
   }

    // you will write auth logic
  };




  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <form className="w-full max-w-5xl bg-[#0a0a0a] border border-[#1f1f1f] p-10 rounded-2xl space-y-8">

          <h2 className="text-3xl font-semibold text-zinc-200">
            Sign In
          </h2>

          {/* Wide grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#111111] text-zinc-200 border border-[#1f1f1f] px-4 py-3 rounded-lg outline-none focus:border-zinc-500 placeholder:text-zinc-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#111111] text-zinc-200 border border-[#1f1f1f] px-4 py-3 rounded-lg outline-none focus:border-zinc-500 placeholder:text-zinc-500"
            />

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111111] text-zinc-200 border border-[#1f1f1f] px-4 py-3 pr-12 rounded-lg outline-none focus:border-zinc-500 placeholder:text-zinc-500"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-2xl right-4 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer hover:text-zinc-300"
              >
                {showPassword ? "😅" : "😎"}
              </span>
            </div>


          </div>

          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-zinc-200 transition"
          >
            Login
          </button>

          <p className="text-sm text-zinc-500 text-center">
            Don’t have an account? <NavLink to="/register"> <span className="text-zinc-300 hover:underline cursor-pointer">Register</span></NavLink>
          </p>
 
        </form>
      </div>
    </>
  );
}

export default AuthUserForm;
