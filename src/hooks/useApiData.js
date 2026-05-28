import { useState, useEffect } from 'react';
import api from '../services/api';

export const useApiData = (url, isSingleton = false) => {
    const [data, setData] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            setLoading(true);
            const response = await api.get(url);
            
            if (isSingleton) {
                // Для синглтон-страниц (HomePage, FondPage, HelpSection)
                setData(response.data);
            } else {
                // Для списков
                setItems(Array.isArray(response.data) ? response.data : []);
            }
        } catch (err) {
            console.error(`Error loading ${url}:`, err);
            setError(err.response?.data?.detail || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [url]);

    return { data, items, loading, error, loadData, setData, setItems };
};