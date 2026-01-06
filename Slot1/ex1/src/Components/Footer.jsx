function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto w-100">
      <div className="container-fluid px-4">
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <img
              src="https://i.pravatar.cc/100?img=34"
              alt="Author avatar"
              className="rounded-circle"
              width="100"
              height="100"
            />
          </div>

          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h5 className="mb-1">Tác giả: &copy; Phatnguyen</h5>
            <p className="mb-0">Backend Developer</p>
          </div>

          <div className="col-md-4 text-center text-md-start">
            <h5 className="mb-1">Liên hệ</h5>

            {/* Truncate + không xuống hàng */}
            <a
              href="mailto:Phatnguyen111005@gmail.com"
              className="text-light text-decoration-none d-block text-truncate text-nowrap"
              title="Phatnguyen111005@gmail.com"
            >
              Phatnguyen111005@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer