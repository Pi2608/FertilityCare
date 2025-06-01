import React from 'react';
import TreatmentCard from '@components/Card/TreatmentCard/TreatmentCard';
import IUI from '@asset/iui.jpg';
import IVF from '@asset/ivf.jpg';
import './TreatmentMethod.css';

function TreatmentMethod() {

    const treatmentData = [
        {
            title: "Thụ Tinh Trong Ống Nghiệm (IVF)",
            content: "Phương pháp thụ tinh trong ống nghiệm IVF giúp thụ tinh và trứng thụ tinh bên ngoài cơ thể và chuyển phôi vào tử cung người phụ nữ.",
            image: IVF,
            info: [
                "Tỷ lệ thành công cao",
                "Phù hợp với nhiều nguyên nhân vô sinh",
                "Bao gồm kích thích buồng trứng và lấy trứng"
            ],
            miniTitle: "IVF - Giải Pháp Hiệu Quả Cho Vô Sinh"
        },
        {
            title: "Bơm Tinh Trùng Vào Buồng Tử Cung (IUI)",
            content: "Là phương pháp tiêm tinh trùng vào tử cung đúng thời điểm rụng trứng tăng cơ hội thụ thai.",
            image: IUI,
            info: [
                "Lý tưởng cho vô sinh nam",
                "Tỷ lệ thụ tinh cao hơn trong một số trường hợp",
                "Có thể sử dụng với số lượng tinh trùng rất thấp"
            ],
            miniTitle: "IUI - Phương pháp điều trị ít xâm lấn"
        },
        // {
        //     title: "Tiêm Tinh Trùng Vào Bào Tương Trứng (ICSI)",
        //     content: "ICSI là phương pháp tiêm trực tiếp tinh trùng vào trứng giúc khắc phụ những vấn đề vô sinh nam nghiêm trọng."
        // },
        // {
        //     title: "Kích Thích Rụng Trứng",
        //     content: "Kích thích rụng trứng là đối với các trường hợp rối loạn rụng trứng, PCOS hay chu kỳ kinh bêt."
        // },
        // {
        //     title: "Trữ Đông Trứng",
        //     content: "Bảo toàn khả năng sinh sản bằng cách đông trứng, thích hợp cho phụ nữ chưa muốn sinh con."
        // },
        // {
        //     title: "Sàng Lọc Di Truyền Tiền Làm Tổ (PGT)",
        //     content: "Giúm giảm nguy cơ thai lệch bẩm hoặc di truyền trước khi chuyển phôi vào tử cung."
        // }
    ];

    return (
        <div className="treatment-method">
            <header className="header">
                <h1>Phương Pháp Điều Trị Hiếm Muộn</h1>
                <p>Khám phá các phương pháp điều trị hiếm muộn tối ưu, thiết kế để giúc bạn xây dựng gia đình mơ ước</p>
            </header>
            <section className="introduction">
                <h2>Giải Pháp Điều Trị Hiếm Muộn Tiên Tiến</h2>
                <p>Chúng tôi cung cấp nhiều phương pháp điều trị hiếm muộn tiên tiến, được cá nhân hóa theo nhu cầu cụ thể của bạn. Đội ngũ chuyên gia của chúng tôi sẽ hướng dẫn bạn qua các lựa chọn để tìm ra phương pháp phù hợp nhất cho hành trình của bạn.</p>
            </section>
            <section className="button-section">
                <button className="primary">Đặt lịch tư vấn</button>
                <button className="secondary">Đội ngũ bác sĩ</button>
            </section>
            <div className="cards">
                {treatmentData.map((item, index) => (
                    <TreatmentCard 
                        key={index} 
                        title={item.title} 
                        content={item.content} 
                        image={item.image}
                        info={item.info}
                        miniTitle={item.miniTitle}
                    />
                ))}
            </div>
        </div>
    );
}

export default TreatmentMethod;
