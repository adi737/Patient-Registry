import styled from "styled-components";

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  background-image: url("/img/background.jpg");
  & > .dog {
    position: absolute;
    bottom: 200px;
    left: 5%;
    width: 150px;
    & > img {
      width: 100%;
    }
  }
  & > .cat {
    position: absolute;
    bottom: 200px;
    right: 5%;
    width: 150px;
    & > img {
      width: 100%;
    }
  }
`;
