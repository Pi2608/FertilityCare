import TreatmentCard from '@components/Card/TreatmentCard/TreatmentCard';
import { useNavigate } from 'react-router-dom';
import IUI from '@asset/iui.jpg';
import IVF from '@asset/ivf.jpg';
import './TreatmentMethod.css';
import ApiGateway from '../../../features/service/apiGateway';
import React, { useEffect, useState } from 'react';


function TreatmentMethod() {
    const navigate = useNavigate();


    const [treatmentData, setTreatmentData] = useState([]);


    useEffect(() => {
        fetchTreatmentData();
    }, []);
   
    const fetchTreatmentData = async () => {
        try {
            const response = await ApiGateway.getActiveTreatments();
            const data = response.data;
   
            const imageMap = {
                'IVF': IVF,
                'IUI': IUI
            };
   
            const formatted = data.map(service => ({
                title: `Phương pháp điều trị ${service.name}`,
                content: service.description,
                info: [
                    // `Giá: ${service.price.toLocaleString()} VNĐ`,
                    // `Tỷ lệ thành công: ${service.successRate}%`,
                    service.specifications
                ],
                miniTitle: `${service.name} - Giải pháp điều trị`,
                image: imageMap[service.name] || IVF // fallback nếu không khớp
            }));
            console.log("Formatted Treatment Data:", formatted);
            setTreatmentData(formatted);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách phương pháp điều trị:", error);
        }
    };
   




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
                <button className="primary" onClick={() => navigate("/")}>Đặt lịch tư vấn</button>
                <button className="secondary" onClick={() => navigate("/homepage/doctor-list")}>Đội ngũ bác sĩ</button>
            </section>
            <div className="cards">
                {treatmentData.map((item, index) => (
                    <TreatmentCard
                        key={index}
                        treatmentId={1}
                        title={item.title}
                        content={item.content}
                        image={item.image}
                        miniTitle={item.miniTitle}
                    />
                ))}
            </div>
        </div>
    );
}


export default TreatmentMethod;



