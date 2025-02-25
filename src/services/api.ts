import axios from 'axios';

// Création de l'instance Axios
const api = axios.create({
    baseURL: '/api/rest',
    headers: {
        'Content-Type': 'application/json'
    }
});

// 🔹 Intercepteur : Ajoute dynamiquement l'`apikey` à chaque requête
api.interceptors.request.use(
    (config) => {
        const apiKey = localStorage.getItem('apiKey');
        if (apiKey) {
            config.headers['apikey'] = apiKey;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;



export async function fetchApplications() {
    try {
        const res = await api.get('/pipelines');
        return res.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des applications:', error);
        throw error;
    }
}

export async function fetchExecutions() {
    try {
        const res = await api.get('/executions');
        return res.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des exécutions:', error);
        throw error;
    }
}

export async function fetchApplication(id: string) {
    try {
        const res = await api.get(`/pipelines/${id}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'application:", error);
        throw error;
    }
}

export async function launchPipeline(parameters: Record<string, string | Record<string, string>>) {
    try {
        let name = parameters['name'] as string;
        let pipelineIdentifier = parameters['pipeline'] as string;
        let resultsLocation = '/vip/Home/API/client_tests/';

        let inputValues = parameters['inputValues'] as Record<string, string>

        console.log('Launching pipeline:', name, pipelineIdentifier, inputValues, resultsLocation);

        const res = await api.post('/executions', {
            name,
            pipelineIdentifier,
            inputValues,
            resultsLocation
        });

        return res.data;
    } catch (error) {
        console.error('Erreur lors du lancement du pipeline:', error);
        throw error;
    }
}

export async function loginUser(
    username: string,
    password: string
): Promise<string> {
    try {
        console.log('Logging with:', username, password);
        const res = await api.post('/authenticate', {
            username,
            password
        });

        return res.data.httpHeaderValue;
    } catch (error: any) {
        console.error('Erreur :', error.response ? error.response.data : error);
        throw error;
    }
}