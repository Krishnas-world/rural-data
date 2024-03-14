"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Toaster } from "sonner";
import AddData from "./actions/AddData";
import Link from "next/link";

export default function SurveyForm() {
  const validationSchema = Yup.object({
    doorNumber: Yup.string().required("Door number is required"),
    numberOfPeople: Yup.number()
      .required("Number of people is required")
      .positive("Must be a positive number")
      .integer("Must be a whole number"),
    numberOfVoterID: Yup.number()
      .notRequired()
      .integer("Must be a whole number")
      .min(0, "Number of Voter IDs cannot be negative"),
    numberOfWomen: Yup.number()
      .notRequired()
      .positive("Must be a positive number")
      .min(0, "Number of women cannot be negative"),
    womenDetails: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
        educationQualification: Yup.string().required(
          "Education qualification is required"
        ),
        dropout: Yup.boolean().required("Dropout status is required"),
        dropoutReason: Yup.string().when("dropout", {
          is: true,
          then: () => Yup.string().required("Please provide dropout reason"),
          otherwise: () => Yup.string().notRequired(),
        }),
        continueEducation: Yup.boolean().notRequired(),
        voterID: Yup.boolean().required("Voter ID status is required"),
        voterIDReason: Yup.string().when("voterID", {
          is: false,
          then: () =>
            Yup.string().required(
              "Please provide reason for not having a Voter ID"
            ),
          otherwise: () => Yup.string().notRequired(),
        }),
      })
    ),
  });

  const onSubmit = (values) => {
    toast.promise(AddData(values), {
      loading: "Adding Data to Database...",
      success: (data) => {
        return `Data saved Successfully`;
      },
      error: "Error",
    });
  };

  return (
    <div className="flex justify-center items-start h-screen my-4">
      <Toaster position="top-center" />
      <Formik
        initialValues={{
          doorNumber: "",
          numberOfPeople: "",
          numberOfVoterID: 0,
          numberOfWomen: 0,
          womenDetails: [],
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form className="bg-[#fefefe] shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
            <Link href="/view">
              <p className="text-gray-900 text-right text-sm underline underline-offset-4 ">
                View Data
              </p>
            </Link>
            <h1 className="text-2xl text-gray-900 font-semibold pb-6">
              Rural Data Collection
            </h1>
            <div className="mb-4">
              <label
                htmlFor="doorNumber"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Door Number
              </label>
              <Field
                type="text"
                id="doorNumber"
                name="doorNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <ErrorMessage
                name="doorNumber"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="numberOfPeople"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Number of People in the House
              </label>
              <Field
                type="number"
                id="numberOfPeople"
                name="numberOfPeople"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <ErrorMessage
                name="numberOfPeople"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="numberOfPeople"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Number of People with Voter ID
              </label>
              <Field
                type="number"
                id="numberOfVoterID"
                name="numberOfVoterID"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <ErrorMessage
                name="numberOfVoterID"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="numberOfWomen"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Number of Women in the House
              </label>
              <Field
                type="number"
                id="numberOfWomen"
                name="numberOfWomen"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <ErrorMessage
                name="numberOfWomen"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            <FieldArray name="womenDetails">
              {({ push, remove }) => (
                <div>
                  {Array.from({
                    length: parseInt(values.numberOfWomen) || 0,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-300 rounded-lg p-4 mb-4"
                    >
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">
                        Woman {index + 1} Details
                      </h3>
                      <div className="mb-4">
                        <label
                          htmlFor={`womenDetails.${index}.name`}
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Name
                        </label>
                        <Field
                          type="text"
                          id={`womenDetails.${index}.name`}
                          name={`womenDetails.${index}.name`}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        <ErrorMessage
                          name={`womenDetails.${index}.name`}
                          component="div"
                          className="text-red-500 text-xs italic"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor={`womenDetails.${index}.educationQualification`}
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Highest Education Qualification
                        </label>
                        <Field
                          as="select"
                          id={`womenDetails.${index}.educationQualification`}
                          name={`womenDetails.${index}.educationQualification`}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                          <option value="">Select</option>
                          <option value="None">None</option>

                          <option value="Primary School">Primary School</option>
                          <option value="Secondary School">
                            Secondary School
                          </option>
                          <option value="High School">High School</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </Field>
                        <ErrorMessage
                          name={`womenDetails.${index}.educationQualification`}
                          component="div"
                          className="text-red-500 text-xs italic"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Did they drop out of college?
                        </label>
                        <div className="flex items-center">
                          <Field
                            type="radio"
                            id={`womenDetails.${index}.dropout`}
                            name={`womenDetails.${index}.dropout`}
                            value="true"
                            className="mr-2"
                          />
                          <label
                            htmlFor={`womenDetails.${index}.dropout`}
                            className="text-sm text-gray-900"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Field
                            type="radio"
                            id={`womenDetails.${index}.dropout`}
                            name={`womenDetails.${index}.dropout`}
                            value="false"
                            className="mr-2"
                          />
                          <label
                            htmlFor={`womenDetails.${index}.dropout`}
                            className="text-sm text-gray-900"
                          >
                            No
                          </label>
                        </div>
                        <ErrorMessage
                          name={`womenDetails.${index}.dropout`}
                          component="div"
                          className="text-red-500 text-xs italic"
                        />
                      </div>

                      {values.womenDetails[index]?.dropout === "true" && (
                        <div className="mb-4">
                          <label
                            htmlFor={`womenDetails.${index}.dropoutReason`}
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Reason for Dropout
                          </label>
                          <Field
                            type="text"
                            id={`womenDetails.${index}.dropoutReason`}
                            name={`womenDetails.${index}.dropoutReason`}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          />
                          <ErrorMessage
                            name={`womenDetails.${index}.dropoutReason`}
                            component="div"
                            className="text-red-500 text-xs italic"
                          />
                        </div>
                      )}
                      {values.womenDetails[index]?.dropout === "true" && (
                        <div className="mb-4">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            Do they plan to continue their education?
                          </label>
                          <div className="flex items-center">
                            <Field
                              type="radio"
                              id={`womenDetails.${index}.continueEducation`}
                              name={`womenDetails.${index}.continueEducation`}
                              value="true"
                              className="mr-2"
                            />
                            <label
                              htmlFor={`womenDetails.${index}.continueEducation`}
                              className="text-sm text-gray-900"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="flex items-center">
                            <Field
                              type="radio"
                              id={`womenDetails.${index}.continueEducation`}
                              name={`womenDetails.${index}.continueEducation`}
                              value="false"
                              className="mr-2"
                            />
                            <label
                              htmlFor={`womenDetails.${index}.continueEducation`}
                              className="text-sm text-gray-900"
                            >
                              No
                            </label>
                          </div>
                          <ErrorMessage
                            name={`womenDetails.${index}.continueEducation`}
                            component="div"
                            className="text-red-500 text-xs italic"
                          />
                        </div>
                      )}

                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Do they have a Voter ID?
                        </label>
                        <div className="flex items-center">
                          <Field
                            type="radio"
                            id={`womenDetails.${index}.voterID`}
                            name={`womenDetails.${index}.voterID`}
                            value="true"
                            className="mr-2"
                          />
                          <label
                            htmlFor={`womenDetails.${index}.voterID`}
                            className="text-sm text-gray-900"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Field
                            type="radio"
                            id={`womenDetails.${index}.voterID`}
                            name={`womenDetails.${index}.voterID`}
                            value="false"
                            className="mr-2"
                          />
                          <label
                            htmlFor={`womenDetails.${index}.voterID`}
                            className="text-sm text-gray-900"
                          >
                            No
                          </label>
                        </div>
                        <ErrorMessage
                          name={`womenDetails.${index}.voterID`}
                          component="div"
                          className="text-red-500 text-xs italic"
                        />
                      </div>
                      {values.womenDetails[index]?.voterID === "false" && (
                        <div className="mb-4">
                          <label
                            htmlFor={`womenDetails.${index}.voterIDReason`}
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Reason for not having a Voter ID
                          </label>
                          <Field
                            type="text"
                            id={`womenDetails.${index}.voterIDReason`}
                            name={`womenDetails.${index}.voterIDReason`}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          />
                          <ErrorMessage
                            name={`womenDetails.${index}.voterIDReason`}
                            component="div"
                            className="text-red-500 text-xs italic"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
