import React, { useState, useRef, useEffect, useCallback } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider, Container, Row, Col, Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import "./admin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const MarkingSchemes = () => {
  //define navigation
  let navigate = useNavigate();

  const [SubmissionTypes, setSubmissionTypes] = useState([]);
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [state, setState] = useState({
    scheme_name: '',
    note: '',
    submission_type: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  //drop files/documents
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

  //when clicks the submit button
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { scheme_name, note, submission_type } = state;
      if (scheme_name.trim() !== '' && note.trim() !== '' && submission_type.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('scheme_name', scheme_name);
          formData.append('note', note);
          formData.append('submission_type', submission_type);
          console.log("Scheme", note, scheme_name, submission_type)

          setErrorMsg('');
          await axios.post(`http://localhost:8090/api/v1/admin/create/markingScheme`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(formData)
          alert("Marking Scheme Sucessfully Uploaded")
          // props.history.push('/admin-file-download');
        } else {
          alert('Please select a file to add.');
        }
      } else {
        alert('Please enter all the field values.');
      }
    } catch (error) {
      if (error.response.status === 409) {
        alert(error.response.data.message);
      }
      else
        error.response && setErrorMsg(error.response.data);
    }
  };


  //fetch submission types data
  const fetchData = useCallback(async () => {
    try {
      const subTypes = await axios({
        method: 'GET',
        url: `https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/api/v1/admin/submissionTypes/all`
      })
      setSubmissionTypes(subTypes.data)
    } catch (error) {
      alert(error);
    };
  }, []);

  useEffect(() => {
    fetchData()
  }, [fetchData])

  //map submission values and return options for dropdown
  let TypesList = SubmissionTypes.length > 0
    && SubmissionTypes.map((type) => {
      return (
        <option value={type.submission_type}>{type.submission_type}</option>
      )
    });

  return (

    <ThemeProvider breakpoints={['xxxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

      <Container>

        <div Style={{ marginTop: '50px' }} className='list-title'>

          <hr />
          <center>
            <h2>Create Marking Schemes</h2>
          </center>
          <hr />
        </div><br /> <br /> <br />

        <div className="row justify-content-md-center">
          <div className='col-md-4'>
            <Form className={'body-content'} onSubmit={handleOnSubmit}>
              {errorMsg && <p className="errorMsg">{errorMsg}</p>}
              <Row>
                <Col>
                  <Form.Group controlId="title">
                    <label >Marking Scheme Title:</label> <br />
                    <Form.Control
                      type="text"
                      name="scheme_name"
                      value={state.scheme_name || ''}
                      placeholder="Enter Marking Scheme title"
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Form.Group  >
                    <label >Submission Type:</label> <br />
                    <select className="form-select" style={{ "width": "350px" }} name="submission_type" value={state.submission_type || ''}
                      onChange={handleInputChange}
                      required>
                      <option value="" disabled={true} style={{ textAlign: "center" }}>--- Select a Submission Type ---</option>
                      {TypesList}
                    </select>
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Form.Group controlId="note">
                    <label>Note:</label> <br />
                    <Form.Control
                      type="text"
                      name="note"
                      value={state.note || ''}
                      placeholder="Note"
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <div className="upload-section">
                <label>Upload Marking Scheme:</label> <br />
                <Dropzone
                  onDrop={onDrop}
                  onDragEnter={() => updateBorder('over')}
                  onDragLeave={() => updateBorder('leave')}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div style={{ backgroundColor: "#edf2f7", minWidth: '380px', minHeight: '230px', width: '40%', border: '3px dashed #cbd5e0', alignItems: 'center', padding: '1em', display: 'flex', flexDirection: 'column' }}{...getRootProps({ className: 'drop-zone' })} ref={dropRef}>

                      <div style={{ position: "relative", marginBottom: "1.5em" }}>
                        <input {...getInputProps()} />
                        <button type="button" style={{ color: "#fff", justifyContent: "center", width: "150px", height: "40px", outline: "none", boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.5)", backgroundColor: "#f55e30" }}>
                          <i style={{ marginRight: '0.8em', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faPlus} />
                          </i>
                          Upload
                        </button>
                      </div>
                      <br />

                      <p>Drag & Drop the file Here</p>
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
                      <br />
                      <center>
                        <img className="preview-image" style={{ width: "200px", height: "200px;" }} src={previewSrc} alt="Preview" />
                      </center>
                    </div>
                  ) : (
                    <div className="preview-message">
                      <br />
                      <p>No preview available for this file</p>
                    </div>
                  )
                ) : (
                  <div className="preview-message">

                  </div>
                )}
              </div>
              <br />
              <Button id='btn-common' variant="primary" type='submit'>Save</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="outline-secondary" onClick={() => { navigate("/admin/interface") }}>Cancel</Button>
            </Form><br />
          </div></div>

      </Container >
    </ThemeProvider >

  );
};

export default MarkingSchemes;
