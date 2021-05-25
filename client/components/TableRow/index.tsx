import { Button, Link, Td, Tr } from "@chakra-ui/react";
import React from "react";
import { Patient } from "../../interfaces";
import { api } from "../../utils/api";
import { Span } from "./style";
import NextLink from "next/link";

interface TableRowProps {
  data: Patient;
  setData: React.Dispatch<React.SetStateAction<Patient[]>>;
  index: number;
}

const TableRow: React.FC<TableRowProps> = ({ index, data, setData }) => {
  const deletePatient = async () => {
    try {
      await api.delete(`/registry/${data.id}/`);
      setData((patients) => [
        ...patients.slice(0, index),
        ...patients.slice(index + 1),
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Tr>
      <Td>
        <NextLink passHref href={"/" + data.id}>
          <Link color="violet" textDecor="underline" fontWeight="bold">
            {data.name}
          </Link>
        </NextLink>
      </Td>
      <Td>{data.age}</Td>
      <Td>{data.animal}</Td>
      <Td d="flex" justifyContent="space-between">
        <Span>{data.completed ? "Yes" : "No"}</Span>
        <Button onClick={deletePatient} variant="ghost">
          Delete &#9988;
        </Button>
      </Td>
    </Tr>
  );
};

export default TableRow;
