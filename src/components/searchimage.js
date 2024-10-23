import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/search/photos";
const AK = "wy_Bd3s3ACzE47HtmH3TPFOW4-QV6uIp38LJvdkiL54";

export const fetchPhotosTopic = async (query, currentPage) => {
  const { data } = await axios.get("?", {
    params: {
      query: query,
      client_id: AK,
      page: currentPage,
    },
  });
  return data;
};
