import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import Host3 from './Host3';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles


const toolbarOptions = [
    ['bold', 'italic', 'underline'], // Bold, italic, underline
    [{ 'list': 'bullet' }] // Bullet points
  ];

  const modules = {
    toolbar: toolbarOptions
  }; 

// Custom styled Accordion to remove box shadow and background color for inactive sections
const CustomAccordion = styled(Accordion)(({ theme }) => ({
    boxShadow: 'none',
    '&:not(:last-child)': {
        borderBottom: '0.2vw dotted rgba(0, 0, 0, .125)',
        fontFamily : 'Figtree-Regular'
    },
    '&:before': {
        display: 'none',
        fontFamily : 'Figtree-Regular'
    },
    '&.Mui-disabled': {
        backgroundColor: 'transparent',
        fontFamily : 'Figtree-Regular'
    }
}));

const FormWithSections = ({infoTaker, infoGetter, inf2}) => {

    const [classesYk, setClassYk] = useState([])

    
    function onGet(){
        return infoGetter(1,'date')
    }
    
    function onAdd(clss){
        setClassYk(clss)
    }
    useEffect(()=>{
            inf2(1,"date",classesYk)
    },[classesYk, inf2])

    const [section1, setSection1] = useState({ input1: '', input2: '' });
    const [section2, setSection2] = useState({ input3: '', input4: '' });
    const [section3, setSection3] = useState({ input5: '', input6: '' });
    const [section4, setSection4] = useState({ input7: '', input8: '' });

    const [expandedSection, setExpandedSection] = useState(1);
    const [completedSections, setCompletedSections] = useState([false, false, false, false]);

    const handleChange = (e, section, setSection) => {
        const { name, value } = e.target;
        setSection(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const languages = [
        'English', 'Gujarathi', 'Malayalam', 'Kannad', 'Hindi',
        'Tamil', 'Urdu', 'Telugu', 'Marathi', 'Odia', 'Punjabi', 'Gujarati'
    ];

    const handleNextSection = (section, sectionIndex) => {
        const cifdInputs = document.querySelectorAll('.CIFDInput');
        const allHaveValue = Array.from(cifdInputs).every(cifdInput => {
            // Find input or textarea elements within the CIFDInput element
            const inputOrTextarea = cifdInput.querySelector('input[type="text"], textarea');

            // Check if an input or textarea element is found and if its value is not empty
            return inputOrTextarea && inputOrTextarea.value.trim() !== '';
        });
        if (!allHaveValue) {
            const newCompletedSections = [...completedSections];
            newCompletedSections[sectionIndex] = true;
            setCompletedSections(newCompletedSections);
            setExpandedSection(sectionIndex + 2);
        } else {
            alert('Please fill all fields in the current section');
        }
    };

    const initialValue = `Example:
1. Understand the basics of SEO and its importance
2. Conduct keyword research and incorporate keywords effectively
3. Optimize on-page elements such as titles, meta descriptions, and headers
4. Improve website content for better search engine rankings
5. Utilize basic tools for SEO analysis and performance tracking`;

    const renderSection = (section, setSection, sectionNumber, sectionIndex, name) => (
        <div className='ClassInfoKnowledge'>
            <CustomAccordion expanded={expandedSection === sectionNumber} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={() => setExpandedSection(sectionNumber)}
                >
                    <Typography className='fsbfont headingForClassInfo'
                    style={{
                        fontFamily : 'Figtree-SemiBold'
                    }}
                    >{name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        sectionIndex === 0 ? (
                            <div>
                                <div className='ClassInfoForm'>
                                    <div className='ClassInfoFormD'>
                                        <span className='CIFDTitle fsbfont'>
                                            Class title
                                        </span>
                                        <span className='CIFDInput fmfont'>
                                            <input type="text" placeholder='Ex : Introduction to basics of Figma' onChange={infoTaker(1,"title")} value={infoGetter(1,"title")}/>
                                        </span>
                                    </div>
                                    <div className='ClassInfoFormD'>
                                        <span className='CIFDTitle fsbfont'>
                                            Class Description
                                        </span>
                                        <span className='CIFDInput fmfont'>
                                            {/* <textarea id="message" name="message" rows="4" placeholder={`Ex: Join me as we embark on a delightful journey into the world of floral painting. In this comprehensive tutorial, we'll unravel the secrets behind creating captivating nasturtium flower paintings, from their graceful shapes to their intricate details.`}></textarea> */}
                                            <ReactQuill id="message" name="message" rows="10"
                                            style={{ height: '14vw',
                                                border : "none",
                                                marginBottom : "3vw"
                                        }} 
                                        modules={modules}
                                            placeholder={`Ex: Join me as we embark on a delightful journey into the world of floral painting. In this comprehensive tutorial, we'll unravel the secrets behind creating captivating nasturtium flower paintings, from their graceful shapes to their intricate details.`} 
                                            onChange={infoTaker(1,"description")}
                                            value={infoGetter(1,"description")}
                                            
                                            />
                                        </span>
                                    </div>
                                    <div className='ClassInfoFormD'>
                                        <select id="cars" className="fmfont" onChange={infoTaker(1,"languageOfClass")} name="cars" placeholder='Language of Communication'>
                                            <option value="" disabled >Language of Communication</option>
                                            {languages.map(language => (
                                                <option key={language} value={language}>{language}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='ClassInfoFormD'>
                                        <span className='CIFDTitle fsbfont'>
                                            Trainer Bio
                                        </span>
                                        <span className='CIFDInput fmfont'>
                                        <ReactQuill id="message" name="message" rows="10"
                                            style={{ height: '14vw',
                                                border : "none",
                                                marginBottom : "3vw"
                                        }} 
                                        modules={modules}
                                            placeholder={`Ex: Brief trainer description covering your interests and what you do. This will be featured on your class page`}  
                                            onChange={infoTaker(1,"trainerBio")}
                                            value={infoGetter(1,"trainerBio")}
                                            />
                                           
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : sectionIndex === 1 ? (
                            <div className='ClassInfoForm'>
                                <div className='CIFDInput fmfont'>
                                <ReactQuill id="message" name="message" rows="10"
                                            style={{ height: '14vw',
                                                border : "none",
                                                marginBottom : "3vw"
                                        }} 
                                        modules={modules}
                                            placeholder={initialValue} onChange={infoTaker(1,"classStructure")} 
                                            value={infoGetter(1,"classStructure")}
                                            />
                                           
                                    {/* <textarea id="answer" rows="8" placeholder={initialValue}></textarea> */}
                                </div>
                            </div>
                        ) : sectionIndex === 2 ? (
                            <div>
                                <div className='ClassInfoForm'>
                                    <div className='ClassInfoFormD'>
                                        <span className='CIFDTitle fsbfont'>
                                            Who is this class for?
                                        </span>
                                        <span className='CIFDInput fmfont'>
                                        <textarea id="message" name="message" rows="4" placeholder={`Ex: This class is for begginers who want to learn the fundamentals of creative writing. It is for anyone with zero-to little expirene in writing and looking to learn how to write from scratch`}
                                        onChange={infoTaker(1,"studentsWho")}
                                        value={infoGetter(1,"studentsWho")}
                                        ></textarea>                                        </span>
                                    </div>
                                    <div className='ClassInfoFormD'>
                                        <span className='CIFDTitle fsbfont'>
                                            Requirements
                                        </span>
                                        <span className='CIFDInput fmfont'>
                                        <input type="text" placeholder='Ex: Laptop and access to MS Office' 
                                         onChange={infoTaker(1,"requirements")}
                                         value={infoGetter(1,"requirements")}
                                        />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : sectionIndex === 3 ? (
                        <div>
                            <span className='info3CIFDHost fbfont'>
                            A user can conduct the class 15 days later after submitting the documents for
approval. These days will be used for advertisement of the class
                            </span>
                            <Host3 onAdd={onAdd} onGet={onGet} mode="class"/>
                        </div>
                            ) : ""
                    }

                    <Button
                        variant="contained"
                        color="primary"
                        className='mt-2 gm'
                        onClick={() => handleNextSection(section, sectionIndex)}
                        style={{
                            fontFamily : 'Figtree-medium'
                        }}
                    >
                        Save and Continue
                    </Button>
                </AccordionDetails>
            </CustomAccordion>

        </div>
    );

    return (
        <Box m={4}>
            {renderSection(section1, setSection1, 1, 0, "Basic Information")}
            {renderSection(section2, setSection2, 2, 1, "Class Structure")}
            {renderSection(section3, setSection3, 3, 2, "Participant details")}
            {renderSection(section4, setSection4, 4, 3, "Schedule date and time")}
        </Box>
    );
};

export default FormWithSections;
