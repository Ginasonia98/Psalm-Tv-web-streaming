const Card = ({ movie, i }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 mb-4" key={i}>
      <div className="Movie-wrapper rounded-3">
        <div className="Movie-id pt-2 fs-6">{movie.id}</div>
        <div className="Movie-title pb-2 fs-5">{movie.title}</div>
        <div className="px-2">
          <img
            className="Movie-image rounded-4"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt="Movie"
          />
        </div>
        <div className="px-4">
          <div className="position-relative bg-white h-200px wrapper top-card rounded-3">
            <div className="Movie-popularity pt-2 fs-6">{movie.popularity}</div>
            <div className="Movie-overview p-2 fs-6">{movie.overview}</div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Card;
