import React, { useEffect, useState } from 'react';
import AuthContext, {BaseUrl} from "../../Context/AuthContext";
import axios from 'axios';
import AWS from "aws-sdk";
import { useNavigate } from 'react-router-dom';
const { GoogleGenerativeAI }  = require('@google/generative-ai')
const keywordExtractor = require('keyword-extractor');

AWS.config.update({
  accessKeyId: "AKIAXYKJWCCAIBD425IC",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const s3 = new AWS.S3();
const bucketName = "blackboxim";
const cloudFrontUrl = "https://d2f7i2k65rgoj5.cloudfront.net/";

const googleAI = new GoogleGenerativeAI('AIzaSyCa5bLyDC7fUpqgi0aJlJzDkgf-JfWaC5Y');
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
 
const geminiModel = googleAI.getGenerativeModel({
  model: 'gemini-pro',
  geminiConfig,
});

const generate = async (prompt) => {
  try {
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    // console.log(JSON.parse(response.text()))
    console.log(response.text())
    return response.text()
  } catch (error) {
    console.log('response error', error);
  }
};


function generateTags(description) {
  const extractionResult = keywordExtractor.extract(description, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true
  });
  return extractionResult;
}


const StreamingForm = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [title2, setTile2] = useState('')
  const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null,
    );


  useEffect(()=> {
    if (title !== ''){
      const d = generateTags(title)
      setTile2(d)
    }
  },[title])

  const handleThumbnailChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
  
    const fileName = `thumbnails/${Date.now()}_${selectedFile.name}`;
  
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: selectedFile,
      ContentType: selectedFile.type,
      ACL: "public-read", // Ensure the file is publicly accessible
    };
  
    try {
      // Upload to S3
      const uploadResponse = await s3.upload(params).promise();
      
      // Generate CloudFront URL
      const uploadedFileUrl = `${cloudFrontUrl}${fileName}`;
  
      // Set the uploaded image URL in state
      setThumbnail(uploadedFileUrl);
      console.log("File uploaded successfully:", uploadedFileUrl);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTitle2Change = (event) => {
    setTile2(event.target.value);
  };  

  const Navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title : title ,
      thumbnail : thumbnail,
      tags : title2 
    }
    const res = await axios.post(BaseUrl + `/submit-stream`,
    { ...data },
    {
      headers: { Authorization: `Bearer ${authTokens}` },
    });
    console.log(res.data)

    Navigate(`/room/${res.data.id}`)
    
  };

  return (
    <>
    <form onSubmit={handleSubmit} className='streaming-form-box'>
      <div>
        <label htmlFor="thumbnail" className='fmfont  lastrem'>Upload Thumbnail Image :</label>
        <input type="file" required id="thumbnail" className='gl' accept="image/*" onChange={handleThumbnailChange} />
      </div>

      <div>
        <label htmlFor="title" required className='lastrem fmfont mr-5'>Title :</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} className='gl' />
      </div>

      <div>
        <label htmlFor="title" required className='lastrem fmfont mr-5'>Tags for user to find you :</label>
        <input type="text" id="title" value={title2} onChange={handleTitle2Change} className='gl' />
      </div>

      <button type="submit" className='fmfont streamButton' >Start Streaming</button>
    </form>
    </>
  );
};

export default StreamingForm;