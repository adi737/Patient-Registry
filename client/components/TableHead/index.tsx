import { Td } from "@chakra-ui/react";
import React from "react";

interface TableHeadItemProps {
  item: string;
}

const TableHeadItem: React.FC<TableHeadItemProps> = ({ item }) => {
  return <Td title={item}>{item}</Td>;
};

export default TableHeadItem;
