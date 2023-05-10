async function fetchData(url: string): Promise<any> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export default fetchData;
