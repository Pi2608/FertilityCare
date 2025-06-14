import React, { useState } from 'react'
import './DoctorDetail.css'
import { useParams } from 'react-router-dom'
import { doctorsData } from '../../../data/doctorData'
import { Star } from 'lucide-react';


const DoctorDetail = () => {
    const [activeTab, setActiveTab] = useState('introduce');

    const { doctorId  } = useParams();
    const doctorData = doctorsData.find(doc => doc.id === parseInt(doctorId));

    const DoctorCard = ({ doctor }) => {
        return (
            <div className="doctor-card">
                <div className="img-container">
                    <img src={doctor.avatar} alt={doctor.name} className="doctor-avatar" />
                </div>
                    
                <div className="doctor-info">
                    <h3 className="doctor-name">Bác sĩ {doctor.name}</h3>
                    <p className="doctor-specialty">{doctor.specialty}</p>

                    <div className="doctor-rating">
                    <span className="stars">{renderStars(doctorData.overallRating)}</span>
                    <span className="rating-value">{doctor.rating}</span>
                    <span className="rating-count">({doctor.totalReviews} đánh giá)</span>
                    </div>

                    <div className="doctor-meta">
                    <p><i className="fa fa-map-marker-alt"></i> {doctor.location}</p>
                    <p><i className="fa fa-calendar-alt"></i> Có lịch từ {doctor.joinDate}</p>
                    </div>

                    <button className="appointment-button">Đặt Lịch Hẹn</button>
                </div>
            </div>
        );
    };

    const SpecialtiesList = ({ specialties }) => {
        return (
            <ul className="specialties-list">
                {
                specialties.map((item, index) => {
                    const [label, description] = item.split(' - ');
                    return (
                        <li key={index} className="specialty-item">
                            <span className="specialty-label">{label}</span>
                            <span className="specialty-description">{description}</span>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const WorkingHours = ({ workingHours }) => {
        return (
            <div className="working-hours-grid">
            {Object.entries(workingHours).map(([day, hours]) => (
                <div key={day} className="working-hours-card">
                    <div className="day">{day}</div>
                    <div className="time">{hours}</div>
                </div>
            ))}
            </div>
        );
    };

    const renderRatingBar = (value) => {
        const percentage = (value / 5) * 100;
        return (
            <div className="rating-bar">
                <div className="rating-bar-fill" style={{ width: `${percentage}%` }}></div>
            </div>
        );
    };

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

    const navItems = [
        { key: 'introduce', label: 'Giới thiệu' },
        { key: 'certifications', label: 'Học vấn' },
        { key: 'experience', label: 'Kinh nghiệm' },
        { key: 'feedback', label: 'Đánh giá' }
    ];

    const renderIntroduce = () => (
        <div className='intro'>
            <div className="about">
                <h1>Về bác sĩ {doctorData.name}</h1>
                <p>{doctorData.introduction}</p>
            </div>
            <div className="approach">
                <h1>Phương pháp tiếp cận</h1>
                <p>{doctorData.treatmentApproach.description}</p>
            </div>
            <div className="schedule">
                <h1>Lịch làm việc</h1>
                <p>Bác sĩ hiện có lịch khám vào các ngày sau. Vui lòng đặt lịch hẹn trực tuyến hoặc liên hệ với phòng khám để biết thêm thông tin.</p>
                <WorkingHours workingHours={doctorData.workingHours} />
                <button className="appointment-button">Đặt Lịch Hẹn</button>
            </div>
        </div>
    );

    const renderCertifications = () => (
        <div className='edu-cert'>
            <div className="education">
                <h1>Học vấn và Chứng chỉ</h1>
                <div className="edu-list">
                    {doctorData.education.map((item, index) => (
                        <div key={index}>
                            <p>{item.period}</p>
                            <p className="degree"><strong>{item.degree}</strong></p>
                            <p>{item.institution}</p> 
                        </div>
                    ))}
                </div>
            </div>
            <div className="certificate">
                <h2>Chứng chỉ chuyên môn</h2>
                <div className="cert-list">
                    {doctorData.certifications.map((cert, index) => (
                        <div key={index}>
                            <p>{cert.year}</p>
                            <p className="degree"><strong>{cert.title}</strong></p>
                            <p>{cert.organization}</p> 
                        </div>
                    ))}
                </div>
            </div>
            <div className="schedule">
                <h1>Lịch làm việc</h1>
                <p>Bác sĩ hiện có lịch khám vào các ngày sau. Vui lòng đặt lịch hẹn trực tuyến hoặc liên hệ với phòng khám để biết thêm thông tin.</p>
                <WorkingHours workingHours={doctorData.workingHours} />
                <button className="appointment-button">Đặt Lịch Hẹn</button>
            </div>
        </div>
    );

    const renderExperience = () => (
        <div className="exp">
            <div className="exprience">
                <h1>Kinh nghiệm chuyên môn</h1>
                <div className="exp-list">
                    {doctorData.experience.map((item, index) => (
                        <div key={index}>
                            <p>{item.period}</p>
                            <p className="position"><strong>{item.position}</strong></p>
                            <p>{item.workplace}</p> 
                            <ul>
                                {item.responsibilities.map((resp, respIndex) => (
                                    <li key={respIndex}><p>{resp}</p></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="activity">
                <h1>Hoạt động chuyên môn</h1>
                <div className="act-list">
                    {doctorData.activities.map((activity, index) => (
                        <div key={index}>
                            <p className="act"><strong>{activity.title}</strong></p>
                            <ul>
                                {activity.details.map((detail, detailIndex) => (
                                    <li key={detailIndex}><p>{detail}</p></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="schedule">
                <h1>Lịch làm việc</h1>
                <p>Bác sĩ hiện có lịch khám vào các ngày sau. Vui lòng đặt lịch hẹn trực tuyến hoặc liên hệ với phòng khám để biết thêm thông tin.</p>
                <WorkingHours workingHours={doctorData.workingHours} />
                <button className="appointment-button">Đặt Lịch Hẹn</button>
            </div>
        </div>
    );

    const renderReviews = () => (
        <div className="reviews">
            <div className="reviews-header">
                <h1 className="title">Đánh Giá Từ Bệnh Nhân</h1>
                <p className="subtitle">Dựa trên {doctorData.totalReviews} đánh giá từ bệnh nhân đã điều trị với Bác sĩ Trần Văn Hải</p>
                
                <div className="overall-rating">
                <span className="rating-number">{doctorData.overallRating}</span>
                <div className="stars-container">
                    {renderStars(doctorData.overallRating)}
                </div>
                <span className="total-reviews">{doctorData.totalReviews} đánh giá</span>
                </div>
                {doctorData.ratingBreakdown.map((rating, index) => (
                <div key={index} className="rating-item">
                    <span className="rating-label">{rating.label}</span>
                    {renderRatingBar(rating.value)}
                    <span className="rating-value">{rating.value}</span>
                </div>
                ))}
            </div>

            <div className="reviews-list">
                {doctorData.reviews.map((review) => (
                    <div key={review.id} className="review-item">
                        <div className="review-header">
                            <div className="reviewer-avatar">

                            </div>
                            <div className="reviewer-info">
                                <h3 className="reviewer-name">{review.patientName}</h3>
                                <p className="review-date">{review.date}</p>
                            </div>
                            <div className="review-rating">
                                {renderStars(review.rating)}
                            </div>
                        </div>
                        <p className="review-content">"{review.comment}"</p>
                    </div>
                ))}
            </div>
            
            <div className="schedule">
                <h1>Lịch làm việc</h1>
                <p>Bác sĩ hiện có lịch khám vào các ngày sau. Vui lòng đặt lịch hẹn trực tuyến hoặc liên hệ với phòng khám để biết thêm thông tin.</p>
                <WorkingHours workingHours={doctorData.workingHours} />
                <button className="appointment-button">Đặt Lịch Hẹn</button>
            </div>
        </div>
    );

    const renderContent = () => {
        switch(activeTab) {
        case 'introduce':
            return renderIntroduce();
        case 'certifications':
            return renderCertifications();
        case 'experience':
            return renderExperience();
        case 'feedback':
            return renderReviews();
        default:
            return renderIntroduce();
        }
    };

    return (
        <div className='doctor-detail'>
            <div className="doctor">
                <div className="card">
                    <DoctorCard doctor={doctorData} />
                </div>
                <div className="doctor-specialties">
                    <SpecialtiesList specialties={doctorData.specialties} />
                </div>
            </div>
            <div className="detail">
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

                <div className="detail-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default DoctorDetail