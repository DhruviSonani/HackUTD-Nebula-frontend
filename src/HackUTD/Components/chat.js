import React, { useState, useEffect } from 'react'
import '../CSS/custom.css'
import { Button } from 'react-bootstrap';
import Edit from '../../Assets/user.png'
import axios from 'axios'
import { base_url } from './common'

function Chat() {

    const [msg, sendMsg] = useState([])
    const [isDisabled, setIsDisabled] = useState(false)
    let url_temp = window.location.href.split("/")
    const subject = url_temp[url_temp.length - 1]
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const user_id = user_data.user_id
    const name = user_data.name



    useEffect(() => {
        console.log()
        axios.get(base_url + '/chat/' + subject).then(item => {
            const data = item.data;
            sendMsg(data)
        }).catch(err => {
            // console.log(err)
            sendMsg()
        })

        checkJoiningStatusHandler()

    }, [])

    function MessageHandler(e) {
        // console.log(e)
        const str = document.getElementById("msg").value
        const payload = {
            "sub_id": subject,
            "user_id": user_id,
            "msg": str,
            "is_sent": true,
            "time_stamp": new Date()
        }

        axios.post(base_url + "/chat/addMessage", payload).then(resp => {
            const temp = msg.concat({ time_stamp: (new Date()).toString(), msg: str, user_id: user_id, name: name })
            sendMsg(temp)
            document.getElementById("msg").value = ""
        }).catch(err => {
            console.log(err);
        })
    }

    function checkJoiningStatusHandler() {
        axios.get(`${base_url}/chat/checkJoin/${subject}/${user_id}`).then(resp => {
            if (resp.data.join) {
                setIsDisabled(resp.data.join)
            }
        })
    }

    function GroupLeaveHandler() {
        axios.delete(`${base_url}/chat/disJoin/${subject}/${user_id}`).then(resp => {
            setIsDisabled(false)
            alert("Group left successfully!")
        }).catch(err => {
            console.log(err)
        })
    }

    function GroupJoinHandler() {
        let payload = {
            "sub_id": subject,
            "user_id": user_id
        }
        axios.post(base_url + "/chat/join", payload).then(resp => {
            alert("Group joined successfully!")
            setIsDisabled(true)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <>
            <div className="subject_name">
                <p>{subject}</p>
                <button className='join_grp_button' onClick={() => {
                    if (isDisabled) {
                        GroupLeaveHandler()
                    } else {
                        GroupJoinHandler()
                    }
                }}> {isDisabled ? "Leave Group" : "Join Group"}</button>
            </div>
            {msg.length > 0 &&
                <div className="p-r height-100vh    "  >
                    {msg.map(item => {
                        let side = "left";
                        if (user_id == item.user_id) {
                            side = "right"
                        }

                        return <div className="p-r" style={{ marginTop: "15px" }}>
                            <p className={`${side === "left" ? "" : "right"} time_stamp`}>{item.name},  {item.time_stamp}</p>
                            <p className={`left ${side}`} >{item.msg}</p>
                            <img src={Edit} alt="Edit" width={25} className="user_image" style={{ visibility: 'hidden' }}
                            />
                        </div>
                    })}

                </div>
            }

            :
            {!isDisabled && msg.length === 0 ?

                <h1>Please join the group if you are new to this channel</h1>

                :
                msg.length > 0 ? <></> : <h1>Oops! no chats yet, be the first one!</h1>
            }

            {isDisabled ?

                <div className="d-flex">
                    <input name="message" id="msg" className="input_message" />
                    <Button variant="primary" className="btn-primary" onClick={(e) => {
                        MessageHandler(e)
                    }}>Send</Button>
                </div>
                : <></>
            }
        </>
    )
}

export default Chat