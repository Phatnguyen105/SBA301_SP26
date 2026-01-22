import { useEffect, useState } from "react";
import Orchid from "../components/Orchid";
import ConfirmModal from "../components/ConfirmModal";
import { orchidAPI } from "../utils/api";

function AdminLayout() {
  const [orchids, setOrchids] = useState([]);

  // ===== MODAL STATES =====
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // ===== SELECTED ORCHID =====
  const [selected, setSelected] = useState(null);

  // ===== EDIT FORM =====
  const [editData, setEditData] = useState({
    orchidName: "",
    price: "",
  });

  // ===== ADD FORM =====
  const [addData, setAddData] = useState({
    orchidName: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  // ===== FETCH =====
  const fetchOrchids = async () => {
    const data = await orchidAPI.getAll();
    setOrchids(data);
  };

  useEffect(() => {
    fetchOrchids();
  }, []);

  // ===== ADD =====
  const handleConfirmAdd = async () => {
    await orchidAPI.create({
      ...addData,
      price: Number(addData.price),
      isSpecial: false,
    });

    setShowAdd(false);
    setAddData({
      orchidName: "",
      price: "",
      image: "",
      category: "",
      description: "",
    });

    fetchOrchids();
  };

  // ===== EDIT =====
  const handleEdit = (orchid) => {
    setSelected(orchid);
    setEditData({
      orchidName: orchid.orchidName,
      price: orchid.price,
    });
    setShowEdit(true);
  };

  const handleConfirmEdit = async () => {
    await orchidAPI.update(selected.id, {
      ...selected,
      orchidName: editData.orchidName,
      price: Number(editData.price),
    });

    setShowEdit(false);
    setSelected(null);
    fetchOrchids();
  };

  // ===== DELETE =====
  const handleOpenDelete = (orchid) => {
    setSelected(orchid);
    setShowDelete(true);
  };

  const handleConfirmDelete = async () => {
    await orchidAPI.delete(selected.id);
    setShowDelete(false);
    setSelected(null);
    fetchOrchids();
  };

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin – Orchid Management</h2>
        <button
          className="btn btn-success"
          onClick={() => setShowAdd(true)}
        >
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

      {/* ===== DELETE MODAL ===== */}
      <ConfirmModal
        show={showDelete}
        handleClose={() => setShowDelete(false)}
        title="Xác nhận xoá"
        body={`Bạn có chắc muốn xoá "${selected?.orchidName}"?`}
        onConfirm={handleConfirmDelete}
      />

      {/* ===== EDIT MODAL ===== */}
      <ConfirmModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        title="Sửa Orchid"
        body={
          <>
            <div className="mb-3">
              <label className="form-label">Tên Orchid</label>
              <input
                className="form-control"
                value={editData.orchidName}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    orchidName: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="form-label">Giá</label>
              <input
                type="number"
                className="form-control"
                value={editData.price}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    price: e.target.value,
                  })
                }
              />
            </div>
          </>
        }
        onConfirm={handleConfirmEdit}
      />

      {/* ===== ADD MODAL ===== */}
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

            <input
              className="form-control mb-2"
              placeholder="Category"
              value={addData.category}
              onChange={(e) =>
                setAddData({ ...addData, category: e.target.value })
              }
            />

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
