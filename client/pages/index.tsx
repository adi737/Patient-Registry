import { InferGetStaticPropsType } from "next";
import Layout from "../containers/layout";
import { Patient } from "../interfaces";
import { api } from "../utils/api";
import StdButton from "../components/stdButton";

const Index = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <StdButton />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const res = await api.get("/registry");
  const data: Patient[] = res.data;

  return {
    props: {
      data,
    },
  };
};

export default Index;
