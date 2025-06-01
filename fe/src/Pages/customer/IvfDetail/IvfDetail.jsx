import React, { useState } from 'react';
import './IvfDetail.css';

const IvfDetail = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const pageData = {
    title: "Thụ Tinh Trong Ống Nghiệm (IVF)",
    subtitle: "Phác đồ điều trị IVF hàu chuyên cho các cặp vợ chồng hiếm muộn",
    description: "Thụ tinh trong ống nghiệm (IVF) là một trong những phương pháp điều trị hiếm muộn hiệu quả nhất, giúp hàng triệu cặp vợ chồng trên toàn thế giới thực hiện ước mơ làm cha mẹ.",
    
    suitable: [
      "Cặp vợ chồng bị vô sinh do vấn đề ống dẫn trứng.",
      "Vô sinh do yếu tố nam (số lượng hoặc chất lượng tinh trùng thấp).",
      "Vô sinh do lạc nội mạc tử cung.",
      "Các cặp vợ chồng muốn sàng lọc di truyền trước khi mang thai.",
      "Các phương pháp điều trị hiếm muộn khác không thành công"
    ],

    overview: {
      definition: {
        title: "IVF Là Gì?",
        content: "Thụ tinh trong ống nghiệm (IVF) là một phương pháp điều trị hiếm muộn trong đó trứng được lấy ra khỏi buồng trứng và thụ tinh với tinh trùng trong phòng thí nghiệm. Sau khi thụ tinh, phôi được nuôi cấy trong vài ngày trước khi chuyển vào tử cung để làm tổ và phát triển."
      },
      benefits: {
        title: "Lợi Ích Của IVF",
        items: [
          { title: "Tỷ Lệ Thành Công Cao", desc: "IVF có tỷ lệ thành công cao so với nhiều phương pháp khác để điều trị hiếm muộn khác, đặc biệt đối với những cặp vợ chồng trẻ tuổi." },
          { title: "Giải Pháp Cho Nhiều Nguyên Nhân Vô Sinh", desc: "IVF có thể giúp hầu hết những nguyên nhân vô sinh khác nhau, từ rối loạn nội tiết nữ giới đến vấn đề sức khỏe tinh thần của nam giới." },
          { title: "Sàng Lọc Di Truyền", desc: "IVF cho phép sàng lọc di truyền trước khi làm tổ (PGT) để giảm nguy cơ bệnh di truyền cho trẻ." },
          { title: "Kiểm Soát Thời Gian", desc: "IVF cho phép kiểm soát thời gian mang thai tối ưu hơn, đặc biệt quan trọng đối với phụ nữ có thể lớn tuổi hoặc có kế hoạch nghề nghiệp." }
        ]
      },
      advantages: {
        title: "Phác Đồ IVF Của Chúng Tôi",
        items: [
          { title: "Kích Thích Buồng Trứng", desc: "Sử dụng thuốc để tích thích buồng trứng sản xuất nhiều trứng hơn, tăng cơ hội thành công." },
          { title: "Lấy Trứng", desc: "Thu thập trứng từ buồng trứng thông qua khoa học hiện đại để tăng hiệu quả." },
          { title: "Thụ Tinh", desc: "Trứng được thụ tinh với tinh trùng trong phòng thí nghiệm, tạo ra phôi." },
          { title: "Nuôi Cấy Phôi", desc: "Phôi được nuôi cấy trong 3-5 ngày trong điều kiện tối ưu để phát triển." },
          { title: "Chuyển Phôi", desc: "Phôi chất lượng tốt nhất được chuyển vào tử cung, một thủ thuật đơn giản và không đau." },
          { title: "Hỗ Trợ Giai Đoạn Hoàng Thể", desc: "Thuốc hỗ trợ để chuẩn bị nội mạc tử cung và tăng cơ thành công cần làm tổ." }
        ]
      }
    },

    process: {
      title: "Quy Trình IVF",
      description: "Quy trình IVF thường kéo dài khoảng 2-3 tuần cho một chu kỳ hoàn chỉnh. Dưới đây là tổng quan chi tiết về từng bước:",
      steps: [
        {
          title: "Kích Thích Buồng Trứng",
          desc: "Sử dụng hàng lô axy IVF tiêm vào cơ thể để tích thích buồng trứng sản xuất nhiều trứng.",
          duration: "8-14 ngày"
        },
        {
          title: "Lấy Trứng", 
          desc: "Thu thập trứng từ buồng trứng bằng thủ thuật nội soi thông qua âm đạo.",
          duration: "20-30 phút cho thủ thuật"
        },
        {
          title: "Thụ Tinh",
          desc: "Kết hợp trứng với tinh trùng trong phòng thí nghiệm để tạo ra phôi."
        },
        {
          title: "Nuôi Cấy Phôi",
          desc: "Theo dõi và phát triển phôi trong 3-5 ngày."
        },
        {
          title: "Chuyển Phôi",
          desc: "Chuyển phôi tốt nhất vào tử cung qua thủ thuật đơn giản."
        }
      ]
    },

    successRates: {
      title: "Tỷ Lệ Thành Công IVF",
      description: "Tỷ lệ thành công IVF phụ thuộc vào nhiều yếu tố, bao gồm tuổi, nguyên nhân vô sinh và tiền sử điều trị.",
      ageGroups: [
        { age: "Dưới 35 tuổi", rate: "52%", desc: "+8% cao hơn" },
        { age: "35-37 tuổi", rate: "42%", desc: "+7% cao hơn" },
        { age: "38-40 tuổi", rate: "33%", desc: "+6% cao hơn" },
        { age: "41-42 tuổi", rate: "18%", desc: "+5% cao hơn" },
        { age: "Trên 42 tuổi", rate: "7%", desc: "+3% cao hơn" }
      ],
      factors: [
        "Tuổi của người phụ nữ",
        "Chất lượng tinh trùng",
        "Nguyên nhân vô sinh",
        "Tiền sử điều trị trước đó",
        "Lối sống và sức khỏe tổng thể"
      ]
    },

    faq: {
      title: "Câu Hỏi Thường Gặp Về IVF",
      questions: [
        {
          q: "IVF có đau không?",
          a: "Hầu hết các bước quan cần qua IVF đều cho thấy mức độ đau nhẹ đến trung bình hoặc không đau. Thủ thuật lấy trứng được thực hiện dưới gây mê nhẹ, vì vậy bạn sẽ không cảm thấy đau trong quá trình này."
        },
        {
          q: "Bao nhiêu cơ chế trả ốm IVF không?",
          a: "Bảo hiểm y tế ở Việt Nam thường không chi trả cho điều trị hiếm muộn, bao gồm IVF. Tuy nhiên, một số cơ sở hiến máu có thể chi trả một phần chi phí. Chúng tôi khuyến bạn nên kiểm tra với công ty bảo hiểm của mình để biết chi tiết."
        },
        {
          q: "Tôi có cơ hội mang thai nhiều không?",
          a: "Cơ hội mang thai bội số (sinh đôi, ba...) là khoảng 20-25% trong chu kỳ IVF đơn lẻ, tùy thuộc vào số lượng phôi được chuyển."
        },
        {
          q: "IVF có an toàn không?",
          a: "IVF là một phương pháp điều trị an toàn khi được thực hiện bởi các chuyên gia có kinh nghiệm. Tuy nhiên, như mọi thủ thuật y tế, có thể có một số rủi ro nhỏ."
        }
      ]
    }
  };

  const renderOverview = () => (
    <div className="content-section">
      <div className="content">
        <div className="definition-section">
          <h2>{pageData.overview.definition.title}</h2>
          <p>{pageData.overview.definition.content}</p>
          <div className="suitable">
            <h4>IVF Phù Hợp Với Ai?</h4>
            <ul>
              { pageData.suitable.map((item, index) => (
                <li key={index}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48"><g fill="none" stroke="#e11d48" stroke-linejoin="round" stroke-width="4"><path d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"/><path stroke-linecap="round" d="m16 24l6 6l12-12"/></g></svg>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="benefits-section">
          <h2>{pageData.overview.benefits.title}</h2>
          <div className="benefits-grid">
            {pageData.overview.benefits.items.map((item, index) => (
              <li key={index} className="benefit-card">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><g fill="none" stroke="#e11d48" stroke-linejoin="round" stroke-width="4"><path d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"/><path stroke-linecap="round" d="m16 24l6 6l12-12"/></g></svg>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>

      <div className="advantages-section">
        <h2>{pageData.overview.advantages.title}</h2>
        <div className="advantages-grid">
          {pageData.overview.advantages.items.map((item, index) => (
            <div key={index} className="advantage-card">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="#e11d48" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7m-2-12l7 7"/></svg>
                <h3>{item.title}</h3>
              </div>
              <p>{item.desc}</p>
            </div>
          ))}
          <button className='primary-btn'>Tìm hiểu các bước tiếp theo</button>
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
              {step.duration && <span className="duration">{step.duration}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSuccessRates = () => (
    <div className="content-section">
      <h2>{pageData.successRates.title}</h2>
      <p className="rates-description">{pageData.successRates.description}</p>
      
      <div className="rates-table">
        <h3>Tỷ Lệ Thành Công Theo Độ Tuổi</h3>
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
        {pageData.faq.questions.map((item, index) => (
          <div key={index} className="faq-item">
            <h3 className="faq-question">{item.q}</h3>
            <p className="faq-answer">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return renderOverview();
      case 'process':
        return renderProcess();
      case 'success-rates':
        return renderSuccessRates();
      case 'faq':
        return renderFAQ();
      default:
        return renderOverview();
    }
  };

  const navItems = [
    { key: 'overview', label: 'Tổng Quan' },
    { key: 'process', label: 'Quy Trình' },
    { key: 'success-rates', label: 'Tỷ Lệ Thành Công' },
    { key: 'faq', label: 'Câu Hỏi Thường Gặp' }
  ];

  return (
    <div className="ivf-detail-container">

      <div className="breadcrumb">
        <span>Phương Pháp Điều Trị</span> / <span>Thụ Tinh Trong Ống Nghiệm (IVF)</span> - <span>Phác Đồ 1</span>
      </div>

      <div className="page-title-section">
        <h1>{pageData.title}</h1>
        <p className="subtitle">{pageData.subtitle}</p>
      </div>

      <div className="brief-description">
        <h2>Giải Pháp Hiệu Quả Cho Hiếm Muộn</h2>
        <p>{pageData.description}</p>
        <div className="action-buttons">
          <button className="primary-btn">Các Bước Tiếp Theo</button>
          <button className="secondary-btn">Đặt Lịch Tư Vấn</button>
        </div>
      </div>

      <div className="nav-bar">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${activeTab === item.key ? 'active' : ''}`}
            onClick={() => setActiveTab(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="main-content">
        {renderContent()}
      </div>

    </div>
  );
};

export default IvfDetail;