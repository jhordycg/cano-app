import { Request } from "express";
import { ZoomParticipant } from "../class/ZoomMeeting";

export function mergeStudents(list: ZoomParticipant[]): ZoomParticipant[] {
    let zoomParticipants;

    const participants = list.reduce<Map<string, ZoomParticipant[]>>(
        (result, item) => {
            if (result.get(item.name)) result.get(item.name)?.push(item)
            result.set(item.name, [item]);
            return result;
        }, new Map<string, ZoomParticipant[]>()
    );

    zoomParticipants = mergeStudent(participants);

    if (zoomParticipants.length < 1) {
        zoomParticipants.push({
            duration: 30,
            name: 'hola',
            join_time: '25436234',
            leave_time: '24523452',
            user_id: 'sdasdfj'
        })
    }

    return zoomParticipants.sort(({ name: a }, { name: b }) => a.localeCompare(b));
}

function mergeStudent(studentMap: Map<string, ZoomParticipant[]>) {
    let result = new Array<ZoomParticipant>();
    studentMap.forEach((students) => {
        if (students.length == 1) result.push(students[0]);

        else {
            const studentMergeds = students.reduce<ZoomParticipant[]>(
                (mergeds, item) => {
                    if (mergeds.length) return ([item]);
                    let prev
                    if ((prev = mergeds.pop()) !== undefined) mergeds.push(...merge([prev, item]));
                    return mergeds;
                }, new Array<ZoomParticipant>()
            );

            const cumulativeStudentTime = studentMergeds.reduce(
                (cumulativeTime, student) => {
                    cumulativeTime.duration += student.duration;
                    return cumulativeTime;
                }
            );
            result.push(cumulativeStudentTime);
        }
    });

    return result;
}

function merge([prev, curr]: ZoomParticipant[], tolerance: number = 0) {
    if (curr.join_time <= prev.leave_time) {
        let result = curr;
        result.join_time = prev.join_time > curr.leave_time ? prev.join_time : curr.leave_time;
        result.leave_time = prev.join_time < curr.leave_time ? prev.join_time : curr.join_time;
        result.duration = getTimeInSeconds(result.leave_time) - getTimeInSeconds(result.join_time);
        return [result];
    }
    return [prev, curr]
}

export function getTimeInSeconds(date: string): number {
    return Date.parse(date) / 1000;
}

export function hasParams(req: Request): boolean {
    return (req && req.body && req.body.commonEventObject && req.body.commonEventObject.parameters);
}

interface DefaultParams {
    grid_item_identifier: string;
}
export function getParams(req: Request) {
    return {
        others: {
            ...req.body.commonEventObject.parameters
        },
        ...req.body.commonEventObject.parameters as DefaultParams
    };
}
