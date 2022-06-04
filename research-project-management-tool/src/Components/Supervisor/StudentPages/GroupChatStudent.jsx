import React, { useEffect, useState } from 'react';
import SupervisorServices from '../../../Services/Supervisors/SupervisorServices';
import '../chat.css'

function GroupChatStudent() {

    const [groups, setGroups] = useState({})

    const [chats, setChats] = useState([])

    const [msg, setMsg] = useState("");

    const [status, setStatus] = useState(false);


    useEffect(() => {
        setMsg("")


        const student = JSON.parse(sessionStorage.getItem("STUDENT_DATA"))
        console.log(student, "CHAT STUDENT")

        SupervisorServices.getGroupByStudentNIC(student[0].nic).then(res => {
            // console.log(res.data, "FINAL_GROUP")

            setGroups({
                group_id: res.data.group_name,
                group_name: res.data.group_name,
                leader: res.data.leader,
                member1: res.data.member1,
                member2: res.data.member2,
                member3: res.data.member3,
                supervisor_id: " ",
                chat_id: "chatid00222"
            })
        })

        //to update group chat
        SupervisorServices.viewChatByGroup(groups.group_id).then(res => {
            console.log(res.data, "CHAT-DATA")
            setChats(res.data)
        }).catch((err) => {

        })

        setStatus(false)
    }, [status])


    useEffect(() => {
        SupervisorServices.viewChatByGroup(groups.group_id).then(res => {
            setChats(res.data)
        }).catch((err) => {

        })
    })

    const onChangeHandler = (e) => {
        setMsg(e.target.value);

    }

    const sendChatMessage = (e) => {
        e.preventDefault()

        const currentdate = new Date()

        const date = currentdate.getDate() + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getFullYear()

        const time = + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        let data = {
            group_id: groups.group_id,
            data: {
                name: "student",
                chat: msg,
                date: date,
                time: time
            }
        }

        SupervisorServices.addNewChat(data).then(res => {
            console.log(res.data)
            setStatus(true)

        })


    }

    return (
        <div className="container">
            <div className="row justify-content-md-center" style={{ marginTop: "50px", marginBottom: "10px" }}>
                <h1 className="text-center">Student : Group Chat</h1>
                <br />
                <br />
            </div>
            <div className="row justify-content-md-center" style={{ marginBottom: "100px" }}>



                <div className='col col-md-5' style={{ marginBottom: "10px", width: "60%" }}>
                    <div className="messaging">
                        <div className="inbox_msg">
                            <div className="chat_people bg-light" style={{ padding: "10px" }}>
                                <div className="chat_img"> <img src="https://cdn-icons-png.flaticon.com/512/718/718339.png" alt="profile" /> </div>
                                <div className="chat_ib">
                                    <h5>{groups.group_name}</h5>
                                    <p>{groups.leader + ", " + groups.member1 + ", " + groups.member2 + ", " + groups.member3}.</p>
                                </div>
                            </div>
                            <div className="bg-dark" style={{ padding: "20px" }}>
                                <div className="msg_history">
                                    {
                                        chats.length !== 0 && chats[0].data.map((chat, index) => (
                                            <div key={index}>
                                                {chat.name == "student" ? <div className="outgoing_msg">
                                                    <div className="sent_msg">
                                                        <p>{chat.chat}</p>
                                                        <span className="time_date">{chat.date}     |    {chat.time}</span></div>
                                                </div> :
                                                    <div className="incoming_msg">
                                                        <div className="incoming_msg_img"> <img src="https://cdn.iconscout.com/icon/free/png-256/profile-417-1163876.png" alt="profile" /> </div>
                                                        <div className="received_msg">
                                                            <div className="received_withd_msg">
                                                                <p>{chat.chat}</p>
                                                                <span className="time_date"> <b>{chat.name}</b> |    {chat.date}     |    {chat.time}</span></div>
                                                        </div>
                                                    </div>

                                                }
                                            </div>
                                        ))
                                    }

                                </div>
                                <div className="type_msg ">
                                    <div className="input_msg_write">
                                        <input type="text" className="write_msg text-light" placeholder="Type a message" name="chat" onChange={onChangeHandler} value={msg} />
                                        <button onClick={sendChatMessage} className="msg_send_btn" type="button"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default GroupChatStudent