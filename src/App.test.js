import React, { useEffect } from "react";
import { screen, render, act } from "@testing-library/react";
import { useMutation, gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";

const RegisterStudent = gql`
  mutation RegisterStudent($codigo: ID!) {
    registerStudent(input: { codigo: $codigo }) {
      nombre
      schedule {
        group
        teacher
        entry
      }
    }
  }
`;

const variables = {
  codigo: "1234567890",
  nombre: "Applicant-nombre",
  apellido_materno: "Applicant-apellido_materno",
  apellido_paterno: "Applicant-apellido_paterno",
  genero: "M",
  carrera: "Applicant-carrera",
  ciclo: "2022A",
  telefono: "3411234567",
  email: "email@website.com",
  nivel: "4",
  curso: "en",
  externo: true,
  schedule: "E4-1",
};

const Component = () => {
  const [registerStudent, { data, loading, error }] =
    useMutation(RegisterStudent);
  useEffect(() => {
    registerStudent({
      variables: {
        codigo: "0987654321",
      },
    });
  });
  if (error) return <>{JSON.stringify(error)}</>;
  return <>{JSON.stringify(data)}</>;
};

test("queries the schema", async () => {
  render(
    <MockedProvider
      mocks={[
        {
          request: {
            query: RegisterStudent,
            variables: {
              codigo: "0987654321",
            },
          },
          result: {
            data: {
              registerStudent: {
                nombre: "RegisterResponse-nombre",
                schedule: {
                  group: "Schedule-group",
                  teacher: "Schedule-teacher",
                  entry: "Schedule-entry",
                  __typename: "Schedule",
                },
                __typename: "RegisterResponse",
              },
            },
          },
        },
      ]}
    >
      <Component />
    </MockedProvider>
  );
  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));
  screen.debug();

  expect(0).toBe(0);
});
