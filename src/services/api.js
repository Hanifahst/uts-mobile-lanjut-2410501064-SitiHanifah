export const fetchShows = async() => {
    try {
        const response = await fetch('https://api.tvmaze.com/shows');

        if (!response.ok) {
            throw new Error('Gagal fetch data');
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        throw error;
    }
};