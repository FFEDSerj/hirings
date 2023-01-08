import React, { useState } from 'react';
import { ZodError } from 'zod';
import {
  type AddCompanyProps,
  type ErrorMap,
  FormData,
  type FormDataType,
} from '../../types/AddCompanyForm/types';
import { trpc } from '../../utils/trpc';

const AddCompanyForm = ({ onCloseForm = () => null }: AddCompanyProps) => {
  const [error, setError] = useState<ErrorMap>({});
  const utils = trpc.useContext();
  utils.invalidate;
  const [formData, setFormData] = useState<FormDataType>({
    companyName: '',
    ceo: '',
    email: '',
    staff: 1,
    budget: 0,
  });

  const createCompany = trpc.company.createCompany.useMutation({
    onSuccess: () => utils.auth.getUser.invalidate(),
  }).mutateAsync;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: parseFloat(e.target.value) || e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError({});
      const result = FormData.parse(formData);
      await createCompany({ ...result, name: result.companyName });
      onCloseForm();
    } catch (err) {
      if (err instanceof ZodError) {
        setError(
          err.errors.reduce<ErrorMap>((errMap, error) => {
            const key = error.path[0] as keyof FormDataType;
            errMap[key] = { message: error.message };
            return errMap;
          }, {})
        );
      } else {
        throw err;
      }
    }
  };

  return (
    <form action="#" method="POST" className="pb-10" onSubmit={onSubmit}>
      <div className="overflow-hidden shadow-lg shadow-slate-300 sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Company name
              </label>
              <input
                type="text"
                value={formData.companyName}
                name="companyName"
                id="companyName"
                autoComplete="companyName"
                className="mt-1 block w-full rounded-md border-gray-300 px-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={onChange}
              />
              {error.companyName && (
                <p className="text-sm text-red-500">
                  {error.companyName.message}
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
              {error.ceo && (
                <p className="text-sm text-red-500">{error.ceo.message}</p>
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
              {error.email && (
                <p className="text-sm text-red-500">{error.email.message}</p>
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
              {error.staff && (
                <p className="text-sm text-red-500">{error.staff.message}</p>
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
              {error.budget && (
                <p className="text-sm text-red-500">{error.budget.message}</p>
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
            onClick={onCloseForm}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCompanyForm;
