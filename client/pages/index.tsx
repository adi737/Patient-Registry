import { InferGetServerSidePropsType } from "next";
import Layout from "../containers/Layout";
import { Patient } from "../interfaces";
import { api } from "../utils/api";
import Header from "../components/Header";
import Table from "../containers/TableContainer";
import React, { useState } from "react";
import AddPatient from "../components/AddPatient";

const Index = ({
  data: patientsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [data, setData] = useState(patientsData);
  return (
    <Layout>
      <Header />
      <AddPatient setData={setData} />
      <Table
        setData={setData}
        tbodyData={data}
        theadData={["name", "age", "animal", "healed"]}
      />
      <div className="dog">
        <img src="/svg/dog.svg" alt="dog" />
      </div>
      <div className="cat">
        <img src="/svg/cat.svg" alt="cat" />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await api.get("/registry");
  const data: Patient[] = res.data;

  return {
    props: {
      data,
    },
  };
};

export default Index;
