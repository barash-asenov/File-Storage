import React from 'react';
import PropTypes from 'prop-types';

import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { DashboardModal } from '@uppy/react';

const uppy = Uppy({
  meta: { type: 'avatar' },
  restrictions: { maxNumberOfFiles: 10 },
  autoProceed: false,
  allowMultipleUploads: true
});

uppy.use(Tus, { endpoint: '/upload' });

uppy.on('file-added', (file) => {
  console.log('Added file', JSON.stringify(file.preview));
  console.log(JSON.stringify(uppy.getFile(file.id)));
});

uppy.on('file-removed', (file) => {
  console.log('Removed file', JSON.stringify(file))
});

uppy.on('complete', (result) => {
  const url = result.successful[0].uploadURL;
  console.log(url);
});

const UploadModal = ({ isModalOpen, handleCloseModal }) => {
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
  handleCloseModal: PropTypes.func.isRequired
};

export default UploadModal;