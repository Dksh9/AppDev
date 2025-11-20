import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Login } from "../redux/userSlice";
import { apiRequest } from "../utils";
import CustomButton from "./CustomButton";
import Loading from "./Loading";
import TextInput from "./TextInput";

const SignUp = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isRegister, setIsRegister] = useState(false);
  const [accountType, setAccountType] = useState("seeker");
  const [isLoading, setIsLoading] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  let from = location.state?.from?.pathname || "/";

  const closeModal = () => {}; //setOpen(false);

  const onSubmit = async (data) => {
    let URL = null;
    setIsLoading(true);

    if (isRegister) {
      if (accountType === "seeker") {
        URL = "auth/register";
      } else URL = "companies/register";
    } else {
      if (accountType === "seeker") {
        URL = "auth/login";
      } else {
        URL = "companies/login";
      }
    }

    try {
      const res = await apiRequest({
        url: URL,
        data: data,
        method: "POST",
      });

      if (res?.status === "failed") {
        setErrMsg(res?.message);
      } else {
        if (isRegister) {
          setErrMsg(res?.message);

          setInterval(() => {
            window.location.replace("/");
          }, 5000);
        } else {
          setErrMsg("");
          const newData = { token: res?.token, ...res?.user };

          dispatch(Login(newData));
          localStorage.setItem("userInfo", JSON.stringify(newData));
          window.location.replace(from);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Transition appear show={open || false}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all border border-[#E2E8F0]'>
                  <div className='flex items-center gap-3 mb-6'>
                    <img 
                      src='https://media.edusanjal.com/__sized__/logos/ISMT-Logo-Edusanjal-thumbnail-200x200.png'
                      alt='ISMT Logo'
                      className='w-10 h-10 rounded-full'
                    />
                    <Dialog.Title
                      as='h3'
                      className='text-xl font-semibold leading-6 text-[#1E293B]'
                    >
                      {isRegister ? "Create Account" : "Welcome to ISMT JobPortal"}
                    </Dialog.Title>
                  </div>

                  <div className='w-full flex items-center justify-center py-3 bg-[#F8FAFC] rounded-lg mb-6 border border-[#E2E8F0]'>
                    <button
                      className={`flex-1 px-4 py-3 rounded text-sm outline-none transition-all duration-200 font-medium ${
                        accountType === "seeker"
                          ? "bg-[#2563EB] text-white shadow-sm"
                          : "bg-transparent text-[#64748B] hover:text-[#1E293B]"
                      }`}
                      onClick={() => setAccountType("seeker")}
                    >
                      Job Seeker
                    </button>
                    <button
                      className={`flex-1 px-4 py-3 rounded text-sm outline-none transition-all duration-200 font-medium ${
                        accountType !== "seeker"
                          ? "bg-[#2563EB] text-white shadow-sm"
                          : "bg-transparent text-[#64748B] hover:text-[#1E293B]"
                      }`}
                      onClick={() => setAccountType("company")}
                    >
                      Employer
                    </button>
                  </div>

                  <form
                    className='w-full flex flex-col gap-4'
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <TextInput
                      name='email'
                      label='Email Address'
                      placeholder='email@example.com'
                      type='email'
                      register={register("email", {
                        required: "Email Address is required!",
                      })}
                      error={errors.email ? errors.email.message : ""}
                    />

                    {isRegister && (
                      <div className='w-full flex gap-3'>
                        <div
                          className={`${
                            accountType === "seeker" ? "w-1/2" : "w-full"
                          }`}
                        >
                          <TextInput
                            name={
                              accountType === "seeker" ? "firstName" : "name"
                            }
                            label={
                              accountType === "seeker"
                                ? "First Name"
                                : "Company Name"
                            }
                            placeholder={
                              accountType === "seeker"
                                ? "eg. James"
                                : "Company name"
                            }
                            type='text'
                            register={register(
                              accountType === "seeker" ? "firstName" : "name",
                              {
                                required:
                                  accountType === "seeker"
                                    ? "First Name is required"
                                    : "Company Name is required",
                              }
                            )}
                            error={
                              accountType === "seeker"
                                ? errors.firstName
                                  ? errors.firstName?.message
                                  : ""
                                : errors.name
                                ? errors.name?.message
                                : ""
                            }
                          />
                        </div>

                        {accountType === "seeker" && isRegister && (
                          <div className='w-1/2'>
                            <TextInput
                              name='lastName'
                              label='Last Name'
                              placeholder='Wagonner'
                              type='text'
                              register={register("lastName", {
                                required: "Last Name is required",
                              })}
                              error={
                                errors.lastName ? errors.lastName?.message : ""
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div className='w-full flex gap-3'>
                      <div className={`${isRegister ? "w-1/2" : "w-full"}`}>
                        <TextInput
                          name='password'
                          label='Password'
                          placeholder='Password'
                          type='password'
                          register={register("password", {
                            required: "Password is required!",
                          })}
                          error={
                            errors.password ? errors.password?.message : ""
                          }
                        />
                      </div>

                      {isRegister && (
                        <div className='w-1/2'>
                          <TextInput
                            label='Confirm Password'
                            placeholder='Confirm Password'
                            type='password'
                            register={register("cPassword", {
                              validate: (value) => {
                                const { password } = getValues();

                                if (password != value) {
                                  return "Passwords do no match";
                                }
                              },
                            })}
                            error={
                              errors.cPassword &&
                              errors.cPassword.type === "validate"
                                ? errors.cPassword?.message
                                : ""
                            }
                          />
                        </div>
                      )}
                    </div>

                    {errMsg && (
                      <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                        <span className='text-sm text-red-600'>
                          {errMsg}
                        </span>
                      </div>
                    )}

                    <div className='mt-2'>
                      {isLoading ? (
                        <Loading />
                      ) : (
                        <CustomButton
                          type='submit'
                          containerStyles={`inline-flex justify-center rounded-lg bg-[#2563EB] px-8 py-3 text-sm font-medium text-white outline-none hover:bg-[#1E3A8A] transition-all duration-200 w-full shadow-sm hover:shadow-md`}
                          title={
                            isRegister ? "Create Account" : "Sign In"
                          }
                        />
                      )}
                    </div>
                  </form>

                  <div className='mt-6 pt-4 border-t border-[#E2E8F0]'>
                    <p className='text-sm text-[#64748B] text-center'>
                      {isRegister
                        ? "Already have an account?"
                        : "Don't have an account?"}

                      <span
                        className='text-[#2563EB] ml-2 hover:text-[#1E3A8A] cursor-pointer font-medium transition-colors duration-200'
                        onClick={() => setIsRegister((prev) => !prev)}
                      >
                        {isRegister ? "Sign In" : "Create Account"}
                      </span>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SignUp;