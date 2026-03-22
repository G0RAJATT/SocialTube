import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount, updateAvatar, updateCoverImage } from "../../features/userFeatures/userThunks";
function ChannelCustomization() {
    const [coverImage, setCoverImage] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [coverImagePreview, setCoverImagePreview] = useState();
    const [avatarPreview, setAvatarPreview] = useState();

    const user = useSelector((state) => state.user.user)
    const error = useSelector((state) => state.user.error)
    const lastAction = useSelector((state) => state.user.lastAction)

    const dispatch = useDispatch();

     useEffect(() => {
            if (lastAction) {
            setAvatar(null)
            setEmail("")
            setFullName("")
            setCoverImage(null)
           setCoverImagePreview(null)
            setAvatarPreview(null)
            }
         
        }, [lastAction])



    useEffect(() => {
        if (error) console.log("Error\n", error);
    }, [error])



    const handelCoverImage = (e) => {
        setCoverImage(e.target.files[0]);
        const file = e.target.files[0];
        if (!file) return;

        if (coverImagePreview) URL.revokeObjectURL(coverImagePreview)

        const imgPreview = URL.createObjectURL(file);
        setCoverImagePreview(imgPreview);
    }
    const handelAvatarImage = (e) => {
        setAvatar(e.target.files[0]);
        const file = e.target.files[0];
        if (!file) return;

        if (avatarPreview) URL.revokeObjectURL(avatarPreview)

        const imgPreview = URL.createObjectURL(file);
        setAvatarPreview(imgPreview);
    }

    const handleCoverSubmit = (e) => {
        e.preventDefault();

        // Handle cover image submission logic here
        const formData = new FormData();
        formData.append("coverImage", coverImage);

        dispatch(updateCoverImage(formData));
     

    };

    const handleAvatarSubmit = (e) => {
        e.preventDefault();

        // Handle avatar submission logic here
        const formData = new FormData();
        formData.append("avatar", avatar);

        dispatch(updateAvatar(formData));
     

    };

     // Handle channel details submission logic here

    const handleDetailsSubmit = (e) => {
        e.preventDefault();
        const formData = { fullName , email };
        dispatch(updateAccount(formData))
       
        
    }

     useEffect(() => {
    return () => {
      if (coverImagePreview) URL.revokeObjectURL(coverImagePreview);
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview, coverImagePreview]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
            <form className="w-full max-w-6xl bg-[#0b0b0b] border border-[#1f1f1f] p-10 rounded-2xl space-y-12">

                <h2 className="text-3xl font-semibold text-zinc-100">
                    Channel Customization
                </h2>

                {/* Cover Image Section */}
                <div className="space-y-3">
                    <label className="text-zinc-200 text-lg">Cover Image</label>
                    <p className="text-sm text-zinc-500">
                        This image will appear across the top of your channel.
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="w-64 h-32 bg-[#111111] border border-[#1f1f1f] rounded-lg flex items-center justify-center text-zinc-600">
                            {coverImagePreview ? <img src={coverImagePreview} className={` ${coverImagePreview ? "flex max-w-full max-h-full" : "hidden"}`} /> : "Cover Preview"}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handelCoverImage(e)}
                            className="text-sm text-zinc-400 
                file:bg-zinc-800 file:border file:border-zinc-700 
                file:px-4 file:py-2 file:rounded-lg 
                file:text-white hover:file:bg-zinc-700"
                        />

                        <button
                            onClick={handleCoverSubmit}
                            className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-zinc-200 transition"
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* Avatar Section */}
                <div className="space-y-3">
                    <label className="text-zinc-200 text-lg">Avatar</label>
                    <p className="text-sm text-zinc-500">
                        Your profile picture will appear where your channel is presented on
                        SocialTube, such as next to your videos and comments.
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="w-28 h-28 bg-[#111111] border border-[#1f1f1f] rounded-full flex items-center justify-center text-zinc-600">
                            {avatarPreview ? <img src={avatarPreview} className={` ${avatarPreview ? "flex object-cover rounded-full border border-[#1f1f1f] w-full h-full" : "hidden"}`} /> : "Avatar"}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handelAvatarImage(e)}
                            className="text-sm text-zinc-400 
                file:bg-zinc-800 file:border file:border-zinc-700 
                file:px-4 file:py-2 file:rounded-lg 
                file:text-white hover:file:bg-zinc-700"
                        />

                        <button
                            onClick={handleAvatarSubmit}
                            className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-zinc-200 transition"
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* Channel Details Section */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-zinc-200">Channel Name</label>
                            <p className="text-sm text-zinc-500 min-h-[3.2rem]">
                                Choose a channel name that represents you and your content.
                                Changes made to your name and picture are only visible on
                                SocialTube and not on other Google services. {"("}If not want to change enter same one{")"}
                            </p>
                            <input
                                type="text"
                                placeholder="Channel name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-[#111111] text-zinc-200 border border-[#1f1f1f] px-4 py-3 rounded-lg outline-none focus:border-zinc-500 placeholder:text-zinc-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-zinc-200">Email</label>
                            <p className="text-sm text-zinc-500 min-h-[3.7rem]">
                                Used for account-related updates and notifications.<br></br>{"("}If not want to change enter same one{")"}
                            </p>
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#111111] text-zinc-200 border border-[#1f1f1f] px-4 py-3 rounded-lg outline-none focus:border-zinc-500 placeholder:text-zinc-500"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleDetailsSubmit}
                        className="bg-white text-black px-8 py-3 rounded-xl font-medium hover:bg-zinc-200 transition"
                    >
                        Save Changes
                    </button>
                </div>

            </form>
        </div>
    );
}

export default ChannelCustomization;
