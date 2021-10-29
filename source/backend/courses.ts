import axios, { AxiosRequestConfig } from 'axios';
import { ZoomMeeting, ZoomParticipant } from '../class/ZoomMeeting';

const ZOOM_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Ik5HZzVUMGtCUUdhV3Z2eXdfOHVfMFEiLCJleHAiOjE2NDAwNDQ3NDAsImlhdCI6MTYzNDU5NjIxM30.CLnxK73W_pdfwrra1VdQ1hD3IbXLmJH_VP_6et3eli8';
const PREFIX_URL = 'https://api.zoom.us/v2';

const config: AxiosRequestConfig = {
    headers: { 'Authorization': `Bearer ${ZOOM_TOKEN}` }
}

export async function getMeeting(meetingId?: string) {
    let meeting = new ZoomMeeting();
    try {
        const resp = await axios.get(`${PREFIX_URL}/report/meetings/${meetingId}`, config)
        const data = await resp.data;
        if (data) {
            meeting = data;
        }
    } catch (error) {
        console.error(error);
    }
    return meeting;
}

export async function getMeetings() {
    const userId = 'MR8Th6L7TgGVgWXu0UciHQ';
    let meetings = new Array<ZoomMeeting>();
    try {
        const resp = await axios.get(`${PREFIX_URL}/report/users/${userId}/meetings`, config)
        const data = await resp.data;
        if (data['meetings'] && Array.isArray(data.meetings)) {
            meetings = data.meetings;
        }
    } catch (error) {
        console.error(error);
    }
    return meetings;
}

export async function getMeetingParticipants(meetingId?: string) {
    meetingId ??= '82539881248';
    let participants = new Array<ZoomParticipant>();

    try {
        const resp = await axios.get(`${PREFIX_URL}/report/meetings/${meetingId}/participants`, config);
        const data = await resp.data;
        if (data['participants'] && Array.isArray(data.participants))
            participants = data.participants;
    } catch (error) {
        console.log(error);
    }

    return participants;
}
