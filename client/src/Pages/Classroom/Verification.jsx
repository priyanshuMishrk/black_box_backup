import React, { useEffect, useState } from 'react';
import axios from 'axios';

let progress = {}

const UploadBox = ({ type, onUpload }) => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (type === 'video' && selectedFile.size > 10000000) { // 10MB limit
            setError('Video size should be less than 10MB');
            setFile(null);
            return;
        }

        setFile(selectedFile);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'i1m10bd7'); // Your Cloudinary upload preset

        const url = `https://api.cloudinary.com/v1_1/black-box/${type}/upload`;

        axios.post(url, formData, {
            onUploadProgress: progressEvent => {
                const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentage);
            }
        })
            .then(res => {
                console.log(res.data);
                onUpload(res.data.secure_url, selectedFile.name, selectedFile.size);
            })
            .catch(err => {
                console.error(err);
                setError('Upload failed. Please try again.');
            });
    };

    return (
        <div className="box imageBox fsbfont">
            <label className="box-content" onClick={() => document.getElementById(`file-input-${type}`).click()}>
                {/* <div className="f2">{type === 'image' ? '+' : '➕'}</div> */}
                <div className="f2 gl mb-4 mt-3">+</div>
                <div className='f22 gl'>{type === 'image' ? '.png/.jpg' : '.mp4'}</div>
            </label>
            <input
                id={`file-input-${type}`}
                type="file"
                accept={type === 'image' ? 'image/*' : 'video/mp4'}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            {/* {progress > 0 && <div>{`${progress}% uploaded`}</div>}
            {error && <div className="error">{error}</div>} */}
        </div>
    );
};

const UploadedFileBox = ({ url, name, size, onDelete }) => {
    return (
      <div className="uploaded-file-box">
        <div className="file-info fsbfont">
          <div>{name}</div>
          <div className='sizeOfFile'>{(size / 1024).toFixed(2)} KB</div>
        </div>
        {/* {url.endsWith('.mp4') ? (
          <video src={url} controls width="200" />
        ) : (
          <img src={url} alt={name} width="200" />
        )} */}
        <button onClick={onDelete} className='sixeFileDel gm'>Delete</button>
      </div>
    );
  };

const Verification = ({ infoTaker, sect3 }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileUpload = (url, name, size) => {
        setUploadedFiles(prevFiles => [...prevFiles, { url, name, size }]);
    };

    useEffect(()=>{
        if(sect3.img && sect3.img !== uploadedFiles)
    setUploadedFiles(sect3.img)
    },[])

    useEffect(()=> {

        console.log('uploadedFiles changed:', uploadedFiles);
        
        infoTaker(3,"img",uploadedFiles)
        
        console.log("workinggggggg")
    }, [uploadedFiles, infoTaker])


  const handleFileDelete = (index) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

    return (
        <>
            <div className='Claser'>
                <div>
                    <div className='fsbfont headingForClassInfo fscc'>
                        Submit Your Photos and Videos
                    </div>
                    <div className='VFDTitle fscc2 frfont '>
                    These images will help your peers to get a preview of session
                    </div>
                </div>

                <div>
                    <div className='fsbfont headingForClassInfo fscc'>
                       Upload Files
                    </div>
                    <div className='VFDTitle fscc2 frfont '>
                    Drag and drop your files here or click on the boxes
                    </div>
                </div>
                <div className="container d-flex gap-3 mb-4">
                    {uploadedFiles[0] ? <img src={uploadedFiles[0].url} className='imageBox' style={{
                        alignSelf:'none'
                    }} alt="" srcset="" /> :<UploadBox type="image" className="imageBox" onUpload={handleFileUpload} />}
                    {/* {uploadedFiles[1] ? <img src={uploadedFiles[1].url} className='imageBox' alt="" srcset="" /> :<UploadBox type="image" className="imageBox" onUpload={handleFileUpload} />}
                    {uploadedFiles[2] ? <img src={uploadedFiles[2].url} className='imageBox' alt="" srcset="" /> :<UploadBox type="image" className="imageBox" onUpload={handleFileUpload} />}
                    {uploadedFiles[3] ? <img src={uploadedFiles[3].url} className='imageBox' alt="" srcset="" /> :<UploadBox type="image" className="imageBox" onUpload={handleFileUpload} />}
                    {uploadedFiles[4] ? <video src={uploadedFiles[4].url} className='imageBox' alt="" srcset="" /> :<UploadBox type="video" className="imageBox" onUpload={handleFileUpload} />} */}
                </div>
                <div>
                    <div className='VFDTitle fscc2 frfont'>
                    *Only upload .jpg and .png files upto 500kb max and video limit upt 2 Mb.
                    </div>
                    {/* <div className='VFDTitle fscc2 frfont mb-1'>
                    *Any image posted in the website should be approved by Black Box. You cannot add any other image to your class page on your own                    </div>
                    <div className='VFDTitle fscc2 frfont '>
                    *Adding atleast 2 images is mandatory                    </div> */}
                </div>

                <div>

                </div>
                <div className='fsbfont headingForClassInfo fscc'>
                       Uploaded Files
                    </div>

                    {uploadedFiles.map((file, index) => (
                        <UploadedFileBox
                        key={index}
                        url={file.url}
                        name={file.name}
                        size={file.size}
                        onDelete={() => handleFileDelete(index)}
                      />
                    ))}
            </div>

        </>
    );
};

export default Verification;
