import React, { memo, useState, useContext } from "react";
import GlobalState from "./context";
import axios from "axios";
import Link from "next/link";
import cogoToast from "cogo-toast";
import { useRouter } from "next/router";

const CreateCompetition = memo(() => {
  const route = useRouter();
  const { setUser } = useContext(GlobalState);
  const [form, setForm] = useState({
    name: "",
    from: "",
    to: "",
    time: "",
    decription: "",
    prize: "",
    orgnizerName: "",
    centerName: "",
    location: "",
    firstPlacePrize: "",
    secondPlacePrize: "",
    thirdPlacePrize: "",
    bestplayeraward: "",
    bestKBaward: "",
    soceraward: "",
    costCompetition: "",
    passportNumber: "",
  });

  const createCompetition = async (e) => {
    e.preventDefault();
    let loader;
    try {
      if (form.password !== form.confirmPassword) {
        cogoToast.error("Password does not match");
        return;
      }
      loader = cogoToast.loading("Creating Competition", { hideAfter: 0 });
      await axios.post("/api/user/createCompetition", {
        name: form.name,
        from: form.from,
        to: form.to,
        time: form.time,
        decription: form.decription,
        prize: form.prize,
        orgnizerName: form.orgnizerName,
        phoneNUmner: form.phoneNUmner,
        centerName: form.centerName,
        location: form.location,
        firstPlacePrize: form.firstPlacePrize,
        secondPlacePrize: form.secondPlacePrize,
        thirdPlacePrize: form.thirdPlacePrize,
        bestplayeraward: form.bestKBaward,
        bestKBaward: form.bestKBaward,
        soceraward: form.soceraward,
        costCompetition: form.costCompetition,
        passportNumber: form.passportNumber,
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
            Create Competion Page
          </h2>
        </div>
        <form className="mt-8" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                aria-label="Name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Name"
              />
            </div>
            <div className="-mt-px">
              <input
                value={form.from}
                onChange={(e) => setForm({ ...form, from: e.target.value })}
                aria-label="From "
                name="from "
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3
                 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none
                  focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="From"
              />
            </div>
            <div className="-mt-px">
              <input
                value={form.to}
                onChange={(e) => setForm({ ...form, to: e.target.value })}
                aria-label="to "
                name="to "
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="to "
              />
              <div className="-mt-px">
                <input
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  aria-label="Time"
                  name="time"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="time"
                />
              </div>
              <div className="-mt-px">
                <input
                  value={form.decription}
                  onChange={(e) =>
                    setForm({ ...form, decription: e.target.value })
                  }
                  aria-label="decription"
                  name="decription"
                  type="decription"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="-mt-px">
              <input
                value={form.prize}
                onChange={(e) => setForm({ ...form, prize: e.target.value })}
                aria-label="prize "
                name="prize"
                type="text"
                required
                className="appearance-none 
                rounded-none relative block
                 w-full px-3 py-2 border
                  border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Prize"
              />
            </div>
          </div>
          <div className="-mt-px">
            <input
              value={form.orgnizerName}
              onChange={(e) =>
                setForm({ ...form, orgnizerName: e.target.value })
              }
              aria-label="orgnizerName"
              name="orgnizerName"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="orgnizerName"
            />
          </div>
          <div className="-mt-px">
            <input
              value={form.phoneNUmner}
              onChange={(e) =>
                setForm({ ...form, phoneNUmner: e.target.value })
              }
              aria-label="phoneNUmner"
              name="phoneNUmner"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Phone NUmner"
            />
          </div>

          <div className="-mt-px">
            <input
              value={form.centerName}
              onChange={(e) => setForm({ ...form, centerName: e.target.value })}
              aria-label="centerName"
              name="CenterName"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Center Name"
            />
          </div>
          <div className="-mt-px">
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              aria-label="location"
              name="location"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="location"
            />
          </div>
          <div className="-mt-px">
            <input
              value={form.firstPlacePrize}
              onChange={(e) =>
                setForm({ ...form, firstPlacePrize: e.target.value })
              }
              aria-label="firstPlacePrize"
              name="firstPlacePrize"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="First Place Prize"
            />
          </div>

          <div className="-mt-px">
            <input
              value={form.secondPlacePrize}
              onChange={(e) =>
                setForm({ ...form, secondPlacePrize: e.target.value })
              }
              aria-label="secondPlacePrize"
              name="secondPlacePrize"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Second Place Prize"
            />
          </div>
          <div className="-mt-px">
            <input
              value={form.thirdPlacePrize}
              onChange={(e) =>
                setForm({ ...form, thirdPlacePrize: e.target.value })
              }
              aria-label="third"
              name="thirdPlacePrize"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Third Place Prize"
            />
          </div>
          <div className="-mt-px">
            <input
              value={form.bestplayeraward}
              onChange={(e) =>
                setForm({ ...form, bestplayeraward: e.target.value })
              }
              aria-label="Best Player "
              name="bestplayeraward"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Best playeraward"
            />
          </div>
          <div className="-mt-px">
            <input
              value={form.bestKBaward}
              onChange={(e) =>
                setForm({ ...form, bestKBaward: e.target.value })
              }
              aria-label="Best Goal keepr "
              name="bestKBaward"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Best goal Keeper"
            />
          </div>
          <div className="-mt-px">
            <input
              value={form.soceraward}
              onChange={(e) => setForm({ ...form, soceraward: e.target.value })}
              aria-label="Best Goal keepr "
              name="soceraward"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Best goal Keeper"
            />
          </div>
          <div className="-mt-px">
            <input
              value={form.costCompetition}
              onChange={(e) =>
                setForm({ ...form, costCompetition: e.target.value })
              }
              aria-label="Cost  "
              name="costCompetition"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Competition cost "
            />
          </div>

          <div className="-mt-px">
            <input
              value={form.passportNumber}
              onChange={(e) =>
                setForm({ ...form, passportNumber: e.target.value })
              }
              aria-label="Cost  "
              name="Passport Number"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Passport Number "
            />
          </div>

          <div className="-mt-px">
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              aria-label="location"
              name="location"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="location"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center
               py-2 px-4 border border-transparent text-sm leading-5 
               font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500
                focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo
                 active:bg-indigo-700 transition duration-150 ease-in-out"
              onClick={createCompetition}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 
                    2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              create Competion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default CreateCompetition;
