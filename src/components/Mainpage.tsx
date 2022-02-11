import React, { useState, Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { Button, Table, Select } from "antd";
import CountryDetailModal from "./CountryDetailModal";
const { Option } = Select;

export interface ModalObj {
  name: string;
  code: string;
  capital: string;
  emojiU: string;
  languages: Language[];
  continentName: string;
}
interface Country {
  name: string;
  code: string;
  capital: string;
  emojiU: string;
  languages: Language[];
}
interface Continent {
  code: string;
  name: string;
  countries: Country[];
}
interface Language {
  code: string;
  name: string;
}
interface IProps {
  modalList: ModalObj[];
  setModalList: (arr: ModalObj[]) => void;
}
// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

// write a GraphQL query that asks for names and codes for all countries
const LIST_CONTINENTS = gql`
  {
    continents {
      name
      code
      countries {
        code
        name
        native
        capital
        currency
        emoji
        emojiU
        languages {
          code
          name
          rtl
          native
        }
      }
    }
  }
`;
const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
    }
  }
`;

// create a component that renders a select input for coutries
function CountrySelect() {
  const [continent, setContinent] = useState("US");
  const [countries, setCountries] = useState([]);
  const [modalList, setModalList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data, loading, error } = useQuery(LIST_CONTINENTS, { client });
  //   const { data1, loading1, error1 } = useQuery(LIST_COUNTRIES, { client });
  let list = [] as any;

  const handleModalOpen = (record: any) => {
    setIsModalVisible(true);
    console.log(record.languages[0].name);
    data.continents.forEach((element: Continent) => {
      element.countries.forEach((item) => {
        item.languages.forEach((lang) => {
          if (lang.name === record.languages[0].name) {
            console.log(item);
            list.push({ ...item, continentName: element.name });
          }
        });
      });
    });
    setModalList(list);
  };
  console.log(data?.continents);
  const columns = [
    {
      title: "Ülke Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Başkent",
      dataIndex: "capital",
      key: "capital",
    },
    {
      title: "Bayrak",
      dataIndex: "emoji",
      key: "emojiU",
    },
    {
      title: "İşlemler",
      dataIndex: "capital",
      key: "capital",
      render: (text: string, record: any) => (
        <Button onClick={() => handleModalOpen(record)}>Detay</Button>
      ),
    },
  ];

  if (loading || error) {
    return <p>{error ? error.message : "Yükleniyor..."}</p>;
  }

  return (
    <>
      <Select
        defaultValue=" Lütfen Bir Kıta Seçiniz"
        style={{ width: 200 }}
        // value={continent}
        onChange={(value) => {
          setContinent(value);
          const selectedContinent = data.continents?.filter(
            (cont: Continent) => cont.code === value
          );
          setCountries(selectedContinent[0].countries);
        }}
      >
        {data.continents.map((country: Country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </Select>

      {countries.length > 0 && (
        <Table rowKey={"code"} columns={columns} dataSource={countries} />
      )}
      <CountryDetailModal
        list={modalList}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
}
export default CountrySelect;
