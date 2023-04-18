import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { AppHistory } from "../../../history/History";
import { withSnackbar } from "notistack";

import i18n from "../../../utils/i18n";
import ChevronLeftRounded from "@material-ui/icons/ChevronLeftRounded";
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded";
import { hardcodeNews } from "../../Wap/Main/Home/scene-1/template13/news/hardcoded";

const Container = styled.div`
  width: 100%;
  padding-top: 20px;

  position: relative;
  min-height: 800px;
`;

const Title = styled.div`
  width: 1280px;
  margin: 40px auto;
  font-size: 44px;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
`;

const BannerContainer = styled.div`
  width: 1280px;
  height: 486px;
  background: url(${(props) => props.img}) no-repeat;
  background-size: cover;
  background-position: top;
  margin: 0 auto;
  border-radius: 25px;
  position: relative;
`;

const NavigationButton = styled.div`
  width: 77px;
  height: 77px;
  background: #232323;
  border-radius: 50px;
  color: #ffffff;
  padding: 3px 2px;
  position: absolute;
  cursor: pointer;
  top: 200px;
  ${(props) =>
    props.isLeft
      ? `
    left: 30px;
  `
      : `
  right: 30px;
  `}

  & > svg {
    font-size: 4.5rem;
  }
`;

const NewsContainer = styled.div`
  width: 1280px;
  margin: 0 auto 200px auto;
  padding: 25px 60px;
  color: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const NewsTitle = styled.div`
  font-size: 40px;
  text-align: center;
  margin: 20px 0;
`;
const NewsAuthor = styled.div`
  font-size: 30px;
  text-align: center;
  margin: 20px 0;
`;
const NewsContent = styled.div`
  font-size: 28px;
  text-align: justify;
  margin: 20px 0 0 0;
  font-weight: 100;
  white-space: pre-line;
`;

const NewsContent2 = styled(NewsContent)`
  margin: 0 0 20px 0;
`;

class NewsDetails extends Component {
  constructor(props) {
    super(props);
    var index = -1;
    var newsDetail = null;
    var newsList = hardcodeNews;

    for (var i = 0; i < newsList.length; i++) {
      if (newsList[i].id === this.props.match.params.id) {
        index = i;
        newsDetail = newsList[i];
        break;
      }
    }
    if (index === -1) {
      AppHistory.replace("/news");
    }

    this.state = {
      index: index,
      newsList: newsList,
      newsDetail: newsDetail,
    };
  }

  componentDidMount() {
    if (this.props.match.params.id == null) {
      AppHistory.replace("/news");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.id !== null &&
      this.props.match.params.id != null &&
      prevProps.match.params.id !== this.props.match.params.id
    ) {
      for (var i = 0; i < this.state.newsList.length; i++) {
        if (this.state.newsList[i].id === this.props.match.params.id) {
          this.setState({
            ...this.state,
            index: i,
            newsDetail: this.state.newsList[i],
          });
        }
      }
    }
  }

  navigatePromotion = (isLeft) => {
    var newId = "";
    var newIndex;
    if (isLeft) {
      newIndex =
        this.state.index - 1 < 0
          ? this.state.newsList.length - 1
          : this.state.index - 1;
      newId = this.state.newsList[newIndex].id;
    } else {
      newIndex =
        this.state.index + 1 >= this.state.newsList.length
          ? 0
          : this.state.index + 1;
      newId = this.state.newsList[newIndex].id;
    }
    if (newId !== "") {
      AppHistory.push("/news/" + newId);
    }
  };

  render() {
    return (
      <Container>
        <Title>{i18n.t("T13.topNews")}</Title>
        <BannerContainer
          img={
            this.state.newsDetail &&
            process.env.PUBLIC_URL +
              "/assets/images/news/" +
              this.state.newsDetail.image +
              ".jpg"
          }
        >
          {this.state.newsList.length > 1 && (
            <React.Fragment>
              <NavigationButton
                isLeft={true}
                onClick={() => {
                  this.navigatePromotion(true);
                }}
              >
                <ChevronLeftRounded></ChevronLeftRounded>
              </NavigationButton>
              <NavigationButton
                isLeft={false}
                onClick={() => {
                  this.navigatePromotion(false);
                }}
              >
                <ChevronRightRounded></ChevronRightRounded>
              </NavigationButton>
            </React.Fragment>
          )}
        </BannerContainer>
        <NewsContainer>
          <NewsTitle>{this.state.newsDetail.title}</NewsTitle>
          <NewsAuthor>By {this.state.newsDetail.writer}</NewsAuthor>
          <NewsAuthor>{this.state.newsDetail.date}</NewsAuthor>
          <NewsContent2
            dangerouslySetInnerHTML={{
              __html: "<div>" + this.state.newsDetail.content2 + "</div>",
            }}
          ></NewsContent2>
        </NewsContainer>
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
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(NewsDetails))
);
