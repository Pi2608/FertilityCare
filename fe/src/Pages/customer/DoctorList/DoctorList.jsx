import React, { useState, useEffect } from 'react';
import { Star, MapPin, Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MaleDoc from "@asset/male-fertility-specialist.png";
import FemaleDoc from "@asset/asian-female-doctor.png";
import axios from 'axios';
import './DoctorList.css';

const doctorsData = [
    {
        id: 1,
        name: "Bác sĩ Trần Văn Hải",
        specialty: "Chuyên khoa Phẫu thuật và IVF",
        rating: 4.9,
        reviews: 98,
        description: "Bác sĩ Hải chuyên về kỹ thuật thụ tinh trong ống nghiệm và phát triển phôi, với thành tích xuất sắc trong các ca phức tạp.",
        location: "Hồ Chí Minh, Việt Nam",
        lastUpdate: "22/05/2023",
        image: MaleDoc
    },
    {
        id: 2,
        name: "Bác sĩ Nguyễn Thị Minh",
        specialty: "Chuyên khoa Khám Sức Khỏe Tổng Quát",
        rating: 5.0,
        reviews: 127,
        description: "Bác sĩ Minh có hơn 15 năm kinh nghiệm trong lĩnh vực chuyên về khám sức khỏe tổng quát và sinh sản hỗ trợ, chuyên về các ca phức tạp.",
        location: "Hồ Chí Minh, Việt Nam",
        lastUpdate: "24/05/2023",
        image: FemaleDoc,
        tag: "Hàng Đầu"
    },
    {
        id: 3,
        name: "Bác sĩ Lê Thị Hương",
        specialty: "Chuyên khoa Nội tiết Sinh sản",
        rating: 4.8,
        reviews: 87,
        description: "Bác sĩ Hương chuyên về rối loạn nội tiết ảnh hưởng đến khả năng sinh sản và có kinh nghiệm điều trị vô sinh chứng buồng trứng đa nang.",
        location: "Hồ Chí Minh, Việt Nam",
        lastUpdate: "25/05/2023",
        image: FemaleDoc
    },
    {
        id: 4,
        name: "Bác sĩ Phạm Đức Thành",
        specialty: "Chuyên khoa Vi phẫu",
        rating: 4.7,
        reviews: 76,
        description: "Bác sĩ Thành là chuyên gia hàng đầu về vô sinh nam, chuyên về các kỹ thuật thụ thuật tinh vi và điều trị các vấn đề về tinh trùng.",
        location: "Hồ Chí Minh, Việt Nam",
        lastUpdate: "23/05/2023",
        image: MaleDoc
    },
    {
        id: 5,
        name: "Bác sĩ Vũ Thị Lan Anh",
        specialty: "Chuyên khoa Siêu âm và Chẩn đoán",
        rating: 4.9,
        reviews: 92,
        description: "Bác sĩ Lan Anh chuyên về siêu âm chẩn đoán và theo dõi quá trình điều trị hiếm muộn, với kỹ năng chẩn đoán chính xác cao.",
        location: "Hồ Chí Minh, Việt Nam",
        lastUpdate: "26/05/2023",
        image: FemaleDoc
    },
    {
        id: 6,
        name: "Bác sĩ Đỗ Quang Hùng",
        specialty: "Chuyên khoa Di truyền Sinh Sản",
        rating: 4.8,
        reviews: 83,
        description: "Bác sĩ Hùng chuyên về di truyền sinh sản và sàng lọc di truyền tiền làm tổ, góp phần nguy cơ bệnh di truyền cho trẻ.",
        location: "Hồ Chí Minh, Việt Nam",
        lastUpdate: "27/05/2023",
        image: MaleDoc
    }
];

const DoctorList = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('Tất cả');
    const [doctors, setDoctors] = useState(doctorsData);
    
    // Get unique specialties from doctor data
    const specialties = ['Tất cả', ...new Set(doctorsData.map(doctor => doctor.specialty))];
    
    // Filter doctors based on search and specialty
    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doctor.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesSpecialty = selectedSpecialty === 'Tất cả' || doctor.specialty === selectedSpecialty;
        
        return matchesSearch && matchesSpecialty;
    });

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={14}
                className={i < Math.floor(rating) ? "star-filled" : "star-empty"}
                fill={i < Math.floor(rating) ? "#ffc107" : "none"}
            />
        ));
    };

    useEffect(() => {
        fetchAllDoctors();
    },[])

    const fetchAllDoctors = async () => {
        try {
            const response = await axios.get('http://10.87.23.84:8080/api/doctors/all', {
                // headers: {
                //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW5hZ2VyQGdtYWlsLmNvbSIsInJvbGVzIjpbIlJPTEVfTUFOQUdFUiJdLCJpYXQiOjE3NDkyNjg5ODksImV4cCI6MTc0OTI3MjU4OX0.fJw300NEpzyemrrz9axJSLvW2R5B5ZAb_BRbsgQ_f9oBearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW5hZ2VyQGdtYWlsLmNvbSIsInJvbGVzIjpbIlJPTEVfTUFOQUdFUiJdLCJpYXQiOjE3NDkyNzExMDYsImV4cCI6MTc0OTI3NDcwNn0.CKQ_AACaWbSP280WXSac4Egc_DHY5Ir42942-OuPeQ8'
                // }
            });
            console.log('Fetched doctors:', response.data);
            if (response.data && Array.isArray(response.data)) {
                const fetchedDoctors = response.data.map(doctor => ({
                    id: doctor.doctorId,
                    name: doctor.user.name,
                    specialty: doctor.description ? doctor.specialty : "Chưa cập nhật" ,
                    rating: 5,
                    reviews: "yo",
                    description: doctor.description ? doctor.description : "Chưa cập nhật mô tả",
                    location: "Ho Chi Minh, Vietnam",
                    lastUpdate: "22/05/2023",
                    image: doctor.user.gender == "male" ? MaleDoc : FemaleDoc, 
                }));
                setDoctors(fetchedDoctors);
            }

        } catch (error) {
            console.error('Lỗi khi fetch danh sách bác sĩ:', error);
        }
    };

    return (
        <div className="doctor-list">
            <div className="container">
                <div className="page-header">
                    <h1>Đội Ngũ Bác Sĩ Của Chúng Tôi</h1>
                    <p>Gặp gỡ các chuyên gia nổi tiếng sinh sản và bác sĩ hiếm muộn đã giúp hàng nghìn cặp vợ chồng thực hiện ước mơ làm cha mẹ.</p>
                </div>

                <div className="search-filter-section">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Tìm kiếm bác sĩ theo tên hoặc chuyên khoa..."
                            value={searchTerm}
                            className="search-input"
                        />
                        <button className='search-btn' onClick={() => setSearchTerm('')}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
                        </button>
                    </div>
                    
                    <div className="specialty-filter">
                        <div className="filter-title">Chuyên khoa:</div>
                        <div className="specialty-tabs">
                            {specialties.map((specialty) => (
                                <button
                                    key={specialty}
                                    className={`specialty-tab ${selectedSpecialty === specialty ? 'active' : ''}`}
                                    onClick={() => setSelectedSpecialty(specialty)}
                                >
                                    {specialty}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="results-info">
                    <p>Hiển thị {filteredDoctors.length} bác sĩ{searchTerm && ` cho "${searchTerm}"`}</p>
                </div>

                <div className="doctors-grid">
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor) => (
                            <div key={doctor.id} className="doctor-card">
                                <div className="doctor-image">
                                    <div className="image-placeholder">
                                        <img src={doctor.image} alt={doctor.name}/>
                                    </div>
                                    {doctor.tag && <span className="doctor-tag">{doctor.tag}</span>}
                                </div>
                            
                                <div className="doctor-info">
                                    <h3 className="doctor-name">{doctor.name}</h3>
                                    <p className="doctor-specialty">{doctor.specialty}</p>
                                    
                                    <div className="doctor-rating">
                                    <div className="stars">
                                        {renderStars(doctor.rating)}
                                    </div>
                                    <span className="rating-text">{doctor.rating} ({doctor.reviews} đánh giá)</span>
                                    </div>
                                    
                                    <p className="doctor-description">{doctor.description}</p>
                                    
                                    <div className="doctor-meta">
                                    <div className="meta-item">
                                        <MapPin size={14} />
                                        <span>{doctor.location}</span>
                                    </div>
                                    <div className="meta-item">
                                        <Calendar size={14} />
                                        <span>Có lịch từ {doctor.lastUpdate}</span>
                                    </div>
                                    </div>
                                    
                                    <div className="doctor-actions">
                                        <button className="view-profile-btn" onClick={() => navigate(`doctor-detail/${doctor.id}`)}>Xem Hồ Sơ</button>
                                        <button className="book-appointment-btn">Đặt Lịch Hẹn</button>
                                    </div>
                                </div>
                            </div>
                        ))
                        ) : (
                            <div className="no-results">
                                <div className="no-results-content">
                                <User size={60} color="#ccc" />
                                <h3>Không tìm thấy bác sĩ nào</h3>
                                <p>Không có bác sĩ nào phù hợp với tiêu chí tìm kiếm của bạn.</p>
                                <button 
                                    className="clear-filters-btn"
                                    onClick={() => {
                                    setSearchTerm('');
                                    setSelectedSpecialty('Tất cả');
                                    }}
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>
                    </div>
                    )}
                </div>

                <div className="page-footer-text">
                    <p>Đội ngũ bác sĩ của chúng tôi luôn sẵn sàng hỗ trợ bạn trong hành trình điều trị hiếm muộn. Đặt lịch hẹn ngay hôm nay để biết điều.</p>
                    <button className="consultation-btn">Đặt Lịch Tư Vấn</button>
                </div>
            </div>
        </div>
    );
};

export default DoctorList;