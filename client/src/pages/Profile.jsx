import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  setError,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
export default function Profile() {
  const { currentUser, loading,error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateStatus,setUpdateStatus] = useState(false);
  const dispatch = useDispatch();
  console.log("Form data ", formData);
  useEffect(() => {
    if (file) handleFileUpload(file);
    dispatch(setError(null))
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload status : ", progress);
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `http://localhost:3001/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateStatus(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDelete = async()=>{
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:3001/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
        credentials:'include'
      });
      const data = await res.json();
      if(data.success ===false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }
  const handleSignOut = async() =>{
    try {
      dispatch(signOutUserStart())
      const res = await fetch('http://localhost:3001/api/auth/signout',{
        credentials:'include'
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutUserFailure(data.message))
        return;
      }
      dispatch(signOutUserSuccess(data))

    } catch (error) {
      console.log("Can't signOut the user !!");
    }
  }
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
          ref={fileRef}
          hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={formData?.avatar || currentUser.avatar}
          alt="profile_image"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error In Image Upload</span>
          ) : (
            file &&
            (filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">
                {`Uploading... ${filePerc}%`}{" "}
              </span>
            ) : (
              filePerc === 100 && (
                <span className="text-green-700">
                  Image Uploaded Successfully.
                </span>
              )
            ))
          )}
        </p>
        <input
          className="p-3 rounded-lg border"
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          className="p-3 rounded-lg border"
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          className="p-3 rounded-lg border"
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <button type="submit"
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link className="bg-green-700 p-3 text-white rounded-lg uppercase text-center hover:opacity-90" to={'/create-listing'}>Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-2 font-semibold">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      <p className="text-green-700">{updateStatus ? 'User Updated Successfully !!' : ''}</p>
    </div>
  );
}
