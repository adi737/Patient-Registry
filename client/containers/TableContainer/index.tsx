import React from "react";
import TableRow from "../../components/TableRow";
import TableHeadItem from "../../components/TableHead";
import { Patient } from "../../interfaces";
import { TableWrapper } from "./style";
import { Table, TableCaption, Tbody, Tfoot, Thead, Tr } from "@chakra-ui/react";

interface TableProps {
  theadData: ["name", "age", "animal", "healed"];
  tbodyData: Patient[];
  setData: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const TableContainer: React.FC<TableProps> = ({
  theadData,
  tbodyData,
  setData,
}) => {
  return (
    <TableWrapper>
      <Table variant="striped" colorScheme="blackAlpha">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead fontWeight="bold">
          <Tr>
            {theadData.map((h) => {
              return <TableHeadItem key={h} item={h} />;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {tbodyData.map((item, index) => {
            return (
              <TableRow
                index={index}
                setData={setData}
                key={item.id}
                data={item}
              />
            );
          })}
        </Tbody>
        <Tfoot fontWeight="bold">
          <Tr>
            {theadData.map((h) => {
              return <TableHeadItem key={h} item={h} />;
            })}
          </Tr>
        </Tfoot>
      </Table>
    </TableWrapper>
  );
};

export default TableContainer;
