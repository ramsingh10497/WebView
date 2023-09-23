import React,{useState} from 'react';
import { connect } from 'react-redux';
import {useRouter} from 'next/router';
import styles from '../styles/Meetings.module.css';
import moment from 'moment';
import HostModal from './HostModal';
import DialogBox from './DialogBox';
import { deleteMeeting,startMeeting,endMeeting } from '../redux/meeting/actions';
import { clearMessages } from '../redux/messages/actions';

const MeetingCard = ({meeting,deleteMeeting,startMeeting}) => {
    const {title,datetime,id,password,createdAt,startedAt,endedAt} = meeting;
    const [showEdit,setShowEdit]= useState(false);
    const [showDelete,setShowDelete]= useState(false);
    const router = useRouter();
    const startMeetingHandler = async ()=>{
        if(!startedAt){
            await startMeeting(meeting);
        }
       router.push({pathname:'/meeting',query:{id:meeting.id,password:meeting.password}});
    }
    
    return (
        <>
        <div className={styles.card}>
            {!startedAt && <>
            <div className={styles.editButton} onClick={()=>{setShowEdit(true)}}><i class="fa fa-pencil" aria-hidden="true"></i></div>
            <div className={styles.deleteButton} onClick={()=>{setShowDelete(true)}}><i class="fa fa-trash" aria-hidden="true"></i></div>
            </>}
                <div className={styles.cardImg}>
                    { new Date()>new Date(datetime) && !endedAt && <>
                    {!startedAt ?
                    <div className={styles.overlay}>
                        <div className={styles.startButton} onClick={startMeetingHandler}>
                            Start Meeting
                        </div>
                    </div>:
                    <div className={styles.overlay}>
                    <div className={styles.startButton} onClick={startMeetingHandler}>
                        Join Now
                    </div>
                </div>
                    }
                    </>
                    }
                    <img className={styles.cardImgImg} src="/static/images/video-call.svg" alt="meeting-image"/>
                </div>
                <div className={styles.cardContent}>
                    <p className={styles.meta}><strong>Title</strong> : {title}</p>
                    <p className={styles.meta}><strong>Timing</strong> : {moment(datetime).format('lll')}</p>
                   {!endedAt && <> <p className={styles.meta}><strong>ID</strong> : {id}</p>
                    <p className={styles.meta}><strong>Password</strong> : {password}</p>
                    </> }
                    {endedAt && <> <p className={styles.meta}><strong>Started At</strong> : {moment(startedAt).format('lll')}</p>
                    <p className={styles.meta}><strong>Ended At</strong> : {moment(endedAt).format('lll')}</p>
                    </> }
                    <p className={styles.created}>created {moment(new Date(createdAt)).fromNow()}</p>
                </div>
            </div>
            <HostModal show={showEdit} onClose={()=>{setShowEdit(false)}} edit={true} mId={id}/>
            <DialogBox show={showDelete} clickOk={()=>{deleteMeeting(id);setShowDelete(false)}} clickCancel={()=>{setShowDelete(false)}} question={"Are you sure you want to delete the meeting?"} />
            </>
    )
}

const mapStateToProps = ({auth})=>({
    user:auth.user
});

export default connect(mapStateToProps,{deleteMeeting,startMeeting,endMeeting,clearMessages})(MeetingCard);