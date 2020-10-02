import React, { memo, useState, useContext } from "react";
import GlobalState from "./context";
import axios from "axios";
import Link from "next/link";
import cogoToast from "cogo-toast";
import { useRouter } from "next/router";

const Register = memo(() => {
  const route = useRouter();
  const { setUser } = useContext(GlobalState);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    role: "PLAYER",
    postion: "GK",
    natoinality: "",
    passpoerNumber: "",
    birthday: "",
    age: "",
  });

  const register = async (e) => {
    e.preventDefault();
    let loader;
    try {
      if (form.password !== form.confirmPassword) {
        cogoToast.error("Password does not match");
        return;
      }
      loader = cogoToast.loading("Creating an account", { hideAfter: 0 });
      await axios.post("/api/user/createUser", {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: form.role,
        postion: form.postion,
        natoinality: form.natoinality,
        passpoerNumber: form.passpoerNumber,
        birthday: form.birthday,
        age: form.age,
      });
      route.reload();
    } catch (error) {
      loader.hide();
      cogoToast.error("Error");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          {/* <img className='mx-auto h-12 w-auto' src='/img/logos/workflow-mark-on-white.svg' alt='Workflow' /> */}
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-600">
            Or
            <Link href="/login">
              <a
                className="font-medium text-indigo-600 hover:text-indigo-500 
              focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Login
              </a>
            </Link>
          </p>
        </div>
        <form className="mt-8" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                aria-label="Email address"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Name"
              />
            </div>
            <div className="-mt-px">
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                aria-label="Email address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Email address"
              />
            </div>
            <div className="-mt-px">
              <input
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                aria-label="Password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Password"
              />
              <div className="-mt-px">
                <input
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  aria-label="Password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="-mt-px">
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  aria-label="Phone"
                  name="phone"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Phone Number"
                />
              </div>
            </div>
            <div className="-mt-px">
              <select
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              >
                <option value="PLAYER">PLAYER</option>
                <option value="OWNER">OWNER</option>
              </select>
            </div>
            {form.role === "PLAYER" && (
              <div className="-mt-px">
                <select
                  onChange={(e) =>
                    setForm({ ...form, postion: e.target.value })
                  }
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                >
                  <option value="GK">Goalkeeper</option>
                  <option value="FB">Full-backs</option>
                  <option value="MD">Midfield</option>
                  <option value="ATT">Attacker</option>
                </select>
              </div>
            )}

            <div className="-mt-px">
              <input
                value={form.natoinality}
                onChange={(e) =>
                  setForm({ ...form, natoinality: e.target.value })
                }
                aria-label="Natoinality"
                name="Natoinality"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Nationlity"
              />
            </div>
          </div>
          <div className="-mt-px">
            <input
              value={form.passpoerNumber}
              onChange={(e) =>
                setForm({ ...form, passpoerNumber: e.target.value })
              }
              aria-label="PasspoerNumber"
              name="PasspoerNumber"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="PasspoerNumber"
            />
          </div>
          <div className="-mt-px">
            <input
              value={form.birthday}
              onChange={(e) => setForm({ ...form, birthday: e.target.value })}
              aria-label="Birthday"
              name="Birthday"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Birthday"
            />
          </div>

          <div className="-mt-px">
            <input
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              aria-label="Age"
              name="Age"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Age"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border 
              border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              onClick={register}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default Register;
