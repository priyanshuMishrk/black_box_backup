import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: "AKIAXYKJWCCAIBD425IC",
    secretAccessKey: "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",
    region: "ap-south-1",
  });
  
  const s3 = new AWS.S3();
  const bucketName = "blackboxim";
  const cloudFrontUrl = "https://d2f7i2k65rgoj5.cloudfront.net/";

const UploadBox = ({ type, onUpload, isUploading, setIsUploading }) => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        if (!e.target.files || e.target.files.length === 0) {
          console.error("No file selected.");
          return;
        }
      
        const selectedFile = e.target.files[0];
      
        if (!selectedFile) {
          console.error("File is undefined.");
          return;
        }
      
        setFile(selectedFile);
        setError(null);
        setIsUploading(true);
      
        const fileName = `${type}s/${Date.now()}_${selectedFile.name}`;
      
        const params = {
          Bucket: bucketName,
          Key: fileName,
          Body: selectedFile,
          ContentType: selectedFile.type,
        };
      
        try {
          // Upload file to S3
          const uploadResponse = await s3.upload(params).promise();
      
          // Generate CloudFront URL
          const uploadedFileUrl = `${cloudFrontUrl}${fileName}`;
      
          onUpload(uploadedFileUrl, selectedFile.name, selectedFile.size);
          setIsUploading(false);
          setProgress(100);
          console.log("Upload successful:", uploadedFileUrl);
        } catch (error) {
          console.error("Upload failed:", error);
          setError("Upload failed. Please try again.");
          setIsUploading(false);
        }
      };

    return (
        <div className={`box imageBox fsbfont ${isUploading ? 'disabled' : ''}`}>
            <label className="box-content" onClick={() => !isUploading && document.getElementById(`file-input-${type}`).click()}>
                { progress === 0 && <>
                    <div className="f2 gl mb-4 mt-3">+</div>
                  <div className='f22 gl'>{type === 'image' ? '.png/.jpg' : '.mp4'}</div>
                </>
                  }
            </label>
            <input
                id={`file-input-${type}`}
                type="file"
                accept={type === 'image' ? 'image/*' : 'video/mp4'}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            {progress > 0 && <div>{`${progress}% uploaded`}</div>}
            {error && <div className="error">{error}</div>}
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
        <button onClick={onDelete} className='sixeFileDel gm'>Delete</button>
      </div>
    );
  };

const Verification = ({ infoTaker, sect3 }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false); // New state to track if any file is uploading

    const handleFileUpload = (url, name, size) => {
        setUploadedFiles(prevFiles => [...prevFiles, { url, name, size }]);
    };

    useEffect(() => {
        if (sect3.img && sect3.img !== uploadedFiles)
            setUploadedFiles(sect3.img);
    }, []);

    useEffect(() => {
        console.log('uploadedFiles changed:', uploadedFiles);
        infoTaker(3, "img", uploadedFiles);
    }, [uploadedFiles, infoTaker]);

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
                        Help us showcase your expertise by uploading photos and videos of your work. We'll use these for verification and to feature on your class page. Please note, once submitted, you won't be able to edit them.
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
                    {uploadedFiles[0] ? <img src={uploadedFiles[0].url} className='imageBox' alt="" /> : <UploadBox type="image" isUploading={isUploading} setIsUploading={setIsUploading} onUpload={handleFileUpload} />}
                    {uploadedFiles[1] ? <img src={uploadedFiles[1].url} className='imageBox' alt="" /> : <UploadBox type="image" isUploading={isUploading} setIsUploading={setIsUploading} onUpload={handleFileUpload} />}
                    {uploadedFiles[2] ? <img src={uploadedFiles[2].url} className='imageBox' alt="" /> : <UploadBox type="image" isUploading={isUploading} setIsUploading={setIsUploading} onUpload={handleFileUpload} />}
                    {uploadedFiles[3] ? <img src={uploadedFiles[3].url} className='imageBox' alt="" /> : <UploadBox type="image" isUploading={isUploading} setIsUploading={setIsUploading} onUpload={handleFileUpload} />}
                    {uploadedFiles[4] ? <video src={uploadedFiles[4].url} className='imageBox' controls /> : <UploadBox type="video" isUploading={isUploading} setIsUploading={setIsUploading} onUpload={handleFileUpload} />}
                </div>

                <div>
                    <div className='VFDTitle fscc2 frfont mb-1'>
                    *Only upload .jpg and .png files upto 500kb max and video limit upt 2 Mb.
                    </div>
                    <div className='VFDTitle fscc2 frfont mb-1'>
                    *Any image posted in the website should be approved by Black Box. You cannot add any other image to your class page on your own                    </div>
                    <div className='VFDTitle fscc2 frfont '>
                    *Adding atleast 2 images is mandatory                    </div>
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
