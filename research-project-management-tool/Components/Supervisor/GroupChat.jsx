import React, { useEffect, useState } from 'react';
import './chat.css'

function GroupChat() {

    const [groups, setGroups] = useState([
        {
            group_id: "GROUP 1",
            group_name: "POWER GROUP",
            leader: "12312asdasd",
            member1: "member1",
            member2: "member2",
            member3: "member3",
            supervisor_id: "123WWWWWWWW",
            chat_id: "chatid00222"
        },
        {
            group_id: "GROUP 2",
            group_name: "POWER2 GROUP",
            leader: "12312asdasd",
            member1: "member1",
            member2: "member2",
            member3: "member3",
            supervisor_id: "123WWWWWWWW",
            chat_id: "chatid00222"
        }, {
            group_id: "GROUP 3",
            group_name: "POWER3 GROUP",
            leader: "12312asdasd",
            member1: "member1",
            member2: "member2",
            member3: "member3",
            supervisor_id: "123WWWWWWWW",
            chat_id: "chatid00222"
        }
    ])

    const [chats, setChats] = useState([
        {
            group_id: "GROUP 1",
            data: [
                {
                    name: "supervisor",
                    chat: "sdhgajshdgjhasdgjhasgdjhagsdjhg",
                    date: new Date()
                },
                {
                    name: "student1",
                    chat: "sssssssssssssssssssss",
                    date: new Date()
                },
                {
                    name: "supervisor",
                    chat: "No NO NO noONONN ONON ON ",
                    date: new Date()
                },
                {
                    name: "student2",
                    chat: "ssssdSSWWRTGGGGGGG",
                    date: new Date()
                },
            ]
        }
    ])


    useEffect(()=>{
        console.log("use EFFECT")
    },[])



    const showChat = (group) => {
        console.log(group.group_id);

        /**
         * get value accourding to da  the group id and set into chats
         */
    }


    return (
        <div className="container">
            <div className="row justify-content-md-center" style={{ marginTop: "50px", marginBottom: "10px" }}>
                <h1 className="text-center">Group Chat</h1>
            </div>
            <div className="row justify-content-md-center" style={{ marginBottom: "100px" }}>




                <div className="messaging">
                    <div className="inbox_msg">
                        <div className="inbox_people">
                            <div className="headind_srch">
                                <div className="recent_heading">
                                    <h4>Recent</h4>
                                </div>
                                <div className="srch_bar">
                                    <div className="stylish-input-group">
                                        <input type="text" className="search-bar" placeholder="Search" />
                                    </div>
                                </div>
                            </div>
                            <div className="inbox_chat scroll">

                                {
                                    groups.map((group, index) => (
                                        <div key={index} onClick={()=>{showChat(group)}}>
                                            {index == 0 ?
                                                <div className="chat_list active_chat">
                                                    <div className="chat_people">
                                                        <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                                        <div className="chat_ib">
                                                            <h5>{group.group_name} <span className="chat_date">Dec 25</span></h5>
                                                            <p>{group.leader + ", " + group.member1 + ", " + group.member2 + ", " + group.member3}.</p>
                                                        </div>
                                                    </div>
                                                </div> :

                                                <div className="chat_list">
                                                    <div className="chat_people">
                                                        <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                                        <div className="chat_ib">
                                                            <h5>{group.group_name} <span className="chat_date">Dec 25</span></h5>
                                                            <p>{group.leader + ", " + group.member1 + ", " + group.member2 + ", " + group.member3}.</p>
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
                        <div className="mesgs">
                            <div className="msg_history">
                                {
                                    chats[0].data.map((chat, index) => (
                                        <div key={index}>
                                            {chat.name == "supervisor" ? <div className="outgoing_msg">
                                                <div className="sent_msg">
                                                    <p>{chat.chat}</p>
                                                    <span className="time_date"> 11:01 AM    |    June 9</span> </div>
                                            </div> :
                                                <div className="incoming_msg">
                                                    <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> {chat.name}</div>
                                                    <div className="received_msg">
                                                        <div className="received_withd_msg">
                                                            <p>{chat.chat}</p>
                                                            <span className="time_date"> 11:01 AM    |    June 9</span></div>
                                                    </div>
                                                </div>

                                            }
                                        </div>
                                    ))
                                }

                            </div>
                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <input type="text" className="write_msg" placeholder="Type a message" />
                                    <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
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