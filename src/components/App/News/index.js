import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { AppHistory } from "../../../history/History";

import { withSnackbar } from "notistack";

import i18n from "../../../utils/i18n";

import { hardcodeNews } from "../../Wap/Main/Home/scene-1/template13/news/hardcoded";

const Container = styled.div`
  width: 1280px;
  min-height: 800px;
  position: relative;
  margin: 0 auto;
`;
const Title = styled.div`
  width: 1280px;
  margin: 40px auto;
  font-size: 44px;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
`;

const NewsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 1280px;
  margin: 40px auto;
  justify-items: center;
  row-gap: 30px;
`;

const NewsItem = styled.div`
  width: 600px;
  height: 450px;
  position: relative;
  border-radius: 39px;
  cursor: pointer;
  border: 1px solid #707070;
`;

const NewsImageContainer = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 25px;
  width: 100%;
  height: 300px;
`;

const NewsImage = styled.img`
  width: 600px;
  height: 300px;
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
  overflow: hidden;
  height: 55px;
  line-height: 18px;
`;

const NewsContent2 = styled.div`
  color: white;
  font-size: 14px;
  padding: 0px 20px 10px 20px;
  height: 90px;
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
  color: #fff;
  cursor: pointer;
`;

class News extends Component {
  state = {
    newsList: hardcodeNews,
  };

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}

  handleNavigateClick = (id) => {
    AppHistory.push({
      pathname: "/news/" + id,
    });
  };

  render() {
    return (
      <Container>
        <Title>{i18n.t("T13.topNews")}</Title>
        <NewsContainer>
          {this.state.newsList.slice(0, 6).map((item, index) => {
            return (
              <NewsItem
                onClick={() => {
                  this.handleNavigateClick(item.id);
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
        <ButtonMore>{i18n.t("Load More")}</ButtonMore>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    general: state.general,
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(News))
);
