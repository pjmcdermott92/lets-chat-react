import { useState, useEffect, useCallback } from 'react';

const useAsyncInternal = (func, dependencies, initLoading = false) => {
    const [loading, setLoading] = useState(initLoading);
    const [error, setError] = useState();
    const [value, setValue] = useState();

    const execute = useCallback((...params) => {
        setLoading(true);
        return func(...params)
            .then(data => {
                setValue(data);
                setError(undefined);
                return data;
            })
            .catch(error => {
                setError(error);
                setValue(undefined);
                return error;
            })
            .finally(() => setLoading(false));
    }, dependencies);

    return { loading, error, value, execute };
};

export const useAsyncFn = (func, dependencies = []) => {
    return useAsyncInternal(func, dependencies, false);
};

export const useAsync = (func, dependencies = []) => {
    const { execute, ...state } = useAsyncInternal(func, dependencies, true);

    useEffect(() => {
        execute();
    }, [execute]);

    return state;
}
