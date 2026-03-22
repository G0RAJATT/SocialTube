import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../features/userFeatures/userThunks.js";
import { useNavigate } from "react-router-dom";

function RegisterUserForm() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [thumbPreview, setThumbPreview] = useState()
  const [AvatarPreview, setAvatarPreview] = useState()
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error)
  const user = useSelector((state) => state.user.user)

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {

      setAvatar("")
      setFullName("")
      setEmail("")
      setPassword("")
      setThumbnail(null)
      setUserName("")
      setAvatarPreview(null)
      setThumbPreview(null)
      setShowPassword(false)
    }
  }, [user]);


  useEffect(() => {
    return () => {
      if (thumbPreview) URL.revokeObjectURL(thumbPreview);
      if (AvatarPreview) URL.revokeObjectURL(AvatarPreview);
    };
  }, [thumbPreview, AvatarPreview]);


  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  const handelClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("username", username.toLowerCase());
    formData.append("password", password);
    formData.append("coverImage", thumbnail);
    formData.append("avatar", avatar);

   const result = await dispatch(RegisterUser(formData))

   if(result.meta.requestStatus === "fulfilled"){
    navigate("/login");
   }
  };


  const handelThumbnail = (e) => {

    setThumbnail(e.target.files[0])
    const file = e.target.files[0]

    if (!file) return

    if (thumbPreview) URL.revokeObjectURL(thumbPreview);

    const imgPreview = URL.createObjectURL(file)
    setThumbPreview(imgPreview)
  }

  const handelAvatar = (e) => {

    setAvatar(e.target.files[0])
    const file = e.target.files[0]

    if (!file) return

    if (AvatarPreview) URL.revokeObjectURL(AvatarPreview);

    const imgPreview = URL.createObjectURL(file)
    setAvatarPreview(imgPreview)
  }


  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <form className="w-full max-w-5xl bg-zinc-950 border border-zinc-800 p-10 rounded-2xl space-y-6">

          <h2 className="text-3xl font-semibold text-white">
            Create Account
          </h2>

          {/* Grid layout for wide form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-zinc-900 text-white border border-zinc-800 px-4 py-3 rounded-lg outline-none focus:border-zinc-500"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 text-white border border-zinc-800 px-4 py-3 rounded-lg outline-none focus:border-zinc-500"
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-zinc-900 text-white border border-zinc-800 px-4 py-3 rounded-lg outline-none focus:border-zinc-500"
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
                {showPassword ? "😎" : "😅"}
              </span>
            </div>

          </div>

          {/* File Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Thumbnail</label>
              <img src={thumbPreview} className={` max-w-30 max-h-30 ${thumbPreview ? "flex" : "hidden"}   `} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handelThumbnail(e)}
                className="w-full text-sm text-zinc-400 
                  file:bg-zinc-800 file:border file:border-zinc-700 
                  file:px-4 file:py-2 file:rounded-lg 
                  file:text-white hover:file:bg-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Avatar</label>
              <img src={AvatarPreview} className={` max-w-30 max-h-30 ${thumbPreview ? "flex" : "hidden"}   `} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handelAvatar(e)}
                className="w-full text-sm text-zinc-400 
                  file:bg-zinc-800 file:border file:border-zinc-700 
                  file:px-4 file:py-2 file:rounded-lg 
                  file:text-white hover:file:bg-zinc-700"
              />
            </div>

          </div>

          <button
            type="submit"
            onClick={(e) => handelClick(e)}
            className="w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-zinc-200 transition"
          >
            Register
          </button>

        </form>
      </div>
    </>
  );
}

export default RegisterUserForm;
