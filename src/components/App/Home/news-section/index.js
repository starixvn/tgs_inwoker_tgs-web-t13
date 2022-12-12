import React, { useState } from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";

const Container = styled.div`
  width: 1280px;
  height: 637px;
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
  font-family: "Montserrat";
  font-size: 30px;
  font-weight: 500;
  text-transform: uppercase;
`;
const NewsContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
`;

const NewsTitle = styled.div`
  color: white;
  font-family: "Montserrat";
  font-size: 24px;
  font-weight: 500;
  padding: 30px 20px 10px 20px;
  overflow: hidden;
`;

const NewsContent = styled.div`
  color: white;
  font-family: "Montserrat";
  font-size: 14px;
  padding: 0px 20px 10px 20px;
  height: 100px;
  overflow: hidden;
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
  font-family: "Montserrat";
  color: #fff;
  cursor: pointer;
`;

const NewsSection = ({ news, handleNavigateClick }) => {
  const hardcodeNews = [
    {
      id: "1",
      title: "Caesars Racebook launches on Android and desktop",
      content:
        "The launch is in cooperation with Nyra Bets, the official online wagering platform of the New York Racing Association.",
      image: "1",
    },
    {
      id: "2",
      title: "Liverpool vs Manchester United final score",
      content:
        "Luis Diaz, Sadio Mane, and Mohamed Salah all had at least a goal and an assist in a 4-0 demolition of Manchester United at Anfield that sent Liverpool top of the Premier League.",
      image: "2",
    },
    {
      id: "3",
      title: "Lucky Group Wins $100k In Encore Draw",
      content:
        "A group of enthusiastic lottery players recently won big following their purchase of an Encore ticket from the Ontario Lottery and Gaming ",
      image: "5",
    },
  ];
  return (
    <Container>
      <TitleGapper>
        <TitleIcon></TitleIcon>
        <TitleHolder>{i18n.t("TOP NEWS")}</TitleHolder>
      </TitleGapper>
      <NewsContainer>
        {hardcodeNews.slice(0,3).map((item, index) => {
          return (
            <NewsItem
              onClick={() => {
                handleNavigateClick("/" + i18n.language + "/news/" + item.id);
              }}
            >
              <NewsImageContainer><NewsImage alt={item.image} src={process.env.PUBLIC_URL + "/assets/images/news/" + item.image + ".jpg"}></NewsImage></NewsImageContainer>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsContent>{item.content}</NewsContent>
            </NewsItem>
          );
        })}
      </NewsContainer>
      <ButtonMore
        onClick={() => {
          handleNavigateClick("/" + i18n.language + "/news/");
        }}
      >
        {i18n.t("More News")}
      </ButtonMore>
    </Container>
  );
};

export default NewsSection;
