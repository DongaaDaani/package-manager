import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import NavigationElements from "./NavigationElement";
import { useLocation } from "react-router-dom";

import PackageIndex from "../Package/PackageIndex";

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  const PackageIndexRoute =
    (location && location.pathname === "/packages") ||
    location.pathname === "/";

  useEffect(() => setSidebarOpen(false), [location]);

  return (
    <div className="h-screen">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Menü bezárása</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center"></div>
                  <nav className="flex flex-1 flex-col ">
                    <NavigationElements />
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Menü megnyitása</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        
        <div className="h-6 w-px bg-gray-900/10" aria-hidden="true" />
        <div className="absolute inset-0 left-16 right-64 flex items-center justify-center gap-x-4 overflow-auto"></div>
        <div className="absolute right-4 flex items-center"></div>
      </div>

      <main className="px-4 py-6 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-300 via-pink-200 to-red-300">
        {PackageIndexRoute && <PackageIndex />}
      </main>
    </div>
  );
};
