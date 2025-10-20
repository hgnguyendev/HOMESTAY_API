import { v4 as uuidv4 } from 'uuid';


export default class Util {
    static generateUuid() {
        return uuidv4();
    }
    static getToken(token: string) {
        if (token) {
            if (token.indexOf('Bearer ') > -1) {
                return token.replace('Bearer ', '');
            }
        }

        return token;
    }

    static arrayToObject(array: any, key: string) {
        return (array || [])
            .filter((item: any) => item && item[key])
            .reduce((obj: any, item: any) => {
                obj[item[key]] = item;
                return obj;
            }, {});
    }

    static generateCodeOTP(length: number = 6) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10).toString();
        }
        return result;
    }

    static sleep(timeout: number): Promise<any> {
        return new Promise(resolve => setTimeout(() => resolve(true), timeout));
    }

    static deepCopy(obj: any) {
        if (!obj) return obj;
        return JSON.parse(JSON.stringify(obj));
    }

    static getIp(req: any) {
        let requestIp = req.header('x-forwarded-for') || req.socket.remoteAddress || 'unknown';

        if (requestIp.includes(',')) {
            requestIp = requestIp.split(',')[0].trim();
        }
        if (requestIp.startsWith('::ffff:')) {
            requestIp = requestIp.replace('::ffff:', '');
        }
        return requestIp;
    }

    static startOfDay(d: Date | string) {
        const x = new Date(d);
        x.setHours(0, 0, 0, 0);
        return x;
    }

    static endOfDay(d: Date | string) {
        const x = new Date(d);
        x.setHours(23, 59, 59, 999);
        return x;
    }

    static setToToday(base: Date, time: Date | string | null): Date | null {
        if (!time) return null;

        const t = new Date(time);
        if (isNaN(t.getTime())) return null;

        const d = new Date(base);
        d.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), 0);
        return d;
    }
}
