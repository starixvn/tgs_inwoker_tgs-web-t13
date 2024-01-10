import React from "react";
import config from "../../../config/config";
import i18n from "../../../utils/i18n";

function getBrand() {
  switch (config.brand) {
    case "TEP":
      return "TEP";
    case "PGG":
      return "Pega Gaming";
    default:
      return config.brand;
  }
}

const english = () => {
  return (
    <>
      <h1>Responsible Gaming</h1>
      <p>
        {getBrand()} is committed to being the very best online entertainment
        group in the world. This means doing everything possible to give our
        players an enjoyable, responsible and safe gaming experience.
        <br />
        <br />
        {getBrand()} fully supports responsible gaming and to ensure that you
        continue to enjoy safe and manageable play, please bear the following in
        mind:
        <br />
        1. Gambling should be seen as entertainment and not as a means to make
        money;
        <br />
        2. Keep track of the time and money you spend while gambling.
        <br />
        <br />
        We have also implemented the following strict rules to ensure a
        responsible gaming environment:
      </p>
      <h2>Underage Gaming</h2>
      <p>
        Playing with us is restricted to persons over the age of 18, or the
        legal age of majority in their jurisdiction, whichever is greater.
      </p>
      <h2>Player Self-Exclusion</h2>
      <p>
        If you are concerned about your gambling behavior, you may choose to
        lock your gaming account. During this time, we will also take all
        reasonable steps to ensure you do not receive any promotional material.
        <br />
        <br />
        If you are concerned about your gambling behavior, please consider one
        of the following options:
        <br />
        a. A minimum of 24 hours “Take a break” period
        <br />
        b. A minimum six (6) month self-exclusion period
      </p>
      <h2>Deposit Limits</h2>
      <p>
        Players also have the option of adjusting their maximum deposit limits
        at any time.
        <br />
        Limits can be set for the following periods:
        <br />
        a. Daily
        <br />
        b. Weekly
        <br />
        c. Monthly
        <br />
        To change your deposit limits or to request exclusion, please contact
        our 24/7 Support Team.
        <br />
        <br />
        If you are worried about your gaming behavior, please visit the
        following links for professionals to assist you.
        <br />
        Gambling Therapy:{" "}
        <a href="www.gamblingtherapy.org">www.gamblingtherapy.org</a>
        <br />
        Responsible Gambling Council:{" "}
        <a href="www.responsiblegambling.org">www.responsiblegambling.org</a>
      </p>
      <h2>
        Please enjoy gaming responsibly.
        <br />
        <br />
        Responsible Gaming, Stay in control.
      </h2>
    </>
  );
};

const chinese = () => {
  return (
    <>
      <h1>负责任的游戏</h1>
      <p>
        {getBrand()}{" "}
        致力成为全球最优秀的线上娱乐集团。这意味着我们会尽一切可能为玩家提供愉快、负责任和安全的游戏体验。
        <br />
        <br />
        {getBrand()}{" "}
        完全支持负责任的游戏，为了确保您能持续享受安全可控的游戏，请记住以下事项：
        <br />
        1. 将赌博视为娱乐，而非赚钱手段；
        <br />
        2. 注意您在赌博中花费的时间和金钱。
        <br />
        <br />
        我们还制定了严格的规定，以确保负责任的游戏环境：
      </p>
      <h2>未成年人游戏</h2>
      <p>
        与我们一起游戏仅限于年满18岁或其司法管辖区法定成年年龄的人士，以年龄较大者为准。
      </p>
      <h2>玩家自我排除</h2>
      <p>
        如果您对自己的赌博行为感到担忧，您可以选择锁定您的游戏帐户。在此期间，我们也将採取一切合理步骤确保您不会收到任何促销材料。
        <br />
        <br />
        如果您对自己的赌博行为感到担忧，请考虑以下选项之一：
        <br />
        a. 至少24小时的「休息一下」期限
        <br />
        b. 至少六（6）个月的自我排除期限
      </p>
      <h2>存款限制</h2>
      <p>
        玩家还可以随时调整其最大存款限制。
        <br />
        限制可以设定以下周期：
        <br />
        a. 每日
        <br />
        b. 每週
        <br />
        c. 每月
        <br />
        要更改您的存款限制或请求排除，请联繫我们的全天候支援团队。
        <br />
        <br />
        如果您担心自己的游戏行为，请访问以下专业人士协助您的连结。
        <br />
        赌博治疗： <a href="www.gamblingtherapy.org">www.gamblingtherapy.org</a>
        <br />
        负责任博彩委员会：{" "}
        <a href="www.responsiblegambling.org">www.responsiblegambling.org</a>
      </p>
      <h2>
        请负责任地享受游戏。
        <br />
        <br />
        负责任的游戏，掌控一切。
      </h2>
    </>
  );
};

