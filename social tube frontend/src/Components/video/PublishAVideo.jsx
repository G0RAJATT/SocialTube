import { useState  , useEffect} from "react";
import { useDispatch , useSelector } from "react-redux";
import { publishVideo } from "../../features/videoFeatures/videoThunks";

export default function PublishAVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isPublished, setIsPublished] = useState(false);

  const dispatch = useDispatch();

  const videoObj = useSelector((state) => state.video.videoObj);
  const error = useSelector((state) => state.video.error);


     useEffect(() => {

      if(error) console.log("Error\n" , error);
      
     } ,[error])

     useEffect(() => {
      if(videoObj) {  

        setDescription("");
        setTitle("");
        setVideo(null);
        setThumbnail(null);
        setThumbnailPreview(null);
        setVideoPreview(null);
        setIsPublished(false);

      
        

      } }, [videoObj] )

      // useEffect(() => {
       
      //     if(videoPreview) URL.revokeObjectURL(videoPreview);
      //     if(thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
        
      // }, [videoPreview, thumbnailPreview])


    const handelPublishVideo = async (e) => {
        e.preventDefault();
        // Handle video publishing logic here
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("video", video);
        formData.append("thumbnail", thumbnail);
        formData.append("isPublished", isPublished);
      
        dispatch(publishVideo(formData));
    } 

    const handelVideoUpload = (e) => {
        setVideo(e.target.files[0]);
        const file = e.target.files[0];
        if (!file) return;

        if(videoPreview) URL.revokeObjectURL(videoPreview)

        const videoPreviewUrl = URL.createObjectURL(file);
        setVideoPreview(videoPreviewUrl);
    }

    const handelThumbnailUpload = (e) => {
        setThumbnail(e.target.files[0]);
        const file = e.target.files[0];
        if (!file) return;

        if(thumbnailPreview) URL.revokeObjectURL(thumbnailPreview)

        const thumbnailPreviewUrl = URL.createObjectURL(file);
        setThumbnailPreview(thumbnailPreviewUrl);
    }


  return (
    <div className="w-full min-h-screen bg-black text-zinc-200 p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Publish Status */}
        <div className="flex justify-end">
          <span
            className="cursor-pointer px-4 py-2 rounded-full text-sm border border-white text-white"
          >
            {isPublished ? "Published" : "Unpublished"}
          </span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <label className="text-lg font-medium">Title</label>
          <p className="text-sm text-zinc-500">
            A clear and descriptive title helps people understand your video.
          </p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#111111] border border-[#1f1f1f] px-5 py-3 rounded-lg outline-none focus:border-zinc-500"
          />
        </div>

        {/* Thumbnail */}
        <div className="space-y-3">
          <label className="text-lg font-medium">Thumbnail</label>
          <p className="text-sm text-zinc-500">
            Select or upload a picture that shows what's in your video.
          </p>

          <div className="flex flex-col gap-4">
            <div className="w-full h-132 bg-[#111111] border border-[#1f1f1f] rounded-lg flex items-center justify-center overflow-hidden">
              {thumbnailPreview ? (
                <img src={thumbnailPreview} className="w-full h-full object-contain" />
              ) : (
                <span className="text-zinc-600">Thumbnail Preview</span>
              )}
            </div>

            <div className="flex justify-end">
              <input
                type="file"
                accept="image/*"
                className="text-sm text-zinc-400"
                onChange={(e) =>
                  handelThumbnailUpload(e)
                }
              />
            </div>
          </div>
        </div>

        {/* Video */}
        <div className="space-y-3">
          <label className="text-lg font-medium">Video File</label>
          <p className="text-sm text-zinc-500">
            Upload your video file to publish on SocialTube.
          </p>

          <div className="flex flex-col gap-4">
            <div className="w-full h-132 bg-[#111111] border border-[#1f1f1f] rounded-lg flex items-center justify-center overflow-hidden">
              {videoPreview ? (
                <video
                  src={videoPreview}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-zinc-600">Video Preview</span>
              )}
            </div>

            <div className="flex justify-end">
              <input
                type="file"
                accept="video/*"
                className="text-sm text-zinc-400"
                onChange={(e) => handelVideoUpload(e) }
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-lg font-medium">Description</label>
          <p className="text-sm text-zinc-500">
            Tell viewers about your video.
          </p>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#111111] border border-[#1f1f1f] px-5 py-3 rounded-lg outline-none focus:border-zinc-500 resize-none"
          />
        </div>

        {/* Publish Button */}
        <button
        onClick={(e) => handelPublishVideo(e)}
         className="w-full bg-zinc-200 text-black font-medium py-3 rounded-lg hover:bg-white transition">
          Publish Video
        </button>

      </div>
    </div>
  );
}
