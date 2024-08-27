export const baseUrl = "http://localhost:7000/api";

export const postRequest = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        });

        const data = await response.json();

        if (!response.ok) {
            let message;
            if (data?.message) {
                message = data.message;
            } else {
                message = data;
            }
            return { error: true, message };
        }
        return data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

export const getRequest = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to fetch');
      }
      return await response.json();
    } catch (error) {
      return { error: true, message: error.message };
    }
  };
  