const vietnam = () => {
  return (
    <>
      <h1>chơi game có trách nhiệm</h1>
      <p>
        {getBrand()} cam kết trở thành tập đoàn giải trí trực tuyến tốt nhất thế
        giới. Điều này có nghĩa là chúng tôi làm mọi thứ có thể để mang đến cho
        người chơi trải nghiệm chơi game thú vị, có trách nhiệm và an toàn.
        <br />
        <br />
        {getBrand()} hỗ trợ đầy đủ việc chơi game có trách nhiệm. Để đảm bảo bạn
        có thể tiếp tục tận hưởng việc chơi game an toàn và có kiểm soát, vui
        lòng ghi nhớ những điều sau:
        <br />
        1. Hãy coi cờ bạc là trò giải trí chứ không phải là phương tiện kiếm
        tiền;
        <br />
        2. Hãy để ý đến thời gian và số tiền bạn dành cho cờ bạc.
        <br />
        <br />
        Chúng tôi cũng có các quy định nghiêm ngặt để đảm bảo môi trường chơi
        game có trách nhiệm:
      </p>
      <h2>trò chơi dành cho trẻ vị thành niên</h2>
      <p>
        Chơi với chúng tôi được giới hạn ở những người trên 18 tuổi hoặc độ tuổi
        hợp pháp trong khu vực pháp lý của họ, tùy theo độ tuổi nào lớn hơn.
      </p>
      <h2>Người chơi tự loại trừ</h2>
      <p>
        Nếu lo ngại về hành vi cờ bạc của mình, bạn có tùy chọn khóa tài khoản
        trò chơi của mình. Chúng tôi cũng sẽ thực hiện tất cả các bước hợp lý để
        đảm bảo rằng bạn không nhận được bất kỳ tài liệu quảng cáo nào trong
        thời gian này.
        <br />
        <br />
        Nếu bạn lo lắng về hành vi cờ bạc của mình, hãy cân nhắc một trong các
        lựa chọn sau:
        <br />
        a. Thời gian “nghỉ ngơi” ít nhất là 24 giờ
        <br />
        b. Thời gian tự cấm ít nhất sáu (6) tháng
      </p>
      <h2>Giới hạn tiền gửi</h2>
      <p>
        Người chơi cũng có thể điều chỉnh giới hạn tiền gửi tối đa của mình bất
        cứ lúc nào.
        <br />
        Giới hạn có thể được đặt cho các khoảng thời gian sau:
        <br />
        a.hằng ngày
        <br />
        b. Hàng tuần
        <br />
        c. Hàng tháng
        <br />
        Để thay đổi giới hạn tiền gửi của bạn hoặc yêu cầu loại trừ, vui lòng
        liên hệ với nhóm hỗ trợ 24/7 của chúng tôi.
        <br />
        <br />
        Nếu bạn lo lắng về hành vi chơi game của mình, vui lòng truy cập các
        liên kết sau để các chuyên gia có thể giúp bạn.
        <br />
        Trị liệu cờ bạc:{" "}
        <a href="www.gamblingtherapy.org">www.gamblingtherapy.org</a>
        <br />
        Hội đồng cờ bạc có trách nhiệm:{" "}
        <a href="www.responsiblegambling.org">www.responsiblegambling.org</a>
      </p>
      <h2>
        Hãy tận hưởng trò chơi một cách có trách nhiệm.
        <br />
        <br />
        Chơi có trách nhiệm và kiểm soát.
      </h2>
    </>
  );
};

const Responsible = () => {
  const switchLanguage = () => {
    switch (i18n.language) {
      case "zh-TW":
      case "zh-CN":
        return chinese();
      case "vi-VN":
        return vietnam();
      default:
        return english();
    }
  };

  return switchLanguage();
};

export default Responsible;
