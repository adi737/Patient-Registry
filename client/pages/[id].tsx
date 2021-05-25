import { GetStaticPaths, GetStaticProps } from "next";
import { Patient } from "../interfaces";
import { api } from "../utils/api";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import { ParsedUrlQuery } from "querystring";

const Index = ({
  patient,
  params,
}: {
  patient: Patient;
  params: ParsedUrlQuery;
}) => {
  const [option, setOption] = useState("");
  const [data, setData] = useState<Patient>();

  useEffect(() => {
    setData(patient);
  }, [patient]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position="absolute" left="50%" transform="translateX(-50%)" mt="60px">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{ [option]: "" }}
            onSubmit={async (values) => {
              try {
                const res = await api.patch(`/registry/${params.id}/`, values);
                const newData: Patient = await res.data;
                setData(newData);
                onClose();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalHeader>Update patient</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  {option === "completed" ? (
                    <InputField
                      option="select"
                      type="select"
                      name="completed"
                      label="Healed"
                      placeholder="healed"
                      submitting={isSubmitting}
                    />
                  ) : (
                    <InputField
                      type="text"
                      name={option}
                      label={option}
                      placeholder={option}
                      submitting={isSubmitting}
                    />
                  )}
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
      <Box>
        <Button
          onClick={() => {
            setOption("name");
            onOpen();
          }}
          variant="link"
        >
          Edit<span>&#9998;</span>
        </Button>
        <span>Name:</span>
        <p>{data?.name}</p>
      </Box>
      <Box>
        <Button
          onClick={() => {
            setOption("age");
            onOpen();
          }}
          variant="link"
        >
          Edit<span>&#9998;</span>
        </Button>
        <span>Age:</span>
        <p>{data?.age}</p>
      </Box>
      <Box>
        <Button
          onClick={() => {
            setOption("animal");
            onOpen();
          }}
          variant="link"
        >
          Edit<span>&#9998;</span>
        </Button>
        <span>Animal:</span>
        <p>{data?.animal}</p>
      </Box>
      <Box>
        <Button
          onClick={() => {
            setOption("completed");
            onOpen();
          }}
          variant="link"
        >
          Edit<span>&#9998;</span>
        </Button>
        <span>Healed:</span>
        <p>{data?.completed ? "Yes" : "no"}</p>
      </Box>
      <Box>
        <Button
          onClick={() => {
            setOption("description");
            onOpen();
          }}
          variant="link"
        >
          Edit<span>&#9998;</span>
        </Button>
        <span>Description:</span>
        <p>{data?.description}</p>
      </Box>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await api.get("registry");
  const patients: Patient[] = await res.data;

  const paths = patients.map((patient) => ({
    params: { id: String(patient.id) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await api.get(`/registry/${params?.id}`);
  const patient = await res.data;

  return { props: { patient, params } };
};

export default Index;
