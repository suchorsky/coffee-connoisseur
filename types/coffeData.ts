interface Icon {
    prefix: string;
    suffix: string;
  }
  
  interface Category {
    id: number;
    name: string;
    icon: Icon;
  }
  
  interface Geocodes {
    main: {
      latitude: number;
      longitude: number;
    };
    roof: {
      latitude: number;
      longitude: number;
    };
  }
  
  interface Location {
    address: string;
    country: string;
    cross_street: string;
    formatted_address: string;
    locality: string;
    postcode: string;
    region: string;
  }
  
  interface ParentPlace {
    fsq_id: string;
    name: string;
  }
  
  interface RelatedPlaces {
    parent: ParentPlace;
  }
  
  interface Result {
    fsq_id: string;
    categories: Category[];
    chains: any[]; // type is not specified in the JSON
    distance: number;
    geocodes: Geocodes;
    link: string;
    location: Location;
    name: string;
    related_places: RelatedPlaces;
    timezone: string;
  }
  
  interface CoffeStoresResponse {
    results: Result[];
  }
  
  export default CoffeStoresResponse;