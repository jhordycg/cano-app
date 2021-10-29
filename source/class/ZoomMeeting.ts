export interface ZoomMeeting {
    id: string;
    topic: string;
    user_name: string;
    user_email: string;
    duration: number;
    total_minutes: number;
}

export interface ZoomParticipant {
    user_id: string;
    name: string;
    join_time: string;
    leave_time: string;
    duration: number;
}

export class ZoomParticipant implements ZoomParticipant {
}
export class ZoomMeeting implements ZoomMeeting {
}