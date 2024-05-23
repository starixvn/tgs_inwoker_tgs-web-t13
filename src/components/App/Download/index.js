import React, { useState, useEffect } from "react";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
import { Dialog } from "@material-ui/core";
import config from "../../../config/config";
import QRCode from "react-qr-code";
import { useSnackbar } from "notistack";
import { utility } from "../../../utils/utility";

const Container = styled.div`
  width: 100%;
  height: 818px;
  position: relative;
  background: url(${process.env.PUBLIC_URL + `/assets/images/download/bg.png`})
    no-repeat;
  background-position: top;
  background-size: auto;
  position: relative;
  display: flex;
  justify-content: center;
  color: #fff;
  margin-bottom: 100px;
`;

const ContentPlacedHere = styled.div`
  width: 1280px;
  position: relative;
`;

const TheFirstSection = styled.div`
  display: flex;
  min-height: 150px;
  justify-content: flex-end;
  margin-top: 100px;
`;

const TheSecondSection = styled(TheFirstSection)`
  min-height: 50px;
  margin-top: 30px;
`;

const FirstSectionContent = styled.div`
  display: flex;
  align-items: center;
  padding-right: 175px;
  flex-direction: column;
  gap: 30px;
`;

const SectionContentItem = styled.div`
  padding-left: 15px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
  justify-content: flex-start;
  gap: 20px;
`;

const InstallationGuideButton = styled.div`
  color: #fff;
  background: #cf2029;
  border-radius: 75px;
  padding: 10px 20px;
  cursor: pointer;
  user-select: none;
  width: 225px;
  text-align: center;
  filter: drop-shadow(1px 1px 8px #cf2029ba);
`;

const Text = styled.div`
  font-size: 21px;
  padding-top: 4px;
`;

const Icons = styled.div`
  width: 40px;
  height: 40px;

  background: #fff;
  mask: url(${({ icon }) => {
      return (
        process.env.PUBLIC_URL + `/assets/images/download/icons/${icon}.png`
      );
    }})
    no-repeat center / contain;
  background-size: 100%;
`;

const DownloadTitleSection = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const SupportIcon = styled(Icons)`
  height: 30px;
  width: 30px;
`;

const TitleText = styled(Text)`
  font-size: 34px;
  margin-left: 10px;
  font-weight: bold;
`;

const ThirdSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ThirdSectionText = styled.div`
  font-size: 28px;
  padding: 10px 0px;
`;

const CustomModal = styled(Dialog)`
  .MuiBackdrop-root {
  }

  .MuiDialog-paper {
    border-radius: 16px;
    background: #f6f8f7;
    min-height: 200px;
  }
`;

const DialogTitle = styled.div`
  background: #f6f8f7;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  font-size: 20px;
  font-weight: bold;
  justify-content: space-between;
`;

const DialogContent = styled.div`
  padding: 40px;
  font-size: 20px;
`;

const DialogTitle2 = styled(DialogTitle)`
  background: ${({ theme }) => theme.primary};
  color: white;
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: 30px;
`;

const DeviceGuide = styled.div`
  padding-bottom: 20px;
`;

const DownloadSection = styled.div`
  display: flex;
  justify-content: center;
`;

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  align-items: center;
`;

const DeviceText = styled.div`
  padding: 20px 0px;
  font-size: 28px;
`;

const QRCodeHolder = styled.div`
  height: 125px;
  width: 125px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 24px;
  border: solid 1px rgba(0, 0, 0, 0.5);
  background: #fff;
