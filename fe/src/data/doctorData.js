import MaleDoc from "@asset/male-fertility-specialist.png";
import FemaleDoc from "@asset/asian-female-doctor.png";

// doctorData.js
export const doctorsData = [
    {
        id: 1,
        name: "Trần Văn Hải",
        specialty: "Chuyên gia Phổi học và IVF",
        avatar: MaleDoc,
        rating: 4.8,
        totalReviews: 78,
        location: "Hồ Chí Minh, Việt Nam",
        joinDate: "22/05/2023",
        
        // Introduction
        introduction: `Bác sĩ Trần Văn Hải là chuyên gia hàng đầu về phổi học và kỹ thuật thụ tinh trong ống nghiệm (IVF) với hơn 12 năm kinh nghiệm trong lĩnh vực sinh sản học. Ông đã tích lũy kinh nghiệm giúp hàng nghìn cặp vợ chồng hiếm muộn thông qua chuyên môn sâu về nuôi cấy và đánh giá phôi.

        Với chuyên môn về các kỹ thuật tiên tiến như ICSI (tiêm tinh trùng vào bào tương trứng), PGT (sàng lọc di truyền tiền làm tổ), và nuôi cấy phôi nang, bác sĩ Hải đã mang đến hy vọng cho hàng trăm cặp vợ chồng trong việc nâng cao tỷ lệ thành công của các chu kỳ IVF tại phòng khám.

        Bác sĩ Hải nổi tiếng với phương pháp tiếp cận khoa học, tỉ mỉ và tận tâm. Ông luôn cập nhật những tiến bộ mới nhất trong lĩnh vực phổi học và sinh sản học để đảm bảo các kỹ thuật tiên tiến đạt được kết quả tốt nhất cho bệnh nhân. Sự kết hợp giữa chuyên môn kỹ thuật cao và sự quan tâm đến từng trường hợp cụ thể đã giúp bác sĩ Hải trở thành một thành viên được kính trọng trong đội ngũ điều trị hiếm muộn của chúng tôi.

        Ngoài công việc làm sáng, bác sĩ Hải còn tích cực tham gia nghiên cứu của viện trợ dạy về phổi học và IVF, góp phần nâng cao chất lượng điều trị hiếm muộn tại Việt Nam và đào tạo thế hệ bác sĩ chuyên khoa tương lai.`,

        // Treatment approach
        treatmentApproach: {
            title: "Phương Pháp Tiếp Cận",
            description: "Bác sĩ Hải tin rằng chất lượng phôi là yếu tố quyết định thành công của điều trị IVF. Với phương pháp tiếp cận toàn diện, bác sĩ kết hợp các kỹ thuật nuôi cấy phôi tiên tiến với đánh giá cẩn thận để lựa chọn phôi có tiềm năng làm tổ cao nhất.",
            methods: [
            {
                step: 1,
                title: "Chất lượng phôi",
                description: "Sử dụng các tiêu chuẩn đánh giá phôi quốc tế để lựa chọn phôi tốt nhất cho chuyển."
            },
            {
                step: 2,
                title: "Môi trường nuôi cấy tối ưu",
                description: "Đảm bảo điều kiện nuôi cấy phôi lý tưởng để tối ưu hóa sự phát triển của phôi."
            },
            {
                step: 3,
                title: "Cá nhân hóa",
                description: "Điều chỉnh phương pháp nuôi cấy và đánh giá phôi dựa trên đặc điểm cụ thể của từng bệnh nhân."
            },
            {
                step: 4,
                title: "Minh bạch",
                description: "Giải thích rõ ràng về chất lượng phôi và các lựa chọn điều trị cho bệnh nhân."
            }
            ]
        },

        // Education & Training
        education: [
            {
            period: "2005 - 2012",
            degree: "Bác sĩ Y khoa",
            institution: "Đại học Y Hà Nội"
            },
            {
            period: "2012 - 2015",
            degree: "Chuyên khoa I Sản Phụ khoa",
            institution: "Đại học Y Hà Nội"
            },
            {
            period: "2015 - 2018",
            degree: "Tiến sĩ Y học",
            institution: "Đại học Y Hà Nội",
            thesis: "Nghiên cứu ứng dụng ky thuật nuôi cấy phôi nang trong điều trị vô sinh"
            },
            {
            period: "2018",
            degree: "Chứng chỉ Phôi học Lâm sàng",
            institution: "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)"
            }
        ],

        // Certifications & Awards
        certifications: [
            {
            year: "2017",
            title: "Chứng chỉ Kỹ thuật ICSI Nâng cao",
            organization: "Hiệp hội Phổi học Châu Âu (ESHRE)"
            },
            {
            year: "2019",
            title: "Giải thưởng Nghiên cứu xuất sắc",
            organization: "Hội nghị Sinh sản Việt Nam"
            },
            {
            year: "2021",
            title: "Chứng nhận Xuất sắc trong Phôi học Lâm sàng",
            organization: "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)"
            }
        ],

        // Professional Experience
        experience: [
            {
            period: "2018 - Hiện tại",
            position: "Chuyên gia Phôi học và IVF",
            workplace: "Trung tâm Điều trị hiếm muộn, Hà Nội",
            responsibilities: [
                "Phụ trách phòng thi nghiệm phôi học",
                "Thực hiện kỹ thuật ICSI và nuôi cấy phôi",
                "Đánh giá chất lượng phôi và lựa chọn phôi chuyển",
                "Phát triển và cải tiến quy trình nuôi cấy phôi"
            ]
            },
            {
            period: "2015 - 2018",
            position: "Bác sĩ Sản Phụ khoa và Phôi học",
            workplace: "Bệnh viện Phụ sản Trung ương, Hà Nội",
            responsibilities: [
                "Thực hiện kỹ thuật IVF và ICSI",
                "Tham gia đội ngũ điều trị hiếm muộn",
                "Nghiên cứu về nuôi cấy phôi nang"
            ]
            },
            {
            period: "2012 - 2015",
            position: "Bác sĩ Nội trú",
            workplace: "Bệnh viện Phụ sản Trung ương, Hà Nội",
            responsibilities: [
                "Đào tạo chuyên sâu về sản phụ khoa",
                "Thực hành lâm sàng về điều trị hiếm muộn",
                "Tham gia nghiên cứu lâm sàng"
            ]
            }
        ],

        // Professional Activities
        activities: [
            {
                title: "Thành viên Hiệp hội",
                details: [
                    "Hiệp hội Phổi học Châu Âu (ESHRE)",
                    "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)",
                    "Hội Phổi học Lâm sàng Việt Nam",
                    "Hội Phụ Sản Việt Nam"
                ]
            },
            {
                title: "Giảng dạy & Đào tạo",
                details: [
                    "Giảng viên khoa học Phổi học Lâm sàng",
                    "Hướng dẫn bác sĩ nội trú về kỹ thuật IVF và ICSI",
                    "Tổ chức hội thảo về nuôi cấy phôi nang"
                ]
            },
            {
                title: "Nghiên cứu & Xuất bản",
                details: [
                    "Tác giả của nhiều bài báo về phổi học và IVF",
                    "Nghiên cứu về ảnh hưởng của môi trường nuôi cấy đến chất lượng phôi",
                    "Đóng góp cho hướng dẫn quốc gia về đánh giá chất lượng phôi"
                ]
            }
        ],

        // Working Hours
        workingHours: {
            "Thứ Hai": "9:00 - 16:00",
            "Thứ Ba": "9:00 - 16:00", 
            "Thứ Tư": "9:00 - 12:00",
            "Thứ Năm": "9:00 - 16:00",
            "Thứ Sáu": "9:00 - 16:00",
            "Thứ Bảy": "9:00 - 12:00"
        },

        // Specialties
        specialties: [
            "IVF - Thụ tinh trong ống nghiệm",
            "ICSI - Tiêm tinh trùng vào bào tương trứng", 
            "PGT - Sàng lọc di truyền tiền làm tổ",
            "Phôi học - Nuôi cấy và đánh giá phôi"
        ],

        // Reviews
        reviews: [
            {
            id: 1,
            patientName: "Lê Thị Thanh",
            date: "Tháng 4, 2023",
            rating: 5,
            comment: "Bác sĩ Hải là một chuyên gia tuyệt vời. Sau 3 lần thất bại với IVF ở nơi khác, chúng tôi đã đến gặp bác sĩ Hải và ông đã phân tích rất chi tiết về chất lượng phôi của chúng tôi. Ông đã điều chỉnh phương pháp nuôi cấy phôi và lần này chúng tôi đã thành công. Hiện tại tôi đang mang thai 5 tháng và mọi thứ đều rất tốt. Chúng tôi vô cùng biết ơn bác sĩ Hải!"
            },
            {
            id: 2,
            patientName: "Nguyễn Văn Tuấn",
            date: "Tháng 3, 2023",
            rating: 5,
            comment: "Bác sĩ Hải đã giải thích rất rõ ràng về quy trình IVF và vai trò của chất lượng phôi trong thành công của điều trị. Ông rất kiên nhẫn với tất cả các câu hỏi của chúng tôi và luôn cập nhật tình hình phát triển của phôi trong suốt quá trình nuôi cấy. Chúng tôi đánh giá cao sự chuyên nghiệp và lòng tận tâm của ông."
            },
            {
            id: 3,
            patientName: "Trần Thị Hoa",
            date: "Tháng 2, 2023", 
            rating: 5,
            comment: "Bác sĩ Hải là một chuyên gia phôi học xuất sắc. Ông đã quyết định nuôi cấy phôi của chúng tôi đến ngày 5 thay vì chuyển sớm vào ngày 3 như kế hoạch ban đầu, và điều này đã giúp chúng tôi có cơ hội phôi nang chất lượng tốt. Tôi đặc biệt ấn tượng với sự giải thích bác sĩ Hải về bất kỳ ai đang tìm kiếm điều trị IVF."
            }
        ],

        // Rating breakdown
        ratingBreakdown: {
            overall: 4.8,
            expertise: 4.9,
            attitude: 4.7,
            explanation: 4.8,
            timeManagement: 4.7
        }
    },
    {
        id: 2,
        name: "Nguyễn Thị Minh",
        specialty: "Chuyên khoa Khám Sức Khỏe Tổng Quát",
        avatar: FemaleDoc,
        rating: 5.0,
        totalReviews: 178,
        location: "Hồ Chí Minh, Việt Nam",
        joinDate: "24/05/2023",
        
        // Introduction
        introduction: `Bác sĩ Nguyễn Thị Minh là chuyên gia hàng đầu về phổi học và kỹ thuật thụ tinh trong ống nghiệm (IVF) với hơn 12 năm kinh nghiệm trong lĩnh vực sinh sản học. Ông đã tích lũy kinh nghiệm giúp hàng nghìn cặp vợ chồng hiếm muộn thông qua chuyên môn sâu về nuôi cấy và đánh giá phôi.

        Với chuyên môn về các kỹ thuật tiên tiến như ICSI (tiêm tinh trùng vào bào tương trứng), PGT (sàng lọc di truyền tiền làm tổ), và nuôi cấy phôi nang, bác sĩ Hải đã mang đến hy vọng cho hàng trăm cặp vợ chồng trong việc nâng cao tỷ lệ thành công của các chu kỳ IVF tại phòng khám.

        Bác sĩ Hải nổi tiếng với phương pháp tiếp cận khoa học, tỉ mỉ và tận tâm. Ông luôn cập nhật những tiến bộ mới nhất trong lĩnh vực phổi học và sinh sản học để đảm bảo các kỹ thuật tiên tiến đạt được kết quả tốt nhất cho bệnh nhân. Sự kết hợp giữa chuyên môn kỹ thuật cao và sự quan tâm đến từng trường hợp cụ thể đã giúp bác sĩ Hải trở thành một thành viên được kính trọng trong đội ngũ điều trị hiếm muộn của chúng tôi.

        Ngoài công việc làm sáng, bác sĩ Hải còn tích cực tham gia nghiên cứu của viện trợ dạy về phổi học và IVF, góp phần nâng cao chất lượng điều trị hiếm muộn tại Việt Nam và đào tạo thế hệ bác sĩ chuyên khoa tương lai.`,

        // Treatment approach
        treatmentApproach: {
            title: "Phương Pháp Tiếp Cận",
            description: "Bác sĩ Hải tin rằng chất lượng phôi là yếu tố quyết định thành công của điều trị IVF. Với phương pháp tiếp cận toàn diện, bác sĩ kết hợp các kỹ thuật nuôi cấy phôi tiên tiến với đánh giá cẩn thận để lựa chọn phôi có tiềm năng làm tổ cao nhất.",
            methods: [
            {
                step: 1,
                title: "Chất lượng phôi",
                description: "Sử dụng các tiêu chuẩn đánh giá phôi quốc tế để lựa chọn phôi tốt nhất cho chuyển."
            },
            {
                step: 2,
                title: "Môi trường nuôi cấy tối ưu",
                description: "Đảm bảo điều kiện nuôi cấy phôi lý tưởng để tối ưu hóa sự phát triển của phôi."
            },
            {
                step: 3,
                title: "Cá nhân hóa",
                description: "Điều chỉnh phương pháp nuôi cấy và đánh giá phôi dựa trên đặc điểm cụ thể của từng bệnh nhân."
            },
            {
                step: 4,
                title: "Minh bạch",
                description: "Giải thích rõ ràng về chất lượng phôi và các lựa chọn điều trị cho bệnh nhân."
            }
            ]
        },

        // Education & Training
        education: [
            {
            period: "2005 - 2012",
            degree: "Bác sĩ Y khoa",
            institution: "Đại học Y Hà Nội"
            },
            {
            period: "2012 - 2015",
            degree: "Chuyên khoa I Sản Phụ khoa",
            institution: "Đại học Y Hà Nội"
            },
            {
            period: "2015 - 2018",
            degree: "Tiến sĩ Y học",
            institution: "Đại học Y Hà Nội",
            thesis: "Nghiên cứu ứng dụng ky thuật nuôi cấy phôi nang trong điều trị vô sinh"
            },
            {
            period: "2018",
            degree: "Chứng chỉ Phôi học Lâm sàng",
            institution: "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)"
            }
        ],

        // Certifications & Awards
        certifications: [
            {
            year: "2017",
            title: "Chứng chỉ Kỹ thuật ICSI Nâng cao",
            organization: "Hiệp hội Phổi học Châu Âu (ESHRE)"
            },
            {
            year: "2019",
            title: "Giải thưởng Nghiên cứu xuất sắc",
            organization: "Hội nghị Sinh sản Việt Nam"
            },
            {
            year: "2021",
            title: "Chứng nhận Xuất sắc trong Phôi học Lâm sàng",
            organization: "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)"
            }
        ],

        // Professional Experience
        experience: [
            {
            period: "2018 - Hiện tại",
            position: "Chuyên gia Phôi học và IVF",
            workplace: "Trung tâm Điều trị hiếm muộn, Hà Nội",
            responsibilities: [
                "Phụ trách phòng thi nghiệm phôi học",
                "Thực hiện kỹ thuật ICSI và nuôi cấy phôi",
                "Đánh giá chất lượng phôi và lựa chọn phôi chuyển",
                "Phát triển và cải tiến quy trình nuôi cấy phôi"
            ]
            },
            {
            period: "2015 - 2018",
            position: "Bác sĩ Sản Phụ khoa và Phôi học",
            workplace: "Bệnh viện Phụ sản Trung ương, Hà Nội",
            responsibilities: [
                "Thực hiện kỹ thuật IVF và ICSI",
                "Tham gia đội ngũ điều trị hiếm muộn",
                "Nghiên cứu về nuôi cấy phôi nang"
            ]
            },
            {
            period: "2012 - 2015",
            position: "Bác sĩ Nội trú",
            workplace: "Bệnh viện Phụ sản Trung ương, Hà Nội",
            responsibilities: [
                "Đào tạo chuyên sâu về sản phụ khoa",
                "Thực hành lâm sàng về điều trị hiếm muộn",
                "Tham gia nghiên cứu lâm sàng"
            ]
            }
        ],

        // Professional Activities
        activities: [
            {
                title: "Thành viên Hiệp hội",
                details: [
                    "Hiệp hội Phổi học Châu Âu (ESHRE)",
                    "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)",
                    "Hội Phổi học Lâm sàng Việt Nam",
                    "Hội Phụ Sản Việt Nam"
                ]
            },
            {
                title: "Giảng dạy & Đào tạo",
                details: [
                    "Giảng viên khoa học Phổi học Lâm sàng",
                    "Hướng dẫn bác sĩ nội trú về kỹ thuật IVF và ICSI",
                    "Tổ chức hội thảo về nuôi cấy phôi nang"
                ]
            },
            {
                title: "Nghiên cứu & Xuất bản",
                details: [
                    "Tác giả của nhiều bài báo về phổi học và IVF",
                    "Nghiên cứu về ảnh hưởng của môi trường nuôi cấy đến chất lượng phôi",
                    "Đóng góp cho hướng dẫn quốc gia về đánh giá chất lượng phôi"
                ]
            }
        ],

        // Working Hours
        workingHours: {
            "Thứ Hai": "9:00 - 16:00",
            "Thứ Ba": "9:00 - 16:00", 
            "Thứ Tư": "9:00 - 12:00",
            "Thứ Năm": "9:00 - 16:00",
            "Thứ Sáu": "9:00 - 16:00",
            "Thứ Bảy": "9:00 - 12:00"
        },

        // Specialties
        specialties: [
            "IVF - Thụ tinh trong ống nghiệm",
            "ICSI - Tiêm tinh trùng vào bào tương trứng", 
            "PGT - Sàng lọc di truyền tiền làm tổ",
            "Phôi học - Nuôi cấy và đánh giá phôi"
        ],

        // Reviews
        reviews: [
            {
            id: 1,
            patientName: "Lê Thị Thanh",
            date: "Tháng 4, 2023",
            rating: 5,
            comment: "Bác sĩ Hải là một chuyên gia tuyệt vời. Sau 3 lần thất bại với IVF ở nơi khác, chúng tôi đã đến gặp bác sĩ Hải và ông đã phân tích rất chi tiết về chất lượng phôi của chúng tôi. Ông đã điều chỉnh phương pháp nuôi cấy phôi và lần này chúng tôi đã thành công. Hiện tại tôi đang mang thai 5 tháng và mọi thứ đều rất tốt. Chúng tôi vô cùng biết ơn bác sĩ Hải!"
            },
            {
            id: 2,
            patientName: "Nguyễn Văn Tuấn",
            date: "Tháng 3, 2023",
            rating: 5,
            comment: "Bác sĩ Hải đã giải thích rất rõ ràng về quy trình IVF và vai trò của chất lượng phôi trong thành công của điều trị. Ông rất kiên nhẫn với tất cả các câu hỏi của chúng tôi và luôn cập nhật tình hình phát triển của phôi trong suốt quá trình nuôi cấy. Chúng tôi đánh giá cao sự chuyên nghiệp và lòng tận tâm của ông."
            },
            {
            id: 3,
            patientName: "Trần Thị Hoa",
            date: "Tháng 2, 2023", 
            rating: 5,
            comment: "Bác sĩ Hải là một chuyên gia phôi học xuất sắc. Ông đã quyết định nuôi cấy phôi của chúng tôi đến ngày 5 thay vì chuyển sớm vào ngày 3 như kế hoạch ban đầu, và điều này đã giúp chúng tôi có cơ hội phôi nang chất lượng tốt. Tôi đặc biệt ấn tượng với sự giải thích bác sĩ Hải về bất kỳ ai đang tìm kiếm điều trị IVF."
            }
        ],

        // Rating breakdown
        ratingBreakdown: {
            overall: 4.8,
            expertise: 4.9,
            attitude: 4.7,
            explanation: 4.8,
            timeManagement: 4.7
        }
    },
    {
        id: 3,
        name: "Lê Thị Hương",
        specialty: "Chuyên khoa Nội tiết Sinh sản",
        avatar: FemaleDoc,
        rating: 4.8,
        totalReviews: 87,
        location: "Hồ Chí Minh, Việt Nam",
        joinDate: "25/05/2023",
        
        // Introduction
        introduction: `Bác sĩ Lê Thị Hương là chuyên gia hàng đầu về phổi học và kỹ thuật thụ tinh trong ống nghiệm (IVF) với hơn 12 năm kinh nghiệm trong lĩnh vực sinh sản học. Ông đã tích lũy kinh nghiệm giúp hàng nghìn cặp vợ chồng hiếm muộn thông qua chuyên môn sâu về nuôi cấy và đánh giá phôi.

        Với chuyên môn về các kỹ thuật tiên tiến như ICSI (tiêm tinh trùng vào bào tương trứng), PGT (sàng lọc di truyền tiền làm tổ), và nuôi cấy phôi nang, bác sĩ Hải đã mang đến hy vọng cho hàng trăm cặp vợ chồng trong việc nâng cao tỷ lệ thành công của các chu kỳ IVF tại phòng khám.

        Bác sĩ Hải nổi tiếng với phương pháp tiếp cận khoa học, tỉ mỉ và tận tâm. Ông luôn cập nhật những tiến bộ mới nhất trong lĩnh vực phổi học và sinh sản học để đảm bảo các kỹ thuật tiên tiến đạt được kết quả tốt nhất cho bệnh nhân. Sự kết hợp giữa chuyên môn kỹ thuật cao và sự quan tâm đến từng trường hợp cụ thể đã giúp bác sĩ Hải trở thành một thành viên được kính trọng trong đội ngũ điều trị hiếm muộn của chúng tôi.

        Ngoài công việc làm sáng, bác sĩ Hải còn tích cực tham gia nghiên cứu của viện trợ dạy về phổi học và IVF, góp phần nâng cao chất lượng điều trị hiếm muộn tại Việt Nam và đào tạo thế hệ bác sĩ chuyên khoa tương lai.`,

        // Treatment approach
        treatmentApproach: {
            title: "Phương Pháp Tiếp Cận",
            description: "Bác sĩ Hải tin rằng chất lượng phôi là yếu tố quyết định thành công của điều trị IVF. Với phương pháp tiếp cận toàn diện, bác sĩ kết hợp các kỹ thuật nuôi cấy phôi tiên tiến với đánh giá cẩn thận để lựa chọn phôi có tiềm năng làm tổ cao nhất.",
            methods: [
            {
                step: 1,
                title: "Chất lượng phôi",
                description: "Sử dụng các tiêu chuẩn đánh giá phôi quốc tế để lựa chọn phôi tốt nhất cho chuyển."
            },
            {
                step: 2,
                title: "Môi trường nuôi cấy tối ưu",
                description: "Đảm bảo điều kiện nuôi cấy phôi lý tưởng để tối ưu hóa sự phát triển của phôi."
            },
            {
                step: 3,
                title: "Cá nhân hóa",
                description: "Điều chỉnh phương pháp nuôi cấy và đánh giá phôi dựa trên đặc điểm cụ thể của từng bệnh nhân."
            },
            {
                step: 4,
                title: "Minh bạch",
                description: "Giải thích rõ ràng về chất lượng phôi và các lựa chọn điều trị cho bệnh nhân."
            }
            ]
        },

        // Education & Training
        education: [
            {
            period: "2005 - 2012",
            degree: "Bác sĩ Y khoa",
            institution: "Đại học Y Hà Nội"
            },
            {
            period: "2012 - 2015",
            degree: "Chuyên khoa I Sản Phụ khoa",
            institution: "Đại học Y Hà Nội"
            },
            {
            period: "2015 - 2018",
            degree: "Tiến sĩ Y học",
            institution: "Đại học Y Hà Nội",
            thesis: "Nghiên cứu ứng dụng ky thuật nuôi cấy phôi nang trong điều trị vô sinh"
            },
            {
            period: "2018",
            degree: "Chứng chỉ Phôi học Lâm sàng",
            institution: "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)"
            }
        ],

        // Certifications & Awards
        certifications: [
            {
            year: "2017",
            title: "Chứng chỉ Kỹ thuật ICSI Nâng cao",
            organization: "Hiệp hội Phổi học Châu Âu (ESHRE)"
            },
            {
            year: "2019",
            title: "Giải thưởng Nghiên cứu xuất sắc",
            organization: "Hội nghị Sinh sản Việt Nam"
            },
            {
            year: "2021",
            title: "Chứng nhận Xuất sắc trong Phôi học Lâm sàng",
            organization: "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)"
            }
        ],

        // Professional Experience
        experience: [
            {
            period: "2018 - Hiện tại",
            position: "Chuyên gia Phôi học và IVF",
            workplace: "Trung tâm Điều trị hiếm muộn, Hà Nội",
            responsibilities: [
                "Phụ trách phòng thi nghiệm phôi học",
                "Thực hiện kỹ thuật ICSI và nuôi cấy phôi",
                "Đánh giá chất lượng phôi và lựa chọn phôi chuyển",
                "Phát triển và cải tiến quy trình nuôi cấy phôi"
            ]
            },
            {
            period: "2015 - 2018",
            position: "Bác sĩ Sản Phụ khoa và Phôi học",
            workplace: "Bệnh viện Phụ sản Trung ương, Hà Nội",
            responsibilities: [
                "Thực hiện kỹ thuật IVF và ICSI",
                "Tham gia đội ngũ điều trị hiếm muộn",
                "Nghiên cứu về nuôi cấy phôi nang"
            ]
            },
            {
            period: "2012 - 2015",
            position: "Bác sĩ Nội trú",
            workplace: "Bệnh viện Phụ sản Trung ương, Hà Nội",
            responsibilities: [
                "Đào tạo chuyên sâu về sản phụ khoa",
                "Thực hành lâm sàng về điều trị hiếm muộn",
                "Tham gia nghiên cứu lâm sàng"
            ]
            }
        ],

        // Professional Activities
        activities: [
            {
                title: "Thành viên Hiệp hội",
                details: [
                    "Hiệp hội Phổi học Châu Âu (ESHRE)",
                    "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)",
                    "Hội Phổi học Lâm sàng Việt Nam",
                    "Hội Phụ Sản Việt Nam"
                ]
            },
            {
                title: "Giảng dạy & Đào tạo",
                details: [
                    "Giảng viên khoa học Phổi học Lâm sàng",
                    "Hướng dẫn bác sĩ nội trú về kỹ thuật IVF và ICSI",
                    "Tổ chức hội thảo về nuôi cấy phôi nang"
                ]
            },
            {
                title: "Nghiên cứu & Xuất bản",
                details: [
                    "Tác giả của nhiều bài báo về phổi học và IVF",
                    "Nghiên cứu về ảnh hưởng của môi trường nuôi cấy đến chất lượng phôi",
                    "Đóng góp cho hướng dẫn quốc gia về đánh giá chất lượng phôi"
                ]
            }
        ],

        // Working Hours
        workingHours: {
            "Thứ Hai": "9:00 - 16:00",
            "Thứ Ba": "9:00 - 16:00", 
            "Thứ Tư": "9:00 - 12:00",
            "Thứ Năm": "9:00 - 16:00",
            "Thứ Sáu": "9:00 - 16:00",
            "Thứ Bảy": "9:00 - 12:00"
        },

        // Specialties
        specialties: [
            "IVF - Thụ tinh trong ống nghiệm",
            "ICSI - Tiêm tinh trùng vào bào tương trứng", 
            "PGT - Sàng lọc di truyền tiền làm tổ",
            "Phôi học - Nuôi cấy và đánh giá phôi"
        ],

        // Reviews
        reviews: [
            {
            id: 1,
            patientName: "Lê Thị Thanh",
            date: "Tháng 4, 2023",
            rating: 5,
            comment: "Bác sĩ Hải là một chuyên gia tuyệt vời. Sau 3 lần thất bại với IVF ở nơi khác, chúng tôi đã đến gặp bác sĩ Hải và ông đã phân tích rất chi tiết về chất lượng phôi của chúng tôi. Ông đã điều chỉnh phương pháp nuôi cấy phôi và lần này chúng tôi đã thành công. Hiện tại tôi đang mang thai 5 tháng và mọi thứ đều rất tốt. Chúng tôi vô cùng biết ơn bác sĩ Hải!"
            },
            {
            id: 2,
            patientName: "Nguyễn Văn Tuấn",
            date: "Tháng 3, 2023",
            rating: 5,
            comment: "Bác sĩ Hải đã giải thích rất rõ ràng về quy trình IVF và vai trò của chất lượng phôi trong thành công của điều trị. Ông rất kiên nhẫn với tất cả các câu hỏi của chúng tôi và luôn cập nhật tình hình phát triển của phôi trong suốt quá trình nuôi cấy. Chúng tôi đánh giá cao sự chuyên nghiệp và lòng tận tâm của ông."
            },
            {
            id: 3,
            patientName: "Trần Thị Hoa",
            date: "Tháng 2, 2023", 
            rating: 5,
            comment: "Bác sĩ Hải là một chuyên gia phôi học xuất sắc. Ông đã quyết định nuôi cấy phôi của chúng tôi đến ngày 5 thay vì chuyển sớm vào ngày 3 như kế hoạch ban đầu, và điều này đã giúp chúng tôi có cơ hội phôi nang chất lượng tốt. Tôi đặc biệt ấn tượng với sự giải thích bác sĩ Hải về bất kỳ ai đang tìm kiếm điều trị IVF."
            }
        ],

        // Rating breakdown
        ratingBreakdown: {
            overall: 4.8,
            expertise: 4.9,
            attitude: 4.7,
            explanation: 4.8,
            timeManagement: 4.7
        }
    },
    {
        id: 4,
        name: "Phạm Đức Thành",
        specialty: "Chuyên khoa Vi phẫu",
        avatar: MaleDoc,
        rating: 4.7,
        totalReviews: 68,
        location: "Hồ Chí Minh, Việt Nam",
        joinDate: "23/05/2023",
        
        // Introduction
        introduction: `Bác sĩ Phạm Đức Thành là chuyên gia hàng đầu về phổi học và kỹ thuật thụ tinh trong ống nghiệm (IVF) với hơn 12 năm kinh nghiệm trong lĩnh vực sinh sản học. Ông đã tích lũy kinh nghiệm giúp hàng nghìn cặp vợ chồng hiếm muộn thông qua chuyên môn sâu về nuôi cấy và đánh giá phôi.

        Với chuyên môn về các kỹ thuật tiên tiến như ICSI (tiêm tinh trùng vào bào tương trứng), PGT (sàng lọc di truyền tiền làm tổ), và nuôi cấy phôi nang, bác sĩ Hải đã mang đến hy vọng cho hàng trăm cặp vợ chồng trong việc nâng cao tỷ lệ thành công của các chu kỳ IVF tại phòng khám.

        Bác sĩ Hải nổi tiếng với phương pháp tiếp cận khoa học, tỉ mỉ và tận tâm. Ông luôn cập nhật những tiến bộ mới nhất trong lĩnh vực phổi học và sinh sản học để đảm bảo các kỹ thuật tiên tiến đạt được kết quả tốt nhất cho bệnh nhân. Sự kết hợp giữa chuyên môn kỹ thuật cao và sự quan tâm đến từng trường hợp cụ thể đã giúp bác sĩ Hải trở thành một thành viên được kính trọng trong đội ngũ điều trị hiếm muộn của chúng tôi.

        Ngoài công việc làm sáng, bác sĩ Hải còn tích cực tham gia nghiên cứu của viện trợ dạy về phổi học và IVF, góp phần nâng cao chất lượng điều trị hiếm muộn tại Việt Nam và đào tạo thế hệ bác sĩ chuyên khoa tương lai.`,

        // Treatment approach
        treatmentApproach: {
            title: "Phương Pháp Tiếp Cận",
            description: "Bác sĩ Hải tin rằng chất lượng phôi là yếu tố quyết định thành công của điều trị IVF. Với phương pháp tiếp cận toàn diện, bác sĩ kết hợp các kỹ thuật nuôi cấy phôi tiên tiến với đánh giá cẩn thận để lựa chọn phôi có tiềm năng làm tổ cao nhất.",
            methods: [
            {
                step: 1,
                title: "Chất lượng phôi",
                description: "Sử dụng các tiêu chuẩn đánh giá phôi quốc tế để lựa chọn phôi tốt nhất cho chuyển."
            },
            {
                step: 2,
                title: "Môi trường nuôi cấy tối ưu",
                description: "Đảm bảo điều kiện nuôi cấy phôi lý tưởng để tối ưu hóa sự phát triển của phôi."
            },
            {
                step: 3,
                title: "Cá nhân hóa",
                description: "Điều chỉnh phương pháp nuôi cấy và đánh giá phôi dựa trên đặc điểm cụ thể của từng bệnh nhân."
            },
            {
                step: 4,
                title: "Minh bạch",
                description: "Giải thích rõ ràng về chất lượng phôi và các lựa chọn điều trị cho bệnh nhân."
            }
            ]
        },

        // Education & Training
        education: [
            {
            period: "2005 - 2012",
            degree: "Bác sĩ Y khoa",
            institution: "Đại học Y Hà Nội"
            },
            {
            period: "2012 - 2015",
            degree: "Chuyên khoa I Sản Phụ khoa",
            institution: "Đại học Y Hà Nội"
            },
            {
            period: "2015 - 2018",
            degree: "Tiến sĩ Y học",
            institution: "Đại học Y Hà Nội",
            thesis: "Nghiên cứu ứng dụng ky thuật nuôi cấy phôi nang trong điều trị vô sinh"
            },
            {
            period: "2018",
            degree: "Chứng chỉ Phôi học Lâm sàng",
            institution: "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)"
            }
        ],

        // Certifications & Awards
        certifications: [
            {
            year: "2017",
            title: "Chứng chỉ Kỹ thuật ICSI Nâng cao",
            organization: "Hiệp hội Phổi học Châu Âu (ESHRE)"
            },
            {
            year: "2019",
            title: "Giải thưởng Nghiên cứu xuất sắc",
            organization: "Hội nghị Sinh sản Việt Nam"
            },
            {
            year: "2021",
            title: "Chứng nhận Xuất sắc trong Phôi học Lâm sàng",
            organization: "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)"
            }
        ],

        // Professional Experience
        experience: [
            {
            period: "2018 - Hiện tại",
            position: "Chuyên gia Phôi học và IVF",
            workplace: "Trung tâm Điều trị hiếm muộn, Hà Nội",
            responsibilities: [
                "Phụ trách phòng thi nghiệm phôi học",
                "Thực hiện kỹ thuật ICSI và nuôi cấy phôi",
                "Đánh giá chất lượng phôi và lựa chọn phôi chuyển",
                "Phát triển và cải tiến quy trình nuôi cấy phôi"
            ]
            },
            {
            period: "2015 - 2018",
            position: "Bác sĩ Sản Phụ khoa và Phôi học",
            workplace: "Bệnh viện Phụ sản Trung ương, Hà Nội",
            responsibilities: [
                "Thực hiện kỹ thuật IVF và ICSI",
                "Tham gia đội ngũ điều trị hiếm muộn",
                "Nghiên cứu về nuôi cấy phôi nang"
            ]
            },
            {
            period: "2012 - 2015",
            position: "Bác sĩ Nội trú",
            workplace: "Bệnh viện Phụ sản Trung ương, Hà Nội",
            responsibilities: [
                "Đào tạo chuyên sâu về sản phụ khoa",
                "Thực hành lâm sàng về điều trị hiếm muộn",
                "Tham gia nghiên cứu lâm sàng"
            ]
            }
        ],

        // Professional Activities
        activities: [
            {
                title: "Thành viên Hiệp hội",
                details: [
                    "Hiệp hội Phổi học Châu Âu (ESHRE)",
                    "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)",
                    "Hội Phổi học Lâm sàng Việt Nam",
                    "Hội Phụ Sản Việt Nam"
                ]
            },
            {
                title: "Giảng dạy & Đào tạo",
                details: [
                    "Giảng viên khoa học Phổi học Lâm sàng",
                    "Hướng dẫn bác sĩ nội trú về kỹ thuật IVF và ICSI",
                    "Tổ chức hội thảo về nuôi cấy phôi nang"
                ]
            },
            {
                title: "Nghiên cứu & Xuất bản",
                details: [
                    "Tác giả của nhiều bài báo về phổi học và IVF",
                    "Nghiên cứu về ảnh hưởng của môi trường nuôi cấy đến chất lượng phôi",
                    "Đóng góp cho hướng dẫn quốc gia về đánh giá chất lượng phôi"
                ]
            }
        ],

        // Working Hours
        workingHours: {
            "Thứ Hai": "9:00 - 16:00",
            "Thứ Ba": "9:00 - 16:00", 
            "Thứ Tư": "9:00 - 12:00",
            "Thứ Năm": "9:00 - 16:00",
            "Thứ Sáu": "9:00 - 16:00",
            "Thứ Bảy": "9:00 - 12:00"
        },

        // Specialties
        specialties: [
            "IVF - Thụ tinh trong ống nghiệm",
            "ICSI - Tiêm tinh trùng vào bào tương trứng", 
            "PGT - Sàng lọc di truyền tiền làm tổ",
            "Phôi học - Nuôi cấy và đánh giá phôi"
        ],

        // Reviews
        reviews: [
            {
            id: 1,
            patientName: "Lê Thị Thanh",
            date: "Tháng 4, 2023",
            rating: 5,
            comment: "Bác sĩ Hải là một chuyên gia tuyệt vời. Sau 3 lần thất bại với IVF ở nơi khác, chúng tôi đã đến gặp bác sĩ Hải và ông đã phân tích rất chi tiết về chất lượng phôi của chúng tôi. Ông đã điều chỉnh phương pháp nuôi cấy phôi và lần này chúng tôi đã thành công. Hiện tại tôi đang mang thai 5 tháng và mọi thứ đều rất tốt. Chúng tôi vô cùng biết ơn bác sĩ Hải!"
            },
            {
            id: 2,
            patientName: "Nguyễn Văn Tuấn",
            date: "Tháng 3, 2023",
            rating: 5,
            comment: "Bác sĩ Hải đã giải thích rất rõ ràng về quy trình IVF và vai trò của chất lượng phôi trong thành công của điều trị. Ông rất kiên nhẫn với tất cả các câu hỏi của chúng tôi và luôn cập nhật tình hình phát triển của phôi trong suốt quá trình nuôi cấy. Chúng tôi đánh giá cao sự chuyên nghiệp và lòng tận tâm của ông."
            },
            {
            id: 3,
            patientName: "Trần Thị Hoa",
            date: "Tháng 2, 2023", 
            rating: 5,
            comment: "Bác sĩ Hải là một chuyên gia phôi học xuất sắc. Ông đã quyết định nuôi cấy phôi của chúng tôi đến ngày 5 thay vì chuyển sớm vào ngày 3 như kế hoạch ban đầu, và điều này đã giúp chúng tôi có cơ hội phôi nang chất lượng tốt. Tôi đặc biệt ấn tượng với sự giải thích bác sĩ Hải về bất kỳ ai đang tìm kiếm điều trị IVF."
            }
        ],

        // Rating breakdown
        ratingBreakdown: {
            overall: 4.8,
            expertise: 4.9,
            attitude: 4.7,
            explanation: 4.8,
            timeManagement: 4.7
        }
    },
    {
        id: 5,
        name: "Vũ Thị Lan Anh",
        specialty: "Chuyên khoa Siêu âm và Chẩn đoán",
        avatar: FemaleDoc,
        rating: 4.9,
        totalReviews: 98,
        location: "Hồ Chí Minh, Việt Nam",
        joinDate: "26/05/2023",
        
        // Introduction
        introduction: `Bác sĩ Vũ Thị Lan Anh là chuyên gia hàng đầu về phổi học và kỹ thuật thụ tinh trong ống nghiệm (IVF) với hơn 12 năm kinh nghiệm trong lĩnh vực sinh sản học. Ông đã tích lũy kinh nghiệm giúp hàng nghìn cặp vợ chồng hiếm muộn thông qua chuyên môn sâu về nuôi cấy và đánh giá phôi.

        Với chuyên môn về các kỹ thuật tiên tiến như ICSI (tiêm tinh trùng vào bào tương trứng), PGT (sàng lọc di truyền tiền làm tổ), và nuôi cấy phôi nang, bác sĩ Hải đã mang đến hy vọng cho hàng trăm cặp vợ chồng trong việc nâng cao tỷ lệ thành công của các chu kỳ IVF tại phòng khám.

        Bác sĩ Hải nổi tiếng với phương pháp tiếp cận khoa học, tỉ mỉ và tận tâm. Ông luôn cập nhật những tiến bộ mới nhất trong lĩnh vực phổi học và sinh sản học để đảm bảo các kỹ thuật tiên tiến đạt được kết quả tốt nhất cho bệnh nhân. Sự kết hợp giữa chuyên môn kỹ thuật cao và sự quan tâm đến từng trường hợp cụ thể đã giúp bác sĩ Hải trở thành một thành viên được kính trọng trong đội ngũ điều trị hiếm muộn của chúng tôi.

        Ngoài công việc làm sáng, bác sĩ Hải còn tích cực tham gia nghiên cứu của viện trợ dạy về phổi học và IVF, góp phần nâng cao chất lượng điều trị hiếm muộn tại Việt Nam và đào tạo thế hệ bác sĩ chuyên khoa tương lai.`,

        // Treatment approach
        treatmentApproach: {
            title: "Phương Pháp Tiếp Cận",
            description: "Bác sĩ Hải tin rằng chất lượng phôi là yếu tố quyết định thành công của điều trị IVF. Với phương pháp tiếp cận toàn diện, bác sĩ kết hợp các kỹ thuật nuôi cấy phôi tiên tiến với đánh giá cẩn thận để lựa chọn phôi có tiềm năng làm tổ cao nhất.",
            methods: [
            {
                step: 1,
                title: "Chất lượng phôi",
                description: "Sử dụng các tiêu chuẩn đánh giá phôi quốc tế để lựa chọn phôi tốt nhất cho chuyển."
            },
            {
                step: 2,
                title: "Môi trường nuôi cấy tối ưu",
                description: "Đảm bảo điều kiện nuôi cấy phôi lý tưởng để tối ưu hóa sự phát triển của phôi."
            },
            {
                step: 3,
                title: "Cá nhân hóa",
                description: "Điều chỉnh phương pháp nuôi cấy và đánh giá phôi dựa trên đặc điểm cụ thể của từng bệnh nhân."
            },
            {
                step: 4,
                title: "Minh bạch",
                description: "Giải thích rõ ràng về chất lượng phôi và các lựa chọn điều trị cho bệnh nhân."
            }
            ]
        },

        // Education & Training
        education: [
            {
            period: "2005 - 2012",
            degree: "Bác sĩ Y khoa",
            institution: "Đại học Y Hà Nội"
            },
            {
            period: "2012 - 2015",
            degree: "Chuyên khoa I Sản Phụ khoa",
            institution: "Đại học Y Hà Nội"
            },
            {
            period: "2015 - 2018",
            degree: "Tiến sĩ Y học",
            institution: "Đại học Y Hà Nội",
            thesis: "Nghiên cứu ứng dụng ky thuật nuôi cấy phôi nang trong điều trị vô sinh"
            },
            {
            period: "2018",
            degree: "Chứng chỉ Phôi học Lâm sàng",
            institution: "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)"
            }
        ],

        // Certifications & Awards
        certifications: [
            {
            year: "2017",
            title: "Chứng chỉ Kỹ thuật ICSI Nâng cao",
            organization: "Hiệp hội Phổi học Châu Âu (ESHRE)"
            },
            {
            year: "2019",
            title: "Giải thưởng Nghiên cứu xuất sắc",
            organization: "Hội nghị Sinh sản Việt Nam"
            },
            {
            year: "2021",
            title: "Chứng nhận Xuất sắc trong Phôi học Lâm sàng",
            organization: "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)"
            }
        ],

        // Professional Experience
        experience: [
            {
            period: "2018 - Hiện tại",
            position: "Chuyên gia Phôi học và IVF",
            workplace: "Trung tâm Điều trị hiếm muộn, Hà Nội",
            responsibilities: [
                "Phụ trách phòng thi nghiệm phôi học",
                "Thực hiện kỹ thuật ICSI và nuôi cấy phôi",
                "Đánh giá chất lượng phôi và lựa chọn phôi chuyển",
                "Phát triển và cải tiến quy trình nuôi cấy phôi"
            ]
            },
            {
            period: "2015 - 2018",
            position: "Bác sĩ Sản Phụ khoa và Phôi học",
            workplace: "Bệnh viện Phụ sản Trung ương, Hà Nội",
            responsibilities: [
                "Thực hiện kỹ thuật IVF và ICSI",
                "Tham gia đội ngũ điều trị hiếm muộn",
                "Nghiên cứu về nuôi cấy phôi nang"
            ]
            },
            {
            period: "2012 - 2015",
            position: "Bác sĩ Nội trú",
            workplace: "Bệnh viện Phụ sản Trung ương, Hà Nội",
            responsibilities: [
                "Đào tạo chuyên sâu về sản phụ khoa",
                "Thực hành lâm sàng về điều trị hiếm muộn",
                "Tham gia nghiên cứu lâm sàng"
            ]
            }
        ],

        // Professional Activities
        activities: [
            {
                title: "Thành viên Hiệp hội",
                details: [
                    "Hiệp hội Phổi học Châu Âu (ESHRE)",
                    "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)",
                    "Hội Phổi học Lâm sàng Việt Nam",
                    "Hội Phụ Sản Việt Nam"
                ]
            },
            {
                title: "Giảng dạy & Đào tạo",
                details: [
                    "Giảng viên khoa học Phổi học Lâm sàng",
                    "Hướng dẫn bác sĩ nội trú về kỹ thuật IVF và ICSI",
                    "Tổ chức hội thảo về nuôi cấy phôi nang"
                ]
            },
            {
                title: "Nghiên cứu & Xuất bản",
                details: [
                    "Tác giả của nhiều bài báo về phổi học và IVF",
                    "Nghiên cứu về ảnh hưởng của môi trường nuôi cấy đến chất lượng phôi",
                    "Đóng góp cho hướng dẫn quốc gia về đánh giá chất lượng phôi"
                ]
            }
        ],

        // Working Hours
        workingHours: {
            "Thứ Hai": "9:00 - 16:00",
            "Thứ Ba": "9:00 - 16:00", 
            "Thứ Tư": "9:00 - 12:00",
            "Thứ Năm": "9:00 - 16:00",
            "Thứ Sáu": "9:00 - 16:00",
            "Thứ Bảy": "9:00 - 12:00"
        },

        // Specialties
        specialties: [
            "IVF - Thụ tinh trong ống nghiệm",
            "ICSI - Tiêm tinh trùng vào bào tương trứng", 
            "PGT - Sàng lọc di truyền tiền làm tổ",
            "Phôi học - Nuôi cấy và đánh giá phôi"
        ],

        // Reviews
        reviews: [
            {
            id: 1,
            patientName: "Lê Thị Thanh",
            date: "Tháng 4, 2023",
            rating: 5,
            comment: "Bác sĩ Hải là một chuyên gia tuyệt vời. Sau 3 lần thất bại với IVF ở nơi khác, chúng tôi đã đến gặp bác sĩ Hải và ông đã phân tích rất chi tiết về chất lượng phôi của chúng tôi. Ông đã điều chỉnh phương pháp nuôi cấy phôi và lần này chúng tôi đã thành công. Hiện tại tôi đang mang thai 5 tháng và mọi thứ đều rất tốt. Chúng tôi vô cùng biết ơn bác sĩ Hải!"
            },
            {
            id: 2,
            patientName: "Nguyễn Văn Tuấn",
            date: "Tháng 3, 2023",
            rating: 5,
            comment: "Bác sĩ Hải đã giải thích rất rõ ràng về quy trình IVF và vai trò của chất lượng phôi trong thành công của điều trị. Ông rất kiên nhẫn với tất cả các câu hỏi của chúng tôi và luôn cập nhật tình hình phát triển của phôi trong suốt quá trình nuôi cấy. Chúng tôi đánh giá cao sự chuyên nghiệp và lòng tận tâm của ông."
            },
            {
            id: 3,
            patientName: "Trần Thị Hoa",
            date: "Tháng 2, 2023", 
            rating: 5,
            comment: "Bác sĩ Hải là một chuyên gia phôi học xuất sắc. Ông đã quyết định nuôi cấy phôi của chúng tôi đến ngày 5 thay vì chuyển sớm vào ngày 3 như kế hoạch ban đầu, và điều này đã giúp chúng tôi có cơ hội phôi nang chất lượng tốt. Tôi đặc biệt ấn tượng với sự giải thích bác sĩ Hải về bất kỳ ai đang tìm kiếm điều trị IVF."
            }
        ],

        // Rating breakdown
        ratingBreakdown: {
            overall: 4.8,
            expertise: 4.9,
            attitude: 4.7,
            explanation: 4.8,
            timeManagement: 4.7
        }
    },
    {
        id: 6,
        name: "Đỗ Quang Hùng",
        specialty: "Chuyên khoa Di truyền Sinh Sản",
        avatar: MaleDoc,
        rating: 4.8,
        totalReviews: 96,
        location: "Hồ Chí Minh, Việt Nam",
        joinDate: "27/05/2023",
        
        // Introduction
        introduction: `Bác sĩ Đỗ Quang Hùng là chuyên gia hàng đầu về phổi học và kỹ thuật thụ tinh trong ống nghiệm (IVF) với hơn 12 năm kinh nghiệm trong lĩnh vực sinh sản học. Ông đã tích lũy kinh nghiệm giúp hàng nghìn cặp vợ chồng hiếm muộn thông qua chuyên môn sâu về nuôi cấy và đánh giá phôi.

        Với chuyên môn về các kỹ thuật tiên tiến như ICSI (tiêm tinh trùng vào bào tương trứng), PGT (sàng lọc di truyền tiền làm tổ), và nuôi cấy phôi nang, bác sĩ Hải đã mang đến hy vọng cho hàng trăm cặp vợ chồng trong việc nâng cao tỷ lệ thành công của các chu kỳ IVF tại phòng khám.

        Bác sĩ Hải nổi tiếng với phương pháp tiếp cận khoa học, tỉ mỉ và tận tâm. Ông luôn cập nhật những tiến bộ mới nhất trong lĩnh vực phổi học và sinh sản học để đảm bảo các kỹ thuật tiên tiến đạt được kết quả tốt nhất cho bệnh nhân. Sự kết hợp giữa chuyên môn kỹ thuật cao và sự quan tâm đến từng trường hợp cụ thể đã giúp bác sĩ Hải trở thành một thành viên được kính trọng trong đội ngũ điều trị hiếm muộn của chúng tôi.

        Ngoài công việc làm sáng, bác sĩ Hải còn tích cực tham gia nghiên cứu của viện trợ dạy về phổi học và IVF, góp phần nâng cao chất lượng điều trị hiếm muộn tại Việt Nam và đào tạo thế hệ bác sĩ chuyên khoa tương lai.`,

        // Treatment approach
        treatmentApproach: {
            title: "Phương Pháp Tiếp Cận",
            description: "Bác sĩ Hải tin rằng chất lượng phôi là yếu tố quyết định thành công của điều trị IVF. Với phương pháp tiếp cận toàn diện, bác sĩ kết hợp các kỹ thuật nuôi cấy phôi tiên tiến với đánh giá cẩn thận để lựa chọn phôi có tiềm năng làm tổ cao nhất.",
            methods: [
            {
                step: 1,
                title: "Chất lượng phôi",
                description: "Sử dụng các tiêu chuẩn đánh giá phôi quốc tế để lựa chọn phôi tốt nhất cho chuyển."
            },
            {
                step: 2,
                title: "Môi trường nuôi cấy tối ưu",
                description: "Đảm bảo điều kiện nuôi cấy phôi lý tưởng để tối ưu hóa sự phát triển của phôi."
            },
            {
                step: 3,
                title: "Cá nhân hóa",
                description: "Điều chỉnh phương pháp nuôi cấy và đánh giá phôi dựa trên đặc điểm cụ thể của từng bệnh nhân."
            },
            {
                step: 4,
                title: "Minh bạch",
                description: "Giải thích rõ ràng về chất lượng phôi và các lựa chọn điều trị cho bệnh nhân."
            }
            ]
        },

        // Education & Training
        education: [
            {
            period: "2005 - 2012",
            degree: "Bác sĩ Y khoa",
            institution: "Đại học Y Hà Nội"
            },
            {
            period: "2012 - 2015",
            degree: "Chuyên khoa I Sản Phụ khoa",
            institution: "Đại học Y Hà Nội"
            },
            {
            period: "2015 - 2018",
            degree: "Tiến sĩ Y học",
            institution: "Đại học Y Hà Nội",
            thesis: "Nghiên cứu ứng dụng ky thuật nuôi cấy phôi nang trong điều trị vô sinh"
            },
            {
            period: "2018",
            degree: "Chứng chỉ Phôi học Lâm sàng",
            institution: "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)"
            }
        ],

        // Certifications & Awards
        certifications: [
            {
            year: "2017",
            title: "Chứng chỉ Kỹ thuật ICSI Nâng cao",
            organization: "Hiệp hội Phổi học Châu Âu (ESHRE)"
            },
            {
            year: "2019",
            title: "Giải thưởng Nghiên cứu xuất sắc",
            organization: "Hội nghị Sinh sản Việt Nam"
            },
            {
            year: "2021",
            title: "Chứng nhận Xuất sắc trong Phôi học Lâm sàng",
            organization: "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)"
            }
        ],

        // Professional Experience
        experience: [
            {
            period: "2018 - Hiện tại",
            position: "Chuyên gia Phôi học và IVF",
            workplace: "Trung tâm Điều trị hiếm muộn, Hà Nội",
            responsibilities: [
                "Phụ trách phòng thi nghiệm phôi học",
                "Thực hiện kỹ thuật ICSI và nuôi cấy phôi",
                "Đánh giá chất lượng phôi và lựa chọn phôi chuyển",
                "Phát triển và cải tiến quy trình nuôi cấy phôi"
            ]
            },
            {
            period: "2015 - 2018",
            position: "Bác sĩ Sản Phụ khoa và Phôi học",
            workplace: "Bệnh viện Phụ sản Trung ương, Hà Nội",
            responsibilities: [
                "Thực hiện kỹ thuật IVF và ICSI",
                "Tham gia đội ngũ điều trị hiếm muộn",
                "Nghiên cứu về nuôi cấy phôi nang"
            ]
            },
            {
            period: "2012 - 2015",
            position: "Bác sĩ Nội trú",
            workplace: "Bệnh viện Phụ sản Trung ương, Hà Nội",
            responsibilities: [
                "Đào tạo chuyên sâu về sản phụ khoa",
                "Thực hành lâm sàng về điều trị hiếm muộn",
                "Tham gia nghiên cứu lâm sàng"
            ]
            }
        ],

        // Professional Activities
        activities: [
            {
                title: "Thành viên Hiệp hội",
                details: [
                    "Hiệp hội Phổi học Châu Âu (ESHRE)",
                    "Hiệp hội Sinh sản Châu Á Thái Bình Dương (ASPIRE)",
                    "Hội Phổi học Lâm sàng Việt Nam",
                    "Hội Phụ Sản Việt Nam"
                ]
            },
            {
                title: "Giảng dạy & Đào tạo",
                details: [
                    "Giảng viên khoa học Phổi học Lâm sàng",
                    "Hướng dẫn bác sĩ nội trú về kỹ thuật IVF và ICSI",
                    "Tổ chức hội thảo về nuôi cấy phôi nang"
                ]
            },
            {
                title: "Nghiên cứu & Xuất bản",
                details: [
                    "Tác giả của nhiều bài báo về phổi học và IVF",
                    "Nghiên cứu về ảnh hưởng của môi trường nuôi cấy đến chất lượng phôi",
                    "Đóng góp cho hướng dẫn quốc gia về đánh giá chất lượng phôi"
                ]
            }
        ],

        // Working Hours
        workingHours: {
            "Thứ Hai": "9:00 - 16:00",
            "Thứ Ba": "9:00 - 16:00", 
            "Thứ Tư": "9:00 - 12:00",
            "Thứ Năm": "9:00 - 16:00",
            "Thứ Sáu": "9:00 - 16:00",
            "Thứ Bảy": "9:00 - 12:00"
        },

        // Specialties
        specialties: [
            "IVF - Thụ tinh trong ống nghiệm",
            "ICSI - Tiêm tinh trùng vào bào tương trứng", 
            "PGT - Sàng lọc di truyền tiền làm tổ",
            "Phôi học - Nuôi cấy và đánh giá phôi"
        ],

        // Reviews
        reviews: [
            {
            id: 1,
            patientName: "Lê Thị Thanh",
            date: "Tháng 4, 2023",
            rating: 5,
            comment: "Bác sĩ Hải là một chuyên gia tuyệt vời. Sau 3 lần thất bại với IVF ở nơi khác, chúng tôi đã đến gặp bác sĩ Hải và ông đã phân tích rất chi tiết về chất lượng phôi của chúng tôi. Ông đã điều chỉnh phương pháp nuôi cấy phôi và lần này chúng tôi đã thành công. Hiện tại tôi đang mang thai 5 tháng và mọi thứ đều rất tốt. Chúng tôi vô cùng biết ơn bác sĩ Hải!"
            },
            {
            id: 2,
            patientName: "Nguyễn Văn Tuấn",
            date: "Tháng 3, 2023",
            rating: 5,
            comment: "Bác sĩ Hải đã giải thích rất rõ ràng về quy trình IVF và vai trò của chất lượng phôi trong thành công của điều trị. Ông rất kiên nhẫn với tất cả các câu hỏi của chúng tôi và luôn cập nhật tình hình phát triển của phôi trong suốt quá trình nuôi cấy. Chúng tôi đánh giá cao sự chuyên nghiệp và lòng tận tâm của ông."
            },
            {
            id: 3,
            patientName: "Trần Thị Hoa",
            date: "Tháng 2, 2023", 
            rating: 5,
            comment: "Bác sĩ Hải là một chuyên gia phôi học xuất sắc. Ông đã quyết định nuôi cấy phôi của chúng tôi đến ngày 5 thay vì chuyển sớm vào ngày 3 như kế hoạch ban đầu, và điều này đã giúp chúng tôi có cơ hội phôi nang chất lượng tốt. Tôi đặc biệt ấn tượng với sự giải thích bác sĩ Hải về bất kỳ ai đang tìm kiếm điều trị IVF."
            }
        ],

        // Rating breakdown
        ratingBreakdown: {
            overall: 4.8,
            expertise: 4.9,
            attitude: 4.7,
            explanation: 4.8,
            timeManagement: 4.7
        }
    },
];