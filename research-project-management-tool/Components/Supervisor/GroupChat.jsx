import React, { useEffect, useState } from 'react';
import SupervisorServices from '../../Services/Supervisors/SupervisorServices';
import './chat.css'

function GroupChat() {

    const [groups, setGroups] = useState([
        // {
        //     group_id: "GROUP_1",
        //     group_name: "POWER GROUP",
        //     leader: "12312asdasd",
        //     member1: "member1",
        //     member2: "member2",
        //     member3: "member3",
        //     supervisor_id: "123WWWWWWWW",
        //     chat_id: "chatid00222"
        // },
        // {
        //     group_id: "GROUP_2",
        //     group_name: "POWER2 GROUP",
        //     leader: "12312asdasd",
        //     member1: "member1",
        //     member2: "member2",
        //     member3: "member3",
        //     supervisor_id: "123WWWWWWWW",
        //     chat_id: "chatid00222"
        // }, {
        //     group_id: "GROUP_3",
        //     group_name: "POWER3 GROUP",
        //     leader: "12312asdasd",
        //     member1: "member1",
        //     member2: "member2",
        //     member3: "member3",
        //     supervisor_id: "123WWWWWWWW",
        //     chat_id: "chatid00222"
        // }
    ])

    const [chats, setChats] = useState([
        // {
        //     group_id: "GROUP 1",
        //     data: [
        //         {
        //             name: "supervisor",
        //             chat: "sdhgajshdgjhasdgjhasgdjhagsdjhg",
        //             date: new Date()
        //         },
        //         {
        //             name: "student1",
        //             chat: "sssssssssssssssssssss",
        //             date: new Date()
        //         },
        //         {
        //             name: "supervisor",
        //             chat: "No NO NO noONONN ONON ON ",
        //             date: new Date()
        //         },
        //         {
        //             name: "student2",
        //             chat: "ssssdSSWWRTGGGGGGG",
        //             date: new Date()
        //         },
        //     ]
        // }
    ])

    const [msg, setMsg] = useState("");

    const [groupID, setGroupID] = useState("")

    const [groupName, setGroupName] = useState("")

    const [status, setStatus] = useState(false);

    const [supervisor, setSupervisor] = useState([]);

    const [reload, setReload] = useState(false);

    useEffect(() => {
        setMsg("")

        const session = JSON.parse(sessionStorage.getItem("SUPERVISOR"))
        setSupervisor(session);

        SupervisorServices.viewChatBySupervisorId(session._id).then(res => {
            setGroups(res.data)
        })

        //to update group chat
        SupervisorServices.viewChatByGroup(groupID).then(res => {
            console.log(res.data, "CHAT-DATA")
            setChats(res.data)
        }).catch((err) => {

        })


        setStatus(false)
    }, [status])


    useEffect(() => {
        SupervisorServices.viewChatByGroup(groupID).then(res => {
            //console.log(res.data, "CHAT-DATA-reloader")
            setChats(res.data)
        }).catch((err) => {

        })

        setReload(false)
    }, [reload])


    useEffect(() => {


        // const temp = SupervisorServices.viewChatByGroup(groupID).then(res => {
        //     //console.log(res.data, "CHAT-DATA")

        //     //setChats(res.data)

        // }).catch((err) => {

        // })

        setInterval(() => {
            setReload(false)
        }, 2000)

        setInterval(() => {
            setReload(true)
        }, 2000)

    }, [])


    const showChat = (group) => {
        console.log(group.group_id);
        setGroupID(group.group_id);

        /**
         * get value according to the group id and set into chats
         */

        SupervisorServices.viewChatByGroup(group.group_id).then(res => {
            console.log(res.data, "CHAT-DATA")
            setChats(res.data)
            setGroupName(group.group_name)

        })
    }

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
            group_id: groupID,
            data: {
                name: "supervisor",
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
                <h1 className="text-center">Supervisor :  Group Chat</h1>

            </div>
            <div className="row justify-content-md-center" style={{ marginBottom: "100px" }}>




                <div className="messaging ">
                    <div className="inbox_msg bg-light">
                        <div className="inbox_people bg-dark">
                            <div className="headind_srch">
                                <div className="recent_heading">
                                    <h4 className='text-light'>Recent</h4>
                                </div>
                            </div>
                            <div className="inbox_chat scroll bg-light" id="style-4" >

                                {
                                    groups.map((group, index) => (
                                        <div key={index} onClick={() => { showChat(group.group_data) }}>
                                            {index == 0 ?
                                                <div className="chat_list btn-outline-dark">
                                                    <div className="chat_people">
                                                        <div className="chat_img"> <img src="https://cdn-icons-png.flaticon.com/512/718/718339.png" alt="profile" /> </div>
                                                        <div className="chat_ib">
                                                            <h6>{group.group_data.group_name}</h6>
                                                            <p>{group.group_data.leader + ", " + group.group_data.member1 + ", " + group.group_data.member2 + ", " + group.group_data.member3}.</p>
                                                        </div>
                                                    </div>
                                                </div> :

                                                <div className="chat_list btn-outline-dark">
                                                    <div className="chat_people">
                                                        <div className="chat_img"> <img src="https://cdn-icons-png.flaticon.com/512/718/718339.png" alt="profile" /> </div>
                                                        <div className="chat_ib">
                                                            <h6>{group.group_data.group_name} </h6>
                                                            <p>{group.group_data.leader + ", " + group.group_data.member1 + ", " + group.group_data.member2 + ", " + group.group_data.member3}.</p>
                                                        </div>
                                                    </div>

                                                </div>

                                            }

                                        </div>
                                    )
                                    )
                                }



                            </div>
                        </div>
                        <div className="mesgs bg-dark">
                            {groupName && <div>
                                <h6 className="text-center text-light">{groupName}</h6>
                                <hr className='text-light' />
                            </div>}
                            <div className="msg_history">

                                {
                                    chats.length !== 0 && chats[0].data.map((chat, index) => (
                                        <div key={index}>
                                            {chat.name == "supervisor" ? <div className="outgoing_msg">
                                                <div className="sent_msg">
                                                    <p>{chat.chat}</p>
                                                    <span className="time_date">{chat.date}     |    {chat.time}</span></div>
                                            </div> :
                                                <div className="incoming_msg">
                                                    <div className="incoming_msg_img"> <img src="https://cdn-icons-png.flaticon.com/512/718/718339.png" alt="sunil" /></div>
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
                            <div className="type_msg">
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
    )
}

export default GroupChat