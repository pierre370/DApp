import { useEffect, useState } from "react";
import Tableau from "../../../components/table"
import axios from 'axios'

const data = [
    { id: 1, name: "hgfjg", surname: "ddfgfikgh"  },
    { id: 2, name: "hgfjgxc", surname: "ddikghjgh"  },
    { id: 3, name: "hgfjggbg", surname: "ddikghdfg"  }
]
const columns = [
    {
        field: 'name',
        headerName: 'Prénom',
        flex: 1
    },
    {
        field: 'surname',
        headerName: 'Nom',
        flex: 1
    },
    {
        field: '',
        headerName: 'Moodifier',
        flex: 1
    }
]

const Factory = () => {

    const [balances, setBalances] = useState({});

    useEffect(() => {
        axios('http://localhost:4000/smart-contract').then(({ data }) => {
            console.log(data)
        setBalances(data);
        });
    }, [])

    console.log(balances)

    return (
        <Tableau data={data} columns={columns} loading={data.length > 0 ? false : true} dialogComponent  />
    )
}

export default Factory
