import axios from 'axios';

// Instance Axios utilisée par tout le front (session via cookies)
const api = axios.create({
    baseURL: '/api/rest',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});

export default api;


export type SessionLoginResponse = {
    httpHeader: string;
    httpHeaderValue: string;
};

export async function loginSession(
    username: string,
    password: string
): Promise<SessionLoginResponse> {
    const res = await api.post<SessionLoginResponse>('/session', { username, password });
    return res.data;
}

export async function fetchAdminApplications(): Promise<any> {
    const res = await api.get('/admin/applications');
    return res.data;
}

export async function logoutSession(): Promise<void> {
    await api.post('/admin/logout');
}

export function setVipCookies(username: string, sessionValue: string, days: number): void {
    const cookieNameUser = 'vip-cookie-user';
    const cookieNameSession = 'vip-cookie-session';
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = `${cookieNameUser}=${encodeURIComponent(username)}; ${expires}; path=/`;
    document.cookie = `${cookieNameSession}=${encodeURIComponent(sessionValue)}; ${expires}; path=/`;
}

export function clearVipCookies(): void {
    const past = new Date(0).toUTCString();
    document.cookie = `vip-cookie-user=; expires=${past}; path=/`;
    document.cookie = `vip-cookie-session=; expires=${past}; path=/`;
}


export async function fetchApplications() {
    const res = await api.get('/pipelines');
    return res.data;
}

export async function fetchExecutions() {
    const res = await api.get('/executions');
    return res.data;
}

export async function fetchApplication(id: string) {
    const res = await api.get(`/pipelines/${id}`);
    return res.data;
}

export async function launchPipeline(parameters: Record<string, string | Record<string, string>>) {
    const name = parameters['name'] as string;
    const pipelineIdentifier = parameters['pipeline'] as string;
    const resultsLocation = '/vip/Home/API/client_tests/';
    const inputValues = parameters['inputValues'] as Record<string, string>;

    const res = await api.post('/executions', {
        name,
        pipelineIdentifier,
        inputValues,
        resultsLocation,
    });
    return res.data;
}