// mockPatientData.js
const mockPatientData = {
  name: "Nguyễn Thị Hoa",
  id: "PT-2024-0123",
  status: "Đang điều trị",
  birthDate: "1989-06-15", // ISO format để dễ binding <input type="date">
  gender: "female", // "male" | "female" | "other"
  phone: "0912345678",
  email: "test@example.com",
  address: "123 Đường Lê Lợi, Quận 1",
  treatment: "IVF Chu kỳ #2",
  startDate: "2024-04-01", // ISO format hoặc yyyy-mm-dd
  doctor: "BS. Nguyễn Lan Anh",

  // Mảng dữ liệu để hiển thị collapsible sections
  medicalHistory: [
    "Vô sinh nguyên phát",
    "Lạc nội mạc tử cung nhẹ",
    "Đã trải qua 1 chu kỳ IVF không thành công (12/2023)",
  ],
  familyHistory: [
    "Không có tiền sử gia đình về vô sinh",
    "Mẹ có tiền sử lạc nội mạc tử cung",
  ],
  allergies: ["Không có"],

  // Dữ liệu treatment plan:
  treatmentPlan: {
    currentStage: "Kích thích buồng trứng",
    nextStage: "Thu trứng",
    nextExpectedDate: "2024-05-28",
    note:
      "Đáp ứng tốt với liều pháp kích thích buồng trứng. Tiếp tục theo dõi sự phát triển của nang noãn.",
  },

  // Thuốc hiện tại / lịch sử thuốc
  medications: [
    {
      id: 1,
      name: "Gonal-F",
      dosage: "150 IU",
      frequency: "Hàng ngày",
      startDate: "2024-05-10",
      status: "active", // "active" | "stopped"
    },
    {
      id: 2,
      name: "Cetrotide",
      dosage: "0.25mg",
      frequency: "Hàng ngày",
      startDate: "2024-05-15",
      status: "active",
    },
    // Có thể thêm mục đã ngưng nếu muốn hiển thị lịch sử
    // {
    //   id: 3,
    //   name: "ABC",
    //   dosage: "xxx",
    //   frequency: "...",
    //   startDate: "2024-03-01",
    //   status: "stopped",
    //   endDate: "2024-04-01"
    // },
  ],

  // Lịch hẹn
  schedule: {
    upcoming: [
      {
        id: 1,
        title: "Tư vấn theo dõi",
        date: "2024-05-20",
        time: "09:00 - 09:30",
        doctor: "BS. Nguyễn Lan Anh",
      },
      {
        id: 2,
        title: "Siêu âm theo dõi",
        date: "2024-05-25",
        time: "10:15 - 10:45",
        doctor: "BS. Nguyễn Lan Anh",
      },
    ],
    history: [
      {
        id: 3,
        title: "Tư vấn",
        date: "2024-05-05",
        time: "14:00 - 14:30",
        doctor: "BS. Nguyễn Lan Anh",
      },
    ],
  },

  // Kết quả xét nghiệm
  results: [
    {
      id: 1,
      title: "Xét nghiệm nội tiết",
      date: "2024-05-05",
      result: "Nồng độ FSH, LH, E2 trong giới hạn bình thường",
    },
    {
      id: 2,
      title: "Siêu âm buồng trứng",
      date: "2024-04-15",
      result: "Số lượng nang noãn: 12",
    },
  ],
};

export default mockPatientData;
