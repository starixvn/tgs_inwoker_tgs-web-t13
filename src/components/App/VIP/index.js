import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { generalAction } from "../../../api-services/actions/generalAction";
import i18n from "../../../utils/i18n";
import IconVIPPNG from "../../../assets/images/icon-vip.png";
import config from "../../../config/config";
import Common from "../../../utils/Common";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  background-color: #1b1d30;
  width: 100%;
  min-height: 611px;
 
 
`;
const Title = styled.div`
  color: #fff;
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 25px;
  background: #fff;
  mask: url(${IconVIPPNG}) no-repeat left center;
  mask-size: 24px 24px;

  float: left;
`;
const InnerWrap = styled.div`
  width: 1280px;
  margin: auto;
  min-height: 610px;
  margin-top: 18px;
  box-sizing: border-box;
  border-radius: 10px;
`;

const OuterWrap = styled.div`
  width: 1280px;
  margin: auto;
`;

const VIPContent = styled.div``;

const TitleContent = styled(VIPContent)`
  white-space: pre-line;
`;

const CustomVIPContent = styled(VIPContent)`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const VipEmblemContainer = styled(VIPContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VIPLevelImage = styled.div`
  height: 60px;
`;

const VIPContainer = styled.div`
  display: flex;
  background: #27273f;
  padding: 20px;
  border-radius: 15px;
  flex-direction: column;
  margin-bottom: 30px;
`;

const VIPHeaderRowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border-radius: 30px;
  background: #212237;
  color: #fff;
  text-align: center;
  padding: 10px 5px;
  align-items: center;
  height: 60px;
  width: 1230px;
  transition: all 0.5s ease;
  ${(props) =>
    props.isHeaderOutside
      ? ` `
      : `position: fixed;
      background: #212237;
      `}
`;

const VIPRowContainer = styled(VIPHeaderRowContainer)`
  position: static;
  background: none;
  border-radius: 0px;
  height: 120px;

  &:last-child {
    ${CustomVIPContent} {
      border-bottom: none;
    }
  }
`;

const VIPRebateRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  color: #fff;
  text-align: center;
  padding: 10px 5px;
  align-items: center;
  height: 50px;
`;
const VIPRebateHeader = styled(VIPRebateRow)`
  height: 70px;
`;

const VIPListContainer = styled.div`
  ${(props) => (props.isHeaderOutside ? ` ` : `  margin-top: 50px;`)}
`;

const VIPRebateContainer = styled.div`
  display: flex;
  background: #27273f;
  padding: 20px;
  border-radius: 15px;
  flex-direction: column;
  margin-bottom: 30px;
  & > div {
    border-top: 1px solid #ffffff26;
  }

  & > div:first-child,
  & > div:nth-child(2) {
    border-top: none;
  }
`;

const VIP = (props) => {
  const { getVIP } = props;
  const [vipBenefit, setVipBenefits] = useState([]);

  const lastItemRef = useRef(null);
  const [isHeaderOutside, setIsHeaderOutside] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (
        vipBenefit!==undefined &&
        vipBenefit.items !== undefined && 
        lastItemRef &&
        lastItemRef.current &&
        (document.documentElement.scrollTop < 0 ||
          document.documentElement.scrollTop >
          (lastItemRef.current.getBoundingClientRect().height * vipBenefit.items.length))
      ) {
        setIsHeaderOutside(true);
      } else {
        setIsHeaderOutside(false);
      }
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [vipBenefit]);

  useEffect(() => {
    if (vipBenefit.length === 0) {
      getVIP().then((result) => {
        if (result.IsSuccess) {
          setVipBenefits(result.data);
        }
      });
    }
  }, []);

  var vipBenefitList =
    vipBenefit.items &&
    vipBenefit.items.sort((a, b) => {
      return a.level < b.level ? -1 : a.level > b.level ? 1 : 0;
    });

  const getVIPTitle = (level) => {
    // currently bunny only has 6 levels
    if (config.features.VIP_CustomLevel_BUNNY && level < 7)
      return i18n.t("vip.bunny.level" + level);
    else return "VIP" + level;
  };

  const VipContent = ({ content, isCustom }) => {
    return isCustom ? (
      <CustomVIPContent>{Common.addComma(content)}</CustomVIPContent>
    ) : (
      <VIPContent>{Common.addComma(content)}</VIPContent>
    );
  };

  const VipTitle = ({ title }) => {
    return <TitleContent>{title}</TitleContent>;
  };

  return (
    <Container>
      <OuterWrap>
        <Title>
          <TitleIcon></TitleIcon>
          VIP
        </Title>
      </OuterWrap>
      <InnerWrap>
        {vipBenefit.items && vipBenefit.items.length > 0 && (
          <React.Fragment>
            <VIPContainer>
              <VIPHeaderRowContainer isHeaderOutside={isHeaderOutside}>
                <VipTitle title={i18n.t("T13.vip.level")} />
                <VipTitle title={i18n.t("T13.vip.levelKeepAccumulateBetAmount")} />
                <VipTitle title={i18n.t("T13.vip.levelKeepAccumulateDeposit")} />
                <VipTitle title={i18n.t("T13.vip.levelUpAccumulateBetAmount")} />
                <VipTitle title={i18n.t("T13.vip.levelUpAccumulateDeposit")} />
                <VipTitle title={i18n.t("T13.vip.birthBenefit")} />
                <VipTitle title={i18n.t("T13.vip.promotionBenefit")} />
                <VipTitle title={i18n.t("T13.vip.quarterlyBenefit")} />
              </VIPHeaderRowContainer>
              <VIPListContainer isHeaderOutside={isHeaderOutside}>
                {vipBenefitList.map((data, index) => {
                  var isLastItem = false;
                  if (vipBenefit.items.length - 1 === index) {
                    isLastItem = true;
                  }
                  return (
                    <VIPRowContainer ref={isLastItem ? lastItemRef : null}>
                      <VipEmblemContainer>
                        <VIPLevelImage>
                          <img
                            alt={data.level + ".svg"}
                            src={
                              process.env.PUBLIC_URL +
                              `/assets/images/vip/${data.level}.svg`
                            }
                          />
                        </VIPLevelImage>
                        {getVIPTitle(data.level)}
                      </VipEmblemContainer>
                      <VipContent
                        isCustom={true}
                        content={data.levelKeepAccumulateBetAmount}
                      />
                      <VipContent
                        isCustom={true}
                        content={data.levelKeepAccumulateDeposit}
                      />
                      <VipContent
                        isCustom={true}
                        content={data.levelUpAccumulateBetAmount}
                      />
                      <VipContent
                        isCustom={true}
                        content={data.levelUpAccumulateDeposit}
                      />
                      <VipContent isCustom={true} content={data.birthBenefit} />
                      <VipContent
                        isCustom={true}
                        content={data.promotionBenefit}
                      />
                      <VipContent
                        isCustom={true}
                        content={data.quarterlyBenefit}
                      />
                    </VIPRowContainer>
                  );
                })}
              </VIPListContainer>
            </VIPContainer>
            <VIPRebateContainer>
              <VIPRebateHeader>
                <VipTitle title={i18n.t("vip.vipBenefit")} />
                <VipTitle title={i18n.t("vip.cardGameRebate")} />
                <VipTitle title={i18n.t("vip.liveDealerRebate")} />
                <VipTitle title={i18n.t("vip.lotteryRebate")} />
                <VipTitle title={i18n.t("vip.slotRebate")} />
                <VipTitle title={i18n.t("vip.sportsRebate")} />
                <VipTitle title={i18n.t("vip.virtualSportsRebate")} />
              </VIPRebateHeader>

              {vipBenefitList.map((data, index) => {
                return (
                  <VIPRebateRow key={index}>
                    <VipContent content={data.level} />
                    <VipContent content={data.cardGameRebate + "%"} />
                    <VipContent content={data.liveDealerRebate + "%"} />
                    <VipContent content={data.lotteryRebate + "%"} />
                    <VipContent content={data.slotRebate + "%"} />
                    <VipContent content={data.sportsRebate + "%"} />
                    <VipContent content={data.virtualSportsRebate + "%"} />
                  </VIPRebateRow>
                );
              })}
            </VIPRebateContainer>
          </React.Fragment>
        )}
      </InnerWrap>
    </Container>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    getVIP: () => dispatch(generalAction.getVIP()),
  };
};
const mapStateToProps = (state) => {
  return "";
};
export default connect(mapStateToProps, mapDispatchToProps)(VIP);
