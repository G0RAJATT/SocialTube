import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeUserPassword } from "../../features/userFeatures/userThunks";


function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const user = useSelector((state) => state.user.user);
  const auth = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {

    if (auth) {


      setOldPassword("");
      setNewPassword("");
      setShowOldPassword(false);
      setShowNewPassword(false);

    }
  }, [auth])

  useEffect(() => {

    if (error) console.log("--Error--\n", error);
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      oldPassword,
      newPassword
    };

    dispatch(ChangeUserPassword(formData))

    // you will write change password logic  -- like sending or showing password updated successfully and route user to login page.
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-[#0b0b0b] border border-[#1f1f1f] p-10 rounded-2xl space-y-8"
      >
        <h2 className="text-3xl font-semibold text-zinc-100">
          Change Password
        </h2>

        {/* Old Password */}
        <div className="relative w-full">
          <input
            type={showOldPassword ? "text" : "password"}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full bg-[#111111] text-zinc-200 border border-[#1f1f1f] px-4 py-3 pr-12 rounded-lg outline-none focus:border-zinc-500 placeholder:text-zinc-500"
          />
          <span
            onClick={() => setShowOldPassword(!showOldPassword)}
            className="absolute text-2xl right-4 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer"
          >
            {showOldPassword ? "😎" : "😅"}
          </span>
        </div>

        {/* New Password */}
        <div className="relative w-full">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-[#111111] text-zinc-200 border border-[#1f1f1f] px-4 py-3 pr-12 rounded-lg outline-none focus:border-zinc-500 placeholder:text-zinc-500"
          />
          <span
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute text-2xl right-4 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer"
          >
            {showNewPassword ? "😎" : "😅"}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-zinc-200 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
