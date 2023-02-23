import { useEffect, useState } from "react"
import Tableau from "../../../components/table"
import axios from 'axios'
import { Box } from "@mui/material"
import useWindowDimensions from "../../../components/hooks/useWindowDimensions"

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

    const { height, width } = useWindowDimensions()

    console.log(width)
    const [balances, setBalances] = useState({});

    useEffect(() => {
        axios('http://localhost:4000/smart-contract').then(({ data }) => {
            console.log(data)
        setBalances(data);
        });
    }, [])

    console.log(balances)

    return (
        <Box sx={{ width: width-291, bgcolor: 'background.paper', padding: '20px' }}>
            <Tableau data={data} columns={columns} loading={data.length > 0 ? false : true} dialogComponent  />
        </Box>        
    )
}

export default Factory
