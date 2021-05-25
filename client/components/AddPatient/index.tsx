import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { Patient } from "../../interfaces";
import { api } from "../../utils/api";
import InputField from "../InputField";
import { ButtonWrapper } from "./style";

interface AddPatientProps {
  setData: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const AddPatient: React.FC<AddPatientProps> = ({ setData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ButtonWrapper>
      <Box textAlign="center">
        <Button
          mb="1rem"
          onClick={onOpen}
          position="static"
          _hover={{
            transform: "scale(1.1)",
          }}
          transition=".4s"
          variant="outline"
          bgColor={{ sm: "teal.400" }}
          cursor="pointer"
        >
          Add patient
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Formik
              initialValues={{ name: "", age: "", animal: "", healed: false }}
              onSubmit={async (values) => {
                try {
                  const res = await api.post("/registry/", values);
                  const newData: Patient = await res.data;
                  setData((data) => [...data, newData]);
                  onClose();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <ModalHeader>Add patient</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <InputField
                      type="text"
                      name="name"
                      label="Name"
                      placeholder="name"
                      submitting={isSubmitting}
                    />
                    <InputField
                      type="number"
                      name="age"
                      label="Age"
                      placeholder="age"
                      submitting={isSubmitting}
                    />
                    <InputField
                      type="text"
                      name="animal"
                      label="Animal"
                      placeholder="animal"
                      submitting={isSubmitting}
                    />
                    <InputField
                      option="textarea"
                      type="text"
                      name="description"
                      label="Visit description"
                      placeholder="description"
                      submitting={isSubmitting}
                    />
                    <InputField
                      option="select"
                      type="select"
                      name="completed"
                      label="Healed"
                      placeholder="healed"
                      submitting={isSubmitting}
                    />
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
      </Box>
    </ButtonWrapper>
  );
};

export default AddPatient;
