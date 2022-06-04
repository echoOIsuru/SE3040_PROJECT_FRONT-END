import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
export default function Submition(props) {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    title: '',
    email: ''
  });
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { title, email } = state;
      if (title.trim() !== '' && email.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('email',email);

          setErrorMsg('');
          await axios.post(`http://localhost:8090/submition/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((res) => {
            alert(res.data);
            navigate("/student_home")
          });
          props.history.push('/allfiles');
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <React.Fragment>
        <div className="container" >
      <hr/>
      <h3> Final presentation Portal</h3>
      <hr/>
      <br/>
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group controlId="title"className="text-light bg-success">
            <label for="group name">Enter group name or Group ID</label>
              <Form.Control
                type="text"
                name="title"
                value={state.title || ''}
                placeholder="Enter Group name"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <Form.Group controlId="email"className="text-light bg-success">
            <label for="group name">Enter Email</label>
              <Form.Control
                type="text"
                name="email"
                value={state.email || ''}
                placeholder="Email"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <br/>
        <div className="upload-section">
          <Dropzone 
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
            {({ getRootProps, getInputProps }) => (
              <div style={{backgroundColor:"skyBlue",width:'40%'}}{...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                <input {...getInputProps()} style={{height:"100px", backgroundColor:"skyBlue"}}/>
                <p>Drag and drop a file OR<button style={{color:"red",border:"none",backgroundColor:'transparent'}}>click here</button>to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
                <img className="preview-image" style={{width:"200px", height:"200px;"}} src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <br/>
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>
        <br/>
        <Button variant="primary" type="submit">
          Submit
        </Button>
  
      </Form>
      </div>
    </React.Fragment>
  );
};

