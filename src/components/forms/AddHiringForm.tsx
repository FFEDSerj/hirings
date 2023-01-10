import { Mode } from '@prisma/client';
import { type ChangeEvent, useState, useEffect } from 'react';
import { ZodError } from 'zod';
import {
  type HiringRequiredFields,
  useProfileData,
} from '../../context/ProfileContext';
import {
  FormData,
  type FieldErrors,
  type FormDataKeys,
  type FormDataType,
} from '../../types/AddHiringForm/types';
import { trpc } from '../../utils/trpc';

const defaultFormData: FormDataType = {
  title: '',
  position: '',
  salary: 0,
  description: '',
  mode: 'OFFICE',
};

function isValidFormKey(value: string): value is FormDataKeys {
  return value in defaultFormData;
}

type AddHiringFormProps = {
  companyId: number;
};

const AddHiringForm: React.FC<AddHiringFormProps> = ({ companyId }) => {
  const { data: hiringData, ref } = useProfileData();
  const [formData, setFormData] = useState<HiringRequiredFields | FormDataType>(
    defaultFormData
  );
  const [errors, setErrors] = useState<FieldErrors | undefined>();
  const utils = trpc.useContext();
  const { mutate: createOrUpdateHiring } =
    trpc.hiring.createOrUpdateHiring.useMutation({
      onSettled: () => utils.auth.getUser.invalidate(),
    });

  useEffect(() => {
    setFormData(hiringData ?? defaultFormData);
  }, [hiringData]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrors(undefined);
      const result = FormData.parse(formData);
      createOrUpdateHiring({ companyId, id: hiringData?.id, ...result });
      setFormData(defaultFormData);
    } catch (error) {
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
        setErrors(formattedErrors);
      } else {
        throw error;
      }
    }
  };

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value =
      (e.target as HTMLInputElement).valueAsNumber || e.target.value;
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: value,
    }));
  };

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Create a hiring
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Use this form to create a hiring, that will be added to the
                global hiring dashboard.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST" onSubmit={onSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        ref={ref}
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        autoComplete="title"
                        onChange={onChange}
                        placeholder="We hire!"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {errors?.title && (
                        <p className="text-sm text-red-500">{errors.title}</p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="position"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Application for
                      </label>
                      <input
                        type="text"
                        name="position"
                        id="position"
                        autoComplete="position"
                        value={formData.position}
                        onChange={onChange}
                        placeholder="Newbie Dev"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {errors?.position && (
                        <p className="text-sm text-red-500">
                          {errors.position}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="salary"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Salary expectation
                      </label>
                      <input
                        type="number"
                        name="salary"
                        id="salary"
                        autoComplete="salary"
                        value={formData.salary}
                        onChange={onChange}
                        placeholder="1000"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {errors?.salary && (
                        <p className="text-sm text-red-500">{errors.salary}</p>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          value={formData.description ?? ''}
                          onChange={onChange}
                          placeholder="Add more info"
                          className="mt-1 block max-h-48 min-h-fit w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors?.description && (
                          <p className="text-sm text-red-500">
                            {errors.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="mode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Working mode
                      </label>
                      <select
                        id="mode"
                        name="mode"
                        autoComplete="mode"
                        value={formData.mode}
                        onChange={onChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        {Object.values(Mode).map(mode => (
                          <option key={mode}>{mode}</option>
                        ))}
                      </select>
                      {errors?.mode && (
                        <p className="text-sm text-red-500">{errors.mode}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
};

export default AddHiringForm;
