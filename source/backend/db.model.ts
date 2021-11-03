import {DataTypes, Model} from "sequelize";
import {sequelize} from "./connection-pg";
import {ZoomMeeting, ZoomParticipant} from "../class/ZoomMeeting";

interface MeetingModelI {
    id?: number,
    description?: string,
    duration: number,
    created: Date,
    zoom_id: string,
}

class MeetingModel extends Model {
}

MeetingModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        zoom_id: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'meeting',
    }
);

interface ParticipantModelI {
    id?: number;
    zoom_id?: string;
    name: string;
    email?: string;
    duration: number;
    join_time: string;
    leave_time: string
}

class ParticipantModel extends Model {
}

ParticipantModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    duration: {
        type: DataTypes.INTEGER,
    },
    zoom_id: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'participant'
});

function parseToMeetingModelI(meeting: ZoomMeeting): MeetingModelI {
    meeting.from.setHours(0)
    meeting.from.setMinutes(0)
    meeting.from.setSeconds(0)
    meeting.from.setMilliseconds(0)

    return {
        zoom_id: meeting.id,
        duration: meeting.duration,
        description: meeting.topic,
        created: meeting.from,
    };
}

function parseToParticipantModelI(participant: ZoomParticipant): ParticipantModelI {
    return {
        zoom_id: participant.user_id,
        duration: participant.duration,
        name: participant.name,
        join_time: participant.join_time,
        leave_time: participant.leave_time
    };
}

export {
    MeetingModel,
    MeetingModelI,
    parseToMeetingModelI,

    ParticipantModel,
    ParticipantModelI,
    parseToParticipantModelI,
}

sequelize.sync()
    .catch(console.error);