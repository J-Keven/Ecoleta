import React, { useState, useEffect, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import axios from "axios";
import { LeafletMouseEvent } from "leaflet";

import api from "../../services/Api";
import logo from "../../assets/logo.svg";
import "./style.css";

interface ItemsProps {
  id: number;
  title: string;
  image: string;
  url: string;
}

interface UfsProps {
  id: number;
  initials: string;
  name: string;
}

interface ResponseIbgeUf {
  id: number;
  sigla: string;
  nome: string;
}

interface ResponseIbgeCitys {
  id: number;
  nome: string;
}

interface CityProps {
  id: number;
  name: string;
}
const CreatePoint = () => {
  const [itemsColect, setItems] = useState<ItemsProps[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [uf, setUf] = useState("");
  const [city, setCity] = useState("");
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [itemsSelect, setItemsSelect] = useState<number[]>([]);

  const [initialLocation, setInitialLocation] = useState<[number, number]>([
    0,
    0,
  ]);

  const [ufs, setUfs] = useState<UfsProps[]>([]);
  const [citys, setCitys] = useState<CityProps[]>([]);

  const history = useHistory();

  const handleLoadItems = async () => {
    const response = await api({
      url: "/items",
      method: "GET",
    });
    // console.log(itemsColect);
    setItems(response.data);
  };

  const handleLoadUfs = async () => {
    const { data } = await axios.get<ResponseIbgeUf[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );

    const ufsResponse = data.map((item) => {
      return {
        id: item.id,
        name: item.nome,
        initials: item.sigla,
      };
    });

    setUfs(ufsResponse);
  };

  const handleMapClick = (event: LeafletMouseEvent) => {
    setPosition([event.latlng.lat, event.latlng.lng]);
  };

  const handleGetInitialLocation = () => {
    navigator.geolocation.getCurrentPosition((locale) => {
      const { latitude, longitude } = locale.coords;

      setInitialLocation([latitude, longitude]);
    });
  };

  const handleSelectItems = (id: number) => {
    const alreadyItems = itemsSelect.findIndex((item) => item === id);

    if (alreadyItems >= 0) {
      const filteredItems = itemsSelect.filter((item) => item !== id);

      setItemsSelect(filteredItems);
    } else {
      setItemsSelect([...itemsSelect, id]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      whatsApp: whatsapp,
      image: "test.jpeg",
      latitude: position[0],
      longitude: position[1],
      city: city,
      uf: uf,
      items: itemsSelect,
    };

    const response = await api.post("/point", data);

    if (response.status !== 200) {
      return alert("Houve um erro ao criar o ponto de coleta, tente novamente");
    }

    history.push("/");
  };
  useEffect(() => {
    handleLoadItems();
  }, []);

  useEffect(() => {
    handleLoadUfs();
  }, []);

  useEffect(() => {
    handleGetInitialLocation();
  });

  useEffect(() => {
    axios
      .get<ResponseIbgeCitys[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .then(({ data }) => {
        const citysResponse = data.map((item) => {
          return {
            id: item.id,
            name: item.nome,
          };
        });

        setCitys(citysResponse);
      });
  }, [uf]);

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro de <br />
          ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados da Entidade</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da Entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="exemplo@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="email">WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsappitem.sigla,"
                placeholder="+55 00 0000-0000"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>
          <Map center={initialLocation} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="UF">Estado (UF)</label>
              <select onChange={(e) => setUf(e.target.value)} name="uf" id="uf">
                <option value="0">Selecione uma UF</option>
                {ufs.map((uf) => (
                  <option key={uf.id} value={uf.initials}>
                    {uf.initials}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="0">Selecione uma Cidade</option>
                {citys.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            {itemsColect.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    handleSelectItems(item.id);
                  }}
                  className={itemsSelect.includes(item.id) ? "selected" : ""}
                >
                  <img src={item.url} alt={item.title} />
                  <span>{item.title}</span>
                </li>
              );
            })}
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
