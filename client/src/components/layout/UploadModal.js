import React from 'react';
import PropTypes from 'prop-types';

import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import { connect } from 'react-redux';

import { DashboardModal } from '@uppy/react';

import { getFiles } from '../../actions/files';

const UploadModal = ({ isModalOpen, handleCloseModal, authToken, username, getFiles }) => {
  const uppy = Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 10 },
    autoProceed: false,
    allowMultipleUploads: true
  });

  uppy.use(XHRUpload, {
    id: 'XHRUpload',
    endpoint: `/api/users/${username}/files`,
    method: 'POST',
    formData: true,
    headers: {
      'Authorization': authToken
    },
    limit: 1
  });

  uppy.on('complete', () => {
    // Get files on upload complete
    handleCloseModal();
    getFiles(username);
  });

  return (
    <DashboardModal
      uppy={uppy}
      closeModalOnClickOutside={true}
      open={isModalOpen}
      onRequestClose={handleCloseModal}
    />
  );
};

UploadModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  getFiles: PropTypes.func.isRequired
};

export default connect(null, { getFiles })(UploadModal);