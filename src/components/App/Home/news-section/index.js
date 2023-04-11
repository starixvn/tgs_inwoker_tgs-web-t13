import React from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";
import { hardcodeNews } from "../../../Wap/Main/Home/scene-1/template13/news/hardcoded";
const Container = styled.div`
  width: 1280px;
  height: max-content;
  margin: 0 auto;
`;
const TitleGapper = styled.div`
  padding: 10px 0px 10px 0px;
  display: flex;
`;

const TitleIcon = styled.div`
  width: 45px;
  height: 45px;
  background: url(${process.env.PUBLIC_URL +
  "/assets/images/pcHomePage/news.svg"});
  background-repeat: no-repeat;
  background-size: contain;
`;
const TitleHolder = styled.div`
  padding: 5px 20px;
  border-radius: 10px;
  width: 100%;
  color: white;
  font-size: 30px;
  font-weight: 500;
  text-transform: uppercase;
`;
const NewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 400px);
  gap: 20px;
`;

const NewsItem = styled.div`
  width: 400px;
  height: 400px;
  position: relative;
  border-radius: 39px;
  cursor: pointer;
  border: double 1px transparent;
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-image: linear-gradient(#1b1d30, #1b1d30),
    linear-gradient(to bottom, #ffffff00, #707070);
`;

const NewsImageContainer = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 25px;
  width: 100%;
  height: 200px;
`;

const NewsImage = styled.img`
  width: 400px;
  height: 200px;
  object-fit: cover;
  object-position: top;
`;

const NewsTitle = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 500;
  padding: 30px 20px 10px 20px;
  overflow: hidden;
`;

const NewsContent = styled.div`
  color: white;
  font-size: 14px;
  padding: 0px 20px 10px 20px;
  height: 55px;
  overflow: hidden;
  line-height: 18px;
`;

const ButtonMore = styled.div`
  width: 300px;
  height: 80px;
  line-height: 80px;
  border-radius: 40px;
  margin: 40px auto;
  background: #cf2029;
  filter: drop-shadow(1px 1px 8px #cf2029ba);
  text-transform: uppercase;
  text-align: center;
  font-size: 26px;
  color: #fff;
  cursor: pointer;
`;

const NewsSection = ({ news, handleNavigateClick }) => {
  const newsList = hardcodeNews;
  return (
    <Container>
      <TitleGapper>
        <TitleIcon></TitleIcon>
        <TitleHolder>{i18n.t("T13.topNews")}</TitleHolder>
      </TitleGapper>
      <NewsContainer>
        {newsList.slice(0, 6).map((item, index) => {
          return (
            <NewsItem
              onClick={() => {
                handleNavigateClick("/news/" + item.id);
              }}
            >
              <NewsImageContainer>
                <NewsImage
                  alt={item.image}
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/news/" +
                    item.image +
                    ".jpg"
                  }
                ></NewsImage>
              </NewsImageContainer>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsContent>{item.content}</NewsContent>
            </NewsItem>
          );
        })}
      </NewsContainer>
      <ButtonMore
        onClick={() => {
          handleNavigateClick("/news/");
        }}
      >
        {i18n.t("common.more")}
      </ButtonMore>
    </Container>
  );
};

export default NewsSection;
