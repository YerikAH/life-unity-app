
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { IconChevronDown, IconSearch } from '@tabler/icons-react'

export const FilterHabit = () => {
  return (
    <div className="flex justify-between items-center ">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="items-center inline-flex font-primary w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Filter by
            <IconChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                <button
                  href="#"
                  className='font-primary text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left'
                >
                  Hora de desarrollo
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  href="#"
                  className='font-primary text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left'
                >
                  Incompletos
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  href="#"
                  className='font-primary text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left'
                >
                  Completos
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  href="#"
                  className='w-full font-primary text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100'
                >
                  Fecha de creación
                </button>
              </Menu.Item>

            </div>
          </Menu.Items>
        </Transition>
      </Menu>


      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <IconSearch className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full font-primary rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 font-semibold"
          placeholder="Search..."
        />
      </div>
    </div>
  )
}


