import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Nav() {
  const [toggle, setToggle] = useState(false);
  const [notToggle, setNotToggle] = useState(false);
  const [mobile, setMobile] = useState(false);

  return (
    <nav class="fixed top-0 z-50 w-full bg-[#030712]">
      <div class="py-2 px-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-8">
            <div class="shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2 md:py-2 whitespace-nowrap"
              >
                <img src="/logo-icon.png" className="w-5 h-5" alt="logo" />
                <p className="font-bold text-[17px] hover:text-[#4F2EFF] text-[#FAFAFA] dark:hover:text-blue-500">
                  schoolcn
                </p>
              </Link>
            </div>

            <ul class="hidden lg:flex items-center justify-start gap-6 md:gap-6 sm:justify-center">
              <li class="shrink-0">
                <a
                  href="/dashboard/students"
                  class="flex text-sm font-medium hover:text-[#4F2EFF] dark:text-[#979799] text-gray-400 dark:hover:text-blue-500"
                >
                  students
                </a>
              </li>
              <li class="shrink-0">
                <a
                  href="#"
                  class="text-sm font-medium hover:text-[#4F2EFF] dark:text-[#979799] text-gray-400 dark:hover:text-blue-500"
                >
                  Presents
                </a>
              </li>
              <li class="shrink-0">
                <a
                  href="#"
                  class="flex text-sm font-medium hover:text-[#4F2EFF] dark:text-[#979799] text-gray-400 dark:hover:text-blue-500"
                >
                  Gift Ideas
                </a>
              </li>
            </ul>
          </div>

          <div class="flex items-center lg:space-x-2">
            <div class="flex items-center lg:order-2">
              {/* <!-- Notifications --> */}
              <button
                type="button"
                onClick={() => setNotToggle((prev) => !prev)}
                class="py-2 px-2 mr-1 text-white rounded-lg dark:text-gray-300 hover:scale-110 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span class="sr-only">View notifications</span>
                {/* <!-- Bell icon --> */}
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 14 20"
                >
                  <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                </svg>
              </button>
              {/* <!-- Dropdown menu --> */}
              {notToggle && (
                <div class="z-50 absolute top-14 right-10 my-4 overflow-hidden max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-800 dark:bg-gray-900">
                  <div class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                    Notifications
                  </div>
                  <div>
                    <a
                      href="#"
                      class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                    >
                      <div class="flex-shrink-0">
                        <img
                          class="w-11 h-11 rounded-full"
                          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                          alt="Bonnie Green avatar"
                        />
                        <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-[#4F2EFF] dark:border-gray-700">
                          <svg
                            class="w-2 h-2 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                          >
                            <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                            <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                          </svg>
                        </div>
                      </div>
                      <div class="pl-3 w-full">
                        <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                          New message from
                          <span class="font-semibold text-gray-900 dark:text-white">
                            Bonnie Green
                          </span>
                          All set for the presentation?
                        </div>
                        <div class="text-xs font-medium text-[#4F2EFF] dark:text-blue-400">
                          a few moments ago
                        </div>
                      </div>
                    </a>
                    <a
                      href="#"
                      class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                    >
                      <div class="flex-shrink-0">
                        <img
                          class="w-11 h-11 rounded-full"
                          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                          alt="Jese Leos avatar"
                        />
                        <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white dark:border-gray-700">
                          <svg
                            class="w-2 h-2 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                          </svg>
                        </div>
                      </div>
                      <div class="pl-3 w-full">
                        <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                          <span class="font-semibold text-gray-900 dark:text-white">
                            Jese leos
                          </span>
                          and
                          <span class="font-medium text-gray-900 dark:text-white">
                            5 others
                          </span>
                          started following you.
                        </div>
                        <div class="text-xs font-medium text-[#4F2EFF] dark:text-blue-400">
                          10 minutes ago
                        </div>
                      </div>
                    </a>
                    <a
                      href="#"
                      class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                    >
                      <div class="flex-shrink-0">
                        <img
                          class="w-11 h-11 rounded-full"
                          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                          alt="Joseph McFall avatar"
                        />
                        <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white dark:border-gray-700">
                          <svg
                            class="w-2 h-2 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                          </svg>
                        </div>
                      </div>
                      <div class="pl-3 w-full">
                        <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                          <span class="font-semibold text-gray-900 dark:text-white">
                            Joseph Mcfall
                          </span>
                          and
                          <span class="font-medium text-gray-900 dark:text-white">
                            141 others
                          </span>
                          love your story. See it and view more stories.
                        </div>
                        <div class="text-xs font-medium text-[#4F2EFF] dark:text-blue-400">
                          44 minutes ago
                        </div>
                      </div>
                    </a>
                    <a
                      href="#"
                      class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                    >
                      <div class="flex-shrink-0">
                        <img
                          class="w-11 h-11 rounded-full"
                          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                          alt="Roberta Casas image"
                        />
                        <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white dark:border-gray-700">
                          <svg
                            class="w-2 h-2 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                          </svg>
                        </div>
                      </div>
                      <div class="pl-3 w-full">
                        <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                          <span class="font-semibold text-gray-900 dark:text-white">
                            Leslie Livingston
                          </span>
                          mentioned you in a comment:
                          <span class="font-medium text-[#4F2EFF] dark:text-blue-500">
                            @bonnie.green
                          </span>
                          what do you say?
                        </div>
                        <div class="text-xs font-medium text-[#4F2EFF] dark:text-blue-400">
                          1 hour ago
                        </div>
                      </div>
                    </a>
                    <a
                      href="#"
                      class="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <div class="flex-shrink-0">
                        <img
                          class="w-11 h-11 rounded-full"
                          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png"
                          alt="Robert image"
                        />
                        <div class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white dark:border-gray-700">
                          <svg
                            class="w-2 h-2 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 14"
                          >
                            <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
                          </svg>
                        </div>
                      </div>
                      <div class="pl-3 w-full">
                        <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                          <span class="font-semibold text-gray-900 dark:text-white">
                            Robert Brown
                          </span>
                          posted a new video: Glassmorphism - learn how to
                          implement the new design trend.
                        </div>
                        <div class="text-xs font-medium text-[#4F2EFF] dark:text-blue-400">
                          3 hours ago
                        </div>
                      </div>
                    </a>
                  </div>
                  <a
                    href="#"
                    class="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:underline"
                  >
                    <div class="inline-flex items-center ">
                      <svg
                        aria-hidden="true"
                        class="mr-2 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        <path
                          fill-rule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      View all
                    </div>
                  </a>
                </div>
              )}
              {/* <!-- Apps --> */}
              <a
                href="https://twitter.com/Abdulra01025525"
                target="_blank"
                class="py-2 pr-1 pl-2 text-white rounded-lg hover:scale-125 dark:text-white focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span class="sr-only">View twitter</span>
                {/* <!-- Icon --> */}
                <svg
                  class="h-3 w-3 fill-current"
                  height="23"
                  viewBox="0 0 1200 1227"
                  width="23"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
                </svg>
              </a>
              <button
                type="button"
                class="flex mx-3 text-sm bg-gray-800 hover:scale-100 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={() => setToggle((prev) => !prev)}
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="w-7 h-7 rounded-full"
                  src="/profile.png"
                  alt="user photo"
                />
              </button>
              {/* <!-- Dropdown menu --> */}
              {toggle && (
                <div class="z-50 absolute top-14 right-10 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-900 dark:divide-gray-600">
                  <div class="py-3 px-4">
                    <span class="block text-sm font-semibold text-gray-900 dark:text-white">
                      Neil sims
                    </span>
                    <span class="block text-sm text-gray-500 truncate dark:text-gray-400">
                      name@flowbite.com
                    </span>
                  </div>
                  <ul
                    class="py-1 text-gray-500 dark:text-gray-400"
                    aria-labelledby="dropdown"
                  >
                    <li>
                      <a
                        href="/profile"
                        class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        My profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                      >
                        Account settings
                      </a>
                    </li>
                  </ul>
                  <ul
                    class="py-1 text-gray-500 dark:text-gray-400"
                    aria-labelledby="dropdown"
                  >
                    <li>
                      <a
                        href="#"
                        class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          class="mr-2 w-4 h-4 text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                        </svg>
                        My likes
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          class="mr-2 w-4 h-4 text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="m1.56 6.245 8 3.924a1 1 0 0 0 .88 0l8-3.924a1 1 0 0 0 0-1.8l-8-3.925a1 1 0 0 0-.88 0l-8 3.925a1 1 0 0 0 0 1.8Z" />
                          <path d="M18 8.376a1 1 0 0 0-1 1v.163l-7 3.434-7-3.434v-.163a1 1 0 0 0-2 0v.786a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.786a1 1 0 0 0-1-1Z" />
                          <path d="M17.993 13.191a1 1 0 0 0-1 1v.163l-7 3.435-7-3.435v-.163a1 1 0 1 0-2 0v.787a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.787a1 1 0 0 0-1-1Z" />
                        </svg>
                        Collections
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <span class="flex items-center">
                          <svg
                            class="mr-2 w-4 h-4 text-blue-600 dark:text-blue-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="m7.164 3.805-4.475.38L.327 6.546a1.114 1.114 0 0 0 .63 1.89l3.2.375 3.007-5.006ZM11.092 15.9l.472 3.14a1.114 1.114 0 0 0 1.89.63l2.36-2.362.38-4.475-5.102 3.067Zm8.617-14.283A1.613 1.613 0 0 0 18.383.291c-1.913-.33-5.811-.736-7.556 1.01-1.98 1.98-6.172 9.491-7.477 11.869a1.1 1.1 0 0 0 .193 1.316l.986.985.985.986a1.1 1.1 0 0 0 1.316.193c2.378-1.3 9.889-5.5 11.869-7.477 1.746-1.745 1.34-5.643 1.01-7.556Zm-3.873 6.268a2.63 2.63 0 1 1-3.72-3.72 2.63 2.63 0 0 1 3.72 3.72Z" />
                          </svg>
                          Pro version
                        </span>
                        <svg
                          class="w-2.5 h-2.5 text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                  <ul
                    class="py-1 text-gray-500 dark:text-gray-400"
                    aria-labelledby="dropdown"
                  >
                    <li>
                      <a
                        href="#"
                        class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              )}

              {/* mobile view */}
              <div
                className={`${
                  toggle
                    ? "hidden"
                    : "inline-block cursor-pointer md:hidden py-5 px-1 text-black dark:text-white"
                } relative`}
                onClick={() => setMobile((prev) => !prev)}
              >
                <svg
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </div>
              {mobile && (
                <motion.div
                  whileInView={{ x: [300, 0] }}
                  transition={{ duration: 0.85, ease: "easeOut" }}
                  className="justify-between items-center w-full lg:hidden p-5 z-50 absolute top-14 right-1 mt-4 pb-10 bg-black"
                >
                  <a
                    href="/"
                    class="flex font-medium hover:text-[#4F2EFF] text-gray-300 dark:hover:text-blue-500"
                  >
                    Home
                  </a>
                  <ul className="flex flex-col my-2 font-medium lg:hidden lg:mt-0">
                    {["students", "attendance"].map((item) => (
                      <li
                        key={item}
                        className="block py-2 pr-4 text-sm font-medium hover:text-[#4F2EFF] text-gray-300 dark:hover:text-blue-500 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 uppercase"
                      >
                        <Link
                          href={`/dashboard/${item}`}
                          onClick={() => setToggle(false)}
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
