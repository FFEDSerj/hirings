import { type ChangeEvent, Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Modal from './Modal';
import { trpc } from '../utils/trpc';
import { toast } from 'react-toast';
import { z, ZodError } from 'zod';

export const FormData = z.object({
  name: z.string().min(2, 'Must contain at least 2 characters long').trim(),
  ceo: z.string().trim(),
  email: z.string().email('Please provide valid Email'),
  staff: z.number(),
  budget: z.number(),
});

export type FormDataType = z.infer<typeof FormData>;

export type FieldErrors = {
  [Key in keyof FormDataType]: string | undefined;
};

const isValidFormKey = (value: string): value is keyof FormDataType => {
  return value in FormData.keyof();
};

type EditCompanyModalProps = {
  open: boolean;
  setOpen: () => void;
  companyId: number;
  company: FormDataType;
};

export default function EditCompanyModal({
  open,
  setOpen,
  companyId,
  company,
}: EditCompanyModalProps) {
  const [error, setError] = useState<FieldErrors | undefined>(undefined);
  const [formData, setFormData] = useState<FormDataType>(company);
  const inputRef = useRef(null);
  const utils = trpc.useContext();
  const updateCompany = trpc.company.updateCompanyInfo.useMutation({
    onSuccess() {
      utils.company.getCompanyDetails.invalidate();
      toast.success('Company info updated.');
    },
  }).mutateAsync;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value =
      (e.target as HTMLInputElement).valueAsNumber || e.target.value;
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError(undefined);
      const result = FormData.parse(formData);
      await updateCompany({ companyId, ...result });
      setOpen();
    } catch (err) {
      if (error instanceof ZodError) {
        const fieldErrors = error.formErrors.fieldErrors;
        const formattedErrors = Object.entries(fieldErrors).reduce(
          (map, [key, val]) => {
            if (isValidFormKey(key)) {
              map[key] = val?.toString();
            }
            return map;
          },
          {} as FieldErrors
        );
        setError(formattedErrors);
      } else {
        throw err;
      }
    }
  };

  return (
    <Modal>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={inputRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <form action="#" method="POST" onSubmit={onSubmit}>
                      <div className="overflow-hidden">
                        <div className="bg-white px-4 py-5 sm:p-6">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6">
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Company name
                              </label>
                              <input
                                ref={inputRef}
                                type="text"
                                value={formData.name}
                                name="name"
                                id="name"
                                autoComplete="name"
                                className="mt-1 block w-full rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                onChange={onChange}
                              />
                              {error?.name && (
                                <p className="text-sm text-red-500">
                                  {error.name}
                                </p>
                              )}
                            </div>

                            <div className="col-span-6">
                              <label
                                htmlFor="ceo"
                                className="block text-sm font-medium text-gray-700"
                              >
                                CEO
                              </label>
                              <input
                                type="text"
                                name="ceo"
                                id="ceo"
                                autoComplete="ceo"
                                value={formData.ceo}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                onChange={onChange}
                              />
                              {error?.ceo && (
                                <p className="text-sm text-red-500">
                                  {error.ceo}
                                </p>
                              )}
                            </div>

                            <div className="col-span-6">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Email address
                              </label>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                value={formData.email}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                onChange={onChange}
                              />
                              {error?.email && (
                                <p className="text-sm text-red-500">
                                  {error.email}
                                </p>
                              )}
                            </div>

                            <div className="col-span-6 min-[320px]:col-span-3">
                              <label
                                htmlFor="staff"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Staff
                              </label>
                              <input
                                type="number"
                                name="staff"
                                id="staff"
                                autoComplete="staff"
                                value={formData.staff}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                onChange={onChange}
                                min="1"
                              />
                              {error?.staff && (
                                <p className="text-sm text-red-500">
                                  {error.staff}
                                </p>
                              )}
                            </div>

                            <div className="col-span-6 min-[320px]:col-span-3">
                              <label
                                htmlFor="budget"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Budget
                              </label>
                              <input
                                type="number"
                                name="budget"
                                id="budget"
                                autoComplete="budget"
                                value={formData.budget}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                onChange={onChange}
                                min="0"
                                step=".01"
                              />
                              {error?.budget && (
                                <p className="text-sm text-red-500">
                                  {error.budget}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5 bg-gray-50 px-4 py-3 text-right min-[425px]:grid-cols-4 sm:px-6">
                          <button
                            type="submit"
                            className="col-span-1 col-start-1 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 min-[425px]:col-start-3"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="col-span-1 col-start-2 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 min-[425px]:col-start-4 sm:w-auto sm:text-sm"
                            onClick={setOpen}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Modal>
  );
}
