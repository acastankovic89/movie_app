import "./AdminHome.css";
import PropTypes from "prop-types";
import AddAdminUser from "../AddAdminUser/AddAdminUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AddMovie from "../AddMovie/AddMovie";
import UpdatedMovie from "../UpdateMovie/UpdateMovie";
import DeleteMovie from "../DeleteMovie/DeleteMovie";

const AdminHome = () => {
  const [clickOpener, setClickOpener] = useState(false);
  const [modalOpener, setModalOpener] = useState({ height: "0" });
  const [clickMovieOpener, setClickMovieOpener] = useState(false);
  const [clickUpdateMovieOpener, setClickUpdateMovieOpener] = useState(false);
  const [clickDeleteMovieOpener, setClickDeleteMovieOpener] = useState(false);
  const [movieModalOpener, setMovieModalOpener] = useState({ height: "0" });
  const [updateMovieModalOpener, setUpdateMovieModalOpener] = useState({
    height: "0",
  });
  const [deleteMovieModalOpener, setDeleteMovieModalOpener] = useState({
    height: "0",
  });

  const openModalFunc = () => {
    setClickOpener(!clickOpener);
  };

  const openMovieModalFunc = () => {
    setClickMovieOpener(!clickMovieOpener);
  };

  const openUpdateMovieModalFunc = () => {
    setClickUpdateMovieOpener(!clickUpdateMovieOpener);
  };

  const openDeleteMovieModalFunc = () => {
    setClickDeleteMovieOpener(!clickDeleteMovieOpener);
  };

  useEffect(() => {
    if (clickOpener === true) {
      setModalOpener({ height: "calc(100% - 66px)" });
    } else {
      setModalOpener({ height: "0px" });
    }
  }, [clickOpener]);

  useEffect(() => {
    if (clickMovieOpener === true) {
      setMovieModalOpener({ height: "calc(100% - 66px)" });
    } else {
      setMovieModalOpener({ height: "0px" });
    }

    if (clickUpdateMovieOpener === true) {
      setUpdateMovieModalOpener({ height: "calc(100% - 66px)" });
    } else {
      setUpdateMovieModalOpener({ height: "0px" });
    }
    if (clickDeleteMovieOpener === true) {
      setDeleteMovieModalOpener({ height: "calc(100% - 60px)" });
    } else {
      setDeleteMovieModalOpener({ height: "0px" });
    }
  }, [clickMovieOpener, clickUpdateMovieOpener, clickDeleteMovieOpener]);

  return (
    <div className="adminHome">
      <div className="adminHomeWrapper">
        <div className="addAdminModal">
          <div className="modalOpener" onClick={openModalFunc}>
            <h3>Add new admin User</h3>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className="addAdminWrapper" style={modalOpener}>
            <AddAdminUser />
          </div>
        </div>
        <div className="addMovieModal">
          <div className="modalOpener" onClick={openMovieModalFunc}>
            <h3>Add new Movie</h3>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className="addAdminWrapper" style={movieModalOpener}>
            <AddMovie />
          </div>
        </div>
        <div className="addMovieModal">
          <div className="modalOpener" onClick={openUpdateMovieModalFunc}>
            <h3>Update Movie</h3>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className="addAdminWrapper" style={updateMovieModalOpener}>
            <UpdatedMovie />
          </div>
        </div>
        <div className="deleteMovieModal">
          <div className="modalOpener" onClick={openDeleteMovieModalFunc}>
            <h3>Delete Movie</h3>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className="deleteMovieWrapper" style={deleteMovieModalOpener}>
            <DeleteMovie />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminHome;
