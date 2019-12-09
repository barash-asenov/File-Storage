import React, {
  Fragment,
  useState
} from 'react';

import UploadModal from '../../components/layout/UploadModal';

const MyFiles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Fragment>
      <UploadModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
      <div className="text-center">
        <h1 className='large text-primary'>My Files</h1>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Open Modal</button>
      </div>
    </Fragment>
  );
};

export default MyFiles;
