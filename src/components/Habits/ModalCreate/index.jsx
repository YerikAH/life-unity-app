import { Fragment } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { IconChevronDown, IconExclamationCircle, IconX } from '@tabler/icons-react'
import { classNames } from '../../../utils'

export const ModalCreate = ({ open, setOpen }) => {

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-35 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-full p-1 transition-all bg-white text-gray-400 hover:text-gray-500 focus:outline-none hover:bg-gray-100 "
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <IconX className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div >
                  <Dialog.Title as="h3" className="font-primary text-base font-semibold leading-6 text-gray-900">
                    Editar hábito
                  </Dialog.Title>
                  <div className='grid grid-cols-2 '>
                    <div>
                      <div>
                        <label htmlFor="habit" className="font-primary block text-sm font-medium leading-6 text-gray-900">
                          Nombre del hábito
                        </label>
                        <div className="mt-2">
                          <input
                            type="habit"
                            name="habit"
                            id="habit"
                            className="outline-none font-primary px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            placeholder="Ingresa el nombre de tu hábito"
                          />
                        </div>
                      </div>
                    </div>
                    <div>

                      <div>
                        <label htmlFor="time" className="font-primary block text-sm font-medium leading-6 text-gray-900">
                          Tiempo del hábito
                        </label>
                        <div>
                          <Menu as="div" className="relative inline-block text-left">
                            <div>
                              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 font-primary">
                                Hour
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
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">

                                  <Menu.Item>
                                    <button className='w-full hover:bg-gray-50 transition-all font-primary text-sm'>
                                      1
                                    </button>
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                          <Menu as="div" className="relative inline-block text-left">
                            <div>
                              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 font-primary">
                                Minuts
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
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">

                                  <Menu.Item>
                                    <button className='w-full hover:bg-gray-50 transition-all font-primary text-sm'>
                                      1
                                    </button>
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-50 border-red-100 border px-5 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-200 sm:ml-3 sm:w-auto font-primary active:scale-95"
                    onClick={() => setOpen(false)}
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-50 border-blue-100 border px-5 py-2 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-200 sm:ml-3 sm:w-auto font-primary active:scale-95"
                    onClick={() => setOpen(false)}
                  >
                    Agregar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
