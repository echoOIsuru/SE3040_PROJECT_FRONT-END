import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelMemberService from '../../Services/PanelMembers/PanelMemberServices';

export default function ViewPanel(){

    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    // const [statuss, setStatus] = useState([]);
    // const [disable, setDisable] = useState(false);
    const [enable, setEnable] = useState(true);
    // const [deleteDisable, setDeleteDisable] = useState(true);
    const [btnType, setBtnType] = useState([]);
    const [panelData, setPanelData] = useState([]);
    const [alocatedPanelLen, setAlocatedPanelLen] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const [gID, setGId] = useState([]);
    const [ppt, setPpt] = useState([]);

    // for table
    const [len, setLen] = useState(0);
    const [current, setCurrent] = useState([]);
    const [firsIndex, setFirsIndex] = useState(0);
    const [recordsPerPage, setRecordPerPage] = useState(1);
    const [lastIndex, setLastIndex] = useState(recordsPerPage);
    const [numberOfRecords, setNumberOfRecords] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
 
    useEffect(() => {

        let login = sessionStorage.getItem("LOGIN_DATA");
        login = JSON.parse(login);

        let pptFeedback = sessionStorage.getItem("PPT_FEEDBACK");
        pptFeedback = JSON.parse(pptFeedback);
        setPpt(pptFeedback);
        console.log("session", pptFeedback);

        const userName = login.username;

        PanelMemberService.getPanelData(userName)
            .then(res => {

                const groups = [];

                if(res.data==0){
                    window.alert("You are not assigned any panel yet !");
                    navigate('/panelMember');
                }else{
                    setAlocatedPanelLen(res.data.length);
                    setPanelData(res.data[0]);
                    // console.log(panelLength);
                    console.log("panel allocations");
                    console.log(res.data);
                    // console.log(res.data.length);
                    // console.log(res.data[0]);

                    for(var i=0; i<res.data.length; i++){
                        groups.push({
                            ind : i,
                            gId : res.data[i].student_group
                        })

                    }

                    console.log("groups");
                    console.log(groups);
                    // console.log(groups[0].gId);

                    const tempArray = [];

                    for(var j=0; j<res.data.length; j++){

                        PanelMemberService.getGroupData(groups[j].gId)
                        .then(r => {
                            // setGroupData(r.data[0]);
                            tempArray.push(r.data[0]);
                            // console.log("group details");
                            // console.log(r.data[0]);
                            // setLen((r.data).length)
                            // setNumberOfRecords(Math.ceil((r.data).length / recordsPerPage))
                            // setCurrent(r.data.slice(firsIndex, lastIndex))
    
                            // //////////////////////////
                            // let feedback = sessionStorage.getItem("FEEDBACK") || "";
                            // if(feedback!=""){
                            //     feedback = JSON.parse(feedback);
                            // }
                    
                            // console.log(feedback);
    
                            // setStatus(r.data[0].status);
                            // if(feedback.status!=""){
                            //     if(feedback.status=="accept" || r.data[0].status=="accept"){
                            //         setStatus("Accepted");
                            //         setDisable(true);
                            //         setEnable(false);
                            //     }else if(feedback.status=="reject" || r.data[0].status=="reject"){
                            //         setStatus("Rejected");
                            //         setDisable(true);
                            //         setDeleteDisable(false);
                            //     }
                            // }
                            // ///////////////////////
                        })
                    }

                    setGroupData(tempArray);
                    console.log("ArrayData",tempArray);

                    setLen((tempArray).length)
                    setNumberOfRecords(Math.ceil((tempArray).length / recordsPerPage))

                    setCurrent(tempArray)

                    // let feedback = sessionStorage.getItem("FEEDBACK") || "";
                    // if(feedback!=""){
                    //     feedback = JSON.parse(feedback);
                    // }

                    // if(feedback.status!=""){
                    //     if(feedback.status=="accept" && feedback.groupId==inputs.obj.title){
                    //         setDisable(true);
                    //         setEnable(false);
                    //     }else if(feedback.status=="reject" && feedback.groupId==inputs.obj.title){
                    //         setDisable(true);
                    //         setDeleteDisable(false);
                    //     }
                    // }

                    // if(inputs!=""){
                    //     if(inputs.obj.status=="accept"){
                    //         setDisable(true);
                    //         setEnable(false);            
                    //     }else if(inputs.obj.status=="reject"){
                    //         setDisable(true);
                    //         setDeleteDisable(false);            
                    //     }
                    // }
                }

            })

    },[]);

    useEffect (() => {
        setLen((groupData).length)
        setNumberOfRecords(Math.ceil((groupData).length / recordsPerPage))
        setCurrent(groupData.slice(firsIndex, lastIndex))

    })


    // 

    const evaluateType = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setBtnType(values => ({...values, [name] : value}));  
              
    };

    const deletion = () => {

        PanelMemberService.deleteRejectedRecord(inputs.obj.title)
        .then((data) => {
            window.alert("Rejected record was deleted !");
                // for table

    setLastIndex(lastIndex-1);
    setFirsIndex(firsIndex+1);
    setCurrent(current.slice(firsIndex+1, lastIndex-1));
    // window.location.reload(false);
            navigate('/viewPanel');
        })

    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name] : value}));
        
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        const data1 = inputs.obj.title;
        // console.log("session", data1);
        setGId(data1);
        const datas = JSON.stringify(inputs.obj);
        sessionStorage.setItem('GROUP_ID', datas);

        console.log(btnType);
        if(btnType.evaluate=="Evaluate_topic"){
            navigate('/topic-feedback');
        }else if(btnType.evaluate=="Evaluate_ppt"){
            setEnable(true);
            navigate('/ppt-feedback');
        }

    };

    return(
        <>
            <br /><br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <br />
                        <h1 className="text-center">Panel Details</h1>
                        <br />
                        <div className="card-body">
                            <div className="form-group">
                            <label>Panel ID : {panelData._id}</label>
                            </div>
                            <br />
                            <div className="form-group">
                            <label>Panel Members :</label>
                            </div>
                            <ol className="list-group">
                                <li className="list-group-item list-group-item-success">{panelData.panel_member1}</li>
                                <li className="list-group-item list-group-item-info">{panelData.panel_member2}</li>
                                {/* <li className="list-group-item list-group-item-success">Amal</li>
                                <li className="list-group-item list-group-item-info">Vimal</li> */}
                            </ol>
                            <br /><br />
                            <div className="form-group">
                            <label>Assigned Group details :</label>
                            </div>
                            <br />

                            {/* {<GroupDataTable/>} */}

                            <form onSubmit={handleSubmit}>

                                {/* for table */}
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Index</th>
                                            <th>Group ID</th>
                                            <th>Status</th>
                                            <th>Topic Evaluation</th>
                                            <th>Final Ppt Evaluation</th>
                                            <th>Delete Record</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            groupData.map((x, index) => {
                                                return (
                                                        x&& 
                                                        <tr key={x._id}>
                                                        <th>{index + 1}</th>
                                                        <td><input type="hidden" name="id" value={inputs.obj=x} onChange={handleChange}></input>{x.title}</td>
                                                        <td>{x.status}</td>
                                                        <td><input type="submit" name="evaluate" value="Evaluate_topic" disabled={x.status == "accept" || x.status == "reject" ? true : false} onClick={evaluateType} className="btn btn-info"></input></td>
                                                        <td><input type="submit" name="evaluate" value="Evaluate_ppt" disabled={x.status == "reject" || x.status == "Pending" ? true : false} onClick={evaluateType} className="btn btn-warning"/></td>
                                                        <td><button name="delete" disabled={x.status == "reject" ? false : true} onClick={deletion} className="btn btn-danger">Delete</button></td>
                                                    </tr>

                                                )
                                            })
                                        }
                                    </tbody>

                                </table>

                            </form>
                            <br /><br />

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}