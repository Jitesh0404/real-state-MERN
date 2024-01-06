import { useSelector } from "react-redux"
export default function Profile() {
  const {currentUser} = useSelector(state=>state.user);
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <img className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" src={currentUser.avatar} alt="profile image" />
        <input className="p-3 rounded-lg border" type="text" placeholder="username" id="username"/>
        <input className="p-3 rounded-lg border" type="email" placeholder="email" id="email"/>
        <input className="p-3 rounded-lg border" type="password" placeholder="password" id="password"/>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80">update</button>

        <div className="flex justify-between mt-2 font-semibold">
          <span className="text-red-700 cursor-pointer">Delete account</span>
          <span className="text-red-700 cursor-pointer">Sign out</span>
        </div>
      </form>
    </div>
  )
}
