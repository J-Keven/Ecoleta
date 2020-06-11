interface Data {
  id: number;
  title: string;
  image: string;
}

export default function insertImageUrl(data: []) {
  return data.map((item: Data) => {
    return {
      id: item.id,
      title: item.title,
      image: item.image,
      url: `http://192.168.0.34:3333/uploads/${item.image}`,
    };
  });
}
