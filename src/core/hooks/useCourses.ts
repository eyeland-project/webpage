import { useState, useCallback } from 'react';
import useAuthStorage from './useAuthStorage';
import axios from 'axios';

import { environment } from '@environments/environment';

import { Course } from '@interfaces/Course.interface';

const useCourses = () => {
    const authStorage = useAuthStorage();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState<Course[] | null>(null);

    const getCourses = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${environment.apiUrl}/courses`, {
                headers: {
                    Authorization: `Bearer ${authStorage.getAccessToken()}`,
                },
                timeout: 10000,
            });

            if (response.status === 200) {
                setLoading(false);
                setData(response.data);
                return response.data;
            } else {
                throw new Error(response.data);
            }
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
    }, []);

    const createSession = useCallback(async (courseId: number) => {
        setLoading(true);
        try {
            const response = await axios.post(`${environment.apiUrl}/courses/${courseId}/session`, {}, {
                headers: {
                    Authorization: `Bearer ${authStorage.getAccessToken()}`,
                },
                timeout: 10000,
            });

            if (response.status === 200) {
                setLoading(false);
                return response.data;
            } else {
                throw new Error(response.data);
            }
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
    }, []);

    const startSession = useCallback(async (courseId: number) => {
        setLoading(true);
        try {
            const response = await axios.post(`${environment.apiUrl}/courses/${courseId}/session/start`, {}, {
                headers: {
                    Authorization: `Bearer ${authStorage.getAccessToken()}`,
                },
                timeout: 10000,
            });

            if (response.status === 200) {
                setLoading(false);
                return response.data;
            } else {
                throw new Error(response.data);
            }
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
    }, []);

    const endSession = useCallback(async (courseId: number) => {
        setLoading(true);
        try {
            const response = await axios.post(`${environment.apiUrl}/courses/${courseId}/session/end`, {}, {
                headers: {
                    Authorization: `Bearer ${authStorage.getAccessToken()}`,
                },
                timeout: 10000,
            });

            if (response.status === 200) {
                setLoading(false);
                return response.data;
            } else {
                throw new Error(response.data);
            }
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
    }, []);

    return { loading, error, data, getCourses, createSession, startSession, endSession };
};

export default useCourses;


