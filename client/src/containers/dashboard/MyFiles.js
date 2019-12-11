import React, {
  Fragment,
  useState,
  useEffect
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UploadModal from '../../components/layout/UploadModal';
import { getFiles, deleteFile } from '../../actions/files';
import Spinner from '../../components/layout/Spinner';
import NoticeModal from '../../components/layout/NoticeModal';
import { isEmpty } from 'lodash';


const MyFiles = ({ authToken, username, getFiles, deleteFile, files, loading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);

  /**
   * Get files initially
   */
  useEffect(() => {
    getFiles(username);
  }, [getFiles, username]);

  /**
   * Handle model close event
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Renders table head
   * @returns {*}
   */
  const renderTableHead = () => (
    <tr>
      <th scope="col">#</th>
      <th scope="col">File Name</th>
      <th scope="col">File Size</th>
      <th scope="col">Content Type</th>
      <th scope="col">Preview</th>
      <th scope="col">Download</th>
      <th scope="col">Delete</th>
    </tr>
  );

  /**
   * Prompt delete message to user
   * @param currentItemId
   */
  const promptDeleteMessage = (currentItemId) => {
    setIsNoticeModalOpen(true);
    setCurrentItemId(currentItemId);
  };

  /**
   * On handle delete item clicked
   */
  const onHandleDeleteItem = (username, currentUserId) => {
    deleteFile(username, currentUserId);
    setIsNoticeModalOpen(false);
  };

  /**
   * Renders table body
   * @param files
   * @returns {*}
   */
  const renderTableBody = (files) => (
    <tbody>
    {
      files.map((file, index) => (
        <tr key={file.id}>
          <th scope="row">{index + 1}</th>
          <td>{file.name}</td>
          <td>{file.byte_size / 1000} kb</td>
          <td>{file.content_type}</td>
          <td>
            <a href={`${file.host === 'localhost' ? 'http://' : ''}${file.preview_url}`}
               target="_blank"
               className="btn btn-primary">
              <i className="fa fa-eye"/>
            </a>
          </td>
          <td>
            <a href={`${file.host === 'localhost' ? 'http://' : ''}${file.download_url}`}
               className="btn btn-primary">
              <i className="fa fa-download"/>
            </a>
          </td>
          <td>
            <button onClick={() => promptDeleteMessage(file.id)}
                    className="btn btn-danger">
              <i className="fa fa-trash-alt"/>
            </button>
          </td>
        </tr>
      ))
    }
    </tbody>
  );

  if (loading) {
    return <Spinner/>;
  } else {
    return (
      <Fragment>
        <NoticeModal
          acceptText={'Yes'}
          modalBody={'Are you sure you want to delete the item'}
          rejectText={'No'}
          onHandleAccept={() => onHandleDeleteItem(username, currentItemId)}
          showModal={isNoticeModalOpen}
          modalTitle={'Delete Item'}
          onHandleReject={() => setIsNoticeModalOpen(false)}
          onHandleCloseModal={() => setIsNoticeModalOpen(false)}
        />
        <div className="row">
          <div className="col-sm"/>
          <div className="col-sm text-center">
            <h1 className='large text-primary'>My Files</h1>
          </div>
          <div className="col-sm text-center">
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Upload Files</button>
          </div>
        </div>
        <UploadModal
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          authToken={authToken}
          username={username}
        />
        {!isEmpty(files) ? (
          <table className="table">
            <thead>
            {renderTableHead()}
            </thead>
            {renderTableBody(files)}
          </table>
        ) : null}
      </Fragment>
    );
  }
};

MyFiles.propTypes = {
  authToken: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  getFiles: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  files: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = (state) => ({
  authToken: state.auth.authToken,
  username: state.auth.user && state.auth.user.username,
  files: state.files.files,
  loading: state.files.loading
});

export default connect(mapStateToProps, { getFiles, deleteFile })(MyFiles);
