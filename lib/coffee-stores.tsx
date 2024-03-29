import CoffeStoresResponse from '@/types/coffeData';

const getUrlForCoffee = (latitude: string, query: string, limit: string) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latitude}&limit=${limit}`;
};

export const fetchCoffeStores = async (
  latlong: string = '53.120354%2C18.004737'
) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_API_KEY,
    },
  };

  const requestInit: RequestInit = {
    method: options.method,
    headers: {
      accept: options.headers.accept,
      Authorization: (options.headers.Authorization as string) || '',
    },
  };

  const response = await fetch(
    getUrlForCoffee(latlong, 'coffee', '6'),
    requestInit
  );
  const data: CoffeStoresResponse = await response.json();
  console.log('data return: ', data.results);
  return data.results;
  // .catch(err => console.error(err));
};
