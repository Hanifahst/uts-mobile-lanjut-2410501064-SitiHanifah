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

export const fetchShowDetail = async (id) => {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);

    if (!res.ok) {
        throw new Error("Gagal fetch detail");
    }

    return res.json();
};