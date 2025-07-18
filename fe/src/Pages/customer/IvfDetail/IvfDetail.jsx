import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiGateway from "../../../features/service/apiGateway";
import "./IvfDetail.css";

const IvfDetail = () => {
  const { treatmentId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [briefDescription, setBriefDescription] = useState("");
  const [successRate, setSuccessRate] = useState(null);
  const [treatmentSteps, setTreatmentSteps] = useState([]);
  const navigate = useNavigate();

  const pageData = {
    title: "Thụ Tinh Trong Ống Nghiệm (IVF)",
    subtitle: "Phác đồ điều trị IVF hàu chuyên cho các cặp vợ chồng hiếm muộn",
    description:
      "Thụ tinh trong ống nghiệm (IVF) là một trong những phương pháp điều trị hiếm muộn hiệu quả nhất, giúp hàng triệu cặp vợ chồng trên toàn thế giới thực hiện ước mơ làm cha mẹ.",

    suitable: [
      "Cặp vợ chồng bị vô sinh do vấn đề ống dẫn trứng.",
      "Vô sinh do yếu tố nam (số lượng hoặc chất lượng tinh trùng thấp).",
      "Vô sinh do lạc nội mạc tử cung.",
      "Các cặp vợ chồng muốn sàng lọc di truyền trước khi mang thai.",
      "Các phương pháp điều trị hiếm muộn khác không thành công",
    ],

    overview: {
      definition: {
        title: "IVF Là Gì?",
        content:
          "Thụ tinh trong ống nghiệm (IVF) là một phương pháp điều trị hiếm muộn trong đó trứng được lấy ra khỏi buồng trứng và thụ tinh với tinh trùng trong phòng thí nghiệm. Sau khi thụ tinh, phôi được nuôi cấy trong vài ngày trước khi chuyển vào tử cung để làm tổ và phát triển.",
      },
      benefits: {
        title: "Lợi Ích Của",
        items: [
          // { title: "Tỷ Lệ Thành Công Cao", desc: "IVF có tỷ lệ thành công cao so với nhiều phương pháp khác để điều trị hiếm muộn khác, đặc biệt đối với những cặp vợ chồng trẻ tuổi." },
          // { title: "Giải Pháp Cho Nhiều Nguyên Nhân Vô Sinh", desc: "IVF có thể giúp hầu hết những nguyên nhân vô sinh khác nhau, từ rối loạn nội tiết nữ giới đến vấn đề sức khỏe tinh thần của nam giới." },
          // { title: "Sàng Lọc Di Truyền", desc: "IVF cho phép sàng lọc di truyền trước khi làm tổ (PGT) để giảm nguy cơ bệnh di truyền cho trẻ." },
          // { title: "Kiểm Soát Thời Gian", desc: "IVF cho phép kiểm soát thời gian mang thai tối ưu hơn, đặc biệt quan trọng đối với phụ nữ có thể lớn tuổi hoặc có kế hoạch nghề nghiệp." }
        ],
      },
      advantages: {
        title: "Phác Đồ IVF Của Chúng Tôi",
        items: [
          {
            title: "Kích Thích Buồng Trứng",
            desc: "Sử dụng thuốc để tích thích buồng trứng sản xuất nhiều trứng hơn, tăng cơ hội thành công.",
          },
          {
            title: "Lấy Trứng",
            desc: "Thu thập trứng từ buồng trứng thông qua khoa học hiện đại để tăng hiệu quả.",
          },
          {
            title: "Thụ Tinh",
            desc: "Trứng được thụ tinh với tinh trùng trong phòng thí nghiệm, tạo ra phôi.",
          },
          {
            title: "Nuôi Cấy Phôi",
            desc: "Phôi được nuôi cấy trong 3-5 ngày trong điều kiện tối ưu để phát triển.",
          },
          {
            title: "Chuyển Phôi",
            desc: "Phôi chất lượng tốt nhất được chuyển vào tử cung, một thủ thuật đơn giản và không đau.",
          },
          {
            title: "Hỗ Trợ Giai Đoạn Hoàng Thể",
            desc: "Thuốc hỗ trợ để chuẩn bị nội mạc tử cung và tăng cơ thành công cần làm tổ.",
          },
        ],
      },
    },

    process: {
      title: "Quy Trình IVF",
      description:
        "Quy trình IVF thường kéo dài khoảng 2-3 tuần cho một chu kỳ hoàn chỉnh. Dưới đây là tổng quan chi tiết về từng bước:",
      steps: [
        {
          title: "Kích Thích Buồng Trứng",
          desc: "Sử dụng hàng lô axy IVF tiêm vào cơ thể để tích thích buồng trứng sản xuất nhiều trứng.",
          duration: "8-14 ngày",
          note: [
            {
              miniStep: "Thuốc Kích Thích Buồng Trứng",
              desc: "Bạn sẽ được kê đơn thuốc kích thích buồng trứng, thường được tiêm hàng ngày trong khoảng 8-14 ngày. Những thuốc này chứa hormone kích thích nang trứng (FSH) và/hoặc hormone hoàng thể hóa (LH) để kích thích buồng trứng sản xuất nhiều trứng hơn.",
            },
            {
              miniStep: "Theo Dõi Và Điều Chỉnh",
              desc: "Trong giai đoạn này, bạn sẽ có các cuộc hẹn theo dõi thường xuyên (thường là 2-3 ngày một lần) để kiểm tra sự phát triển của nang trứng thông qua siêu âm và xét nghiệm máu. Liều thuốc có thể được điều chỉnh dựa trên phản ứng của bạn.",
            },
            {
              miniStep: "Ngăn Chặn Rụng Trứng Sớm",
              desc: "Bạn cũng sẽ được dùng thuốc để ngăn cơ thể rụng trứng sớm, đảm bảo trứng có thể được lấy ra vào thời điểm tối ưu.",
            },
            {
              miniStep: "Kích Hoạt Sự Trưởng Thành Cuối Cùng",
              desc: 'Khi nang trứng đạt kích thước thích hợp (thường là khoảng 18-20mm), bạn sẽ được tiêm "mũi tiêm kích hoạt" để hoàn thiện sự trưởng thành của trứng và chuẩn bị cho việc lấy trứng.',
            },
          ],
        },
        {
          title: "Lấy Trứng",
          desc: "Thu thập trứng từ buồng trứng bằng thủ thuật nội soi thông qua âm đạo.",
          duration: "20-30 phút cho thủ thuật",
          note: [
            {
              miniStep: "Thủ Thuật Lấy Trứng",
              desc: "Đây là một thủ thuật ngoại trú được thực hiện dưới gây mê nhẹ. Bác sĩ sẽ sử dụng siêu âm để hướng dẫn một kim nhỏ qua thành âm đạo vào buồng trứng để hút trứng từ các nang trứng.",
            },
            {
              miniStep: "Sau Thủ Thuật",
              desc: "Sau khi lấy trứng, bạn sẽ được theo dõi trong phòng hồi phục trong vài giờ. Một số phụ nữ có thể cảm thấy đau nhẹ hoặc chuột rút, nhưng hầu hết có thể trở lại các hoạt động bình thường vào ngày hôm sau.",
            },
            {
              miniStep: "Thu Thập Tinh Trùng",
              desc: "Vào ngày lấy trứng, người bạn đời nam sẽ cung cấp mẫu tinh trùng, hoặc tinh trùng đã đông lạnh hoặc hiến tặng sẽ được chuẩn bị.",
            },
          ],
        },
        {
          title: "Thụ Tinh",
          desc: "Kết hợp trứng với tinh trùng trong phòng thí nghiệm để tạo ra phôi.",
          duration: "16-18 giờ để xác nhận thụ tinh",
          note: [
            {
              miniStep: "Thụ Tinh Thông Thường",
              desc: "Trong IVF thông thường, trứng và tinh trùng được đặt cùng nhau trong một đĩa nuôi cấy và tinh trùng thụ tinh trứng một cách tự nhiên.",
            },
            {
              miniStep: "Tiêm Tinh Trùng Vào Bào Tương Trứng (ICSI)",
              desc: "Trong một số trường hợp, đặc biệt là khi có vấn đề về tinh trùng, một kỹ thuật gọi là ICSI có thể được sử dụng. Trong ICSI, một tinh trùng được tiêm trực tiếp vào trứng để thụ tinh.",
            },
            {
              miniStep: "Kiểm Tra Thụ Tinh",
              desc: "Khoảng 16-18 giờ sau khi trứng và tinh trùng được đặt cùng nhau, phòng thí nghiệm sẽ kiểm tra xem trứng đã được thụ tinh chưa. Trứng đã thụ tinh (giờ được gọi là hợp tử) sẽ được nuôi cấy trong vài ngày.",
            },
          ],
        },
        {
          title: "Nuôi Cấy Phôi",
          desc: "Theo dõi và phát triển phôi trong 3-5 ngày.",
          duration: "3-5 ngày",
          note: [
            {
              miniStep: "Theo Dõi Sự Phát Triển",
              desc: "Phôi học viên sẽ theo dõi sự phát triển của phôi, đánh giá chất lượng dựa trên các yếu tố như số lượng tế bào, tốc độ phân chia và cấu trúc.",
            },
            {
              miniStep: "Phôi Ngày 3 vs. Phôi Nang Ngày 5",
              desc: "Phôi có thể được chuyển vào ngày thứ 3 (giai đoạn phân chia) hoặc được nuôi cấy đến ngày thứ 5 (giai đoạn phôi nang). Phôi nang ngày 5 thường có tỷ lệ làm tổ cao hơn.",
            },
            {
              miniStep: "Sàng Lọc Di Truyền (Tùy Chọn)",
              desc: "Trong một số trường hợp, phôi có thể được xét nghiệm để phát hiện bất thường di truyền trước khi chuyển. Điều này được gọi là Sàng lọc Di truyền Tiền làm tổ (PGT).",
            },
          ],
        },
        {
          title: "Chuyển Phôi",
          desc: "Chuyển phôi tốt nhất vào tử cung qua thủ thuật đơn giản.",
          duration: "5-10 phút cho thủ thuật",
          note: [
            {
              miniStep: "Thủ Thuật Chuyển Phôi",
              desc: "Chuyển phôi là một thủ thuật đơn giản, không đau và không cần gây mê. Bác sĩ sẽ sử dụng một ống catheter mỏng để đặt phôi vào tử cung của bạn, được hướng dẫn bằng siêu âm.",
            },
            {
              miniStep: "Số Lượng Phôi",
              desc: "Số lượng phôi được chuyển phụ thuộc vào nhiều yếu tố, bao gồm tuổi, chất lượng phôi và lịch sử điều trị. Xu hướng hiện nay là chuyển một phôi duy nhất để giảm nguy cơ đa thai.",
            },
            {
              miniStep: "Sau Chuyển Phôi",
              desc: "Sau khi chuyển phôi, bạn có thể được khuyên nghỉ ngơi trong một thời gian ngắn, nhưng hầu hết các hoạt động bình thường có thể được tiếp tục. Không cần nghỉ ngơi tại giường kéo dài.",
            },
            {
              miniStep: "Trữ Đông Phôi Dư",
              desc: "Bất kỳ phôi chất lượng tốt nào còn lại có thể được đông lạnh (trữ đông) để sử dụng trong tương lai.",
            },
          ],
        },
        {
          title: "Sau Chuyển Phôi",
          desc: "Sau khi chuyển phôi, bạn sẽ bắt đầu giai đoạn chờ đợi để xem liệu phôi có làm tổ thành công không.",
          duration: "9-14 ngày cho đến khi xét nghiệm thai",
          note: [
            {
              miniStep: "Hỗ Trợ Giai Đoạn Hoàng Thể",
              desc: "Bạn sẽ được kê đơn progesterone (và đôi khi là estrogen) để hỗ trợ niêm mạc tử cung và tạo điều kiện cho việc làm tổ. Những thuốc này thường được tiếp tục trong vài tuần nếu bạn mang thai.",
            },
            {
              miniStep: "Xét Nghiệm Thai",
              desc: "Khoảng 9-14 ngày sau khi chuyển phôi, bạn sẽ làm xét nghiệm máu để xác định xem bạn có mang thai không. Xét nghiệm máu đo nồng độ hormone hCG, được sản xuất khi phôi làm tổ.",
            },
            {
              miniStep: "Theo Dõi Sớm",
              desc: "Nếu xét nghiệm thai dương tính, bạn sẽ được theo dõi chặt chẽ trong những tuần đầu. Siêu âm sẽ được thực hiện để xác nhận thai trong tử cung và kiểm tra nhịp tim thai.",
            },
          ],
        },
      ],
    },

    successRates: {
      title: "Tỷ Lệ Thành Công",
      description:
        "Tỷ lệ thành công IVF phụ thuộc vào nhiều yếu tố, bao gồm tuổi, nguyên nhân vô sinh và tiền sử điều trị.",
      ageGroups: [],
      factors: [
        "Tuổi của người phụ nữ",
        "Chất lượng tinh trùng",
        "Nguyên nhân vô sinh",
        "Tiền sử điều trị trước đó",
        "Lối sống và sức khỏe tổng thể",
      ],
    },

    faq: {
      title: "Câu Hỏi Thường Gặp",
    },
  };

  const Content = ({ content }) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  const descMapping = (name) => {
    switch (name) {
      case "IVF":
        return "IVF - Thụ Tinh Trong Ống Nghiệm";
      case "IUI":
        return "IUI - Bơm Tinh Trùng Vào Buồng Tử Cung";
      default:
        return "Phương Pháp Điều Trị Hiếm Muộn";
    }
  };

  const subDescMapping = (name) => {
    switch (name) {
      case "IVF":
        return "IVF - In vitro fertilization - là một phương pháp điều trị hiếm muộn tiên tiến, giúp các cặp vợ chồng có con theo ý muốn.";
      case "IUI":
        return "IUI - Intrauterine Insemination - là một phương pháp thụ tinh nhân tạo hỗ trợ sinh sản hiện đại để giúp các cặp vợ chồng có con theo ý muốn.";
      default:
        return "Khám phá các phương pháp điều trị hiếm muộn tối ưu, thiết kế để giúc bạn xây dựng gia đình mơ ước.";
    }
  };

  const splitContent = (splitter, content) => {
    if (!content) return [];
    return content
      .split(`${splitter}`)
      .map((item) => item.trim())
      .filter((item) => item !== "");
  };

  useEffect(() => {
    Promise.all([getBriefDescription(), getTreatmentSteps()]);
  }, []);

  const getBriefDescription = async () => {
    try {
      const res = await ApiGateway.getTreatmentById(treatmentId);
      setBriefDescription(res);
      setSuccessRate(res.successRate); // <-- thêm dòng này
      console.log("Brief Description:", res);
      return res;
    } catch (error) {
      console.error("Error fetching treatment data:", error);
    }
  };

  const getTreatmentSteps = async () => {
    try {
      const res = await ApiGateway.getTreatmentSteps(treatmentId);
      setTreatmentSteps(res);
      console.log("Treatment Steps:", res);
      return res;
    } catch (error) {
      console.error("Error fetching treatment steps:", error);
    }
  };

  const renderOverview = () => (
    <div className="content-section">
      <div className="content">
        <div className="definition-section">
          <h2>Phương Pháp điều trị {briefDescription?.name}</h2>
          <p>
            <Content content={briefDescription?.description} />
          </p>
          <div className="suitable">
            <h4>{briefDescription?.name} Phù Hợp Với Ai?</h4>
            <ul>
              {splitContent("<br>", briefDescription?.targetPatient).map(
                (item, index) => (
                  <li key={index}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 48 48"
                    >
                      <g
                        fill="none"
                        stroke="#e11d48"
                        strokeLinejoin="round"
                        strokeWidth="4"
                      >
                        <path d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z" />
                        <path strokeLinecap="round" d="m16 24l6 6l12-12" />
                      </g>
                    </svg>
                    <p>{item}</p>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="treatment-protocol-section">
        <h2>Phác đồ {briefDescription?.name} của chúng tôi</h2>
        <div className="protocol-grid">
          {splitContent("<br><br>", briefDescription?.specifications)
            .filter((item) => item.trim().startsWith("Bước")) // bỏ dòng giới thiệu đầu tiên
            .map((item, index) => (
              <div key={index} className="protocol-step">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="#e11d48"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7m-2-12l7 7"
                    />
                  </svg>
                  <h3>
                    <Content content={splitContent("<br>", item)[0]} />
                  </h3>
                </div>
                <p>
                  {splitContent("<br>", item)
                    .slice(1)
                    .map((text, idx) => (
                      <Content key={idx} content={text} />
                    ))}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderProcess = () => (
    <div className="content-section">
      <h2>{pageData.process.title}</h2>
      <p className="process-description">{pageData.process.description}</p>

      <div className="process-steps">
        {pageData.process.steps.map((step, index) => (
          <div key={index} className="process-step">
            <div className="step-number">{index + 1}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              <div className="note">
                {step.note.map((noteItem, noteIndex) => (
                  <div key={noteIndex} className="note-item">
                    <p>
                      <strong>{noteItem.miniStep}:</strong>
                    </p>
                    <p> {noteItem.desc}</p>
                  </div>
                ))}
              </div>
              {step.duration && (
                <span className="duration">{step.duration}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSuccessRates = () => (
    <div className="content-section">
      <h2>{pageData.successRates.title}</h2>
      <p className="rates-description">
        Phương pháp này có tỷ lệ thành công trung bình là{" "}
        <strong>
          {successRate != null ? `${successRate}%` : "đang cập nhật..."}
        </strong>
      </p>

      <div className="rates-table">
        <div className="rates-grid">
          {pageData.successRates.ageGroups.map((group, index) => (
            <div key={index} className="rate-card">
              <div className="age-group">{group.age}</div>
              <div className="success-rate">{group.rate}</div>
              <div className="rate-change">{group.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="success-factors">
        <h3>Các Yếu Tố Ảnh Hưởng Đến Tỷ Lệ Thành Công</h3>
        <ul>
          {pageData.successRates.factors.map((factor, index) => (
            <li key={index}>{factor}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className="content-section">
      <h2>{pageData.faq.title}</h2>
      <div className="faq-list">
        {parseFAQ(briefDescription?.faq).map((item, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{item.q}</h3>
            <p className="faq-answer">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "process":
        return renderProcess();
      case "success-rates":
        return renderSuccessRates();
      case "faq":
        return renderFAQ();
      default:
        return renderOverview();
    }
  };

  const parseFAQ = (faqRaw) => {
    if (!faqRaw) return [];

    const rawPairs = faqRaw.split("<br><br>");
    const questions = [];

    rawPairs.forEach((pair) => {
      const parts = pair.split("<br>");
      if (parts.length >= 2) {
        questions.push({
          q: parts[0].trim(),
          a: parts.slice(1).join("<br>").trim(), // đề phòng có nhiều dòng hơn
        });
      }
    });

    return questions;
  };

  const navItems = [
    { key: "overview", label: "Tổng Quan" },
    { key: "success-rates", label: "Tỷ Lệ Thành Công" },
    { key: "faq", label: "Câu Hỏi Thường Gặp" },
  ];

  return (
    <div className="ivf-detail-container">
      <div className="breadcrumb">
        <span>Phương Pháp Điều Trị</span> /{" "}
        <span>{briefDescription?.name}</span>
      </div>

      <div className="page-title-section">
        <h1>{descMapping(briefDescription?.name)}</h1>
        <div className="subtitle-section">
          <p className="subtitle">
            <span>Chi phí</span>
            <span>{formatNumber(briefDescription?.price)} VND</span>
          </p>
        </div>
      </div>
      <div className="brief-description">
        <h2>Giải Pháp Hiệu Quả Cho Hiếm Muộn</h2>
        <p>{subDescMapping(briefDescription?.name)}</p>
      </div>
      <div className="nav-bar">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${activeTab === item.key ? "active" : ""}`}
            onClick={() => setActiveTab(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default IvfDetail;
