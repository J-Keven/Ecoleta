interface Data {
  id: String;
  title: string;
  image: String;
}

export default function insertImageUrl(data: []) {
  return data.map((item: Data) => {
    return {
      id: item.id,
      title: item.title,
      image: item.image,
      url: `http://localhost:3333/uploads/${item.image}`,
    };
  });
}
