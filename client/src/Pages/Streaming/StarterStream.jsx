import React, { useEffect, useState } from 'react';
import AuthContext, {BaseUrl} from "../../Context/AuthContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { GoogleGenerativeAI }  = require('@google/generative-ai')
const keywordExtractor = require('keyword-extractor');

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
    const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'i1m10bd7');
        const url = `https://api.cloudinary.com/v1_1/black-box/image/upload`
        const result = await axios.post(url, formData)
        setThumbnail(result.data.secure_url)
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