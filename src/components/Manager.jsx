import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");

    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast.success("Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray], { ...form, id: uuidv4() })
      );
      setform({ site: "", username: "", password: "" });
    } else {
      alert("Error: Password length must be > 3 ");
    }
  };

  const deletePassword = (id) => {
    let c = confirm("Do You really want to delete this Password");
    if (c) {
      setpasswordArray(passwordArray.filter(item=> item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter(item=> item.id !== id))
      );
      toast("Password deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id ", id);
    setform(passwordArray.filter((i) => i === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition="Bounce"
        />
        {/* Same as */}
        <ToastContainer />
        <div className="absolute inset-0 -z-10 min-h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
      <div className=" p-3 md:mycontainer min-h-[89vh] ">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-center font-semibold text-green-800 text-lg ">
          Your own Password Manager
        </p>

        <div className=" flex items-center  flex-col py-4 text-black gap-5">
          <input
            className=" text-black p-4 py-1 rounded-full border border-green-500 w-full"
            placeholder="Enter Site URL"
            type="text"
            name="site"
            value={form.site}
            id="site"
            onChange={handleChange}
          />
          <div className="flex flex-col md:flex-row justify-between w-full gap-4">
            <input
              className=" text-black p-4 py-1 rounded-full border border-green-500 w-full"
              placeholder="Enter username"
              type="text"
              name="username"
              value={form.username}
              id="username"
              onChange={handleChange}
            />
            <div className="relative">
              <input
                className=" text-black p-4 py-1 rounded-full border border-green-500 w-full"
                placeholder="Enter Password"
                type="password"
                name="password"
                value={form.password}
                ref={passwordRef}
                id="paasword"
                onChange={handleChange}
              />
              <span onClick={showPassword} className="absolute right-2 top-1">
                <img
                  ref={ref}
                  width={26}
                  className="p-1 cursor-pointer"
                  src="icons/eyecross.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            onChange={handleChange}
            className="flex justify-center items-center font-semibold  hover:bg-green-400 rounded-full bg-green-500 w-fit px-4 py-2  "
          >
            <div className="icon flex items-center">
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
                colors="primary:#1e293b"
              ></lord-icon>
            </div>
            Save Password
          </button>
        </div>
        <div className="passwords ">
          <h2 className="font-bold text-2xl p-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 &&
          <div className="max-h-64 overflow-y-auto">
          <table className=" font-semibold table-auto border-collapse  rounded-md  overflow-hidden w-full ">
              <thead className="bg-green-800 text-white ">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border text-center">
                        <div className="flex justify-center items-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordcopy size-7 cursor-pointer"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "4px",
                                paddingLeft: "4px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border text-center">
                        <div className="flex justify-center items-center">
                          {item.username}
                          <div
                            className="lordcopy size-7 cursor-pointer"
                            onClick={() => copyText(item.username)}
                            >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "4px",
                                paddingLeft: "4px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border text-center">
                        <div className="flex justify-center items-center">
                          {item.password}
                          <div
                            className="lordcopy size-7 cursor-pointer"
                            onClick={() => copyText(item.password)}
                            >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "4px",
                                paddingLeft: "4px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border text-center">
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                           <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "4px",
                                paddingLeft: "4px",
                              }}
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                            ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "4px",
                                paddingLeft: "4px",
                              }}
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                            ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Manager;
