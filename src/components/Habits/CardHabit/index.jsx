/* eslint-disable react/prop-types */
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { IconDotsVertical } from "@tabler/icons-react"

export const CardHabit = ({ name, time, duration, color, icon }) => {
  return (
    <li className="relative flex justify-between p-5 bg-white">
      <div className="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">

        <div className=" h-12 w-12 grid place-items-center">
          <div className='p-2 rounded-md'
            style={{ boxShadow: `0 0 20px 1px ${color}`, backgroundColor: color }}
          >
            {icon}
          </div>
        </div>

        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900 font-primary truncate">
            {name}
          </p>
          <p className="truncate mt-1 flex text-xs leading-5 text-gray-500 font-primary">
            {time}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-4 sm:w-1/2 sm:flex-none">
        <div className="hidden sm:block">
          <p className="text-sm leading-6 text-gray-900 font-semibold font-primary">Duración</p>
          <p className="mt-1 text-xs leading-5 font-primary text-gray-500">
            0 / {duration} min
          </p>
        </div>

        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">Open options</span>
            <IconDotsVertical className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                <button
                  className='hover:bg-gray-50 block px-3 py-1  w-full text-left text-sm leading-6 text-gray-900 font-primary'
                >
                  Edit
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className='hover:bg-gray-50 w-full text-left block px-3 py-1 text-sm leading-6 text-gray-900 font-primary'
                >
                  Delete
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  )
}