`;

const DownloadButton = styled.div`
  color: #fff;
  background: #cf2029;
  border-radius: 75px;
  padding: 5px 10px;
  cursor: pointer;
  user-select: none;
  width: 160px;
  text-align: center;
  filter: drop-shadow(1px 1px 8px #cf2029ba);
`;

const PointlessShit = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
`;

const HiddenDialogContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DeviceName = styled.div`
  width: 80px;
  font-weight: bold;
`;

const Links = styled.div`
  width: 325px;
  cursor: pointer;
  font-size: 15px;
`;

const DownloadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Download = () => {
  const [open, setOpen] = useState(false);
  const [download, setDownload] = useState([]);

  const [pointlessDialog, setPointlessDialog] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  function getJsonData() {
    return fetch(config.configUrl + "version_" + config.brand + ".json")
      .then((response) => response.json())
      .then((responseJson) => {
        setDownload(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function copyStupidLink(link) {
    enqueueSnackbar(i18n.t("pointless.copy"), {
      variant: "success",
    });
    utility.copy(link);
  }

  useEffect(() => {
    if (download.length === 0) {
      getJsonData();
    } else {
    }
  }, []);

  function logoSwitcher(brand) {
    switch (brand) {
      case "Atinbet":
        return "Atinbet";
      default:
        return "PB";
    }
  }

  return (
    <Container>
      <ContentPlacedHere>
        <TheFirstSection>
          <FirstSectionContent>
            <RowContainer>
              <SupportIcon icon="support" />
              <Text>{i18n.t("download.supported")}:</Text>
            </RowContainer>
            <RowContainer>
              <SectionContentItem>
                <Icons icon="ios" />
              </SectionContentItem>
              <SectionContentItem>
                <Icons icon="android" />
              </SectionContentItem>
              <SectionContentItem>
                <InstallationGuideButton
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  {i18n.t("download.openGuide")}
                </InstallationGuideButton>
              </SectionContentItem>
            </RowContainer>
          </FirstSectionContent>
        </TheFirstSection>
        <TheSecondSection>
          <FirstSectionContent>
            <RowContainer>
              <Icons icon="download" />
              <Text>{i18n.t("download.downloadMethod")}</Text>
            </RowContainer>
          </FirstSectionContent>
        </TheSecondSection>
        <DownloadContainer>
          <DownloadSection>
            {download.map((data, index) => {
              return (
                <QRCodeContainer>
                  <QRCodeHolder>
                    <QRCode size={100} value={data.link}></QRCode>
                  </QRCodeHolder>
                  <DeviceText>{data.platform}</DeviceText>
                  <DownloadButton
                    onClick={() => {
                      window.open(data.link, "_blank");
                    }}
                  >
                    {i18n.t("download.title")}
                  </DownloadButton>
                </QRCodeContainer>
              );
            })}
          </DownloadSection>
          <HiddenDialogContainer>
            {config.features.Download_PointlessDialog && (
              <>
                <QRCodeContainer>
                  <QRCodeHolder>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        `/assets/images/download/brand/${logoSwitcher(
                          config.brand
                        )}_logo.png`
                      }
                      alt="download section"
                    />
                  </QRCodeHolder>
                  <DeviceText>{i18n.t("pointless.link")}</DeviceText>
                  <DownloadButton
                    onClick={() => {
                      setPointlessDialog(true);
                    }}
                  >
                    {i18n.t("download.title")}
                  </DownloadButton>
                </QRCodeContainer>
                <CustomModal
                  maxWidth="md"
                  open={pointlessDialog}
                  onClose={() => {
                    setPointlessDialog(false);
                  }}
                >
                  <DialogTitle2>
                    <div>{i18n.t("pointless.download")}</div>
                    <CloseButton
                      onClick={() => {
                        setPointlessDialog(false);
                      }}
                    >
                      ✖
                    </CloseButton>
                  </DialogTitle2>
                  <DialogContent>
                    {download.map((data, index) => {
                      return (
                        <PointlessShit>
                          <DeviceName>{data.platform}</DeviceName>
                          <Links
                            onClick={() => {
                              copyStupidLink(data.link);
                            }}
                          >
                            {data.link}
                          </Links>
                        </PointlessShit>
                      );
                    })}
                  </DialogContent>
                </CustomModal>
              </>
            )}
          </HiddenDialogContainer>
        </DownloadContainer>
      </ContentPlacedHere>
      <CustomModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        maxWidth="md"
      >
        <DialogTitle2>
          <div>{i18n.t("download.openGuide")}</div>
          <CloseButton
            onClick={() => {
              setOpen(false);
            }}
          >
            ✖
          </CloseButton>
        </DialogTitle2>
        <DialogContent>
          <DeviceGuide>
            {i18n.t("download.iphone.title")} <br />
            {i18n.t("download.iphone.point1")} <br />
            {i18n.t("download.iphone.point2")} <br />
          </DeviceGuide>
          <DeviceGuide>
            {i18n.t("download.android.title")} <br />
            {i18n.t("download.android.point1")} <br />
            {i18n.t("download.android.point2")} <br />
          </DeviceGuide>
        </DialogContent>
      </CustomModal>
    </Container>
  );
};

export default Download;
