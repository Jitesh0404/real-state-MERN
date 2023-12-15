import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="p-3 max-w-lg m-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-80">SING UP</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to='sing-in'>
        <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
