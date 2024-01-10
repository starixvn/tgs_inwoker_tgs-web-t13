import styled from "styled-components";
import FAQs from "./faqs";
import Privacy from "./privacy";
import Responsible from "./responsible";
import TnC from "./tnc";

const Container = styled.div`
  width: 1280px;
  margin: 0 auto 100px auto;
  color: #fff;
  & h1 {
    font-size: 50px;
    font-weight: 500;
  }

  & h2 {
    font-size: 28px;
    font-weight: 400;
  }
  &a,&a: visited {
    color: #b6b6b6;
  }
`;

export function Faq(props) {
  return (
    <Container>
      <FAQs />
    </Container>
  );
}

export function TermsAndConditions(props) {
  return (
    <Container>
      <TnC />
    </Container>
  );
}

export function PrivacyPolicy(props) {
  return (
    <Container>
      <Privacy />
    </Container>
  );
}

export function ResponsibleGaming(props) {
  return (
    <Container>
      <Responsible />
    </Container>
  );
}
