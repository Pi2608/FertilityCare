"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Medicine.css"

const Medicine = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [productTypeFilter, setProductTypeFilter] = useState("")
  const [quantityFilter, setQuantityFilter] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentMedicine, setCurrentMedicine] = useState(null)

  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Albuterol (salbutamol)",
      code: "ALSXCE00123",
      type: "Inhaler",
      quantity: 100,
    },
    {
      id: 2,
      name: "Amoxicillin 250 mg",
      code: "AMSXCE00143",
      type: "Tablet",
      quantity: 28,
    },
    {
      id: 3,
      name: "Aspirin 300 mg",
      code: "ASPXCE00120",
      type: "Tablet",
      quantity: 190,
    },
    {
      id: 4,
      name: "Benadryl 500 ml",
      code: "SYPCBED0012",
      type: "Syrup",
      quantity: 80,
    },
    {
      id: 5,
      name: "Bufexamac 100 g",
      code: "CRMXCE00123",
      type: "Cream",
      quantity: 100,
    },
    {
      id: 6,
      name: "Cefixime 300 mg",
      code: "CAPXUE00023",
      type: "Capsule",
      quantity: 100,
    },
    {
      id: 7,
      name: "KZ Soap 250g",
      code: "SOPXUE00103",
      type: "Soap",
      quantity: 100,
    },
    {
      id: 8,
      name: "Paracetamol 250mg",
      code: "ALSXCE00124",
      type: "Tablet",
      quantity: 100,
    },
  ])

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    code: "",
    type: "Tablet",
    quantity: 0,
  })

  // Danh sách các loại sản phẩm
  const productTypes = ["Tablet", "Capsule", "Syrup", "Cream", "Inhaler", "Soap", "Injection", "Powder"]

  // Danh sách các lựa chọn số lượng để lọc
  const quantityOptions = [
    { label: "Tất cả", value: "" },
    { label: "Dưới 50", value: "under50" },
    { label: "50-100", value: "50to100" },
    { label: "Trên 100", value: "over100" },
  ]

  // Lọc danh sách thuốc dựa trên các điều kiện tìm kiếm và lọc
  const filteredMedicines = medicines.filter((medicine) => {
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.code.toLowerCase().includes(searchTerm.toLowerCase())

    // Lọc theo loại sản phẩm
    const matchesType = productTypeFilter === "" || medicine.type === productTypeFilter

    // Lọc theo số lượng
    let matchesQuantity = true
    if (quantityFilter === "under50") {
      matchesQuantity = medicine.quantity < 50
    } else if (quantityFilter === "50to100") {
      matchesQuantity = medicine.quantity >= 50 && medicine.quantity <= 100
    } else if (quantityFilter === "over100") {
      matchesQuantity = medicine.quantity > 100
    }

    return matchesSearch && matchesType && matchesQuantity
  })

  // Xử lý thêm thuốc mới
  const handleAddMedicine = () => {
    // Kiểm tra dữ liệu đầu vào
    if (!newMedicine.name || !newMedicine.code || !newMedicine.type) {
      alert("Vui lòng điền đầy đủ thông tin thuốc")
      return
    }

    // Thêm thuốc mới vào danh sách
    const newId = medicines.length > 0 ? Math.max(...medicines.map((m) => m.id)) + 1 : 1
    const medicineToAdd = {
      ...newMedicine,
      id: newId,
      quantity: Number.parseInt(newMedicine.quantity) || 0,
    }

    setMedicines([...medicines, medicineToAdd])

    // Reset form và đóng modal
    setNewMedicine({
      name: "",
      code: "",
      type: "Tablet",
      quantity: 0,
    })
    setIsAddModalOpen(false)
  }

  // Xử lý chỉnh sửa thuốc
  const handleEditClick = (medicine) => {
    setCurrentMedicine({ ...medicine })
    setIsEditModalOpen(true)
  }

  // Lưu thay đổi khi chỉnh sửa
  const handleSaveEdit = () => {
    if (!currentMedicine.name || !currentMedicine.code || !currentMedicine.type) {
      alert("Vui lòng điền đầy đủ thông tin thuốc")
      return
    }

    setMedicines(
      medicines.map((medicine) =>
        medicine.id === currentMedicine.id
          ? { ...currentMedicine, quantity: Number.parseInt(currentMedicine.quantity) || 0 }
          : medicine,
      ),
    )

    setIsEditModalOpen(false)
    setCurrentMedicine(null)
  }

  // Xử lý xóa thuốc
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thuốc này?")) {
      setMedicines(medicines.filter((medicine) => medicine.id !== id))
    }
  }

  return (
    <div className="medicine-page">
      {/* Header */}
      <header className="medicine-header">
        <h1 className="page-title">Kho thuốc</h1>

        <div className="header-actions">
          <div className="notification-bell">
            <span>🔔</span>
            <div className="notification-dot"></div>
          </div>

          <div className="user-profile">
            <div className="avatar">
              <span>JC</span>
            </div>
            <div className="user-info">
              <div className="user-name">Jonitha Cathrine</div>
              <div className="user-role">Manager</div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="medicine-content">
        {/* Search and Filters */}
        <div className="filters-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <div className="filter-dropdown">
              <select
                value={productTypeFilter}
                onChange={(e) => setProductTypeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">Loại sản phẩm</option>
                {productTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <span className="dropdown-icon">▼</span>
            </div>

            <div className="filter-dropdown">
              <select
                value={quantityFilter}
                onChange={(e) => setQuantityFilter(e.target.value)}
                className="filter-select"
              >
                {quantityOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="dropdown-icon">▼</span>
            </div>
          </div>

          <button className="add-medicine-btn" onClick={() => setIsAddModalOpen(true)}>
            <span>+</span>
            Thêm sản phẩm
          </button>
        </div>

        {/* Medicines Table */}
        <div className="table-wrapper">
          <table className="medicines-table">
            <thead>
              <tr>
                <th>Tên thuốc</th>
                <th>Phân loại</th>
                <th>Số lượng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td className="medicine-name-cell">
                    <div className="medicine-name">{medicine.name}</div>
                    <div className="medicine-code">{medicine.code}</div>
                  </td>
                  <td>{medicine.type}</td>
                  <td>{medicine.quantity}</td>
                  <td className="action-cell">
                    <button className="edit-btn" onClick={() => handleEditClick(medicine)}>
                      Chỉnh sửa
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(medicine.id)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-section">
          <button className="pagination-btn prev">Trước đó</button>

          <div className="page-numbers">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">4</button>
          </div>

          <button className="pagination-btn next">Tiếp theo</button>
        </div>
      </main>

      {/* Add Medicine Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Thêm sản phẩm mới</h2>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Tên thuốc</label>
                <input
                  type="text"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                  placeholder="Nhập tên thuốc"
                />
              </div>
              <div className="form-group">
                <label>Mã thuốc</label>
                <input
                  type="text"
                  value={newMedicine.code}
                  onChange={(e) => setNewMedicine({ ...newMedicine, code: e.target.value })}
                  placeholder="Nhập mã thuốc"
                />
              </div>
              <div className="form-group">
                <label>Loại sản phẩm</label>
                <select
                  value={newMedicine.type}
                  onChange={(e) => setNewMedicine({ ...newMedicine, type: e.target.value })}
                >
                  {productTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Số lượng</label>
                <input
                  type="number"
                  value={newMedicine.quantity}
                  onChange={(e) => setNewMedicine({ ...newMedicine, quantity: e.target.value })}
                  placeholder="Nhập số lượng"
                  min="0"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>
                Hủy
              </button>
              <button className="save-btn" onClick={handleAddMedicine}>
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Medicine Modal */}
      {isEditModalOpen && currentMedicine && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Chỉnh sửa sản phẩm</h2>
              <button className="close-btn" onClick={() => setIsEditModalOpen(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Tên thuốc</label>
                <input
                  type="text"
                  value={currentMedicine.name}
                  onChange={(e) => setCurrentMedicine({ ...currentMedicine, name: e.target.value })}
                  placeholder="Nhập tên thuốc"
                />
              </div>
              <div className="form-group">
                <label>Mã thuốc</label>
                <input
                  type="text"
                  value={currentMedicine.code}
                  onChange={(e) => setCurrentMedicine({ ...currentMedicine, code: e.target.value })}
                  placeholder="Nhập mã thuốc"
                />
              </div>
              <div className="form-group">
                <label>Loại sản phẩm</label>
                <select
                  value={currentMedicine.type}
                  onChange={(e) => setCurrentMedicine({ ...currentMedicine, type: e.target.value })}
                >
                  {productTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Số lượng</label>
                <input
                  type="number"
                  value={currentMedicine.quantity}
                  onChange={(e) => setCurrentMedicine({ ...currentMedicine, quantity: e.target.value })}
                  placeholder="Nhập số lượng"
                  min="0"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsEditModalOpen(false)}>
                Hủy
              </button>
              <button className="save-btn" onClick={handleSaveEdit}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Medicine
