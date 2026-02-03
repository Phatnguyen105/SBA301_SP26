import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Orchid from "../components/Orchid";
import ConfirmModal from "../components/ConfirmModal";

import {
  getAllOrchids,
  createOrchid,
  updateOrchid,
  deleteOrchid,
} from "../utils/orchidApi";

import { getAllCategories } from "../utils/categoryApi";

function AdminLayout() {
  const [orchids, setOrchids] = useState([]);
  const [categories, setCategories] = useState([]);

  // ===== MODAL STATES =====
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // ===== SELECTED =====
  const [selected, setSelected] = useState(null);

  // ===== EDIT FORM =====
  const [editData, setEditData] = useState({
    orchidName: "",
    price: "",
    image: "",
    description: "",
    categoryId: "",
  });

  // ===== ADD FORM =====
  const [addData, setAddData] = useState({
    orchidName: "",
    price: "",
    image: "",
    description: "",
    categoryId: "",
  });

  // ===== FETCH =====
  const fetchOrchids = async () => {
    try {
      const res = await getAllOrchids();
      setOrchids(res.data);
    } catch {
      toast.error("❌ Không tải được danh sách Orchid");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch {
      toast.error("❌ Không tải được Category");
    }
  };

  useEffect(() => {
    fetchOrchids();
    fetchCategories();
  }, []);

  // ===== ADD =====
  const handleConfirmAdd = async () => {
    if (!addData.categoryId) {
      toast.warning("⚠️ Vui lòng chọn Category");
      return;
    }

    try {
      await createOrchid({
        orchidName: addData.orchidName,
        description: addData.description,
        image: addData.image,
        price: Number(addData.price),
        isSpecial: false,
        categoryId: Number(addData.categoryId),
      });

      toast.success("🌸 Thêm Orchid thành công");
      setShowAdd(false);
      setAddData({
        orchidName: "",
        price: "",
        image: "",
        description: "",
        categoryId: "",
      });
      fetchOrchids();
    } catch {
      toast.error("❌ Thêm Orchid thất bại");
    }
  };

  // ===== EDIT =====
  const handleEdit = (orchid) => {
    setSelected(orchid);
    setEditData({
      orchidName: orchid.orchidName ?? "",
      price: orchid.price ?? "",
      image: orchid.image ?? "",
      description: orchid.description ?? "",
      categoryId: orchid.categoryId ?? "",
    });
    setShowEdit(true);
  };

  const handleConfirmEdit = async () => {
    if (!editData.categoryId) {
      toast.warning("⚠️ Vui lòng chọn Category");
      return;
    }

    try {
      await updateOrchid(selected.id, {
        orchidName: editData.orchidName,
        description: editData.description,
        image: editData.image,
        price: Number(editData.price),
        isSpecial: selected.isSpecial,
        categoryId: Number(editData.categoryId),
      });

      toast.success("✅ Cập nhật Orchid thành công");
      setShowEdit(false);
      setSelected(null);
      fetchOrchids();
    } catch {
      toast.error("❌ Cập nhật Orchid thất bại");
    }
  };

  // ===== DELETE =====
  const handleOpenDelete = (orchid) => {
    setSelected(orchid);
    setShowDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteOrchid(selected.id);
      toast.success("🗑️ Xoá Orchid thành công");
      setShowDelete(false);
      setSelected(null);
      fetchOrchids();
    } catch {
      toast.error("❌ Xoá Orchid thất bại");
    }
  };

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin – Orchid Management</h2>
        <button className="btn btn-success" onClick={() => setShowAdd(true)}>
          + Thêm Orchid
        </button>
      </div>

      {/* LIST */}
      <div className="row g-3">
        {orchids.map((o) => (
          <div className="col-md-4" key={o.id}>
            <Orchid
              {...o}
              isAdmin
              onEdit={() => handleEdit(o)}
              onDelete={() => handleOpenDelete(o)}
            />
          </div>
        ))}
      </div>

      {/* DELETE MODAL */}
      <ConfirmModal
        show={showDelete}
        handleClose={() => setShowDelete(false)}
        title="Xác nhận xoá"
        body={`Bạn có chắc muốn xoá "${selected?.orchidName}"?`}
        onConfirm={handleConfirmDelete}
      />

      {/* EDIT MODAL */}
      <ConfirmModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        title="Sửa Orchid"
        body={
          <>
            <input
              className="form-control mb-2"
              placeholder="Tên Orchid"
              value={editData.orchidName}
              onChange={(e) =>
                setEditData({ ...editData, orchidName: e.target.value })
              }
            />

            <input
              type="number"
              className="form-control mb-2"
              placeholder="Giá"
              value={editData.price}
              onChange={(e) =>
                setEditData({ ...editData, price: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Image URL"
              value={editData.image}
              onChange={(e) =>
                setEditData({ ...editData, image: e.target.value })
              }
            />

            <select
              className="form-select mb-2"
              value={editData.categoryId}
              onChange={(e) =>
                setEditData({ ...editData, categoryId: e.target.value })
              }
            >
              <option value="">-- Chọn Category --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <textarea
              className="form-control"
              placeholder="Description"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />
          </>
        }
        onConfirm={handleConfirmEdit}
      />

      {/* ADD MODAL */}
      <ConfirmModal
        show={showAdd}
        handleClose={() => setShowAdd(false)}
        title="Thêm Orchid mới"
        body={
          <>
            <input
              className="form-control mb-2"
              placeholder="Tên Orchid"
              value={addData.orchidName}
              onChange={(e) =>
                setAddData({ ...addData, orchidName: e.target.value })
              }
            />

            <input
              type="number"
              className="form-control mb-2"
              placeholder="Giá"
              value={addData.price}
              onChange={(e) =>
                setAddData({ ...addData, price: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Image URL"
              value={addData.image}
              onChange={(e) =>
                setAddData({ ...addData, image: e.target.value })
              }
            />

            <select
              className="form-select mb-2"
              value={addData.categoryId}
              onChange={(e) =>
                setAddData({ ...addData, categoryId: e.target.value })
              }
            >
              <option value="">-- Chọn Category --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <textarea
              className="form-control"
              placeholder="Description"
              value={addData.description}
              onChange={(e) =>
                setAddData({ ...addData, description: e.target.value })
              }
            />
          </>
        }
        onConfirm={handleConfirmAdd}
      />
    </div>
  );
}

export default AdminLayout;
