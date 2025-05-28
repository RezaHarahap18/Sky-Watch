import JakartaMap from '../components/jakartaMap';

function PollutionPage() {
  return (
    <div className="container mt-5 pt-4">
      <h2 className="mb-4">Peta Polusi Jakarta</h2>
      <JakartaMap />
      <div className="status-cards container my-4">
        <div className="row justify-content-center gap-3">
          <div className="col-md-3 card border-success mb-3 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-success">Baik</h5>
              <p className="card-text">PM2.5: 0 – 50 µg/m³</p>
              <small className="text-muted">Udara bersih dan sehat untuk beraktivitas.</small>
            </div>
          </div>

          <div className="col-md-3 card border-warning mb-3 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-warning">Sedang</h5>
              <p className="card-text">PM2.5: 51 – 100 µg/m³</p>
              <small className="text-muted">Udara mulai tercemar, hati-hati untuk kelompok sensitif.</small>
            </div>
          </div>

          <div className="col-md-3 card border-danger mb-3 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-danger">Buruk</h5>
              <p className="card-text">PM2.5: &gt; 100 µg/m³</p>
              <small className="text-muted">Udara tidak sehat, disarankan menghindari aktivitas luar.</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default PollutionPage;
